/* DoseCare V2 — Cetirizine oral solution
 * Sources: DailyMed cetirizine hydrochloride oral solution labels.
 */
window.DoseCareV2Database?.register({
  id: 'cetirizine',
  name: 'Cetirizine',
  genericName: 'Cetirizine hydrochloride',
  activeIngredient: 'Cetirizine hydrochloride',
  dosageForm: 'Oral Solution',
  route: 'Oral',
  formulations: [
    { display: '1 mg/mL (5 mg/5 mL)', concentration: { amount: 1, unit: 'mg', volume: 1, volumeUnit: 'mL' }, mgPer5mL: 5 }
  ],
  regimens: [
    {
      id: 'allergic-rhinitis-urticaria-6m-11m',
      condition: 'Perennial allergic rhinitis / chronic urticaria',
      type: 'fixed_dose', dose: 2.5, minDose: 2.5, maxDose: 2.5,
      unit: 'mg/dose', frequency: 1, frequencyText: 'Every 24 hours',
      requiresAge: true, requiresWeight: false, minAgeMonths: 6, maxAgeMonths: 11
    },
    {
      id: 'allergic-rhinitis-urticaria-12m-23m',
      condition: 'Perennial allergic rhinitis / chronic urticaria',
      type: 'fixed_dose', dose: 2.5, minDose: 2.5, maxDose: 2.5,
      unit: 'mg/dose', frequency: 1, frequencyText: 'Every 24 hours',
      requiresAge: true, requiresWeight: false, minAgeMonths: 12, maxAgeMonths: 23
    },
    {
      id: 'allergic-rhinitis-urticaria-12m-23m-q12h',
      condition: 'Perennial allergic rhinitis / chronic urticaria — maximum regimen',
      type: 'fixed_dose', dose: 2.5, minDose: 2.5, maxDose: 2.5,
      unit: 'mg/dose', frequency: 2, frequencyText: 'Every 12 hours',
      requiresAge: true, requiresWeight: false, minAgeMonths: 12, maxAgeMonths: 23,
      maximumDailyDose: 5
    },
    {
      id: 'chronic-urticaria-2y-5y',
      condition: 'Chronic urticaria',
      type: 'fixed_dose', dose: 2.5, minDose: 2.5, maxDose: 2.5,
      unit: 'mg/dose', frequency: 1, frequencyText: 'Every 24 hours',
      requiresAge: true, requiresWeight: false, minAgeYears: 2, maxAgeYears: 5
    },
    {
      id: 'chronic-urticaria-2y-5y-max',
      condition: 'Chronic urticaria — maximum regimen',
      type: 'fixed_dose', dose: 5, minDose: 5, maxDose: 5,
      unit: 'mg/day', frequency: 1, frequencyText: 'Every 24 hours',
      requiresAge: true, requiresWeight: false, minAgeYears: 2, maxAgeYears: 5,
      maximumDailyDose: 5
    },
    {
      id: 'children-6y-plus',
      condition: 'Allergic symptoms',
      type: 'fixed_dose', minDose: 5, maxDose: 10,
      unit: 'mg/day', frequency: 1, frequencyText: 'Every 24 hours',
      requiresAge: true, requiresWeight: false, minAgeYears: 6,
      maximumDailyDose: 10
    }
  ],
  information: {
    class: 'Second-generation antihistamine',
    indications: ['Perennial allergic rhinitis', 'Chronic urticaria'],
    notes: 'Oral solution 1 mg/mL. May be taken without regard to food.'
  },
  sources: [
    { organization: 'DailyMed', title: 'Cetirizine Hydrochloride Oral Solution USP 1 mg/mL', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=41d7af88-87b4-370e-e063-6294a90a8af6' },
    { organization: 'DailyMed', title: 'Cetirizine Hydrochloride Oral Solution 1 mg/mL — pediatric dosing', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=71448ab0-e23e-4cf7-940e-7d67e7362fb4' }
  ]
});
