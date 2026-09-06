/* DoseCare V2 — dosing engine regression tests. */
(function () {
  'use strict';
  const engine = window.DoseCareDosingEngine;
  const db = window.DoseCareV2Database;
  if (!engine || !db) throw new Error('DoseCare V2 engine/database not loaded');
  const tests = [];
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const near = (a, b, eps = 1e-9) => Math.abs(Number(a) - Number(b)) < eps;
  const test = (name, fn) => tests.push({ name, fn });

  const ALL_IDS = [
    'amoxicillin','amoxicillin-clavulanate','azithromycin','cephalexin','cefuroxime','cefixime','cefpodoxime','cefdinir','cefprozil','clarithromycin','clindamycin','cefaclor','erythromycin','metronidazole',
    'paracetamol','ibuprofen','mefenamic-acid','ambroxol','cetirizine','loratadine','desloratadine','chlorpheniramine','fexofenadine','diphenhydramine','ondansetron','prednisolone','salbutamol',
    'lactulose','omeprazole','magnesium-hydroxide','famotidine','sulfamethoxazole-trimethoprim','zinc-sulfate','domperidone','simethicone','hyoscine-butylbromide'
  ];

  test('database contains all 36 active V2 oral-liquid medicines', () => {
    const all = db.getAll();
    assert(all.length === 36, `Expected 36 medicines, got ${all.length}`);
    const ids = all.map(m => m.id);
    assert(new Set(ids).size === ids.length, 'Duplicate medicine IDs detected');
    ALL_IDS.forEach(id => assert(db.getById(id), `Missing medicine: ${id}`));
    assert(!db.getById('ors'), 'ORS powder must not be active in the oral-liquid medicine database');
  });

  test('all registered formulations are oral liquids only', () => {
    db.getAll().forEach(m => {
      assert(m.route === 'Oral', `${m.id}: route must be Oral`);
      assert(/suspension|solution|syrup|drops/i.test(String(m.dosageForm)), `${m.id}: dosage form must be oral liquid`);
      (m.formulations || []).forEach(f => {
        const c = f.concentration || {};
        assert(Number(c.amount ?? f.amount ?? f.mgPer5mL ?? f.strengthMg) > 0, `${m.id}: invalid concentration amount`);
        assert(Number(c.volume ?? f.volume ?? (f.mgPer5mL ? 5 : 0)) > 0, `${m.id}: invalid concentration volume`);
      });
    });
  });

  test('all active regimens have supported types', () => {
    const allowed = new Set(['mg_per_kg_per_day','mg_per_kg_per_dose','fixed_dose','age_based','label_age_based','label_weight_age_based','condition_based','weight_based','scheduled']);
    db.getAll().forEach(m => (m.regimens || []).forEach(r => assert(allowed.has(r.type), `${m.id}/${r.id}: unsupported regimen type ${r.type}`)));
  });

  test('scheduled regimens contain usable schedule steps', () => {
    db.getAll().forEach(m => (m.regimens || []).forEach(r => {
      if (!Array.isArray(r.schedule)) return;
      assert(r.schedule.length > 0, `${m.id}/${r.id}: empty schedule`);
      r.schedule.forEach((step, i) => assert(Number.isFinite(Number(step.doseMg)) || Number.isFinite(Number(step.doseMgPerKg ?? step.doseMgPerKgPerDose)), `${m.id}/${r.id} step ${i + 1}: missing dose`));
    }));
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

  test('amoxicillin starts configured pediatric regimens at 3 months', () => {
    const m = db.getById('amoxicillin');
    const regimens = m.regimens.filter(r => r.requiresAge);
    assert(regimens.length > 0, 'No age-limited Amoxicillin regimens found');
    regimens.forEach(r => assert(r.minAgeMonths === 3, `${r.id}: expected minimum age of 3 months`));
    regimens.forEach(r => assert(r.maxWeightKg === 39.9, `${r.id}: expected pediatric weight ceiling below 40 kg`));
  });

  test('amoxicillin mg/kg/day q12h converts to mg/dose and mL/dose', () => {
    const m = db.getById('amoxicillin');
    const r = m.regimens.find(x => x.id === 'ent-mild-q12h');
    const result = engine.calculate({ medicine: m, regimen: r, weight: 10, age: 12, ageUnit: 'months', formulation: m.formulations[0] });
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
    assert(!result.ok && result.code === 'AGE_BELOW_REGIMEN_MIN', 'Age below 3 months should be rejected');
  });

  test('cefixime accepts 12-year and 45-kg boundaries, rejects above', () => {
    const m = db.getById('cefixime');
    const r = m.regimens.find(x => x.id === 'standard-once-daily');
    const atAge = engine.calculate({ medicine: m, regimen: r, weight: 45, age: 12, ageUnit: 'years', formulation: m.formulations[0] });
    assert(atAge.ok, atAge.error || '12 years / 45 kg should be accepted');
    const aboveAge = engine.calculate({ medicine: m, regimen: r, weight: 30, age: 12.01, ageUnit: 'years', formulation: m.formulations[0] });
    assert(!aboveAge.ok && aboveAge.code === 'AGE_ABOVE_REGIMEN_MAX', 'Age above 12 years should be rejected');
    const aboveWeight = engine.calculate({ medicine: m, regimen: r, weight: 45.01, age: 12, ageUnit: 'years', formulation: m.formulations[0] });
    assert(!aboveWeight.ok && aboveWeight.code === 'WEIGHT_ABOVE_REGIMEN_MAX', 'Weight above 45 kg should be rejected');
  });

  test('cefpodoxime accepts 12-year boundary and rejects above', () => {
    const m = db.getById('cefpodoxime');
    const r = m.regimens.find(x => x.id === 'aom');
    const at = engine.calculate({ medicine: m, regimen: r, weight: 30, age: 12, ageUnit: 'years', formulation: m.formulations[0] });
    assert(at.ok, at.error || '12 years should be accepted');
    const above = engine.calculate({ medicine: m, regimen: r, weight: 30, age: 12.01, ageUnit: 'years', formulation: m.formulations[0] });
    assert(!above.ok && above.code === 'AGE_ABOVE_REGIMEN_MAX', 'Age above 12 years should be rejected');
  });

  test('paracetamol label chart maps 2–3 years and 24–35 lb to 5 mL', () => {
    const m = db.getById('paracetamol');
    const r = m.regimens.find(x => x.id === 'label-weight-age-chart');
    const result = engine.calculate({ medicine: m, regimen: r, weight: 12, age: 2.5, ageUnit: 'years', formulation: m.formulations[0] });
    assert(result.ok, result.error || 'Calculation failed');
    assert(near(result.lowMl, 5), `Expected 5 mL/dose, got ${result.lowMl}`);
  });

  test('cefprozil acute otitis media applies 1000 mg/day maximum', () => {
    const m = db.getById('cefprozil');
    const r = m.regimens.find(x => x.id === 'otitis-media-15-mg-kg-q12h');
    const f = m.formulations.find(x => x.mgPer5mL === 250);
    const result = engine.calculate({ medicine: m, regimen: r, weight: 40, age: 10, ageUnit: 'years', formulation: f });
    assert(result.ok, result.error || 'Calculation failed');
    assert(near(result.dailyLowMg, 1000), `Expected capped 1000 mg/day, got ${result.dailyLowMg}`);
    assert(near(result.lowMg, 500), `Expected capped 500 mg/dose, got ${result.lowMg}`);
    assert(near(result.lowMl, 10), `Expected 10 mL/dose, got ${result.lowMl}`);
  });

  test('clarithromycin caps standard pediatric regimen at 500 mg/dose', () => {
    const m = db.getById('clarithromycin');
    const r = m.regimens.find(x => x.id === 'standard-pediatric-15-mg-kg-day');
    const f = m.formulations.find(x => x.mgPer5mL === 250);
    const result = engine.calculate({ medicine: m, regimen: r, weight: 70, age: 10, ageUnit: 'years', formulation: f });
    assert(result.ok, result.error || 'Calculation failed');
    assert(near(result.lowMg, 500), `Expected capped 500 mg/dose, got ${result.lowMg}`);
    assert(near(result.highMg, 500), `Expected capped 500 mg/dose, got ${result.highMg}`);
  });

  test('clindamycin supports both 3-dose and 4-dose daily splitting', () => {
    const m = db.getById('clindamycin');
    const r = m.regimens.find(x => x.id === 'serious-infection-8-12-mg-kg-day');
    const result = engine.calculate({ medicine: m, regimen: r, weight: 20, age: 8, ageUnit: 'years', formulation: m.formulations[0] });
    assert(result.ok, result.error || 'Calculation failed');
    assert(near(result.dailyLowMg, 160), `Expected 160 mg/day, got ${result.dailyLowMg}`);
    assert(near(result.lowMg, 160 / 3), `Expected 3-dose split of ${160 / 3} mg, got ${result.lowMg}`);
    assert(near(result.alternativeLowMg, 40), `Expected 4-dose split of 40 mg, got ${result.alternativeLowMg}`);
    assert(near(result.alternativeLowMl, 40 / 15), `Expected 2.6667 mL, got ${result.alternativeLowMl}`);
  });

  test('ondansetron 4–11 chemotherapy schedule returns three labeled doses', () => {
    const m = db.getById('ondansetron');
    const r = m.regimens.find(x => x.id === 'chemotherapy-4-11-initial');
    assert(Array.isArray(r.schedule) && r.schedule.length === 3, 'Expected three initial-phase doses');
    const result = engine.calculate({ medicine: m, regimen: r, age: 8, ageUnit: 'years', formulation: m.formulations[0] });
    assert(result.ok, result.error || 'Calculation failed');
    assert(result.schedule.length === 3, `Expected 3 schedule entries, got ${result.schedule.length}`);
    assert(result.schedule.every(step => near(step.doseMg, 4)), 'Each initial dose should be 4 mg');
    assert(near(result.scheduleTotalMg, 12), `Expected 12 mg total, got ${result.scheduleTotalMg}`);
  });

  test('Ambroxol 2–5 years calculates 7.5 mg = 2.5 mL three times daily', () => {
    const m = db.getById('ambroxol');
    const r = m.regimens.find(x => x.id === 'age-2-5');
    const f = m.formulations.find(x => x.id === 'ambroxol-15mg-5ml');
    const result = engine.calculate({ medicine: m, regimen: r, age: 4, ageUnit: 'years', formulation: f });
    assert(result.ok, result.error || 'Calculation failed');
    assert(near(result.lowMg, 7.5), `Expected 7.5 mg/dose, got ${result.lowMg}`);
    assert(near(result.lowMl, 2.5), `Expected 2.5 mL/dose, got ${result.lowMl}`);
    assert(Number(result.frequency) === 3, `Expected frequency 3, got ${result.frequency}`);
  });

  test('Ambroxol 6–12 years calculates 15 mg = 5 mL and preserves q12h alternative', () => {
    const m = db.getById('ambroxol');
    const r = m.regimens.find(x => x.id === 'age-6-12');
    const f = m.formulations.find(x => x.id === 'ambroxol-15mg-5ml');
    const result = engine.calculate({ medicine: m, regimen: r, age: 8, ageUnit: 'years', formulation: f });
    assert(result.ok, result.error || 'Calculation failed');
    assert(near(result.lowMg, 15), `Expected 15 mg/dose, got ${result.lowMg}`);
    assert(near(result.lowMl, 5), `Expected 5 mL/dose, got ${result.lowMl}`);
    assert(Number(result.frequency) === 3, `Expected primary frequency 3, got ${result.frequency}`);
    assert(Number(r.alternativeFrequency) === 2, 'Expected q12h alternative frequency of 2');
  });

  test('Ambroxol rejects children under 2 years', () => {
    const m = db.getById('ambroxol');
    const r = m.regimens.find(x => x.id === 'age-2-5');
    const f = m.formulations.find(x => x.id === 'ambroxol-15mg-5ml');
    const result = engine.calculate({ medicine: m, regimen: r, age: 1.99, ageUnit: 'years', formulation: f });
    assert(!result.ok && result.code === 'AGE_BELOW_REGIMEN_MIN', `Expected age rejection, got ${result.code || result.error}`);
  });

  test('no active medicine is an excluded powder-only formulation', () => {
    db.getAll().forEach(m => assert(!/powder/i.test(String(m.dosageForm)), `${m.id}: powder formulation must not be active`));
  });

  window.DoseCareV2DosingTests = {
    run() {
      const results = tests.map(({ name, fn }) => {
        try { fn(); return { name, passed: true }; }
        catch (error) { return { name, passed: false, error: error.message }; }
      });
      return { passed: results.every(r => r.passed), results };
    }
  };
})();
