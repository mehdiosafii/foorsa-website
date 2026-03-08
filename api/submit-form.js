const { Pool } = require('pg');
const Busboy = require('busboy');
const { verifyCaptcha } = require('./verify-captcha');

const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 3 });

/**
 * Check if a phone number is complete (not just a country code).
 * A complete phone number has at least 10 digits total.
 */
function isCompletePhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 10;
}

/**
 * Create a website lead and trigger round-robin assignment.
 * Fire-and-forget: errors are logged but don't affect the form response.
 */
async function createWebsiteLead(submissionId, formData) {
  try {
    const phone = formData.phone || '';
    if (!isCompletePhone(phone)) return;

    const name = formData.name || formData.full_name || 'Website Lead';
    const email = formData.email || null;
    const programType = formData.program_type || null;
    const pageUrl = formData.page_url || null;

    // Check if a lead already exists for this submission
    const existing = await pool.query(
      'SELECT id FROM website_leads WHERE submission_id = $1',
      [submissionId]
    );
    if (existing.rows.length > 0) return;

    // Insert into website_leads
    const leadResult = await pool.query(
      `INSERT INTO website_leads (submission_id, lead_name, lead_phone, lead_email, program_type, page_url, status, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, 'new', NOW(), NOW())
       RETURNING id`,
      [submissionId, name, phone, email, programType, pageUrl]
    );
    const leadId = leadResult.rows[0].id;

    // Trigger round-robin assignment
    const assignResult = await pool.query(
      `SELECT * FROM assign_lead_round_robin($1, $2, $3, $4, $5)`,
      ['website_lead', leadId, name, phone, 'website']
    );

    const assignment = assignResult.rows[0];
    if (assignment && assignment.success) {
      console.log(`[FORM] Website lead ${leadId} assigned to ${assignment.assigned_to_name}`);
    } else {
      console.log(`[FORM] Website lead ${leadId} needs manual assignment: ${assignment?.error_message || 'unknown'}`);
    }
  } catch (err) {
    console.error('[FORM] Error creating website lead:', err.message);
  }
}

function parseMultipart(req) {
  return new Promise((resolve, reject) => {
    const fields = {};
    const files = [];
    const busboy = Busboy({ headers: req.headers, limits: { fileSize: 5 * 1024 * 1024 } });

    busboy.on('field', (name, val) => { fields[name] = val; });
    busboy.on('file', (name, stream, info) => {
      const chunks = [];
      stream.on('data', d => chunks.push(d));
      stream.on('end', () => {
        const buf = Buffer.concat(chunks);
        if (buf.length > 0) {
          files.push({
            fieldname: name,
            filename: info.filename,
            mimeType: info.mimeType,
            size: buf.length,
            data: buf.toString('base64')
          });
        }
      });
    });
    busboy.on('finish', () => resolve({ fields, files }));
    busboy.on('error', reject);
    req.pipe(busboy);
  });
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    let formData, files = [];

    const ct = req.headers['content-type'] || '';
    if (ct.includes('multipart/form-data')) {
      const parsed = await parseMultipart(req);
      formData = parsed.fields;
      files = parsed.files;
    } else {
      // JSON body
      formData = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    }

    const formType = formData.form_type || 'unknown';
    delete formData.form_type;

    // Verify Turnstile CAPTCHA
    const captchaToken = formData['cf-turnstile-response'] || formData.captcha_token;
    delete formData['cf-turnstile-response'];
    delete formData.captcha_token;

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const captchaResult = await verifyCaptcha(captchaToken, ip);

    if (!captchaResult.success) {
      console.warn('[FORM] CAPTCHA verification failed:', captchaResult.error);
      return res.status(400).json({ 
        error: 'Please complete the CAPTCHA verification',
        captcha_failed: true
      });
    }

    console.log('[FORM] CAPTCHA verified, processing submission');

    // Insert submission
    const result = await pool.query(
      'INSERT INTO website_submissions (submission_id, form_type, data, status, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING id',
      [
        'WEB-' + Date.now(),
        formType,
        JSON.stringify(formData),
        'new'
      ]
    );
    const submissionId = result.rows[0].id;

    // Insert attachments
    for (const file of files) {
      await pool.query(
        'INSERT INTO website_attachments (submission_id, filename, mime_type, file_size, file_data, created_at) VALUES ($1, $2, $3, $4, $5, NOW())',
        [submissionId, file.filename, file.mimeType, file.size, file.data]
      );
    }

    // Create website lead if phone is complete (fire-and-forget)
    createWebsiteLead(submissionId, formData).catch(() => {});

    res.status(200).json({ success: true, id: submissionId });
  } catch (err) {
    console.error('submit-form error:', err);
    res.status(500).json({ error: 'Submission failed' });
  }
};

module.exports.config = { api: { bodyParser: false } };
