/* DoseCare V2 — Desloratadine oral solution
 * Source: current FDA/DailyMed prescribing information, revised July 2025.
 */
window.DoseCareV2Database?.register({
  id: 'desloratadine',
  name: 'Desloratadine',
  genericName: 'Desloratadine',
  activeIngredient: 'Desloratadine',
  dosageForm: 'Oral Solution',
  route: 'Oral',
  category: 'Antihistamine / Allergy',
  formulations: [
    {
      id: 'desloratadine-0-5mg-ml',
      display: 'Desloratadine 0.5 mg/mL oral solution',
      concentration: { amount: 0.5, unit: 'mg', volume: 1, volumeUnit: 'mL' },
      mgPer5mL: 2.5
    }
  ],
  regimens: [
    {
      id: 'allergy-6-11m',
      condition: 'Perennial allergic rhinitis / chronic idiopathic urticaria',
      type: 'fixed_dose',
      dose: 1,
      minDose: 1,
      maxDose: 1,
      unit: 'mg/dose',
      volume: 2,
      minVolume: 2,
      maxVolume: 2,
      volumeUnit: 'mL/dose',
      frequency: 1,
      frequencyText: 'Once daily',
      requiresAge: true,
      requiresWeight: false,
      minAgeMonths: 6,
      maxAgeMonths: 11.999,
      allowedFormulations: ['desloratadine-0-5mg-ml']
    },
    {
      id: 'allergy-12m-5y',
      condition: 'Perennial allergic rhinitis / chronic idiopathic urticaria',
      type: 'fixed_dose',
      dose: 1.25,
      minDose: 1.25,
      maxDose: 1.25,
      unit: 'mg/dose',
      volume: 2.5,
      minVolume: 2.5,
      maxVolume: 2.5,
      volumeUnit: 'mL/dose',
      frequency: 1,
      frequencyText: 'Once daily',
      requiresAge: true,
      requiresWeight: false,
      minAgeMonths: 12,
      maxAgeMonths: 71.999,
      allowedFormulations: ['desloratadine-0-5mg-ml']
    },
    {
      id: 'allergy-6-11y',
      condition: 'Allergic rhinitis / chronic idiopathic urticaria',
      type: 'fixed_dose',
      dose: 2.5,
      minDose: 2.5,
      maxDose: 2.5,
      unit: 'mg/dose',
      volume: 5,
      minVolume: 5,
      maxVolume: 5,
      volumeUnit: 'mL/dose',
      frequency: 1,
      frequencyText: 'Once daily',
      requiresAge: true,
      requiresWeight: false,
      minAgeMonths: 72,
      maxAgeMonths: 143.999,
      allowedFormulations: ['desloratadine-0-5mg-ml']
    },
    {
      id: 'allergy-12y-plus',
      condition: 'Allergic rhinitis / chronic idiopathic urticaria',
      type: 'fixed_dose',
      dose: 5,
      minDose: 5,
      maxDose: 5,
      unit: 'mg/dose',
      volume: 10,
      minVolume: 10,
      maxVolume: 10,
      volumeUnit: 'mL/dose',
      frequency: 1,
      frequencyText: 'Once daily',
      requiresAge: true,
      requiresWeight: false,
      minAgeMonths: 144,
      allowedFormulations: ['desloratadine-0-5mg-ml']
    }
  ],
  information: {
    class: 'Second-generation H1 antihistamine',
    mechanism: 'Selective H1-receptor antagonist that reduces histamine-mediated allergic symptoms.',
    indications: ['Perennial allergic rhinitis', 'Seasonal allergic rhinitis (age 2 years and older)', 'Chronic idiopathic urticaria'],
    contraindications: ['Hypersensitivity to desloratadine, loratadine, or any formulation component.'],
    adverseEffects: ['Headache', 'Somnolence', 'Fatigue', 'Dry mouth'],
    precautions: ['Pediatric dosing below 6 months has not been established.', 'Dose adjustment is recommended in adults with renal or hepatic impairment; pediatric recommendations for these impairments cannot be made due to lack of data.', 'Do not increase dose or dosing frequency beyond the labeled regimen.'],
    interactions: ['CYP3A4 inhibitors, fluoxetine, and cimetidine can affect desloratadine exposure; clinically important interactions are not generally expected at labeled doses.'],
    administration: 'Measure with an accurate oral syringe or calibrated measuring device. May be taken without regard to meals.',
    pediatricUse: 'Current oral-solution labeling supports children 6 months to 11 years with age-specific once-daily doses; adolescents 12 years and older receive the adult 5 mg once-daily dose.',
    notes: 'Oral solution concentration: 0.5 mg/mL (2.5 mg/5 mL).'
  },
  sources: [
    { organization: 'DailyMed', title: 'Desloratadine Oral Solution — revised July 2025', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=41d5e0d4-6188-847b-e063-6294a90a2e2f' }
  ]
});
