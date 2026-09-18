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
      concentration: { amount: 160, unit: 'mg', volume: 5, volumeUnit: 'mL' }
    }
  ],
  regimens: [
    {
      id: 'clinical-weight-based-under-2',
      type: 'mg_per_kg_per_dose',
      condition: 'Paracetamol dosing',
      minAgeMonths: 3,
      maxAgeMonths: 23,
      minWeightKg: 3,
      maxWeightKg: 29.99,
      minDose: 10,
      maxDose: 15,
      unit: 'mg/kg/dose',
      frequencyText: 'Every 6 hours as needed',
      interval: 'Every 6 hours as needed',
      intervalHours: 6,
      frequency: 4,
      maximumDosesPer24Hours: 5,
      maxDailyDose: 60,
      requiresAge: true,
      requiresWeight: true,
      notes: 'Clinical weight-based reference for children 3–23 months. The WHO reference supports 10–15 mg/kg/dose at 6-hour intervals; the selected 160 mg/5 mL product label requires clinician confirmation for children under 2 years. Do not estimate a dose outside the configured weight range.'
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
      under24LbMessage: 'This product label does not provide a self-dosing band for children under 24 lb or under 2 years. Verify the product label and consult a clinician for infants and smaller children.',
      noMatchingBandMessage: 'No labeled dose band matches this age/weight. The selected 160 mg/5 mL product label starts at 24 lb and 2 years; for younger or smaller children, verify the product label and consult a clinician rather than estimating a dose.'
    }
  ],
  information: {
    class: 'Analgesic / antipyretic',
    indications: [
      'Temporary reduction of fever',
      'Temporary relief of minor aches and pains'
    ],
    mechanism: 'Analgesic and antipyretic; the precise mechanism of action is not fully established.',
    precautions: [
      'Do not use with another medicine containing acetaminophen.',
      'Ask a doctor before use if the child has liver disease.',
      'Ask a doctor or pharmacist before use if the child is taking warfarin.',
      'For children under 2 years, verify the clinical dose and product labeling before administration.'
    ],
    adverseEffects: [
      'Severe liver damage can occur with overdose.',
      'Severe skin reactions can occur.'
    ],
    notes: 'Shake well before use. The 160 mg/5 mL product label uses an age/weight dosing chart for children 2–11 years and directs users to consult a doctor for children under 2 years. DoseCare also stores a separate WHO-based clinical weight regimen for children 3–23 months; these regimens are selected automatically by age.'
  },
  sources: [
    {
      organization: 'World Health Organization',
      title: 'The WHO AWaRe Antibiotic Book — paracetamol dosing table',
      url: 'https://iris.who.int/bitstream/handle/10665/365237/9789240062382-eng.pdf?sequence=1'
    },
    {
      organization: 'DailyMed',
      title: "Children's Acetaminophen Oral Suspension — 160 mg/5 mL",
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=44de6f5a-0b5c-6c28-e063-6394a90a7e0b'
    },
    {
      organization: 'U.S. FDA',
      title: 'Over-the-Counter Pediatric Oral Liquid Drug Products Containing Acetaminophen — Guidance for Industry',
      url: 'https://www.fda.gov/files/drugs/published/Over-the-Counter-Pediatric-Oral-Liquid-Drug-Products-Containing-Acetaminophen.pdf'
    }
  ]
});
