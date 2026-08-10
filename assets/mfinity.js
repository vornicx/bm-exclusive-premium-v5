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
  en:{navFleet:'Fleet',navExperience:'Experience',navProperties:'Properties',navContact:'Contact',navBook:'Check availability',heroTitle:'Drive Marbella<br><em>differently.</em>',heroLead:'A curated collection of supercars, performance cars and luxury mobility for Marbella and the Costa del Sol.',heroFleet:'Explore the fleet',heroBook:'Check availability',heroMeta1:'Collection',heroMeta2:'Location',heroMeta3:'Service',heroMeta3v:'Direct & personal',heroBottom:'Nueva Andalucía · Marbella · Costa del Sol',discover:'Discover',introLabel:'The Mfinity standard',introTitle:'The car should feel like part of the trip.<br><em>Not another task to manage.</em>',introText:'Mfinity brings together high-performance cars, premium vehicles and a direct booking experience built around your stay in Marbella.',point1:'Curated fleet',point1p:'Supercars, SUVs, performance cars and luxury transport selected around different plans and occasions.',point2:'Clear conditions',point2p:'Vehicle, price, deposit and rental period are confirmed before you commit.',point3:'One point of contact',point3p:'Direct communication from first enquiry through to the handover of the vehicle.',fleetKicker:'Available now',fleetTitle:'Choose the character.<br><em>We handle the details.</em>',fleetIntro:'Real vehicles currently presented by Mfinity, redesigned into a clearer premium rental experience.',fact1:'1 day',fact3:'3 days',fact7:'7 days',deposit:'Deposit',reserveCar:'Reserve this car',viewDetails:'View original listing ↗',marbellaTitle:'From airport arrival<br>to <em>Puerto Banús after dark.</em>',marbellaText:'Choose the vehicle around the stay: a supercar for the coast, a G-Class for presence, a performance car for everyday use or premium transport when comfort comes first.',planTrip:'Plan my rental',processLabel:'Booking, refined',processTitle:'A premium rental should be<br><em>clear from the first message.</em>',step1:'Tell us your plan',step1p:'Dates, preferred car and where you will be staying in Marbella or the Costa del Sol.',step2:'Confirm the vehicle',step2p:'Availability, rental price, deposit and conditions are confirmed before booking.',step3:'Collect or coordinate delivery',step3p:'The final handover details are arranged directly with the Mfinity team.',propertiesTitle:'Cars are the first chapter.<br><em>Marbella can be the whole stay.</em>',propertiesText:'Mfinity also presents luxury properties in Marbella. We keep that vertical distinct from the rental journey, while giving it the same premium level of presentation.',propertiesCta:'Explore properties ↗',propertyNote:'A separate luxury-property experience, connected to the same Mfinity brand.',contactTitle:'Tell us the dates.<br><em>We’ll find the right car.</em>',contactText:'For availability, longer rentals or a specific model, contact Mfinity directly.',phone:'Phone',address:'Address',footerTag:'Luxury & supercar rental · Marbella',backTop:'Back to top ↑',prototypeNote:'Prototype direction for presentation purposes',drawerTitle:'Check availability',formCar:'Vehicle',formOther:'Other / recommendation',formFrom:'From',formTo:'To',formName:'Name',formNotes:'Notes',formSend:'Continue on WhatsApp',formNote:'This prototype sends the enquiry through WhatsApp and does not process payment.'},
  es:{navFleet:'Flota',navExperience:'Experiencia',navProperties:'Propiedades',navContact:'Contacto',navBook:'Consultar disponibilidad',heroTitle:'Vive Marbella<br><em>de otra manera.</em>',heroLead:'Una colección seleccionada de superdeportivos, coches de altas prestaciones y movilidad premium en Marbella y la Costa del Sol.',heroFleet:'Explorar la flota',heroBook:'Consultar disponibilidad',heroMeta1:'Colección',heroMeta2:'Ubicación',heroMeta3:'Servicio',heroMeta3v:'Directo y personal',heroBottom:'Nueva Andalucía · Marbella · Costa del Sol',discover:'Descubrir',introLabel:'El estándar Mfinity',introTitle:'El coche debe formar parte del viaje.<br><em>No ser otra cosa que gestionar.</em>',introText:'Mfinity reúne coches de altas prestaciones, vehículos premium y una experiencia de reserva directa alrededor de tu estancia en Marbella.',point1:'Flota seleccionada',point1p:'Superdeportivos, SUV, coches de altas prestaciones y transporte de lujo para distintos planes y ocasiones.',point2:'Condiciones claras',point2p:'Vehículo, precio, depósito y periodo de alquiler se confirman antes de reservar.',point3:'Un único contacto',point3p:'Comunicación directa desde la primera consulta hasta la entrega del vehículo.',fleetKicker:'Disponibles ahora',fleetTitle:'Elige el carácter.<br><em>Nosotros cerramos los detalles.</em>',fleetIntro:'Vehículos reales actualmente publicados por Mfinity, rediseñados dentro de una experiencia de alquiler premium más clara.',fact1:'1 día',fact3:'3 días',fact7:'7 días',deposit:'Depósito',reserveCar:'Reservar este coche',viewDetails:'Ver ficha original ↗',marbellaTitle:'Desde la llegada al aeropuerto<br>hasta <em>Puerto Banús de noche.</em>',marbellaText:'Elige el vehículo según la estancia: un supercar para la costa, un G-Class para presencia, un performance para el día a día o transporte premium cuando prima la comodidad.',planTrip:'Organizar mi alquiler',processLabel:'Reserva, refinada',processTitle:'Un alquiler premium debe ser<br><em>claro desde el primer mensaje.</em>',step1:'Cuéntanos tu plan',step1p:'Fechas, coche preferido y dónde te alojarás en Marbella o la Costa del Sol.',step2:'Confirma el vehículo',step2p:'Se confirman disponibilidad, precio, depósito y condiciones antes de reservar.',step3:'Recoge o coordina la entrega',step3p:'Los detalles finales de entrega se organizan directamente con el equipo de Mfinity.',propertiesTitle:'Los coches son el primer capítulo.<br><em>Marbella puede ser toda la estancia.</em>',propertiesText:'Mfinity también presenta propiedades de lujo en Marbella. Mantenemos esa vertical separada del alquiler, con el mismo nivel premium de presentación.',propertiesCta:'Explorar propiedades ↗',propertyNote:'Una experiencia inmobiliaria de lujo separada, conectada a la misma marca Mfinity.',contactTitle:'Dinos las fechas.<br><em>Buscamos el coche adecuado.</em>',contactText:'Para disponibilidad, alquileres largos o un modelo concreto, contacta directamente con Mfinity.',phone:'Teléfono',address:'Dirección',footerTag:'Luxury & supercar rental · Marbella',backTop:'Volver arriba ↑',prototypeNote:'Dirección de prototipo para presentación',drawerTitle:'Consultar disponibilidad',formCar:'Vehículo',formOther:'Otro / recomendación',formFrom:'Desde',formTo:'Hasta',formName:'Nombre',formNotes:'Notas',formSend:'Continuar por WhatsApp',formNote:'Este prototipo envía la consulta por WhatsApp y no procesa pagos.'}
};

