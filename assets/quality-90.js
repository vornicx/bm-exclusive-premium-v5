/* Mfinity 90+ quality pass — focused rental positioning, mobile ergonomics and commercial clarity. */
(() => {
  const CSS = `
    /* Final readability floor for functional and commercial UI. */
    .mf-q90-readable{font-size:12px!important;line-height:1.42!important}
    .mf-q90-target{min-width:44px!important;min-height:44px!important}

    /* Keep the homepage focused on car rental. Properties remain available as a separate product, not a primary journey. */
    .properties{display:none!important}

    /* Less template-like hero treatment: let the real car carry the composition. */
    .hero-media:after{background:linear-gradient(90deg,rgba(0,0,0,.34) 0%,rgba(0,0,0,.10) 38%,transparent 68%)!important}
    .hero-shade{background:linear-gradient(0deg,rgba(0,0,0,.58),transparent 40%),linear-gradient(180deg,rgba(0,0,0,.18),transparent 22%)!important}
    .hero-panel{background:rgba(5,5,5,.28)!important;backdrop-filter:none!important;border-width:1px 0 0!important;border-color:rgba(255,255,255,.38)!important}
    .hero-panel button{border-bottom:1px solid rgba(255,255,255,.22)!important}
    .hero-lead{max-width:540px!important}

    /* Commercial/local proof immediately after the first decision. */
    .mf-local-proof{background:#f2f2ee;color:#0a0a09;border-bottom:1px solid rgba(0,0,0,.14)}
    .mf-local-proof-inner{min-height:92px;display:grid;grid-template-columns:1.25fr repeat(3,1fr);align-items:stretch}
    .mf-local-proof-item{display:flex;flex-direction:column;justify-content:center;padding:16px 24px;border-right:1px solid rgba(0,0,0,.12)}
    .mf-local-proof-item:first-child{padding-left:0}.mf-local-proof-item:last-child{border-right:0}
    .mf-local-proof-item span{font:600 12px/1.2 Montserrat,Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#777770}
    .mf-local-proof-item strong{margin-top:7px;font:600 14px/1.4 Inter,Arial,sans-serif;color:#11110f}

    /* One clear primary booking action, discovery secondary. */
    .hero-actions{margin-top:0!important}
    .hero-actions .button-solid{font-size:12px!important;color:#d7d7d2!important;border-color:rgba(255,255,255,.36)!important}
    .mf-availability button{font-size:12px!important;min-height:56px!important}
    .mf-availability-note{font-size:12px!important;color:#d8d8d3!important}
    .mf-availability-note a{min-height:44px;display:inline-flex;align-items:center;text-decoration:underline;text-underline-offset:3px}
    .mf-hero-terms{font-size:12px!important}

    /* Never let the sticky action rail cover content. */
    @media(max-width:980px){
      .mf-local-proof-inner{grid-template-columns:1fr 1fr}
      .mf-local-proof-item{min-height:78px;border-bottom:1px solid rgba(0,0,0,.12)}
      .mf-local-proof-item:nth-child(2n){border-right:0}
    }
    @media(max-width:640px){
      body{padding-bottom:calc(68px + env(safe-area-inset-bottom))!important}
      .mobile-quick{min-height:68px!important;height:calc(68px + env(safe-area-inset-bottom));padding-bottom:env(safe-area-inset-bottom)!important;background:#080808!important;border-top:1px solid rgba(255,255,255,.18)!important}
      .mobile-quick a,.mobile-quick button{min-height:68px!important;font-size:12px!important}
      .mf-local-proof-inner{grid-template-columns:1fr 1fr}
      .mf-local-proof-item{min-height:76px;padding:12px 13px!important}
      .mf-local-proof-item:first-child{padding-left:13px}
      .mf-local-proof-item span{font-size:11px!important}.mf-local-proof-item strong{font-size:12.5px!important}
      .mf-availability{grid-template-columns:1fr 1fr!important}
      .mf-availability label{min-height:52px!important;padding:6px 10px!important}
      .mf-availability label:nth-of-type(3){display:flex!important;grid-column:1/-1!important;min-height:50px!important}
      .mf-availability button{grid-column:1/-1!important;min-height:52px!important}
      .mf-availability-note{font-size:12px!important;line-height:1.4!important}
    }
  `;

  function injectStyle(){
    if(document.querySelector('[data-mfinity-q90-style]')) return;
    const style=document.createElement('style');
    style.dataset.mfinityQ90Style='1';
    style.textContent=CSS;
    document.head.appendChild(style);
  }

  function cleanCopy(root=document){
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    const nodes=[]; while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node=>{
      let value=node.nodeValue||'';
      value=value.replace(/What\s*App/gi,'WhatsApp')
                 .replace(/Co\s*ta del Sol/gi,'Costa del Sol')
                 .replace(/Adress:/gi,'Address:');
      if(value!==node.nodeValue) node.nodeValue=value;
    });
  }

  function focusRental(){
    document.querySelectorAll('.desktop-nav a[href="#properties"],.mobile-menu a[href="#properties"]').forEach(a=>a.remove());
    document.querySelector('.properties')?.setAttribute('aria-hidden','true');
  }

  function addProcessClarity(){
    const note=document.querySelector('.mf-availability-note');
    if(note){
      note.innerHTML='<b>Availability enquiry.</b> Dates and final terms are confirmed directly by Mfinity. <a href="https://wa.me/34663557861" target="_blank" rel="noreferrer">WhatsApp Mfinity</a>.';
    }
    const terms=document.querySelector('.mf-hero-terms');
    if(terms){
      terms.innerHTML='<span>Ferrari 488 Spyder · from €1,400/day</span><span>Deposit €7,000 · longer rentals on request</span>';
    }
  }

  function addLocalProof(){
    if(document.querySelector('.mf-local-proof')) return;
    const anchor=document.querySelector('.mf-trust') || document.querySelector('.hero');
    if(!anchor) return;
    const section=document.createElement('section');
    section.className='mf-local-proof';
    section.setAttribute('aria-label','Mfinity Marbella rental facts');
    section.innerHTML=`<div class="shell mf-local-proof-inner">
      <div class="mf-local-proof-item"><span>Marbella base</span><strong>Nueva Andalucía · Pol. Ind. Nueva Campana, nave 109</strong></div>
      <div class="mf-local-proof-item"><span>Vehicle care</span><strong>Regular inspections and maintenance</strong></div>
      <div class="mf-local-proof-item"><span>Airport option</span><strong>Mercedes V-Class Maybach · Málaga Airport transfer €250</strong></div>
      <div class="mf-local-proof-item"><span>Direct booking</span><strong>Phone + WhatsApp with the Mfinity team</strong></div>
    </div>`;
    anchor.insertAdjacentElement('afterend',section);
  }

  function readableAndTouchable(){
    document.querySelectorAll('a,button').forEach(el=>{
      const rect=el.getBoundingClientRect();
      if(rect.width>0&&rect.height>0&&(rect.width<44||rect.height<44)) el.classList.add('mf-q90-target');
    });
    document.querySelectorAll('body *').forEach(el=>{
      if(el.matches('script,style,svg,path,h1,h2,h3,h4,h5,h6')) return;
      const rect=el.getBoundingClientRect();
      if(!rect.width||!rect.height) return;
      const px=parseFloat(getComputedStyle(el).fontSize);
      if(px>0&&px<12) el.classList.add('mf-q90-readable');
    });
  }

  let queued=false;
  function apply(){
    queued=false;
    injectStyle();
    focusRental();
    cleanCopy(document.body||document);
    addProcessClarity();
    addLocalProof();
    readableAndTouchable();
  }
  function schedule(){if(queued)return;queued=true;requestAnimationFrame(apply)}

  injectStyle();
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply,{once:true});
  else apply();
  window.addEventListener('load',apply,{once:true});
  [150,400,900].forEach(ms=>setTimeout(apply,ms));
  new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true,characterData:true});
})();