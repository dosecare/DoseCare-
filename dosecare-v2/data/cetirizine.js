/* DoseCare V2 — Cetirizine pediatric oral solution
 * Oral liquid only. Pediatric dosing is based on current DailyMed labeling for cetirizine hydrochloride oral solution 1 mg/mL (5 mg/5 mL).
 */
window.DoseCareV2Database?.register({
  id: 'cetirizine',
  name: 'Cetirizine',
  genericName: 'Cetirizine hydrochloride',
  activeIngredient: 'Cetirizine hydrochloride',
  dosageForm: 'Oral Solution',
  route: 'Oral',
  category: 'Second-generation antihistamine',
  dosing: { calculatorReady: true },
  formulations: [{
    id: 'cetirizine-1mg-ml',
    display: '1 mg/mL (5 mg/5 mL)',
    mgPer5mL: 5,
    concentration: { amount: 1, unit: 'mg', volume: 1, volumeUnit: 'mL' }
  }],
  regimens: [
    {
      id: 'allergic-rhinitis-urticaria-6m-11m', type: 'fixed_dose',
      condition: 'Perennial allergic rhinitis / chronic urticaria',
      dose: 2.5, minDose: 2.5, maxDose: 2.5, unit: 'mg/dose',
      frequency: 1, frequencyText: 'Every 24 hours',
      minAgeMonths: 6, maxAgeMonths: 11, requiresAge: true, requiresWeight: false,
      allowedFormulations: ['cetirizine-1mg-ml']
    },
    {
      id: 'allergic-rhinitis-urticaria-12m-23m', type: 'fixed_dose',
      condition: 'Perennial allergic rhinitis / chronic urticaria',
      dose: 2.5, minDose: 2.5, maxDose: 2.5, unit: 'mg/dose',
      frequency: 1, frequencyText: 'Every 24 hours',
      minAgeMonths: 12, maxAgeMonths: 23, requiresAge: true, requiresWeight: false,
      allowedFormulations: ['cetirizine-1mg-ml']
    },
    {
      id: 'allergic-rhinitis-urticaria-12m-23m-max-q12h', type: 'fixed_dose',
      condition: 'Perennial allergic rhinitis / chronic urticaria — maximum regimen',
      dose: 2.5, minDose: 2.5, maxDose: 2.5, unit: 'mg/dose',
      frequency: 2, frequencyText: 'Every 12 hours; maximum 5 mg/day',
      maximumDailyDose: 5, minAgeMonths: 12, maxAgeMonths: 23,
      requiresAge: true, requiresWeight: false,
      allowedFormulations: ['cetirizine-1mg-ml']
    },
    {
      id: 'chronic-urticaria-2y-5y', type: 'fixed_dose',
      condition: 'Chronic urticaria',
      dose: 2.5, minDose: 2.5, maxDose: 2.5, unit: 'mg/dose',
      frequency: 1, frequencyText: 'Every 24 hours',
      minAgeYears: 2, maxAgeYears: 5.999, requiresAge: true, requiresWeight: false,
      allowedFormulations: ['cetirizine-1mg-ml']
    },
    {
      id: 'chronic-urticaria-2y-5y-max-once-daily', type: 'fixed_dose',
      condition: 'Chronic urticaria — maximum once-daily regimen',
      dose: 5, minDose: 5, maxDose: 5, unit: 'mg/dose',
      frequency: 1, frequencyText: 'Every 24 hours; maximum 5 mg/day',
      maximumDailyDose: 5, minAgeYears: 2, maxAgeYears: 5.999,
      requiresAge: true, requiresWeight: false,
      allowedFormulations: ['cetirizine-1mg-ml']
    },
    {
      id: 'chronic-urticaria-2y-5y-max-q12h', type: 'fixed_dose',
      condition: 'Chronic urticaria — maximum divided regimen',
      dose: 2.5, minDose: 2.5, maxDose: 2.5, unit: 'mg/dose',
      frequency: 2, frequencyText: 'Every 12 hours; maximum 5 mg/day',
      maximumDailyDose: 5, minAgeYears: 2, maxAgeYears: 5.999,
      requiresAge: true, requiresWeight: false,
      allowedFormulations: ['cetirizine-1mg-ml']
    },
    {
      id: 'allergic-rhinitis-6y-plus', type: 'fixed_dose',
      condition: 'Allergic rhinitis / chronic urticaria',
      dose: 5, minDose: 5, maxDose: 10, unit: 'mg/dose',
      frequency: 1, frequencyText: 'Every 24 hours; maximum 10 mg/day',
      maximumDailyDose: 10, minAgeYears: 6,
      requiresAge: true, requiresWeight: false,
      allowedFormulations: ['cetirizine-1mg-ml']
    }
  ],
  information: {
    class: 'Second-generation H1 antihistamine',
    indications: ['Perennial allergic rhinitis', 'Chronic urticaria'],
    mechanism: 'Selective peripheral H1-receptor antagonist that reduces histamine-mediated allergic symptoms.',
    precautions: ['Use caution in renal impairment; dosing may require adjustment.', 'Drowsiness can occur in some patients.', 'Patients with liver or kidney disease should seek medical advice before using OTC products.'],
    adverseEffects: ['Somnolence/drowsiness', 'Fatigue', 'Dry mouth', 'Headache', 'Abdominal discomfort'],
    contraindications: ['Hypersensitivity to cetirizine, hydroxyzine, or any formulation component.'],
    interactions: ['Alcohol and other CNS depressants may increase drowsiness.'],
    administration: 'May be taken without regard to food. Use an accurate oral measuring device.',
    pediatricUse: 'For 1 mg/mL oral solution: ages 6–23 months receive 2.5 mg (2.5 mL) once daily for perennial allergic rhinitis/chronic urticaria; ages 12–23 months may increase to 5 mg/day as 2.5 mg every 12 hours. Ages 2–5 years with chronic urticaria start at 2.5 mg once daily and may increase to 5 mg/day either once daily or as 2.5 mg every 12 hours. Current OTC labeling for children 6 years and over allows 5–10 mL once daily, maximum 10 mL/24 hours.',
    notes: 'DoseCare does not extrapolate dosing below 6 months. The 6–23 month regimen is indication-specific to perennial allergic rhinitis/chronic urticaria and is based on prescription oral-solution labeling; OTC children’s products may instead direct caregivers under 2 years to ask a doctor.',
    sources: [
      { organization: 'DailyMed', title: 'Cetirizine Hydrochloride Oral Solution USP 1 mg/mL — pediatric dosing', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e874264a-becc-45d0-b934-779eab5f5085' },
      { organization: 'DailyMed', title: "Children's Cetirizine Hydrochloride Oral Solution 5 mg/5 mL — OTC directions", url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=30cbaa91-2216-efd2-e063-6294a90aaaed' }
    ]
  },
  sources: [
    { organization: 'DailyMed', title: 'Cetirizine Hydrochloride Oral Solution USP 1 mg/mL — pediatric dosing', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e874264a-becc-45d0-b934-779eab5f5085' },
    { organization: 'DailyMed', title: "Children's Cetirizine Hydrochloride Oral Solution 5 mg/5 mL — OTC directions", url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=30cbaa91-2216-efd2-e063-6294a90aaaed' }
  ]
});
