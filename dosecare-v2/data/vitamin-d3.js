/* DoseCare V2 — Vitamin D3 (cholecalciferol) oral liquid. */
window.DoseCareV2Database.register({
  id: 'vitamin-d3',
  name: 'Vitamin D3',
  genericName: 'Cholecalciferol (Vitamin D3)',
  brandNames: ['D-VITE Pediatric Oral Liquid'],
  dosageForm: 'Oral solution',
  route: 'Oral',
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
      condition: 'Routine vitamin D supplementation',
      minAgeMonths: 0,
      maxAgeMonths: 48,
      dose: 0.01,
      unit: 'mg/day',
      frequency: 1,
      frequencyText: 'Once daily',
      allowedFormulations: ['d-vite-400iu-per-ml']
    }
  ],
  information: {
    mechanism: 'Vitamin D3 increases intestinal calcium and phosphate absorption and supports normal bone mineralization.',
    indications: 'Routine pediatric vitamin D supplementation.',
    precautions: [
      'Do not exceed the configured product dose unless directed by a clinician.',
      'Keep out of reach of children because excessive vitamin D can cause toxicity.'
    ],
    pediatricUse: 'This DoseCare regimen is limited to 0–48 months and represents routine supplementation, not treatment of vitamin D deficiency.'
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
