window.DoseCareV2Database?.register({
  id: 'clindamycin',
  name: 'Clindamycin',
  genericName: 'Clindamycin palmitate hydrochloride',
  activeIngredient: 'Clindamycin',
  dosageForm: 'Oral Solution',
  route: 'Oral',
  category: 'Antibiotic',
  formulations: [
    {
      id: '75mg-5mL',
      concentration: { amount: 75, unit: 'mg', volume: 5, volumeUnit: 'mL' },
      display: '75 mg/5 mL'
    }
  ],
  regimens: [
    {
      id: 'serious-infection-8-12-mg-kg-day',
      condition: 'Serious bacterial infection',
      type: 'mg_per_kg_per_day',
      minDose: 8,
      maxDose: 12,
      doseUnit: 'mg/kg/day',
      frequency: 3,
      alternativeFrequency: 4,
      frequencyText: 'Divide the total daily dose into 3 or 4 equal doses',
      allowedFormulations: ['75mg-5mL'],
      requiresWeight: true,
      requiresAge: false,
      minimumRecommendedDoseMgPerAdministration: 37.5,
      minimumRecommendedDoseCondition: 'For children weighing 10 kg or less, 37.5 mg (2.5 mL) three times daily should be considered the minimum recommended dose.'
    },
    {
      id: 'severe-infection-13-16-mg-kg-day',
      condition: 'Severe bacterial infection',
      type: 'mg_per_kg_per_day',
      minDose: 13,
      maxDose: 16,
      doseUnit: 'mg/kg/day',
      frequency: 3,
      alternativeFrequency: 4,
      frequencyText: 'Divide the total daily dose into 3 or 4 equal doses',
      allowedFormulations: ['75mg-5mL'],
      requiresWeight: true,
      requiresAge: false,
      minimumRecommendedDoseMgPerAdministration: 37.5,
      minimumRecommendedDoseCondition: 'For children weighing 10 kg or less, 37.5 mg (2.5 mL) three times daily should be considered the minimum recommended dose.'
    },
    {
      id: 'more-severe-infection-17-25-mg-kg-day',
      condition: 'More severe bacterial infection',
      type: 'mg_per_kg_per_day',
      minDose: 17,
      maxDose: 25,
      doseUnit: 'mg/kg/day',
      frequency: 3,
      alternativeFrequency: 4,
      frequencyText: 'Divide the total daily dose into 3 or 4 equal doses',
      allowedFormulations: ['75mg-5mL'],
      requiresWeight: true,
      requiresAge: false,
      minimumRecommendedDoseMgPerAdministration: 37.5,
      minimumRecommendedDoseCondition: 'For children weighing 10 kg or less, 37.5 mg (2.5 mL) three times daily should be considered the minimum recommended dose.'
    }
  ],
  information: {
    class: 'Lincosamide antibacterial',
    mechanism: 'Lincosamide antibacterial that binds to the 50S ribosomal subunit and inhibits bacterial protein synthesis.',
    indications: ['Serious bacterial infections caused by susceptible organisms'],
    contraindications: ['Hypersensitivity to clindamycin or lincomycin.'],
    adverseEffects: ['Diarrhea', 'Abdominal pain', 'Nausea', 'Vomiting', 'Clostridioides difficile-associated diarrhea and colitis'],
    interactions: ['Clindamycin has neuromuscular blocking properties and may enhance the action of other neuromuscular blocking agents.'],
    precautions: ['Clindamycin carries a boxed warning for Clostridioides difficile-associated diarrhea and colitis, which can be severe or fatal.', 'Use only for confirmed or strongly suspected bacterial infections caused by susceptible organisms.', 'Dose based on total body weight regardless of obesity.', 'For beta-hemolytic streptococcal infections, treatment should continue for at least 10 days.'],
    pediatricUse: 'The pediatric oral solution is 75 mg/5 mL after reconstitution. The selected pediatric label provides 8–25 mg/kg/day divided into 3 or 4 equal doses depending on infection severity. For children weighing 10 kg or less, 37.5 mg (2.5 mL) three times daily should be considered the minimum recommended dose.',
    administration: 'Shake well before each use. Reconstitute according to the product instructions. Store at 20–25°C and do not refrigerate the reconstituted solution; discard unused solution after 2 weeks.'
  },
  sources: [
    { organization: 'DailyMed / U.S. National Library of Medicine', title: 'Clindamycin Palmitate Hydrochloride for Oral Solution, USP (Pediatric) — current pediatric label', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=faf67eb8-1fd7-4b2c-a55b-24ba664c0dce' }
  ]
});
