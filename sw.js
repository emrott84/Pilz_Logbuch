const CACHE_NAME = 'pilzlog-v4.7';
const ASSETS = [
  '/Pilz_Logbuch/',
  '/Pilz_Logbuch/index.html',
  '/Pilz_Logbuch/manifest.json',
  '/Pilz_Logbuch/icon_192.png',
  '/Pilz_Logbuch/icon_512.png',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
