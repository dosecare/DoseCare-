/* DoseCare V2 — Simethicone oral drops */
(function(global){
  'use strict';
  global.DoseCareV2Database.register({
    id:'simethicone',
    name:'Simethicone',
    genericName:'Simethicone',
    activeIngredient:'Simethicone',
    dosageForm:'Oral drops',
    route:'Oral',
    category:'Gastrointestinal / Antigas',
    formulations:[{
      id:'simethicone-20mg-0.3ml',
      display:'Simethicone 20 mg/0.3 mL oral drops',
      concentration:{amount:20,unit:'mg',volume:0.3,volumeUnit:'mL'}
    }],
    regimens:[
      {
        id:'gas-under-2-years',
        condition:'Gas symptoms',
        type:'label_age_based',
        minAgeYears:0,
        maxAgeYears:1.999,
        doseMin:20,
        doseMax:20,
        doseUnit:'mg/dose',
        volumeMin:0.3,
        volumeMax:0.3,
        frequencyText:'0.3 mL as needed after meals and at bedtime',
        maxDosesPer24h:12,
        requiresAge:true,
        requiresWeight:false,
        allowedFormulations:['simethicone-20mg-0.3ml']
      },
      {
        id:'gas-2-years-and-over-24lb',
        condition:'Gas symptoms',
        type:'label_age_based',
        minAgeYears:2,
        minWeightKg:10.9,
        doseMin:40,
        doseMax:40,
        doseUnit:'mg/dose',
        volumeMin:0.6,
        volumeMax:0.6,
        frequencyText:'0.6 mL as needed after meals and at bedtime; for children 2 years and older weighing at least 24 lb (about 10.9 kg)',
        maxDosesPer24h:12,
        requiresAge:true,
        requiresWeight:true,
        allowedFormulations:['simethicone-20mg-0.3ml']
      }
    ],
    information:{
      class:'Antiflatulent / antigas',
      mechanism:'Simethicone is a silicone-based antifoaming agent that reduces surface tension of gas bubbles, facilitating their coalescence and passage.',
      indications:['Relief of symptoms referred to as gas'],
      contraindications:[],
      precautions:[
        'Use the measuring device supplied with the product and follow the product label.',
        'Shake well before use for suspension/drop formulations where applicable.',
        'Do not exceed 12 doses in 24 hours for the referenced product labeling.',
        'For children 2 years and older, the referenced label requires a body weight of at least 24 lb (about 10.9 kg) for the 0.6 mL dose; do not extrapolate the dose to lower weights.',
        'Seek medical advice when abdominal symptoms are severe, persistent, or associated with concerning features rather than assuming simple gas.'
      ],
      adverseEffects:['Generally well tolerated; gastrointestinal adverse effects are uncommon at labeled doses.'],
      interactions:['No clinically important drug interactions are generally expected because simethicone is not systemically absorbed.'],
      administration:'Use the supplied measuring device. Administer after meals and at bedtime as needed according to the product label.',
      pediatricUse:'For the referenced 20 mg/0.3 mL oral-drop formulation, children under 2 years receive 0.3 mL per dose. Children 2 years and older who weigh at least 24 lb (about 10.9 kg) receive 0.6 mL per dose. Doses may be repeated as needed after meals and at bedtime, up to 12 doses in 24 hours.',
      notes:'The 2-years-and-over regimen is weight-qualified by the current product labeling. DoseCare therefore requires both age and weight for this regimen rather than calculating 0.6 mL for every child aged 2 years or older. Product-specific concentration and measuring device must be checked before administration.',
      sources:[
        {organization:'DailyMed',title:'SIMETHICONE INFANT GAS RELIEF DROPS — official drug label, updated March 18, 2026',url:'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=410d80fc-e55b-08d0-e063-6294a90aba73'},
        {organization:'DailyMed',title:'INFANTS SIMETHICONE DROPS — official drug label, updated June 3, 2026',url:'https://www.dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=235f458e-c275-4bc1-9c0f-e007c4040649'}
      ]
    },
    sources:[
      {organization:'DailyMed',title:'SIMETHICONE INFANT GAS RELIEF DROPS — official drug label, updated March 18, 2026',url:'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=410d80fc-e55b-08d0-e063-6294a90aba73'},
      {organization:'DailyMed',title:'INFANTS SIMETHICONE DROPS — official drug label, updated June 3, 2026',url:'https://www.dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=235f458e-c275-4bc1-9c0f-e007c4040649'}
    ]
  });
})(window);