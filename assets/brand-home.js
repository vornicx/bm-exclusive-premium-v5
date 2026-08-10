(() => {
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const body = document.body;
  const header = $('#header');
  const menu = $('#mobileMenu');
  const menuBtn = $('#menuBtn');
  const menuClose = $('#menuClose');
  const booking = $('#booking');
  const bookClose = $('#bookClose');
  const bookBackdrop = $('#bookingBackdrop');
  const bookForm = $('#bookForm');
  const bookCar = $('#bookCar');
  let lang = 'es';

  const copy = {
    es: {
      navFleet:'Flota',navHow:'Cómo funciona',navService:'Concierge',privateEnquiry:'Consulta privada',
      heroKicker:'Luxury car rental · Marbella',heroTitle:'El coche correcto.<br>En el lugar correcto.',heroLead:'Una selección cuidada de deportivos y coches de lujo, con atención directa y una entrega coordinada alrededor de tu plan.',heroCTA:'Consultar disponibilidad',heroSecondary:'Explorar selección',
      proof1Title:'Atención directa',proof1Text:'Un único interlocutor desde la consulta hasta la recogida.',proof2Title:'Entrega coordinada',proof2Text:'Hotel, villa, aeropuerto o ubicación acordada.',proof3Title:'Condiciones claras',proof3Text:'Precio, depósito, kilometraje y disponibilidad antes de confirmar.',
      trust1:'Servicio local',trust1p:'Conocimiento de la Costa del Sol y coordinación de entregas bajo petición.',trust2:'Flota curada',trust2p:'Menos ruido, más criterio: coches elegidos por presencia y experiencia.',trust3:'Reserva personal',trust3p:'Sin un proceso impersonal. Hablas con una persona y sabes qué estás confirmando.',trust4:'Privacidad',trust4p:'Atención proporcionada al cliente, la ocasión y el nivel de discreción requerido.',
      introKicker:'Más que alquiler',introTitle:'Lujo es que todo encaje.',introP:'El coche es solo una parte. La experiencia empieza cuando la consulta es clara, continúa cuando la entrega ocurre donde debe y termina cuando no has tenido que perseguir a nadie para resolver un detalle.',introStrong:'B&M combina selección, coordinación y trato directo para reducir fricción sin convertir el servicio en espectáculo.',
      fleetKicker:'Selección destacada',fleetTitle:'Tres formas de llegar.',fleetIntro:'Empieza por el carácter del coche. B&M confirma la unidad concreta, disponibilidad y condiciones antes de la reserva.',car1:'Gran turismo, presencia y una experiencia más refinada que extrema.',car2:'Impacto visual y respuesta inmediata para una llegada sin discreción.',car3:'Precisión y versatilidad para disfrutar de carretera y ciudad con el mismo nivel.',fleetMore:'¿Buscas Mercedes-Benz, SUV o un modelo concreto?',fleetLink:'Ver flota completa',recommendCTA:'Pedir recomendación personal',
      processKicker:'Proceso',processTitle:'De la idea a las llaves.<br>Sin rodeos.',processLead:'Cada paso existe para eliminar incertidumbre, no para añadir formularios.',step1Title:'Cuéntanos el plan',step1Text:'Fechas, ubicación, ocasión y el tipo de coche que tienes en mente.',step2Title:'Recibe una propuesta real',step2Text:'Disponibilidad, precio, depósito, kilometraje y condiciones antes de decidir.',step3Title:'Recibe el coche',step3Text:'B&M coordina la entrega y permanece disponible durante toda la reserva.',
      conciergeKicker:'Private concierge',conciergeTitle:'El coche no debería complicar el plan.',conciergeLead:'La capa de servicio existe para que el vehículo llegue a tu agenda, no para que tu agenda se adapte a la reserva.',service1:'Hotel, villa y aeropuerto',service1p:'Entrega y recogida coordinadas en el punto acordado.',service2:'Eventos y ocasiones',service2p:'Bodas, producciones, celebraciones, eventos corporativos y entradas especiales.',service3:'Estancias largas',service3p:'Opciones para alquileres extendidos y necesidades durante una estancia en la costa.',service4:'Recomendación personal',service4p:'Si no sabes qué elegir, B&M recomienda según ocasión, recorrido y preferencias.',
      marbellaKicker:'Marbella · Costa del Sol',marbellaTitle:'Tu agenda primero.',marbellaText:'Una villa en Nueva Andalucía, una cena en Puente Romano, una llegada a Puerto Banús o una ruta por la costa. El coche debe encajar con el momento, no competir con él.',marbellaCTA:'Organizar mi reserva',
      contactKicker:'Private enquiry',contactTitle:'Dinos qué necesitas.<br>Te decimos qué encaja.',contactText:'Consulta disponibilidad y recibe una respuesta personal con vehículo, condiciones y entrega adaptados a tu plan.',contactCTA:'Consultar por WhatsApp',mobileCTA:'Consultar disponibilidad',
      bookTitle:'Consulta privada',bookLead:'Completa lo esencial. Prepararemos el mensaje y continuarás directamente con B&M por WhatsApp.',fieldCar:'Vehículo',recommend:'Quiero una recomendación',fieldFrom:'Desde',fieldTo:'Hasta',fieldDelivery:'Lugar de entrega',fieldName:'Nombre',fieldNotes:'Notas opcionales',sendWhatsapp:'Continuar por WhatsApp',formNote:'No se realiza ningún cargo online. B&M confirma disponibilidad y condiciones personalmente.'
    },
    en: {
      navFleet:'Fleet',navHow:'How it works',navService:'Concierge',privateEnquiry:'Private enquiry',
      heroKicker:'Luxury car rental · Marbella',heroTitle:'The right car.<br>In the right place.',heroLead:'A considered selection of performance and luxury cars, with direct attention and delivery coordinated around your plans.',heroCTA:'Check availability',heroSecondary:'Explore selection',
      proof1Title:'Direct attention',proof1Text:'One point of contact from enquiry to collection.',proof2Title:'Coordinated delivery',proof2Text:'Hotel, villa, airport or agreed location.',proof3Title:'Clear terms',proof3Text:'Price, deposit, mileage and availability before you confirm.',
      trust1:'Local service',trust1p:'Costa del Sol knowledge and delivery coordination on request.',trust2:'Curated fleet',trust2p:'Less noise, more judgement: cars selected for presence and experience.',trust3:'Personal booking',trust3p:'No faceless process. Speak to a person and know exactly what you are confirming.',trust4:'Privacy',trust4p:'Attention matched to the client, occasion and required level of discretion.',
      introKicker:'Beyond rental',introTitle:'Luxury is when everything fits.',introP:'The car is only one part. The experience starts with a clear enquiry, continues when delivery happens where it should, and ends without you having to chase anyone to solve a detail.',introStrong:'B&M combines selection, coordination and direct service to remove friction without turning service into theatre.',
      fleetKicker:'Featured selection',fleetTitle:'Three ways to arrive.',fleetIntro:'Start with the character of the car. B&M confirms the specific vehicle, availability and terms before booking.',car1:'Grand touring presence with an experience that is refined rather than extreme.',car2:'Immediate response and visual impact for an arrival that will not go unnoticed.',car3:'Precision and versatility for road and city at the same level.',fleetMore:'Looking for Mercedes-Benz, an SUV or a specific model?',fleetLink:'View full fleet',recommendCTA:'Ask for a personal recommendation',
      processKicker:'Process',processTitle:'From idea to keys.<br>No detours.',processLead:'Every step exists to remove uncertainty, not add forms.',step1Title:'Tell us the plan',step1Text:'Dates, location, occasion and the type of car you have in mind.',step2Title:'Receive a real proposal',step2Text:'Availability, price, deposit, mileage and terms before you decide.',step3Title:'Receive the car',step3Text:'B&M coordinates delivery and remains available throughout the booking.',
      conciergeKicker:'Private concierge',conciergeTitle:'The car should not complicate the plan.',conciergeLead:'The service layer exists so the vehicle fits your schedule, not the other way around.',service1:'Hotel, villa & airport',service1p:'Delivery and collection coordinated at the agreed location.',service2:'Events & occasions',service2p:'Weddings, productions, celebrations, corporate events and special arrivals.',service3:'Extended stays',service3p:'Options for longer rentals and mobility needs during a stay on the coast.',service4:'Personal recommendation',service4p:'If you are unsure what to choose, B&M recommends around the occasion, route and preferences.',
      marbellaKicker:'Marbella · Costa del Sol',marbellaTitle:'Your schedule first.',marbellaText:'A villa in Nueva Andalucía, dinner at Puente Romano, an arrival in Puerto Banús or a drive along the coast. The car should fit the moment, not compete with it.',marbellaCTA:'Arrange my booking',
      contactKicker:'Private enquiry',contactTitle:'Tell us what you need.<br>We will tell you what fits.',contactText:'Check availability and receive a personal response with vehicle, terms and delivery adapted to your plans.',contactCTA:'Enquire on WhatsApp',mobileCTA:'Check availability',
      bookTitle:'Private enquiry',bookLead:'Share the essentials. We will prepare the message and you can continue directly with B&M on WhatsApp.',fieldCar:'Vehicle',recommend:'I want a recommendation',fieldFrom:'From',fieldTo:'To',fieldDelivery:'Delivery location',fieldName:'Name',fieldNotes:'Optional notes',sendWhatsapp:'Continue on WhatsApp',formNote:'No online payment is taken. B&M personally confirms availability and terms.'
    }
  };

  function applyLang(next){
    lang = next;
    document.documentElement.lang = lang;
    $$('[data-lang]').forEach(b => b.classList.toggle('on', b.dataset.lang === lang));
    $$('[data-t]').forEach(el => { const v = copy[lang][el.dataset.t]; if(v) el.textContent = v; });
    $$('[data-th]').forEach(el => { const v = copy[lang][el.dataset.th]; if(v) el.innerHTML = v; });
  }

  function openMenu(){ menu.classList.add('open'); menu.setAttribute('aria-hidden','false'); menuBtn?.setAttribute('aria-expanded','true'); body.classList.add('lock'); }
  function closeMenu(){ menu.classList.remove('open'); menu.setAttribute('aria-hidden','true'); menuBtn?.setAttribute('aria-expanded','false'); body.classList.remove('lock'); }
  menuBtn?.addEventListener('click', openMenu); menuClose?.addEventListener('click', closeMenu); $$('[data-mobile-link]').forEach(a=>a.addEventListener('click', closeMenu));

  let lastFocus = null;
  function openBooking(car){
    lastFocus = document.activeElement;
    booking.classList.add('open'); booking.setAttribute('aria-hidden','false'); body.classList.add('lock');
    if(car && bookCar){ [...bookCar.options].forEach(o => { if(o.textContent.toLowerCase().includes(car.toLowerCase())) bookCar.value = o.value; }); }
    setTimeout(()=>bookCar?.focus(),30);
  }
  function closeBooking(){ booking.classList.remove('open'); booking.setAttribute('aria-hidden','true'); body.classList.remove('lock'); lastFocus?.focus?.(); }
  $$('.open-book').forEach(b=>b.addEventListener('click',()=>openBooking())); bookClose?.addEventListener('click',closeBooking); bookBackdrop?.addEventListener('click',closeBooking);

  $$('[data-lang]').forEach(b=>b.addEventListener('click',()=>applyLang(b.dataset.lang)));

  const visual = $('#fleetVisual'), image = $('#activeImage'), brand=$('#activeBrand'), name=$('#activeName'), category=$('#activeCategory'), index=$('#activeIndex'), specs=$('#activeSpecs');
  $$('.fleet-option').forEach(btn=>btn.addEventListener('click',()=>{
    if(btn.classList.contains('active')) return;
    $$('.fleet-option').forEach(x=>x.classList.remove('active')); btn.classList.add('active'); visual?.classList.add('change');
    setTimeout(()=>{
      if(image){ image.className=`fleet-photo ${btn.dataset.car}`; image.setAttribute('aria-label',btn.dataset.alt||btn.dataset.name); }
      if(brand) brand.textContent=btn.dataset.brand; if(name) name.textContent=btn.dataset.name; if(category) category.textContent=btn.dataset.category; if(index) index.textContent=btn.dataset.index;
      if(specs) specs.innerHTML=(btn.dataset.specs||'').split('|').map(s=>`<span>${s}</span>`).join('');
      visual?.classList.remove('change');
    },220);
  }));
  $('.text-button.open-book')?.addEventListener('click',()=>{ openBooking(lang==='es'?'recomendación':'recommendation'); if(bookCar) bookCar.selectedIndex=bookCar.options.length-1; });

  const today = new Date().toISOString().slice(0,10); $$('input[type="date"]').forEach(i=>i.min=today);
  const start=$('input[name="start"]',bookForm), end=$('input[name="end"]',bookForm); start?.addEventListener('change',()=>{ if(end){end.min=start.value||today;if(end.value&&end.value<end.min)end.value=end.min;} });
  bookForm?.addEventListener('submit',e=>{
    e.preventDefault();
    const fd=new FormData(bookForm), notes=fd.get('notes');
    const lines = lang==='es' ? [
      'Hola B&M Exclusive. Quiero consultar disponibilidad.',`Vehículo: ${fd.get('car')}`,`Fechas: ${fd.get('start')} — ${fd.get('end')}`,`Entrega: ${fd.get('delivery')}`,`Nombre: ${fd.get('name')}`
    ] : ['Hello B&M Exclusive. I would like to check availability.',`Vehicle: ${fd.get('car')}`,`Dates: ${fd.get('start')} — ${fd.get('end')}`,`Delivery: ${fd.get('delivery')}`,`Name: ${fd.get('name')}`];
    if(notes) lines.push((lang==='es'?'Notas: ':'Notes: ')+notes);
    window.open(`https://wa.me/34952777568?text=${encodeURIComponent(lines.join('\n'))}`,'_blank','noopener');
  });

  const onScroll=()=>header?.classList.toggle('scrolled',window.scrollY>26); onScroll(); addEventListener('scroll',onScroll,{passive:true});
  const sections=$$('main section[id]'); const links=$$('.navlinks a');
  if('IntersectionObserver' in window){
    const navObs=new IntersectionObserver(entries=>entries.forEach(entry=>{ if(entry.isIntersecting){ links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${entry.target.id}`)); }}),{rootMargin:'-35% 0px -55% 0px'}); sections.forEach(s=>navObs.observe(s));
    const revObs=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in');revObs.unobserve(entry.target);}}),{threshold:.12,rootMargin:'0px 0px -35px'}); $$('.reveal').forEach(el=>revObs.observe(el));
  } else $$('.reveal').forEach(el=>el.classList.add('in'));
  addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();closeBooking();}});
  applyLang('es');
})();