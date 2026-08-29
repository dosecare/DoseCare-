/* DoseCare V2 — medicine adapter
   Keeps the UI independent from legacy medicine-file details.
   Scope: pediatric oral liquids only.
*/
(function (global) {
  'use strict';
  const asArray = value => Array.isArray(value) ? value.filter(Boolean) : [];

  function isOralLiquid(medicine) {
    if (!medicine || typeof medicine !== 'object') return false;
    const route = String(medicine.route || '').toLowerCase();
    const forms = [
      ...asArray(medicine.dosageForms),
      ...asArray(medicine.dosageForm),
      ...asArray(medicine.formulations).map(f => f?.dosageForm || f?.form || f?.formulation)
    ].join(' ').toLowerCase();
    return route.includes('oral') && /(oral\s+)?(solution|suspension|syrup)/.test(forms);
  }

  function getRegimens(medicine) {
    const dosing = medicine?.dosing || {};
    if (Array.isArray(dosing.regimens)) return dosing.regimens.filter(Boolean);
    if (Array.isArray(dosing.conditionBased)) return dosing.conditionBased.filter(Boolean);
    if (dosing.type) return [dosing];
    return [];
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

  function getFormulations(medicine) { return asArray(medicine?.formulations); }

  function concentration(f) {
    if (Number.isFinite(Number(f?.mgPer5mL))) return { amountMg: Number(f.mgPer5mL), volumeMl: 5 };
    if (Number.isFinite(Number(f?.mgPerMl))) return { amountMg: Number(f.mgPerMl), volumeMl: 1 };
    const c = f?.concentration;
    if (c && typeof c === 'object' && Number.isFinite(Number(c.amount)) && Number.isFinite(Number(c.volume))) {
      return { amountMg: Number(c.amount), volumeMl: Number(c.volume) };
    }
    const text = typeof c === 'string' ? c : String(f?.display || '');
    const match = text.match(/([\d.]+)\s*mg\s*\/\s*([\d.]+)\s*mL/i);
    return match ? { amountMg: Number(match[1]), volumeMl: Number(match[2]) } : null;
  }

  function normalize(medicine) {
    if (!medicine || typeof medicine !== 'object') return null;
    const regimens = getRegimens(medicine);
    const conditionOptions = getConditionOptions(medicine);
    return {
      raw: medicine,
      id: String(medicine.id || ''),
      name: medicine.genericName || medicine.name || medicine.id || 'Medicine',
      activeIngredient: medicine.activeIngredient || medicine.genericName || medicine.name || '',
      drugClass: asArray(medicine.drugClass).length ? asArray(medicine.drugClass) : (medicine.class ? [medicine.class] : []),
      indications: asArray(medicine.indications).length ? asArray(medicine.indications) : (medicine.indications ? [medicine.indications] : []),
      contraindications: asArray(medicine.contraindications),
      precautions: asArray(medicine.precautions),
      adverseEffects: asArray(medicine.adverseEffects),
      moa: medicine.moa || '',
      notes: medicine.notes || '',
      references: asArray(medicine.references),
      formulations: getFormulations(medicine),
      regimens,
      conditionOptions,
      calculatorReady: medicine.calculatorReady === true || medicine.dosing?.calculatorReady === true || medicine.dosing?.configured === true,
      oralLiquid: isOralLiquid(medicine),
      // A medicine with several regimens but no explicit clinical selector is ambiguous.
      // V2 must never silently choose the first regimen.
      regimenSelectionRequired: regimens.length > 1 && conditionOptions.length === 0
    };
  }

  function getCalculatorMedicines(source) {
    const seen = new Set();
    return (Array.isArray(source) ? source : []).map(normalize).filter(m => {
      if (!m || !m.id || !m.calculatorReady || !m.oralLiquid || seen.has(m.id)) return false;
      seen.add(m.id);
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
