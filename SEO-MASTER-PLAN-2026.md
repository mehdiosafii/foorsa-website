# Foorsa.ma — 360° SEO Master Plan (March 2026)

---

## STEP 1: REPO DISCOVERY SUMMARY

### 1.1 Stack
- **Framework**: Static HTML (no framework — hand-coded HTML files)
- **Hosting**: Vercel (with serverless API functions in `/api/`)
- **Rendering**: Static (pre-rendered HTML files, no SSR/SSG build step)
- **Routing**: File-based, subfolder i18n (`/en/`, `/fr/`, `/ar/`)
- **CMS**: None detected — content lives in raw HTML files
- **Backend**: Node.js serverless functions (form submission, Stripe, tracking, captcha)
- **Database**: PostgreSQL (via `pg` package) for form submissions + visit tracking
- **Assets**: Bootstrap 5 + custom CSS + jQuery + GSAP + Swiper + Fancybox
- **Images**: Mostly `.webp` format (good)
- **Payments**: Stripe integration

### 1.2 Page Types & URL Patterns
| Page Type | URL Pattern | Languages | Count |
|-----------|-------------|-----------|-------|
| Homepage | `/{lang}/index.html` | en, fr, ar | 3 (+root) |
| About Us | `/{lang}/about-us.html` | en, fr, ar | 3 |
| Fees | `/{lang}/fees.html` | en, fr, ar | 3 |
| Scholarships | `/{lang}/scholarship.html` | en, fr, ar | 3 |
| Majors | `/{lang}/majors.html` | en, fr, ar | 3 |
| Step-by-Step | `/{lang}/step-by-step.html` | en, fr, ar | 3 |
| Documents | `/{lang}/documents.html` | en, fr, ar | 3 |
| FAQ | `/{lang}/frequently-asked-questions.html` | en, fr, ar | 3 |
| Contact | `/{lang}/contact.html` | en, fr, ar | 3 |
| Reviews | `/{lang}/reviews.html` | en, fr, ar | 3 |
| Blog Index | `/{lang}/blog/index.html` | en, fr, ar | 3 |
| Blog Articles | `/{lang}/blog/{slug}.html` | en(11), fr(5), ar(2) | 18 |
| Quiz | `/{lang}/quiz.html` | en, fr, ar | 3 |
| Shop | `/{lang}/shop.html` | en, fr, ar | 3 |
| Cart/Checkout | `/{lang}/cart.html`, `checkout.html` | en, fr, ar | 6 |
| Media | `/{lang}/media.html` | en, fr, ar | 3 |
| Legal | `/{lang}/terms-of-service.html`, `privacy-policy.html`, etc. | en, fr, ar | 12 |
| Referral | `/referral/` (React SPA) | — | 1 |

**Total indexable pages: ~72** (excluding cart/checkout/payment pages that should be noindex)

### 1.3 SEO Primitives — Current State
| Primitive | Status | Issues |
|-----------|--------|--------|
| `<title>` | Present on all pages | Good, properly localized |
| `meta description` | **DUPLICATE** on index pages (2 per page) | Critical — first is inline, second injected by SEO script |
| `meta robots` | Present, `index, follow` | Good |
| `canonical` | Present on all pages | Good, absolute URLs |
| `hreflang` | Present on index pages & some inner pages | **Inconsistent** — blog articles mostly lack cross-language hreflang |
| `OpenGraph` | Present on all pages | Good |
| `Twitter Cards` | Present on all pages | Good |
| `Structured Data` | EducationalOrganization, WebSite, Organization, BreadcrumbList, FAQPage, Article, Service | FAQPage only on EN FAQ page, missing on FR/AR |
| `sitemap.xml` | Present, 70+ URLs | **Issues**: includes noindex pages (cart, checkout, payment), duplicate blog entries, missing hreflang on most entries |
| `video-sitemap.xml` | Present | Good |
| `robots.txt` | Present | Has `Crawl-delay: 1` (unnecessary on Vercel), includes noindex pages in sitemap |
| `GA4` | Present (G-0JT7KY4DKQ) | No custom events for conversions (only on referral) |
| `GSC` | Verified via meta tag | Good |
| `Language handler` | JS-based redirect on root | **Risky** — JS redirect can confuse bots |

### 1.4 Performance Concerns
| Issue | Impact | Details |
|-------|--------|---------|
| **Massive HTML files** | LCP | index.html pages are 300-323KB each — extreme |
| **No image lazy loading** | LCP/FCP | Images loaded eagerly |
| **jQuery + GSAP + Swiper + Fancybox** | TBT/INP | Heavy JS bundle loaded on every page |
| **No `<link rel="preload">` for LCP image** | LCP | Only fonts and CSS preloaded |
| **Inline RTL CSS** | CLS | RTL styles loaded inline but only for Arabic |
| **No `loading="lazy"` on images** | LCP | Images below fold load immediately |
| **Duplicate meta descriptions** | Crawl confusion | 2 description tags per page |

### 1.5 Analytics Baseline
- GA4: `G-0JT7KY4DKQ` — present on all pages
- Custom tracking: `/api/track-visit` + `/api/track-click` via `tracker.js`
- **Missing**: No GA4 custom events for WhatsApp clicks, phone clicks, form submissions, quiz completions
- GSC: Verified
- Stripe conversion tracking: Only on referral pages

---

## A) EXECUTIVE SNAPSHOT

### Biggest Constraints
1. **Static HTML with no build system** — every change requires manual edits across 70+ files
2. **300KB+ homepage files** — extremely heavy, hurting CWV scores
3. **No CMS** — content updates are manual HTML edits, making pSEO at scale very difficult
4. **Duplicate meta descriptions** — confusing Google on every index page
5. **18 blog articles total** — thin content library for a high-intent vertical
6. **No conversion tracking in GA4** — can't measure SEO → lead pipeline

