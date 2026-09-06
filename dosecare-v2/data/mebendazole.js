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
    precautions: [
      'The referenced Vermox oral suspension is for adults and children over 2 years; no pediatric dosing recommendation is provided here for children under 2 years.',
      'Shake well before use.',
      'Rare hepatic and hematologic adverse effects have been reported; use cautiously where clinically appropriate.',
      'Avoid concomitant metronidazole because of a potential association with serious skin reactions described in the product information.'
    ],
    pediatricUse: 'The Vermox 100 mg/5 mL oral suspension SmPC gives a 100 mg single dose for enterobiasis and 100 mg twice daily for 3 days for ascariasis, trichuriasis, ancylostomiasis, necatoriasis and mixed infections in children over 2 years.'
  },
  sources: [
    {
      title: 'electronic Medicines Compendium — Vermox 100 mg/5 mL oral suspension SmPC',
      url: 'https://www.medicines.org.uk/emc/product/976/smpc'
    },
    {
      title: 'electronic Medicines Compendium — Vermox 100 mg/5 mL oral suspension PIL',
      url: 'https://www.medicines.org.uk/emc/product/976/pil'
    }
  ]
});
