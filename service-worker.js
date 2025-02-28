const CACHE_NAME = 'site-cache-v1';
const urlsToCache = [
  '/app_generico_pwa/',
  '/app_generico_pwa/index.html',
  '/app_generico_pwa/styles.css',
  '/app_generico_pwa/script.js',
  '/app_generico_pwa/manifest.json',
  '/app_generico_pwa/icons/icon-192x192.png',
  '/app_generico_pwa/icons/icon-512x512.png'
];


self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
