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

    res.json({ success: true });
  } catch (err) {
    console.error('Save submission error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};
