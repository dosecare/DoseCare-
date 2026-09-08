/* DoseCare V2 — Bromhexine pediatric oral solution
 * Primary pediatric source: HPRA Summary of Product Characteristics for Bisolvon 4 mg/5 mL Oral Solution.
 * Oral liquid only. DoseCare encodes only the pediatric regimens explicitly stated for this formulation.
 */
window.DoseCareV2Database?.register({
  id: 'bromhexine',
  name: 'Bromhexine',
  genericName: 'Bromhexine hydrochloride',
  activeIngredient: 'Bromhexine hydrochloride',
  dosageForm: 'Oral Solution',
  route: 'Oral',
  category: 'Mucolytic',
  dosing: { calculatorReady: true },
  formulations: [
    {
      id: 'bromhexine-4mg-5ml',
      display: '4 mg/5 mL',
      mgPer5mL: 4,
      concentration: { amount: 4, unit: 'mg', volume: 5, volumeUnit: 'mL' }
    }
  ],
  regimens: [
    {
      id: 'age-2-5',
      type: 'fixed_dose',
      condition: 'Respiratory tract disorders with viscid mucoid secretions',
      dose: 4,
      minDose: 4,
      maxDose: 4,
      doseUnit: 'mg/dose',
      frequency: 2,
      frequencyText: 'Twice daily',
      minAgeYears: 2,
      maxAgeYears: 5,
      requiresAge: true,
      requiresWeight: false,
      allowedFormulations: ['bromhexine-4mg-5ml']
    },
    {
      id: 'age-over-5-12',
      type: 'fixed_dose',
      condition: 'Respiratory tract disorders with viscid mucoid secretions',
      dose: 4,
      minDose: 4,
      maxDose: 4,
      doseUnit: 'mg/dose',
      frequency: 4,
      frequencyText: 'Four times daily',
      minAgeYears: 6,
      maxAgeYears: 12,
      requiresAge: true,
      requiresWeight: false,
      allowedFormulations: ['bromhexine-4mg-5ml']
    }
  ],
  information: {
    class: 'Mucolytic agent',
    indications: ['Mucolytic treatment of viscid mucoid secretions associated with bronchitis, bronchiectasis and sinusitis'],
    mechanism: 'Bromhexine is a mucolytic agent that reduces the viscosity of respiratory secretions and facilitates mucus clearance.',
    precautions: [
      'Use with caution in patients with a history of or existing peptic ulceration.',
      'Rare serious skin reactions have been reported; discontinue treatment immediately if a progressive skin rash or mucosal lesions occur and seek medical assessment.',
      'Use with caution in severe hepatic or renal impairment, asthma, a history of bronchospasm, severe respiratory insufficiency, or impaired ability to cough up secretions.',
      'Mucus clearance depends on an effective cough; avoid combining with antitussives that suppress the cough reflex unless specifically directed by a clinician.',
      'The formulation contains maltitol; patients with hereditary fructose intolerance should not take it.'
    ],
    adverseEffects: ['Nausea', 'Vomiting', 'Diarrhea', 'Abdominal discomfort', 'Hypersensitivity reactions', 'Rare severe skin reactions'],
    contraindications: ['Hypersensitivity to bromhexine hydrochloride or any excipient in the formulation.'],
    interactions: ['Antitussives may impair mucus clearance by suppressing the cough reflex. The cited product leaflet specifically asks patients to inform clinicians about concomitant medicines, including antibiotics such as ampicillin, amoxicillin, erythromycin and oxytetracycline. No specific harmful antibiotic interaction is stated in the cited product information.'],
    administration: 'For oral use. Use the supplied calibrated measuring device. The 4 mg/5 mL oral solution may be taken with or without food.',
    pediatricUse: 'For the selected 4 mg/5 mL oral solution: children 2–5 years receive 5 mL (4 mg) twice daily; children over 5 through 12 years receive 5 mL (4 mg) four times daily. The cited product information does not provide a pediatric regimen below 2 years, so DoseCare does not extrapolate one.',
    notes: 'The source states “over 5 to ≤12 years” for the four-times-daily regimen. DoseCare represents this operationally as ages 6–12 years to avoid overlapping the 2–5-year regimen. Tablet, capsule and injectable formulations are excluded from DoseCare.'
  },
  sources: [
    { organization: 'Health Products Regulatory Authority (HPRA)', title: 'Bisolvon 4 mg/5 mL Oral Solution — Summary of Product Characteristics', url: 'https://www.hpra.ie/img/uploaded/swedocuments/Licence_PA23180-015-001_15112023155448.pdf' },
    { organization: 'Health Products Regulatory Authority (HPRA)', title: 'Bisolvon 4 mg/5 mL Oral Solution — Package Leaflet', url: 'https://www.hpra.ie/img/uploaded/swedocuments/3d3036e7-0a8c-4735-b31d-29e601264518.pdf' }
  ]
});
