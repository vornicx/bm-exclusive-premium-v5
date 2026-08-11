(()=>{
  const GLYPHS=/[↗↘↙↖↑↓←→✓✔☰×]/g;
  const legacyCarMap={
    '/lamborghini-huracan-tecnica':'/cars/lamborghini-huracan-tecnica',
    '/bmw-540i':'/cars/bmw-540i',
    '/mercedes-g-wagon':'/cars/mercedes-g63',
    '/golf-gti':'/cars/golf-gti',
    '/ferrari-488-spyder':'/cars/ferrari-488-spyder',
    '/mercedes-c63s':'/cars/mercedes-c63s',
    '/audi-rsq3':'/cars/audi-rsq3',
    '/audi-r8':'/cars/audi-r8',
    '/mercedes-a35-amg':'/cars/mercedes-a35-amg',
    '/mercedes-v-class-maybach':'/cars/mercedes-v-class-maybach',
    '/bmw-x6m-competition':'/cars/bmw-x6m-competition',
    '/mercedes-c63s-final-edition':'/cars/mercedes-c63s-final-edition',
    '/range-rover-svr-copy-copy-copy':'/cars/audi-rs5',
    '/range-rover-svr-rental-marbella':'/cars/range-rover-svr'
  };

  const copyMap=new Map([
    ['Original Mfinity listing','View vehicle'],
    ['Ficha original de Mfinity','Ver vehículo'],
    ['View Mfinity source','View vehicle'],
    ['See the full Mfinity collection','Explore the full collection'],
    ['Ver toda la colección Mfinity','Explorar toda la colección'],
    ['Published collection','The collection'],
    ['Real cars. Real Mfinity media.','Choose your Mfinity.'],
    ['Published vehicle pages','Featured models'],
    ['Extended booking selection','Additional models'],
    ['Media policy','Availability'],
    ['Mfinity assets only','Direct confirmation'],
    ['Extended rental selection.','More ways to drive Mfinity.'],
    ['Catalog concept · Mfinity media only',''],
    ['Concept redesign for presentation',''],
    ['Rediseño conceptual para presentación','']
  ]);

  function legacyToInternal(raw){
    try{
      const u=new URL(raw,location.origin);
      if(!/(^|\.)mfinity\.es$/i.test(u.hostname)) return null;
      let p=u.pathname.replace(/\/+$/,'')||'/';
      if(p.startsWith('/wp-content/')) return null;
      if(p==='/privacy-policy') return '__REMOVE__';
      if(p==='/cars'||p==='/rent-online') return '/cars';
      if(/^\/apartment-[a-z0-9-]+$/i.test(p)) return '/properties/'+p.slice(1);
      if(legacyCarMap[p]) return legacyCarMap[p];
      if(p==='/') return '/';
      return '/';
    }catch(_){return null}
  }

  function customerFacingText(node){
    if(node.nodeType!==Node.TEXT_NODE) return;
    let value=node.nodeValue||'';
    for(const [from,to] of copyMap){
      if(value.includes(from)) value=value.replaceAll(from,to);
    }
    value=value.replace(GLYPHS,'').replace(/\s{2,}/g,' ');
    if(value!==node.nodeValue) node.nodeValue=value;
  }

  function rewriteAnchor(a){
    const raw=a.getAttribute('href');
    if(!raw) return;
    const internal=legacyToInternal(raw);
    if(internal==='__REMOVE__'){
      a.remove();
      return;
    }
    if(!internal) return;
    a.setAttribute('href',internal);
    a.removeAttribute('target');
    a.removeAttribute('rel');
    const label=(a.textContent||'').trim();
    if(/original mfinity listing|ficha original de mfinity|view mfinity source/i.test(label)){
      a.textContent=internal.startsWith('/properties/')?'View property':document.documentElement.lang==='es'?'Ver vehículo':'View vehicle';
    }
    if(location.pathname.replace(/\/+$/,'')===internal.replace(/\/+$/,'') && a.matches('.secondary')) a.remove();
  }

  function normalizeControls(root=document){
    root.querySelectorAll?.('[data-prev]').forEach(b=>{b.textContent='Prev';b.setAttribute('aria-label','Previous car')});
    root.querySelectorAll?.('[data-next]').forEach(b=>{b.textContent='Next';b.setAttribute('aria-label','Next car')});
    root.querySelectorAll?.('[data-catalog-menu]').forEach(b=>{b.textContent='Menu'});
    root.querySelectorAll?.('.catalog-close').forEach(b=>{b.textContent='';b.setAttribute('aria-label','Close');b.classList.add('icon-close')});
    root.querySelectorAll?.('.enquiry-head [data-close-enquiry]').forEach(b=>{b.textContent='';b.setAttribute('aria-label','Close');b.classList.add('icon-close')});
    root.querySelectorAll?.('.step > i,.hero-foot i,.catalog-card-meta i,.catalog-list > a > i').forEach(el=>el.remove());
    root.querySelectorAll?.('.catalog-breadcrumb span').forEach(el=>{if(/^[↗↘↙↖↑↓←→✓✔☰×]+$/.test((el.textContent||'').trim()))el.remove()});
  }

  function removePrototypeLanguage(root=document){
    root.querySelectorAll?.('.detail-source').forEach(el=>el.remove());
    root.querySelectorAll?.('.footer-bottom span,.catalog-footer-bottom span').forEach(el=>{
      if(/concept|rediseño conceptual|catalog concept/i.test(el.textContent||'')) el.remove();
    });
    root.querySelectorAll?.('.catalog-section-head p').forEach(el=>{
      if(/public Mfinity listing|source does not expose|photography is never substituted/i.test(el.textContent||'')){
        el.textContent=el.closest('.property-grid')?'Explore Mfinity properties in Marbella.':'Explore the current Mfinity fleet, from supercars and performance cars to luxury SUVs and premium transport.';
      }
    });
    root.querySelectorAll?.('.catalog-extended-head p').forEach(el=>{
      el.textContent='More models are available through Mfinity. Select a vehicle to request current specifications, rates and availability.';
    });
  }

  function clean(root=document){
    if(root.nodeType===Node.TEXT_NODE){customerFacingText(root);return}
    root.querySelectorAll?.('a[href]').forEach(rewriteAnchor);
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);nodes.forEach(customerFacingText);
    normalizeControls(root);
    removePrototypeLanguage(root);
  }

  let running=false;
  function schedule(root=document){
    if(running)return;running=true;
    requestAnimationFrame(()=>{running=false;clean(root)});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>clean(document));
  else clean(document);

  new MutationObserver(mutations=>{
    for(const m of mutations){
      if(m.type==='attributes'&&m.target instanceof HTMLAnchorElement) rewriteAnchor(m.target);
      m.addedNodes.forEach(n=>{if(n.nodeType===Node.ELEMENT_NODE||n.nodeType===Node.TEXT_NODE)schedule(n.nodeType===Node.ELEMENT_NODE?n:document)});
      if(m.type==='characterData') customerFacingText(m.target);
    }
  }).observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['href']});
})();
