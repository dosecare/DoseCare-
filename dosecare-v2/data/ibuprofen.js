/* DoseCare V2 — Ibuprofen */
DoseCareV2Database.register({
  id: 'ibuprofen',
  name: 'Ibuprofen',
  genericName: 'Ibuprofen',
  activeIngredient: 'Ibuprofen',
  dosageForm: 'Oral suspension',
  route: 'Oral',
  formulations: [{
    id: '100mg-5mL',
    display: '100 mg/5 mL',
    mgPer5mL: 100,
    concentration: { amount: 100, unit: 'mg', volume: 5, volumeUnit: 'mL' }
  }],
  allowedFormulations: ['100mg-5mL'],
  regimens: [{
    id: 'label-weight-age-chart',
    type: 'label_weight_age_based',
    allowedFormulations: ['100mg-5mL'],
    frequencyText: 'Every 6–8 hours as needed',
    maximumDosesPer24Hours: 4,
    table: [
      { minLb: 24, maxLb: 35, minAgeYears: 2, maxAgeYears: 3, doseMl: 5 },
      { minLb: 36, maxLb: 47, minAgeYears: 4, maxAgeYears: 5, doseMl: 7.5 },
      { minLb: 48, maxLb: 59, minAgeYears: 6, maxAgeYears: 8, doseMl: 10 },
      { minLb: 60, maxLb: 71, minAgeYears: 9, maxAgeYears: 10, doseMl: 12.5 },
      { minLb: 72, maxLb: 95, minAgeYears: 11, maxAgeYears: 11, doseMl: 15 }
    ],
    under24LbMessage: 'For a child under 24 lb or under 2 years, this OTC product label directs the user to ask a doctor.'
  }],
  information: {
    class: 'Nonsteroidal anti-inflammatory drug (NSAID)',
    indications: ['Temporary reduction of fever', 'Temporary relief of minor aches and pains'],
    mechanism: 'Ibuprofen has analgesic, antipyretic, and anti-inflammatory activity; its mechanism is related to inhibition of prostaglandin synthesis.',
    contraindications: [
      'Do not use in a child with a known allergy to ibuprofen or another NSAID unless directed by a clinician.',
      'Do not use immediately before or after heart surgery unless specifically directed by a clinician.'
    ],
    precautions: [
      'Ask a doctor before use if the child has ever had stomach bleeding or ulcers, asthma, heart disease, high blood pressure, kidney disease, or is dehydrated.',
      'Ask a doctor or pharmacist before use if the child is taking a diuretic, an anticoagulant, a corticosteroid, aspirin, or another NSAID.',
      'Use the lowest effective dose for the shortest duration consistent with treatment goals.',
      'Do not exceed 4 doses in 24 hours.',
      'Stop and seek medical advice if pain lasts more than 10 days, fever lasts more than 3 days, or new symptoms appear, according to the product labeling.'
    ],
    adverseEffects: [
      'Serious gastrointestinal bleeding can occur.',
      'Serious allergic reactions can occur.',
      'Kidney injury and other serious NSAID adverse effects can occur, particularly with dehydration, excessive dosing, or prolonged use.'
    ],
    interactions: [
      'Other NSAIDs or aspirin: concomitant use can increase adverse-effect risk and is not recommended unless directed by a clinician.',
      'Anticoagulants: increased bleeding risk; consult a clinician.',
      'Corticosteroids: increased gastrointestinal bleeding risk.',
      'Diuretics and some antihypertensive medicines: NSAIDs may reduce their effect and may increase renal risk in susceptible patients.'
    ],
    administration: [
      'Shake well before use.',
      'Use the dosing device supplied with the product.',
      'If needed, repeat the labeled dose every 6–8 hours; do not exceed 4 doses in 24 hours.'
    ],
    pediatricUse: 'The referenced OTC 100 mg/5 mL product provides an automatic dosing chart for children 2–11 years who are 24–95 lb. For a child under 24 lb or under 2 years, the label directs the user to ask a doctor. The calculator therefore does not generate an automatic chart dose below this cutoff.',
    notes: 'DoseCare uses the product-specific weight/age chart rather than replacing it with a generic mg/kg regimen. A separate DailyMed prescription labeling source documents additional pediatric dosing for selected indications, but those regimens are not automatically added here because this DoseCare entry is based on the referenced OTC pediatric product label.'
  },
  sources: [
    { organization: 'DailyMed', title: 'Ibuprofen Oral Suspension USP — 100 mg/5 mL, pediatric OTC labeling', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3ce7549f-e4db-9f89-e063-6294a90a126d' },
    { organization: 'DailyMed', title: 'Ibuprofen Oral Suspension USP — pediatric prescription dosing', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=dda7645f-1666-4c1f-b974-01add2ea79ac' }
  ]
});
