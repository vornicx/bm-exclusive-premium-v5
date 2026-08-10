/* Mfinity precision layer: verified brand assets + restrained premium motion */
(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Replace the generic G63 visual with Mfinity's own published vehicle image.
  try {
    if (typeof cars !== 'undefined' && cars[3]) {
      cars[3].image = 'https://mfinity.es/wp-content/uploads/2024/09/u3446499754_Mercedes_gelik_g63_2022_blac_front_in_marbellasho_50e7cc59-3823-493b-8f40-b1882b1ec00d_2-768x768.png';
      cars[3].fallback = 'https://mfinity.es/wp-content/uploads/2024/09/IMG_5139-768x1024.jpg';
    }
  } catch (_) {}

  document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-media img');

    // Small, almost imperceptible perspective response on desktop only.
    if (hero && heroImage && !prefersReduced && window.matchMedia('(pointer:fine)').matches) {
      hero.addEventListener('pointermove', (event) => {
        const rect = hero.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - .5) * 5;
        const y = ((event.clientY - rect.top) / rect.height - .5) * 3;
        heroImage.style.transform = `scale(1.025) translate3d(${x}px,${y}px,0)`;
      }, { passive: true });
      hero.addEventListener('pointerleave', () => {
        heroImage.style.transform = 'scale(1.015) translate3d(0,0,0)';
      });
    }

    // Give the active car image a more useful focal point depending on aspect/model.
    const carImage = document.querySelector('[data-car-image]');
    const stage = document.querySelector('[data-stage]');
    const applyFocalPoint = () => {
      if (!carImage) return;
      const name = document.querySelector('[data-car-name]')?.textContent || '';
      carImage.style.objectPosition = name.includes('Lamborghini') ? 'center 58%' : name.includes('G63') ? 'center 54%' : 'center 50%';
    };
    applyFocalPoint();
    if (stage) new MutationObserver(applyFocalPoint).observe(stage, { attributes: true, attributeFilter: ['class'] });

    // Prevent impossible date ranges in the enquiry drawer.
    const from = document.querySelector('input[name="from"]');
    const to = document.querySelector('input[name="to"]');
    if (from && to) {
      const today = new Date();
      const iso = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
      from.min = iso;
      to.min = iso;
      from.addEventListener('change', () => {
        to.min = from.value || iso;
        if (to.value && from.value && to.value < from.value) to.value = from.value;
      });
    }
  });
})();
