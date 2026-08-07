(() => {
  let data = BM.read();
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const statusText = { available: 'Disponible', reserved: 'Reservado', maintenance: 'Mantenimiento' };

  const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  const toast = message => {
    const node = $('#toast');
    node.textContent = message;
    node.classList.add('show');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => node.classList.remove('show'), 1900);
  };
  const save = (message = 'Cambios guardados') => { BM.write(data); render(); toast(message); };

  const date = new Intl.DateTimeFormat('es-ES', { weekday:'long', day:'numeric', month:'long' }).format(new Date());
  $('#adminDate').textContent = date.charAt(0).toUpperCase() + date.slice(1);

  const showView = id => {
    $$('.view').forEach(view => view.classList.toggle('active', view.id === id));
    $$('[data-view]').forEach(link => link.classList.toggle('active', link.dataset.view === id));
    render();
  };
  $$('[data-view]').forEach(link => link.addEventListener('click', () => showView(link.dataset.view)));
  $$('[data-view-go]').forEach(link => link.addEventListener('click', () => showView(link.dataset.viewGo)));

  const statusClass = status => ['reserved','maintenance'].includes(status) ? status : '';
  const row = car => `
    <tr>
      <td><div class="vehicle-cell"><img src="${escapeHtml(car.image)}" data-fallback="${escapeHtml(car.fallbackImage || 'assets/images/fleet.webp')}" alt=""><div><b>${escapeHtml(car.brand)} ${escapeHtml(car.model)}</b><small>${escapeHtml(car.category)} · ${escapeHtml(car.year)}</small></div></div></td>
      <td><span class="status ${statusClass(car.status)}">${statusText[car.status] || 'Consultar'}</span></td>
      <td>${BM.money(car.priceDay)}/día</td>
      <td>${car.offer?.active ? `<span class="offer-tag">${BM.money(car.offer.price)}</span>` : '—'}</td>
      <td>${car.published ? 'Publicada' : 'Borrador'}</td>
    </tr>`;

  const manageCard = car => `
    <article class="manage-card" data-card-text="${escapeHtml(`${car.brand} ${car.model}`.toLowerCase())}">
      <img src="${escapeHtml(car.image)}" data-fallback="${escapeHtml(car.fallbackImage || 'assets/images/fleet.webp')}" alt="${escapeHtml(car.brand)} ${escapeHtml(car.model)}">
      <div class="manage-body"><small>${escapeHtml(car.brand)}</small><h3>${escapeHtml(car.model)}</h3>
        <div class="manage-row"><span>Estado</span><b>${statusText[car.status] || car.status}</b></div>
        <div class="manage-row"><span>Tarifa</span><b>${BM.money(car.priceDay)}/día</b></div>
        <div class="manage-row"><span>Web</span><b>${car.published ? 'Publicada' : 'Oculta'}</b></div>
        <div class="manage-actions"><button type="button" data-edit="${escapeHtml(car.id)}">Editar</button><button type="button" data-toggle="${escapeHtml(car.id)}">${car.published ? 'Ocultar' : 'Publicar'}</button></div>
      </div>
    </article>`;

  function bindImageFallbacks() {
    $$('img[data-fallback]').forEach(img => img.addEventListener('error', () => { img.src = img.dataset.fallback; }, { once: true }));
  }

  function render() {
    $('#leadCount').textContent = data.leads.length;
    $('#dashboardFleet').innerHTML = data.cars.slice(0, 6).map(row).join('');
    $('#priorityLeads').innerHTML = data.leads.slice(0, 4).map(lead => `
      <div class="priority-item"><div class="priority-avatar">${escapeHtml(lead.name.split(' ').map(part => part[0]).join('').slice(0,2))}</div><div><b>${escapeHtml(lead.name)}</b><small>${escapeHtml(lead.car)} · ${escapeHtml(lead.dates)}</small></div><div class="priority-value"><strong>${BM.money(lead.value)}</strong><span>${escapeHtml(lead.status)}</span></div></div>`).join('');
    $('#fleetCards').innerHTML = data.cars.map(manageCard).join('');
    const offers = data.cars.filter(car => car.offer?.active);
    $('#offerCards').innerHTML = offers.length ? offers.map(car => `
      <article class="manage-card"><img src="${escapeHtml(car.image)}" data-fallback="${escapeHtml(car.fallbackImage || 'assets/images/fleet.webp')}" alt="${escapeHtml(car.brand)} ${escapeHtml(car.model)}"><div class="manage-body"><small>${escapeHtml(car.offer.label || 'Oferta especial')}</small><h3>${escapeHtml(car.brand)} ${escapeHtml(car.model)}</h3><div class="manage-row"><span>Precio actual</span><b>${BM.money(car.offer.price)}</b></div><div class="manage-row"><span>Precio anterior</span><b><s>${BM.money(car.offer.oldPrice || car.priceDay * 3)}</s></b></div><div class="manage-row"><span>Finaliza</span><b>${escapeHtml(car.offer.expires || 'Sin fecha')}</b></div><div class="manage-actions"><button type="button" data-edit="${escapeHtml(car.id)}">Editar</button><button type="button" data-offer-off="${escapeHtml(car.id)}">Desactivar</button></div></div></article>`).join('') : '<p style="color:var(--muted)">No hay ofertas activas.</p>';
    $('#leadTable').innerHTML = data.leads.map(lead => `<tr><td><b>${escapeHtml(lead.name)}</b><br><small style="color:var(--muted)">${escapeHtml(lead.contact)}</small></td><td>${escapeHtml(lead.car)}</td><td>${escapeHtml(lead.dates)}</td><td>${escapeHtml(lead.source)}</td><td><span class="offer-tag">${escapeHtml(lead.status)}</span></td><td>${BM.money(lead.value)}</td></tr>`).join('');
    $('#bookingTable').innerHTML = data.bookings.map(booking => `<tr><td>${escapeHtml(booking.id)}</td><td>${escapeHtml(booking.client)}</td><td>${escapeHtml(booking.car)}</td><td>${escapeHtml(booking.start)}</td><td>${escapeHtml(booking.end)}</td><td><span class="status ${booking.status === 'active' ? 'reserved' : ''}">${escapeHtml(booking.status)}</span></td><td>${BM.money(booking.total)}</td></tr>`).join('');
    Object.entries(data.business).forEach(([key, value]) => { if ($('#settingsForm')?.elements[key] && typeof value !== 'object') $('#settingsForm').elements[key].value = value; });
    bindDynamicEvents(); bindImageFallbacks();
  }

  const modal = $('#carModal');
  const form = $('#carForm');
  const openModal = car => {
    form.reset();
    $('#modalTitle').textContent = car ? 'Editar vehículo' : 'Nuevo vehículo';
    if (car) {
      ['id','brand','model','category','year','priceDay','status','image','power','seats','description'].forEach(key => { if (form.elements[key]) form.elements[key].value = car[key] ?? ''; });
      form.elements.offerActive.value = String(Boolean(car.offer?.active));
      form.elements.offerPrice.value = car.offer?.price || '';
    }
    modal.hidden = false;
    form.elements.brand.focus();
  };
  const closeModal = () => { modal.hidden = true; };
  $$('[data-new-car]').forEach(button => button.addEventListener('click', () => openModal()));
  $$('[data-close]').forEach(button => button.addEventListener('click', closeModal));
  modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !modal.hidden) closeModal(); });

  function bindDynamicEvents() {
    $$('[data-edit]').forEach(button => button.addEventListener('click', () => openModal(data.cars.find(car => car.id === button.dataset.edit))));
    $$('[data-toggle]').forEach(button => button.addEventListener('click', () => {
      const car = data.cars.find(item => item.id === button.dataset.toggle); if (!car) return; car.published = !car.published; save(car.published ? 'Vehículo publicado' : 'Vehículo ocultado');
    }));
    $$('[data-offer-off]').forEach(button => button.addEventListener('click', () => {
      const car = data.cars.find(item => item.id === button.dataset.offerOff); if (!car?.offer) return; car.offer.active = false; save('Oferta desactivada');
    }));
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(form));
    let car = data.cars.find(item => item.id === values.id);
    if (!car) {
      const id = `${values.brand}-${values.model}`.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
      car = { id, featured:false, published:true, gallery:[], offer:{}, location:'Marbella · España', transmission:'Automático', acceleration:'—', deposit:5000, color:'A confirmar', fallbackImage:'assets/images/fleet.webp' };
      data.cars.unshift(car);
    }
    Object.assign(car, { brand:values.brand.trim(), model:values.model.trim(), category:values.category, year:Number(values.year), priceDay:Number(values.priceDay), status:values.status, image:values.image.trim() || 'assets/images/fleet.webp', power:values.power.trim() || '—', seats:Number(values.seats), description:values.description.trim() || 'Descripción pendiente de completar.' });
    car.offer = { ...(car.offer || {}), active:values.offerActive === 'true', price:Number(values.offerPrice) || 0, label:car.offer?.label || 'Oferta especial' };
    BM.write(data); closeModal(); render(); toast('Vehículo guardado');
  });

  $('#resetDemo').addEventListener('click', () => { data = BM.reset(); render(); toast('Datos de demostración restablecidos'); });
  $('#fleetSearch').addEventListener('input', event => {
    const query = event.target.value.trim().toLowerCase();
    $$('#fleetCards .manage-card').forEach(card => { card.hidden = !card.dataset.cardText.includes(query); });
  });
  $('#settingsForm').addEventListener('submit', event => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    data.business = { ...data.business, ...values };
    save('Ajustes guardados');
  });

  const downloadCsv = (name, rows) => {
    const csv = rows.map(row => row.map(value => `"${String(value ?? '').replace(/"/g,'""')}"`).join(',')).join('\n');
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([csv], { type:'text/csv;charset=utf-8' }));
    link.download = name; link.click(); URL.revokeObjectURL(link.href);
  };
  $('#exportFleet').addEventListener('click', () => downloadCsv('bm-flota.csv', [['Marca','Modelo','Categoría','Año','Estado','Precio/día'], ...data.cars.map(car => [car.brand,car.model,car.category,car.year,car.status,car.priceDay])]));
  $('#exportLeads').addEventListener('click', () => downloadCsv('bm-solicitudes.csv', [['Cliente','Contacto','Vehículo','Fechas','Origen','Estado','Valor'], ...data.leads.map(lead => [lead.name,lead.contact,lead.car,lead.dates,lead.source,lead.status,lead.value])]));

  render();
})();
