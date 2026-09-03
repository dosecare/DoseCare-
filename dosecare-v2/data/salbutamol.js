/* DoseCare V2 — Salbutamol (albuterol) oral syrup
 * Sources cross-checked: current DailyMed albuterol sulfate syrup labeling; FDA albuterol product information; Salbutamol Oral Solution SmPC.
 * Oral liquid only. DoseCare encodes oral syrup dosing only and does not include inhaled formulations.
 */
window.DoseCareV2Database?.register({
  id: 'salbutamol',
  name: 'Salbutamol (Albuterol)',
  genericName: 'Salbutamol (albuterol) sulfate',
  activeIngredient: 'Albuterol',
  dosageForm: 'Oral Syrup',
  route: 'Oral',
  formulations: [
    { display: '2 mg/5 mL', concentration: { amount: 2, unit: 'mg', volume: 5, volumeUnit: 'mL' }, mgPer5mL: 2 }
  ],
  regimens: [
    {
      id: 'oral-syrup-2-5',
      condition: 'Reversible airways obstruction / bronchospasm',
      type: 'mg_per_kg_per_dose',
      minDose: 0.1,
      maxDose: 0.1,
      doseUnit: 'mg/kg/dose',
      frequency: 3,
      frequencyText: 'Every 8 hours',
      requiresAge: true,
      requiresWeight: true,
      minAgeYears: 2,
      maxAgeYears: 5,
      maximumDosePerAdministration: 2
    },
    {
      id: 'oral-syrup-6-14',
      condition: 'Reversible airways obstruction / bronchospasm',
      type: 'fixed_dose',
      dose: 2,
      minDose: 2,
      maxDose: 2,
      doseUnit: 'mg/dose',
      frequency: 3,
      frequencyText: 'Every 8 hours',
      requiresAge: true,
      requiresWeight: false,
      minAgeYears: 6,
      maxAgeYears: 14,
      maximumDosePerAdministration: 2
    }
  ],
  information: {
    class: 'Short-acting selective beta2-adrenergic agonist bronchodilator',
    mechanismOfAction: 'Stimulates beta2-adrenergic receptors in bronchial smooth muscle, increasing intracellular cAMP and producing bronchodilation.',
    indications: ['Reversible airways obstruction', 'Bronchospasm associated with asthma and other reversible obstructive airway conditions'],
    contraindications: ['Hypersensitivity to albuterol/salbutamol or formulation components'],
    adverseEffects: ['Tremor', 'Nervousness', 'Headache', 'Palpitations', 'Tachycardia', 'Muscle cramps', 'Hypokalemia can occur, particularly with higher systemic exposure'],
    warningsPrecautions: ['Oral systemic exposure can produce more beta-adrenergic adverse effects than inhaled therapy.', 'Use cautiously in patients with cardiovascular disease, hyperthyroidism, diabetes mellitus, seizure disorders, or susceptibility to hypokalemia.', 'Paradoxical bronchospasm can occur.', 'Failure of a previously effective regimen to control symptoms may indicate worsening asthma and requires prompt reassessment.'],
    interactions: ['Other sympathomimetic medicines may increase cardiovascular adverse effects.', 'Nonselective beta-blockers may antagonize bronchodilation and can precipitate severe bronchospasm.', 'MAO inhibitors and tricyclic antidepressants may potentiate cardiovascular effects.'],
    administration: 'Administer orally using a calibrated oral syringe or accurate measuring device. Shake the product if the specific label instructs shaking.',
    pediatricUse: 'The selected oral-syrup regimens are based on labeled pediatric oral dosing. Oral salbutamol is not interchangeable with inhaled/nebulized dosing.',
    hepaticImpairment: 'Use cautiously; specific pediatric oral dosing adjustments are not established in the selected labels.',
    notes: 'DoseCare includes oral syrup only. Inhalers and nebulizer solutions are deliberately excluded by the project scope.'
  },
  sources: [
    { organization: 'DailyMed', title: 'Albuterol Sulfate Syrup 2 mg/5 mL — current prescribing information', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=99a490cc-e41d-436b-9cf3-8facb7ac714f' },
    { organization: 'FDA', title: 'FDA-approved albuterol single-ingredient products / pediatric regulatory information', url: 'https://www.fda.gov/media/113575/download' },
    { organization: 'Ethiopian Food and Drug Authority', title: 'Salbutamol Oral Solution 2 mg/5 mL — Summary of Product Characteristics', url: 'https://www.efda.gov.et/wp-content/uploads/2023/08/Salbutamol-oral-solution_Salbutamol-oral-solution_Medicamen-Biotech-Limited.pdf' }
  ]
});
