const fleet = [
  {
    brand:'Lamborghini',name:'Lamborghini Huracán Tecnica',title:'Lamborghini<br>Huracán Tecnica',category:'SUPERCAR',
    day:'€1,900',three:'€5,600',seven:'€12,900',deposit:'€6,000',price:'From €1,900 / day',
    description:'Precision, theatre and naturally aspirated V10 character for a Marbella drive that is anything but ordinary.',
    image:'https://mfinity.es/wp-content/uploads/2024/09/IMG_5309-768x1024.jpg',
    fallback:'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=1800',
    url:'https://mfinity.es/lamborghini-huracan-tecnica/'
  },
  {
    brand:'Ferrari',name:'Ferrari 488 Spyder',title:'Ferrari 488<br>Spyder',category:'SUPERCAR',
    day:'€1,400',three:'Call',seven:'Call',deposit:'€7,000',price:'From €1,400 / day',
    description:'Open-top Ferrari performance with the drama, sound and presence expected from one of Marbella’s most recognisable supercars.',
    image:'https://mfinity.es/wp-content/uploads/2024/04/Ferrari-488-Spyder%E2%80%8B-front-768x576.jpg',
    fallback:'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1800',
    url:'https://mfinity.es/ferrari-488-spyder/'
  },
  {
    brand:'Audi',name:'Audi R8',title:'Audi<br>R8',category:'SUPERCAR / PERFORMANCE',
    day:'€650',three:'€1,500',seven:'€3,500',deposit:'€3,500',price:'From €650 / day',
    description:'A more understated supercar experience: V10 performance, everyday usability and quattro confidence for the coast.',
    image:'https://mfinity.es/wp-content/uploads/2024/04/audi-r8-marbella-rental-main-768x576.jpg',
    fallback:'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1800',
    url:'https://mfinity.es/audi-r8/'
  },
  {
    brand:'Mercedes-AMG',name:'Mercedes G63',title:'Mercedes-AMG<br>G63',category:'LUXURY SUV',
    day:'€1,000',three:'€2,900',seven:'€6,500',deposit:'€5,000',price:'From €1,000 / day',
    description:'Commanding presence, space and AMG performance for villas, events, city nights and longer stays around Marbella.',
    image:'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1800',
    fallback:'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1800',
    url:'https://mfinity.es/mercedes-g-wagon/'
  }
];

