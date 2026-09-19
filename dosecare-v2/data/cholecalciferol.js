/* DoseCare V2 — Cholecalciferol (Vitamin D3), pediatric oral liquid */
window.DoseCareV2Database?.register({
  id: 'cholecalciferol',
  name: 'Cholecalciferol (Vitamin D3)',
  genericName: 'Cholecalciferol',
  active: true,
  dosageForm: 'Oral drops / oral solution',
  route: 'Oral',
  category: 'Vitamin supplement',
  formulations: [
    {
      id: '400iu-per-ml',
      display: '400 IU/mL (10 mcg/mL)',
      concentration: { amount: 400, volume: 1, unit: 'IU/mL' },
      mcgPerMl: 10,
      iuPerMl: 400
    }
  ],
  regimens: [
    {
      id: 'infant-supplementation',
      type: 'fixed_dose',
      condition: 'Vitamin D supplementation',
      minDose: 400,
      maxDose: 400,
      doseUnit: 'IU/day',
      frequency: 1,
      frequencyText: 'Once daily',
      minAgeMonths: 0,
      maxAgeMonths: 11,
      requiresAge: true,
      requiresWeight: false,
      allowedFormulations: ['400iu-per-ml'],
      note: 'AAP recommends 400 IU/day for infants younger than 12 months.'
    },
    {
      id: 'children-supplementation',
      type: 'fixed_dose',
      condition: 'Vitamin D supplementation',
      minDose: 600,
      maxDose: 600,
      doseUnit: 'IU/day',
      frequency: 1,
      frequencyText: 'Once daily',
      minAgeMonths: 12,
      requiresAge: true,
      requiresWeight: false,
      allowedFormulations: ['400iu-per-ml'],
      note: 'AAP recommends 600 IU/day for children older than 1 year. This is a daily intake recommendation; individual supplementation needs depend on diet and clinical context.'
    }
  ],
  information: {
    class: 'Vitamin D3',
    indications: [
      'Vitamin D supplementation when dietary intake is insufficient',
      'Prevention of vitamin D deficiency'
    ],
    mechanism: 'Cholecalciferol is converted to active vitamin D metabolites that support calcium and phosphate homeostasis and normal bone mineralization.',
    precautions: [
      'Dose is expressed in IU of vitamin D3; 1 mcg cholecalciferol equals 40 IU.',
      'Avoid duplicate vitamin D products and excessive dosing because vitamin D toxicity can cause hypercalcemia.',
      'Infants may require supplementation depending on breast/formula feeding and total vitamin D intake.',
      'Treatment of confirmed vitamin D deficiency or rickets requires a separate clinician-directed regimen and should not be inferred from routine supplementation.'
    ],
    adverseEffects: [
      'Usually well tolerated at recommended doses',
      'Excessive intake can cause hypercalcemia, nausea, vomiting, constipation, weakness, and increased thirst/urination'
    ],
    notes: 'Use the supplied measuring device/dropper and verify the product concentration because vitamin D liquid products vary substantially in strength.'
  },
  sources: [
    {
      organization: 'American Academy of Pediatrics',
      title: 'Vitamin D for Babies, Children & Adolescents',
      url: 'https://www.healthychildren.org/English/healthy-living/nutrition/Pages/vitamin-d-on-the-double.aspx'
    },
    {
      organization: 'American Academy of Pediatrics',
      title: 'Where We Stand: Vitamin Supplements for Children',
      url: 'https://www.healthychildren.org/English/healthy-living/nutrition/Pages/Where-We-Stand-Vitamins.aspx'
    },
    {
      organization: 'DailyMed',
      title: 'OneVite Pediatric D-VITE Vitamin D Drops',
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f823cb3a-607c-4272-a0c1-da823dabd8e9'
    }
  ]
});
