/* DoseCare V2 — Iron (ferrous sulfate) pediatric oral solution. */
window.DoseCareV2Database.register({
  id: 'iron',
  name: 'Iron',
  genericName: 'Ferrous sulfate (elemental iron)',
  brandNames: ['FE-VITE Iron Oral Solution'],
  dosageForm: 'Oral solution',
  route: 'Oral',
  formulations: [
    {
      id: 'fe-vite-15mg-elemental-iron-per-ml',
      dosageForm: 'Oral solution',
      concentration: { amount: 15, unit: 'mg elemental iron', volume: 1, volumeUnit: 'mL' },
      display: '75 mg ferrous sulfate (15 mg elemental iron) / 1 mL',
      mgPerMl: 15,
      saltStrengthMgPerMl: 75,
      elementalIronMgPerMl: 15,
      dosingBasis: 'elemental_iron'
    }
  ],
  regimens: [
    {
      id: 'iron-prevention-1-2-mg-kg-day',
      type: 'mg_per_kg_per_day',
      condition: 'Prevention of iron deficiency',
      minAgeMonths: 1,
      dose: 1,
      maxDose: 2,
      unit: 'mg elemental iron/kg/day',
      frequency: 1,
      frequencyText: 'Once daily',
      maximumDailyDose: 30,
      allowedFormulations: ['fe-vite-15mg-elemental-iron-per-ml']
    },
    {
      id: 'iron-treatment-3-6-mg-kg-day',
      type: 'mg_per_kg_per_day',
      condition: 'Treatment of iron deficiency or iron deficiency anaemia',
      minAgeMonths: 1,
      dose: 3,
      maxDose: 6,
      unit: 'mg elemental iron/kg/day',
      frequency: 1,
      frequencyText: 'Once daily',
      allowedFormulations: ['fe-vite-15mg-elemental-iron-per-ml']
    }
  ],
  information: {
    mechanism: 'Ferrous iron provides elemental iron required for haemoglobin synthesis and replenishment of iron stores.',
    indications: 'Prevention of iron deficiency and clinician-directed treatment of iron deficiency or iron deficiency anaemia.',
    precautions: [
      'Dose calculations are based on elemental iron, not the ferrous sulfate salt mass.',
      'Accidental iron overdose can be fatal in young children; keep iron products securely out of reach.',
      'Oral iron may cause black stools, constipation, gastrointestinal upset, and dental staining.',
      'Iron is generally better absorbed with vitamin C; avoid giving it with milk when possible.'
    ],
    pediatricUse: 'RCH guidance recommends elemental iron 1–2 mg/kg/day for prevention (maximum 30 mg/day) and 3–6 mg/kg/day for treatment of iron deficiency or iron deficiency anaemia. Dosing in this record is expressed as elemental iron.'
  },
  sources: [
    {
      title: 'DailyMed — FE-VITE IRON ORAL SOLUTION',
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=73d1f079-d8eb-44f4-b33d-05fb25b80c8f'
    },
    {
      title: 'Royal Children’s Hospital Melbourne — Iron deficiency clinical guideline',
      url: 'https://www.rch.org.au/clinicalguide/guideline_index/iron_deficiency/'
    },
    {
      title: 'Royal Children’s Hospital Melbourne — Iron poisoning clinical guideline',
      url: 'https://www.rch.org.au/clinicalguide/guideline_index/Iron_poisoning/'
    }
  ]
});
