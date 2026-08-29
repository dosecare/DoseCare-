/* DoseCare V2 — dosing engine
   Pure calculation layer. It does not read or manipulate the DOM.
*/
(function (global) {
  'use strict';

  const finite = value => Number.isFinite(Number(value));
  const num = value => finite(value) ? Number(value) : null;

  function ageMonths(ageValue, ageUnit) {
    const age = num(ageValue);
    if (age == null || age < 0) return null;
    return ageUnit === 'years' ? age * 12 : age;
  }

  function supportsAge(regimen, months) {
    if (months == null) return true;
    const age = regimen?.age || {};
    const min = num(age.minimumMonths ?? regimen?.minimumAgeMonths);
    const max = num(age.maximumMonths ?? (regimen?.maximumAgeYears != null ? Number(regimen.maximumAgeYears) * 12 : null));
    if (min != null && months < min) return false;
    if (max != null && months > max) return false;
    return true;
  }

  function calculate(options) {
    const regimen = options?.regimen;
    if (!regimen) throw new Error('A dosing regimen is required.');

    const weight = num(options.weight);
    const months = ageMonths(options.ageValue, options.ageUnit);
    const type = regimen.type || regimen.dosingType;
    const minDose = num(regimen.minDose ?? regimen.dose ?? regimen.value);
    const maxDose = num(regimen.maxDose ?? minDose);
    const frequency = num(regimen.frequency ?? regimen.frequencyPerDay);

    if (weight == null || weight <= 0) throw new Error('Enter a valid child weight in kg.');
    if (!supportsAge(regimen, months)) throw new Error('The selected age is outside the configured pediatric range for this regimen.');
    if (minDose == null || maxDose == null) throw new Error('This regimen does not contain a calculable dose.');

    let lowMg;
    let highMg;
    let calculationType;

    if (type === 'mg_per_kg_per_day') {
      if (frequency == null || frequency <= 0) throw new Error('The regimen is missing a valid frequency.');
      lowMg = weight * minDose / frequency;
      highMg = weight * maxDose / frequency;
      calculationType = 'mg_per_kg_per_day';
    } else if (type === 'mg_per_kg_per_dose') {
      lowMg = weight * minDose;
      highMg = weight * maxDose;
      calculationType = 'mg_per_kg_per_dose';
    } else {
      throw new Error(`Unsupported dosing type: ${type || 'not specified'}.`);
    }

    let maximumApplied = null;
    const maxDailyDose = num(regimen.maxDailyDose);
    if (maxDailyDose != null && frequency != null && frequency > 0) {
      const perDoseMaximum = maxDailyDose / frequency;
      if (highMg > perDoseMaximum || lowMg > perDoseMaximum) {
        lowMg = Math.min(lowMg, perDoseMaximum);
        highMg = Math.min(highMg, perDoseMaximum);
        maximumApplied = perDoseMaximum;
      }
    }

    const formulation = options.formulation || null;
    let lowMl = null;
    let highMl = null;
    let concentrationText = '';
    if (formulation) {
      const c = global.DoseCareMedicineAdapter?.concentration(formulation);
      if (c && c.amountMg > 0 && c.volumeMl > 0) {
        lowMl = lowMg * c.volumeMl / c.amountMg;
        highMl = highMg * c.volumeMl / c.amountMg;
        concentrationText = formulation.display || `${c.amountMg} mg/${c.volumeMl} mL`;
      }
    }

    return {
      weight,
      ageValue: num(options.ageValue),
      ageUnit: options.ageUnit || 'months',
      ageMonths: months,
      regimen,
      calculationType,
      frequency,
      lowMg,
      highMg,
      lowMl,
      highMl,
      concentrationText,
      maximumApplied,
      generatedAt: new Date().toISOString()
    };
  }

  global.DoseCareDosingEngine = { calculate, ageMonths, supportsAge };
})(window);
