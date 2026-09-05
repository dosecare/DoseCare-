/* DoseCare V2 — pediatric oral probiotics
 * Product-specific implementation: Culturelle Kids Daily Probiotic Packets.
 * Clinical targets are based on ESPGHAN; administration is expressed as packets,
 * using the labeled 5 billion CFU per packet strength.
 */
window.DoseCareV2Database?.register({
  id: 'probiotics', name: 'Probiotics', genericName: 'Probiotics',
  activeIngredient: 'Lactobacillus rhamnosus GG (LGG), ATCC 53103',
  dosageForm: 'Oral powder packet', route: 'Oral', category: 'Gastrointestinal / Probiotic',
  formulations: [{ id: 'culturelle-kids-lgg-5b-packet', display: 'Culturelle Kids Daily Probiotic Packet — 5 billion CFU LGG per packet', probioticBased: true, sachetBased: true, sachetContent: { lggCfu: 5000000000, unit: 'CFU' }, administrationUnit: 'packet', administrationLabel: 'packet', doseUnit: 'CFU/packet', minimumAgeYears: 1, productSource: 'Culturelle Kids Daily Probiotic Packets (NPN 80047737)' }],
  regimens: [
    { id: 'acute-gastroenteritis-lgg-culturelle', condition: 'Acute gastroenteritis — adjunct to rehydration', type: 'probiotic_product', requiresAge: true, requiresWeight: false, minAgeYears: 1, doseMin: 10000000000, doseMax: 10000000000, doseUnit: 'CFU/day', administrationMin: 2, administrationMax: 2, administrationUnit: 'packet/day', durationDays: '5–7', frequencyText: '2 packets once daily to provide 10 billion CFU/day', allowedFormulations: ['culturelle-kids-lgg-5b-packet'] },
    { id: 'antibiotic-associated-diarrhea-lgg-culturelle', condition: 'Prevention of antibiotic-associated diarrhea', type: 'probiotic_product', requiresAge: true, requiresWeight: false, minAgeYears: 1, doseMin: 5000000000, doseMax: 5000000000, doseUnit: 'CFU/day', administrationMin: 1, administrationMax: 1, administrationUnit: 'packet/day', durationDays: null, frequencyText: '1 packet once daily, started simultaneously with antibiotic treatment', allowedFormulations: ['culturelle-kids-lgg-5b-packet'] }
  ],
  information: {
    class: 'Probiotic', mechanism: 'Strain-dependent modulation of the intestinal microbiota and host gastrointestinal environment.',
    indications: ['Selected strains may be used as adjuncts in acute gastroenteritis', 'Selected strains may be considered for prevention of antibiotic-associated diarrhea'],
    contraindications: ['Do not use in an immune-compromised child unless specifically advised by a healthcare professional; check the product label for contraindications.'],
    adverseEffects: ['Minor gastrointestinal symptoms such as bloating or gas may occur.'],
    precautions: ['Probiotic effects are strain-specific.', 'Probiotics are adjunctive and do not replace oral rehydration therapy in acute gastroenteritis.', 'The selected product is labeled for children age 1 year and older.', 'Follow product storage and administration instructions.'],
    administration: 'Administer the packet orally according to the product instructions; it may be mixed with suitable cool food or liquid. Do not use hot food or liquid.',
    pediatricUse: 'Culturelle Kids Daily Probiotic Packets provide 5 billion CFU of Lactobacillus rhamnosus GG (ATCC 53103) per 1.5 g packet and are labeled for children age 1 year and older.',
    notes: 'DoseCare uses a product-specific packet strength so the result is actionable. It does not convert CFU to mL. A different probiotic product must be verified separately.',
    sources: [
      { organization: 'Culturelle', title: 'Culturelle Kids Daily Probiotic Packets — 5 billion CFU LGG per packet; ages 1+', url: 'https://culturelleprobiotic.ca/products/culturelle-kids-daily-probiotic-packets' },
      { organization: 'ESPGHAN', title: '2023 Position Paper on Probiotics for Pediatric Gastrointestinal Disorders', url: 'https://www.espghan.org/knowledge-center/publications/Gastroenterology/2023-Synbiotics-in-the-Management-of-Pediatric-Gastrointestinal-Disorders0' },
      { organization: 'PubMed', title: 'Use of probiotics for management of acute gastroenteritis: a position paper by the ESPGHAN Working Group for Probiotics and Prebiotics', url: 'https://pubmed.ncbi.nlm.nih.gov/24614141/' }
    ]
  },
  sources: [
    { organization: 'Culturelle', title: 'Culturelle Kids Daily Probiotic Packets — 5 billion CFU LGG per packet; ages 1+', url: 'https://culturelleprobiotic.ca/products/culturelle-kids-daily-probiotic-packets' },
    { organization: 'ESPGHAN', title: '2023 Position Paper on Probiotics for Pediatric Gastrointestinal Disorders', url: 'https://www.espghan.org/knowledge-center/publications/Gastroenterology/2023-Synbiotics-in-the-Management-of-Pediatric-Gastrointestinal-Disorders0' }
  ]
});