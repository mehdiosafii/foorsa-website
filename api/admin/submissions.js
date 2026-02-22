const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

module.exports = async (req, res) => {
  const p = (req.query || {}).password || '';
  if (p !== (process.env.ADMIN_PASSWORD || 'FoorsaMA2026!')) return res.status(401).json({ error: 'Unauthorized' });
  const limit = Math.min(parseInt(req.query.limit) || 50, 200);
  const offset = parseInt(req.query.offset) || 0;
  try {
    const r = await pool.query('SELECT * FROM website_submissions ORDER BY created_at DESC LIMIT $1 OFFSET $2', [limit, offset]);
    const c = await pool.query('SELECT COUNT(*) as c FROM website_submissions');

    // Get attachments for these submissions
    const ids = r.rows.map(s => s.id);
    let attachMap = {};
    if (ids.length > 0) {
      const aResult = await pool.query(
        'SELECT id, submission_id, filename, mime_type, file_size, created_at FROM website_attachments WHERE submission_id = ANY($1)',
        [ids]
      );
      for (const a of aResult.rows) {
        if (!attachMap[a.submission_id]) attachMap[a.submission_id] = [];
        attachMap[a.submission_id].push({ id: a.id, filename: a.filename, mime_type: a.mime_type, file_size: a.file_size });
      }
    }

    const submissions = r.rows.map(s => ({
      ...s,
      attachments: attachMap[s.id] || []
    }));

    res.json({ total: +c.rows[0].c, submissions });
  } catch(e) { console.error(e); res.status(500).json({ error: 'Server error' }); }
};
