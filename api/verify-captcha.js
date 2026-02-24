/**
 * Cloudflare Turnstile Verification
 * Verifies CAPTCHA tokens from foorsa.ma forms
 */

const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET || '';
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

/**
 * Verify Cloudflare Turnstile token
 * @param {string} token - Turnstile response token
 * @param {string} remoteip - User's IP address (optional)
 * @returns {Promise<{success: boolean, error?: string}>}
 */
async function verifyCaptcha(token, remoteip = null) {
  if (!TURNSTILE_SECRET) {
    console.error('[CAPTCHA] TURNSTILE_SECRET not configured');
    return { success: false, error: 'CAPTCHA not configured' };
  }

  if (!token) {
    return { success: false, error: 'CAPTCHA token missing' };
  }

  try {
    const params = new URLSearchParams({
      secret: TURNSTILE_SECRET,
      response: token,
      ...(remoteip && { remoteip })
    });

    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });

    const data = await response.json();

    if (data.success) {
      console.log('[CAPTCHA] Turnstile verification successful');
      return { success: true };
    } else {
      console.warn('[CAPTCHA] Turnstile verification failed:', data['error-codes']);
      return { 
        success: false, 
        error: 'CAPTCHA verification failed' 
      };
    }
  } catch (error) {
    console.error('[CAPTCHA] Verification error:', error);
    return { 
      success: false, 
      error: 'CAPTCHA verification error' 
    };
  }
}

/**
 * Express middleware to verify CAPTCHA before form submission
 */
function requireCaptcha(req, res, next) {
  const token = req.body['h-captcha-response'] || req.body.captcha_token;
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  verifyCaptcha(token, ip).then(result => {
    if (result.success) {
      next();
    } else {
      res.status(400).json({ 
        error: result.error || 'Please complete the CAPTCHA verification',
        captcha_failed: true
      });
    }
  }).catch(error => {
    console.error('[CAPTCHA] Middleware error:', error);
    res.status(500).json({ 
      error: 'CAPTCHA verification failed',
      captcha_failed: true
    });
  });
}

module.exports = { verifyCaptcha, requireCaptcha };
