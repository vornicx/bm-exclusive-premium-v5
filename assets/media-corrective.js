/* Stable Mfinity media layer — exact-model retries, graceful fallback, mobile hotfix. */
(() => {
  const RENTAL_SCRIPT='/assets/rental-system.js';
  const HOTFIX='/assets/mobile-hotfix.css';
  const proxy = raw => raw && /^https:\/\//i.test(raw) ? `/api/media?src=${encodeURIComponent(raw)}` : raw;
  const unique = list => [...new Set((list||[]).filter(Boolean))];

  function loadAssets(){
    if (![...document.querySelectorAll('link[rel="stylesheet"]')].some(l=>l.href.includes(HOTFIX))) {
      const l=document.createElement('link');l.rel='stylesheet';l.href=HOTFIX;document.head.appendChild(l);
    }
    if (![...document.scripts].some(s=>s.src.includes(RENTAL_SCRIPT))) {
      const s=document.createElement('script');s.src=RENTAL_SCRIPT;s.async=true;document.head.appendChild(s);
    }
  }

  function sourcesFor(item){
    if(!item)return[];
    return unique((item.images||[]).filter(src=>{
      if(/^https:\/\/(?:www\.)?mfinity\.es\/wp-content\//i.test(src)) return true;
      if(/^https:\/\/(?:commons|upload)\.wikimedia\.org\//i.test(src)) return true;
      return false;
    }));
  }
  function itemForSlug(slug){
    const c=window.MFINITY_CATALOG;if(!c)return null;
    return [...(c.detailedCars||[]),...(c.properties||[])].find(x=>x.slug===slug)||null;
  }
  function slugFromHref(href){
    try{const parts=new URL(href,location.origin).pathname.split('/').filter(Boolean);return parts[1]||''}catch(_){return''}
  }
  function mediaBox(img){return img?.closest('.catalog-card-media,.catalog-hero-media,.detail-gallery figure,.fleet-image-wrap,.hero-media,.marbella-image,figure')||null}

  function placeholder(box,label='Mfinity'){
    if(!box)return;
    box.classList.add('media-failed');
    let p=box.querySelector(':scope > .mfinity-media-placeholder');
    if(!p){p=document.createElement('div');p.className='mfinity-media-placeholder';box.appendChild(p)}
    p.innerHTML=`<span>MFINITY</span><small>${String(label||'Media').replace(/[<>]/g,'')}</small>`;
  }

  function resilient(img,rawSources,alt=''){
    if(!img)return;
    const originals=unique(rawSources);
    if(!originals.length){placeholder(mediaBox(img),alt);return}
    const key=originals.join('|');
    if(img.dataset.stableMediaKey===key && img.complete && img.naturalWidth>0) return;
    img.dataset.stableMediaKey=key;
    img.alt=alt;
    img.decoding='async';
    img.referrerPolicy='no-referrer-when-downgrade';

    const queue=[];
    originals.forEach(src=>{queue.push(proxy(src));queue.push(src)});
    let index=0;
    const box=mediaBox(img);

    const success=()=>{
      box?.classList.remove('media-failed','no-media');
      box?.querySelector(':scope > .mfinity-media-placeholder')?.remove();
      img.style.opacity='';img.style.visibility='';
    };
    const fail=()=>{
      if(index>=queue.length){img.onerror=null;img.onload=null;img.removeAttribute('src');img.alt='';placeholder(box,alt);return}
      const next=queue[index++];
      if(!next)return fail();
      img.src=next;
    };
    img.onload=()=>{if(img.naturalWidth>1)success();else fail()};
    img.onerror=()=>setTimeout(fail,index<2?70:160);
    fail();
  }

  function patchCatalog(){
    const c=window.MFINITY_CATALOG;if(!c)return;
    document.querySelectorAll('.catalog-card').forEach(card=>{
      const item=itemForSlug(slugFromHref(card.getAttribute('href'))),sources=sourcesFor(item),media=card.querySelector('.catalog-card-media');
      if(!media||!item)return;
      media.classList.remove('no-media');
      let img=media.querySelector('img');
      if(!img&&sources.length){img=document.createElement('img');media.prepend(img)}
      if(img&&sources.length)resilient(img,sources,`${item.name} — Mfinity`);else placeholder(media,item.name);
    });

    const parts=location.pathname.split('/').filter(Boolean);
    if(['cars','properties'].includes(parts[0])&&parts[1]){
      const item=itemForSlug(parts[1]),sources=sourcesFor(item);
      if(item){
        const hero=document.querySelector('.catalog-hero'),media=hero?.querySelector('.catalog-hero-media');
        if(hero&&media&&sources.length){hero.classList.remove('empty');let img=media.querySelector('img');if(!img){img=document.createElement('img');media.prepend(img)}resilient(img,sources,item.name)}
        document.querySelectorAll('.detail-gallery img').forEach((img,i)=>resilient(img,[sources[i%sources.length]||sources[0]],`${item.name} — image ${i+1}`));
      }
    }
  }

  function patchGlobal(){
    document.querySelectorAll('img').forEach(img=>{
      if(img.closest('.catalog-card-media,.catalog-hero-media,.detail-gallery'))return;
      const current=img.dataset.originalMfinitySrc || img.getAttribute('src') || '';
      if(!/^https:\/\/(?:www\.)?mfinity\.es\/wp-content\//i.test(current))return;
      img.dataset.originalMfinitySrc=current;
      resilient(img,[current],img.alt||'Mfinity');
    });
  }

  let queued=false;
  function apply(){queued=false;patchCatalog();patchGlobal()}
  function schedule(){if(queued)return;queued=true;requestAnimationFrame(apply)}

  loadAssets();
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule,{once:true});else schedule();

  const observer=new MutationObserver(mutations=>{
    let needs=false;
    for(const m of mutations){
      if(m.type==='childList' && m.addedNodes.length){needs=true;break}
      if(m.type==='attributes' && m.attributeName==='src' && m.target.matches?.('[data-car-image]')){needs=true;break}
    }
    if(needs)schedule();
  });
  observer.observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['src']});
})();
