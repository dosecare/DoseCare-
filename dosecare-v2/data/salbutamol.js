/* DoseCare V2 — Salbutamol (albuterol) oral syrup
 * Sources cross-checked: current DailyMed albuterol sulfate syrup labeling; FDA albuterol product information.
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
    { id: '2-5', display: '2 mg/5 mL', concentration: { amount: 2, unit: 'mg', volume: 5, volumeUnit: 'mL' }, mgPer5mL: 2 }
  ],
  regimens: [
    {
      id: 'oral-syrup-2-5-starting',
      condition: 'Reversible airways obstruction / bronchospasm — starting dose',
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
      id: 'oral-syrup-2-5-escalated',
      condition: 'Reversible airways obstruction / bronchospasm — dose escalation if inadequate response',
      type: 'mg_per_kg_per_dose',
      minDose: 0.2,
      maxDose: 0.2,
      doseUnit: 'mg/kg/dose',
      frequency: 3,
      frequencyText: 'Every 8 hours',
      requiresAge: true,
      requiresWeight: true,
      minAgeYears: 2,
      maxAgeYears: 5,
      maximumDosePerAdministration: 4
    },
    {
      id: 'oral-syrup-6-14-starting',
      condition: 'Reversible airways obstruction / bronchospasm — starting dose',
      type: 'fixed_dose',
      dose: 2,
      minDose: 2,
      maxDose: 2,
      doseUnit: 'mg/dose',
      frequency: 3,
      frequencyText: 'Three times daily',
      requiresAge: true,
      requiresWeight: false,
      minAgeYears: 6,
      maxAgeYears: 14,
      maximumDosePerAdministration: 2
    },
    {
      id: 'oral-syrup-6-14-escalated',
      condition: 'Reversible airways obstruction / bronchospasm — dose escalation if inadequate response',
      type: 'fixed_dose',
      dose: 2,
      minDose: 2,
      maxDose: 24,
      doseUnit: 'mg/day',
      frequency: 3,
      frequencyText: 'Divided doses; do not exceed 24 mg/day',
      requiresAge: true,
      requiresWeight: false,
      minAgeYears: 6,
      maxAgeYears: 14,
      maximumDailyDose: 24
    },
    {
      id: 'oral-syrup-over-14-starting',
      condition: 'Reversible airways obstruction / bronchospasm — starting dose',
      type: 'fixed_dose',
      minDose: 2,
      maxDose: 4,
      doseUnit: 'mg/dose',
      frequency: 3,
      frequencyText: 'Three or four times daily',
      requiresAge: true,
      requiresWeight: false,
      minAgeYears: 15
    }
  ],
  information: {
    class: 'Short-acting selective beta2-adrenergic agonist bronchodilator',
    mechanism: 'Stimulates beta2-adrenergic receptors in bronchial smooth muscle, increasing intracellular cAMP and producing bronchodilation.',
    mechanismOfAction: 'Stimulates beta2-adrenergic receptors in bronchial smooth muscle, increasing intracellular cAMP and producing bronchodilation.',
    indications: ['Reversible airways obstruction', 'Bronchospasm associated with asthma and other reversible obstructive airway conditions'],
    contraindications: ['Hypersensitivity to albuterol/salbutamol or formulation components'],
    adverseEffects: ['Tremor', 'Nervousness', 'Headache', 'Palpitations', 'Tachycardia', 'Muscle cramps', 'Hypokalemia can occur, particularly with higher systemic exposure'],
    warningsPrecautions: ['Oral systemic exposure can produce more beta-adrenergic adverse effects than inhaled therapy.', 'Use cautiously in patients with cardiovascular disease, hyperthyroidism, diabetes mellitus, seizure disorders, or susceptibility to hypokalemia.', 'Paradoxical bronchospasm can occur.', 'Failure of a previously effective regimen to control symptoms may indicate worsening asthma and requires prompt reassessment.'],
    interactions: ['Other sympathomimetic medicines may increase cardiovascular adverse effects.', 'Nonselective beta-blockers may antagonize bronchodilation and can precipitate severe bronchospasm.', 'MAO inhibitors and tricyclic antidepressants may potentiate cardiovascular effects.'],
    administration: 'Administer orally using a calibrated oral syringe or accurate measuring device. Shake the product if the specific label instructs shaking.',
    pediatricUse: 'DailyMed oral syrup labeling gives 0.1 mg/kg three times daily initially for ages 2–5 years, with escalation to 0.2 mg/kg three times daily if needed, not exceeding 4 mg per dose. Ages over 6 to 14 years start at 2 mg three or four times daily, with stepwise adjustment not exceeding 24 mg/day. Children over 14 years use the adult starting range of 2–4 mg three or four times daily.',
    hepaticImpairment: 'Use cautiously; specific pediatric oral dosing adjustments are not established in the selected label.',
    notes: 'DoseCare includes oral syrup only. Inhalers and nebulizer solutions are deliberately excluded by the project scope. Dosing is expressed as albuterol base, consistent with the DailyMed label.'
  },
  sources: [
    { organization: 'DailyMed', title: 'Albuterol Sulfate Syrup 2 mg/5 mL — current prescribing information', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=378461f2-7271-44a3-9da3-b39970b65d3a' },
    { organization: 'FDA', title: 'FDA-approved albuterol single-ingredient products / pediatric regulatory information', url: 'https://www.fda.gov/media/113575/download' }
  ]
});