### Fastest Wins (This Week)
1. Fix duplicate meta descriptions (all index pages)
2. Fix robots.txt (remove Crawl-delay, tighten noindex rules)
3. Fix sitemap.xml (remove noindex pages, add consistent hreflang)
4. Add GA4 conversion events (form submit, WhatsApp click, phone click)
5. Add `loading="lazy"` to below-fold images

### 30/60/90-Day KPI Targets
| KPI | Baseline (assumed) | 30 Days | 60 Days | 90 Days |
|-----|-------------------|---------|---------|---------|
| GSC Impressions | ~5K/week | 7K/week | 12K/week | 20K/week |
| GSC Clicks | ~500/week | 700/week | 1.2K/week | 2K/week |
| Indexed Pages (quality) | ~50 | 55 | 80 | 120+ |
| CWV (LCP mobile) | >4s (est.) | <3.5s | <2.5s | <2.5s |
| Leads from organic | Unknown | Baseline set | +20% | +50% |
| Blog articles | 18 | 25 | 40 | 60 |

### Top 5 Highest-Leverage Moves
1. **Fix technical debt** (duplicate metas, sitemap, robots) — immediate indexing improvements
2. **GA4 conversion tracking** — unlock ROI measurement for all SEO work
3. **Create pSEO university pages** (50+ universities) — massive keyword coverage
4. **Create pSEO major pages** (81 majors already in data) — instant scale from existing data
5. **French content parity** — Morocco's web is primarily French; FR blog has only 5 articles vs EN's 11

---

## B) FULL TECHNICAL SEO AUDIT

### B1. Indexing & Crawl Control

#### robots.txt Issues
- **Remove `Crawl-delay: 1`** — not respected by Google, slows Bing unnecessarily, Vercel handles rate limiting
- **Add explicit Disallow for referral SPA**: `/referral/`
- **Keep**: Disallow for admin, API, cart, checkout, payment pages

#### Sitemap Issues (Critical)
1. **Duplicate URLs**: `ar/blog/index.html` appears twice (lines 15-23 and 86-93)
2. **Same for en and fr blog index** — duplicated in both "Homepage" and "Blog Index" sections
3. **Noindex pages in sitemap**: cart.html, checkout.html, payment-confirmation.html, payment-failed.html, newsletter.html, engagement.html, recruitment.html — these are disallowed in robots.txt but still in sitemap
4. **Missing hreflang**: Most inner pages (about-us, fees, scholarship, etc.) lack hreflang annotations in sitemap
5. **Stale lastmod**: All dates show 2026-02-22 — should reflect actual content changes
6. **Root index.html in sitemap**: The root `/index.html` shouldn't be a separate entry — it should redirect to `/fr/index.html`

#### Canonicalization Issues
- Root `index.html` has `canonical` pointing to `/fr/index.html` — but it's also a separate page. This should 301 redirect
- Root `index.html` and `/fr/index.html` are near-identical content (French) — duplicate content risk
- The `home.html` files exist alongside `index.html` in each language — what's the difference? Likely duplicate content

#### Thin/Near-Duplicate Detection Plan
- `home.html` vs `index.html` in each language: investigate and consolidate
- `blog.html` vs `blog/index.html` vs `blog2.html`: three blog listing variants need consolidation
- All legal pages (terms-of-service, privacy-policy, refund-policy, terms-of-sale) across 3 languages: check for actual translations vs machine translation

### B2. Multilingual SEO

#### URL Strategy (Current: Subfolders — Good)
- `/en/` — English
- `/fr/` — French
- `/ar/` — Arabic (with RTL support)

#### Hreflang Issues
1. **Blog articles lack cross-language hreflang** — EN blog articles don't reference FR/AR equivalents
2. **Missing x-default on many inner pages** — only index pages have it consistently
3. **Root page ambiguity** — root `/` redirects via JS, which Googlebot may not follow. Should be server-side 301
4. **Inconsistent hreflang in sitemap** — some URLs have hreflang, most don't

#### Arabic-Specific Issues
- RTL implemented via inline `<style>` in `<head>` — good, but could be in a CSS file to benefit from caching
- Arabic slugs use English slug names (e.g., `/ar/about-us.html`) — acceptable, avoids URL encoding issues
- Arabic content appears to be genuine translation (not machine-generated)

#### Language Switcher
- JS-based (`language-handler.js`) — rewrites links client-side
- **Problem**: First-visit JS redirect from root page can cause indexing issues. Google may index root as French content, then see redirect to Arabic for some users
- **Fix**: Add `<meta http-equiv="refresh">` fallback or server-side redirect in vercel.json

### B3. Core Web Vitals Plan

#### LCP Fixes (Highest Priority)
1. **Reduce HTML file size**: 300KB+ HTML files → target <100KB
   - Move inline SVGs to external files
   - Externalize repeated HTML patterns (header, footer)
   - Consider a simple static site generator (11ty/Hugo) for template reuse
2. **Preload LCP image**: Add `<link rel="preload" as="image">` for hero image
3. **Add `loading="lazy"` to all below-fold images**
4. **Add `fetchpriority="high"` to hero image**
5. **Defer non-critical CSS**: Fancybox CSS only needed on pages with galleries

#### INP/TBT Fixes
1. **Defer jQuery**: Already deferred — good
2. **Remove unused JS**: Not all pages need GSAP/ScrollTrigger/Swiper
3. **Break up main.js** into page-specific bundles

#### CLS Fixes
1. **Set explicit width/height on images**: Prevent layout shift
2. **Font loading strategy**: Fonts are preloaded — good. Add `font-display: swap` if not present

### B4. Structured Data — Page-Type Mapping

| Page Type | Current Schema | Recommended Additions |
|-----------|---------------|----------------------|
| Homepage | EducationalOrganization, WebSite, Organization, BreadcrumbList | + `Service` with offers |
| Scholarship | BreadcrumbList, Service, Organization | + `FinancialAidScheme` (pending schema.org support) |
| FAQ | FAQPage (EN only!) | **Add FAQPage to FR + AR** |
| Blog Article | Article, Organization, BreadcrumbList | + `dateModified`, `author` person |
| Fees | BreadcrumbList, Organization | + `Service` with `PriceSpecification` |
| Reviews | Organization | + `AggregateRating` |
| Majors | Organization | + `Course` schema per major |
| Contact | Organization | + `LocalBusiness` with hours |
| University pages (future) | — | `CollegeOrUniversity` + `Course` |

