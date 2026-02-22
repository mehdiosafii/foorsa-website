const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

const ALLOWED_MIME = ['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document','image/jpeg','image/png'];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

async function ensureAttachmentsTable() {
  await pool.query(`CREATE TABLE IF NOT EXISTS website_attachments (
    id SERIAL PRIMARY KEY,
    submission_id INT REFERENCES website_submissions(id),
    filename VARCHAR(500),
    mime_type VARCHAR(100),
    file_size INT,
    file_data TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`);
}

let tableReady = false;

function parseMultipart(req) {
  return new Promise((resolve, reject) => {
    const Busboy = require('busboy');
    const bb = Busboy({ headers: req.headers, limits: { fileSize: MAX_FILE_SIZE } });
    const fields = {};
    const files = [];
    bb.on('field', (name, val) => { fields[name] = val; });
    bb.on('file', (name, stream, info) => {
      const { filename, mimeType } = info;
      const chunks = [];
      let size = 0;
      let truncated = false;
      stream.on('data', d => { size += d.length; chunks.push(d); });
      stream.on('limit', () => { truncated = true; });
      stream.on('end', () => {
        if (truncated) return; // skip oversized
        if (!ALLOWED_MIME.includes(mimeType)) return; // skip disallowed
        files.push({ fieldName: name, filename, mimeType, size, data: Buffer.concat(chunks).toString('base64') });
      });
    });
    bb.on('finish', () => resolve({ fields, files }));
    bb.on('error', reject);
    req.pipe(bb);
  });
}

function readJSON(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end', () => {
      try { resolve(JSON.parse(Buffer.concat(chunks).toString())); }
      catch(e) { reject(e); }
    });
    req.on('error', reject);
  });
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    if (!tableReady) { await ensureAttachmentsTable(); tableReady = true; }

    let formType, data, files = [];
    const ct = req.headers['content-type'] || '';

    if (ct.includes('multipart/form-data')) {
      const parsed = await parseMultipart(req);
      formType = parsed.fields.form_type || 'unknown';
      delete parsed.fields.form_type;
      data = parsed.fields;
      files = parsed.files;
    } else {
      const body = await readJSON(req);
      formType = body.form_type || 'unknown';
      delete body.form_type;
      data = body;
    }

    const result = await pool.query(
      'INSERT INTO website_submissions (form_type, data, status, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id',
      [formType, JSON.stringify(data), 'new']
    );
    const submissionId = result.rows[0].id;

    for (const f of files) {
      await pool.query(
        'INSERT INTO website_attachments (submission_id, filename, mime_type, file_size, file_data) VALUES ($1, $2, $3, $4, $5)',
        [submissionId, f.filename, f.mimeType, f.size, f.data]
      );
    }

    res.json({ success: true, id: submissionId });
  } catch(e) {
    console.error('submit-form error:', e);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports.config = { api: { bodyParser: false } };
