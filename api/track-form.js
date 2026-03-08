const { Pool } = require('pg');

let pool;
function getPool() {
  if (!pool) pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 2, ssl: { rejectUnauthorized: false } });
  return pool;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { session_id, form_type, page_url, fields } = req.body || {};
    if (!session_id || !form_type) {
      return res.status(400).json({ error: 'Missing session_id or form_type' });
    }

    const db = getPool();

    await db.query(`
      CREATE TABLE IF NOT EXISTS website_form_tracking (
        id SERIAL PRIMARY KEY,
        session_id VARCHAR(100) NOT NULL,
        form_type VARCHAR(50) NOT NULL,
        page_url VARCHAR(500),
        fields JSONB NOT NULL DEFAULT '{}',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // Upsert by session_id + form_type: merge new fields into existing
    const result = await db.query(`
      INSERT INTO website_form_tracking (session_id, form_type, page_url, fields, updated_at)
      VALUES ($1, $2, $3, $4, NOW())
      ON CONFLICT ON CONSTRAINT website_form_tracking_session_form
      DO UPDATE SET fields = website_form_tracking.fields || $4, page_url = COALESCE($3, website_form_tracking.page_url), updated_at = NOW()
      RETURNING id
    `, [session_id, form_type, page_url || '', JSON.stringify(fields || {})]);

    // If the unique constraint doesn't exist yet, create it and retry
    if (!result.rows.length) {
      await db.query(`
        ALTER TABLE website_form_tracking
        ADD CONSTRAINT website_form_tracking_session_form UNIQUE (session_id, form_type)
      `).catch(() => {});

      await db.query(`
        INSERT INTO website_form_tracking (session_id, form_type, page_url, fields, updated_at)
        VALUES ($1, $2, $3, $4, NOW())
        ON CONFLICT ON CONSTRAINT website_form_tracking_session_form
        DO UPDATE SET fields = website_form_tracking.fields || $4, page_url = COALESCE($3, website_form_tracking.page_url), updated_at = NOW()
      `, [session_id, form_type, page_url || '', JSON.stringify(fields || {})]);
    }

    res.json({ success: true });
  } catch (err) {
    // If constraint doesn't exist, create it
    if (err.message && err.message.includes('website_form_tracking_session_form')) {
      try {
        const db = getPool();
        await db.query(`
          ALTER TABLE website_form_tracking
          ADD CONSTRAINT website_form_tracking_session_form UNIQUE (session_id, form_type)
        `).catch(() => {});

        const { session_id, form_type, page_url, fields } = req.body || {};
        await db.query(`
          INSERT INTO website_form_tracking (session_id, form_type, page_url, fields, updated_at)
          VALUES ($1, $2, $3, $4, NOW())
          ON CONFLICT (session_id, form_type)
          DO UPDATE SET fields = website_form_tracking.fields || $4, updated_at = NOW()
        `, [session_id, form_type, page_url || '', JSON.stringify(fields || {})]);

        return res.json({ success: true });
      } catch (retryErr) {
        console.error('Track form retry error:', retryErr.message);
      }
    }
    console.error('Track form error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};
