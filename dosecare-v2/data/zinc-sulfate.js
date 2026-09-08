/* DoseCare V2 — Zinc sulfate pediatric oral liquid record. */
(function(global){
  'use strict';
  global.DoseCareV2Database.register({
    id:'zinc-sulfate',
    name:'Zinc Sulfate',
    genericName:'Zinc sulfate',
    activeIngredient:'Elemental zinc (as zinc sulfate)',
    drugClass:'Mineral / micronutrient supplement',
    dosageForm:'Oral solution',
    route:'Oral',
    formulations:[{id:'zinc-10mg-5ml',display:'Zinc sulfate oral solution — 10 mg elemental zinc/5 mL',concentration:{amount:10,unit:'mg',volume:5,volumeUnit:'mL'}}],
    regimens:[{
      id:'diarrhea-up-to-10-years',
      condition:'Acute watery or persistent diarrhea — adjunct to ORS',
      type:'fixed_dose',
      minAgeMonths:0,
      maxAgeMonths:119.999,
      requiresAge:true,
      requiresWeight:false,
      dose:5,
      minDose:5,
      maxDose:5,
      unit:'mg/day',
      frequency:1,
      frequencyText:'2.5 mL once daily for up to 14 days',
      durationDays:'up to 14',
      allowedFormulations:['zinc-10mg-5ml']
    }],
    information:{class:'Mineral / micronutrient supplement',indications:['Adjunctive oral zinc treatment for acute watery or persistent diarrhea in children up to 10 years of age.'],mechanism:'Zinc is an essential micronutrient involved in cellular growth, differentiation, protein synthesis, immune function, and intestinal transport of water and electrolytes.',precautions:['Use as an adjunct to oral rehydration therapy (ORS); zinc does not replace rehydration therapy.','Seek medical assessment for dehydration, blood in stool, severe illness, or persistent symptoms requiring further evaluation.','Dose is expressed as elemental zinc, not the mass of zinc sulfate salt.','Use caution in renal failure because zinc may accumulate.','This formulation contains aspartame, sodium benzoate, and sorbitol; review excipient-specific warnings, including phenylketonuria, newborn jaundice risk, and hereditary fructose intolerance.'],contraindications:['Hypersensitivity to zinc or formulation ingredients.','Copper deficiency.'],interactions:['Zinc can reduce absorption/effect of tetracyclines, quinolone antibiotics, penicillamine, trientine, calcium salts, iron preparations, and some cephalosporins; separate administration by at least 3 hours as directed by the product information.'],adverseEffects:['Nausea','Vomiting','Abdominal discomfort'],administration:'Give orally between meals. If vomiting occurs within 30 minutes, repeat the dose according to the product information. Use an accurate measuring device.',pediatricUse:'WHO recommends 5 mg elemental zinc once daily for up to 14 days for children up to 10 years with acute watery or persistent diarrhea, as adjunctive treatment to rehydration.',notes:'Current WHO guidance suggests 5 mg elemental zinc once daily for up to 14 days for children up to 10 years with acute watery or persistent diarrhea. This guideline-based regimen differs from older WHO 10 mg/20 mg age-based recommendations.',sources:[{organization:'World Health Organization',title:'Guideline on management of pneumonia and diarrhoea in children up to 10 years of age',url:'https://www.who.int/publications/i/item/9789240103412'},{organization:'World Health Organization',title:'Zinc (as sulfate) 10 mg/5 mL oral solution — WHOPAR Part 4',url:'https://extranet.who.int/prequal/sites/default/files/whopar_files/DI010part4v2.pdf'}]},
    sources:[{organization:'World Health Organization',title:'Guideline on management of pneumonia and diarrhoea in children up to 10 years of age',url:'https://www.who.int/publications/i/item/9789240103412'},{organization:'World Health Organization',title:'Zinc (as sulfate) 10 mg/5 mL oral solution — WHOPAR Part 4',url:'https://extranet.who.int/prequal/sites/default/files/whopar_files/DI010part4v2.pdf'}]
  });
})(window);