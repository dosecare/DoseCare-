/* DoseCare V2 — arithmetic integrity audit for dose ↔ concentration calculations. */
(function (global) {
  'use strict';

  function num(v) { const n = Number(v); return Number.isFinite(n) ? n : null; }
  function mgPerMl(f) {
    if (!f) return null;
    if (num(f.mgPerMl) > 0) return num(f.mgPerMl);
    if (num(f.mgPer5mL) > 0) return num(f.mgPer5mL) / 5;
    const c = f.concentration || {};
    if (num(c.amount) > 0 && num(c.volume) > 0) return num(c.amount) / num(c.volume);
    return null;
  }
  function close(a, b, tolerance = 0.01) { return Math.abs(a - b) <= tolerance; }
  function formulationsFor(m, r) {
    const allowed = Array.isArray(r.allowedFormulations) && r.allowedFormulations.length
      ? r.allowedFormulations : null;
    return (m.formulations || []).filter(f => !allowed || allowed.includes(f.id));
  }

  function run() {
    const db = global.window.DoseCareV2Database;
    const engine = global.window.DoseCareV2DosingEngine || global.window.DoseCareDosingEngine;
    const results = [];
    if (!db || !engine) return { passed: false, results: [{ passed: false, name: 'Arithmetic audit initialization', error: 'Database or dosing engine is unavailable.' }] };

    for (const medicine of db.getAll()) {
      for (const regimen of medicine.regimens || []) {
        for (const formulation of formulationsFor(medicine, regimen)) {
          const concentration = mgPerMl(formulation);
          const name = `${medicine.id}/${regimen.id}/${formulation.id}`;
          if (!(concentration > 0)) {
            results.push({ passed: false, name, error: 'Invalid formulation concentration.' });
            continue;
          }

          const type = regimen.type;
          const needsWeight = regimen.requiresWeight ?? ['mg_per_kg_per_day', 'mg_per_kg_per_dose', 'weight_based'].includes(type);
          const needsAge = regimen.requiresAge ?? ['age_based', 'label_age_based', 'label_weight_age_based'].includes(type);
          let weight = 12, age = 4, ageUnit = 'years';
          if (type === 'label_weight_age_based' && Array.isArray(regimen.table) && regimen.table.length) {
            const row = regimen.table[0];
            weight = ((Number(row.minLb) + Number(row.maxLb)) / 2) / 2.2046226218;
            age = (Number(row.minAgeYears) + Number(row.maxAgeYears)) / 2;
          }
          if (!needsWeight) weight = null;
          if (!needsAge && type !== 'label_age_based') age = null;

          const input = { medicine, regimen, formulation, weight, age, ageUnit };
          const result = engine.calculate(input);
          if (!result || !result.ok) {
            results.push({ passed: false, name, error: result?.error || 'Calculation failed.' });
            continue;
          }

          const checks = [];
          if (num(result.lowMl) !== null && num(result.lowMg) !== null) checks.push(['low dose ↔ volume', result.lowMl * concentration, result.lowMg]);
          if (num(result.highMl) !== null && num(result.highMg) !== null) checks.push(['high dose ↔ volume', result.highMl * concentration, result.highMg]);
          for (const [label, actual, expected] of checks) {
            if (!close(actual, expected)) results.push({ passed: false, name: `${name} — ${label}`, error: `Expected ${expected} mg from ${actual} mg calculated by concentration.` });
          }

          if (type === 'mg_per_kg_per_day' && num(result.frequency) > 0 && num(result.dailyLowMg) !== null && num(result.lowMg) !== null) {
            if (!close(result.lowMg * result.frequency, result.dailyLowMg)) results.push({ passed: false, name: `${name} — daily/per-dose relationship`, error: 'Per-dose result does not reconcile with daily dose and frequency.' });
          }
          if (type === 'mg_per_kg_per_dose' && num(result.frequency) > 0 && num(result.dailyLowMg) !== null && num(result.lowMg) !== null) {
            if (!close(result.lowMg * result.frequency, result.dailyLowMg)) results.push({ passed: false, name: `${name} — per-dose/daily relationship`, error: 'Daily result does not reconcile with per-dose result and frequency.' });
          }
          if (type === 'label_age_based') {
            if (!close(result.lowMl * concentration, Number(regimen.doseMin))) results.push({ passed: false, name, error: 'Label minimum dose does not match configured volume and concentration.' });
            if (!close(result.highMl * concentration, Number(regimen.doseMax))) results.push({ passed: false, name, error: 'Label maximum dose does not match configured volume and concentration.' });
          }

          if (!results.some(r => r.name.startsWith(name) && !r.passed)) results.push({ passed: true, name, error: null });
        }
      }
    }
    return { passed: results.every(r => r.passed), results };
  }

  global.window.DoseCareArithmeticIntegrityTests = { run };
})(typeof globalThis !== 'undefined' ? globalThis : this);
