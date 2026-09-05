/* DoseCare V2 — Ambroxol pediatric oral syrup
 * Sources cross-checked: AEMPS SmPCs for Ambroxol 3 mg/mL oral syrup/solution; HPRA SmPC for Ambrobene Extra Strength 6 mg/mL oral solution; Spanish Pediatric Association Pediamécum.
 * Oral liquid only. DoseCare encodes pediatric oral-liquid regimens and excludes tablets and non-oral formulations.
 */
window.DoseCareV2Database?.register({
  id: 'ambroxol',
  name: 'Ambroxol',
  genericName: 'Ambroxol hydrochloride',
  activeIngredient: 'Ambroxol hydrochloride',
  dosageForm: 'Oral Syrup',
  route: 'Oral',
  category: 'Mucolytic / Expectorant',
  dosing: {
    calculatorReady: true
  },
  formulations: [
    {
      id: 'ambroxol-15mg-5ml',
      display: '15 mg/5 mL',
      mgPer5mL: 15,
      concentration: { amount: 15, unit: 'mg', volume: 5, volumeUnit: 'mL' }
    }
  ],
  regimens: [
    {
      id: 'age-2-5',
      type: 'fixed_dose',
      condition: 'Respiratory tract conditions with excessive/viscous mucus',
      dose: 2.5,
      minDose: 2.5,
      maxDose: 2.5,
      doseUnit: 'mL/dose',
      frequency: 3,
      frequencyText: 'Every 8 hours',
      minAgeYears: 2,
      maxAgeYears: 5,
      requiresAge: true,
      requiresWeight: false,
      allowedFormulations: ['ambroxol-15mg-5ml'],
      maximumDailyDose: 22.5
    },
    {
      id: 'age-6-12',
      type: 'fixed_dose',
      condition: 'Respiratory tract conditions with excessive/viscous mucus',
      dose: 5,
      minDose: 5,
      maxDose: 5,
      doseUnit: 'mL/dose',
      frequency: 3,
      frequencyText: 'Every 8 hours; may be reduced to every 12 hours after improvement',
      minAgeYears: 6,
      maxAgeYears: 12,
      requiresAge: true,
      requiresWeight: false,
      allowedFormulations: ['ambroxol-15mg-5ml'],
      maximumDailyDose: 45,
      alternativeFrequency: 2,
      alternativeFrequencyText: 'Every 12 hours after 2–3 days once improved'
    }
  ],
  information: {
    class: 'Mucolytic agent',
    indications: ['Acute and chronic respiratory tract conditions associated with abnormal/viscous mucus secretion and impaired mucus clearance'],
    mechanism: 'Ambroxol reduces the viscosity of respiratory mucus and supports mucociliary clearance, facilitating expectoration.',
    precautions: ['Do not use in children under 2 years with the selected 3 mg/mL pediatric syrup formulation.', 'Use with medical supervision in children 2–5 years according to the cited product information.', 'Use cautiously in patients with severe hepatic or renal impairment; dose reduction or longer dosing intervals may be required.', 'Stop and seek medical assessment if signs of serious hypersensitivity or severe skin reactions occur.'],
    adverseEffects: ['Nausea', 'Vomiting', 'Diarrhea', 'Abdominal discomfort', 'Dry mouth', 'Taste disturbance', 'Hypersensitivity reactions can occur; severe cutaneous reactions are rare.'],
    contraindications: ['Hypersensitivity to ambroxol hydrochloride or any component of the formulation.', 'Children under 2 years for the selected pediatric oral-liquid product information.'],
    administration: 'Administer orally using the supplied calibrated measuring device. The selected 3 mg/mL product information permits administration with or without food.',
    pediatricUse: 'For the selected 15 mg/5 mL oral syrup: 2.5 mL three times daily for ages 2–5 years; 5 mL two to three times daily for ages 6–12 years. DoseCare uses the labeled maximum-frequency regimen as the primary calculator regimen for 6–12 years and preserves the lower-frequency option as an alternative.',
    notes: 'Ambroxol is included as an oral liquid only. Tablet and injectable formulations are excluded from DoseCare. If symptoms persist or worsen after approximately 5 days, the cited product information recommends clinical reassessment.'
  },
  sources: [
    { organization: 'AEMPS / CIMA', title: 'Ambroxol SANDOZ CARE 3 mg/mL syrup — Summary of Product Characteristics', url: 'https://cima.aemps.es/cima/dochtml/ft/62248/FT_62248.html' },
    { organization: 'AEMPS / CIMA', title: 'Ambroxol Normon 3 mg/mL oral solution — Summary of Product Characteristics', url: 'https://cima.aemps.es/cima/dochtml/ft/63790/FT_63790.html' },
    { organization: 'HPRA', title: 'Ambrobene Extra Strength 6 mg/mL Oral Solution — Summary of Product Characteristics', url: 'https://www.hpra.ie/img/uploaded/swedocuments/LicenseSPC_PA0749-158-002_03082016152042.pdf' },
    { organization: 'Asociación Española de Pediatría', title: 'Pediamécum — Ambroxol', url: 'https://www.aeped.es/comites/cm/pediamecum/principios-activos/ambroxol' }
  ]
});
