document.addEventListener('partials:loaded', function () {
  var navCollapse = document.getElementById('nav');
  if (navCollapse) {
    navCollapse.querySelectorAll('.nav-link, .btn').forEach(function (link) {
      link.addEventListener('click', function () {
        if (navCollapse.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
        }
      });
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var value = btn.getAttribute('data-copy') || '';
      var restore = btn.textContent;

      function feedback(text) {
        btn.textContent = text;
        setTimeout(function () { btn.textContent = restore; }, 1800);
      }

      var textarea = document.createElement('textarea');
      textarea.value = value;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
      document.body.removeChild(textarea);
      feedback(ok ? 'Copiado!' : 'Não foi possível copiar');
    });
  });

  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');
  var submitBtn = document.getElementById('formSubmitBtn');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Enviando...';

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (response) {
          if (response.ok) {
            showStatus('success', 'Mensagem enviada! Em breve entraremos em contato.');
            form.reset();
          } else {
            showStatus('danger', 'Não foi possível enviar agora. Tente novamente ou use o e-mail contato@institutoaugustoabou.org.br.');
          }
        })
        .catch(function () {
          showStatus('danger', 'Não foi possível enviar agora. Tente novamente ou use o e-mail contato@institutoaugustoabou.org.br.');
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        });
    });
  }

  function showStatus(type, message) {
    if (!status) return;
    status.className = 'alert alert-' + type + ' show mt-3';
    status.textContent = message;
  }
});
