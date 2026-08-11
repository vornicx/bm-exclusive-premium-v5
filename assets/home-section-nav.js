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

  document.addEventListener('click',event=>{
    const link=event.target.closest?.('[data-home-section]');
    if(!link)return;
    const section=link.dataset.homeSection;
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
  setTimeout(force,120);
  setTimeout(force,450);
})();
