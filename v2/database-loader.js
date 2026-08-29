/* DoseCare V2 — deterministic database loader
   medicines.js owns the central database and registration API.
   System files are loaded in a fixed order, then V2 modules start.
*/
(function () {
  'use strict';

  const systemFiles = [
    '../antibiotics.js',
    '../analgesics.js',
    '../respiratory.js'
  ];

  const v2Modules = [
    'medicine-adapter.js',
    'dosing-engine.js',
    'calculator-v2.js'
  ];

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = false;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`DoseCare could not load ${src}`));
      document.head.appendChild(script);
    });
  }

  async function start() {
    try {
      if (typeof registerMedicines !== 'function') {
        throw new Error('DoseCare medicine registration API is unavailable.');
      }

      for (const src of systemFiles) await loadScript(src);
      for (const src of v2Modules) await loadScript(src);

      window.dispatchEvent(new CustomEvent('dosecare:v2-ready'));
    } catch (error) {
      console.error(error);
      const message = document.getElementById('form-message');
      if (message) {
        message.textContent = 'The medicine database could not be loaded. Please refresh and try again.';
      }
    }
  }

  start();
})();
