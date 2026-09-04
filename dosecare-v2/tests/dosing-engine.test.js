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
  const ALL_IDS = ['amoxicillin','amoxicillin-clavulanate','azithromycin','cephalexin','cefuroxime','cefixime','cefpodoxime','cefdinir','cefprozil','clarithromycin','clindamycin','paracetamol','ibuprofen','mefenamic-acid','cetirizine','loratadine','diphenhydramine','salbutamol','ondansetron','lactulose','magnesium-hydroxide','omeprazole','prednisolone'];

  test('database contains all 23 V2 medicines', () => {
    const all = db.getAll();
    assert(all.length === 23, `Expected 23 medicines, got ${all.length}`);
    const ids = all.map(m => m.id);
    assert(new Set(ids).size === ids.length, 'Duplicate medicine IDs detected');
    ALL_IDS.forEach(id => assert(db.getById(id), `Missing medicine: ${id}`));
  });

  test('all registered formulations are oral liquids only', () => {
    db.getAll().forEach(m => {
      assert(m.route === 'Oral', `${m.id}: route must be Oral`);
      assert(/suspension|solution|syrup/i.test(m.dosageForm), `${m.id}: dosage form must be oral liquid`);
      (m.formulations || []).forEach(f => {
        assert(f.concentration && f.concentration.amount > 0, `${m.id}: invalid concentration amount`);
        assert(f.concentration.volume > 0, `${m.id}: invalid concentration volume`);
      });
    });
  });

  test('all regimens have valid types', () => {
    const allowed = new Set(['mg_per_kg_per_day','mg_per_kg_per_dose','fixed_dose','age_based','label_age_based','label_weight_age_based','condition_based','weight_based']);
    db.getAll().forEach(m => (m.regimens || []).forEach(r => assert(allowed.has(r.type), `${m.id}/${r.id}: unsupported regimen type ${r.type}`)));
  });

  test('allowedFormulations references existing formulations', () => {
    db.getAll().forEach(m => (m.regimens || []).forEach(r => {
      if (!r.allowedFormulations) return;
      const ids = new Set((m.formulations || []).map(f => f.id).filter(Boolean));
      r.allowedFormulations.forEach(id => assert(ids.has(id), `${m.id}/${r.id}: unknown allowed formulation ${id}`));
    }));
  });

  test('registered medicine metadata exposes canonical keys only', () => {
    db.getAll().forEach(m => {
      const info = m.information || {};
      assert(!Object.prototype.hasOwnProperty.call(info, 'mechanismOfAction'), `${m.id}: legacy mechanismOfAction key leaked into registry`);
      assert(!Object.prototype.hasOwnProperty.call(info, 'warningsPrecautions'), `${m.id}: legacy warningsPrecautions key leaked into registry`);
      if (info.mechanism != null) assert(typeof info.mechanism === 'string', `${m.id}: mechanism must be a string`);
      if (info.precautions != null) assert(Array.isArray(info.precautions), `${m.id}: precautions must be an array`);
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

  test('cefixime accepts the 12-year boundary', () => {
    const m = db.getById('cefixime');
    const r = m.regimens.find(x => x.id === 'standard-once-daily');
    const result = engine.calculate({ medicine: m, regimen: r, weight: 30, age: 12, ageUnit: 'years', formulation: m.formulations[0] });
    assert(result.ok, result.error || '12 years should be accepted');
  });

  test('cefixime rejects age above 12 years', () => {
    const m = db.getById('cefixime');
    const r = m.regimens.find(x => x.id === 'standard-once-daily');
    const result = engine.calculate({ medicine: m, regimen: r, weight: 30, age: 12.01, ageUnit: 'years', formulation: m.formulations[0] });
    assert(!result.ok && result.code === 'AGE_ABOVE_REGIMEN_MAX', 'Age above 12 years should be rejected');
  });

  test('cefixime accepts 45 kg boundary and rejects above 45 kg', () => {
    const m = db.getById('cefixime');
    const r = m.regimens.find(x => x.id === 'standard-once-daily');
    const atBoundary = engine.calculate({ medicine: m, regimen: r, weight: 45, age: 12, ageUnit: 'years', formulation: m.formulations[0] });
    assert(atBoundary.ok, atBoundary.error || '45 kg should be accepted');
    const above = engine.calculate({ medicine: m, regimen: r, weight: 45.01, age: 12, ageUnit: 'years', formulation: m.formulations[0] });
    assert(!above.ok && above.code === 'WEIGHT_ABOVE_REGIMEN_MAX', 'Weight above 45 kg should be rejected');
  });

  test('cefpodoxime accepts the 12-year boundary', () => {
    const m = db.getById('cefpodoxime');
    const r = m.regimens.find(x => x.id === 'aom');
    const result = engine.calculate({ medicine: m, regimen: r, weight: 30, age: 12, ageUnit: 'years', formulation: m.formulations[0] });
    assert(result.ok, result.error || '12 years should be accepted');
  });

  test('cefpodoxime rejects age above 12 years', () => {
    const m = db.getById('cefpodoxime');
    const r = m.regimens.find(x => x.id === 'aom');
    const result = engine.calculate({ medicine: m, regimen: r, weight: 30, age: 12.01, ageUnit: 'years', formulation: m.formulations[0] });
    assert(!result.ok && result.code === 'AGE_ABOVE_REGIMEN_MAX', 'Age above 12 years should be rejected');
  });

  test('paracetamol label chart maps 2–3 years and 24–35 lb to 5 mL', () => {
    const m = db.getById('paracetamol');
    const r = m.regimens.find(x => x.id === 'label-weight-age-chart');
    const result = engine.calculate({ medicine: m, regimen: r, weight: 12, age: 2.5, ageUnit: 'years', formulation: m.formulations[0] });
    assert(result.ok, result.error || 'Calculation failed');
    assert(near(result.lowMl, 5), `Expected 5 mL/dose, got ${result.lowMl}`);
  });

  test('cefprozil acute otitis media applies the 1000 mg/day maximum', () => {
    const m = db.getById('cefprozil');
    const r = m.regimens.find(x => x.id === 'otitis-media-15-mg-kg-q12h');
    const f = m.formulations.find(x => x.mgPer5mL === 250);
    const result = engine.calculate({ medicine: m, regimen: r, weight: 40, age: 10, ageUnit: 'years', formulation: f });
    assert(result.ok, result.error || 'Calculation failed');
    assert(near(result.dailyLowMg, 1000), `Expected capped 1000 mg/day, got ${result.dailyLowMg}`);
    assert(near(result.lowMg, 500), `Expected capped 500 mg/dose, got ${result.lowMg}`);
    assert(near(result.lowMl, 10), `Expected 10 mL/dose, got ${result.lowMl}`);
    assert(result.maximumApplied === true || result.maximumAppliedType === 'daily', 'Expected daily maximum to be applied');
  });

  test('clarithromycin caps the standard pediatric regimen at 500 mg per dose', () => {
    const m = db.getById('clarithromycin');
    const r = m.regimens.find(x => x.id === 'standard-pediatric-15-mg-kg-day');
    const f = m.formulations.find(x => x.mgPer5mL === 250);
    const result = engine.calculate({ medicine: m, regimen: r, weight: 70, age: 10, ageUnit: 'years', formulation: f });
    assert(result.ok, result.error || 'Calculation failed');
    assert(near(result.lowMg, 500), `Expected capped 500 mg/dose, got ${result.lowMg}`);
    assert(near(result.highMg, 500), `Expected capped 500 mg/dose, got ${result.highMg}`);
    assert(near(result.dailyHighMg, 1000), `Expected capped 1000 mg/day, got ${result.dailyHighMg}`);
    assert(result.maximumAppliedType === 'daily' || result.maximumAppliedType === 'per_administration', 'Expected a maximum-dose cap to be recorded');
  });

  test('clindamycin supports both 3-dose and 4-dose daily splitting', () => {
    const m = db.getById('clindamycin');
    const r = m.regimens.find(x => x.id === 'serious-infection-8-12-mg-kg-day');
    const f = m.formulations[0];
    const result = engine.calculate({ medicine: m, regimen: r, weight: 20, age: 8, ageUnit: 'years', formulation: f });
    assert(result.ok, result.error || 'Calculation failed');
    assert(near(result.dailyLowMg, 160), `Expected 160 mg/day, got ${result.dailyLowMg}`);
    assert(near(result.lowMg, 160 / 3), `Expected 3-dose split of ${160 / 3} mg, got ${result.lowMg}`);
    assert(near(result.alternativeLowMg, 40), `Expected 4-dose split of 40 mg, got ${result.alternativeLowMg}`);
    assert(near(result.alternativeLowMl, 40 / 15), `Expected 2.6667 mL, got ${result.alternativeLowMl}`);
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
