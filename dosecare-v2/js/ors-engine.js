/* DoseCare V2 — ORS volume calculation helper. */
(function(global){
  'use strict';
  const n=v=>Number.isFinite(Number(v))?Number(v):null;
  const months=(v,u)=>{const x=n(v);if(x===null||x<0)return null;if(u==='years')return x*12;if(u==='weeks')return x/4.34524;return x;};
  function calculate({medicine,regimen,age,ageUnit,weight,formulation}){
    if(!medicine||!regimen)return {ok:false,error:'A medicine and a valid regimen are required.',code:'MISSING_REGIMEN'};
    const a=n(age), w=n(weight);
    if(regimen.type==='volume_by_age'){
      if(a===null||a<0)return {ok:false,error:'Enter a valid child age.',code:'INVALID_AGE'};
      const m=months(a,ageUnit); if(regimen.minAgeMonths!==undefined&&m<Number(regimen.minAgeMonths))return {ok:false,error:'This regimen is not configured for the entered age.',code:'AGE_BELOW_REGIMEN_MIN'};
      if(regimen.maxAgeMonths!==undefined&&m>Number(regimen.maxAgeMonths))return {ok:false,error:'This regimen is not configured for the entered age.',code:'AGE_ABOVE_REGIMEN_MAX'};
      const low=n(regimen.minVolumeMl),high=n(regimen.maxVolumeMl); if(low===null||high===null||low<0||high<low)return {ok:false,error:'The configured ORS volume range is invalid.',code:'INVALID_VOLUME'};
      return {ok:true,medicineId:medicine.id,regimen,weight:null,age:a,ageUnit,frequencyText:regimen.frequencyText||null,frequency:null,lowMg:null,highMg:null,lowMl:low,highMl:high,dailyLowMg:null,dailyHighMg:null,mgPerMl:null,maximumApplied:null,calculationType:'volume_by_age',concentrationText:formulation?.display||null,displayDose:`${low}–${high} mL`,volumeInstruction:'after each loose stool'};
    }
    if(regimen.type==='volume_per_kg'){
      if(w===null||w<=0)return {ok:false,error:'Enter a valid child weight in kg.',code:'INVALID_WEIGHT'};
      const perKg=n(regimen.volumeMlPerKg),duration=n(regimen.durationHours); if(perKg===null||perKg<=0||duration===null||duration<=0)return {ok:false,error:'The configured ORS volume regimen is invalid.',code:'INVALID_VOLUME'};
      const total=w*perKg; return {ok:true,medicineId:medicine.id,regimen,weight:w,age:a,ageUnit,frequencyText:regimen.frequencyText||null,frequency:null,lowMg:null,highMg:null,lowMl:total,highMl:total,dailyLowMg:null,dailyHighMg:null,mgPerMl:null,maximumApplied:null,calculationType:'volume_per_kg',concentrationText:formulation?.display||null,displayDose:`${total} mL total`,volumeInstruction:`over ${duration} hours (about ${total/duration} mL/hour)`};
    }
    return null;
  }
  global.DoseCareORS = Object.freeze({calculate});
})(window);
