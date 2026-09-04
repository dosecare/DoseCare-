/* DoseCare V2 — Cetirizine oral solution
 * Oral liquid only. Pediatric dosing follows current DailyMed labeling for 1 mg/mL oral solution.
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
      id: 'allergic-rhinitis-urticaria-6m-11m', condition: 'Perennial allergic rhinitis / chronic urticaria',
      type: 'fixed_dose', dose: 2.5, minDose: 2.5, maxDose: 2.5, unit: 'mg/dose', frequency: 1, frequencyText: 'Every 24 hours',
      requiresAge: true, requiresWeight: false, minAgeMonths: 6, maxAgeMonths: 11
    },
    {
      id: 'allergic-rhinitis-urticaria-12m-23m', condition: 'Perennial allergic rhinitis / chronic urticaria',
      type: 'fixed_dose', dose: 2.5, minDose: 2.5, maxDose: 2.5, unit: 'mg/dose', frequency: 1, frequencyText: 'Every 24 hours',
      requiresAge: true, requiresWeight: false, minAgeMonths: 12, maxAgeMonths: 23
    },
    {
      id: 'allergic-rhinitis-urticaria-12m-23m-q12h', condition: 'Perennial allergic rhinitis / chronic urticaria — maximum regimen',
      type: 'fixed_dose', dose: 2.5, minDose: 2.5, maxDose: 2.5, unit: 'mg/dose', frequency: 2, frequencyText: 'Every 12 hours',
      requiresAge: true, requiresWeight: false, minAgeMonths: 12, maxAgeMonths: 23, maximumDailyDose: 5
    },
    {
      id: 'chronic-urticaria-2y-5y', condition: 'Chronic urticaria',
      type: 'fixed_dose', dose: 2.5, minDose: 2.5, maxDose: 2.5, unit: 'mg/dose', frequency: 1, frequencyText: 'Every 24 hours',
      requiresAge: true, requiresWeight: false, minAgeYears: 2, maxAgeYears: 5
    },
    {
      id: 'chronic-urticaria-2y-5y-max', condition: 'Chronic urticaria — maximum regimen',
      type: 'fixed_dose', dose: 5, minDose: 5, maxDose: 5, unit: 'mg/day', frequency: 1, frequencyText: 'Every 24 hours',
      requiresAge: true, requiresWeight: false, minAgeYears: 2, maxAgeYears: 5, maximumDailyDose: 5
    },
    {
      id: 'allergic-rhinitis-6y-plus', condition: 'Allergic rhinitis / chronic urticaria',
      type: 'fixed_dose', minDose: 5, maxDose: 10, unit: 'mg/day', frequency: 1, frequencyText: 'Every 24 hours',
      requiresAge: true, requiresWeight: false, minAgeYears: 6, maximumDailyDose: 10
    }
  ],
  information: {
    class: 'Second-generation antihistamine',
    mechanismOfAction: 'Selective peripheral H1-receptor antagonist that reduces histamine-mediated allergic symptoms.',
    indications: ['Perennial allergic rhinitis', 'Chronic urticaria'],
    contraindications: ['Hypersensitivity to cetirizine, hydroxyzine, or any formulation component.'],
    adverseEffects: ['Somnolence/drowsiness', 'Fatigue', 'Dry mouth', 'Headache', 'Abdominal discomfort'],
    warningsPrecautions: ['Use caution in renal impairment; dosing may require adjustment.', 'Drowsiness can occur in some patients.'],
    interactions: ['Alcohol and other CNS depressants may increase drowsiness.'],
    administration: 'May be taken without regard to food. Use an accurate oral measuring device.',
    pediatricUse: 'Current DailyMed labeling for 1 mg/mL oral solution supports 2.5 mg once daily from 6–23 months for perennial allergic rhinitis/chronic urticaria, with 12–23 months allowed up to 5 mg/day. For chronic urticaria at 2–5 years, the initial dose is 2.5 mg once daily and may increase to 5 mg/day. From 6 years, 5–10 mg/day is the configured pediatric/adolescent range.',
    notes: 'Oral solution 1 mg/mL. The 6–23 month indication is specifically perennial allergic rhinitis/chronic urticaria; DoseCare does not label this as a generic allergy dose.',
    sources: [
      { organization: 'DailyMed', title: 'Cetirizine Hydrochloride Oral Solution USP 1 mg/mL — revised 2025', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=41d7af88-87b4-370e-e063-6294a90a8af6' },
      { organization: 'FDA', title: 'Cetirizine pediatric labeling information / approved pediatric use', url: 'https://www.accessdata.fda.gov/scripts/sda/sdDetailNavigation.cfm?id=14CE032258C11B7DE053564DA8C071F2' }
    ]
  },
  sources: [
    { organization: 'DailyMed', title: 'Cetirizine Hydrochloride Oral Solution USP 1 mg/mL — revised 2025', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=41d7af88-87b4-370e-e063-6294a90a8af6' },
    { organization: 'FDA', title: 'Cetirizine pediatric labeling information / approved pediatric use', url: 'https://www.accessdata.fda.gov/scripts/sda/sdDetailNavigation.cfm?id=14CE032258C11B7DE053564DA8C071F2' }
  ]
});
