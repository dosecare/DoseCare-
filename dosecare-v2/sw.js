const CACHE_NAME = 'dosecare-v2-offline-v14';

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

  // Every active pediatric oral-liquid medicine used by the V2 loader.
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

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
      .catch(error => {
        console.error('DoseCare offline cache installation failed:', error);
        throw error;
      })
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
      }).catch(() => {
        if (request.mode === 'navigate') return caches.match('./index.html');
        return new Response('', { status: 503, statusText: 'Offline' });
      });
    })
  );
});
