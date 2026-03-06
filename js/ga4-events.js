/**
 * Foorsa GA4 Conversion Events
 * Tracks key user interactions for SEO + conversion measurement
 */
(function() {
  'use strict';

  function sendGA4Event(eventName, params) {
    if (typeof gtag === 'function') {
      gtag('event', eventName, params);
    }
  }

  function getPageLang() {
    var path = location.pathname;
    if (path.startsWith('/ar/')) return 'ar';
    if (path.startsWith('/fr/')) return 'fr';
    return 'en';
  }

  document.addEventListener('click', function(e) {
    var link = e.target.closest('a');
    if (!link) return;
    var href = link.href || '';

    // WhatsApp click
    if (href.includes('wa.me') || href.includes('whatsapp')) {
      sendGA4Event('whatsapp_click', {
        page_url: location.pathname,
        language: getPageLang(),
        link_url: href
      });
      return;
    }

    // Phone click
    if (href.startsWith('tel:')) {
      sendGA4Event('phone_click', {
        page_url: location.pathname,
        language: getPageLang(),
        phone_number: href.replace('tel:', '')
      });
      return;
    }

    // CTA button click (apply, contact, consultation buttons)
    var btn = e.target.closest('.btn-apply-navbar, .cartoon-btn, .letsGo, .btn-apply, .btn-consultation, [class*="cta"]');
    if (btn) {
      sendGA4Event('cta_click', {
        page_url: location.pathname,
        language: getPageLang(),
        cta_text: (btn.textContent || '').trim().slice(0, 80),
        cta_position: btn.closest('header,nav') ? 'header' : btn.closest('footer') ? 'footer' : 'body'
      });
    }
  });

  // Form submission tracking
  document.addEventListener('submit', function(e) {
    var form = e.target;
    if (!form || form.tagName !== 'FORM') return;

    // Determine form type
    var formType = 'general';
    if (form.closest('.form-partner') || form.closest('.sctions-partner-with-us')) formType = 'partner';
    else if (form.closest('.section-contact') || form.closest('.contact-content')) formType = 'contact';
    else if (form.closest('.card-review') || form.closest('.section-review')) formType = 'review';
    else if (form.closest('.form-careers')) formType = 'careers';
    else if (form.id === 'questionForm') formType = 'quiz';

    sendGA4Event('form_submit', {
      page_url: location.pathname,
      language: getPageLang(),
      form_type: formType
    });
  });

  // Quiz completion tracking
  var quizObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(m) {
      if (m.target.classList && m.target.classList.contains('quiz-result')) {
        var resultText = (m.target.textContent || '').trim().slice(0, 100);
        if (resultText) {
          sendGA4Event('quiz_complete', {
            page_url: location.pathname,
            language: getPageLang(),
            result: resultText
          });
        }
      }
    });
  });
  var quizResult = document.querySelector('.quiz-result, #quizResult, .result-section');
  if (quizResult) {
    quizObserver.observe(quizResult, { childList: true, subtree: true, characterData: true });
  }

  // Blog scroll depth tracking (50% and 100%)
  if (location.pathname.includes('/blog/') && !location.pathname.endsWith('/blog/index.html')) {
    var sent50 = false, sent100 = false;
    var articleSlug = location.pathname.split('/').pop().replace('.html', '');

    window.addEventListener('scroll', function() {
      var scrollPct = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;

      if (!sent50 && scrollPct >= 0.5) {
        sent50 = true;
        sendGA4Event('blog_scroll_50', {
          article_slug: articleSlug,
          language: getPageLang()
        });
      }
      if (!sent100 && scrollPct >= 0.95) {
        sent100 = true;
        sendGA4Event('blog_scroll_100', {
          article_slug: articleSlug,
          language: getPageLang()
        });
      }
    }, { passive: true });
  }

  // Language switch tracking
  document.addEventListener('click', function(e) {
    var langLink = e.target.closest('.language-switcher a, .lang-switch a, [data-lang]');
    if (!langLink) return;
    var toLang = langLink.getAttribute('data-lang') || '';
    if (!toLang) {
      var langHref = langLink.href || '';
      if (langHref.includes('/ar/')) toLang = 'ar';
      else if (langHref.includes('/fr/')) toLang = 'fr';
      else if (langHref.includes('/en/')) toLang = 'en';
    }
    if (toLang) {
      sendGA4Event('language_switch', {
        from_lang: getPageLang(),
        to_lang: toLang,
        page_url: location.pathname
      });
    }
  });
})();
