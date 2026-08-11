/* Mfinity × Archic rental request demo.
   Client requests and Archic Control share localStorage on the same origin. */
(() => {
  const STORE = 'mfinity_archic_control_v2';
  const STYLE_ID = 'mfinity-rental-system-css';
  const CONTROL_PATH = '/control';

  const BASE_VEHICLES = [
    {id:'lamborghini-huracan-tecnica',name:'Lamborghini Huracán Tecnica',brand:'Lamborghini',category:'Supercar',day:1900,deposit:6000},
    {id:'ferrari-488-spyder',name:'Ferrari 488 Spyder',brand:'Ferrari',category:'Supercar',day:1400,deposit:7000},
    {id:'audi-r8',name:'Audi R8',brand:'Audi',category:'Supercar',day:650,deposit:3500},
    {id:'mercedes-g63',name:'Mercedes-AMG G63',brand:'Mercedes-AMG',category:'Luxury SUV',day:1000,deposit:5000},
    {id:'bmw-540i',name:'BMW 540i',brand:'BMW',category:'Performance',day:250,deposit:1500},
    {id:'golf-gti',name:'Volkswagen Golf GTI',brand:'Volkswagen',category:'Performance',day:250,deposit:1500},
    {id:'mercedes-c63s',name:'Mercedes-AMG C63S',brand:'Mercedes-AMG',category:'Performance',day:500,deposit:3000},
    {id:'audi-rsq3',name:'Audi RSQ3',brand:'Audi',category:'Performance SUV',day:350,deposit:2000},
    {id:'mercedes-a35-amg',name:'Mercedes-AMG A35',brand:'Mercedes-AMG',category:'Performance',day:300,deposit:2000},
    {id:'mercedes-v-class-maybach',name:'Mercedes V-Class Maybach',brand:'Mercedes-Benz',category:'Premium Transport',day:500,deposit:3500},
    {id:'bmw-x6m-competition',name:'BMW X6M Competition',brand:'BMW',category:'Luxury SUV',day:650,deposit:3000},
    {id:'audi-rs5',name:'Audi RS5',brand:'Audi',category:'Performance',day:350,deposit:3000},
    {id:'range-rover-svr',name:'Range Rover SVR',brand:'Range Rover',category:'Luxury SUV',day:550,deposit:3500}
  ];

  const iso = d => { const x = new Date(d); x.setMinutes(x.getMinutes() - x.getTimezoneOffset()); return x.toISOString().slice(0,10); };
  const todayISO = () => iso(new Date());
  const uid = () => Math.random().toString(36).slice(2,8).toUpperCase();
  const esc = s => String(s ?? '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
  const humanDate = value => value ? new Intl.DateTimeFormat(document.documentElement.lang === 'es' ? 'es-ES' : 'en-GB',{day:'2-digit',month:'short',year:'numeric'}).format(new Date(`${value}T12:00:00`)) : '—';

  function defaultState(){ return {version:2,vehicles:BASE_VEHICLES,requests:[],blocks:[],activity:[],createdAt:new Date().toISOString()}; }
  function mergeVehicles(current){ const byId = new Map((current || []).map(v => [v.id,v])); return BASE_VEHICLES.map(base => ({...base,...(byId.get(base.id)||{})})); }
  function readState(){
    try { const parsed = JSON.parse(localStorage.getItem(STORE) || 'null'); if (!parsed || parsed.version !== 2) return defaultState(); parsed.vehicles=mergeVehicles(parsed.vehicles||[]); parsed.requests||=[]; parsed.blocks||=[]; parsed.activity||=[]; return parsed; }
    catch (_) { return defaultState(); }
  }
  function saveState(state){ state.vehicles=mergeVehicles(state.vehicles||[]); localStorage.setItem(STORE,JSON.stringify(state)); window.dispatchEvent(new CustomEvent('mfinity:state-change',{detail:state})); }
  function logActivity(state,type,requestId,text){ state.activity.unshift({id:`ACT-${uid()}`,type,requestId,text,at:new Date().toISOString()}); state.activity=state.activity.slice(0,80); }
  function vehicleFor(value,state=readState()){ const needle=String(value||'').toLowerCase(); return state.vehicles.find(v=>v.id===value||v.name.toLowerCase()===needle)||null; }
  function rangesOverlap(aStart,aEnd,bStart,bEnd){ return Boolean(aStart&&aEnd&&bStart&&bEnd&&aStart<=bEnd&&bStart<=aEnd); }
  function conflicts(vehicleId,start,end,state=readState(),ignoreRequestId=''){
    const blocking=new Set(['accepted','confirmed','active']);
    return state.requests.some(r=>r.id!==ignoreRequestId&&r.vehicleId===vehicleId&&blocking.has(r.status)&&rangesOverlap(start,end,r.from,r.to)) || state.blocks.some(b=>b.vehicleId===vehicleId&&rangesOverlap(start,end,b.from,b.to));
  }
  function blockedDates(vehicleId,state=readState()){
    const out=new Set();
    const ranges=[...state.requests.filter(r=>r.vehicleId===vehicleId&&['accepted','confirmed','active'].includes(r.status)).map(r=>({from:r.from,to:r.to})),...state.blocks.filter(b=>b.vehicleId===vehicleId)];
    ranges.forEach(range=>{ if(!range.from||!range.to)return; let cur=new Date(`${range.from}T12:00:00`),end=new Date(`${range.to}T12:00:00`),guard=0; while(cur<=end&&guard++<400){out.add(iso(cur));cur.setDate(cur.getDate()+1)} });
    return out;
  }

  function injectCss(){ if(document.getElementById(STYLE_ID))return; const link=document.createElement('link');link.id=STYLE_ID;link.rel='stylesheet';link.href='/assets/rental-system.css';document.head.appendChild(link); }
  function enhanceStateFromCatalog(){
    const catalog=window.MFINITY_CATALOG;if(!catalog?.detailedCars?.length)return; const state=readState(),byId=new Map(state.vehicles.map(v=>[v.id,v]));
    catalog.detailedCars.forEach(item=>{const current=byId.get(item.slug)||{id:item.slug};current.name=item.name;current.brand=item.brand;current.category=item.category;if(String(item.day).startsWith('€'))current.day=Number(String(item.day).replace(/[^0-9]/g,''))||current.day;if(String(item.deposit).startsWith('€'))current.deposit=Number(String(item.deposit).replace(/[^0-9]/g,''))||current.deposit;current.image=item.images?.[0]||current.image;byId.set(item.slug,current)});
    state.vehicles=[...byId.values()];saveState(state);
  }

  function buildMainEnquiry(){
    const panel=document.querySelector('[data-enquiry] .enquiry-panel');if(!panel||panel.dataset.archicRental==='1')return;panel.dataset.archicRental='1';
    const state=readState(),options=state.vehicles.map(v=>`<option value="${esc(v.id)}">${esc(v.name)}</option>`).join('');
    panel.innerHTML=`<div class="enquiry-head archic-enquiry-head"><div><p class="kicker">MFINITY · ARCHIC BOOKINGS</p><h2 id="enquiry-title">Check real availability</h2><p class="archic-subcopy">Choose the car and dates. Mfinity receives the request inside Archic Control before confirming the rental.</p></div><button type="button" class="archic-close" data-archic-close aria-label="Close">×</button></div>
    <form data-archic-rental-form class="archic-rental-form" novalidate>
      <section class="archic-step"><div class="archic-step-label"><span>01</span><div><b>Vehicle</b><small>Choose the model you want to rent</small></div></div><label><span>Vehicle</span><select name="car" data-car-select required>${options}</select></label></section>
      <section class="archic-step"><div class="archic-step-label"><span>02</span><div><b>Dates & availability</b><small>Unavailable days are blocked automatically</small></div></div><div class="archic-date-summary"><button type="button" data-date-summary="from"><span>Pick-up</span><strong data-date-from>Choose date</strong></button><i>→</i><button type="button" data-date-summary="to"><span>Return</span><strong data-date-to>Choose date</strong></button></div><input type="hidden" name="from" data-rental-from><input type="hidden" name="to" data-rental-to><div class="archic-calendar" data-rental-calendar></div><div class="archic-availability" data-availability><span></span><strong>Select a date range to check availability</strong></div></section>
      <section class="archic-step"><div class="archic-step-label"><span>03</span><div><b>Your details</b><small>So Mfinity can confirm the rental with you</small></div></div><div class="archic-fields-two"><label><span>Name *</span><input name="name" autocomplete="name" required placeholder="Your name"></label><label><span>Phone / WhatsApp *</span><input name="phone" type="tel" autocomplete="tel" required placeholder="+34 ..."></label></div><div class="archic-fields-two"><label><span>Email</span><input name="email" type="email" autocomplete="email" placeholder="name@email.com"></label><label><span>Delivery / pick-up</span><input name="pickup" placeholder="Hotel, villa, airport..."></label></div><label><span>Notes</span><textarea name="notes" rows="3" placeholder="Occasion, preferred time or anything useful..."></textarea></label></section>
      <div class="archic-form-footer"><p><b>This is a request, not a charge.</b> Mfinity reviews availability and contacts the client before final confirmation.</p><button type="submit" class="archic-submit">Send rental request <span>→</span></button></div>
    </form><div class="archic-request-success" data-request-success hidden></div>`;
    bindMainEnquiry(panel);
  }

  function bindMainEnquiry(panel){
    const form=panel.querySelector('[data-archic-rental-form]'),select=form.querySelector('[data-car-select]'),fromInput=form.querySelector('[data-rental-from]'),toInput=form.querySelector('[data-rental-to]'),cal=form.querySelector('[data-rental-calendar]'),availability=form.querySelector('[data-availability]');
    let cursor=new Date();cursor.setDate(1);cursor.setHours(12,0,0,0);let selecting='from';
    const lang=()=>document.documentElement.lang==='es'?'es':'en';const selectedVehicle=()=>vehicleFor(select.value);
    function renderAvailability(){
      const vehicle=selectedVehicle(),from=fromInput.value,to=toInput.value;panel.querySelector('[data-date-from]').textContent=from?humanDate(from):(lang()==='es'?'Elegir fecha':'Choose date');panel.querySelector('[data-date-to]').textContent=to?humanDate(to):(lang()==='es'?'Elegir fecha':'Choose date');
      if(!vehicle||!from||!to){availability.className='archic-availability';availability.querySelector('strong').textContent=lang()==='es'?'Selecciona un rango para consultar disponibilidad':'Select a date range to check availability';return}
      const unavailable=conflicts(vehicle.id,from,to);availability.className=`archic-availability ${unavailable?'is-unavailable':'is-available'}`;availability.querySelector('strong').textContent=unavailable?(lang()==='es'?'Hay fechas ocupadas. Elige otro rango.':'Some dates are unavailable. Choose another range.'):(lang()==='es'?'Disponible para solicitar. Mfinity hará la confirmación final.':'Available to request. Mfinity makes the final confirmation.');
    }
    function renderCalendar(){
      const vehicle=selectedVehicle(),blocked=blockedDates(vehicle?.id||''),y=cursor.getFullYear(),m=cursor.getMonth(),first=new Date(y,m,1,12),days=new Date(y,m+1,0,12).getDate(),mondayIndex=(first.getDay()+6)%7,locale=lang()==='es'?'es-ES':'en-GB',monthName=new Intl.DateTimeFormat(locale,{month:'long',year:'numeric'}).format(first),names=lang()==='es'?['L','M','X','J','V','S','D']:['M','T','W','T','F','S','S'];
      let cells=names.map(n=>`<span class="archic-weekday">${n}</span>`).join('');for(let i=0;i<mondayIndex;i++)cells+='<span class="archic-day is-empty"></span>';const today=todayISO();
      for(let d=1;d<=days;d++){const value=iso(new Date(y,m,d,12)),isPast=value<today,isBlocked=blocked.has(value),isStart=value===fromInput.value,isEnd=value===toInput.value,inRange=fromInput.value&&toInput.value&&value>fromInput.value&&value<toInput.value;cells+=`<button type="button" class="archic-day${isBlocked?' is-blocked':''}${isStart?' is-start':''}${isEnd?' is-end':''}${inRange?' is-range':''}" data-day="${value}" ${isPast||isBlocked?'disabled':''}><span>${d}</span>${isBlocked?'<i></i>':''}</button>`}
      cal.innerHTML=`<div class="archic-calendar-head"><button type="button" data-cal-prev aria-label="Previous month">‹</button><strong>${esc(monthName)}</strong><button type="button" data-cal-next aria-label="Next month">›</button></div><div class="archic-calendar-grid">${cells}</div><div class="archic-calendar-legend"><span><i></i>${lang()==='es'?'No disponible':'Unavailable'}</span><small>${selecting==='from'?(lang()==='es'?'Elige recogida':'Choose pick-up'):(lang()==='es'?'Ahora elige devolución':'Now choose return')}</small></div>`;
      cal.querySelector('[data-cal-prev]').onclick=()=>{cursor.setMonth(cursor.getMonth()-1);if(iso(cursor).slice(0,7)<today.slice(0,7))cursor=new Date(`${today.slice(0,7)}-01T12:00:00`);renderCalendar()};cal.querySelector('[data-cal-next]').onclick=()=>{cursor.setMonth(cursor.getMonth()+1);renderCalendar()};cal.querySelectorAll('[data-day]').forEach(btn=>btn.addEventListener('click',()=>pickDate(btn.dataset.day)));
    }
    function pickDate(value){
      if(!fromInput.value||(fromInput.value&&toInput.value)||selecting==='from'){fromInput.value=value;toInput.value='';selecting='to'}else if(value<fromInput.value){fromInput.value=value;toInput.value='';selecting='to'}else{if(conflicts(selectedVehicle()?.id,fromInput.value,value)){availability.className='archic-availability is-unavailable';availability.querySelector('strong').textContent=lang()==='es'?'Ese rango contiene fechas no disponibles.':'That range contains unavailable dates.';return}toInput.value=value;selecting='from'}renderCalendar();renderAvailability();
    }
    function resetDates(){fromInput.value='';toInput.value='';selecting='from';renderCalendar();renderAvailability()}
    select.addEventListener('change',resetDates);panel.querySelectorAll('[data-date-summary]').forEach(btn=>btn.addEventListener('click',()=>cal.scrollIntoView({behavior:'smooth',block:'center'})));panel.querySelector('[data-archic-close]').addEventListener('click',()=>{document.querySelector('[data-enquiry]')?.classList.remove('open');document.querySelector('[data-enquiry]')?.setAttribute('aria-hidden','true');document.body.classList.remove('lock')});
    form.addEventListener('submit',e=>{
      e.preventDefault();e.stopImmediatePropagation();const fd=new FormData(form),state=readState(),vehicle=vehicleFor(fd.get('car'),state),from=String(fd.get('from')||''),to=String(fd.get('to')||''),name=String(fd.get('name')||'').trim(),phone=String(fd.get('phone')||'').trim();
      if(!vehicle||!from||!to||!name||!phone){availability.className='archic-availability is-unavailable';availability.querySelector('strong').textContent=lang()==='es'?'Completa coche, fechas, nombre y teléfono.':'Complete vehicle, dates, name and phone.';return}
      if(conflicts(vehicle.id,from,to,state)){availability.className='archic-availability is-unavailable';availability.querySelector('strong').textContent=lang()==='es'?'Ese rango ya no está disponible. Elige otras fechas.':'That range is no longer available. Choose other dates.';renderCalendar();return}
      const now=new Date(),id=`MF-${String(now.getFullYear()).slice(-2)}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}-${uid().slice(0,4)}`,request={id,vehicleId:vehicle.id,vehicleName:vehicle.name,from,to,name,phone,email:String(fd.get('email')||'').trim(),pickup:String(fd.get('pickup')||'').trim(),notes:String(fd.get('notes')||'').trim(),status:'pending',createdAt:now.toISOString(),updatedAt:now.toISOString(),source:'website'};
      state.requests.unshift(request);logActivity(state,'request-created',id,`New request from ${name} · ${vehicle.name}`);saveState(state);form.hidden=true;const success=panel.querySelector('[data-request-success]');success.hidden=false;success.innerHTML=`<div class="archic-success-icon">✓</div><p class="kicker">REQUEST ${esc(id)}</p><h3>${lang()==='es'?'Solicitud enviada':'Request received'}</h3><p>${lang()==='es'?'Mfinity ya tiene la solicitud en Archic Control. Revisará disponibilidad y podrá llamarte, escribirte por WhatsApp o modificar las condiciones antes de aceptar.':'Mfinity now has the request inside Archic Control. They can review availability, call or WhatsApp you, and adjust the details before accepting.'}</p><div class="archic-success-summary"><div><span>${esc(vehicle.name)}</span><strong>${humanDate(from)} → ${humanDate(to)}</strong></div><div><span>${esc(name)}</span><strong>${esc(phone)}</strong></div></div><div class="archic-success-actions"><button type="button" data-new-request>${lang()==='es'?'Nueva solicitud':'New request'}</button><a href="${CONTROL_PATH}">Open Archic Control →</a></div>`;success.querySelector('[data-new-request]').onclick=()=>{success.hidden=true;form.hidden=false;form.reset();select.value=state.vehicles[0]?.id||'';resetDates()};
    },true);
    renderCalendar();renderAvailability();
  }

  function enhanceCatalogForm(){
    const form=document.querySelector('[data-catalog-form]');if(!form||form.dataset.archicBound==='1')return;form.dataset.archicBound='1';const phone=form.querySelector('input[name="phone"]')?.closest('label');if(phone&&!form.querySelector('input[name="email"]'))phone.insertAdjacentHTML('afterend','<label><span>Email</span><input name="email" type="email" autocomplete="email"></label>');const submit=form.querySelector('[type="submit"]');if(submit)submit.textContent='Send rental request';
    form.addEventListener('submit',e=>{e.preventDefault();e.stopImmediatePropagation();const fd=new FormData(form),state=readState(),item=String(fd.get('item')||'').trim(),vehicle=vehicleFor(item,state)||state.vehicles.find(v=>item.toLowerCase().includes(v.name.toLowerCase()))||null,from=String(fd.get('from')||''),to=String(fd.get('to')||''),name=String(fd.get('name')||'').trim(),phone=String(fd.get('phone')||'').trim();if(!vehicle||!from||!to||!name||!phone){alert('Please complete vehicle, dates, name and phone.');return}if(conflicts(vehicle.id,from,to,state)){alert('Those dates are currently unavailable for this vehicle.');return}const now=new Date(),id=`MF-${String(now.getFullYear()).slice(-2)}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}-${uid().slice(0,4)}`;state.requests.unshift({id,vehicleId:vehicle.id,vehicleName:vehicle.name,from,to,name,phone,email:String(fd.get('email')||'').trim(),pickup:'',notes:String(fd.get('notes')||'').trim(),status:'pending',createdAt:now.toISOString(),updatedAt:now.toISOString(),source:'catalog'});logActivity(state,'request-created',id,`New request from ${name} · ${vehicle.name}`);saveState(state);form.innerHTML=`<div class="archic-inline-success"><b>Request ${esc(id)} received.</b><p>Mfinity can now manage it inside Archic Control and contact ${esc(name)} directly.</p><a href="${CONTROL_PATH}">Open Archic Control →</a></div>`},true);
  }

  function addControlEntry(){ if(document.querySelector('[data-archic-control-entry]'))return;const nav=document.querySelector('.nav-actions,.catalog-actions');if(!nav)return;const a=document.createElement('a');a.dataset.archicControlEntry='1';a.href=CONTROL_PATH;a.className='archic-control-entry';a.textContent='Control';a.setAttribute('aria-label','Open Archic Control demo');nav.insertBefore(a,nav.firstChild); }
  function init(){injectCss();enhanceStateFromCatalog();buildMainEnquiry();enhanceCatalogForm();addControlEntry();new MutationObserver(()=>{enhanceStateFromCatalog();buildMainEnquiry();enhanceCatalogForm();addControlEntry()}).observe(document.documentElement,{childList:true,subtree:true});}
  window.MfinityArchic={readState,saveState,conflicts,blockedDates,vehicleFor,storeKey:STORE};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
