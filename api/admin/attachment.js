const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 3 });

module.exports = async (req, res) => {
  const { id, password } = req.query;
  if (password !== (process.env.ADMIN_PASSWORD || 'Foorsa2026!Reset')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  if (!id) return res.status(400).json({ error: 'Missing attachment id' });

  try {
    const result = await pool.query('SELECT filename, mime_type, file_data FROM website_attachments WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });

    const { filename, mime_type, file_data } = result.rows[0];
    const buffer = Buffer.from(file_data, 'base64');

    res.setHeader('Content-Type', mime_type || 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', buffer.length);
    res.status(200).send(buffer);
  } catch (err) {
    console.error('attachment error:', err);
    res.status(500).json({ error: 'Failed to retrieve attachment' });
  }
};
