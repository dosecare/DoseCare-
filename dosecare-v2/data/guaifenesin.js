/* DoseCare V2 — Guaifenesin pediatric oral solution
 * Primary source: DailyMed labeling for Guaifenesin Oral Solution USP 100 mg/5 mL.
 * Oral liquid only. DoseCare preserves the labeled pediatric dose ranges and does not extrapolate a dose for children under 2 years.
 */
window.DoseCareV2Database?.register({
  id: 'guaifenesin',
  name: 'Guaifenesin',
  genericName: 'Guaifenesin',
  activeIngredient: 'Guaifenesin',
  dosageForm: 'Oral Solution',
  route: 'Oral',
  category: 'Expectorant',
  dosing: {
    calculatorReady: true
  },
  formulations: [
    {
      id: 'guaifenesin-100mg-5ml',
      display: '100 mg/5 mL',
      mgPer5mL: 100,
      concentration: { amount: 100, unit: 'mg', volume: 5, volumeUnit: 'mL' }
    }
  ],
  regimens: [
    {
      id: 'age-2-to-under-6',
      type: 'label_age_based',
      condition: 'Cough with chest congestion / excessive mucus',
      doseMin: 2.5,
      doseMax: 5,
      volumeMin: 2.5,
      volumeMax: 5,
      doseUnit: 'mL/dose',
      frequency: 6,
      frequencyText: 'Every 4 hours; do not exceed 6 doses in 24 hours',
      minAgeYears: 2,
      maxAgeYears: 6,
      maxAgeExclusive: true,
      requiresAge: true,
      requiresWeight: false,
      allowedFormulations: ['guaifenesin-100mg-5ml'],
      maximumDailyDoses: 6
    },
    {
      id: 'age-6-to-under-12',
      type: 'label_age_based',
      condition: 'Cough with chest congestion / excessive mucus',
      doseMin: 5,
      doseMax: 10,
      volumeMin: 5,
      volumeMax: 10,
      doseUnit: 'mL/dose',
      frequency: 6,
      frequencyText: 'Every 4 hours; do not exceed 6 doses in 24 hours',
      minAgeYears: 6,
      maxAgeYears: 12,
      maxAgeExclusive: true,
      requiresAge: true,
      requiresWeight: false,
      allowedFormulations: ['guaifenesin-100mg-5ml'],
      maximumDailyDoses: 6
    }
  ],
  information: {
    class: 'Expectorant',
    indications: ['Temporarily relieves cough due to minor throat and bronchial irritation and helps loosen phlegm / thin bronchial secretions.'],
    mechanism: 'Guaifenesin is an expectorant that helps loosen and thin bronchial secretions, making mucus easier to clear by coughing.',
    precautions: ['Do not exceed 6 doses in any 24-hour period for the cited product.', 'Ask a doctor before use for cough with excessive phlegm or chronic cough associated with asthma, chronic bronchitis, emphysema or smoking.', 'Stop use and seek medical advice if cough lasts more than 7 days, returns, or is accompanied by fever, rash or persistent headache.', 'Use an appropriate measuring device for liquid dosing.'],
    adverseEffects: ['Nausea', 'Vomiting', 'Stomach discomfort', 'Dizziness', 'Headache'],
    contraindications: ['Hypersensitivity to guaifenesin or any ingredient in the formulation.'],
    administration: 'Administer orally using the supplied measuring device. The cited product is an oral solution containing 100 mg guaifenesin per 5 mL.',
    pediatricUse: 'For the selected 100 mg/5 mL oral solution: ages 2 to under 6 years receive 2.5–5 mL every 4 hours; ages 6 to under 12 years receive 5–10 mL every 4 hours. Children under 2 years should be referred to a physician rather than assigned an extrapolated dose.',
    notes: 'DoseCare preserves the labeled volume ranges rather than selecting an arbitrary single volume. Combination products containing dextromethorphan or other actives are not represented by this single-ingredient record.'
  },
  sources: [
    { organization: 'DailyMed', title: 'Guaifenesin Oral Solution USP 100 mg/5 mL — labeling', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1db51cac-13c3-6ee0-e063-6294a90ad4ac' },
    { organization: 'DailyMed', title: 'Guaifenesin Oral Solution — labeling, effective 2026', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=888b6a2e-6631-4585-a7fe-eb122eb51b23' }
  ]
});
