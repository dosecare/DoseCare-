/* DoseCare V2 — Cefixime oral suspension */
DoseCareV2Database.register({
  id: 'cefixime',
  name: 'Cefixime',
  genericName: 'Cefixime',
  activeIngredient: 'Cefixime',
  dosageForm: 'Oral suspension',
  route: 'Oral',
  category: 'Antibiotic',
  formulations: [
    { id: '100mg-5mL', display: '100 mg/5 mL', concentration: { amount: 100, unit: 'mg', volume: 5, volumeUnit: 'mL' } },
    { id: '200mg-5mL', display: '200 mg/5 mL', concentration: { amount: 200, unit: 'mg', volume: 5, volumeUnit: 'mL' } }
  ],
  regimens: [
    {
      id: 'standard-once-daily', type: 'mg_per_kg_per_day', minDose: 8, maxDose: 8, doseUnit: 'mg/kg/day', frequency: 1,
      frequencyText: 'Once daily', minAgeMonths: 6, maxAgeYears: 12, maxWeightKg: 45, condition: 'Standard pediatric regimen', maximumDailyDose: 400,
      requiresWeight: true, requiresAge: true, allowedFormulations: ['100mg-5mL','200mg-5mL']
    },
    {
      id: 'standard-divided-q12h', type: 'mg_per_kg_per_dose', minDose: 4, maxDose: 4, doseUnit: 'mg/kg/dose', frequency: 2,
      frequencyText: 'Every 12 hours', minAgeMonths: 6, maxAgeYears: 12, maxWeightKg: 45, condition: 'Standard pediatric regimen — divided dose', maximumDosePerAdministration: 200,
      requiresWeight: true, requiresAge: true, allowedFormulations: ['100mg-5mL','200mg-5mL']
    },
    {
      id: 'streptococcal-pharyngitis', type: 'mg_per_kg_per_day', minDose: 8, maxDose: 8, doseUnit: 'mg/kg/day', frequency: 1,
      frequencyText: 'Once daily for at least 10 days', minAgeMonths: 6, maxAgeYears: 12, maxWeightKg: 45, condition: 'Streptococcus pyogenes infection', maximumDailyDose: 400,
      requiresWeight: true, requiresAge: true, allowedFormulations: ['100mg-5mL','200mg-5mL']
    }
  ],
  information: {
    class: 'Third-generation cephalosporin antibiotic',
    indications: ['Otitis media', 'Streptococcus pyogenes infections and other susceptible infections according to the product label'],
    mechanism: 'Beta-lactam antibacterial that inhibits bacterial cell-wall synthesis.',
    contraindications: ['Known allergy to cefixime or other cephalosporin antibiotics.'],
    precautions: ['Use only when cefixime is an appropriate antibacterial choice.', 'Check for serious beta-lactam allergy history.', 'Dose adjustment is required in some renal impairment; this calculator does not perform renal-dose adjustment.', 'Cefixime should not be substituted with tablet/capsule formulations for otitis media when the label specifically calls for the suspension.'],
    interactions: ['Carbamazepine concentrations may increase with concomitant cefixime.', 'Prothrombin time may increase with warfarin or other anticoagulants.'],
    adverseEffects: ['Diarrhea', 'Nausea', 'Loose stools', 'Abdominal pain', 'Dyspepsia', 'Vomiting', 'Hypersensitivity reactions', 'Clostridioides difficile-associated diarrhea'],
    administration: 'Shake the suspension well before use. After reconstitution, the cited label permits storage at room temperature or refrigeration for 14 days; discard unused suspension after 14 days.',
    pediatricUse: 'Pediatric safety and efficacy are established from 6 months of age. Children over 45 kg or older than 12 years should receive the recommended adult dose rather than the pediatric regimen.',
    notes: 'The pediatric labeled dose is 8 mg/kg/day, either once daily or divided as 4 mg/kg every 12 hours. This database uses 100 mg/5 mL and 200 mg/5 mL oral suspensions.'
  },
  sources: [
    { organization: 'DailyMed', title: 'Cefixime for Oral Suspension — Prescribing Information', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=6d68dbd9-7d75-4ff1-91db-79ff8ae879ec' }
  ]
});
