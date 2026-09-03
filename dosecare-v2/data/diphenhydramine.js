/* DoseCare V2 — Diphenhydramine oral solution
 * Oral liquid only. OTC pediatric label dosing is represented as an age/weight-independent labeled volume range.
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
      condition: 'Allergy symptoms',
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
    mechanismOfAction: 'Competitively blocks histamine H1 receptors, reducing histamine-mediated allergic symptoms.',
    indications: ['Temporary relief of runny nose, sneezing, itchy/watery eyes, and itchy nose or throat due to upper respiratory allergies'],
    contraindications: ['Hypersensitivity to diphenhydramine or formulation components'],
    adverseEffects: ['Drowsiness', 'Dizziness', 'Dry mouth', 'Blurred vision', 'Paradoxical excitability may occur, especially in children'],
    warningsPrecautions: ['Do not use to make a child sleepy.', 'Children under 2 years: do not use.', 'Children 2–5 years: do not use unless directed by a doctor.', 'Do not combine with another product containing diphenhydramine.', 'Sedatives and tranquilizers may increase drowsiness.'],
    interactions: ['Sedatives and tranquilizers may increase CNS depression and drowsiness.', 'Avoid duplicate diphenhydramine-containing products.'],
    administration: 'Take every 4–6 hours as needed and do not exceed 6 doses in 24 hours. Use the dosing device supplied with the product.',
    pediatricUse: 'Current DailyMed oral-solution labeling gives 5–10 mL (12.5–25 mg) for children 6–11 years. It says not to use under 2 years and not to use at ages 2–5 years unless directed by a doctor.',
    notes: 'DoseCare includes oral solution only. This is labeled OTC dosing, not a weight-based extrapolation. Do not use diphenhydramine as a sedative in children.',
    sources: [
      { organization: 'DailyMed', title: 'Diphenhydramine HCl Oral Solution 12.5 mg/5 mL', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3c3e0dc8-cddd-4f46-9b68-19bac00c07cc' },
      { organization: 'American Academy of Pediatrics', title: 'A Parent’s Guide to Over-the-Counter Medicines for Children', url: 'https://www.healthychildren.org/English/safety-prevention/at-home/medication-safety/Pages/Choosing-Over-the-Counter-Medicines-for-Your-Child.aspx' }
    ]
  },
  sources: [
    { organization: 'DailyMed', title: 'Diphenhydramine HCl Oral Solution 12.5 mg/5 mL', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3c3e0dc8-cddd-4f46-9b68-19bac00c07cc' },
    { organization: 'American Academy of Pediatrics', title: 'A Parent’s Guide to Over-the-Counter Medicines for Children', url: 'https://www.healthychildren.org/English/safety-prevention/at-home/medication-safety/Pages/Choosing-Over-the-Counter-Medicines-for-Your-Child.aspx' }
  ]
});
