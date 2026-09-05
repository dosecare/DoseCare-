/* DoseCare V2 — Chlorpheniramine (chlorphenamine) syrup
 * Product-specific pediatric oral-liquid regimen.
 * Primary source: Piriton Syrup SmPC (emc), 2 mg/5 mL.
 */
window.DoseCareV2Database?.register({
  id: 'chlorpheniramine',
  name: 'Chlorpheniramine',
  genericName: 'Chlorphenamine (chlorpheniramine) maleate',
  activeIngredient: 'Chlorpheniramine maleate',
  dosageForm: 'Syrup',
  route: 'Oral',
  category: 'Antihistamine / Allergy',
  formulations: [{
    id: 'chlorpheniramine-2mg-5ml-syrup',
    display: 'Chlorpheniramine 2 mg/5 mL oral syrup',
    concentration: { amount: 2, unit: 'mg', volume: 5, volumeUnit: 'mL' }
  }],
  regimens: [
    {
      id: 'allergy-1-2y',
      condition: 'Allergic conditions responsive to antihistamines',
      type: 'fixed_dose',
      dose: 1,
      minDose: 1,
      maxDose: 1,
      unit: 'mg/dose',
      frequency: 2,
      frequencyText: '1 mg (2.5 mL) twice daily',
      maximumDailyDose: 2,
      maximumDailyDoseUnit: 'mg/day',
      requiresAge: true,
      requiresWeight: false,
      minAgeYears: 1,
      maxAgeYears: 1.999,
      allowedFormulations: ['chlorpheniramine-2mg-5ml-syrup']
    },
    {
      id: 'allergy-2-6y',
      condition: 'Allergic conditions responsive to antihistamines',
      type: 'fixed_dose',
      dose: 1,
      minDose: 1,
      maxDose: 1,
      unit: 'mg/dose',
      frequency: 4,
      frequencyText: '1 mg (2.5 mL) every 4–6 hours as required',
      maximumDailyDose: 6,
      maximumDailyDoseUnit: 'mg/day',
      requiresAge: true,
      requiresWeight: false,
      minAgeYears: 2,
      maxAgeYears: 5.999,
      allowedFormulations: ['chlorpheniramine-2mg-5ml-syrup']
    },
    {
      id: 'allergy-6-12y',
      condition: 'Allergic conditions responsive to antihistamines',
      type: 'fixed_dose',
      dose: 2,
      minDose: 2,
      maxDose: 2,
      unit: 'mg/dose',
      frequency: 4,
      frequencyText: '2 mg (5 mL) every 4–6 hours as required',
      maximumDailyDose: 12,
      maximumDailyDoseUnit: 'mg/day',
      requiresAge: true,
      requiresWeight: false,
      minAgeYears: 6,
      maxAgeYears: 11.999,
      allowedFormulations: ['chlorpheniramine-2mg-5ml-syrup']
    }
  ],
  information: {
    class: 'First-generation H1 antihistamine',
    mechanismOfAction: 'H1-receptor antagonist with anticholinergic and sedating effects.',
    indications: ['Hay fever / allergic rhinitis', 'Urticaria and other allergic conditions responsive to antihistamines', 'Itch associated with chickenpox'],
    contraindications: ['Hypersensitivity to antihistamines or formulation ingredients', 'Premature infants or neonates', 'Concurrent MAOI treatment or within 14 days of stopping an MAOI'],
    adverseEffects: ['Drowsiness', 'Dizziness', 'Blurred vision', 'Dry mouth and other anticholinergic effects', 'Paradoxical excitation may occur in children'],
    warningsPrecautions: ['Use caution in children because paradoxical excitation and neurological anticholinergic effects can occur.', 'Minimum interval between doses is 4 hours.', 'Do not combine with other antihistamine-containing products without clinical advice.', 'Renal or hepatic impairment requires medical advice.'],
    interactions: ['MAO inhibitors may intensify anticholinergic effects.', 'Sedatives and hypnotics may increase sedation.', 'Alcohol may increase sedative effects.'],
    administration: 'Oral administration. Use an accurate measuring device. Do not exceed the stated dose or frequency.',
    pediatricUse: 'This product-specific regimen is for children 1 year and older. It is not recommended below 1 year.',
    notes: 'Chlorpheniramine is also called chlorphenamine. Concentration: 2 mg/5 mL.'
  },
  sources: [
    { organization: 'electronic Medicines Compendium (emc)', title: 'Piriton Syrup / Piriton Children’s Allergy Syrup — Summary of Product Characteristics', url: 'https://www.medicines.org.uk/emc/product/3928/smpc' },
    { organization: 'Ministry of Health Bahrain', title: 'Chlorpheniramine maleate drug information', url: 'https://www.moh.gov.bh/HealthInfo/DrugDetail/110?lang=en' },
    { organization: 'Ministry of Health Malaysia', title: 'Chlorpheniramine Maleate 2 mg/5 mL Syrup — Formulary', url: 'https://pharmacy.moh.gov.my/en/apps/fukkm?page=11' }
  ]
});
