/* DoseCare V2 — Cefixime oral suspension */
DoseCareV2Database.register({
  id: 'cefixime',
  name: 'Cefixime',
  genericName: 'Cefixime',
  activeIngredient: 'Cefixime',
  dosageForm: 'Oral suspension',
  route: 'Oral',
  formulations: [
    { display: '100 mg/5 mL', mgPer5mL: 100, concentration: { amount: 100, unit: 'mg', volume: 5, volumeUnit: 'mL' } },
    { display: '200 mg/5 mL', mgPer5mL: 200, concentration: { amount: 200, unit: 'mg', volume: 5, volumeUnit: 'mL' } }
  ],
  regimens: [
    {
      id: 'standard-once-daily', type: 'mg_per_kg_per_day', doseMgPerKgPerDay: 8,
      frequencyText: 'Once daily', minimumAgeMonths: 6, condition: 'Standard pediatric regimen',
      maxDailyDoseMg: 400
    },
    {
      id: 'standard-divided-q12h', type: 'mg_per_kg_per_dose', doseMgPerKg: 4,
      frequencyText: 'Every 12 hours', minimumAgeMonths: 6, condition: 'Standard pediatric regimen — divided dose',
      maxDoseMg: 200
    },
    {
      id: 'streptococcal-pharyngitis', type: 'mg_per_kg_per_day', doseMgPerKgPerDay: 8,
      frequencyText: 'Once daily for at least 10 days', minimumAgeMonths: 6,
      condition: 'Streptococcus pyogenes infection', maxDailyDoseMg: 400
    }
  ],
  information: {
    class: 'Third-generation cephalosporin antibiotic',
    indications: ['Otitis media', 'Streptococcus pyogenes infections and other susceptible infections according to the product label'],
    mechanism: 'Beta-lactam antibacterial that inhibits bacterial cell-wall synthesis.',
    precautions: ['Use only when cefixime is an appropriate antibacterial choice.', 'Check for serious beta-lactam allergy history.', 'Dose adjustment may be required in renal impairment; the pediatric regimen in this file is not a renal-adjustment calculator.'],
    adverseEffects: ['Diarrhea, nausea, abdominal discomfort and vomiting may occur.', 'Hypersensitivity reactions can occur.', 'Clostridioides difficile-associated diarrhea is a potential antibiotic-associated adverse effect.'],
    notes: 'For pediatric patients 6 months or older, the labeled suspension dose is 8 mg/kg/day, either once daily or as 4 mg/kg every 12 hours. The cited label states that children over 45 kg or older than 12 years should receive the recommended adult dose. Suspension concentrations in this database are limited to 100 mg/5 mL and 200 mg/5 mL.'
  },
  sources: [
    { organization: 'DailyMed', title: 'Cefixime for Oral Suspension — Prescribing Information', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=6d68dbd9-7d75-4ff1-91db-79ff8ae879ec' }
  ]
});
