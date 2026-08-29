/* DoseCare V2 calculator - presentation layer only. */
(function () {
  const $ = id => document.getElementById(id);
  const medicineSelect = $('medicine-select');
  const conditionField = $('condition-field');
  const conditionSelect = $('condition-select');
  const recommendedDose = $('recommended-dose');
  const concentrationField = $('concentration-field');
  const concentrationSelect = $('concentration-select');
  const form = $('dose-form');
  const message = $('form-message');

  // medicines.js declares a global lexical `const medicines`, not window.medicines.
  const allMedicines = typeof medicines !== 'undefined' && Array.isArray(medicines) ? medicines : [];

  function getReadyMedicines() {
    return allMedicines.filter(m => {
      const ready = m?.calculatorReady ?? m?.dosing?.calculatorReady ?? m?.dosing?.configured;
      const route = String(m?.route || '').toLowerCase();
      const forms = JSON.stringify(m?.dosageForms || m?.dosageForm || '').toLowerCase();
      const liquid = route.includes('oral') && /(solution|suspension|syrup)/.test(forms + JSON.stringify(m?.formulations || '').toLowerCase());
      return ready === true && liquid;
    });
  }

  function getRegimens(medicine) {
    const dosing = medicine?.dosing || {};
    if (Array.isArray(dosing.regimens)) return dosing.regimens;
    if (Array.isArray(dosing.conditionBased)) return dosing.conditionBased;
    if (dosing.type) return [dosing];
    return [];
  }

  function regimenLabel(r) {
    return r.condition || r.clinicalContext || r.indication || r.name || '';
  }

  function getConditionRegimens(medicine) {
    const regimens = getRegimens(medicine);
    const labelled = regimens.filter(r => regimenLabel(r));
    const unique = [];
    labelled.forEach(r => {
      const label = regimenLabel(r).trim();
      if (label && !unique.some(x => x.label.toLowerCase() === label.toLowerCase())) unique.push({ label, regimen: r });
    });
    return unique;
  }

  function ageMonths() {
    const value = Number($('age-value').value);
    if (!Number.isFinite(value) || value < 0) return null;
    return $('age-unit').value === 'years' ? value * 12 : value;
  }

  function regimenSupportsAge(regimen, months) {
    if (months == null) return true;
    const age = regimen.age || {};
    const min = age.minimumMonths ?? regimen.minimumAgeMonths;
    const maxMonths = age.maximumMonths ?? (regimen.maximumAgeYears != null ? regimen.maximumAgeYears * 12 : null);
    if (min != null && months < Number(min)) return false;
    if (maxMonths != null && months > Number(maxMonths)) return false;
    return true;
  }

  function formatDose(r) {
    const type = r.type || r.dosingType || '';
    const unit = r.doseUnit || r.unit || (type === 'mg_per_kg_per_day' ? 'mg/kg/day' : 'mg/kg/dose');
    const min = Number(r.minDose ?? r.dose ?? r.value);
    const max = Number(r.maxDose ?? min);
    if (!Number.isFinite(min)) return 'Not available for calculation';
    const value = min === max ? min : `${min}–${max}`;
    return `${value} ${unit}`;
  }

  function getFormulations(medicine) {
    return Array.isArray(medicine?.formulations) ? medicine.formulations.filter(Boolean) : [];
  }

  function formulationMgPer5ml(f) {
    if (Number.isFinite(Number(f?.mgPer5mL))) return Number(f.mgPer5mL);
    const c = f?.concentration;
    if (typeof c === 'object' && Number.isFinite(Number(c.amount)) && Number.isFinite(Number(c.volume))) return Number(c.amount) * 5 / Number(c.volume);
    const text = typeof c === 'string' ? c : f?.display || '';
    const match = String(text).match(/([\d.]+)\s*mg\s*\/\s*([\d.]+)\s*mL/i);
    return match ? Number(match[1]) * 5 / Number(match[2]) : null;
  }

  function formulationLabel(f) {
    if (f?.concentration && typeof f.concentration === 'string') return f.concentration;
    if (f?.display) return f.display;
    if (f?.concentration?.amount != null) return `${f.concentration.amount} ${f.concentration.unit || 'mg'}/${f.concentration.volume} ${f.concentration.volumeUnit || 'mL'}`;
    return 'Concentration';
  }

  function selectedRegimen(medicine) {
    const labelled = getConditionRegimens(medicine);
    if (labelled.length > 1) {
      const selected = labelled.find(x => x.label === conditionSelect.value);
      return selected?.regimen || null;
    }
    return getRegimens(medicine)[0] || null;
  }

  function renderMedicines() {
    medicineSelect.innerHTML = '<option value="">Select treatment</option>';
    getReadyMedicines().sort((a, b) => String(a.genericName || a.name).localeCompare(String(b.genericName || b.name))).forEach(m => {
      const option = document.createElement('option');
      option.value = m.id;
      option.textContent = m.genericName || m.name || m.id;
      medicineSelect.appendChild(option);
    });
  }

  function renderMedicine() {
    const medicine = getReadyMedicines().find(m => String(m.id) === medicineSelect.value);
    conditionSelect.innerHTML = '<option value="">Select condition</option>';
    concentrationSelect.innerHTML = '';
    message.textContent = '';
    if (!medicine) {
      conditionField.hidden = true;
      concentrationField.hidden = true;
      recommendedDose.textContent = 'Select a treatment first';
      return;
    }

    const labelled = getConditionRegimens(medicine);
    conditionField.hidden = labelled.length < 2;
    labelled.forEach(x => {
      const option = document.createElement('option');
      option.value = x.label;
      option.textContent = x.label;
      conditionSelect.appendChild(option);
    });

    const forms = getFormulations(medicine);
    concentrationField.hidden = forms.length <= 1;
    forms.forEach((f, index) => {
      const option = document.createElement('option');
      option.value = String(index);
      option.textContent = formulationLabel(f);
      concentrationSelect.appendChild(option);
    });

    const regimen = labelled.length >= 2 ? null : getRegimens(medicine)[0];
    recommendedDose.textContent = regimen ? formatDose(regimen) : 'Select a condition to view the dose';
  }

  function renderCondition() {
    const medicine = getReadyMedicines().find(m => String(m.id) === medicineSelect.value);
    if (!medicine) return;
    const regimen = selectedRegimen(medicine);
    recommendedDose.textContent = regimen ? formatDose(regimen) : 'Select a condition to view the dose';
  }

  function numberOrNull(value) {
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }

  function calculate() {
    const medicine = getReadyMedicines().find(m => String(m.id) === medicineSelect.value);
    if (!medicine) throw new Error('Please select a treatment.');
    const labelled = getConditionRegimens(medicine);
    const regimen = selectedRegimen(medicine);
    if (!regimen) throw new Error('Please select a condition.');

    const months = ageMonths();
    const weight = numberOrNull($('weight-value').value);
    if (months == null && weight == null) throw new Error('Enter the child’s age or weight as required by the dosing regimen.');
    if (weight != null && weight <= 0) throw new Error('Weight must be greater than zero.');
    if (!regimenSupportsAge(regimen, months)) throw new Error('The selected age is outside the configured pediatric range for this regimen.');

    const type = regimen.type || regimen.dosingType || (medicine.dosing?.type === 'mg_per_kg_per_day' ? 'mg_per_kg_per_day' : medicine.dosing?.type);
    const minDose = numberOrNull(regimen.minDose ?? regimen.dose ?? regimen.value);
    const maxDose = numberOrNull(regimen.maxDose ?? minDose);
    if (minDose == null) throw new Error('This regimen does not contain a calculable dose yet.');

    const frequency = numberOrNull(regimen.frequency ?? regimen.frequencyPerDay);
    let lowMg, highMg;
    if (type === 'mg_per_kg_per_day') {
      if (weight == null) throw new Error('This regimen requires the child’s weight.');
      if (!frequency || frequency <= 0) throw new Error('The regimen is missing a valid frequency.');
      lowMg = weight * minDose / frequency;
      highMg = weight * maxDose / frequency;
    } else if (type === 'mg_per_kg_per_dose') {
      if (weight == null) throw new Error('This regimen requires the child’s weight.');
      lowMg = weight * minDose;
      highMg = weight * maxDose;
    } else {
      throw new Error('This dosing type is not supported by the V2 calculator yet.');
    }

    if (regimen.maxDailyDose != null && frequency) {
      const maxDaily = Number(regimen.maxDailyDose);
      if (Number.isFinite(maxDaily)) {
        lowMg = Math.min(lowMg, maxDaily / frequency);
        highMg = Math.min(highMg, maxDaily / frequency);
      }
    }

    const forms = getFormulations(medicine);
    const formIndex = forms.length > 1 ? Number(concentrationSelect.value) : 0;
    const formulation = forms[formIndex] || forms[0] || null;
    const mgPer5mL = formulation ? formulationMgPer5ml(formulation) : null;
    const lowMl = mgPer5mL ? lowMg * 5 / mgPer5mL : null;
    const highMl = mgPer5mL ? highMg * 5 / mgPer5mL : null;

    const result = { medicine, regimen, condition: labelled.length > 1 ? conditionSelect.value : null, ageValue: numberOrNull($('age-value').value), ageUnit: $('age-unit').value, ageMonths: months, weight, formulation, mgPer5mL, lowMg, highMg, lowMl, highMl, frequency, generatedAt: new Date().toISOString() };
    sessionStorage.setItem('dosecareV2Result', JSON.stringify(result));
    location.href = 'result.html';
  }

  medicineSelect.addEventListener('change', renderMedicine);
  conditionSelect.addEventListener('change', renderCondition);
  $('back-welcome').addEventListener('click', () => location.href = 'index.html');
  form.addEventListener('submit', e => { e.preventDefault(); message.textContent = ''; try { calculate(); } catch (error) { message.textContent = error.message || 'Unable to calculate this dose.'; } });
  renderMedicines();
})();
