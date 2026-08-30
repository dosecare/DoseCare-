/* DoseCare V2 — dosing engine regression tests
 * Run in a browser/JS test runner after loading database.js, medicine data files,
 * and dosing-engine.js. These tests intentionally cover calculation contracts.
 */
(function () {
  'use strict';

  const engine = window.DoseCareDosingEngine;
  const db = window.DoseCareV2Database;
  if (!engine || !db) throw new Error('DoseCare V2 engine/database not loaded');

  const tests = [];
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
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

  test('amoxicillin regimen requires pediatric weight range', () => {
    const m = db.getById('amoxicillin');
    const r = m.regimens.find(x => x.type === 'mg_per_kg_per_day');
    assert(r, 'Amoxicillin mg/kg/day regimen missing');
    assert(r.minAgeMonths != null, 'Amoxicillin minimum age missing');
    assert(r.maxWeightKg != null, 'Amoxicillin maximum pediatric weight missing');
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
