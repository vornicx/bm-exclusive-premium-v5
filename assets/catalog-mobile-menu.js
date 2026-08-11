/* Dedicated mobile navigation for Mfinity catalog pages. */
(() => {
  const STYLE_ID = 'mfinity-catalog-mobile-menu-style';
  const MENU_ID = 'mfinity-catalog-mobile-menu';

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .catalog-menu{width:48px!important;height:48px!important;min-width:48px!important;padding:0!important;border:0!important;background:transparent!important;color:#fff!important;display:none!important;align-items:center!important;justify-content:center!important;position:relative!important}
      .mf-hamburger{width:30px;height:22px;display:flex;flex-direction:column;justify-content:space-between;align-items:flex-end;pointer-events:none}
      .mf-hamburger i{display:block;height:1.5px;background:currentColor;border-radius:99px;transition:transform .35s cubic-bezier(.16,1,.3,1),width .35s cubic-bezier(.16,1,.3,1),opacity .2s ease;transform-origin:center}
      .mf-hamburger i:nth-child(1){width:30px}.mf-hamburger i:nth-child(2){width:22px}.mf-hamburger i:nth-child(3){width:30px}
      .catalog-menu:active .mf-hamburger i:nth-child(2){width:30px}

      .catalog-mobile-menu-layer{position:fixed;z-index:220;inset:0;overflow:hidden;background:radial-gradient(circle at 82% 8%,#181818 0,#0b0b0b 28%,#060606 64%);color:#f6f6f4;display:flex;flex-direction:column;padding:max(24px,env(safe-area-inset-top)) 24px max(24px,env(safe-area-inset-bottom));transform:translateY(-102%);visibility:hidden;pointer-events:none;transition:transform .56s cubic-bezier(.16,1,.3,1),visibility 0s linear .56s}
      .catalog-mobile-menu-layer:before{content:'M';position:absolute;right:-.08em;bottom:-.18em;font:800 78vw/.72 Montserrat,sans-serif;letter-spacing:-.12em;color:rgba(255,255,255,.018);pointer-events:none}
      .catalog-mobile-menu-layer.is-open{transform:none;visibility:visible;pointer-events:auto;transition:transform .56s cubic-bezier(.16,1,.3,1),visibility 0s}
      .catalog-mobile-menu-top{position:relative;z-index:2;display:flex;align-items:center;justify-content:space-between;gap:20px;padding-bottom:20px;border-bottom:1px solid rgba(255,255,255,.15)}
      .catalog-mobile-menu-logo{display:inline-flex;align-items:center}.catalog-mobile-menu-logo img{display:block;height:43px;width:auto;filter:brightness(0) invert(1)}
      .catalog-mobile-menu-close{appearance:none;width:46px;height:46px;border:1px solid rgba(255,255,255,.18);border-radius:999px;background:rgba(255,255,255,.025);color:#fff;position:relative;padding:0;backdrop-filter:blur(10px)}
      .catalog-mobile-menu-close:before,.catalog-mobile-menu-close:after{content:'';position:absolute;left:13px;right:13px;top:50%;height:1.5px;background:#fff;border-radius:99px}.catalog-mobile-menu-close:before{transform:rotate(45deg)}.catalog-mobile-menu-close:after{transform:rotate(-45deg)}

      .catalog-mobile-menu-nav{position:relative;z-index:2;margin:auto 0;padding:28px 0 22px}
      .catalog-mobile-menu-nav a{position:relative;display:grid;grid-template-columns:34px minmax(0,1fr) auto;gap:15px;align-items:end;padding:19px 0 20px;border-bottom:1px solid rgba(255,255,255,.12);color:#f6f6f4;text-decoration:none}
      .catalog-mobile-menu-nav a:first-child{border-top:1px solid rgba(255,255,255,.12)}
      .catalog-mobile-menu-nav span{align-self:center;font:600 9px/1 Montserrat,sans-serif;letter-spacing:.08em;color:#666661}
      .catalog-mobile-menu-nav strong{font:650 clamp(34px,10.3vw,50px)/.92 Montserrat,sans-serif;letter-spacing:-.055em}
      .catalog-mobile-menu-nav a:after{content:'';width:9px;height:9px;border-top:1px solid #777;border-right:1px solid #777;transform:rotate(45deg);margin:0 4px 8px 0;transition:transform .25s ease,border-color .25s ease}
      .catalog-mobile-menu-nav a:active:after{transform:translateX(3px) rotate(45deg);border-color:#fff}

      .catalog-mobile-menu-bottom{position:relative;z-index:2;display:grid;gap:13px;padding-top:18px;border-top:1px solid rgba(255,255,255,.14)}
      .catalog-mobile-menu-cta{appearance:none;border:0;background:#f5f5f2;color:#080808;min-height:56px;width:100%;font:700 10px/1 Montserrat,sans-serif;letter-spacing:.14em;text-transform:uppercase;box-shadow:0 12px 34px rgba(0,0,0,.18)}
      .catalog-mobile-menu-meta{display:flex;justify-content:space-between;gap:18px;padding-top:2px;font:500 10px/1.4 Inter,sans-serif;color:#6f6f6a}
      body.catalog-menu-open{overflow:hidden!important}
      @media(max-width:900px){.catalog-menu{display:inline-flex!important}}
      @media(min-width:901px){.catalog-mobile-menu-layer{display:none!important}}
      @media(max-height:690px){.catalog-mobile-menu-nav a{padding:14px 0}.catalog-mobile-menu-nav strong{font-size:32px}.catalog-mobile-menu-nav{padding:18px 0}.catalog-mobile-menu-cta{min-height:50px}}
      @media(prefers-reduced-motion:reduce){.catalog-mobile-menu-layer,.mf-hamburger i{transition:none!important}}
    `;
    document.head.appendChild(style);
  }

  function buildMenu() {
    let menu = document.getElementById(MENU_ID);
    if (menu) return menu;
    menu = document.createElement('div');
    menu.id = MENU_ID;
    menu.className = 'catalog-mobile-menu-layer';
    menu.setAttribute('aria-hidden', 'true');
    menu.innerHTML = `
      <div class="catalog-mobile-menu-top">
        <a class="catalog-mobile-menu-logo" href="/" data-catalog-mobile-link aria-label="Mfinity home">
          <img src="https://mfinity.es/wp-content/uploads/2023/06/cropped-Logotipas0-206x69.png" alt="Mfinity">
        </a>
        <button class="catalog-mobile-menu-close" type="button" data-catalog-mobile-close aria-label="Close navigation"></button>
      </div>
      <nav class="catalog-mobile-menu-nav" aria-label="Mobile navigation">
        <a href="/cars" data-catalog-mobile-link><span>01</span><strong>Cars</strong></a>
        <a href="/#experience" data-catalog-mobile-link><span>02</span><strong>About</strong></a>
        <a href="/properties" data-catalog-mobile-link><span>03</span><strong>Properties</strong></a>
        <a href="/#contact" data-catalog-mobile-link><span>04</span><strong>Contact</strong></a>
      </nav>
      <div class="catalog-mobile-menu-bottom">
        <button class="catalog-mobile-menu-cta" type="button" data-catalog-mobile-enquire>Check availability</button>
        <div class="catalog-mobile-menu-meta"><span>Marbella · Costa del Sol</span><span>Mfinity</span></div>
      </div>`;
    document.body.appendChild(menu);
    return menu;
  }

  function decorateTriggers() {
    document.querySelectorAll('[data-catalog-menu]').forEach(btn => {
      btn.innerHTML = '<span class="mf-hamburger" aria-hidden="true"><i></i><i></i><i></i></span>';
      btn.setAttribute('aria-label','Open navigation');
      btn.setAttribute('aria-expanded','false');
      btn.setAttribute('aria-controls',MENU_ID);
    });
  }

  function init() {
    injectStyle();
    const menu = buildMenu();
    decorateTriggers();
    const triggers = () => [...document.querySelectorAll('[data-catalog-menu]')];

    function setOpen(open) {
      menu.classList.toggle('is-open', open);
      menu.setAttribute('aria-hidden', open ? 'false' : 'true');
      document.body.classList.toggle('catalog-menu-open', open);
      triggers().forEach(btn => {
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        btn.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      });
      if (open) requestAnimationFrame(() => menu.querySelector('[data-catalog-mobile-close]')?.focus({preventScroll:true}));
    }

    document.addEventListener('click', event => {
      const trigger = event.target.closest?.('[data-catalog-menu]');
      if (trigger) { event.preventDefault(); setOpen(true); return; }
      if (event.target.closest?.('[data-catalog-mobile-close]')) { event.preventDefault(); setOpen(false); return; }
      if (event.target.closest?.('[data-catalog-mobile-link]')) { setOpen(false); return; }
      if (event.target.closest?.('[data-catalog-mobile-enquire]')) {
        event.preventDefault();
        setOpen(false);
        setTimeout(() => document.querySelector('[data-catalog-enquire]')?.click(), 80);
      }
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.classList.contains('is-open')) setOpen(false);
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900 && menu.classList.contains('is-open')) setOpen(false);
    }, {passive:true});
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
