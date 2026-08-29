/* DoseCare V2 — Ibuprofen
   Independent V2 medicine record.
   Pediatric oral-liquid source basis: current FDA/DailyMed labeling.
*/
window.DOSECARE_V2_MEDICINES = window.DOSECARE_V2_MEDICINES || [];
window.DOSECARE_V2_MEDICINES.push({
  id: 'ibuprofen',
  name: 'Ibuprofen',
  genericName: 'Ibuprofen',
  activeIngredient: 'Ibuprofen',
  dosageForm: 'Oral suspension',
  route: 'Oral',
  formulations: [{
    display: '100 mg/5 mL',
    mgPer5mL: 100,
    concentration: { amount: 100, unit: 'mg', volume: 5, volumeUnit: 'mL' }
  }],
  regimens: [{
    id: 'label-weight-age-chart',
    type: 'label_weight_age_based',
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
    mechanism: 'Ibuprofen has analgesic, antipyretic, and anti-inflammatory activity; its mechanism is not completely understood and may be related to inhibition of prostaglandin synthesis.',
    precautions: ['Do not use with another medicine containing an NSAID unless directed.', 'Use caution in children with a history of stomach bleeding or ulcers.', 'Seek medical advice for children with relevant allergy, kidney disease, dehydration, or other contraindicating conditions.'],
    adverseEffects: ['Serious gastrointestinal bleeding can occur.', 'Severe allergic reactions can occur.', 'NSAIDs can cause serious cardiovascular and other adverse effects, particularly with excessive or prolonged use.'],
    notes: 'Shake well before use. Use the labeled dosing chart and an appropriate dosing device. Do not exceed 4 doses in 24 hours.'
  },
  sources: [
    { organization: 'DailyMed', title: 'Ibuprofen Oral Suspension USP — 100 mg/5 mL', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3ce7549f-e4db-9f89-e063-6294a90a126d' },
    { organization: 'U.S. FDA', title: 'Questions and Answers on Compounded Oral Suspension Medications for Pain and Fever', url: 'https://www.fda.gov/drugs/human-drug-compounding/questions-and-answers-compounded-oral-suspension-medications-pain-and-fever' }
  ]
});
