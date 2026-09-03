/* DoseCare V2 — result page renderer. */
(function(){
'use strict';
const root=document.getElementById('result-stack');
const raw=sessionStorage.getItem('dosecareV2Result');
const esc=v=>String(v??'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));
const fmt=v=>Number.isFinite(Number(v))?Number(v).toFixed(2).replace(/\.00$/,'').replace(/(\.\d)0$/,'$1'):'—';
const ageText=(age,unit)=>age==null?'Not provided':`${fmt(age)} ${unit||''}`.trim();
if(!raw){root.innerHTML='<article class="glass-card"><h1>No calculation found</h1><p>Return to the calculator and enter patient information.</p><a class="primary-button" href="calculator.html">BACK TO CALCULATOR</a></article>';return;}
let d;try{d=JSON.parse(raw);}catch{d=null;}
if(!d?.medicine||!d?.regimen||!d.ok){root.innerHTML='<article class="glass-card"><h1>Result unavailable</h1><p>The calculation could not be read safely.</p></article>';return;}
const m=d.medicine,r=d.regimen,info=m.information||{};
const dose=d.lowMg===d.highMg?`${fmt(d.lowMg)} mg/dose`:`${fmt(d.lowMg)}–${fmt(d.highMg)} mg/dose`;
const vol=d.lowMl==null?'Not available':(d.lowMl===d.highMl?`${fmt(d.lowMl)} mL/dose`:`${fmt(d.lowMl)}–${fmt(d.highMl)} mL/dose`);
const freq=r.frequencyText||`${fmt(d.frequency)} times daily`;
const conc=d.concentrationText||d.formulation?.display||'';
const refs=(m.sources||info.sources||[]).map(x=>`<a class="reference-item" href="${esc(x.url)}" target="_blank" rel="noopener noreferrer"><span>${esc(x.organization||'Source')}</span><strong>${esc(x.title||'Reference')}</strong></a>`).join('');
const mechanism=info.mechanism||info.mechanismOfAction||'Not configured';
const precautions=info.precautions||info.warningsPrecautions||[];
const adverseEffects=info.adverseEffects||[];
const interactions=info.interactions||[];
const steps=[];
const normalizedType=r.type==='mg_per_kg_day'?'mg_per_kg_per_day':r.type==='mg_per_kg_single_dose'?'mg_per_kg_per_dose':r.type;
if(normalizedType==='label_weight_age_based'){
 steps.push(`<div class="calc-step"><span>01</span><div><strong>Label dose selection</strong><p>The configured pediatric weight/age table selected <b>${fmt(d.lowMg)} mg/dose</b> for the entered patient.</p></div></div>`);
} else if(normalizedType==='label_age_based'){
 steps.push(`<div class="calc-step"><span>01</span><div><strong>Label dose selection</strong><p>The configured age-based label dose is <b>${esc(dose)}</b>.</p></div></div>`);
} else if(normalizedType==='mg_per_kg_per_day'){
 steps.push(`<div class="calc-step"><span>01</span><div><strong>Daily dose calculation</strong><p>${fmt(d.weight)} kg × ${fmt(r.minDose)}${r.maxDose!=null?`–${fmt(r.maxDose)}`:''} mg/kg/day = <b>${fmt(d.dailyLowMg)}${d.dailyHighMg!==d.dailyLowMg?`–${fmt(d.dailyHighMg)}`:''} mg/day</b>.</p></div></div>`);
 steps.push(`<div class="calc-step"><span>02</span><div><strong>Divide by frequency</strong><p>${fmt(d.dailyLowMg)}${d.dailyHighMg!==d.dailyLowMg?`–${fmt(d.dailyHighMg)}`:''} mg/day ÷ ${fmt(d.frequency)} doses/day = <b>${esc(dose)}</b>.</p></div></div>`);
} else if(normalizedType==='mg_per_kg_per_dose'||normalizedType==='weight_based'){
 steps.push(`<div class="calc-step"><span>01</span><div><strong>Weight-based dose calculation</strong><p>${fmt(d.weight)} kg × ${fmt(r.minDose??r.dose??r.doseMgPerKg??r.doseMgPerKgPerDose)}${r.maxDose!=null?`–${fmt(r.maxDose)}`:''} mg/kg/dose = <b>${esc(dose)}</b>.</p></div></div>`);
} else if(normalizedType==='condition_based'&&Array.isArray(d.schedule)){
 steps.push(`<div class="calc-step"><span>01</span><div><strong>Scheduled regimen</strong><p>The configured condition-based schedule was applied using the entered weight of <b>${fmt(d.weight)} kg</b>.</p></div></div>`);
 d.schedule.forEach((s,i)=>steps.push(`<div class="calc-step"><span>${String(i+2).padStart(2,'0')}</span><div><strong>${esc(s.dayRange||`Step ${i+1}`)}</strong><p>${fmt(s.doseMgPerKg)} mg/kg × ${fmt(d.weight)} kg = <b>${fmt(s.doseMg)} mg</b> = <b>${fmt(s.doseMl)} mL</b>.</p></div></div>`));
} else {
 steps.push(`<div class="calc-step"><span>01</span><div><strong>Configured regimen</strong><p>The selected pediatric regimen produced <b>${esc(dose)}</b>.</p></div></div>`);
}
if(d.maximumApplied!=null)steps.push(`<div class="calc-step"><span>${String(steps.length+1).padStart(2,'0')}</span><div><strong>Maximum-dose check</strong><p>Configured maximum applied: <b>${fmt(d.maximumApplied)} mg/day</b>.</p></div></div>`);
if(d.lowMl!=null)steps.push(`<div class="calc-step"><span>${String(steps.length+1).padStart(2,'0')}</span><div><strong>mg → mL conversion</strong><p>${fmt(d.lowMg)} mg ÷ ${fmt(d.mgPerMl)} mg/mL = <b>${fmt(d.lowMl)} mL</b>.</p></div></div>`);
const alternative=d.alternativeFrequency&&d.alternativeLowMg!=null?`${fmt(d.alternativeLowMg)}${d.alternativeHighMg!==d.alternativeLowMg?`–${fmt(d.alternativeHighMg)}`:''} mg/dose${d.alternativeLowMl!=null?` (${fmt(d.alternativeLowMl)}${d.alternativeHighMl!==d.alternativeLowMl?`–${fmt(d.alternativeHighMl)}`:''} mL/dose)`:''}`:null;
const maxDaily=r.maximumDailyDose??r.maxDailyDoseMg??r.maxDailyDose??m.maximumDailyDose;
root.innerHTML=`
<article class="glass-card result-card">
 <p class="eyebrow">PATIENT INFORMATION</p>
 <div class="info-grid">
  <div><span>Medicine</span><strong>${esc(m.name)}</strong></div>
  <div><span>Condition / regimen</span><strong>${esc(r.condition||'Pediatric dose')}</strong></div>
  <div><span>Age</span><strong>${esc(ageText(d.age,d.ageUnit))}</strong></div>
  <div><span>Weight</span><strong>${d.weight!=null?`${fmt(d.weight)} kg`:'Not provided'}</strong></div>
  <div><span>Concentration</span><strong>${esc(conc||'Not specified')}</strong></div>
  <div><span>Frequency</span><strong>${esc(freq)}</strong></div>
 </div>
 <div class="dose-output"><strong>${esc(dose)}</strong><strong>${esc(vol)}</strong></div>
</article>
<article class="glass-card result-card">
 <p class="eyebrow">STEP-BY-STEP CALCULATION</p>
 <div class="calculation-list">${steps.join('')}</div>
 ${alternative?`<div class="result-meta"><span>Alternative frequency</span><strong>${fmt(d.alternativeFrequency)} times daily — ${esc(alternative)}</strong></div>`:''}
</article>
<article class="glass-card result-card">
 <p class="eyebrow">ADDITIONAL DETAILS</p>
 <h1 class="medicine-heading">${esc(m.name)}</h1>
 <div class="info-grid">
  <div><span>Active ingredient</span><strong>${esc(m.activeIngredient||'Not configured')}</strong></div>
  <div><span>Drug class</span><strong>${esc(info.class||'Not configured')}</strong></div>
  <div><span>Frequency</span><strong>${esc(freq)}</strong></div>
  <div><span>Maximum daily dose</span><strong>${maxDaily!=null?`${fmt(maxDaily)} mg/day`:'See source label'}</strong></div>
  <div><span>Calculated daily dose</span><strong>${d.dailyLowMg!=null?(d.dailyLowMg===d.dailyHighMg?`${fmt(d.dailyLowMg)} mg/day`:`${fmt(d.dailyLowMg)}–${fmt(d.dailyHighMg)} mg/day`):'See regimen'}</strong></div>
 </div>
 <div class="info-block"><span>Mechanism of action</span><p>${esc(mechanism)}</p></div>
 <div class="info-block"><span>Indications</span><p>${esc((info.indications||[]).join(' • ')||'Not configured')}</p></div>
 <div class="info-block"><span>Precautions & warnings</span><p>${esc(precautions.join(' • ')||'Not configured')}</p></div>
 <div class="info-block"><span>Adverse effects</span><p>${esc(adverseEffects.join(' • ')||'Not configured')}</p></div>
 ${interactions.length?`<div class="info-block"><span>Interactions</span><p>${esc(interactions.join(' • '))}</p></div>`:''}
 <div class="info-block"><span>Notes</span><p>${esc(info.notes||'')}</p></div>
 <div class="sources"><p class="eyebrow">SOURCES & REFERENCES</p>${refs||'<p>No source record attached.</p>'}</div>
</article>`;
})();
