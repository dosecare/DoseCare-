/* DoseCare V2 — guards for weight-scaled maximum doses. */
(function(global){
  'use strict';
  const engine=global.DoseCareDosingEngine;
  if(!engine||typeof engine.calculate!=='function') return;
  const original=engine.calculate.bind(engine);
  function n(v){const x=Number(v);return Number.isFinite(x)?x:null;}
  function mgPerMl(f){
    if(!f)return null;
    if(n(f.mgPerMl)>0)return n(f.mgPerMl);
    if(n(f.mgPer5mL)>0)return n(f.mgPer5mL)/5;
    const c=f.concentration;
    return c&&n(c.amount)>0&&n(c.volume)>0?n(c.amount)/n(c.volume):null;
  }
  function calculate(args){
    const r=args?.regimen, w=n(args?.weight);
    const type=r?.type==='mg_per_kg_day'?'mg_per_kg_per_day':r?.type==='mg_per_kg_single_dose'?'mg_per_kg_per_dose':r?.type;
    if(!r||w===null||w<=0||!['mg_per_kg_per_dose','mg_per_kg_per_day'].includes(type)) return original(args);
    const result=original(args);
    if(!result?.ok)return result;
    const frequency=n(r.frequency??r.dosesPerDay??r.frequencyPerDay??1)||1;
    const min=n(r.minDose??r.dose??r.doseMgPerKg??r.doseMgPerKgPerDose??r.doseMgPerKgPerDay);
    const max=n(r.maxDose??r.dose??r.doseMgPerKg??r.doseMgPerKgPerDose??r.doseMgPerKgPerDay);
    if(min===null||max===null)return result;
    let lowMg,highMg,dailyLowMg,dailyHighMg;
    if(type==='mg_per_kg_per_day'){
      dailyLowMg=w*min; dailyHighMg=w*max; lowMg=dailyLowMg/frequency; highMg=dailyHighMg/frequency;
    }else{
      lowMg=w*min; highMg=w*max; dailyLowMg=lowMg*frequency; dailyHighMg=highMg*frequency;
    }
    const maxDaily=n(r.maximumDailyDose??r.maxDailyDoseMg??r.maxDailyDose);
    const maxDailyUnit=String(r.maximumDailyDoseUnit||'').toLowerCase();
    const dailyLimit=maxDaily!==null&&/mg\s*\/\s*kg\s*\/\s*day|mg\s*\/\s*kg\s*per\s*day/.test(maxDailyUnit)?maxDaily*w:maxDaily;
    let applied=null;
    if(dailyLimit!==null&&dailyHighMg>dailyLimit){
      dailyLowMg=Math.min(dailyLowMg,dailyLimit);
      dailyHighMg=dailyLimit;
      lowMg=dailyLowMg/frequency;
      highMg=dailyHighMg/frequency;
      applied=dailyLimit;
    }
    const maxAdmin=n(r.maximumDosePerAdministration??r.maxDoseMgPerAdministration??r.maxDosePerAdministration??r.maximumDose??r.maxDoseMg);
    const maxAdminUnit=String(r.maximumDosePerAdministrationUnit||r.maxDoseMgPerAdministrationUnit||'').toLowerCase();
    const adminLimit=maxAdmin!==null&&/mg\s*\/\s*kg\s*\/\s*dose|mg\s*\/\s*kg\s*per\s*dose/.test(maxAdminUnit)?maxAdmin*w:maxAdmin;
    if(adminLimit!==null&&highMg>adminLimit){
      highMg=adminLimit;
      if(lowMg>adminLimit)lowMg=adminLimit;
      dailyLowMg=lowMg*frequency;
      dailyHighMg=highMg*frequency;
      applied=applied??dailyHighMg;
    }
    const concentration=mgPerMl(args.formulation);
    return {...result,lowMg,highMg,dailyLowMg,dailyHighMg,lowMl:concentration?lowMg/concentration:result.lowMl,highMl:concentration?highMg/concentration:result.highMl,maximumApplied:applied};
  }
  global.DoseCareDosingEngine=Object.freeze({calculate});
})(window);
