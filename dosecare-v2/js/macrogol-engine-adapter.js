/* DoseCare V2 — sachet-based dosing adapter. */
(function(global){
  'use strict';
  const engine=global.DoseCareDosingEngine;
  if(!engine||typeof engine.calculate!=='function') return;
  const original=engine.calculate.bind(engine);
  const n=v=>{const x=Number(v);return Number.isFinite(x)?x:null;};
  const months=(age,unit)=>{const x=n(age);if(x===null||x<0)return null;if(unit==='years')return x*12;if(unit==='weeks')return x/4.34524;return x;};
  const bounds=(r,a,u)=>{const m=months(a,u);if(m===null)return {ok:false,error:'Enter a valid child age.',code:'INVALID_AGE'};if(r.minAgeMonths!==undefined&&m<Number(r.minAgeMonths))return {ok:false,error:`This regimen is not configured for children younger than ${r.minAgeMonths} months.`,code:'AGE_BELOW_REGIMEN_MIN'};if(r.maxAgeMonths!==undefined&&m>Number(r.maxAgeMonths))return {ok:false,error:`This regimen is not configured for children older than ${r.maxAgeMonths} months.`,code:'AGE_ABOVE_REGIMEN_MAX'};return null;};
  function calculate(args){
    const r=args?.regimen;
    if(!r||!String(r.type||'').startsWith('sachet_')) return original(args);
    const b=bounds(r,args.age,args.ageUnit);if(b)return b;
    const f=args.formulation||{};
    if(!f.sachetBased)return {ok:false,error:'The selected sachet formulation is not configured safely.',code:'INVALID_FORMULATION'};
    if(r.type==='sachet_age_based'){
      const low=n(r.doseMin??r.minDose??r.dose),high=n(r.doseMax??r.maxDose??r.dose);
      if(low===null||high===null||low<0||high<low)return {ok:false,error:'The configured sachet dose cannot be calculated safely.',code:'INVALID_DOSE'};
      return {ok:true,medicineId:args.medicine.id,medicine:args.medicine,regimen:r,formulation:f,weight:null,age:n(args.age),ageUnit:args.ageUnit,frequency:n(r.frequency)||1,frequencyText:r.frequencyText||null,lowSachets:low,highSachets:high,dailyLowSachets:low,dailyHighSachets:high,maximumSachetsPerDay:n(r.normalMaximum??r.maxSachetsPerDay),calculationType:'sachet_age_based',concentrationText:f.display||null};
    }
    if(r.type==='sachet_schedule'){
      const schedule=(r.schedule||[]).map((s,i)=>{const dose=n(s.doseSachets??s.sachets??s.dose);return dose===null||dose<0?null:{index:i+1,dayRange:s.dayRange||`Day ${i+1}`,doseSachets:dose};}).filter(Boolean);
      if(!schedule.length)return {ok:false,error:'The sachet schedule is not configured safely.',code:'INVALID_SCHEDULE'};
      return {ok:true,medicineId:args.medicine.id,medicine:args.medicine,regimen:r,formulation:f,weight:null,age:n(args.age),ageUnit:args.ageUnit,frequency:null,frequencyText:r.frequencyText||null,schedule,scheduleTotalSachets:schedule.reduce((sum,s)=>sum+s.doseSachets,0),calculationType:'sachet_schedule',concentrationText:f.display||null};
    }
    return original(args);
  }
  global.DoseCareMacrogol=Object.freeze({calculate});
  engine.calculate=calculate;
})(window);
