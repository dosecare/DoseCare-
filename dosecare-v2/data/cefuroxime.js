/* DoseCare V2 — Cefuroxime axetil oral suspension */
DoseCareV2Database.register({
  id: 'cefuroxime',
  name: 'Cefuroxime axetil',
  genericName: 'Cefuroxime axetil',
  activeIngredient: 'Cefuroxime',
  dosageForm: 'Oral suspension',
  route: 'Oral',
  formulations: [
    { display: '125 mg/5 mL', mgPer5mL: 125, concentration: { amount: 125, unit: 'mg', volume: 5, volumeUnit: 'mL' } },
    { display: '250 mg/5 mL', mgPer5mL: 250, concentration: { amount: 250, unit: 'mg', volume: 5, volumeUnit: 'mL' } }
  ],
  regimens: [
    { id: 'pharyngitis-tonsillitis', type: 'mg_per_kg_per_day', doseMgPerKgPerDay: 20, frequency: 2, frequencyText: 'Twice daily for 10 days', maximumDailyDose: 500, minAgeMonths: 3, maxAgeYears: 12, conditions: ['Pharyngitis / tonsillitis'], requiresWeight: true, requiresAge: true },
    { id: 'acute-otitis-media', type: 'mg_per_kg_per_day', doseMgPerKgPerDay: 30, frequency: 2, frequencyText: 'Twice daily for 10 days', maximumDailyDose: 1000, minAgeMonths: 3, maxAgeYears: 12, conditions: ['Acute otitis media'], requiresWeight: true, requiresAge: true },
    { id: 'acute-bacterial-maxillary-sinusitis', type: 'mg_per_kg_per_day', doseMgPerKgPerDay: 30, frequency: 2, frequencyText: 'Twice daily for 10 days', maximumDailyDose: 1000, minAgeMonths: 3, maxAgeYears: 12, conditions: ['Acute bacterial maxillary sinusitis'], requiresWeight: true, requiresAge: true },
    { id: 'impetigo', type: 'mg_per_kg_per_day', doseMgPerKgPerDay: 30, frequency: 2, frequencyText: 'Twice daily for 10 days', maximumDailyDose: 1000, minAgeMonths: 3, maxAgeYears: 12, conditions: ['Impetigo'], requiresWeight: true, requiresAge: true }
  ],
  information: {
    class: 'Second-generation cephalosporin antibiotic',
    indications: ['Pharyngitis / tonsillitis', 'Acute otitis media', 'Acute bacterial maxillary sinusitis', 'Impetigo'],
    mechanism: 'Beta-lactam antibacterial that inhibits bacterial cell-wall synthesis.',
    precautions: ['The suspension must be administered with food.', 'Cefuroxime is renally eliminated; the cited label states safety and efficacy in renal failure have not been established.', 'The suspension and tablet formulations are not bioequivalent and are not substitutable milligram-for-milligram.', 'The suspension contains phenylalanine and is relevant to patients with phenylketonuria.'],
    adverseEffects: ['Diarrhea and gastrointestinal adverse effects may occur.', 'Hypersensitivity reactions can occur, particularly in patients with beta-lactam allergy history.'],
    notes: 'Cefuroxime axetil oral suspension provides cefuroxime equivalent at 125 mg/5 mL or 250 mg/5 mL. Shake well before each use. After reconstitution, the cited label specifies refrigeration at 2–8°C and discard after 10 days.'
  },
  sources: [
    { organization: 'DailyMed', title: 'Cefuroxime Axetil for Oral Suspension — Pediatric Dosage Table', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=135e2dfc-eb47-4d04-a903-a081d36c267e' }
  ]
});
