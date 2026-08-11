const ALLOWED = new Set(['mfinity.es','www.mfinity.es','images.pexels.com','media.inmobalia.com']);

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = async (req,res) => {
  try {
    const raw = Array.isArray(req.query.src) ? req.query.src[0] : req.query.src;
    if (!raw) return res.status(400).send('Missing src');
    const url = new URL(raw);
    if (url.protocol !== 'https:' || !ALLOWED.has(url.hostname)) return res.status(403).send('Source not allowed');

    const headers = {
      'user-agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1',
      'accept':'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      'accept-language':'en-GB,en;q=0.9,es;q=0.8',
      'referer':'https://mfinity.es/'
    };

    let upstream = null;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        upstream = await fetch(url, {headers, redirect:'follow'});
        if (upstream.ok) break;
      } catch (_) {}
      if (attempt < 2) await sleep(120 * (attempt + 1));
    }

    if (!upstream || !upstream.ok) return res.status(upstream?.status || 502).send('Upstream image unavailable');
    const type = upstream.headers.get('content-type') || 'image/jpeg';
    if (!type.startsWith('image/')) return res.status(415).send('Invalid media type');
    const body = Buffer.from(await upstream.arrayBuffer());
    if (!body.length) return res.status(502).send('Empty upstream image');

    res.setHeader('Content-Type',type);
    res.setHeader('Cache-Control','public, max-age=86400, s-maxage=2592000, stale-while-revalidate=2592000');
    res.setHeader('CDN-Cache-Control','public, s-maxage=2592000, stale-while-revalidate=2592000');
    return res.status(200).send(body);
  } catch (_) {
    return res.status(500).send('Media proxy error');
  }
};
