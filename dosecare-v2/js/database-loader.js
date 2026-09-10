/* DoseCare V2 — central database loader.
 * All medicine records are local application assets.
 * Load them in parallel, then initialize the engines in dependency order.
 */
(function (global) {
  'use strict';
  const medicineFiles = [
    'paracetamol.js','ibuprofen.js','mefenamic-acid.js','ambroxol.js','carbocisteine.js','bromhexine.js','guaifenesin.js','dextromethorphan.js',
    'amoxicillin.js','amoxicillin-clavulanate.js','azithromycin.js','cephalexin.js','cefuroxime.js','cefixime.js','cefpodoxime.js','cefdinir.js','cefprozil.js','clarithromycin.js','clindamycin.js','cefaclor.js','erythromycin.js','metronidazole.js',
    'cetirizine.js','loratadine.js','desloratadine.js','chlorpheniramine.js','fexofenadine.js','diphenhydramine.js','hydroxyzine.js',
    'ondansetron.js','prednisolone.js','salbutamol.js',
    'lactulose.js','omeprazole.js','magnesium-hydroxide.js','famotidine.js','sulfamethoxazole-trimethoprim.js','zinc-sulfate.js','domperidone.js','simethicone.js','hyoscine-butylbromide.js','sodium-citrate.js','vitamin-d3.js','iron.js','multivitamin.js','multivitamin-iron.js','folic-acid.js','fluconazole.js','mebendazole.js','nitazoxanide.js'
  ];

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = false;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.head.appendChild(script);
    });
  }

  async function boot() {
    try {
      // These files are bundled with the application. Parallel loading avoids
      // waiting for all ~50 medicine files one-by-one on slower devices.
      await Promise.all(medicineFiles.map(file => loadScript(`data/${file}`)));

      // Engines are initialized only after every medicine record is registered.
      await loadScript('js/dosing-engine.js');
      await loadScript('js/macrogol-engine-adapter.js');
      await loadScript('js/probiotic-engine-adapter.js');
      await loadScript('js/ors-engine.js');
      await loadScript('js/calculator.js');

      global.DoseCareV2Ready = true;
      document.dispatchEvent(new CustomEvent('dosecare:v2-ready'));
    } catch (error) {
      console.error('DoseCare V2 failed to initialize:', error);
      const message = document.getElementById('form-message');
      if (message) message.textContent = 'DoseCare could not load its local medicine database. Please reopen the app.';
    }
  }

  global.DoseCareV2Loader = Object.freeze({ medicineFiles: medicineFiles.slice(), boot });
  boot();
})(window);
