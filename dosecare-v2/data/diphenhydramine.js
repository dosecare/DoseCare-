/* DoseCare V2 — Diphenhydramine oral solution
 * Oral liquid only. Current DailyMed OTC labeling is represented exactly:
 * automatic dosing is limited to children 6–11 years; ages 2–5 are doctor-directed
 * and under 2 years are not for use.
 */
window.DoseCareV2Database?.register({
  id: 'diphenhydramine',
  name: 'Diphenhydramine',
  genericName: 'Diphenhydramine HCl',
  activeIngredient: 'Diphenhydramine HCl',
  dosageForm: 'Oral Solution',
  route: 'Oral',
  category: 'Antihistamine',
  formulations: [
    { id: '12.5-5', display: '12.5 mg/5 mL', concentration: { amount: 12.5, unit: 'mg', volume: 5, volumeUnit: 'mL' }, mgPer5mL: 12.5 }
  ],
  regimens: [
    {
      id: 'allergy-6-11',
      condition: 'Upper respiratory allergy symptoms',
      type: 'label_age_based',
      minAgeYears: 6,
      maxAgeYears: 11,
      doseMin: 12.5,
      doseMax: 25,
      doseUnit: 'mg/dose',
      volumeMin: 5,
      volumeMax: 10,
      volumeUnit: 'mL/dose',
      frequencyText: 'Every 4–6 hours as needed',
      maxDosesPer24h: 6,
      requiresAge: true,
      requiresWeight: false
    }
  ],
  information: {
    class: 'First-generation H1 antihistamine',
    mechanismOfAction: 'Competitively blocks histamine H1 receptors, reducing histamine-mediated allergic symptoms; it also has anticholinergic and sedative effects.',
    indications: ['Temporary relief of runny nose, sneezing, itchy/watery eyes, and itchy nose or throat due to upper respiratory allergies', 'Temporary relief of runny nose and sneezing due to the common cold where permitted by the product label'],
    contraindications: ['Hypersensitivity to diphenhydramine or formulation components'],
    adverseEffects: ['Drowsiness', 'Dizziness', 'Dry mouth', 'Blurred vision', 'Paradoxical excitability may occur, especially in children'],
    warningsPrecautions: ['Do not use to make a child sleepy.', 'Children under 2 years: do not use.', 'Children 2–5 years: do not use unless directed by a doctor.', 'Do not combine with another product containing diphenhydramine.', 'Ask a doctor before use in a child with a breathing problem such as chronic bronchitis or glaucoma.', 'Sedatives and tranquilizers may increase drowsiness.'],
    interactions: ['Sedatives and tranquilizers may increase CNS depression and drowsiness.', 'Avoid duplicate diphenhydramine-containing products.'],
    administration: 'Take every 4–6 hours as needed and do not exceed 6 doses in 24 hours. Use an accurate oral measuring device.',
    pediatricUse: 'Current DailyMed OTC oral-solution labeling gives 5–10 mL (12.5–25 mg) for children 6–11 years. It says not to use under 2 years and not to use at ages 2–5 years unless directed by a doctor.',
    notes: 'DoseCare intentionally provides no automatic regimen for ages 2–5 years because the label requires doctor direction. This is labeled OTC dosing, not a weight-based extrapolation. Do not use diphenhydramine as a sedative in children.',
    sources: [
      { organization: 'DailyMed', title: 'Diphenhydramine HCl Oral Solution 12.5 mg/5 mL, updated August 28, 2026', url: 'https://www.dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=93753885-6add-462c-9df8-b0a1b9ce36c9' }
    ]
  },
  sources: [
    { organization: 'DailyMed', title: 'Diphenhydramine HCl Oral Solution 12.5 mg/5 mL, updated August 28, 2026', url: 'https://www.dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=93753885-6add-462c-9df8-b0a1b9ce36c9' }
  ]
});
