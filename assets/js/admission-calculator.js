/**
 * China University Admission Chance Calculator v1.0
 * Estimates admission probability based on student profile
 * Lead capture before showing results
 */
(function() {
  'use strict';

  // ── Styles ──
  var styleEl = document.createElement('style');
  styleEl.textContent = [
    '#calc-app { font-family: Inter, "DM Sans", -apple-system, sans-serif; }',
    '#calc-app * { box-sizing: border-box; }',
    '#calc-app button { -webkit-tap-highlight-color: transparent; touch-action: manipulation; }',
    '#calc-app .calc-card { background: #fff; border: 2px solid #e9ecef; border-radius: 16px; padding: 28px; margin-bottom: 20px; transition: all 0.2s; }',
    '#calc-app .calc-card:hover { border-color: #c5cae9; }',
    '#calc-app .calc-card.active { border-color: #1a237e; background: #fafbff; }',
    '#calc-app .step-indicator { display: flex; gap: 8px; margin-bottom: 28px; justify-content: center; }',
    '#calc-app .step-dot { width: 12px; height: 12px; border-radius: 50%; background: #e0e0e0; transition: all 0.3s; }',
    '#calc-app .step-dot.active { background: #1a237e; transform: scale(1.2); }',
    '#calc-app .step-dot.done { background: #4caf50; }',
    '#calc-app .calc-input { width: 100%; padding: 14px 16px; border: 2px solid #e9ecef; border-radius: 12px; font-size: 16px; font-family: inherit; transition: border-color 0.2s; outline: none; }',
    '#calc-app .calc-input:focus { border-color: #1a237e; }',
    '#calc-app .calc-select { width: 100%; padding: 14px 16px; border: 2px solid #e9ecef; border-radius: 12px; font-size: 16px; font-family: inherit; background: #fff; cursor: pointer; outline: none; -webkit-appearance: none; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'8\' viewBox=\'0 0 12 8\'%3E%3Cpath d=\'M1 1l5 5 5-5\' stroke=\'%23666\' stroke-width=\'2\' fill=\'none\'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 16px center; }',
    '#calc-app .calc-select:focus { border-color: #1a237e; }',
    '#calc-app .option-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }',
    '#calc-app .option-card { border: 2px solid #e9ecef; border-radius: 12px; padding: 16px; cursor: pointer; transition: all 0.2s; text-align: center; }',
    '#calc-app .option-card:hover { border-color: #1a237e; background: #f5f5ff; }',
    '#calc-app .option-card.selected { border-color: #1a237e; background: #e8eaf6; }',
    '#calc-app .calc-btn { display: inline-block; padding: 14px 32px; border-radius: 30px; font-size: 16px; font-weight: 600; cursor: pointer; border: none; font-family: inherit; transition: all 0.2s; }',
    '#calc-app .calc-btn:active { transform: scale(0.97); }',
    '#calc-app .calc-btn-primary { background: linear-gradient(135deg, #1a237e, #0d47a1); color: #fff; }',
    '#calc-app .calc-btn-primary:hover { box-shadow: 0 4px 16px rgba(26,35,126,0.3); }',
    '#calc-app .calc-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; box-shadow: none; }',
    '#calc-app .calc-btn-secondary { background: transparent; color: #1a237e; border: 2px solid #1a237e; }',
    '#calc-app .calc-btn-secondary:hover { background: #f5f5ff; }',
    '#calc-app .calc-label { display: block; font-weight: 600; margin-bottom: 8px; color: #333; font-size: 15px; }',
    '#calc-app .calc-hint { font-size: 13px; color: #888; margin-top: 4px; }',
    '#calc-app .field-group { margin-bottom: 20px; }',
    '#calc-app .chance-ring { width: 180px; height: 180px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; position: relative; }',
    '#calc-app .chance-ring svg { position: absolute; top: 0; left: 0; transform: rotate(-90deg); }',
    '#calc-app .chance-ring .ring-bg { fill: none; stroke: #e9ecef; stroke-width: 10; }',
    '#calc-app .chance-ring .ring-fill { fill: none; stroke-width: 10; stroke-linecap: round; transition: stroke-dashoffset 1.5s ease; }',
    '#calc-app .chance-pct { font-size: 42px; font-weight: 700; position: relative; z-index: 1; }',
    '#calc-app .chance-label { font-size: 13px; color: #666; position: relative; z-index: 1; }',
    '#calc-app .result-card { background: #f8f9fa; border-radius: 12px; padding: 20px; margin-bottom: 16px; }',
    '#calc-app .uni-card { background: #fff; border: 1px solid #e9ecef; border-radius: 12px; padding: 16px; margin-bottom: 12px; transition: all 0.2s; }',
    '#calc-app .uni-card:hover { border-color: #1a237e; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }',
    '#calc-app .scholarship-card { background: #fff; border: 1px solid #e9ecef; border-radius: 12px; padding: 16px; margin-bottom: 12px; }',
    '#calc-app .badge { display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 11px; font-weight: 600; text-transform: uppercase; }',
    '#calc-app .badge-high { background: #e8f5e9; color: #2e7d32; }',
    '#calc-app .badge-medium { background: #fff3e0; color: #e65100; }',
    '#calc-app .badge-low { background: #ffebee; color: #c62828; }',
    '#calc-app .badge-info { background: #e3f2fd; color: #0d47a1; }',
    '#calc-app .lead-overlay { background: rgba(255,255,255,0.97); border-radius: 16px; padding: 32px; text-align: center; }',
    '#calc-app .lead-input { width: 100%; padding: 14px 16px; border: 2px solid #e9ecef; border-radius: 12px; font-size: 16px; font-family: inherit; outline: none; margin-bottom: 12px; }',
    '#calc-app .lead-input:focus { border-color: #1a237e; }',
    '#calc-app .progress-bar { height: 6px; background: #e9ecef; border-radius: 3px; overflow: hidden; margin-bottom: 24px; }',
    '#calc-app .progress-fill { height: 100%; background: linear-gradient(90deg, #1a237e, #0d47a1); border-radius: 3px; transition: width 0.3s ease; }',
    '#calc-app .error-text { color: #e53935; font-size: 13px; margin-top: 4px; }',
    '@media (max-width: 768px) {',
    '  #calc-app .option-grid { grid-template-columns: 1fr; }',
    '  #calc-app .chance-ring { width: 150px; height: 150px; }',
    '  #calc-app .chance-pct { font-size: 34px; }',
    '  #calc-app .calc-card { padding: 20px; }',
    '}',
    '@keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }',
    '#calc-app .fade-in { animation: fadeInUp 0.4s ease; }'
  ].join('\n');
  document.head.appendChild(styleEl);

  var lang = document.documentElement.lang || 'en';
  var isRTL = lang === 'ar';
  var calcData = null;
  var uniData = null;
  var cityData = null;

  var state = {
    step: 0, // 0=input, 1=lead-capture, 2=results
    bacGrade: '',
    stream: '',
    budget: '',
    city: '',
    english: '',
    email: '',
    whatsapp: '',
    results: null
  };

  // ── i18n ──
  var i18n = {
    en: {
      title: 'Check Your Admission Chances',
      subtitle: 'Enter your details to estimate your probability of admission to Chinese universities',
      bacGrade: 'Your Bac Grade (out of 20)',
      bacHint: 'Enter your Baccalaureate grade or expected grade',
      stream: 'Your Bac Stream',
      streamSelect: 'Select your stream...',
      budget: 'Annual Budget',
      budgetHint: 'How much can you spend per year on tuition and living?',
      budgetSelect: 'Select your budget...',
      city: 'Preferred City in China',
      cityHint: 'Leave as "Any" if you have no preference',
      cityAny: 'Any city',
      english: 'English Level',
      englishSelect: 'Select your level...',
      calculate: 'Calculate My Chances',
      almostThere: 'Your results are ready!',
      leadSubtitle: 'Enter your contact to see your personalized admission analysis',
      emailLabel: 'Email Address',
      emailPlaceholder: 'your.email@example.com',
      whatsappLabel: 'WhatsApp Number',
      whatsappPlaceholder: '+212 6XX XXX XXX',
      showResults: 'Show My Results',
      skipLead: 'Skip and see basic results',
      orSeparator: 'or',
      admissionChance: 'Admission Chance',
      chanceHigh: 'Excellent chances! You have a strong profile.',
      chanceMedium: 'Good chances with the right strategy.',
      chanceLow: 'Possible with careful planning.',
      chanceVeryLow: 'Challenging, but not impossible.',
      suggestedUnis: 'Suggested Universities',
      suggestedScholarships: 'Suggested Scholarships',
      matchScore: 'Match',
      tuition: 'Tuition',
      perYear: '/year',
      scholarshipChance: 'Your chance',
      deadline: 'Deadline',
      coverage: 'Coverage',
      nextSteps: 'Next Steps',
      applyWithFoorsa: 'Apply with Foorsa',
      getFreeConsultation: 'Get Free Consultation',
      tryAgain: 'Calculate Again',
      required: 'This field is required',
      invalidGrade: 'Grade must be between 8 and 20',
      invalidEmail: 'Please enter a valid email',
      invalidWhatsapp: 'Please enter a valid WhatsApp number',
      needOneContact: 'Please enter at least email or WhatsApp',
      topPick: 'Top Pick',
      affordable: 'Affordable',
      bestValue: 'Best Value',
      yourProfile: 'Your Profile',
      grade: 'Grade',
      noUnis: 'No universities found matching your criteria. Try a different city or budget.',
      highChance: 'High',
      mediumChance: 'Medium',
      lowChance: 'Low',
      stepProfile: 'Your Profile',
      stepContact: 'Contact',
      stepResults: 'Results'
    },
    fr: {
      title: 'Vérifiez Vos Chances d\'Admission',
      subtitle: 'Entrez vos données pour estimer votre probabilité d\'admission dans les universités chinoises',
      bacGrade: 'Votre Note du Bac (sur 20)',
      bacHint: 'Entrez votre note du baccalauréat ou note estimée',
      stream: 'Votre Filière du Bac',
      streamSelect: 'Sélectionnez votre filière...',
      budget: 'Budget Annuel',
      budgetHint: 'Combien pouvez-vous dépenser par an pour les frais et la vie ?',
      budgetSelect: 'Sélectionnez votre budget...',
      city: 'Ville Préférée en Chine',
      cityHint: 'Laissez "Toutes" si vous n\'avez pas de préférence',
      cityAny: 'Toutes les villes',
      english: 'Niveau d\'Anglais',
      englishSelect: 'Sélectionnez votre niveau...',
      calculate: 'Calculer Mes Chances',
      almostThere: 'Vos résultats sont prêts !',
      leadSubtitle: 'Entrez vos coordonnées pour voir votre analyse d\'admission personnalisée',
      emailLabel: 'Adresse Email',
      emailPlaceholder: 'votre.email@exemple.com',
      whatsappLabel: 'Numéro WhatsApp',
      whatsappPlaceholder: '+212 6XX XXX XXX',
      showResults: 'Voir Mes Résultats',
      skipLead: 'Passer et voir les résultats basiques',
      orSeparator: 'ou',
      admissionChance: 'Chances d\'Admission',
      chanceHigh: 'Excellentes chances ! Vous avez un profil solide.',
      chanceMedium: 'Bonnes chances avec la bonne stratégie.',
      chanceLow: 'Possible avec une planification soignée.',
      chanceVeryLow: 'Difficile, mais pas impossible.',
      suggestedUnis: 'Universités Suggérées',
      suggestedScholarships: 'Bourses Suggérées',
      matchScore: 'Compatibilité',
      tuition: 'Frais',
      perYear: '/an',
      scholarshipChance: 'Votre chance',
      deadline: 'Date limite',
      coverage: 'Couverture',
      nextSteps: 'Prochaines Étapes',
      applyWithFoorsa: 'Postuler avec Foorsa',
      getFreeConsultation: 'Consultation Gratuite',
      tryAgain: 'Recalculer',
      required: 'Ce champ est obligatoire',
      invalidGrade: 'La note doit être entre 8 et 20',
      invalidEmail: 'Veuillez entrer un email valide',
      invalidWhatsapp: 'Veuillez entrer un numéro WhatsApp valide',
      needOneContact: 'Veuillez entrer au moins un email ou WhatsApp',
      topPick: 'Meilleur choix',
      affordable: 'Abordable',
      bestValue: 'Meilleur rapport',
      yourProfile: 'Votre Profil',
      grade: 'Note',
      noUnis: 'Aucune université correspondante. Essayez une autre ville ou budget.',
      highChance: 'Élevée',
      mediumChance: 'Moyenne',
      lowChance: 'Faible',
      stepProfile: 'Profil',
      stepContact: 'Contact',
      stepResults: 'Résultats'
    },
    ar: {
      title: 'تحقق من فرص قبولك',
      subtitle: 'أدخل بياناتك لتقدير احتمالية قبولك في الجامعات الصينية',
      bacGrade: 'معدل الباكالوريا (من 20)',
      bacHint: 'أدخل معدلك في الباكالوريا أو المعدل المتوقع',
      stream: 'شعبة الباكالوريا',
      streamSelect: 'اختر شعبتك...',
      budget: 'الميزانية السنوية',
      budgetHint: 'كم يمكنك إنفاقه سنوياً على الدراسة والمعيشة؟',
      budgetSelect: 'اختر ميزانيتك...',
      city: 'المدينة المفضلة في الصين',
      cityHint: 'اتركها "أي مدينة" إذا لم يكن لديك تفضيل',
      cityAny: 'أي مدينة',
      english: 'مستوى الإنجليزية',
      englishSelect: 'اختر مستواك...',
      calculate: 'احسب فرصي',
      almostThere: 'نتائجك جاهزة!',
      leadSubtitle: 'أدخل بيانات التواصل لرؤية تحليل القبول المخصص لك',
      emailLabel: 'البريد الإلكتروني',
      emailPlaceholder: 'your.email@example.com',
      whatsappLabel: 'رقم واتساب',
      whatsappPlaceholder: '+212 6XX XXX XXX',
      showResults: 'عرض نتائجي',
      skipLead: 'تخطي وعرض النتائج الأساسية',
      orSeparator: 'أو',
      admissionChance: 'فرصة القبول',
      chanceHigh: 'فرص ممتازة! لديك ملف قوي.',
      chanceMedium: 'فرص جيدة مع الاستراتيجية الصحيحة.',
      chanceLow: 'ممكن مع تخطيط دقيق.',
      chanceVeryLow: 'صعب، لكن ليس مستحيلاً.',
      suggestedUnis: 'الجامعات المقترحة',
      suggestedScholarships: 'المنح المقترحة',
      matchScore: 'التوافق',
      tuition: 'الرسوم',
      perYear: '/سنة',
      scholarshipChance: 'فرصتك',
      deadline: 'الموعد النهائي',
      coverage: 'التغطية',
      nextSteps: 'الخطوات التالية',
      applyWithFoorsa: 'قدّم مع فرصة',
      getFreeConsultation: 'استشارة مجانية',
      tryAgain: 'احسب مرة أخرى',
      required: 'هذا الحقل مطلوب',
      invalidGrade: 'يجب أن يكون المعدل بين 8 و 20',
      invalidEmail: 'الرجاء إدخال بريد إلكتروني صالح',
      invalidWhatsapp: 'الرجاء إدخال رقم واتساب صالح',
      needOneContact: 'الرجاء إدخال البريد الإلكتروني أو واتساب على الأقل',
      topPick: 'الأفضل',
      affordable: 'ميسور',
      bestValue: 'أفضل قيمة',
      yourProfile: 'ملفك',
      grade: 'المعدل',
      noUnis: 'لم يتم العثور على جامعات مطابقة. جرب مدينة أو ميزانية مختلفة.',
      highChance: 'مرتفعة',
      mediumChance: 'متوسطة',
      lowChance: 'منخفضة',
      stepProfile: 'الملف',
      stepContact: 'التواصل',
      stepResults: 'النتائج'
    }
  };
  var t = i18n[lang] || i18n.en;

  // ── App root ──
  var appEl = document.getElementById('calc-app');
  if (!appEl) return;
  var basePath = appEl.getAttribute('data-base') || '../';

  // ── Load data ──
  function loadData(callback) {
    var loaded = 0;
    var total = 3;
    function check() { if (++loaded === total) callback(); }

    fetch(basePath + 'assets/data/admission-calculator.json')
      .then(function(r) { return r.json(); })
      .then(function(d) { calcData = d; check(); })
      .catch(function() { check(); });

    fetch(basePath + 'assets/data/universities.json')
      .then(function(r) { return r.json(); })
      .then(function(d) { uniData = d; check(); })
      .catch(function() { check(); });

    fetch(basePath + 'assets/data/cities.json')
      .then(function(r) { return r.json(); })
      .then(function(d) { cityData = d; check(); })
      .catch(function() { check(); });
  }

  // ── Calculation Engine ──
  function calculateAdmission() {
    var grade = parseFloat(state.bacGrade);
    var stream = state.stream;
    var budgetId = state.budget;
    var cityId = state.city;
    var englishId = state.english;

    var budgetObj = calcData.budgetRanges.find(function(b) { return b.id === budgetId; });
    var englishObj = calcData.englishLevels.find(function(e) { return e.id === englishId; });
    var maxBudgetUsd = budgetObj ? budgetObj.maxUsd : 0;
    var englishScore = englishObj ? englishObj.score : 0;

    // Base admission chance from grade (Moroccan Bac /20)
    var gradeChance;
    if (grade >= 16) gradeChance = 90;
    else if (grade >= 14) gradeChance = 78;
    else if (grade >= 12) gradeChance = 62;
    else if (grade >= 10) gradeChance = 40;
    else gradeChance = 20;

    // Stream bonus
    var streamBonus = 0;
    if (stream === 'science') streamBonus = 10;
    else if (stream === 'economics') streamBonus = 5;
    else streamBonus = 0;

    // English bonus
    var englishBonus = englishScore * 4; // 0-16 points

    // Budget factor (more budget = more options, slightly higher chance)
    var budgetBonus = 0;
    if (maxBudgetUsd >= 10000) budgetBonus = 8;
    else if (maxBudgetUsd >= 6000) budgetBonus = 5;
    else if (maxBudgetUsd >= 3000) budgetBonus = 3;
    else if (maxBudgetUsd > 0) budgetBonus = 1;
    // scholarship-only: no penalty, but no bonus

    var rawChance = gradeChance + streamBonus + englishBonus + budgetBonus;
    var chance = Math.min(95, Math.max(10, rawChance));

    // ── Find matching universities ──
    var programsForStream = calcData.streamProgramMap[stream] || [];
    var matchedUnis = [];

    uniData.forEach(function(uni) {
      var score = 0;
      var reasons = [];

      // Grade match
      var minGpa = uni.admission_requirements && uni.admission_requirements.bachelors
        ? parseInt(uni.admission_requirements.bachelors.min_gpa) : 70;
      var gradePercent = (grade / 20) * 100;
      if (gradePercent >= minGpa + 10) { score += 30; reasons.push('strong_academics'); }
      else if (gradePercent >= minGpa) { score += 20; reasons.push('meets_requirements'); }
      else if (gradePercent >= minGpa - 10) { score += 8; }
      else { return; } // Skip if grade too low

      // Program match
      var hasMatchingProgram = uni.programs && uni.programs.some(function(p) {
        return programsForStream.indexOf(p) !== -1;
      });
      if (hasMatchingProgram) { score += 20; reasons.push('program_match'); }
      else { score += 5; }

      // Budget match
      var tuitionMin = uni.tuition_range_usd ? uni.tuition_range_usd.min : 2000;
      if (maxBudgetUsd === 0) {
        // Scholarship only - check if uni offers scholarships
        if (uni.scholarship_types && uni.scholarship_types.length > 0) { score += 15; reasons.push('has_scholarships'); }
      } else if (maxBudgetUsd >= tuitionMin) {
        score += 15;
        if (maxBudgetUsd >= tuitionMin * 1.5) reasons.push('affordable');
      } else {
        // Can't afford but maybe scholarship
        if (uni.scholarship_types && uni.scholarship_types.length > 0) { score += 5; }
        else { return; }
      }

      // City match
      if (cityId && cityId !== 'any' && uni.city === cityId) {
        score += 15; reasons.push('city_match');
      } else if (!cityId || cityId === 'any') {
        score += 8;
      }

      // English program bonus
      if (uni.english_taught_programs && englishScore >= 2) {
        score += 10; reasons.push('english_programs');
      }

      // Moroccan student presence bonus
      if (uni.moroccan_students) { score += 5; reasons.push('moroccan_community'); }

      // Halal food bonus
      if (uni.halal_food) { score += 3; }

      matchedUnis.push({
        uni: uni,
        score: score,
        reasons: reasons,
        matchPercent: Math.min(98, Math.round(score * 1.1))
      });
    });

    // Sort by score, take top 6
    matchedUnis.sort(function(a, b) { return b.score - a.score; });
    var topUnis = matchedUnis.slice(0, 6);

    // ── Find matching scholarships ──
    var matchedScholarships = [];
    calcData.scholarships.forEach(function(sch) {
      var elig = sch.eligibility;
      if (grade < elig.minGrade) return;
      if (elig.streams.indexOf(stream) === -1) return;

      var schChance;
      var compMap = { very_high: 'low', high: 'medium', medium: 'high', medium_low: 'high' };
      var baseChance = { very_high: 25, high: 40, medium: 60, medium_low: 70 };
      schChance = baseChance[sch.competitiveness] || 40;

      // Grade bonus for scholarships
      if (grade >= 16) schChance += 20;
      else if (grade >= 14) schChance += 10;
      else if (grade >= 12) schChance += 5;

      // English bonus for scholarships
      if (englishScore >= elig.englishMin + 2) schChance += 10;
      else if (englishScore >= elig.englishMin) schChance += 5;

      schChance = Math.min(90, Math.max(10, schChance));

      matchedScholarships.push({
        scholarship: sch,
        chance: schChance,
        level: schChance >= 60 ? 'high' : schChance >= 35 ? 'medium' : 'low'
      });
    });

    matchedScholarships.sort(function(a, b) { return b.chance - a.chance; });

    return {
      chance: Math.round(chance),
      universities: topUnis,
      scholarships: matchedScholarships,
      grade: grade,
      stream: stream,
      budget: budgetId,
      english: englishId,
      city: cityId
    };
  }

  // ── Render ──
  function render() {
    if (state.step === 0) renderForm();
    else if (state.step === 1) renderLeadCapture();
    else renderResults();
  }

  function renderForm() {
    var dir = isRTL ? ' dir="rtl"' : '';
    var textAlign = isRTL ? 'right' : 'left';
    var cities = cityData || [];

    var html = '<div class="fade-in"' + dir + ' style="text-align:' + textAlign + ';">';

    // Progress
    html += '<div class="step-indicator">';
    html += '<div class="step-dot active"></div>';
    html += '<div class="step-dot"></div>';
    html += '<div class="step-dot"></div>';
    html += '</div>';

    // Grade
    html += '<div class="field-group">';
    html += '<label class="calc-label">' + t.bacGrade + '</label>';
    html += '<input type="number" class="calc-input" id="calc-grade" min="8" max="20" step="0.01" placeholder="14.50" value="' + (state.bacGrade || '') + '"/>';
    html += '<div class="calc-hint">' + t.bacHint + '</div>';
    html += '<div class="error-text" id="grade-error" style="display:none;"></div>';
    html += '</div>';

    // Stream
    html += '<div class="field-group">';
    html += '<label class="calc-label">' + t.stream + '</label>';
    html += '<select class="calc-select" id="calc-stream">';
    html += '<option value="">' + t.streamSelect + '</option>';
    calcData.streams.forEach(function(s) {
      var sel = state.stream === s.id ? ' selected' : '';
      html += '<option value="' + s.id + '"' + sel + '>' + (s.label[lang] || s.label.en) + '</option>';
    });
    html += '</select>';
    html += '<div class="error-text" id="stream-error" style="display:none;"></div>';
    html += '</div>';

    // Budget
    html += '<div class="field-group">';
    html += '<label class="calc-label">' + t.budget + '</label>';
    html += '<select class="calc-select" id="calc-budget">';
    html += '<option value="">' + t.budgetSelect + '</option>';
    calcData.budgetRanges.forEach(function(b) {
      var sel = state.budget === b.id ? ' selected' : '';
      html += '<option value="' + b.id + '"' + sel + '>' + (b.label[lang] || b.label.en) + '</option>';
    });
    html += '</select>';
    html += '<div class="calc-hint">' + t.budgetHint + '</div>';
    html += '<div class="error-text" id="budget-error" style="display:none;"></div>';
    html += '</div>';

    // City
    html += '<div class="field-group">';
    html += '<label class="calc-label">' + t.city + '</label>';
    html += '<select class="calc-select" id="calc-city">';
    html += '<option value="any">' + t.cityAny + '</option>';
    cities.forEach(function(c) {
      var sel = state.city === c.id ? ' selected' : '';
      html += '<option value="' + c.id + '"' + sel + '>' + (c.name[lang] || c.name.en) + '</option>';
    });
    html += '</select>';
    html += '<div class="calc-hint">' + t.cityHint + '</div>';
    html += '</div>';

    // English
    html += '<div class="field-group">';
    html += '<label class="calc-label">' + t.english + '</label>';
    html += '<select class="calc-select" id="calc-english">';
    html += '<option value="">' + t.englishSelect + '</option>';
    calcData.englishLevels.forEach(function(e) {
      var sel = state.english === e.id ? ' selected' : '';
      html += '<option value="' + e.id + '"' + sel + '>' + (e.label[lang] || e.label.en) + '</option>';
    });
    html += '</select>';
    html += '<div class="error-text" id="english-error" style="display:none;"></div>';
    html += '</div>';

    // Submit
    html += '<div style="text-align:center;margin-top:28px;">';
    html += '<button class="calc-btn calc-btn-primary" id="calc-submit" style="width:100%;max-width:400px;">' + t.calculate + '</button>';
    html += '</div>';

    html += '</div>';
    appEl.innerHTML = html;

    // Events
    document.getElementById('calc-submit').addEventListener('click', function() {
      if (validateForm()) {
        state.bacGrade = document.getElementById('calc-grade').value;
        state.stream = document.getElementById('calc-stream').value;
        state.budget = document.getElementById('calc-budget').value;
        state.city = document.getElementById('calc-city').value;
        state.english = document.getElementById('calc-english').value;
        state.results = calculateAdmission();
        state.step = 1;
        render();
        appEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  function validateForm() {
    var valid = true;
    var grade = document.getElementById('calc-grade').value;
    var stream = document.getElementById('calc-stream').value;
    var budget = document.getElementById('calc-budget').value;
    var english = document.getElementById('calc-english').value;

    // Reset errors
    ['grade', 'stream', 'budget', 'english'].forEach(function(id) {
      var el = document.getElementById(id + '-error');
      if (el) el.style.display = 'none';
    });

    if (!grade) {
      showError('grade-error', t.required); valid = false;
    } else {
      var g = parseFloat(grade);
      if (g < 8 || g > 20 || isNaN(g)) { showError('grade-error', t.invalidGrade); valid = false; }
    }
    if (!stream) { showError('stream-error', t.required); valid = false; }
    if (!budget) { showError('budget-error', t.required); valid = false; }
    if (!english) { showError('english-error', t.required); valid = false; }

    return valid;
  }

  function showError(id, msg) {
    var el = document.getElementById(id);
    if (el) { el.textContent = msg; el.style.display = 'block'; }
  }

  function renderLeadCapture() {
    var dir = isRTL ? ' dir="rtl"' : '';
    var textAlign = isRTL ? 'right' : 'left';
    var chance = state.results.chance;

    var color = chance >= 70 ? '#4caf50' : chance >= 45 ? '#ff9800' : '#e53935';

    var html = '<div class="fade-in lead-overlay"' + dir + '>';

    // Progress
    html += '<div class="step-indicator">';
    html += '<div class="step-dot done"></div>';
    html += '<div class="step-dot active"></div>';
    html += '<div class="step-dot"></div>';
    html += '</div>';

    // Teaser ring
    html += '<div class="chance-ring" style="margin-bottom:20px;">';
    html += '<svg width="180" height="180" viewBox="0 0 180 180">';
    html += '<circle class="ring-bg" cx="90" cy="90" r="80"/>';
    var circ = 2 * Math.PI * 80;
    var offset = circ - (chance / 100) * circ;
    html += '<circle class="ring-fill" cx="90" cy="90" r="80" stroke="' + color + '" stroke-dasharray="' + circ + '" stroke-dashoffset="' + circ + '" id="lead-ring"/>';
    html += '</svg>';
    html += '<div style="text-align:center;"><div class="chance-pct" style="color:' + color + ';">?</div>';
    html += '<div class="chance-label">' + t.admissionChance + '</div></div>';
    html += '</div>';

    html += '<h2 style="font-size:1.5rem;font-weight:700;margin-bottom:8px;">' + t.almostThere + '</h2>';
    html += '<p style="color:#666;margin-bottom:24px;">' + t.leadSubtitle + '</p>';

    html += '<div style="max-width:380px;margin:0 auto;text-align:' + textAlign + ';">';

    html += '<label class="calc-label">' + t.emailLabel + '</label>';
    html += '<input type="email" class="lead-input" id="lead-email" placeholder="' + t.emailPlaceholder + '" value="' + (state.email || '') + '"/>';
    html += '<div class="error-text" id="email-error" style="display:none;"></div>';

    html += '<p style="text-align:center;color:#999;margin:8px 0;font-size:13px;">' + t.orSeparator + '</p>';

    html += '<label class="calc-label">' + t.whatsappLabel + '</label>';
    html += '<input type="tel" class="lead-input" id="lead-whatsapp" placeholder="' + t.whatsappPlaceholder + '" value="' + (state.whatsapp || '') + '"/>';
    html += '<div class="error-text" id="whatsapp-error" style="display:none;"></div>';
    html += '<div class="error-text" id="contact-error" style="display:none;"></div>';

    html += '<button class="calc-btn calc-btn-primary" id="lead-submit" style="width:100%;margin-top:16px;">' + t.showResults + '</button>';
    html += '<p style="text-align:center;margin-top:12px;"><a href="#" id="lead-skip" style="color:#888;font-size:13px;text-decoration:underline;">' + t.skipLead + '</a></p>';

    html += '</div></div>';
    appEl.innerHTML = html;

    // Animate ring teaser
    setTimeout(function() {
      var ring = document.getElementById('lead-ring');
      if (ring) ring.setAttribute('stroke-dashoffset', circ * 0.65); // partial reveal
    }, 100);

    document.getElementById('lead-submit').addEventListener('click', function() {
      var email = document.getElementById('lead-email').value.trim();
      var whatsapp = document.getElementById('lead-whatsapp').value.trim();

      // Reset errors
      ['email-error', 'whatsapp-error', 'contact-error'].forEach(function(id) {
        document.getElementById(id).style.display = 'none';
      });

      if (!email && !whatsapp) {
        showError('contact-error', t.needOneContact);
        return;
      }
      if (email && !isValidEmail(email)) {
        showError('email-error', t.invalidEmail);
        return;
      }
      if (whatsapp && !isValidWhatsapp(whatsapp)) {
        showError('whatsapp-error', t.invalidWhatsapp);
        return;
      }

      state.email = email;
      state.whatsapp = whatsapp;
      submitLead(email, whatsapp);
      state.step = 2;
      render();
      appEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    document.getElementById('lead-skip').addEventListener('click', function(e) {
      e.preventDefault();
      state.step = 2;
      render();
      appEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidWhatsapp(num) {
    var cleaned = num.replace(/[\s\-()]/g, '');
    return /^\+?\d{8,15}$/.test(cleaned);
  }

  function submitLead(email, whatsapp) {
    var payload = {
      form_type: 'admission-calculator',
      email: email || '',
      whatsapp: whatsapp || '',
      bac_grade: state.bacGrade,
      stream: state.stream,
      budget: state.budget,
      city: state.city || 'any',
      english_level: state.english,
      admission_chance: state.results.chance,
      language: lang,
      source: 'admission-calculator',
      timestamp: new Date().toISOString()
    };

    fetch('/api/submit-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(function() { /* silent fail */ });
  }

  function renderResults() {
    var dir = isRTL ? ' dir="rtl"' : '';
    var textAlign = isRTL ? 'right' : 'left';
    var r = state.results;
    var chance = r.chance;

    var color = chance >= 70 ? '#4caf50' : chance >= 45 ? '#ff9800' : '#e53935';
    var chanceMsg = chance >= 70 ? t.chanceHigh : chance >= 45 ? t.chanceMedium : chance >= 25 ? t.chanceLow : t.chanceVeryLow;

    var html = '<div class="fade-in"' + dir + ' style="text-align:' + textAlign + ';">';

    // Progress
    html += '<div class="step-indicator">';
    html += '<div class="step-dot done"></div>';
    html += '<div class="step-dot done"></div>';
    html += '<div class="step-dot active"></div>';
    html += '</div>';

    // ── Chance Ring ──
    html += '<div style="text-align:center;margin-bottom:32px;">';
    html += '<div class="chance-ring">';
    html += '<svg width="180" height="180" viewBox="0 0 180 180">';
    html += '<circle class="ring-bg" cx="90" cy="90" r="80"/>';
    var circ = 2 * Math.PI * 80;
    var offset = circ - (chance / 100) * circ;
    html += '<circle class="ring-fill" cx="90" cy="90" r="80" stroke="' + color + '" stroke-dasharray="' + circ + '" stroke-dashoffset="' + circ + '" id="result-ring"/>';
    html += '</svg>';
    html += '<div style="text-align:center;"><div class="chance-pct" id="result-pct" style="color:' + color + ';">0%</div>';
    html += '<div class="chance-label">' + t.admissionChance + '</div></div>';
    html += '</div>';
    html += '<p style="font-size:1.1rem;color:#555;max-width:500px;margin:0 auto;">' + chanceMsg + '</p>';
    html += '</div>';

    // ── Your Profile Summary ──
    html += '<div class="result-card" style="margin-bottom:24px;">';
    html += '<h3 style="font-size:1.1rem;font-weight:600;margin-bottom:12px;">' + t.yourProfile + '</h3>';
    html += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:12px;">';

    var streamObj = calcData.streams.find(function(s) { return s.id === r.stream; });
    var budgetObj = calcData.budgetRanges.find(function(b) { return b.id === r.budget; });
    var englishObj = calcData.englishLevels.find(function(e) { return e.id === r.english; });

    html += profileStat(t.grade, r.grade + '/20');
    html += profileStat(t.stream, streamObj ? (streamObj.label[lang] || streamObj.label.en).split('(')[0].trim() : r.stream);
    html += profileStat(t.budget, budgetObj ? (budgetObj.label[lang] || budgetObj.label.en).split('(')[0].trim() : r.budget);
    html += profileStat(t.english, englishObj ? (englishObj.label[lang] || englishObj.label.en).split('(')[0].trim() : r.english);
    html += '</div></div>';

    // ── Suggested Universities ──
    html += '<h2 style="font-size:1.4rem;font-weight:700;margin-bottom:16px;">' + t.suggestedUnis + '</h2>';

    if (r.universities.length === 0) {
      html += '<div class="result-card"><p style="color:#666;">' + t.noUnis + '</p></div>';
    } else {
      r.universities.forEach(function(item, idx) {
        var uni = item.uni;
        var name = uni.name[lang] || uni.name.en;
        var cityObj = cityData ? cityData.find(function(c) { return c.id === uni.city; }) : null;
        var cityName = cityObj ? (cityObj.name[lang] || cityObj.name.en) : uni.city;
        var tuitionMin = uni.tuition_range_usd ? '$' + uni.tuition_range_usd.min.toLocaleString() : '—';
        var tuitionMax = uni.tuition_range_usd ? '$' + uni.tuition_range_usd.max.toLocaleString() : '—';

        html += '<div class="uni-card">';
        html += '<div style="display:flex;justify-content:space-between;align-items:start;flex-wrap:wrap;gap:8px;">';
        html += '<div>';
        html += '<h3 style="font-size:1.05rem;font-weight:600;margin:0 0 4px;">' + name + '</h3>';
        html += '<p style="color:#666;font-size:13px;margin:0;">' + cityName;
        if (uni.ranking_qs) html += ' &middot; QS #' + uni.ranking_qs;
        html += '</p>';
        html += '</div>';
        html += '<div style="text-align:' + (isRTL ? 'left' : 'right') + ';">';
        html += '<div style="font-weight:700;color:' + matchColor(item.matchPercent) + ';font-size:1.1rem;">' + item.matchPercent + '%</div>';
        html += '<div style="font-size:11px;color:#888;">' + t.matchScore + '</div>';
        html += '</div></div>';

        // Tags
        html += '<div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:6px;">';
        if (idx === 0) html += '<span class="badge badge-info">' + t.topPick + '</span>';
        if (item.reasons.indexOf('affordable') !== -1) html += '<span class="badge badge-high">' + t.affordable + '</span>';
        if (item.reasons.indexOf('english_programs') !== -1) html += '<span class="badge badge-info">English Programs</span>';
        if (item.reasons.indexOf('moroccan_community') !== -1) html += '<span class="badge badge-info">Moroccan Students</span>';
        html += '</div>';

        html += '<div style="margin-top:8px;font-size:13px;color:#666;">';
        html += t.tuition + ': ' + tuitionMin + ' – ' + tuitionMax + t.perYear;
        html += '</div>';

        html += '</div>';
      });
    }

    // ── Suggested Scholarships ──
    html += '<h2 style="font-size:1.4rem;font-weight:700;margin:28px 0 16px;">' + t.suggestedScholarships + '</h2>';

    r.scholarships.forEach(function(item) {
      var sch = item.scholarship;
      var name = sch.name[lang] || sch.name.en;
      var desc = sch.description[lang] || sch.description.en;
      var coverage = sch.coverage[lang] || sch.coverage.en;
      var levelLabel = item.level === 'high' ? t.highChance : item.level === 'medium' ? t.mediumChance : t.lowChance;
      var levelClass = item.level === 'high' ? 'badge-high' : item.level === 'medium' ? 'badge-medium' : 'badge-low';

      html += '<div class="scholarship-card">';
      html += '<div style="display:flex;justify-content:space-between;align-items:start;flex-wrap:wrap;gap:8px;">';
      html += '<h3 style="font-size:1rem;font-weight:600;margin:0;">' + name + '</h3>';
      html += '<span class="badge ' + levelClass + '">' + t.scholarshipChance + ': ' + levelLabel + '</span>';
      html += '</div>';
      html += '<p style="color:#555;font-size:14px;line-height:1.6;margin:8px 0;">' + desc + '</p>';
      html += '<div style="display:flex;flex-wrap:wrap;gap:16px;font-size:13px;color:#666;">';
      html += '<div><strong>' + t.coverage + ':</strong> ' + coverage + '</div>';
      html += '<div><strong>' + t.deadline + ':</strong> ' + sch.deadline + '</div>';
      html += '</div>';
      html += '</div>';
    });

    // ── CTA ──
    html += '<div style="background:linear-gradient(135deg,#1a237e,#0d47a1);border-radius:16px;padding:40px 28px;text-align:center;color:#fff;margin:32px 0;">';
    html += '<h2 style="font-size:1.5rem;font-weight:700;margin-bottom:8px;">' + t.nextSteps + '</h2>';
    html += '<p style="opacity:0.9;margin-bottom:20px;">Let Foorsa handle your application from start to finish</p>';
    html += '<a href="https://apply.foorsa.ma" target="_blank" rel="noopener" class="calc-btn" style="background:#fff;color:#1a237e;margin:6px;display:inline-block;text-decoration:none;">' + t.applyWithFoorsa + '</a>';
    html += '<a href="' + basePath + lang + '/contact.html" class="calc-btn" style="background:transparent;color:#fff;border:2px solid #fff;margin:6px;display:inline-block;text-decoration:none;">' + t.getFreeConsultation + '</a>';
    html += '</div>';

    // Try again
    html += '<div style="text-align:center;">';
    html += '<button class="calc-btn calc-btn-secondary" id="calc-restart">' + t.tryAgain + '</button>';
    html += '</div>';

    html += '</div>';
    appEl.innerHTML = html;

    // Animate ring
    setTimeout(function() {
      var ring = document.getElementById('result-ring');
      if (ring) ring.setAttribute('stroke-dashoffset', offset);
      animateCounter('result-pct', 0, chance, 1200, '%');
    }, 200);

    document.getElementById('calc-restart').addEventListener('click', function() {
      state.step = 0;
      state.results = null;
      state.email = '';
      state.whatsapp = '';
      render();
      appEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function profileStat(label, value) {
    return '<div style="background:#fff;border-radius:8px;padding:10px;text-align:center;border:1px solid #e9ecef;">' +
      '<div style="font-size:12px;color:#888;margin-bottom:2px;">' + label + '</div>' +
      '<div style="font-weight:600;font-size:14px;">' + value + '</div></div>';
  }

  function matchColor(pct) {
    if (pct >= 70) return '#4caf50';
    if (pct >= 45) return '#ff9800';
    return '#e53935';
  }

  function animateCounter(elId, start, end, duration, suffix) {
    var el = document.getElementById(elId);
    if (!el) return;
    var range = end - start;
    var startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.round(start + range * eased) + (suffix || '');
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // ── Init ──
  appEl.innerHTML = '<div style="text-align:center;padding:60px 20px;color:#888;">Loading...</div>';
  loadData(function() {
    if (!calcData || !uniData) {
      appEl.innerHTML = '<div style="text-align:center;padding:60px 20px;color:#e53935;">Failed to load data. Please refresh the page.</div>';
      return;
    }
    render();
  });

})();
