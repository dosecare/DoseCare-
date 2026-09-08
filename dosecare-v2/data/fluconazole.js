/* DoseCare V2 — Fluconazole pediatric oral suspension.
 * Pediatric dosing and product details cross-checked against current DailyMed labeling.
 */
window.DoseCareV2Database.register({
  id: 'fluconazole',
  name: 'Fluconazole',
  genericName: 'Fluconazole',
  brandNames: ['DIFLUCAN', 'Fluconazole for Oral Suspension USP'],
  dosageForm: 'Oral suspension',
  route: 'Oral',
  category: 'Triazole antifungal',
  dosing: { calculatorReady: true },
  formulations: [
    {
      id: 'fluconazole-10mg-per-ml',
      dosageForm: 'Oral suspension',
      concentration: { amount: 10, unit: 'mg', volume: 1, volumeUnit: 'mL' },
      display: '10 mg/mL (50 mg/5 mL)',
      mgPerMl: 10
    },
    {
      id: 'fluconazole-40mg-per-ml',
      dosageForm: 'Oral suspension',
      concentration: { amount: 40, unit: 'mg', volume: 1, volumeUnit: 'mL' },
      display: '40 mg/mL (200 mg/5 mL)',
      mgPerMl: 40
    }
  ],
  regimens: [
    {
      id: 'fluconazole-oropharyngeal-loading',
      type: 'mg_per_kg_per_dose',
      condition: 'Oropharyngeal candidiasis — loading dose, day 1',
      minAgeMonths: 6,
      dose: 6,
      unit: 'mg/kg/dose',
      frequency: 1,
      frequencyText: 'Once on day 1',
      requiresAge: true,
      requiresWeight: true,
      allowedFormulations: ['fluconazole-10mg-per-ml', 'fluconazole-40mg-per-ml']
    },
    {
      id: 'fluconazole-oropharyngeal-maintenance',
      type: 'mg_per_kg_per_day',
      condition: 'Oropharyngeal candidiasis — maintenance',
      minAgeMonths: 6,
      dose: 3,
      unit: 'mg/kg/day',
      frequency: 1,
      frequencyText: 'Once daily; treatment for at least 2 weeks',
      requiresAge: true,
      requiresWeight: true,
      allowedFormulations: ['fluconazole-10mg-per-ml', 'fluconazole-40mg-per-ml']
    },
    {
      id: 'fluconazole-esophageal-loading',
      type: 'mg_per_kg_per_dose',
      condition: 'Esophageal candidiasis — loading dose, day 1',
      minAgeMonths: 6,
      dose: 6,
      unit: 'mg/kg/dose',
      frequency: 1,
      frequencyText: 'Once on day 1',
      requiresAge: true,
      requiresWeight: true,
      allowedFormulations: ['fluconazole-10mg-per-ml', 'fluconazole-40mg-per-ml']
    },
    {
      id: 'fluconazole-esophageal-maintenance',
      type: 'mg_per_kg_per_day',
      condition: 'Esophageal candidiasis — maintenance',
      minAgeMonths: 6,
      dose: 3,
      unit: 'mg/kg/day',
      frequency: 1,
      frequencyText: 'Once daily; minimum 3 weeks and at least 2 weeks after symptom resolution',
      requiresAge: true,
      requiresWeight: true,
      allowedFormulations: ['fluconazole-10mg-per-ml', 'fluconazole-40mg-per-ml']
    },
    {
      id: 'fluconazole-esophageal-max',
      type: 'mg_per_kg_per_day',
      condition: 'Esophageal candidiasis — higher dose when clinically indicated',
      minAgeMonths: 6,
      dose: 12,
      unit: 'mg/kg/day',
      frequency: 1,
      frequencyText: 'Once daily; based on clinical judgment',
      maximumDailyDose: 12,
      requiresAge: true,
      requiresWeight: true,
      allowedFormulations: ['fluconazole-10mg-per-ml', 'fluconazole-40mg-per-ml']
    }
  ],
  information: {
    class: 'Triazole antifungal',
    mechanism: 'Inhibits fungal CYP-dependent lanosterol 14-alpha-demethylase, reducing ergosterol synthesis and impairing fungal cell-membrane formation.',
    indications: [
      'Oropharyngeal candidiasis',
      'Esophageal candidiasis'
    ],
    contraindications: [
      'Hypersensitivity to fluconazole or other azole antifungals.',
      'Concomitant use with drugs specifically contraindicated by the current fluconazole labeling because of serious interaction risk.'
    ],
    precautions: [
      'Use caution and adjust the dose when clinically indicated in renal impairment.',
      'Monitor for clinically significant hepatic injury; discontinue if signs or symptoms of liver disease develop unless the condition is clearly attributable to another cause.',
      'Use caution in patients with QT prolongation or conditions/drugs that increase the risk of torsades de pointes.',
      'Important drug interactions occur through CYP inhibition; review concomitant medicines before use.',
      'The oral suspension is a reconstituted product; shake well before each dose and follow the product-specific storage and discard instructions.'
    ],
    adverseEffects: [
      'Nausea',
      'Vomiting',
      'Abdominal pain',
      'Diarrhea',
      'Headache',
      'Elevated liver enzymes',
      'Rash'
    ],
    interactions: [
      'Warfarin and other coumarin-type anticoagulants — may increase anticoagulant effect/INR.',
      'Phenytoin — may increase phenytoin exposure.',
      'Sulfonylureas — may increase hypoglycemia risk.',
      'Rifampin — may reduce fluconazole exposure.',
      'Cyclosporine, tacrolimus and sirolimus — concentrations may increase.',
      'Drugs that prolong QT or are otherwise contraindicated with fluconazole require review against the current product label.'
    ],
    administration: 'Administer orally with or without food. Shake the reconstituted suspension well before each dose and measure with an accurate oral dosing device. Reconstituted suspension must be stored and discarded according to the selected product label.',
    pediatricUse: 'For labeled oropharyngeal and esophageal candidiasis regimens, pediatric patients 6 months and older receive 6 mg/kg on day 1 followed by 3 mg/kg once daily. Esophageal candidiasis may require up to 12 mg/kg/day based on clinical judgment. DoseCare does not extrapolate these regimens to younger infants or other indications.',
    notes: 'Current selected oral-suspension concentrations are 10 mg/mL and 40 mg/mL. Neonatal, systemic candidiasis, cryptococcal meningitis, ECMO, and prophylaxis regimens are intentionally not represented in this simplified calculator record because they require additional indication- and/or clinical-context-specific dosing.'
  },
  sources: [
    {
      organization: 'DailyMed',
      title: 'Fluconazole for Oral Suspension USP — current prescribing information',
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=13804efd-7cb3-431f-a6a7-bd6d1da5889e'
    },
    {
      organization: 'DailyMed',
      title: 'DIFLUCAN (fluconazole) tablets and oral suspension — effective 2026-04-02',
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f694c617-3383-416c-91b6-b94fda371204'
    }
  ]
});
