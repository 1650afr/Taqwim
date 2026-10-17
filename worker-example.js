// Contoh backend perantara Cloudflare Worker untuk GitHub Pages + JSONBin.io.
// Pasang rahasia di Worker Settings > Variables and Secrets:
// JSONBIN_BIN_ID, JSONBIN_MASTER_KEY
// Jangan memasukkan Master Key ke index.html atau app.js.
// Ini contoh kerangka: atur CORS_ORIGIN dan autentikasi petugas sebelum produksi.
export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowed = env.CORS_ORIGIN || "";
    const cors = {
      "Access-Control-Allow-Origin": origin === allowed ? origin : allowed,
      "Access-Control-Allow-Methods": "GET, PUT, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-User-BIN",
      "Vary": "Origin"
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (!allowed || origin !== allowed) return new Response("Origin tidak diizinkan", {status:403,headers:cors});
    // WAJIB: ganti pemeriksaan ini dengan validasi login/token petugas yang nyata.
    // Jangan menganggap X-User-BIN saja sebagai autentikasi.
    const auth = request.headers.get("Authorization") || "";
    if (!auth.startsWith("Bearer ") || auth.length < 20) {
      return new Response(JSON.stringify({error:"Autentikasi petugas diperlukan"}), {status:401,headers:{...cors,"Content-Type":"application/json"}});
    }
    const url = "https://api.jsonbin.io/v3/b/" + env.JSONBIN_BIN_ID + (request.method === "GET" ? "/latest" : "");
    if (!["GET","PUT","POST"].includes(request.method)) return new Response("Method tidak diizinkan",{status:405,headers:cors});
    const headers = {"X-Master-Key":env.JSONBIN_MASTER_KEY,"Content-Type":"application/json"};
    let upstream;
    if(request.method==="GET") {
      upstream=await fetch(url,{headers:{"X-Master-Key":env.JSONBIN_MASTER_KEY}});
      if(!upstream.ok)return new Response(await upstream.text(),{status:upstream.status,headers:cors});
      const result=await upstream.json();
      return new Response(JSON.stringify(result),{headers:{...cors,"Content-Type":"application/json"}});
    }
    const body=await request.text();
    let parsed; try { parsed=JSON.parse(body); } catch { return new Response("JSON tidak valid",{status:400,headers:cors}); }
    upstream=await fetch("https://api.jsonbin.io/v3/b/"+env.JSONBIN_BIN_ID,{method:"PUT",headers,body:JSON.stringify(parsed)});
    const text=await upstream.text();
    return new Response(text,{status:upstream.status,headers:{...cors,"Content-Type":"application/json"}});
  }
};
