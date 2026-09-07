/* DoseCare V2 — Magnesium hydroxide oral suspension
 * Oral liquid only. Pediatric automatic dosing follows the current DailyMed
 * Milk of Magnesia label for 400 mg/5 mL. Children under 6 years are not
 * auto-calculated because the label says to ask a doctor.
 */
window.DoseCareV2Database?.register({
  id: 'magnesium-hydroxide',
  name: 'Magnesium Hydroxide',
  genericName: 'Magnesium Hydroxide',
  activeIngredient: 'Magnesium Hydroxide',
  dosageForm: 'Oral Suspension',
  route: 'Oral',
  category: 'Saline laxative / antacid',
  formulations: [
    { id: '400-5', display: '400 mg/5 mL (1200 mg/15 mL)', concentration: { amount: 400, unit: 'mg', volume: 5, volumeUnit: 'mL' }, mgPer5mL: 400 }
  ],
  regimens: [
    {
      id: 'laxative-6-11y',
      condition: 'Occasional constipation',
      type: 'label_age_based',
      minAgeYears: 6,
      maxAgeYears: 11,
      minDose: 1200,
      maxDose: 2400,
      doseUnit: 'mg/day',
      volumeMin: 15,
      volumeMax: 30,
      volumeUnit: 'mL/day',
      frequencyText: 'Once daily preferably at bedtime, or in divided doses, or as directed by a doctor',
      requiresAge: true,
      requiresWeight: false,
      allowedFormulations: ['400-5']
    },
    {
      id: 'laxative-12y-plus',
      condition: 'Occasional constipation',
      type: 'label_age_based',
      minAgeYears: 12,
      minDose: 2400,
      maxDose: 4800,
      doseUnit: 'mg/day',
      volumeMin: 30,
      volumeMax: 60,
      volumeUnit: 'mL/day',
      frequencyText: 'Once daily preferably at bedtime, or in divided doses, or as directed by a doctor',
      requiresAge: true,
      requiresWeight: false,
      maximumDailyDose: 60,
      allowedFormulations: ['400-5']
    },
    {
      id: 'antacid-12y-plus',
      condition: 'Heartburn / acid indigestion',
      type: 'label_age_based',
      minAgeYears: 12,
      minDose: 400,
      maxDose: 1200,
      doseUnit: 'mg/dose',
      volumeMin: 5,
      volumeMax: 15,
      volumeUnit: 'mL/dose',
      frequencyText: 'As directed on the product label; do not exceed the maximum daily dose',
      requiresAge: true,
      requiresWeight: false,
      allowedFormulations: ['400-5']
    }
  ],
  information: {
    class: 'Saline laxative / antacid',
    mechanism: 'As a laxative, magnesium hydroxide increases water in the intestinal lumen and promotes bowel evacuation. As an antacid, it neutralizes gastric acid.',
    indications: ['Occasional constipation', 'Heartburn', 'Upset or sour stomach', 'Acid indigestion'],
    contraindications: ['Hypersensitivity to magnesium hydroxide or formulation components'],
    adverseEffects: ['Diarrhea', 'Abdominal cramping', 'Nausea', 'Magnesium toxicity can occur with excessive exposure, especially in renal impairment'],
    precautions: ['Ask a doctor before use in kidney disease or on a magnesium-restricted diet.', 'Ask a doctor before use with stomach pain, nausea, vomiting, or a sudden change in bowel habits lasting more than 14 days.', 'Stop use and ask a doctor for rectal bleeding, no bowel movement after use, or need for laxative use longer than 1 week.', 'Children under 6 years: the current product label says ask a doctor; DoseCare does not auto-calculate them.'],
    interactions: ['The product label states that it may interact with certain prescription medicines; review concurrent medicines before use.'],
    administration: 'Shake well. For laxative use, the dose may be taken once daily preferably at bedtime or in divided doses; follow each dose with a full glass (8 oz) of liquid. For antacid use, take with water as directed by the label.',
    pediatricUse: 'Current DailyMed labeling for magnesium hydroxide 400 mg/5 mL gives 15–30 mL for children 6–11 years and 30–60 mL for children 12 years and older for occasional constipation. Children under 6 years are instructed to ask a doctor. For antacid use, children under 12 years are instructed to ask a doctor; ages 12 years and older receive 5–15 mL.',
    notes: 'DoseCare intentionally does not use the previous guideline-based 2–5 year automatic regimen because the configured product label requires clinician advice below age 6. The exact oral-liquid concentration is linked to every automatic regimen.',
    sources: [
      { organization: 'DailyMed', title: 'Milk of Magnesia — Magnesium Hydroxide Suspension 400 mg/5 mL, updated June 5, 2026', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=144c7242-4ff9-404a-86bf-48e2871eb0cd' }
    ]
  },
  sources: [
    { organization: 'DailyMed', title: 'Milk of Magnesia — Magnesium Hydroxide Suspension 400 mg/5 mL, updated June 5, 2026', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=144c7242-4ff9-404a-86bf-48e2871eb0cd' }
  ]
});
