#!/usr/bin/env node
/**
 * Foorsa pSEO Page Generator
 * Generates static HTML pages for universities and cities from JSON data.
 *
 * Usage: node scripts/generate-pages.js [--type universities|cities|majors|countries] [--lang en|fr|ar|all]
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'assets', 'data');

// Parse CLI args
const args = process.argv.slice(2);
const typeArg = args.find(a => a.startsWith('--type='))?.split('=')[1] || 'all';
const langArg = args.find(a => a.startsWith('--lang='))?.split('=')[1] || 'all';
const languages = langArg === 'all' ? ['en', 'fr', 'ar'] : [langArg];

// ============================================================================
// TRANSLATION STRINGS
// ============================================================================
const i18n = {
  en: {
    home: 'Home',
    universities: 'Universities',
    cities: 'Cities',
    studyAt: 'Study at',
    quickFacts: 'Quick Facts',
    founded: 'Founded',
    type: 'Type',
    public: 'Public',
    qsRanking: 'QS World Ranking',
    timesRanking: 'Times Ranking',
    students: 'Students',
    intlStudents: 'International Students',
    tuitionRange: 'Tuition Range (USD/year)',
    campusSize: 'Campus Size',
    halalFood: 'Halal Food Available',
    yes: 'Yes',
    no: 'No',
    englishPrograms: 'English-Taught Programs',
    academicStrengths: 'Academic Strengths',
    availablePrograms: 'Available Programs',
    scholarships: 'Scholarships Available',
    admissionRequirements: 'Admission Requirements',
    bachelors: "Bachelor's",
    masters: "Master's",
    phd: 'PhD',
    minGpa: 'Minimum GPA',
    languageReq: 'Language Requirement',
    entranceExam: 'Entrance Exam',
    required: 'Required',
    notRequired: 'Not Required',
    cityGuide: 'City Guide',
    livingIn: 'Student Guide: Living in',
    costOfLiving: 'Cost of Living',
    monthlyExpense: 'Monthly Expense',
    min: 'Min',
    max: 'Max',
    average: 'Average',
    rent: 'Rent',
    food: 'Food',
    transport: 'Transport',
    totalMonthly: 'Total Monthly',
    climate: 'Climate',
    halalAvailability: 'Halal Food',
    moroccanCommunity: 'Moroccan Community',
    muslimCommunity: 'Muslim Community',
    uniCount: 'Universities',
    population: 'Population',
    airport: 'Airport',
    keyHighlights: 'Key Highlights',
    universitiesInCity: 'Top Universities in',
    readyToApply: 'Ready to Apply?',
    applyWith: 'Apply to study in China with Foorsa',
    startApplication: 'Start Your Application',
    freeConsultation: 'Get Free Consultation',
    learnMore: 'Learn More',
    lastUpdated: 'Last verified',
    officialWebsite: 'Official Website',
    viewAllUniversities: 'View All Universities',
    viewAllCities: 'View All City Guides',
    relatedUniversities: 'Related Universities',
    c9League: 'C9 League Member',
    doubleFirstClass: 'Double First Class',
    foorsa: 'Foorsa',
    china: 'China',
    blog: 'Blog',
    aboutUs: 'About Us',
    missionValues: 'Mission & Values',
    engagement: 'Engagement',
    recruitment: 'Recruitment',
    partnerWithUs: 'Partner With Us',
    contactUs: 'Contact us',
    majors: 'Majors',
    scholarship: 'Scholarship',
    fees: 'Fees & Financing',
    stepByStep: 'Step by step',
    documents: 'Documents',
    faq: 'FAQ',
    allArticles: 'All Articles',
    termsOfService: 'Terms of Service',
    privacyPolicy: 'Privacy Policy',
    copyright: '© 2026 Foorsa. All rights reserved',
    readyTransform: 'Ready to Transform Your Future?',
    joinHundreds: 'Join hundreds of Moroccan students who chose Foorsa to study in China.',
    contact: 'Contact',
    careers: 'Careers',
    excellent: 'Excellent',
    good: 'Good',
    moderate: 'Moderate',
    large: 'Large',
    medium: 'Medium',
    small: 'Small',
    'very-large': 'Very Large',
    seoTitleUni: '{name} - Admission, Fees & Scholarships | Foorsa',
    seoDescUni: 'Study at {name} in {city}, China. Tuition from ${minTuition}/year. QS Ranking: #{ranking}. Scholarships available. Apply through Foorsa.',
    seoTitleCity: 'Student Life in {name}, China | Cost, Universities & Guide | Foorsa',
    seoDescCity: 'Complete student guide to {name}, China. Cost of living from ${minCost}/month. {uniCount} universities. Halal food: {halal}. Apply with Foorsa.',
    seoTitleMajor: 'Study {name} in China | Careers, Salaries & Universities | Foorsa',
    seoDescMajor: 'Study {name} in China. Career paths with salary data for Morocco & worldwide. Top universities, scholarships, and how to apply through Foorsa.',
    studyInChina: 'Study {name} in China',
    programOverview: 'Program Overview',
    whyStudyInChina: 'Why Study {name} in China?',
    careerPaths: 'Career Paths & Salaries',
    careerTitle: 'Job Title',
    salaryMorocco: 'Salary (Morocco)',
    salaryWorld: 'Salary (Global)',
    careerDescription: 'Description',
    watchVideo: 'Watch Video',
    relatedMajors: 'Related Programs',
    categoryLabel: 'Category',
    viewAllMajors: 'View All Programs',
    seoTitleUniIndex: 'Top Chinese Universities for International Students | Foorsa',
    seoDescUniIndex: 'Explore {count} top Chinese universities. Compare rankings, tuition fees, and scholarships. Apply through Foorsa.',
    seoTitleCityIndex: 'Student City Guides in China | Cost of Living & Universities | Foorsa',
    seoDescCityIndex: 'Explore {count} student-friendly cities in China. Compare cost of living, universities, and halal food availability.',
    seoTitleCountryIndex: 'Study in China from Your Country | Scholarships & Visa Guide | Foorsa',
    seoDescCountryIndex: 'Study in China from Morocco, Algeria, Tunisia, Egypt, and more. Country-specific scholarships, visa guides, and application support.',
    exploreUniversities: 'Explore Chinese Universities',
    exploreCities: 'Explore Student Cities in China',
    exploreCountries: 'Study in China from Your Country',
    browseByCountry: 'Choose your country for personalized scholarship and visa information.',
    tuitionFrom: 'Tuition from',
    perYear: '/year',
    monthlyFrom: 'From',
    perMonth: '/month',
    seoTitleCountry: 'Study in China from {country} | Scholarships & Admissions | Foorsa',
    seoDescCountry: 'Complete guide for {demonym} students to study in China. Scholarships, visa requirements, top universities, and how to apply through Foorsa.',
    studyFromCountry: 'Study in China from {country}',
    studentsInChina: '{demonym} Students in China',
    scholarshipRate: 'Scholarship Rate',
    avgFlightCost: 'Avg. Flight Cost',
    timeDifference: 'Time Difference',
    visaRequirements: 'Visa & Document Requirements',
    visaType: 'Visa Type',
    passportValidity: 'Passport Validity',
    requiredDocuments: 'Required Documents',
    acceptedTests: 'Accepted Language Tests',
    legalizationNote: 'Document Legalization',
    availableScholarships: 'Scholarships for {demonym} Students',
    scholarshipName: 'Scholarship',
    coverage: 'Coverage',
    deadline: 'Deadline',
    popularCities: 'Popular Cities',
    popularMajors: 'Popular Majors',
    studentTestimonial: 'Student Testimonial',
    applyNow: 'Apply Now',
    directFlights: 'Direct Flights',
    available: 'Available',
    notAvailable: 'Not Available'
  },
  fr: {
    home: 'Accueil',
    universities: 'Universités',
    cities: 'Villes',
    studyAt: 'Étudier à',
    quickFacts: 'En bref',
    founded: 'Fondée en',
    type: 'Type',
    public: 'Publique',
    qsRanking: 'Classement QS Mondial',
    timesRanking: 'Classement Times',
    students: 'Étudiants',
    intlStudents: 'Étudiants internationaux',
    tuitionRange: 'Frais de scolarité (USD/an)',
    campusSize: 'Taille du campus',
    halalFood: 'Nourriture halal disponible',
    yes: 'Oui',
    no: 'Non',
    englishPrograms: 'Programmes en anglais',
    academicStrengths: 'Points forts académiques',
    availablePrograms: 'Programmes disponibles',
    scholarships: 'Bourses disponibles',
    admissionRequirements: "Conditions d'admission",
    bachelors: 'Licence',
    masters: 'Master',
    phd: 'Doctorat',
    minGpa: 'Moyenne minimum',
    languageReq: 'Exigence linguistique',
    entranceExam: "Examen d'entrée",
    required: 'Requis',
    notRequired: 'Non requis',
    cityGuide: 'Guide Ville',
    livingIn: 'Guide étudiant : Vivre à',
    costOfLiving: 'Coût de la vie',
    monthlyExpense: 'Dépense mensuelle',
    min: 'Min',
    max: 'Max',
    average: 'Moyenne',
    rent: 'Loyer',
    food: 'Alimentation',
    transport: 'Transport',
    totalMonthly: 'Total mensuel',
    climate: 'Climat',
    halalAvailability: 'Nourriture halal',
    moroccanCommunity: 'Communauté marocaine',
    muslimCommunity: 'Communauté musulmane',
    uniCount: 'Universités',
    population: 'Population',
    airport: 'Aéroport',
    keyHighlights: 'Points clés',
    universitiesInCity: 'Meilleures universités à',
    readyToApply: 'Prêt à postuler ?',
    applyWith: 'Postulez pour étudier en Chine avec Foorsa',
    startApplication: 'Commencer votre candidature',
    freeConsultation: 'Consultation gratuite',
    learnMore: 'En savoir plus',
    lastUpdated: 'Dernière vérification',
    officialWebsite: 'Site officiel',
    viewAllUniversities: 'Voir toutes les universités',
    viewAllCities: 'Voir tous les guides de villes',
    relatedUniversities: 'Universités similaires',
    c9League: 'Membre de la Ligue C9',
    doubleFirstClass: 'Double First Class',
    foorsa: 'Foorsa',
    china: 'Chine',
    blog: 'Blog',
    aboutUs: 'À propos',
    missionValues: 'Mission et valeurs',
    engagement: 'Engagement',
    recruitment: 'Recrutement',
    partnerWithUs: 'Partenariat',
    contactUs: 'Contactez-nous',
    majors: 'Filières',
    scholarship: 'Bourses',
    fees: 'Frais et financement',
    stepByStep: 'Étape par étape',
    documents: 'Documents',
    faq: 'FAQ',
    allArticles: 'Tous les articles',
    termsOfService: "Conditions d'utilisation",
    privacyPolicy: 'Politique de confidentialité',
    copyright: '© 2026 Foorsa. Tous droits réservés',
    readyTransform: 'Prêt à transformer votre avenir ?',
    joinHundreds: "Rejoignez des centaines d'étudiants marocains qui ont choisi Foorsa pour étudier en Chine.",
    contact: 'Contact',
    careers: 'Carrières',
    excellent: 'Excellent',
    good: 'Bon',
    moderate: 'Modéré',
    large: 'Grande',
    medium: 'Moyenne',
    small: 'Petite',
    'very-large': 'Très grande',
    seoTitleUni: '{name} - Admission, Frais et Bourses | Foorsa',
    seoDescUni: "Étudiez à {name} à {city}, Chine. Frais dès {minTuition}$/an. Classement QS : #{ranking}. Bourses disponibles. Postulez via Foorsa.",
    seoTitleCity: 'Vie étudiante à {name}, Chine | Coût, Universités & Guide | Foorsa',
    seoDescCity: "Guide complet pour les étudiants à {name}, Chine. Coût de la vie dès {minCost}$/mois. {uniCount} universités. Halal : {halal}. Postulez avec Foorsa.",
    seoTitleMajor: "Étudier {name} en Chine | Carrières, Salaires & Universités | Foorsa",
    seoDescMajor: "Étudiez {name} en Chine. Parcours professionnels avec données salariales pour le Maroc et le monde. Meilleures universités, bourses et comment postuler via Foorsa.",
    studyInChina: 'Étudier {name} en Chine',
    programOverview: "Vue d'ensemble du programme",
    whyStudyInChina: 'Pourquoi étudier {name} en Chine ?',
    careerPaths: 'Parcours professionnels & Salaires',
    careerTitle: 'Poste',
    salaryMorocco: 'Salaire (Maroc)',
    salaryWorld: 'Salaire (Monde)',
    careerDescription: 'Description',
    watchVideo: 'Regarder la vidéo',
    relatedMajors: 'Programmes similaires',
    categoryLabel: 'Catégorie',
    viewAllMajors: 'Voir tous les programmes',
    seoTitleUniIndex: 'Meilleures universités chinoises pour étudiants internationaux | Foorsa',
    seoDescUniIndex: "Explorez {count} meilleures universités chinoises. Comparez classements, frais et bourses. Postulez via Foorsa.",
    seoTitleCityIndex: "Guides des villes étudiantes en Chine | Coût de la vie & Universités | Foorsa",
    seoDescCityIndex: "Explorez {count} villes étudiantes en Chine. Comparez le coût de la vie, les universités et la disponibilité du halal.",
    seoTitleCountryIndex: "Étudier en Chine depuis votre pays | Bourses & Guide Visa | Foorsa",
    seoDescCountryIndex: "Étudiez en Chine depuis le Maroc, l'Algérie, la Tunisie, l'Égypte et plus. Bourses, visas et accompagnement par pays.",
    exploreUniversities: 'Explorer les universités chinoises',
    exploreCities: 'Explorer les villes étudiantes en Chine',
    exploreCountries: 'Étudier en Chine depuis votre pays',
    browseByCountry: 'Choisissez votre pays pour des informations personnalisées sur les bourses et les visas.',
    tuitionFrom: 'Frais dès',
    perYear: '/an',
    monthlyFrom: 'À partir de',
    perMonth: '/mois',
    seoTitleCountry: "Étudier en Chine depuis {country} | Bourses & Admissions | Foorsa",
    seoDescCountry: "Guide complet pour les étudiants {demonym}s pour étudier en Chine. Bourses, visa, meilleures universités et comment postuler via Foorsa.",
    studyFromCountry: 'Étudier en Chine depuis {country}',
    studentsInChina: 'Étudiants {demonym}s en Chine',
    scholarshipRate: 'Taux de bourses',
    avgFlightCost: 'Coût moyen du vol',
    timeDifference: 'Décalage horaire',
    visaRequirements: 'Visa & Documents requis',
    visaType: 'Type de visa',
    passportValidity: 'Validité du passeport',
    requiredDocuments: 'Documents requis',
    acceptedTests: 'Tests de langue acceptés',
    legalizationNote: 'Légalisation des documents',
    availableScholarships: 'Bourses pour les étudiants {demonym}s',
    scholarshipName: 'Bourse',
    coverage: 'Couverture',
    deadline: 'Date limite',
    popularCities: 'Villes populaires',
    popularMajors: 'Filières populaires',
    studentTestimonial: 'Témoignage étudiant',
    applyNow: 'Postuler maintenant',
    directFlights: 'Vols directs',
    available: 'Disponible',
    notAvailable: 'Non disponible'
  },
  ar: {
    home: 'الرئيسية',
    universities: 'الجامعات',
    cities: 'المدن',
    studyAt: 'ادرس في',
    quickFacts: 'معلومات سريعة',
    founded: 'تأسست',
    type: 'النوع',
    public: 'حكومية',
    qsRanking: 'تصنيف QS العالمي',
    timesRanking: 'تصنيف تايمز',
    students: 'الطلاب',
    intlStudents: 'طلاب دوليون',
    tuitionRange: 'الرسوم الدراسية (دولار/سنة)',
    campusSize: 'حجم الحرم',
    halalFood: 'طعام حلال متوفر',
    yes: 'نعم',
    no: 'لا',
    englishPrograms: 'برامج باللغة الإنجليزية',
    academicStrengths: 'نقاط القوة الأكاديمية',
    availablePrograms: 'البرامج المتاحة',
    scholarships: 'المنح الدراسية المتاحة',
    admissionRequirements: 'شروط القبول',
    bachelors: 'بكالوريوس',
    masters: 'ماجستير',
    phd: 'دكتوراه',
    minGpa: 'الحد الأدنى للمعدل',
    languageReq: 'متطلبات اللغة',
    entranceExam: 'امتحان القبول',
    required: 'مطلوب',
    notRequired: 'غير مطلوب',
    cityGuide: 'دليل المدينة',
    livingIn: 'دليل الطالب: العيش في',
    costOfLiving: 'تكلفة المعيشة',
    monthlyExpense: 'المصروف الشهري',
    min: 'الحد الأدنى',
    max: 'الحد الأقصى',
    average: 'المتوسط',
    rent: 'الإيجار',
    food: 'الطعام',
    transport: 'المواصلات',
    totalMonthly: 'الإجمالي الشهري',
    climate: 'المناخ',
    halalAvailability: 'الطعام الحلال',
    moroccanCommunity: 'الجالية المغربية',
    muslimCommunity: 'المجتمع المسلم',
    uniCount: 'الجامعات',
    population: 'السكان',
    airport: 'المطار',
    keyHighlights: 'أبرز المميزات',
    universitiesInCity: 'أفضل الجامعات في',
    readyToApply: 'هل أنت مستعد للتقديم؟',
    applyWith: 'قدم للدراسة في الصين مع فورصة',
    startApplication: 'ابدأ طلبك',
    freeConsultation: 'استشارة مجانية',
    learnMore: 'اعرف المزيد',
    lastUpdated: 'آخر تحديث',
    officialWebsite: 'الموقع الرسمي',
    viewAllUniversities: 'عرض جميع الجامعات',
    viewAllCities: 'عرض جميع أدلة المدن',
    relatedUniversities: 'جامعات ذات صلة',
    c9League: 'عضو رابطة C9',
    doubleFirstClass: 'فئة أولى مزدوجة',
    foorsa: 'فورصة',
    china: 'الصين',
    blog: 'المدونة',
    aboutUs: 'من نحن',
    missionValues: 'المهمة والقيم',
    engagement: 'الالتزام',
    recruitment: 'التوظيف',
    partnerWithUs: 'شراكة معنا',
    contactUs: 'اتصل بنا',
    majors: 'التخصصات',
    scholarship: 'المنح',
    fees: 'الرسوم والتمويل',
    stepByStep: 'خطوة بخطوة',
    documents: 'الوثائق',
    faq: 'الأسئلة الشائعة',
    allArticles: 'جميع المقالات',
    termsOfService: 'شروط الخدمة',
    privacyPolicy: 'سياسة الخصوصية',
    copyright: '© 2026 فورصة. جميع الحقوق محفوظة',
    readyTransform: 'هل أنت مستعد لتغيير مستقبلك؟',
    joinHundreds: 'انضم إلى مئات الطلاب المغاربة الذين اختاروا فورصة للدراسة في الصين.',
    contact: 'تواصل',
    careers: 'وظائف',
    excellent: 'ممتاز',
    good: 'جيد',
    moderate: 'متوسط',
    large: 'كبيرة',
    medium: 'متوسطة',
    small: 'صغيرة',
    'very-large': 'كبيرة جداً',
    seoTitleUni: '{name} - القبول والرسوم والمنح | فورصة',
    seoDescUni: 'ادرس في {name} في {city}، الصين. الرسوم تبدأ من {minTuition}$/سنة. تصنيف QS: #{ranking}. منح متاحة. قدم عبر فورصة.',
    seoTitleCity: 'الحياة الطلابية في {name}، الصين | التكلفة والجامعات والدليل | فورصة',
    seoDescCity: 'دليل شامل للطلاب في {name}، الصين. تكلفة المعيشة من {minCost}$/شهر. {uniCount} جامعة. حلال: {halal}. قدم مع فورصة.',
    seoTitleMajor: 'دراسة {name} في الصين | الوظائف والرواتب والجامعات | فورصة',
    seoDescMajor: 'ادرس {name} في الصين. مسارات مهنية مع بيانات الرواتب في المغرب والعالم. أفضل الجامعات والمنح وطريقة التقديم عبر فورصة.',
    studyInChina: 'دراسة {name} في الصين',
    programOverview: 'نظرة عامة على البرنامج',
    whyStudyInChina: 'لماذا تدرس {name} في الصين؟',
    careerPaths: 'المسارات المهنية والرواتب',
    careerTitle: 'المسمى الوظيفي',
    salaryMorocco: 'الراتب (المغرب)',
    salaryWorld: 'الراتب (عالمياً)',
    careerDescription: 'الوصف',
    watchVideo: 'شاهد الفيديو',
    relatedMajors: 'تخصصات مشابهة',
    categoryLabel: 'التصنيف',
    viewAllMajors: 'عرض جميع التخصصات',
    seoTitleUniIndex: 'أفضل الجامعات الصينية للطلاب الدوليين | فورصة',
    seoDescUniIndex: 'استكشف {count} من أفضل الجامعات الصينية. قارن التصنيفات والرسوم والمنح. قدم عبر فورصة.',
    seoTitleCityIndex: 'أدلة المدن الطلابية في الصين | تكلفة المعيشة والجامعات | فورصة',
    seoDescCityIndex: 'استكشف {count} مدينة طلابية في الصين. قارن تكلفة المعيشة والجامعات وتوفر الطعام الحلال.',
    seoTitleCountryIndex: 'ادرس في الصين من بلدك | المنح ودليل التأشيرة | فورصة',
    seoDescCountryIndex: 'ادرس في الصين من المغرب والجزائر وتونس ومصر والمزيد. منح ومعلومات تأشيرة ودعم تقديم حسب البلد.',
    exploreUniversities: 'استكشف الجامعات الصينية',
    exploreCities: 'استكشف المدن الطلابية في الصين',
    exploreCountries: 'ادرس في الصين من بلدك',
    browseByCountry: 'اختر بلدك للحصول على معلومات مخصصة عن المنح والتأشيرات.',
    tuitionFrom: 'الرسوم من',
    perYear: '/سنة',
    monthlyFrom: 'من',
    perMonth: '/شهر',
    seoTitleCountry: 'الدراسة في الصين من {country} | المنح والقبول | فورصة',
    seoDescCountry: 'دليل شامل للطلاب من {country} للدراسة في الصين. المنح، التأشيرة، أفضل الجامعات وطريقة التقديم عبر فورصة.',
    studyFromCountry: 'الدراسة في الصين من {country}',
    studentsInChina: 'طلاب من {country} في الصين',
    scholarshipRate: 'نسبة المنح',
    avgFlightCost: 'متوسط تكلفة الرحلة',
    timeDifference: 'فارق التوقيت',
    visaRequirements: 'متطلبات التأشيرة والمستندات',
    visaType: 'نوع التأشيرة',
    passportValidity: 'صلاحية جواز السفر',
    requiredDocuments: 'المستندات المطلوبة',
    acceptedTests: 'اختبارات اللغة المقبولة',
    legalizationNote: 'توثيق المستندات',
    availableScholarships: 'المنح المتاحة للطلاب من {country}',
    scholarshipName: 'المنحة',
    coverage: 'التغطية',
    deadline: 'الموعد النهائي',
    popularCities: 'المدن الشائعة',
    popularMajors: 'التخصصات الشائعة',
    studentTestimonial: 'شهادة طالب',
    applyNow: 'قدم الآن',
    directFlights: 'رحلات مباشرة',
    available: 'متوفر',
    notAvailable: 'غير متوفر'
  }
};

// ============================================================================
// HELPERS
// ============================================================================
function t(lang, key) { return i18n[lang]?.[key] || i18n.en[key] || key; }

function escHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function formatProgram(slug) {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function getAssetPrefix(lang) {
  // University/city pages are at /{lang}/universities/{slug}.html — need ../../assets
  return '../../assets';
}

function getCityName(cityId, lang, cities) {
  const city = cities.find(c => c.id === cityId);
  return city ? city.name[lang] || city.name.en : cityId;
}

// ============================================================================
// PAGE HEAD TEMPLATE
// ============================================================================
function renderHead(lang, { title, description, canonical, ogImage, breadcrumbSchema, mainSchema }) {
  const dir = lang === 'ar' ? ' dir="rtl"' : '';
  const locale = lang === 'ar' ? 'ar_MA' : lang === 'fr' ? 'fr_FR' : 'en_US';
  const assetPrefix = getAssetPrefix(lang);
  const rtlCss = lang === 'ar' ? `<link href="${assetPrefix}/css/rtl.css?v=20260124" media="all" rel="stylesheet"/>` : '';

  return `<!DOCTYPE html>
<html lang="${lang}"${dir}>
<head>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-0JT7KY4DKQ"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-0JT7KY4DKQ');
</script>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1" name="viewport"/>
<title>${escHtml(title)}</title>
<meta content="index, follow" name="robots"/>
<link as="style" href="${assetPrefix}/css/style.min.css?v=20260124d" rel="preload"/>
<link as="font" crossorigin href="${assetPrefix}/fonts/Marcher-Bold.woff2" rel="preload" type="font/woff2"/>
<link as="font" crossorigin href="${assetPrefix}/fonts/Marcher-Light.woff2" rel="preload" type="font/woff2"/>
<link href="${assetPrefix}/bootstrap/css/bootstrap.min.css?v=20260123" rel="stylesheet"/>
<link href="${assetPrefix}/css/style.min.css?v=20260124d" rel="stylesheet"/>
<link href="${assetPrefix}/css/responsive.min.css?v=20260124b" rel="stylesheet"/>
${rtlCss}
<meta name="description" content="${escHtml(description)}"/>
<link href="${canonical}" rel="canonical"/>
<meta property="og:title" content="${escHtml(title)}"/>
<meta property="og:description" content="${escHtml(description)}"/>
<meta property="og:url" content="${canonical}"/>
<meta property="og:type" content="website"/>
<meta property="og:image" content="https://foorsa.ma/assets/img/logo.png"/>
<meta property="og:site_name" content="Foorsa"/>
<meta property="og:locale" content="${locale}"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="${escHtml(title)}"/>
<meta name="twitter:description" content="${escHtml(description)}"/>
<meta name="twitter:image" content="https://foorsa.ma/assets/img/logo.png"/>
<script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>
<script type="application/ld+json">${JSON.stringify(mainSchema)}</script>
<script defer src="/js/language-handler.js?v=20260123"></script>
</head>`;
}

// ============================================================================
// NAV + FOOTER TEMPLATES
// ============================================================================
function renderNav(lang) {
  const prefix = lang === 'ar' ? '../../ar' : lang === 'fr' ? '../../fr' : '../../en';
  return `<body class="wp-singular page-template wp-theme-foorsa">
<div class="header header-desktop sticky">
<div class="logo-menu active">
<div class="logo"><a href="${prefix}/"><img alt="Foorsa logo" loading="lazy" src="../../assets/img/logo-bl.webp"/></a></div>
<nav class="main-menu active"><ul class="menu">
<li class="menu-item menu-item-has-children"><a href="#">${t(lang,'foorsa')}<span class="dropdown-arrow"> ▼</span></a>
<ul class="sub-menu">
<li><a href="${prefix}/about-us.html">${t(lang,'aboutUs')}</a></li>
<li><a href="${prefix}/contact.html">${t(lang,'contactUs')}</a></li>
</ul></li>
<li class="menu-item menu-item-has-children"><a href="#">${t(lang,'china')}<span class="dropdown-arrow"> ▼</span></a>
<ul class="sub-menu">
<li><a href="${prefix}/universities/index.html">${t(lang,'universities')}</a></li>
<li><a href="${prefix}/cities/index.html">${t(lang,'cities')}</a></li>
<li><a href="${prefix}/majors.html">${t(lang,'majors')}</a></li>
<li><a href="${prefix}/scholarship.html">${t(lang,'scholarship')}</a></li>
<li><a href="${prefix}/fees.html">${t(lang,'fees')}</a></li>
<li><a href="${prefix}/step-by-step.html">${t(lang,'stepByStep')}</a></li>
<li><a href="${prefix}/documents.html">${t(lang,'documents')}</a></li>
<li><a href="${prefix}/frequently-asked-questions.html">${t(lang,'faq')}</a></li>
</ul></li>
<li class="menu-item"><a href="${prefix}/blog/index.html">${t(lang,'blog')}</a></li>
</ul></nav>
<div class="cta-header">
<a class="btn-apply-navbar" href="${prefix}/shop.html">${t(lang,'startApplication')}</a>
<a href="https://wa.me/+2120537911291" target="_blank"><img alt="WhatsApp" loading="lazy" src="../../assets/img/whatsapp-white.webp"/></a>
</div>
</div></div>`;
}

function renderFooter(lang) {
  const prefix = lang === 'ar' ? '../../ar' : lang === 'fr' ? '../../fr' : '../../en';
  return `<footer class="section" id="sectionFooter">
<div class="footer"><div class="firstFooter"><div class="container"><div class="firstFooter-inner">
<div class="content"><h2>${t(lang,'readyTransform')}</h2><p>${t(lang,'joinHundreds')}</p></div>
<div class="actions">
<button class="cartoon-btn" onclick="window.location.href='${prefix}/shop.html'">${t(lang,'startApplication')}</button>
<button class="cartoon-btn white" onclick="window.location.href='${prefix}/contact.html'">${t(lang,'freeConsultation')}</button>
</div></div></div>
<div class="secondFooter"><div class="container"><div class="menuFooter"><div class="items-menu">
<div class="item-menu"><label>${t(lang,'china')}</label><div class="menu"><ul class="menu">
<li class="menu-item"><a href="${prefix}/universities/index.html">${t(lang,'universities')}</a></li>
<li class="menu-item"><a href="${prefix}/cities/index.html">${t(lang,'cities')}</a></li>
<li class="menu-item"><a href="${prefix}/majors.html">${t(lang,'majors')}</a></li>
<li class="menu-item"><a href="${prefix}/scholarship.html">${t(lang,'scholarship')}</a></li>
<li class="menu-item"><a href="${prefix}/study-from/index.html">${t(lang,'exploreCountries')}</a></li>
</ul></div></div>
<div class="item-menu"><label>${t(lang,'foorsa')}</label><div class="menu"><ul class="menu">
<li class="menu-item"><a href="${prefix}/about-us.html">${t(lang,'aboutUs')}</a></li>
<li class="menu-item"><a href="${prefix}/contact.html">${t(lang,'contact')}</a></li>
</ul></div></div>
<div class="item-menu"><label>${t(lang,'blog')}</label><div class="menu"><ul class="menu">
<li class="menu-item"><a href="${prefix}/blog/index.html">${t(lang,'allArticles')}</a></li>
</ul></div></div>
</div>
<div class="socialMedia">
<a href="https://www.facebook.com/Foorsaconsulting/" target="_blank"><img alt="facebook" loading="lazy" src="../../assets/img/facebook-white.webp"/></a>
<a href="http://www.instagram.com/foorsa.ma/" target="_blank"><img alt="instagram" loading="lazy" src="../../assets/img/instagram-white.webp"/></a>
<a href="https://www.linkedin.com/company/fooorsa-consulting" target="_blank"><img alt="linkedin" loading="lazy" src="../../assets/img/linkedin-white.webp"/></a>
<a href="https://wa.me/+2120537911291" target="_blank"><img alt="whatsapp" loading="lazy" src="../../assets/img/whatsapp-white.webp"/></a>
</div></div>
<hr/>
<div class="copyRight"><p>${t(lang,'copyright')}</p>
<div class="conditions">
<a href="${prefix}/terms-of-service.html">${t(lang,'termsOfService')}</a>
<a href="${prefix}/privacy-policy.html">${t(lang,'privacyPolicy')}</a>
</div></div></div></div></div>
</footer>
<script src="../../assets/js/navigation.js?v=20260123"></script>
<script src="../../assets/bootstrap/js/bootstrap.bundle.js?v=20260123"></script>
<script src="../../assets/js/global.js?v=20260124b"></script>
<script defer src="/js/tracker.js"></script>
<script defer src="/js/ga4-events.js"></script>
<script defer src="/js/form-handler.js"></script>
</body></html>`;
}

// ============================================================================
// UNIVERSITY PAGE GENERATOR
// ============================================================================
function generateUniversityPage(uni, lang, allUniversities, allCities) {
  const name = uni.name[lang] || uni.name.en;
  const cityName = getCityName(uni.city, lang, allCities);
  const desc = uni.description[lang] || uni.description.en;
  const strengths = uni.strengths[lang] || uni.strengths.en;
  const slug = uni.id;
  const canonical = `https://foorsa.ma/${lang}/universities/${slug}.html`;

  const seoTitle = t(lang, 'seoTitleUni')
    .replace('{name}', name);
  const seoDesc = t(lang, 'seoDescUni')
    .replace('{name}', name)
    .replace('{city}', cityName)
    .replace('{minTuition}', uni.tuition_range_usd.min)
    .replace('{ranking}', uni.ranking_qs);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": t(lang, 'home'), "item": `https://foorsa.ma/${lang}/index.html` },
      { "@type": "ListItem", "position": 2, "name": t(lang, 'universities'), "item": `https://foorsa.ma/${lang}/majors.html` },
      { "@type": "ListItem", "position": 3, "name": name, "item": canonical }
    ]
  };

  const mainSchema = {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    "name": name,
    "url": uni.website,
    "foundingDate": String(uni.founded),
    "address": { "@type": "PostalAddress", "addressLocality": cityName, "addressCountry": "CN" },
    "numberOfStudents": uni.student_count,
    "description": desc
  };

  // Find related universities (same city or similar ranking)
  const related = allUniversities
    .filter(u => u.id !== uni.id && (u.city === uni.city || Math.abs(u.ranking_qs - uni.ranking_qs) < 150))
    .slice(0, 3);

  const head = renderHead(lang, { title: seoTitle, description: seoDesc, canonical, mainSchema, breadcrumbSchema });
  const nav = renderNav(lang);
  const prefix = `../../${lang}`;

  const body = `
<main class="container" style="padding-top:120px;padding-bottom:60px;">
  <!-- Breadcrumb -->
  <nav aria-label="breadcrumb" style="margin-bottom:24px;">
    <ol class="breadcrumb" style="font-size:14px;">
      <li class="breadcrumb-item"><a href="${prefix}/index.html">${t(lang,'home')}</a></li>
      <li class="breadcrumb-item"><a href="${prefix}/majors.html">${t(lang,'universities')}</a></li>
      <li class="breadcrumb-item active" aria-current="page">${name}</li>
    </ol>
  </nav>

  <!-- Hero Section -->
  <div class="row mb-5">
    <div class="col-lg-8">
      <h1 style="font-size:2.5rem;font-weight:700;margin-bottom:16px;">${t(lang,'studyAt')} ${name}</h1>
      <p style="font-size:1.1rem;line-height:1.7;color:#555;">${desc}</p>
      ${uni.c9_league ? `<span style="display:inline-block;background:#e8f5e9;color:#2e7d32;padding:4px 12px;border-radius:20px;font-size:13px;font-weight:600;margin-right:8px;">✓ ${t(lang,'c9League')}</span>` : ''}
      ${uni.double_first_class ? `<span style="display:inline-block;background:#e3f2fd;color:#1565c0;padding:4px 12px;border-radius:20px;font-size:13px;font-weight:600;">✓ ${t(lang,'doubleFirstClass')}</span>` : ''}
    </div>
    <div class="col-lg-4">
      <div style="background:#f8f9fa;border-radius:12px;padding:24px;border:1px solid #e9ecef;">
        <h3 style="font-size:1.2rem;font-weight:600;margin-bottom:16px;">${t(lang,'quickFacts')}</h3>
        <table style="width:100%;font-size:14px;">
          <tr><td style="padding:6px 0;color:#777;">${t(lang,'founded')}</td><td style="padding:6px 0;font-weight:600;text-align:right;">${uni.founded}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">${t(lang,'qsRanking')}</td><td style="padding:6px 0;font-weight:600;text-align:right;">#${uni.ranking_qs}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">${t(lang,'timesRanking')}</td><td style="padding:6px 0;font-weight:600;text-align:right;">#${uni.ranking_times}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">${t(lang,'students')}</td><td style="padding:6px 0;font-weight:600;text-align:right;">${uni.student_count?.toLocaleString() || 'N/A'}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">${t(lang,'intlStudents')}</td><td style="padding:6px 0;font-weight:600;text-align:right;">${uni.international_students?.toLocaleString() || 'N/A'}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">${t(lang,'tuitionRange')}</td><td style="padding:6px 0;font-weight:600;text-align:right;">$${uni.tuition_range_usd.min} - $${uni.tuition_range_usd.max}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">${t(lang,'halalFood')}</td><td style="padding:6px 0;font-weight:600;text-align:right;">${uni.halal_food ? t(lang,'yes') : t(lang,'no')}</td></tr>
          <tr><td style="padding:6px 0;color:#777;">${t(lang,'englishPrograms')}</td><td style="padding:6px 0;font-weight:600;text-align:right;">${uni.english_taught_programs ? t(lang,'yes') : t(lang,'no')}</td></tr>
        </table>
        <a href="${uni.website}" target="_blank" rel="noopener" style="display:block;text-align:center;margin-top:16px;color:#1a73e8;font-size:14px;">${t(lang,'officialWebsite')} →</a>
      </div>
    </div>
  </div>

  <!-- Academic Strengths -->
  <section class="mb-5">
    <h2 style="font-size:1.6rem;font-weight:600;margin-bottom:16px;">${t(lang,'academicStrengths')}</h2>
    <div class="row">
      ${strengths.map(s => `<div class="col-md-4 col-6 mb-3"><div style="background:#f0f7ff;border-radius:8px;padding:12px 16px;text-align:center;font-weight:500;">${s}</div></div>`).join('')}
    </div>
  </section>

  <!-- Available Programs -->
  <section class="mb-5">
    <h2 style="font-size:1.6rem;font-weight:600;margin-bottom:16px;">${t(lang,'availablePrograms')}</h2>
    <div class="row">
      ${uni.programs.map(p => `<div class="col-md-3 col-6 mb-2"><span style="display:inline-block;padding:6px 14px;background:#f5f5f5;border-radius:20px;font-size:14px;margin:4px;">${formatProgram(p)}</span></div>`).join('')}
    </div>
  </section>

  <!-- Scholarships -->
  <section class="mb-5">
    <h2 style="font-size:1.6rem;font-weight:600;margin-bottom:16px;">${t(lang,'scholarships')}</h2>
    <div class="row">
      ${uni.scholarship_types.map(s => `<div class="col-md-3 col-6 mb-3"><div style="background:#fff3e0;border-radius:8px;padding:16px;text-align:center;"><strong>${s}</strong></div></div>`).join('')}
    </div>
    <p style="margin-top:12px;"><a href="${prefix}/scholarship.html" style="color:#1a73e8;">${t(lang,'learnMore')} →</a></p>
  </section>

  <!-- Admission Requirements -->
  <section class="mb-5">
    <h2 style="font-size:1.6rem;font-weight:600;margin-bottom:16px;">${t(lang,'admissionRequirements')}</h2>
    <div class="table-responsive">
      <table class="table table-bordered" style="font-size:14px;">
        <thead style="background:#f8f9fa;">
          <tr><th></th><th>${t(lang,'bachelors')}</th><th>${t(lang,'masters')}</th><th>${t(lang,'phd')}</th></tr>
        </thead>
        <tbody>
          <tr><td style="font-weight:600;">${t(lang,'minGpa')}</td>
            <td>${uni.admission_requirements.bachelors.min_gpa}</td>
            <td>${uni.admission_requirements.masters.min_gpa}</td>
            <td>${uni.admission_requirements.phd.min_gpa}</td></tr>
          <tr><td style="font-weight:600;">${t(lang,'languageReq')}</td>
            <td>${uni.admission_requirements.bachelors.language}</td>
            <td>${uni.admission_requirements.masters.language}</td>
            <td>${uni.admission_requirements.phd.language}</td></tr>
          <tr><td style="font-weight:600;">${t(lang,'entranceExam')}</td>
            <td>${uni.admission_requirements.bachelors.entrance_exam ? t(lang,'required') : t(lang,'notRequired')}</td>
            <td>${uni.admission_requirements.masters.entrance_exam ? t(lang,'required') : t(lang,'notRequired')}</td>
            <td>${uni.admission_requirements.phd.entrance_exam ? t(lang,'required') : t(lang,'notRequired')}</td></tr>
        </tbody>
      </table>
    </div>
  </section>

  <!-- City Info -->
  <section class="mb-5">
    <h2 style="font-size:1.6rem;font-weight:600;margin-bottom:16px;">${t(lang,'cityGuide')}: ${cityName}</h2>
    <p>${t(lang,'learnMore')}: <a href="../cities/${uni.city}.html" style="color:#1a73e8;">${t(lang,'livingIn')} ${cityName} →</a></p>
  </section>

  <!-- CTA -->
  <section style="background:linear-gradient(135deg,#1a237e,#0d47a1);border-radius:16px;padding:48px 32px;text-align:center;color:white;margin-bottom:40px;">
    <h2 style="font-size:1.8rem;font-weight:700;margin-bottom:12px;">${t(lang,'readyToApply')}</h2>
    <p style="font-size:1.1rem;opacity:0.9;margin-bottom:24px;">${t(lang,'applyWith')}</p>
    <a href="https://apply.foorsa.ma" class="cartoon-btn" target="_blank" rel="noopener" style="display:inline-block;background:white;color:#1a237e;padding:14px 32px;border-radius:30px;font-weight:600;text-decoration:none;margin:8px;">${t(lang,'startApplication')}</a>
    <a href="${prefix}/contact.html" class="cartoon-btn" style="display:inline-block;background:transparent;color:white;border:2px solid white;padding:14px 32px;border-radius:30px;font-weight:600;text-decoration:none;margin:8px;">${t(lang,'freeConsultation')}</a>
  </section>

  <!-- Related Universities -->
  ${related.length > 0 ? `
  <section class="mb-5">
    <h2 style="font-size:1.6rem;font-weight:600;margin-bottom:16px;">${t(lang,'relatedUniversities')}</h2>
    <div class="row">
      ${related.map(r => {
        const rName = r.name[lang] || r.name.en;
        const rCity = getCityName(r.city, lang, allCities);
        return `<div class="col-md-4 mb-3">
          <a href="./${r.id}.html" style="text-decoration:none;color:inherit;">
            <div style="border:1px solid #e9ecef;border-radius:12px;padding:20px;">
              <h3 style="font-size:1.1rem;font-weight:600;margin-bottom:8px;">${rName}</h3>
              <p style="color:#777;font-size:14px;margin-bottom:4px;">${rCity} · QS #${r.ranking_qs}</p>
              <p style="color:#777;font-size:14px;">$${r.tuition_range_usd.min} - $${r.tuition_range_usd.max}/year</p>
            </div>
          </a>
        </div>`;
      }).join('')}
    </div>
  </section>` : ''}

  <p style="font-size:12px;color:#999;text-align:center;">${t(lang,'lastUpdated')}: ${uni.last_updated}</p>
</main>`;

  return head + '\n' + nav + '\n' + body + '\n' + renderFooter(lang);
}

// ============================================================================
// CITY PAGE GENERATOR
// ============================================================================
function generateCityPage(city, lang, allUniversities, allCities) {
  const name = city.name[lang] || city.name.en;
  const desc = city.description[lang] || city.description.en;
  const climate = city.climate[lang] || city.climate.en;
  const highlights = city.highlights[lang] || city.highlights.en;
  const slug = city.id;
  const canonical = `https://foorsa.ma/${lang}/cities/${slug}.html`;
  const col = city.cost_of_living;

  const seoTitle = t(lang, 'seoTitleCity')
    .replace('{name}', name);
  const seoDesc = t(lang, 'seoDescCity')
    .replace('{name}', name)
    .replace('{minCost}', col.total_monthly_usd.min)
    .replace('{uniCount}', city.universities_count)
    .replace('{halal}', t(lang, city.halal_food_availability));

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": t(lang, 'home'), "item": `https://foorsa.ma/${lang}/index.html` },
      { "@type": "ListItem", "position": 2, "name": t(lang, 'cities'), "item": `https://foorsa.ma/${lang}/index.html` },
      { "@type": "ListItem", "position": 3, "name": name, "item": canonical }
    ]
  };

  const mainSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": name,
    "address": { "@type": "PostalAddress", "addressRegion": city.province, "addressCountry": "CN" },
    "description": desc
  };

  // Find universities in this city
  const cityUnis = allUniversities.filter(u => u.id && city.key_universities.includes(u.id));

  const head = renderHead(lang, { title: seoTitle, description: seoDesc, canonical, mainSchema, breadcrumbSchema });
  const nav = renderNav(lang);
  const prefix = `../../${lang}`;

  const body = `
<main class="container" style="padding-top:120px;padding-bottom:60px;">
  <!-- Breadcrumb -->
  <nav aria-label="breadcrumb" style="margin-bottom:24px;">
    <ol class="breadcrumb" style="font-size:14px;">
      <li class="breadcrumb-item"><a href="${prefix}/index.html">${t(lang,'home')}</a></li>
      <li class="breadcrumb-item">${t(lang,'cities')}</li>
      <li class="breadcrumb-item active" aria-current="page">${name}</li>
    </ol>
  </nav>

  <!-- Hero -->
  <h1 style="font-size:2.5rem;font-weight:700;margin-bottom:16px;">${t(lang,'livingIn')} ${name}</h1>
  <p style="font-size:1.1rem;line-height:1.7;color:#555;margin-bottom:32px;">${desc}</p>

  <!-- Quick Facts -->
  <div class="row mb-5">
    <div class="col-md-3 col-6 mb-3"><div style="background:#f0f7ff;border-radius:12px;padding:20px;text-align:center;"><div style="font-size:24px;font-weight:700;">${city.universities_count}</div><div style="color:#777;font-size:14px;">${t(lang,'uniCount')}</div></div></div>
    <div class="col-md-3 col-6 mb-3"><div style="background:#f0faf0;border-radius:12px;padding:20px;text-align:center;"><div style="font-size:24px;font-weight:700;">$${col.total_monthly_usd.average}</div><div style="color:#777;font-size:14px;">${t(lang,'average')} / ${t(lang,'totalMonthly').toLowerCase()}</div></div></div>
    <div class="col-md-3 col-6 mb-3"><div style="background:#fff8e1;border-radius:12px;padding:20px;text-align:center;"><div style="font-size:24px;font-weight:700;">${t(lang, city.halal_food_availability)}</div><div style="color:#777;font-size:14px;">${t(lang,'halalAvailability')}</div></div></div>
    <div class="col-md-3 col-6 mb-3"><div style="background:#fce4ec;border-radius:12px;padding:20px;text-align:center;"><div style="font-size:24px;font-weight:700;">${city.population}</div><div style="color:#777;font-size:14px;">${t(lang,'population')}</div></div></div>
  </div>

  <!-- Key Highlights -->
  <section class="mb-5">
    <h2 style="font-size:1.6rem;font-weight:600;margin-bottom:16px;">${t(lang,'keyHighlights')}</h2>
    <ul style="font-size:1rem;line-height:2;">
      ${highlights.map(h => `<li>${h}</li>`).join('')}
    </ul>
  </section>

  <!-- Cost of Living -->
  <section class="mb-5">
    <h2 style="font-size:1.6rem;font-weight:600;margin-bottom:16px;">${t(lang,'costOfLiving')}</h2>
    <div class="table-responsive">
      <table class="table table-bordered" style="font-size:14px;">
        <thead style="background:#f8f9fa;">
          <tr><th>${t(lang,'monthlyExpense')}</th><th>${t(lang,'min')}</th><th>${t(lang,'average')}</th><th>${t(lang,'max')}</th></tr>
        </thead>
        <tbody>
          <tr><td style="font-weight:600;">${t(lang,'rent')}</td><td>$${col.rent_monthly_usd.min}</td><td>$${col.rent_monthly_usd.average}</td><td>$${col.rent_monthly_usd.max}</td></tr>
          <tr><td style="font-weight:600;">${t(lang,'food')}</td><td>$${col.food_monthly_usd.min}</td><td>$${col.food_monthly_usd.average}</td><td>$${col.food_monthly_usd.max}</td></tr>
          <tr><td style="font-weight:600;">${t(lang,'transport')}</td><td>$${col.transport_monthly_usd.min}</td><td>$${col.transport_monthly_usd.average}</td><td>$${col.transport_monthly_usd.max}</td></tr>
          <tr style="font-weight:700;background:#f0f7ff;"><td>${t(lang,'totalMonthly')}</td><td>$${col.total_monthly_usd.min}</td><td>$${col.total_monthly_usd.average}</td><td>$${col.total_monthly_usd.max}</td></tr>
        </tbody>
      </table>
    </div>
    <p style="font-size:13px;color:#999;">* ${t(lang,'lastUpdated')}: ${city.last_updated}</p>
  </section>

  <!-- Climate -->
  <section class="mb-5">
    <h2 style="font-size:1.6rem;font-weight:600;margin-bottom:16px;">${t(lang,'climate')}</h2>
    <p style="font-size:1rem;line-height:1.7;">${climate}</p>
  </section>

  <!-- Community Info -->
  <section class="mb-5">
    <div class="row">
      <div class="col-md-4 mb-3"><div style="border:1px solid #e9ecef;border-radius:12px;padding:20px;text-align:center;"><h3 style="font-size:1rem;color:#777;">${t(lang,'halalAvailability')}</h3><p style="font-size:1.3rem;font-weight:700;">${t(lang, city.halal_food_availability)}</p></div></div>
      <div class="col-md-4 mb-3"><div style="border:1px solid #e9ecef;border-radius:12px;padding:20px;text-align:center;"><h3 style="font-size:1rem;color:#777;">${t(lang,'moroccanCommunity')}</h3><p style="font-size:1.3rem;font-weight:700;">${t(lang, city.moroccan_community)}</p></div></div>
      <div class="col-md-4 mb-3"><div style="border:1px solid #e9ecef;border-radius:12px;padding:20px;text-align:center;"><h3 style="font-size:1rem;color:#777;">${t(lang,'airport')}</h3><p style="font-size:1.3rem;font-weight:700;">${city.airport}</p></div></div>
    </div>
  </section>

  <!-- Universities in this city -->
  ${cityUnis.length > 0 ? `
  <section class="mb-5">
    <h2 style="font-size:1.6rem;font-weight:600;margin-bottom:16px;">${t(lang,'universitiesInCity')} ${name}</h2>
    <div class="row">
      ${cityUnis.map(u => {
        const uName = u.name[lang] || u.name.en;
        return `<div class="col-md-4 mb-3">
          <a href="../universities/${u.id}.html" style="text-decoration:none;color:inherit;">
            <div style="border:1px solid #e9ecef;border-radius:12px;padding:20px;">
              <h3 style="font-size:1.1rem;font-weight:600;margin-bottom:8px;">${uName}</h3>
              <p style="color:#777;font-size:14px;margin-bottom:4px;">QS #${u.ranking_qs} · ${t(lang,'timesRanking')} #${u.ranking_times}</p>
              <p style="color:#777;font-size:14px;">$${u.tuition_range_usd.min} - $${u.tuition_range_usd.max}/${lang === 'fr' ? 'an' : lang === 'ar' ? 'سنة' : 'year'}</p>
            </div>
          </a>
        </div>`;
      }).join('')}
    </div>
  </section>` : ''}

  <!-- CTA -->
  <section style="background:linear-gradient(135deg,#1a237e,#0d47a1);border-radius:16px;padding:48px 32px;text-align:center;color:white;margin-bottom:40px;">
    <h2 style="font-size:1.8rem;font-weight:700;margin-bottom:12px;">${t(lang,'readyToApply')}</h2>
    <p style="font-size:1.1rem;opacity:0.9;margin-bottom:24px;">${t(lang,'applyWith')}</p>
    <a href="https://apply.foorsa.ma" class="cartoon-btn" target="_blank" rel="noopener" style="display:inline-block;background:white;color:#1a237e;padding:14px 32px;border-radius:30px;font-weight:600;text-decoration:none;margin:8px;">${t(lang,'startApplication')}</a>
    <a href="${prefix}/contact.html" class="cartoon-btn" style="display:inline-block;background:transparent;color:white;border:2px solid white;padding:14px 32px;border-radius:30px;font-weight:600;text-decoration:none;margin:8px;">${t(lang,'freeConsultation')}</a>
  </section>

  <p style="font-size:12px;color:#999;text-align:center;">${t(lang,'lastUpdated')}: ${city.last_updated}</p>
</main>`;

  return head + '\n' + nav + '\n' + body + '\n' + renderFooter(lang);
}

// ============================================================================
// MAJOR PAGE GENERATOR
// ============================================================================
function generateMajorPage(major, lang, allMajors) {
  const name = major.name; // EN-only data
  const slug = major.id;
  const canonical = `https://foorsa.ma/${lang}/majors/${slug}.html`;
  const prefix = lang === 'ar' ? '../../ar' : lang === 'fr' ? '../../fr' : '../../en';

  const seoTitle = t(lang, 'seoTitleMajor').replace('{name}', name);
  const seoDesc = t(lang, 'seoDescMajor').replace('{name}', name);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": t(lang, 'home'), "item": `https://foorsa.ma/${lang}/index.html` },
      { "@type": "ListItem", "position": 2, "name": t(lang, 'majors'), "item": `https://foorsa.ma/${lang}/majors.html` },
      { "@type": "ListItem", "position": 3, "name": name, "item": canonical }
    ]
  };

  const mainSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": name,
    "description": major.description,
    "provider": {
      "@type": "Organization",
      "name": "Foorsa",
      "url": "https://foorsa.ma"
    },
    "educationalLevel": "University",
    "about": {
      "@type": "Thing",
      "name": major.category
    }
  };

  // Hreflang links
  const hreflangLinks = ['en', 'fr', 'ar'].map(l =>
    `<link rel="alternate" hreflang="${l}" href="https://foorsa.ma/${l}/majors/${slug}.html"/>`
  ).join('\n');

  const head = renderHead(lang, {
    title: seoTitle,
    description: seoDesc,
    canonical,
    mainSchema,
    breadcrumbSchema
  }).replace('</head>', hreflangLinks + '\n</head>');

  const nav = renderNav(lang);

  // Related majors: same category, up to 4
  const related = allMajors.filter(m => m.category === major.category && m.id !== slug).slice(0, 4);

  // Video embed
  const videoSection = major.videoUrl ? `
  <section class="mb-5">
    <h2 style="font-size:1.6rem;font-weight:600;margin-bottom:16px;">${t(lang,'watchVideo')}</h2>
    <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:12px;">
      <iframe src="${major.videoUrl}" title="${escHtml(major.videoTitle || name)}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
    </div>
  </section>` : '';

  // Career table
  const careerRows = major.careers.map(c => `
          <tr>
            <td style="font-weight:600;">${escHtml(c.title)}</td>
            <td>${escHtml(c.salaryMorocco)}</td>
            <td>${escHtml(c.salaryWorld)}</td>
            <td>${escHtml(c.description)}</td>
          </tr>`).join('');

  const body = `
<main class="container" style="max-width:900px;margin:40px auto;padding:0 16px;">
  <nav aria-label="breadcrumb" style="margin-bottom:24px;">
    <ol class="breadcrumb" style="font-size:14px;">
      <li class="breadcrumb-item"><a href="${prefix}/index.html">${t(lang,'home')}</a></li>
      <li class="breadcrumb-item"><a href="${prefix}/majors.html">${t(lang,'majors')}</a></li>
      <li class="breadcrumb-item active" aria-current="page">${name}</li>
    </ol>
  </nav>

  <h1 style="font-size:2.5rem;font-weight:700;margin-bottom:8px;">${t(lang,'studyInChina').replace('{name}', name)}</h1>
  <p style="display:inline-block;background:#e3f2fd;color:#1565c0;padding:4px 12px;border-radius:20px;font-size:13px;font-weight:600;margin-bottom:24px;">${t(lang,'categoryLabel')}: ${escHtml(major.category)}</p>

  <p style="font-size:1.15rem;line-height:1.8;color:#444;margin-bottom:32px;">${escHtml(major.description)}</p>

  <!-- Program Overview -->
  <section class="mb-5">
    <h2 style="font-size:1.6rem;font-weight:600;margin-bottom:16px;">${t(lang,'programOverview')}</h2>
    <p style="font-size:1rem;line-height:1.8;color:#555;">${escHtml(major.overview)}</p>
  </section>

  <!-- Why China -->
  ${major.whyChina ? `
  <section class="mb-5">
    <h2 style="font-size:1.6rem;font-weight:600;margin-bottom:16px;">${t(lang,'whyStudyInChina').replace('{name}', name)}</h2>
    <div style="background:#f0f7ff;border-left:4px solid #1565c0;border-radius:8px;padding:20px;">
      <p style="font-size:1rem;line-height:1.8;margin:0;">${escHtml(major.whyChina)}</p>
    </div>
  </section>` : ''}

  ${videoSection}

  <!-- Career Paths -->
  ${major.careers.length > 0 ? `
  <section class="mb-5">
    <h2 style="font-size:1.6rem;font-weight:600;margin-bottom:16px;">${t(lang,'careerPaths')}</h2>
    <div class="table-responsive">
      <table class="table table-bordered" style="font-size:14px;">
        <thead style="background:#f8f9fa;">
          <tr>
            <th>${t(lang,'careerTitle')}</th>
            <th>${t(lang,'salaryMorocco')}</th>
            <th>${t(lang,'salaryWorld')}</th>
            <th>${t(lang,'careerDescription')}</th>
          </tr>
        </thead>
        <tbody>${careerRows}
        </tbody>
      </table>
    </div>
  </section>` : ''}

  <!-- Related Majors -->
  ${related.length > 0 ? `
  <section class="mb-5">
    <h2 style="font-size:1.6rem;font-weight:600;margin-bottom:16px;">${t(lang,'relatedMajors')}</h2>
    <div class="row">
      ${related.map(r => `<div class="col-md-3 col-6 mb-3">
        <a href="${r.id}.html" style="text-decoration:none;color:inherit;">
          <div style="border:1px solid #e9ecef;border-radius:12px;padding:20px;text-align:center;">
            <h3 style="font-size:1rem;font-weight:600;margin-bottom:4px;">${escHtml(r.name)}</h3>
            <p style="color:#777;font-size:13px;margin:0;">${escHtml(r.category)}</p>
          </div>
        </a>
      </div>`).join('')}
    </div>
    <p style="text-align:center;margin-top:16px;"><a href="${prefix}/majors.html" style="color:#1565c0;font-weight:600;">${t(lang,'viewAllMajors')} &rarr;</a></p>
  </section>` : ''}

  <!-- CTA -->
  <section style="background:linear-gradient(135deg,#1a237e,#0d47a1);border-radius:16px;padding:48px 32px;text-align:center;color:white;margin-bottom:40px;">
    <h2 style="font-size:1.8rem;font-weight:700;margin-bottom:12px;">${t(lang,'readyToApply')}</h2>
    <p style="font-size:1.1rem;opacity:0.9;margin-bottom:24px;">${t(lang,'applyWith')}</p>
    <a href="https://apply.foorsa.ma" class="cartoon-btn" target="_blank" rel="noopener" style="display:inline-block;background:white;color:#1a237e;padding:14px 32px;border-radius:30px;font-weight:600;text-decoration:none;margin:8px;">${t(lang,'startApplication')}</a>
    <a href="${prefix}/contact.html" class="cartoon-btn" style="display:inline-block;background:transparent;color:white;border:2px solid white;padding:14px 32px;border-radius:30px;font-weight:600;text-decoration:none;margin:8px;">${t(lang,'freeConsultation')}</a>
  </section>
</main>`;

  return head + '\n' + nav + '\n' + body + '\n' + renderFooter(lang);
}

// ============================================================================
// INDEX / LISTING PAGE GENERATORS
// ============================================================================
function generateUniversityIndexPage(lang, universities, cities) {
  const canonical = `https://foorsa.ma/${lang}/universities/index.html`;
  const prefix = lang === 'ar' ? '../../ar' : lang === 'fr' ? '../../fr' : '../../en';
  const seoTitle = t(lang, 'seoTitleUniIndex');
  const seoDesc = t(lang, 'seoDescUniIndex').replace('{count}', universities.length);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": t(lang, 'home'), "item": `https://foorsa.ma/${lang}/index.html` },
      { "@type": "ListItem", "position": 2, "name": t(lang, 'universities'), "item": canonical }
    ]
  };
  const mainSchema = { "@context": "https://schema.org", "@type": "CollectionPage", "name": seoTitle, "description": seoDesc };

  const hreflangLinks = ['en', 'fr', 'ar'].map(l =>
    `<link rel="alternate" hreflang="${l}" href="https://foorsa.ma/${l}/universities/index.html"/>`
  ).join('\n');

  const head = renderHead(lang, { title: seoTitle, description: seoDesc, canonical, mainSchema, breadcrumbSchema })
    .replace('</head>', hreflangLinks + '\n</head>');
  const nav = renderNav(lang);

  // Sort by QS ranking
  const sorted = [...universities].sort((a, b) => a.ranking_qs - b.ranking_qs);

  const cards = sorted.map(uni => {
    const name = uni.name[lang] || uni.name.en;
    const cityName = getCityName(uni.city, lang, cities);
    return `<div class="col-md-4 mb-4">
      <a href="${uni.id}.html" style="text-decoration:none;color:inherit;">
        <div style="border:1px solid #e9ecef;border-radius:12px;padding:24px;height:100%;transition:box-shadow .2s;" onmouseover="this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)'" onmouseout="this.style.boxShadow='none'">
          <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:8px;">${escHtml(name)}</h2>
          <p style="color:#1565c0;font-size:13px;margin-bottom:8px;">QS #${uni.ranking_qs} · ${cityName}</p>
          ${uni.c9_league ? '<span style="background:#fff3e0;color:#e65100;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:600;">C9 League</span> ' : ''}
          ${uni.double_first_class ? '<span style="background:#e8f5e9;color:#2e7d32;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:600;">Double First Class</span>' : ''}
          <p style="color:#777;font-size:13px;margin-top:8px;margin-bottom:0;">${t(lang,'tuitionFrom')} $${uni.tuition_range_usd.min}${t(lang,'perYear')}</p>
        </div>
      </a>
    </div>`;
  }).join('');

  const body = `
<main class="container" style="max-width:1100px;margin:40px auto;padding:0 16px;">
  <nav aria-label="breadcrumb" style="margin-bottom:24px;">
    <ol class="breadcrumb" style="font-size:14px;">
      <li class="breadcrumb-item"><a href="${prefix}/index.html">${t(lang,'home')}</a></li>
      <li class="breadcrumb-item active" aria-current="page">${t(lang,'universities')}</li>
    </ol>
  </nav>
  <h1 style="font-size:2.2rem;font-weight:700;margin-bottom:8px;">${t(lang,'exploreUniversities')}</h1>
  <p style="font-size:1.05rem;color:#555;margin-bottom:32px;">${universities.length} ${t(lang,'universities').toLowerCase()}</p>
  <div class="row">${cards}</div>

  <section style="background:linear-gradient(135deg,#1a237e,#0d47a1);border-radius:16px;padding:48px 32px;text-align:center;color:white;margin:40px 0;">
    <h2 style="font-size:1.8rem;font-weight:700;margin-bottom:12px;">${t(lang,'readyToApply')}</h2>
    <p style="font-size:1.1rem;opacity:0.9;margin-bottom:24px;">${t(lang,'applyWith')}</p>
    <a href="https://apply.foorsa.ma" class="cartoon-btn" target="_blank" rel="noopener" style="display:inline-block;background:white;color:#1a237e;padding:14px 32px;border-radius:30px;font-weight:600;text-decoration:none;margin:8px;">${t(lang,'startApplication')}</a>
  </section>
</main>`;

  return head + '\n' + nav + '\n' + body + '\n' + renderFooter(lang);
}

function generateCityIndexPage(lang, cities) {
  const canonical = `https://foorsa.ma/${lang}/cities/index.html`;
  const prefix = lang === 'ar' ? '../../ar' : lang === 'fr' ? '../../fr' : '../../en';
  const seoTitle = t(lang, 'seoTitleCityIndex');
  const seoDesc = t(lang, 'seoDescCityIndex').replace('{count}', cities.length);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": t(lang, 'home'), "item": `https://foorsa.ma/${lang}/index.html` },
      { "@type": "ListItem", "position": 2, "name": t(lang, 'cities'), "item": canonical }
    ]
  };
  const mainSchema = { "@context": "https://schema.org", "@type": "CollectionPage", "name": seoTitle, "description": seoDesc };

  const hreflangLinks = ['en', 'fr', 'ar'].map(l =>
    `<link rel="alternate" hreflang="${l}" href="https://foorsa.ma/${l}/cities/index.html"/>`
  ).join('\n');

  const head = renderHead(lang, { title: seoTitle, description: seoDesc, canonical, mainSchema, breadcrumbSchema })
    .replace('</head>', hreflangLinks + '\n</head>');
  const nav = renderNav(lang);

  const cards = cities.map(city => {
    const name = city.name[lang] || city.name.en;
    const col = city.cost_of_living;
    return `<div class="col-md-4 mb-4">
      <a href="${city.id}.html" style="text-decoration:none;color:inherit;">
        <div style="border:1px solid #e9ecef;border-radius:12px;padding:24px;height:100%;transition:box-shadow .2s;" onmouseover="this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)'" onmouseout="this.style.boxShadow='none'">
          <h2 style="font-size:1.2rem;font-weight:700;margin-bottom:8px;">${escHtml(name)}</h2>
          <p style="color:#777;font-size:13px;margin-bottom:4px;">${city.universities_count} ${t(lang,'uniCount').toLowerCase()} · ${city.population}</p>
          <p style="color:#1565c0;font-size:13px;margin-bottom:4px;">${t(lang,'monthlyFrom')} $${col.total_monthly_usd.min}${t(lang,'perMonth')}</p>
          <p style="color:#777;font-size:13px;margin:0;">${t(lang,'halalAvailability')}: ${t(lang, city.halal_food_availability)}</p>
        </div>
      </a>
    </div>`;
  }).join('');

  const body = `
<main class="container" style="max-width:1100px;margin:40px auto;padding:0 16px;">
  <nav aria-label="breadcrumb" style="margin-bottom:24px;">
    <ol class="breadcrumb" style="font-size:14px;">
      <li class="breadcrumb-item"><a href="${prefix}/index.html">${t(lang,'home')}</a></li>
      <li class="breadcrumb-item active" aria-current="page">${t(lang,'cities')}</li>
    </ol>
  </nav>
  <h1 style="font-size:2.2rem;font-weight:700;margin-bottom:8px;">${t(lang,'exploreCities')}</h1>
  <p style="font-size:1.05rem;color:#555;margin-bottom:32px;">${cities.length} ${t(lang,'cities').toLowerCase()}</p>
  <div class="row">${cards}</div>
</main>`;

  return head + '\n' + nav + '\n' + body + '\n' + renderFooter(lang);
}

function generateCountryIndexPage(lang, countries) {
  const canonical = `https://foorsa.ma/${lang}/study-from/index.html`;
  const prefix = lang === 'ar' ? '../../ar' : lang === 'fr' ? '../../fr' : '../../en';
  const seoTitle = t(lang, 'seoTitleCountryIndex');
  const seoDesc = t(lang, 'seoDescCountryIndex');

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": t(lang, 'home'), "item": `https://foorsa.ma/${lang}/index.html` },
      { "@type": "ListItem", "position": 2, "name": t(lang, 'exploreCountries'), "item": canonical }
    ]
  };
  const mainSchema = { "@context": "https://schema.org", "@type": "CollectionPage", "name": seoTitle, "description": seoDesc };

  const hreflangLinks = ['en', 'fr', 'ar'].map(l =>
    `<link rel="alternate" hreflang="${l}" href="https://foorsa.ma/${l}/study-from/index.html"/>`
  ).join('\n');

  const head = renderHead(lang, { title: seoTitle, description: seoDesc, canonical, mainSchema, breadcrumbSchema })
    .replace('</head>', hreflangLinks + '\n</head>');
  const nav = renderNav(lang);

  // Primary market first
  const sorted = [...countries].sort((a, b) => (b.primary_market ? 1 : 0) - (a.primary_market ? 1 : 0));

  const cards = sorted.map(c => {
    const name = c.name[lang] || c.name.en;
    const demonym = c.demonym[lang] || c.demonym.en;
    return `<div class="col-md-4 mb-4">
      <a href="${c.id}.html" style="text-decoration:none;color:inherit;">
        <div style="border:1px solid #e9ecef;border-radius:12px;padding:24px;height:100%;transition:box-shadow .2s;${c.primary_market ? 'border-color:#1565c0;border-width:2px;' : ''}" onmouseover="this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)'" onmouseout="this.style.boxShadow='none'">
          <div style="font-size:2rem;margin-bottom:8px;">${c.flag_emoji}</div>
          <h2 style="font-size:1.2rem;font-weight:700;margin-bottom:8px;">${escHtml(name)}</h2>
          <p style="color:#1565c0;font-size:13px;margin-bottom:4px;">${c.stats.students_in_china} ${t(lang,'studentsInChina').replace('{demonym}', demonym).replace('{country}', name).toLowerCase()}</p>
          <p style="color:#777;font-size:13px;margin:0;">${t(lang,'scholarshipRate')}: ${c.stats.scholarship_rate}</p>
        </div>
      </a>
    </div>`;
  }).join('');

  const body = `
<main class="container" style="max-width:1100px;margin:40px auto;padding:0 16px;">
  <nav aria-label="breadcrumb" style="margin-bottom:24px;">
    <ol class="breadcrumb" style="font-size:14px;">
      <li class="breadcrumb-item"><a href="${prefix}/index.html">${t(lang,'home')}</a></li>
      <li class="breadcrumb-item active" aria-current="page">${t(lang,'exploreCountries')}</li>
    </ol>
  </nav>
  <h1 style="font-size:2.2rem;font-weight:700;margin-bottom:8px;">${t(lang,'exploreCountries')}</h1>
  <p style="font-size:1.05rem;color:#555;margin-bottom:32px;">${t(lang,'browseByCountry')}</p>
  <div class="row">${cards}</div>

  <section style="background:linear-gradient(135deg,#1a237e,#0d47a1);border-radius:16px;padding:48px 32px;text-align:center;color:white;margin:40px 0;">
    <h2 style="font-size:1.8rem;font-weight:700;margin-bottom:12px;">${t(lang,'readyToApply')}</h2>
    <p style="font-size:1.1rem;opacity:0.9;margin-bottom:24px;">${t(lang,'applyWith')}</p>
    <a href="https://apply.foorsa.ma" class="cartoon-btn" target="_blank" rel="noopener" style="display:inline-block;background:white;color:#1a237e;padding:14px 32px;border-radius:30px;font-weight:600;text-decoration:none;margin:8px;">${t(lang,'startApplication')}</a>
  </section>
</main>`;

  return head + '\n' + nav + '\n' + body + '\n' + renderFooter(lang);
}

// ============================================================================
// COUNTRY LANDING PAGE GENERATOR
// ============================================================================
function generateCountryPage(country, lang, allCities) {
  const name = country.name[lang] || country.name.en;
  const demonym = country.demonym[lang] || country.demonym.en;
  const slug = country.id;
  const canonical = `https://foorsa.ma/${lang}/study-from/${slug}.html`;
  const prefix = lang === 'ar' ? '../../ar' : lang === 'fr' ? '../../fr' : '../../en';
  const desc = country.description[lang] || country.description.en;
  const stats = country.stats;
  const reqs = country.requirements;

  const seoTitle = t(lang, 'seoTitleCountry').replace('{country}', name).replace('{demonym}', demonym);
  const seoDesc = t(lang, 'seoDescCountry').replace('{country}', name).replace('{demonym}', demonym);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": t(lang, 'home'), "item": `https://foorsa.ma/${lang}/index.html` },
      { "@type": "ListItem", "position": 2, "name": t(lang, 'studyFromCountry').replace('{country}', name), "item": canonical }
    ]
  };

  // FAQPage schema
  const faqItems = (country.faq || []).map((f, i) => ({
    "@type": "Question",
    "name": f.q[lang] || f.q.en,
    "acceptedAnswer": { "@type": "Answer", "text": f.a[lang] || f.a.en }
  }));
  const mainSchema = faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems
  } : {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": seoTitle,
    "description": seoDesc
  };

  const hreflangLinks = ['en', 'fr', 'ar'].map(l =>
    `<link rel="alternate" hreflang="${l}" href="https://foorsa.ma/${l}/study-from/${slug}.html"/>`
  ).join('\n');

  const head = renderHead(lang, {
    title: seoTitle,
    description: seoDesc,
    canonical,
    mainSchema,
    breadcrumbSchema
  }).replace('</head>', hreflangLinks + '\n</head>');

  const nav = renderNav(lang);

  // Document names map
  const docNames = {
    passport: { en: 'Valid Passport', fr: 'Passeport valide', ar: 'جواز سفر صالح' },
    admission_letter: { en: 'University Admission Letter', fr: "Lettre d'admission universitaire", ar: 'خطاب القبول الجامعي' },
    jw201_jw202: { en: 'JW201/JW202 Form', fr: 'Formulaire JW201/JW202', ar: 'نموذج JW201/JW202' },
    medical_exam: { en: 'Physical Examination Record', fr: "Rapport d'examen médical", ar: 'تقرير الفحص الطبي' },
    photos: { en: 'Passport Photos', fr: "Photos d'identité", ar: 'صور شخصية' },
    bank_statement: { en: 'Bank Statement', fr: 'Relevé bancaire', ar: 'كشف حساب بنكي' }
  };

  const docList = reqs.documents.map(d => {
    const docName = docNames[d] ? (docNames[d][lang] || docNames[d].en) : d;
    return `<li>${escHtml(docName)}</li>`;
  }).join('');

  // Popular cities links
  const cityLinks = stats.popular_cities.map(cid => {
    const city = allCities.find(c => c.id === cid);
    if (!city) return '';
    const cName = city.name[lang] || city.name.en;
    return `<a href="${prefix}/cities/${cid}.html" style="display:inline-block;background:#e3f2fd;color:#1565c0;padding:6px 16px;border-radius:20px;font-size:14px;font-weight:600;text-decoration:none;margin:4px;">${cName}</a>`;
  }).join('');

  // Popular majors links
  const majorLinks = stats.top_majors.map(mid => {
    const majorName = formatProgram(mid);
    return `<a href="${prefix}/majors/${mid}.html" style="display:inline-block;background:#f3e5f5;color:#7b1fa2;padding:6px 16px;border-radius:20px;font-size:14px;font-weight:600;text-decoration:none;margin:4px;">${majorName}</a>`;
  }).join('');

  // Scholarship table
  const scholarshipRows = country.scholarships.map(s => `
          <tr>
            <td style="font-weight:600;">${escHtml(s.name)}</td>
            <td>${escHtml(s.coverage)}</td>
            <td>${escHtml(s.deadline)}</td>
          </tr>`).join('');

  // FAQ section
  const faqHtml = (country.faq || []).length > 0 ? `
  <section class="mb-5">
    <h2 style="font-size:1.6rem;font-weight:600;margin-bottom:16px;">${t(lang,'faq')}</h2>
    ${country.faq.map(f => {
      const q = f.q[lang] || f.q.en;
      const a = f.a[lang] || f.a.en;
      return `<div style="border:1px solid #e9ecef;border-radius:12px;padding:20px;margin-bottom:12px;">
        <h3 style="font-size:1.05rem;font-weight:600;margin-bottom:8px;">${escHtml(q)}</h3>
        <p style="font-size:0.95rem;line-height:1.7;color:#555;margin:0;">${escHtml(a)}</p>
      </div>`;
    }).join('')}
  </section>` : '';

  // Testimonial section
  const testimonialHtml = country.testimonial ? `
  <section class="mb-5">
    <h2 style="font-size:1.6rem;font-weight:600;margin-bottom:16px;">${t(lang,'studentTestimonial')}</h2>
    <div style="background:#f8f9fa;border-radius:12px;padding:24px;border-left:4px solid #1565c0;">
      <p style="font-size:1.05rem;line-height:1.7;font-style:italic;margin-bottom:12px;">"${escHtml(country.testimonial.quote[lang] || country.testimonial.quote.en)}"</p>
      <p style="font-weight:600;margin:0;">— ${escHtml(country.testimonial.name)}, ${escHtml(country.testimonial.university)} (${escHtml(country.testimonial.major)})</p>
    </div>
  </section>` : '';

  const applyUrl = `https://apply.foorsa.ma/?ref=${slug}`;

  const body = `
<main class="container" style="max-width:900px;margin:40px auto;padding:0 16px;">
  <nav aria-label="breadcrumb" style="margin-bottom:24px;">
    <ol class="breadcrumb" style="font-size:14px;">
      <li class="breadcrumb-item"><a href="${prefix}/index.html">${t(lang,'home')}</a></li>
      <li class="breadcrumb-item active" aria-current="page">${t(lang,'studyFromCountry').replace('{country}', name)}</li>
    </ol>
  </nav>

  <h1 style="font-size:2.5rem;font-weight:700;margin-bottom:24px;">${t(lang,'studyFromCountry').replace('{country}', name)}</h1>
  <p style="font-size:1.15rem;line-height:1.8;color:#444;margin-bottom:32px;">${escHtml(desc)}</p>

  <!-- Quick Stats -->
  <div class="row mb-5">
    <div class="col-md-3 col-6 mb-3"><div style="background:#f0f7ff;border-radius:12px;padding:20px;text-align:center;"><div style="font-size:24px;font-weight:700;">${stats.students_in_china}</div><div style="color:#777;font-size:14px;">${t(lang,'studentsInChina').replace('{demonym}', demonym).replace('{country}', name)}</div></div></div>
    <div class="col-md-3 col-6 mb-3"><div style="background:#f0faf0;border-radius:12px;padding:20px;text-align:center;"><div style="font-size:24px;font-weight:700;">${stats.scholarship_rate}</div><div style="color:#777;font-size:14px;">${t(lang,'scholarshipRate')}</div></div></div>
    <div class="col-md-3 col-6 mb-3"><div style="background:#fff8e1;border-radius:12px;padding:20px;text-align:center;"><div style="font-size:24px;font-weight:700;">$${stats.avg_flight_cost_usd}</div><div style="color:#777;font-size:14px;">${t(lang,'avgFlightCost')}</div></div></div>
    <div class="col-md-3 col-6 mb-3"><div style="background:#fce4ec;border-radius:12px;padding:20px;text-align:center;"><div style="font-size:24px;font-weight:700;">${stats.time_difference}</div><div style="color:#777;font-size:14px;">${t(lang,'timeDifference')}</div></div></div>
  </div>

  <!-- Scholarships -->
  <section class="mb-5">
    <h2 style="font-size:1.6rem;font-weight:600;margin-bottom:16px;">${t(lang,'availableScholarships').replace('{demonym}', demonym).replace('{country}', name)}</h2>
    <div class="table-responsive">
      <table class="table table-bordered" style="font-size:14px;">
        <thead style="background:#f8f9fa;">
          <tr><th>${t(lang,'scholarshipName')}</th><th>${t(lang,'coverage')}</th><th>${t(lang,'deadline')}</th></tr>
        </thead>
        <tbody>${scholarshipRows}
        </tbody>
      </table>
    </div>
  </section>

  <!-- Visa & Documents -->
  <section class="mb-5">
    <h2 style="font-size:1.6rem;font-weight:600;margin-bottom:16px;">${t(lang,'visaRequirements')}</h2>
    <div class="row mb-3">
      <div class="col-md-4 mb-3"><div style="border:1px solid #e9ecef;border-radius:12px;padding:20px;text-align:center;"><h3 style="font-size:0.9rem;color:#777;">${t(lang,'visaType')}</h3><p style="font-size:1.1rem;font-weight:700;margin:0;">${reqs.visa_type}</p></div></div>
      <div class="col-md-4 mb-3"><div style="border:1px solid #e9ecef;border-radius:12px;padding:20px;text-align:center;"><h3 style="font-size:0.9rem;color:#777;">${t(lang,'passportValidity')}</h3><p style="font-size:1.1rem;font-weight:700;margin:0;">${reqs.passport_validity}</p></div></div>
      <div class="col-md-4 mb-3"><div style="border:1px solid #e9ecef;border-radius:12px;padding:20px;text-align:center;"><h3 style="font-size:0.9rem;color:#777;">${t(lang,'directFlights')}</h3><p style="font-size:1.1rem;font-weight:700;margin:0;">${stats.direct_flights ? t(lang,'available') : t(lang,'notAvailable')}</p></div></div>
    </div>
    <h3 style="font-size:1.1rem;font-weight:600;margin-bottom:12px;">${t(lang,'requiredDocuments')}</h3>
    <ul style="font-size:0.95rem;line-height:2;">${docList}</ul>
    <p style="font-size:0.9rem;color:#777;margin-top:8px;"><strong>${t(lang,'legalizationNote')}:</strong> ${escHtml(reqs.legalization)}</p>
    <p style="font-size:0.9rem;color:#777;"><strong>${t(lang,'acceptedTests')}:</strong> ${reqs.language_tests.join(', ')}</p>
  </section>

  <!-- Popular Cities -->
  <section class="mb-5">
    <h2 style="font-size:1.6rem;font-weight:600;margin-bottom:16px;">${t(lang,'popularCities')}</h2>
    <div>${cityLinks}</div>
  </section>

  <!-- Popular Majors -->
  <section class="mb-5">
    <h2 style="font-size:1.6rem;font-weight:600;margin-bottom:16px;">${t(lang,'popularMajors')}</h2>
    <div>${majorLinks}</div>
  </section>

  ${testimonialHtml}
  ${faqHtml}

  <!-- CTA -->
  <section style="background:linear-gradient(135deg,#1a237e,#0d47a1);border-radius:16px;padding:48px 32px;text-align:center;color:white;margin-bottom:40px;">
    <h2 style="font-size:1.8rem;font-weight:700;margin-bottom:12px;">${t(lang,'readyToApply')}</h2>
    <p style="font-size:1.1rem;opacity:0.9;margin-bottom:24px;">${t(lang,'applyWith')}</p>
    <a href="${applyUrl}" class="cartoon-btn" target="_blank" rel="noopener" style="display:inline-block;background:white;color:#1a237e;padding:14px 32px;border-radius:30px;font-weight:600;text-decoration:none;margin:8px;">${t(lang,'applyNow')}</a>
    <a href="${prefix}/contact.html" class="cartoon-btn" style="display:inline-block;background:transparent;color:white;border:2px solid white;padding:14px 32px;border-radius:30px;font-weight:600;text-decoration:none;margin:8px;">${t(lang,'freeConsultation')}</a>
  </section>

  <p style="font-size:12px;color:#999;text-align:center;">${t(lang,'lastUpdated')}: ${country.last_updated}</p>
</main>`;

  return head + '\n' + nav + '\n' + body + '\n' + renderFooter(lang);
}

// ============================================================================
// MAIN
// ============================================================================
function main() {
  const universities = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'universities.json'), 'utf8'));
  const cities = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'cities.json'), 'utf8'));
  const majors = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'majors.json'), 'utf8'));
  const countries = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'countries.json'), 'utf8'));

  let uniCount = 0, cityCount = 0, majorCount = 0, countryCount = 0;

  for (const lang of languages) {
    // Generate university pages
    if (typeArg === 'all' || typeArg === 'universities') {
      const uniDir = path.join(ROOT, lang, 'universities');
      fs.mkdirSync(uniDir, { recursive: true });

      for (const uni of universities) {
        const html = generateUniversityPage(uni, lang, universities, cities);
        const filePath = path.join(uniDir, `${uni.id}.html`);
        fs.writeFileSync(filePath, html, 'utf8');
        uniCount++;
      }
      // University index page
      fs.writeFileSync(path.join(uniDir, 'index.html'), generateUniversityIndexPage(lang, universities, cities), 'utf8');
    }

    // Generate city pages
    if (typeArg === 'all' || typeArg === 'cities') {
      const cityDir = path.join(ROOT, lang, 'cities');
      fs.mkdirSync(cityDir, { recursive: true });

      for (const city of cities) {
        const html = generateCityPage(city, lang, universities, cities);
        const filePath = path.join(cityDir, `${city.id}.html`);
        fs.writeFileSync(filePath, html, 'utf8');
        cityCount++;
      }
      // City index page
      fs.writeFileSync(path.join(cityDir, 'index.html'), generateCityIndexPage(lang, cities), 'utf8');
    }

    // Generate major pages
    if (typeArg === 'all' || typeArg === 'majors') {
      const majorDir = path.join(ROOT, lang, 'majors');
      fs.mkdirSync(majorDir, { recursive: true });

      for (const major of majors) {
        const html = generateMajorPage(major, lang, majors);
        const filePath = path.join(majorDir, `${major.id}.html`);
        fs.writeFileSync(filePath, html, 'utf8');
        majorCount++;
      }
    }

    // Generate country landing pages
    if (typeArg === 'all' || typeArg === 'countries') {
      const countryDir = path.join(ROOT, lang, 'study-from');
      fs.mkdirSync(countryDir, { recursive: true });

      for (const country of countries) {
        const html = generateCountryPage(country, lang, cities);
        const filePath = path.join(countryDir, `${country.id}.html`);
        fs.writeFileSync(filePath, html, 'utf8');
        countryCount++;
      }
      // Country index page
      fs.writeFileSync(path.join(countryDir, 'index.html'), generateCountryIndexPage(lang, countries), 'utf8');
    }
  }

  const parts = [];
  if (uniCount) parts.push(`${uniCount} university pages`);
  if (cityCount) parts.push(`${cityCount} city pages`);
  if (majorCount) parts.push(`${majorCount} major pages`);
  if (countryCount) parts.push(`${countryCount} country pages`);
  console.log(`Generated ${parts.join(', ')} across ${languages.length} language(s).`);
}

main();
