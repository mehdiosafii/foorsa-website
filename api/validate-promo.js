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
    const { code } = req.body || {};
    if (!code) return res.json({ valid: false, error: 'No code provided' });

    const db = getPool();
    const { rows } = await db.query(`
      SELECT * FROM promo_codes 
      WHERE code = $1 
      AND is_active = TRUE
      AND (valid_from IS NULL OR valid_from <= CURRENT_TIMESTAMP)
      AND (valid_until IS NULL OR valid_until >= CURRENT_TIMESTAMP)
      AND (max_uses IS NULL OR current_uses < max_uses)
    `, [code.toUpperCase()]);

    if (rows.length > 0) {
      const promo = rows[0];
      return res.json({
        valid: true,
        discount_type: promo.discount_type,
        discount_value: parseFloat(promo.discount_value),
        min_purchase: parseFloat(promo.min_purchase)
      });
    }
    res.json({ valid: false, error: 'Invalid or expired promo code' });
  } catch (err) {
    console.error('Promo validation error:', err.message);
    res.status(500).json({ valid: false, error: 'Server error' });
  }
};
