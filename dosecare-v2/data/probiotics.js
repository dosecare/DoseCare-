/* DoseCare V2 — pediatric oral probiotics
 * Evidence source: ESPGHAN 2023 Position Paper on probiotics for pediatric GI disorders.
 * Oral powder / drops only; strain-specific dosing is used because probiotic efficacy is strain-specific.
 */
window.DoseCareV2Database?.register({
  id: 'probiotics',
  name: 'Probiotics',
  genericName: 'Probiotics',
  activeIngredient: 'Strain-specific probiotic preparations',
  dosageForm: 'Oral powder / drops',
  route: 'Oral',
  category: 'Gastrointestinal / Probiotic',
  formulations: [
    { id: 'probiotic-lgg', display: 'Lacticaseibacillus rhamnosus GG — strain-specific preparation', probioticBased: true, doseUnit: 'CFU' },
    { id: 'probiotic-s-boulardii', display: 'Saccharomyces boulardii — strain-specific preparation', probioticBased: true, doseUnit: 'mg' },
    { id: 'probiotic-l-reuteri', display: 'Limosilactobacillus reuteri DSM 17938 — strain-specific preparation', probioticBased: true, doseUnit: 'CFU' }
  ],
  regimens: [
    {
      id: 'acute-gastroenteritis-lgg',
      condition: 'Acute gastroenteritis — adjunct to rehydration',
      type: 'fixed_range',
      requiresAge: false,
      requiresWeight: false,
      doseMin: 10000000000,
      doseMax: 10000000000,
      doseUnit: 'CFU/day',
      durationDays: '5–7',
      frequencyText: 'At least 1 × 10¹⁰ CFU/day for 5–7 days',
      allowedFormulations: ['probiotic-lgg']
    },
    {
      id: 'acute-gastroenteritis-s-boulardii',
      condition: 'Acute gastroenteritis — adjunct to rehydration',
      type: 'fixed_range',
      requiresAge: false,
      requiresWeight: false,
      doseMin: 250,
      doseMax: 750,
      doseUnit: 'mg/day',
      durationDays: '5–7',
      frequencyText: '250–750 mg/day for 5–7 days',
      allowedFormulations: ['probiotic-s-boulardii']
    },
    {
      id: 'acute-gastroenteritis-l-reuteri',
      condition: 'Acute gastroenteritis — adjunct to rehydration',
      type: 'fixed_range',
      requiresAge: false,
      requiresWeight: false,
      doseMin: 100000000,
      doseMax: 400000000,
      doseUnit: 'CFU/day',
      durationDays: 5,
      frequencyText: '1 × 10⁸ to 4 × 10⁸ CFU/day for 5 days',
      allowedFormulations: ['probiotic-l-reuteri']
    },
    {
      id: 'antibiotic-associated-diarrhea-lgg',
      condition: 'Prevention of antibiotic-associated diarrhea',
      type: 'fixed_range',
      requiresAge: false,
      requiresWeight: false,
      doseMin: 5000000000,
      doseMax: null,
      doseUnit: 'CFU/day',
      frequencyText: 'At least 5 × 10⁹ CFU/day, started simultaneously with antibiotic treatment',
      allowedFormulations: ['probiotic-lgg']
    },
    {
      id: 'antibiotic-associated-diarrhea-s-boulardii',
      condition: 'Prevention of antibiotic-associated diarrhea',
      type: 'fixed_range',
      requiresAge: false,
      requiresWeight: false,
      doseMin: 5000000000,
      doseMax: null,
      doseUnit: 'CFU/day',
      frequencyText: 'At least 5 × 10⁹ CFU/day, started simultaneously with antibiotic treatment',
      allowedFormulations: ['probiotic-s-boulardii']
    }
  ],
  information: {
    class: 'Probiotic',
    mechanism: 'Strain-dependent modulation of the intestinal microbiota and host gastrointestinal environment.',
    indications: ['Selected strains may be used as adjuncts in acute gastroenteritis', 'Selected strains may be considered for prevention of antibiotic-associated diarrhea'],
    contraindications: ['Use requires clinical consideration in severely immunocompromised or critically ill patients; product-specific contraindications must also be checked.'],
    adverseEffects: ['Gastrointestinal symptoms may occur, including bloating, abdominal discomfort or flatulence.'],
    precautions: ['Probiotic effects are strain-specific; the product must contain the strain and dose supported by evidence.', 'Probiotics are adjunctive and do not replace oral rehydration therapy in acute gastroenteritis.', 'Follow the manufacturer instructions for reconstitution, storage and administration of the selected preparation.'],
    administration: 'Administer orally according to the strain-specific product instructions.',
    pediatricUse: 'ESPGHAN 2023 gives conditional recommendations for selected strains in children with acute gastroenteritis and for prevention of antibiotic-associated diarrhea. Evidence certainty varies and recommendations are strain-specific.',
    notes: 'DoseCare does not convert CFU into mL because commercial probiotic concentrations vary by strain and product. Select a strain-specific oral preparation and follow its labeled administration instructions.',
    sources: [
      { organization: 'ESPGHAN', title: 'Probiotics for the Management of Pediatric Gastrointestinal Disorders: Position Paper of the ESPGHAN Special Interest Group on Gut Microbiota and Modifications (2023)', url: 'https://www.espghan.org/knowledge-center/publications/Gastroenterology/2023-Synbiotics-in-the-Management-of-Pediatric-Gastrointestinal-Disorders0' },
      { organization: 'PubMed', title: 'Use of probiotics for management of acute gastroenteritis: a position paper by the ESPGHAN Working Group for Probiotics and Prebiotics', url: 'https://pubmed.ncbi.nlm.nih.gov/24614141/' }
    ]
  },
  sources: [
    { organization: 'ESPGHAN', title: '2023 Position Paper on Probiotics for Pediatric Gastrointestinal Disorders', url: 'https://www.espghan.org/knowledge-center/publications/Gastroenterology/2023-Synbiotics-in-the-Management-of-Pediatric-Gastrointestinal-Disorders0' }
  ]
});