/* DoseCare V2 — Fexofenadine oral suspension
 * Source: DailyMed, fexofenadine hydrochloride oral suspension 30 mg/5 mL.
 * Pediatric labeled OTC directions: children 2 to under 12 years: 5 mL every 12 hours;
 * do not exceed 10 mL in 24 hours. Children under 2: ask a doctor.
 */
(function(global){
  'use strict';
  const db = global.DoseCareV2Database;
  if(!db || typeof db.register !== 'function') throw new Error('DoseCareV2Database is not available');

  db.register({
    id:'fexofenadine',
    name:'Fexofenadine',
    genericName:'Fexofenadine hydrochloride',
    activeIngredient:'Fexofenadine hydrochloride',
    dosageForm:'Oral suspension',
    route:'Oral',
    category:'Antihistamine / Allergy',
    formulations:[{
      id:'fexofenadine-30mg-5ml',
      display:'Fexofenadine 30 mg/5 mL oral suspension',
      concentration:{amount:30,unit:'mg',volume:5,volumeUnit:'mL'}
    }],
    regimens:[{
      id:'allergic-rhinitis-2-11',
      condition:'Allergic rhinitis / upper respiratory allergy symptoms',
      type:'label_age_based',
      minAgeYears:2,
      maxAgeYears:11.999,
      doseMin:30,
      doseMax:30,
      doseUnit:'mg/dose',
      volumeMin:5,
      volumeMax:5,
      volumeUnit:'mL/dose',
      frequency:2,
      dosesPerDay:2,
      frequencyText:'5 mL every 12 hours',
      maximumDailyDose:60,
      maximumDailyDoseUnit:'mg/day',
      maximumDailyVolume:10,
      maximumDailyVolumeUnit:'mL/day',
      requiresAge:true,
      requiresWeight:false,
      allowedFormulations:['fexofenadine-30mg-5ml']
    }],
    notes:[
      'Children under 2 years: ask a doctor; no pediatric regimen is configured in DoseCare for this age group.',
      'Do not take with fruit juices.',
      'Do not take at the same time as aluminum- or magnesium-containing antacids.',
      'Children with kidney disease require medical advice because the dose may differ.'
    ],
    sources:[
      {title:'DailyMed — Fexofenadine Hydrochloride Oral Suspension 30 mg/5 mL',url:'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e8e35d7a-a86b-4d37-979b-f454978f070b'},
      {title:'DailyMed — Children’s Allergy Fexofenadine HCl Suspension, label updated 2026-08-12',url:'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=667c87c2-c594-49e5-92a7-f8aa140642d6'}
    ]
  });
})(window);
