/* DoseCare V2 — Sodium citrate and citric acid pediatric oral solution. */
window.DoseCareV2Database.register({
  id: 'sodium-citrate',
  name: 'Sodium Citrate + Citric Acid',
  genericName: 'Sodium citrate and citric acid',
  brandNames: ['Sodium Citrate and Citric Acid Oral Solution USP'],
  dosageForm: 'Oral solution',
  route: 'Oral',
  category: 'Systemic alkalizer',
  formulations: [
    {
      id: 'sodium-citrate-500mg-334mg-per-5ml',
      dosageForm: 'Oral solution',
      concentration: { amount: 500, unit: 'mg', volume: 5, volumeUnit: 'mL' },
      display: 'Sodium citrate 500 mg + citric acid 334 mg per 5 mL (1 mEq sodium/mL)',
      mgPerMl: 100
    }
  ],
  regimens: [
    {
      id: 'sodium-citrate-pediatric-alkalization-2-years-plus',
      condition: 'Systemic alkalization / maintenance of alkaline urine',
      type: 'fixed_dose',
      minAgeYears: 2,
      dose: 500,
      highDose: 1500,
      unit: 'mg sodium citrate/dose',
      frequency: 4,
      frequencyText: '5–15 mL after meals and at bedtime, diluted in water',
      allowedFormulations: ['sodium-citrate-500mg-334mg-per-5ml']
    }
  ],
  information: {
    mechanism: 'Sodium citrate is absorbed and metabolized to sodium bicarbonate and acts as a systemic alkalizer.',
    indications: 'Alkalinization where maintenance of alkaline urine is desirable and for chronic metabolic acidosis such as that associated with chronic renal insufficiency or renal tubular acidosis when potassium salts are undesirable or contraindicated.',
    precautions: [
      'The pediatric label dose is 5–15 mL after meals and at bedtime, diluted in water.',
      'For children under 2 years, the DailyMed label directs use only after consultation with a physician; no automatic DoseCare calculation is provided below age 2 years.',
      'Use caution in patients with abnormal renal mechanisms, especially with hypocalcemia, because sodium bicarbonate generation may contribute to alkalosis.',
      'Shake well before use and dilute in water as directed.'
    ],
    pediatricUse: 'DailyMed labeling gives 1–3 teaspoonfuls (5–15 mL) after meals and at bedtime for pediatric patients; children under 2 years require physician consultation.'
  },
  sources: [
    {
      title: 'DailyMed — Sodium Citrate and Citric Acid Oral Solution USP',
      url: 'https://www.dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=63201a61-6ac5-41ae-8b2d-ff0d3a8ddfd5'
    },
    {
      title: 'DailyMed — Sodium Citrate and Citric Acid Oral Solution USP current product data',
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b3d5225c-0ee4-481e-b9ec-bc5e1321096d'
    }
  ]
});