### B5. Security/Headers/Status Codes

#### Missing Security Headers (add to vercel.json)
```json
{
  "key": "X-Content-Type-Options",
  "value": "nosniff"
},
{
  "key": "X-Frame-Options",
  "value": "DENY"
},
{
  "key": "Referrer-Policy",
  "value": "strict-origin-when-cross-origin"
},
{
  "key": "Permissions-Policy",
  "value": "camera=(), microphone=(), geolocation=()"
}
```

#### Redirect Issues
- `/universities-in-china/*` → `/en/*` (301) — **Too broad**. Should map specific URLs
- `/scholarships/*` → `/en/*` (301) — Same issue
- Root `/` should 301 → `/fr/index.html` (primary market) at server level, not via JS

---

## C) INFORMATION ARCHITECTURE & INTERNAL LINKING BLUEPRINT

### Topical Hub Model: "Study in China"

```
                    ┌─────────────────────┐
                    │   HOMEPAGE (Hub)     │
                    │   Study in China     │
                    └──────────┬──────────┘
          ┌────────────┬───────┼───────┬────────────┐
          ▼            ▼       ▼       ▼            ▼
    ┌──────────┐ ┌──────────┐ ┌──┐ ┌──────────┐ ┌──────────┐
    │Scholarships│ │Universities│ │Majors│ │Costs/Fees │ │Process   │
    │  (Hub)    │ │  (Hub)    │ │(Hub)│ │  (Hub)    │ │Step-by-Step│
    └────┬─────┘ └────┬─────┘ └─┬──┘ └────┬─────┘ └────┬─────┘
         │            │         │          │            │
    ┌────┤       ┌────┤    ┌───┤     ┌────┤       ┌────┤
    ▼    ▼       ▼    ▼    ▼   ▼     ▼    ▼       ▼    ▼
  CSC  Univ   Peking Zhejiang Med  Eng  Tuition Living Visa  Docs
  Grant Schol  Univ   Univ  Major Major  Fees   Costs  Guide Required
```

### Navigation Structure (Recommended)
```
Home | Universities ▾ | Majors ▾ | Scholarships | Costs | Process ▾ | Blog | Contact
                     │           │                              │
              [Top Unis]  [By Category]                   [Visa Guide]
              [By City]   [Medicine]                      [Documents]
              [Rankings]  [Engineering]                    [Step-by-Step]
                          [Business]
```

### Breadcrumb Pattern
`Home > {Section} > {Page}`
Example: `Home > Universities > Peking University`

### Internal Link Rules
1. **Every page links to ≥3 related pages** within the same hub
2. **Every blog article links to ≥2 service pages** (scholarship, fees, contact)
3. **Hub pages link to all spoke pages** in their cluster
4. **Spoke pages link back to hub** + 2-3 sibling spokes
5. **CTA modules on every content page**: "Ready to apply? Contact us" → contact.html
6. **Related content module at bottom** of every page: "You might also be interested in..."
7. **Orphan prevention**: Every new page must be linked from ≥2 existing pages before publication

---

## D) KEYWORD & TOPICAL STRATEGY

### Topical Map by Intent

#### Cluster 1: Scholarships (High Intent)
| Query Pattern | Language | Volume Est. | Intent | Content Type |
|---------------|----------|-------------|--------|--------------|
| bourse chine maroc | FR | High | Transactional | Landing page |
| CSC scholarship 2026 | EN | Medium | Informational | Blog guide |
| منح دراسية في الصين | AR | Medium | Transactional | Landing page |
| bourse CSC 2026 | FR | Medium | Informational | Blog guide |
| étudier en chine gratuitement | FR | High | Transactional | Landing page |
| scholarships in china for moroccan students | EN | Medium | Transactional | Landing page |

#### Cluster 2: Universities (High Intent)
| Query Pattern | Language | Volume Est. | Intent | Content Type |
|---------------|----------|-------------|--------|--------------|
| meilleures universités en chine | FR | Medium | Informational | Hub page |
| {university name} admission | EN | Medium each | Transactional | pSEO page |
| universités en chine pour marocains | FR | Medium | Transactional | Landing page |

#### Cluster 3: Majors/Programs (Medium Intent)
| Query Pattern | Language | Volume Est. | Intent | Content Type |
|---------------|----------|-------------|--------|--------------|
| étudier la médecine en chine | FR | High | Informational | Major page |
| study {major} in china | EN | Medium each | Informational | pSEO page |
| دراسة الطب في الصين | AR | Medium | Informational | Major page |

#### Cluster 4: Costs & Practical (Medium Intent)
| Query Pattern | Language | Volume Est. | Intent | Content Type |
|---------------|----------|-------------|--------|--------------|
| coût de la vie en chine | FR | Medium | Informational | Guide |
| frais de scolarité chine | FR | Medium | Informational | Fees page |
| cost of studying in china | EN | Medium | Informational | Blog/page |

#### Cluster 5: Visa & Process (High Intent)
| Query Pattern | Language | Volume Est. | Intent | Content Type |
|---------------|----------|-------------|--------|--------------|
| visa étudiant chine maroc | FR | High | Informational | Blog guide |
| china student visa morocco | EN | Medium | Informational | Blog guide |
| documents visa chine | FR | Medium | Informational | Documents page |

#### Cluster 6: Comparisons (Medium Intent)
| Query Pattern | Language | Volume Est. | Intent | Content Type |
|---------------|----------|-------------|--------|--------------|
| étudier en chine ou turquie | FR | Low-Med | Informational | Comparison |
| china vs europe for studies | EN | Low | Informational | Comparison |

