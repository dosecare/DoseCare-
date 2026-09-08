/* DoseCare V2 — Vitamin D3 regression tests. */
(function () {
  'use strict';
  const engine = window.DoseCareDosingEngine;
  const db = window.DoseCareV2Database;
  const tests = [];
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const near = (a, b, eps = 1e-9) => Math.abs(Number(a) - Number(b)) < eps;
  const test = (name, fn) => tests.push({ name, fn });

  test('vitamin D3 has 400 IU (10 mcg) per mL', () => {
    const m = db.getById('vitamin-d3');
    assert(m, 'Vitamin D3 medicine missing');
    assert(near(m.formulations[0].mgPerMl, 0.01), `Expected 0.01 mg/mL, got ${m.formulations[0].mgPerMl}`);
    assert(m.formulations[0].equivalentIU === 400, `Expected 400 IU/mL, got ${m.formulations[0].equivalentIU}`);
  });

  test('vitamin D3 configured product regimen calculates 1 mL daily', () => {
    const m = db.getById('vitamin-d3');
    const r = m.regimens.find(x => x.id === 'vitamin-d3-routine-400iu');
    assert(r, 'Configured Vitamin D3 regimen missing');
    const result = engine.calculate({ medicine: m, regimen: r, age: 6, ageUnit: 'months', formulation: m.formulations[0] });
    assert(result.ok, result.error || 'Calculation failed');
    assert(near(result.lowMg, 0.01), `Expected 0.01 mg/day, got ${result.lowMg}`);
    assert(near(result.lowMl, 1), `Expected 1 mL/day, got ${result.lowMl}`);
  });

  test('vitamin D3 configured product regimen calculates 1 mL daily at 4 years', () => {
    const m = db.getById('vitamin-d3');
    const r = m.regimens.find(x => x.id === 'vitamin-d3-routine-400iu');
    const result = engine.calculate({ medicine: m, regimen: r, age: 4, ageUnit: 'years', formulation: m.formulations[0] });
    assert(result.ok, result.error || 'Calculation failed');
    assert(near(result.lowMg, 0.01), `Expected 0.01 mg/day, got ${result.lowMg}`);
    assert(near(result.lowMl, 1), `Expected 1 mL/day, got ${result.lowMl}`);
  });

  test('vitamin D3 rejects an age outside configured product range', () => {
    const m = db.getById('vitamin-d3');
    const r = m.regimens.find(x => x.id === 'vitamin-d3-routine-400iu');
    const result = engine.calculate({ medicine: m, regimen: r, age: 5, ageUnit: 'years', formulation: m.formulations[0] });
    assert(!result.ok, 'Expected out-of-range Vitamin D3 regimen to be rejected');
    assert(result.code === 'AGE_ABOVE_REGIMEN_MAX', `Expected AGE_ABOVE_REGIMEN_MAX, got ${result.code}`);
  });

  window.DoseCareVitaminD3Tests = {
    run() {
      const results = tests.map(({ name, fn }) => {
        try { fn(); return { name, passed: true }; }
        catch (error) { return { name, passed: false, error: error.message || String(error) }; }
      });
      return { passed: results.every(x => x.passed), results };
    }
  };
})();
