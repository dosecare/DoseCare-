/* DoseCare V2 — Magnesium hydroxide oral suspension
 * Oral liquid only. Pediatric constipation regimens are age-based and are not extrapolated outside supported ranges.
 */
window.DoseCareV2Database?.register({
  id: 'magnesium-hydroxide',
  name: 'Magnesium Hydroxide',
  genericName: 'Magnesium Hydroxide',
  activeIngredient: 'Magnesium Hydroxide',
  dosageForm: 'Oral Suspension',
  route: 'Oral',
  formulations: [
    { display: '1200 mg/15 mL (80 mg/mL)', concentration: { amount: 1200, unit: 'mg', volume: 15, volumeUnit: 'mL' }, mgPer5mL: 400 }
  ],
  regimens: [
    {
      id: 'constipation-2-5y', condition: 'Functional constipation', type: 'fixed_dose',
      minDose: 400, maxDose: 1200, unit: 'mg/day', frequency: 1, alternativeFrequency: 2,
      frequencyText: 'Once daily or divided doses', requiresAge: true, requiresWeight: false,
      minAgeMonths: 24, maxAgeMonths: 71
    },
    {
      id: 'constipation-6-11y', condition: 'Functional constipation', type: 'fixed_dose',
      minDose: 1200, maxDose: 2400, unit: 'mg/day', frequency: 1, alternativeFrequency: 2,
      frequencyText: 'Once daily or divided doses', requiresAge: true, requiresWeight: false,
      minAgeMonths: 72, maxAgeMonths: 143
    },
    {
      id: 'constipation-12-18y', condition: 'Functional constipation', type: 'fixed_dose',
      minDose: 2400, maxDose: 4800, unit: 'mg/day', frequency: 1, alternativeFrequency: 2,
      frequencyText: 'Once daily or divided doses', requiresAge: true, requiresWeight: false,
      minAgeMonths: 144, maxAgeMonths: 216, maximumDailyDose: 4800
    }
  ],
  information: {
    class: 'Saline laxative / osmotic laxative',
    mechanismOfAction: 'Magnesium hydroxide retains water in the intestinal lumen by osmotic action, increasing stool water content and promoting bowel evacuation.',
    indications: ['Occasional constipation', 'Functional constipation under appropriate pediatric guidance'],
    contraindications: ['Hypersensitivity to magnesium hydroxide or formulation components'],
    adverseEffects: ['Diarrhea', 'Abdominal cramping', 'Nausea'],
    warningsPrecautions: ['Use cautiously or seek medical advice in kidney disease because magnesium accumulation can occur.', 'Do not exceed the configured daily dose.', 'Stop and seek medical advice for rectal bleeding, worsening abdominal pain, vomiting, or failure to have a bowel movement.'],
    interactions: ['May interact with certain prescription medicines; separate administration when clinically appropriate according to the interacting medicine.'],
    administration: 'Shake well before use and administer with an accurate measuring device. Follow each dose with adequate fluid intake unless fluid restriction applies.',
    pediatricUse: 'The 2026 ESPGHAN/NASPGHAN guideline lists magnesium hydroxide doses of 0.4–1.2 g/day for ages 2–5 years, 1.2–2.4 g/day for ages 6–11 years, and 2.4–4.8 g/day for ages 12–18 years. DoseCare does not extrapolate these regimens to children younger than 2 years.',
    notes: 'PEG is generally preferred first-line for functional constipation when available. Magnesium hydroxide is an alternative osmotic laxative. Product labeling may restrict pediatric use differently; the configured pediatric regimen follows the selected guideline and concentration.',
    sources: [
      { organization: 'DailyMed', title: 'Milk of Magnesia — Magnesium Hydroxide Suspension 1200 mg/15 mL', url: 'https://www.dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3f7cff50-749b-5275-e063-6394a90af407' },
      { organization: 'ESPGHAN / NASPGHAN', title: 'Guidelines for treatment of functional constipation in children aged 0–18 years (2026)', url: 'https://onlinelibrary.wiley.com/doi/10.1002/jpn3.70447' }
    ]
  },
  sources: [
    { organization: 'DailyMed', title: 'Milk of Magnesia — Magnesium Hydroxide Suspension 1200 mg/15 mL', url: 'https://www.dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3f7cff50-749b-5275-e063-6394a90af407' },
    { organization: 'ESPGHAN / NASPGHAN', title: 'Guidelines for treatment of functional constipation in children aged 0–18 years (2026)', url: 'https://onlinelibrary.wiley.com/doi/10.1002/jpn3.70447' }
  ]
});
