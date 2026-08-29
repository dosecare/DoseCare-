/* DoseCare V2 — medicine data validator
   Structural validation only. This does NOT validate clinical dosing against a source.
*/
(function (global) {
  'use strict';

  const SUPPORTED_TYPES = new Set(['mg_per_kg_per_dose', 'mg_per_kg_per_day']);

  function validateMedicine(medicine) {
    const errors = [];
    if (!medicine?.id) errors.push('Missing medicine id.');
    if (!medicine?.calculatorReady) errors.push('Medicine is not marked calculator-ready.');
    if (!medicine?.oralLiquid) errors.push('Medicine is outside the oral-liquid scope.');
    if (!Array.isArray(medicine?.regimens) || !medicine.regimens.length) {
      errors.push('No dosing regimen is configured.');
      return errors;
    }

    medicine.regimens.forEach((regimen, index) => {
      const type = regimen?.type || regimen?.dosingType;
      if (!SUPPORTED_TYPES.has(type)) {
        errors.push(`Regimen ${index + 1}: unsupported dosing type '${type || 'missing'}'.`);
      }
      const min = Number(regimen?.minDose ?? regimen?.dose ?? regimen?.value);
      const max = Number(regimen?.maxDose ?? min);
      if (!Number.isFinite(min) || !Number.isFinite(max) || min < 0 || max < min) {
        errors.push(`Regimen ${index + 1}: invalid dose range.`);
      }
      if (type === 'mg_per_kg_per_day') {
        const frequency = Number(regimen?.frequency ?? regimen?.frequencyPerDay);
        if (!Number.isFinite(frequency) || frequency <= 0) {
          errors.push(`Regimen ${index + 1}: mg/kg/day requires a valid frequency.`);
        }
      }
    });

    return errors;
  }

  function validateAll(medicines) {
    return (Array.isArray(medicines) ? medicines : []).map(medicine => ({
      id: medicine?.id || 'unknown',
      errors: validateMedicine(medicine)
    }));
  }

  global.DoseCareDataValidator = { validateMedicine, validateAll };
})(window);
