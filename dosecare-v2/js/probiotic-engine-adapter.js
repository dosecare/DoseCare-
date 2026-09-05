/* DoseCare V2 — strain-specific probiotic dosing adapter. */
(function(global){
  'use strict';
  const engine=global.DoseCareDosingEngine;
  if(!engine||typeof engine.calculate!=='function') return;
  const original=engine.calculate.bind(engine);
  const n=v=>{const x=Number(v);return Number.isFinite(x)?x:null;};
  function calculate(args){
    const r=args?.regimen;
    if(!r||r.type!=='probiotic_fixed') return original(args);
    const f=args.formulation||{};
    if(!f.probioticBased) return {ok:false,error:'The selected probiotic preparation is not configured safely.',code:'INVALID_FORMULATION'};
    const low=n(r.doseMin),high=n(r.doseMax);
    if(low===null||high===null||low<0||high<low) return {ok:false,error:'The configured probiotic dose cannot be calculated safely.',code:'INVALID_DOSE'};
    return {
      ok:true,
      medicineId:args.medicine.id,
      medicine:args.medicine,
      regimen:r,
      formulation:f,
      weight:null,
      age:n(args.age),
      ageUnit:args.ageUnit,
      frequency:null,
      frequencyText:r.frequencyText||null,
      lowProbiotic:low,
      highProbiotic:high,
      doseUnit:r.doseUnit||f.doseUnit||null,
      durationDays:r.durationDays??null,
      calculationType:'probiotic_fixed',
      concentrationText:f.display||null
    };
  }
  global.DoseCareProbiotic=Object.freeze({calculate});
  engine.calculate=calculate;
})(window);
