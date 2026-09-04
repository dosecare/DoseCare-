/* DoseCare V2 — Oral Rehydration Salts (ORS)
 * WHO low-osmolarity ORS; volume-based rehydration, not a drug mg/kg dose.
 */
window.DoseCareV2Database?.register({
  id: 'ors',
  name: 'ORS',
  genericName: 'Oral Rehydration Salts',
  activeIngredient: 'Glucose-electrolyte oral rehydration salts',
  dosageForm: 'Powder for oral solution',
  route: 'Oral',
  category: 'Gastrointestinal / Rehydration',
  formulations: [
    {
      id: 'who-low-osmolarity-sachet',
      display: 'WHO low-osmolarity ORS sachet — reconstitute as directed on the sachet',
      volumeBased: true,
      reconstitution: 'Use the exact water volume stated on the product sachet. Do not alter the dilution.'
    }
  ],
  regimens: [
    {
      id: 'plan-a-under-2',
      type: 'volume_by_age',
      condition: 'Plan A — prevention of dehydration / ongoing diarrhoeal losses',
      minAgeMonths: 0,
      maxAgeMonths: 23.999,
      requiresAge: true,
      requiresWeight: false,
      minVolumeMl: 50,
      maxVolumeMl: 100,
      frequencyText: 'After each loose stool',
      doseUnit: 'mL after each loose stool',
      notes: 'WHO guidance: children under 2 years should receive about 50–100 mL ORS after each loose stool; give frequent small sips and continue breastfeeding.'
    },
    {
      id: 'plan-a-2-to-10',
      type: 'volume_by_age',
      condition: 'Plan A — prevention of dehydration / ongoing diarrhoeal losses',
      minAgeMonths: 24,
      maxAgeMonths: 119.999,
      requiresAge: true,
      requiresWeight: false,
      minVolumeMl: 100,
      maxVolumeMl: 200,
      frequencyText: 'After each loose stool',
      doseUnit: 'mL after each loose stool',
      notes: 'WHO guidance: children 2 years or older should receive about 100–200 mL ORS after each loose stool; give frequent small sips and continue breastfeeding.'
    },
    {
      id: 'plan-b-some-dehydration',
      type: 'volume_per_kg',
      condition: 'Plan B — some dehydration',
      minAgeMonths: 0,
      requiresAge: true,
      requiresWeight: true,
      volumeMlPerKg: 75,
      durationHours: 4,
      frequencyText: '75 mL/kg over the first 4 hours',
      doseUnit: 'mL/kg',
      notes: 'WHO Plan B: calculate 75 mL × body weight (kg) and give over the first 4 hours. Reassess after 4 hours and select the next plan according to hydration status. If the child wants more ORS, give more.'
    }
  ],
  information: {
    class: 'Oral rehydration solution',
    indications: [
      'Prevention and treatment of dehydration due to acute diarrhoea',
      'Replacement of ongoing gastrointestinal fluid losses'
    ],
    mechanism: 'ORS uses coupled glucose and sodium transport in the small intestine to promote absorption of sodium and water, replacing fluid and electrolytes lost through diarrhoea.',
    precautions: [
      'Use a low-osmolarity ORS product and prepare it with exactly the water volume specified by the product sachet.',
      'Give frequent small sips; if vomiting occurs, wait about 10 minutes and restart more slowly.',
      'Continue breastfeeding and appropriate feeding during rehydration.',
      'Reassess the child after the Plan B 4-hour rehydration period.',
      'Severe dehydration, shock, altered consciousness, inability to drink, or other danger signs require urgent clinical management and may require IV or nasogastric therapy; do not treat these cases as routine home ORS dosing.',
      'Children with severe acute malnutrition require a specialized rehydration protocol under clinical supervision.'
    ],
    adverseEffects: [
      'Vomiting may occur if large amounts are given too quickly',
      'Incorrect dilution can cause electrolyte disturbances'
    ],
    interactions: [],
    notes: 'DoseCare models ORS as a volume-based rehydration therapy rather than a mg/kg medication dose. The calculator deliberately does not convert ORS into mg or mL from a drug concentration. For Plan B, 75 mL/kg is given over 4 hours and hydration status must be reassessed afterward. Plan C/severe dehydration is not presented as a routine oral regimen.',
    monitoring: [
      'Hydration status and clinical response',
      'Ability to drink and ongoing stool/vomit losses',
      'Urine output and general condition when clinically appropriate'
    ]
  },
  sources: [
    {
      organization: 'WHO',
      title: 'Oral rehydration salts — new low-osmolarity formulation',
      url: 'https://www.who.int/publications/i/item/WHO-FCH-CAH-06.1'
    },
    {
      organization: 'WHO',
      title: 'Guidelines for treating children and adults with some dehydration — Plan B',
      url: 'https://iris.who.int/bitstream/handle/10665/43162/9241562927_eng.pdf'
    },
    {
      organization: 'MSF Medical Guidelines',
      title: 'Oral Rehydration Salts — Plan A and Plan B',
      url: 'https://medicalguidelines.msf.org/ar/node/487'
    }
  ]
});
