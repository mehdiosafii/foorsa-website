/**
 * CSCA Test Simulator Engine
 * Free CSC Scholarship Assessment practice for Moroccan students
 */
(function() {
  'use strict';

  // Inject mobile-first styles
  var styleEl = document.createElement('style');
  styleEl.textContent = [
    '#csca-app { font-family: Inter, "DM Sans", -apple-system, sans-serif; }',
    '#csca-app button { -webkit-tap-highlight-color: transparent; touch-action: manipulation; }',
    '#csca-app .csca-option { min-height: 56px; transition: all 0.15s ease; }',
    '#csca-app .csca-option:hover { border-color: #1a237e !important; background: #f5f5ff !important; }',
    '#csca-app .csca-option:active { transform: scale(0.98); }',
    '@media (max-width: 768px) {',
    '  #csca-app .csca-option { min-height: 52px; padding: 14px 16px !important; font-size: 14px !important; }',
    '  #csca-app h3 { font-size: 1.05rem !important; }',
    '  .q-dot { min-width: 8px !important; }',
    '}',
    '#csca-app .subject-label:has(input:checked) { border-color: #1a237e !important; background: #e8eaf6 !important; }',
    '#csca-app .progress-bar-fill { transition: width 0.3s ease; }',
    '#csca-app details summary { -webkit-tap-highlight-color: transparent; }'
  ].join('\n');
  document.head.appendChild(styleEl);

  var lang = document.documentElement.lang || 'en';
  var isRTL = lang === 'ar';
  var data = null;
  var state = {
    mode: 'landing',       // landing | subject-select | testing | review | results
    selectedSubjects: [],
    questions: [],
    currentIndex: 0,
    answers: {},
    timeLeft: 0,
    timerInterval: null,
    startedAt: null
  };

  var i18n = {
    en: {
      startTest: 'Start Full Test',
      practiceSubject: 'Practice by Subject',
      selectSubjects: 'Select Subjects to Practice',
      startPractice: 'Start Practice',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      submit: 'Submit Test',
      timeLeft: 'Time Left',
      question: 'Question',
      of: 'of',
      score: 'Your Score',
      passed: 'Congratulations! You Passed!',
      failed: 'Keep Practicing!',
      passedMsg: 'You scored above the passing threshold. You are well prepared for the CSC scholarship assessment.',
      failedMsg: 'Don\'t worry! Practice more and try again. Foorsa is here to help you succeed.',
      retake: 'Retake Test',
      reviewAnswers: 'Review Answers',
      correct: 'Correct',
      incorrect: 'Your answer',
      correctAnswer: 'Correct answer',
      explanation: 'Explanation',
      applyNow: 'Apply with Foorsa Now',
      getFreeConsultation: 'Get Free Consultation',
      questionsCount: 'questions',
      minutes: 'min',
      fullTestDesc: '50 questions across 5 subjects with 90-minute timer — simulates the real assessment',
      practiceDesc: 'Choose specific subjects to focus your preparation',
      selectAll: 'Select All',
      timeUp: 'Time\'s Up!',
      timeUpMsg: 'The test time has expired. Your answers have been submitted automatically.',
      answered: 'Answered',
      unanswered: 'Unanswered',
      backToResults: 'Back to Results',
      subjectScore: 'Subject Scores'
    },
    fr: {
      startTest: 'Commencer le Test Complet',
      practiceSubject: 'S\'entraîner par Matière',
      selectSubjects: 'Sélectionnez les Matières',
      startPractice: 'Commencer l\'Entraînement',
      back: 'Retour',
      next: 'Suivant',
      previous: 'Précédent',
      submit: 'Soumettre le Test',
      timeLeft: 'Temps Restant',
      question: 'Question',
      of: 'sur',
      score: 'Votre Score',
      passed: 'Félicitations ! Vous avez Réussi !',
      failed: 'Continuez à Pratiquer !',
      passedMsg: 'Vous avez dépassé le seuil de réussite. Vous êtes bien préparé pour l\'évaluation de la bourse CSC.',
      failedMsg: 'Ne vous inquiétez pas ! Entraînez-vous davantage et réessayez. Foorsa est là pour vous aider.',
      retake: 'Refaire le Test',
      reviewAnswers: 'Revoir les Réponses',
      correct: 'Correct',
      incorrect: 'Votre réponse',
      correctAnswer: 'Bonne réponse',
      explanation: 'Explication',
      applyNow: 'Postulez avec Foorsa',
      getFreeConsultation: 'Consultation Gratuite',
      questionsCount: 'questions',
      minutes: 'min',
      fullTestDesc: '50 questions dans 5 matières avec chronomètre de 90 minutes — simule l\'évaluation réelle',
      practiceDesc: 'Choisissez des matières spécifiques pour concentrer votre préparation',
      selectAll: 'Tout Sélectionner',
      timeUp: 'Temps Écoulé !',
      timeUpMsg: 'Le temps est écoulé. Vos réponses ont été soumises automatiquement.',
      answered: 'Répondu',
      unanswered: 'Sans réponse',
      backToResults: 'Retour aux Résultats',
      subjectScore: 'Scores par Matière'
    },
    ar: {
      startTest: 'ابدأ الاختبار الكامل',
      practiceSubject: 'تدرب حسب المادة',
      selectSubjects: 'اختر المواد للتدريب',
      startPractice: 'ابدأ التدريب',
      back: 'رجوع',
      next: 'التالي',
      previous: 'السابق',
      submit: 'تقديم الاختبار',
      timeLeft: 'الوقت المتبقي',
      question: 'السؤال',
      of: 'من',
      score: 'نتيجتك',
      passed: 'تهانينا! لقد نجحت!',
      failed: 'استمر في التدريب!',
      passedMsg: 'حصلت على درجة أعلى من حد النجاح. أنت مستعد جيداً لتقييم منحة CSC.',
      failedMsg: 'لا تقلق! تدرب أكثر وحاول مرة أخرى. فورصة هنا لمساعدتك على النجاح.',
      retake: 'إعادة الاختبار',
      reviewAnswers: 'مراجعة الإجابات',
      correct: 'صحيح',
      incorrect: 'إجابتك',
      correctAnswer: 'الإجابة الصحيحة',
      explanation: 'التوضيح',
      applyNow: 'قدّم مع فورصة الآن',
      getFreeConsultation: 'استشارة مجانية',
      questionsCount: 'أسئلة',
      minutes: 'دقيقة',
      fullTestDesc: '50 سؤالاً في 5 مواد مع مؤقت 90 دقيقة — يحاكي التقييم الحقيقي',
      practiceDesc: 'اختر مواد محددة لتركيز تحضيرك',
      selectAll: 'اختر الكل',
      timeUp: 'انتهى الوقت!',
      timeUpMsg: 'انتهى وقت الاختبار. تم تقديم إجاباتك تلقائياً.',
      answered: 'تمت الإجابة',
      unanswered: 'بدون إجابة',
      backToResults: 'العودة للنتائج',
      subjectScore: 'النتائج حسب المادة'
    }
  };

  var t = i18n[lang] || i18n.en;

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  function init() {
    var basePath = document.getElementById('csca-app') ? document.getElementById('csca-app').getAttribute('data-base') || '' : '';
    fetch(basePath + 'assets/data/csca-questions.json')
      .then(function(r) { return r.json(); })
      .then(function(d) {
        data = d;
        renderLanding();
      })
      .catch(function(e) {
        console.error('Failed to load questions:', e);
      });
  }

  function getApp() { return document.getElementById('csca-app'); }

  function renderLanding() {
    state.mode = 'landing';
    clearTimer();
    var app = getApp();
    var subjectCards = data.subjects.map(function(s) {
      return '<div style="background:#f8f9fa;border-radius:12px;padding:16px;text-align:center;">' +
        '<div style="font-size:28px;margin-bottom:8px;">' + s.icon + '</div>' +
        '<div style="font-weight:600;font-size:14px;">' + s.name[lang] + '</div>' +
        '<div style="color:#777;font-size:13px;">' + s.questions.length + ' ' + t.questionsCount + '</div>' +
      '</div>';
    }).join('');

    app.innerHTML =
      '<div style="text-align:center;padding:20px 0 40px;">' +
        '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:12px;margin-bottom:40px;">' + subjectCards + '</div>' +
        '<div style="display:grid;gap:16px;max-width:500px;margin:0 auto;">' +
          '<button id="btnFullTest" style="background:linear-gradient(135deg,#1a237e,#0d47a1);color:#fff;border:none;padding:18px 32px;border-radius:12px;font-size:18px;font-weight:600;cursor:pointer;">' + t.startTest + '</button>' +
          '<p style="color:#777;font-size:14px;margin:0;">' + t.fullTestDesc + '</p>' +
          '<button id="btnPractice" style="background:#fff;color:#1a237e;border:2px solid #1a237e;padding:16px 32px;border-radius:12px;font-size:16px;font-weight:600;cursor:pointer;margin-top:8px;">' + t.practiceSubject + '</button>' +
          '<p style="color:#777;font-size:14px;margin:0;">' + t.practiceDesc + '</p>' +
        '</div>' +
      '</div>';

    $('#btnFullTest').addEventListener('click', function() {
      state.selectedSubjects = data.subjects.map(function(s) { return s.id; });
      startTest(true);
    });
    $('#btnPractice').addEventListener('click', renderSubjectSelect);
  }

  function renderSubjectSelect() {
    state.mode = 'subject-select';
    var app = getApp();
    var checkboxes = data.subjects.map(function(s) {
      return '<label style="display:flex;align-items:center;gap:12px;padding:16px;border:2px solid #e9ecef;border-radius:12px;cursor:pointer;transition:all 0.2s;" class="subject-label">' +
        '<input type="checkbox" value="' + s.id + '" class="subject-check" style="width:20px;height:20px;accent-color:#1a237e;"/>' +
        '<span style="font-size:24px;">' + s.icon + '</span>' +
        '<div><div style="font-weight:600;">' + s.name[lang] + '</div>' +
        '<div style="color:#777;font-size:13px;">' + s.questions.length + ' ' + t.questionsCount + ' &middot; ~' + Math.round(s.questions.length * s.timePerQuestion / 60) + ' ' + t.minutes + '</div></div>' +
      '</label>';
    }).join('');

    app.innerHTML =
      '<div style="padding:20px 0;">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">' +
          '<button id="btnBack" style="background:none;border:none;color:#1a237e;font-weight:600;cursor:pointer;font-size:16px;">&larr; ' + t.back + '</button>' +
          '<label style="display:flex;align-items:center;gap:8px;cursor:pointer;"><input type="checkbox" id="selectAll" style="accent-color:#1a237e;"/> ' + t.selectAll + '</label>' +
        '</div>' +
        '<div style="display:grid;gap:12px;margin-bottom:24px;">' + checkboxes + '</div>' +
        '<button id="btnStartPractice" style="width:100%;background:linear-gradient(135deg,#1a237e,#0d47a1);color:#fff;border:none;padding:16px;border-radius:12px;font-size:16px;font-weight:600;cursor:pointer;opacity:0.5;" disabled>' + t.startPractice + '</button>' +
      '</div>';

    $('#btnBack').addEventListener('click', renderLanding);

    var checks = $$('.subject-check');
    var startBtn = $('#btnStartPractice');
    var selectAllCb = $('#selectAll');

    function updateBtn() {
      var selected = checks.filter(function(c) { return c.checked; });
      startBtn.disabled = selected.length === 0;
      startBtn.style.opacity = selected.length === 0 ? '0.5' : '1';
      selectAllCb.checked = selected.length === checks.length;
    }

    checks.forEach(function(c) { c.addEventListener('change', updateBtn); });
    selectAllCb.addEventListener('change', function() {
      checks.forEach(function(c) { c.checked = selectAllCb.checked; });
      updateBtn();
    });

    startBtn.addEventListener('click', function() {
      state.selectedSubjects = checks.filter(function(c) { return c.checked; }).map(function(c) { return c.value; });
      startTest(false);
    });
  }

  function shuffleArray(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function startTest(isFull) {
    state.questions = [];
    state.answers = {};
    state.currentIndex = 0;
    state.startedAt = Date.now();

    var totalTime = 0;
    data.subjects.forEach(function(s) {
      if (state.selectedSubjects.indexOf(s.id) === -1) return;
      var qs = shuffleArray(s.questions);
      qs.forEach(function(q) {
        state.questions.push({ subject: s.id, subjectName: s.name[lang], q: q });
      });
      totalTime += qs.length * s.timePerQuestion;
    });

    state.questions = shuffleArray(state.questions);
    state.timeLeft = isFull ? 5400 : totalTime;
    state.mode = 'testing';
    renderQuestion();
    startTimer();
  }

  function startTimer() {
    clearTimer();
    updateTimerDisplay();
    state.timerInterval = setInterval(function() {
      state.timeLeft--;
      updateTimerDisplay();
      if (state.timeLeft <= 0) {
        clearTimer();
        submitTest(true);
      }
    }, 1000);
  }

  function clearTimer() {
    if (state.timerInterval) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
    }
  }

  function updateTimerDisplay() {
    var el = document.getElementById('timer-display');
    if (!el) return;
    var m = Math.floor(state.timeLeft / 60);
    var s = state.timeLeft % 60;
    el.textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
    el.style.color = state.timeLeft < 60 ? '#e53935' : (state.timeLeft < 300 ? '#ff9800' : '#1a237e');
  }

  function renderQuestion() {
    var app = getApp();
    var q = state.questions[state.currentIndex];
    var total = state.questions.length;
    var idx = state.currentIndex;
    var selectedAnswer = state.answers[idx];

    // Progress bar + dots
    var progressPct = Math.round(((Object.keys(state.answers).length) / total) * 100);
    var progressBar = '<div style="width:100%;background:#e9ecef;border-radius:4px;height:6px;margin-bottom:8px;overflow:hidden;">' +
      '<div class="progress-bar-fill" style="width:' + progressPct + '%;height:100%;background:linear-gradient(90deg,#1a237e,#42a5f5);border-radius:4px;"></div></div>';

    var dots = '';
    for (var i = 0; i < total; i++) {
      var dotColor = state.answers[i] !== undefined ? '#4caf50' : (i === idx ? '#1a237e' : '#e0e0e0');
      dots += '<span data-qi="' + i + '" style="display:inline-block;width:' + (i === idx ? '24px' : '10px') + ';height:10px;border-radius:5px;background:' + dotColor + ';cursor:pointer;transition:all 0.2s;" class="q-dot"></span>';
    }

    var options = q.q.options[lang] || q.q.options.en;
    var optionsHtml = options.map(function(opt, oi) {
      var isSelected = selectedAnswer === oi;
      return '<button class="csca-option" data-oi="' + oi + '" style="display:block;width:100%;text-align:left;padding:16px 20px;border:2px solid ' + (isSelected ? '#1a237e' : '#e9ecef') + ';background:' + (isSelected ? '#e8eaf6' : '#fff') + ';border-radius:12px;font-size:15px;cursor:pointer;transition:all 0.2s;margin-bottom:8px;">' +
        '<span style="display:inline-block;width:28px;height:28px;border-radius:50%;border:2px solid ' + (isSelected ? '#1a237e' : '#ccc') + ';text-align:center;line-height:24px;margin-right:12px;font-weight:600;color:' + (isSelected ? '#fff' : '#999') + ';background:' + (isSelected ? '#1a237e' : 'transparent') + ';">' + String.fromCharCode(65 + oi) + '</span>' +
        opt +
      '</button>';
    }).join('');

    var answeredCount = Object.keys(state.answers).length;

    app.innerHTML =
      '<div style="position:sticky;top:80px;z-index:50;background:#fff;padding:12px 0 16px;border-bottom:1px solid #f0f0f0;margin-bottom:20px;">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">' +
          '<div style="font-weight:600;color:#1a237e;">' + t.question + ' ' + (idx + 1) + ' ' + t.of + ' ' + total + '</div>' +
          '<div style="display:flex;align-items:center;gap:16px;">' +
            '<span style="font-size:13px;color:#777;">' + answeredCount + '/' + total + ' ' + t.answered + '</span>' +
            '<div id="timer-display" style="font-size:20px;font-weight:700;font-variant-numeric:tabular-nums;"></div>' +
          '</div>' +
        '</div>' +
        progressBar +
        '<div style="display:flex;gap:3px;flex-wrap:wrap;align-items:center;max-height:40px;overflow:hidden;">' + dots + '</div>' +
      '</div>' +
      '<div style="margin-bottom:8px;"><span style="display:inline-block;background:#e3f2fd;color:#1565c0;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;">' + q.subjectName + '</span></div>' +
      '<h3 style="font-size:1.2rem;font-weight:600;margin-bottom:24px;line-height:1.5;">' + (q.q.q[lang] || q.q.q.en) + '</h3>' +
      '<div style="margin-bottom:32px;">' + optionsHtml + '</div>' +
      '<div style="display:flex;justify-content:space-between;gap:12px;">' +
        (idx > 0 ? '<button id="btnPrev" style="flex:1;padding:14px;border:2px solid #1a237e;background:#fff;color:#1a237e;border-radius:12px;font-weight:600;cursor:pointer;">' + t.previous + '</button>' : '<div style="flex:1;"></div>') +
        (idx < total - 1
          ? '<button id="btnNext" style="flex:1;padding:14px;background:#1a237e;color:#fff;border:none;border-radius:12px;font-weight:600;cursor:pointer;">' + t.next + '</button>'
          : '<button id="btnSubmit" style="flex:1;padding:14px;background:linear-gradient(135deg,#e53935,#c62828);color:#fff;border:none;border-radius:12px;font-weight:600;cursor:pointer;">' + t.submit + '</button>'
        ) +
      '</div>';

    updateTimerDisplay();

    // Scroll to top of app on question change for mobile
    var appTop = app.getBoundingClientRect().top + window.pageYOffset - 100;
    if (window.pageYOffset > appTop + 50) {
      window.scrollTo({ top: appTop, behavior: 'smooth' });
    }

    // Event listeners
    $$('.csca-option').forEach(function(btn) {
      btn.addEventListener('click', function() {
        state.answers[idx] = parseInt(btn.getAttribute('data-oi'));
        renderQuestion();
      });
    });

    $$('.q-dot').forEach(function(dot) {
      dot.addEventListener('click', function() {
        state.currentIndex = parseInt(dot.getAttribute('data-qi'));
        renderQuestion();
      });
    });

    var prevBtn = document.getElementById('btnPrev');
    if (prevBtn) prevBtn.addEventListener('click', function() { state.currentIndex--; renderQuestion(); });

    var nextBtn = document.getElementById('btnNext');
    if (nextBtn) nextBtn.addEventListener('click', function() { state.currentIndex++; renderQuestion(); });

    var submitBtn = document.getElementById('btnSubmit');
    if (submitBtn) submitBtn.addEventListener('click', function() { submitTest(false); });

    // Mobile swipe navigation
    var touchStartX = 0;
    var touchEndX = 0;
    app.addEventListener('touchstart', function(e) { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
    app.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      var diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 60) {
        var swipeLeft = isRTL ? diff < 0 : diff > 0;
        if (swipeLeft && state.currentIndex < total - 1) { state.currentIndex++; renderQuestion(); }
        else if (!swipeLeft && state.currentIndex > 0) { state.currentIndex--; renderQuestion(); }
      }
    }, { passive: true });
  }

  function submitTest(timeUp) {
    clearTimer();
    state.mode = 'results';

    var total = state.questions.length;
    var correct = 0;
    var subjectScores = {};

    state.questions.forEach(function(q, i) {
      if (!subjectScores[q.subject]) subjectScores[q.subject] = { name: q.subjectName, total: 0, correct: 0 };
      subjectScores[q.subject].total++;
      if (state.answers[i] === q.q.answer) {
        correct++;
        subjectScores[q.subject].correct++;
      }
    });

    var pct = Math.round((correct / total) * 100);
    var passed = pct >= data.meta.passScore;
    var elapsed = Math.round((Date.now() - state.startedAt) / 1000);
    var elapsedMin = Math.floor(elapsed / 60);
    var elapsedSec = elapsed % 60;

    var subjectBars = Object.keys(subjectScores).map(function(k) {
      var s = subjectScores[k];
      var sp = Math.round((s.correct / s.total) * 100);
      return '<div style="margin-bottom:12px;">' +
        '<div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:4px;"><span>' + s.name + '</span><span style="font-weight:600;">' + s.correct + '/' + s.total + ' (' + sp + '%)</span></div>' +
        '<div style="background:#e9ecef;border-radius:8px;height:8px;overflow:hidden;"><div style="background:' + (sp >= 60 ? '#4caf50' : '#e53935') + ';height:100%;width:' + sp + '%;border-radius:8px;transition:width 1s;"></div></div>' +
      '</div>';
    }).join('');

    var langPrefix = lang === 'en' ? '../../en' : (lang === 'fr' ? '../../fr' : '../../ar');

    var app = getApp();
    app.innerHTML =
      (timeUp ? '<div style="background:#fff3e0;border:1px solid #ffb74d;border-radius:12px;padding:16px;margin-bottom:20px;text-align:center;"><strong>' + t.timeUp + '</strong><br/>' + t.timeUpMsg + '</div>' : '') +
      '<div style="text-align:center;padding:20px 0;">' +
        '<div style="width:160px;height:160px;border-radius:50%;border:8px solid ' + (passed ? '#4caf50' : '#e53935') + ';display:flex;flex-direction:column;align-items:center;justify-content:center;margin:0 auto 24px;">' +
          '<div style="font-size:48px;font-weight:700;color:' + (passed ? '#4caf50' : '#e53935') + ';">' + pct + '%</div>' +
          '<div style="font-size:14px;color:#777;">' + correct + '/' + total + '</div>' +
        '</div>' +
        '<h2 style="font-size:1.5rem;font-weight:700;color:' + (passed ? '#2e7d32' : '#c62828') + ';margin-bottom:8px;">' + (passed ? t.passed : t.failed) + '</h2>' +
        '<p style="color:#666;margin-bottom:24px;max-width:500px;margin-left:auto;margin-right:auto;">' + (passed ? t.passedMsg : t.failedMsg) + '</p>' +
        '<p style="color:#999;font-size:14px;margin-bottom:24px;">Time: ' + elapsedMin + 'm ' + elapsedSec + 's</p>' +
      '</div>' +
      '<div style="background:#f8f9fa;border-radius:12px;padding:20px;margin-bottom:24px;">' +
        '<h3 style="font-size:1.1rem;font-weight:600;margin-bottom:16px;">' + t.subjectScore + '</h3>' +
        subjectBars +
      '</div>' +
      '<div style="display:grid;gap:12px;max-width:500px;margin:0 auto 24px;">' +
        '<button id="btnReview" style="padding:14px;background:#fff;color:#1a237e;border:2px solid #1a237e;border-radius:12px;font-weight:600;cursor:pointer;">' + t.reviewAnswers + '</button>' +
        '<button id="btnRetake" style="padding:14px;background:#1a237e;color:#fff;border:none;border-radius:12px;font-weight:600;cursor:pointer;">' + t.retake + '</button>' +
        '<a href="https://csca.help" target="_blank" rel="noopener" style="display:block;padding:14px;background:linear-gradient(135deg,#e3f2fd,#f3e5f5);color:#1a237e;border:2px solid #c5cae9;border-radius:12px;font-weight:600;text-decoration:none;text-align:center;">📚 ' + (lang === 'fr' ? 'Plus d\'entraînement sur CSCA.help' : lang === 'ar' ? 'المزيد من التدريب على CSCA.help' : 'More practice on CSCA.help') + ' &rarr;</a>' +
      '</div>' +
      '<div style="background:linear-gradient(135deg,#1a237e,#0d47a1);border-radius:16px;padding:40px 24px;text-align:center;color:white;">' +
        '<h3 style="font-size:1.3rem;font-weight:700;margin-bottom:16px;">' + (passed ? '🎓' : '📚') + ' ' + (passed ? t.applyNow : t.getFreeConsultation) + '</h3>' +
        '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">' +
          '<a href="https://apply.foorsa.ma" target="_blank" rel="noopener" style="display:inline-block;background:white;color:#1a237e;padding:12px 28px;border-radius:30px;font-weight:600;text-decoration:none;">' + t.applyNow + '</a>' +
          '<a href="' + langPrefix + '/contact.html" style="display:inline-block;background:transparent;color:white;border:2px solid white;padding:12px 28px;border-radius:30px;font-weight:600;text-decoration:none;">' + t.getFreeConsultation + '</a>' +
        '</div>' +
      '</div>';

    $('#btnReview').addEventListener('click', renderReview);
    $('#btnRetake').addEventListener('click', renderLanding);
  }

  function renderReview() {
    state.mode = 'review';
    var app = getApp();

    var cards = state.questions.map(function(q, i) {
      var userAns = state.answers[i];
      var correctAns = q.q.answer;
      var isCorrect = userAns === correctAns;
      var opts = q.q.options[lang] || q.q.options.en;

      var optsList = opts.map(function(opt, oi) {
        var bg = '#fff';
        var border = '#e9ecef';
        var color = '#333';
        if (oi === correctAns) { bg = '#e8f5e9'; border = '#4caf50'; color = '#2e7d32'; }
        if (oi === userAns && !isCorrect) { bg = '#ffebee'; border = '#e53935'; color = '#c62828'; }
        return '<div style="padding:10px 16px;border:1px solid ' + border + ';background:' + bg + ';border-radius:8px;color:' + color + ';font-size:14px;margin-bottom:4px;">' +
          String.fromCharCode(65 + oi) + '. ' + opt +
          (oi === correctAns ? ' ✓' : '') +
          (oi === userAns && !isCorrect ? ' ✗' : '') +
        '</div>';
      }).join('');

      return '<div style="border:1px solid ' + (isCorrect ? '#c8e6c9' : '#ffcdd2') + ';border-radius:12px;padding:20px;margin-bottom:16px;background:' + (isCorrect ? '#fafff9' : '#fffafa') + ';">' +
        '<div style="display:flex;justify-content:space-between;margin-bottom:8px;">' +
          '<span style="font-size:13px;color:#777;">' + t.question + ' ' + (i + 1) + ' — ' + q.subjectName + '</span>' +
          '<span style="font-size:13px;font-weight:600;color:' + (isCorrect ? '#4caf50' : '#e53935') + ';">' + (isCorrect ? '✓ ' + t.correct : '✗ ' + t.incorrect) + '</span>' +
        '</div>' +
        '<h4 style="font-size:1rem;font-weight:600;margin-bottom:16px;line-height:1.5;">' + (q.q.q[lang] || q.q.q.en) + '</h4>' +
        optsList +
        '<div style="margin-top:12px;padding:12px;background:#f5f5f5;border-radius:8px;font-size:14px;color:#555;"><strong>' + t.explanation + ':</strong> ' + (q.q.explanation[lang] || q.q.explanation.en) + '</div>' +
      '</div>';
    }).join('');

    app.innerHTML =
      '<div style="padding:20px 0;">' +
        '<button id="btnBackResults" style="background:none;border:none;color:#1a237e;font-weight:600;cursor:pointer;font-size:16px;margin-bottom:20px;">&larr; ' + t.backToResults + '</button>' +
        cards +
        '<button id="btnRetake2" style="width:100%;padding:14px;background:#1a237e;color:#fff;border:none;border-radius:12px;font-weight:600;cursor:pointer;margin-top:16px;">' + t.retake + '</button>' +
      '</div>';

    $('#btnBackResults').addEventListener('click', function() { submitTest(false); });
    $('#btnRetake2').addEventListener('click', renderLanding);
    window.scrollTo(0, 0);
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
