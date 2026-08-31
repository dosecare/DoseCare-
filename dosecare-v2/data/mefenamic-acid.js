window.DoseCareV2Database?.register({
  id: 'mefenamic-acid',
  name: 'Mefenamic Acid',
  genericName: 'Mefenamic acid',
  dosageForm: 'Oral Suspension',
  category: 'Analgesic / Antipyretic / NSAID',
  formulations: [{ concentration: { amount: 50, unit: 'mg', volume: 5, volumeUnit: 'mL' }, display: '50 mg/5 mL' }],
  regimens: [
    { id: 'pain-fever-6m-2y', condition: 'Pain / fever', type: 'label_age_based', minAgeYears: 0.5, maxAgeYears: 1.999, doseMin: 50, doseMax: 50, doseUnit: 'mg/dose', volumeMin: 5, volumeMax: 5, volumeUnit: 'mL/dose', frequencyText: 'Up to 3 times daily as needed', maxDosesPer24h: 3, requiresAge: true, requiresWeight: false },
    { id: 'pain-fever-2-5y', condition: 'Pain / fever', type: 'label_age_based', minAgeYears: 2, maxAgeYears: 4.999, doseMin: 100, doseMax: 100, doseUnit: 'mg/dose', volumeMin: 10, volumeMax: 10, volumeUnit: 'mL/dose', frequencyText: 'Up to 3 times daily as needed', maxDosesPer24h: 3, requiresAge: true, requiresWeight: false },
    { id: 'pain-fever-5-9y', condition: 'Pain / fever', type: 'label_age_based', minAgeYears: 5, maxAgeYears: 8.999, doseMin: 150, doseMax: 150, doseUnit: 'mg/dose', volumeMin: 15, volumeMax: 15, volumeUnit: 'mL/dose', frequencyText: 'Up to 3 times daily as needed', maxDosesPer24h: 3, requiresAge: true, requiresWeight: false },
    { id: 'pain-fever-9-12y', condition: 'Pain / fever', type: 'label_age_based', minAgeYears: 9, maxAgeYears: 12, doseMin: 200, doseMax: 200, doseUnit: 'mg/dose', volumeMin: 20, volumeMax: 20, volumeUnit: 'mL/dose', frequencyText: 'Up to 3 times daily as needed', maxDosesPer24h: 3, requiresAge: true, requiresWeight: false }
  ],
  information: {
    mechanismOfAction: 'Non-steroidal anti-inflammatory drug (NSAID) with analgesic, anti-inflammatory and antipyretic effects; inhibits prostaglandin activity.',
    indications: ['Pain including muscular, traumatic and dental pain', 'Headache', 'Pyrexia in children', 'Inflammatory pain conditions when clinically indicated'],
    adverseEffects: ['Diarrhea', 'Nausea and vomiting', 'Abdominal pain and dyspepsia', 'Gastrointestinal ulceration or bleeding', 'Renal impairment', 'Hypersensitivity reactions', 'Serious skin reactions (rare)'],
    warningsPrecautions: ['Use the lowest effective dose for the shortest duration necessary.', 'Avoid in children with dehydration or significant renal disease unless specifically clinically indicated.', 'Do not combine with other NSAIDs unless specifically directed by a clinician.', 'Contraindicated with previous NSAID-associated gastrointestinal bleeding/perforation, active or recurrent peptic ulcer disease, inflammatory bowel disease, severe renal/hepatic/cardiac failure, or NSAID hypersensitivity.', 'For children, therapy should generally not continue longer than 7 days except for Still’s disease according to the product information.', 'Take preferably with or after food.'],
    sources: [
      { organization: 'electronic Medicines Compendium (emc)', title: 'Mefenamic Acid 50 mg/5 ml Suspension — Summary of Product Characteristics', url: 'https://www.medicines.org.uk/emc/product/13316/smpc' },
      { organization: 'electronic Medicines Compendium (emc)', title: 'Mefenamic Acid 50 mg/5 ml Suspension — Patient Information Leaflet', url: 'https://www.medicines.org.uk/emc/product/13316/pil' },
      { organization: 'electronic Medicines Compendium (emc)', title: 'Mefenamic Acid 500 mg film-coated tablets — Summary of Product Characteristics', url: 'https://www.medicines.org.uk/emc/product/12503/smpc' }
    ]
  },
  sources: [
    { organization: 'electronic Medicines Compendium (emc)', title: 'Mefenamic Acid 50 mg/5 ml Suspension — Summary of Product Characteristics', url: 'https://www.medicines.org.uk/emc/product/13316/smpc' },
    { organization: 'electronic Medicines Compendium (emc)', title: 'Mefenamic Acid 50 mg/5 ml Suspension — Patient Information Leaflet', url: 'https://www.medicines.org.uk/emc/product/13316/pil' },
    { organization: 'electronic Medicines Compendium (emc)', title: 'Mefenamic Acid 500 mg film-coated tablets — Summary of Product Characteristics', url: 'https://www.medicines.org.uk/emc/product/12503/smpc' }
  ]
});
