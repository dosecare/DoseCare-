const CACHE_NAME = 'dosecare-v2-offline-v1';
const CORE_ASSETS = [
  './',
  './index.html',
  './calculator.html',
  './result.html',
  './css/style.css',
  './css/legacy-visual.css',
  './js/database.js',
  './js/database-loader.js',
  './js/calculator.js',
  './js/dosing-engine.js',
  './js/macrogol-engine-adapter.js',
  './js/probiotic-engine-adapter.js',
  './js/ors-engine.js',
  './js/result.js',
  './js/macrogol-result-adapter.js',
  './js/probiotic-result-adapter.js',
  './js/i18n.js',
  './manifest.json',
  './icon.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (!response || response.status !== 200 || response.type === 'opaque') return response;
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        return response;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
