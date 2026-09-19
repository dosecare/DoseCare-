const CACHE_NAME = 'dosecare-v2-offline-v17';

const CORE_ASSETS = [
  './',
  './index.html',
  './calculator.html',
  './result.html',
  './share.html',
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
  './js/pwa.js',
  './manifest.json',
  './icon.svg',
  './sw.js',

  './data/paracetamol.js',
  './data/ibuprofen.js',
  './data/mefenamic-acid.js',
  './data/ambroxol.js',
  './data/carbocisteine.js',
  './data/bromhexine.js',
  './data/guaifenesin.js',
  './data/dextromethorphan.js',
  './data/amoxicillin.js',
  './data/amoxicillin-clavulanate.js',
  './data/azithromycin.js',
  './data/cephalexin.js',
  './data/cefuroxime.js',
  './data/cefixime.js',
  './data/cefpodoxime.js',
  './data/cefdinir.js',
  './data/cefprozil.js',
  './data/clarithromycin.js',
  './data/clindamycin.js',
  './data/cefaclor.js',
  './data/erythromycin.js',
  './data/metronidazole.js',
  './data/oseltamivir.js',
  './data/nystatin.js',
  './data/fluconazole.js',
  './data/acyclovir.js',
  './data/ferrous-sulfate.js',
  './data/cholecalciferol.js',
  './data/levetiracetam.js',
  './data/phenobarbital.js',
  './data/albendazole.js',
  './data/levothyroxine.js',
  './data/cetirizine.js',
  './data/loratadine.js',
  './data/desloratadine.js',
  './data/chlorpheniramine.js',
  './data/fexofenadine.js',
  './data/diphenhydramine.js',
  './data/ondansetron.js',
  './data/prednisolone.js',
  './data/salbutamol.js',
  './data/lactulose.js',
  './data/omeprazole.js',
  './data/magnesium-hydroxide.js',
  './data/famotidine.js',
  './data/sulfamethoxazole-trimethoprim.js',
  './data/zinc-sulfate.js',
  './data/domperidone.js',
  './data/simethicone.js',
  './data/hyoscine-butylbromide.js'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(CORE_ASSETS);
      })
      .then(function () {
        return self.skipWaiting();
      })
      .catch(function (error) {
        console.error('DoseCare offline cache installation failed:', error);
        throw error;
      })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (key) { return key !== CACHE_NAME; })
          .map(function (key) { return caches.delete(key); })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function (event) {
  var request = event.request;
  if (request.method !== 'GET') return;

  var url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(request, { ignoreSearch: true }).then(function (cached) {
      if (cached) return cached;

      return fetch(request).then(function (response) {
        if (response && response.ok) {
          var copy = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(request, copy);
          });
        }
        return response;
      }).catch(function () {
        if (request.mode === 'navigate') {
          return caches.match('./calculator.html');
        }
        return new Response('', { status: 503, statusText: 'Offline' });
      });
    })
  );
});