### Quick Wins (Existing Content to Optimize)
1. `fr/scholarship.html` — add more long-tail keyword targeting
2. `en/blog/csc-scholarship-2026-guide.html` — already targets high-intent query
3. `fr/blog/etudier-en-chine-gratuitement.html` — optimize for "bourse chine maroc"
4. `en/fees.html` — add cost comparison tables, more structured data

### Entity Coverage Strategy
- **Universities**: 50+ Chinese universities (Peking, Tsinghua, Zhejiang, Fudan, etc.)
- **Cities**: Beijing, Shanghai, Wuhan, Guangzhou, Hangzhou, Nanjing, Chengdu, Xi'an
- **Majors**: 81 already in data (`majors-data.js`)
- **Scholarship types**: CSC, Provincial, University-specific, Belt & Road
- **Visa terms**: X1, X2, JW201, JW202, physical examination

---

## E) PROGRAMMATIC SEO (pSEO) MASTER PLAN

### E1. Scalable Page Types (12 Identified)

#### Type 1: University Profile Pages
- **Query pattern**: "{University Name} China admission", "étudier à {University}"
- **URL**: `/{lang}/universities/{university-slug}.html`
- **Intent**: Transactional/Informational
- **Risk**: Thin content if data is sparse
- **Scale**: 50-80 universities
- **Data needed**: Name, city, ranking, programs offered, tuition range, scholarship availability, campus photos, admission requirements

#### Type 2: Major/Program Pages
- **Query pattern**: "Study {major} in China", "étudier {major} en Chine"
- **URL**: `/{lang}/majors/{major-slug}.html`
- **Intent**: Informational
- **Risk**: Low — 81 majors already have data
- **Scale**: 81 pages × 3 languages = 243 pages
- **Data needed**: Already exists in `majors-data.js` — name, category, description, careers, salaries, why China

#### Type 3: Study in China from {Country}
- **Query pattern**: "Study in China from {country}", "étudier en Chine depuis {country}"
- **URL**: `/{lang}/study-in-china-from-{country}.html`
- **Intent**: Transactional
- **Risk**: Medium — need country-specific info (visa, scholarships, embassy)
- **Scale**: 10-15 countries
- **Data needed**: Country name, language, visa requirements from that country, available scholarships, embassy info, student testimonials

#### Type 4: Scholarships for {Country} Students
- **Query pattern**: "China scholarships for {country} students"
- **URL**: `/{lang}/scholarships/{country}-students.html`
- **Intent**: High transactional
- **Risk**: Medium — must have genuine country-specific scholarship data
- **Scale**: 10-15 countries
- **Data needed**: Country-specific CSC quotas, bilateral agreements, scholarship amounts

#### Type 5: Cost of Living in {City}
- **Query pattern**: "Cost of living in {city} China for students"
- **URL**: `/{lang}/cost-of-living/{city}.html`
- **Intent**: Informational
- **Risk**: Low if data is sourced properly
- **Scale**: 10-15 cities
- **Data needed**: Rent, food, transport, entertainment costs, comparison with Morocco

#### Type 6: {University} vs {University}
- **Query pattern**: "{Uni A} vs {Uni B}"
- **URL**: `/{lang}/compare/{uni-a}-vs-{uni-b}.html`
- **Intent**: Informational/Decision
- **Risk**: High — can feel thin/auto-generated. Only create for high-intent pairs
- **Scale**: 20-30 comparisons (most popular university pairs)
- **Data needed**: Rankings, tuition, programs, campus, city, strengths

#### Type 7: Study {Major} at {University}
- **Query pattern**: "study medicine at Peking University"
- **URL**: `/{lang}/programs/{university}/{major}.html`
- **Intent**: High transactional
- **Risk**: High — only create where real program data exists
- **Scale**: 200-500 pages (selective)
- **Data needed**: Program details, duration, language of instruction, fees, requirements

#### Type 8: Chinese University Intake Deadlines
- **Query pattern**: "China university September intake 2026"
- **URL**: `/{lang}/intake/{semester}-{year}.html`
- **Intent**: Transactional/Time-sensitive
- **Risk**: Medium — must stay evergreen with dynamic sections
- **Scale**: 2-4 pages (September + March, current + next year)
- **Data needed**: Deadline dates by university, application periods

#### Type 9: City Student Guides
- **Query pattern**: "student life in {city} China"
- **URL**: `/{lang}/cities/{city}.html`
- **Intent**: Informational
- **Risk**: Low
- **Scale**: 10-15 cities
- **Data needed**: Climate, culture, cost, universities in city, halal food, transportation

#### Type 10: Scholarship Type Explainers
- **Query pattern**: "CSC scholarship", "provincial scholarship china"
- **URL**: `/{lang}/scholarships/{type}.html`
- **Intent**: Informational
- **Scale**: 5-8 pages
- **Data needed**: Eligibility, coverage, application process, deadlines

#### Type 11: Blog — FAQ/How-To Series
- **Query pattern**: "how to get China student visa from Morocco"
- **URL**: `/{lang}/blog/{slug}.html`
- **Intent**: Informational
- **Scale**: 30-50 articles
- **Data needed**: Expert knowledge, sourced from official regulations

#### Type 12: Country Landing Pages (Multilingual)
- **Query pattern**: "study in china agency {country}"
- **URL**: `/{lang}/countries/{country}.html`
- **Intent**: Transactional
- **Scale**: 10-15 countries
- **Data needed**: Localized CTA, testimonials from that country, specific partnerships

### E2. Data Design

#### University Dataset Schema
```
universities.json
{
  "id": "peking-university",
  "name": { "en": "Peking University", "fr": "Université de Pékin", "ar": "جامعة بكين" },
  "city": "beijing",
  "province": "Beijing",
  "ranking_qs": 17,
  "ranking_times": 14,
  "founded": 1898,
  "type": "public",
  "programs": ["medicine", "engineering", "business", "law", "arts"],
  "tuition_range_usd": { "min": 2800, "max": 8000 },
  "scholarship_types": ["CSC", "university", "provincial"],
  "language_of_instruction": ["Chinese", "English"],
  "moroccan_students": true,
  "halal_food": true,
  "campus_images": ["peking-1.webp", "peking-2.webp"],
  "admission_requirements": {
    "bachelors": { "min_gpa": "70%", "language": "HSK 4 or English proficiency" },
    "masters": { "min_gpa": "75%", "language": "HSK 5 or IELTS 6.0" }
  },
  "website": "https://english.pku.edu.cn",
  "last_updated": "2026-03-01"
}
```

