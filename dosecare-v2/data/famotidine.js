/* DoseCare V2 — Famotidine oral suspension
 * Oral liquid only. Pediatric dosing follows current DailyMed labeling
 * for famotidine oral suspension 40 mg/5 mL after reconstitution.
 */
window.DoseCareV2Database?.register({
  id: 'famotidine',
  name: 'Famotidine',
  genericName: 'Famotidine',
  activeIngredient: 'Famotidine',
  dosageForm: 'Oral Suspension',
  route: 'Oral',
  category: 'Histamine H2-receptor antagonist',
  formulations: [
    {
      id: '40mg-5mL',
      dosageForm: 'Oral Suspension',
      display: '40 mg/5 mL (8 mg/mL after reconstitution)',
      concentration: { amount: 40, unit: 'mg', volume: 5, volumeUnit: 'mL' },
      mgPer5mL: 40
    }
  ],
  regimens: [
    {
      id: 'gerd-birth-3m',
      condition: 'GERD',
      type: 'mg_per_kg_per_dose',
      minDose: 0.5,
      maxDose: 1,
      doseUnit: 'mg/kg/dose',
      frequency: 1,
      frequencyText: 'Every 24 hours',
      minAgeMonths: 0,
      maxAgeMonths: 2,
      requiresAge: true,
      requiresWeight: true,
      allowedFormulations: ['40mg-5mL']
    },
    {
      id: 'gerd-3m-1y',
      condition: 'GERD',
      type: 'mg_per_kg_per_dose',
      minDose: 0.5,
      maxDose: 1,
      doseUnit: 'mg/kg/dose',
      frequency: 2,
      frequencyText: 'Every 12 hours',
      minAgeMonths: 3,
      maxAgeMonths: 11,
      maximumDailyDose: 40,
      requiresAge: true,
      requiresWeight: true,
      allowedFormulations: ['40mg-5mL']
    },
    {
      id: 'peptic-ulcer-1-17y-start-once-daily',
      condition: 'Peptic ulcer disease',
      type: 'mg_per_kg_per_dose',
      minDose: 0.5,
      maxDose: 0.5,
      doseUnit: 'mg/kg/dose',
      frequency: 1,
      frequencyText: 'Once daily',
      minAgeYears: 1,
      maxAgeYears: 16,
      maximumDailyDose: 40,
      requiresAge: true,
      requiresWeight: true,
      allowedFormulations: ['40mg-5mL'],
      notes: 'Starting regimen; may be increased according to the product label.'
    },
    {
      id: 'peptic-ulcer-1-17y-start-twice-daily',
      condition: 'Peptic ulcer disease',
      type: 'mg_per_kg_per_dose',
      minDose: 0.25,
      maxDose: 0.25,
      doseUnit: 'mg/kg/dose',
      frequency: 2,
      frequencyText: 'Every 12 hours',
      minAgeYears: 1,
      maxAgeYears: 16,
      maximumDailyDose: 40,
      requiresAge: true,
      requiresWeight: true,
      allowedFormulations: ['40mg-5mL'],
      notes: 'Starting regimen; may be increased according to the product label.'
    },
    {
      id: 'peptic-ulcer-1-17y-increased-once-daily',
      condition: 'Peptic ulcer disease',
      type: 'mg_per_kg_per_dose',
      minDose: 1,
      maxDose: 1,
      doseUnit: 'mg/kg/dose',
      frequency: 1,
      frequencyText: 'Once daily at bedtime',
      minAgeYears: 1,
      maxAgeYears: 16,
      maximumDailyDose: 40,
      requiresAge: true,
      requiresWeight: true,
      allowedFormulations: ['40mg-5mL'],
      notes: 'May be used when the starting regimen is increased; maximum 40 mg/day.'
    },
    {
      id: 'peptic-ulcer-1-17y-increased-twice-daily',
      condition: 'Peptic ulcer disease',
      type: 'mg_per_kg_per_dose',
      minDose: 0.5,
      maxDose: 0.5,
      doseUnit: 'mg/kg/dose',
      frequency: 2,
      frequencyText: 'Every 12 hours',
      minAgeYears: 1,
      maxAgeYears: 16,
      maximumDailyDose: 40,
      requiresAge: true,
      requiresWeight: true,
      allowedFormulations: ['40mg-5mL'],
      notes: 'May be used when the starting regimen is increased; maximum 40 mg/day.'
    },
    {
      id: 'gerd-1-17y',
      condition: 'GERD with or without esophagitis and ulcerations',
      type: 'mg_per_kg_per_dose',
      minDose: 0.5,
      maxDose: 0.5,
      doseUnit: 'mg/kg/dose',
      frequency: 2,
      frequencyText: 'Every 12 hours',
      minAgeYears: 1,
      maxAgeYears: 16,
      maximumDosePerAdministration: 40,
      requiresAge: true,
      requiresWeight: true,
      allowedFormulations: ['40mg-5mL']
    }
  ],
  information: {
    class: 'Histamine H2-receptor antagonist',
    mechanism: 'Famotidine competitively inhibits histamine at H2 receptors on gastric parietal cells, reducing basal and stimulated gastric acid secretion.',
    indications: ['Gastroesophageal reflux disease (GERD)', 'Peptic ulcer disease', 'GERD with esophagitis and ulcerations'],
    contraindications: ['History of serious hypersensitivity reactions, including anaphylaxis, to famotidine or other H2-receptor antagonists'],
    adverseEffects: ['Headache', 'Dizziness', 'Constipation', 'Diarrhea', 'Nausea'],
    precautions: [
      'A safe and effective pediatric dose has not been established in pediatric patients with renal impairment; renal function should be considered before use.',
      'Individualize treatment duration according to indication and clinical response.',
      'Use the concentration after reconstitution (40 mg/5 mL) for dose-to-volume conversion.'
    ],
    interactions: ['Famotidine may alter the absorption of medicines whose absorption depends on gastric acidity; review concurrent medicines for clinically significant interactions.'],
    administration: 'Reconstitute the powder according to the product instructions. Shake vigorously for 5–10 seconds before each use. May be taken with or without food. Administer once daily before bedtime or twice daily in the morning and before bedtime as prescribed.',
    pediatricUse: 'Current labeling provides GERD dosing from birth to less than 1 year and from 1 year to less than 17 years, plus peptic-ulcer dosing from 1 year to less than 17 years. The constituted oral suspension contains 40 mg/5 mL.',
    notes: 'DoseCare includes the oral suspension only. The peptic-ulcer regimen is represented as separate starting and increased alternatives so the once-daily and twice-daily label regimens are not conflated.'
  },
  sources: [
    {
      organization: 'DailyMed',
      title: 'Famotidine for Oral Suspension — pediatric dosing and 40 mg/5 mL concentration; updated 2025/2026 labeling',
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a88e7069-230c-4105-ade0-a98968e18671'
    }
  ]
});
