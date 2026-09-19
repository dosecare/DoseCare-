/* DoseCare V2 — Ferrous sulfate (oral liquid)
 * Doses are expressed as ELEMENTAL IRON, not the ferrous-sulfate salt mass.
 * Active formulation: ferrous sulfate 30 mg/mL, equivalent to 6 mg elemental iron/mL.
 */
window.DoseCareV2Database?.register({
  id: 'ferrous-sulfate',
  name: 'Ferrous sulfate',
  genericName: 'Ferrous sulfate',
  active: true,
  dosageForm: 'Oral solution',
  route: 'Oral',
  category: 'Iron supplement',
  formulations: [
    {
      id: '30mg-iron-sulfate-per-ml',
      display: 'Ferrous sulfate 30 mg/mL (6 mg elemental iron/mL)',
      concentration: { amount: 6, volume: 1, unit: 'mg elemental iron/mL' },
      saltStrength: '30 mg ferrous sulfate/mL',
      elementalIronMgPerMl: 6
    }
  ],
  regimens: [
    {
      id: 'iron-deficiency-treatment',
      type: 'mg_per_kg_per_day',
      condition: 'Iron deficiency / iron deficiency anemia',
      minDose: 3,
      maxDose: 6,
      doseUnit: 'mg elemental iron/kg/day',
      frequency: 1,
      frequencyText: 'Once daily; the daily dose may be divided into 1–3 doses according to clinical practice',
      minAgeMonths: 1,
      requiresAge: true,
      requiresWeight: true,
      allowedFormulations: ['30mg-iron-sulfate-per-ml'],
      note: 'Dose is based on elemental iron. The Royal Children’s Hospital guideline recommends 3–6 mg/kg/day for treatment of iron deficiency and iron deficiency anemia; higher doses may be considered in severe anemia.'
    },
    {
      id: 'iron-deficiency-prevention',
      type: 'mg_per_kg_per_day',
      condition: 'Prevention of iron deficiency',
      minDose: 1,
      maxDose: 2,
      doseUnit: 'mg elemental iron/kg/day',
      frequency: 1,
      frequencyText: 'Once daily',
      maximumDailyDose: 30,
      minAgeMonths: 1,
      requiresAge: true,
      requiresWeight: true,
      allowedFormulations: ['30mg-iron-sulfate-per-ml'],
      note: 'Preventive dose is based on elemental iron and should not exceed 30 mg elemental iron/day.'
    }
  ],
  information: {
    class: 'Iron salt',
    indications: [
      'Treatment of iron deficiency and iron deficiency anemia',
      'Prevention of iron deficiency when supplementation is indicated'
    ],
    mechanism: 'Provides elemental iron required for hemoglobin synthesis and replenishment of body iron stores.',
    precautions: [
      'Dose calculations are based on elemental iron, not the mass of ferrous sulfate salt.',
      'Iron-containing products can cause serious toxicity in children if overdosed; keep securely out of reach.',
      'May cause gastrointestinal upset, constipation, diarrhea, dark stools, and dental staining.',
      'Investigate the cause of iron deficiency and monitor response to therapy.',
      'Neonatal dosing requires local neonatal guidance; this calculator regimen starts at 1 month of age.'
    ],
    adverseEffects: [
      'Nausea',
      'Abdominal discomfort',
      'Constipation',
      'Diarrhea',
      'Dark stools',
      'Dental staining'
    ],
    notes: 'Ferrous sulfate oral liquid may stain teeth; use a straw when appropriate and brush/rinse after administration. Absorption is improved with vitamin C and reduced by milk and some other dietary inhibitors.'
  },
  sources: [
    {
      organization: 'Royal Children’s Hospital Melbourne',
      title: 'Clinical Practice Guidelines: Iron deficiency',
      url: 'https://www.rch.org.au/clinicalguide/guideline_index/Iron_deficiency/'
    },
    {
      organization: 'Royal Children’s Hospital Melbourne',
      title: 'Clinical Practice Guidelines: Iron poisoning',
      url: 'https://www.rch.org.au/clinicalguide/guideline_index/Iron_poisoning/'
    }
  ]
});
