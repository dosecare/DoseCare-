/* DoseCare V2 — Carbocisteine pediatric oral liquid
 * Pediatric dosing source: Typharm Carbocisteine 250 mg/5 mL syrup SmPC (emc), revised 06 Mar 2025.
 * Oral liquid only. The 2–5 year dose is intentionally represented as a labeled volume range rather than an invented single dose.
 */
window.DoseCareV2Database?.register({
  id: 'carbocisteine',
  name: 'Carbocisteine',
  genericName: 'Carbocisteine',
  activeIngredient: 'Carbocisteine',
  dosageForm: 'Oral Syrup',
  route: 'Oral',
  category: 'Mucolytic',
  dosing: { calculatorReady: true },
  formulations: [
    {
      id: 'carbocisteine-250mg-5ml',
      display: '250 mg/5 mL',
      mgPer5mL: 250,
      concentration: { amount: 250, unit: 'mg', volume: 5, volumeUnit: 'mL' }
    }
  ],
  regimens: [
    {
      id: 'age-2-5',
      type: 'label_age_based',
      condition: 'Respiratory tract disorders with excessive, viscous mucus',
      doseMin: 62.5,
      doseMax: 125,
      doseUnit: 'mg/dose',
      volumeMin: 1.25,
      volumeMax: 2.5,
      volumeUnit: 'mL/dose',
      frequency: 4,
      frequencyText: 'Four times daily',
      minAgeYears: 2,
      maxAgeYears: 5,
      requiresAge: true,
      requiresWeight: false,
      allowedFormulations: ['carbocisteine-250mg-5ml']
    },
    {
      id: 'age-6-12',
      type: 'fixed_dose',
      condition: 'Respiratory tract disorders with excessive, viscous mucus',
      dose: 250,
      minDose: 250,
      maxDose: 250,
      doseUnit: 'mg/dose',
      frequency: 3,
      frequencyText: 'Three times daily',
      minAgeYears: 6,
      maxAgeYears: 12,
      requiresAge: true,
      requiresWeight: false,
      allowedFormulations: ['carbocisteine-250mg-5ml']
    }
  ],
  information: {
    class: 'Mucolytic agent',
    indications: ['Adjunctive therapy of respiratory tract disorders characterised by excessive, viscous mucus'],
    mechanism: 'Carbocisteine reduces mucus viscosity and supports clearance of respiratory secretions.',
    precautions: ['Use cautiously in patients with asthma and a history of bronchospasm.', 'Use cautiously in severe respiratory failure and debilitated patients.', 'Use cautiously in patients with a history of gastroduodenal ulceration or medicines associated with gastrointestinal bleeding.', 'Concomitant antitussives are not recommended because mucus clearance depends on an intact cough reflex.'],
    adverseEffects: ['Gastrointestinal discomfort', 'Nausea', 'Vomiting', 'Diarrhea', 'Hypersensitivity reactions may occur'],
    contraindications: ['Hypersensitivity to carbocisteine or formulation excipients.', 'Active peptic ulceration.', 'Children under 2 years.'],
    administration: 'For oral use. Use the supplied calibrated measuring device; the cited syrup syringe is graduated in 0.25 mL increments.',
    pediatricUse: 'For 250 mg/5 mL syrup: ages 2–5 years 1.25–2.5 mL four times daily; ages 6–12 years 5 mL three times daily. Children under 2 years are contraindicated for the cited product.',
    notes: 'The 2–5 year regimen is a labeled volume range. DoseCare does not select an arbitrary point within that range.'
  },
  sources: [
    { organization: 'electronic Medicines Compendium (emc)', title: 'Carbocisteine 250 mg/5 ml syrup — Summary of Product Characteristics', url: 'https://www.medicines.org.uk/emc/product/8602/smpc' },
    { organization: 'electronic Medicines Compendium (emc)', title: 'Carbocisteine 250 mg/5 ml oral solution — Summary of Product Characteristics', url: 'https://www.medicines.org.uk/emc/product/13333/smpc' }
  ]
});
