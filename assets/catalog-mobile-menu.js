/* Dedicated mobile navigation for Mfinity catalog pages.
   Kept independent from catalog rendering so the menu cannot become an inert visual control. */
(() => {
  const STYLE_ID = 'mfinity-catalog-mobile-menu-style';
  const MENU_ID = 'mfinity-catalog-mobile-menu';

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .catalog-mobile-menu-layer{position:fixed;z-index:220;inset:0;background:#070707;color:#f6f6f4;display:flex;flex-direction:column;padding:max(22px,env(safe-area-inset-top)) 22px max(24px,env(safe-area-inset-bottom));transform:translateY(-104%);visibility:hidden;pointer-events:none;transition:transform .5s cubic-bezier(.16,1,.3,1),visibility 0s linear .5s}
      .catalog-mobile-menu-layer.is-open{transform:none;visibility:visible;pointer-events:auto;transition:transform .5s cubic-bezier(.16,1,.3,1),visibility 0s}
      .catalog-mobile-menu-top{display:flex;align-items:center;justify-content:space-between;gap:20px;padding-bottom:22px;border-bottom:1px solid rgba(255,255,255,.14)}
      .catalog-mobile-menu-logo{display:inline-flex;align-items:center}
      .catalog-mobile-menu-logo img{display:block;height:42px;width:auto;filter:brightness(0) invert(1)}
      .catalog-mobile-menu-close{appearance:none;border:1px solid rgba(255,255,255,.22);background:transparent;color:#fff;min-width:74px;height:42px;padding:0 15px;font:600 10px/1 Montserrat,sans-serif;letter-spacing:.12em;text-transform:uppercase}
      .catalog-mobile-menu-nav{margin:auto 0;padding:28px 0}
      .catalog-mobile-menu-nav a{display:grid;grid-template-columns:42px 1fr;gap:14px;align-items:center;padding:18px 0;border-bottom:1px solid rgba(255,255,255,.13);color:#f6f6f4;text-decoration:none}
      .catalog-mobile-menu-nav a:first-child{border-top:1px solid rgba(255,255,255,.13)}
      .catalog-mobile-menu-nav span{font:600 9px/1 Montserrat,sans-serif;color:#666661}
      .catalog-mobile-menu-nav strong{font:700 clamp(34px,10vw,54px)/.95 Montserrat,sans-serif;letter-spacing:-.055em}
      .catalog-mobile-menu-bottom{display:grid;gap:10px;padding-top:18px;border-top:1px solid rgba(255,255,255,.14)}
      .catalog-mobile-menu-cta{appearance:none;border:0;background:#fff;color:#080808;min-height:54px;width:100%;font:700 10px/1 Montserrat,sans-serif;letter-spacing:.13em;text-transform:uppercase}
      .catalog-mobile-menu-meta{display:flex;justify-content:space-between;gap:18px;padding-top:9px;font:500 10px/1.4 Inter,sans-serif;color:#777772}
      body.catalog-menu-open{overflow:hidden!important}
      @media(min-width:901px){.catalog-mobile-menu-layer{display:none!important}}
      @media(prefers-reduced-motion:reduce){.catalog-mobile-menu-layer{transition:none!important}}
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
        <button class="catalog-mobile-menu-close" type="button" data-catalog-mobile-close aria-label="Close navigation">Close</button>
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

  function init() {
    injectStyle();
    const menu = buildMenu();
    const triggers = () => [...document.querySelectorAll('[data-catalog-menu]')];

    function setOpen(open) {
      menu.classList.toggle('is-open', open);
      menu.setAttribute('aria-hidden', open ? 'false' : 'true');
      document.body.classList.toggle('catalog-menu-open', open);
      triggers().forEach(btn => {
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        btn.setAttribute('aria-controls', MENU_ID);
      });
      if (open) requestAnimationFrame(() => menu.querySelector('[data-catalog-mobile-close]')?.focus({preventScroll:true}));
    }

    triggers().forEach(btn => {
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-controls', MENU_ID);
    });

    document.addEventListener('click', event => {
      const trigger = event.target.closest?.('[data-catalog-menu]');
      if (trigger) {
        event.preventDefault();
        setOpen(true);
        return;
      }
      if (event.target.closest?.('[data-catalog-mobile-close]')) {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.target.closest?.('[data-catalog-mobile-link]')) {
        setOpen(false);
        return;
      }
      if (event.target.closest?.('[data-catalog-mobile-enquire]')) {
        event.preventDefault();
        setOpen(false);
        setTimeout(() => document.querySelector('[data-catalog-enquire]')?.click(), 60);
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
