#!/usr/bin/env node
/**
 * SEO Enhancements Script
 * 1. Add LocalBusiness schema to homepage files
 * 2. Fix blog article hreflang gaps
 * 3. Add article:section (category) metadata to blog articles
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// ── LocalBusiness Schema ──────────────────────────────────────────────
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Foorsa",
  "alternateName": ["FUSAAA", "Fusaaa", "فورصة", "Foorsa Consulting"],
  "description": "Education consultancy helping Moroccan students study in China through scholarships, university admissions, and student support services",
  "url": "https://foorsa.ma",
  "telephone": "+212-0537-911291",
  "email": "info@foorsa.ma",
  "image": "https://foorsa.ma/assets/img/logo.png",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "MA",
    "addressLocality": "Rabat",
    "addressRegion": "Rabat-Salé-Kénitra"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "33.9716",
    "longitude": "-6.8498"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "priceRange": "$$",
  "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
  "areaServed": {
    "@type": "Country",
    "name": "Morocco"
  },
  "sameAs": [
    "https://www.facebook.com/Foorsaconsulting",
    "https://www.instagram.com/foorsa.ma/",
    "https://www.linkedin.com/company/fooorsa-consulting"
  ]
};

// ── Cross-language article mappings ───────────────────────────────────
const articleMappings = [
  { en: 'best-universities-china-moroccan-students', fr: 'meilleures-universites-chinoises-maroc', ar: 'best-universities-china-moroccan-students', category: 'universities' },
  { en: 'cost-of-living-china-moroccan-students', fr: 'cout-de-vie-chine-etudiants-marocains', ar: 'cost-of-living-china-moroccan-students', category: 'costs' },
  { en: 'cost-of-studying-in-china', fr: null, ar: 'cost-of-studying-in-china', category: 'costs' },
  { en: 'csc-scholarship-2026-guide', fr: 'bourse-csc-2026-guide', ar: 'csc-scholarship-2026-guide', category: 'scholarships' },
  { en: 'csca-test-guide', fr: 'examen-csca-chine', ar: 'csca-test-guide', category: 'admissions' },
  { en: 'study-medicine-in-china', fr: 'etudier-medecine-en-chine', ar: 'study-medicine-in-china', category: 'medicine' },
  { en: 'top-chinese-universities-2026', fr: 'meilleures-universites-chinoises-2026', ar: 'top-chinese-universities-2026', category: 'universities' },
  { en: 'student-life-china-morocco', fr: 'vie-etudiante-chine-maroc', ar: 'student-life-china-morocco', category: 'student-life' },
  { en: 'china-intake-september-march-guide', fr: 'rentree-chine-septembre-mars-guide', ar: 'china-intake-september-march-guide', category: 'admissions' },
  { en: 'china-student-visa-morocco-guide', fr: 'visa-etudiant-chine-maroc', ar: null, category: 'admissions' },
  { en: 'how-to-apply-chinese-universities', fr: null, ar: 'guide-application-chinese-universities', category: 'admissions' },
  { en: null, fr: 'etudier-en-chine-apres-le-bac', ar: null, category: 'admissions' },
  { en: null, fr: 'etudier-en-chine-gratuitement', ar: null, category: 'scholarships' },
  { en: null, fr: null, ar: 'scholarship-full-guide', category: 'scholarships' },
];

const categoryLabels = {
  en: {
    scholarships: 'Scholarships',
    universities: 'Universities',
    costs: 'Costs & Budget',
    'student-life': 'Student Life',
    admissions: 'Admissions & Visa',
    medicine: 'Medicine',
  },
  fr: {
    scholarships: 'Bourses',
    universities: 'Universités',
    costs: 'Coûts & Budget',
    'student-life': 'Vie Étudiante',
    admissions: 'Admissions & Visa',
    medicine: 'Médecine',
  },
  ar: {
    scholarships: 'المنح الدراسية',
    universities: 'الجامعات',
    costs: 'التكاليف والميزانية',
    'student-life': 'الحياة الطلابية',
    admissions: 'القبول والتأشيرة',
    medicine: 'الطب',
  }
};

// ── 1. Add LocalBusiness Schema to Homepages ──────────────────────────
function addLocalBusinessToHomepages() {
  const homepages = [
    path.join(ROOT, 'index.html'),
    path.join(ROOT, 'en', 'index.html'),
    path.join(ROOT, 'fr', 'index.html'),
    path.join(ROOT, 'ar', 'index.html'),
  ];

  const schemaTag = `<script type="application/ld+json">\n${JSON.stringify(localBusinessSchema, null, 2)}\n</script>`;

  let count = 0;
  for (const file of homepages) {
    if (!fs.existsSync(file)) continue;
    let html = fs.readFileSync(file, 'utf8');

    // Skip if LocalBusiness already exists
    if (html.includes('"LocalBusiness"')) {
      console.log(`  SKIP ${file} (LocalBusiness already exists)`);
      continue;
    }

    // Insert before the closing </head> or before first FAQPage schema
    // Find the BreadcrumbList closing script tag or FAQPage and insert before it
    const insertPoint = html.indexOf('<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "FAQPage"');
    if (insertPoint !== -1) {
      html = html.slice(0, insertPoint) + schemaTag + '\n' + html.slice(insertPoint);
    } else {
      // Fallback: insert before </head>
      html = html.replace('</head>', schemaTag + '\n</head>');
    }

    fs.writeFileSync(file, html, 'utf8');
    count++;
    console.log(`  DONE ${file}`);
  }
  console.log(`Added LocalBusiness schema to ${count} homepage(s)\n`);
}

// ── 2. Fix Blog Article Hreflang ──────────────────────────────────────
function fixBlogHreflang() {
  let fixCount = 0;

  for (const mapping of articleMappings) {
    for (const lang of ['en', 'fr', 'ar']) {
      const slug = mapping[lang];
      if (!slug) continue;

      const file = path.join(ROOT, lang, 'blog', `${slug}.html`);
      if (!fs.existsSync(file)) {
        console.log(`  MISSING ${file}`);
        continue;
      }

      let html = fs.readFileSync(file, 'utf8');

      // Build the correct hreflang set
      const hreflangs = [];
      for (const targetLang of ['en', 'fr', 'ar']) {
        if (mapping[targetLang]) {
          hreflangs.push(`<link href="https://foorsa.ma/${targetLang}/blog/${mapping[targetLang]}" hreflang="${targetLang}" rel="alternate"/>`);
        }
      }
      // x-default points to English, or first available
      const defaultLang = mapping.en ? 'en' : (mapping.fr ? 'fr' : 'ar');
      const defaultSlug = mapping[defaultLang];
      hreflangs.push(`<link href="https://foorsa.ma/${defaultLang}/blog/${defaultSlug}" hreflang="x-default" rel="alternate"/>`);

      // Remove existing hreflang lines
      const lines = html.split('\n');
      const filteredLines = lines.filter(line => !line.includes('hreflang='));
      html = filteredLines.join('\n');

      // Insert hreflangs after canonical
      const canonicalMatch = html.match(/<link href="[^"]*" rel="canonical"\/>/);
      if (canonicalMatch) {
        const insertAfter = canonicalMatch[0];
        html = html.replace(insertAfter, insertAfter + '\n' + hreflangs.join('\n'));
        fixCount++;
      }

      // Add article:section if missing
      const category = mapping.category;
      const sectionLabel = categoryLabels[lang][category];
      if (!html.includes('article:section')) {
        const ogTypeMatch = html.match(/<meta content="article" property="og:type"\/>/);
        if (ogTypeMatch) {
          html = html.replace(ogTypeMatch[0], ogTypeMatch[0] + `\n<meta content="${sectionLabel}" property="article:section"/>\n<meta content="${category}" property="article:tag"/>`);
        }
      }

      fs.writeFileSync(file, html, 'utf8');
    }
  }
  console.log(`Fixed hreflang on ${fixCount} blog article(s)\n`);
}

// ── Run ───────────────────────────────────────────────────────────────
console.log('=== SEO Enhancements ===\n');
console.log('1. Adding LocalBusiness schema to homepages...');
addLocalBusinessToHomepages();
console.log('2. Fixing blog article hreflang + adding category metadata...');
fixBlogHreflang();
console.log('Done!');