let fleetIndex = 0;
let lang = 'en';
const q = s => document.querySelector(s);
const qa = s => [...document.querySelectorAll(s)];

function fallbackImages(){
  qa('img[data-fallback]').forEach(img=>{
    img.addEventListener('error',()=>{if(img.src!==img.dataset.fallback) img.src=img.dataset.fallback;},{once:true});
  });
}

function setFleet(index){
  fleetIndex=(index+fleet.length)%fleet.length;
  const car=fleet[fleetIndex];
  const stage=q('[data-fleet-stage]');
  stage.classList.add('changing');
  setTimeout(()=>{
    const image=q('[data-fleet-image]');
    image.dataset.fallback=car.fallback; image.src=car.image; image.alt=car.name;
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
  lang=next;
  document.documentElement.lang=lang;
  const dict=translations[lang];
  qa('[data-t]').forEach(el=>{const key=el.dataset.t;if(dict[key])el.textContent=dict[key]});
  qa('[data-th]').forEach(el=>{const key=el.dataset.th;if(dict[key])el.innerHTML=dict[key]});
  const toggle=q('[data-lang-toggle]');
  toggle.innerHTML=lang==='en'?'<span class="active">EN</span><span>/</span><span>ES</span>':'<span>EN</span><span>/</span><span class="active">ES</span>';
}

function openEnquiry(car){
  const drawer=q('[data-enquiry]');
  if(car){const select=q('[data-car-select]'); if([...select.options].some(o=>o.value===car)) select.value=car;}
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
    const parts=[lang==='es'?'Hola Mfinity, me gustaría consultar disponibilidad.':'Hi Mfinity, I would like to check availability.',`Car: ${fd.get('car')}`];
    if(fd.get('from'))parts.push(`From: ${fd.get('from')}`);if(fd.get('to'))parts.push(`To: ${fd.get('to')}`);if(fd.get('name'))parts.push(`Name: ${fd.get('name')}`);if(fd.get('phone'))parts.push(`Phone: ${fd.get('phone')}`);if(fd.get('notes'))parts.push(`Notes: ${fd.get('notes')}`);
    window.open(`https://wa.me/34663557861?text=${encodeURIComponent(parts.join('\n'))}`,'_blank','noopener,noreferrer');
  });
  window.addEventListener('scroll',()=>q('[data-header]').classList.toggle('scrolled',window.scrollY>24),{passive:true});
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
  qa('.reveal').forEach(el=>observer.observe(el));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeEnquiry();closeMenu()}});
}

document.addEventListener('DOMContentLoaded',init);
