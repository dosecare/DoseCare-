/* DoseCare V2 — Loratadine oral solution
 * Source: DailyMed loratadine oral solution labels.
 */
window.DoseCareV2Database?.register({
  id: 'loratadine',
  name: 'Loratadine',
  genericName: 'Loratadine',
  activeIngredient: 'Loratadine',
  dosageForm: 'Oral Solution',
  route: 'Oral',
  formulations: [
    { display: '5 mg/5 mL (1 mg/mL)', concentration: { amount: 1, unit: 'mg', volume: 1, volumeUnit: 'mL' }, mgPer5mL: 5 }
  ],
  regimens: [
    {
      id: 'allergy-2y-5y',
      condition: 'Allergic rhinitis / upper respiratory allergy symptoms',
      type: 'fixed_dose', dose: 5, minDose: 5, maxDose: 5,
      unit: 'mg/dose', frequency: 1, frequencyText: 'Every 24 hours',
      requiresAge: true, requiresWeight: false, minAgeYears: 2, maxAgeYears: 5
    },
    {
      id: 'allergy-6y-plus',
      condition: 'Allergic rhinitis / upper respiratory allergy symptoms',
      type: 'fixed_dose', dose: 10, minDose: 10, maxDose: 10,
      unit: 'mg/dose', frequency: 1, frequencyText: 'Every 24 hours',
      requiresAge: true, requiresWeight: false, minAgeYears: 6,
      maximumDailyDose: 10
    }
  ],
  information: {
    class: 'Second-generation antihistamine',
    indications: ['Hay fever / allergic rhinitis symptoms', 'Upper respiratory allergy symptoms'],
    notes: 'Children under 2 years: ask a doctor. Liver or kidney disease may require a different dose.'
  },
  sources: [
    { organization: 'DailyMed', title: 'Loratadine Oral Solution USP 5 mg/5 mL', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b963d83b-584f-c447-e053-2995a90ad973' },
    { organization: 'DailyMed', title: 'Children’s Loratadine Solution', url: 'https://www.dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=78e11f1c-c8a4-4b2a-b7dc-ae1b2dea26d0' }
  ]
});
