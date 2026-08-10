import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 4173);
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.ico':'image/x-icon'};

http.createServer(async (req,res)=>{
  try{
    const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    let file = path.join(root, pathname === '/' ? 'index.html' : pathname.replace(/^\//,''));
    if(!file.startsWith(root)) throw new Error('bad path');
    const info = await stat(file).catch(()=>null);
    if(info?.isDirectory()) file = path.join(file,'index.html');
    const data = await readFile(file);
    res.writeHead(200,{'content-type':types[path.extname(file)]||'application/octet-stream','cache-control':'no-cache'});
    res.end(data);
  }catch{
    res.writeHead(404,{'content-type':'text/plain; charset=utf-8'});res.end('Not found');
  }
}).listen(port,()=>console.log(`Mfinity preview: http://localhost:${port}`));
