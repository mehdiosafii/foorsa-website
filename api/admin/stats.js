const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

function auth(req) {
  const p = (req.query || {}).password || '';
  return p === (process.env.ADMIN_PASSWORD || 'Foorsa2026!Reset');
}

function periodWhere(period) {
  if (period === 'today') return "created_at >= CURRENT_DATE";
  if (period === '30d') return "created_at >= NOW() - INTERVAL '30 days'";
  if (period === 'all') return "1=1";
  return "created_at >= NOW() - INTERVAL '7 days'";
}

module.exports = async (req, res) => {
  if (!auth(req)) return res.status(401).json({ error: 'Unauthorized' });
  const w = periodWhere(req.query.period);
  try {
    const [visits, sessions, today, pages, refs, countries, devices, browsers, utms, clicks, clickEls, byDay, byHour] = await Promise.all([
      pool.query(`SELECT COUNT(*) as c FROM website_visits WHERE ${w}`),
      pool.query(`SELECT COUNT(DISTINCT session_id) as c FROM website_visits WHERE ${w}`),
      pool.query(`SELECT COUNT(*) as c FROM website_visits WHERE created_at >= CURRENT_DATE`),
      pool.query(`SELECT page_url, COUNT(*) as count FROM website_visits WHERE ${w} GROUP BY page_url ORDER BY count DESC LIMIT 10`),
      pool.query(`SELECT COALESCE(NULLIF(referrer,''),'Direct') as referrer, COUNT(*) as count FROM website_visits WHERE ${w} GROUP BY referrer ORDER BY count DESC LIMIT 10`),
      pool.query(`SELECT COALESCE(NULLIF(country,''),'Unknown') as country, COUNT(*) as count FROM website_visits WHERE ${w} GROUP BY country ORDER BY count DESC LIMIT 15`),
      pool.query(`SELECT device_type, COUNT(*) as count FROM website_visits WHERE ${w} GROUP BY device_type ORDER BY count DESC`),
      pool.query(`SELECT browser, COUNT(*) as count FROM website_visits WHERE ${w} GROUP BY browser ORDER BY count DESC LIMIT 8`),
      pool.query(`SELECT COALESCE(NULLIF(utm_source,''),'(none)') as utm_source, COUNT(*) as count FROM website_visits WHERE ${w} AND utm_source!='' GROUP BY utm_source ORDER BY count DESC LIMIT 10`),
      pool.query(`SELECT COUNT(*) as c FROM website_clicks WHERE ${w}`),
      pool.query(`SELECT element_text, COUNT(*) as count FROM website_clicks WHERE ${w} GROUP BY element_text ORDER BY count DESC LIMIT 10`),
      pool.query(`SELECT created_at::date as date, COUNT(*) as count FROM website_visits WHERE ${w} GROUP BY date ORDER BY date`),
      pool.query(`SELECT EXTRACT(HOUR FROM created_at) as hour, COUNT(*) as count FROM website_visits WHERE ${w} GROUP BY hour ORDER BY hour`),
    ]);
    res.json({
      visits: { total: +visits.rows[0].c, unique_sessions: +sessions.rows[0].c, today: +today.rows[0].c },
      top_pages: pages.rows, top_referrers: refs.rows, countries: countries.rows,
      devices: devices.rows, browsers: browsers.rows, utm_sources: utms.rows,
      clicks: { total: +clicks.rows[0].c, top_elements: clickEls.rows },
      visits_by_day: byDay.rows, visits_by_hour: byHour.rows
    });
  } catch(e) { console.error(e); res.status(500).json({ error: 'Server error' }); }
};
