/* DoseCare V2 — Paracetamol (acetaminophen) */
DoseCareV2Database.register({
  id: 'paracetamol',
  name: 'Paracetamol (Acetaminophen)',
  genericName: 'Paracetamol (Acetaminophen)',
  activeIngredient: 'Acetaminophen',
  dosageForm: 'Oral suspension',
  route: 'Oral',
  formulations: [{ display: '160 mg/5 mL', mgPer5mL: 160, concentration: { amount: 160, unit: 'mg', volume: 5, volumeUnit: 'mL' } }],
  regimens: [{
    id: 'label-weight-age-chart', type: 'label_weight_age_based', frequencyText: 'Every 4 hours as needed', maximumDosesPer24Hours: 5,
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
    precautions: ['Do not use with another medicine containing acetaminophen.', 'Ask a doctor before use if the child has liver disease.', 'Ask a doctor or pharmacist before use if the child is taking warfarin.'],
    adverseEffects: ['Severe liver damage can occur with overdose.', 'Severe skin reactions can occur.'],
    notes: 'Shake well before use. The referenced product label instructs users to dose by weight when possible, otherwise by age, repeat every 4 hours while symptoms last, and not exceed 5 doses in 24 hours.'
  },
  sources: [
    { organization: 'DailyMed', title: "Children's Acetaminophen Oral Suspension — 160 mg/5 mL", url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=44de6f5a-0b5c-6c28-e063-6394a90a7e0b' },
    { organization: 'U.S. FDA', title: 'Over-the-Counter Pediatric Oral Liquid Drug Products Containing Acetaminophen — Guidance for Industry', url: 'https://www.fda.gov/files/drugs/published/Over-the-Counter-Pediatric-Oral-Liquid-Drug-Products-Containing-Acetaminophen.pdf' }
  ]
});
