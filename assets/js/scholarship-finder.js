(function() {
  'use strict';

  var lang = document.documentElement.lang || 'en';
  var scholarships = [];
  var cities = [];
  var userProfile = null;

  var i18n = {
    en: {
      heroTitle: 'Find Your Perfect Scholarship',
      heroDesc: 'Answer a few questions about your profile and we\'ll match you with the best scholarships in China.',
      step1Title: 'Get Your Personalized Results in Seconds',
      step2Title: 'Tell Us About Your Studies',
      step3Title: 'Almost There — Last Details',
      labelName: 'Full Name',
      labelEmail: 'Email Address',
      labelPhone: 'Phone Number',
      labelAge: 'Your Age',
      labelDegree: 'What degree do you want to study?',
      labelCurrentEdu: 'Your current education level',
      labelGpa: 'Your GPA / Average Grade',
      labelEnglish: 'Do you want English-taught programs?',
      labelCity: 'Preferred city (optional)',
      labelBudget: 'Can you pay partial tuition if needed?',
      placeholderName: 'Enter your full name',
      placeholderEmail: 'your@email.com',
      placeholderPhone: '+212 6XX XXX XXX',
      degreeBachelor: 'Bachelor\'s Degree',
      degreeMaster: 'Master\'s Degree',
      degreePhd: 'PhD / Doctorate',
      degreeLanguage: 'Chinese Language Year',
      eduBac: 'Baccalaureate (High School)',
      eduBacPlus2: 'Bac+2 (DUT/BTS)',
      eduBacPlus3: 'Bac+3 (License/Bachelor)',
      eduBacPlus5: 'Bac+5 (Master)',
      eduPhd: 'PhD',
      gpaExcellent: 'Excellent (16+/20 or 3.7+ GPA)',
      gpaGood: 'Good (14-16/20 or 3.0-3.7 GPA)',
      gpaAverage: 'Average (12-14/20 or 2.5-3.0 GPA)',
      gpaBelow: 'Below Average (< 12/20 or < 2.5 GPA)',
      englishYes: 'Yes, English only',
      englishBoth: 'Both English and Chinese',
      englishNo: 'No, Chinese is fine',
      budgetYes: 'Yes, I can pay partial tuition',
      budgetNo: 'No, I need full funding',
      cityAny: 'Any city',
      btnNext: 'Next',
      btnBack: 'Back',
      btnFindScholarships: 'Find My Scholarships',
      resultsTitle: 'Your Scholarship Matches',
      resultsDesc: 'Based on your profile, here are the scholarships you\'re eligible for:',
      matchExcellent: 'Excellent Match',
      matchGood: 'Good Match',
      matchPossible: 'Possible Match',
      fullyFunded: 'Fully Funded',
      partial: 'Partial',
      coverage: 'What\'s Covered',
      eligibility: 'Eligibility',
      deadline: 'Deadline',
      universities: 'universities',
      successRate: 'Your Chances',
      tuitionCovered: 'Tuition Covered',
      stipend: 'Monthly Stipend',
      applyNow: 'Apply with Foorsa',
      noResults: 'No scholarships match your profile right now. Contact us for personalized advice.',
      resultsCount: 'scholarships match your profile',
      rateLow: 'Competitive',
      rateMedium: 'Moderate',
      rateHigh: 'Good Chances',
      rateVeryHigh: 'Excellent Chances',
      levelBachelor: 'Bachelor',
      levelMaster: 'Master',
      levelPhd: 'PhD',
      levelLanguage: 'Language Year',
      requiredField: 'This field is required',
      invalidEmail: 'Please enter a valid email',
      privacyNote: 'Fill in your details and we\'ll instantly show you which scholarships match your profile. 100% free.',
      startOver: 'Start Over',
      filterAll: 'Show All',
      filterFull: 'Fully Funded Only',
      searchPlaceholder: 'Filter results...'
    },
    fr: {
      heroTitle: 'Trouvez Votre Bourse Idéale',
      heroDesc: 'Répondez à quelques questions sur votre profil et nous vous associerons aux meilleures bourses en Chine.',
      step1Title: 'Recevez vos résultats personnalisés en quelques secondes',
      step2Title: 'Parlez-nous de vos études',
      step3Title: 'Presque fini — derniers détails',
      labelName: 'Nom Complet',
      labelEmail: 'Adresse Email',
      labelPhone: 'Numéro de Téléphone',
      labelAge: 'Votre Âge',
      labelDegree: 'Quel diplôme souhaitez-vous obtenir ?',
      labelCurrentEdu: 'Votre niveau d\'études actuel',
      labelGpa: 'Votre moyenne générale',
      labelEnglish: 'Voulez-vous des programmes en anglais ?',
      labelCity: 'Ville préférée (optionnel)',
      labelBudget: 'Pouvez-vous payer des frais partiels ?',
      placeholderName: 'Entrez votre nom complet',
      placeholderEmail: 'votre@email.com',
      placeholderPhone: '+212 6XX XXX XXX',
      degreeBachelor: 'Licence',
      degreeMaster: 'Master',
      degreePhd: 'Doctorat',
      degreeLanguage: 'Année de Langue Chinoise',
      eduBac: 'Baccalauréat',
      eduBacPlus2: 'Bac+2 (DUT/BTS)',
      eduBacPlus3: 'Bac+3 (Licence)',
      eduBacPlus5: 'Bac+5 (Master)',
      eduPhd: 'Doctorat',
      gpaExcellent: 'Excellent (16+/20 ou 3.7+ GPA)',
      gpaGood: 'Bien (14-16/20 ou 3.0-3.7 GPA)',
      gpaAverage: 'Moyen (12-14/20 ou 2.5-3.0 GPA)',
      gpaBelow: 'En dessous de la moyenne (< 12/20)',
      englishYes: 'Oui, anglais uniquement',
      englishBoth: 'Anglais et chinois',
      englishNo: 'Non, le chinois est OK',
      budgetYes: 'Oui, je peux payer partiellement',
      budgetNo: 'Non, j\'ai besoin d\'un financement complet',
      cityAny: 'Toute ville',
      btnNext: 'Suivant',
      btnBack: 'Retour',
      btnFindScholarships: 'Trouver Mes Bourses',
      resultsTitle: 'Vos Bourses Correspondantes',
      resultsDesc: 'Selon votre profil, voici les bourses auxquelles vous êtes éligible :',
      matchExcellent: 'Excellente Correspondance',
      matchGood: 'Bonne Correspondance',
      matchPossible: 'Correspondance Possible',
      fullyFunded: 'Bourse Complète',
      partial: 'Partielle',
      coverage: 'Ce qui est Couvert',
      eligibility: 'Éligibilité',
      deadline: 'Date Limite',
      universities: 'universités',
      successRate: 'Vos Chances',
      tuitionCovered: 'Scolarité Couverte',
      stipend: 'Allocation Mensuelle',
      applyNow: 'Postuler avec Foorsa',
      noResults: 'Aucune bourse ne correspond actuellement. Contactez-nous pour des conseils personnalisés.',
      resultsCount: 'bourses correspondent à votre profil',
      rateLow: 'Compétitif',
      rateMedium: 'Modéré',
      rateHigh: 'Bonnes Chances',
      rateVeryHigh: 'Excellentes Chances',
      levelBachelor: 'Licence',
      levelMaster: 'Master',
      levelPhd: 'Doctorat',
      levelLanguage: 'Année Linguistique',
      requiredField: 'Ce champ est requis',
      invalidEmail: 'Veuillez entrer un email valide',
      privacyNote: 'Remplissez vos informations et nous vous montrerons instantanément les bourses qui correspondent à votre profil. 100% gratuit.',
      startOver: 'Recommencer',
      filterAll: 'Tout Afficher',
      filterFull: 'Bourses Complètes',
      searchPlaceholder: 'Filtrer les résultats...'
    },
    ar: {
      heroTitle: 'اعثر على منحتك المثالية',
      heroDesc: 'أجب عن بعض الأسئلة حول ملفك الشخصي وسنطابقك مع أفضل المنح الدراسية في الصين.',
      step1Title: 'احصل على نتائجك المخصصة في ثوانٍ',
      step2Title: 'أخبرنا عن دراستك',
      step3Title: 'تقريباً انتهيت — آخر التفاصيل',
      labelName: 'الاسم الكامل',
      labelEmail: 'البريد الإلكتروني',
      labelPhone: 'رقم الهاتف',
      labelAge: 'عمرك',
      labelDegree: 'ما هي الشهادة التي تريد دراستها؟',
      labelCurrentEdu: 'مستواك التعليمي الحالي',
      labelGpa: 'معدلك العام',
      labelEnglish: 'هل تريد برامج باللغة الإنجليزية؟',
      labelCity: 'المدينة المفضلة (اختياري)',
      labelBudget: 'هل يمكنك دفع رسوم جزئية؟',
      placeholderName: 'أدخل اسمك الكامل',
      placeholderEmail: 'بريدك@email.com',
      placeholderPhone: '+212 6XX XXX XXX',
      degreeBachelor: 'بكالوريوس',
      degreeMaster: 'ماجستير',
      degreePhd: 'دكتوراه',
      degreeLanguage: 'سنة لغة صينية',
      eduBac: 'الباكالوريا',
      eduBacPlus2: 'باك+2',
      eduBacPlus3: 'باك+3 (إجازة)',
      eduBacPlus5: 'باك+5 (ماستر)',
      eduPhd: 'دكتوراه',
      gpaExcellent: 'ممتاز (16+/20 أو 3.7+ GPA)',
      gpaGood: 'جيد (14-16/20 أو 3.0-3.7 GPA)',
      gpaAverage: 'متوسط (12-14/20 أو 2.5-3.0 GPA)',
      gpaBelow: 'أقل من المتوسط (< 12/20)',
      englishYes: 'نعم، بالإنجليزية فقط',
      englishBoth: 'الإنجليزية والصينية',
      englishNo: 'لا، الصينية مقبولة',
      budgetYes: 'نعم، يمكنني الدفع جزئياً',
      budgetNo: 'لا، أحتاج تمويلاً كاملاً',
      cityAny: 'أي مدينة',
      btnNext: 'التالي',
      btnBack: 'رجوع',
      btnFindScholarships: 'ابحث عن منحي',
      resultsTitle: 'المنح المطابقة لملفك',
      resultsDesc: 'بناءً على ملفك الشخصي، إليك المنح التي يمكنك الاستفادة منها:',
      matchExcellent: 'تطابق ممتاز',
      matchGood: 'تطابق جيد',
      matchPossible: 'تطابق محتمل',
      fullyFunded: 'منحة كاملة',
      partial: 'جزئية',
      coverage: 'ما تغطيه المنحة',
      eligibility: 'شروط الأهلية',
      deadline: 'الموعد النهائي',
      universities: 'جامعة',
      successRate: 'فرصك',
      tuitionCovered: 'الرسوم المغطاة',
      stipend: 'الراتب الشهري',
      applyNow: 'قدّم مع فرصة',
      noResults: 'لا توجد منح مطابقة حالياً. تواصل معنا للحصول على نصائح مخصصة.',
      resultsCount: 'منحة تطابق ملفك',
      rateLow: 'تنافسي',
      rateMedium: 'متوسط',
      rateHigh: 'فرص جيدة',
      rateVeryHigh: 'فرص ممتازة',
      levelBachelor: 'بكالوريوس',
      levelMaster: 'ماجستير',
      levelPhd: 'دكتوراه',
      levelLanguage: 'سنة لغوية',
      requiredField: 'هذا الحقل مطلوب',
      invalidEmail: 'يرجى إدخال بريد إلكتروني صالح',
      privacyNote: 'أدخل معلوماتك وسنعرض لك فوراً المنح المطابقة لملفك. مجاني 100%.',
      startOver: 'البدء من جديد',
      filterAll: 'عرض الكل',
      filterFull: 'المنح الكاملة فقط',
      searchPlaceholder: 'تصفية النتائج...'
    }
  };

  var t = i18n[lang] || i18n.en;

  function loadData() {
    return Promise.all([
      fetch('/assets/data/scholarships.json').then(function(r) { return r.json(); }),
      fetch('/assets/data/cities.json').then(function(r) { return r.json(); })
    ]).then(function(results) {
      scholarships = results[0];
      cities = results[1];
    });
  }

  function buildProfileForm() {
    var container = document.getElementById('sf-app');
    if (!container) return;

    var cityOptions = '<option value="any">' + t.cityAny + '</option>';

    container.innerHTML =
      '<div class="sf-form-wrapper" data-track-form data-form-type="scholarship-finder">' +
        '<div class="sf-progress"><div class="sf-progress-bar" id="sf-progress-fill" style="width:33%"></div></div>' +
        '<form id="sf-profile-form" data-form-type="scholarship-finder">' +
          // Step 1 - Contact Info
          '<div class="sf-step" id="sf-step-1">' +
            '<h2 class="sf-step-title">' + t.step1Title + '</h2>' +
            '<div class="sf-field"><label for="sf-name">' + t.labelName + ' *</label><input type="text" id="sf-name" name="name" placeholder="' + t.placeholderName + '" required/></div>' +
            '<div class="sf-field"><label for="sf-email">' + t.labelEmail + ' *</label><input type="email" id="sf-email" name="email" placeholder="' + t.placeholderEmail + '" required/></div>' +
            '<div class="sf-field"><label for="sf-phone">' + t.labelPhone + ' *</label><input type="tel" id="sf-phone" name="phone" placeholder="' + t.placeholderPhone + '" required/></div>' +
            '<div class="sf-field"><label for="sf-age">' + t.labelAge + ' *</label><input type="number" id="sf-age" name="age" min="15" max="45" required/></div>' +
            '<p class="sf-privacy">' + t.privacyNote + '</p>' +
            '<div class="sf-actions"><button type="button" class="sf-btn-next" onclick="sfNext(1)">' + t.btnNext + '</button></div>' +
          '</div>' +
          // Step 2 - Academic Profile
          '<div class="sf-step" id="sf-step-2" style="display:none">' +
            '<h2 class="sf-step-title">' + t.step2Title + '</h2>' +
            '<div class="sf-field"><label for="sf-degree">' + t.labelDegree + ' *</label>' +
              '<select id="sf-degree" name="degree" required>' +
                '<option value="">' + (lang === 'ar' ? 'اختر...' : 'Select...') + '</option>' +
                '<option value="bachelor">' + t.degreeBachelor + '</option>' +
                '<option value="master">' + t.degreeMaster + '</option>' +
                '<option value="phd">' + t.degreePhd + '</option>' +
                '<option value="language">' + t.degreeLanguage + '</option>' +
              '</select></div>' +
            '<div class="sf-field"><label for="sf-current-edu">' + t.labelCurrentEdu + ' *</label>' +
              '<select id="sf-current-edu" name="current_education" required>' +
                '<option value="">' + (lang === 'ar' ? 'اختر...' : 'Select...') + '</option>' +
                '<option value="bac">' + t.eduBac + '</option>' +
                '<option value="bac2">' + t.eduBacPlus2 + '</option>' +
                '<option value="bac3">' + t.eduBacPlus3 + '</option>' +
                '<option value="bac5">' + t.eduBacPlus5 + '</option>' +
                '<option value="phd">' + t.eduPhd + '</option>' +
              '</select></div>' +
            '<div class="sf-field"><label for="sf-gpa">' + t.labelGpa + ' *</label>' +
              '<select id="sf-gpa" name="gpa_level" required>' +
                '<option value="">' + (lang === 'ar' ? 'اختر...' : 'Select...') + '</option>' +
                '<option value="excellent">' + t.gpaExcellent + '</option>' +
                '<option value="good">' + t.gpaGood + '</option>' +
                '<option value="average">' + t.gpaAverage + '</option>' +
                '<option value="below">' + t.gpaBelow + '</option>' +
              '</select></div>' +
            '<div class="sf-actions">' +
              '<button type="button" class="sf-btn-back" onclick="sfBack(2)">' + t.btnBack + '</button>' +
              '<button type="button" class="sf-btn-next" onclick="sfNext(2)">' + t.btnNext + '</button>' +
            '</div>' +
          '</div>' +
          // Step 3 - Preferences
          '<div class="sf-step" id="sf-step-3" style="display:none">' +
            '<h2 class="sf-step-title">' + t.step3Title + '</h2>' +
            '<div class="sf-field"><label for="sf-english">' + t.labelEnglish + ' *</label>' +
              '<select id="sf-english" name="english_preference" required>' +
                '<option value="yes">' + t.englishYes + '</option>' +
                '<option value="both">' + t.englishBoth + '</option>' +
                '<option value="no">' + t.englishNo + '</option>' +
              '</select></div>' +
            '<div class="sf-field"><label for="sf-city">' + t.labelCity + '</label>' +
              '<select id="sf-city" name="preferred_city">' +
                '<option value="any">' + t.cityAny + '</option>' +
              '</select></div>' +
            '<div class="sf-field"><label for="sf-budget">' + t.labelBudget + ' *</label>' +
              '<select id="sf-budget" name="budget" required>' +
                '<option value="no">' + t.budgetNo + '</option>' +
                '<option value="yes">' + t.budgetYes + '</option>' +
              '</select></div>' +
            '<div class="sf-actions">' +
              '<button type="button" class="sf-btn-back" onclick="sfBack(3)">' + t.btnBack + '</button>' +
              '<button type="button" class="sf-btn-submit" onclick="sfSubmit()">' + t.btnFindScholarships + '</button>' +
            '</div>' +
          '</div>' +
        '</form>' +
      '</div>';

    // Populate city dropdown
    var citySelect = document.getElementById('sf-city');
    if (citySelect && cities.length) {
      cities.forEach(function(city) {
        var opt = document.createElement('option');
        opt.value = city.id;
        opt.textContent = city.name[lang] || city.name.en;
        citySelect.appendChild(opt);
      });
    }
  }

  // Navigation functions (global)
  window.sfNext = function(step) {
    var currentStep = document.getElementById('sf-step-' + step);
    var inputs = currentStep.querySelectorAll('[required]');
    var valid = true;

    for (var i = 0; i < inputs.length; i++) {
      var el = inputs[i];
      el.classList.remove('sf-error');
      if (!el.value.trim()) {
        el.classList.add('sf-error');
        valid = false;
      }
      if (el.type === 'email' && el.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)) {
        el.classList.add('sf-error');
        valid = false;
      }
    }

    if (!valid) return;

    currentStep.style.display = 'none';
    document.getElementById('sf-step-' + (step + 1)).style.display = 'block';
    document.getElementById('sf-progress-fill').style.width = ((step + 1) * 33) + '%';
    window.scrollTo({ top: document.querySelector('.sf-form-wrapper').offsetTop - 100, behavior: 'smooth' });
  };

  window.sfBack = function(step) {
    document.getElementById('sf-step-' + step).style.display = 'none';
    document.getElementById('sf-step-' + (step - 1)).style.display = 'block';
    document.getElementById('sf-progress-fill').style.width = ((step - 1) * 33) + '%';
  };

  window.sfSubmit = function() {
    var form = document.getElementById('sf-profile-form');
    userProfile = {
      name: document.getElementById('sf-name').value.trim(),
      email: document.getElementById('sf-email').value.trim(),
      phone: document.getElementById('sf-phone').value.trim(),
      age: parseInt(document.getElementById('sf-age').value) || 20,
      degree: document.getElementById('sf-degree').value,
      current_education: document.getElementById('sf-current-edu').value,
      gpa_level: document.getElementById('sf-gpa').value,
      english_preference: document.getElementById('sf-english').value,
      preferred_city: document.getElementById('sf-city').value,
      budget: document.getElementById('sf-budget').value,
      language: lang
    };

    // Save lead to database
    var sessionId = sessionStorage.getItem('_fid') || 'sf-' + Date.now();
    var payload = {
      submission_id: 'SF-' + Date.now(),
      form_type: 'scholarship-finder',
      data: userProfile
    };

    fetch('/api/save-partial-submission', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(function() {});

    showResults();
  };

  window.sfStartOver = function() {
    userProfile = null;
    buildProfileForm();
  };

  function matchScholarships() {
    if (!userProfile) return [];

    var degreeMap = { bachelor: 'bachelor', master: 'master', phd: 'phd', language: 'language' };
    var targetDegree = degreeMap[userProfile.degree] || 'bachelor';

    return scholarships.map(function(s) {
      var score = 0;
      var maxScore = 0;

      // Degree level match (critical)
      maxScore += 30;
      if (s.degree_levels.indexOf(targetDegree) !== -1) score += 30;
      else return null; // Must match degree level

      // Age eligibility
      maxScore += 15;
      var age = userProfile.age;
      var ageOk = true;
      if (targetDegree === 'bachelor' && age > 25) ageOk = false;
      if (targetDegree === 'master' && age > 35) ageOk = false;
      if (targetDegree === 'phd' && age > 40) ageOk = false;
      if (ageOk) score += 15;

      // GPA match
      maxScore += 20;
      var gpa = userProfile.gpa_level;
      if (gpa === 'excellent') score += 20;
      else if (gpa === 'good') score += 15;
      else if (gpa === 'average') score += 8;
      else score += 3;

      // English preference
      maxScore += 10;
      if (userProfile.english_preference === 'yes' || userProfile.english_preference === 'both') {
        if (s.english_programs) score += 10;
      } else {
        score += 10; // No preference
      }

      // City preference
      maxScore += 10;
      if (userProfile.preferred_city === 'any') {
        score += 10;
      } else if (s.cities.indexOf(userProfile.preferred_city) !== -1) {
        score += 10;
      }

      // Budget match
      maxScore += 15;
      if (userProfile.budget === 'no') {
        if (s.type === 'full') score += 15;
        else score += 3;
      } else {
        score += 15; // Can afford partial, all scholarships work
      }

      var matchPercent = Math.round((score / maxScore) * 100);
      return { scholarship: s, score: matchPercent };
    }).filter(function(item) {
      return item !== null && item.score >= 30;
    }).sort(function(a, b) {
      return b.score - a.score;
    });
  }

  function getMatchLabel(score) {
    if (score >= 80) return { label: t.matchExcellent, cls: 'sf-match-excellent' };
    if (score >= 55) return { label: t.matchGood, cls: 'sf-match-good' };
    return { label: t.matchPossible, cls: 'sf-match-possible' };
  }

  function getSuccessRateLabel(rate) {
    var map = { low: t.rateLow, medium: t.rateMedium, high: t.rateHigh, 'very-high': t.rateVeryHigh };
    return map[rate] || rate;
  }

  function getSuccessRateColor(rate) {
    var map = { low: '#e65100', medium: '#f57c00', high: '#2e7d32', 'very-high': '#1565c0' };
    return map[rate] || '#777';
  }

  function getLevelLabels(levels) {
    var map = { bachelor: t.levelBachelor, master: t.levelMaster, phd: t.levelPhd, language: t.levelLanguage };
    return levels.map(function(l) { return map[l] || l; });
  }

  function renderCard(item) {
    var s = item.scholarship;
    var score = item.score;
    var match = getMatchLabel(score);
    var name = s.name[lang] || s.name.en;
    var desc = s.description[lang] || s.description.en;
    var coverage = s.coverage[lang] || s.coverage.en;
    var eligibility = s.eligibility[lang] || s.eligibility.en;
    var deadline = s.deadline[lang] || s.deadline.en;
    var provider = s.provider[lang] || s.provider.en;
    var isFull = s.type === 'full';

    var typeBadge = isFull
      ? '<span class="sf-badge sf-badge-full">' + t.fullyFunded + '</span>'
      : '<span class="sf-badge sf-badge-partial">' + t.partial + '</span>';

    var levelBadges = getLevelLabels(s.degree_levels).map(function(l) {
      return '<span class="sf-badge sf-badge-level">' + l + '</span>';
    }).join(' ');

    var englishBadge = s.english_programs
      ? '<span class="sf-badge sf-badge-english">English ✓</span>'
      : '';

    var coverageHtml = '<ul class="sf-coverage-list">' + coverage.map(function(item) {
      return '<li>' + item + '</li>';
    }).join('') + '</ul>';

    var cityNames = s.cities.slice(0, 5).map(function(cid) {
      var city = cities.find(function(c) { return c.id === cid; });
      return city ? (city.name[lang] || city.name.en) : cid;
    });
    var cityStr = cityNames.join(', ');
    if (s.cities.length > 5) cityStr += ' +' + (s.cities.length - 5);

    var stipendMax = Math.max.apply(null, Object.values(s.stipend_usd).filter(function(v) { return v > 0; }));
    var stipendStr = stipendMax > 0 ? '$' + stipendMax + '/mo' : '—';

    return '<div class="sf-card">' +
      '<div class="sf-card-match ' + match.cls + '"><span>' + match.label + '</span><span>' + score + '%</span></div>' +
      '<div class="sf-card-header">' +
        '<div class="sf-card-badges">' + typeBadge + ' ' + englishBadge + '</div>' +
        '<h2 class="sf-card-title">' + name + '</h2>' +
        '<p class="sf-card-provider">' + provider + '</p>' +
      '</div>' +
      '<div class="sf-card-body">' +
        '<p class="sf-card-desc">' + desc + '</p>' +
        '<div class="sf-card-levels">' + levelBadges + '</div>' +
        '<div class="sf-card-stats">' +
          '<div class="sf-stat"><span class="sf-stat-label">' + t.tuitionCovered + '</span><span class="sf-stat-value">' + s.tuition_covered + '</span></div>' +
          '<div class="sf-stat"><span class="sf-stat-label">' + t.stipend + '</span><span class="sf-stat-value">' + stipendStr + '</span></div>' +
          '<div class="sf-stat"><span class="sf-stat-label">' + t.successRate + '</span><span class="sf-stat-value" style="color:' + getSuccessRateColor(s.success_rate) + '">' + getSuccessRateLabel(s.success_rate) + '</span></div>' +
        '</div>' +
        '<details class="sf-details"><summary>' + t.coverage + '</summary>' + coverageHtml + '</details>' +
        '<details class="sf-details"><summary>' + t.eligibility + '</summary><p>' + eligibility + '</p></details>' +
        '<div class="sf-card-meta">' +
          '<span>📅 ' + t.deadline + ': ' + deadline + '</span>' +
          '<span>🏛️ ' + s.universities_count + ' ' + t.universities + '</span>' +
          '<span>📍 ' + cityStr + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="sf-card-footer">' +
        '<a href="./shop.html" class="sf-apply-btn">' + t.applyNow + '</a>' +
      '</div>' +
    '</div>';
  }

  function showResults() {
    var container = document.getElementById('sf-app');
    var matched = matchScholarships();

    var resultsHtml = matched.map(renderCard).join('');
    if (!resultsHtml) {
      resultsHtml = '<div class="sf-no-results">' + t.noResults + '</div>';
    }

    container.innerHTML =
      '<div class="sf-results-header">' +
        '<h2>' + t.resultsTitle + '</h2>' +
        '<p>' + matched.length + ' ' + t.resultsCount + '</p>' +
        '<div class="sf-results-actions">' +
          '<button class="sf-btn-back" onclick="sfStartOver()">' + t.startOver + '</button>' +
        '</div>' +
      '</div>' +
      '<div class="sf-results">' + resultsHtml + '</div>';

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function init() {
    loadData().then(function() {
      buildProfileForm();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
