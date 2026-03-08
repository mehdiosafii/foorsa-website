/**
 * CSCA Test Simulator Engine v2
 * Real CSCA exam format: Math (compulsory), Physics, Chemistry
 * Features: Study mode, difficulty selection, progress tracking, question flagging
 */
(function() {
  'use strict';

  // ── Styles ──
  var styleEl = document.createElement('style');
  styleEl.textContent = [
    '#csca-app { font-family: Inter, "DM Sans", -apple-system, sans-serif; }',
    '#csca-app button, #csca-app a.csca-btn { -webkit-tap-highlight-color: transparent; touch-action: manipulation; }',
    '#csca-app .csca-option { min-height: 56px; transition: all 0.15s ease; }',
    '#csca-app .csca-option:hover { border-color: #1a237e !important; background: #f5f5ff !important; }',
    '#csca-app .csca-option:active { transform: scale(0.98); }',
    '#csca-app .csca-option.correct-answer { border-color: #4caf50 !important; background: #e8f5e9 !important; }',
    '#csca-app .csca-option.wrong-answer { border-color: #e53935 !important; background: #ffebee !important; }',
    '#csca-app .csca-option.disabled { pointer-events: none; opacity: 0.85; }',
    '@media (max-width: 768px) {',
    '  #csca-app .csca-option { min-height: 52px; padding: 14px 16px !important; font-size: 14px !important; }',
    '  #csca-app h3 { font-size: 1.05rem !important; }',
    '  .q-dot { min-width: 8px !important; }',
    '}',
    '#csca-app .subject-label:has(input:checked) { border-color: #1a237e !important; background: #e8eaf6 !important; }',
    '#csca-app .progress-bar-fill { transition: width 0.3s ease; }',
    '#csca-app .diff-badge { display:inline-block; padding:3px 10px; border-radius:12px; font-size:11px; font-weight:600; text-transform:uppercase; }',
    '#csca-app .diff-easy { background:#e8f5e9; color:#2e7d32; }',
    '#csca-app .diff-medium { background:#fff3e0; color:#e65100; }',
    '#csca-app .diff-hard { background:#ffebee; color:#c62828; }',
    '#csca-app .mode-card { border:2px solid #e9ecef; border-radius:16px; padding:24px; cursor:pointer; transition:all 0.2s; text-align:center; }',
    '#csca-app .mode-card:hover { border-color:#1a237e; background:#f5f5ff; transform:translateY(-2px); box-shadow:0 4px 12px rgba(0,0,0,0.08); }',
    '#csca-app .stat-card { background:#f8f9fa; border-radius:12px; padding:16px; text-align:center; }',
    '#csca-app .flag-btn { background:none; border:none; font-size:18px; cursor:pointer; padding:4px 8px; border-radius:8px; transition:all 0.15s; }',
    '#csca-app .flag-btn:hover { background:#fff3e0; }',
    '#csca-app .flag-btn.flagged { background:#fff3e0; }',
    '#csca-app .study-feedback { border-radius:12px; padding:16px; margin-top:16px; animation: fadeIn 0.3s ease; }',
    '@keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }'
  ].join('\n');
  document.head.appendChild(styleEl);

  var lang = document.documentElement.lang || 'en';
  var isRTL = lang === 'ar';
  var data = null;
  var state = {
    mode: 'landing',
    testMode: 'exam',      // exam | study
    difficulty: 'all',     // all | easy | medium | hard
    selectedSubjects: [],
    questions: [],
    currentIndex: 0,
    answers: {},
    flagged: {},
    studyRevealed: {},     // for study mode: which questions have been revealed
    timeLeft: 0,
    timerInterval: null,
    startedAt: null
  };

  // ── Progress tracking (localStorage) ──
  var STORAGE_KEY = 'foorsa_csca_history';

  function getHistory() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch(e) { return []; }
  }

  function saveResult(result) {
    var history = getHistory();
    history.push(result);
    // Keep last 50 results
    if (history.length > 50) history = history.slice(-50);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(history)); } catch(e) {}
  }

  // ── i18n ──
  var i18n = {
    en: {
      startTest: 'Start Timed Test',
      studyMode: 'Study Mode',
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
      passedMsg: 'You scored above the passing threshold. You are well prepared for the CSCA exam.',
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
      fullTestDesc: 'Timed exam simulation — just like the real CSCA assessment',
      studyDesc: 'Learn at your own pace with instant feedback after each question',
      practiceDesc: 'Choose specific subjects to focus your preparation',
      selectAll: 'Select All',
      timeUp: 'Time\'s Up!',
      timeUpMsg: 'The test time has expired. Your answers have been submitted automatically.',
      answered: 'Answered',
      unanswered: 'Unanswered',
      backToResults: 'Back to Results',
      subjectScore: 'Subject Scores',
      difficulty: 'Difficulty',
      all: 'All Levels',
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard',
      yourProgress: 'Your Progress',
      totalTests: 'Tests Taken',
      avgScore: 'Avg Score',
      bestScore: 'Best Score',
      noHistory: 'No test history yet. Take your first test!',
      flag: 'Flag',
      flagged: 'Flagged',
      moreOnCscaHelp: 'More practice on CSCA.help',
      checkAnswer: 'Check Answer',
      nextQuestion: 'Next Question',
      studyComplete: 'Study Session Complete!',
      studyCompleteMsg: 'You reviewed all questions. Keep practicing to master the material!',
      questionsRight: 'questions right',
      examFormat: 'Real CSCA format: 48 MCQs per subject, 60 min each'
    },
    fr: {
      startTest: 'Test Chronométré',
      studyMode: 'Mode Étude',
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
      passedMsg: 'Vous avez dépassé le seuil de réussite. Vous êtes bien préparé pour l\'examen CSCA.',
      failedMsg: 'Ne vous inquiétez pas ! Entraînez-vous davantage. Foorsa est là pour vous aider.',
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
      fullTestDesc: 'Simulation d\'examen chronométrée — comme le vrai CSCA',
      studyDesc: 'Apprenez à votre rythme avec un retour instantané après chaque question',
      practiceDesc: 'Choisissez des matières spécifiques pour concentrer votre préparation',
      selectAll: 'Tout Sélectionner',
      timeUp: 'Temps Écoulé !',
      timeUpMsg: 'Le temps est écoulé. Vos réponses ont été soumises automatiquement.',
      answered: 'Répondu',
      unanswered: 'Sans réponse',
      backToResults: 'Retour aux Résultats',
      subjectScore: 'Scores par Matière',
      difficulty: 'Difficulté',
      all: 'Tous Niveaux',
      easy: 'Facile',
      medium: 'Moyen',
      hard: 'Difficile',
      yourProgress: 'Votre Progression',
      totalTests: 'Tests Passés',
      avgScore: 'Score Moyen',
      bestScore: 'Meilleur Score',
      noHistory: 'Aucun historique. Passez votre premier test !',
      flag: 'Marquer',
      flagged: 'Marqué',
      moreOnCscaHelp: 'Plus d\'entraînement sur CSCA.help',
      checkAnswer: 'Vérifier',
      nextQuestion: 'Question Suivante',
      studyComplete: 'Session d\'Étude Terminée !',
      studyCompleteMsg: 'Vous avez revu toutes les questions. Continuez à pratiquer !',
      questionsRight: 'bonnes réponses',
      examFormat: 'Format CSCA réel : 48 QCM par matière, 60 min chacune'
    },
    ar: {
      startTest: 'اختبار بتوقيت',
      studyMode: 'وضع الدراسة',
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
      passedMsg: 'حصلت على درجة أعلى من حد النجاح. أنت مستعد جيداً لامتحان CSCA.',
      failedMsg: 'لا تقلق! تدرب أكثر وحاول مرة أخرى. فورصة هنا لمساعدتك.',
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
      fullTestDesc: 'محاكاة الامتحان بتوقيت — تماماً كاختبار CSCA الحقيقي',
      studyDesc: 'تعلم بالسرعة التي تناسبك مع تقييم فوري بعد كل سؤال',
      practiceDesc: 'اختر مواد محددة لتركيز تحضيرك',
      selectAll: 'اختر الكل',
      timeUp: 'انتهى الوقت!',
      timeUpMsg: 'انتهى وقت الاختبار. تم تقديم إجاباتك تلقائياً.',
      answered: 'تمت الإجابة',
      unanswered: 'بدون إجابة',
      backToResults: 'العودة للنتائج',
      subjectScore: 'النتائج حسب المادة',
      difficulty: 'الصعوبة',
      all: 'جميع المستويات',
      easy: 'سهل',
      medium: 'متوسط',
      hard: 'صعب',
      yourProgress: 'تقدمك',
      totalTests: 'الاختبارات',
      avgScore: 'المعدل',
      bestScore: 'أفضل نتيجة',
      noHistory: 'لا يوجد سجل بعد. أجرِ أول اختبار!',
      flag: 'علّم',
      flagged: 'مُعلَّم',
      moreOnCscaHelp: 'المزيد من التدريب على CSCA.help',
      checkAnswer: 'تحقق من الإجابة',
      nextQuestion: 'السؤال التالي',
      studyComplete: 'جلسة الدراسة اكتملت!',
      studyCompleteMsg: 'راجعت جميع الأسئلة. استمر في التدريب لإتقان المادة!',
      questionsRight: 'إجابات صحيحة',
      examFormat: 'شكل CSCA الحقيقي: 48 سؤال لكل مادة، 60 دقيقة لكل منها'
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

  // ── Landing ──
  function renderLanding() {
    state.mode = 'landing';
    clearTimer();
    var app = getApp();

    var totalQ = data.subjects.reduce(function(sum, s) { return sum + s.questions.length; }, 0);

    // Subject cards
    var subjectCards = data.subjects.map(function(s) {
      var easy = s.questions.filter(function(q) { return q.difficulty === 'easy'; }).length;
      var med = s.questions.filter(function(q) { return q.difficulty === 'medium'; }).length;
      var hard = s.questions.filter(function(q) { return q.difficulty === 'hard'; }).length;
      return '<div class="stat-card">' +
        '<div style="font-size:28px;margin-bottom:8px;">' + s.icon + '</div>' +
        '<div style="font-weight:600;font-size:14px;">' + (s.name[lang] || s.name.en) + '</div>' +
        '<div style="color:#777;font-size:13px;">' + s.questions.length + ' ' + t.questionsCount + '</div>' +
        '<div style="display:flex;gap:4px;justify-content:center;margin-top:8px;">' +
          '<span class="diff-badge diff-easy">' + easy + '</span>' +
          '<span class="diff-badge diff-medium">' + med + '</span>' +
          '<span class="diff-badge diff-hard">' + hard + '</span>' +
        '</div>' +
      '</div>';
    }).join('');

    // Progress stats
    var history = getHistory();
    var progressHtml = '';
    if (history.length > 0) {
      var avg = Math.round(history.reduce(function(s, h) { return s + h.score; }, 0) / history.length);
      var best = Math.max.apply(null, history.map(function(h) { return h.score; }));
      progressHtml =
        '<div style="background:#f8f9fa;border-radius:16px;padding:20px;margin-bottom:32px;">' +
          '<h3 style="font-size:1rem;font-weight:600;margin-bottom:16px;">' + t.yourProgress + '</h3>' +
          '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">' +
            '<div class="stat-card"><div style="font-size:24px;font-weight:700;color:#1a237e;">' + history.length + '</div><div style="font-size:12px;color:#777;">' + t.totalTests + '</div></div>' +
            '<div class="stat-card"><div style="font-size:24px;font-weight:700;color:#ff9800;">' + avg + '%</div><div style="font-size:12px;color:#777;">' + t.avgScore + '</div></div>' +
            '<div class="stat-card"><div style="font-size:24px;font-weight:700;color:#4caf50;">' + best + '%</div><div style="font-size:12px;color:#777;">' + t.bestScore + '</div></div>' +
          '</div>' +
        '</div>';
    }

    app.innerHTML =
      '<div style="padding:20px 0 40px;">' +
        // Stats banner
        '<div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;margin-bottom:24px;">' +
          '<span style="background:#e8f5e9;color:#2e7d32;padding:6px 16px;border-radius:20px;font-size:13px;font-weight:600;">' + totalQ + '+ ' + t.questionsCount + '</span>' +
          '<span style="background:#e3f2fd;color:#1565c0;padding:6px 16px;border-radius:20px;font-size:13px;font-weight:600;">' + data.subjects.length + ' ' + (lang === 'fr' ? 'Matières' : lang === 'ar' ? 'مواد' : 'Subjects') + '</span>' +
          '<span style="background:#fff3e0;color:#e65100;padding:6px 16px;border-radius:20px;font-size:13px;font-weight:600;">3 ' + (lang === 'fr' ? 'Niveaux' : lang === 'ar' ? 'مستويات' : 'Difficulty Levels') + '</span>' +
        '</div>' +

        // Subject cards
        '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;margin-bottom:32px;">' + subjectCards + '</div>' +

        // Progress
        progressHtml +

        // Mode cards
        '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin-bottom:24px;">' +
          '<div class="mode-card" id="btnExamMode">' +
            '<div style="font-size:36px;margin-bottom:12px;">⏱️</div>' +
            '<div style="font-weight:700;font-size:1.1rem;margin-bottom:6px;">' + t.startTest + '</div>' +
            '<p style="color:#777;font-size:14px;margin:0;">' + t.fullTestDesc + '</p>' +
          '</div>' +
          '<div class="mode-card" id="btnStudyMode">' +
            '<div style="font-size:36px;margin-bottom:12px;">📖</div>' +
            '<div style="font-weight:700;font-size:1.1rem;margin-bottom:6px;">' + t.studyMode + '</div>' +
            '<p style="color:#777;font-size:14px;margin:0;">' + t.studyDesc + '</p>' +
          '</div>' +
        '</div>' +

        // Practice by subject
        '<button id="btnPractice" style="width:100%;max-width:500px;display:block;margin:0 auto;background:#fff;color:#1a237e;border:2px solid #1a237e;padding:16px 32px;border-radius:12px;font-size:16px;font-weight:600;cursor:pointer;">' + t.practiceSubject + '</button>' +
        '<p style="color:#777;font-size:14px;text-align:center;margin-top:8px;">' + t.practiceDesc + '</p>' +

        // Exam format note
        '<p style="text-align:center;color:#999;font-size:13px;margin-top:24px;">ℹ️ ' + t.examFormat + '</p>' +
      '</div>';

    $('#btnExamMode').addEventListener('click', function() {
      state.testMode = 'exam';
      renderSubjectSelect();
    });
    $('#btnStudyMode').addEventListener('click', function() {
      state.testMode = 'study';
      renderSubjectSelect();
    });
    $('#btnPractice').addEventListener('click', function() {
      state.testMode = 'exam';
      renderSubjectSelect();
    });
  }

  // ── Subject Selection + Difficulty ──
  function renderSubjectSelect() {
    state.mode = 'subject-select';
    var app = getApp();

    var checkboxes = data.subjects.map(function(s) {
      var qCount = s.questions.length;
      return '<label style="display:flex;align-items:center;gap:12px;padding:16px;border:2px solid #e9ecef;border-radius:12px;cursor:pointer;transition:all 0.2s;" class="subject-label">' +
        '<input type="checkbox" value="' + s.id + '" class="subject-check" style="width:20px;height:20px;accent-color:#1a237e;" checked/>' +
        '<span style="font-size:24px;">' + s.icon + '</span>' +
        '<div><div style="font-weight:600;">' + (s.name[lang] || s.name.en) + '</div>' +
        '<div style="color:#777;font-size:13px;">' + qCount + ' ' + t.questionsCount + '</div></div>' +
      '</label>';
    }).join('');

    // Difficulty selector
    var diffOptions = ['all', 'easy', 'medium', 'hard'];
    var diffLabels = { all: t.all, easy: t.easy, medium: t.medium, hard: t.hard };
    var diffColors = { all: '#1a237e', easy: '#2e7d32', medium: '#e65100', hard: '#c62828' };
    var diffBtns = diffOptions.map(function(d) {
      return '<button class="diff-select" data-diff="' + d + '" style="flex:1;padding:10px 12px;border:2px solid ' + (d === 'all' ? diffColors[d] : '#e9ecef') + ';background:' + (d === 'all' ? diffColors[d] + '11' : '#fff') + ';border-radius:10px;font-weight:600;font-size:13px;cursor:pointer;color:' + (d === 'all' ? diffColors[d] : '#777') + ';">' + diffLabels[d] + '</button>';
    }).join('');

    app.innerHTML =
      '<div style="padding:20px 0;">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">' +
          '<button id="btnBack" style="background:none;border:none;color:#1a237e;font-weight:600;cursor:pointer;font-size:16px;">&larr; ' + t.back + '</button>' +
          '<label style="display:flex;align-items:center;gap:8px;cursor:pointer;"><input type="checkbox" id="selectAll" style="accent-color:#1a237e;" checked/> ' + t.selectAll + '</label>' +
        '</div>' +

        // Difficulty
        '<div style="margin-bottom:20px;">' +
          '<div style="font-weight:600;font-size:14px;margin-bottom:8px;">' + t.difficulty + '</div>' +
          '<div style="display:flex;gap:8px;">' + diffBtns + '</div>' +
        '</div>' +

        '<div style="display:grid;gap:12px;margin-bottom:24px;">' + checkboxes + '</div>' +

        '<button id="btnStartPractice" style="width:100%;background:linear-gradient(135deg,#1a237e,#0d47a1);color:#fff;border:none;padding:16px;border-radius:12px;font-size:16px;font-weight:600;cursor:pointer;">' +
          (state.testMode === 'study' ? t.studyMode : t.startPractice) +
        '</button>' +
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

    // Difficulty selection
    state.difficulty = 'all';
    $$('.diff-select').forEach(function(btn) {
      btn.addEventListener('click', function() {
        state.difficulty = btn.getAttribute('data-diff');
        $$('.diff-select').forEach(function(b) {
          var d = b.getAttribute('data-diff');
          var active = d === state.difficulty;
          b.style.borderColor = active ? diffColors[d] : '#e9ecef';
          b.style.background = active ? diffColors[d] + '11' : '#fff';
          b.style.color = active ? diffColors[d] : '#777';
        });
      });
    });

    startBtn.addEventListener('click', function() {
      state.selectedSubjects = checks.filter(function(c) { return c.checked; }).map(function(c) { return c.value; });
      startTest();
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

  function startTest() {
    state.questions = [];
    state.answers = {};
    state.flagged = {};
    state.studyRevealed = {};
    state.currentIndex = 0;
    state.startedAt = Date.now();

    var totalTime = 0;
    data.subjects.forEach(function(s) {
      if (state.selectedSubjects.indexOf(s.id) === -1) return;
      var qs = s.questions.filter(function(q) {
        return state.difficulty === 'all' || q.difficulty === state.difficulty;
      });
      qs = shuffleArray(qs);
      qs.forEach(function(q) {
        state.questions.push({ subject: s.id, subjectName: s.name[lang] || s.name.en, q: q });
      });
      totalTime += qs.length * s.timePerQuestion;
    });

    state.questions = shuffleArray(state.questions);

    if (state.testMode === 'study') {
      state.timeLeft = 0;
      state.mode = 'testing';
      renderQuestion();
    } else {
      state.timeLeft = totalTime;
      state.mode = 'testing';
      renderQuestion();
      startTimer();
    }
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

  // ── Question Rendering ──
  function renderQuestion() {
    var app = getApp();
    var q = state.questions[state.currentIndex];
    var total = state.questions.length;
    var idx = state.currentIndex;
    var selectedAnswer = state.answers[idx];
    var isStudy = state.testMode === 'study';
    var isRevealed = state.studyRevealed[idx];

    // Progress bar
    var answeredCount = Object.keys(state.answers).length;
    var progressPct = Math.round((answeredCount / total) * 100);
    var progressBar = '<div style="width:100%;background:#e9ecef;border-radius:4px;height:6px;margin-bottom:8px;overflow:hidden;">' +
      '<div class="progress-bar-fill" style="width:' + progressPct + '%;height:100%;background:linear-gradient(90deg,#1a237e,#42a5f5);border-radius:4px;"></div></div>';

    // Question dots
    var dots = '';
    for (var i = 0; i < total; i++) {
      var dotColor = '#e0e0e0';
      if (state.answers[i] !== undefined) dotColor = '#4caf50';
      if (state.flagged[i]) dotColor = '#ff9800';
      if (i === idx) dotColor = '#1a237e';
      dots += '<span data-qi="' + i + '" style="display:inline-block;width:' + (i === idx ? '24px' : '10px') + ';height:10px;border-radius:5px;background:' + dotColor + ';cursor:pointer;transition:all 0.2s;" class="q-dot"></span>';
    }

    // Difficulty badge
    var diffClass = 'diff-' + (q.q.difficulty || 'medium');
    var diffLabel = t[q.q.difficulty || 'medium'] || q.q.difficulty;

    // Options
    var options = q.q.options[lang] || q.q.options.en;
    var optionsHtml = options.map(function(opt, oi) {
      var isSelected = selectedAnswer === oi;
      var extraClass = '';
      var extraStyle = '';

      if (isStudy && isRevealed) {
        if (oi === q.q.answer) {
          extraClass = ' correct-answer disabled';
        } else if (isSelected && oi !== q.q.answer) {
          extraClass = ' wrong-answer disabled';
        } else {
          extraClass = ' disabled';
        }
      }

      return '<button class="csca-option' + extraClass + '" data-oi="' + oi + '" style="display:block;width:100%;text-align:' + (isRTL ? 'right' : 'left') + ';padding:16px 20px;border:2px solid ' + (isSelected && !isRevealed ? '#1a237e' : '#e9ecef') + ';background:' + (isSelected && !isRevealed ? '#e8eaf6' : '#fff') + ';border-radius:12px;font-size:15px;cursor:pointer;margin-bottom:8px;' + extraStyle + '">' +
        '<span style="display:inline-block;width:28px;height:28px;border-radius:50%;border:2px solid ' + (isSelected && !isRevealed ? '#1a237e' : '#ccc') + ';text-align:center;line-height:24px;margin-' + (isRTL ? 'left' : 'right') + ':12px;font-weight:600;color:' + (isSelected && !isRevealed ? '#fff' : '#999') + ';background:' + (isSelected && !isRevealed ? '#1a237e' : 'transparent') + ';">' + String.fromCharCode(65 + oi) + '</span>' +
        opt +
      '</button>';
    }).join('');

    // Study mode feedback
    var feedbackHtml = '';
    if (isStudy && isRevealed) {
      var isCorrect = selectedAnswer === q.q.answer;
      feedbackHtml =
        '<div class="study-feedback" style="background:' + (isCorrect ? '#e8f5e9' : '#ffebee') + ';border:1px solid ' + (isCorrect ? '#c8e6c9' : '#ffcdd2') + ';">' +
          '<div style="font-weight:700;color:' + (isCorrect ? '#2e7d32' : '#c62828') + ';margin-bottom:8px;">' + (isCorrect ? '✓ ' + t.correct + '!' : '✗ ' + t.incorrect) + '</div>' +
          (isCorrect ? '' : '<div style="margin-bottom:8px;color:#555;font-size:14px;">' + t.correctAnswer + ': <strong>' + String.fromCharCode(65 + q.q.answer) + '. ' + options[q.q.answer] + '</strong></div>') +
          '<div style="color:#555;font-size:14px;"><strong>' + t.explanation + ':</strong> ' + (q.q.explanation[lang] || q.q.explanation.en) + '</div>' +
        '</div>';
    }

    // Timer or study mode label
    var timerHtml = '';
    if (!isStudy) {
      timerHtml = '<div id="timer-display" style="font-size:20px;font-weight:700;font-variant-numeric:tabular-nums;"></div>';
    } else {
      timerHtml = '<span style="background:#e8f5e9;color:#2e7d32;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;">📖 ' + t.studyMode + '</span>';
    }

    // Navigation buttons
    var navHtml = '';
    if (isStudy) {
      if (!isRevealed) {
        navHtml =
          (idx > 0 ? '<button id="btnPrev" style="flex:1;padding:14px;border:2px solid #1a237e;background:#fff;color:#1a237e;border-radius:12px;font-weight:600;cursor:pointer;">' + t.previous + '</button>' : '<div style="flex:1;"></div>') +
          '<button id="btnCheckAnswer" style="flex:2;padding:14px;background:linear-gradient(135deg,#1a237e,#0d47a1);color:#fff;border:none;border-radius:12px;font-weight:600;cursor:pointer;' + (selectedAnswer === undefined ? 'opacity:0.5;' : '') + '"' + (selectedAnswer === undefined ? ' disabled' : '') + '>' + t.checkAnswer + '</button>';
      } else {
        navHtml =
          (idx > 0 ? '<button id="btnPrev" style="flex:1;padding:14px;border:2px solid #1a237e;background:#fff;color:#1a237e;border-radius:12px;font-weight:600;cursor:pointer;">' + t.previous + '</button>' : '<div style="flex:1;"></div>') +
          (idx < total - 1
            ? '<button id="btnNext" style="flex:2;padding:14px;background:#4caf50;color:#fff;border:none;border-radius:12px;font-weight:600;cursor:pointer;">' + t.nextQuestion + ' &rarr;</button>'
            : '<button id="btnSubmit" style="flex:2;padding:14px;background:linear-gradient(135deg,#4caf50,#388e3c);color:#fff;border:none;border-radius:12px;font-weight:600;cursor:pointer;">' + t.submit + '</button>'
          );
      }
    } else {
      navHtml =
        (idx > 0 ? '<button id="btnPrev" style="flex:1;padding:14px;border:2px solid #1a237e;background:#fff;color:#1a237e;border-radius:12px;font-weight:600;cursor:pointer;">' + t.previous + '</button>' : '<div style="flex:1;"></div>') +
        (idx < total - 1
          ? '<button id="btnNext" style="flex:1;padding:14px;background:#1a237e;color:#fff;border:none;border-radius:12px;font-weight:600;cursor:pointer;">' + t.next + '</button>'
          : '<button id="btnSubmit" style="flex:1;padding:14px;background:linear-gradient(135deg,#e53935,#c62828);color:#fff;border:none;border-radius:12px;font-weight:600;cursor:pointer;">' + t.submit + '</button>'
        );
    }

    app.innerHTML =
      '<div style="position:sticky;top:80px;z-index:50;background:#fff;padding:12px 0 16px;border-bottom:1px solid #f0f0f0;margin-bottom:20px;">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">' +
          '<div style="font-weight:600;color:#1a237e;">' + t.question + ' ' + (idx + 1) + ' ' + t.of + ' ' + total + '</div>' +
          '<div style="display:flex;align-items:center;gap:12px;">' +
            '<span style="font-size:13px;color:#777;">' + answeredCount + '/' + total + ' ' + t.answered + '</span>' +
            '<button class="flag-btn' + (state.flagged[idx] ? ' flagged' : '') + '" id="flagBtn" title="' + t.flag + '">🚩</button>' +
            timerHtml +
          '</div>' +
        '</div>' +
        progressBar +
        '<div style="display:flex;gap:3px;flex-wrap:wrap;align-items:center;max-height:40px;overflow:hidden;">' + dots + '</div>' +
      '</div>' +

      // Subject + difficulty badges
      '<div style="margin-bottom:8px;display:flex;gap:8px;align-items:center;">' +
        '<span style="display:inline-block;background:#e3f2fd;color:#1565c0;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;">' + q.subjectName + '</span>' +
        '<span class="diff-badge ' + diffClass + '">' + diffLabel + '</span>' +
      '</div>' +

      '<h3 style="font-size:1.2rem;font-weight:600;margin-bottom:24px;line-height:1.5;">' + (q.q.q[lang] || q.q.q.en) + '</h3>' +
      '<div style="margin-bottom:16px;">' + optionsHtml + '</div>' +

      feedbackHtml +

      '<div style="display:flex;justify-content:space-between;gap:12px;margin-top:24px;">' + navHtml + '</div>';

    if (!isStudy) updateTimerDisplay();

    // Scroll to top
    var appTop = app.getBoundingClientRect().top + window.pageYOffset - 100;
    if (window.pageYOffset > appTop + 50) {
      window.scrollTo({ top: appTop, behavior: 'smooth' });
    }

    // ── Event Listeners ──
    // Options
    if (!isRevealed) {
      $$('.csca-option').forEach(function(btn) {
        btn.addEventListener('click', function() {
          state.answers[idx] = parseInt(btn.getAttribute('data-oi'));
          renderQuestion();
        });
      });
    }

    // Dots
    $$('.q-dot').forEach(function(dot) {
      dot.addEventListener('click', function() {
        state.currentIndex = parseInt(dot.getAttribute('data-qi'));
        renderQuestion();
      });
    });

    // Flag
    var flagBtn = document.getElementById('flagBtn');
    if (flagBtn) {
      flagBtn.addEventListener('click', function() {
        state.flagged[idx] = !state.flagged[idx];
        renderQuestion();
      });
    }

    // Navigation
    var prevBtn = document.getElementById('btnPrev');
    if (prevBtn) prevBtn.addEventListener('click', function() { state.currentIndex--; renderQuestion(); });

    var nextBtn = document.getElementById('btnNext');
    if (nextBtn) nextBtn.addEventListener('click', function() { state.currentIndex++; renderQuestion(); });

    var submitBtn = document.getElementById('btnSubmit');
    if (submitBtn) submitBtn.addEventListener('click', function() { submitTest(false); });

    // Study mode: check answer
    var checkBtn = document.getElementById('btnCheckAnswer');
    if (checkBtn) {
      checkBtn.addEventListener('click', function() {
        if (state.answers[idx] !== undefined) {
          state.studyRevealed[idx] = true;
          renderQuestion();
        }
      });
    }

    // Mobile swipe
    var touchStartX = 0;
    app.addEventListener('touchstart', function(e) { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
    app.addEventListener('touchend', function(e) {
      var diff = touchStartX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 60) {
        var swipeLeft = isRTL ? diff < 0 : diff > 0;
        if (swipeLeft && state.currentIndex < total - 1) { state.currentIndex++; renderQuestion(); }
        else if (!swipeLeft && state.currentIndex > 0) { state.currentIndex--; renderQuestion(); }
      }
    }, { passive: true });
  }

  // ── Submit & Results ──
  function submitTest(timeUp) {
    clearTimer();
    state.mode = 'results';

    var total = state.questions.length;
    var correct = 0;
    var subjectScores = {};

    state.questions.forEach(function(q, i) {
      var sid = q.subject;
      if (!subjectScores[sid]) subjectScores[sid] = { name: q.subjectName, total: 0, correct: 0, easy: {t:0,c:0}, medium: {t:0,c:0}, hard: {t:0,c:0} };
      subjectScores[sid].total++;
      var diff = q.q.difficulty || 'medium';
      subjectScores[sid][diff].t++;
      if (state.answers[i] === q.q.answer) {
        correct++;
        subjectScores[sid].correct++;
        subjectScores[sid][diff].c++;
      }
    });

    var pct = Math.round((correct / total) * 100);
    var passed = pct >= data.meta.passScore;
    var elapsed = Math.round((Date.now() - state.startedAt) / 1000);
    var elapsedMin = Math.floor(elapsed / 60);
    var elapsedSec = elapsed % 60;

    // Save to history
    saveResult({
      date: new Date().toISOString(),
      score: pct,
      correct: correct,
      total: total,
      mode: state.testMode,
      difficulty: state.difficulty,
      subjects: state.selectedSubjects,
      elapsed: elapsed
    });

    var subjectBars = Object.keys(subjectScores).map(function(k) {
      var s = subjectScores[k];
      var sp = Math.round((s.correct / s.total) * 100);
      return '<div style="margin-bottom:16px;">' +
        '<div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:4px;"><span style="font-weight:600;">' + s.name + '</span><span style="font-weight:600;">' + s.correct + '/' + s.total + ' (' + sp + '%)</span></div>' +
        '<div style="background:#e9ecef;border-radius:8px;height:8px;overflow:hidden;"><div style="background:' + (sp >= 60 ? '#4caf50' : '#e53935') + ';height:100%;width:' + sp + '%;border-radius:8px;transition:width 1s;"></div></div>' +
        '<div style="display:flex;gap:12px;margin-top:6px;font-size:12px;color:#999;">' +
          '<span>' + t.easy + ': ' + s.easy.c + '/' + s.easy.t + '</span>' +
          '<span>' + t.medium + ': ' + s.medium.c + '/' + s.medium.t + '</span>' +
          '<span>' + t.hard + ': ' + s.hard.c + '/' + s.hard.t + '</span>' +
        '</div>' +
      '</div>';
    }).join('');

    var langPrefix = lang === 'en' ? '../../en' : (lang === 'fr' ? '../../fr' : '../../ar');

    var isStudy = state.testMode === 'study';

    var app = getApp();
    app.innerHTML =
      (timeUp ? '<div style="background:#fff3e0;border:1px solid #ffb74d;border-radius:12px;padding:16px;margin-bottom:20px;text-align:center;"><strong>' + t.timeUp + '</strong><br/>' + t.timeUpMsg + '</div>' : '') +
      '<div style="text-align:center;padding:20px 0;">' +
        '<div style="width:160px;height:160px;border-radius:50%;border:8px solid ' + (passed ? '#4caf50' : '#e53935') + ';display:flex;flex-direction:column;align-items:center;justify-content:center;margin:0 auto 24px;">' +
          '<div style="font-size:48px;font-weight:700;color:' + (passed ? '#4caf50' : '#e53935') + ';">' + pct + '%</div>' +
          '<div style="font-size:14px;color:#777;">' + correct + '/' + total + '</div>' +
        '</div>' +
        '<h2 style="font-size:1.5rem;font-weight:700;color:' + (passed ? '#2e7d32' : '#c62828') + ';margin-bottom:8px;">' + (isStudy ? (t.studyComplete || t.passed) : (passed ? t.passed : t.failed)) + '</h2>' +
        '<p style="color:#666;margin-bottom:24px;max-width:500px;margin-left:auto;margin-right:auto;">' + (isStudy ? (t.studyCompleteMsg || '') : (passed ? t.passedMsg : t.failedMsg)) + '</p>' +
        '<p style="color:#999;font-size:14px;margin-bottom:24px;">' + (lang === 'fr' ? 'Temps' : lang === 'ar' ? 'الوقت' : 'Time') + ': ' + elapsedMin + 'm ' + elapsedSec + 's</p>' +
      '</div>' +
      '<div style="background:#f8f9fa;border-radius:12px;padding:20px;margin-bottom:24px;">' +
        '<h3 style="font-size:1.1rem;font-weight:600;margin-bottom:16px;">' + t.subjectScore + '</h3>' +
        subjectBars +
      '</div>' +
      '<div style="display:grid;gap:12px;max-width:500px;margin:0 auto 24px;">' +
        '<button id="btnReview" style="padding:14px;background:#fff;color:#1a237e;border:2px solid #1a237e;border-radius:12px;font-weight:600;cursor:pointer;">' + t.reviewAnswers + '</button>' +
        '<button id="btnRetake" style="padding:14px;background:#1a237e;color:#fff;border:none;border-radius:12px;font-weight:600;cursor:pointer;">' + t.retake + '</button>' +
        '<a href="https://csca.help" target="_blank" rel="noopener" style="display:block;padding:14px;background:linear-gradient(135deg,#e3f2fd,#f3e5f5);color:#1a237e;border:2px solid #c5cae9;border-radius:12px;font-weight:600;text-decoration:none;text-align:center;">📚 ' + t.moreOnCscaHelp + ' &rarr;</a>' +
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

  // ── Review ──
  function renderReview() {
    state.mode = 'review';
    var app = getApp();

    var cards = state.questions.map(function(q, i) {
      var userAns = state.answers[i];
      var correctAns = q.q.answer;
      var isCorrect = userAns === correctAns;
      var opts = q.q.options[lang] || q.q.options.en;
      var diffClass = 'diff-' + (q.q.difficulty || 'medium');
      var diffLabel = t[q.q.difficulty || 'medium'] || q.q.difficulty;

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
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">' +
          '<div style="display:flex;gap:8px;align-items:center;">' +
            '<span style="font-size:13px;color:#777;">' + t.question + ' ' + (i + 1) + ' — ' + q.subjectName + '</span>' +
            '<span class="diff-badge ' + diffClass + '">' + diffLabel + '</span>' +
            (state.flagged[i] ? '<span style="font-size:13px;">🚩</span>' : '') +
          '</div>' +
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

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
