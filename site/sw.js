/* Third Settler — service worker.

   Network-first for pages: a deploy is picked up on the very next load
   while online, so there is no stale-cache trap. Cache-first for static
   assets. Everything falls back to the cache when offline, so game night
   still works with no signal. */

const CACHE = 'third-settler-v4';
const ASSETS = [
  './',
  './index.html',
  './play.html',
  './rules.html',
  './manifest.webmanifest',
  './icon.svg'
];

// Install: pre-cache the app shell.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: drop any older caches, take control immediately.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch: network-first for pages, cache-first for static assets.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const accept = req.headers.get('accept') || '';
  const isPage = req.mode === 'navigate' || accept.indexOf('text/html') > -1;

  if (isPage) {
    // Network-first: always fresh online, cached page when offline.
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req, { ignoreSearch: true })
          .then((hit) => hit || caches.match('./index.html')))
    );
  } else {
    // Cache-first for assets (icon, manifest, fonts), with runtime caching.
    event.respondWith(
      caches.match(req).then((hit) => {
        return hit || fetch(req).then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => cache.put(req, copy));
          }
          return res;
        });
      })
    );
  }
});
