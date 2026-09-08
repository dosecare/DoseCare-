/* DoseCare V2 — arithmetic integrity audit for dose ↔ concentration calculations. */
(function (global) {
  'use strict';

  function num(v) { const n = Number(v); return Number.isFinite(n) ? n : null; }
  function mgPerMl(f) {
    if (!f) return null;
    if (num(f.mgPerMl) > 0) return num(f.mgPerMl);
    if (num(f.mgPer5mL) > 0) return num(f.mgPer5mL) / 5;
    const c = f.concentration || {};
    if (num(c.amount) > 0 && num(c.volume) > 0) return num(c.amount) / num(c.volume);
    return null;
  }
  function close(a, b, tolerance = 0.01) { return Math.abs(a - b) <= tolerance; }

  function formulationsFor(m, r) {
    const forms = m.formulations || [];
    if (!r.allowedFormulations?.length) return forms;
    // Normalise IDs to strings so numeric/string identifiers compare consistently.
    const allowed = r.allowedFormulations.map(String);
    const compatible = forms.filter(f => allowed.includes(String(f.id)));
    return compatible.length ? compatible : forms;
  }

  function ageInput(r) {
    const min = r.minAgeMonths ?? (r.minAgeYears != null ? Number(r.minAgeYears) * 12 : null);
    const max = r.maxAgeMonths ?? (r.maxAgeYears != null ? Number(r.maxAgeYears) * 12 : null);
    const months = min != null && max != null ? (Number(min) + Number(max)) / 2
      : min != null ? Number(min) + 6
      : max != null ? Math.max(0, Number(max) - 6)
      : 60;
    return months >= 12 ? { age: months / 12, ageUnit: 'years' } : { age: months, ageUnit: 'months' };
  }

  function weightInput(r) {
    const min = num(r.minWeightKg), max = num(r.maxWeightKg);
    if (min != null && max != null) return (min + max) / 2;
    if (min != null) return min + 2;
    if (max != null) return Math.min(10, max);
    return 10;
  }

  function representativeInputs(r) {
    if (r.type === 'label_weight_age_based' && Array.isArray(r.table) && r.table.length) {
      const row = r.table[0];
      const minLb = num(row.minLb), maxLb = num(row.maxLb);
      const minYears = num(row.minAgeYears), maxYears = num(row.maxAgeYears);
      const weightLb = minLb != null && maxLb != null ? (minLb + maxLb) / 2 : (minLb ?? maxLb);
      const years = minYears != null && maxYears != null ? (minYears + maxYears) / 2 : (minYears ?? maxYears);
      return { age: years, ageUnit: 'years', weight: weightLb != null ? weightLb / 2.2046226218 : weightInput(r) };
    }
    const minWeight = num(r.minWeightKg), maxWeight = num(r.maxWeightKg);
    const a = ageInput(r);
    return {
      age: a.age,
      ageUnit: a.ageUnit,
      weight: minWeight != null && maxWeight != null ? (minWeight + maxWeight) / 2 : weightInput(r)
    };
  }

  function requirements(r) {
    const type = r.type === 'mg_per_kg_day' ? 'mg_per_kg_per_day' : r.type === 'mg_per_kg_single_dose' ? 'mg_per_kg_per_dose' : r.type;
    const hasSchedule = Array.isArray(r.schedule) && r.schedule.length > 0;
    return {
      age: r.requiresAge ?? (hasSchedule || ['age_based','label_age_based','label_weight_age_based'].includes(type) || ['minAgeWeeks','maxAgeWeeks','minAgeMonths','maxAgeMonths','minAgeYears','maxAgeYears'].some(k => r[k] != null)),
      weight: r.requiresWeight ?? (hasSchedule && r.schedule.some(s => s.doseMgPerKg != null || s.doseMgPerKgPerDose != null) || ['mg_per_kg_per_day','mg_per_kg_per_dose','weight_based','label_weight_age_based'].includes(type))
    };
  }

  function formulationLabel(formulation, index) {
    return formulation?.id != null ? String(formulation.id) : `formulation-${index + 1}`;
  }

  function run() {
    const db = global.window.DoseCareV2Database;
    const engine = global.window.DoseCareV2DosingEngine || global.window.DoseCareDosingEngine;
    const results = [];
    if (!db || !engine) return { passed: false, results: [{ passed: false, name: 'Arithmetic audit initialization', error: 'Database or dosing engine is unavailable.' }] };

    for (const medicine of db.getAll()) {
      for (const regimen of medicine.regimens || []) {
        const req = requirements(regimen);
        const input = representativeInputs(regimen);
        const forms = formulationsFor(medicine, regimen);

        forms.forEach((formulation, formulationIndex) => {
          const concentration = mgPerMl(formulation);
          const name = `${medicine.id}/${regimen.id}/${formulationLabel(formulation, formulationIndex)}`;
          if (!(concentration > 0)) {
            results.push({ passed: false, name, error: 'Invalid formulation concentration.' });
            return;
          }

          const result = engine.calculate({
            medicine,
            regimen,
            formulation,
            age: req.age ? input.age : undefined,
            ageUnit: req.age ? input.ageUnit : undefined,
            weight: req.weight ? input.weight : undefined
          });
          if (!result || !result.ok) {
            results.push({ passed: false, name, error: result?.error || result?.code || 'Calculation failed.' });
            return;
          }

          const failures = [];
          if (num(result.lowMl) !== null && num(result.lowMg) !== null && !close(result.lowMl * concentration, result.lowMg)) {
            failures.push(`Low dose mismatch: ${result.lowMl} mL × ${concentration} mg/mL != ${result.lowMg} mg.`);
          }
          if (num(result.highMl) !== null && num(result.highMg) !== null && !close(result.highMl * concentration, result.highMg)) {
            failures.push(`High dose mismatch: ${result.highMl} mL × ${concentration} mg/mL != ${result.highMg} mg.`);
          }

          if (regimen.type === 'mg_per_kg_per_day' && num(result.frequency) > 0 && num(result.dailyLowMg) !== null && num(result.lowMg) !== null) {
            if (!close(result.lowMg * result.frequency, result.dailyLowMg)) failures.push('Per-dose result does not reconcile with daily dose and frequency.');
          }
          if (regimen.type === 'mg_per_kg_per_dose' && num(result.frequency) > 0 && num(result.dailyLowMg) !== null && num(result.lowMg) !== null) {
            if (!close(result.lowMg * result.frequency, result.dailyLowMg)) failures.push('Daily result does not reconcile with per-dose result and frequency.');
          }
          if (regimen.type === 'label_age_based') {
            if (!close(result.lowMl * concentration, Number(regimen.doseMin))) failures.push('Label minimum dose does not match configured volume and concentration.');
            if (!close(result.highMl * concentration, Number(regimen.doseMax))) failures.push('Label maximum dose does not match configured volume and concentration.');
          }

          if (failures.length) results.push({ passed: false, name, error: failures.join(' ') });
          else results.push({ passed: true, name, error: null });
        });
      }
    }
    return { passed: results.every(r => r.passed), results };
  }

  global.window.DoseCareArithmeticIntegrityTests = { run };
})(typeof globalThis !== 'undefined' ? globalThis : this);
