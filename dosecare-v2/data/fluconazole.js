/* DoseCare V2 — Fluconazole pediatric oral suspension. */
window.DoseCareV2Database.register({
  id: 'fluconazole',
  name: 'Fluconazole',
  genericName: 'Fluconazole',
  brandNames: ['DIFLUCAN', 'Fluconazole for Oral Suspension USP'],
  dosageForm: 'Oral suspension',
  route: 'Oral',
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
      allowedFormulations: ['fluconazole-10mg-per-ml', 'fluconazole-40mg-per-ml']
    }
  ],
  information: {
    mechanism: 'Fluconazole is a triazole antifungal that inhibits fungal CYP-dependent ergosterol synthesis.',
    indications: 'Pediatric treatment of oropharyngeal and esophageal candidiasis with labeled oral-suspension regimens in patients 6 months and older.',
    precautions: [
      'Use only for the indication and age range represented by the configured regimen; this record does not extrapolate to neonatal or other off-label dosing.',
      'Fluconazole is primarily cleared by the kidneys; pediatric dose adjustment is required when clinically indicated for renal impairment.',
      'Monitor for clinically important hepatic toxicity and drug interactions.',
      'The oral suspension is a reconstituted product; shake well before each use and follow the product storage/discard instructions.'
    ],
    pediatricUse: 'Current DailyMed labeling recommends 6 mg/kg on day 1 followed by 3 mg/kg once daily for oropharyngeal and esophageal candidiasis in pediatric patients 6 months and older.'
  },
  sources: [
    {
      title: 'DailyMed — Fluconazole for Oral Suspension USP, current prescribing information',
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=bf588f7e-89de-4b4e-8d33-c1ff2be1b34e'
    },
    {
      title: 'DailyMed — DIFLUCAN (fluconazole) oral suspension',
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f694c617-3383-416c-91b6-b94fda371204'
    }
  ]
});
