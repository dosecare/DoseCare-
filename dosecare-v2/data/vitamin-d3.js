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
      id: 'vitamin-d3-routine-infants-400iu',
      type: 'fixed_dose',
      condition: 'Routine vitamin D supplementation — infants',
      minAgeMonths: 0,
      maxAgeMonths: 12,
      minDose: 0.01,
      maxDose: 0.01,
      unit: 'mg/day',
      frequency: 1,
      frequencyText: 'Once daily',
      allowedFormulations: ['d-vite-400iu-per-ml']
    },
    {
      id: 'vitamin-d3-routine-children-600iu',
      type: 'fixed_dose',
      condition: 'Routine vitamin D supplementation — children 1–13 years',
      minAgeYears: 1,
      maxAgeYears: 13,
      minDose: 0.015,
      maxDose: 0.015,
      unit: 'mg/day',
      frequency: 1,
      frequencyText: 'Once daily',
      allowedFormulations: ['d-vite-400iu-per-ml'],
      clinicalNote: 'NIH recommended intake is 600 IU/day for children 1–13 years. With the configured 400 IU/mL product, this equals 1.5 mL/day. The D-VITE product label states not to exceed 1 mL/day unless a physician recommends otherwise; this regimen therefore represents the general recommended intake rather than an unrestricted product-label dose.'
    }
  ],
  information: {
    mechanism: 'Vitamin D3 increases intestinal calcium and phosphate absorption and supports normal bone mineralization.',
    indications: 'Routine pediatric vitamin D supplementation.',
    precautions: [
      'Do not exceed the configured product dose unless directed by a clinician.',
      'Keep out of reach of children because excessive vitamin D can cause toxicity.',
      'For children 1–13 years, the 600 IU/day regimen is based on NIH recommended intake; the configured product label states not to exceed 1 mL/day unless a physician recommends otherwise.'
    ],
    adverseEffects: [
      'Excessive intake can cause hypercalcemia and vitamin D toxicity.'
    ],
    interactions: [
      'Clinically important interactions can occur with medicines affecting calcium balance or vitamin D metabolism; verify concomitant therapy before use.'
    ],
    pediatricUse: 'Routine supplementation: 400 IU/day for infants 0–12 months and 600 IU/day for children 1–13 years, using the configured 400 IU/mL oral solution. This is not a vitamin D deficiency treatment regimen.'
  },
  sources: [
    {
      title: 'DailyMed — D-VITE Pediatric Oral Liquid',
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f823cb3a-607c-4272-a0c1-da823dabd8e9'
    },
    {
      title: 'NIH Office of Dietary Supplements — Vitamin D Fact Sheet for Health Professionals',
      url: 'https://ods.od.nih.gov/factsheets/VITAMIND/HealthProfessional/'
    }
  ]
});
