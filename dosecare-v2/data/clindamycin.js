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
      concentration: {
        amount: 75,
        unit: 'mg',
        volume: 5,
        volumeUnit: 'mL'
      },
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
      frequencyText: 'Divided into 3 or 4 equal doses per day',
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
      frequencyText: 'Divided into 3 or 4 equal doses per day',
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
      frequencyText: 'Divided into 3 or 4 equal doses per day',
      requiresWeight: true,
      requiresAge: false,
      minimumRecommendedDoseMgPerAdministration: 37.5,
      minimumRecommendedDoseCondition: 'For children weighing 10 kg or less, 37.5 mg (2.5 mL) three times daily should be considered the minimum recommended dose.'
    }
  ],
  information: {
    mechanismOfAction: 'Lincosamide antibacterial that binds to the 50S ribosomal subunit and inhibits bacterial protein synthesis.',
    indications: [
      'Serious bacterial infections caused by susceptible organisms',
      'Severe bacterial infections when an appropriate oral regimen is clinically indicated'
    ],
    adverseEffects: [
      'Diarrhea',
      'Abdominal pain',
      'Nausea',
      'Vomiting',
      'Clostridioides difficile-associated diarrhea and colitis'
    ],
    warningsPrecautions: [
      'Clindamycin has a boxed warning for Clostridioides difficile-associated diarrhea and colitis, which can be severe or fatal.',
      'Discontinue the antibacterial if significant diarrhea occurs and evaluate appropriately.',
      'Use only for confirmed or strongly suspected bacterial infections caused by susceptible organisms.'
    ],
    sources: [
      {
        organization: 'DailyMed',
        title: 'Clindamycin Palmitate Hydrochloride for Oral Solution, USP (Pediatric) — current pediatric label',
        url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a85e28ea-03be-471f-ad7f-f5c55c67ac97'
      }
    ]
  },
  sources: [
    {
      organization: 'DailyMed',
      title: 'Clindamycin Palmitate Hydrochloride for Oral Solution, USP (Pediatric) — current pediatric label',
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a85e28ea-03be-471f-ad7f-f5c55c67ac97'
    }
  ]
});
