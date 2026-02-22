// Foorsa Form Handler - routes all forms to /api/submit-form
(function() {
  function showMsg(form, msg, ok) {
    let el = form.querySelector('.form-status');
    if (!el) { el = document.createElement('div'); el.className = 'form-status'; form.prepend(el); }
    el.textContent = msg;
    el.style.cssText = 'padding:12px 16px;border-radius:8px;margin-bottom:16px;font-weight:600;font-size:14px;text-align:center;' +
      (ok ? 'background:#d4edda;color:#155724;border:1px solid #c3e6cb;' : 'background:#f8d7da;color:#721c24;border:1px solid #f5c6cb;');
    if (ok) setTimeout(() => el.remove(), 8000);
  }

  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('form').forEach(function(form) {
      const action = form.getAttribute('action') || '';
      // Skip forms that already use our API or are search/quiz forms
      if (action.includes('/api/') || action === '#' || form.id === 'questionForm' || form.closest('.section-faq')) return;
      // Target formspree forms and any other external forms
      if (!action.includes('formspree') && action !== '' && !action.includes('javascript')) return;

      form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const btn = form.querySelector('[type="submit"], button.btn-submit, .submit-partner, .btn-apply');
        const origText = btn ? btn.textContent : '';
        if (btn) { btn.disabled = true; btn.textContent = 'Submitting...'; }

        try {
          const hasFiles = form.querySelector('input[type="file"]');
          let resp;

          if (hasFiles) {
            const fd = new FormData(form);
            // Detect form type
            if (form.closest('.form-careers') || action.includes('careers')) fd.append('form_type', 'careers');
            else fd.append('form_type', 'application');
            resp = await fetch('/api/submit-form', { method: 'POST', body: fd });
          } else {
            const data = {};
            new FormData(form).forEach((v, k) => { data[k] = v; });
            // Detect form type
            if (form.closest('.form-partner') || form.closest('.sctions-partner-with-us')) data.form_type = 'partner';
            else if (form.closest('.section-contact') || form.closest('.contact-content')) data.form_type = 'contact';
            else if (form.closest('.card-review') || form.closest('.section-review')) data.form_type = 'review';
            else data.form_type = 'general';
            resp = await fetch('/api/submit-form', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });
          }

          if (resp.ok) {
            showMsg(form, '✓ Your submission has been received! We will get back to you soon.', true);
            form.reset();
          } else {
            showMsg(form, '✕ Submission failed. Please try again.', false);
          }
        } catch (err) {
          showMsg(form, '✕ Network error. Please check your connection and try again.', false);
        }
        if (btn) { btn.disabled = false; btn.textContent = origText; }
      });
    });
  });
})();
