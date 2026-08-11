/* Mfinity precision layer: cleaner hero, restrained motion and reliable catalog media */
(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Hide the moving word strip immediately: the site should feel editorial, not promotional.
  const precisionStyle = document.createElement('style');
  precisionStyle.textContent = `
    .brand-strip{display:none!important}
    .hero-media img{transform:none!important;will-change:auto!important}
  `;
  document.head.appendChild(precisionStyle);

  // Load the shared real-catalog system on the homepage as well as on dedicated routes.
  const catalogScript = document.createElement('script');
  catalogScript.src = '/assets/catalog-system.js';
  catalogScript.async = true;
  catalogScript.addEventListener('load', () => {
    const mediaScript = document.createElement('script');
    mediaScript.src = '/assets/media-fix.js';
    mediaScript.async = true;
    document.head.appendChild(mediaScript);
  });
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
    // Remove it from the DOM too, so it does not occupy space or remain accessible to animation code.
    document.querySelector('.brand-strip')?.remove();

    const heroImage = document.querySelector('.hero-media img');
    if (heroImage) {
      const originalMfinityHero = 'https://mfinity.es/wp-content/uploads/2024/04/Ferrari-488-Spyder%E2%80%8B-front-768x576.jpg';
      const sharpHero = 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=2400&dpr=1';
      heroImage.src = sharpHero;
      heroImage.removeAttribute('srcset');
      heroImage.removeAttribute('sizes');
      heroImage.fetchPriority = 'high';
      heroImage.decoding = 'async';
      heroImage.style.objectPosition = 'center center';
      heroImage.style.transform = 'none';
      heroImage.onerror = () => {
        if (heroImage.src !== originalMfinityHero) {
          heroImage.onerror = null;
          heroImage.src = originalMfinityHero;
        }
      };
    }

    // Use Mfinity's Mercedes-AMG G63 in the Marbella lifestyle section.
    const marbellaImage = document.querySelector('.marbella-image img');
    if (marbellaImage) {
      marbellaImage.src = 'https://mfinity.es/wp-content/uploads/2024/09/u3446499754_Mercedes_gelik_g63_2022_blac_front_in_marbellasho_50e7cc59-3823-493b-8f40-b1882b1ec00d_2-768x768.png';
      marbellaImage.alt = 'Mercedes-AMG G63 by Mfinity in Marbella';
      marbellaImage.removeAttribute('srcset');
      marbellaImage.style.objectPosition = 'center center';
    }

    // Keep movement in the product stage only; the hero itself stays optically crisp and still.
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

    if (prefersReduced) document.documentElement.classList.add('reduced-motion');
  });
})();
