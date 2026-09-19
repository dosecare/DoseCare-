/* DoseCare V2 — Phenobarbital pediatric oral solution */
window.DoseCareV2Database?.register({
  id: 'phenobarbital',
  name: 'Phenobarbital',
  genericName: 'Phenobarbital',
  active: true,
  dosageForm: 'Oral solution',
  route: 'Oral',
  category: 'Antiepileptic',
  formulations: [
    {
      id: '20mg-per-5ml',
      display: '20 mg/5 mL (4 mg/mL)',
      concentration: { amount: 20, volume: 5, unit: 'mg/5 mL' }
    }
  ],
  regimens: [
    {
      id: 'maintenance-anticonvulsant',
      type: 'mg_per_kg_per_day',
      condition: 'Anticonvulsant maintenance therapy',
      minDose: 3,
      maxDose: 6,
      doseUnit: 'mg/kg/day',
      frequency: 1,
      frequencyText: 'Daily; divide the daily dose according to the prescribed regimen',
      requiresAge: true,
      requiresWeight: true,
      allowedFormulations: ['20mg-per-5ml'],
      note: 'Daily pediatric maintenance dose stated in the oral-solution prescribing information. Phenobarbital dosing must be individualized and therapeutic drug monitoring may be required.'
    }
  ],
  information: {
    class: 'Barbiturate anticonvulsant',
    indications: [
      'Control of seizures requiring phenobarbital therapy'
    ],
    mechanism: 'Enhances inhibitory GABAergic neurotransmission through effects on GABA-A receptor activity, reducing neuronal excitability.',
    precautions: [
      'Phenobarbital is a controlled substance and has clinically important sedation and respiratory-depressant effects.',
      'Dose must be individualized according to age, weight, condition, response, and serum drug concentrations when indicated.',
      'Reduce dose in hepatic or renal impairment as clinically appropriate.',
      'Do not abruptly discontinue chronic therapy without clinical guidance.',
      'Some oral-solution products contain substantial alcohol; verify the specific product formulation before pediatric use.'
    ],
    adverseEffects: [
      'Drowsiness',
      'Sedation',
      'Ataxia',
      'Respiratory depression',
      'Behavioral changes',
      'Hypotension with excessive exposure'
    ],
    notes: 'Phenobarbital oral solution 20 mg/5 mL is a labeled pediatric oral-liquid formulation. Some marketed products contain 13.5–15% alcohol, so product-specific excipients must be checked.'
  },
  sources: [
    {
      organization: 'DailyMed',
      title: 'PHENOBARBITAL Oral Solution, USP CIV — 20 mg/5 mL',
      url: 'https://dailymed.nlm.nih.gov/dailymed/getFile.cfm?setid=0ca8847d-1966-47a0-995e-a5c0d2fd699d&type=pdf'
    }
  ]
});
