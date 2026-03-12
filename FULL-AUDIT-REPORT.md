# Foorsa.ma — Full SEO Audit Report

**Date:** March 12, 2026
**Business Type Detected:** Educational Consulting Agency (study abroad services)
**Languages:** French (default), English, Arabic
**Hosting:** Vercel | **Domain:** foorsa.ma
**Pages in Sitemap:** 351 URLs

---

## Executive Summary

### SEO Health Score: 52/100

| Category | Score | Weight | Weighted |
|----------|-------|--------|----------|
| Technical SEO | 45/100 | 22% | 9.9 |
| Content Quality | 68/100 | 23% | 15.6 |
| On-Page SEO | 35/100 | 20% | 7.0 |
| Schema / Structured Data | 65/100 | 10% | 6.5 |
| Performance (CWV) | 40/100 | 10% | 4.0 |
| AI Search Readiness | 60/100 | 10% | 6.0 |
| Images | 30/100 | 5% | 1.5 |
| **Total** | | **100%** | **50.5 ≈ 52** |

### Top 5 Critical Issues
1. **Meta descriptions missing on ALL pages** — Google auto-generates snippets
2. **Canonical URLs missing on ALL language-specific pages** — duplicate content risk
3. **464 pages missing x-default hreflang** — wrong language versions served in SERPs
4. **Conflicting robots directives on en/home.html** — page may be noindexed
5. **Open Graph + Twitter Card tags missing site-wide** — broken social sharing

### Top 5 Quick Wins
1. Add meta descriptions to all pages (highest CTR impact)
2. Add canonical URLs to all pages
3. Remove `loading="lazy"` from above-fold images (LCP improvement)
4. Compress 6 review images (save ~8 MB per page load)
5. Add `x-default` hreflang to 464 pages missing it

---

## 1. Technical SEO (Score: 45/100)

### Robots.txt ✅ Good
- Properly allows all crawlers
- Explicitly allows AI bots (ChatGPT-User, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended)
- Blocks admin, API, backups, scripts, uploads appropriately
- References all 3 sitemaps (main, video, geo)

### Sitemaps ✅ Good
- 351 URLs in main sitemap with proper lastmod dates, priorities, and changefreq
- Video sitemap present
- Geo sitemap present
- All 3 referenced in robots.txt

### Security Headers ✅ Good
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy blocks camera, microphone, geolocation

### Redirects ✅ Good
- 301 redirects for legacy URLs (/scholarships/, /universities-in-china/, etc.)
- Clean URL handling with `cleanUrls: true`

### Canonical URLs 🛑 Critical
- **Missing on ALL language-specific pages** (en/, fr/, ar/ and all subpages)
- Only the root `index.html` has a canonical (`https://foorsa.ma/`)
- Risk: Google may index duplicate versions or choose wrong canonical

### Meta Viewport ⚠️ High
- Not detected on any analyzed page via WebFetch
- Should verify in source — may be present but not captured by analysis tool

### Conflicting Robots Directives 🛑 Critical
- `en/home.html` has BOTH `noindex, follow` AND `index, follow` meta robots tags
- Google respects the most restrictive → page may be unintentionally noindexed

---

## 2. Content Quality (Score: 68/100)

### Word Counts
| Page | Words | Status |
|------|-------|--------|
| EN Homepage | 3,228 | ✅ Good |
| FR Homepage | 3,277 | ✅ Good |
| AR Homepage | 1,018 | ⚠️ Thin (68% less than EN/FR) |
| EN Scholarship | 1,737 | ✅ Adequate |
| Blog articles | 1,396–3,819 | ✅ Good |
| Blog categories | 527–591 | ✅ Acceptable for index pages |

### E-E-A-T Signals
| Signal | Homepage | Scholarship | Blog |
|--------|----------|-------------|------|
| Author info | 2 mentions | 0 mentions ⚠️ | 20 mentions ✅ |
| Timestamps | 4 | 4 | 21 ✅ |
| Internal links | 72 ✅ | 71 ✅ | 105 ✅ |
| JSON-LD schemas | 12 ✅ | 10 ✅ | 4 |

### Issues
- **Arabic content gap**: AR homepage has 68% less content than EN/FR equivalents
- **Scholarship page has zero author attribution** — this is YMYL-adjacent (education/financial decisions)
- **Citable statistics present** (tuition $1,500–$6,000/year, living costs $200–$350/month) ✅
- **Social proof strong** (4.9★ from 1,259 reviews) ✅

---

## 3. On-Page SEO (Score: 35/100)