#### City Dataset Schema
```
cities.json
{
  "id": "beijing",
  "name": { "en": "Beijing", "fr": "Pékin", "ar": "بكين" },
  "province": "Beijing",
  "population": "21M",
  "universities_count": 92,
  "cost_of_living": {
    "rent_monthly_usd": { "min": 300, "max": 800 },
    "food_monthly_usd": { "min": 150, "max": 300 },
    "transport_monthly_usd": { "min": 20, "max": 50 }
  },
  "climate": "Continental, four seasons",
  "halal_food_availability": "excellent",
  "moroccan_community": "large",
  "airport": "PEK / PKX",
  "key_universities": ["peking-university", "tsinghua-university", "beihang-university"]
}
```

#### Uniqueness Rules
1. Every pSEO page must have ≥300 words of unique body content
2. Title tags must vary — no two pages share exact title
3. Meta descriptions must be unique per page
4. Each page must contain ≥1 unique data point not found on other pages
5. Cross-link to 3+ other internal pages minimum

### E3. Template Specs

#### Template: University Profile Page
- **URL**: `/{lang}/universities/{slug}.html`
- **Title**: `{University Name} - Admission, Fees & Scholarships for {Country} Students | Foorsa`
- **Meta**: `Study at {University Name} in {City}, China. Tuition from ${min_tuition}/year. {Scholarship types} available. Apply through Foorsa.`
- **H1**: `Study at {University Name}`
- **Sections**:
  1. Hero: University name, city, ranking badge, hero image
  2. Quick facts: Founded, type, ranking, student count, tuition range
  3. Available programs (linked to major pages)
  4. Scholarships available at this university
  5. Admission requirements (tabbed: Bachelor's / Master's / PhD)
  6. Campus life: photos, facilities, halal food status
  7. City guide snippet (linked to city page)
  8. Student testimonials from this university
  9. CTA: "Apply to {University Name} with Foorsa"
  10. Related universities in same city
- **Schema**: `CollegeOrUniversity` + `BreadcrumbList`
- **Internal links**: City page, major pages, scholarship page, step-by-step
- **Trust signals**: QS/Times ranking, official website link, "Last verified: {date}"

#### Template: Major/Program Page
- **URL**: `/{lang}/majors/{slug}.html`
- **Title**: `Study {Major} in China | Best Universities, Costs & Careers | Foorsa`
- **Meta**: `Study {Major} in China at top universities. Career prospects: {top career}. Tuition from ${amount}. Scholarships available. Apply now!`
- **H1**: `Study {Major} in China`
- **Sections**:
  1. Hero: Major name, category, key stat
  2. Overview: What you'll study, why China for this field
  3. Best universities for this major (linked)
  4. Career prospects with salary ranges (Morocco + International)
  5. Admission requirements
  6. Costs & scholarships
  7. Related video embed
  8. FAQ (3-5 questions)
  9. CTA: "Apply to study {Major} in China"
  10. Related majors
- **Schema**: `Course` + `BreadcrumbList` + `FAQPage`
- **Internal links**: University pages, fees page, scholarship page

#### Template: City Guide Page
- **URL**: `/{lang}/cities/{slug}.html`
- **Title**: `Student Life in {City}, China | Cost, Universities & Guide | Foorsa`
- **Meta**: `Everything about student life in {City}, China. Cost of living from ${amount}/month. {X} universities. Halal food: {status}. Complete guide.`
- **H1**: `Student Guide: Living in {City}, China`
- **Sections**:
  1. City hero with photo
  2. Quick facts: cost of living, climate, population
  3. Universities in this city (linked)
  4. Cost breakdown table
  5. Student life: food, transport, culture
  6. Moroccan community presence
  7. Getting there from Morocco
  8. CTA: "Study in {City} with Foorsa"
- **Schema**: `City` (Place) + `BreadcrumbList`

### E4. Indexation Ramp Plan

#### Phase 1: Pilot (Weeks 1-2)
- Create 5 university pages (most popular: Peking, Tsinghua, Zhejiang, Wuhan, Shanghai Jiao Tong)
- Create 10 major pages (highest demand: Medicine, Engineering, Computer Science, Business, Architecture, Pharmacy, Dentistry, Law, International Relations, Chinese Language)
- **Mark as `noindex`** initially, review for quality
- Add to separate sitemap segment: `sitemap-universities.xml`, `sitemap-majors.xml`

#### Phase 2: Expand (Weeks 3-4)
- Remove `noindex` from pilot pages after QA
- Create remaining 40+ university pages
- Create remaining 70+ major pages
- Create 5 city guide pages

#### Phase 3: Scale (Weeks 5-8)
- Create country landing pages (10-15)
- Create university comparison pages (20-30)
- Add all pages to sitemap
- Monitor in GSC for crawl/index issues

#### Gating Rules
- Page must score ≥80 on content quality checklist before removing `noindex`
- No more than 50 new pages indexed per week (avoid index bloat signal)
- Monitor crawl stats in GSC — if crawl drops, pause expansion

#### Monitoring & Pruning
- Weekly: Check GSC Coverage report for soft 404s, excluded pages
- Monthly: Review pages with 0 impressions after 30 days → improve or consolidate
- Quarterly: Cannibalization audit — check if pSEO pages compete with each other

### E5. QA Governance

