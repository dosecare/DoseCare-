/* DoseCare V2 — deterministic dose calculations. Medical data stays in data files. */
(function (global) {
  'use strict';

  function fail(error, code = 'CALCULATION_ERROR') {
    return { ok: false, error, code };
  }

  function num(value) {
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }

  function kgToLb(kg) {
    return kg * 2.2046226218;
  }

  function ageMonths(value, unit) {
    const n = num(value);

    if (n === null || n < 0) return null;
    if (unit === 'weeks') return n / 4.34524;
    if (unit === 'years') return n * 12;

    return n;
  }

  function ageWeeks(value, unit) {
    const n = num(value);

    if (n === null || n < 0) return null;
    if (unit === 'weeks') return n;
    if (unit === 'months') return n * 4.34524;
    if (unit === 'years') return n * 52.1429;

    return null;
  }

  function ageYears(value, unit) {
    const m = ageMonths(value, unit);
    return m === null ? null : m / 12;
  }

  function concentrationToMgPerMl(formulation) {
    if (!formulation) return null;

    if (num(formulation.mgPerMl) > 0) {
      return num(formulation.mgPerMl);
    }

    if (num(formulation.mgPer5mL) > 0) {
      return num(formulation.mgPer5mL) / 5;
    }

    if (
      formulation.concentration &&
      num(formulation.concentration.amount) > 0 &&
      num(formulation.concentration.volume) > 0
    ) {
      return (
        num(formulation.concentration.amount) /
        num(formulation.concentration.volume)
      );
    }

    return null;
  }

  function validateBounds(regimen, weight, age, ageUnit) {
    const w = num(weight);
    const a = num(age);
    const weeks = ageWeeks(a, ageUnit);
    const months = ageMonths(a, ageUnit);
    const years = ageYears(a, ageUnit);

    if (regimen.minAgeWeeks !== undefined) {
      if (weeks === null) {
        return fail(
          'A valid age is required for this regimen.',
          'INVALID_AGE'
        );
      }

      if (weeks < Number(regimen.minAgeWeeks)) {
        return fail(
          `This regimen is not configured for children younger than ${regimen.minAgeWeeks} weeks.`,
          'AGE_BELOW_REGIMEN_MIN'
        );
      }
    }

    if (regimen.maxAgeWeeks !== undefined) {
      if (weeks === null) {
        return fail(
          'A valid age is required for this regimen.',
          'INVALID_AGE'
        );
      }

      if (weeks > Number(regimen.maxAgeWeeks)) {
        return fail(
          `This regimen is not configured for children older than ${regimen.maxAgeWeeks} weeks.`,
          'AGE_ABOVE_REGIMEN_MAX'
        );
      }
    }

    if (regimen.minAgeMonths !== undefined) {
      if (months === null) {
        return fail(
          'A valid age is required for this regimen.',
          'INVALID_AGE'
        );
      }

      if (months < Number(regimen.minAgeMonths)) {
        return fail(
          `This regimen is not configured for children younger than ${regimen.minAgeMonths} months.`,
          'AGE_BELOW_REGIMEN_MIN'
        );
      }
    }

    if (regimen.maxAgeMonths !== undefined) {
      if (months === null) {
        return fail(
          'A valid age is required for this regimen.',
          'INVALID_AGE'
        );
      }

      if (months > Number(regimen.maxAgeMonths)) {
        return fail(
          `This regimen is not configured for children older than ${regimen.maxAgeMonths} months.`,
          'AGE_ABOVE_REGIMEN_MAX'
        );
      }
    }

    /*
     * Age bounds expressed directly in years.
     * Used by age-based labeled regimens such as Diphenhydramine.
     */
    if (regimen.minAgeYears !== undefined) {
      if (years === null) {
        return fail(
          'A valid age is required for this regimen.',
          'INVALID_AGE'
        );
      }

      if (years < Number(regimen.minAgeYears)) {
        return fail(
          `This regimen is not configured for children younger than ${regimen.minAgeYears} years.`,
          'AGE_BELOW_REGIMEN_MIN'
        );
      }
    }

    if (regimen.maxAgeYears !== undefined) {
      if (years === null) {
        return fail(
          'A valid age is required for this regimen.',
          'INVALID_AGE'
        );
      }

      if (years > Number(regimen.maxAgeYears)) {
        return fail(
          `This regimen is not configured for children older than ${regimen.maxAgeYears} years.`,
          'AGE_ABOVE_REGIMEN_MAX'
        );
      }
    }

    if (
      regimen.maxWeightKg !== undefined &&
      w !== null &&
      w > Number(regimen.maxWeightKg)
    ) {
      return fail(
        'This pediatric regimen is limited to the configured weight range; verify the product label or use the appropriate regimen.',
        'WEIGHT_ABOVE_REGIMEN_MAX'
      );
    }

    if (
      regimen.minWeightKg !== undefined &&
      w !== null &&
      w < Number(regimen.minWeightKg)
    ) {
      return fail(
        'This regimen is not configured for the entered weight.',
        'WEIGHT_BELOW_REGIMEN_MIN'
      );
    }

    return null;
  }

  /*
   * Labeled age-based liquid dosing.
   *
   * Example:
   * doseMin: 12.5 mg
   * doseMax: 25 mg
   * volumeMin: 5 mL
   * volumeMax: 10 mL
   *
   * The labeled mL dose is preserved and the corresponding mg
   * is verified against the selected oral-liquid concentration.
   */
  function calculateLabelAgeBased({
    medicine,
    regimen,
    weight,
    age,
    ageUnit,
    formulation
  }) {
    const a = num(age);

    if (
      a === null ||
      a < 0 ||
      !['months', 'years', 'weeks'].includes(ageUnit)
    ) {
      return fail(
        'Enter a valid child age.',
        'INVALID_AGE'
      );
    }

    const boundError = validateBounds(
      regimen,
      num(weight),
      a,
      ageUnit
    );

    if (boundError) return boundError;

    const doseMin = num(regimen.doseMin);
    const doseMax = num(regimen.doseMax);
    const volumeMin = num(regimen.volumeMin);
    const volumeMax = num(regimen.volumeMax);

    if (
      doseMin === null ||
      doseMax === null ||
      volumeMin === null ||
      volumeMax === null ||
      doseMin < 0 ||
      doseMax < doseMin ||
      volumeMin < 0 ||
      volumeMax < volumeMin
    ) {
      return fail(
        'The configured labeled dose cannot be calculated safely.',
        'INVALID_DOSE'
      );
    }

    const mgPerMl = concentrationToMgPerMl(formulation);

    if (!mgPerMl || mgPerMl <= 0) {
      return fail(
        'The selected oral-liquid concentration is not configured safely.',
        'INVALID_CONCENTRATION'
      );
    }

    /*
     * Verify that the configured volume corresponds to the
     * configured mg dose at the selected concentration.
     *
     * This prevents silently accepting mismatched medicine data.
     */
    const calculatedDoseMinMg = volumeMin * mgPerMl;
    const calculatedDoseMaxMg = volumeMax * mgPerMl;

    const tolerance = 0.01;

    if (
      Math.abs(calculatedDoseMinMg - doseMin) > tolerance ||
      Math.abs(calculatedDoseMaxMg - doseMax) > tolerance
    ) {
      return fail(
        'The configured dose and oral-liquid concentration do not match safely.',
        'DOSE_CONCENTRATION_MISMATCH'
      );
    }

    const maxDosesPer24h = num(regimen.maxDosesPer24h);

    return {
      ok: true,
      medicineId: medicine.id,
      regimen,

      weight: num(weight),
      age: a,
      ageUnit,

      frequencyText: regimen.frequencyText || null,
      frequency: null,

      lowMg: doseMin,
      highMg: doseMax,

      lowMl: volumeMin,
      highMl: volumeMax,

      dailyLowMg: maxDosesPer24h
        ? doseMin * maxDosesPer24h
        : null,

      dailyHighMg: maxDosesPer24h
        ? doseMax * maxDosesPer24h
        : null,

      mgPerMl,

      maximumDosesPer24Hours: maxDosesPer24h,
      maximumApplied: null,

      calculationType: 'label_age_based',

      concentrationText: formulation?.display || null
    };
  }

  /*
   * Labeled weight + age based dosing.
   * Existing DoseCare V2 behavior preserved.
   */
  function calculateLabelWeightAge({
    medicine,
    regimen,
    weight,
    age,
    ageUnit,
    formulation
  }) {
    const w = num(weight);
    const a = num(age);

    const years = ageYears(a, ageUnit);

    const hasWeight = w !== null && w > 0;
    const hasAge = years !== null && years >= 0;

    if (!hasWeight && !hasAge) {
      return fail(
        'Enter a valid child weight or age.',
        'MISSING_AGE_OR_WEIGHT'
      );
    }

    const boundError = validateBounds(
      regimen,
      w,
      a,
      ageUnit
    );

    if (boundError) return boundError;

    const lb = hasWeight ? kgToLb(w) : null;

    if (!Array.isArray(regimen.table)) {
      return fail(
        'The labeled dose table is not configured correctly.',
        'INVALID_DOSE_TABLE'
      );
    }

    const row = regimen.table.find(item => {
      const weightMatch =
        !hasWeight ||
        (
          lb >= Number(item.minLb) &&
          lb <= Number(item.maxLb)
        );

      const ageMatch =
        !hasAge ||
        (
          years >= Number(item.minAgeYears) &&
          years <= Number(item.maxAgeYears)
        );

      return weightMatch && ageMatch;
    });

    if (!row) {
      return fail(
        regimen.noMatchingBandMessage ||
          'The entered age and/or weight do not match a configured labeled dose band. Verify the product label or consult a clinician.',
        'NO_MATCHING_BAND'
      );
    }

    const mgPerMl =
      concentrationToMgPerMl(formulation);

    if (!mgPerMl) {
      return fail(
        'The selected oral-liquid concentration is not configured safely.',
        'INVALID_CONCENTRATION'
      );
    }

    const lowMl = num(row.doseMl);

    if (lowMl === null || lowMl < 0) {
      return fail(
        'The configured labeled liquid dose is invalid.',
        'INVALID_DOSE'
      );
    }

    const lowMg = lowMl * mgPerMl;

    return {
      ok: true,
      medicineId: medicine.id,
      regimen,

      weight: hasWeight ? w : null,
      weightLb: lb,

      age: hasAge ? a : null,
      ageUnit: hasAge ? ageUnit : null,

      frequencyText: regimen.frequencyText,
      frequency: null,

      lowMg,
      highMg: lowMg,

      lowMl,
      highMl: lowMl,

      dailyLowMg: null,
      dailyHighMg: null,

      mgPerMl,

      maximumDosesPer24Hours:
        regimen.maximumDosesPer24Hours,

      maximumApplied: null,

      calculationType:
        'label_weight_age_based',

      concentrationText:
        formulation?.display || null
    };
  }

  /*
   * Scheduled condition-based weight dosing.
   */
  function calculateScheduled({
    medicine,
    regimen,
    weight,
    age,
    ageUnit,
    formulation
  }) {
    const w = num(weight);

    if (w === null || w <= 0) {
      return fail(
        'Enter a valid child weight in kg.',
        'INVALID_WEIGHT'
      );
    }

    const boundError = validateBounds(
      regimen,
      w,
      age,
      ageUnit
    );

    if (boundError) return boundError;

    const mgPerMl =
      concentrationToMgPerMl(formulation);

    if (!mgPerMl) {
      return fail(
        'The selected oral-liquid concentration is not configured safely.',
        'INVALID_CONCENTRATION'
      );
    }

    const schedule = (regimen.schedule || [])
      .map((step, index) => {
        const dose = num(
          step.doseMgPerKg ??
          step.doseMgPerKgPerDose
        );

        if (dose === null || dose < 0) {
          return null;
        }

        const max = num(step.maxDoseMg);

        const mg = Math.min(
          w * dose,
          max !== null ? max : Infinity
        );

        return {
          index: index + 1,
          dayRange:
            step.dayRange ||
            `Step ${index + 1}`,

          doseMgPerKg: dose,
          doseMg: mg,
          doseMl: mg / mgPerMl,

          maxDoseMg: max
        };
      })
      .filter(Boolean);

    if (!schedule.length) {
      return fail(
        'The scheduled regimen has no valid dose steps.',
        'INVALID_SCHEDULE'
      );
    }

    return {
      ok: true,
      medicineId: medicine.id,
      regimen,

      weight: w,

      age: num(age),
      ageUnit,

      frequencyText:
        regimen.frequencyText,

      frequency: 1,

      lowMg: schedule[0].doseMg,
      highMg: schedule[0].doseMg,

      lowMl: schedule[0].doseMl,
      highMl: schedule[0].doseMl,

      dailyLowMg:
        schedule[0].doseMg,

      dailyHighMg:
        schedule[0].doseMg,

      mgPerMl,

      maximumApplied: null,

      calculationType:
        'scheduled_weight_based',

      concentrationText:
        formulation?.display || null,

      schedule
    };
  }

  function calculate({
    medicine,
    regimen,
    age,
    ageUnit,
    weight,
    formulation
  }) {
    if (!medicine || !regimen) {
      return fail(
        'A medicine and a valid regimen are required.',
        'MISSING_REGIMEN'
      );
    }

    /*
     * Dedicated path for age-based labeled liquid doses.
     *
     * This must run before the generic mg/kg/fixed-dose logic
     * because these regimens use doseMin/doseMax and
     * volumeMin/volumeMax.
     */
    if (regimen.type === 'label_age_based') {
      return calculateLabelAgeBased({
        medicine,
        regimen,
        weight,
        age,
        ageUnit,
        formulation
      });
    }

    if (
      regimen.type === 'label_weight_age_based'
    ) {
      return calculateLabelWeightAge({
        medicine,
        regimen,
        weight,
        age,
        ageUnit,
        formulation
      });
    }

    if (
      regimen.type === 'condition_based' &&
      Array.isArray(regimen.schedule)
    ) {
      return calculateScheduled({
        medicine,
        regimen,
        weight,
        age,
        ageUnit,
        formulation
      });
    }

    /*
     * Normalize legacy DoseCare V2 dosing type names.
     */
    const normalizedType =
      regimen.type === 'mg_per_kg_day'
        ? 'mg_per_kg_per_day'
        : regimen.type === 'mg_per_kg_single_dose'
          ? 'mg_per_kg_per_dose'
          : regimen.type;

    const needsWeight =
      regimen.requiresWeight ??
      [
        'mg_per_kg_per_day',
        'mg_per_kg_per_dose',
        'weight_based'
      ].includes(normalizedType);

    const needsAge =
      regimen.requiresAge ??
      [
        'age_based'
      ].includes(normalizedType);

    const w = num(weight);
    const a = num(age);

    if (needsWeight && (w === null || w <= 0)) {
      return fail(
        'Enter a valid child weight in kg.',
        'INVALID_WEIGHT'
      );
    }

    if (
      needsAge &&
      (
        a === null ||
        a < 0 ||
        !['months', 'years', 'weeks'].includes(ageUnit)
      )
    ) {
      return fail(
        'Enter a valid child age.',
        'INVALID_AGE'
      );
    }

    const boundError = validateBounds(
      regimen,
      w,
      a,
      ageUnit
    );

    if (boundError) return boundError;

    const min = num(
      regimen.minDose ??
      regimen.dose ??
      regimen.doseMgPerKg ??
      regimen.doseMgPerKgPerDay
    );

    const max = num(
      regimen.maxDose ??
      regimen.dose ??
      regimen.doseMgPerKg ??
      regimen.doseMgPerKgPerDay
    );

    if (
      min === null ||
      max === null ||
      min < 0 ||
      max < min
    ) {
      return fail(
        'The configured dose cannot be calculated safely.',
        'INVALID_DOSE'
      );
    }

    const frequency = num(
      regimen.frequency ??
      (
        normalizedType ===
        'mg_per_kg_per_dose'
          ? 1
          : 1
      )
    );

    if (
      [
        'mg_per_kg_per_day',
        'mg_per_kg_per_dose'
      ].includes(normalizedType) &&
      (!frequency || frequency <= 0)
    ) {
      return fail(
        'The regimen frequency is missing or invalid.',
        'INVALID_FREQUENCY'
      );
    }

    let lowMg;
    let highMg;

    let dailyLowMg = null;
    let dailyHighMg = null;

    if (
      normalizedType ===
      'mg_per_kg_per_day'
    ) {
      dailyLowMg = w * min;
      dailyHighMg = w * max;

      lowMg =
        dailyLowMg / frequency;

      highMg =
        dailyHighMg / frequency;

    } else if (
      normalizedType ===
      'mg_per_kg_per_dose'
    ) {
      lowMg = w * min;
      highMg = w * max;

      dailyLowMg =
        lowMg * frequency;

      dailyHighMg =
        highMg * frequency;

    } else if (
      [
        'fixed_dose',
        'age_based'
      ].includes(normalizedType)
    ) {
      lowMg = min;
      highMg = max;

      if (frequency) {
        dailyLowMg =
          lowMg * frequency;

        dailyHighMg =
          highMg * frequency;
      }

    } else {
      return fail(
        `Unsupported dosing type: ${regimen.type || 'unknown'}.`,
        'UNSUPPORTED_DOSING_TYPE'
      );
    }

    /*
     * Apply configured maximum daily dose.
     */
    const maximumDaily = num(
      regimen.maximumDailyDose ??
      medicine.maximumDailyDose
    );

    let maximumApplied = null;

    if (
      maximumDaily !== null &&
      dailyHighMg !== null &&
      dailyHighMg > maximumDaily &&
      frequency
    ) {
      lowMg =
        Math.min(
          dailyLowMg,
          maximumDaily
        ) / frequency;

      highMg =
        Math.min(
          dailyHighMg,
          maximumDaily
        ) / frequency;

      maximumApplied =
        maximumDaily;
    }

    const mgPerMl =
      concentrationToMgPerMl(formulation);

    const lowMl =
      mgPerMl
        ? lowMg / mgPerMl
        : null;

    const highMl =
      mgPerMl
        ? highMg / mgPerMl
        : null;

    return {
      ok: true,

      medicineId: medicine.id,
      regimen,

      weight: w,
      age: a,
      ageUnit,

      frequency,

      lowMg,
      highMg,

      dailyLowMg,
      dailyHighMg,

      lowMl,
      highMl,

      mgPerMl,

      maximumApplied,

      calculationType:
        normalizedType,

      concentrationText:
        formulation?.display || null
    };
  }

  global.DoseCareDosingEngine = {
    calculate
  };

})(window);
