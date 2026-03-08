(function() {
  'use strict';

  var lang = document.documentElement.lang || 'en';
  var scholarships = [];
  var cities = [];
  var activeFilters = { type: 'all', english: 'all', city: 'all', level: 'all' };
  var searchQuery = '';

  var i18n = {
    en: {
      searchPlaceholder: 'Search scholarships... (e.g. "fully funded", "CSC", "Beijing")',
      filterType: 'Funding Type',
      filterAll: 'All',
      filterFull: 'Fully Funded',
      filterPartial: 'Partial',
      filterEnglish: 'Language',
      filterEnglishYes: 'English Programs',
      filterEnglishAll: 'All Languages',
      filterCity: 'City',
      filterAllCities: 'All Cities',
      filterLevel: 'Degree Level',
      filterAllLevels: 'All Levels',
      levelBachelor: 'Bachelor',
      levelMaster: 'Master',
      levelPhd: 'PhD',
      levelLanguage: 'Language Year',
      fullyFunded: 'Fully Funded',
      partial: 'Partial',
      coverage: 'What\'s Covered',
      eligibility: 'Eligibility',
      deadline: 'Deadline',
      universities: 'universities',
      successRate: 'Acceptance',
      tuitionCovered: 'Tuition Covered',
      stipend: 'Monthly Stipend',
      applyNow: 'Apply with Foorsa',
      noResults: 'No scholarships match your filters. Try adjusting your search.',
      resultsCount: 'scholarships found',
      rateLow: 'Competitive',
      rateMedium: 'Moderate',
      rateHigh: 'Good Chances',
      rateVeryHigh: 'Excellent Chances'
    },
    fr: {
      searchPlaceholder: 'Rechercher des bourses... (ex. "bourse complète", "CSC", "Pékin")',
      filterType: 'Type de financement',
      filterAll: 'Tous',
      filterFull: 'Bourse complète',
      filterPartial: 'Partielle',
      filterEnglish: 'Langue',
      filterEnglishYes: 'Programmes en anglais',
      filterEnglishAll: 'Toutes les langues',
      filterCity: 'Ville',
      filterAllCities: 'Toutes les villes',
      filterLevel: 'Niveau d\'études',
      filterAllLevels: 'Tous les niveaux',
      levelBachelor: 'Licence',
      levelMaster: 'Master',
      levelPhd: 'Doctorat',
      levelLanguage: 'Année linguistique',
      fullyFunded: 'Bourse complète',
      partial: 'Partielle',
      coverage: 'Ce qui est couvert',
      eligibility: 'Éligibilité',
      deadline: 'Date limite',
      universities: 'universités',
      successRate: 'Acceptation',
      tuitionCovered: 'Scolarité couverte',
      stipend: 'Allocation mensuelle',
      applyNow: 'Postuler avec Foorsa',
      noResults: 'Aucune bourse ne correspond à vos filtres. Essayez de modifier votre recherche.',
      resultsCount: 'bourses trouvées',
      rateLow: 'Compétitif',
      rateMedium: 'Modéré',
      rateHigh: 'Bonnes chances',
      rateVeryHigh: 'Excellentes chances'
    },
    ar: {
      searchPlaceholder: 'ابحث عن منح... (مثل "منحة كاملة"، "CSC"، "بكين")',
      filterType: 'نوع التمويل',
      filterAll: 'الكل',
      filterFull: 'منحة كاملة',
      filterPartial: 'جزئية',
      filterEnglish: 'اللغة',
      filterEnglishYes: 'برامج بالإنجليزية',
      filterEnglishAll: 'كل اللغات',
      filterCity: 'المدينة',
      filterAllCities: 'كل المدن',
      filterLevel: 'المستوى الدراسي',
      filterAllLevels: 'كل المستويات',
      levelBachelor: 'بكالوريوس',
      levelMaster: 'ماجستير',
      levelPhd: 'دكتوراه',
      levelLanguage: 'سنة لغوية',
      fullyFunded: 'منحة كاملة',
      partial: 'جزئية',
      coverage: 'ما تغطيه المنحة',
      eligibility: 'شروط الأهلية',
      deadline: 'الموعد النهائي',
      universities: 'جامعة',
      successRate: 'فرص القبول',
      tuitionCovered: 'الرسوم المغطاة',
      stipend: 'الراتب الشهري',
      applyNow: 'قدّم مع فرصة',
      noResults: 'لا توجد منح تطابق بحثك. حاول تعديل الفلاتر.',
      resultsCount: 'منحة',
      rateLow: 'تنافسي',
      rateMedium: 'متوسط',
      rateHigh: 'فرص جيدة',
      rateVeryHigh: 'فرص ممتازة'
    }
  };

  var t = i18n[lang] || i18n.en;

  function loadData() {
    var basePath = lang === 'en' ? '..' : '../..';
    if (window.location.pathname.indexOf('/scholarship-finder') === -1) basePath = '..';
    var dataPath = '/assets/data/';

    Promise.all([
      fetch(dataPath + 'scholarships.json').then(function(r) { return r.json(); }),
      fetch(dataPath + 'cities.json').then(function(r) { return r.json(); })
    ]).then(function(results) {
      scholarships = results[0];
      cities = results[1];
      buildCityFilter();
      render();
    });
  }

  function buildCityFilter() {
    var select = document.getElementById('sf-filter-city');
    if (!select) return;
    cities.forEach(function(city) {
      var opt = document.createElement('option');
      opt.value = city.id;
      opt.textContent = city.name[lang] || city.name.en;
      select.appendChild(opt);
    });
  }

  function getFilteredScholarships() {
    return scholarships.filter(function(s) {
      if (activeFilters.type !== 'all' && s.type !== activeFilters.type) return false;
      if (activeFilters.english === 'yes' && !s.english_programs) return false;
      if (activeFilters.city !== 'all' && s.cities.indexOf(activeFilters.city) === -1) return false;
      if (activeFilters.level !== 'all' && s.degree_levels.indexOf(activeFilters.level) === -1) return false;

      if (searchQuery) {
        var q = searchQuery.toLowerCase();
        var name = (s.name[lang] || s.name.en).toLowerCase();
        var desc = (s.description[lang] || s.description.en).toLowerCase();
        var provider = (s.provider[lang] || s.provider.en).toLowerCase();
        var elig = (s.eligibility[lang] || s.eligibility.en).toLowerCase();
        var tags = s.tags.join(' ').toLowerCase();
        var searchable = name + ' ' + desc + ' ' + provider + ' ' + elig + ' ' + tags;

        // Also search in all city names
        var cityNames = s.cities.map(function(cid) {
          var city = cities.find(function(c) { return c.id === cid; });
          return city ? (city.name[lang] || city.name.en).toLowerCase() : cid;
        }).join(' ');
        searchable += ' ' + cityNames;

        // Map common search aliases
        var aliases = {
          'fully funded': 'full fully-funded',
          'bourse complète': 'full fully-funded',
          'منحة كاملة': 'full fully-funded',
          'free': 'full fully-funded',
          'gratuit': 'full fully-funded',
          'مجاني': 'full fully-funded',
          'moroccan': 'morocco morocco-exclusive morocco-eligible',
          'marocain': 'morocco morocco-exclusive morocco-eligible',
          'مغربي': 'morocco morocco-exclusive morocco-eligible',
          'scholarship': 'scholarship bourse منحة',
          'english': 'english anglais إنجليزي'
        };

        var expanded = q;
        Object.keys(aliases).forEach(function(key) {
          if (q.indexOf(key) !== -1) expanded += ' ' + aliases[key];
        });

        var words = expanded.split(/\s+/);
        var match = words.some(function(w) {
          return searchable.indexOf(w) !== -1;
        });
        if (!match) return false;
      }

      return true;
    });
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

  function renderCard(s) {
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
      '<div class="sf-card-header">' +
        '<div class="sf-card-badges">' + typeBadge + ' ' + englishBadge + '</div>' +
        '<h2 class="sf-card-title">' + name + '</h2>' +
        '<p class="sf-card-provider">' + provider + '</p>' +
      '</div>' +
      '<div class="sf-card-body">' +
        '<p class="sf-card-desc">' + desc + '</p>' +
        '<div class="sf-card-levels">' + levelBadges + '</div>' +
        '<div class="sf-card-stats">' +
          '<div class="sf-stat">' +
            '<span class="sf-stat-label">' + t.tuitionCovered + '</span>' +
            '<span class="sf-stat-value">' + s.tuition_covered + '</span>' +
          '</div>' +
          '<div class="sf-stat">' +
            '<span class="sf-stat-label">' + t.stipend + '</span>' +
            '<span class="sf-stat-value">' + stipendStr + '</span>' +
          '</div>' +
          '<div class="sf-stat">' +
            '<span class="sf-stat-label">' + t.successRate + '</span>' +
            '<span class="sf-stat-value" style="color:' + getSuccessRateColor(s.success_rate) + '">' + getSuccessRateLabel(s.success_rate) + '</span>' +
          '</div>' +
        '</div>' +
        '<details class="sf-details">' +
          '<summary>' + t.coverage + '</summary>' +
          coverageHtml +
        '</details>' +
        '<details class="sf-details">' +
          '<summary>' + t.eligibility + '</summary>' +
          '<p>' + eligibility + '</p>' +
        '</details>' +
        '<div class="sf-card-meta">' +
          '<span>📅 ' + t.deadline + ': ' + deadline + '</span>' +
          '<span>🏛️ ' + s.universities_count + ' ' + t.universities + '</span>' +
          '<span>📍 ' + cityStr + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="sf-card-footer">' +
        '<a href="' + s.apply_link + '" class="sf-apply-btn">' + t.applyNow + '</a>' +
      '</div>' +
    '</div>';
  }

  function render() {
    var container = document.getElementById('sf-results');
    var countEl = document.getElementById('sf-count');
    if (!container) return;

    var filtered = getFilteredScholarships();
    countEl.textContent = filtered.length + ' ' + t.resultsCount;

    if (filtered.length === 0) {
      container.innerHTML = '<div class="sf-no-results">' + t.noResults + '</div>';
      return;
    }

    container.innerHTML = filtered.map(renderCard).join('');
  }

  function setupListeners() {
    var searchInput = document.getElementById('sf-search');
    if (searchInput) {
      var debounceTimer;
      searchInput.addEventListener('input', function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function() {
          searchQuery = searchInput.value.trim();
          render();
        }, 300);
      });
    }

    ['sf-filter-type', 'sf-filter-english', 'sf-filter-city', 'sf-filter-level'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) {
        el.addEventListener('change', function() {
          var key = id.replace('sf-filter-', '');
          activeFilters[key] = el.value;
          render();
        });
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { setupListeners(); loadData(); });
  } else {
    setupListeners();
    loadData();
  }
})();
