/* DoseCare V2 — Iron (ferrous sulfate) pediatric oral solution. */
window.DoseCareV2Database.register({
  id: 'iron',
  name: 'Iron',
  genericName: 'Ferrous sulfate (elemental iron)',
  brandNames: ['FE-VITE Iron Oral Solution'],
  dosageForm: 'Oral solution',
  route: 'Oral',
  formulations: [
    {
      id: 'fe-vite-15mg-elemental-iron-per-ml',
      dosageForm: 'Oral solution',
      concentration: { amount: 15, unit: 'mg elemental iron', volume: 1, volumeUnit: 'mL' },
      display: '75 mg ferrous sulfate (15 mg elemental iron) / 1 mL',
      mgPerMl: 15,
      saltStrengthMgPerMl: 75,
      elementalIronMgPerMl: 15,
      dosingBasis: 'elemental_iron'
    }
  ],
  regimens: [
    {
      id: 'iron-prevention-1-2-mg-kg-day',
      type: 'mg_per_kg_per_day',
      condition: 'Prevention of iron deficiency',
      minAgeMonths: 1,
      dose: 1,
      maxDose: 2,
      unit: 'mg elemental iron/kg/day',
      frequency: 1,
      frequencyText: 'Once daily',
      maximumDailyDose: 30,
      allowedFormulations: ['fe-vite-15mg-elemental-iron-per-ml']
    },
    {
      id: 'iron-treatment-young-children-3-mg-kg-day',
      type: 'mg_per_kg_per_day',
      condition: 'Initial treatment of iron deficiency or iron deficiency anaemia in young children',
      minAgeMonths: 12,
      maxAgeYears: 10.999,
      dose: 3,
      unit: 'mg elemental iron/kg/day',
      frequency: 1,
      frequencyText: 'Once daily',
      allowedFormulations: ['fe-vite-15mg-elemental-iron-per-ml']
    },
    {
      id: 'iron-treatment-adolescent-65-mg-daily',
      type: 'fixed_dose',
      condition: 'Initial treatment of iron deficiency or iron deficiency anaemia in adolescents',
      minAgeYears: 11,
      dose: 65,
      unit: 'mg elemental iron/day',
      frequency: 1,
      frequencyText: 'Once daily',
      allowedFormulations: ['fe-vite-15mg-elemental-iron-per-ml']
    }
  ],
  information: {
    mechanism: 'Ferrous iron provides elemental iron required for haemoglobin synthesis and replenishment of iron stores.',
    indications: 'Prevention of iron deficiency and clinician-directed treatment of iron deficiency or iron deficiency anaemia.',
    contraindications: [
      'Do not use for routine treatment without establishing the diagnosis and cause of iron deficiency when clinically indicated.',
      'Avoid iron therapy in patients with iron overload disorders unless specifically directed by a clinician.'
    ],
    precautions: [
      'Dose calculations are based on elemental iron, not the ferrous sulfate salt mass.',
      'Accidental iron overdose can be fatal in young children; keep iron products securely out of reach.',
      'Oral iron may cause black stools, constipation, gastrointestinal upset, and dental staining.',
      'Oral iron is best administered on an empty stomach or with water when tolerated; dairy, coffee, tea, and many foods can reduce absorption.',
      'Treatment dosing should be used only when iron deficiency or iron deficiency anaemia has been clinically assessed; the underlying cause should also be addressed.'
    ],
    adverseEffects: [
      'Black or dark stools',
      'Constipation',
      'Nausea or gastrointestinal upset',
      'Abdominal discomfort',
      'Dental staining with liquid iron'
    ],
    interactions: [
      'Calcium-containing foods or products, dairy, coffee, tea, and some foods can reduce oral iron absorption when administered together.',
      'Separate iron from interacting medicines when required according to the specific medicine product information.'
    ],
    administration: 'Measure the oral solution accurately with an appropriate metric oral syringe or measuring device. Give on an empty stomach or with water when tolerated; if gastrointestinal intolerance occurs, administration with food may be considered, recognizing that absorption can decrease.',
    pediatricUse: 'The 2026 AAP clinical report recommends ferrous sulfate providing 3 mg/kg elemental iron once daily for initial treatment in young children and 65 mg elemental iron once daily for adolescents. Prevention dosing remains separately represented and should be individualized to age, feeding method, prematurity, and clinical risk.',
    maximumDose: 'No universal treatment maximum is assigned in this record; dosing follows the age-specific AAP regimen and should be clinically supervised.'
  },
  sources: [
    {
      title: 'DailyMed — FE-VITE IRON ORAL SOLUTION',
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=73d1f079-d8eb-44f4-b33d-05fb25b80c8f'
    },
    {
      title: 'American Academy of Pediatrics — 2026 Clinical Report: Prevention, Screening, Diagnosis, and Treatment of Iron Deficiency and Iron Deficiency Anemia',
      url: 'https://publications.aap.org/pediatrics/article/doi/10.1542/peds.2026-077414/207901/Prevention-Screening-Diagnosis-and-Treatment-of'
    },
    {
      title: 'Royal Children’s Hospital Melbourne — Iron deficiency clinical guideline',
      url: 'https://www.rch.org.au/clinicalguide/guideline_index/iron_deficiency/'
    },
    {
      title: 'Royal Children’s Hospital Melbourne — Iron poisoning clinical guideline',
      url: 'https://www.rch.org.au/clinicalguide/guideline_index/Iron_poisoning/'
    }
  ]
});