const translations = {
  en:{
    navFleet:'Cars',navExperience:'About us',navProperties:'Properties',navContact:'Contact',navBook:'Rent online',
    heroEyebrow:'Luxury car rental · Marbella',heroTitle:'Luxury in<br>every kilometer.',heroLead:'Supercars, performance cars and premium mobility from Nueva Andalucía to the whole Costa del Sol.',heroFleet:'View available cars',heroBook:'Rent online',heroMeta1:'cars in collection',heroMeta2:'Nueva Andalucía',heroMeta3:'WhatsApp booking',
    fleetKicker:'Available supercars right now',fleetTitle:'Choose your car.<br><span>Own the moment.</span>',fleetIntro:'A clearer view of real cars currently presented by Mfinity, with rental price, deposit and direct booking access.',fact1:'1 day',fact3:'3 days',fact7:'7 days',deposit:'Deposit',reserveCar:'Rent this car',viewDetails:'Vehicle details ↗',allCars:'Explore the full Mfinity collection',
    introLabel:'About Mfinity',introTitle:'A unique supercar rental<br><span>built around your stay.</span>',introText:'Mfinity brings together a broad luxury fleet with direct service in Marbella, helping clients choose the right car for the trip, event or occasion.',point1:'Luxury cars',point1p:'A varied collection spanning supercars, performance cars, SUVs and premium transport.',point2:'Quality',point2p:'Vehicle condition and presentation are part of the experience, not an afterthought.',point3:'Large selection',point3p:'From a Ferrari weekend to a G-Class stay or a comfortable airport transfer.',planTrip:'Find my car',
    marbellaTitle:'The right car changes<br>the whole <span>Marbella experience.</span>',marbellaText:'Puerto Banús, Nueva Andalucía, the coast or Málaga Airport. Choose the vehicle around the plan and coordinate the details directly with Mfinity.',
    propertiesTitle:'More than cars.<br><span>A Marbella lifestyle.</span>',propertiesText:'Mfinity also presents luxury properties in Marbella. The property business stays visually connected to the brand while remaining a distinct experience from car rental.',propertiesCta:'Explore properties ↗',propertyNote:'Frontline beach property presented within Mfinity’s luxury property portfolio.',
    contactTitle:'Ready to choose<br>your next car?',contactText:'Send the dates and preferred vehicle. The Mfinity team can confirm availability, price, deposit and the final rental conditions directly.',phone:'Phone',address:'Address',backTop:'Back to top ↑',
    drawerTitle:'Rent online',formCar:'Car',formOther:'Other / recommendation',formFrom:'From',formTo:'To',formName:'Name',formNotes:'Message',formSend:'Continue on WhatsApp',formNote:'Availability and final rental conditions are confirmed directly by Mfinity.'
  },
  es:{
    navFleet:'Coches',navExperience:'Nosotros',navProperties:'Propiedades',navContact:'Contacto',navBook:'Alquilar online',
    heroEyebrow:'Alquiler de coches de lujo · Marbella',heroTitle:'Lujo en<br>cada kilómetro.',heroLead:'Superdeportivos, coches de altas prestaciones y movilidad premium desde Nueva Andalucía a toda la Costa del Sol.',heroFleet:'Ver coches disponibles',heroBook:'Alquilar online',heroMeta1:'coches en la colección',heroMeta2:'Nueva Andalucía',heroMeta3:'reserva por WhatsApp',
    fleetKicker:'Superdeportivos disponibles ahora',fleetTitle:'Elige tu coche.<br><span>Haz tuyo el momento.</span>',fleetIntro:'Una vista más clara de vehículos reales publicados por Mfinity, con precio de alquiler, depósito y acceso directo a la reserva.',fact1:'1 día',fact3:'3 días',fact7:'7 días',deposit:'Depósito',reserveCar:'Alquilar este coche',viewDetails:'Detalles del vehículo ↗',allCars:'Explorar toda la colección Mfinity',
    introLabel:'Sobre Mfinity',introTitle:'Un alquiler de supercoches único<br><span>alrededor de tu estancia.</span>',introText:'Mfinity reúne una amplia flota de lujo con atención directa en Marbella para ayudarte a elegir el coche adecuado para el viaje, evento u ocasión.',point1:'Coches de lujo',point1p:'Una colección variada de superdeportivos, performance, SUV y transporte premium.',point2:'Calidad',point2p:'El estado y la presentación del vehículo forman parte de la experiencia.',point3:'Gran selección',point3p:'Desde un Ferrari para el fin de semana hasta un G-Class o un traslado cómodo al aeropuerto.',planTrip:'Encontrar mi coche',
    marbellaTitle:'El coche adecuado cambia<br>toda la <span>experiencia Marbella.</span>',marbellaText:'Puerto Banús, Nueva Andalucía, la costa o el Aeropuerto de Málaga. Elige el vehículo según el plan y coordina los detalles directamente con Mfinity.',
    propertiesTitle:'Más que coches.<br><span>Un estilo de vida Marbella.</span>',propertiesText:'Mfinity también presenta propiedades de lujo en Marbella. La vertical inmobiliaria mantiene la conexión visual con la marca, pero permanece separada del alquiler de coches.',propertiesCta:'Explorar propiedades ↗',propertyNote:'Propiedad en primera línea de playa dentro de la cartera inmobiliaria de lujo de Mfinity.',
    contactTitle:'¿Listo para elegir<br>tu próximo coche?',contactText:'Envía las fechas y el vehículo que prefieres. El equipo de Mfinity puede confirmar directamente disponibilidad, precio, depósito y condiciones finales.',phone:'Teléfono',address:'Dirección',backTop:'Volver arriba ↑',
    drawerTitle:'Alquilar online',formCar:'Coche',formOther:'Otro / recomendación',formFrom:'Desde',formTo:'Hasta',formName:'Nombre',formNotes:'Mensaje',formSend:'Continuar por WhatsApp',formNote:'La disponibilidad y las condiciones finales se confirman directamente con Mfinity.'
  }
};

let fleetIndex = 0;
let lang = 'en';
const q = s => document.querySelector(s);
const qa = s => [...document.querySelectorAll(s)];

function fallbackImages(){
  qa('img[data-fallback]').forEach(img=>img.addEventListener('error',()=>{if(img.src!==img.dataset.fallback) img.src=img.dataset.fallback;},{once:true}));
}

