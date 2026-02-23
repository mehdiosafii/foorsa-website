# Foorsa Referral Engine Integration Plan

## Goal
Merge foorsa.live (Referral Engine) into foorsa.ma to consolidate domain authority and fix SEO issues.

## Architecture
- **Main site**: Static HTML (/, /en, /fr, /ar)
- **Referral app**: React SPA (/referral)
- **API separation**: 
  - Main site APIs: `/api/*` (existing)
  - Referral APIs: `/api/referral/*` (new)

## Directory Structure After Integration
```
foorsa-website/
├── en/, fr/, ar/          # Main website (static)
├── assets/                # Main website assets
├── api/                   # Main website APIs (form submission, etc.)
├── referral/              # NEW: Referral engine
│   ├── client/           # React source
│   ├── api/              # Referral backend APIs
│   ├── dist/             # Built React app
│   ├── public/           # Referral public assets
│   ├── package.json
│   └── vite.config.ts
└── vercel.json           # Updated routing config
```

## Steps
1. [x] Copy foorsa-referral into /referral subdirectory
2. [x] Update API route paths (prefix with /referral)
3. [x] Update vercel.json routing
4. [x] Update referral app base URL
5. [x] Build and test
6. [x] Deploy to foorsa.ma
7. [x] Add foorsa.live → foorsa.ma/referral redirect

## Benefits
✅ Single domain (foorsa.ma) - consolidated SEO authority
✅ No more duplicate content between foorsa.live and foorsa.ma
✅ Unified analytics and tracking
✅ Easier maintenance (one deployment)
✅ Better user experience (seamless navigation)

## Risks & Mitigations
⚠️ API route conflicts → Use namespacing (/api/referral/*)
⚠️ Build complexity → Keep separate build processes
⚠️ Deployment size → Vercel handles well (under 10MB total)
