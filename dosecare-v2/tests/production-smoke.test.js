/* DoseCare V2 — production smoke checks for the web/app shell. */
'use strict';
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const repoRoot = path.resolve(root, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const readRepo = file => fs.readFileSync(path.join(repoRoot, file), 'utf8');
const exists = file => fs.existsSync(path.join(root, file));
const existsRepo = file => fs.existsSync(path.join(repoRoot, file));
const results = [];
function check(name, fn) {
  try { fn(); results.push({ name, passed: true }); }
  catch (error) { results.push({ name, passed: false, error: error.message }); }
}
function requireText(text, needle, label) {
  if (!text.includes(needle)) throw new Error(`Missing ${label}: ${needle}`);
}

check('Required production pages exist', () => {
  for (const file of ['index.html', 'calculator.html', 'result.html']) {
    if (!exists(file)) throw new Error(`Missing ${file}`);
  }
});

check('Calculator page uses the central database loader', () => {
  const html = read('calculator.html');
  requireText(html, 'js/database-loader.js', 'database-loader.js script reference');
  requireText(html, 'css/style.css', 'shared stylesheet reference');
  requireText(html, 'viewport', 'mobile viewport metadata');
});

check('Result page loads its renderer and shared stylesheet', () => {
  const html = read('result.html');
  requireText(html, 'js/result.js', 'result.js script reference');
  requireText(html, 'css/style.css', 'shared stylesheet reference');
  requireText(html, 'viewport', 'mobile viewport metadata');
});

check('Welcome page has mobile viewport and shared stylesheet', () => {
  const html = read('index.html');
  requireText(html, 'css/style.css', 'shared stylesheet reference');
  requireText(html, 'viewport', 'mobile viewport metadata');
});

check('Central loader references the calculation stack', () => {
  const loader = read('js/database-loader.js');
  requireText(loader, "'js/dosing-engine.js'", 'dosing-engine.js');
  requireText(loader, "'js/calculator.js'", 'calculator.js');
});

check('Central loader contains exactly 50 active medicine files', () => {
  const loader = read('js/database-loader.js');
  const match = loader.match(/const medicineFiles = \[([\s\S]*?)\];/);
  if (!match) throw new Error('Could not locate medicineFiles manifest.');
  const files = [...match[1].matchAll(/'([^']+\.js)'/g)].map(m => m[1]);
  if (files.length !== 50) throw new Error(`Expected 50 active medicines in loader, found ${files.length}.`);
  if (new Set(files).size !== 50) throw new Error('Loader contains duplicate medicine filenames.');
  for (const file of files) if (!exists(`data/${file}`)) throw new Error(`Loader references missing data file: ${file}`);
});

check('No calculator page dependency is hidden behind direct calculator.js loading', () => {
  const html = read('calculator.html');
  if (html.includes('src="js/calculator.js"')) throw new Error('calculator.html directly loads calculator.js; use the central loader instead.');
});

check('Production source assets exist', () => {
  for (const file of ['js/database.js', 'js/database-loader.js', 'js/dosing-engine.js', 'js/calculator.js', 'js/result.js', 'css/style.css']) {
    if (!exists(file)) throw new Error(`Missing production asset: ${file}`);
  }
});

check('Capacitor app shell is configured for DoseCare', () => {
  if (!existsRepo('package.json')) throw new Error('Missing root package.json.');
  if (!existsRepo('capacitor.config.json')) throw new Error('Missing capacitor.config.json.');
  const pkg = readRepo('package.json');
  const config = readRepo('capacitor.config.json');
  requireText(pkg, '"@capacitor/core"', '@capacitor/core dependency');
  requireText(pkg, '"@capacitor/android"', '@capacitor/android dependency');
  requireText(pkg, '"@capacitor/ios"', '@capacitor/ios dependency');
  requireText(config, '"appId": "com.dosecare.app"', 'DoseCare app ID');
  requireText(config, '"webDir": "dosecare-v2"', 'DoseCare web directory');
});

check('Android build workflow is present and artifact-producing', () => {
  const workflow = '.github/workflows/mobile-android-build.yml';
  if (!existsRepo(workflow)) throw new Error(`Missing ${workflow}.`);
  const yaml = readRepo(workflow);
  requireText(yaml, 'workflow_dispatch', 'manual Android build trigger');
  requireText(yaml, 'npx cap add android', 'Capacitor Android platform generation');
  requireText(yaml, 'npx cap sync android', 'Capacitor Android sync');
  requireText(yaml, 'assembleDebug', 'Android debug build');
  requireText(yaml, 'actions/upload-artifact@v4', 'APK artifact upload');
});

const passed = results.every(item => item.passed);
for (const item of results) {
  console.log(`${item.passed ? 'PASS' : 'FAIL'} — ${item.name}`);
  if (!item.passed) console.error(`       ${item.error}`);
}
if (!passed) process.exitCode = 1;
module.exports = { results, passed };
