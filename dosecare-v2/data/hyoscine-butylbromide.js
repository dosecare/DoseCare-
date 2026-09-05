/* DoseCare V2 — pediatric oral-liquid hyoscine butylbromide.
 * Product: BUSCOPAN 0.1% syrup (Sanofi South Africa).
 * Each 5 mL contains 5 mg hyoscine butylbromide.
 * Pediatric doses below are taken from the approved professional information.
 */
window.DoseCareV2Database?.register({
  id: 'hyoscine-butylbromide',
  name: 'Hyoscine Butylbromide',
  genericName: 'Hyoscine butylbromide',
  activeIngredient: 'Hyoscine butylbromide',
  dosageForm: 'Syrup',
  route: 'Oral',
  category: 'Gastrointestinal / Antispasmodic',
  formulations: [{
    id: 'buscopan-0-1-percent-syrup',
    display: 'Buscopan 0.1% syrup — 5 mg/5 mL',
    concentration: { amount: 5, unit: 'mg', volume: 5, volumeUnit: 'mL' }
  }],
  regimens: [
    { id: 'age-1-3-months', condition: 'Gastrointestinal spasm — age-based dosing', type: 'label_age_based', minAgeMonths: 1.001, maxAgeMonths: 3, requiresAge: true, requiresWeight: false, doseMin: 2.5, doseMax: 2.5, doseUnit: 'mL/dose', frequency: 3, dosesPerDay: 3, frequencyText: '2.5 mL three times daily', allowedFormulations: ['buscopan-0-1-percent-syrup'] },
    { id: 'age-over-3-months-1-year', condition: 'Gastrointestinal spasm — age-based dosing', type: 'label_age_based', minAgeMonths: 3.001, maxAgeMonths: 12, requiresAge: true, requiresWeight: false, doseMin: 2.5, doseMax: 5, doseUnit: 'mL/dose', frequency: 3, dosesPerDay: 3, frequencyText: '2.5–5 mL three times daily; start at the lowest recommended dose', allowedFormulations: ['buscopan-0-1-percent-syrup'] },
    { id: 'age-over-1-3-years', condition: 'Gastrointestinal spasm — age-based dosing', type: 'label_age_based', minAgeMonths: 12.001, maxAgeMonths: 36, requiresAge: true, requiresWeight: false, doseMin: 5, doseMax: 10, doseUnit: 'mL/dose', frequency: 3, dosesPerDay: 3, frequencyText: '5–10 mL three times daily; start at the lowest recommended dose', allowedFormulations: ['buscopan-0-1-percent-syrup'] },
    { id: 'age-over-3-6-years', condition: 'Gastrointestinal spasm — age-based dosing', type: 'label_age_based', minAgeMonths: 36.001, maxAgeMonths: 72, requiresAge: true, requiresWeight: false, doseMin: 10, doseMax: 10, doseUnit: 'mL/dose', frequency: 3, dosesPerDay: 3, frequencyText: '10 mL three times daily', allowedFormulations: ['buscopan-0-1-percent-syrup'] },
    { id: 'age-over-6-12-years', condition: 'Gastrointestinal spasm — age-based dosing', type: 'label_age_based', minAgeMonths: 72.001, maxAgeMonths: 144, requiresAge: true, requiresWeight: false, doseMin: 10, doseMax: 20, doseUnit: 'mL/dose', frequency: 3, dosesPerDay: 3, frequencyText: '10–20 mL three times daily; start at the lowest recommended dose', allowedFormulations: ['buscopan-0-1-percent-syrup'] }
  ],
  information: {
    class: 'Gastrointestinal antispasmodic / anticholinergic',
    mechanism: 'Quaternary ammonium anticholinergic that exerts a peripheral antispasmodic effect on smooth muscle of the gastrointestinal, biliary and urinary tracts.',
    indications: ['Conditions associated with gastrointestinal spasm'],
    contraindications: ['Hypersensitivity to hyoscine butylbromide or any component', 'Myasthenia gravis', 'Mechanical gastrointestinal stenosis', 'Paralytic or obstructive ileus', 'Megacolon', 'Narrow-angle glaucoma', 'Porphyria', 'Enlarged prostate', 'Fever', 'Tachycardia'],
    adverseEffects: ['Dry mouth', 'Tachycardia', 'Skin reactions such as urticaria or pruritus', 'Abnormal sweating', 'Urinary retention', 'Rare serious hypersensitivity reactions including anaphylaxis'],
    precautions: ['Do not use continuously or for extended periods without investigating the cause of abdominal pain.', 'Seek medical advice urgently for severe or unexplained abdominal pain that persists or worsens, especially with fever, vomiting, blood in stool, fainting or marked abdominal tenderness.', 'The approved product states that the initial dose should be the lowest recommended for age.'],
    administration: 'Administer orally using the product concentration of 5 mg/5 mL.',
    pediatricUse: 'The approved BUSCOPAN 0.1% syrup professional information provides age-based oral doses from older than 1 month through 12 years.',
    notes: 'DoseCare models the oral syrup only. Doses are product-specific and are not extrapolated from tablets or injections.',
    sources: [
      { organization: 'SAHPRA', title: 'Approved Professional Information for BUSCOPAN 0.1% syrup', url: 'https://pi-pil-repository.sahpra.org.za/wp-content/uploads/2022/05/pi_buscopan-01-syrup-13-04-2022_APPROVED.pdf' },
      { organization: 'Saudi Food and Drug Authority', title: 'HYOPAN SYRUP 5 MG-5 ML — registered hyoscine butylbromide syrup', url: 'https://www.sfda.gov.sa/ar/details_data?id=4371&nid=17582&page=149' }
    ]
  },
  sources: [
    { organization: 'SAHPRA', title: 'Approved Professional Information for BUSCOPAN 0.1% syrup', url: 'https://pi-pil-repository.sahpra.org.za/wp-content/uploads/2022/05/pi_buscopan-01-syrup-13-04-2022_APPROVED.pdf' }
  ]
});
