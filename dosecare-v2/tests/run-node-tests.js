/* DoseCare V2 — Node.js runner for regression tests + structural database audit. */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = path.resolve(__dirname, '..');
const dataDir = path.join(root, 'data');
global.window = {};
function loadScript(filePath) { vm.runInThisContext(fs.readFileSync(filePath, 'utf8'), { filename: filePath }); }
loadScript(path.join(root, 'js', 'database.js'));
global.DoseCareV2Database = global.window.DoseCareV2Database;
const expectedFiles = [
  'amoxicillin.js','amoxicillin-clavulanate.js','azithromycin.js','cephalexin.js','cefuroxime.js','cefixime.js','cefpodoxime.js','cefdinir.js','cefprozil.js','clarithromycin.js','clindamycin.js','cefaclor.js','erythromycin.js','metronidazole.js',
  'paracetamol.js','ibuprofen.js','mefenamic-acid.js','ambroxol.js','carbocisteine.js','bromhexine.js','guaifenesin.js','dextromethorphan.js','cetirizine.js','loratadine.js','desloratadine.js','chlorpheniramine.js','fexofenadine.js','diphenhydramine.js','ondansetron.js','prednisolone.js','salbutamol.js','lactulose.js','omeprazole.js','magnesium-hydroxide.js','famotidine.js','sulfamethoxazole-trimethoprim.js','zinc-sulfate.js','domperidone.js','simethicone.js','hyoscine-butylbromide.js'
];
const archivedFiles = new Set(['macrogol.js','probiotics.js','ors.js']);
const actualFiles = fs.readdirSync(dataDir).filter(name => name.endsWith('.js')).sort();
const activeActualFiles = actualFiles.filter(name => !archivedFiles.has(name));
const sortedExpectedFiles = expectedFiles.slice().sort();
if (activeActualFiles.length !== sortedExpectedFiles.length || sortedExpectedFiles.some((name, index) => name !== activeActualFiles[index])) throw new Error(`Medicine file manifest mismatch. Expected ${sortedExpectedFiles.length} active files, found ${activeActualFiles.length}: ${activeActualFiles.join(', ')}`);
sortedExpectedFiles.forEach(name => loadScript(path.join(dataDir, name)));
loadScript(path.join(root, 'js', 'dosing-engine.js'));
global.DoseCareV2DosingEngine = global.window.DoseCareV2DosingEngine;
loadScript(path.join(__dirname, 'dosing-engine.test.js'));
loadScript(path.join(__dirname, 'dextromethorphan.test.js'));
loadScript(path.join(__dirname, 'audit-manifest.js'));
const result = window.DoseCareV2DosingTests.run();
const dextromethorphanResult = window.DoseCareDextromethorphanTests.run();
for (const item of result.results) { console.log(`${item.passed ? 'PASS' : 'FAIL'} — ${item.name}`); if (!item.passed) console.error(`       ${item.error}`); }
for (const item of dextromethorphanResult.results) { console.log(`${item.passed ? 'PASS' : 'FAIL'} — ${item.name}`); if (!item.passed) console.error(`       ${item.error}`); }
const audit = window.DoseCareV2Audit;
for (const error of audit.errors) console.error(`ERROR — ${error}`);
for (const warning of audit.warnings) console.warn(`WARN — ${warning}`);
if (!result.passed || !dextromethorphanResult.passed || !audit.passed) {
  process.exitCode = 1;
  console.error(`\nDoseCare V2 QA FAILED — ${result.results.length} core regression tests + ${dextromethorphanResult.results.length} Dextromethorphan tests; database structural audit ${audit.passed ? 'passed' : 'failed'}.`);
} else {
  console.log(`\nDoseCare V2 QA PASSED — ${result.results.length} core regression tests + ${dextromethorphanResult.results.length} Dextromethorphan tests + database structural audit (${audit.medicineCount} active oral-liquid medicines).`);
}