/* DoseCare V2 — Levetiracetam pediatric oral solution */
window.DoseCareV2Database?.register({
  id: 'levetiracetam',
  name: 'Levetiracetam',
  genericName: 'Levetiracetam',
  active: true,
  dosageForm: 'Oral solution',
  route: 'Oral',
  category: 'Antiepileptic',
  formulations: [
    {
      id: '100mg-per-ml',
      display: '100 mg/mL (500 mg/5 mL)',
      concentration: { amount: 100, volume: 1, unit: 'mg/mL' }
    }
  ],
  regimens: [
    {
      id: 'partial-onset-1m-6m',
      type: 'mg_per_kg_per_dose',
      condition: 'Partial-onset seizures',
      minDose: 7,
      maxDose: 21,
      doseUnit: 'mg/kg/dose',
      frequency: 2,
      frequencyText: 'Twice daily',
      minAgeMonths: 1,
      maxAgeMonths: 5,
      requiresAge: true,
      requiresWeight: true,
      allowedFormulations: ['100mg-per-ml'],
      note: 'Initiate at 7 mg/kg/dose twice daily; increase by 7 mg/kg/dose every 2 weeks to 21 mg/kg/dose twice daily.'
    },
    {
      id: 'partial-onset-6m-4y',
      type: 'mg_per_kg_per_dose',
      condition: 'Partial-onset seizures',
      minDose: 10,
      maxDose: 25,
      doseUnit: 'mg/kg/dose',
      frequency: 2,
      frequencyText: 'Twice daily',
      minAgeMonths: 6,
      maxAgeMonths: 47,
      requiresAge: true,
      requiresWeight: true,
      allowedFormulations: ['100mg-per-ml'],
      note: 'Initiate at 10 mg/kg/dose twice daily; increase by 10 mg/kg/dose every 2 weeks to 25 mg/kg/dose twice daily.'
    },
    {
      id: 'partial-onset-4y-16y',
      type: 'mg_per_kg_per_dose',
      condition: 'Partial-onset seizures',
      minDose: 10,
      maxDose: 30,
      doseUnit: 'mg/kg/dose',
      frequency: 2,
      frequencyText: 'Twice daily',
      minAgeMonths: 48,
      maxAgeMonths: 191,
      requiresAge: true,
      requiresWeight: true,
      allowedFormulations: ['100mg-per-ml'],
      maximumDailyDose: 3000,
      note: 'Initiate at 10 mg/kg/dose twice daily; increase by 10 mg/kg/dose every 2 weeks to 30 mg/kg/dose twice daily. Maximum recommended daily dose 3000 mg.'
    },
    {
      id: 'primary-generalized-tonic-clonic-6y-16y',
      type: 'mg_per_kg_per_dose',
      condition: 'Primary generalized tonic-clonic seizures',
      minDose: 10,
      maxDose: 30,
      doseUnit: 'mg/kg/dose',
      frequency: 2,
      frequencyText: 'Twice daily',
      minAgeMonths: 72,
      maxAgeMonths: 191,
      requiresAge: true,
      requiresWeight: true,
      allowedFormulations: ['100mg-per-ml'],
      maximumDailyDose: 3000,
      note: 'Initiate at 10 mg/kg/dose twice daily; increase by 10 mg/kg/dose every 2 weeks to 30 mg/kg/dose twice daily.'
    },
    {
      id: 'myoclonic-12y-plus',
      type: 'fixed_dose',
      condition: 'Myoclonic seizures in juvenile myoclonic epilepsy',
      minDose: 1000,
      maxDose: 3000,
      doseUnit: 'mg/day',
      frequency: 2,
      frequencyText: 'Twice daily',
      minAgeMonths: 144,
      requiresAge: true,
      requiresWeight: false,
      allowedFormulations: ['100mg-per-ml'],
      maximumDailyDose: 3000,
      note: 'Initiate 500 mg twice daily and increase by 500 mg twice daily every 2 weeks to 1500 mg twice daily.'
    }
  ],
  information: {
    class: 'Antiepileptic',
    indications: [
      'Partial-onset seizures from 1 month of age',
      'Adjunctive therapy for myoclonic seizures in juvenile myoclonic epilepsy from 12 years',
      'Adjunctive therapy for primary generalized tonic-clonic seizures from 6 years'
    ],
    mechanism: 'The precise mechanism is not fully established; levetiracetam binds to synaptic vesicle protein 2A (SV2A), which is believed to contribute to its anticonvulsant activity.',
    precautions: [
      'Dose selection and titration depend on indication and age.',
      'Renal impairment requires dose adjustment according to renal function.',
      'Use a calibrated oral syringe or measuring device for pediatric dosing.',
      'Do not abruptly discontinue antiseizure therapy without clinical guidance.'
    ],
    adverseEffects: [
      'Somnolence',
      'Fatigue',
      'Dizziness',
      'Irritability',
      'Agitation',
      'Behavioral changes'
    ],
    notes: 'Oral solution concentration is 100 mg/mL (500 mg/5 mL). The current labeled pediatric oral-solution regimens are weight-based for children; dosing above 20 kg may use solution or tablets according to the prescribing information.'
  },
  sources: [
    {
      organization: 'DailyMed',
      title: 'Levetiracetam Oral Solution USP — prescribing information',
      url: 'https://www.dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=423d2185-0931-4414-8864-7594000809ee'
    }
  ]
});
