/* DoseCare V2 — Nystatin oral suspension */

DoseCareV2Database.register({
  id: 'nystatin',
  name: 'Nystatin',
  genericName: 'Nystatin',
  activeIngredient: 'Nystatin',

  dosageForm: 'Oral suspension',
  route: 'Oral',

  formulations: [
    {
      display: '100,000 units/mL',
      concentration: {
        amount: 100000,
        unit: 'units',
        volume: 1,
        volumeUnit: 'mL'
      }
    }
  ],

  regimens: [
    {
      id: 'oral-candidiasis-infants',
      type: 'fixed_dose',
      condition: 'Oral candidiasis',
      minAgeMonths: 0,
      maxAgeMonths: 23,
      doseMl: 2,
      frequency: 4,
      frequencyText: 'Four times daily',
      requiresAge: true,
      requiresWeight: false,
      notes:
        'For infants: 2 mL (200,000 units) four times daily. In infants and young children, place one-half of the dose in each side of the mouth using a dropper.'
    },
    {
      id: 'oral-candidiasis-children',
      type: 'fixed_dose',
      condition: 'Oral candidiasis',
      minAgeMonths: 24,
      maxAgeMonths: 216,
      minDoseMl: 4,
      maxDoseMl: 6,
      frequency: 4,
      frequencyText: 'Four times daily',
      requiresAge: true,
      requiresWeight: false,
      notes:
        'For children and adults: 4–6 mL (400,000–600,000 units) four times daily. Retain the preparation in the mouth as long as possible before swallowing.'
    }
  ],

  information: {
    class: 'Polyene antifungal',

    indications: [
      'Treatment of oral candidiasis'
    ],

    mechanism:
      'Binds to ergosterol in fungal cell membranes, increasing membrane permeability and causing leakage of cellular contents.',

    precautions: [
      'Shake well before use.',
      'In infants and young children, use an oral dropper and divide the dose between both sides of the mouth.',
      'Avoid feeding for 5–10 minutes after administration in infants and young children.',
      'Retain the suspension in the mouth as long as possible before swallowing when appropriate.',
      'Use the prescribed measuring device to ensure accurate dosing.'
    ],

    adverseEffects: [
      'Oral irritation or sensitization',
      'Diarrhea',
      'Nausea or vomiting',
      'Rash or urticaria',
      'Rare hypersensitivity reactions'
    ],

    notes:
      'Nystatin oral suspension has negligible gastrointestinal absorption. The current DailyMed labeling specifies 100,000 units/mL and provides fixed-dose regimens rather than weight-based dosing. Treatment should continue for at least 48 hours after symptoms have disappeared and cultures demonstrate eradication of Candida albicans when applicable.'
  },

  sources: [
    {
      organization: 'DailyMed',
      title: 'Nystatin Oral Suspension USP — 100,000 units/mL',
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=28b4e26e-206a-4e8a-abfe-774b780e91c3'
    },
    {
      organization: 'DailyMed',
      title: 'Nystatin Oral Suspension USP — Pediatric Dosage and Administration',
      url: 'https://www.dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=1e1b762a-800f-b79c-e063-6294a90a99c9'
    }
  ]
});