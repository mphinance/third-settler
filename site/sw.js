/* Third Settler — service worker
   Caches the app shell so game night works even with no signal. */

const CACHE = 'third-settler-v3';
const ASSETS = [
  './',
  './index.html',
  './play.html',
  './manifest.webmanifest',
  './icon.svg'
];

// Install: pre-cache the shell.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: drop any old caches.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch: network-first for pages (always fresh online), cache-first for assets.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const accept = req.headers.get('accept') || '';
  const isPage = req.mode === 'navigate' || accept.indexOf('text/html') > -1;

  if (isPage) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((hit) => hit || caches.match('./index.html')))
    );
  } else {
    event.respondWith(
      caches.match(req).then((hit) => hit || fetch(req))
    );
  }
});
