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
      display: '10 mg elemental iron + multivitamins per 1 mL',
      mgPerMl: 10,
      concentrationBasis: 'Elemental iron; as polysaccharide-iron complex'
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
      unit: 'mg elemental iron/day',
      frequency: 1,
      frequencyText: '1 mL once daily',
      allowedFormulations: ['multivitamin-iron-10mg-elemental-iron-per-ml']
    }
  ],
  information: {
    mechanism: 'Combination nutritional supplement providing elemental iron and multiple vitamins.',
    indications: 'Dietary supplementation for infants and children under 4 years according to the product label.',
    contraindications: [
      'Do not use as a substitute for clinician-directed treatment of iron deficiency or other medical conditions.'
    ],
    precautions: [
      'This is a dietary supplement label regimen, not an iron-deficiency treatment regimen.',
      'Accidental overdose of iron-containing products can be fatal in young children; keep out of reach of children.',
      'Shake well before use.',
      'Do not exceed the recommended 1 mL daily dose unless otherwise directed by a physician.',
      'Use an appropriate metric dosing device and do not confuse this product with therapeutic iron formulations of different concentrations.'
    ],
    adverseEffects: [
      'Iron-containing products may cause gastrointestinal adverse effects; accidental overdose can cause severe or fatal iron poisoning.'
    ],
    interactions: [
      'No specific drug interactions are stated in the cited product label. Therapeutic iron can interact with some medicines; review concomitant therapy when the product is used with prescribed medicines.'
    ],
    administration: 'Shake well. Fill the supplied dropper to the 1 mL mark and administer orally once daily. Unless otherwise directed by a physician, do not exceed 1 mL daily.',
    pediatricUse: 'The DailyMed product label recommends 1 mL daily for infants and children under 4 years of age unless otherwise directed by a physician. The product provides 10 mg elemental iron per 1 mL as polysaccharide-iron complex, plus multiple vitamins.'
  },
  sources: [
    {
      title: 'DailyMed — NovaFerrum Multivitamin with Iron Pediatric Drops',
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a108a43d-f02b-44dc-9400-9c26d15d7863'
    },
    {
      title: 'NovaFerrum — Multivitamin with Iron Pediatric Drops',
      url: 'https://www.novaferrum.com/products/novaferrum-multivitamin-with-iron-pediatric-drops'
    }
  ]
});
