/* DoseCare V2 — Famotidine oral suspension
 * Oral liquid only. Pediatric dosing is from current product labeling.
 */
window.DoseCareV2Database?.register({
  id: 'famotidine',
  name: 'Famotidine',
  genericName: 'Famotidine',
  activeIngredient: 'Famotidine',
  dosageForm: 'Oral Suspension',
  route: 'Oral',
  formulations: [
    { display: '8 mg/mL (40 mg/5 mL after reconstitution)', concentration: { amount: 8, unit: 'mg', volume: 1, volumeUnit: 'mL' }, mgPer5mL: 40 }
  ],
  regimens: [
    {
      id: 'gerd-birth-3m', condition: 'GERD', type: 'mg_per_kg_per_dose',
      minDose: 0.5, maxDose: 1, unit: 'mg/kg/dose', frequency: 1,
      frequencyText: 'Every 24 hours', requiresAge: true, requiresWeight: true,
      minAgeMonths: 0, maxAgeMonths: 2
    },
    {
      id: 'gerd-3m-1y', condition: 'GERD', type: 'mg_per_kg_per_dose',
      minDose: 0.5, maxDose: 1, unit: 'mg/kg/dose', frequency: 2,
      frequencyText: 'Every 12 hours', requiresAge: true, requiresWeight: true,
      minAgeMonths: 3, maxAgeMonths: 11, maximumDailyDose: 40
    },
    {
      id: 'peptic-ulcer-1-17y', condition: 'Peptic ulcer disease', type: 'mg_per_kg_per_dose',
      minDose: 0.25, maxDose: 0.5, unit: 'mg/kg/dose', frequency: 2,
      frequencyText: 'Every 12 hours', requiresAge: true, requiresWeight: true,
      minAgeYears: 1, maxAgeYears: 16, maximumDailyDose: 40
    },
    {
      id: 'gerd-1-17y', condition: 'GERD with or without esophagitis and ulcerations', type: 'mg_per_kg_per_dose',
      minDose: 0.5, maxDose: 0.5, unit: 'mg/kg/dose', frequency: 2,
      frequencyText: 'Every 12 hours', requiresAge: true, requiresWeight: true,
      minAgeYears: 1, maxAgeYears: 16, maximumDosePerAdministration: 40
    }
  ],
  information: {
    class: 'Histamine H2-receptor antagonist',
    mechanismOfAction: 'Famotidine competitively inhibits histamine at H2 receptors on gastric parietal cells, reducing basal and stimulated gastric acid secretion.',
    indications: ['GERD', 'Peptic ulcer disease', 'GERD with esophagitis and ulcerations'],
    contraindications: ['Hypersensitivity to famotidine or other H2-receptor antagonists'],
    adverseEffects: ['Headache', 'Dizziness', 'Constipation', 'Diarrhea', 'Nausea'],
    warningsPrecautions: ['Pediatric dosing in renal impairment has not been established; renal function should be considered before use.', 'Individualize treatment duration according to clinical response and indication.', 'Do not confuse the post-reconstitution concentration with the powder strength before reconstitution.'],
    interactions: ['Acid-dependent absorption of some medicines may be altered.', 'Review concomitant medicines for clinically significant interactions.'],
    administration: 'For the selected powder-for-suspension product, reconstitute according to the product instructions to obtain 8 mg/mL. Administer with or without food.',
    pediatricUse: 'Current labeling provides pediatric dosing for GERD from birth and for peptic ulcer disease/GERD with esophagitis in children 1 year and older. The selected oral suspension is 8 mg/mL after preparation.',
    notes: 'DoseCare includes the oral suspension only; tablets and other solid formulations are excluded.',
    sources: [
      { organization: 'DailyMed', title: 'Famotidine for Oral Suspension — 8 mg/mL after reconstitution; pediatric dosing', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a88e7069-230c-4105-ade0-a98968e18671' }
    ]
  },
  sources: [
    { organization: 'DailyMed', title: 'Famotidine for Oral Suspension — 8 mg/mL after reconstitution; pediatric dosing', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a88e7069-230c-4105-ade0-a98968e18671' }
  ]
});
