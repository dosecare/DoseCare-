/* DoseCare V2 — Domperidone oral suspension */
(function(global){
  'use strict';
  global.DoseCareV2Database = global.DoseCareV2Database || {records:[]};
  global.DoseCareV2Database.records = global.DoseCareV2Database.records || [];
  global.DoseCareV2Database.records.push({
    id:'domperidone',
    name:'Domperidone',
    genericName:'Domperidone',
    activeIngredient:'Domperidone',
    dosageForm:'Oral suspension',
    route:'Oral',
    category:'Gastrointestinal / Antiemetic',
    formulations:[{
      id:'domperidone-1mg-ml',
      display:'Domperidone 1 mg/mL oral suspension',
      concentration:{amount:1,unit:'mg',volume:1,volumeUnit:'mL'}
    }],
    regimens:[{
      id:'nausea-vomiting-pediatric',
      condition:'Nausea and vomiting',
      type:'mg_per_kg_per_dose',
      minDose:0.25,
      maxDose:0.25,
      unit:'mg/kg/dose',
      frequency:3,
      dosesPerDay:3,
      frequencyText:'0.25 mg/kg/dose up to 3 times daily',
      maximumDailyDose:0.75,
      maximumDailyDoseUnit:'mg/kg/day',
      durationDays:7,
      requiresAge:false,
      requiresWeight:true,
      allowedFormulations:['domperidone-1mg-ml']
    }],
    information:{
      class:'Dopamine antagonist / antiemetic',
      mechanism:'Peripheral dopamine D2-receptor antagonist that increases upper gastrointestinal motility and reduces nausea and vomiting.',
      indications:['Relief of symptoms of nausea and vomiting'],
      precautions:[
        'Use the lowest effective dose for the shortest duration necessary; treatment usually should not exceed 7 days.',
        'Contraindicated with known QT prolongation, significant electrolyte disturbances, bradycardia, or underlying cardiac disease such as heart failure.',
        'Contraindicated in moderate or severe hepatic impairment.',
        'Contraindicated with QT-prolonging medicines and potent CYP3A4 inhibitors.',
        'Use an accurate oral syringe or measuring device for pediatric liquid doses.'
      ],
      adverseEffects:['Dry mouth','Headache','Somnolence','Rare QT prolongation, ventricular arrhythmia, or torsades de pointes'],
      interactions:['QT-prolonging medicines','Potent CYP3A4 inhibitors'],
      notes:'This record is restricted to oral liquid formulation. Pediatric use should follow the locally approved indication and product labeling. EMA recommendations describe 0.25 mg/kg orally up to three times daily where pediatric use is licensed; some current UK products do not establish efficacy in children under 12 years.',
      sources:[
        {organization:'European Medicines Agency (EMA)',title:'Domperidone-containing medicines — restrictions on use',url:'https://www.ema.europa.eu/en/news/cmdh-confirms-recommendations-restricting-use-domperidone-containing-medicines'},
        {organization:'electronic Medicines Compendium (emc)',title:'Domperidone 1mg/ml Oral Suspension — Summary of Product Characteristics',url:'https://www.medicines.org.uk/emc/product/3188/smpc'}
      ]
    },
    sources:[
      {organization:'European Medicines Agency (EMA)',title:'Domperidone-containing medicines — restrictions on use',url:'https://www.ema.europa.eu/en/news/cmdh-confirms-recommendations-restricting-use-domperidone-containing-medicines'},
      {organization:'electronic Medicines Compendium (emc)',title:'Domperidone 1mg/ml Oral Suspension — Summary of Product Characteristics',url:'https://www.medicines.org.uk/emc/product/3188/smpc'}
    ]
  });
})(window);