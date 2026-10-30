/* Service worker de «Atrapa el topo»: permite instalarlo y jugar sin conexión.
   - Archivos propios: primero red revalidada (así las actualizaciones llegan aunque la caché HTTP esté vieja), y si no hay red, la copia guardada.
   - Librerías externas (three.js, fuentes…): copia guardada y se refresca en segundo plano.
   - Nunca guarda llamadas al ranking (Supabase) ni conexiones en vivo. */
const V = "topo-v9";
const PRE = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "icon.svg"];
const CDN = ["cdnjs.cloudflare.com", "fonts.googleapis.com", "fonts.gstatic.com", "cdn.jsdelivr.net", "unpkg.com"];
self.addEventListener("install", e => { e.waitUntil(caches.open(V).then(c => Promise.all(PRE.map(u => fetch(new Request(u, { cache: "reload" })).then(res => res.ok && c.put(u, res)).catch(() => {})))).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== "GET" || u.pathname.endsWith("/version.json")) return;   // siempre a la red
  const same = u.origin === self.location.origin;
  if (!same && !CDN.includes(u.hostname)) return;
  if (same) {
    e.respondWith(fetch(r.url, { cache: "no-cache" }).then(res => { if (res.ok) { const cp = res.clone(); caches.open(V).then(c => c.put(r, cp)); } return res; })
      .catch(() => caches.match(r).then(m => m || caches.match("index.html"))));
  } else {
    e.respondWith(caches.match(r).then(m => {
      const net = fetch(r).then(res => { if (res.ok || res.type === "opaque") { const cp = res.clone(); caches.open(V).then(c => c.put(r, cp)); } return res; }).catch(() => m);
      return m || net;
    }));
  }
});
