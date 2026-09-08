/* DoseCare V2 — Cefuroxime axetil oral suspension */
// Pediatric oral-liquid dosing aligned with DailyMed labeling.
DoseCareV2Database.register({
  id: 'cefuroxime',
  name: 'Cefuroxime axetil',
  genericName: 'Cefuroxime axetil',
  activeIngredient: 'Cefuroxime',
  dosageForm: 'Oral suspension',
  route: 'Oral',
  formulations: [
    { id: '125mg-5mL', display: '125 mg/5 mL', concentration: { amount: 125, unit: 'mg', volume: 5, volumeUnit: 'mL' } },
    { id: '250mg-5mL', display: '250 mg/5 mL', concentration: { amount: 250, unit: 'mg', volume: 5, volumeUnit: 'mL' } }
  ],
  regimens: [
    { id: 'pharyngitis-tonsillitis', type: 'mg_per_kg_per_day', minDose: 20, maxDose: 20, doseUnit: 'mg/kg/day', frequency: 2, frequencyText: 'Every 12 hours for 10 days', maximumDailyDose: 500, minAgeMonths: 3, maxAgeYears: 12, condition: 'Pharyngitis / tonsillitis', requiresWeight: true, requiresAge: true, allowedFormulations: ['125mg-5mL','250mg-5mL'] },
    { id: 'acute-otitis-media', type: 'mg_per_kg_per_day', minDose: 30, maxDose: 30, doseUnit: 'mg/kg/day', frequency: 2, frequencyText: 'Every 12 hours for 10 days', maximumDailyDose: 1000, minAgeMonths: 3, maxAgeYears: 12, condition: 'Acute otitis media', requiresWeight: true, requiresAge: true, allowedFormulations: ['125mg-5mL','250mg-5mL'] },
    { id: 'acute-bacterial-maxillary-sinusitis', type: 'mg_per_kg_per_day', minDose: 30, maxDose: 30, doseUnit: 'mg/kg/day', frequency: 2, frequencyText: 'Every 12 hours for 10 days', maximumDailyDose: 1000, minAgeMonths: 3, maxAgeYears: 12, condition: 'Acute bacterial maxillary sinusitis', requiresWeight: true, requiresAge: true, allowedFormulations: ['125mg-5mL','250mg-5mL'] },
    { id: 'impetigo', type: 'mg_per_kg_per_day', minDose: 30, maxDose: 30, doseUnit: 'mg/kg/day', frequency: 2, frequencyText: 'Every 12 hours for 10 days', maximumDailyDose: 1000, minAgeMonths: 3, maxAgeYears: 12, condition: 'Impetigo', requiresWeight: true, requiresAge: true, allowedFormulations: ['125mg-5mL','250mg-5mL'] }
  ],
  information: {
    class: 'Second-generation cephalosporin antibiotic',
    indications: ['Pharyngitis / tonsillitis', 'Acute otitis media', 'Acute bacterial maxillary sinusitis', 'Impetigo'],
    mechanism: 'Beta-lactam antibacterial that inhibits bacterial cell-wall synthesis.',
    contraindications: ['Known serious hypersensitivity to cefuroxime or cephalosporin antibiotics.'],
    precautions: ['The suspension must be administered with food.', 'Cefuroxime is renally eliminated; the cited pediatric suspension label states safety and efficacy in renal failure have not been established.', 'The suspension and tablet formulations are not bioequivalent and are not substitutable milligram-for-milligram.', 'The suspension contains phenylalanine and is relevant to patients with phenylketonuria.'],
    interactions: ['Antacids and acid-reducing agents may decrease bioavailability of cefuroxime axetil.'],
    adverseEffects: ['Diarrhea', 'Nausea', 'Vomiting', 'Abdominal pain', 'Rash', 'Hypersensitivity reactions'],
    administration: 'Administer with food. Shake well before each dose. After reconstitution, store at 2–8°C and discard after 10 days according to the cited product labeling.',
    pediatricUse: 'Labeled oral-suspension use is for pediatric patients 3 months through 12 years. The oral suspension and tablets are not bioequivalent and must not be substituted milligram-for-milligram.',
    notes: 'After reconstitution, the suspension provides cefuroxime equivalent at 125 mg/5 mL or 250 mg/5 mL.'
  },
  sources: [
    { organization: 'DailyMed', title: 'Cefuroxime Axetil for Oral Suspension — Pediatric Dosage and Administration', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=135e2dfc-eb47-4d04-a903-a081d36c267e' }
  ]
});