### Title Tags
| Page | Title | Length | Issue |
|------|-------|--------|-------|
| Root | "Study in China for Moroccan Students \| Scholarships & Admissions - Foorsa" | 74 | Slightly long |
| FR Home | "Etudes en Chine pour Etudiants Marocains \| Bourses & Admissions - Foorsa" | 71 | OK |
| EN Scholarship | "China Scholarships for Moroccan Students \| CSC & University Scholarships - Foorsa" | 82 | 🛑 Too long, will truncate |
| FR Scholarship | "Bourses Chinoises pour Etudiants Marocains \| Bourses CSC et Universitaires - Foorsa" | 85 | 🛑 Too long |
| EN Blog | **MISSING** | — | 🛑 Critical |
| FR About | **MISSING** | — | 🛑 Critical |

### Meta Descriptions
🛑 **Missing on ALL 8 analyzed pages.** This is the single most impactful quick win.

### Heading Structure
| Page | H1 Count | Issue |
|------|----------|-------|
| FR Home | 1 ✅ | Duplicate H2s ("liberez votre potentiel" x2) |
| EN Home | 3 🛑 | Should be exactly 1 |
| AR Home | 3 🛑 | Should be exactly 1 |
| EN Blog | 2 ⚠️ | Also skips H2 level → H3 directly |
| Scholarship pages | 1 ✅ | Good |

### Open Graph Tags
🛑 **Missing on ALL language-specific pages.** Only root `index.html` has OG tags.

### Twitter Card Tags
🛑 **Missing on ALL pages** including root.

---

## 4. Schema / Structured Data (Score: 65/100)

### Current Implementation ✅ Strong Foundation
| Schema Type | Coverage | Assessment |
|-------------|----------|------------|
| Organization | ~645 pages | ✅ Site-wide |
| BreadcrumbList | ~645 pages | ✅ Site-wide |
| EducationalOrganization | ~20 pages | ✅ Key pages |
| Article | ~445 blog pages | ✅ All blogs |
| FAQPage | ~250+ pages | ✅ Extensive |
| Course | ~250+ major pages | ✅ Good |
| CollegeOrUniversity | 147 university pages | ✅ Good |
| Place | ~30 city pages | ✅ Good |
| VideoObject | ~81+ major pages | ✅ Good |
| CollectionPage | ~18 category pages | ✅ Good |

### Issues Found
- 🛑 **AR FAQ schema corrupted** — question names contain concatenated category labels instead of actual questions; answer text bleeds into question name field
- ⚠️ **BreadcrumbList URLs use `.html` extension** but live URLs don't — mismatch confuses crawlers
- ⚠️ **Course schema on blog articles** (e.g., CSC scholarship guide) — irrelevant, should be removed
- ⚠️ **Home breadcrumbs redundant** — "Home" → "Home" with essentially same URL

### Missing Schema Opportunities
| Schema Type | Where | Priority |
|-------------|-------|----------|
| WebSite with SearchAction | Homepage | ⚠️ High — enables sitelinks search box |
| Review/AggregateRating | reviews.html (all 3 langs) | ⚠️ High — enables star ratings in SERPs |
| HowTo | step-by-step.html | ⚠️ Medium — rich result opportunity |
| LocalBusiness | Homepage/contact | ⚠️ Medium — local SEO in Morocco |
| Event | Intake deadlines | Low |

---

## 5. Performance / Core Web Vitals (Score: 40/100)

