const CACHE_NAME = 'pilzlog-v6.76';
const ASSETS = [
  '/Pilz_Logbuch/',
  '/Pilz_Logbuch/index.html',
  '/Pilz_Logbuch/manifest.json',
  '/Pilz_Logbuch/icon_192.png',
  '/Pilz_Logbuch/icon_512.png',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

// 1. Install-Event: Cachen der Dateien + Sofort aktivieren
self.addEventListener('install', event => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching assets...');
      return cache.addAll(ASSETS);
    })
  );
});

// 2. Activate-Event: Alte Caches aufräumen & Kontrolle übernehmen
self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      clients.claim(),
      // Optional: Hier könnte man alte Cache-Versionen löschen
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
        );
      })
    ])
  );
});

// 3. Fetch-Event: Offline-Verfügbarkeit sicherstellen
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});