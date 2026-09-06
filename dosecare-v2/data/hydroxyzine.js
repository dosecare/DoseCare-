/* DoseCare V2 — Hydroxyzine hydrochloride pediatric oral solution. */
window.DoseCareV2Database.register({
  id: 'hydroxyzine',
  name: 'Hydroxyzine',
  genericName: 'Hydroxyzine hydrochloride',
  brandNames: ['Hydroxyzine Hydrochloride Oral Solution USP'],
  dosageForm: 'Oral solution',
  route: 'Oral',
  category: 'Antihistamine',
  formulations: [
    {
      id: 'hydroxyzine-10mg-per-5ml',
      dosageForm: 'Oral solution',
      concentration: { amount: 10, unit: 'mg', volume: 5, volumeUnit: 'mL' },
      display: '10 mg/5 mL',
      mgPerMl: 2
    }
  ],
  regimens: [
    {
      id: 'hydroxyzine-pruritus-under-6-years',
      condition: 'Pruritus due to allergic conditions / histamine-mediated pruritus',
      type: 'fixed_dose',
      minAgeYears: 0,
      maxAgeYears: 5.999,
      dose: 50,
      unit: 'mg/day',
      frequency: 1,
      frequencyText: '50 mg/day in divided doses',
      allowedFormulations: ['hydroxyzine-10mg-per-5ml']
    },
    {
      id: 'hydroxyzine-pruritus-6-years-plus',
      condition: 'Pruritus due to allergic conditions / histamine-mediated pruritus',
      type: 'fixed_dose',
      minAgeYears: 6,
      dose: 50,
      highDose: 100,
      unit: 'mg/day',
      frequency: 1,
      frequencyText: '50–100 mg/day in divided doses',
      allowedFormulations: ['hydroxyzine-10mg-per-5ml']
    }
  ],
  information: {
    mechanism: 'Hydroxyzine is an H1 antihistamine with sedative properties.',
    indications: 'Symptomatic management of pruritus associated with allergic conditions including chronic urticaria and atopic or contact dermatoses, and other histamine-mediated pruritus.',
    precautions: [
      'The cited DailyMed label expresses the pediatric regimen as a total daily dose given in divided doses; the calculator displays the daily total rather than inventing a specific division schedule.',
      'Hydroxyzine can cause drowsiness and other CNS effects.',
      'Use caution with other CNS depressants and in patients with clinically relevant QT-risk factors or interacting medicines.',
      'Use the minimum effective dose appropriate to the clinical situation.'
    ],
    pediatricUse: 'DailyMed labeling gives 50 mg/day in divided doses for children under 6 years and 50–100 mg/day in divided doses for children over 6 years for pruritus.'
  },
  sources: [
    {
      title: 'DailyMed — Hydroxyzine Hydrochloride Oral Solution USP 10 mg/5 mL',
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=87d4bbff-0498-4c26-86cb-7ce173afa0b6'
    },
    {
      title: 'DailyMed — Hydroxyzine Hydrochloride Oral Solution prescribing information',
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=39f93633-000e-6c3f-e063-6394a90a5b0a'
    }
  ]
});
