(function() {
  // Configuration
  const STORAGE_KEY = 'foorsa_preferred_lang';
  const SUPPORTED_LANGS = ['en', 'fr', 'ar'];
  const DEFAULT_LANG = 'en';
  
  // List of pages available in each language
  const availablePages = {
    en: ['index.html', 'about-us.html', 'contact.html', 'fees.html', 'majors.html', 'scholarship.html', 'step-by-step.html', 'documents.html', 'frequently-asked-questions.html', 'mission-values.html', 'recruitment.html', 'partner-with-us.html', 'shop.html', 'home.html', 'reviews.html', 'blog2.html', 'careers.html', 'engagement.html', 'newsletter.html', 'checkout.html', 'cart.html', 'payment-confirmation.html', 'payment-failed.html', 'terms-of-service.html', 'privacy-policy.html', 'refund-policy.html', 'terms-of-sale.html', 'quiz.html', 'csca-test.html', 'admission-calculator.html'],

    fr: ['index.html', 'shop.html', 'about-us.html', 'scholarship.html', 'fees.html', 'step-by-step.html', 'contact.html', 'frequently-asked-questions.html', 'majors.html', 'documents.html', 'mission-values.html', 'recruitment.html', 'partner-with-us.html', 'home.html', 'reviews.html', 'blog2.html', 'careers.html', 'engagement.html', 'newsletter.html', 'quiz.html', 'checkout.html', 'cart.html', 'csca-test.html', 'admission-calculator.html'],

    ar: ['index.html', 'shop.html', 'about-us.html', 'scholarship.html', 'fees.html', 'step-by-step.html', 'contact.html', 'frequently-asked-questions.html', 'majors.html', 'documents.html', 'mission-values.html', 'recruitment.html', 'csca-test.html', 'admission-calculator.html']
  };
  
  // Detect current language from URL path
  function getCurrentLang() {
    const path = window.location.pathname;
    
    if (path.includes('/fr/')) {
      return 'fr';
    }
    if (path.includes('/ar/')) {
      return 'ar';
    }
    if (path.includes('/en/')) {
      return 'en';
    }
    // Root pages (no language prefix) are English
    return 'en';
  }
  
  // Get current page filename
  function getCurrentPage() {
    const path = window.location.pathname;
    const parts = path.split('/');
    const filename = parts[parts.length - 1] || 'index.html';
    return filename;
  }
  
  // Switch to a different language
  window.switchLanguage = function(targetLang) {
    if (event) event.preventDefault();
    
    const currentLang = getCurrentLang();
    localStorage.setItem(STORAGE_KEY, targetLang);
    
    if (currentLang === targetLang) return;
    
    const currentPage = getCurrentPage();
    let newPath;
    
    // Check if page exists in target language
    const pageExists = availablePages[targetLang] && availablePages[targetLang].includes(currentPage);
    
    if (pageExists) {
      newPath = '/' + targetLang + '/' + currentPage;
    } else {
      // Fallback to homepage of target language
      newPath = '/' + targetLang + '/index.html';
    }
    
    // All languages use their own directory
    // No special case for English - /en/ is the English homepage
    
    window.location.href = newPath;
  };
  
  // Auto-redirect on first visit
  function handleFirstVisit() {
    const savedLang = localStorage.getItem(STORAGE_KEY);
    const currentLang = getCurrentLang();
    const isRootPage = window.location.pathname === '/' || 
                       window.location.pathname === '/index.html';
    
    if (savedLang && savedLang !== currentLang && isRootPage) {
      // User has preference, redirect to their language
      window.location.href = '/' + savedLang + '/index.html';
      return;
    }
    
    if (!savedLang && isRootPage) {
      // First visit - detect browser language
      const browserLang = navigator.language || navigator.userLanguage;
      let detectedLang = DEFAULT_LANG;
      
      if (browserLang.startsWith('ar')) {
        detectedLang = 'ar';
      } else if (browserLang.startsWith('fr')) {
        detectedLang = 'fr';
      }
      
      localStorage.setItem(STORAGE_KEY, detectedLang);
      
      if (detectedLang !== DEFAULT_LANG) {
        window.location.href = '/' + detectedLang + '/index.html';
      }
    }
  }
  
  // Update toggle to show current language
  function updateToggleDisplay() {
    const currentLang = getCurrentLang();
    const flagMap = {
      'en': 'https://flagcdn.com/w40/gb.png',
      'fr': 'https://flagcdn.com/w40/fr.png',
      'ar': 'https://flagcdn.com/w40/ma.png'
    };
    const labelMap = {
      'en': 'EN',
      'fr': 'FR', 
      'ar': 'AR'
    };
    
    const flagImg = document.getElementById('current-flag');
    const langText = document.getElementById('current-lang-text');
    
    if (flagImg) flagImg.src = flagMap[currentLang];
    if (langText) langText.textContent = labelMap[currentLang];
    
    // Highlight current language in dropdown
    document.querySelectorAll('.lang-option').forEach(opt => {
      opt.classList.remove('active');
      if (opt.dataset.lang === currentLang) {
        opt.classList.add('active');
      }
    });
  }
  
  // Rewrite internal links to match current language
  function rewriteInternalLinks() {
    const currentLang = getCurrentLang();
    
    // Find all internal links
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      
      // Skip external links, anchors, javascript, mailto, tel
      if (!href || 
          href.startsWith('http') || 
          href.startsWith('#') || 
          href.startsWith('javascript') ||
          href.startsWith('mailto') ||
          href.startsWith('tel')) {
        return;
      }
      
      // Skip if link already points to current language
      if (href.includes('/' + currentLang + '/')) {
        return;
      }
      
      // Rewrite links that point to /en/, /fr/, or /ar/
      let newHref = href;
      
      if (href.includes('/en/')) {
        newHref = href.replace('/en/', '/' + currentLang + '/');
      } else if (href.includes('/fr/')) {
        newHref = href.replace('/fr/', '/' + currentLang + '/');
      } else if (href.includes('/ar/')) {
        newHref = href.replace('/ar/', '/' + currentLang + '/');
      } else if (href.startsWith('./en/')) {
        newHref = href.replace('./en/', './' + currentLang + '/');
      } else if (href.startsWith('./fr/')) {
        newHref = href.replace('./fr/', './' + currentLang + '/');
      } else if (href.startsWith('./ar/')) {
        newHref = href.replace('./ar/', './' + currentLang + '/');
      }
      
      link.setAttribute('href', newHref);
    });
  }
  
  // Initialize
  document.addEventListener('DOMContentLoaded', function() {
    handleFirstVisit();
    updateToggleDisplay();
    rewriteInternalLinks();
  });
})();
