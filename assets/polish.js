/* Mfinity precision layer: verified brand assets + restrained premium motion */
(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Load the shared real-catalog system on the homepage as well as on dedicated routes.
  const catalogScript = document.createElement('script');
  catalogScript.src = '/assets/catalog-system.js';
  catalogScript.async = true;
  document.head.appendChild(catalogScript);

  // Enforce the final-site rules everywhere: internal Mfinity navigation only and no decorative glyphs.
  const officialScript = document.createElement('script');
  officialScript.src = '/assets/official-site.js';
  officialScript.async = true;
  document.head.appendChild(officialScript);

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

    // Use Mfinity's Audi R8 in the Marbella lifestyle section.
    const marbellaImage = document.querySelector('.marbella-image img');
    if (marbellaImage) {
      marbellaImage.src = 'https://mfinity.es/wp-content/uploads/2024/04/audi-r8-marbella-rental-main-768x576.jpg';
      marbellaImage.alt = 'Audi R8 by Mfinity in Marbella';
      marbellaImage.removeAttribute('srcset');
      marbellaImage.style.objectPosition = 'center center';
    }

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
