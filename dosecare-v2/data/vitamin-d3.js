/* DoseCare V2 — Vitamin D3 (cholecalciferol) oral liquid. */
window.DoseCareV2Database.register({
  id: 'vitamin-d3',
  name: 'Vitamin D3',
  genericName: 'Cholecalciferol (Vitamin D3)',
  brandNames: ['D-VITE Pediatric Oral Liquid'],
  dosageForm: 'Oral solution',
  route: 'Oral',
  category: 'Vitamin supplement',
  formulations: [
    {
      id: 'd-vite-400iu-per-ml',
      dosageForm: 'Oral solution',
      concentration: { amount: 0.01, unit: 'mg', volume: 1, volumeUnit: 'mL' },
      display: '400 IU (10 mcg) / 1 mL',
      mgPerMl: 0.01,
      equivalentIU: 400
    }
  ],
  regimens: [
    {
      id: 'vitamin-d3-routine-400iu',
      type: 'fixed_dose',
      condition: 'Routine vitamin D supplementation — D-VITE product dose',
      dose: 0.01,
      minDose: 0.01,
      maxDose: 0.01,
      unit: 'mg/day',
      frequency: 1,
      frequencyText: 'Once daily',
      minAgeMonths: 0,
      maxAgeYears: 4,
      requiresAge: true,
      requiresWeight: false,
      allowedFormulations: ['d-vite-400iu-per-ml']
    }
  ],
  information: {
    mechanism: 'Vitamin D3 increases intestinal calcium and phosphate absorption and supports normal bone mineralization.',
    indications: 'Routine pediatric vitamin D supplementation with the configured D-VITE oral liquid.',
    precautions: [
      'Do not exceed 1 mL (400 IU) per day unless a physician recommends another dosage.',
      'Shake well and administer using the supplied dosing device.',
      'Keep out of reach of children because excessive vitamin D intake can cause toxicity.',
      'This record represents the configured product label dose; it is not a vitamin D deficiency treatment regimen.'
    ],
    adverseEffects: [
      'Excessive vitamin D intake can cause hypercalcemia and vitamin D toxicity.'
    ],
    interactions: [
      'Vitamin D supplements may interact with or affect medicines such as thiazide diuretics, corticosteroids, or orlistat; review concomitant therapy when clinically relevant.'
    ],
    pediatricUse: 'D-VITE provides 400 IU (10 mcg) vitamin D3 per 1 mL. The product directions specify 1 mL daily for infants through 12 months and children 1 through 4 years, with doses above 1 mL/day only when recommended by a doctor.'
  },
  sources: [
    {
      title: 'DailyMed — D-VITE Pediatric Oral Liquid',
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f823cb3a-607c-4272-a0c1-da823dabd8e9'
    },
    {
      title: 'NIH Office of Dietary Supplements — Vitamin D Fact Sheet for Health Professionals',
      url: 'https://ods.od.nih.gov/factsheets/VitaminD-HealthProfessional/'
    }
  ]
});
