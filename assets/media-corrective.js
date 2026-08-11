/* Mfinity media corrective layer.
   Never substitutes a different car model. Remote assets are proxied to avoid hotlink failures. */
(() => {
  const proxy = url => `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=1800&q=90&output=jpg`;
  const unique = list => [...new Set((list || []).filter(Boolean))];

  const exact = {
    'bmw-x6m-competition': [
      proxy('https://www.thegablessportscars.com/imagetag/279/4/l/Used-2021-BMW-X6-M-COMPETITION-M-COMPETITION.jpg'),
      proxy('https://www.otokokpit.com/wp-content/uploads/2019/11/2020-yeni-bmw-x6-m-competition-6.jpg'),
      proxy('https://mfinity.es/wp-content/uploads/2024/04/BMW-X6M-Competition-Marbella-Rental-Final-768x576.jpg'),
      proxy('https://mfinity.es/wp-content/uploads/2024/04/BMW-X6M-Competition-Marbella-Rental-768x576.jpg')
    ],
    'mercedes-c63s-final-edition': [
      proxy('https://listing-images.autoscout24.ch/listing/361/12527361/548234037.jpg?q=90&w=1920'),
      proxy('https://mfinity.es/wp-content/uploads/2024/04/Final-Mercedes-C63S-Final-Edition-Marbella-Car-Rental-1.jpg')
    ],
    'apartment-imara': [
      proxy('https://media.inmobalia.com/imgV1/B95mbh8olwFQm~uCUaVOI2kQT0hb0a8sZ9turUNfnwtvuccYCzs0YVPfPbfkc2VnnN1JFDpiXNU9xzJ~Ag4Bkq8Dwf9938ppZALLMGpg~i~PYxQv7FngtGXA8acMfMPp0n~07D3~d1ZYMTGtw6iYdXsITV97IyPIxJyvIDrNEcdruuSJzWh7_eIZ3fwImC55GLlqb1A9GOFpzQq_DKvhvmtDr97elHaAroeXQgIOAKihFaxCoaUUyFNFNelbO9VBNYoTYuD7JwO9D74AiZFwH2sLZcOWMPKn_jB36OE3IjQg8H87KUw1qidCkcvm9YmvkHV2GSIhjj9qFg6dwipVfQnY_NEn6SPJBsyPoO8DJyoh67OPwnKTIH8z~tnqfcm__fQjsxyINKNCkJ5T6Ii4er~2I~jbnXU~oy2neG5Yf3buuDw9ixk74w--.jpg'),
      proxy('https://media.inmobalia.com/imgV1/B95mbh8olwFQm~uCUaVOI2kQT0hb0a8sZ9turUNfnwtvuccYCzs0YVPfPbfkc2VnnN1JFDpiXNU9xzJ~Ag4Bkq8Dwf8oy1Jb5HpUKioTbSI5a_LhYPlT68xEzxGdVGu3JVB_f_99_7yeLYCyuZewbY~dDOsJViLvkui1l4ti5z4GgNYdww6b8r79~GsrU1YjUoG_PvdpZifwTIVTaEiO6hZOFJDv~wOH7rg_JMZI5Z41KI0hozXrVXU1U~XdEqOSomNeCK7sbUvmIRqe8ZEZSZm~iohdXHPm1DspvuUJNINGj~tcTe8R59AiomPuHMVNQIqmyEc1pydgPwICOn0KvKtJVBnA~04I3mo13X9IqVQgXfEBFlmUUQoE0ASB~bi0n3UcTtfaj28AII958IykHAZsqP4a4RoX~5OsqXyiGmJUnEP6Jre6NA--.jpg')
    ],
    'apartment-adrienne': [
      proxy('https://media.inmobalia.com/imgV1/B95mbh8olwFQm~uCUaVOI2kQT0hb0a8sZ9turUNfnwtvuccYCzs0YVPfPbfkc2VnnN1JFDpiXNU9xzJ~Ag4BkQx9S3BfCFRnA2ejLoGjVXZrgJunRzO1yd3aTFWoeUSRpOLsoOHHY7kH6YMqYFlwpZVvdp5LxSzIzPlPFsxSmbvNCdPS~bqIOkpQINysCgtaBAD31mfgcUJpPlyWz7f2y0z0dl87CWgFe6~0M60PA8WxnS6M3jgB2JfzrhawG3dNd7e7WMQacKDcwehtSDvxtEOEMnvbsvzIIL9LPk5Y3XcLUi3hNtkxJr6kXUbB65ENC3oQtrV~QvQny9gC7GGwu_9rbQExCz4Rbs28PUQQGnYbaNj172iMMyMJolxA~FC9C8yIDkS7wzZwAnMMrtxYjMvjyfr4w0SI6hUgk78iQKnuSK13dpTJdQ--.jpg'),
      proxy('https://media.inmobalia.com/imgV1/B95mbh8olwFQm~uCUaVOI2kQT0hb0a8sZ9turUNfnwtvuccYCzs0YVPfPbfkc2VnnN1JFDpiXNU9xzJ~Ag4BkQx9S3BZoqrdNNgX7R6oaGZPuQlA7oN0Nokw_BESyEBpqWL78sbg_XdIiCUHapmJqBJA21gZVXDitUO6zZP9EPhB8NKEY3fH0DRTGfgNrUQB6~d9~lvCgh5t04USuwRj6iDSocG5P9uGmwOz~Kv490I_Npq36YtqBlP3qnrsmUpWWZevh73dGmV1pabG6fT~lr8m4RRuk~bFWUH3bNw8QCGh2uAN09RcQHByY~6V3OezERv1wcGCLwNn9kgdX4pCLRf3X2Tx289mFU5B8UlM18c6aeVcl5yRP68NMGGcYdkCW~J1cXZ1D1A6GRqI4W0SQuBF~mv5lS2EiGWWDzkEMTZDy1mzSW3j3Q--.jpg')
    ],
    'apartment-malibu': [
      proxy('https://media.inmobalia.com/imgV1/B95mbh8olwFQm~uCT2wPZNsw48fOO6fZf2JyyLpmtnY9L0eInQUz5tkQklYaK00tmbVSLp7oW~DxsNL8uFLTe2LD0az6MpSXPk9NEqaP3emhjNo7wLY4OzILmvw9dLDjzfwktbfSY0yg9xGPFOtvCAH348lBLKxN3w34sLaLW9lXNshw3lyEE1x8FbQT6qceSbo6AJecl_G~kQWr3U4Egs7xDbJLhew1udGG_z~Z2mq_9oWIgHnbeUSdO_G3TznIdyKTiMfgNOCOshAaaVA7OonLW1TfMpjyGIzYp8kxnpsnRxeO6fiNPyTi28nT4ens2E4H85QYUhjXG4a8BjkUV_fi.webp'),
      proxy('https://media.inmobalia.com/imgV1/B95mbh8olwFQm~uCT2wPZNsw48fOO6fZf2JyyLpmtnY9L0eInQUz5tkQklYaK00tmbVSLp7oW~DxsNLqmC1BJjk12uwB3Vzx26hORsweL9~yEX9Sk8jEaM58bUtvuKwUbWupwgLpHDtacnVpAnZnGp7O8Wi7uB3guBqhxLeSBtcRAIILOXD5iSD~7SQJdyFcjuU5MWkvEyT2zIVSt3IcxbEji24w~DWyb~ctgPh8Vr8Lj34e388H5WRpn1XGCX0JtoxK_xixiJ~5p~_HL3tF0KXziQYA1n6jmcNJAUBj54NRGGRrFdWH_Nhx_mVKLDIWCRPJyFg-.webp')
    ]
  };

  function allItems() {
    const c = window.MFINITY_CATALOG;
    if (!c) return [];
    return [...(c.detailedCars || []), ...(c.properties || [])];
  }

  function prepareData() {
    for (const item of allItems()) {
      if (exact[item.slug]) {
        item.images = unique(exact[item.slug]);
        continue;
      }
      // Only this exact item's own Mfinity images are allowed. No category/generic substitutions.
      item.images = unique((item.images || []).map(src => src.includes('mfinity.es/') ? proxy(src) : src));
    }
  }

  function itemForSlug(slug) {
    return allItems().find(item => item.slug === slug) || null;
  }

  function slugFromHref(href) {
    try {
      const parts = new URL(href, location.origin).pathname.split('/').filter(Boolean);
      return parts[1] || '';
    } catch (_) { return ''; }
  }

  function setResilientImage(img, sources, alt = '') {
    if (!img || !sources.length) return;
    const key = sources.join('|');
    if (img.dataset.exactMediaKey === key && sources.includes(img.src)) return;
    img.dataset.exactMediaKey = key;
    img.alt = alt;
    img.decoding = 'async';
    img.referrerPolicy = 'no-referrer';
    let index = 0;
    const next = () => {
      if (index >= sources.length) {
        img.removeAttribute('src');
        img.closest('.catalog-card-media,.catalog-hero-media,figure')?.classList.add('media-failed');
        return;
      }
      img.src = sources[index++];
    };
    img.onerror = next;
    next();
  }

  function patchCards() {
    document.querySelectorAll('.catalog-card').forEach(card => {
      const slug = slugFromHref(card.getAttribute('href'));
      const item = itemForSlug(slug);
      if (!item?.images?.length) return;
      const media = card.querySelector('.catalog-card-media');
      if (!media) return;
      media.classList.remove('no-media', 'media-failed');
      media.querySelectorAll('.catalog-card-tag').forEach(el => el.remove());
      let img = media.querySelector('img');
      if (!img) {
        img = document.createElement('img');
        media.prepend(img);
      }
      setResilientImage(img, item.images, `${item.name} — Mfinity`);
    });
  }

  function patchDetail() {
    const parts = location.pathname.split('/').filter(Boolean);
    if (!['cars', 'properties'].includes(parts[0]) || !parts[1]) return;
    const item = itemForSlug(parts[1]);
    if (!item?.images?.length) return;

    const hero = document.querySelector('.catalog-hero');
    const heroMedia = hero?.querySelector('.catalog-hero-media');
    if (hero && heroMedia) {
      hero.classList.remove('empty');
      let img = heroMedia.querySelector('img');
      if (!img) {
        img = document.createElement('img');
        heroMedia.prepend(img);
      }
      setResilientImage(img, item.images, item.name);
    }

    const emptyGallery = document.querySelector('.detail-no-gallery');
    if (emptyGallery) {
      const gallery = document.createElement('div');
      gallery.className = 'detail-gallery';
      item.images.slice(0, 3).forEach((src, i) => {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        figure.appendChild(img);
        gallery.appendChild(figure);
        setResilientImage(img, [src], `${item.name} — image ${i + 1}`);
      });
      emptyGallery.replaceWith(gallery);
    }
  }

  let queued = false;
  function apply() {
    queued = false;
    if (!window.MFINITY_CATALOG) return;
    prepareData();
    patchCards();
    patchDetail();
  }
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(apply);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', schedule, { once: true });
  else schedule();
  new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
})();
