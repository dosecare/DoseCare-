/* DoseCare V2 — calculator UI controller. */
(function () {
  'use strict';
  const $=id=>document.getElementById(id);
  const medicineSelect=$('medicine-select'), conditionField=$('condition-field'), conditionSelect=$('condition-select'), concentrationField=$('concentration-field'), concentrationSelect=$('concentration-select'), recommendedDose=$('recommended-dose'), form=$('dose-form'), message=$('form-message');
  const ageField=$('age-value')?.closest('.field'), weightField=$('weight-value')?.closest('.field');
  const database=window.DoseCareV2Database; const medicines=database?database.getAll():[]; const byId=id=>database?.getById(id)||null;
  let frequencyField=null, frequencySelect=null;

  function toMg(amount,unit){const n=Number(amount);if(!Number.isFinite(n)||n<=0)return null;const u=String(unit||'mg').toLowerCase();if(['g','gram','grams'].includes(u))return n*1000;if(['mcg','µg','microgram','micrograms'].includes(u))return n/1000;return n;}
  function normalizeFormulation(f){if(!f)return null;if(f.volumeBased)return {...f,display:f.display||'Volume-based oral solution'};const c=f.concentration||{};let rawAmount=c.amount??f.amount??f.mgPer5mL??f.mgPerMl,rawUnit=c.unit??f.unit??'mg',volume=c.volume??f.volume??(f.mgPer5mL!==undefined?5:1);if((rawAmount===undefined||rawAmount===null)&&typeof f.display==='string'){const match=f.display.match(/([0-9.]+)\s*(mg|g|mcg)\s*\/\s*([0-9.]+)\s*mL/i);if(match){rawAmount=Number(match[1]);rawUnit=match[2];volume=Number(match[3]);}}const amountMg=toMg(rawAmount,rawUnit),volumeMl=Number(volume);if(amountMg===null||!Number.isFinite(volumeMl)||volumeMl<=0)return null;return {...f,mgPerMl:amountMg/volumeMl,display:f.display||`${rawAmount} ${rawUnit}/${volumeMl} mL`,concentration:{amount:amountMg,unit:'mg',volume:volumeMl,volumeUnit:'mL'}};}
  function doseText(r){if(r.type==='sachet_age_based')return `${r.doseMin??r.minDose??r.dose} ${r.doseUnit||'sachet/day'}`;if(r.type==='sachet_schedule')return 'See the 7-day disimpaction schedule';if(r.type==='label_weight_age_based'||r.type==='label_age_based')return `${r.doseMin??r.minDose??r.dose}–${r.doseMax??r.maxDose??r.dose} ${r.doseUnit||r.unit||'mg/dose'}`;if(r.type==='volume_by_age')return `${r.minVolumeMl}–${r.maxVolumeMl} mL after each loose stool`;if(r.type==='volume_per_kg')return `75 mL/kg over ${r.durationHours} hours`;if(r.type==='probiotic_fixed')return `${r.doseMin??r.minDose??r.dose}–${r.doseMax??r.maxDose??r.dose} ${r.doseUnit||'per day'}`;if(r.type==='probiotic_product')return `${r.administrationMin??r.administrationMax} ${r.administrationUnit||'packet/day'}`;if(r.schedule?.length)return r.schedule.map(s=>`${s.dayRange}: ${s.doseMgPerKg??s.doseMgPerKgPerDose} mg/kg`).join(' • ');const a=r.minDose??r.dose??r.doseMgPerKg??r.doseMgPerKgPerDay,b=r.maxDose??r.dose??r.doseMgPerKg??r.doseMgPerKgPerDay;return `${a===b?a:`${a}–${b}`} ${r.unit||(r.type==='mg_per_kg_per_day'||r.type==='mg_per_kg_day'?'mg/kg/day':'mg/kg/dose')}`;}

  function requirements(r){
    if(!r)return {age:false,weight:false,ageOrWeight:false};
    const ageByBounds=['minAgeWeeks','maxAgeWeeks','minAgeMonths','maxAgeMonths','minAgeYears','maxAgeYears'].some(k=>r[k]!==undefined);
    const age=r.requiresAge??(ageByBounds||['age_based','label_age_based','label_weight_age_based','volume_by_age','volume_per_kg','sachet_age_based','sachet_schedule','probiotic_product'].includes(r.type));
    const weight=r.requiresWeight??['mg_per_kg_per_day','mg_per_kg_day','mg_per_kg_per_dose','mg_per_kg_single_dose','weight_based','label_weight_age_based','volume_per_kg'].includes(r.type);
    const ageOrWeight=Boolean(r.ageOrWeight||r.age_or_weight||r.requiresAgeOrWeight);
    return ageOrWeight ? {age:true,weight:true,ageOrWeight:true} : {age,weight,ageOrWeight:false};
  }
  function setFieldVisibility(r){
    const req=requirements(r);
    if(ageField)ageField.hidden=!req.age;
    if(weightField)weightField.hidden=!req.weight;
    if(!req.age)$('age-value').value='';
    if(!req.weight)$('weight-value').value='';
  }
  function ensureFrequencyField(){
    if(frequencyField)return;
    frequencyField=document.createElement('div');frequencyField.className='field';frequencyField.id='frequency-field';
    const label=document.createElement('label');label.htmlFor='frequency-select';label.textContent='Regimen / frequency';
    frequencySelect=document.createElement('select');frequencySelect.id='frequency-select';label.appendChild(frequencySelect);frequencyField.appendChild(label);
    conditionField.insertAdjacentElement('afterend',frequencyField);frequencyField.hidden=true;
  }

  // A regimen's `condition` may contain its frequency (for example
  // "Ear/Nose/Throat — Mild/Moderate — every 12 hours"). The UI must expose
  // the clinical condition first, then expose frequency/regimen only when there
  // are multiple choices within that condition.
  function conditionLabel(r){
    const raw=String(r?.condition||r?.conditions?.[0]||'General');
    return raw.replace(/\s*[—-]\s*(?:every|q\d+|once|twice|three times|four times).*$/i,'').trim()||raw;
  }
  function conditionKey(r){return conditionLabel(r).toLowerCase();}
  function conditionGroups(rs){
    const map=new Map();
    rs.forEach(r=>{const key=conditionKey(r);if(!map.has(key))map.set(key,{label:conditionLabel(r),regimens:[]});map.get(key).regimens.push(r);});
    return [...map.values()];
  }
  function ageInMonths(){const v=Number($('age-value')?.value),u=$('age-unit')?.value;if(!Number.isFinite(v)||v<0)return null;if(u==='years')return v*12;if(u==='weeks')return v/4.34524;return v;}
  function regimenMatchesAge(r){const m=ageInMonths();if(m===null)return false;let min=r.minAgeMonths,max=r.maxAgeMonths;if(r.minAgeYears!==undefined)min=Number(r.minAgeYears)*12;if(r.maxAgeYears!==undefined)max=Number(r.maxAgeYears)*12;if(min!==undefined&&m<Number(min))return false;if(max!==undefined&&m>Number(max))return false;return true;}
  function ageBandText(r){let min=r.minAgeMonths,max=r.maxAgeMonths;if(r.minAgeYears!==undefined)min=Number(r.minAgeYears)*12;if(r.maxAgeYears!==undefined)max=Number(r.maxAgeYears)*12;if(min===undefined&&max===undefined)return '';const fmt=n=>n%12===0?`${n/12} years`:`${n} months`;if(min!==undefined&&max!==undefined)return `${fmt(min)}–${fmt(max)}`;return min!==undefined?`≥ ${fmt(min)}`:`≤ ${fmt(max)}`;}
  function compatibleFormulations(m,r){const forms=m?.formulations||[];if(!r?.allowedFormulations?.length)return forms.map((f,i)=>({...f,__index:i}));const allowed=new Set(r.allowedFormulations.map(String));return forms.map((f,i)=>({...f,__index:i})).filter(f=>allowed.has(String(f.id)));}
  function renderConcentrations(m,r){
    concentrationSelect.innerHTML='';const forms=compatibleFormulations(m,r);
    forms.forEach(f=>{const o=document.createElement('option');o.value=String(f.__index);o.textContent=f.display||f.label||`${f.mgPer5mL} mg/5 mL`;concentrationSelect.appendChild(o);});
    concentrationField.hidden=forms.length<=1;
    if(!forms.length){concentrationField.hidden=false;const o=document.createElement('option');o.value='';o.textContent='No compatible formulation configured';concentrationSelect.appendChild(o);}
  }

  function chooseRegimen(regimens){
    if(!regimens.length)return null;
    const ageMatches=regimens.filter(regimenMatchesAge);
    if(ageMatches.length===1)return ageMatches[0];
    if(frequencySelect?.value){const chosen=regimens.find(r=>r.id===frequencySelect.value);if(chosen)return chosen;}
    return regimens[0];
  }
  function selectedRegimen(m){
    const rs=m?.regimens||[];if(rs.length===1)return rs[0];
    const groups=conditionGroups(rs);const group=groups.find(g=>g.label===conditionSelect.value);
    return chooseRegimen(group?.regimens||[]);
  }

  function updateFieldState(m,groups){
    const multipleConditions=groups.length>1;
    conditionField.hidden=!multipleConditions;
    // Always populate the condition selector when there is a condition-driven medicine.
    // A condition is a real user choice even if every condition has only one regimen.
    if(multipleConditions){
      const current=conditionSelect.value;
      conditionSelect.innerHTML='';
      groups.forEach(g=>{const o=document.createElement('option');o.value=g.label;o.textContent=g.label;conditionSelect.appendChild(o);});
      conditionSelect.value=groups.some(g=>g.label===current)?current:groups[0].label;
    } else if(groups.length===1) {
      conditionSelect.innerHTML='';
      const o=document.createElement('option');o.value=groups[0].label;o.textContent=groups[0].label;conditionSelect.appendChild(o);
      conditionSelect.value=groups[0].label;
    }

    const group=groups.find(g=>g.label===conditionSelect.value)||groups[0];
    if(!group){setFieldVisibility(null);if(frequencyField)frequencyField.hidden=true;return null;}
    const r=chooseRegimen(group.regimens);
    const needsFrequency=group.regimens.length>1;
    frequencyField.hidden=!needsFrequency;
    if(needsFrequency&&frequencySelect){
      frequencySelect.innerHTML='';
      group.regimens.forEach(x=>{const o=document.createElement('option');o.value=x.id;o.textContent=[ageBandText(x),x.frequencyText||x.id].filter(Boolean).join(' — ');frequencySelect.appendChild(o);});
      if(r)frequencySelect.value=r.id;
    } else if(frequencySelect){frequencySelect.innerHTML='';}
    setFieldVisibility(r);
    return r;
  }

  function render(){
    const m=byId(medicineSelect.value);
    conditionSelect.innerHTML='';ensureFrequencyField();frequencyField.hidden=true;frequencySelect.innerHTML='';conditionField.hidden=true;concentrationField.hidden=true;
    if(!m){recommendedDose.textContent='Select a treatment first';setFieldVisibility(null);return;}
    const rs=m.regimens||[],groups=conditionGroups(rs);
    if(groups.length>1){conditionField.hidden=false;}
    const r=updateFieldState(m,groups);
    recommendedDose.textContent=r?doseText(r):(rs.length?'Select a condition / regimen to view the dose':'Dose not configured');
    renderConcentrations(m,r);
  }
  function updateRegimenUI(){const m=byId(medicineSelect.value),groups=conditionGroups(m?.regimens||[]);const r=updateFieldState(m,groups);recommendedDose.textContent=r?doseText(r):(groups.length?'Select a condition / regimen to view the dose':'Dose not configured');renderConcentrations(m,r);}

  medicines.forEach(m=>{const o=document.createElement('option');o.value=m.id;o.textContent=m.name;medicineSelect.appendChild(o);});
  medicineSelect.addEventListener('change',render);
  conditionSelect.addEventListener('change',updateRegimenUI);
  $('age-value')?.addEventListener('input',updateRegimenUI);
  $('age-unit')?.addEventListener('change',updateRegimenUI);
  document.addEventListener('change',e=>{if(e.target===frequencySelect)updateRegimenUI();});

  form.addEventListener('submit',e=>{
    e.preventDefault();message.textContent='';
    const m=byId(medicineSelect.value),r=selectedRegimen(m);if(!m||!r){message.textContent='Select a treatment and required condition.';return;}
    const req=requirements(r);
    const ageValue=req.age?$('age-value').value:null, weightValue=req.weight?$('weight-value').value:null;
    if(req.ageOrWeight&&!ageValue&&!weightValue){message.textContent='Enter either age or weight to calculate the dose.';return;}
    const index=Math.max(0,Number(concentrationSelect.value)||0),rawFormulation=(m.formulations||[])[index];
    const f=m.id==='ors'||m.id==='macrogol'||m.id==='probiotics'?rawFormulation:normalizeFormulation(rawFormulation);
    if(m.id!=='ors'&&!f){message.textContent='The selected oral-liquid formulation is not configured correctly.';return;}
    if(r.allowedFormulations?.length&&!r.allowedFormulations.map(String).includes(String(f?.id))){message.textContent='The selected formulation is not compatible with this regimen.';return;}
    let result;
    const common={medicine:m,regimen:r,weight:weightValue,age:ageValue,ageUnit:$('age-unit').value,formulation:f};
    if(m.id==='macrogol'&&window.DoseCareMacrogol)result=window.DoseCareMacrogol.calculate({...common,weight:null});
    else if(m.id==='probiotics'&&window.DoseCareProbiotic)result=window.DoseCareProbiotic.calculate({...common,weight:null});
    else if(m.id==='ors'||r.type==='volume_by_age'||r.type==='volume_per_kg')result=window.DoseCareORS?.calculate(common);
    else result=window.DoseCareDosingEngine.calculate(common);
    if(!result?.ok){message.textContent=result?.error||'Unable to calculate the dose. Please check the entered information.';return;}
    const payload=JSON.stringify({medicine:m,formulation:f,...result});
    try{sessionStorage.setItem('dosecareV2Result',payload);}catch(error){console.warn('DoseCare sessionStorage unavailable:',error);}
    try{localStorage.setItem('dosecareV2Result',payload);}catch(error){console.warn('DoseCare localStorage unavailable:',error);}
    const encoded=encodeURIComponent(payload);window.location.assign(`./result.html#data=${encoded}`);
  });
  render();
})();
