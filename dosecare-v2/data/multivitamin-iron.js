/* DoseCare V2 — pediatric multivitamin with iron oral liquid. */
window.DoseCareV2Database.register({
  id: 'multivitamin-iron',
  name: 'Multivitamin + Iron',
  genericName: 'Pediatric multivitamin with iron',
  brandNames: ['NovaFerrum Multivitamin with Iron Pediatric Drops'],
  dosageForm: 'Oral liquid drops',
  route: 'Oral',
  category: 'Vitamins & Supplements',
  formulations: [
    {
      id: 'multivitamin-iron-10mg-elemental-iron-per-ml',
      dosageForm: 'Oral liquid drops',
      concentration: { amount: 10, unit: 'mg', volume: 1, volumeUnit: 'mL' },
      display: 'Provides 10 mg iron + multivitamins per 1 mL',
      mgPerMl: 10,
      concentrationBasis: 'Elemental iron anchor; product is a multivitamin combination supplement'
    }
  ],
  regimens: [
    {
      id: 'multivitamin-iron-infants-under-4-years',
      condition: 'Product-label multivitamin supplementation',
      type: 'fixed_dose',
      minAgeYears: 0,
      maxAgeYears: 3.999,
      dose: 10,
      unit: 'mg iron/day',
      frequency: 1,
      frequencyText: '1 mL once daily',
      allowedFormulations: ['multivitamin-iron-10mg-elemental-iron-per-ml']
    }
  ],
  information: {
    mechanism: 'Combination nutritional supplement providing iron and multiple vitamins.',
    indications: 'Dietary supplementation for infants and children under 4 years according to the product label.',
    precautions: [
      'This is a dietary supplement label regimen, not an iron-deficiency treatment regimen.',
      'The label warns that accidental overdose of iron-containing products can be fatal in young children; keep out of reach.',
      'Shake well before use.',
      'Do not substitute this product for a therapeutic elemental-iron regimen when treatment of iron deficiency is required.'
    ],
    pediatricUse: 'The DailyMed product label recommends 1 mL daily for infants and children under 4 years of age unless otherwise directed by a physician.'
  },
  sources: [
    {
      title: 'DailyMed — NovaFerrum Multivitamin with Iron Pediatric Drops',
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=516d759f-a304-431b-8da5-64c292de88e2'
    }
  ]
});
