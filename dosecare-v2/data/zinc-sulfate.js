/* DoseCare V2 — Zinc sulfate pediatric oral liquid record. */
(function(global){
  'use strict';
  global.DoseCareV2Database.register({
    id:'zinc-sulfate',
    name:'Zinc Sulfate',
    genericName:'Zinc sulfate',
    activeIngredient:'Elemental zinc (as zinc sulfate)',
    drugClass:'Mineral / micronutrient supplement',
    dosageForm:'Syrup / oral solution',
    route:'Oral',
    formulations:[
      {id:'zinc-10mg-5ml',display:'Zinc sulfate oral solution — 10 mg elemental zinc/5 mL',concentration:{amount:10,unit:'mg',volume:5,volumeUnit:'mL'}}
    ],
    regimens:[
      {
        id:'acute-diarrhea-under-6-months',
        condition:'Acute diarrhea — adjunct to ORS',
        type:'label_age_based',
        minAgeMonths:0,
        maxAgeMonths:5.999,
        requiresAge:true,
        requiresWeight:false,
        minDose:10,
        maxDose:10,
        doseUnit:'mg elemental zinc/day',
        frequency:1,
        frequencyText:'Once daily for 10–14 days',
        durationDays:'10–14',
        allowedFormulations:['zinc-10mg-5ml']
      },
      {
        id:'acute-diarrhea-6-months-to-5-years',
        condition:'Acute diarrhea — adjunct to ORS',
        type:'label_age_based',
        minAgeMonths:6,
        maxAgeMonths:59.999,
        requiresAge:true,
        requiresWeight:false,
        minDose:20,
        maxDose:20,
        doseUnit:'mg elemental zinc/day',
        frequency:1,
        frequencyText:'Once daily for 10–14 days',
        durationDays:'10–14',
        allowedFormulations:['zinc-10mg-5ml']
      }
    ],
    information:{
      class:'Mineral / micronutrient supplement',
      indications:['Adjunct to oral rehydration therapy (ORS) for acute watery or persistent diarrhea in children.'],
      mechanism:'Zinc is an essential micronutrient involved in cellular growth, differentiation, protein synthesis, immune function, and intestinal transport of water and electrolytes. The mechanisms by which zinc shortens diarrhea are not fully understood.',
      precautions:['Use as an adjunct to ORS; zinc does not replace rehydration therapy.','Zinc may accumulate in renal failure.','Separate zinc from iron salts when clinically appropriate because concurrent administration can reduce absorption; follow product or local guidance.'],
      warningsPrecautions:['Hypersensitivity to zinc or excipients.','Copper deficiency is a contraindication in the WHO-prequalified 10 mg/5 mL product.'],
      adverseEffects:['Nausea','Vomiting','Abdominal discomfort'],
      interactions:['Iron salts may interfere with zinc absorption when administered together.'],
      notes:'Dose is expressed as elemental zinc, not the mass of zinc sulfate salt. Give once daily for 10–14 days. If vomiting occurs within 30 minutes, the WHO-prequalified product information recommends repeating the dose.',
      sources:[
        {organization:'World Health Organization',title:'Zinc supplementation in the management of diarrhoea',url:'https://www.who.int/tools/elena/interventions/zinc-diarrhoea'},
        {organization:'World Health Organization',title:'Zinc (as sulfate) 10 mg/5 mL oral solution — WHOPAR Part 4',url:'https://extranet.who.int/prequal/sites/default/files/whopar_files/DI010part4v2.pdf'},
        {organization:'World Health Organization',title:'Specifications of zinc products for use in the management of diarrhoea',url:'https://www.emro.who.int/images/stories/cah/documents/news/2007/zinc_preparations.pdf'}
      ]
    },
    sources:[
      {organization:'World Health Organization',title:'Zinc supplementation in the management of diarrhoea',url:'https://www.who.int/tools/elena/interventions/zinc-diarrhoea'},
      {organization:'World Health Organization',title:'Zinc (as sulfate) 10 mg/5 mL oral solution — WHOPAR Part 4',url:'https://extranet.who.int/prequal/sites/default/files/whopar_files/DI010part4v2.pdf'},
      {organization:'World Health Organization',title:'Specifications of zinc products for use in the management of diarrhoea',url:'https://www.emro.who.int/images/stories/cah/documents/news/2007/zinc_preparations.pdf'}
    ]
  });
})(window);