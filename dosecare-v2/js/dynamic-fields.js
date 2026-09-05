/* DoseCare V2 — dynamic calculator fields. */
(function () {
  'use strict';
  function init() {
    const db=window.DoseCareV2Database, medicine=document.getElementById('medicine-select'), condition=document.getElementById('condition-field'), conditionSelect=document.getElementById('condition-select'), ageField=document.getElementById('age-value')?.closest('.field'), weightField=document.getElementById('weight-value')?.closest('.field'), frequency=document.getElementById('frequency-field'), frequencySelect=document.getElementById('frequency-select');
    if(!db||!medicine||!conditionSelect)return;
    const groups=rs=>{const m=new Map();rs.forEach(r=>{const k=r.condition||r.conditions?.[0]||r.id;if(!m.has(k))m.set(k,[]);m.get(k).push(r)});return [...m.entries()]};
    const ageMonths=()=>{const v=Number(document.getElementById('age-value')?.value),u=document.getElementById('age-unit')?.value;if(!Number.isFinite(v)||v<0)return null;return u==='years'?v*12:u==='weeks'?v/4.34524:v};
    const matchesAge=r=>{const a=ageMonths();if(a===null)return false;let min=r.minAgeMonths,max=r.maxAgeMonths;if(r.minAgeYears!==undefined)min=Number(r.minAgeYears)*12;if(r.maxAgeYears!==undefined)max=Number(r.maxAgeYears)*12;return (min===undefined||a>=Number(min))&&(max===undefined||a<=Number(max))};
    const req=r=>{if(!r)return{age:false,weight:false};const bounds=['minAgeWeeks','maxAgeWeeks','minAgeMonths','maxAgeMonths','minAgeYears','maxAgeYears'].some(k=>r[k]!==undefined);return{age:r.requiresAge??(bounds||['age_based','label_age_based','label_weight_age_based','volume_by_age','volume_per_kg','sachet_age_based','sachet_schedule','probiotic_product'].includes(r.type)),weight:r.requiresWeight??['mg_per_kg_per_day','mg_per_kg_day','mg_per_kg_per_dose','mg_per_kg_single_dose','weight_based','label_weight_age_based','volume_per_kg'].includes(r.type)}};
    const show=(x,v)=>{if(x)x.hidden=!v};
    function update(){
      const m=db.getById(medicine.value);if(!m){show(ageField,false);show(weightField,false);show(frequency,false);return}
      const gs=groups(m.regimens||[]),multipleConditions=gs.length>1;show(condition,multipleConditions);
      if(!multipleConditions&&gs.length===1)conditionSelect.value=gs[0][0];
      if(multipleConditions&&!conditionSelect.value){show(ageField,false);show(weightField,false);show(frequency,false);return}
      const g=gs.find(([k])=>k===conditionSelect.value)?.[1]||[],ageMatches=g.filter(matchesAge),r=ageMatches.length===1?ageMatches[0]:(frequencySelect?.value?g.find(x=>x.id===frequencySelect.value)||g[0]:g[0]);
      const needsFrequency=g.length>1&&ageMatches.length!==1;show(frequency,needsFrequency);
      if(needsFrequency&&frequencySelect){frequencySelect.innerHTML='';g.forEach(x=>{const o=document.createElement('option');o.value=x.id;o.textContent=x.frequencyText||x.id;frequencySelect.appendChild(o)});if(r)frequencySelect.value=r.id}
      const q=req(r);show(ageField,q.age);show(weightField,q.weight);
      if(!q.age)document.getElementById('age-value').value='';if(!q.weight)document.getElementById('weight-value').value='';
    }
    medicine.addEventListener('change',update);conditionSelect.addEventListener('change',update);document.getElementById('age-value')?.addEventListener('input',update);document.getElementById('age-unit')?.addEventListener('change',update);frequencySelect?.addEventListener('change',update);update();
  }
  if(window.DoseCareV2Ready)init();else document.addEventListener('dosecare:v2-ready',init,{once:true});
})();
