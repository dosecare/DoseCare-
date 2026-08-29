/* DoseCare V2 — deterministic dose calculations. Medical data stays in data files. */
(function (global) {
  'use strict';
  function fail(error) { return { ok:false, error }; }
  function num(value) { const n=Number(value); return Number.isFinite(n) ? n : null; }
  function ageMonths(value, unit) { const n=num(value); if(n===null || n<0) return null; return unit==='years' ? n*12 : n; }
  function concentrationToMgPerMl(formulation) {
    if (!formulation) return null;
    if (num(formulation.mgPerMl)>0) return num(formulation.mgPerMl);
    if (num(formulation.mgPer5mL)>0) return num(formulation.mgPer5mL)/5;
    if (formulation.concentration && num(formulation.concentration.amount)>0 && num(formulation.concentration.volume)>0) return num(formulation.concentration.amount)/num(formulation.concentration.volume);
    return null;
  }
  function inLimits(medicine, age, weight) {
    const p=medicine.pediatric||{};
    const months=ageMonths(age?.value, age?.unit);
    if(p.minimumMonths!=null && (months===null || months<p.minimumMonths)) return `Age is below the configured minimum of ${p.minimumMonths} months.`;
    if(p.maximumMonths!=null && (months===null || months>p.maximumMonths)) return `Age is above the configured maximum of ${p.maximumMonths} months.`;
    if(p.maximumYears!=null && (months===null || months>p.maximumYears*12)) return `Age is above the configured maximum of ${p.maximumYears} years.`;
    if(p.minimumWeightKg!=null && (weight===null || weight<p.minimumWeightKg)) return `Weight is below the configured minimum of ${p.minimumWeightKg} kg.`;
    if(p.maximumWeightKg!=null && (weight===null || weight>p.maximumWeightKg)) return `Weight is above the configured maximum of ${p.maximumWeightKg} kg.`;
    return null;
  }
  function calculate({medicine, regimen, age, ageUnit, weight, formulation}) {
    if(!medicine || !regimen) return fail('A medicine and a valid regimen are required.');
    const w=num(weight), a=num(age);
    if(w===null || w<=0) return fail('Enter a valid child weight in kg.');
    const limitError=inLimits(medicine,{value:a,unit:ageUnit},w);
    if(limitError) return fail(limitError);
    const min=num(regimen.minDose ?? regimen.dose), max=num(regimen.maxDose ?? regimen.dose);
    if(min===null || max===null || min<0 || max<min) return fail('The configured dose cannot be calculated safely.');
    const type=regimen.type;
    const frequency=num(regimen.frequency);
    if(!frequency || frequency<=0) return fail('The regimen frequency is missing or invalid.');
    let lowMg, highMg, dailyLowMg, dailyHighMg;
    if(type==='mg_per_kg_per_day') {
      dailyLowMg=w*min; dailyHighMg=w*max;
      lowMg=dailyLowMg/frequency; highMg=dailyHighMg/frequency;
    } else if(type==='mg_per_kg_per_dose') {
      lowMg=w*min; highMg=w*max;
      dailyLowMg=lowMg*frequency; dailyHighMg=highMg*frequency;
    } else return fail(`Unsupported dosing type: ${type || 'unknown'}.`);
    const maximumDaily=num(regimen.maximumDailyDose ?? medicine.maximumDailyDose);
    let maximumApplied=null;
    if(maximumDaily!==null && dailyHighMg>maximumDaily) {
      const cappedDaily=Math.min(dailyLowMg,maximumDaily);
      const cappedHigh=Math.min(dailyHighMg,maximumDaily);
      lowMg=cappedDaily/frequency; highMg=cappedHigh/frequency; maximumApplied=maximumDaily;
    }
    const mgPerMl=concentrationToMgPerMl(formulation);
    const lowMl=mgPerMl ? lowMg/mgPerMl : null;
    const highMl=mgPerMl ? highMg/mgPerMl : null;
    return {ok:true, medicineId:medicine.id, regimen, weight:w, age:a, ageUnit, frequency, lowMg, highMg, dailyLowMg, dailyHighMg, lowMl, highMl, mgPerMl, maximumApplied, concentrationText: formulation?.display || formulation?.concentration || null};
  }
  global.DoseCareDosingEngine={calculate};
})(window);
