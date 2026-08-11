/* Stable Mfinity media layer.
   Uses exact Mfinity media only, cached through this deployment. Never substitutes another car model. */
(() => {
  const RENTAL_SCRIPT='/assets/rental-system.js';
  const proxy = raw => raw && /^https:\/\//i.test(raw) ? `/api/media?src=${encodeURIComponent(raw)}` : raw;
  const unique = list => [...new Set((list||[]).filter(Boolean))];

  function loadRentalSystem(){
    if ([...document.scripts].some(s=>s.src.includes(RENTAL_SCRIPT))) return;
    const s=document.createElement('script');s.src=RENTAL_SCRIPT;s.async=true;document.head.appendChild(s);
  }
  function sourcesFor(item){if(!item)return[];return unique((item.images||[]).filter(src=>/mfinity\.es\/wp-content\//i.test(src)))}
  function itemForSlug(slug){const c=window.MFINITY_CATALOG;if(!c)return null;return [...(c.detailedCars||[]),...(c.properties||[])].find(x=>x.slug===slug)||null}
  function slugFromHref(href){try{const parts=new URL(href,location.origin).pathname.split('/').filter(Boolean);return parts[1]||''}catch(_){return''}}
  function placeholder(container,label='Mfinity'){if(!container)return;container.classList.add('media-failed');let p=container.querySelector('.mfinity-media-placeholder');if(!p){p=document.createElement('div');p.className='mfinity-media-placeholder';container.appendChild(p)}p.innerHTML=`<span>MFINITY</span><small>${String(label||'Media').replace(/[<>]/g,'')}</small>`}
  function resilient(img,rawSources,alt=''){
    if(!img)return;const originals=unique(rawSources),queue=[];originals.forEach(src=>{queue.push(proxy(src));queue.push(src)});const key=queue.join('|');if(img.dataset.stableMediaKey===key&&img.getAttribute('src'))return;img.dataset.stableMediaKey=key;img.alt=alt;img.decoding='async';img.referrerPolicy='strict-origin-when-cross-origin';let i=0,attempt=0;
    const next=()=>{if(i>=queue.length){placeholder(img.closest('.catalog-card-media,.catalog-hero-media,figure,.fleet-image-wrap,.hero-media,.marbella-image'),alt);return}const src=queue[i++];attempt++;if(!src)return next();img.src=src};
    img.onload=()=>{const box=img.closest('.catalog-card-media,.catalog-hero-media,figure,.fleet-image-wrap,.hero-media,.marbella-image');box?.classList.remove('media-failed','no-media');box?.querySelector('.mfinity-media-placeholder')?.remove()};img.onerror=()=>{if(attempt<queue.length+2)setTimeout(next,attempt<3?80:220);else next()};next();
  }
  function patchCatalog(){
    const c=window.MFINITY_CATALOG;if(!c)return;[...(c.detailedCars||[]),...(c.properties||[])].forEach(item=>{item.images=sourcesFor(item)});
    document.querySelectorAll('.catalog-card').forEach(card=>{const item=itemForSlug(slugFromHref(card.getAttribute('href'))),sources=sourcesFor(item),media=card.querySelector('.catalog-card-media');if(!media||!sources.length)return;media.classList.remove('no-media','media-failed');media.querySelectorAll('.catalog-card-tag,.mfinity-media-placeholder').forEach(x=>x.remove());let img=media.querySelector('img');if(!img){img=document.createElement('img');media.prepend(img)}resilient(img,sources,`${item.name} — Mfinity`)});
    const parts=location.pathname.split('/').filter(Boolean);if(['cars','properties'].includes(parts[0])&&parts[1]){const item=itemForSlug(parts[1]),sources=sourcesFor(item);if(item&&sources.length){const hero=document.querySelector('.catalog-hero'),media=hero?.querySelector('.catalog-hero-media');if(hero&&media){hero.classList.remove('empty');let img=media.querySelector('img');if(!img){img=document.createElement('img');media.prepend(img)}resilient(img,sources,item.name)}document.querySelectorAll('.detail-gallery img').forEach((img,i)=>resilient(img,[sources[i%sources.length]],`${item.name} — image ${i+1}`))}}
  }
  function hardenGlobalImages(){
    document.querySelectorAll('img').forEach(img=>{if(img.closest('.catalog-card-media,.catalog-hero-media,.detail-gallery'))return;const current=img.getAttribute('src')||'',isDirect=/^https:\/\/(?:www\.)?mfinity\.es\/wp-content\//i.test(current);if(!isDirect)return;if(img.dataset.originalMfinitySrc===current&&img.dataset.globalStable==='1')return;img.dataset.originalMfinitySrc=current;img.dataset.globalStable='1';resilient(img,[current],img.alt||'Mfinity')});
  }
  function addStyles(){if(document.querySelector('[data-stable-media-style]'))return;const style=document.createElement('style');style.dataset.stableMediaStyle='1';style.textContent=`.mfinity-media-placeholder{position:absolute;inset:0;display:grid;place-content:center;text-align:center;gap:5px;background:linear-gradient(135deg,#111,#1c1c1c);color:#fff;z-index:1}.mfinity-media-placeholder span{font:700 15px Montserrat,sans-serif;letter-spacing:.18em}.mfinity-media-placeholder small{font:500 9px Inter,sans-serif;color:#888}.catalog-card-media,.catalog-hero-media,.fleet-image-wrap,.hero-media,.marbella-image,figure{position:relative}.media-failed>img{opacity:0}`;document.head.appendChild(style)}
  let queued=false;function apply(){queued=false;addStyles();patchCatalog();hardenGlobalImages()}function schedule(){if(queued)return;queued=true;requestAnimationFrame(apply)}
  loadRentalSystem();if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule,{once:true});else schedule();new MutationObserver(mutations=>{let needs=false;for(const m of mutations){if(m.type==='childList'||(m.type==='attributes'&&m.attributeName==='src')){needs=true;break}}if(needs)schedule()}).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['src']});
})();
