/* DoseCare V2 — Albendazole pediatric oral suspension */
window.DoseCareV2Database?.register({
  id: 'albendazole',
  name: 'Albendazole',
  genericName: 'Albendazole',
  active: true,
  dosageForm: 'Oral suspension',
  route: 'Oral',
  category: 'Anthelmintic',
  formulations: [
    {
      id: '200mg-per-5ml',
      display: '200 mg/5 mL (40 mg/mL)',
      concentration: { amount: 200, volume: 5, unit: 'mg/5 mL' }
    }
  ],
  regimens: [
    {
      id: 'deworming-12-to-23-months',
      type: 'fixed_dose',
      condition: 'Preventive deworming for soil-transmitted helminths',
      minDose: 200,
      maxDose: 200,
      doseUnit: 'mg/dose',
      frequency: 1,
      frequencyText: 'Single dose',
      minAgeMonths: 12,
      maxAgeMonths: 23,
      requiresAge: true,
      requiresWeight: false,
      allowedFormulations: ['200mg-per-5ml'],
      note: 'WHO recommends a half-dose of albendazole (200 mg) for children 12–23 months in preventive deworming programmes where indicated.'
    },
    {
      id: 'deworming-24-months-and-older',
      type: 'fixed_dose',
      condition: 'Preventive deworming for soil-transmitted helminths',
      minDose: 400,
      maxDose: 400,
      doseUnit: 'mg/dose',
      frequency: 1,
      frequencyText: 'Single dose',
      minAgeMonths: 24,
      requiresAge: true,
      requiresWeight: false,
      allowedFormulations: ['200mg-per-5ml'],
      note: 'WHO recommends 400 mg single-dose albendazole for children 24 months and older in preventive deworming programmes where indicated.'
    }
  ],
  information: {
    class: 'Benzimidazole anthelmintic',
    indications: [
      'Treatment/prevention of soil-transmitted helminth infections in children when albendazole is indicated',
      'Treatment of selected intestinal helminth infections'
    ],
    mechanism: 'Inhibits parasite microtubule polymerization by binding beta-tubulin, impairing parasite cellular processes and energy metabolism.',
    precautions: [
      'The dosing regimens in this record are for preventive deworming/soil-transmitted helminths; other infections such as neurocysticercosis and hydatid disease require different specialist regimens.',
      'Do not use in children younger than 12 months for routine deworming unless specifically directed in a clinical setting.',
      'Use a calibrated oral syringe or the supplied measuring device; shake the suspension well before administration.',
      'Check the product concentration because albendazole oral suspensions may have different strengths.',
      'For prolonged/high-dose treatment, hepatic monitoring and blood-count monitoring may be required.'
    ],
    adverseEffects: [
      'Abdominal pain',
      'Nausea',
      'Vomiting',
      'Headache',
      'Dizziness'
    ],
    notes: 'This DoseCare record intentionally encodes the common single-dose pediatric deworming regimen rather than complex specialist regimens for cysticercosis or hydatid disease.'
  },
  sources: [
    {
      organization: 'World Health Organization',
      title: 'Deworming in children',
      url: 'https://www.who.int/tools/elena/interventions/deworming'
    },
    {
      organization: 'Rwanda Food and Drugs Authority',
      title: 'Albendazole Suspension 200 mg/5 mL (ANTHEL) — Summary of Product Characteristics',
      url: 'https://rwandafda.gov.rw/wp-content/uploads/2024/02/Anthel_suspension_-_Albendazole_200mg_per_5ml_-_SmPC.pdf'
    },
    {
      organization: 'Thai FDA',
      title: 'ALBEN / Albendazole 200 mg/5 mL oral suspension product registration',
      url: 'https://ndi.fda.moph.go.th/drug_detail/index/?rcno=4700231&rctype=1A&register=MUEgMjMxLzQ3'
    }
  ]
});
