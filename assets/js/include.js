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

  var PALETTES = [
    { id: 'vermelho', label: 'Vermelho acolhedor', dots: ['#E8384F', '#3AA6A6', '#FFC24B'] },
    { id: 'rosa', label: 'Rosa e azul suaves', dots: ['#FF7096', '#5FB8E8', '#6FCF97'] },
    { id: 'coral', label: 'Coral e turquesa', dots: ['#FF6B5B', '#17B6A7', '#FFD166'] }
  ];

  function buildPaletteSwitcher() {
    var current = document.documentElement.getAttribute('data-palette') || 'vermelho';

    var box = document.createElement('div');
    box.className = 'palette-switcher';

    var title = document.createElement('div');
    title.className = 'ps-title';
    title.textContent = 'Protótipo — escolher paleta';
    box.appendChild(title);

    var options = document.createElement('div');
    options.className = 'ps-options';

    PALETTES.forEach(function (p) {
      var btn = document.createElement('button');
      btn.type = 'button';
      if (p.id === current) btn.classList.add('active');

      var dots = document.createElement('span');
      dots.className = 'ps-dots';
      p.dots.forEach(function (color) {
        var dot = document.createElement('span');
        dot.className = 'ps-dot';
        dot.style.background = color;
        dots.appendChild(dot);
      });

      var label = document.createElement('span');
      label.textContent = p.label;

      btn.appendChild(dots);
      btn.appendChild(label);
      btn.addEventListener('click', function () {
        document.documentElement.setAttribute('data-palette', p.id);
        try { localStorage.setItem('palette', p.id); } catch (e) {}
        options.querySelectorAll('button').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
      });

      options.appendChild(btn);
    });

    box.appendChild(options);
    document.body.appendChild(box);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var pending = 2;
    function tick() { pending -= 1; if (pending === 0) afterPartials(); }
    inject('[data-include="nav"]', 'partials/nav.html', tick);
    inject('[data-include="footer"]', 'partials/footer.html', tick);
    buildPaletteSwitcher();
  });
})();
