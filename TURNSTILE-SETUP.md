# Cloudflare Turnstile Setup Guide for foorsa.ma

## Overview
All forms on foorsa.ma now use **Cloudflare Turnstile** for CAPTCHA verification.

### Why Turnstile?
- ✅ **Completely free** (unlimited requests, no quotas)
- ✅ **Invisible most of the time** (better UX than hCaptcha/reCAPTCHA)
- ✅ **Privacy-friendly** (GDPR compliant, no tracking)
- ✅ **Fast** (Cloudflare's global network)
- ✅ **No user frustration** (minimal challenges)
- ✅ **Easy setup** (5 minutes)

---

## Quick Setup

### Step 1: Get Turnstile Keys
1. **Log in to Cloudflare:** https://dash.cloudflare.com/
2. **Go to Turnstile:** Click on your account → **Turnstile**
   - Or direct link: https://dash.cloudflare.com/?to=/:account/turnstile
3. **Add Site:**
   - Click **"Add Site"**
   - **Domain:** `foorsa.ma`
   - **Widget Mode:** Managed (recommended)
   - Click **"Create"**
4. **Copy Keys:**
   - **Site Key** (starts with `0x4...`)
   - **Secret Key** (starts with `0x4...`)

### Step 2: Configure Backend (Vercel)
1. Go to: https://vercel.com/foorsa/foorsa-website/settings/environment-variables
2. Add environment variable:
   - **Name:** `TURNSTILE_SECRET`
   - **Value:** Your secret key from Turnstile
   - **Environments:** Production, Preview, Development
3. Click **"Save"**
4. Redeploy (happens automatically on next push)

### Step 3: Configure Frontend
Edit `js/form-handler.js` line 3:
```javascript
const TURNSTILE_SITE_KEY = '0x4AAAAAAA...'; // Replace with your real site key
```

### Step 4: Deploy
```bash
cd /data/.openclaw/workspace/foorsa-website
git add js/form-handler.js
git commit -m "Add real Turnstile site key"
git push origin main
```

---

## Testing

### Test Mode (Current)
The site currently uses Turnstile's **dummy test keys**:
- **Site Key:** `1x00000000000000000000AA`
- **Secret:** `1x0000000000000000000000000000000AA`

**Behavior:**
- ✅ Always passes verification
- 🔧 Shows "Turnstile Dummy" message
- ⚠️ **NOT for production**

### Production Testing
After configuring real keys:
1. Visit: https://foorsa.ma/en/contact.html
2. Fill out form
3. Complete CAPTCHA (usually just a checkbox)
4. Submit
5. Should see success message

### Debug Checklist
If not working:
- [ ] Verify site key in `js/form-handler.js`
- [ ] Verify secret key in Vercel environment variables
- [ ] Check browser console (F12) for errors
- [ ] Hard refresh (Ctrl+Shift+R) to clear cache
- [ ] Verify domain `foorsa.ma` is added in Turnstile dashboard

---

## How It Works

### User Experience
1. User fills form
2. Turnstile widget appears (usually just checkbox)
3. User clicks checkbox (or it auto-completes)
4. User submits form
5. ✅ Success!

**In most cases:** Users just see a checkbox, no puzzles!

### Technical Flow
```
User fills form
    ↓
Turnstile widget loads (auto or click)
    ↓
Frontend validates token exists
    ↓
POST to /api/submit-form
    ↓
Backend verifies with Cloudflare API
    ↓
✅ Valid → Save to database
❌ Invalid → Show error
```

---

## Protected Forms

All forms on foorsa.ma:
- ✅ Contact forms (EN/FR/AR)
- ✅ Partner applications
- ✅ Job applications
- ✅ Review submissions

---

## Customization

### Widget Appearance
Edit `js/form-handler.js` → `addCaptchaWidget()`:

**Theme:**
```javascript
captchaDiv.setAttribute('data-theme', 'dark'); // or 'light' or 'auto'
```

**Size:**
```javascript
captchaDiv.setAttribute('data-size', 'compact'); // or 'normal' or 'flexible'
```

**Language:**
```javascript
captchaDiv.setAttribute('data-language', 'fr'); // French
captchaDiv.setAttribute('data-language', 'ar'); // Arabic
```

### Widget Mode
In Cloudflare dashboard:
- **Managed (recommended):** Cloudflare decides when to show challenges
- **Non-Interactive:** Invisible, no user interaction
- **Invisible:** Hidden until needed

---

## Monitoring

### Dashboard
View analytics: https://dash.cloudflare.com/?to=/:account/turnstile

**Metrics:**
- 📊 Solve rate
- 🤖 Bot detection
- 📈 Daily requests
- ⏱️ Average solve time

### Notifications
Set up alerts for:
- High bot traffic
- Unusual patterns
- API errors

---

## Troubleshooting

### Widget Not Showing
**Cause:** Script blocked or failed to load  
**Fix:**
- Check console for errors
- Verify Cloudflare not blocked
- Try incognito mode

### Always Fails Verification
**Cause:** Wrong secret key  
**Fix:**
- Check `TURNSTILE_SECRET` in Vercel matches dashboard
- Verify domain in Turnstile dashboard

### "Invalid domain" Error
**Cause:** Domain not whitelisted  
**Fix:**
- Add `foorsa.ma` in Turnstile dashboard
- Add `www.foorsa.ma` if needed
- Add `localhost` for local testing

---

## Migration from hCaptcha

✅ Already migrated! Changes included:
- Updated script URL to Cloudflare
- Changed widget class to `cf-turnstile`
- Updated response field to `cf-turnstile-response`
- Updated verification API endpoint

---

## Security Notes

⚠️ **Best Practices:**
- ✅ Use environment variables for secrets
- ✅ Never commit secrets to git
- ✅ Rotate keys if compromised
- ✅ Monitor dashboard regularly
- ❌ Don't use test keys in production

---

## Support

- 📖 Docs: https://developers.cloudflare.com/turnstile/
- 💬 Community: https://community.cloudflare.com/
- 📧 Support: support@cloudflare.com

---

## Current Status

✅ Turnstile implemented  
⏳ Using test keys  
⏳ Awaiting real keys

**Next Steps:**
1. Get Cloudflare account
2. Add site in Turnstile
3. Copy site key and secret
4. Update configuration
5. Deploy and test

---

## Comparison: Turnstile vs Others

| Feature | Turnstile | hCaptcha | reCAPTCHA |
|---------|-----------|----------|-----------|
| **Cost** | Free (unlimited) | Free (1M/mo) | Free (1M/mo) |
| **Privacy** | ✅ GDPR | ✅ GDPR | ❌ Google tracking |
| **UX** | ⭐⭐⭐⭐⭐ Invisible | ⭐⭐⭐ Image challenges | ⭐⭐⭐ Image challenges |
| **Speed** | ⚡ Fast (Cloudflare) | ⚡ Fast | 🐌 Slow |
| **Setup** | 🟢 Easy | 🟢 Easy | 🟡 Medium |
| **Accuracy** | ✅ High | ✅ High | ✅ High |

**Winner:** Cloudflare Turnstile 🏆
