(() => {
  const data = BM.read();
  const loader = document.querySelector('[data-page-loader]');
  const dismissLoader = () => {
    document.body.classList.remove('is-loading');
    loader?.classList.add('is-hidden');
    window.setTimeout(() => loader?.remove(), 900);
  };
  if (loader) {
    window.addEventListener('load', () => window.setTimeout(dismissLoader, 380), { once: true });
    window.setTimeout(dismissLoader, 1800);
  }

  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-button]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');

  const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  })[char]);

  const statusText = {
    available: 'Disponible',
    reserved: 'Reservado',
    maintenance: 'En preparación'
  };

  const vehicleCard = (car, index = 0) => `
    <a class="vehicle-card reveal card-position-${index + 1}" href="vehicle.html?id=${encodeURIComponent(car.id)}" style="transition-delay:${Math.min(index * 65, 260)}ms">
      <img src="${escapeHtml(car.image)}" data-fallback="${escapeHtml(car.fallbackImage || 'assets/images/fleet.webp')}" alt="${escapeHtml(car.brand)} ${escapeHtml(car.model)}" loading="lazy">
      <div class="card-tags">
        <span class="card-tag">${escapeHtml(car.category)}</span>
        ${car.offer?.active ? '<span class="card-tag offer">Oferta activa</span>' : ''}
      </div>
      <span class="card-view">Descubrir <i>↗</i></span>
      <div class="card-content">
        <div class="card-index">Collection ${String(index + 1).padStart(2, '0')}</div>
        <div class="card-brand">${escapeHtml(car.brand)}</div>
        <div class="card-model">${escapeHtml(car.model)}</div>
        <div class="card-bottom">
          <div>
            <div class="card-specs"><span>${escapeHtml(car.power)}</span><span>${escapeHtml(car.seats)} plazas</span><span>0–100 · ${escapeHtml(car.acceleration)}</span></div>
            <span class="card-status ${escapeHtml(car.status)}">${statusText[car.status] || 'Consultar'}</span>
          </div>
          <div class="card-price"><small>desde</small>${BM.money(car.priceDay)}<small>por día</small></div>
        </div>
      </div>
      <span class="card-number">${String(index + 1).padStart(2, '0')}</span>
    </a>`;

  window.BMUI = { escapeHtml, vehicleCard, statusText };

  const progress = document.querySelector('[data-scroll-progress]');
  const updateHeader = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 28);
    if (progress) {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      progress.style.width = `${Math.min((window.scrollY / max) * 100, 100)}%`;
    }
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (menuButton && mobileMenu) {
    const closeMenu = () => {
      menuButton.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    };
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!open));
      mobileMenu.classList.toggle('is-open', !open);
      document.body.classList.toggle('menu-open', !open);
    });
    mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => { if (window.innerWidth > 860) closeMenu(); });
  }

  const bindFallbacks = root => {
    root.querySelectorAll('img[data-fallback]').forEach(img => {
      img.addEventListener('error', () => {
        const fallback = img.dataset.fallback;
        if (fallback && !img.src.endsWith(fallback)) img.src = fallback;
      }, { once: true });
    });
  };

  const featured = document.querySelector('#featuredFleet');
  if (featured) {
    const allFeatured = data.cars.filter(car => car.featured && car.published);
    const count = document.querySelector('[data-feature-count]');
    const buttons = [...document.querySelectorAll('[data-feature-filter]')];
    const renderFeatured = filter => {
      const cars = (filter === 'all' ? allFeatured : allFeatured.filter(car => car.category === filter)).slice(0, 6);
      featured.classList.add('is-changing');
      window.setTimeout(() => {
        featured.dataset.count = String(cars.length);
        featured.innerHTML = cars.map(vehicleCard).join('');
        bindFallbacks(featured);
        featured.querySelectorAll('.reveal').forEach(element => element.classList.add('is-visible'));
        featured.classList.remove('is-changing');
        if (count) count.textContent = String(cars.length).padStart(2, '0');
      }, 180);
    };
    renderFeatured('all');
    buttons.forEach(button => button.addEventListener('click', () => {
      buttons.forEach(item => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      renderFeatured(button.dataset.featureFilter || 'all');
    }));
  }

  const quoteCar = document.querySelector('#quoteCar');
  if (quoteCar) {
    quoteCar.innerHTML = data.cars.filter(car => car.published).map(car =>
      `<option>${escapeHtml(car.brand)} ${escapeHtml(car.model)}</option>`
    ).join('') + '<option>Quiero una recomendación</option>';
  }

  const today = new Date();
  const isoToday = today.toISOString().slice(0, 10);
  document.querySelectorAll('input[type="date"]').forEach(input => input.min = isoToday);
  document.querySelectorAll('input[name="start"]').forEach(start => {
    start.addEventListener('change', () => {
      const form = start.closest('form');
      const end = form?.querySelector('input[name="end"]');
      if (!end) return;
      end.min = start.value || isoToday;
      if (end.value && end.value < end.min) end.value = end.min;
    });
  });

  const quoteForm = document.querySelector('#quickQuote');
  if (quoteForm) {
    quoteForm.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(quoteForm);
      const message = [
        'Hola B&M Exclusive.',
        `Quiero consultar disponibilidad para ${formData.get('car')}.`,
        `Fechas: ${formData.get('start')} a ${formData.get('end')}.`,
        `Nombre: ${formData.get('name')}.`
      ].join(' ');
      window.open(`https://wa.me/${data.business.whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
    });
  }

  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    revealElements.forEach(element => observer.observe(element));
  } else {
    revealElements.forEach(element => element.classList.add('is-visible'));
  }

  const heroMedia = document.querySelector('.hero-v5 .hero-media');
  if (heroMedia && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', () => {
      const offset = Math.min(window.scrollY * 0.055, 34);
      heroMedia.style.transform = `scale(1.03) translate3d(0, ${offset}px, 0)`;
    }, { passive: true });
  }

  const cookieBanner = document.querySelector('[data-cookie-banner]');
  const cookieAccept = document.querySelector('[data-cookie-accept]');
  if (cookieBanner && !localStorage.getItem('bm-cookie-choice')) cookieBanner.hidden = false;
  cookieAccept?.addEventListener('click', () => {
    localStorage.setItem('bm-cookie-choice', 'technical');
    cookieBanner.hidden = true;
  });
})();
