/* DoseCare V2 — Loratadine oral solution
 * Sources cross-checked: current DailyMed oral-solution labels and FDA-approved Claritin oral-solution labeling.
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
      id: 'allergy-2y-5y', condition: 'Allergic rhinitis / upper respiratory allergy symptoms',
      type: 'fixed_dose', dose: 5, minDose: 5, maxDose: 5, unit: 'mg/dose', frequency: 1, frequencyText: 'Every 24 hours',
      requiresAge: true, requiresWeight: false, minAgeYears: 2, maxAgeYears: 5
    },
    {
      id: 'allergy-6y-plus', condition: 'Allergic rhinitis / upper respiratory allergy symptoms',
      type: 'fixed_dose', dose: 10, minDose: 10, maxDose: 10, unit: 'mg/dose', frequency: 1, frequencyText: 'Every 24 hours',
      requiresAge: true, requiresWeight: false, minAgeYears: 6, maximumDailyDose: 10
    }
  ],
  information: {
    class: 'Second-generation antihistamine',
    mechanismOfAction: 'Selective peripheral H1-receptor antagonist that reduces histamine-mediated allergic symptoms.',
    indications: ['Hay fever / allergic rhinitis symptoms', 'Upper respiratory allergy symptoms'],
    contraindications: ['Hypersensitivity to loratadine or any formulation component.'],
    adverseEffects: ['Headache', 'Somnolence/drowsiness can occur, especially with excessive dosing', 'Fatigue'],
    warningsPrecautions: ['Patients with liver or kidney disease should consult a clinician because a different dose may be needed.', 'Do not exceed the labeled dose.'],
    interactions: ['CYP3A4/CYP2D6 inhibitors may increase loratadine or desloratadine exposure.'],
    administration: 'Use the enclosed/accurate dosing device; once daily. May be taken without regard to food.',
    pediatricUse: 'OTC oral-solution labeling supports children 2 years and older; children under 2 years should ask a doctor.',
    notes: 'Oral solution 5 mg/5 mL.'
  },
  sources: [
    { organization: 'DailyMed', title: 'Loratadine Oral Solution USP 5 mg/5 mL — revised 2026', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b963d83b-584f-c447-e053-2995a90ad973' },
    { organization: 'FDA', title: 'Claritin (loratadine) oral solution — FDA supplemental approval', url: 'https://www.accessdata.fda.gov/drugsatfda_docs/appletter/2024/020641orig1s048ltr.pdf' },
    { organization: 'FDA', title: 'Children’s Claritin Allergy oral solution 5 mg/5 mL labeling', url: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2015/020641s037lbl.pdf' }
  ]
});
