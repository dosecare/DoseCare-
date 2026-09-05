/* DoseCare V2 — central database loader.
 * Loads every medicine record in one deterministic sequence, then starts the calculator engine.
 */
(function (global) {
  'use strict';
  const medicineFiles = [
    'paracetamol.js','ibuprofen.js','mefenamic-acid.js',
    'amoxicillin.js','amoxicillin-clavulanate.js','azithromycin.js','cephalexin.js','cefuroxime.js','cefixime.js','cefpodoxime.js','cefdinir.js','cefprozil.js','clarithromycin.js','clindamycin.js','cefaclor.js','erythromycin.js','metronidazole.js','ors.js',
    'cetirizine.js','loratadine.js','desloratadine.js','chlorpheniramine.js','diphenhydramine.js',
    'ondansetron.js','prednisolone.js','salbutamol.js',
    'lactulose.js','macrogol.js','omeprazole.js','magnesium-hydroxide.js','famotidine.js','sulfamethoxazole-trimethoprim.js','zinc-sulfate.js','domperidone.js','simethicone.js','probiotics.js','hyoscine-butylbromide.js'
  ];
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script'); script.src = src; script.async = false; script.onload = resolve; script.onerror = () => reject(new Error(`Failed to load ${src}`)); document.head.appendChild(script);
    });
  }
  async function boot() {
    try {
      for (const file of medicineFiles) await loadScript(`data/${file}`);
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
      if (message) message.textContent = 'DoseCare could not load its medicine database. Please refresh and try again.';
    }
  }
  global.DoseCareV2Loader = Object.freeze({ medicineFiles: medicineFiles.slice(), boot });
  boot();
})(window);