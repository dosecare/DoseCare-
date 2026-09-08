/* DoseCare V2 — Ambroxol pediatric oral syrup
 * Authoritative product information cross-checked: AEMPS/CIMA Ambroxol Sandoz Care 3 mg/mL oral syrup.
 * Oral liquid only. Tablets and injectable formulations are excluded.
 */
window.DoseCareV2Database?.register({
  id: 'ambroxol',
  name: 'Ambroxol',
  genericName: 'Ambroxol hydrochloride',
  activeIngredient: 'Ambroxol hydrochloride',
  dosageForm: 'Oral Syrup',
  route: 'Oral',
  category: 'Mucolytic / Expectorant',
  dosing: { calculatorReady: true },
  formulations: [{ id: 'ambroxol-15mg-5ml', display: '15 mg/5 mL', mgPer5mL: 15, concentration: { amount: 15, unit: 'mg', volume: 5, volumeUnit: 'mL' } }],
  allowedFormulations: ['ambroxol-15mg-5ml'],
  regimens: [
    { id: 'age-2-5', type: 'fixed_dose', condition: 'Respiratory tract conditions with abnormal/viscous mucus secretion', dose: 7.5, minDose: 7.5, maxDose: 7.5, doseUnit: 'mg/dose', frequency: 3, frequencyText: 'Every 8 hours', minAgeYears: 2, maxAgeYears: 5, requiresAge: true, requiresWeight: false, allowedFormulations: ['ambroxol-15mg-5ml'], maximumDailyDose: 22.5, alternativeFrequency: 2, alternativeFrequencyText: 'Every 12 hours after 2–3 days once improved' },
    { id: 'age-6-12', type: 'fixed_dose', condition: 'Respiratory tract conditions with abnormal/viscous mucus secretion', dose: 15, minDose: 15, maxDose: 15, doseUnit: 'mg/dose', frequency: 3, frequencyText: 'Every 8 hours', minAgeYears: 6, maxAgeYears: 12, requiresAge: true, requiresWeight: false, allowedFormulations: ['ambroxol-15mg-5ml'], maximumDailyDose: 45, alternativeFrequency: 2, alternativeFrequencyText: 'Every 12 hours after 2–3 days once improved' }
  ],
  information: {
    class: 'Mucolytic agent',
    indications: ['Reduction of mucus viscosity to facilitate expectoration in catarrhal and influenza-like respiratory processes; selected product is labeled for adults and children from 2 years'],
    mechanism: 'Ambroxol reduces mucus viscosity and enhances mucociliary clearance; it increases airway secretion, promotes surfactant production and stimulates ciliary activity.',
    contraindications: ['Hypersensitivity to ambroxol hydrochloride or any component of the formulation.', 'Children under 2 years for the selected product.'],
    precautions: ['Children 2–6 years require benefit-risk assessment according to the product information.', 'In severe renal impairment or severe hepatic impairment, use only under medical supervision; dose reduction or longer intervals may be required.', 'Stop treatment and seek medical assessment if a progressive rash, blistering or mucosal lesions occur because severe cutaneous reactions have been reported.', 'The selected syrup contains sorbitol; patients with hereditary fructose intolerance should not take it.', 'The selected syrup contains sodium metabisulfite, which can cause serious allergic reactions and bronchospasm.'],
    adverseEffects: ['Diarrhea', 'Nausea', 'Vomiting', 'Abdominal pain', 'Taste disturbance', 'Dry mouth', 'Hypersensitivity reactions', 'Rash/urticaria', 'Rare serious cutaneous reactions including SJS/TEN/AGEP'],
    interactions: ['Cough suppressants/antitussives: combination may cause serious airway obstruction by suppressing the cough reflex while mucus secretion is increased.', 'Amoxicillin, cefuroxime and erythromycin: concomitant use increases antibiotic concentrations in mucus; the SmPC does not identify this as a clinically significant harmful interaction.'],
    administration: 'Administer orally using the supplied calibrated measuring device. May be taken with or without food.',
    pediatricUse: 'For the selected 15 mg/5 mL syrup: ages 2–5 years receive 2.5 mL (7.5 mg) three times daily; ages 6–12 years receive 5 mL (15 mg) two or three times daily. After 2–3 days of improvement, frequency may be reduced to twice daily. Children under 2 years are contraindicated.',
    notes: 'If the patient does not improve or worsens after 5 days, clinical reassessment is recommended by the cited product information. DoseCare uses the 15 mg/5 mL oral syrup only.'
  },
  sources: [
    { organization: 'AEMPS / CIMA', title: 'Ambroxol Sandoz Care 3 mg/mL syrup — Summary of Product Characteristics', url: 'https://cima.aemps.es/cima/dochtml/ft/62248/FT_62248.html' },
    { organization: 'Asociación Española de Pediatría', title: 'Pediamécum — Ambroxol', url: 'https://www.aeped.es/comites/cm/pediamecum/principios-activos/ambroxol' }
  ]
});
