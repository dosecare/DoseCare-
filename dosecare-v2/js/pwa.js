/* DoseCare V2 — PWA bootstrap. */
(function () {
  'use strict';
  if (!('serviceWorker' in navigator)) return;
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('./sw.js', { scope: './' })
      .then(function (registration) {
        console.info('DoseCare offline mode ready.', registration.scope);
      })
      .catch(function (error) {
        console.warn('DoseCare offline mode could not start:', error);
      });
  });
})();
