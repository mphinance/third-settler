/* Third Settler — service worker
   Caches the app shell so game night works even with no signal. */

const CACHE = 'third-settler-v2';
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

// Fetch: cache-first, fall back to network, then to the home page offline.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((hit) => {
      return hit || fetch(event.request).catch(() => caches.match('./index.html'));
    })
  );
});
