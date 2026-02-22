const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

module.exports = async (req, res) => {
  const p = (req.query || {}).password || '';
  if (p !== (process.env.ADMIN_PASSWORD || 'FoorsaMA2026!')) return res.status(401).json({ error: 'Unauthorized' });
  const id = parseInt(req.query.id);
  if (!id) return res.status(400).json({ error: 'Missing id' });

  try {
    const r = await pool.query('SELECT * FROM website_attachments WHERE id = $1', [id]);
    if (r.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    const att = r.rows[0];
    const buf = Buffer.from(att.file_data, 'base64');
    res.setHeader('Content-Type', att.mime_type);
    res.setHeader('Content-Disposition', `attachment; filename="${att.filename}"`);
    res.setHeader('Content-Length', buf.length);
    res.end(buf);
  } catch(e) { console.error(e); res.status(500).json({ error: 'Server error' }); }
};
