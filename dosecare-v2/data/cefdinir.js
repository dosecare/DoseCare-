// DoseCare V2 — Cefdinir oral suspension
// Source: DailyMed cefdinir for oral suspension labels.
DoseCareV2Database.register({
  id: 'cefdinir',
  name: 'Cefdinir',
  genericName: 'Cefdinir',
  activeIngredient: 'Cefdinir',
  dosageForm: 'Oral Suspension',
  route: 'Oral',
  formulations: [
    { display: '125 mg/5 mL', concentration: { amount: 125, unit: 'mg', volume: 5, volumeUnit: 'mL' } },
    { display: '250 mg/5 mL', concentration: { amount: 250, unit: 'mg', volume: 5, volumeUnit: 'mL' } }
  ],
  regimens: [
    { id:'aom-q12h', condition:'Acute bacterial otitis media', type:'mg_per_kg_per_dose', minDose:7, maxDose:7, doseUnit:'mg/kg/dose', frequency:2, frequencyText:'Every 12 hours for 5–10 days', requiresAge:true, requiresWeight:true, minAgeMonths:6, maxAgeYears:12, maximumDailyDose:600 },
    { id:'aom-q24h', condition:'Acute bacterial otitis media', type:'mg_per_kg_per_day', minDose:14, maxDose:14, doseUnit:'mg/kg/day', frequency:1, frequencyText:'Every 24 hours for 10 days', requiresAge:true, requiresWeight:true, minAgeMonths:6, maxAgeYears:12, maximumDailyDose:600 },
    { id:'sinus-q12h', condition:'Acute maxillary sinusitis', type:'mg_per_kg_per_dose', minDose:7, maxDose:7, doseUnit:'mg/kg/dose', frequency:2, frequencyText:'Every 12 hours for 10 days', requiresAge:true, requiresWeight:true, minAgeMonths:6, maxAgeYears:12, maximumDailyDose:600 },
    { id:'sinus-q24h', condition:'Acute maxillary sinusitis', type:'mg_per_kg_per_day', minDose:14, maxDose:14, doseUnit:'mg/kg/day', frequency:1, frequencyText:'Every 24 hours for 10 days', requiresAge:true, requiresWeight:true, minAgeMonths:6, maxAgeYears:12, maximumDailyDose:600 },
    { id:'pharyngitis-q12h', condition:'Pharyngitis / tonsillitis', type:'mg_per_kg_per_dose', minDose:7, maxDose:7, doseUnit:'mg/kg/dose', frequency:2, frequencyText:'Every 12 hours for 5–10 days', requiresAge:true, requiresWeight:true, minAgeMonths:6, maxAgeYears:12, maximumDailyDose:600 },
    { id:'pharyngitis-q24h', condition:'Pharyngitis / tonsillitis', type:'mg_per_kg_per_day', minDose:14, maxDose:14, doseUnit:'mg/kg/day', frequency:1, frequencyText:'Every 24 hours for 10 days', requiresAge:true, requiresWeight:true, minAgeMonths:6, maxAgeYears:12, maximumDailyDose:600 },
    { id:'skin-q12h', condition:'Uncomplicated skin and skin-structure infection', type:'mg_per_kg_per_dose', minDose:7, maxDose:7, doseUnit:'mg/kg/dose', frequency:2, frequencyText:'Every 12 hours for 10 days', requiresAge:true, requiresWeight:true, minAgeMonths:6, maxAgeYears:12, maximumDailyDose:600 }
  ],
  information: {
    class: 'Third-generation cephalosporin antibacterial',
    indications: ['Acute bacterial otitis media', 'Acute maxillary sinusitis', 'Pharyngitis / tonsillitis', 'Uncomplicated skin and skin-structure infections'],
    mechanism: 'Beta-lactam antibacterial that inhibits bacterial cell-wall synthesis.',
    notes: 'Pediatric dosing is 14 mg/kg/day up to 600 mg/day. For otitis media, sinusitis and pharyngitis/tonsillitis, the label permits 7 mg/kg every 12 hours or 14 mg/kg every 24 hours; skin infection is dosed 7 mg/kg every 12 hours. Pediatric labeling applies to ages 6 months through 12 years.'
  },
  sources: [
    { organization: 'DailyMed', title: 'Cefdinir powder for oral suspension — pediatric dosage and dosage chart', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2bd2101c-511d-45a9-b1d8-a45ed40c5b80' }
  ]
});
