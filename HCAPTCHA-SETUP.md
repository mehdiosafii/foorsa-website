# hCaptcha Setup for foorsa.ma

## Overview
All forms on foorsa.ma are now protected with hCaptcha for spam prevention and GDPR compliance.

## Setup Steps

### 1. Get hCaptcha Keys
1. Go to https://hcaptcha.com
2. Sign up / Log in
3. Add site: **foorsa.ma**
4. Get your **Site Key** and **Secret Key**

### 2. Configure Environment Variables

Add to Vercel environment variables:
```
HCAPTCHA_SECRET=your_secret_key_here
```

### 3. Update Site Key

Edit `js/form-handler.js` line 3:
```javascript
const HCAPTCHA_SITE_KEY = 'your_site_key_here'; // Replace with real key
```

Current value is a **test key** - forms will work but with a dummy CAPTCHA.

### 4. Test Forms

Test all form types:
- Contact form (contact.html)
- Partner form (about-us.html partner section)
- Application forms (index.html)
- Review submission (index.html)

## Files Modified

- `api/verify-captcha.js` - Backend verification (uses HCAPTCHA_SECRET)
- `api/submit-form.js` - Form handler with CAPTCHA check
- `js/form-handler.js` - Frontend widget injection and token submission
- All HTML pages (index, contact, about-us in en/fr/ar) - Script loaded

## How It Works

1. **User loads page** → hCaptcha script loads
2. **User fills form** → CAPTCHA widget appears above submit button
3. **User completes CAPTCHA** → Token generated
4. **User submits form** → Token sent to `/api/submit-form`
5. **Backend verifies** → Token checked with hCaptcha API
6. **Success/Fail** → Form processed or error shown

## Privacy & GDPR

hCaptcha is GDPR-compliant and privacy-friendly:
- No personal data tracking
- No ads or behavioral profiling
- EU-based servers available

## Fallback

If CAPTCHA verification fails:
- User sees: "✕ CAPTCHA verification failed. Please try again."
- CAPTCHA widget resets automatically
- User can retry immediately

## Monitoring

Backend logs CAPTCHA events:
- `[CAPTCHA] hCaptcha verification successful`
- `[CAPTCHA] hCaptcha verification failed`
- `[CAPTCHA] HCAPTCHA_SECRET not configured`

Check Vercel logs for issues.
