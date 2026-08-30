/* DoseCare V2 — dosing engine regression tests
 * Load database.js, medicine data files, dosing-engine.js, then run DoseCareV2DosingTests.run().
 */
(function () {
  'use strict';
  const engine = window.DoseCareDosingEngine;
  const db = window.DoseCareV2Database;
  if (!engine || !db) throw new Error('DoseCare V2 engine/database not loaded');
  const tests = [];
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const near = (a, b, eps = 1e-9) => Math.abs(a - b) < eps;
  const test = (name, fn) => tests.push({ name, fn });

  test('database contains core V2 medicines', () => {
    ['paracetamol', 'ibuprofen', 'amoxicillin'].forEach(id => assert(db.getById(id), `Missing medicine: ${id}`));
  });

  test('formulations are oral liquids only', () => {
    ['paracetamol', 'ibuprofen', 'amoxicillin'].forEach(id => {
      const m = db.getById(id);
      assert(m.route === 'Oral', `${id}: route must be Oral`);
      assert(/suspension|solution|syrup/i.test(m.dosageForm), `${id}: dosage form must be oral liquid`);
    });
  });

  test('amoxicillin starts the configured pediatric regimens at 3 months', () => {
    const m = db.getById('amoxicillin');
    const regimens = m.regimens.filter(r => r.requiresAge);
    assert(regimens.length > 0, 'No age-limited Amoxicillin regimens found');
    regimens.forEach(r => assert(r.minAgeMonths === 3, `${r.id}: expected minimum age of 3 months`));
    regimens.forEach(r => assert(r.maxWeightKg === 39.9, `${r.id}: expected pediatric weight ceiling below 40 kg`));
  });

  test('amoxicillin mg/kg/day q12h converts to mg/dose and mL/dose', () => {
    const m = db.getById('amoxicillin');
    const r = m.regimens.find(x => x.id === 'ent-mild-q12h');
    const f = m.formulations[0];
    const result = engine.calculate({ medicine: m, regimen: r, weight: 10, age: 12, ageUnit: 'months', formulation: f });
    assert(result.ok, result.error || 'Calculation failed');
    assert(near(result.dailyLowMg, 250), `Expected 250 mg/day, got ${result.dailyLowMg}`);
    assert(near(result.lowMg, 125), `Expected 125 mg/dose, got ${result.lowMg}`);
    assert(near(result.lowMl, 1.5625), `Expected 1.5625 mL/dose, got ${result.lowMl}`);
  });

  test('amoxicillin q8h regimen divides daily dose by 3', () => {
    const m = db.getById('amoxicillin');
    const r = m.regimens.find(x => x.id === 'ent-severe-q8h');
    const result = engine.calculate({ medicine: m, regimen: r, weight: 15, age: 24, ageUnit: 'months', formulation: m.formulations[0] });
    assert(result.ok, result.error || 'Calculation failed');
    assert(near(result.dailyLowMg, 600), `Expected 600 mg/day, got ${result.dailyLowMg}`);
    assert(near(result.lowMg, 200), `Expected 200 mg/dose, got ${result.lowMg}`);
    assert(near(result.lowMl, 2.5), `Expected 2.5 mL/dose, got ${result.lowMl}`);
  });

  test('amoxicillin rejects pediatric weight at or above 40 kg', () => {
    const m = db.getById('amoxicillin');
    const r = m.regimens.find(x => x.id === 'ent-mild-q12h');
    const result = engine.calculate({ medicine: m, regimen: r, weight: 40, age: 10, ageUnit: 'years', formulation: m.formulations[0] });
    assert(!result.ok && result.code === 'WEIGHT_ABOVE_REGIMEN_MAX', '40 kg should not use this pediatric regimen');
  });

  test('amoxicillin rejects age below configured minimum', () => {
    const m = db.getById('amoxicillin');
    const r = m.regimens.find(x => x.id === 'ent-mild-q12h');
    const result = engine.calculate({ medicine: m, regimen: r, weight: 8, age: 2, ageUnit: 'months', formulation: m.formulations[0] });
    assert(!result.ok && result.code === 'AGE_BELOW_REGIMEN_MIN', 'Age below 3 months should be rejected for this regimen');
  });

  test('all registered concentrations are positive', () => {
    db.getAll().forEach(m => (m.formulations || []).forEach(f => {
      assert(f.concentration && f.concentration.amount > 0, `${m.id}: invalid concentration amount`);
      assert(f.concentration.volume > 0, `${m.id}: invalid concentration volume`);
    }));
  });

  window.DoseCareV2DosingTests = {
    run() {
      const results = tests.map(t => {
        try { t.fn(); return { name: t.name, passed: true }; }
        catch (error) { return { name: t.name, passed: false, error: error.message }; }
      });
      return { passed: results.every(r => r.passed), results };
    }
  };
})();
