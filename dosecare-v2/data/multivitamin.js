/* DoseCare V2 — Pediatric multivitamin oral solution (product-label based). */
window.DoseCareV2Database.register({
  id: 'multivitamin',
  name: 'Multivitamin',
  genericName: 'Pediatric multivitamin oral solution',
  brandNames: ['POLY-VITE Pediatric Oral Solution'],
  dosageForm: 'Oral solution',
  route: 'Oral',
  formulations: [
    {
      id: 'poly-vite-1ml',
      dosageForm: 'Oral solution',
      concentration: { amount: 0.01, unit: 'mg vitamin D3', volume: 1, volumeUnit: 'mL' },
      display: '1 mL provides vitamin D3 10 mcg (400 IU) plus vitamins A, C, E, B1, B2, niacin, B6 and B12',
      mgPerMl: 0.01,
      vitaminD3McgPerMl: 10,
      vitaminD3IUPerMl: 400,
      dosingBasis: 'product_label_volume'
    }
  ],
  regimens: [
    {
      id: 'poly-vite-label-1ml-daily',
      type: 'fixed_dose',
      condition: 'Product-label multivitamin supplementation',
      minAgeMonths: 0,
      maxAgeMonths: 48,
      dose: 0.01,
      unit: 'mg vitamin D3/day (equivalent to 1 mL product)',
      frequency: 1,
      frequencyText: 'Once daily',
      allowedFormulations: ['poly-vite-1ml']
    }
  ],
  information: {
    mechanism: 'Provides multiple vitamins as a nutritional supplement; this record uses vitamin D3 as the quantitative concentration anchor for the labeled 1 mL product dose.',
    indications: 'Product-label nutritional supplementation for infants and young children; the label describes use during transition to solid foods, growth spurts, or in picky eaters.',
    precautions: [
      'This is a product-label supplement record, not a universal pediatric multivitamin dosing recommendation.',
      'Shake well before use and administer with the supplied dosing device.',
      'Do not exceed 1 mL/day unless a doctor recommends another dose.',
      'Keep out of reach of children.'
    ],
    pediatricUse: 'Current DailyMed label provides a 1 mL daily serving and nutrient amounts for infants through 12 months and children 1 through 4 years; DoseCare therefore limits this product-specific regimen to 0–48 months.'
  },
  sources: [
    {
      title: 'DailyMed — POLY-VITE PEDIATRIC ORAL SOLUTION',
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4747740d-867b-48af-8814-8f2252ec0cb7'
    }
  ]
});
