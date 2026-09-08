/* DoseCare V2 — Mebendazole pediatric oral suspension. */
window.DoseCareV2Database.register({
  id: 'mebendazole',
  name: 'Mebendazole',
  genericName: 'Mebendazole',
  brandNames: ['Vermox 100 mg/5 mL Oral Suspension'],
  dosageForm: 'Oral suspension',
  route: 'Oral',
  category: 'Anthelmintic',
  formulations: [
    {
      id: 'mebendazole-100mg-per-5ml',
      dosageForm: 'Oral suspension',
      concentration: { amount: 100, unit: 'mg', volume: 5, volumeUnit: 'mL' },
      display: '100 mg/5 mL',
      mgPerMl: 20
    }
  ],
  regimens: [
    {
      id: 'mebendazole-enterobiasis-over-2-years',
      condition: 'Enterobiasis (pinworm/threadworm)',
      type: 'fixed_dose',
      minAgeYears: 2,
      dose: 100,
      unit: 'mg/dose',
      frequency: 1,
      frequencyText: 'Single dose; a second dose after 2 weeks may be advised if reinfection is suspected',
      allowedFormulations: ['mebendazole-100mg-per-5ml']
    },
    {
      id: 'mebendazole-other-worms-over-2-years',
      condition: 'Ascariasis, trichuriasis, hookworm, necatoriasis or mixed intestinal worm infections',
      type: 'fixed_dose',
      minAgeYears: 2,
      dose: 100,
      unit: 'mg/dose',
      frequency: 2,
      frequencyText: 'Twice daily for 3 consecutive days',
      allowedFormulations: ['mebendazole-100mg-per-5ml']
    }
  ],
  information: {
    mechanism: 'Mebendazole inhibits parasite microtubule formation and interferes with glucose utilization.',
    indications: 'Treatment of common gastrointestinal helminth infections including pinworm, whipworm, roundworm and hookworm infections.',
    contraindications: [
      'Hypersensitivity to mebendazole or any component of the product.',
      'Pregnancy is contraindicated in the cited Vermox suspension product information.'
    ],
    precautions: [
      'The referenced Vermox oral suspension is intended for adults and children over 2 years; no pediatric dosing recommendation is provided here for children under 2 years.',
      'Because of limited safety data, the cited product should not be used in children under 1 year; use in children 1–2 years requires a careful benefit-risk assessment and is not automatically calculated by DoseCare.',
      'Rare hepatic dysfunction, hepatitis, neutropenia and other serious hematologic effects have been reported.',
      'Avoid concomitant metronidazole because of a potential association with Stevens-Johnson syndrome/toxic epidermal necrolysis.',
      'The suspension contains sucrose and should be considered in patients with hereditary fructose intolerance, glucose-galactose malabsorption or sucrase-isomaltase insufficiency.'
    ],
    adverseEffects: [
      'Abdominal pain',
      'Diarrhea',
      'Flatulence',
      'Nausea and vomiting',
      'Rash',
      'Rare hepatic or hematologic abnormalities'
    ],
    interactions: [
      'Metronidazole: concomitant use should be avoided because of the reported association with serious skin reactions.',
      'Cimetidine may increase mebendazole exposure; clinically relevant interaction is mainly a consideration with prolonged/high-dose therapy.'
    ],
    administration: 'For the oral suspension, shake well before use and measure the prescribed dose accurately. No fasting or purging is required for the cited regimen.',
    pediatricUse: 'The Vermox 100 mg/5 mL oral suspension SmPC gives a 100 mg single dose for enterobiasis and 100 mg twice daily for 3 days for ascariasis, trichuriasis, ancylostomiasis, necatoriasis and mixed infections in children over 2 years.',
    notes: 'DoseCare models only the cited oral suspension. The US DailyMed mebendazole product is a chewable tablet and is therefore not used as the formulation source for this calculator.'
  },
  sources: [
    {
      title: 'electronic Medicines Compendium — Vermox 100 mg/5 mL oral suspension SmPC',
      url: 'https://www.medicines.org.uk/emc/product/976/smpc'
    },
    {
      title: 'DailyMed — Mebendazole chewable tablet prescribing information (interaction and safety cross-check)',
      url: 'https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=a8c46363-f739-4f6e-bca8-1ce5e8d3f78d'
    }
  ]
});
