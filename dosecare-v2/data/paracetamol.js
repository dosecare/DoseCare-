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
      id: 'clinical-weight-based-under-2',
      type: 'mg_per_kg_per_dose',
      condition: 'Paracetamol dosing',
      minAgeMonths: 3,
      maxAgeMonths: 23,
      minDose: 10,
      maxDose: 15,
      unit: 'mg/kg/dose',
      frequency: 4,
      frequencyText: 'Every 6 hours as needed',
      interval: 'Every 6 hours as needed',
      intervalHours: 6,
      maximumDosesPer24Hours: 4,
      maxDailyDose: 60,
      requiresAge: true,
      requiresWeight: true,
      notes:
        'Clinical weight-based regimen for children 3–23 months. WHO clinical guidance supports 10–15 mg/kg per dose at 6-hour intervals, with a maximum of 60 mg/kg/day. The selected 160 mg/5 mL OTC label asks caregivers to consult a doctor for children under 2 years; this clinical regimen is intended for pharmacist/clinician use.'
    },
    {
      id: 'label-weight-age-chart',
      type: 'label_weight_age_based',
      condition: 'Paracetamol dosing',
      minAgeYears: 2,
      maxAgeYears: 11,
      frequencyText: 'Every 4 hours as needed',
      maximumDosesPer24Hours: 5,
      table: [
        { minLb: 24, maxLb: 35, minAgeYears: 2, maxAgeYears: 3, doseMl: 5 },
        { minLb: 36, maxLb: 47, minAgeYears: 4, maxAgeYears: 5, doseMl: 7.5 },
        { minLb: 48, maxLb: 59, minAgeYears: 6, maxAgeYears: 8, doseMl: 10 },
        { minLb: 60, maxLb: 71, minAgeYears: 9, maxAgeYears: 10, doseMl: 12.5 },
        { minLb: 72, maxLb: 95, minAgeYears: 11, maxAgeYears: 11, doseMl: 15 }
      ],
      under24LbMessage:
        'This product label does not provide a self-dosing band for children under 24 lb or under 2 years. Verify the product label and consult a clinician for infants and smaller children.',
      noMatchingBandMessage:
        'No labeled dose band matches this age/weight. The selected 160 mg/5 mL product label starts at 24 lb and 2 years; for younger or smaller children, use the clinical regimen only when clinically appropriate rather than estimating an OTC label dose.'
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
