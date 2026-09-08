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
    'paracetamol','ibuprofen','mefenamic-acid','ambroxol','carbocisteine','bromhexine','guaifenesin','dextromethorphan','cetirizine','loratadine','desloratadine','chlorpheniramine','fexofenadine','diphenhydramine','hydroxyzine','ondansetron','prednisolone','salbutamol',
    'lactulose','omeprazole','magnesium-hydroxide','famotidine','sulfamethoxazole-trimethoprim','zinc-sulfate','domperidone','simethicone','hyoscine-butylbromide','sodium-citrate','vitamin-d3','iron','multivitamin','multivitamin-iron','folic-acid','fluconazole','mebendazole','nitazoxanide'
  ];

  test('database contains all 50 active V2 oral-liquid medicines', () => {
    const all = db.getAll();
    assert(all.length === 50, `Expected 50 medicines, got ${all.length}`);
    const ids = all.map(m => m.id);
    assert(new Set(ids).size === ids.length, 'Duplicate medicine IDs detected');
    ALL_IDS.forEach(id => assert(db.getById(id), `Missing medicine: ${id}`));
    assert(!db.getById('ors'), 'ORS powder must not be active');
    assert(!db.getById('macrogol'), 'Macrogol powder must not be active');
    assert(!db.getById('probiotics'), 'Probiotic powder must not be active');
  });

  test('all registered formulations are oral liquids only', () => {
    db.getAll().forEach(m => {
      assert(m.route === 'Oral', `${m.id}: route must be Oral`);
      assert(/suspension|solution|syrup|drops|liquid/i.test(String(m.dosageForm)), `${m.id}: dosage form must be oral liquid`);
      (m.formulations || []).forEach(f => {
        const c = f.concentration || {};
        assert(Number(c.amount ?? f.amount ?? f.mgPer5mL ?? f.strengthMg) > 0, `${m.id}: invalid concentration amount`);
        assert(Number(c.volume ?? f.volume ?? (f.mgPer5mL ? 5 : 0)) > 0, `${m.id}: invalid concentration volume`);
      });
    });
  });

  test('all active regimens use supported types and valid formulation references', () => {
    const allowed = new Set(['mg_per_kg_per_day','mg_per_kg_per_dose','fixed_dose','age_based','label_age_based','label_weight_age_based','condition_based','weight_based','scheduled']);
    db.getAll().forEach(m => (m.regimens || []).forEach(r => {
      assert(allowed.has(r.type), `${m.id}/${r.id}: unsupported regimen type ${r.type}`);
      if (r.allowedFormulations) {
        const ids = new Set((m.formulations || []).map(f => f.id));
        r.allowedFormulations.forEach(id => assert(ids.has(id), `${m.id}/${r.id}: unknown formulation ${id}`));
      }
    }));
  });

  test('registered medicine metadata exposes canonical information keys', () => {
    db.getAll().forEach(m => {
      const info = m.information || {};
      assert(!Object.prototype.hasOwnProperty.call(info, 'mechanismOfAction'), `${m.id}: legacy mechanismOfAction leaked`);
      assert(!Object.prototype.hasOwnProperty.call(info, 'warningsPrecautions'), `${m.id}: legacy warningsPrecautions leaked`);
      if (info.mechanism != null) assert(typeof info.mechanism === 'string', `${m.id}: mechanism must be string`);
      if (info.precautions != null) assert(Array.isArray(info.precautions), `${m.id}: precautions must be array`);
    });
  });

  test('amoxicillin mg/kg/day q12h converts correctly', () => {
    const m = db.getById('amoxicillin');
    const r = m.regimens.find(x => x.id === 'ent-mild-q12h');
    const result = engine.calculate({ medicine: m, regimen: r, weight: 10, age: 12, ageUnit: 'months', formulation: m.formulations[0] });
    assert(result.ok, result.error || 'Calculation failed');
    assert(near(result.dailyLowMg, 250), `Expected 250 mg/day, got ${result.dailyLowMg}`);
    assert(near(result.lowMg, 125), `Expected 125 mg/dose, got ${result.lowMg}`);
    assert(near(result.lowMl, 1.5625), `Expected 1.5625 mL/dose, got ${result.lowMl}`);
  });

  test('vitamin D3 routine regimen converts to 1 mL daily', () => {
    const m = db.getById('vitamin-d3');
    const r = m.regimens.find(x => x.id === 'vitamin-d3-routine-400iu');
    const f = m.formulations.find(x => x.id === 'd-vite-400iu-per-ml');
    const result = engine.calculate({ medicine: m, regimen: r, age: 6, ageUnit: 'months', formulation: f });
    assert(result.ok, result.error || 'Calculation failed');
    assert(near(result.lowMl, 1), `Expected 1 mL/day, got ${result.lowMl}`);
  });

  test('mebendazole pinworm regimen calculates 5 mL once for age over 2 years', () => {
    const m = db.getById('mebendazole');
    const r = m.regimens.find(x => x.id === 'mebendazole-enterobiasis-over-2-years');
    const result = engine.calculate({ medicine: m, regimen: r, age: 5, ageUnit: 'years', formulation: m.formulations[0] });
    assert(result.ok, result.error || 'Calculation failed');
    assert(near(result.lowMg, 100), `Expected 100 mg, got ${result.lowMg}`);
    assert(near(result.lowMl, 5), `Expected 5 mL, got ${result.lowMl}`);
  });

  test('nitazoxanide 1–3 years calculates 5 mL every 12 hours', () => {
    const m = db.getById('nitazoxanide');
    const r = m.regimens.find(x => x.id === 'nitazoxanide-giardia-cryptosporidium-1-3-years');
    const result = engine.calculate({ medicine: m, regimen: r, age: 2, ageUnit: 'years', formulation: m.formulations[0] });
    assert(result.ok, result.error || 'Calculation failed');
    assert(near(result.lowMl, 5), `Expected 5 mL/dose, got ${result.lowMl}`);
    assert(Number(result.frequency) === 2, `Expected frequency 2, got ${result.frequency}`);
  });

  test('sodium citrate 5–15 mL regimen converts from sodium-citrate concentration', () => {
    const m = db.getById('sodium-citrate');
    const r = m.regimens[0];
    const result = engine.calculate({ medicine: m, regimen: r, age: 6, ageUnit: 'years', formulation: m.formulations[0] });
    assert(result.ok, result.error || 'Calculation failed');
    assert(near(result.lowMl, 5), `Expected 5 mL lower dose, got ${result.lowMl}`);
    assert(near(result.highMl, 15), `Expected 15 mL upper dose, got ${result.highMl}`);
  });

  test('multivitamin plus iron label dose calculates 1 mL daily under 4 years', () => {
    const m = db.getById('multivitamin-iron');
    const r = m.regimens[0];
    const result = engine.calculate({ medicine: m, regimen: r, age: 2, ageUnit: 'years', formulation: m.formulations[0] });
    assert(result.ok, result.error || 'Calculation failed');
    assert(near(result.lowMl, 1), `Expected 1 mL/day, got ${result.lowMl}`);
  });

  test('fluconazole oral suspension calculation remains valid', () => {
    const m = db.getById('fluconazole');
    const r = m.regimens.find(x => x.id === 'fluconazole-oropharyngeal-maintenance');
    const f = m.formulations.find(x => x.id === 'fluconazole-40mg-per-ml');
    const result = engine.calculate({ medicine: m, regimen: r, weight: 10, age: 1, ageUnit: 'years', formulation: f });
    assert(result.ok, result.error || 'Calculation failed');
    assert(near(result.lowMg, 30), `Expected 30 mg/day, got ${result.lowMg}`);
    assert(near(result.lowMl, 0.75), `Expected 0.75 mL/day, got ${result.lowMl}`);
  });

  test('diphenhydramine auto-calculates only the labeled 6–11 year range', () => {
    const m = db.getById('diphenhydramine');
    const r = m.regimens[0];
    const f = m.formulations[0];
    const child = engine.calculate({ medicine: m, regimen: r, age: 8, ageUnit: 'years', formulation: f });
    assert(child.ok, child.error || 'Calculation failed');
    assert(near(child.lowMl, 5), `Expected 5 mL lower dose, got ${child.lowMl}`);
    assert(near(child.highMl, 10), `Expected 10 mL upper dose, got ${child.highMl}`);
    const younger = engine.calculate({ medicine: m, regimen: r, age: 4, ageUnit: 'years', formulation: f });
    assert(!younger.ok && younger.code === 'AGE_BELOW_REGIMEN_MIN', 'Ages 2–5 must not receive an automatic diphenhydramine dose');
  });

  test('magnesium hydroxide follows the current label and does not auto-calculate under 6 years', () => {
    const m = db.getById('magnesium-hydroxide');
    const laxative = m.regimens.find(x => x.id === 'laxative-6-11y');
    const f = m.formulations[0];
    const child = engine.calculate({ medicine: m, regimen: laxative, age: 8, ageUnit: 'years', formulation: f });
    assert(child.ok, child.error || 'Calculation failed');
    assert(near(child.lowMl, 15), `Expected 15 mL lower dose, got ${child.lowMl}`);
    assert(near(child.highMl, 30), `Expected 30 mL higher dose, got ${child.highMl}`);
    const younger = engine.calculate({ medicine: m, regimen: laxative, age: 5, ageUnit: 'years', formulation: f });
    assert(!younger.ok && younger.code === 'AGE_BELOW_REGIMEN_MIN', 'Children under 6 must not receive an automatic magnesium hydroxide dose');
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
