const ALLOWED = new Set(['mfinity.es','www.mfinity.es','images.pexels.com','media.inmobalia.com']);

module.exports = async (req,res) => {
  try {
    const raw = Array.isArray(req.query.src) ? req.query.src[0] : req.query.src;
    if (!raw) return res.status(400).send('Missing src');
    const url = new URL(raw);
    if (url.protocol !== 'https:' || !ALLOWED.has(url.hostname)) return res.status(403).send('Source not allowed');
    const upstream = await fetch(url, {headers:{'user-agent':'Mozilla/5.0 MfinityMedia/1.0','accept':'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'}});
    if (!upstream.ok) return res.status(upstream.status).send('Upstream image unavailable');
    const type = upstream.headers.get('content-type') || 'image/jpeg';
    if (!type.startsWith('image/')) return res.status(415).send('Invalid media type');
    const body = Buffer.from(await upstream.arrayBuffer());
    res.setHeader('Content-Type',type);
    res.setHeader('Cache-Control','public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000');
    res.setHeader('CDN-Cache-Control','public, s-maxage=604800, stale-while-revalidate=2592000');
    res.setHeader('Content-Length',String(body.length));
    return res.status(200).send(body);
  } catch (_) {
    return res.status(500).send('Media proxy error');
  }
};
