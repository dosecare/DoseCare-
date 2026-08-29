/* DoseCare V2 — calculator presentation layer only. */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const medicineSelect = $('medicine-select');
  const conditionField = $('condition-field');
  const conditionSelect = $('condition-select');
  const recommendedDose = $('recommended-dose');
  const concentrationField = $('concentration-field');
  const concentrationSelect = $('concentration-select');
  const form = $('dose-form');
  const message = $('form-message');

  const rawMedicines = typeof medicines !== 'undefined' && Array.isArray(medicines) ? medicines : [];
  const allMedicines = globalThis.DoseCareMedicineAdapter.getCalculatorMedicines(rawMedicines);

  const getMedicine = () => allMedicines.find(m => m.id === medicineSelect.value) || null;
  const getSelectedRegimen = medicine => {
    const options = medicine.conditionOptions;
    if (options.length > 1) return options.find(x => x.label === conditionSelect.value)?.regimen || null;
    return medicine.regimens[0] || null;
  };

  function formatDose(regimen) {
    const min = Number(regimen?.minDose ?? regimen?.dose ?? regimen?.value);
    const max = Number(regimen?.maxDose ?? min);
    const unit = regimen?.doseUnit || regimen?.unit || (regimen?.type === 'mg_per_kg_per_day' ? 'mg/kg/day' : 'mg/kg/dose');
    if (!Number.isFinite(min)) return 'Not available for calculation';
    return `${min === max ? min : `${min}–${max}`} ${unit}`;
  }

  function formulationLabel(f) {
    if (typeof f?.concentration === 'string') return f.concentration;
    if (f?.display) return f.display;
    if (f?.concentration?.amount != null) return `${f.concentration.amount} ${f.concentration.unit || 'mg'}/${f.concentration.volume} ${f.concentration.volumeUnit || 'mL'}`;
    if (f?.mgPer5mL != null) return `${f.mgPer5mL} mg/5 mL`;
    return 'Concentration';
  }

  function renderMedicines() {
    medicineSelect.innerHTML = '<option value="">Select treatment</option>';
    allMedicines.slice().sort((a, b) => a.name.localeCompare(b.name)).forEach(m => {
      const option = document.createElement('option');
      option.value = m.id;
      option.textContent = m.name;
      medicineSelect.appendChild(option);
    });
  }

  function renderMedicine() {
    const medicine = getMedicine();
    conditionSelect.innerHTML = '<option value="">Select condition</option>';
    concentrationSelect.innerHTML = '';
    message.textContent = '';
    conditionField.hidden = true;
    concentrationField.hidden = true;
    if (!medicine) {
      recommendedDose.textContent = 'Select a treatment first';
      return;
    }

    const options = medicine.conditionOptions;
    if (options.length > 1) {
      conditionField.hidden = false;
      options.forEach(item => {
        const option = document.createElement('option');
        option.value = item.label;
        option.textContent = item.label;
        conditionSelect.appendChild(option);
      });
      recommendedDose.textContent = 'Select a condition to view the dose';
    } else {
      recommendedDose.textContent = formatDose(medicine.regimens[0]);
    }

    const forms = medicine.formulations;
    if (forms.length > 1) concentrationField.hidden = false;
    forms.forEach((f, index) => {
      const option = document.createElement('option');
      option.value = String(index);
      option.textContent = formulationLabel(f);
      concentrationSelect.appendChild(option);
    });
  }

  function renderCondition() {
    const medicine = getMedicine();
    if (!medicine) return;
    const regimen = getSelectedRegimen(medicine);
    recommendedDose.textContent = regimen ? formatDose(regimen) : 'Select a condition to view the dose';
  }

  function calculate() {
    const medicine = getMedicine();
    if (!medicine) throw new Error('Please select a treatment.');
    const regimen = getSelectedRegimen(medicine);
    if (!regimen) throw new Error('Please select a condition.');

    const forms = medicine.formulations;
    const index = forms.length > 1 ? Number(concentrationSelect.value) : 0;
    const formulation = forms[index] || forms[0] || null;
    const result = globalThis.DoseCareDosingEngine.calculate({
      regimen,
      weight: $('weight-value').value,
      ageValue: $('age-value').value,
      ageUnit: $('age-unit').value,
      formulation
    });

    sessionStorage.setItem('dosecareV2Result', JSON.stringify({
      medicine: medicine.raw,
      normalizedMedicine: medicine,
      condition: medicine.conditionOptions.length > 1 ? conditionSelect.value : null,
      formulation,
      ...result
    }));
    location.href = 'result.html';
  }

  medicineSelect.addEventListener('change', renderMedicine);
  conditionSelect.addEventListener('change', renderCondition);
  $('back-welcome').addEventListener('click', () => location.href = 'index.html');
  form.addEventListener('submit', event => {
    event.preventDefault();
    message.textContent = '';
    try { calculate(); } catch (error) { message.textContent = error.message || 'Unable to calculate this dose.'; }
  });
  renderMedicines();
})();
