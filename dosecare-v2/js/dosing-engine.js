/* DoseCare V2 — deterministic dose calculations. Medical data stays in data files. */
(function (global) {
  'use strict';
  function fail(error, code = 'CALCULATION_ERROR') { return { ok: false, error, code }; }
  function num(value) { const n = Number(value); return Number.isFinite(n) ? n : null; }
  function kgToLb(kg) { return kg * 2.2046226218; }
  function ageMonths(value, unit) { const n = num(value); if (n === null || n < 0) return null; if (unit === 'weeks') return n / 4.34524; if (unit === 'years') return n * 12; return n; }
  function ageWeeks(value, unit) { const n = num(value); if (n === null || n < 0) return null; if (unit === 'weeks') return n; if (unit === 'months') return n * 4.34524; if (unit === 'years') return n * 52.1429; return null; }
  function ageYears(value, unit) { const m = ageMonths(value, unit); return m === null ? null : m / 12; }
  function concentrationToMgPerMl(formulation) {
    if (!formulation) return null;
    if (num(formulation.mgPerMl) > 0) return num(formulation.mgPerMl);
    if (num(formulation.mgPer5mL) > 0) return num(formulation.mgPer5mL) / 5;
    if (formulation.concentration && num(formulation.concentration.amount) > 0 && num(formulation.concentration.volume) > 0) return num(formulation.concentration.amount) / num(formulation.concentration.volume);
    return null;
  }
  function validateBounds(regimen, weight, age, ageUnit) {
    const w = num(weight), a = num(age), weeks = ageWeeks(a, ageUnit), months = ageMonths(a, ageUnit), years = ageYears(a, ageUnit);
    if (regimen.minAgeWeeks !== undefined && (weeks === null || weeks < Number(regimen.minAgeWeeks))) return fail(weeks === null ? 'A valid age is required for this regimen.' : `This regimen is not configured for children younger than ${regimen.minAgeWeeks} weeks.`, weeks === null ? 'INVALID_AGE' : 'AGE_BELOW_REGIMEN_MIN');
    if (regimen.maxAgeWeeks !== undefined && (weeks === null || weeks > Number(regimen.maxAgeWeeks))) return fail(weeks === null ? 'A valid age is required for this regimen.' : `This regimen is not configured for children older than ${regimen.maxAgeWeeks} weeks.`, weeks === null ? 'INVALID_AGE' : 'AGE_ABOVE_REGIMEN_MAX');
    if (regimen.minAgeMonths !== undefined && (months === null || months < Number(regimen.minAgeMonths))) return fail(months === null ? 'A valid age is required for this regimen.' : `This regimen is not configured for children younger than ${regimen.minAgeMonths} months.`, months === null ? 'INVALID_AGE' : 'AGE_BELOW_REGIMEN_MIN');
    if (regimen.maxAgeMonths !== undefined && (months === null || months > Number(regimen.maxAgeMonths))) return fail(months === null ? 'A valid age is required for this regimen.' : `This regimen is not configured for children older than ${regimen.maxAgeMonths} months.`, months === null ? 'INVALID_AGE' : 'AGE_ABOVE_REGIMEN_MAX');
    if (regimen.minAgeYears !== undefined && (years === null || years < Number(regimen.minAgeYears))) return fail(years === null ? 'A valid age is required for this regimen.' : `This regimen is not configured for children younger than ${regimen.minAgeYears} years.`, years === null ? 'INVALID_AGE' : 'AGE_BELOW_REGIMEN_MIN');
    if (regimen.maxAgeYears !== undefined && (years === null || years > Number(regimen.maxAgeYears))) return fail(years === null ? 'A valid age is required for this regimen.' : `This regimen is not configured for children older than ${regimen.maxAgeYears} years.`, years === null ? 'INVALID_AGE' : 'AGE_ABOVE_REGIMEN_MAX');
    if (regimen.maxWeightKg !== undefined && w !== null && w > Number(regimen.maxWeightKg)) return fail('This pediatric regimen is limited to the configured weight range; verify the product label or use the appropriate regimen.', 'WEIGHT_ABOVE_REGIMEN_MAX');
    if (regimen.minWeightKg !== undefined && w !== null && w < Number(regimen.minWeightKg)) return fail('This regimen is not configured for the entered weight.', 'WEIGHT_BELOW_REGIMEN_MIN');
    return null;
  }
  function calculateLabelAgeBased({ medicine, regimen, weight, age, ageUnit, formulation }) {
    const a = num(age); if (a === null || a < 0 || !['months', 'years', 'weeks'].includes(ageUnit)) return fail('Enter a valid child age.', 'INVALID_AGE');
    const boundError = validateBounds(regimen, num(weight), a, ageUnit); if (boundError) return boundError;
    const doseMin = num(regimen.doseMin), doseMax = num(regimen.doseMax), volumeMin = num(regimen.volumeMin), volumeMax = num(regimen.volumeMax);
    if (doseMin === null || doseMax === null || volumeMin === null || volumeMax === null || doseMin < 0 || doseMax < doseMin || volumeMin < 0 || volumeMax < volumeMin) return fail('The configured labeled dose cannot be calculated safely.', 'INVALID_DOSE');
    const mgPerMl = concentrationToMgPerMl(formulation); if (!mgPerMl || mgPerMl <= 0) return fail('The selected oral-liquid concentration is not configured safely.', 'INVALID_CONCENTRATION');
    if (Math.abs(volumeMin * mgPerMl - doseMin) > 0.01 || Math.abs(volumeMax * mgPerMl - doseMax) > 0.01) return fail('The configured dose and oral-liquid concentration do not match safely.', 'DOSE_CONCENTRATION_MISMATCH');
    const maxDosesPer24h = num(regimen.maxDosesPer24h);
    return { ok: true, medicineId: medicine.id, regimen, weight: num(weight), age: a, ageUnit, frequencyText: regimen.frequencyText || null, frequency: null, lowMg: doseMin, highMg: doseMax, lowMl: volumeMin, highMl: volumeMax, dailyLowMg: maxDosesPer24h ? doseMin * maxDosesPer24h : null, dailyHighMg: maxDosesPer24h ? doseMax * maxDosesPer24h : null, mgPerMl, maximumDosesPer24Hours: maxDosesPer24h, maximumApplied: null, calculationType: 'label_age_based', concentrationText: formulation?.display || null };
  }
  function calculateLabelWeightAge({ medicine, regimen, weight, age, ageUnit, formulation }) {
    const w = num(weight), a = num(age), years = ageYears(a, ageUnit), hasWeight = w !== null && w > 0, hasAge = years !== null && years >= 0;
    if (!hasWeight && !hasAge) return fail('Enter a valid child weight or age.', 'MISSING_AGE_OR_WEIGHT');
    const boundError = validateBounds(regimen, w, a, ageUnit); if (boundError) return boundError;
    const lb = hasWeight ? kgToLb(w) : null; if (!Array.isArray(regimen.table)) return fail('The labeled dose table is not configured correctly.', 'INVALID_DOSE_TABLE');
    const row = regimen.table.find(item => (!hasWeight || (lb >= Number(item.minLb) && lb <= Number(item.maxLb))) && (!hasAge || (years >= Number(item.minAgeYears) && years <= Number(item.maxAgeYears))));
    if (!row) return fail(regimen.noMatchingBandMessage || 'The entered age and/or weight do not match a configured labeled dose band. Verify the product label or consult a clinician.', 'NO_MATCHING_BAND');
    const mgPerMl = concentrationToMgPerMl(formulation); if (!mgPerMl) return fail('The selected oral-liquid concentration is not configured safely.', 'INVALID_CONCENTRATION');
    const lowMl = num(row.doseMl); if (lowMl === null || lowMl < 0) return fail('The configured labeled liquid dose is invalid.', 'INVALID_DOSE');
    const lowMg = lowMl * mgPerMl;
    return { ok: true, medicineId: medicine.id, regimen, weight: hasWeight ? w : null, weightLb: lb, age: hasAge ? a : null, ageUnit: hasAge ? ageUnit : null, frequencyText: regimen.frequencyText, frequency: null, lowMg, highMg: lowMg, lowMl, highMl: lowMl, dailyLowMg: null, dailyHighMg: null, mgPerMl, maximumDosesPer24Hours: regimen.maximumDosesPer24Hours, maximumApplied: null, calculationType: 'label_weight_age_based', concentrationText: formulation?.display || null };
  }
  function calculateScheduled({ medicine, regimen, weight, age, ageUnit, formulation }) {
    const w = num(weight); if (w === null || w <= 0) return fail('Enter a valid child weight in kg.', 'INVALID_WEIGHT');
    const boundError = validateBounds(regimen, w, age, ageUnit); if (boundError) return boundError;
    const mgPerMl = concentrationToMgPerMl(formulation); if (!mgPerMl) return fail('The selected oral-liquid concentration is not configured safely.', 'INVALID_CONCENTRATION');
    const frequency = num(regimen.frequency ?? regimen.dosesPerDay ?? regimen.frequencyPerDay ?? 1);
    const schedule = (regimen.schedule || []).map((step, index) => { const dose = num(step.doseMgPerKg ?? step.doseMgPerKgPerDose); if (dose === null || dose < 0) return null; const max = num(step.maxDoseMg); const mg = Math.min(w * dose, max !== null ? max : Infinity); return { index: index + 1, dayRange: step.dayRange || `Step ${index + 1}`, doseMgPerKg: dose, doseMg: mg, doseMl: mg / mgPerMl, maxDoseMg: max }; }).filter(Boolean);
    if (!schedule.length) return fail('The scheduled regimen has no valid dose steps.', 'INVALID_SCHEDULE');
    return { ok: true, medicineId: medicine.id, regimen, weight: w, age: num(age), ageUnit, frequencyText: regimen.frequencyText, frequency, lowMg: schedule[0].doseMg, highMg: schedule[0].doseMg, lowMl: schedule[0].doseMl, highMl: schedule[0].doseMl, dailyLowMg: schedule[0].doseMg * frequency, dailyHighMg: schedule[0].doseMg * frequency, mgPerMl, maximumApplied: null, calculationType: 'scheduled_weight_based', concentrationText: formulation?.display || null, schedule };
  }
  function calculate({ medicine, regimen, age, ageUnit, weight, formulation }) {
    if (!medicine || !regimen) return fail('A medicine and a valid regimen are required.', 'MISSING_REGIMEN');
    if (regimen.type === 'label_age_based') return calculateLabelAgeBased({ medicine, regimen, weight, age, ageUnit, formulation });
    if (regimen.type === 'label_weight_age_based') return calculateLabelWeightAge({ medicine, regimen, weight, age, ageUnit, formulation });
    if (regimen.type === 'condition_based' && Array.isArray(regimen.schedule)) return calculateScheduled({ medicine, regimen, weight, age, ageUnit, formulation });
    const normalizedType = regimen.type === 'mg_per_kg_day' ? 'mg_per_kg_per_day' : regimen.type === 'mg_per_kg_single_dose' ? 'mg_per_kg_per_dose' : regimen.type;
    const needsWeight = regimen.requiresWeight ?? ['mg_per_kg_per_day', 'mg_per_kg_per_dose', 'weight_based'].includes(normalizedType);
    const needsAge = regimen.requiresAge ?? ['age_based'].includes(normalizedType);
    const w = num(weight), a = num(age);
    if (needsWeight && (w === null || w <= 0)) return fail('Enter a valid child weight in kg.', 'INVALID_WEIGHT');
    if (needsAge && (a === null || a < 0 || !['months', 'years', 'weeks'].includes(ageUnit))) return fail('Enter a valid child age.', 'INVALID_AGE');
    const boundError = validateBounds(regimen, w, a, ageUnit); if (boundError) return boundError;
    const min = num(regimen.minDose ?? regimen.dose ?? regimen.doseMgPerKg ?? regimen.doseMgPerKgPerDay);
    const max = num(regimen.maxDose ?? regimen.dose ?? regimen.doseMgPerKg ?? regimen.doseMgPerKgPerDay);
    if (min === null || max === null || min < 0 || max < min) return fail('The configured dose cannot be calculated safely.', 'INVALID_DOSE');
    const frequency = num(regimen.frequency ?? regimen.dosesPerDay ?? regimen.frequencyPerDay ?? 1);
    if (['mg_per_kg_per_day', 'mg_per_kg_per_dose'].includes(normalizedType) && (!frequency || frequency <= 0)) return fail('The regimen frequency is missing or invalid.', 'INVALID_FREQUENCY');
    let lowMg, highMg, dailyLowMg = null, dailyHighMg = null;
    if (normalizedType === 'mg_per_kg_per_day') { dailyLowMg = w * min; dailyHighMg = w * max; lowMg = dailyLowMg / frequency; highMg = dailyHighMg / frequency; }
    else if (normalizedType === 'mg_per_kg_per_dose') { lowMg = w * min; highMg = w * max; dailyLowMg = lowMg * frequency; dailyHighMg = highMg * frequency; }
    else if (['fixed_dose', 'age_based'].includes(normalizedType)) { lowMg = min; highMg = max; if (frequency) { dailyLowMg = lowMg * frequency; dailyHighMg = highMg * frequency; } }
    else return fail(`Unsupported dosing type: ${regimen.type || 'unknown'}.`, 'UNSUPPORTED_DOSING_TYPE');
    const maximumDaily = num(regimen.maximumDailyDose ?? regimen.maxDailyDoseMg ?? regimen.maxDailyDose ?? medicine.maximumDailyDose);
    const maximumPerAdministration = num(regimen.maximumDosePerAdministration ?? regimen.maxDoseMgPerAdministration ?? regimen.maxDosePerAdministration ?? regimen.maximumDose ?? regimen.maxDoseMg);
    let maximumApplied = null;
    if (maximumDaily !== null && dailyHighMg !== null && dailyHighMg > maximumDaily && frequency) { const cappedLowDaily = Math.min(dailyLowMg, maximumDaily), cappedHighDaily = Math.min(dailyHighMg, maximumDaily); lowMg = cappedLowDaily / frequency; highMg = cappedHighDaily / frequency; dailyLowMg = cappedLowDaily; dailyHighMg = cappedHighDaily; maximumApplied = maximumDaily; }
    if (maximumPerAdministration !== null && highMg > maximumPerAdministration) { highMg = maximumPerAdministration; if (lowMg > maximumPerAdministration) lowMg = maximumPerAdministration; if (frequency) { dailyLowMg = lowMg * frequency; dailyHighMg = highMg * frequency; } maximumApplied = maximumApplied ?? maximumPerAdministration; }
    const mgPerMl = concentrationToMgPerMl(formulation), lowMl = mgPerMl ? lowMg / mgPerMl : null, highMl = mgPerMl ? highMg / mgPerMl : null;
    const alternativeFrequency = num(regimen.alternativeFrequency ?? regimen.alternativeDosesPerDay);
    const alternativeLowMg = alternativeFrequency && ['mg_per_kg_per_day', 'fixed_dose', 'age_based'].includes(normalizedType) && dailyLowMg !== null ? dailyLowMg / alternativeFrequency : null;
    const alternativeHighMg = alternativeFrequency && ['mg_per_kg_per_day', 'fixed_dose', 'age_based'].includes(normalizedType) && dailyHighMg !== null ? dailyHighMg / alternativeFrequency : null;
    const alternativeLowMl = mgPerMl && alternativeLowMg !== null ? alternativeLowMg / mgPerMl : null;
    const alternativeHighMl = mgPerMl && alternativeHighMg !== null ? alternativeHighMg / mgPerMl : null;
    return { ok: true, medicineId: medicine.id, regimen, weight: w, age: a, ageUnit, frequency, alternativeFrequency: alternativeFrequency || null, lowMg, highMg, dailyLowMg, dailyHighMg, lowMl, highMl, alternativeLowMg, alternativeHighMg, alternativeLowMl, alternativeHighMl, minimumRecommendedDoseMgPerAdministration: num(regimen.minimumRecommendedDoseMgPerAdministration), mgPerMl, maximumApplied, calculationType: normalizedType, concentrationText: formulation?.display || null };
  }
  global.DoseCareDosingEngine = { calculate };
})(window);
