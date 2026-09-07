/* DoseCare V2 — Diphenhydramine oral solution
 * Oral liquid only. Current DailyMed OTC labeling represented for 12.5 mg/5 mL oral solution.
 * Automatic dosing covers labeled ages 6 years and older; ages 2–5 are doctor-directed
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
    },
    {
      id: 'allergy-12-and-over',
      condition: 'Upper respiratory allergy symptoms',
      type: 'label_age_based',
      minAgeYears: 12,
      doseMin: 25,
      doseMax: 50,
      doseUnit: 'mg/dose',
      volumeMin: 10,
      volumeMax: 20,
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
    indications: ['Temporary relief of runny nose, sneezing, itchy/watery eyes, and itchy nose or throat due to hay fever or other upper respiratory allergies'],
    contraindications: ['Hypersensitivity to diphenhydramine or formulation components'],
    adverseEffects: ['Drowsiness', 'Dizziness', 'Dry mouth', 'Blurred vision', 'Paradoxical excitability may occur, especially in children'],
    warningsPrecautions: ['Do not use to make a child sleepy.', 'Children under 2 years: do not use.', 'Children 2–5 years: do not use unless directed by a doctor.', 'Do not combine with another product containing diphenhydramine.', 'Ask a doctor before use in a child with a breathing problem such as emphysema or chronic bronchitis, glaucoma, or difficulty urinating due to prostate enlargement.', 'Sedatives and tranquilizers may increase drowsiness.', 'Avoid alcoholic beverages because alcohol may increase drowsiness.'],
    interactions: ['Sedatives and tranquilizers may increase drowsiness/CNS depression.', 'Alcohol may increase drowsiness.', 'Avoid duplicate diphenhydramine-containing products, including topical products.'],
    administration: 'Take every 4–6 hours as needed and do not exceed 6 doses in 24 hours. Use an accurate oral measuring device.',
    pediatricUse: 'Current DailyMed OTC oral-solution labeling gives 5–10 mL (12.5–25 mg) for children 6–11 years and 10–20 mL (25–50 mg) for adults and children 12 years and over. It says not to use under 2 years and not to use at ages 2–5 years unless directed by a doctor.',
    notes: 'DoseCare intentionally provides no automatic regimen for ages 2–5 years because the label requires doctor direction. These are labeled oral-solution doses, not weight-based extrapolations. Do not use diphenhydramine as a sedative in children.',
    sources: [
      { organization: 'DailyMed', title: 'Diphenhydramine HCl oral solution 12.5 mg/5 mL, effective February 9, 2026', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=93753885-6add-462c-9df8-b0a1b9ce36c9' }
    ]
  },
  sources: [
    { organization: 'DailyMed', title: 'Diphenhydramine HCl oral solution 12.5 mg/5 mL, effective February 9, 2026', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=93753885-6add-462c-9df8-b0a1b9ce36c9' }
  ]
});
