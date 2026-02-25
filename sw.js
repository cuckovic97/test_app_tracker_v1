const CACHE = 'tracker-v1';
const ASSETS = [
  '/test_app_tracker_v1/',
  '/test_app_tracker_v1/index.html',
  '/test_app_tracker_v1/manifest.json',
  '/test_app_tracker_v1/icon-192_v2.png',
  '/test_app_tracker_v1/icon-512_v2.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
