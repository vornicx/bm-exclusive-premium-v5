/* Mfinity precision layer: cleaner hero, stronger controls and reliable media */
(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const precisionStyle = document.createElement('style');
  precisionStyle.textContent = `
    .brand-strip{display:none!important}
    .hero-media img{transform:none!important;will-change:auto!important}
    .enquiry-head{display:flex;align-items:flex-start;justify-content:space-between;gap:18px}
    .enquiry-head > div{min-width:0}
    .enquiry-head .icon-close,.catalog-close.icon-close{position:relative;flex:0 0 auto;width:42px;height:42px;border-radius:999px;border:1px solid rgba(255,255,255,.16);background:#fff;color:#090909;padding:0;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;transition:transform .2s ease,background .25s ease,color .25s ease,border-color .25s ease;align-self:flex-start}
    .enquiry-head .icon-close:hover,.catalog-close.icon-close:hover{transform:translateY(-1px);background:#090909;color:#fff;border-color:#090909}
    .enquiry-head .icon-close::before,.catalog-close.icon-close::before{content:'×';font-size:22px;line-height:1;font-weight:500}
    .enquiry-head .icon-close > *,.catalog-close.icon-close > *{display:none!important}
    .catalog-modal-head .catalog-close.icon-close{margin-top:0;align-self:flex-start}
    .flatpickr-calendar{background:#111;border:1px solid rgba(255,255,255,.12);box-shadow:0 24px 80px rgba(0,0,0,.38)}
    .flatpickr-months .flatpickr-month,.flatpickr-current-month .flatpickr-monthDropdown-months,.flatpickr-current-month input.cur-year,.flatpickr-weekday,.flatpickr-day{color:#efefeb}
    .flatpickr-weekdays{background:#111}
    .flatpickr-months .flatpickr-prev-month svg,.flatpickr-months .flatpickr-next-month svg{fill:#efefeb}
    .flatpickr-day{border-radius:10px;max-width:37px;line-height:37px;height:37px}
    .flatpickr-day.today{border-color:rgba(255,255,255,.4)}
    .flatpickr-day.selected,.flatpickr-day.startRange,.flatpickr-day.endRange,.flatpickr-day.selected:hover,.flatpickr-day.startRange:hover,.flatpickr-day.endRange:hover{background:#fff;border-color:#fff;color:#090909}
    .flatpickr-day.inRange,.flatpickr-day.prevMonthDay.inRange,.flatpickr-day.nextMonthDay.inRange{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.08);box-shadow:none}
    .flatpickr-day:hover{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.08)}
    .flatpickr-input[readonly]{background:#fff!important;color:#090909!important;cursor:pointer}
    .catalog-form input.flatpickr-input[readonly],.enquiry-panel input.flatpickr-input[readonly]{background:#fff!important;color:#090909!important}
  `;
  document.head.appendChild(precisionStyle);

  function injectScript(src, onload) {
    if ([...document.scripts].some(s => s.src === src)) { if (onload) onload(); return; }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    if (onload) script.addEventListener('load', onload, { once: true });
    document.head.appendChild(script);
  }

  function injectStylesheet(href) {
    if ([...document.querySelectorAll('link[rel="stylesheet"]')].some(l => l.href === href)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }

  injectScript('/assets/catalog-system.js', () => injectScript('/assets/media-fix.js'));
  injectScript('/assets/official-site.js');
  injectStylesheet('https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css');
  injectScript('https://cdn.jsdelivr.net/npm/flatpickr', initDatePickers);

  try {
    if (typeof cars !== 'undefined' && cars[3]) {
      cars[3].image = 'https://mfinity.es/wp-content/uploads/2024/09/u3446499754_Mercedes_gelik_g63_2022_blac_front_in_marbellasho_50e7cc59-3823-493b-8f40-b1882b1ec00d_2-768x768.png';
      cars[3].fallback = 'https://mfinity.es/wp-content/uploads/2024/09/IMG_5139-768x1024.jpg';
    }
  } catch (_) {}

  function initDatePickers() {
    if (!window.flatpickr) return;
    const today = new Date();
    const inputs = [...document.querySelectorAll('input[name="from"], input[name="to"], .catalog-form input[type="date"]')];
    inputs.forEach(input => {
      if (input.dataset.fpBound) return;
      input.dataset.fpBound = '1';
      input.type = 'text';
      flatpickr(input, {
        altInput: true,
        altFormat: 'd M Y',
        dateFormat: 'Y-m-d',
        minDate: today,
        disableMobile: true,
        monthSelectorType: 'static',
        prevArrow: '‹',
        nextArrow: '›'
      });
    });

    const syncPair = (fromSelector, toSelector) => {
      const from = document.querySelector(fromSelector);
      const to = document.querySelector(toSelector);
      if (!from?._flatpickr || !to?._flatpickr || from.dataset.fpLinked) return;
      from.dataset.fpLinked = '1';
      const isoToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0,10);
      from._flatpickr.set('minDate', isoToday);
      to._flatpickr.set('minDate', isoToday);
      from._flatpickr.config.onChange.push(function(selectedDates, dateStr){
        const min = dateStr || isoToday;
        to._flatpickr.set('minDate', min);
        if (to.value && dateStr && to.value < dateStr) to._flatpickr.setDate(dateStr, true);
      });
    };

    syncPair('input[name="from"]', 'input[name="to"]');
    const catalogForms = document.querySelectorAll('.catalog-form');
    catalogForms.forEach(form => {
      const from = form.querySelector('input[name="from"]');
      const to = form.querySelector('input[name="to"]');
      if (from && to) syncPair(`.catalog-form input[name="from"]`, `.catalog-form input[name="to"]`);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.brand-strip')?.remove();

    const heroImage = document.querySelector('.hero-media img');
    if (heroImage) {
      const fallbackHero = 'https://mfinity.es/wp-content/uploads/2024/04/Ferrari-488-Spyder%E2%80%8B-front-768x576.jpg';
      const sharpHero = 'https://mfinity.es/wp-content/uploads/2024/04/Ferrari-488-Spyder%E2%80%8B-front.jpg';
      heroImage.src = sharpHero;
      heroImage.removeAttribute('srcset');
      heroImage.removeAttribute('sizes');
      heroImage.fetchPriority = 'high';
      heroImage.decoding = 'async';
      heroImage.style.objectPosition = 'center center';
      heroImage.style.transform = 'none';
      heroImage.onerror = () => {
        if (heroImage.src !== fallbackHero) {
          heroImage.onerror = null;
          heroImage.src = fallbackHero;
        }
      };
    }

    const marbellaImage = document.querySelector('.marbella-image img');
    if (marbellaImage) {
      marbellaImage.src = 'https://mfinity.es/wp-content/uploads/2024/09/u3446499754_Mercedes_gelik_g63_2022_blac_front_in_marbellasho_50e7cc59-3823-493b-8f40-b1882b1ec00d_2-768x768.png';
      marbellaImage.alt = 'Mercedes-AMG G63 by Mfinity in Marbella';
      marbellaImage.removeAttribute('srcset');
      marbellaImage.style.objectPosition = 'center center';
    }

    const carImage = document.querySelector('[data-car-image]');
    const stage = document.querySelector('[data-stage]');
    const applyFocalPoint = () => {
      if (!carImage) return;
      const name = document.querySelector('[data-car-name]')?.textContent || '';
      carImage.style.objectPosition = name.includes('Lamborghini') ? 'center 58%' : name.includes('G63') ? 'center 54%' : 'center 50%';
    };
    applyFocalPoint();
    if (stage) new MutationObserver(applyFocalPoint).observe(stage, { attributes: true, attributeFilter: ['class'] });

    const from = document.querySelector('input[name="from"]');
    const to = document.querySelector('input[name="to"]');
    if (from && to) {
      const iso = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
      from.min = iso;
      to.min = iso;
      from.addEventListener('change', () => {
        to.min = from.value || iso;
      });
    }

    initDatePickers();
    new MutationObserver(initDatePickers).observe(document.documentElement, { childList: true, subtree: true });
    if (prefersReduced) document.documentElement.classList.add('reduced-motion');
  });
})();