#### Editorial Checklist (per pSEO page)
- [ ] Unique title tag (≤60 chars)
- [ ] Unique meta description (≤155 chars)
- [ ] H1 matches page intent
- [ ] ≥300 words unique body content
- [ ] ≥3 internal links to related pages
- [ ] ≥1 CTA module
- [ ] Structured data validates (schema.org validator)
- [ ] Images have alt text
- [ ] Page loads in <3s (Lighthouse)
- [ ] Hreflang tags present (if multilingual version exists)
- [ ] Data sources cited
- [ ] "Last updated" date visible

---

## F) PAGE TAXONOMY SPEC

| Page Type | Primary Intent | Key Sections | Schema | Internal Links | CTA | Languages |
|-----------|---------------|--------------|--------|---------------|-----|-----------|
| Homepage | Brand + Navigate | Hero, Services overview, Universities preview, Testimonials, Blog preview, CTA | EducationalOrganization, WebSite, BreadcrumbList | All hub pages | Lead form, WhatsApp | en, fr, ar |
| Scholarship | Transactional | Scholarship types, CSC guide, Eligibility, How to apply, FAQ | Service, FAQPage, BreadcrumbList | Universities, Fees, Contact, Blog articles | Application form | en, fr, ar |
| Fees | Informational | Tuition table, Living costs, Payment plans, Comparison | Service, PriceSpecification, BreadcrumbList | Scholarships, Universities, Contact | Cost calculator CTA | en, fr, ar |
| Majors Hub | Navigate | Categories, Search/filter, Popular majors | ItemList, BreadcrumbList | Individual major pages, Universities | Quiz CTA | en, fr, ar |
| Major (pSEO) | Informational | Overview, Universities, Careers, Costs, FAQ | Course, FAQPage, BreadcrumbList | Universities, Fees, Scholarships | Apply CTA | en, fr, ar |
| University (pSEO) | Transactional | Profile, Programs, Costs, Scholarships, City | CollegeOrUniversity, BreadcrumbList | City page, Majors, Scholarships | Apply CTA | en, fr, ar |
| City Guide (pSEO) | Informational | Overview, Cost table, Universities, Life | Place, BreadcrumbList | Universities in city, Fees | Contact CTA | en, fr, ar |
| Blog Article | Informational | Content, Author, Related, CTA | Article, BreadcrumbList | Hub pages, Related articles | Lead form | en, fr, ar |
| FAQ | Informational | Categories, Questions, Search | FAQPage, BreadcrumbList | Service pages | Contact CTA | en, fr, ar |
| Contact | Transactional | Form, Map, Phone, WhatsApp, Hours | LocalBusiness, BreadcrumbList | All service pages | Form submit | en, fr, ar |
| Reviews | Trust/Social proof | Testimonials, Ratings, Videos | AggregateRating, BreadcrumbList | Contact, Services | WhatsApp CTA | en, fr, ar |
| Step-by-Step | Informational | Process timeline, Requirements, Deadlines | HowTo, BreadcrumbList | Documents, Visa, Fees | Apply CTA | en, fr, ar |

---

## G) IMPLEMENTATION BACKLOG

### Sprint 1 (Weeks 1-2): Technical Foundation

#### Ticket 1.1: Fix Duplicate Meta Descriptions
- **Files**: `index.html`, `en/index.html`, `fr/index.html`, `ar/index.html`
- **Action**: Remove the first inline `<meta name="description">` tag (keep the SEO-optimized one injected later in `<head>`)
- **Acceptance**: Each page has exactly 1 meta description tag
- **Validation**: `grep -c 'meta.*name="description"' /{lang}/index.html` returns 1

#### Ticket 1.2: Fix robots.txt
- **File**: `robots.txt`
- **Action**: Remove `Crawl-delay`, add `Disallow: /referral/`, add `Disallow: /*.py`
- **Acceptance**: No crawl-delay, referral disallowed, Python scripts disallowed

#### Ticket 1.3: Fix sitemap.xml
- **File**: `sitemap.xml`
- **Action**:
  - Remove duplicate blog index entries
  - Remove noindex pages (cart, checkout, payment, newsletter, engagement, recruitment)
  - Add hreflang to all language variant pages
  - Remove root `/index.html` entry (redirect target)
- **Acceptance**: No duplicate URLs, no noindex pages, all multilingual pages have hreflang

#### Ticket 1.4: Add Security Headers
- **File**: `vercel.json`
- **Action**: Add X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy headers
- **Acceptance**: Headers present on all responses

#### Ticket 1.5: Fix Root Page Redirect
- **File**: `vercel.json`
- **Action**: Add server-side redirect: `/ → /fr/index.html` (301) to supplement JS redirect
- **Acceptance**: `curl -I https://foorsa.ma/` returns 301 to `/fr/index.html`

#### Ticket 1.6: Add GA4 Conversion Events
- **File**: `js/tracker.js` or new `js/ga4-events.js`
- **Action**: Add events for: `form_submit`, `whatsapp_click`, `phone_click`, `quiz_complete`
- **Acceptance**: Events visible in GA4 Real-time report

#### Ticket 1.7: Add FAQPage Schema to FR + AR FAQ Pages
- **Files**: `fr/frequently-asked-questions.html`, `ar/frequently-asked-questions.html`
- **Action**: Port the FAQPage JSON-LD from the EN version
- **Acceptance**: Schema validates on schema.org validator

### Sprint 2 (Weeks 3-4): Content Scale Preparation

#### Ticket 2.1: Create University Data File
- **File**: `assets/data/universities.json`
- **Action**: Create dataset with 50+ universities (name, city, ranking, programs, tuition, scholarships)
- **Acceptance**: JSON validates, ≥50 entries, all required fields populated

#### Ticket 2.2: Create City Data File
- **File**: `assets/data/cities.json`
- **Action**: Create dataset with 15 cities
- **Acceptance**: JSON validates, ≥15 entries

#### Ticket 2.3: Create University Page Template
- **File**: `en/universities/_template.html`
- **Action**: HTML template with placeholders for university data
- **Acceptance**: Template renders correctly with sample data

#### Ticket 2.4: Create pSEO Build Script
- **File**: `scripts/generate-pages.js`
- **Action**: Node.js script that reads data files + templates and generates static HTML pages
- **Acceptance**: Script generates valid HTML files with unique content per page

