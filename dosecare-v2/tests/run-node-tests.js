/* DoseCare V2 — Node.js runner for the browser-style regression suite. */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const dataDir = path.join(root, 'data');

global.window = {};

function loadScript(filePath) {
  const source = fs.readFileSync(filePath, 'utf8');
  vm.runInThisContext(source, { filename: filePath });
}

loadScript(path.join(root, 'js', 'database.js'));

const medicineFiles = fs.readdirSync(dataDir)
  .filter(name => name.endsWith('.js'))
  .sort();

if (medicineFiles.length !== 23) {
  throw new Error(`Expected 23 medicine files, found ${medicineFiles.length}`);
}

medicineFiles.forEach(name => loadScript(path.join(dataDir, name)));
loadScript(path.join(root, 'js', 'dosing-engine.js'));
loadScript(path.join(__dirname, 'dosing-engine.test.js'));

const result = window.DoseCareV2DosingTests.run();
for (const item of result.results) {
  console.log(`${item.passed ? 'PASS' : 'FAIL'} — ${item.name}`);
  if (!item.passed) console.error(`       ${item.error}`);
}

if (!result.passed) {
  process.exitCode = 1;
  console.error(`\nDoseCare V2 regression suite FAILED.`);
} else {
  console.log(`\nDoseCare V2 regression suite PASSED (${result.results.length} tests).`);
}
