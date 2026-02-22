const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

module.exports = async (req, res) => {
  const p = (req.query || {}).password || '';
  if (p !== (process.env.ADMIN_PASSWORD || 'FoorsaMA2026!')) return res.status(401).json({ error: 'Unauthorized' });
  let w = "created_at >= NOW() - INTERVAL '7 days'";
  if (req.query.period === 'today') w = "created_at >= CURRENT_DATE";
  else if (req.query.period === '30d') w = "created_at >= NOW() - INTERVAL '30 days'";
  try {
    const r = await pool.query(`SELECT * FROM website_visits WHERE ${w} ORDER BY created_at DESC LIMIT 100`);
    res.json({ visitors: r.rows });
  } catch(e) { console.error(e); res.status(500).json({ error: 'Server error' }); }
};
