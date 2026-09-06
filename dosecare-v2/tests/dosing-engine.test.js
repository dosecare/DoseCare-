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
    'paracetamol','ibuprofen','mefenamic-acid','ambroxol','carbocisteine','cetirizine','loratadine','desloratadine','chlorpheniramine','fexofenadine','diphenhydramine','ondansetron','prednisolone','salbutamol',
    'lactulose','omeprazole','magnesium-hydroxide','famotidine','sulfamethoxazole-trimethoprim','zinc-sulfate','domperidone','simethicone','hyoscine-butylbromide'
  ];

  test('database contains all 37 active V2 oral-liquid medicines', () => {
    const all = db.getAll();
    assert(all.length === 37, `Expected 37 medicines, got ${all.length}`);
    const ids = all.map(m => m.id);
    assert(new Set(ids).size === ids.length, 'Duplicate medicine IDs detected');
    ALL_IDS.forEach(id => assert(db.getById(id), `Missing medicine: ${id}`));
    assert(!db.getById('ors'), 'ORS powder must not be active in the oral-liquid medicine database');
    assert(!db.getById('macrogol'), 'Macrogol powder must not be active in the oral-liquid medicine database');
    assert(!db.getById('probiotics'), 'Probiotic powder must not be active in the oral-liquid medicine database');
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

  test('amoxicillin mg/kg/day q12h converts to mg/dose and mL/dose', () => {
    const m = db.getById('amoxicillin');
    const r = m.regimens.find(x => x.id === 'ent-mild-q12h');
    const result = engine.calculate({ medicine: m, regimen: r, weight: 10, age: 12, ageUnit: 'months', formulation: m.formulations[0] });
    assert(result.ok, result.error || 'Calculation failed');
    assert(near(result.dailyLowMg, 250), `Expected 250 mg/day, got ${result.dailyLowMg}`);
    assert(near(result.lowMg, 125), `Expected 125 mg/dose, got ${result.lowMg}`);
    assert(near(result.lowMl, 1.5625), `Expected 1.5625 mL/dose, got ${result.lowMl}`);
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

  test('ondansetron 4–11 chemotherapy schedule returns three labeled doses', () => {
    const m = db.getById('ondansetron');
    const r = m.regimens.find(x => x.id === 'chemotherapy-4-11-initial');
    assert(Array.isArray(r.schedule) && r.schedule.length === 3, 'Expected three initial-phase doses');
    const result = engine.calculate({ medicine: m, regimen: r, age: 8, ageUnit: 'years', formulation: m.formulations[0] });
    assert(result.ok, result.error || 'Calculation failed');
    assert(result.schedule.length === 3, `Expected 3 schedule entries, got ${result.schedule.length}`);
    assert(result.schedule.every(step => near(step.doseMg, 4)), 'Each initial dose should be 4 mg');
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

  test('Ambroxol under 2 years is rejected', () => {
    const m = db.getById('ambroxol');
    const r = m.regimens.find(x => x.id === 'age-2-5');
    const f = m.formulations[0];
    const result = engine.calculate({ medicine: m, regimen: r, age: 1.5, ageUnit: 'years', formulation: f });
    assert(!result.ok && result.code === 'AGE_BELOW_REGIMEN_MIN', 'Ambroxol under 2 years should be rejected');
  });

  test('Carbocisteine 2–5 years preserves the labeled 1.25–2.5 mL range', () => {
    const m = db.getById('carbocisteine');
    const r = m.regimens.find(x => x.id === 'age-2-5');
    const f = m.formulations.find(x => x.id === 'carbocisteine-250mg-5ml');
    const result = engine.calculate({ medicine: m, regimen: r, age: 4, ageUnit: 'years', formulation: f });
    assert(result.ok, result.error || 'Calculation failed');
    assert(near(result.lowMg, 62.5), `Expected 62.5 mg lower dose, got ${result.lowMg}`);
    assert(near(result.highMg, 125), `Expected 125 mg upper dose, got ${result.highMg}`);
    assert(near(result.lowMl, 1.25), `Expected 1.25 mL lower volume, got ${result.lowMl}`);
    assert(near(result.highMl, 2.5), `Expected 2.5 mL upper volume, got ${result.highMl}`);
  });

  test('Carbocisteine 6–12 years calculates 250 mg = 5 mL three times daily', () => {
    const m = db.getById('carbocisteine');
    const r = m.regimens.find(x => x.id === 'age-6-12');
    const f = m.formulations[0];
    const result = engine.calculate({ medicine: m, regimen: r, age: 8, ageUnit: 'years', formulation: f });
    assert(result.ok, result.error || 'Calculation failed');
    assert(near(result.lowMg, 250), `Expected 250 mg/dose, got ${result.lowMg}`);
    assert(near(result.lowMl, 5), `Expected 5 mL/dose, got ${result.lowMl}`);
    assert(Number(result.frequency) === 3, `Expected frequency 3, got ${result.frequency}`);
  });

  test('Carbocisteine under 2 years is rejected', () => {
    const m = db.getById('carbocisteine');
    const r = m.regimens.find(x => x.id === 'age-2-5');
    const result = engine.calculate({ medicine: m, regimen: r, age: 1.5, ageUnit: 'years', formulation: m.formulations[0] });
    assert(!result.ok && result.code === 'AGE_BELOW_REGIMEN_MIN', 'Carbocisteine under 2 years should be rejected');
  });

  window.DoseCareV2DosingTests = {
    run() {
      const results = tests.map(({ name, fn }) => {
        try { fn(); return { name, passed: true }; }
        catch (error) { return { name, passed: false, error: error.message || String(error) }; }
      });
      return { passed: results.every(x => x.passed), results };
    }
  };
})();