#### Ticket 2.5: Create 5 Pilot University Pages
- **Action**: Generate pages for Peking, Tsinghua, Zhejiang, Wuhan Univ, Shanghai Jiao Tong
- **Acceptance**: 5 pages × 1 language (EN), all pass QA checklist

#### Ticket 2.6: Create 10 Pilot Major Pages
- **Action**: Generate individual major pages from `majors-data.js`
- **Acceptance**: 10 pages with unique content, proper schema

#### Ticket 2.7: French Blog Content Parity
- **Action**: Translate/create 6 FR blog articles to match EN count
- **Acceptance**: 11 FR blog articles, each with unique meta + hreflang

### Sprint 3 (Weeks 5-6): Scale & Measure

#### Ticket 3.1: Generate All University Pages (50+)
- **Action**: Run build script for all universities × 3 languages
- **Acceptance**: 150+ pages generated, all pass QA

#### Ticket 3.2: Generate All Major Pages (81)
- **Action**: Run build script for all majors × EN (start), then FR/AR
- **Acceptance**: 81+ pages, unique content, proper internal links

#### Ticket 3.3: Create Sitemap Index
- **File**: `sitemap-index.xml`
- **Action**: Split sitemap into segments: `sitemap-pages.xml`, `sitemap-universities.xml`, `sitemap-majors.xml`, `sitemap-blog.xml`
- **Acceptance**: Sitemap index validates, all child sitemaps valid

#### Ticket 3.4: Add Image Lazy Loading
- **Files**: All HTML files
- **Action**: Add `loading="lazy"` to all `<img>` tags except hero/above-fold images
- **Acceptance**: Lighthouse performance score improves by ≥10 points

#### Ticket 3.5: Create City Guide Pages (5 Pilot)
- **Action**: Beijing, Shanghai, Wuhan, Guangzhou, Hangzhou
- **Acceptance**: 5 pages, each with unique cost data and university links

#### Ticket 3.6: Set Up GSC Dashboard + Alerts
- **Action**: Create GSC performance tracking dashboard, set up alerts for indexing drops
- **Acceptance**: Dashboard live, alerts configured

### Automated Checks (CI/CD Pipeline)
1. **Schema validation**: Run `structured-data-testing-tool` on all pages
2. **Sitemap validation**: XML lint + URL existence check
3. **Broken link checker**: `linkinator` or equivalent
4. **CWV budget**: Lighthouse CI with performance ≥70 threshold
5. **Hreflang validation**: Custom script checking bidirectional references
6. **Duplicate title/meta check**: Script scanning all HTML files

---

## H) CONTENT PRODUCTION SYSTEM

### Editorial Guidelines for High Trust (Education/Visa)

#### E-E-A-T Requirements
1. **Experience**: Include first-person student testimonials, photos from actual campuses
2. **Expertise**: Cite official sources (CSC website, university admission pages, Chinese embassy)
3. **Authoritativeness**: Display Foorsa's track record ("500+ students helped", "Since [year]")
4. **Trustworthiness**: Show real contact details, physical address, social proof, verified reviews

#### Content Quality Standards
- All factual claims must cite a source (official university website, government page)
- Tuition and cost data must include "as of [date]" disclaimer
- Visa information must reference official embassy/consulate guidance
- Never guarantee admission or visa approval
- All student testimonials must be real (with consent)

### Content Brief Template

```
# Content Brief: {Page Title}

## Target keyword(s)
- Primary: {keyword} ({language}, {volume est.})
- Secondary: {keyword 2}, {keyword 3}

## Search intent
{informational / transactional / navigational}

## Target audience
{e.g., Moroccan high school graduate considering studying in China}

## Required sections
1. {Section 1}: {What to cover, min word count}
2. {Section 2}: ...
...

## Internal links to include
- {Link to scholarship page}
- {Link to related blog article}
- {Link to contact/CTA}

## Data sources
- {Official university website}
- {CSC scholarship portal}
- {Foorsa internal data}

## CTA
- Primary: {e.g., "Free consultation" form}
- Secondary: {e.g., WhatsApp button}

## Schema type
{e.g., Article, Course, FAQPage}

## Competitors to outperform
- {URL 1}: {What they do well, what we can do better}
```

### Refresh & Consolidation Strategy
- **Monthly**: Review top 20 pages by impressions — update data, add new info
- **Quarterly**: Consolidate thin pages that don't rank after 90 days
- **Annually**: Full audit of tuition data, ranking data, visa requirements
- **Consolidation rules**: If two pages target same keyword and neither ranks top 20, merge into one stronger page

### Translation Workflow
1. **Source language**: English (for general content) or French (for Morocco-specific content)
2. **Transcreation rules**: Don't literally translate — adapt for cultural context
   - French: More formal tone, reference Moroccan education system (Baccalauréat)
   - Arabic: Use Modern Standard Arabic, include Moroccan dialect terms where common
3. **QA**: Native speaker review for each language
4. **Glossary**: Maintain consistent translation of key terms:
   - CSC Scholarship = Bourse CSC = منحة CSC
   - Tuition fees = Frais de scolarité = الرسوم الدراسية
   - Student visa = Visa étudiant = تأشيرة الطالب
5. **Canonical + hreflang**:
   - Each language version gets its own canonical (self-referencing)
   - All language versions link to each other via hreflang
   - x-default points to English version

---

## I) MEASUREMENT & EXPERIMENTS

### GA4 Event Plan

| Event Name | Trigger | Parameters | Category |
|------------|---------|------------|----------|
| `form_submit` | Contact/application form submitted | form_type, page_url, language | Conversion |
| `whatsapp_click` | WhatsApp link clicked | page_url, language | Conversion |
| `phone_click` | Phone number clicked | page_url, language | Conversion |
| `quiz_complete` | Quiz finished | result, page_url | Engagement |
| `cta_click` | Any CTA button clicked | cta_text, page_url, position | Engagement |
| `blog_scroll_50` | User scrolls 50% of blog article | article_slug, language | Engagement |
| `blog_scroll_100` | User scrolls 100% of blog article | article_slug, language | Engagement |
| `language_switch` | Language switcher used | from_lang, to_lang | UX |
| `university_view` | University page viewed | university_slug | Engagement |
| `major_view` | Major page viewed | major_slug | Engagement |

