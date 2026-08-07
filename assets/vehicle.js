(() => {
  const data = BM.read();
  const id = new URLSearchParams(location.search).get('id') || data.cars[0]?.id;
  const car = data.cars.find(item => item.id === id && item.published) || data.cars.find(item => item.published);
  const root = document.querySelector('#vehicleRoot');
  if (!car || !root) return;

  document.title = `${car.brand} ${car.model} | B&M Exclusive Marbella`;
  const escapeHtml = BMUI?.escapeHtml || (value => String(value));
  const gallery = Array.isArray(car.gallery) && car.gallery.length ? car.gallery : [car.image, car.fallbackImage];

  root.innerHTML = `
    <section class="vehicle-hero premium-vehicle-hero">
      <img src="${escapeHtml(car.image)}" data-fallback="${escapeHtml(car.fallbackImage || 'assets/images/fleet.webp')}" alt="${escapeHtml(car.brand)} ${escapeHtml(car.model)}">
      <div class="vehicle-hero-frame" aria-hidden="true"></div>
      <a class="vehicle-back" href="fleet.html">← Volver a la colección</a>
      <div class="vehicle-hero-index" aria-hidden="true"><span>B&M Collection</span><strong>${String(data.cars.filter(item => item.published).findIndex(item => item.id === car.id) + 1).padStart(2, '0')}</strong></div>
      <div class="container vehicle-heading reveal is-visible">
        <p class="eyebrow">${escapeHtml(car.category)} · ${escapeHtml(car.year)} · Marbella</p>
        <h1>${escapeHtml(car.brand)}<span>${escapeHtml(car.model)}</span></h1>
        <div class="vehicle-subline"><span>${escapeHtml(car.power)}</span><span>${escapeHtml(car.acceleration)} · 0–100 km/h</span><span>${escapeHtml(car.location)}</span></div>
      </div>
      <div class="vehicle-hero-price"><small>Desde</small><strong>${BM.money(car.priceDay)}</strong><span>por día</span></div>
    </section>
    <section class="vehicle-section">
      <div class="container vehicle-layout">
        <article class="vehicle-copy">
          <div class="vehicle-intro-line"><span>01</span><small>Character & experience</small></div>
          <p class="eyebrow">Una elección excepcional</p>
          <h2>${escapeHtml(car.description)}</h2>
          <p>Cada vehículo se entrega revisado, detallado y preparado para la ocasión. Coordinamos hoteles, villas, aeropuertos, puertos, eventos y entregas especiales bajo petición.</p>
          <blockquote>“El coche adecuado no solo cambia el trayecto. Cambia cómo recuerdas el viaje.”</blockquote>
          <div class="spec-grid">
            <div class="spec"><small>Potencia</small><strong>${escapeHtml(car.power)}</strong></div>
            <div class="spec"><small>0–100 km/h</small><strong>${escapeHtml(car.acceleration)}</strong></div>
            <div class="spec"><small>Plazas</small><strong>${escapeHtml(car.seats)}</strong></div>
            <div class="spec"><small>Transmisión</small><strong>${escapeHtml(car.transmission)}</strong></div>
            <div class="spec"><small>Color</small><strong>${escapeHtml(car.color)}</strong></div>
            <div class="spec"><small>Depósito</small><strong>${BM.money(car.deposit)}</strong></div>
          </div>
          <div class="vehicle-intro-line"><span>02</span><small>The B&M standard</small></div>
          <p class="eyebrow">Incluido en tu reserva</p>
          <ul class="included-list">
            <li><span>01</span><div><h3>Entrega y recogida coordinadas</h3><p>En Marbella y principales ubicaciones de la Costa del Sol.</p></div></li>
            <li><span>02</span><div><h3>Asistencia dedicada</h3><p>Contacto directo durante todo el alquiler, sin intermediarios.</p></div></li>
            <li><span>03</span><div><h3>Preparación premium</h3><p>Revisión, limpieza y detailing antes de cada entrega.</p></div></li>
          </ul>
        </article>
        <aside class="booking-card premium-booking" id="booking">
          <div class="booking-number">Private enquiry · ${String(data.cars.filter(item => item.published).findIndex(item => item.id === car.id) + 1).padStart(2, '0')}</div>
          <p class="eyebrow">Consultar disponibilidad</p>
          <h2>${escapeHtml(car.brand)} ${escapeHtml(car.model)}</h2>
          <div class="booking-price">${BM.money(car.priceDay)} <small>/ día desde</small></div>
          ${car.offer?.active ? `<div class="offer-box"><strong>${escapeHtml(car.offer.label)}</strong>${BM.money(car.offer.price)} <s>${BM.money(car.offer.oldPrice)}</s></div>` : ''}
          <form class="quick-form" id="vehicleForm">
            <div class="date-row"><label><span>Desde</span><input type="date" name="start" required></label><label><span>Hasta</span><input type="date" name="end" required></label></div>
            <label><span>Nombre</span><input name="name" autocomplete="name" placeholder="Nombre y apellidos" required></label>
            <label><span>Teléfono</span><input name="phone" autocomplete="tel" placeholder="+34 ..." required></label>
            <button class="button button-gold" type="submit">Solicitar propuesta</button>
          </form>
          <div class="booking-assurance"><span>Respuesta personal</span><span>Sin cargo online</span><span>Condiciones claras</span></div>
          <div class="booking-note">Tarifa orientativa. La propuesta final depende de fechas, duración, kilometraje y lugar de entrega.</div>
        </aside>
      </div>
      <div class="container vehicle-gallery">
        ${gallery.slice(0,2).map((src, index) => `<img src="${escapeHtml(src)}" data-fallback="${escapeHtml(car.fallbackImage || car.image)}" alt="${escapeHtml(car.brand)} ${escapeHtml(car.model)}${index ? ', detalle' : ''}" loading="lazy">`).join('')}
      </div>
    </section>`;

  root.querySelectorAll('img[data-fallback]').forEach(img => img.addEventListener('error', () => { img.src = img.dataset.fallback; }, { once: true }));
  const start = root.querySelector('input[name="start"]');
  const end = root.querySelector('input[name="end"]');
  const today = new Date().toISOString().slice(0,10);
  [start,end].forEach(input => input.min = today);
  start.addEventListener('change', () => { end.min = start.value || today; if (end.value && end.value < end.min) end.value = end.min; });

  root.querySelector('#vehicleForm').addEventListener('submit', event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = `Hola B&M Exclusive. Quiero consultar el ${car.brand} ${car.model} del ${form.get('start')} al ${form.get('end')}. Mi nombre es ${form.get('name')} y mi teléfono es ${form.get('phone')}.`;
    window.open(`https://wa.me/${data.business.whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  });
})();
