import { cp, mkdir, rm } from 'node:fs/promises';

const out = new URL('../dist/', import.meta.url);
const root = new URL('../', import.meta.url);

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await mkdir(new URL('assets/', out), { recursive: true });

await cp(new URL('index.html', root), new URL('index.html', out));
await cp(new URL('assets/mfinity.css', root), new URL('assets/mfinity.css', out));
await cp(new URL('assets/mfinity.js', root), new URL('assets/mfinity.js', out));

console.log('Mfinity static build created in dist/');
