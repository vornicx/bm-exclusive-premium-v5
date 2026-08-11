/* Reliable cross-page navigation to sections on the Mfinity home page. */
(() => {
  const KEY='mfinity_home_section_target';
  const isHome=()=>location.pathname==='/'||location.pathname==='/index.html';

  function sectionFromUrl(){
    const query=new URLSearchParams(location.search).get('section');
    const hash=(location.hash||'').replace(/^#/,'');
    return sessionStorage.getItem(KEY)||query||hash||'';
  }

  function scrollToSection(section,behavior='auto'){
    if(!section)return false;
    const target=document.getElementById(section);
    if(!target)return false;
    target.scrollIntoView({behavior,block:'start'});
    sessionStorage.removeItem(KEY);
    history.replaceState(null,'',`/#${encodeURIComponent(section)}`);
    return true;
  }

  function requestedSection(link){
    if(link?.dataset?.homeSection)return link.dataset.homeSection;
    const raw=link?.getAttribute?.('href')||'';
    const match=raw.match(/^\/#(experience|contact)$/);
    return match?.[1]||'';
  }

  document.addEventListener('click',event=>{
    const link=event.target.closest?.('a[href],[data-home-section]');
    const section=requestedSection(link);
    if(!section)return;
    event.preventDefault();

    if(isHome()){
      scrollToSection(section,'smooth');
      return;
    }

    sessionStorage.setItem(KEY,section);
    location.assign(`/?section=${encodeURIComponent(section)}#${encodeURIComponent(section)}`);
  });

  if(!isHome())return;
  const wanted=sectionFromUrl();
  if(!wanted)return;

  const force=()=>scrollToSection(wanted,'auto');
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',force,{once:true});
  else force();
  window.addEventListener('load',()=>setTimeout(force,0),{once:true});

  [100,300,700,1200,1800].forEach(delay=>setTimeout(force,delay));

  const observer=new MutationObserver(()=>requestAnimationFrame(force));
  const startObserver=()=>{
    if(!document.body)return;
    observer.observe(document.body,{childList:true,subtree:true});
    setTimeout(()=>observer.disconnect(),2200);
  };
  if(document.body)startObserver();
  else document.addEventListener('DOMContentLoaded',startObserver,{once:true});
})();
