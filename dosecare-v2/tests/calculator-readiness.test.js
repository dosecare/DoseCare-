/* DoseCare V2 — calculator-readiness audit for every active regimen. */
(function () {
  'use strict';
  const engine = window.DoseCareDosingEngine;
  const db = window.DoseCareV2Database;
  if (!engine || !db) throw new Error('DoseCare V2 engine/database not loaded');
  const tests = [];
  const test = (name, fn) => tests.push({ name, fn });
  const num = value => Number.isFinite(Number(value)) ? Number(value) : null;
  const ageMonths = (r) => {
    const min = r.minAgeMonths ?? (r.minAgeYears != null ? Number(r.minAgeYears) * 12 : null);
    const max = r.maxAgeMonths ?? (r.maxAgeYears != null ? Number(r.maxAgeYears) * 12 : null);
    if (min != null && max != null) return (Number(min) + Number(max)) / 2;
    if (min != null) return Number(min) + 6;
    if (max != null) return Math.max(0, Number(max) - 6);
    return 60;
  };
  const ageInput = r => {
    const months = ageMonths(r);
    return months >= 12 ? { age: months / 12, ageUnit: 'years' } : { age: months, ageUnit: 'months' };
  };
  const weightInput = r => {
    const min = num(r.minWeightKg);
    const max = num(r.maxWeightKg);
    if (min != null && max != null) return (min + max) / 2;
    if (min != null) return min + 2;
    if (max != null) return Math.min(10, max);
    return 10;
  };
  const compatibleFormulation = (m, r) => {
    const forms = m.formulations || [];
    if (!r.allowedFormulations?.length) return forms[0];
    return forms.find(f => r.allowedFormulations.map(String).includes(String(f.id)));
  };
  function requirements(r) {
    const type = r.type === 'mg_per_kg_day' ? 'mg_per_kg_per_day' : r.type === 'mg_per_kg_single_dose' ? 'mg_per_kg_per_dose' : r.type;
    const hasSchedule = Array.isArray(r.schedule) && r.schedule.length > 0;
    return {
      age: r.requiresAge ?? (hasSchedule || ['age_based','label_age_based','label_weight_age_based'].includes(type) || ['minAgeWeeks','maxAgeWeeks','minAgeMonths','maxAgeMonths','minAgeYears','maxAgeYears'].some(k => r[k] != null)),
      weight: r.requiresWeight ?? (hasSchedule && r.schedule.some(s => s.doseMgPerKg != null || s.doseMgPerKgPerDose != null) || ['mg_per_kg_per_day','mg_per_kg_per_dose','weight_based','label_weight_age_based'].includes(type))
    };
  }
  db.getAll().forEach(m => {
    (m.regimens || []).forEach(r => {
      test(`${m.id}/${r.id} is calculator-ready with representative inputs`, () => {
        const req = requirements(r);
        const a = ageInput(r);
        const f = compatibleFormulation(m, r);
        if (!f) throw new Error('No formulation compatible with this regimen');
        const result = engine.calculate({
          medicine: m,
          regimen: r,
          age: req.age ? a.age : undefined,
          ageUnit: req.age ? a.ageUnit : undefined,
          weight: req.weight ? weightInput(r) : undefined,
          formulation: f
        });
        if (!result.ok) throw new Error(result.error || result.code || 'Calculation failed');
        if (!Number.isFinite(Number(result.lowMg)) && !Array.isArray(result.schedule)) throw new Error('No numeric dose result returned');
        if (!Number.isFinite(Number(result.lowMl)) && !Array.isArray(result.schedule)) throw new Error('No numeric mL result returned');
      });
    });
  });
  window.DoseCareCalculatorReadinessTests = {
    run() {
      const results = tests.map(t => {
        try { t.fn(); return { name: t.name, passed: true }; }
        catch (error) { return { name: t.name, passed: false, error: error.message }; }
      });
      return { passed: results.every(r => r.passed), results };
    }
  };
})();
