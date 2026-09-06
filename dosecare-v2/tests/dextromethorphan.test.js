/* DoseCare V2 — Dextromethorphan regression tests. */
(function () {
  'use strict';
  const engine = window.DoseCareV2DosingEngine || globalThis.DoseCareV2DosingEngine;
  const db = window.DoseCareV2Database || globalThis.DoseCareV2Database;
  if (!engine || !db) throw new Error('DoseCare V2 engine/database not loaded');
  const tests = [];
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const near = (a, b, eps = 1e-9) => Math.abs(Number(a) - Number(b)) < eps;
  const test = (name, fn) => tests.push({ name, fn });

  test('Dextromethorphan 4 to under 6 years calculates 2.5 mL every 12 hours', () => {
    const m = db.getById('dextromethorphan');
    const r = m.regimens.find(x => x.id === 'age-4-to-under-6');
    const f = m.formulations[0];
    const result = engine.calculate({ medicine: m, regimen: r, age: 5, ageUnit: 'years', formulation: f });
    assert(result.ok, result.error || 'Calculation failed');
    assert(near(result.lowMg, 15), `Expected 15 mg/dose, got ${result.lowMg}`);
    assert(near(result.lowMl, 2.5), `Expected 2.5 mL/dose, got ${result.lowMl}`);
    assert(Number(result.frequency) === 2, `Expected frequency 2, got ${result.frequency}`);
  });

  test('Dextromethorphan 6 to under 12 years calculates 5 mL every 12 hours', () => {
    const m = db.getById('dextromethorphan');
    const r = m.regimens.find(x => x.id === 'age-6-to-under-12');
    const f = m.formulations[0];
    const result = engine.calculate({ medicine: m, regimen: r, age: 8, ageUnit: 'years', formulation: f });
    assert(result.ok, result.error || 'Calculation failed');
    assert(near(result.lowMg, 30), `Expected 30 mg/dose, got ${result.lowMg}`);
    assert(near(result.lowMl, 5), `Expected 5 mL/dose, got ${result.lowMl}`);
    assert(Number(result.frequency) === 2, `Expected frequency 2, got ${result.frequency}`);
  });

  test('Dextromethorphan 12 years and over calculates 10 mL every 12 hours', () => {
    const m = db.getById('dextromethorphan');
    const r = m.regimens.find(x => x.id === 'age-12-and-over');
    const f = m.formulations[0];
    const result = engine.calculate({ medicine: m, regimen: r, age: 12, ageUnit: 'years', formulation: f });
    assert(result.ok, result.error || 'Calculation failed');
    assert(near(result.lowMg, 60), `Expected 60 mg/dose, got ${result.lowMg}`);
    assert(near(result.lowMl, 10), `Expected 10 mL/dose, got ${result.lowMl}`);
    assert(Number(result.frequency) === 2, `Expected frequency 2, got ${result.frequency}`);
  });

  test('Dextromethorphan rejects under 4 years', () => {
    const m = db.getById('dextromethorphan');
    const r = m.regimens.find(x => x.id === 'age-4-to-under-6');
    const result = engine.calculate({ medicine: m, regimen: r, age: 3.5, ageUnit: 'years', formulation: m.formulations[0] });
    assert(!result.ok && result.code === 'AGE_BELOW_REGIMEN_MIN', 'Dextromethorphan under 4 years should be rejected');
  });

  window.DoseCareDextromethorphanTests = {
    run() {
      const results = tests.map(({ name, fn }) => {
        try { fn(); return { name, passed: true }; }
        catch (error) { return { name, passed: false, error: error.message || String(error) }; }
      });
      return { passed: results.every(x => x.passed), results };
    }
  };
})();
