const functionPath = "/functions/v1/casa-private";
const calendarFeed = "https://calendar.google.com/calendar/ical/0e32bae1d24b061d01b2f200054c43a118767e5199e7e5e8625e44806554f8c8%40group.calendar.google.com/public/basic.ics";
const allowedAssets = new Map([
  ["styles.css", "text/css; charset=utf-8"], ["fixes.css", "text/css; charset=utf-8"],
  ["app.js", "text/javascript; charset=utf-8"], ["version.json", "application/json; charset=utf-8"],
  ["calendar.ics", "text/calendar; charset=utf-8"], ["navette-estive-2026.jpg", "image/jpeg"],
]);
const encoder = new TextEncoder();
const decoder = new TextDecoder();

function reply(body: BodyInit | null, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "same-origin");
  headers.set("Cache-Control", "private, no-store");
  return new Response(body, { ...init, headers });
}

function cookie(request: Request, name: string) {
  const match = request.headers.get("cookie")?.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function toBase64(bytes: Uint8Array) {
  let text = "";
  for (const byte of bytes) text += String.fromCharCode(byte);
  return btoa(text).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function fromBase64(value: string) {
  const text = value.replaceAll("-", "+").replaceAll("_", "/") + "===".slice((value.length + 3) % 4);
  return Uint8Array.from(atob(text), (character) => character.charCodeAt(0));
}

async function signature(value: string) {
  const secret = Deno.env.get("CASA_SESSION_SECRET");
  if (!secret) throw new Error("Missing CASA_SESSION_SECRET");
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return toBase64(new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(value))));
}

async function createSession() {
  const payload = toBase64(encoder.encode(JSON.stringify({ expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 30 })));
  return `${payload}.${await signature(payload)}`;
}

async function isAuthenticated(request: Request) {
  const token = cookie(request, "casa_session");
  if (!token) return false;
  const [payload, signed] = token.split(".");
  if (!payload || !signed || signed !== await signature(payload)) return false;
  try { return JSON.parse(decoder.decode(fromBase64(payload))).expiresAt > Date.now(); } catch { return false; }
}

function constantTimeEqual(first: string, second: string) {
  const left = encoder.encode(first), right = encoder.encode(second);
  let difference = left.length ^ right.length;
  for (let index = 0; index < Math.max(left.length, right.length); index += 1) difference |= (left[index] ?? 0) ^ (right[index] ?? 0);
  return difference === 0;
}

