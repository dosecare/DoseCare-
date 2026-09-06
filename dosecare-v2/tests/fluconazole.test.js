/* DoseCare V2 — Fluconazole regression tests. */
window.DoseCareFluconazoleTests = (() => {
  function assert(condition, message) { if (!condition) throw new Error(message); }
  function close(a, b, tolerance = 1e-9) { return Math.abs(a - b) <= tolerance; }
  function run() {
    const db = window.DoseCareV2Database;
    const engine = window.DoseCareV2DosingEngine || window.DoseCareDosingEngine;
    const m = db.getById('fluconazole');
    const results = [];
    const test = (name, fn) => { try { fn(); results.push({ name, passed: true }); } catch (error) { results.push({ name, passed: false, error: error.message }); } };
    test('Fluconazole has 10 mg/mL and 40 mg/mL oral suspension concentrations', () => {
      assert(m && m.formulations.length === 2, 'Expected two fluconazole formulations');
      assert(m.formulations[0].mgPerMl === 10, 'Expected 10 mg/mL formulation');
      assert(m.formulations[1].mgPerMl === 40, 'Expected 40 mg/mL formulation');
    });
    test('Oropharyngeal loading dose: 10 kg at 10 mg/mL = 6 mL once', () => {
      const r = engine.calculate({ medicine: m, regimen: m.regimens[0], weight: 10, age: 12, ageUnit: 'months', formulation: m.formulations[0] });
      assert(r.ok, r.error || 'Calculation failed');
      assert(close(r.lowMg, 60), `Expected 60 mg, got ${r.lowMg}`);
      assert(close(r.lowMl, 6), `Expected 6 mL, got ${r.lowMl}`);
    });
    test('Oropharyngeal maintenance: 10 kg at 40 mg/mL = 0.75 mL once daily', () => {
      const r = engine.calculate({ medicine: m, regimen: m.regimens[1], weight: 10, age: 12, ageUnit: 'months', formulation: m.formulations[1] });
      assert(r.ok, r.error || 'Calculation failed');
      assert(close(r.dailyLowMg, 30), `Expected 30 mg/day, got ${r.dailyLowMg}`);
      assert(close(r.lowMl, 0.75), `Expected 0.75 mL, got ${r.lowMl}`);
    });
    test('Age below 6 months is rejected', () => {
      const r = engine.calculate({ medicine: m, regimen: m.regimens[0], weight: 5, age: 5, ageUnit: 'months', formulation: m.formulations[0] });
      assert(!r.ok && r.code === 'AGE_BELOW_REGIMEN_MIN', 'Expected age-bound rejection below 6 months');
    });
    return { passed: results.every(x => x.passed), results };
  }
  return { run };
})();