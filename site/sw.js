/* Third Settler — service worker kill switch.

   An earlier version of this file cached pages aggressively and kept
   serving stale content after deploys. This replacement unregisters
   itself, deletes every cache, and reloads any open tab — so every
   visitor gets fresh content straight from the network.

   A proper offline-capable PWA worker can be reintroduced later, once
   the app stops changing by the hour. */

self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil((async function () {
    try {
      var keys = await caches.keys();
      await Promise.all(keys.map(function (k) { return caches.delete(k); }));
      await self.registration.unregister();
      var clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach(function (c) { c.navigate(c.url); });
    } catch (e) {
      /* nothing else to do */
    }
  })());
});