function loginPage(error = false) {
  const message = error ? "<p class=\"error\">Codice non riconosciuto. Riprova.</p>" : "";
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="Casa Trigoso, maison privée de vacances à Trigoso, Sestri Levante. Guide pratique, tarifs et informations pour famille et amis."><meta name="keywords" content="Casa Trigoso, maison Trigoso, appartement Trigoso, Sestri Levante, Ligurie, vacances en famille"><meta property="og:title" content="Casa Trigoso · Maison privée à Trigoso"><meta property="og:description" content="Une maison privée à Trigoso, Sestri Levante, avec guide pratique, tarifs et informations locales."><link rel="canonical" href="https://dnlrikrqzyspxxsrvovu.supabase.co/functions/v1/casa-private"><title>Casa Trigoso · Maison privée à Trigoso</title><style>body{margin:0;background:#123f3b;color:#fff;font:16px system-ui,sans-serif}.wrap{width:min(1120px,calc(100% - 32px));margin:auto}.hero{min-height:100vh;display:grid;align-items:center;padding:28px 0;box-sizing:border-box}.top{display:flex;justify-content:space-between;align-items:center;margin-bottom:52px}.brand{font-weight:800;display:flex;align-items:center;gap:10px}.mark{width:42px;height:42px;border-radius:50%;display:grid;place-items:center;background:#e46e4f;color:white;font:bold 15px Georgia,serif}.layout{display:grid;grid-template-columns:1.2fr .8fr;gap:72px;align-items:center}.eyebrow{color:#f1ba72;text-transform:uppercase;letter-spacing:.18em;font-size:12px;font-weight:800}.hero h1{font-size:clamp(52px,9vw,104px);line-height:.92;margin:14px 0 24px;letter-spacing:-.06em}.hero h1 em{color:#f1ba72;font-family:Georgia,serif;font-weight:400}.lead{font-size:19px;line-height:1.55;color:#d6dfc4;max-width:540px}.address{display:inline-block;margin-top:22px;color:#fff;text-decoration:none;border:1px solid #76afa5;border-radius:12px;padding:13px 16px}.card{background:#fffaf0;color:#143d3a;border-radius:22px;padding:30px;box-sizing:border-box;box-shadow:0 18px 60px #00221f66}.card h2{font-size:27px;margin:16px 0 8px}.card p{color:#59716e;line-height:1.5}.error{color:#ae3e28;background:#fff1ec;padding:10px 12px;border-radius:10px}label{display:block;font-weight:700;margin:22px 0 8px}input{box-sizing:border-box;width:100%;font:inherit;padding:14px;border:1px solid #b7c5c1;border-radius:10px}button{margin-top:16px;width:100%;border:0;border-radius:10px;background:#df6c4d;color:white;font:700 16px system-ui;padding:14px;cursor:pointer}.info{padding:18px 0 54px;background:#fffaf0;color:#143d3a}.info h2{font-size:36px;margin:0 0 12px}.info p{color:#59716e;line-height:1.6;max-width:720px}.note{font-size:13px;margin-top:20px}@media(max-width:760px){.layout{grid-template-columns:1fr;gap:34px}.hero{min-height:auto;padding:24px 0 44px}.top{margin-bottom:46px}.hero h1{font-size:60px}.card{padding:24px}}
</style></head><body><section class="hero"><div class="wrap"><nav class="top"><div class="brand"><span class="mark">CT</span><span>Casa Trigoso</span></div><span class="eyebrow">Espace privé · Area privata</span></nav><div class="layout"><div><p class="eyebrow">Notre coin de Ligurie</p><h1>Bienvenue<br><em>à Trigoso</em></h1><p class="lead">Une maison privée pour famille et amis à Via Attilio Corte 4, Loc. Trigoso · Sestri Levante (GE). Guide de la maison, tarifs et informations utiles réunis au même endroit.</p><a class="address" href="https://maps.app.goo.gl/U28YDhwNpAVBpk3G8" target="_blank" rel="noopener">Via Attilio Corte 4 · Voir la carte ↗</a></div><main class="card"><div class="mark">CT</div><h2>Accéder au guide privé</h2><p>Entrez le code d’accès pour consulter les instructions de la maison, les tarifs, le calendrier et les bonnes adresses.<br><span lang="it">Inserisci il codice per consultare la guida privata.</span></p>${message}<form method="post" action="${functionPath}"><label for="password">Code d’accès / Codice di accesso</label><input id="password" name="password" type="password" autocomplete="current-password" required autofocus><button type="submit">Entrer / Accedi</button></form><p class="note">L’accès est réservé aux personnes autorisées.</p></main></div></div></section><section class="info"><div class="wrap"><h2>Casa Trigoso · Maison privée à Sestri Levante</h2><p>Casa Trigoso est un appartement privé situé à Trigoso, près de Riva Trigoso et Sestri Levante, en Ligurie. Cette page présente le point d’accès à la guide privée de la maison pour la famille et les amis.</p><p lang="it">Casa Trigoso è un appartamento privato a Trigoso, vicino a Riva Trigoso e Sestri Levante. Qui trovi l’accesso alla guida privata della casa.</p></div></section></body></html>`;
}

async function pageHtml() {
  const htmlResponse = await fetch(`${Deno.env.get("SUPABASE_URL")}/storage/v1/object/casa-assets/index.html`, { headers: { apikey: Deno.env.get("CASA_STORAGE_SERVICE_KEY")!, Authorization: `Bearer ${Deno.env.get("CASA_STORAGE_SERVICE_KEY")}` } });
  if (!htmlResponse.ok) throw new Error("Private site asset unavailable");
  let html = await htmlResponse.text();
  const assetUrl = (name: string) => `${functionPath}?asset=${encodeURIComponent(name)}`;
  html = html.replace(/href="styles\.css[^\"]*"/, `href="${assetUrl("styles.css")}"`);
  html = html.replace(/href="fixes\.css[^\"]*"/, `href="${assetUrl("fixes.css")}"`);
  html = html.replace(/src="app\.js[^\"]*"/, `src="${assetUrl("app.js")}"`);
  html = html.replace(/version\.json\?t=/g, `${assetUrl("version.json")}&t=`);
  html = html.replace(/calendar\.ics\?v=/g, `${assetUrl("calendar.ics")}&v=`);
  return html.replaceAll("navette-estive-2026.jpg", assetUrl("navette-estive-2026.jpg"));
}

Deno.serve(async (request) => {
  const url = new URL(request.url);
  if (request.method === "POST") {
    const expected = Deno.env.get("CASA_ACCESS_PASSWORD") ?? "";
    const given = String((await request.formData()).get("password") ?? "");
    if (!constantTimeEqual(given, expected)) return reply(loginPage(true), { status: 401, headers: { "Content-Type": "text/html; charset=utf-8" } });
    const headers = new Headers({ Location: functionPath });
    headers.append("Set-Cookie", `casa_session=${encodeURIComponent(await createSession())}; Path=${functionPath}; Max-Age=2592000; HttpOnly; Secure; SameSite=Lax`);
    return reply(null, { status: 303, headers });
  }
  if (!await isAuthenticated(request)) return reply(loginPage(), { status: 401, headers: { "Content-Type": "text/html; charset=utf-8" } });
  const asset = url.searchParams.get("asset");
  if (asset === "calendar.ics") {
    const calendar = await fetch(calendarFeed, { headers: { "Cache-Control": "no-cache" } });
    if (!calendar.ok) return reply("Calendar unavailable", { status: 502 });
    return reply(calendar.body, { headers: { "Content-Type": "text/calendar; charset=utf-8" } });
  }
  if (asset && allowedAssets.has(asset)) {
    const assetResponse = await fetch(`${Deno.env.get("SUPABASE_URL")}/storage/v1/object/casa-assets/${asset}`, { headers: { apikey: Deno.env.get("CASA_STORAGE_SERVICE_KEY")!, Authorization: `Bearer ${Deno.env.get("CASA_STORAGE_SERVICE_KEY")}` } });
    if (!assetResponse.ok) return reply("Asset unavailable", { status: 502 });
    return reply(assetResponse.body, { headers: { "Content-Type": allowedAssets.get(asset)! } });
  }
  return reply(await pageHtml(), { headers: { "Content-Type": "text/html; charset=utf-8" } });
});
