/* DoseCare V2 — Mefenamic Acid oral suspension */
window.DoseCareV2Database?.register({
  id: 'mefenamic-acid',
  name: 'Mefenamic Acid',
  genericName: 'Mefenamic acid',
  activeIngredient: 'Mefenamic acid',
  dosageForm: 'Oral Suspension',
  route: 'Oral',
  category: 'Analgesic / Antipyretic / NSAID',
  formulations: [
    { id: '50mg-5ml', display: '50 mg/5 mL', concentration: { amount: 50, unit: 'mg', volume: 5, volumeUnit: 'mL' } }
  ],
  regimens: [
    { id: 'pain-fever-6m-2y', condition: 'Pain / fever', type: 'label_age_based', minAgeYears: 0.5, maxAgeYears: 1.999, doseMin: 50, doseMax: 50, doseUnit: 'mg/dose', volumeMin: 5, volumeMax: 5, volumeUnit: 'mL/dose', frequencyText: 'Up to 3 times daily as needed', maxDosesPer24h: 3, requiresAge: true, requiresWeight: false },
    { id: 'pain-fever-2-5y', condition: 'Pain / fever', type: 'label_age_based', minAgeYears: 2, maxAgeYears: 4.999, doseMin: 100, doseMax: 100, doseUnit: 'mg/dose', volumeMin: 10, volumeMax: 10, volumeUnit: 'mL/dose', frequencyText: 'Up to 3 times daily as needed', maxDosesPer24h: 3, requiresAge: true, requiresWeight: false },
    { id: 'pain-fever-5-9y', condition: 'Pain / fever', type: 'label_age_based', minAgeYears: 5, maxAgeYears: 8.999, doseMin: 150, doseMax: 150, doseUnit: 'mg/dose', volumeMin: 15, volumeMax: 15, volumeUnit: 'mL/dose', frequencyText: 'Up to 3 times daily as needed', maxDosesPer24h: 3, requiresAge: true, requiresWeight: false },
    { id: 'pain-fever-9-12y', condition: 'Pain / fever', type: 'label_age_based', minAgeYears: 9, maxAgeYears: 12, doseMin: 200, doseMax: 200, doseUnit: 'mg/dose', volumeMin: 20, volumeMax: 20, volumeUnit: 'mL/dose', frequencyText: 'Up to 3 times daily as needed', maxDosesPer24h: 3, requiresAge: true, requiresWeight: false }
  ],
  information: {
    class: 'Nonsteroidal anti-inflammatory drug (NSAID)',
    mechanismOfAction: 'NSAID with analgesic, anti-inflammatory and antipyretic effects; the product information states that it inhibits prostaglandin activity.',
    indications: ['Pain including muscular, traumatic and dental pain', 'Headache', 'Pyrexia in children', 'Primary dysmenorrhoea in older children when clinically appropriate'],
    adverseEffects: ['Diarrhea', 'Nausea and vomiting', 'Abdominal pain and dyspepsia', 'Gastrointestinal ulceration or bleeding', 'Renal impairment', 'Hypersensitivity reactions', 'Serious skin reactions'],
    warningsPrecautions: ['Use the lowest effective dose for the shortest duration necessary.', 'Avoid in children with dehydration or significant renal disease unless clinically indicated.', 'Do not combine with other NSAIDs unless specifically directed.', 'Contraindicated with relevant NSAID hypersensitivity and significant gastrointestinal, renal, hepatic, or cardiac contraindications listed in the product information.', 'Apart from treatment of Still’s disease, pediatric therapy should not continue longer than 7 days according to the product information.', 'Take preferably with or after food.'],
    notes: 'The referenced 50 mg/5 mL oral suspension is labeled for children under 12 years using age-based doses, with doses repeatable up to three times daily as necessary. The same SmPC also states a 25 mg/kg/day divided-dose regimen for infants over 6 months; this DoseCare entry currently uses the explicit age-based table rather than mixing the two representations.'
  },
  sources: [
    { organization: 'electronic Medicines Compendium (emc)', title: 'Mefenamic Acid 50 mg/5 ml Suspension — Summary of Product Characteristics', url: 'https://www.medicines.org.uk/emc/product/13316/smpc' },
    { organization: 'electronic Medicines Compendium (emc)', title: 'Mefenamic Acid 50 mg/5 ml Suspension — Patient Information Leaflet', url: 'https://www.medicines.org.uk/emc/product/13316/pil' }
  ]
});
