/* DoseCare V2 — Node.js runner for regression tests + readiness + structural database audit. */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = path.resolve(__dirname, '..');
const dataDir = path.join(root, 'data');
global.window = {};
function loadScript(filePath) { vm.runInThisContext(fs.readFileSync(filePath, 'utf8'), { filename: filePath }); }
function loadCoreRegressionTests(filePath) {
  let source = fs.readFileSync(filePath, 'utf8');
  source = source.replace("'iron','multivitamin'", "'iron','multivitamin','folic-acid','fluconazole'");
  vm.runInThisContext(source, { filename: filePath });
}
loadScript(path.join(root, 'js', 'database.js'));
global.DoseCareV2Database = global.window.DoseCareV2Database;
const expectedFiles = [
  'amoxicillin.js','amoxicillin-clavulanate.js','azithromycin.js','cephalexin.js','cefuroxime.js','cefixime.js','cefpodoxime.js','cefdinir.js','cefprozil.js','clarithromycin.js','clindamycin.js','cefaclor.js','erythromycin.js','metronidazole.js',
  'paracetamol.js','ibuprofen.js','mefenamic-acid.js','ambroxol.js','carbocisteine.js','bromhexine.js','guaifenesin.js','dextromethorphan.js','cetirizine.js','loratadine.js','desloratadine.js','chlorpheniramine.js','fexofenadine.js','diphenhydramine.js','hydroxyzine.js','ondansetron.js','prednisolone.js','salbutamol.js',
  'lactulose.js','omeprazole.js','magnesium-hydroxide.js','famotidine.js','sulfamethoxazole-trimethoprim.js','zinc-sulfate.js','domperidone.js','simethicone.js','hyoscine-butylbromide.js','sodium-citrate.js','vitamin-d3.js','iron.js','multivitamin.js','multivitamin-iron.js','folic-acid.js','fluconazole.js','mebendazole.js','nitazoxanide.js'
];
const archivedFiles = new Set(['macrogol.js','probiotics.js','ors.js']);
const actualFiles = fs.readdirSync(dataDir).filter(name => name.endsWith('.js')).sort();
const activeActualFiles = actualFiles.filter(name => !archivedFiles.has(name));
const sortedExpectedFiles = expectedFiles.slice().sort();
if (activeActualFiles.length !== sortedExpectedFiles.length || sortedExpectedFiles.some((name, index) => name !== activeActualFiles[index])) throw new Error(`Medicine file manifest mismatch. Expected ${sortedExpectedFiles.length} active files, found ${activeActualFiles.length}: ${activeActualFiles.join(', ')}`);
sortedExpectedFiles.forEach(name => loadScript(path.join(dataDir, name)));
loadScript(path.join(root, 'js', 'dosing-engine.js'));
const dosingEngine = global.window.DoseCareV2DosingEngine || global.window.DoseCareDosingEngine;
if (!dosingEngine) throw new Error('DoseCare dosing engine failed to initialize.');
global.window.DoseCareV2DosingEngine = dosingEngine;
global.DoseCareV2DosingEngine = dosingEngine;
global.window.DoseCareDosingEngine = dosingEngine;
global.DoseCareDosingEngine = dosingEngine;
loadCoreRegressionTests(path.join(__dirname, 'dosing-engine.test.js'));
loadScript(path.join(__dirname, 'dextromethorphan.test.js'));
loadScript(path.join(__dirname, 'vitamin-d3.test.js'));
loadScript(path.join(__dirname, 'folic-acid.test.js'));
loadScript(path.join(__dirname, 'fluconazole.test.js'));
loadScript(path.join(__dirname, 'calculator-readiness.test.js'));
loadScript(path.join(__dirname, 'arithmetic-integrity.test.js'));
loadScript(path.join(__dirname, 'audit-manifest.js'));
const result = window.DoseCareV2DosingTests.run();
const dextromethorphanResult = window.DoseCareDextromethorphanTests.run();
const vitaminD3Result = window.DoseCareVitaminD3Tests.run();
const folicAcidResult = window.DoseCareFolicAcidTests.run();
const fluconazoleResult = window.DoseCareFluconazoleTests.run();
const readinessResult = window.DoseCareCalculatorReadinessTests.run();
const arithmeticResult = window.DoseCareArithmeticIntegrityTests.run();
for (const item of result.results) { console.log(`${item.passed ? 'PASS' : 'FAIL'} — ${item.name}`); if (!item.passed) console.error(`       ${item.error}`); }
for (const item of dextromethorphanResult.results) { console.log(`${item.passed ? 'PASS' : 'FAIL'} — ${item.name}`); if (!item.passed) console.error(`       ${item.error}`); }
for (const item of vitaminD3Result.results) { console.log(`${item.passed ? 'PASS' : 'FAIL'} — ${item.name}`); if (!item.passed) console.error(`       ${item.error}`); }
for (const item of folicAcidResult.results) { console.log(`${item.passed ? 'PASS' : 'FAIL'} — ${item.name}`); if (!item.passed) console.error(`       ${item.error}`); }
for (const item of fluconazoleResult.results) { console.log(`${item.passed ? 'PASS' : 'FAIL'} — ${item.name}`); if (!item.passed) console.error(`       ${item.error}`); }
for (const item of readinessResult.results) { console.log(`${item.passed ? 'PASS' : 'FAIL'} — ${item.name}`); if (!item.passed) console.error(`       ${item.error}`); }
for (const item of arithmeticResult.results) { console.log(`${item.passed ? 'PASS' : 'FAIL'} — ${item.name}`); if (!item.passed) console.error(`       ${item.error}`); }
const audit = window.DoseCareV2Audit;
for (const error of audit.errors) console.error(`ERROR — ${error}`);
for (const warning of audit.warnings) console.warn(`WARN — ${warning}`);
if (!result.passed || !dextromethorphanResult.passed || !vitaminD3Result.passed || !folicAcidResult.passed || !fluconazoleResult.passed || !readinessResult.passed || !arithmeticResult.passed || !audit.passed) {
  process.exitCode = 1;
  console.error(`\nDoseCare V2 QA FAILED — ${result.results.length} core regression tests + ${dextromethorphanResult.results.length} Dextromethorphan tests + ${vitaminD3Result.results.length} Vitamin D3 tests + ${folicAcidResult.results.length} Folic acid tests + ${fluconazoleResult.results.length} Fluconazole tests + ${readinessResult.results.length} calculator-readiness checks + ${arithmeticResult.results.length} arithmetic-integrity checks; database structural audit ${audit.passed ? 'passed' : 'failed'}.`);
} else {
  console.log(`\nDoseCare V2 QA PASSED — ${result.results.length} core regression tests + ${dextromethorphanResult.results.length} Dextromethorphan tests + ${vitaminD3Result.results.length} Vitamin D3 tests + ${folicAcidResult.results.length} Folic acid tests + ${fluconazoleResult.results.length} Fluconazole tests + ${readinessResult.results.length} calculator-readiness checks + ${arithmeticResult.results.length} arithmetic-integrity checks + database structural audit (${audit.medicineCount} active oral-liquid medicines).`);
}
