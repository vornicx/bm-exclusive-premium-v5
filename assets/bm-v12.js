(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const body = document.body;
  const header = $('[data-header]');
  const scrollLine = $('[data-scroll-line]');
  const mobileNav = $('[data-mobile-nav]');
  const menuOpen = $('[data-menu-open]');
  const menuClose = $('[data-menu-close]');
  const drawer = $('[data-drawer]');
  const drawerClose = $('[data-drawer-close]');
  const drawerBackdrop = $('[data-drawer-backdrop]');
  const form = $('[data-enquiry-form]');
  const carSelect = $('[data-car-select]');
  let lang = localStorage.getItem('bm-lang') || 'es';
  let lastFocus = null;
  let menuLastFocus = null;

  const copy = {
    es: {
      navCollection:'Colección',navService:'Servicio',navMarbella:'Marbella',navProcess:'Cómo funciona',navContact:'Contacto',menu:'Menú',close:'Cerrar',privateEnquiry:'Consulta privada',fleetPage:'Selección completa',
      heroKicker:'B&M Exclusive · Marbella',heroTitle:'Marbella.<br>A tu manera.',heroLead:'Superdeportivos, gran turismo y SUV de lujo con atención directa y entrega coordinada alrededor de tu plan.',heroPrimary:'Consultar disponibilidad',heroSecondary:'Explorar selección',heroPoint1:'Selección cuidada',heroPoint1p:'Ferrari, Lamborghini y otras categorías premium bajo disponibilidad.',heroPoint2:'Entrega coordinada',heroPoint2p:'Hotel, villa, aeropuerto o ubicación acordada.',heroPoint3:'Trato directo',heroPoint3p:'Una persona, una propuesta clara y confirmación personalizada.',scroll:'Descubrir',
      rail1:'Marbella · Costa del Sol',rail2:'Ferrari · Lamborghini',rail3:'Entrega bajo petición',rail4:'Atención directa',
      manifestoKicker:'Private mobility',manifestoAside:'Un alquiler premium no debería sentirse como un proceso administrativo.',manifestoTitle:'No alquilamos una categoría.<br><span>Organizamos el coche alrededor de tu plan.</span>',manifesto1:'Criterio',manifesto1p:'Menos ruido, mejor selección.',manifesto2:'Coordinación',manifesto2p:'El vehículo llega donde tiene sentido.',manifesto3:'Claridad',manifesto3p:'Disponibilidad y condiciones antes de confirmar.',
      collectionKicker:'Selección',collectionTitle:'Elige el carácter.<br>Nosotros cerramos los detalles.',collectionIntro:'Una selección visual para orientar la consulta. El vehículo concreto, la configuración, disponibilidad y condiciones se confirman personalmente antes de reservar.',carFerrari:'Gran turismo y superdeportivos para una experiencia más emocional y refinada.',carLambo:'Presencia, respuesta inmediata y una llegada que no busca pasar desapercibida.',carPorsche:'Prestaciones con precisión y versatilidad para ciudad, costa y carretera.',collectionAsk:'¿Buscas Mercedes-AMG, SUV o un modelo concreto?',collectionCTA:'Pedir recomendación',collectionDisclaimer:'Imágenes de referencia de categoría. No representan necesariamente una unidad disponible de B&M.',
      serviceKicker:'El servicio',serviceTitle:'La diferencia está en lo que no tienes que resolver tú.',serviceIntro:'B&M plantea la reserva como un servicio privado: menos fricción, más coordinación y un único punto de contacto.',service1:'Hotel, villa y aeropuerto',service1p:'Entrega y recogida coordinadas en la ubicación acordada, según disponibilidad y condiciones.',service2:'Eventos y ocasiones',service2p:'Una solución de movilidad para celebraciones, producciones, eventos y llegadas especiales.',service3:'Estancias largas',service3p:'Opciones para necesidades de movilidad durante una estancia prolongada en Marbella o la Costa del Sol.',service4:'Recomendación personal',service4p:'Si no tienes un modelo decidido, la selección parte de tu ocasión, recorrido y preferencias.',
      marbellaKicker:'Marbella · Costa del Sol',marbellaTitle:'El coche forma parte del plan.<br>No debería interrumpirlo.',marbellaText:'Puerto Banús, Nueva Andalucía, la Golden Mile, una villa, una cena o una ruta por la costa. La experiencia empieza cuando el vehículo encaja con el momento y la logística desaparece.',marbellaCTA:'Organizar mi reserva',
      processKicker:'Proceso',processTitle:'Tres pasos.<br>Sin rodeos.',processLead:'La web no intenta convertir una reserva premium en un checkout genérico. Recoge lo esencial y deja la confirmación final en manos de una persona.',step1:'Cuéntanos el plan',step1p:'Fechas, ubicación, ocasión y el tipo de coche que tienes en mente.',step2:'Recibe una propuesta clara',step2p:'B&M confirma vehículo, disponibilidad, precio, depósito, kilometraje y condiciones.',step3:'Coordina la entrega',step3p:'Una vez confirmado, se organiza la entrega y recogida según el acuerdo.',
      faqKicker:'Preguntas frecuentes',faqTitle:'Lo importante,<br>antes de reservar.',faq1q:'¿La consulta desde la web confirma una reserva?',faq1a:'No. La solicitud inicia una conversación con B&M. La reserva solo queda confirmada cuando se valida disponibilidad, condiciones y aceptación por ambas partes.',faq2q:'¿Puedo pedir un modelo que no aparezca en la web?',faq2a:'Sí. La selección mostrada sirve como orientación. Puedes indicar una marca, categoría o modelo concreto y B&M te confirmará qué opciones puede ofrecer.',faq3q:'¿Se puede coordinar la entrega en hotel, villa o aeropuerto?',faq3a:'Puede solicitarse entrega o recogida en una ubicación acordada. La viabilidad, coste y condiciones se confirman individualmente.',faq4q:'¿Dónde opera B&M?',faq4a:'B&M está ubicada en Marbella y atiende consultas para Marbella, Costa del Sol y otros destinos bajo petición.',
      contactKicker:'Consulta privada',contactTitle:'Dinos dónde vas.<br>Encontramos qué encaja.',contactText:'Comparte fechas, ubicación y el tipo de coche que buscas. La conversación continúa directamente por WhatsApp con B&M.',contactCTA:'Empezar consulta',footerTag:'Luxury car rental & private mobility.<br>Marbella · Costa del Sol.',footerExplore:'Explorar',footerService:'Servicio',footerContact:'Contacto',legal:'Aviso legal',
      drawerKicker:'B&M Exclusive · Marbella',drawerTitle:'Consulta privada',drawerLead:'Completa solo lo esencial. Prepararemos el mensaje y continuarás directamente con B&M por WhatsApp.',fieldCar:'Preferencia',fieldFrom:'Desde',fieldTo:'Hasta',fieldDelivery:'Lugar de entrega',fieldName:'Nombre',fieldNotes:'Notas opcionales',send:'Continuar por WhatsApp',formNote:'No se realiza ningún cargo online. B&M confirma disponibilidad y condiciones personalmente.',recommend:'Quiero una recomendación',deliveryPlaceholder:'Hotel, villa, aeropuerto...',notesPlaceholder:'Ocasión, preferencias, horario...',mobileCTA:'Consultar disponibilidad',
      fleetKicker:'Selección de referencia',fleetTitle:'Empieza por cómo quieres conducir.',fleetLead:'Explora categorías y marcas para orientar la consulta. La disponibilidad real y las condiciones se confirman directamente con B&M.',fleetIntro:'La colección pública es una guía visual, no un inventario en tiempo real.',fleetCard1:'Gran turismo y superdeportivos con una experiencia intensa y refinada.',fleetCard2:'Diseño radical, sonido y presencia para una experiencia sin discreción.',fleetCard3:'Precisión, prestaciones y una versatilidad excepcional en carretera.',fleetCard4:'SUV y gran turismo para combinar presencia, confort y uso diario.',fleetAskTitle:'¿No ves lo que buscas?',fleetAskText:'Dinos el modelo, categoría o tipo de experiencia. B&M confirmará qué puede ofrecer para tus fechas.',fleetAskCTA:'Pedir una propuesta',
      legalKicker:'Información legal',legalTitle:'Aviso legal',legalWarning:'Documento provisional. Antes de publicar la web deben incorporarse la razón social, NIF, domicilio y datos registrales reales del titular.',legal1:'1. Titular del sitio',legal1p:'Este sitio web presenta los servicios de B&M Exclusive Marbella. Los datos identificativos completos del titular deberán ser facilitados y validados por el negocio antes de la publicación definitiva.',legal2:'2. Objeto',legal2p:'La web ofrece información comercial sobre alquiler de vehículos de lujo y permite solicitar propuestas de disponibilidad. Las solicitudes no constituyen una reserva ni un contrato hasta que sean confirmadas expresamente por B&M Exclusive.',legal3:'3. Propiedad intelectual',legal3p:'Los textos, identidad visual, fotografías y elementos gráficos pertenecen a sus respectivos titulares. No se autoriza su reproducción sin permiso.',legal4:'4. Responsabilidad',legal4p:'La disponibilidad, tarifas, características y condiciones de los vehículos deben confirmarse en la propuesta individual enviada al cliente.',backHome:'Volver al inicio'
    },
    en: {
      navCollection:'Collection',navService:'Service',navMarbella:'Marbella',navProcess:'How it works',navContact:'Contact',menu:'Menu',close:'Close',privateEnquiry:'Private enquiry',fleetPage:'Full selection',
      heroKicker:'B&M Exclusive · Marbella',heroTitle:'Marbella.<br>On your terms.',heroLead:'Supercars, grand tourers and luxury SUVs with direct service and delivery coordinated around your plans.',heroPrimary:'Check availability',heroSecondary:'Explore selection',heroPoint1:'Curated selection',heroPoint1p:'Ferrari, Lamborghini and other premium categories subject to availability.',heroPoint2:'Coordinated delivery',heroPoint2p:'Hotel, villa, airport or agreed location.',heroPoint3:'Direct service',heroPoint3p:'One person, a clear proposal and personal confirmation.',scroll:'Discover',
      rail1:'Marbella · Costa del Sol',rail2:'Ferrari · Lamborghini',rail3:'Delivery on request',rail4:'Direct service',
      manifestoKicker:'Private mobility',manifestoAside:'A premium rental should not feel like an administrative process.',manifestoTitle:'We do not rent a category.<br><span>We arrange the car around your plans.</span>',manifesto1:'Judgement',manifesto1p:'Less noise, a better selection.',manifesto2:'Coordination',manifesto2p:'The vehicle arrives where it makes sense.',manifesto3:'Clarity',manifesto3p:'Availability and terms before confirmation.',
      collectionKicker:'Selection',collectionTitle:'Choose the character.<br>We close the details.',collectionIntro:'A visual selection to guide your enquiry. The specific vehicle, configuration, availability and terms are confirmed personally before booking.',carFerrari:'Grand tourers and supercars for a more emotional, refined experience.',carLambo:'Presence, immediate response and an arrival that is not designed to go unnoticed.',carPorsche:'Performance with precision and versatility for city, coast and road.',collectionAsk:'Looking for Mercedes-AMG, an SUV or a specific model?',collectionCTA:'Ask for a recommendation',collectionDisclaimer:'Category reference images. They do not necessarily represent a B&M vehicle currently available.',
      serviceKicker:'The service',serviceTitle:'The difference is in what you do not have to solve yourself.',serviceIntro:'B&M approaches the booking as a private service: less friction, more coordination and one point of contact.',service1:'Hotel, villa & airport',service1p:'Delivery and collection coordinated at the agreed location, subject to availability and terms.',service2:'Events & occasions',service2p:'A mobility solution for celebrations, productions, events and special arrivals.',service3:'Extended stays',service3p:'Options for mobility needs during a longer stay in Marbella or the Costa del Sol.',service4:'Personal recommendation',service4p:'If you have not chosen a model, the selection starts from your occasion, route and preferences.',
      marbellaKicker:'Marbella · Costa del Sol',marbellaTitle:'The car is part of the plan.<br>It should not interrupt it.',marbellaText:'Puerto Banús, Nueva Andalucía, the Golden Mile, a villa, dinner or a drive along the coast. The experience starts when the vehicle fits the moment and the logistics disappear.',marbellaCTA:'Arrange my booking',
      processKicker:'Process',processTitle:'Three steps.<br>No detours.',processLead:'The site does not try to turn a premium booking into a generic checkout. It collects the essentials and keeps final confirmation in the hands of a person.',step1:'Tell us the plan',step1p:'Dates, location, occasion and the type of car you have in mind.',step2:'Receive a clear proposal',step2p:'B&M confirms vehicle, availability, price, deposit, mileage and terms.',step3:'Coordinate delivery',step3p:'Once confirmed, delivery and collection are arranged according to the agreement.',
      faqKicker:'Frequently asked',faqTitle:'What matters,<br>before booking.',faq1q:'Does an enquiry through the website confirm a booking?',faq1a:'No. The request starts a conversation with B&M. The booking is only confirmed once availability, terms and acceptance by both parties have been validated.',faq2q:'Can I request a model that is not shown on the website?',faq2a:'Yes. The selection shown is a guide. You can name a brand, category or specific model and B&M will confirm what options it can offer.',faq3q:'Can delivery be coordinated to a hotel, villa or airport?',faq3a:'Delivery or collection at an agreed location can be requested. Feasibility, cost and conditions are confirmed individually.',faq4q:'Where does B&M operate?',faq4a:'B&M is based in Marbella and handles enquiries for Marbella, the Costa del Sol and other destinations on request.',
      contactKicker:'Private enquiry',contactTitle:'Tell us where you are going.<br>We find what fits.',contactText:'Share your dates, location and the kind of car you want. The conversation continues directly with B&M on WhatsApp.',contactCTA:'Start enquiry',footerTag:'Luxury car rental & private mobility.<br>Marbella · Costa del Sol.',footerExplore:'Explore',footerService:'Service',footerContact:'Contact',legal:'Legal notice',
      drawerKicker:'B&M Exclusive · Marbella',drawerTitle:'Private enquiry',drawerLead:'Share only the essentials. We will prepare the message and you can continue directly with B&M on WhatsApp.',fieldCar:'Preference',fieldFrom:'From',fieldTo:'To',fieldDelivery:'Delivery location',fieldName:'Name',fieldNotes:'Optional notes',send:'Continue on WhatsApp',formNote:'No online payment is taken. B&M personally confirms availability and terms.',recommend:'I want a recommendation',deliveryPlaceholder:'Hotel, villa, airport...',notesPlaceholder:'Occasion, preferences, timing...',mobileCTA:'Check availability',
      fleetKicker:'Reference selection',fleetTitle:'Start with how you want to drive.',fleetLead:'Explore categories and brands to guide your enquiry. Real availability and terms are confirmed directly with B&M.',fleetIntro:'The public collection is a visual guide, not a real-time inventory.',fleetCard1:'Grand tourers and supercars with an intense, refined experience.',fleetCard2:'Radical design, sound and presence for an experience without discretion.',fleetCard3:'Precision, performance and exceptional road versatility.',fleetCard4:'SUV and grand touring options combining presence, comfort and daily usability.',fleetAskTitle:'Do not see what you want?',fleetAskText:'Tell us the model, category or kind of experience. B&M will confirm what it can offer for your dates.',fleetAskCTA:'Request a proposal',
      legalKicker:'Legal information',legalTitle:'Legal notice',legalWarning:'Provisional document. Before publication, the holder’s legal name, tax ID, registered address and registry information must be added.',legal1:'1. Website owner',legal1p:'This website presents the services of B&M Exclusive Marbella. The full identification details of the holder must be supplied and validated by the business before final publication.',legal2:'2. Purpose',legal2p:'The website provides commercial information about luxury vehicle rental and allows users to request availability proposals. Requests do not constitute a booking or contract until expressly confirmed by B&M Exclusive.',legal3:'3. Intellectual property',legal3p:'Texts, visual identity, photographs and graphic elements belong to their respective owners. Reproduction is not authorised without permission.',legal4:'4. Liability',legal4p:'Vehicle availability, rates, specifications and terms must be confirmed in the individual proposal sent to the client.',backHome:'Back to home'
    }
  };

  const fleetCopy = {
    es:{ferrari:{category:'Gran turismo / Supercar',specs:['Emocional','2 plazas','Marbella']},lamborghini:{category:'Supercar',specs:['Presencia','2 plazas','Costa del Sol']},porsche:{category:'Performance',specs:['Precisión','2–4 plazas','Costa del Sol']}},
    en:{ferrari:{category:'Grand tourer / Supercar',specs:['Emotional','2 seats','Marbella']},lamborghini:{category:'Supercar',specs:['Presence','2 seats','Costa del Sol']},porsche:{category:'Performance',specs:['Precision','2–4 seats','Costa del Sol']}}
  };

  const focusables = root => root ? $$('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])', root).filter(el => !el.hidden) : [];
  const localToday = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2,'0');
    const d = String(now.getDate()).padStart(2,'0');
    return `${y}-${m}-${d}`;
  };

  function applyLang(next){
    lang = next === 'en' ? 'en' : 'es';
    localStorage.setItem('bm-lang', lang);
    document.documentElement.lang = lang;
    $$('[data-lang]').forEach(button => button.classList.toggle('is-active', button.dataset.lang === lang));
    $$('[data-t]').forEach(el => { const value = copy[lang][el.dataset.t]; if(value) el.textContent = value; });
    $$('[data-th]').forEach(el => { const value = copy[lang][el.dataset.th]; if(value) el.innerHTML = value; });
    const delivery = $('[name="delivery"]', form);
    const notes = $('[name="notes"]', form);
    if(delivery) delivery.placeholder = copy[lang].deliveryPlaceholder;
    if(notes) notes.placeholder = copy[lang].notesPlaceholder;
    $$('[data-car-card]').forEach(card => card.setAttribute('aria-label', `${lang === 'es' ? 'Consultar' : 'Enquire about'} ${card.dataset.car || ''}`.trim()));
    syncCollection($('.car-choice.is-active'));
  }

  $$('[data-lang]').forEach(button => button.addEventListener('click', () => applyLang(button.dataset.lang)));

  function syncBodyLock(){ body.classList.toggle('is-locked', !!mobileNav?.classList.contains('is-open') || !!drawer?.classList.contains('is-open')); }

  function openMenu(){
    if(!mobileNav) return;
    if(drawer?.classList.contains('is-open')) closeDrawer(false);
    menuLastFocus = document.activeElement;
    mobileNav.classList.add('is-open');
    mobileNav.setAttribute('aria-hidden','false');
    menuOpen?.setAttribute('aria-expanded','true');
    syncBodyLock();
    setTimeout(() => menuClose?.focus(), 40);
  }
  function closeMenu(restoreFocus = true){
    if(!mobileNav) return;
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden','true');
    menuOpen?.setAttribute('aria-expanded','false');
    syncBodyLock();
    if(restoreFocus) menuLastFocus?.focus?.();
  }
  menuOpen?.addEventListener('click', openMenu);
  menuClose?.addEventListener('click', () => closeMenu());
  $$('[data-mobile-link]').forEach(link => link.addEventListener('click', () => closeMenu(false)));

  function openDrawer(car){
    if(!drawer) return;
    if(mobileNav?.classList.contains('is-open')) closeMenu(false);
    lastFocus = document.activeElement;
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden','false');
    $$('[data-open-drawer]').forEach(button => button.setAttribute('aria-expanded','true'));
    syncBodyLock();
    if(car && carSelect){
      const option = [...carSelect.options].find(o => o.value.toLowerCase() === car.toLowerCase() || o.textContent.toLowerCase().includes(car.toLowerCase()));
      if(option) carSelect.value = option.value;
    }
    setTimeout(() => carSelect?.focus(), 60);
  }
  function closeDrawer(restoreFocus = true){
    if(!drawer) return;
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden','true');
    $$('[data-open-drawer]').forEach(button => button.setAttribute('aria-expanded','false'));
    syncBodyLock();
    if(restoreFocus) lastFocus?.focus?.();
  }
  $$('[data-open-drawer]').forEach(button => {
    button.setAttribute('aria-expanded','false');
    button.addEventListener('click', () => openDrawer(button.dataset.car || ''));
  });
  drawerClose?.addEventListener('click', () => closeDrawer());
  drawerBackdrop?.addEventListener('click', () => closeDrawer());

  const collectionVisual = $('[data-collection-visual]');
  const collectionPhoto = $('[data-collection-photo]');
  const collectionIndex = $('[data-collection-index]');
  const collectionCategory = $('[data-collection-category]');
  const collectionBrand = $('[data-collection-brand]');
  const collectionName = $('[data-collection-name]');
  const collectionSpecs = $('[data-collection-specs]');

  function syncCollection(button){
    if(!button) return;
    const car = button.dataset.car;
    const localized = fleetCopy[lang]?.[car];
    if(collectionIndex) collectionIndex.textContent = button.dataset.index || '01';
    if(collectionCategory) collectionCategory.textContent = localized?.category || button.dataset.category || '';
    if(collectionBrand) collectionBrand.textContent = button.dataset.brand || '';
    if(collectionName) collectionName.textContent = button.dataset.name || button.dataset.brand || '';
    if(collectionSpecs) collectionSpecs.innerHTML = (localized?.specs || []).map(item => `<span>${item}</span>`).join('');
  }

  $$('.car-choice').forEach(button => button.addEventListener('click', () => {
    if(button.classList.contains('is-active')) return;
    $$('.car-choice').forEach(item => item.classList.remove('is-active'));
    button.classList.add('is-active');
    collectionVisual?.classList.add('is-changing');
    setTimeout(() => {
      if(collectionPhoto) collectionPhoto.className = `collection-photo ${button.dataset.car}`;
      syncCollection(button);
      collectionVisual?.classList.remove('is-changing');
    }, 220);
  }));

  $$('[data-car-card]').forEach(card => {
    const openCard = event => {
      if(event?.target?.closest?.('a,button')) return;
      openDrawer(card.dataset.car || '');
    };
    card.addEventListener('click', openCard);
    card.addEventListener('keydown', event => {
      if(event.key === 'Enter' || event.key === ' '){ event.preventDefault(); openCard(event); }
    });
  });

  $$('.faq-q').forEach(button => button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const wasOpen = item?.classList.contains('is-open');
    $$('.faq-item').forEach(row => { row.classList.remove('is-open'); $('.faq-q', row)?.setAttribute('aria-expanded','false'); });
    if(item && !wasOpen){ item.classList.add('is-open'); button.setAttribute('aria-expanded','true'); }
  }));

  const today = localToday();
  $$('input[type="date"]').forEach(input => input.min = today);
  const start = $('[name="start"]', form);
  const end = $('[name="end"]', form);
  start?.addEventListener('change', () => {
    if(!end) return;
    end.min = start.value || today;
    if(end.value && end.value < end.min) end.value = end.min;
  });

  form?.addEventListener('submit', event => {
    event.preventDefault();
    const fd = new FormData(form);
    const notes = fd.get('notes');
    const lines = lang === 'es'
      ? ['Hola B&M Exclusive. Quiero consultar disponibilidad.', `Preferencia: ${fd.get('car')}`, `Fechas: ${fd.get('start')} — ${fd.get('end')}`, `Entrega: ${fd.get('delivery')}`, `Nombre: ${fd.get('name')}`]
      : ['Hello B&M Exclusive. I would like to check availability.', `Preference: ${fd.get('car')}`, `Dates: ${fd.get('start')} — ${fd.get('end')}`, `Delivery: ${fd.get('delivery')}`, `Name: ${fd.get('name')}`];
    if(notes) lines.push(`${lang === 'es' ? 'Notas' : 'Notes'}: ${notes}`);
    window.open(`https://wa.me/34952777568?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
  });

  function updateHeader(){
    const y = window.scrollY;
    header?.classList.toggle('is-scrolled', y > 24);
    if(scrollLine){
      const max = Math.max(document.documentElement.scrollHeight - innerHeight, 1);
      scrollLine.style.width = `${Math.min(100, (y / max) * 100)}%`;
    }
  }
  updateHeader();
  addEventListener('scroll', updateHeader, {passive:true});

  const sections = $$('main section[id]');
  const navLinks = $$('.nav-links a[href^="#"]');
  if('IntersectionObserver' in window){
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting) navLinks.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`));
      });
    }, {rootMargin:'-32% 0px -58% 0px'});
    sections.forEach(section => navObserver.observe(section));

    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){ entry.target.classList.add('is-in'); revealObserver.unobserve(entry.target); }
      });
    }, {threshold:.12, rootMargin:'0px 0px -28px'});
    $$('.reveal').forEach(el => revealObserver.observe(el));
  } else $$('.reveal').forEach(el => el.classList.add('is-in'));

  addEventListener('keydown', event => {
    if(event.key === 'Escape'){
      if(drawer?.classList.contains('is-open')) closeDrawer();
      else if(mobileNav?.classList.contains('is-open')) closeMenu();
      return;
    }
    if(event.key !== 'Tab') return;
    const activeLayer = drawer?.classList.contains('is-open') ? drawer : mobileNav?.classList.contains('is-open') ? mobileNav : null;
    if(!activeLayer) return;
    const items = focusables(activeLayer);
    if(items.length < 2) return;
    const first = items[0], last = items[items.length - 1];
    if(event.shiftKey && document.activeElement === first){ event.preventDefault(); last.focus(); }
    else if(!event.shiftKey && document.activeElement === last){ event.preventDefault(); first.focus(); }
  });

  applyLang(lang);
})();