(function() {
  'use strict';

  var SAVE_INTERVAL = 12000; // 12 seconds
  var SESSION_KEY = '_fid';
  var timers = {};
  var lastSaved = {};

  function getSessionId() {
    var s = sessionStorage;
    var id = s.getItem(SESSION_KEY);
    if (!id) {
      id = '';
      for (var i = 0; i < 32; i++) id += 'abcdefghijklmnopqrstuvwxyz0123456789'[Math.random() * 36 | 0];
      s.setItem(SESSION_KEY, id);
    }
    return id;
  }

  function detectFormType(form) {
    // Check data attribute first
    if (form.dataset.formType) return form.dataset.formType;

    // Detect from form ID or class
    var id = (form.id || '').toLowerCase();
    var cls = (form.className || '').toLowerCase();
    var action = (form.action || '').toLowerCase();
    var page = location.pathname.toLowerCase();

    if (id.includes('application') || page.includes('shop')) return 'application';
    if (page.includes('contact')) return 'contact';
    if (page.includes('career')) return 'careers';
    if (page.includes('partner')) return 'partner';
    if (page.includes('review')) return 'review';
    if (page.includes('recruit')) return 'recruitment';
    if (page.includes('quiz')) return 'quiz';
    if (page.includes('scholarship-finder')) return 'scholarship-finder';
    if (cls.includes('wpcf7')) return 'contact';

    return 'general';
  }

  function collectFields(form) {
    var fields = {};
    var inputs = form.querySelectorAll('input, select, textarea');

    for (var i = 0; i < inputs.length; i++) {
      var el = inputs[i];
      var name = el.name || el.id || '';
      if (!name) continue;

      // Skip sensitive fields
      var nameLower = name.toLowerCase();
      if (nameLower.includes('password') || nameLower.includes('captcha') ||
          nameLower.includes('token') || nameLower.includes('csrf') ||
          nameLower.includes('card') || nameLower.includes('cvc') ||
          nameLower.includes('expir') || nameLower.includes('stripe') ||
          nameLower.includes('h-captcha')) continue;

      // Skip file inputs
      if (el.type === 'file') continue;
      // Skip hidden inputs (often tokens)
      if (el.type === 'hidden') continue;

      var val = '';
      if (el.type === 'checkbox') {
        val = el.checked ? 'yes' : 'no';
      } else if (el.type === 'radio') {
        if (el.checked) val = el.value;
        else continue; // skip unchecked radios
      } else {
        val = (el.value || '').trim();
      }

      if (val) fields[name] = val;
    }

    return fields;
  }

  function saveFormData(form) {
    var formType = detectFormType(form);
    var fields = collectFields(form);

    // Don't save if nothing has changed
    var key = formType;
    var serialized = JSON.stringify(fields);
    if (lastSaved[key] === serialized) return;
    if (Object.keys(fields).length === 0) return;

    lastSaved[key] = serialized;

    var payload = {
      session_id: getSessionId(),
      form_type: formType,
      page_url: location.pathname,
      fields: fields
    };

    // Use sendBeacon for reliability
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/track-form', JSON.stringify(payload));
    } else {
      fetch('/api/track-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true
      }).catch(function() {});
    }
  }

  function startTracking(form) {
    var formType = detectFormType(form);

    // Skip FAQ search and other non-data forms
    if (formType === 'general') {
      var inputs = form.querySelectorAll('input[name], select[name], textarea[name]');
      if (inputs.length < 2) return; // Likely a search form
    }

    // Set up periodic auto-save
    var intervalId = setInterval(function() {
      saveFormData(form);
    }, SAVE_INTERVAL);

    timers[formType] = intervalId;

    // Also save on form submit (final capture)
    form.addEventListener('submit', function() {
      saveFormData(form);
    });

    // Save when user leaves the page
    window.addEventListener('beforeunload', function() {
      saveFormData(form);
    });

    // Save on first interaction
    var firstInteraction = false;
    form.addEventListener('input', function() {
      if (!firstInteraction) {
        firstInteraction = true;
        // Save after a short delay on first interaction
        setTimeout(function() { saveFormData(form); }, 2000);
      }
    }, { once: false });
  }

  function init() {
    var forms = document.querySelectorAll('form');
    for (var i = 0; i < forms.length; i++) {
      startTracking(forms[i]);
    }

    // Also track non-form interactive elements (quiz, scholarship finder profile form)
    var profileForms = document.querySelectorAll('[data-track-form]');
    for (var j = 0; j < profileForms.length; j++) {
      startTracking(profileForms[j]);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
