/* DoseCare V2 — Folic acid regression tests. */
(function () {
  'use strict';
  const engine = window.DoseCareDosingEngine;
  const db = window.DoseCareV2Database;
  const tests = [];
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const near = (a, b, eps = 1e-9) => Math.abs(Number(a) - Number(b)) < eps;
  const test = (name, fn) => tests.push({ name, fn });

  test('folic acid oral solution uses 0.2 mg/mL concentration', () => {
    const m = db.getById('folic-acid');
    assert(m, 'Folic acid medicine missing');
    assert(near(m.formulations[0].mgPerMl, 0.2), `Expected 0.2 mg/mL, got ${m.formulations[0].mgPerMl}`);
  });

  test('folic acid maintenance birth to 23 months calculates 0.5 mL daily', () => {
    const m = db.getById('folic-acid');
    const r = m.regimens.find(x => x.id === 'folic-acid-maintenance-birth-23-months');
    const result = engine.calculate({ medicine: m, regimen: r, age: 12, ageUnit: 'months', formulation: m.formulations[0] });
    assert(result.ok, result.error || 'Calculation failed');
    assert(near(result.lowMg, 0.1), `Expected 0.1 mg/day, got ${result.lowMg}`);
    assert(near(result.lowMl, 0.5), `Expected 0.5 mL/day, got ${result.lowMl}`);
  });

  test('folic acid maintenance age 2 to under 4 years calculates 1.5 mL daily', () => {
    const m = db.getById('folic-acid');
    const r = m.regimens.find(x => x.id === 'folic-acid-maintenance-2-to-under-4-years');
    const result = engine.calculate({ medicine: m, regimen: r, age: 3, ageUnit: 'years', formulation: m.formulations[0] });
    assert(result.ok, result.error || 'Calculation failed');
    assert(near(result.lowMg, 0.3), `Expected 0.3 mg/day, got ${result.lowMg}`);
    assert(near(result.lowMl, 1.5), `Expected 1.5 mL/day, got ${result.lowMl}`);
  });

  test('folic acid maintenance age 4 years and older calculates 2 mL daily', () => {
    const m = db.getById('folic-acid');
    const r = m.regimens.find(x => x.id === 'folic-acid-maintenance-4-years-and-older');
    const result = engine.calculate({ medicine: m, regimen: r, age: 4, ageUnit: 'years', formulation: m.formulations[0] });
    assert(result.ok, result.error || 'Calculation failed');
    assert(near(result.lowMg, 0.4), `Expected 0.4 mg/day, got ${result.lowMg}`);
    assert(near(result.lowMl, 2), `Expected 2 mL/day, got ${result.lowMl}`);
  });

  window.DoseCareFolicAcidTests = {
    run() {
      const results = tests.map(({ name, fn }) => {
        try { fn(); return { name, passed: true }; }
        catch (error) { return { name, passed: false, error: error.message || String(error) }; }
      });
      return { passed: results.every(x => x.passed), results };
    }
  };
})();
