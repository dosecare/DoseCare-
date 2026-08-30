/* DoseCare V2 — deterministic dose calculations. Medical data stays in data files. */
(function (global) {
  'use strict';
  function fail(error, code='CALCULATION_ERROR') { return { ok:false, error, code }; }
  function num(value) { const n=Number(value); return Number.isFinite(n) ? n : null; }
  function kgToLb(kg) { return kg * 2.2046226218; }
  function ageYears(value, unit) { const n=num(value); if(n===null || n<0) return null; return unit==='months' ? n/12 : n; }
  function concentrationToMgPerMl(formulation) {
    if (!formulation) return null;
    if (num(formulation.mgPerMl)>0) return num(formulation.mgPerMl);
    if (num(formulation.mgPer5mL)>0) return num(formulation.mgPer5mL)/5;
    if (formulation.concentration && num(formulation.concentration.amount)>0 && num(formulation.concentration.volume)>0) return num(formulation.concentration.amount)/num(formulation.concentration.volume);
    return null;
  }
  function calculateLabelWeightAge({medicine, regimen, weight, age, ageUnit, formulation}) {
    const w=num(weight), a=num(age), years=ageYears(a, ageUnit);
    const hasWeight=w!==null && w>0;
    const hasAge=years!==null && years>=0;
    if(!hasWeight && !hasAge) return fail('Enter a valid child weight or age.','MISSING_AGE_OR_WEIGHT');
    if(hasAge && years<2) return {ok:false, code:'CLINICIAN_REVIEW', error:regimen.under24LbMessage, age:a, ageUnit};
    if(hasWeight && kgToLb(w)<24) return {ok:false, code:'CLINICIAN_REVIEW', error:regimen.under24LbMessage, weightKg:w, weightLb:kgToLb(w), age:a, ageUnit};

    const lb=hasWeight?kgToLb(w):null;
    const row=regimen.table.find(item => {
      const weightMatch=!hasWeight || (lb>=item.minLb && lb<=item.maxLb);
      const ageMatch=!hasAge || (years>=item.minAgeYears && years<=item.maxAgeYears);
      return weightMatch && ageMatch;
    });
    if(!row) return fail('The entered age and/or weight do not match a configured labeled dose band. Verify the product label or consult a clinician.','NO_MATCHING_BAND');
    const mgPerMl=concentrationToMgPerMl(formulation);
    if(!mgPerMl) return fail('The selected oral-liquid concentration is not configured safely.','INVALID_CONCENTRATION');
    const lowMl=row.doseMl, highMl=row.doseMl;
    const lowMg=lowMl*mgPerMl, highMg=highMl*mgPerMl;
    return {ok:true, medicineId:medicine.id, regimen, weight:hasWeight?w:null, weightLb:lb, age:hasAge?a:null, ageUnit:hasAge?ageUnit:null, frequencyText:regimen.frequencyText, frequency:null, lowMg, highMg, lowMl, highMl, dailyLowMg:null, dailyHighMg:null, mgPerMl, maximumDosesPer24Hours:regimen.maximumDosesPer24Hours, maximumApplied:null, calculationType:'label_weight_age_based', concentrationText:formulation.display};
  }
  function calculate({medicine, regimen, age, ageUnit, weight, formulation}) {
    if(!medicine || !regimen) return fail('A medicine and a valid regimen are required.','MISSING_REGIMEN');
    if(regimen.type==='label_weight_age_based') return calculateLabelWeightAge({medicine, regimen, weight, age, ageUnit, formulation});

    const needsWeight = regimen.requiresWeight ?? ['mg_per_kg_per_day','mg_per_kg_per_dose','weight_based'].includes(regimen.type);
    const needsAge = regimen.requiresAge ?? ['age_based','label_age_based'].includes(regimen.type);
    const w=num(weight), a=num(age);
    if(needsWeight && (w===null || w<=0)) return fail('Enter a valid child weight in kg.','INVALID_WEIGHT');
    if(needsAge && (a===null || a<0 || !['months','years'].includes(ageUnit))) return fail('Enter a valid child age.','INVALID_AGE');

    const min=num(regimen.minDose ?? regimen.dose), max=num(regimen.maxDose ?? regimen.dose);
    if(min===null || max===null || min<0 || max<min) return fail('The configured dose cannot be calculated safely.','INVALID_DOSE');
    const frequency=num(regimen.frequency);
    if(['mg_per_kg_per_day','mg_per_kg_per_dose'].includes(regimen.type) && (!frequency || frequency<=0)) return fail('The regimen frequency is missing or invalid.','INVALID_FREQUENCY');

    let lowMg, highMg, dailyLowMg=null, dailyHighMg=null;
    if(regimen.type==='mg_per_kg_per_day'){
      dailyLowMg=w*min; dailyHighMg=w*max; lowMg=dailyLowMg/frequency; highMg=dailyHighMg/frequency;
    } else if(regimen.type==='mg_per_kg_per_dose'){
      lowMg=w*min; highMg=w*max; dailyLowMg=lowMg*frequency; dailyHighMg=highMg*frequency;
    } else if(regimen.type==='fixed_dose' || regimen.type==='age_based' || regimen.type==='label_age_based') {
      lowMg=min; highMg=max;
      if(frequency) { dailyLowMg=lowMg*frequency; dailyHighMg=highMg*frequency; }
    } else return fail(`Unsupported dosing type: ${regimen.type || 'unknown'}.`,'UNSUPPORTED_DOSING_TYPE');

    const maximumDaily=num(regimen.maximumDailyDose ?? medicine.maximumDailyDose);
    let maximumApplied=null;
    if(maximumDaily!==null && dailyHighMg!==null && dailyHighMg>maximumDaily && frequency){
      lowMg=Math.min(dailyLowMg,maximumDaily)/frequency;
      highMg=Math.min(dailyHighMg,maximumDaily)/frequency;
      maximumApplied=maximumDaily;
    }
    const mgPerMl=concentrationToMgPerMl(formulation), lowMl=mgPerMl?lowMg/mgPerMl:null, highMl=mgPerMl?highMg/mgPerMl:null;
    return {ok:true,medicineId:medicine.id,regimen,weight:w,age:a,ageUnit,frequency,lowMg,highMg,dailyLowMg,dailyHighMg,lowMl,highMl,mgPerMl,maximumApplied,calculationType:regimen.type,concentrationText:formulation?.display||null};
  }
  global.DoseCareDosingEngine={calculate};
})(window);
