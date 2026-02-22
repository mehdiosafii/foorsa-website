const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

function parseUA(ua) {
  ua = ua || '';
  let device = 'desktop', browser = 'Other', os = 'Other';
  if (/mobile|android.*mobile|iphone|ipod/i.test(ua)) device = 'mobile';
  else if (/tablet|ipad|android(?!.*mobile)/i.test(ua)) device = 'tablet';
  if (/edg/i.test(ua)) browser = 'Edge';
  else if (/chrome|crios/i.test(ua)) browser = 'Chrome';
  else if (/firefox|fxios/i.test(ua)) browser = 'Firefox';
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Safari';
  else if (/opera|opr/i.test(ua)) browser = 'Opera';
  if (/windows/i.test(ua)) os = 'Windows';
  else if (/macintosh|mac os/i.test(ua)) os = 'macOS';
  else if (/linux/i.test(ua)) os = 'Linux';
  else if (/android/i.test(ua)) os = 'Android';
  else if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS';
  return { device, browser, os };
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const b = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { device, browser, os } = parseUA(b.user_agent);
    const country = req.headers['x-vercel-ip-country'] || '';
    const city = req.headers['x-vercel-ip-city'] || '';
    const region = req.headers['x-vercel-ip-country-region'] || '';
    const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim();
    await pool.query(
      `INSERT INTO website_visits (session_id,page_url,referrer,utm_source,utm_medium,utm_campaign,country,city,region,device_type,browser,os,screen_width,screen_height,language,ip_address)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)`,
      [b.session_id,b.page_url,b.referrer,b.utm_source,b.utm_medium,b.utm_campaign,country,city,region,device,browser,os,b.screen_width,b.screen_height,b.language,ip]
    );
  } catch(e) { console.error(e); }
  res.status(200).end();
};
