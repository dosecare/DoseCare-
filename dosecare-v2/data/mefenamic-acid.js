/* DoseCare V2 — Mefenamic Acid oral suspension */
DoseCareV2Database.register({
  id: 'mefenamic-acid',
  name: 'Mefenamic Acid',
  genericName: 'Mefenamic acid',
  activeIngredient: 'Mefenamic acid',
  dosageForm: 'Oral suspension',
  route: 'Oral',
  category: 'Analgesic / Antipyretic / NSAID',
  formulations: [
    { id: '50mg-5mL', display: '50 mg/5 mL', concentration: { amount: 50, unit: 'mg', volume: 5, volumeUnit: 'mL' } }
  ],
  allowedFormulations: ['50mg-5mL'],
  regimens: [
    {
      id: 'pediatric-age-table-under-12',
      condition: 'Pain / pyrexia in children',
      type: 'label_age_based',
      allowedFormulations: ['50mg-5mL'],
      minAgeYears: 0.5,
      maxAgeYears: 12,
      frequencyText: 'May be repeated as necessary, up to 3 times daily',
      maxDosesPer24h: 3,
      requiresAge: true,
      requiresWeight: false,
      table: [
        { minAgeYears: 0.5, maxAgeYears: 1.999, doseMl: 5 },
        { minAgeYears: 2, maxAgeYears: 4.999, doseMl: 10 },
        { minAgeYears: 5, maxAgeYears: 8.999, doseMl: 15 },
        { minAgeYears: 9, maxAgeYears: 12, doseMl: 20 }
      ]
    },
    {
      id: 'pediatric-weight-based-over-6m',
      condition: 'Pediatric pain / pyrexia',
      type: 'mg_per_kg_per_day',
      allowedFormulations: ['50mg-5mL'],
      minAgeYears: 0.5,
      doseMin: 25,
      doseMax: 25,
      doseUnit: 'mg/kg/day',
      frequencyText: 'Divided doses; up to 3 times daily',
      requiresAge: true,
      requiresWeight: true,
      notes: 'The SmPC states 25 mg/kg/day in divided doses for infants over 6 months. The explicit age-based table above is retained as the primary calculator regimen to avoid ambiguity when both representations are available.'
    }
  ],
  information: {
    class: 'Nonsteroidal anti-inflammatory drug (NSAID)',
    indications: [
      'Pain including muscular, traumatic and dental pain',
      'Headache',
      'Pyrexia in children',
      'Primary dysmenorrhoea in older children when clinically appropriate'
    ],
    mechanism: 'Mefenamic acid is an NSAID with analgesic, anti-inflammatory and antipyretic properties. It inhibits prostaglandin synthesis through cyclooxygenase inhibition and also affects prostaglandin activity.',
    contraindications: [
      'Hypersensitivity to mefenamic acid or any excipient.',
      'Inflammatory bowel disease.',
      'History of gastrointestinal bleeding or perforation related to previous NSAID therapy.',
      'Active or recurrent peptic ulceration/haemorrhage.',
      'Severe heart failure, hepatic failure or renal failure.',
      'Previous hypersensitivity reactions such as asthma, bronchospasm, rhinitis, angioedema or urticaria to aspirin, ibuprofen or other NSAIDs.',
      'Pain after coronary artery bypass graft surgery.'
    ],
    precautions: [
      'Use the lowest effective dose for the shortest duration necessary.',
      'Avoid or use particular caution in dehydration and renal disease.',
      'Avoid concomitant use with other NSAIDs unless specifically directed.',
      'Monitor or use caution in patients with asthma, cardiovascular disease, hypertension, renal or hepatic impairment, bleeding risk, or gastrointestinal disease.',
      'Stop treatment if significant diarrhoea develops; mefenamic acid-associated diarrhoea can indicate serious colitis.',
      'Apart from treatment of Still’s disease, pediatric therapy should not continue longer than 7 days according to the SmPC.'
    ],
    adverseEffects: [
      'Diarrhoea',
      'Nausea and vomiting',
      'Abdominal pain and dyspepsia',
      'Gastrointestinal ulceration or bleeding',
      'Renal impairment',
      'Hypersensitivity reactions',
      'Serious skin reactions',
      'Hypothermia has been reported predominantly in pediatric patients'
    ],
    interactions: [
      'Warfarin and other anticoagulants: increased bleeding risk; specialist monitoring may be required.',
      'Other NSAIDs, including COX-2 selective inhibitors and aspirin: increased adverse-effect risk; avoid concomitant use unless directed.',
      'SSRIs and antiplatelet agents: increased gastrointestinal bleeding risk.',
      'ACE inhibitors/ARBs and diuretics: reduced antihypertensive effect and increased renal impairment risk.',
      'Lithium: may increase plasma lithium concentrations.',
      'Cardiac glycosides: NSAIDs may increase cardiac glycoside concentrations and worsen cardiac failure.',
      'Aminoglycosides: renal impairment may reduce aminoglycoside elimination.',
      'Zidovudine: increased risk of hematological toxicity has been reported with NSAIDs.'
    ],
    administration: [
      'For oral administration.',
      'Shake well before use.',
      'Take preferably with or after food.',
      'Do not exceed the stated dose.',
      'Doses may be repeated as necessary up to three times daily.',
      'Use an accurate oral dosing device.'
    ],
    pediatricUse: 'The referenced 50 mg/5 mL suspension is specifically labeled for children under 12 years. The SmPC provides an age-based table for infants over 6 months through 12 years and also states 25 mg/kg/day in divided doses for infants over 6 months. Safety and effectiveness for this specific suspension are not established below 6 months.',
    notes: 'The current authoritative SmPC was last updated 12 June 2025. The product contains 50 mg mefenamic acid per 5 mL and includes ethanol, propylene glycol, sodium benzoate, sorbitol and sucrose; these excipients may be clinically relevant in susceptible patients.'
  },
  sources: [
    { organization: 'electronic Medicines Compendium (emc)', title: 'Mefenamic Acid 50 mg/5 ml Suspension — Summary of Product Characteristics', url: 'https://www.medicines.org.uk/emc/product/13316/smpc' },
    { organization: 'electronic Medicines Compendium (emc)', title: 'Mefenamic Acid 50 mg/5 ml Suspension — Patient Information Leaflet', url: 'https://www.medicines.org.uk/emc/product/13316/pil' }
  ]
});
