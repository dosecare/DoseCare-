/* DoseCare V2 — Fluconazole oral suspension */

window.DoseCareV2Database?.register({
  id: 'fluconazole',
  name: 'Fluconazole',
  genericName: 'Fluconazole',
  activeIngredient: 'Fluconazole',
  dosageForm: 'Oral suspension',
  route: 'Oral',
  category: 'Antifungal',

  formulations: [
    {
      display: '10 mg/mL',
      mgPer5mL: 50,
      concentration: { amount: 10, unit: 'mg', volume: 1, volumeUnit: 'mL' }
    },
    {
      display: '40 mg/mL',
      mgPer5mL: 200,
      concentration: { amount: 40, unit: 'mg', volume: 1, volumeUnit: 'mL' }
    }
  ],

  regimens: [
    {
      id: 'oropharyngeal-candidiasis',
      type: 'condition_based',
      condition: 'Oropharyngeal candidiasis',
      minAgeMonths: 6,
      frequency: 1,
      frequencyText: 'Once daily',
      requiresAge: true,
      requiresWeight: true,
      schedule: [
        { dayRange: 'Day 1', doseMgPerKg: 6 },
        { dayRange: 'Day 2 onward', doseMgPerKg: 3 }
      ],
      notes: 'For pediatric patients 6 months and older: 6 mg/kg on the first day, followed by 3 mg/kg once daily. Treatment should continue for at least 2 weeks.'
    },
    {
      id: 'esophageal-candidiasis',
      type: 'condition_based',
      condition: 'Esophageal candidiasis',
      minAgeMonths: 6,
      frequency: 1,
      frequencyText: 'Once daily',
      requiresAge: true,
      requiresWeight: true,
      schedule: [
        { dayRange: 'Day 1', doseMgPerKg: 6 },
        { dayRange: 'Day 2 onward', doseMgPerKg: 3, maxDoseMg: 600 }
      ],
      notes: 'For pediatric patients 6 months and older: 6 mg/kg on the first day, followed by 3 mg/kg once daily. Doses up to 12 mg/kg/day may be used based on clinical response. Treat for at least 3 weeks and for at least 2 weeks after resolution of symptoms.'
    }
  ],

  information: {
    class: 'Triazole antifungal',
    indications: [
      'Oropharyngeal candidiasis',
      'Esophageal candidiasis'
    ],
    mechanism:
      'Inhibits fungal cytochrome P450-dependent 14-alpha-demethylase, reducing ergosterol synthesis and impairing fungal cell membrane formation.',
    precautions: [
      'Use the regimen appropriate to the confirmed or suspected clinical indication.',
      'Fluconazole is primarily eliminated by the kidneys; dose adjustment may be required in renal impairment.',
      'Review for clinically important drug interactions before use.',
      'Consider hepatic adverse effects and discontinue/assess if clinically significant liver injury develops.',
      'The selected pediatric oral-liquid regimens are labeled for children 6 months and older.'
    ],
    adverseEffects: [
      'Nausea',
      'Abdominal pain',
      'Diarrhea',
      'Headache',
      'Rash',
      'Elevated liver enzymes or hepatotoxicity',
      'QT prolongation and serious arrhythmias are uncommon but clinically important'
    ],
    notes:
      'Fluconazole oral suspension is supplied after reconstitution as 10 mg/mL or 40 mg/mL. Shake well before use. The selected pediatric regimens are based on current DailyMed prescribing information.'
  },

  sources: [
    {
      organization: 'DailyMed',
      title: 'Fluconazole Powder for Oral Suspension — Prescribing Information',
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=afde17e7-b95b-4cd5-97eb-e361724014bd'
    },
    {
      organization: 'DailyMed',
      title: 'Fluconazole for Oral Suspension — Pediatric Dosage and Concentrations',
      url: 'https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=bf588f7e-89de-4b4e-8d33-c1ff2be1b34e'
    }
  ]
});
