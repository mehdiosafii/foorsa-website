# hCaptcha Setup Guide for foorsa.ma

## Overview
All forms on foorsa.ma now require CAPTCHA verification to prevent spam and bot submissions.

We use **hCaptcha** (not Google reCAPTCHA) because:
- ✅ GDPR compliant
- ✅ Privacy-friendly (no user tracking)
- ✅ Free tier (1M requests/month)
- ✅ Better accessibility
- ✅ Pays publishers (unlike reCAPTCHA)

---

## Setup Steps

### 1. Create hCaptcha Account
1. Go to: https://dashboard.hcaptcha.com/signup
2. Sign up with your email
3. Verify email

### 2. Add Site
1. Go to: https://dashboard.hcaptcha.com/sites
2. Click **"New Site"**
3. Fill in:
   - **Domain:** `foorsa.ma`
   - **Additional domains:** `www.foorsa.ma`, `localhost` (for testing)
   - **Difficulty:** Select "Easy" (recommended for legitimate users)
4. Click **"Add Site"**

### 3. Get Your Keys
You'll see two keys:
- **Site Key** (public) - Used in frontend JavaScript
- **Secret Key** (private) - Used in backend API

### 4. Configure Backend (Vercel)
1. Go to: https://vercel.com/foorsa/foorsa-website/settings/environment-variables
2. Add environment variable:
   - **Name:** `HCAPTCHA_SECRET`
   - **Value:** Your secret key from hCaptcha dashboard
   - **Environment:** Production, Preview, Development
3. Click **Save**
4. Redeploy to apply changes

### 5. Configure Frontend
Edit `/js/form-handler.js`:
```javascript
// Replace this line (line 3):
const HCAPTCHA_SITE_KEY = '10000000-ffff-ffff-ffff-000000000001'; // Test key

// With your real site key:
const HCAPTCHA_SITE_KEY = 'YOUR_SITE_KEY_HERE';
```

### 6. Deploy
```bash
git add -A
git commit -m "Configure hCaptcha with real site key"
git push origin main
```

---

## Testing

### Test Mode
The current configuration uses hCaptcha's test keys:
- **Site Key:** `10000000-ffff-ffff-ffff-000000000001`
- **Secret:** `0x0000000000000000000000000000000000000000`

In test mode:
- ✅ Always passes verification
- ⚠️ Shows "hCaptcha Dummy Test Key" message
- 🔴 NOT for production use

### Production Testing
After configuring real keys:
1. Visit any form on foorsa.ma:
   - Contact form: https://foorsa.ma/en/contact.html
   - Partner form: (if exists)
   - Application form: (if exists)
2. Fill in form fields
3. Complete CAPTCHA challenge
4. Submit form
5. Should see success message

### Debugging
Check browser console (F12) for errors:
```javascript
// CAPTCHA not loaded
Error: hcaptcha is not defined

// Solution: Check if script is loaded
console.log(typeof window.hcaptcha); // Should be 'object'

// CAPTCHA verification failed
Error: CAPTCHA token missing

// Solution: Complete CAPTCHA before submitting
```

---

## Forms Protected

All forms on foorsa.ma are automatically protected:
- ✅ Contact forms (EN/FR/AR)
- ✅ Partner application forms
- ✅ Job application forms
- ✅ Review submission forms
- ✅ General inquiry forms

**Note:** Search forms and FAQ filters are NOT protected (no need for spam prevention).

---

## Customization

### Change Difficulty
In hCaptcha dashboard → Site Settings:
- **Easy:** Fewer challenges (recommended)
- **Moderate:** Balance
- **Difficult:** Maximum protection (may frustrate users)

### Change Theme
Edit `js/form-handler.js` → `addCaptchaWidget()`:
```javascript
captchaDiv.setAttribute('data-theme', 'dark'); // or 'light'
```

### Change Size
```javascript
captchaDiv.setAttribute('data-size', 'compact'); // or 'normal'
```

### Custom Text
```javascript
captchaDiv.setAttribute('data-language', 'fr'); // French
captchaDiv.setAttribute('data-language', 'ar'); // Arabic
```

---

## Monitoring

### Dashboard
View stats at: https://dashboard.hcaptcha.com/overview

Metrics:
- 📊 Requests per day
- ✅ Pass rate
- ❌ Fail rate
- 🤖 Bot detection rate

### Alerts
Set up email alerts for:
- High bot traffic
- API errors
- Quota limits

---

## Troubleshooting

### CAPTCHA Not Showing
1. Check console for JavaScript errors
2. Verify `hcaptcha.com` is not blocked by firewall
3. Clear browser cache (Ctrl+Shift+R)

### Always Failing
1. Verify secret key is correct in Vercel
2. Check domain is added in hCaptcha dashboard
3. Ensure backend API is using latest code

### Slow Loading
1. hCaptcha script is loaded async
2. Consider preconnecting:
   ```html
   <link rel="preconnect" href="https://hcaptcha.com">
   ```

---

## Migration from reCAPTCHA

If you were using reCAPTCHA before:

### Remove reCAPTCHA
```bash
# Remove reCAPTCHA scripts
grep -r "recaptcha" . --include="*.html" --include="*.js"
# Delete those lines
```

### Update API
```javascript
// Old
grecaptcha.execute()

// New
hcaptcha.execute()
```

---

## Security Notes

⚠️ **Never commit secret keys to git!**
- ✅ Use environment variables
- ✅ Add `.env` to `.gitignore`
- ❌ Don't hardcode secrets in code

⚠️ **Rotate keys periodically**
- Go to hCaptcha dashboard → Site → Settings → Rotate Keys
- Update Vercel environment variables
- Redeploy

---

## Support

- 📖 Docs: https://docs.hcaptcha.com/
- 💬 Community: https://community.hcaptcha.com/
- 📧 Support: support@hcaptcha.com

---

## Current Status

✅ CAPTCHA code implemented  
⏳ Waiting for real hCaptcha keys  
⏳ Deployment pending

**Next Steps:**
1. Create hCaptcha account
2. Get site key and secret
3. Update configuration
4. Deploy and test
