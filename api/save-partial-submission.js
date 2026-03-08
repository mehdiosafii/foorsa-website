const { Pool } = require('pg');

let pool;
function getPool() {
  if (!pool) pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 2 });
  return pool;
}

/**
 * Check if a phone number is complete (not just a country code).
 */
function isCompletePhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 10;
}

/**
 * Create a website lead from partial submission if phone is complete.
 */
async function createWebsiteLeadFromPartial(db, data) {
  try {
    const phone = data.phone || '';
    if (!isCompletePhone(phone)) return;

    const name = data.name || data.full_name || 'Website Lead';
    const email = data.email || null;
    const programType = data.program_type || null;
    const pageUrl = data.page_url || null;

    // Get the submission id from the database
    const subResult = await db.query(
      'SELECT id FROM website_submissions WHERE submission_id = $1',
      [data.submission_id]
    );
    if (subResult.rows.length === 0) return;
    const submissionId = subResult.rows[0].id;

    // Check if a lead already exists for this submission
    const existing = await db.query(
      'SELECT id FROM website_leads WHERE submission_id = $1',
      [submissionId]
    );
    if (existing.rows.length > 0) return;

    // Insert into website_leads
    const leadResult = await db.query(
      `INSERT INTO website_leads (submission_id, lead_name, lead_phone, lead_email, program_type, page_url, status, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, 'new', NOW(), NOW())
       RETURNING id`,
      [submissionId, name, phone, email, programType, pageUrl]
    );
    const leadId = leadResult.rows[0].id;

    // Trigger round-robin assignment
    const assignResult = await db.query(
      `SELECT * FROM assign_lead_round_robin($1, $2, $3, $4, $5)`,
      ['website_lead', leadId, name, phone, 'website']
    );

    const assignment = assignResult.rows[0];
    if (assignment && assignment.success) {
      console.log(`[PARTIAL] Website lead ${leadId} assigned to ${assignment.assigned_to_name}`);
    } else {
      console.log(`[PARTIAL] Website lead ${leadId} needs manual assignment`);
    }
  } catch (err) {
    console.error('[PARTIAL] Error creating website lead:', err.message);
  }
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const data = req.body;
    if (!data || !data.submission_id) {
      return res.status(400).json({ error: 'No submission_id provided' });
    }

    const db = getPool();
    
    // Create table if not exists
    await db.query(`
      CREATE TABLE IF NOT EXISTS website_submissions (
        id SERIAL PRIMARY KEY,
        submission_id VARCHAR(100) UNIQUE NOT NULL,
        data JSONB NOT NULL,
        status VARCHAR(20) DEFAULT 'pending',
        treated BOOLEAN DEFAULT FALSE,
        treated_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    await db.query(`
      INSERT INTO website_submissions (submission_id, data, updated_at)
      VALUES ($1, $2, NOW())
      ON CONFLICT (submission_id) DO UPDATE SET data = $2, updated_at = NOW()
    `, [data.submission_id, JSON.stringify(data)]);

    // Create website lead if phone is complete (fire-and-forget)
    createWebsiteLeadFromPartial(db, data).catch(() => {});

    res.json({ success: true });
  } catch (err) {
    console.error('Save submission error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};
