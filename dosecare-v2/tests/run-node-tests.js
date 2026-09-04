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
  'amoxicillin.js','amoxicillin-clavulanate.js','azithromycin.js','cephalexin.js','cefuroxime.js','cefixime.js','cefpodoxime.js','cefdinir.js','cefprozil.js','clarithromycin.js','clindamycin.js','cefaclor.js','erythromycin.js',
  'paracetamol.js','ibuprofen.js','mefenamic-acid.js','cetirizine.js','loratadine.js','diphenhydramine.js','salbutamol.js','ondansetron.js','lactulose.js','magnesium-hydroxide.js','omeprazole.js','prednisolone.js','famotidine.js','sulfamethoxazole-trimethoprim.js'
];
const actualFiles = fs.readdirSync(dataDir).filter(name => name.endsWith('.js')).sort();
if (actualFiles.length !== expectedFiles.length || expectedFiles.some(name => !actualFiles.includes(name))) throw new Error(`Medicine file manifest mismatch. Expected ${expectedFiles.length} known files, found ${actualFiles.length}: ${actualFiles.join(', ')}`);
expectedFiles.forEach(name => loadScript(path.join(dataDir, name)));
loadScript(path.join(root, 'js', 'dosing-engine.js'));
loadScript(path.join(__dirname, 'dosing-engine.test.js'));
loadScript(path.join(__dirname, 'audit-manifest.js'));
global.DoseCareV2DosingEngine = global.window.DoseCareV2DosingEngine;
const result = window.DoseCareV2DosingTests.run();
for (const item of result.results) { console.log(`${item.passed ? 'PASS' : 'FAIL'} — ${item.name}`); if (!item.passed) console.error(`       ${item.error}`); }
const audit = window.DoseCareV2Audit;
for (const error of audit.errors) console.error(`ERROR — ${error}`);
for (const warning of audit.warnings) console.warn(`WARN — ${warning}`);
if (!result.passed || !audit.passed) { process.exitCode = 1; console.error(`\nDoseCare V2 QA FAILED — ${result.results.length} regression tests; database audit ${audit.passed ? 'passed' : 'failed'}.`); }
else console.log(`\nDoseCare V2 QA PASSED — ${result.results.length} regression tests + database structural audit (${audit.medicineCount} medicines).`);
