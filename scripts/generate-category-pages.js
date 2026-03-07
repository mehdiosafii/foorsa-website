#!/usr/bin/env node
/**
 * Generate Blog Category Pages (en/fr/ar)
 * Creates SEO-optimized category landing pages linking to related articles
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// Article mappings with category and descriptions
const articles = [
  { en: { slug: 'best-universities-china-moroccan-students', title: 'Best Universities in China for Moroccan Students 2026', desc: 'Top 10 universities for Moroccan students in China with halal food, scholarships, and communities.' },
    fr: { slug: 'meilleures-universites-chinoises-maroc', title: 'Meilleures Universités Chinoises pour Marocains', desc: 'Top 10 des universités chinoises accueillant les étudiants marocains.' },
    ar: { slug: 'best-universities-china-moroccan-students', title: 'أفضل الجامعات الصينية للطلاب المغاربة 2026', desc: 'أفضل 10 جامعات في الصين للطلاب المغاربة مع المنح والمجتمعات الطلابية.' },
    category: 'universities' },
  { en: { slug: 'top-chinese-universities-2026', title: 'Top 10 Chinese Universities 2026', desc: 'Rankings, strengths, programs, and scholarship availability at top Chinese universities.' },
    fr: { slug: 'meilleures-universites-chinoises-2026', title: 'Top 10 Universités Chinoises 2026', desc: 'Classements, programmes et bourses des meilleures universités chinoises.' },
    ar: { slug: 'top-chinese-universities-2026', title: 'أفضل 10 جامعات صينية 2026', desc: 'تصنيفات وبرامج ومنح أفضل الجامعات الصينية.' },
    category: 'universities' },
  { en: { slug: 'csc-scholarship-2026-guide', title: 'CSC Scholarship 2026: Complete Guide', desc: 'Everything about the Chinese Government Scholarship: eligibility, application, deadlines.' },
    fr: { slug: 'bourse-csc-2026-guide', title: 'Bourse CSC 2026 : Guide Complet', desc: 'Guide complet sur la bourse du gouvernement chinois : éligibilité, candidature, délais.' },
    ar: { slug: 'csc-scholarship-2026-guide', title: 'منحة CSC 2026: دليل شامل', desc: 'كل ما تحتاج معرفته عن المنحة الحكومية الصينية.' },
    category: 'scholarships' },
  { en: null,
    fr: { slug: 'etudier-en-chine-gratuitement', title: 'Étudier en Chine Gratuitement', desc: 'Comment obtenir une bourse complète pour étudier en Chine gratuitement.' },
    ar: null,
    category: 'scholarships' },
  { en: null, fr: null,
    ar: { slug: 'scholarship-full-guide', title: 'دليل المنح الدراسية الشامل', desc: 'دليل شامل للمنح الدراسية للدراسة في الصين.' },
    category: 'scholarships' },
  { en: { slug: 'cost-of-living-china-moroccan-students', title: 'Cost of Living in China for Moroccan Students 2026', desc: 'Real living costs: accommodation, food, transport. Complete budget breakdown by city.' },
    fr: { slug: 'cout-de-vie-chine-etudiants-marocains', title: 'Coût de la Vie en Chine pour Étudiants Marocains', desc: 'Coûts réels : logement, nourriture, transport. Budget détaillé par ville.' },
    ar: { slug: 'cost-of-living-china-moroccan-students', title: 'تكاليف المعيشة في الصين للطلاب المغاربة 2026', desc: 'تكاليف حقيقية: السكن والطعام والنقل. ميزانية مفصلة حسب المدينة.' },
    category: 'costs' },
  { en: { slug: 'cost-of-studying-in-china', title: 'Cost of Studying in China 2026', desc: 'Complete breakdown of tuition fees, living expenses, and hidden costs.' },
    fr: null,
    ar: { slug: 'cost-of-studying-in-china', title: 'تكاليف الدراسة في الصين 2026', desc: 'تفصيل كامل للرسوم الدراسية ونفقات المعيشة.' },
    category: 'costs' },
  { en: { slug: 'student-life-china-morocco', title: 'Student Life in China for Moroccans', desc: 'Everything about life in China: accommodation, food, culture, and practical tips.' },
    fr: { slug: 'vie-etudiante-chine-maroc', title: 'Vie Étudiante en Chine pour les Marocains', desc: 'Tout sur la vie en Chine : logement, nourriture, culture et conseils pratiques.' },
    ar: { slug: 'student-life-china-morocco', title: 'الحياة الطلابية في الصين للمغاربة', desc: 'كل شيء عن الحياة في الصين: السكن والطعام والثقافة.' },
    category: 'student-life' },
  { en: { slug: 'china-intake-september-march-guide', title: 'September vs March Intake China 2026', desc: 'Complete guide to choosing between September and March intake.' },
    fr: { slug: 'rentree-chine-septembre-mars-guide', title: 'Rentrée Septembre vs Mars Chine 2026', desc: 'Guide complet pour choisir entre la rentrée de septembre et mars.' },
    ar: { slug: 'china-intake-september-march-guide', title: 'الدخول في سبتمبر مقابل مارس الصين 2026', desc: 'دليل شامل للاختيار بين دخول سبتمبر ومارس.' },
    category: 'admissions' },  // also student-life but primary is admissions
  { en: { slug: 'china-student-visa-morocco-guide', title: 'China Student Visa Morocco: X1/X2 Guide 2026', desc: 'Complete visa guide: requirements, documents, fees, and step-by-step process.' },
    fr: { slug: 'visa-etudiant-chine-maroc', title: 'Visa Étudiant Chine Maroc : Guide X1/X2 2026', desc: 'Guide complet du visa : exigences, documents, frais et processus étape par étape.' },
    ar: null,
    category: 'admissions' },
  { en: { slug: 'how-to-apply-chinese-universities', title: 'How to Apply for Chinese Universities', desc: 'Step-by-step guide: application process, documents, deadlines, and expert tips.' },
    fr: null,
    ar: { slug: 'guide-application-chinese-universities', title: 'دليل التقديم للجامعات الصينية', desc: 'دليل خطوة بخطوة: عملية التقديم والوثائق والمواعيد النهائية.' },
    category: 'admissions' },
  { en: { slug: 'csca-test-guide', title: 'CSCA Test 2026: Complete Guide', desc: 'Everything about the CSCA Chinese exam: registration, format, preparation, and scoring.' },
    fr: { slug: 'examen-csca-chine', title: 'Examen CSCA 2026 : Guide Complet', desc: 'Tout sur l\'examen CSCA : inscription, format, préparation et notation.' },
    ar: { slug: 'csca-test-guide', title: 'اختبار CSCA 2026: دليل شامل', desc: 'كل شيء عن اختبار CSCA: التسجيل والشكل والتحضير.' },
    category: 'admissions' },
  { en: null,
    fr: { slug: 'etudier-en-chine-apres-le-bac', title: 'Étudier en Chine Après le Bac', desc: 'Guide pour les bacheliers marocains souhaitant étudier en Chine.' },
    ar: null,
    category: 'admissions' },
  { en: { slug: 'study-medicine-in-china', title: 'Study Medicine in China', desc: 'Complete guide to MBBS programs: universities, costs, requirements, and recognition.' },
    fr: { slug: 'etudier-medecine-en-chine', title: 'Étudier la Médecine en Chine', desc: 'Guide complet des programmes MBBS : universités, coûts, exigences et reconnaissance.' },
    ar: { slug: 'study-medicine-in-china', title: 'دراسة الطب في الصين', desc: 'دليل شامل لبرامج الطب: الجامعات والتكاليف والمتطلبات.' },
    category: 'medicine' },
];

const categories = {
  scholarships: {
    en: { title: 'China Scholarships for Moroccan Students', metaTitle: 'China Scholarships Guide for Moroccan Students 2026 | Foorsa', desc: 'Complete guides to scholarships for studying in China. CSC scholarships, university grants, and funding opportunities for Moroccan students.', keywords: 'china scholarships, csc scholarship, study in china free, china scholarship morocco' },
    fr: { title: 'Bourses d\'Études en Chine pour Marocains', metaTitle: 'Bourses d\'Études en Chine pour Étudiants Marocains 2026 | Foorsa', desc: 'Guides complets sur les bourses pour étudier en Chine. Bourses CSC, aides universitaires et opportunités de financement pour les étudiants marocains.', keywords: 'bourses chine, bourse csc, etudier en chine gratuitement, bourse chine maroc' },
    ar: { title: 'المنح الدراسية في الصين للطلاب المغاربة', metaTitle: 'دليل المنح الدراسية في الصين للطلاب المغاربة 2026 | فرصة', desc: 'أدلة شاملة حول المنح الدراسية للدراسة في الصين. منح CSC والمنح الجامعية وفرص التمويل للطلاب المغاربة.', keywords: 'منح الصين, منحة csc, الدراسة في الصين مجانا, منح الصين للمغاربة' },
  },
  universities: {
    en: { title: 'Best Chinese Universities for Moroccan Students', metaTitle: 'Best Chinese Universities for Moroccan Students 2026 | Foorsa', desc: 'Discover the top Chinese universities for Moroccan students. Rankings, programs, campuses, and admission guides to help you choose the right university.', keywords: 'chinese universities, best universities china, top chinese universities, study in china universities' },
    fr: { title: 'Meilleures Universités Chinoises pour Marocains', metaTitle: 'Meilleures Universités Chinoises pour Étudiants Marocains 2026 | Foorsa', desc: 'Découvrez les meilleures universités chinoises pour les étudiants marocains. Classements, programmes et guides d\'admission.', keywords: 'universités chinoises, meilleures universités chine, top universités chine, etudier en chine universités' },
    ar: { title: 'أفضل الجامعات الصينية للطلاب المغاربة', metaTitle: 'أفضل الجامعات الصينية للطلاب المغاربة 2026 | فرصة', desc: 'اكتشف أفضل الجامعات الصينية للطلاب المغاربة. التصنيفات والبرامج وأدلة القبول لمساعدتك في اختيار الجامعة المناسبة.', keywords: 'جامعات صينية, أفضل الجامعات في الصين, الدراسة في الصين جامعات' },
  },
  costs: {
    en: { title: 'Cost of Studying & Living in China', metaTitle: 'Cost of Studying & Living in China for Moroccan Students 2026 | Foorsa', desc: 'Complete breakdown of costs for studying in China. Tuition fees, living expenses, accommodation, food, and budget tips for Moroccan students.', keywords: 'cost of studying in china, china tuition fees, living costs china, study in china budget' },
    fr: { title: 'Coûts des Études et de la Vie en Chine', metaTitle: 'Coûts des Études et de la Vie en Chine pour Marocains 2026 | Foorsa', desc: 'Détail complet des coûts pour étudier en Chine. Frais de scolarité, dépenses de vie, logement et conseils budget.', keywords: 'cout etudier en chine, frais scolarite chine, cout de la vie chine, budget etudiant chine' },
    ar: { title: 'تكاليف الدراسة والمعيشة في الصين', metaTitle: 'تكاليف الدراسة والمعيشة في الصين للطلاب المغاربة 2026 | فرصة', desc: 'تفصيل كامل لتكاليف الدراسة في الصين. الرسوم الدراسية ونفقات المعيشة والسكن ونصائح الميزانية.', keywords: 'تكاليف الدراسة في الصين, رسوم الجامعات الصينية, تكاليف المعيشة في الصين' },
  },
  'student-life': {
    en: { title: 'Student Life in China for Moroccan Students', metaTitle: 'Student Life in China for Moroccan Students | Foorsa', desc: 'What to expect as a Moroccan student in China. Campus life, food, culture, accommodation, social life, and practical tips for adapting.', keywords: 'student life china, morocco students china, living in china, campus life china' },
    fr: { title: 'Vie Étudiante en Chine pour Marocains', metaTitle: 'Vie Étudiante en Chine pour Étudiants Marocains | Foorsa', desc: 'Ce qui vous attend en tant qu\'étudiant marocain en Chine. Vie sur le campus, nourriture, culture et conseils pratiques.', keywords: 'vie etudiante chine, etudiants marocains chine, vivre en chine, campus chine' },
    ar: { title: 'الحياة الطلابية في الصين للمغاربة', metaTitle: 'الحياة الطلابية في الصين للطلاب المغاربة | فرصة', desc: 'ما يمكن توقعه كطالب مغربي في الصين. الحياة الجامعية والطعام والثقافة والسكن.', keywords: 'الحياة الطلابية في الصين, الطلاب المغاربة في الصين, العيش في الصين' },
  },
  admissions: {
    en: { title: 'Admissions & Visa Guide for China', metaTitle: 'How to Apply to Chinese Universities & Get a Student Visa 2026 | Foorsa', desc: 'Step-by-step guides for applying to Chinese universities. Application process, required documents, CSCA test preparation, visa requirements, and intake timelines.', keywords: 'apply chinese universities, china student visa, csca test, china university application, study in china requirements' },
    fr: { title: 'Guide Admissions et Visa Chine', metaTitle: 'Comment Postuler aux Universités Chinoises et Obtenir un Visa 2026 | Foorsa', desc: 'Guides étape par étape pour postuler aux universités chinoises. Processus de candidature, documents requis, préparation CSCA et exigences de visa.', keywords: 'postuler universites chinoises, visa etudiant chine, examen csca, candidature chine, etudier en chine conditions' },
    ar: { title: 'دليل القبول والتأشيرة للصين', metaTitle: 'كيفية التقديم للجامعات الصينية والحصول على تأشيرة طالب 2026 | فرصة', desc: 'أدلة خطوة بخطوة للتقديم في الجامعات الصينية. عملية التقديم والوثائق المطلوبة واختبار CSCA ومتطلبات التأشيرة.', keywords: 'التقديم للجامعات الصينية, تأشيرة طالب الصين, اختبار csca, متطلبات الدراسة في الصين' },
  },
  medicine: {
    en: { title: 'Study Medicine (MBBS) in China', metaTitle: 'Study Medicine in China: MBBS Programs for Moroccan Students 2026 | Foorsa', desc: 'Complete guide to studying medicine in China. English-taught MBBS programs, top medical universities, costs, admission requirements, and degree recognition.', keywords: 'study medicine china, mbbs china, medical university china, medicine china cost, mbbs china morocco' },
    fr: { title: 'Étudier la Médecine en Chine', metaTitle: 'Étudier la Médecine en Chine : Programmes MBBS pour Marocains 2026 | Foorsa', desc: 'Guide complet pour étudier la médecine en Chine. Programmes MBBS en anglais, meilleures universités médicales, coûts et reconnaissance du diplôme.', keywords: 'etudier medecine chine, mbbs chine, universite medicale chine, medecine chine cout' },
    ar: { title: 'دراسة الطب في الصين', metaTitle: 'دراسة الطب في الصين: برامج MBBS للطلاب المغاربة 2026 | فرصة', desc: 'دليل شامل لدراسة الطب في الصين. برامج MBBS باللغة الإنجليزية وأفضل الجامعات الطبية والتكاليف ومتطلبات القبول.', keywords: 'دراسة الطب في الصين, mbbs الصين, جامعات طبية صينية, تكاليف الطب في الصين' },
  },
};

const navLinks = {
  en: { about: 'About Us', contact: 'Contact', majors: 'Majors', scholarship: 'Scholarship', fees: 'Fees', blog: 'Blog', apply: 'APPLY', home: 'Home', shopUrl: '../shop.html', footerTagline: 'Your trusted partner for studying in China.', rights: '© 2026 Foorsa. All rights reserved.', ctaTitle: 'Ready to Start Your Journey?', ctaDesc: 'Let Foorsa guide you through every step of studying in China.', ctaBtn1: 'Contact Us', ctaBtn2: 'Apply Now', allArticles: 'View All Articles' },
  fr: { about: 'À Propos', contact: 'Contact', majors: 'Filières', scholarship: 'Bourses', fees: 'Frais', blog: 'Blog', apply: 'POSTULER', home: 'Accueil', shopUrl: '../shop.html', footerTagline: 'Votre partenaire de confiance pour étudier en Chine.', rights: '© 2026 Foorsa. Tous droits réservés.', ctaTitle: 'Prêt à Commencer Votre Parcours ?', ctaDesc: 'Laissez Foorsa vous guider à chaque étape de vos études en Chine.', ctaBtn1: 'Contactez-Nous', ctaBtn2: 'Postuler', allArticles: 'Voir Tous les Articles' },
  ar: { about: 'من نحن', contact: 'اتصل بنا', majors: 'التخصصات', scholarship: 'المنح', fees: 'الرسوم', blog: 'المدونة', apply: 'قدّم الآن', home: 'الرئيسية', shopUrl: '../shop.html', footerTagline: 'شريكك الموثوق للدراسة في الصين.', rights: '© 2026 فرصة. جميع الحقوق محفوظة.', ctaTitle: 'مستعد لبدء رحلتك؟', ctaDesc: 'دع فرصة ترشدك في كل خطوة من دراستك في الصين.', ctaBtn1: 'اتصل بنا', ctaBtn2: 'قدّم الآن', allArticles: 'عرض جميع المقالات' },
};

function generateCategoryPage(lang, categorySlug) {
  const cat = categories[categorySlug][lang];
  const nav = navLinks[lang];
  const isRtl = lang === 'ar';
  const htmlDir = isRtl ? ' dir="rtl"' : '';

  // Get articles for this category in this language
  const catArticles = articles
    .filter(a => a.category === categorySlug && a[lang])
    .map(a => a[lang]);

  // Build article cards
  const articleCards = catArticles.map(a => `<div class="col-md-6 col-lg-4" style="margin-bottom:40px;">
<div onmouseout="this.style.borderColor='transparent'" onmouseover="this.style.borderColor='#eaca91'" style="background:#1a2d42;padding:30px;border-radius:10px;height:100%;border:2px solid transparent;transition:border 0.3s;">
<h3 style="color:#eaca91;margin-bottom:15px;"><a href="${a.slug}.html" style="color:#eaca91;text-decoration:none;">${a.title}</a></h3>
<p style="margin-bottom:15px;color:#ccc;">${a.desc}</p>
<a href="${a.slug}.html" style="color:#eaca91;font-weight:bold;">${lang === 'fr' ? 'Lire la Suite' : lang === 'ar' ? 'اقرأ المزيد' : 'Read More'} →</a>
</div>
</div>`).join('\n');

  // Category navigation - links to other categories
  const catNav = Object.entries(categories).map(([slug, data]) => {
    const label = data[lang].title.length > 30 ? data[lang].title.substring(0, 28) + '...' : data[lang].title;
    const active = slug === categorySlug ? 'background:#eaca91;color:#041228;' : 'background:transparent;color:#eaca91;border:1px solid #eaca91;';
    return `<a href="category-${slug}.html" style="${active}padding:8px 20px;border-radius:25px;text-decoration:none;font-weight:600;font-size:0.9rem;white-space:nowrap;">${data[lang].title.split(':')[0].split('|')[0].trim()}</a>`;
  }).join('\n');

  // Build hreflang tags
  const hreflangs = ['en', 'fr', 'ar'].map(l =>
    `<link href="https://foorsa.ma/${l}/blog/category-${categorySlug}" hreflang="${l}" rel="alternate"/>`
  ).join('\n');

  const ogLocale = lang === 'en' ? 'en_US' : lang === 'fr' ? 'fr_FR' : 'ar_AR';

  return `<!DOCTYPE html>
<html lang="${lang}"${htmlDir}>
<head>
<script>
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}
gtag('js',new Date());gtag('config','G-0JT7KY4DKQ');
(function(){var l=false;function load(){if(l)return;l=true;var s=document.createElement('script');s.src='https://www.googletagmanager.com/gtag/js?id=G-0JT7KY4DKQ';s.async=true;document.head.appendChild(s);};
['scroll','click','touchstart','keydown'].forEach(function(e){document.addEventListener(e,load,{once:true,passive:true});});
setTimeout(load,3500);})();
</script>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1" name="viewport"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" media="print" onload="this.media='all'"/>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet" media="print" onload="this.media='all'"/>
<title>${cat.metaTitle}</title>
<meta content="index, follow" name="robots"/>
<link href="../../assets/css/style.min.css?v=20260124d" rel="stylesheet"/>
<link href="../../assets/bootstrap/css/bootstrap.min.css?v=20260123" rel="stylesheet"/>
<meta content="${cat.desc}" name="description"/>
<meta content="${cat.keywords}" name="keywords"/>
<link href="https://foorsa.ma/${lang}/blog/category-${categorySlug}" rel="canonical"/>
${hreflangs}
<link href="https://foorsa.ma/${lang}/blog/category-${categorySlug}" hreflang="x-default" rel="alternate"/>
<meta content="${cat.metaTitle}" property="og:title"/>
<meta content="${cat.desc}" property="og:description"/>
<meta content="https://foorsa.ma/${lang}/blog/category-${categorySlug}" property="og:url"/>
<meta content="website" property="og:type"/>
<meta content="https://foorsa.ma/assets/img/logo.png" property="og:image"/>
<meta content="Foorsa" property="og:site_name"/>
<meta content="${ogLocale}" property="og:locale"/>
<meta content="summary_large_image" name="twitter:card"/>
<meta content="${cat.metaTitle}" name="twitter:title"/>
<meta content="${cat.desc}" name="twitter:description"/>
<meta content="https://foorsa.ma/assets/img/logo.png" name="twitter:image"/>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "${cat.title}",
  "description": "${cat.desc}",
  "url": "https://foorsa.ma/${lang}/blog/category-${categorySlug}",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Foorsa",
    "url": "https://foorsa.ma"
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "${nav.home}", "item": "https://foorsa.ma/${lang}/" },
      { "@type": "ListItem", "position": 2, "name": "${nav.blog}", "item": "https://foorsa.ma/${lang}/blog/" },
      { "@type": "ListItem", "position": 3, "name": "${cat.title}", "item": "https://foorsa.ma/${lang}/blog/category-${categorySlug}" }
    ]
  }
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Foorsa",
  "url": "https://foorsa.ma",
  "logo": { "@type": "ImageObject", "url": "https://foorsa.ma/assets/img/logo.png" },
  "contactPoint": { "@type": "ContactPoint", "telephone": "+212-0537-911291", "contactType": "Customer Service", "availableLanguage": ["en", "fr", "ar"] }
}
</script>
</head>
<body class="blog-index-page" style="background:#041228;color:#fff;">
<div class="header header-desktop sticky"><div class="logo-menu active"><div class="logo"><a href="../../"><img alt="Foorsa logo" src="../../assets/img/logo-bl.webp" width="40" height="40"/></a></div><nav class="main-menu active"><ul class="menu"><li class="menu-item menu-item-has-children"><a href="#">Foorsa<span class="dropdown-arrow">▼</span></a><ul class="sub-menu"><li><a href="../about-us.html">${nav.about}</a></li><li><a href="../contact.html">${nav.contact}</a></li></ul></li><li class="menu-item menu-item-has-children"><a href="#">China<span class="dropdown-arrow">▼</span></a><ul class="sub-menu"><li><a href="../majors.html">${nav.majors}</a></li><li><a href="../scholarship.html">${nav.scholarship}</a></li><li><a href="../fees.html">${nav.fees}</a></li></ul></li><li class="menu-item"><a href="index.html">${nav.blog}</a></li></ul></nav><a class="btn-apply-navbar" href="${nav.shopUrl}">${nav.apply}</a></div></div>
<div class="container" style="padding-top:120px;max-width:1200px;">
<nav aria-label="breadcrumb" style="margin-bottom:20px;">
<ol style="list-style:none;display:flex;gap:8px;padding:0;font-size:0.9rem;">
<li><a href="../index.html" style="color:#aaa;text-decoration:none;">${nav.home}</a> <span style="color:#555;">›</span></li>
<li><a href="index.html" style="color:#aaa;text-decoration:none;">${nav.blog}</a> <span style="color:#555;">›</span></li>
<li style="color:#eaca91;">${cat.title}</li>
</ol>
</nav>
<h1 style="color:#eaca91;font-size:2.5rem;margin-bottom:15px;text-align:center;">${cat.title}</h1>
<p style="text-align:center;font-size:1.1rem;margin-bottom:30px;color:#aaa;max-width:700px;margin-left:auto;margin-right:auto;">${cat.desc}</p>
<div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-bottom:50px;">
${catNav}
</div>
<div class="row">
${articleCards}
</div>
<div style="text-align:center;margin-top:30px;margin-bottom:40px;">
<a href="index.html" style="color:#eaca91;font-size:1.1rem;text-decoration:none;border-bottom:1px solid #eaca91;padding-bottom:2px;">← ${nav.allArticles}</a>
</div>
<div style="background:linear-gradient(135deg,#1a2d42 0%,#041228 100%);padding:60px 40px;margin-top:40px;text-align:center;border-radius:10px;border:2px solid #eaca91;">
<h2 style="color:#eaca91;font-size:2rem;margin-bottom:20px;">${nav.ctaTitle}</h2>
<p style="font-size:1.2rem;margin-bottom:30px;">${nav.ctaDesc}</p>
<a href="../contact.html" style="background:#eaca91;color:#041228;padding:15px 40px;text-decoration:none;border-radius:5px;font-weight:bold;display:inline-block;margin-right:15px;">${nav.ctaBtn1}</a>
<a href="${nav.shopUrl}" style="background:transparent;color:#eaca91;padding:15px 40px;text-decoration:none;border-radius:5px;font-weight:bold;display:inline-block;border:2px solid #eaca91;">${nav.ctaBtn2}</a>
</div>
</div>
<footer style="background:#000;color:#fff;padding:60px 20px 30px;margin-top:80px;">
<div class="container"><div class="row"><div class="col-md-4"><h4 style="color:#eaca91;margin-bottom:20px;">Foorsa</h4><p>${nav.footerTagline}</p></div><div class="col-md-4"><h4 style="color:#eaca91;margin-bottom:20px;">${lang === 'ar' ? 'روابط سريعة' : lang === 'fr' ? 'Liens Rapides' : 'Quick Links'}</h4><ul style="list-style:none;padding:0;"><li><a href="../index.html" style="color:#fff;">${nav.home}</a></li><li><a href="../scholarship.html" style="color:#fff;">${nav.scholarship}</a></li><li><a href="${nav.shopUrl}" style="color:#fff;">${nav.apply}</a></li><li><a href="../contact.html" style="color:#fff;">${nav.contact}</a></li></ul></div><div class="col-md-4"><h4 style="color:#eaca91;margin-bottom:20px;">${nav.contact}</h4><p>info@foorsa.ma</p></div></div><div style="text-align:center;padding-top:30px;border-top:1px solid #333;margin-top:30px;"><p>${nav.rights}</p></div></div>
</footer>
</body>
</html>`;
}

// Generate all category pages
console.log('Generating category pages...\n');
let count = 0;

for (const [catSlug] of Object.entries(categories)) {
  for (const lang of ['en', 'fr', 'ar']) {
    const dir = path.join(ROOT, lang, 'blog');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const filePath = path.join(dir, `category-${catSlug}.html`);
    const html = generateCategoryPage(lang, catSlug);
    fs.writeFileSync(filePath, html, 'utf8');
    count++;
    console.log(`  Created: ${lang}/blog/category-${catSlug}.html`);
  }
}

console.log(`\nGenerated ${count} category pages.`);
