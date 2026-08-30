/* DoseCare V2 — calculator UI controller. */
(function () {
  'use strict';
  const $=id=>document.getElementById(id);
  const medicineSelect=$('medicine-select'), conditionField=$('condition-field'), conditionSelect=$('condition-select'), concentrationField=$('concentration-field'), concentrationSelect=$('concentration-select'), recommendedDose=$('recommended-dose'), form=$('dose-form'), message=$('form-message');
  const ageField=$('age-value')?.closest('.field');
  const weightField=$('weight-value')?.closest('.field');
  const database=window.DoseCareV2Database;
  const medicines=database?database.getAll():[];
  const byId=id=>database?.getById(id)||null;
  function doseText(r){
    if(r.type==='label_weight_age_based') return 'Weight/age-based labeled dose';
    if(r.schedule?.length) return r.schedule.map(s=>`${s.dayRange}: ${s.doseMgPerKg??s.doseMgPerKgPerDose} mg/kg`).join(' • ');
    const a=r.minDose??r.dose??r.doseMgPerKg??r.doseMgPerKgPerDay,b=r.maxDose??r.dose??r.doseMgPerKg??r.doseMgPerKgPerDay;
    return `${a===b?a:`${a}–${b}`} ${r.unit||(r.type==='mg_per_kg_per_day'||r.type==='mg_per_kg_day'?'mg/kg/day':'mg/kg/dose')}`;
  }
  function requirements(r){
    if(!r) return {age:false,weight:false};
    return {age:r.requiresAge ?? ['age_based','label_age_based','label_weight_age_based'].includes(r.type),weight:r.requiresWeight ?? ['mg_per_kg_per_day','mg_per_kg_day','mg_per_kg_per_dose','mg_per_kg_single_dose','weight_based','label_weight_age_based','condition_based'].includes(r.type)};
  }
  function setFieldVisibility(r){const req=requirements(r);if(ageField)ageField.hidden=!req.age;if(weightField)weightField.hidden=!req.weight;if(!req.age)$('age-value').value='';if(!req.weight)$('weight-value').value='';}
  function conditionLabel(r){const c=Array.isArray(r.conditions)?r.conditions[0]:r.condition;return c?`${c} — ${r.frequencyText||r.id}`:(r.frequencyText||r.id);}
  function render(){
    const m=byId(medicineSelect.value);conditionSelect.innerHTML='<option value="">Select condition / regimen</option>';concentrationSelect.innerHTML='';conditionField.hidden=true;concentrationField.hidden=true;
    if(!m){recommendedDose.textContent='Select a treatment first';setFieldVisibility(null);return;}
    const rs=m.regimens||[];const needsChoice=rs.length>1;
    if(needsChoice){conditionField.hidden=false;rs.forEach(r=>{const o=document.createElement('option');o.value=r.id;o.textContent=conditionLabel(r);conditionSelect.appendChild(o);});recommendedDose.textContent='Select a condition / regimen to view the dose';setFieldVisibility(null);}
    else {const r=rs[0];recommendedDose.textContent=r?doseText(r):'Dose not configured';setFieldVisibility(r);}
    (m.formulations||[]).forEach((f,i)=>{const o=document.createElement('option');o.value=i;o.textContent=f.display||f.label||`${f.mgPer5mL} mg/5 mL`;concentrationSelect.appendChild(o);});
    if((m.formulations||[]).length>1)concentrationField.hidden=false;
  }
  function selectedRegimen(m){const rs=m?.regimens||[];if(rs.length===1)return rs[0];return rs.find(r=>r.id===conditionSelect.value)||null;}
  medicines.forEach(m=>{const o=document.createElement('option');o.value=m.id;o.textContent=m.name;medicineSelect.appendChild(o);});
  medicineSelect.addEventListener('change',render);
  conditionSelect.addEventListener('change',()=>{const r=selectedRegimen(byId(medicineSelect.value));recommendedDose.textContent=r?doseText(r):'Select a condition / regimen to view the dose';setFieldVisibility(r);});
  form.addEventListener('submit',e=>{e.preventDefault();message.textContent='';const m=byId(medicineSelect.value),r=selectedRegimen(m);if(!m||!r){message.textContent='Select a treatment and required condition.';return;}const req=requirements(r);const f=(m.formulations||[])[Number(concentrationSelect.value)||0];const result=window.DoseCareDosingEngine.calculate({medicine:m,regimen:r,weight:req.weight?$('weight-value').value:null,age:req.age?$('age-value').value:null,ageUnit:$('age-unit').value,formulation:f});if(!result.ok){message.textContent=result.error;return;}sessionStorage.setItem('dosecareV2Result',JSON.stringify({medicine:m,formulation:f,...result}));window.location.href='result.html';});
  render();
})();
