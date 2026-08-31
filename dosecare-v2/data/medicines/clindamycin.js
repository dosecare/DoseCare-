window.DoseCareV2Database?.register({
  id: 'clindamycin',
  name: 'Clindamycin',
  genericName: 'Clindamycin palmitate hydrochloride',
  dosageForm: 'Oral Solution',
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
      requiresAge: false
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
      requiresAge: false
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
      requiresAge: false
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
        title: 'Clindamycin Palmitate Hydrochloride for Oral Solution, USP (Pediatric) — 75 mg/5 mL',
        url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0bfe1e25-f0a1-4e11-9827-82912557c46b'
      },
      {
        organization: 'DailyMed',
        title: 'Clindamycin Palmitate Hydrochloride for Oral Solution, USP (Pediatric) — Dosage and Administration',
        url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0800afad-e4cd-4f70-aaa1-a14547be4729'
      },
      {
        organization: 'DailyMed',
        title: 'Clindamycin Palmitate Hydrochloride for Oral Solution — Current Pediatric Label',
        url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=faf67eb8-1fd7-4b2c-a55b-24ba664c0dce'
      }
    ]
  },
  sources: [
    {
      organization: 'DailyMed',
      title: 'Clindamycin Palmitate Hydrochloride for Oral Solution, USP (Pediatric) — 75 mg/5 mL',
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0bfe1e25-f0a1-4e11-9827-82912557c46b'
    },
    {
      organization: 'DailyMed',
      title: 'Clindamycin Palmitate Hydrochloride for Oral Solution, USP (Pediatric) — Dosage and Administration',
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0800afad-e4cd-4f70-aaa1-a14547be4729'
    },
    {
      organization: 'DailyMed',
      title: 'Clindamycin Palmitate Hydrochloride for Oral Solution — Current Pediatric Label',
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=faf67eb8-1fd7-4b2c-a55b-24ba664c0dce'
    }
  ]
});
