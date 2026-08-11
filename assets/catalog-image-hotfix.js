/* Exact-model fallback images for the three Mfinity cards whose origin media is unreliable. */
(() => {
  const FIXES = {
    'range-rover-svr': {
      name:'Range Rover SVR',
      images:[
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/2021_Land_Rover_Range_Rover_Sport_SVR_5.0_Front.jpg/1280px-2021_Land_Rover_Range_Rover_Sport_SVR_5.0_Front.jpg',
        'https://mfinity.es/wp-content/uploads/2024/04/Range-Rover-SVR-rental-marbella.jpg',
        'https://mfinity.es/wp-content/uploads/2024/04/Range-Rover-SVR-rental-marbella4.jpg'
      ],
      credit:'Range Rover Sport SVR photo: Vauxford / Wikimedia Commons · CC BY-SA 4.0'
    },
    'bmw-x6m-competition': {
      name:'BMW X6M Competition',
      images:[
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/BMW_X6_M_Competition_%28G06%29_IMG_3572.jpg/1280px-BMW_X6_M_Competition_%28G06%29_IMG_3572.jpg',
        'https://mfinity.es/wp-content/uploads/2024/04/BMW-X6M-Competition-Marbella-Rental-Final-768x576.jpg'
      ],
      credit:'BMW X6 M Competition photo: Alexander Migl / Wikimedia Commons · CC BY-SA 4.0'
    },
    'mercedes-c63s-final-edition': {
      name:'Mercedes-AMG C63S Final Edition',
      images:[
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/2022_Mercedes_C63_S_AMG_Final_Edition_Auto_1.jpg/1280px-2022_Mercedes_C63_S_AMG_Final_Edition_Auto_1.jpg',
        'https://mfinity.es/wp-content/uploads/2024/04/Final-Mercedes-C63S-Final-Edition-Marbella-Car-Rental-1.jpg'
      ],
      credit:'Mercedes C63 S AMG photo: Calreyn88 / Wikimedia Commons · CC BY-SA 4.0'
    }
  };

  const pathSlug = href => {
    try { const p=new URL(href,location.origin).pathname.split('/').filter(Boolean); return p[0]==='cars'?p[1]||'':''; }
    catch(_){ return ''; }
  };

  function updateData(){
    const catalog=window.MFINITY_CATALOG;
    if(!catalog?.detailedCars)return false;
    Object.entries(FIXES).forEach(([slug,fix])=>{
      const item=catalog.detailedCars.find(x=>x.slug===slug);
      if(item) item.images=[...fix.images,...(item.images||[]).filter(src=>!fix.images.includes(src))];
    });
    return true;
  }

  function freshImage(fix){
    const img=document.createElement('img');
    img.alt=`${fix.name} — Mfinity`;
    img.loading='lazy';
    img.decoding='async';
    img.title=fix.credit;
    img.src=fix.images[0];
    return img;
  }

  function patchCards(){
    document.querySelectorAll('.catalog-card[href]').forEach(card=>{
      const slug=pathSlug(card.getAttribute('href'));
      const fix=FIXES[slug];
      if(!fix)return;
      const media=card.querySelector('.catalog-card-media');
      if(!media)return;
      media.classList.remove('no-media','media-failed');
      media.querySelectorAll('img,.mfinity-media-placeholder').forEach(el=>el.remove());
      const tag=media.querySelector('.catalog-card-tag');
      if(tag) tag.textContent='MFINITY MEDIA';
      media.prepend(freshImage(fix));
    });
  }

  function patchDetail(){
    const parts=location.pathname.split('/').filter(Boolean);
    if(parts[0]!=='cars')return;
    const fix=FIXES[parts[1]];
    if(!fix)return;

    const hero=document.querySelector('.catalog-hero');
    const heroMedia=hero?.querySelector('.catalog-hero-media');
    if(hero&&heroMedia){
      hero.classList.remove('empty');
      heroMedia.querySelectorAll('img,.mfinity-media-placeholder').forEach(el=>el.remove());
      const img=freshImage(fix);img.loading='eager';img.fetchPriority='high';heroMedia.prepend(img);
    }

    const empty=document.querySelector('.detail-no-gallery');
    if(empty){
      const gallery=document.createElement('div');gallery.className='detail-gallery';
      const figure=document.createElement('figure');figure.appendChild(freshImage(fix));gallery.appendChild(figure);
      empty.replaceWith(gallery);
    } else {
      const gallery=document.querySelector('.detail-gallery');
      if(gallery&&!gallery.querySelector('img')){
        const figure=document.createElement('figure');figure.appendChild(freshImage(fix));gallery.prepend(figure);
      }
    }
  }

  function apply(){ if(!updateData())return false; patchCards(); patchDetail(); return true; }

  let tries=0;
  const boot=()=>{
    if(apply())return;
    if(++tries<30)setTimeout(boot,80);
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
