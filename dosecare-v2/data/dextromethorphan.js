/* DoseCare V2 — Dextromethorphan polistirex extended-release oral suspension */
DoseCareV2Database.register({
  id: 'dextromethorphan',
  name: 'Dextromethorphan',
  genericName: 'Dextromethorphan',
  activeIngredient: 'Dextromethorphan polistirex',
  dosageForm: 'Extended-release oral suspension',
  route: 'Oral',
  category: 'Cough suppressant',
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
      requiresAge: true,
      requiresWeight: false,
      condition: 'Cough — age 4 to under 6 years'
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
      requiresAge: true,
      requiresWeight: false,
      condition: 'Cough — age 6 to under 12 years'
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
      requiresAge: true,
      requiresWeight: false,
      condition: 'Cough — age 12 years and over'
    }
  ],
  information: {
    class: 'Antitussive',
    indications: ['Temporary relief of cough due to minor throat and bronchial irritation'],
    mechanism: 'Dextromethorphan is a centrally acting cough suppressant that reduces the cough reflex.',
    precautions: [
      'Do not use with a monoamine oxidase inhibitor (MAOI) or within 2 weeks after stopping an MAOI.',
      'Ask a doctor before use with chronic cough associated with smoking, asthma or emphysema, or cough with excessive phlegm.',
      'Contains sodium metabisulfite, which may cause allergic-type reactions in susceptible patients.',
      'Stop use and seek medical advice if cough lasts more than 7 days, returns, or occurs with fever, rash or persistent headache.'
    ],
    adverseEffects: ['Drowsiness', 'Dizziness', 'Nausea', 'Vomiting'],
    notes: 'This V2 record represents the single-ingredient dextromethorphan polistirex extended-release oral suspension only. Combination cough/cold products are intentionally excluded.'
  },
  sources: [
    {
      organization: 'DailyMed',
      title: 'Cough DM — Dextromethorphan Polistirex Extended-Release Oral Suspension',
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=cdb5616e-0f04-4b9e-a82b-994e9ba3b515'
    }
  ]
});
