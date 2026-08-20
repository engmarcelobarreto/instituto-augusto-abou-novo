(function () {
  function inject(selector, url, done) {
    var el = document.querySelector(selector);
    if (!el) return done();
    fetch(url)
      .then(function (r) { return r.text(); })
      .then(function (html) {
        el.innerHTML = html;
        done();
      })
      .catch(function () { done(); });
  }

  function afterPartials() {
    var page = document.body.getAttribute('data-page');
    if (page) {
      document.querySelectorAll('.nav-link[data-page]').forEach(function (link) {
        if (link.getAttribute('data-page') === page) {
          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
        }
      });
    }
    var year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    document.dispatchEvent(new CustomEvent('partials:loaded'));
  }

  document.addEventListener('DOMContentLoaded', function () {
    var pending = 2;
    function tick() { pending -= 1; if (pending === 0) afterPartials(); }
    inject('[data-include="nav"]', 'partials/nav.html', tick);
    inject('[data-include="footer"]', 'partials/footer.html', tick);
  });
})();
