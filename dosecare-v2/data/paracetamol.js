/* DoseCare V2 — Paracetamol (acetaminophen) */
DoseCareV2Database.register({
  id: 'paracetamol',
  name: 'Paracetamol (Acetaminophen)',
  genericName: 'Paracetamol (Acetaminophen)',
  activeIngredient: 'Acetaminophen',
  dosageForm: 'Oral suspension',
  route: 'Oral',
  formulations: [{
    id: '160mg-5mL',
    display: '160 mg/5 mL',
    mgPer5mL: 160,
    concentration: { amount: 160, unit: 'mg', volume: 5, volumeUnit: 'mL' }
  }],
  allowedFormulations: ['160mg-5mL'],
  regimens: [{
    id: 'label-weight-age-chart',
    type: 'label_weight_age_based',
    ageOrWeight: true,
    allowedFormulations: ['160mg-5mL'],
    frequencyText: 'Every 4 hours as needed',
    maximumDosesPer24Hours: 5,
    table: [
      { minLb: 24, maxLb: 35, minAgeYears: 2, maxAgeYears: 3, doseMl: 5 },
      { minLb: 36, maxLb: 47, minAgeYears: 4, maxAgeYears: 5, doseMl: 7.5 },
      { minLb: 48, maxLb: 59, minAgeYears: 6, maxAgeYears: 8, doseMl: 10 },
      { minLb: 60, maxLb: 71, minAgeYears: 9, maxAgeYears: 10, doseMl: 12.5 },
      { minLb: 72, maxLb: 95, minAgeYears: 11, maxAgeYears: 11, doseMl: 15 }
    ],
    under24LbMessage: 'For a child under 24 lb or under 2 years, the product label directs the user to ask a doctor.'
  }],
  information: {
    class: 'Analgesic / antipyretic',
    indications: ['Temporary reduction of fever', 'Temporary relief of minor aches and pains'],
    mechanism: 'Analgesic and antipyretic; the precise mechanism of action is not fully established.',
    contraindications: [
      'Do not use in a child with a known hypersensitivity to acetaminophen or any component of the product.'
    ],
    precautions: [
      'Do not use with another medicine containing acetaminophen.',
      'Ask a doctor before use if the child has liver disease.',
      'Ask a doctor or pharmacist before use if the child is taking warfarin.',
      'Do not exceed 5 doses in 24 hours.'
    ],
    adverseEffects: [
      'Severe liver damage can occur with overdose.',
      'Severe skin reactions can occur.'
    ],
    interactions: [
      'Other acetaminophen-containing medicines: additive overdose risk.',
      'Warfarin: consult a doctor or pharmacist before use.'
    ],
    administration: [
      'Shake well before use.',
      'Use the dosing device supplied with the product.',
      'Dose every 4 hours as needed while symptoms last; do not exceed 5 doses in 24 hours.'
    ],
    pediatricUse: 'The referenced current product is labeled for children 2–11 years. For children under 2 years or under 24 lb, the label directs the user to ask a doctor. The calculator therefore does not generate an automatic regimen below this cutoff.',
    notes: 'The referenced current product contains acetaminophen 160 mg/5 mL. The label provides a combined weight/age dosing chart rather than a universal mg/kg regimen; DoseCare preserves that product-specific chart to avoid inventing a dose.'
  },
  sources: [
    { organization: 'DailyMed', title: "Children's Tylenol — acetaminophen suspension, current labeling", url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3162733b-9382-39f1-e063-6294a90ac420' },
    { organization: 'U.S. FDA', title: 'Over-the-Counter Pediatric Oral Liquid Drug Products Containing Acetaminophen — Guidance for Industry', url: 'https://www.fda.gov/files/drugs/published/Over-the-Counter-Pediatric-Oral-Liquid-Drug-Products-Containing-Acetaminophen.pdf' }
  ]
});
