/* KÜL Real Estate — service worker. Cache version tracks the app version:
   bump the version (and the app) together; old caches are deleted on activate. */
const CACHE = 'kul-cache-v1.4.3';
const PRECACHE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const isDocument = request.mode === 'navigate' || request.destination === 'document';

  if (isDocument) {
    /* Stale-while-revalidate: serve the cached app instantly (works offline);
       a swapped index.html on the server is fetched in the background and
       served on the next open. */
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const cached = await cache.match('index.html');
      const network = fetch(request)
        .then((response) => {
          if (response && response.ok) cache.put('index.html', response.clone());
          return response;
        })
        .catch(() => null);
      event.waitUntil(network);
      return cached || (await network) || Response.error();
    })());
    return;
  }

  /* Static assets (manifest, icons): cache-first. */
  event.respondWith((async () => {
    const cached = await caches.match(request, { ignoreSearch: true });
    if (cached) return cached;
    const response = await fetch(request);
    if (response && response.ok) {
      const cache = await caches.open(CACHE);
      cache.put(request, response.clone());
    }
    return response;
  })());
});
