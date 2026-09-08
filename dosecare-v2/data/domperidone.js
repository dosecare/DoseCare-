/* DoseCare V2 — Domperidone oral suspension. */
(function(global){
  'use strict';
  global.DoseCareV2Database.register({
    id:'domperidone', name:'Domperidone', genericName:'Domperidone', activeIngredient:'Domperidone',
    dosageForm:'Oral suspension', route:'Oral', category:'Gastrointestinal / Antiemetic',
    formulations:[{id:'domperidone-1mg-ml',display:'Domperidone 1 mg/mL oral suspension',concentration:{amount:1,unit:'mg',volume:1,volumeUnit:'mL'}}],
    regimens:[{id:'nausea-vomiting-adolescent-35kg-plus',condition:'Nausea and vomiting',type:'fixed_dose',minAgeYears:12,minWeightKg:35,dose:10,unit:'mg/dose',frequency:3,frequencyText:'10 mg (10 mL) up to 3 times daily, 15–30 minutes before meals',maximumDailyDose:30,maximumDailyDoseUnit:'mg/day',durationDays:7,requiresAge:true,requiresWeight:true,allowedFormulations:['domperidone-1mg-ml']}],
    information:{
      class:'Dopamine antagonist / antiemetic',
      mechanism:'Peripheral dopamine D2-receptor antagonist that increases upper gastrointestinal motility and reduces nausea and vomiting.',
      indications:['Relief of symptoms of nausea and vomiting in adults and adolescents aged 12 years and older weighing 35 kg or more.'],
      contraindications:['Hypersensitivity to domperidone or any excipient.','Prolactin-releasing pituitary tumour (prolactinoma).','Known QTc prolongation, significant electrolyte disturbances, bradycardia, or underlying cardiac disease such as congestive heart failure.','Moderate or severe hepatic impairment.','Co-administration with QT-prolonging medicines or potent CYP3A4 inhibitors.','Gastrointestinal haemorrhage, mechanical obstruction, or perforation where increased gastrointestinal motility could be harmful.'],
      precautions:['Use the lowest effective dose for the shortest duration necessary; treatment should generally not exceed 7 days.','Take 15–30 minutes before meals; absorption is delayed when taken after meals.','In severe renal impairment, reduce dosing frequency to once or twice daily and consider dose reduction.','The product is not suitable for children under 12 years or adolescents weighing less than 35 kg because efficacy has not been established in these groups.','The suspension contains sorbitol and parabens; consider relevant excipient warnings, including hereditary fructose intolerance.'],
      adverseEffects:['Dry mouth','Headache','Somnolence','Rare QT prolongation, ventricular arrhythmia, or torsades de pointes'],
      interactions:['QT-prolonging medicines','Potent CYP3A4 inhibitors','Antacids or antisecretory agents should not be taken simultaneously with oral domperidone because they reduce oral bioavailability.','Levodopa: domperidone can increase levodopa plasma concentration.'],
      administration:'Take 15–30 minutes before meals. Measure the oral suspension with an accurate graduated measuring device.',
      pediatricUse:'For the referenced 1 mg/mL oral suspension, the licensed regimen is restricted to adolescents aged 12 years and older who weigh at least 35 kg: 10 mg (10 mL) up to three times daily, maximum 30 mg/day, generally for no more than 7 days.',
      notes:'The previous 0.25 mg/kg/dose pediatric regimen has been removed because the current referenced UK product does not establish efficacy in children under 12 years or adolescents under 35 kg. DoseCare should not extrapolate an unlicensed pediatric weight-based regimen.',
      sources:[{organization:'electronic Medicines Compendium (emc)',title:'Domperidone 1mg/ml Oral Suspension — Summary of Product Characteristics',url:'https://www.medicines.org.uk/emc/product/3188/smpc'},{organization:'electronic Medicines Compendium (emc)',title:'Domperidone 1mg/ml Oral Suspension — Patient Information Leaflet',url:'https://www.medicines.org.uk/emc/medicine/27082'}]
    },
    sources:[{organization:'electronic Medicines Compendium (emc)',title:'Domperidone 1mg/ml Oral Suspension — Summary of Product Characteristics',url:'https://www.medicines.org.uk/emc/product/3188/smpc'},{organization:'electronic Medicines Compendium (emc)',title:'Domperidone 1mg/ml Oral Suspension — Patient Information Leaflet',url:'https://www.medicines.org.uk/emc/medicine/27082'}]
  });
})(window);