### GSC Dashboards and Alerts
1. **Performance by language**: Filter by `/en/`, `/fr/`, `/ar/` — track impressions, clicks, CTR separately
2. **Blog performance**: Filter by `/blog/` — track which articles drive traffic
3. **pSEO performance**: Filter by `/universities/`, `/majors/`, `/cities/` — track new page performance
4. **Index coverage**: Monitor indexed vs excluded pages weekly
5. **Alerts**: Set up for:
   - Impressions drop >20% week-over-week
   - Pages removed from index
   - Crawl errors spike
   - CWV issues detected

### SEO Experiments (10)

#### Experiment 1: Title Tag Formulas
- **Hypothesis**: Adding "2026" to title tags increases CTR by 15%+
- **Metric**: CTR in GSC
- **Duration**: 4 weeks
- **Method**: A/B test 5 pages with year vs 5 without

#### Experiment 2: FAQ Schema on Service Pages
- **Hypothesis**: Adding FAQPage schema to scholarship/fees pages increases rich snippet appearance
- **Metric**: Rich result impressions in GSC
- **Duration**: 4 weeks
- **Method**: Add FAQ schema to 3 service pages, measure before/after

#### Experiment 3: French Content Priority
- **Hypothesis**: Creating FR-first content yields 2x more clicks than EN for Morocco
- **Metric**: Clicks by language in GSC
- **Duration**: 8 weeks
- **Method**: Create 5 new articles FR-first, compare with EN equivalents

#### Experiment 4: Internal Link Density
- **Hypothesis**: Adding 3 more internal links per blog post increases pages/session
- **Metric**: Pages/session, bounce rate in GA4
- **Duration**: 4 weeks
- **Method**: Add internal links to 5 blog posts, compare with control

#### Experiment 5: CTA Placement in Blog
- **Hypothesis**: Adding a mid-article CTA increases form submissions from blog by 25%
- **Metric**: `form_submit` events from blog pages
- **Duration**: 6 weeks
- **Method**: Add inline CTA at 50% scroll point in 5 articles

#### Experiment 6: University Page Content Depth
- **Hypothesis**: University pages with >800 words rank higher than those with 400 words
- **Metric**: Average position in GSC
- **Duration**: 8 weeks
- **Method**: Create two batches: 5 deep pages (800+) vs 5 standard (400)

#### Experiment 7: Video Embeds on Landing Pages
- **Hypothesis**: Adding YouTube testimonial videos to service pages increases time-on-page
- **Metric**: `engagement_time` in GA4
- **Duration**: 4 weeks
- **Method**: Add video to scholarship + fees pages

#### Experiment 8: Meta Description with Numbers
- **Hypothesis**: Meta descriptions with specific numbers ("500+ students", "50+ universities") increase CTR
- **Metric**: CTR in GSC
- **Duration**: 4 weeks
- **Method**: Update 5 page meta descriptions with numbers, keep 5 as control

#### Experiment 9: Breadcrumb Navigation
- **Hypothesis**: Visible breadcrumb navigation reduces bounce rate and increases page depth
- **Metric**: Bounce rate, pages/session in GA4
- **Duration**: 4 weeks
- **Method**: Ensure breadcrumbs are visually prominent on all content pages

#### Experiment 10: Page Speed Impact on Leads
- **Hypothesis**: Reducing LCP from 4s to <2.5s increases form submissions by 15%
- **Metric**: `form_submit` conversion rate
- **Duration**: 6 weeks
- **Method**: Optimize 5 high-traffic pages for CWV, compare conversion rates

---

## TARGET COUNTRIES (Beyond Morocco)

### Top 10 Additional Markets (ranked by demand feasibility)

| Rank | Country | Language | Rationale |
|------|---------|----------|-----------|
| 1 | Algeria | FR, AR | Large student population, French-speaking, similar demographics to Morocco |
| 2 | Tunisia | FR, AR | French-speaking, established study-abroad culture |
| 3 | Senegal | FR | Large francophone student population, growing China interest |
| 4 | Côte d'Ivoire | FR | Francophone West Africa, scholarship demand |
| 5 | Cameroon | FR, EN | Bilingual, large student body |
| 6 | Egypt | AR, EN | Large Arabic-speaking student population |
| 7 | Pakistan | EN | Huge demand for China scholarships, CPEC connection |
| 8 | Nigeria | EN | Largest African student population |
| 9 | Ghana | EN | Growing interest in China scholarships |
| 10 | Indonesia | EN | Massive student population, Belt & Road |

**Language feasibility**: Foorsa already supports FR, AR, EN — covering countries 1-9 without new languages. Indonesia would need EN content only.

---

## IMPLEMENTATION PRIORITY MATRIX

### NOW (This Sprint — Code Changes Made)
1. Fix duplicate meta descriptions ← **DONE IN THIS COMMIT**
2. Fix robots.txt ← **DONE IN THIS COMMIT**
3. Fix sitemap.xml ← **DONE IN THIS COMMIT**
4. Add security headers ← **DONE IN THIS COMMIT**
5. Add FAQPage schema to FR/AR ← **DONE IN THIS COMMIT**

### NEXT (Sprint 2 — 2 Weeks)
1. Create university + city data files
2. Build pSEO generation script
3. Generate pilot university + major pages
4. Add GA4 conversion events
5. French blog content parity

### LATER (Sprint 3+ — 4-8 Weeks)
1. Scale all pSEO pages (universities, majors, cities)
2. Country landing pages
3. Sitemap segmentation
4. CWV optimization (HTML reduction, lazy loading)
5. Comparison pages
6. Consider migrating to a static site generator (11ty/Hugo) for maintainability
