/* DoseCare V2 — Dextromethorphan polistirex extended-release oral suspension
 * Pediatric dosing source: current DailyMed label for Dextromethorphan Polistirex 30 mg/5 mL oral suspension.
 * Oral liquid only. DoseCare encodes only the labeled pediatric regimens for this formulation.
 */
DoseCareV2Database.register({
  id: 'dextromethorphan',
  name: 'Dextromethorphan',
  genericName: 'Dextromethorphan',
  activeIngredient: 'Dextromethorphan polistirex',
  dosageForm: 'Extended-release oral suspension',
  route: 'Oral',
  category: 'Cough suppressant',
  dosing: { calculatorReady: true },
  formulations: [
    {
      id: 'dextromethorphan-polistirex-30mg-5ml',
      display: '30 mg/5 mL',
      mgPer5mL: 30,
      concentration: { amount: 30, unit: 'mg', volume: 5, volumeUnit: 'mL' }
    }
  ],
  regimens: [
    {
      id: 'age-4-to-under-6',
      type: 'label_age_based',
      minAgeYears: 4,
      maxAgeYears: 5.999,
      doseMin: 15,
      doseMax: 15,
      doseUnit: 'mg/dose',
      volumeMin: 2.5,
      volumeMax: 2.5,
      frequency: 2,
      frequencyText: 'Every 12 hours',
      maxDosesPer24h: 2,
      maxDailyVolume: 5,
      maxDailyVolumeUnit: 'mL/day',
      requiresAge: true,
      requiresWeight: false,
      allowedFormulations: ['dextromethorphan-polistirex-30mg-5ml'],
      condition: 'Temporary relief of cough due to minor throat and bronchial irritation'
    },
    {
      id: 'age-6-to-under-12',
      type: 'label_age_based',
      minAgeYears: 6,
      maxAgeYears: 11.999,
      doseMin: 30,
      doseMax: 30,
      doseUnit: 'mg/dose',
      volumeMin: 5,
      volumeMax: 5,
      frequency: 2,
      frequencyText: 'Every 12 hours',
      maxDosesPer24h: 2,
      maxDailyVolume: 10,
      maxDailyVolumeUnit: 'mL/day',
      requiresAge: true,
      requiresWeight: false,
      allowedFormulations: ['dextromethorphan-polistirex-30mg-5ml'],
      condition: 'Temporary relief of cough due to minor throat and bronchial irritation'
    },
    {
      id: 'age-12-and-over',
      type: 'label_age_based',
      minAgeYears: 12,
      doseMin: 60,
      doseMax: 60,
      doseUnit: 'mg/dose',
      volumeMin: 10,
      volumeMax: 10,
      frequency: 2,
      frequencyText: 'Every 12 hours',
      maxDosesPer24h: 2,
      maxDailyVolume: 20,
      maxDailyVolumeUnit: 'mL/day',
      requiresAge: true,
      requiresWeight: false,
      allowedFormulations: ['dextromethorphan-polistirex-30mg-5ml'],
      condition: 'Temporary relief of cough due to minor throat and bronchial irritation'
    }
  ],
  information: {
    class: 'Antitussive',
    indications: ['Temporary relief of cough due to minor throat and bronchial irritation, such as with the common cold or inhaled irritants.'],
    mechanism: 'Dextromethorphan is a centrally acting cough suppressant that reduces the cough reflex.',
    contraindications: [
      'Do not use with a prescription monoamine oxidase inhibitor (MAOI) or within 2 weeks after stopping an MAOI.',
      'Do not use in children under 4 years for the cited 30 mg/5 mL extended-release suspension.'
    ],
    precautions: [
      'Ask a doctor before use for chronic cough associated with smoking, asthma or emphysema, or cough with excessive phlegm.',
      'Contains sodium metabisulfite, which may cause allergic-type reactions in susceptible patients.',
      'Do not exceed the labeled dose.',
      'Stop use and seek medical advice if cough lasts more than 7 days, returns, or occurs with fever, rash or persistent headache.'
    ],
    adverseEffects: ['Drowsiness', 'Dizziness', 'Nausea', 'Vomiting'],
    interactions: [
      'Monoamine oxidase inhibitors (MAOIs) are contraindicated during use and for 2 weeks after stopping the MAOI.',
      'Other medicines that cause central nervous system depression may increase drowsiness or sedation; use caution.'
    ],
    administration: 'Shake well before use. Measure only with the supplied dosing cup and do not use the cup with other products.',
    pediatricUse: 'For 30 mg/5 mL extended-release suspension: ages 4–<6 years 2.5 mL every 12 hours (maximum 5 mL/24 h); ages 6–<12 years 5 mL every 12 hours (maximum 10 mL/24 h); ages ≥12 years 10 mL every 12 hours (maximum 20 mL/24 h). Do not use under 4 years.',
    notes: 'This V2 record represents single-ingredient dextromethorphan polistirex extended-release oral suspension only. Combination cough/cold products and other formulations are intentionally excluded.'
  },
  sources: [
    {
      organization: 'DailyMed',
      title: 'COUGH DM — Dextromethorphan Polistirex Suspension, 30 mg/5 mL',
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=cdb5616e-0f04-4b9e-a82b-994e9ba3b515'
    }
  ]
});