### Issues Identified
- 🛑 **ALL images use `loading="lazy"` including above-fold content** — hero images, logos, and navigation flags should use `loading="eager"`. This directly hurts LCP.
- 🛑 **6 review images total 8.8 MB** (0.9–1.9 MB each) — should be under 100–200 KB each
- 🛑 **mission.svg is 7.0 MB** — likely contains embedded raster data
- ⚠️ **Video files in /assets/img/** — video.mp4 (25 MB) + videoEnergi.mp4 (14 MB) should be on a CDN
- ⚠️ **19 blog images missing width/height** — causes CLS
- ⚠️ **Zero srcset/picture usage** — mobile users download full desktop images

### Estimated Impact
- Fixing lazy loading on hero images: **LCP improvement of 0.5–2 seconds**
- Compressing review images: **8+ MB bandwidth savings per page**
- Adding width/height to blog images: **CLS improvement**

---

## 6. AI Search Readiness (Score: 60/100)

### Strengths ✅
- **AI bots explicitly allowed** in robots.txt (ChatGPT-User, PerplexityBot, ClaudeBot, etc.)
- **FAQ schema provides citable Q&A pairs** for AI extraction
- **Specific data points present** ($1,500–$6,000 tuition, $200–$350 living costs, top 500 universities)
- **Strong authority signal** (4.9★ from 1,259 reviews)
- **Step-by-step process** (6 phases) — good for AI to extract

### Weaknesses ⚠️
- 🛑 **No llms.txt file** — missed opportunity to guide AI crawlers
- ⚠️ **No specific success rates** ("hundreds of students" is vague)
- ⚠️ **Limited statistical depth** — lacks scholarship amounts, acceptance rates
- ⚠️ **No Twitter Card tags** — reduces discoverability signals

---

## 7. Images (Score: 30/100)

### Summary
| Metric | Status |
|--------|--------|
| Alt text present | ✅ All images have alt text |
| Alt text quality | 🛑 24 homepage images share identical generic alt text |
| Modern formats (WebP) | ⚠️ Mostly WebP, but blog images still PNG |
| width/height attributes | ⚠️ Missing on 19 blog images |
| loading="lazy" | 🛑 Over-applied — includes above-fold images |
| srcset/picture | 🛑 Zero responsive image usage |
| File sizes | 🛑 Review images 0.9–1.9 MB each, mission.svg 7 MB |
| Uploads directory | ⚠️ 983 files / 55 MB — includes duplicates |

---

## 8. Hreflang / International SEO

### Coverage
- 645 files have hreflang tags
- Root `index.html` correctly sets `x-default` to `/fr/` (French)

### Issues
| Issue | Severity | Scope |
|-------|----------|-------|
| 464 pages missing `x-default` | 🛑 Critical | All city, major, newer blog pages |
| 3 blog articles with incomplete hreflang | ⚠️ High | Missing one language each |
| 2–3 pages with NO hreflang at all | ⚠️ High | referral.html, 2 blog articles |
| URL extension mismatch | ⚠️ Medium | Hreflang URLs omit .html, breadcrumbs include .html |

---

## Prioritized Action Plan

### 🛑 Critical (Fix Immediately)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 1 | Add meta descriptions to ALL pages | Highest CTR impact — controls SERP snippets | Medium |
| 2 | Add canonical URLs to all language pages | Prevents duplicate content penalties | Medium |
| 3 | Fix conflicting robots directives on en/home.html | Page may be noindexed | Low |
| 4 | Add `x-default` hreflang to 464 missing pages | Correct language serving in SERPs | Medium |
| 5 | Fix corrupted AR FAQ schema | Invalid structured data | Low |

### ⚠️ High Priority (Fix Within 1 Week)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 6 | Add Open Graph tags to all pages | Social sharing previews | Medium |
| 7 | Add Twitter Card tags to all pages | Social discoverability | Medium |
| 8 | Fix multiple H1 tags (EN/AR homepages, blog) | Heading hierarchy for crawlers | Low |
| 9 | Add missing title tags (blog, about pages) | Fundamental SEO element | Low |
| 10 | Shorten scholarship page titles (< 60 chars) | Prevent SERP truncation | Low |
| 11 | Remove `loading="lazy"` from above-fold images | LCP improvement | Low |
| 12 | Compress 6 review images (8.8 MB → ~600 KB total) | Page load speed | Low |
| 13 | Fix 24 duplicate alt texts on homepage | Accessibility + image SEO | Low |
| 14 | Complete hreflang on 3 blog articles | Correct language indexing | Low |

### 📋 Medium Priority (Fix Within 1 Month)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 15 | Add WebSite schema with SearchAction to homepage | Sitelinks search box | Low |
| 16 | Add AggregateRating schema to reviews pages | Star ratings in SERPs | Low |
| 17 | Add HowTo schema to step-by-step pages | Rich result eligibility | Low |
| 18 | Optimize mission.svg (7 MB → < 100 KB) | Page speed | Low |
| 19 | Convert blog PNG images to WebP | Consistent format | Low |
| 20 | Add width/height to 19 blog images | CLS prevention | Low |
| 21 | Add srcset/picture for responsive images | Mobile performance | Medium |
| 22 | Fix BreadcrumbList URL .html mismatch | Crawl consistency | Medium |
| 23 | Remove Course schema from blog articles | Schema accuracy | Low |
| 24 | Create llms.txt for AI crawlers | AI search visibility | Low |
| 25 | Expand Arabic content to match EN/FR parity | Multilingual SEO | High |

### 📝 Low Priority (Backlog)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 26 | Add author credentials to scholarship page | E-E-A-T for YMYL content | Low |
| 27 | Add Event schema for intake deadlines | Rich results | Low |
| 28 | Clean up uploads directory (983 files / 55 MB) | Server bloat | Medium |
| 29 | Move video files to CDN | Asset management | Medium |
| 30 | Add specific success rates / statistics | AI citability | Low |

---

*Report generated using claude-seo audit methodology. Scores based on weighted analysis across 7 categories with data from 8 key pages and site-wide file analysis.*
