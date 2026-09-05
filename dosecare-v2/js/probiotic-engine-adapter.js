/* DoseCare V2 — product-specific probiotic dosing adapter. */
(function(global){
  'use strict';
  const engine=global.DoseCareDosingEngine;
  if(!engine||typeof engine.calculate!=='function') return;
  const original=engine.calculate.bind(engine);
  const n=v=>{const x=Number(v);return Number.isFinite(x)?x:null;};
  function calculate(args){
    const r=args?.regimen;
    if(!r||!/^probiotic_(fixed|product)$/.test(String(r.type||''))) return original(args);
    const f=args.formulation||{};
    if(!f.probioticBased) return {ok:false,error:'The selected probiotic preparation is not configured safely.',code:'INVALID_FORMULATION'};
    if(r.type==='probiotic_product'){
      const age=n(args.age);
      const minAge=n(r.minAgeYears ?? f.minimumAgeYears);
      if(age===null||age<0) return {ok:false,error:'A valid age is required for this probiotic product.',code:'INVALID_AGE'};
      if(minAge!==null&&age<minAge) return {ok:false,error:`This product is labeled for children aged ${minAge} year(s) and older.`,code:'AGE_OUT_OF_RANGE'};
      const adminMin=n(r.administrationMin),adminMax=n(r.administrationMax);
      const cfuPerPacket=n(f.sachetContent?.lggCfu);
      if(adminMin===null||adminMax===null||adminMin<0||adminMax<adminMin||cfuPerPacket===null||cfuPerPacket<=0) return {ok:false,error:'The selected probiotic product is missing a safe packet dose.',code:'INVALID_PRODUCT_DOSE'};
      return {ok:true,medicineId:args.medicine.id,medicine:args.medicine,regimen:r,formulation:f,weight:null,age,ageUnit:args.ageUnit,frequency:1,frequencyText:r.frequencyText||null,lowProbiotic:n(r.doseMin),highProbiotic:n(r.doseMax),doseUnit:r.doseUnit||'CFU/day',administrationMin:adminMin,administrationMax:adminMax,administrationUnit:r.administrationUnit||'packet/day',productStrengthCfu:cfuPerPacket,durationDays:r.durationDays??null,calculationType:'probiotic_product',concentrationText:f.display||null};
    }
    const low=n(r.doseMin),high=n(r.doseMax);
    if(low===null||high===null||low<0||high<low) return {ok:false,error:'The configured probiotic dose cannot be calculated safely.',code:'INVALID_DOSE'};
    return {ok:true,medicineId:args.medicine.id,medicine:args.medicine,regimen:r,formulation:f,weight:null,age:n(args.age),ageUnit:args.ageUnit,frequency:null,frequencyText:r.frequencyText||null,lowProbiotic:low,highProbiotic:high,doseUnit:r.doseUnit||f.doseUnit||null,durationDays:r.durationDays??null,calculationType:'probiotic_fixed',concentrationText:f.display||null};
  }
  global.DoseCareProbiotic=Object.freeze({calculate});
  engine.calculate=calculate;
})(window);