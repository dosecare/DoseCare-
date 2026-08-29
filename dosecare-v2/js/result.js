/* DoseCare V2 — result page renderer. */
(function(){
'use strict';
const root=document.getElementById('result-stack');
const raw=sessionStorage.getItem('dosecareV2Result');
const esc=v=>String(v??'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));
const fmt=v=>Number.isFinite(Number(v))?Number(v).toFixed(2).replace(/\.00$/,'').replace(/(\.\d)0$/,'$1'):'—';
if(!raw){root.innerHTML='<article class="glass-card"><h1>No calculation found</h1><p>Return to the calculator and enter patient information.</p><a class="primary-button" href="calculator.html">BACK TO CALCULATOR</a></article>';return;}
let d;try{d=JSON.parse(raw);}catch{d=null;}
if(!d?.medicine||!d?.regimen||!d.ok){root.innerHTML='<article class="glass-card"><h1>Result unavailable</h1><p>The calculation could not be read safely.</p></article>';return;}
const m=d.medicine,r=d.regimen,info=m.information||{};
const dose=d.lowMg===d.highMg?`${fmt(d.lowMg)} mg/dose`:`${fmt(d.lowMg)}–${fmt(d.highMg)} mg/dose`;
const vol=d.lowMl==null?'Not available':(d.lowMl===d.highMl?`${fmt(d.lowMl)} mL/dose`:`${fmt(d.lowMl)}–${fmt(d.highMl)} mL/dose`);
const freq=r.frequencyText||`${d.frequency} times daily`,conc=d.concentrationText||'';
const refs=(m.sources||[]).map(x=>`<a class="reference-item" href="${esc(x.url)}" target="_blank" rel="noopener noreferrer"><span>${esc(x.organization||'Source')}</span><strong>${esc(x.title||'Reference')}</strong></a>`).join('');
const steps=[];
if(r.type==='label_weight_age_based') steps.push(`<div class="calc-step"><span>01</span><div><strong>Label dose selection</strong><p>The dose was selected from the configured pediatric weight/age table for <b>${fmt(d.weight)} kg</b> (${fmt(d.weightLb)} lb).</p></div></div>`);
else if(r.type==='mg_per_kg_per_day') {
 steps.push(`<div class="calc-step"><span>01</span><div><strong>Daily dose calculation</strong><p>${fmt(d.weight)} kg × ${fmt(r.minDose)}–${fmt(r.maxDose)} mg/kg/day = <b>${fmt(d.dailyLowMg)}–${fmt(d.dailyHighMg)} mg/day</b>.</p></div></div>`);
 steps.push(`<div class="calc-step"><span>02</span><div><strong>Divide by frequency</strong><p>${fmt(d.dailyLowMg)}–${fmt(d.dailyHighMg)} mg/day ÷ ${fmt(d.frequency)} doses/day = <b>${esc(dose)}</b>.</p></div></div>`);
} else steps.push(`<div class="calc-step"><span>01</span><div><strong>Dose calculation</strong><p>${fmt(d.weight)} kg × ${fmt(r.minDose??r.dose)}${r.maxDose!=null?`–${fmt(r.maxDose)}`:''} mg/kg/dose = <b>${esc(dose)}</b>.</p></div></div>`);
if(d.maximumApplied!=null) steps.push(`<div class="calc-step"><span>${String(steps.length+1).padStart(2,'0')}</span><div><strong>Maximum-dose check</strong><p>Configured maximum daily dose applied: <b>${fmt(d.maximumApplied)} mg/day</b>.</p></div></div>`);
if(d.lowMl!=null) steps.push(`<div class="calc-step"><span>${String(steps.length+1).padStart(2,'0')}</span><div><strong>mg → mL conversion</strong><p>${fmt(d.lowMg)} mg ÷ ${fmt(d.mgPerMl)} mg/mL = <b>${fmt(d.lowMl)} mL</b>.</p></div></div>`);
root.innerHTML=`<article class="glass-card result-card"><p class="eyebrow">DOSE RESULT</p><div class="result-title-row"><h1>${esc(m.name)}</h1><span>${esc(r.condition||'Pediatric dose')}</span></div><div class="dose-output"><strong>${esc(dose)}</strong><strong>${esc(vol)}</strong></div><div class="result-meta"><span>Frequency</span><strong>${esc(freq)}</strong></div>${conc?`<div class="result-meta"><span>Concentration</span><strong>${esc(conc)}</strong></div>`:''}</article><article class="glass-card result-card"><p class="eyebrow">CALCULATION DETAILS</p><div class="calculation-list">${steps.join('')}</div></article><article class="glass-card result-card"><p class="eyebrow">MEDICINE INFORMATION</p><h1 class="medicine-heading">${esc(m.name)}</h1><div class="info-grid"><div><span>Active ingredient</span><strong>${esc(m.activeIngredient)}</strong></div><div><span>Drug class</span><strong>${esc(info.class||'Not configured')}</strong></div><div><span>Frequency</span><strong>${esc(freq)}</strong></div><div><span>Maximum doses / 24 h</span><strong>${r.maximumDosesPer24Hours!=null?esc(r.maximumDosesPer24Hours):'See source label'}</strong></div></div><div class="info-block"><span>Mechanism of action</span><p>${esc(info.mechanism||'Not configured')}</p></div><div class="info-block"><span>Indications</span><p>${esc((info.indications||[]).join(' • '))}</p></div><div class="info-block"><span>Precautions</span><p>${esc((info.precautions||[]).join(' • '))}</p></div><div class="info-block"><span>Adverse effects</span><p>${esc((info.adverseEffects||[]).join(' • '))}</p></div><div class="info-block"><span>Notes</span><p>${esc(info.notes||'')}</p></div><div class="sources"><p class="eyebrow">SOURCES & REFERENCES</p>${refs||'<p>No source record attached.</p>'}</div></article>`;
})();
