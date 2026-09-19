/* DoseCare V2 — Levothyroxine pediatric oral solution */
window.DoseCareV2Database?.register({
  id: 'levothyroxine',
  name: 'Levothyroxine',
  genericName: 'Levothyroxine sodium',
  active: true,
  dosageForm: 'Oral solution',
  route: 'Oral',
  category: 'Thyroid hormone',
  formulations: [
    {
      id: '20mcg-per-ml',
      display: '100 mcg/5 mL (20 mcg/mL)',
      concentration: { amount: 0.02, volume: 1, unit: 'mg/mL' }
    }
  ],
  regimens: [
    {
      id: 'pediatric-hypothyroidism-0-3-months',
      type: 'mg_per_kg_per_day',
      condition: 'Congenital or acquired hypothyroidism',
      minDose: 0.01,
      maxDose: 0.015,
      doseUnit: 'mg/kg/day',
      frequency: 1,
      frequencyText: 'Once daily',
      minAgeMonths: 0,
      maxAgeMonths: 2,
      requiresAge: true,
      requiresWeight: true,
      allowedFormulations: ['20mcg-per-ml'],
      note: 'Equivalent to 10–15 mcg/kg/day. Dose must be adjusted using clinical response and thyroid laboratory parameters.'
    },
    {
      id: 'pediatric-hypothyroidism-3-6-months',
      type: 'mg_per_kg_per_day',
      condition: 'Congenital or acquired hypothyroidism',
      minDose: 0.008,
      maxDose: 0.01,
      doseUnit: 'mg/kg/day',
      frequency: 1,
      frequencyText: 'Once daily',
      minAgeMonths: 3,
      maxAgeMonths: 5,
      requiresAge: true,
      requiresWeight: true,
      allowedFormulations: ['20mcg-per-ml'],
      note: 'Equivalent to 8–10 mcg/kg/day. Dose must be adjusted using clinical response and thyroid laboratory parameters.'
    },
    {
      id: 'pediatric-hypothyroidism-6-12-months',
      type: 'mg_per_kg_per_day',
      condition: 'Congenital or acquired hypothyroidism',
      minDose: 0.006,
      maxDose: 0.008,
      doseUnit: 'mg/kg/day',
      frequency: 1,
      frequencyText: 'Once daily',
      minAgeMonths: 6,
      maxAgeMonths: 11,
      requiresAge: true,
      requiresWeight: true,
      allowedFormulations: ['20mcg-per-ml'],
      note: 'Equivalent to 6–8 mcg/kg/day. Dose must be adjusted using clinical response and thyroid laboratory parameters.'
    },
    {
      id: 'pediatric-hypothyroidism-1-5-years',
      type: 'mg_per_kg_per_day',
      condition: 'Congenital or acquired hypothyroidism',
      minDose: 0.005,
      maxDose: 0.006,
      doseUnit: 'mg/kg/day',
      frequency: 1,
      frequencyText: 'Once daily',
      minAgeMonths: 12,
      maxAgeMonths: 71,
      requiresAge: true,
      requiresWeight: true,
      allowedFormulations: ['20mcg-per-ml'],
      note: 'Equivalent to 5–6 mcg/kg/day. Dose must be adjusted using clinical response and thyroid laboratory parameters.'
    },
    {
      id: 'pediatric-hypothyroidism-6-12-years',
      type: 'mg_per_kg_per_day',
      condition: 'Congenital or acquired hypothyroidism',
      minDose: 0.004,
      maxDose: 0.005,
      doseUnit: 'mg/kg/day',
      frequency: 1,
      frequencyText: 'Once daily',
      minAgeMonths: 72,
      maxAgeMonths: 143,
      requiresAge: true,
      requiresWeight: true,
      allowedFormulations: ['20mcg-per-ml'],
      note: 'Equivalent to 4–5 mcg/kg/day. Dose must be adjusted using clinical response and thyroid laboratory parameters.'
    },
    {
      id: 'pediatric-hypothyroidism-over-12-years',
      type: 'mg_per_kg_per_day',
      condition: 'Congenital or acquired hypothyroidism',
      minDose: 0.002,
      maxDose: 0.003,
      doseUnit: 'mg/kg/day',
      frequency: 1,
      frequencyText: 'Once daily',
      minAgeMonths: 144,
      requiresAge: true,
      requiresWeight: true,
      allowedFormulations: ['20mcg-per-ml'],
      note: 'For patients older than 12 years with incomplete growth/puberty. Equivalent to 2–3 mcg/kg/day. Dose must be adjusted using clinical response and thyroid laboratory parameters.'
    }
  ],
  information: {
    class: 'Thyroid hormone',
    indications: [
      'Replacement therapy for congenital or acquired hypothyroidism'
    ],
    mechanism: 'Synthetic thyroxine (T4) that is converted in peripheral tissues to active thyroid hormone and restores thyroid hormone activity.',
    precautions: [
      'Dose must be individualized and titrated according to clinical response and serum TSH/free T4.',
      'Newborns 0–3 months at risk for cardiac failure may require a lower starting dose.',
      'Do not use to treat obesity or for weight loss.',
      'Administer consistently in relation to food and other medicines because absorption can be affected.',
      'Uncorrected adrenal insufficiency is a contraindication to treatment.',
      'Use the calibrated oral syringe supplied with the oral-solution product.'
    ],
    adverseEffects: [
      'Symptoms of excessive thyroid hormone replacement such as tachycardia, irritability, tremor, sweating, and sleep disturbance',
      'Overtreatment in children may accelerate bone maturation and impair growth potential'
    ],
    notes: 'THYQUIDITY is a ready-to-use levothyroxine sodium oral solution containing 100 mcg/5 mL (20 mcg/mL). Pediatric dosing is age- and weight-based and requires laboratory monitoring.'
  },
  sources: [
    {
      organization: 'U.S. FDA',
      title: 'THYQUIDITY (levothyroxine sodium) oral solution prescribing information',
      url: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2020/214047s000lbl.pdf'
    },
    {
      organization: 'DailyMed',
      title: 'Levothyroxine sodium — pediatric dosing information',
      url: 'https://www.dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=58f4dc90-3648-49dc-a7e1-baf918a773b5'
    }
  ]
});