function setFleet(index){
  fleetIndex=(index+fleet.length)%fleet.length;
  const car=fleet[fleetIndex];
  const stage=q('[data-fleet-stage]');
  stage.classList.add('changing');
  setTimeout(()=>{
    const image=q('[data-fleet-image]');
    image.dataset.fallback=car.fallback;image.src=car.image;image.alt=car.name;
    q('[data-fleet-current]').textContent=String(fleetIndex+1).padStart(2,'0');
    q('[data-fleet-index]').textContent=String(fleetIndex+1).padStart(2,'0');
    q('[data-fleet-category]').textContent=car.category;
    q('[data-fleet-name]').textContent=car.name;
    q('[data-fleet-price]').textContent=car.price;
    q('[data-fleet-brand]').textContent=car.brand;
    q('[data-fleet-title]').innerHTML=car.title;
    q('[data-fleet-day]').textContent=car.day;
    q('[data-fleet-three]').textContent=car.three;
    q('[data-fleet-seven]').textContent=car.seven;
    q('[data-fleet-deposit]').textContent=car.deposit;
    q('[data-fleet-description]').textContent=car.description;
    q('[data-fleet-original]').href=car.url;
    q('[data-selected-car]').dataset.selectedCar=car.name;
    qa('[data-fleet]').forEach((tab,i)=>tab.classList.toggle('active',i===fleetIndex));
    stage.classList.remove('changing');
  },180);
}

function setLanguage(next){
  lang=next;document.documentElement.lang=lang;
  const dict=translations[lang];
  qa('[data-t]').forEach(el=>{const key=el.dataset.t;if(dict[key])el.textContent=dict[key]});
  qa('[data-th]').forEach(el=>{const key=el.dataset.th;if(dict[key])el.innerHTML=dict[key]});
  q('[data-lang-toggle]').innerHTML=lang==='en'?'<span class="active">EN</span><span>/</span><span>ES</span>':'<span>EN</span><span>/</span><span class="active">ES</span>';
}

function openEnquiry(car){
  const drawer=q('[data-enquiry]');
  if(car){const select=q('[data-car-select]');if([...select.options].some(o=>o.value===car))select.value=car;}
  drawer.classList.add('open');drawer.setAttribute('aria-hidden','false');document.body.classList.add('lock');
}
function closeEnquiry(){const drawer=q('[data-enquiry]');drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true');document.body.classList.remove('lock')}

function init(){
  fallbackImages();
  q('[data-fleet-total]').textContent=String(fleet.length).padStart(2,'0');
  q('[data-fleet-prev]').addEventListener('click',()=>setFleet(fleetIndex-1));
  q('[data-fleet-next]').addEventListener('click',()=>setFleet(fleetIndex+1));
  qa('[data-fleet]').forEach(btn=>btn.addEventListener('click',()=>setFleet(Number(btn.dataset.fleet))));
  q('[data-lang-toggle]').addEventListener('click',()=>setLanguage(lang==='en'?'es':'en'));
  qa('[data-open-enquiry]').forEach(btn=>btn.addEventListener('click',()=>openEnquiry(btn.dataset.selectedCar||null)));
  qa('[data-close-enquiry]').forEach(btn=>btn.addEventListener('click',closeEnquiry));
  q('[data-menu-open]').addEventListener('click',()=>{q('[data-mobile-menu]').classList.add('open');q('[data-mobile-menu]').setAttribute('aria-hidden','false');document.body.classList.add('lock')});
  const closeMenu=()=>{q('[data-mobile-menu]').classList.remove('open');q('[data-mobile-menu]').setAttribute('aria-hidden','true');document.body.classList.remove('lock')};
  q('[data-menu-close]').addEventListener('click',closeMenu);qa('[data-mobile-link]').forEach(a=>a.addEventListener('click',closeMenu));
  q('[data-enquiry-form]').addEventListener('submit',e=>{
    e.preventDefault();const fd=new FormData(e.currentTarget);
    const parts=[lang==='es'?'Hola Mfinity, me gustaría consultar un alquiler.':'Hi Mfinity, I would like to enquire about a rental.',`Car: ${fd.get('car')}`];
    if(fd.get('from'))parts.push(`From: ${fd.get('from')}`);if(fd.get('to'))parts.push(`To: ${fd.get('to')}`);if(fd.get('name'))parts.push(`Name: ${fd.get('name')}`);if(fd.get('phone'))parts.push(`Phone: ${fd.get('phone')}`);if(fd.get('notes'))parts.push(`Message: ${fd.get('notes')}`);
    window.open(`https://wa.me/34663557861?text=${encodeURIComponent(parts.join('\n'))}`,'_blank','noopener,noreferrer');
  });
  window.addEventListener('scroll',()=>q('[data-header]').classList.toggle('scrolled',window.scrollY>24),{passive:true});
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
  qa('.reveal').forEach(el=>observer.observe(el));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeEnquiry();closeMenu()}});
}

document.addEventListener('DOMContentLoaded',init);