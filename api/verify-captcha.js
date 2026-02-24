/**
 * hCaptcha Verification
 * Verifies CAPTCHA tokens from foorsa.ma forms
 */

const HCAPTCHA_SECRET = process.env.HCAPTCHA_SECRET || '';
const HCAPTCHA_VERIFY_URL = 'https://hcaptcha.com/siteverify';

/**
 * Verify hCaptcha token
 * @param {string} token - hCaptcha response token
 * @param {string} remoteip - User's IP address (optional)
 * @returns {Promise<{success: boolean, error?: string}>}
 */
async function verifyCaptcha(token, remoteip = null) {
  if (!HCAPTCHA_SECRET) {
    console.error('[CAPTCHA] HCAPTCHA_SECRET not configured');
    return { success: false, error: 'CAPTCHA not configured' };
  }

  if (!token) {
    return { success: false, error: 'CAPTCHA token missing' };
  }

  try {
    const params = new URLSearchParams({
      secret: HCAPTCHA_SECRET,
      response: token,
      ...(remoteip && { remoteip })
    });

    const response = await fetch(HCAPTCHA_VERIFY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });

    const data = await response.json();

    if (data.success) {
      console.log('[CAPTCHA] hCaptcha verification successful');
      return { success: true };
    } else {
      console.warn('[CAPTCHA] hCaptcha verification failed:', data['error-codes']);
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
