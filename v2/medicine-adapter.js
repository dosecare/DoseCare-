/* DoseCare V2 — medicine adapter
   Normalizes legacy medicine files for the V2 calculator.
   Scope: pediatric oral liquids only.
*/
(function (global) {
  'use strict';

  const asArray = value => Array.isArray(value) ? value.filter(Boolean) : [];

  function getRegimens(medicine) {
    const dosing = medicine?.dosing || {};
    if (Array.isArray(dosing.regimens)) return dosing.regimens.filter(Boolean);
    if (Array.isArray(dosing.conditionBased)) return dosing.conditionBased.filter(Boolean);
    if (dosing.type) return [dosing];
    return [];
  }

  function getFormulations(medicine) {
    return asArray(medicine?.formulations);
  }

  function isSupportedOralLiquidForm(formulation) {
    const text = [
      formulation?.dosageForm,
      formulation?.dosage_form,
      formulation?.form,
      formulation?.formulation,
      formulation?.route,
      formulation?.display
    ].filter(Boolean).join(' ').toLowerCase();
    return /\boral\b/.test(text) && /\b(syrup|solution|suspension)\b/.test(text);
  }

  function hasOralLiquidFormulation(medicine) {
    const formulations = getFormulations(medicine);
    return formulations.length > 0 && formulations.some(isSupportedOralLiquidForm);
  }

  function getConditionOptions(medicine) {
    const seen = new Set();
    return getRegimens(medicine)
      .map(regimen => ({ label: String(regimen?.condition || '').trim(), regimen }))
      .filter(item => {
        if (!item.label) return false;
        const key = item.label.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
  }

  function concentration(formulation) {
    if (!formulation) return null;
    if (Number.isFinite(Number(formulation.mgPer5mL))) {
      return { amountMg: Number(formulation.mgPer5mL), volumeMl: 5 };
    }
    if (Number.isFinite(Number(formulation.mgPerMl))) {
      return { amountMg: Number(formulation.mgPerMl), volumeMl: 1 };
    }
    const c = formulation.concentration;
    if (c && typeof c === 'object' && Number.isFinite(Number(c.amount)) && Number.isFinite(Number(c.volume))) {
      return { amountMg: Number(c.amount), volumeMl: Number(c.volume) };
    }
    const text = typeof c === 'string' ? c : String(formulation.display || '');
    const match = text.match(/([\d.]+)\s*mg\s*\/\s*([\d.]+)\s*mL/i);
    return match ? { amountMg: Number(match[1]), volumeMl: Number(match[2]) } : null;
  }

  function normalize(medicine) {
    if (!medicine || typeof medicine !== 'object') return null;
    const regimens = getRegimens(medicine);
    const conditionOptions = getConditionOptions(medicine);
    const distinctConditionSelection = regimens.length > 1 && conditionOptions.length === regimens.length;
    const pediatric = medicine.pediatric || {};
    const formulations = getFormulations(medicine);

    return {
      raw: medicine,
      id: String(medicine.id || ''),
      name: medicine.genericName || medicine.name || medicine.id || 'Medicine',
      activeIngredient: medicine.activeIngredient || medicine.genericName || medicine.name || '',
      drugClass: asArray(medicine.drugClass).length ? asArray(medicine.drugClass) : (medicine.class ? [medicine.class] : []),
      indications: asArray(medicine.indications),
      contraindications: asArray(medicine.contraindications),
      precautions: asArray(medicine.precautions),
      adverseEffects: asArray(medicine.adverseEffects),
      moa: medicine.moa || '',
      notes: medicine.notes || '',
      references: asArray(medicine.references),
      formulations,
      pediatric,
      regimens,
      conditionOptions,
      calculatorReady: medicine.calculatorReady === true || medicine.dosing?.calculatorReady === true || medicine.dosing?.configured === true,
      oralLiquid: hasOralLiquidFormulation(medicine),
      hasUsableConcentration: formulations.some(formulation => Boolean(concentration(formulation))),
      regimenSelectionRequired: regimens.length > 1 && !distinctConditionSelection
    };
  }

  function getCalculatorMedicines(source) {
    const seen = new Set();
    return (Array.isArray(source) ? source : [])
      .map(normalize)
      .filter(medicine => {
        if (!medicine || !medicine.id || seen.has(medicine.id)) return false;
        if (!medicine.calculatorReady || !medicine.oralLiquid || !medicine.hasUsableConcentration) return false;
        if (!medicine.regimens.length || medicine.regimenSelectionRequired) return false;
        seen.add(medicine.id);
        return true;
      });
  }

  global.DoseCareMedicineAdapter = {
    normalize,
    getCalculatorMedicines,
    getRegimens,
    getConditionOptions,
    getFormulations,
    concentration
  };
})(window);
