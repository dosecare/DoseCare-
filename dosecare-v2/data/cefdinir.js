// DoseCare V2 — Cefdinir oral suspension
// Oral liquid only. Pediatric dosing aligned with current DailyMed labeling.
DoseCareV2Database.register({
  id: 'cefdinir',
  name: 'Cefdinir',
  genericName: 'Cefdinir',
  activeIngredient: 'Cefdinir',
  dosageForm: 'Powder for Oral Suspension',
  route: 'Oral',
  formulations: [
    { id: '125mg-5mL', display: '125 mg/5 mL', concentration: { amount: 125, unit: 'mg', volume: 5, volumeUnit: 'mL' } },
    { id: '250mg-5mL', display: '250 mg/5 mL', concentration: { amount: 250, unit: 'mg', volume: 5, volumeUnit: 'mL' } }
  ],
  regimens: [
    { id:'aom-q12h', condition:'Acute bacterial otitis media', type:'mg_per_kg_per_dose', minDose:7, maxDose:7, doseUnit:'mg/kg/dose', frequency:2, frequencyText:'Every 12 hours for 5–10 days', requiresAge:true, requiresWeight:true, minAgeMonths:6, maxAgeYears:12, maximumDailyDose:600, allowedFormulations:['125mg-5mL','250mg-5mL'] },
    { id:'aom-q24h', condition:'Acute bacterial otitis media', type:'mg_per_kg_per_day', minDose:14, maxDose:14, doseUnit:'mg/kg/day', frequency:1, frequencyText:'Every 24 hours for 10 days', requiresAge:true, requiresWeight:true, minAgeMonths:6, maxAgeYears:12, maximumDailyDose:600, allowedFormulations:['125mg-5mL','250mg-5mL'] },
    { id:'sinus-q12h', condition:'Acute maxillary sinusitis', type:'mg_per_kg_per_dose', minDose:7, maxDose:7, doseUnit:'mg/kg/dose', frequency:2, frequencyText:'Every 12 hours for 10 days', requiresAge:true, requiresWeight:true, minAgeMonths:6, maxAgeYears:12, maximumDailyDose:600, allowedFormulations:['125mg-5mL','250mg-5mL'] },
    { id:'sinus-q24h', condition:'Acute maxillary sinusitis', type:'mg_per_kg_per_day', minDose:14, maxDose:14, doseUnit:'mg/kg/day', frequency:1, frequencyText:'Every 24 hours for 10 days', requiresAge:true, requiresWeight:true, minAgeMonths:6, maxAgeYears:12, maximumDailyDose:600, allowedFormulations:['125mg-5mL','250mg-5mL'] },
    { id:'pharyngitis-q12h', condition:'Pharyngitis / tonsillitis', type:'mg_per_kg_per_dose', minDose:7, maxDose:7, doseUnit:'mg/kg/dose', frequency:2, frequencyText:'Every 12 hours for 5–10 days', requiresAge:true, requiresWeight:true, minAgeMonths:6, maxAgeYears:12, maximumDailyDose:600, allowedFormulations:['125mg-5mL','250mg-5mL'] },
    { id:'pharyngitis-q24h', condition:'Pharyngitis / tonsillitis', type:'mg_per_kg_per_day', minDose:14, maxDose:14, doseUnit:'mg/kg/day', frequency:1, frequencyText:'Every 24 hours for 10 days', requiresAge:true, requiresWeight:true, minAgeMonths:6, maxAgeYears:12, maximumDailyDose:600, allowedFormulations:['125mg-5mL','250mg-5mL'] },
    { id:'skin-q12h', condition:'Uncomplicated skin and skin-structure infection', type:'mg_per_kg_per_dose', minDose:7, maxDose:7, doseUnit:'mg/kg/dose', frequency:2, frequencyText:'Every 12 hours for 10 days', requiresAge:true, requiresWeight:true, minAgeMonths:6, maxAgeYears:12, maximumDailyDose:600, allowedFormulations:['125mg-5mL','250mg-5mL'] }
  ],
  information: {
    class: 'Third-generation cephalosporin antibacterial',
    indications: ['Acute bacterial otitis media', 'Acute maxillary sinusitis', 'Pharyngitis / tonsillitis', 'Uncomplicated skin and skin-structure infections'],
    mechanism: 'Cefdinir is a beta-lactam antibacterial that inhibits bacterial cell-wall synthesis.',
    contraindications: ['Known serious hypersensitivity to cefdinir or cephalosporin antibiotics.'],
    precautions: ['Check for a history of serious hypersensitivity to cefdinir, cephalosporins, penicillins, or other beta-lactam antibacterials.', 'Antacids containing aluminum or magnesium can reduce cefdinir absorption; separate administration.', 'Iron-containing products can reduce cefdinir absorption and may cause reddish stool; separate administration as directed by the prescribing information.', 'Dose adjustment is required in significant renal impairment; DoseCare currently does not perform renal dose adjustment.', 'Antibiotic-associated diarrhea, including Clostridioides difficile-associated diarrhea, can occur.'],
    interactions: ['Aluminum- or magnesium-containing antacids reduce cefdinir absorption.', 'Iron-containing products reduce cefdinir absorption.'],
    adverseEffects: ['Diarrhea', 'Rash', 'Nausea', 'Vomiting', 'Abdominal pain', 'Hypersensitivity reactions'],
    administration: 'May be administered without regard to meals. Shake the reconstituted suspension well before each dose and use an accurate measuring device. Follow the product-specific reconstitution and storage instructions.',
    pediatricUse: 'Safety and efficacy are not established in neonates and infants younger than 6 months. Labeled pediatric dosing applies from 6 months through 12 years. Total daily dose is 14 mg/kg/day up to 600 mg/day; once-daily dosing is not established for skin infections, which should remain twice daily.',
    notes: 'The 125 mg/5 mL and 250 mg/5 mL oral suspension formulations are both supported. For patients weighing 43 kg or more, the labeled maximum is 600 mg/day.'
  },
  sources: [
    { organization: 'DailyMed', title: 'Cefdinir powder for oral suspension — current pediatric dosage and dosage chart', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2e384d98-642e-4841-9f62-fcea4c242f4e' },
    { organization: 'DailyMed', title: 'Cefdinir powder for oral suspension — current pediatric use and adverse events', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0d1212c9-604f-4999-8f7d-e7cf300705ef' }
  ]
});
