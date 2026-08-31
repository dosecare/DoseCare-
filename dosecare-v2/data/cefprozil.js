window.DoseCareV2Database?.register({
  id: 'cefprozil',
  name: 'Cefprozil',
  genericName: 'Cefprozil',
  dosageForm: 'Oral Suspension',
  category: 'Antibiotic',
  formulations: [
    { concentration: { amount: 125, unit: 'mg', volume: 5, volumeUnit: 'mL' }, display: '125 mg/5 mL' },
    { concentration: { amount: 250, unit: 'mg', volume: 5, volumeUnit: 'mL' }, display: '250 mg/5 mL' }
  ],
  regimens: [
    {
      id: 'pharyngitis-tonsillitis-7-5-mg-kg-q12h',
      condition: 'Pharyngitis / tonsillitis',
      type: 'mg_per_kg_per_dose',
      minDose: 7.5,
      maxDose: 7.5,
      doseUnit: 'mg/kg/dose',
      frequency: 2,
      frequencyText: 'Every 12 hours for 10 days',
      minAgeYears: 2,
      maxAgeYears: 12,
      requiresWeight: true,
      requiresAge: true
    },
    {
      id: 'skin-infection-20-mg-kg-day',
      condition: 'Uncomplicated skin and skin-structure infection',
      type: 'mg_per_kg_per_day',
      minDose: 20,
      maxDose: 20,
      doseUnit: 'mg/kg/day',
      frequency: 1,
      frequencyText: 'Once daily for 10 days',
      minAgeYears: 2,
      maxAgeYears: 12,
      requiresWeight: true,
      requiresAge: true
    },
    {
      id: 'otitis-media-15-mg-kg-q12h',
      condition: 'Acute otitis media',
      type: 'mg_per_kg_per_dose',
      minDose: 15,
      maxDose: 15,
      doseUnit: 'mg/kg/dose',
      frequency: 2,
      frequencyText: 'Every 12 hours for 10 days',
      minAgeMonths: 6,
      maxAgeYears: 12,
      requiresWeight: true,
      requiresAge: true
    },
    {
      id: 'acute-sinusitis-7-5-mg-kg-q12h',
      condition: 'Acute sinusitis — standard dose',
      type: 'mg_per_kg_per_dose',
      minDose: 7.5,
      maxDose: 7.5,
      doseUnit: 'mg/kg/dose',
      frequency: 2,
      frequencyText: 'Every 12 hours for 10 days',
      minAgeMonths: 6,
      maxAgeYears: 12,
      requiresWeight: true,
      requiresAge: true
    },
    {
      id: 'acute-sinusitis-15-mg-kg-q12h',
      condition: 'Acute sinusitis — higher dose for moderate to severe infection',
      type: 'mg_per_kg_per_dose',
      minDose: 15,
      maxDose: 15,
      doseUnit: 'mg/kg/dose',
      frequency: 2,
      frequencyText: 'Every 12 hours for 10 days',
      minAgeMonths: 6,
      maxAgeYears: 12,
      requiresWeight: true,
      requiresAge: true
    }
  ],
  information: {
    mechanismOfAction: 'Semi-synthetic cephalosporin antibacterial that exerts bactericidal activity by inhibiting bacterial cell-wall synthesis.',
    indications: [
      'Pharyngitis and tonsillitis caused by susceptible Streptococcus pyogenes',
      'Acute otitis media caused by susceptible organisms',
      'Acute sinusitis caused by susceptible organisms',
      'Uncomplicated skin and skin-structure infections caused by susceptible organisms'
    ],
    adverseEffects: [
      'Diarrhea',
      'Nausea',
      'Vomiting',
      'Abdominal pain',
      'Rash and urticaria',
      'Headache or dizziness',
      'Rare: anaphylaxis, angioedema, colitis including C. difficile-associated diarrhea'
    ],
    warningsPrecautions: [
      'Contraindicated in patients with known allergy to cephalosporins.',
      'Use caution in patients with a history of penicillin or other beta-lactam hypersensitivity because cross-sensitivity may occur.',
      'Consider Clostridioides difficile-associated diarrhea in patients who develop significant diarrhea during or after antibacterial therapy.',
      'Dose reduction is required in markedly impaired renal function according to the product labeling.',
      'Use only for proven or strongly suspected susceptible bacterial infections.'
    ],
    sources: [
      { organization: 'DailyMed / U.S. National Library of Medicine', title: 'Cefprozil powder for suspension — current labeling', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=800a2ec0-4798-4423-9613-d03024cf1f0e' },
      { organization: 'U.S. Food and Drug Administration', title: 'Cefprozil — Oral products', url: 'https://www.fda.gov/drugs/development-resources/cefprozil-oral-products' }
    ]
  },
  sources: [
    { organization: 'DailyMed / U.S. National Library of Medicine', title: 'Cefprozil powder for suspension — current labeling', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=800a2ec0-4798-4423-9613-d03024cf1f0e' },
    { organization: 'U.S. Food and Drug Administration', title: 'Cefprozil — Oral products', url: 'https://www.fda.gov/drugs/development-resources/cefprozil-oral-products' }
  ]
});
