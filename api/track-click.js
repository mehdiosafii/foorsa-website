const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const b = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const country = req.headers['x-vercel-ip-country'] || '';
    await pool.query(
      `INSERT INTO website_clicks (session_id,page_url,element_text,element_id,element_class,element_href,click_type,country)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [b.session_id,b.page_url,b.element_text,b.element_id,b.element_class,b.element_href,b.click_type,country]
    );
  } catch(e) { console.error(e); }
  res.status(200).end();
};
