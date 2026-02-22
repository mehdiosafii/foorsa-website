const { Pool } = require('pg');

let pool;
function getPool() {
  if (!pool) pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 2 });
  return pool;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { submission_id, status, treated } = req.body || {};
    if (!submission_id) return res.status(400).json({ error: 'Missing submission_id' });

    const db = getPool();

    if (treated !== undefined) {
      await db.query(`
        UPDATE website_submissions 
        SET treated = $1, treated_at = $2, updated_at = NOW()
        WHERE submission_id = $3
      `, [treated, treated ? new Date().toISOString() : null, submission_id]);
      return res.json({ success: true });
    }

    if (status && ['paid', 'pending'].includes(status)) {
      await db.query(`
        UPDATE website_submissions SET status = $1, updated_at = NOW() WHERE submission_id = $2
      `, [status, submission_id]);
      return res.json({ success: true });
    }

    res.status(400).json({ error: 'Invalid request' });
  } catch (err) {
    console.error('Update status error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};
