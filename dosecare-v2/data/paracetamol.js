/* DoseCare V2 — Paracetamol (acetaminophen) */

DoseCareV2Database.register({
  id: 'paracetamol',
  name: 'Paracetamol (Acetaminophen)',
  genericName: 'Paracetamol (Acetaminophen)',
  activeIngredient: 'Acetaminophen',

  dosageForm: 'Oral suspension',
  route: 'Oral',

  formulations: [
    {
      display: '160 mg/5 mL',
      mgPer5mL: 160,
      concentration: {
        amount: 160,
        unit: 'mg',
        volume: 5,
        volumeUnit: 'mL'
      }
    }
  ],

  regimens: [
    {
      id: 'who-weight-based',
      type: 'mg_per_kg_per_dose',

      minDose: 15,
      maxDose: 15,

      frequency: 4,
      frequencyText: 'Every 4–6 hours as needed; maximum 4 doses in 24 hours.',
      maximumDosesPer24Hours: 4,

      unit: 'mg/kg/dose',

      minAgeMonths: 3,

      notes:
        'WHO Model Formulary for Children: infants and children may receive 15 mg/kg per dose every 4–6 hours as necessary, with a maximum of 4 doses in 24 hours. Infants under 3 months should not receive paracetamol unless advised by a doctor.'
    }
  ],

  information: {
    class: 'Analgesic / antipyretic',

    indications: [
      'Mild to moderate pain',
      'Fever'
    ],

    mechanism:
      'Analgesic and antipyretic; the precise mechanism of action is not fully established.',

    precautions: [
      'Do not use with another medicine containing acetaminophen.',
      'Use caution in hepatic impairment.',
      'Verify the child’s weight before calculating the dose.',
      'Check the total daily dose from all acetaminophen/paracetamol-containing medicines.'
    ],

    adverseEffects: [
      'Severe liver damage can occur with overdose.',
      'Severe skin reactions can occur.'
    ],

    notes:
      'DoseCare uses the WHO weight-based pediatric regimen for calculation. Some specific OTC acetaminophen product labels use age/weight tables and may instruct caregivers to ask a doctor for children under 2 years; product-specific labeling should be checked when dispensing a particular product.'
  },

  sources: [
    {
      organization: 'World Health Organization',
      title: 'WHO Model Formulary for Children 2010',
      url: 'https://www.who.int/publications/i/item/9789241599320'
    },
    {
      organization: 'DailyMed',
      title: "Acetaminophen Oral Suspension — 160 mg/5 mL",
      url: 'https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=caf5daea-409e-5dd2-e053-2995a90acb12'
    }
  ]
});
