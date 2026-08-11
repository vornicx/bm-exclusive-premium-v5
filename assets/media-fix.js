/* Reliable visual media for the Mfinity catalog.
   Keeps the visual catalog complete even when a remote source image fails. */
(() => {
  const exactMedia = {
    '/cars/bmw-x6m-competition': [
      'https://mfinity.es/wp-content/uploads/2024/04/BMW-X6M-Competition-Marbella-Rental-Final-768x576.jpg',
      'https://mfinity.es/wp-content/uploads/2024/04/BMW-X6M-Competition-Marbella-Rental-768x576.jpg',
      'https://mfinity.es/wp-content/uploads/2024/04/BMW-X6M-Competition-Marbella-Rental2-768x576.jpg',
      'https://mfinity.es/wp-content/uploads/2024/04/BMW-X6M-Competition-Marbella-Rental3-768x576.jpg',
      'https://mfinity.es/wp-content/uploads/2024/04/BMW-X6M-Competition-Marbella-Rental4-768x576.jpg',
      'https://images.pexels.com/photos/193991/pexels-photo-193991.jpeg?auto=compress&cs=tinysrgb&w=1800'
    ],
    '/cars/mercedes-c63s-final-edition': [
      'https://mfinity.es/wp-content/uploads/2024/04/Mercedes-C63S%E2%80%8B-White-Rental-Marbella-768x576.jpg',
      'https://mfinity.es/wp-content/uploads/2024/04/Mercedes-C63S%E2%80%8B-rental-Marbella-13-768x576.jpg',
      'https://mfinity.es/wp-content/uploads/2024/04/Mercedes-C63S%E2%80%8B-rental-Marbella-14-768x576.jpg',
      'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1800'
    ],
    '/properties/apartment-imara': [
      'https://media.inmobalia.com/imgV1/B95mbh8olwFQm~uCUaVOI2kQT0hb0a8sZ9turUNfnwtvuccYCzs0YVPfPbfkc2VnnN1JFDpiXNU9xzJ~Ag4Bkq8Dwf9938ppZALLMGpg~i~PYxQv7FngtGXA8acMfMPp0n~07D3~d1ZYMTGtw6iYdXsITV97IyPIxJyvIDrNEcdruuSJzWh7_eIZ3fwImC55GLlqb1A9GOFpzQq_DKvhvmtDr97elHaAroeXQgIOAKihFaxCoaUUyFNFNelbO9VBNYoTYuD7JwO9D74AiZFwH2sLZcOWMPKn_jB36OE3IjQg8H87KUw1qidCkcvm9YmvkHV2GSIhjj9qFg6dwipVfQnY_NEn6SPJBsyPoO8DJyoh67OPwnKTIH8z~tnqfcm__fQjsxyINKNCkJ5T6Ii4er~2I~jbnXU~oy2neG5Yf3buuDw9ixk74w--.jpg',
      'https://media.inmobalia.com/imgV1/B95mbh8olwFQm~uCUaVOI2kQT0hb0a8sZ9turUNfnwtvuccYCzs0YVPfPbfkc2VnnN1JFDpiXNU9xzJ~Ag4Bkq8Dwf8oy1Jb5HpUKioTbSI5a_LhYPlT68xEzxGdVGu3JVB_f_99_7yeLYCyuZewbY~dDOsJViLvkui1l4ti5z4GgNYdww6b8r79~GsrU1YjUoG_PvdpZifwTIVTaEiO6hZOFJDv~wOH7rg_JMZI5Z41KI0hozXrVXU1U~XdEqOSomNeCK7sbUvmIRqe8ZEZSZm~iohdXHPm1DspvuUJNINGj~tcTe8R59AiomPuHMVNQIqmyEc1pydgPwICOn0KvKtJVBnA~04I3mo13X9IqVQgXfEBFlmUUQoE0ASB~bi0n3UcTtfaj28AII958IykHAZsqP4a4RoX~5OsqXyiGmJUnEP6Jre6NA--.jpg',
      'https://media.inmobalia.com/imgV1/B95mbh8olwFQm~uCUaVOI2kQT0hb0a8sZ9turUNfnwtvuccYCzs0YVPfPbfkc2VnnN1JFDpiXNU9xzJ~Ag4Bkq8Dwf8sCAtXC6Inx6pqQgzaJicfroAIH6oq~9YDybi6Dsu8peBoPyMulCtWpdI4Qmn5YwbKQ9ALrp59wDryp_JoNRjtjdPK7LrCT9fWTX6aeeZSJkO7TTg7BKLiVp_AXirr33es5z4q4WTxw~rHvYdk0QnopFWFh9bWyOh53~cG7sE8bpCDHaQeTDnf8bn5XUd4ihtxnvURgqT4USAYGXXk_GZS5WKsqOlVHGLtNo5XCU03dnGeoFgTrrH1YWhdqslmq9PxvSmvBWAZJmpICsEc_671mwFkPxtavCxs9oGP3NbXYxPtAb2VU3STBPgGctjiSOGo2CjrGRDpKQNs1RNxWd08grjWIQ--.jpg'
    ],
    '/properties/apartment-adrienne': [
      'https://media.inmobalia.com/imgV1/B95mbh8olwFQm~uCUaVOI2kQT0hb0a8sZ9turUNfnwtvuccYCzs0YVPfPbfkc2VnnN1JFDpiXNU9xzJ~Ag4BkQx9S3BfCFRnA2ejLoGjVXZrgJunRzO1yd3aTFWoeUSRpOLsoOHHY7kH6YMqYFlwpZVvdp5LxSzIzPlPFsxSmbvNCdPS~bqIOkpQINysCgtaBAD31mfgcUJpPlyWz7f2y0z0dl87CWgFe6~0M60PA8WxnS6M3jgB2JfzrhawG3dNd7e7WMQacKDcwehtSDvxtEOEMnvbsvzIIL9LPk5Y3XcLUi3hNtkxJr6kXUbB65ENC3oQtrV~QvQny9gC7GGwu_9rbQExCz4Rbs28PUQQGnYbaNj172iMMyMJolxA~FC9C8yIDkS7wzZwAnMMrtxYjMvjyfr4w0SI6hUgk78iQKnuSK13dpTJdQ--.jpg',
      'https://media.inmobalia.com/imgV1/B95mbh8olwFQm~uCUaVOI2kQT0hb0a8sZ9turUNfnwtvuccYCzs0YVPfPbfkc2VnnN1JFDpiXNU9xzJ~Ag4BkQx9S3BZoqrdNNgX7R6oaGZPuQlA7oN0Nokw_BESyEBpqWL78sbg_XdIiCUHapmJqBJA21gZVXDitUO6zZP9EPhB8NKEY3fH0DRTGfgNrUQB6~d9~lvCgh5t04USuwRj6iDSocG5P9uGmwOz~Kv490I_Npq36YtqBlP3qnrsmUpWWZevh73dGmV1pabG6fT~lr8m4RRuk~bFWUH3bNw8QCGh2uAN09RcQHByY~6V3OezERv1wcGCLwNn9kgdX4pCLRf3X2Tx289mFU5B8UlM18c6aeVcl5yRP68NMGGcYdkCW~J1cXZ1D1A6GRqI4W0SQuBF~mv5lS2EiGWWDzkEMTZDy1mzSW3j3Q--.jpg',
      'https://media.inmobalia.com/imgV1/B95mbh8olwFQm~uCUaVOI2kQT0hb0a8sZ9turUNfnwtvuccYCzs0YVPfPbfkc2VnnN1JFDpiXNU9xzJ~Ag4BkQx9S3AIBbgS4hub2lvIzHntIalVl8Cxid5Hh0P~h0jqr~~g5EsAveWGtstdTmUigE8UkvXRr~DXzFnADHBVpdHneJHc2NjQOt9ZO~QfeM3j0eRJgcSZFbnkO8WTiySESH2QTKXTLewhcA8Bu5gJ9mh3kcXgChEH7_Lx3WU7BgCUARbLcoQcqpXNFgQ_nWGobatn53AU2R32oK9MG91gNzJqFDrKlri2uaCzmtRvyTsgpNwyF8u6oAGNWv9NTW4MOWz8xJ37u6TrFR~0xacSNZc4L0MMM9Q18shCkTpwkhCXIic7RLMwEY0TIpD3ETDGgH7JyDtaR2SNajBjAmEZbzAnnaHEZ_xZag--.jpg'
    ],
    '/properties/apartment-malibu': [
      'https://media.inmobalia.com/imgV1/B95mbh8olwFQm~uCT2wPZNsw48fOO6fZf2JyyLpmtnY9L0eInQUz5tkQklYaK00tmbVSLp7oW~DxsNL8uFLTe2LD0az6MpSXPk9NEqaP3emhjNo7wLY4OzILmvw9dLDjzfwktbfSY0yg9xGPFOtvCAH348lBLKxN3w34sLaLW9lXNshw3lyEE1x8FbQT6qceSbo6AJecl_G~kQWr3U4Egs7xDbJLhew1udGG_z~Z2mq_9oWIgHnbeUSdO_G3TznIdyKTiMfgNOCOshAaaVA7OonLW1TfMpjyGIzYp8kxnpsnRxeO6fiNPyTi28nT4ens2E4H85QYUhjXG4a8BjkUV_fi.webp',
      'https://media.inmobalia.com/imgV1/B95mbh8olwFQm~uCT2wPZNsw48fOO6fZf2JyyLpmtnY9L0eInQUz5tkQklYaK00tmbVSLp7oW~DxsNLqmC1BJjk12uwB3Vzx26hORsweL9~yEX9Sk8jEaM58bUtvuKwUbWupwgLpHDtacnVpAnZnGp7O8Wi7uB3guBqhxLeSBtcRAIILOXD5iSD~7SQJdyFcjuU5MWkvEyT2zIVSt3IcxbEji24w~DWyb~ctgPh8Vr8Lj34e388H5WRpn1XGCX0JtoxK_xixiJ~5p~_HL3tF0KXziQYA1n6jmcNJAUBj54NRGGRrFdWH_Nhx_mVKLDIWCRPJyFg-.webp',
      'https://media.inmobalia.com/imgV1/B95mbh8olwFQm~uCT2wPZNsw48fOO6fZf2JyyLpmtnY9L0eInQUz5tkQklYaK00tmbVSLp7oW~DxsNLqmC1BJjk12uwCENy1rT2Nk40LZVEYnbHK6g2ChpVq16i88j_HijnWMfqFe99CbYP8N7cWVn7RP2bO1wDg_2J8icCqJMIb3W~QdmDn9YH7Mtoa5DkFq1TU3K2C1g1xQflBpfO71faT93G6XR2NrSExQZk25NFulGiHsoT4RKwzhIsz2FnU72hspw5V0u8ZvXK9xy2MlwbLZd2haSZzBcGtt6H6rl3YCPXCMV5bQ6wVdVbPkAXdbk8fLfqW.webp'
    ]
  };

  const uniq = values => [...new Set((values || []).filter(Boolean))];
  const pathFor = el => {
    try { return new URL(el.getAttribute('href'), location.origin).pathname.replace(/\/+$/, ''); }
    catch (_) { return ''; }
  };

  function catalogItemForPath(path) {
    const catalog = window.MFINITY_CATALOG;
    if (!catalog) return null;
    if (path.startsWith('/cars/')) {
      const slug = path.split('/').filter(Boolean)[1];
      return [...(catalog.detailedCars || []), ...(catalog.extendedCars || [])].find(item => item.slug === slug) || null;
    }
    if (path.startsWith('/properties/')) {
      const slug = path.split('/').filter(Boolean)[1];
      return (catalog.properties || []).find(item => item.slug === slug) || null;
    }
    return null;
  }

  function genericForItem(item, path) {
    if (exactMedia[path]) return exactMedia[path];
    if (!item) return [];
    const slug = item.slug || '';
    const category = String(item.category || '').toLowerCase();
    if (slug.includes('maybach')) return [
      'https://images.pexels.com/photos/8425022/pexels-photo-8425022.jpeg?auto=compress&cs=tinysrgb&w=1800',
      'https://images.pexels.com/photos/2365572/pexels-photo-2365572.jpeg?auto=compress&cs=tinysrgb&w=1800'
    ];
    if (slug.includes('audi-rs5')) return [
      'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1800',
      'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=1800'
    ];
    if (slug.includes('g63') || category.includes('suv')) return [
      'https://images.pexels.com/photos/193991/pexels-photo-193991.jpeg?auto=compress&cs=tinysrgb&w=1800'
    ];
    if (category.includes('supercar')) return [
      'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1800'
    ];
    if (category.includes('performance')) return [
      'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1800'
    ];
    return [];
  }

  function sourcesForPath(path) {
    const item = catalogItemForPath(path);
    return uniq([...(exactMedia[path] || []), ...((item && item.images) || []), ...genericForItem(item, path)]);
  }

  function patchCatalogData() {
    const catalog = window.MFINITY_CATALOG;
    if (!catalog) return;
    [...(catalog.detailedCars || []), ...(catalog.properties || [])].forEach(item => {
      const prefix = (catalog.properties || []).includes(item) ? '/properties/' : '/cars/';
      const path = prefix + item.slug;
      item.images = uniq([...(item.images || []), ...genericForItem(item, path), ...(exactMedia[path] || [])]);
    });
  }

  function resilientImage(container, sources, alt, eager = false) {
    if (!container || !sources.length) return;
    const key = sources.join('|');
    if (container.dataset.mediaFixKey === key) return;
    container.dataset.mediaFixKey = key;
    container.classList.remove('no-media', 'media-failed');
    container.querySelectorAll('.catalog-card-tag').forEach(tag => tag.remove());

    let img = container.querySelector('img');
    if (!img) {
      img = document.createElement('img');
      container.prepend(img);
    }
    img.alt = alt || '';
    img.decoding = 'async';
    img.loading = eager ? 'eager' : 'lazy';
    img.referrerPolicy = 'no-referrer';
    let index = 0;
    img.onerror = () => {
      index += 1;
      if (index < sources.length) img.src = sources[index];
      else container.classList.add('media-failed');
    };
    img.src = sources[index];
  }

  function patchCards() {
    document.querySelectorAll('.catalog-card').forEach(card => {
      const path = pathFor(card);
      const item = catalogItemForPath(path);
      const sources = sourcesForPath(path);
      const media = card.querySelector('.catalog-card-media');
      if (media && sources.length) resilientImage(media, sources, item?.name || '', false);
      media?.querySelectorAll('.catalog-card-tag').forEach(tag => tag.remove());
    });
    document.querySelectorAll('.catalog-card-tag').forEach(tag => tag.remove());
  }

  function patchRouteHeroAndGallery() {
    const path = location.pathname.replace(/\/+$/, '') || '/';
    let sources = sourcesForPath(path);
    if (path === '/properties') sources = exactMedia['/properties/apartment-imara'];
    if (!sources?.length) return;

    const hero = document.querySelector('.catalog-hero');
    const heroMedia = hero?.querySelector('.catalog-hero-media');
    if (hero && heroMedia) {
      resilientImage(heroMedia, sources, '', true);
      hero.classList.remove('empty');
    }

    const noGallery = document.querySelector('.detail-no-gallery');
    const item = catalogItemForPath(path);
    if (noGallery && item) {
      const gallery = document.createElement('div');
      gallery.className = 'detail-gallery';
      sources.slice(0, 3).forEach((src, i) => {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = src;
        img.alt = `${item.name} — image ${i + 1}`;
        img.loading = i === 0 ? 'eager' : 'lazy';
        img.decoding = 'async';
        img.referrerPolicy = 'no-referrer';
        figure.appendChild(img);
        gallery.appendChild(figure);
      });
      noGallery.replaceWith(gallery);
    }
  }

  function addPrecisionStyles() {
    if (document.querySelector('[data-media-fix-style]')) return;
    const style = document.createElement('style');
    style.dataset.mediaFixStyle = '1';
    style.textContent = `
      .catalog-card-media{overflow:hidden;background:#0d0d0d}
      .catalog-card-media img,.catalog-hero-media img,.detail-gallery img{width:100%;height:100%;object-fit:cover;display:block}
      .catalog-card-media img{transition:transform .7s cubic-bezier(.2,.65,.25,1),filter .35s ease;filter:saturate(.94) contrast(1.035)}
      .catalog-card:hover .catalog-card-media img{transform:scale(1.018);filter:saturate(1) contrast(1.045)}
      .catalog-card-media.media-failed{background:linear-gradient(135deg,#111,#171717)}
      .property-grid .catalog-card-media{aspect-ratio:16/10}
      .property-grid .catalog-card-media img{object-position:center}
    `;
    document.head.appendChild(style);
  }

  let scheduled = false;
  function apply() {
    scheduled = false;
    patchCatalogData();
    addPrecisionStyles();
    patchCards();
    patchRouteHeroAndGallery();
  }
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(apply);
  }

  apply();
  new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
})();
