/* DoseCare V2 — Oseltamivir oral suspension */

DoseCareV2Database.register({
  id: 'oseltamivir',
  name: 'Oseltamivir',
  genericName: 'Oseltamivir phosphate',
  activeIngredient: 'Oseltamivir phosphate',

  dosageForm: 'Oral suspension',
  route: 'Oral',
  category: 'Antiviral',

  formulations: [
    {
      display: '6 mg/mL',
      mgPer5mL: 30,
      concentration: {
        amount: 6,
        unit: 'mg',
        volume: 1,
        volumeUnit: 'mL'
      }
    }
  ],

  regimens: [
    {
      id: 'influenza-treatment-infants',
      type: 'scheduled',
      condition: 'Treatment of influenza',
      minAgeWeeks: 2,
      maxAgeMonths: 12,
      frequency: 2,
      frequencyText: 'Twice daily for 5 days',
      requiresAge: true,
      requiresWeight: true,
      schedule: [
        {
          dayRange: 'Days 1–5',
          doseMgPerKg: 3
        }
      ]
    },
    {
      id: 'influenza-treatment-children',
      type: 'label_weight_age_based',
      condition: 'Treatment of influenza',
      minAgeYears: 1,
      maxAgeYears: 12,
      frequencyText: 'Twice daily for 5 days',
      table: [
        { minLb: 0, maxLb: 33.0693, minAgeYears: 1, maxAgeYears: 12, doseMl: 5 },
        { minLb: 33.2896, maxLb: 50.7063, minAgeYears: 1, maxAgeYears: 12, doseMl: 7.5 },
        { minLb: 50.9272, maxLb: 88.1849, minAgeYears: 1, maxAgeYears: 12, doseMl: 10 },
        { minLb: 88.4053, maxLb: 999, minAgeYears: 1, maxAgeYears: 12, doseMl: 12.5 }
      ],
      noMatchingBandMessage:
        'The entered age and/or weight does not match a configured oseltamivir labeled dose band. Verify the product label or consult a clinician.'
    },
    {
      id: 'influenza-prophylaxis-children',
      type: 'label_weight_age_based',
      condition: 'Post-exposure prophylaxis of influenza',
      minAgeYears: 1,
      maxAgeYears: 12,
      frequencyText: 'Once daily for 10 days',
      table: [
        { minLb: 0, maxLb: 33.0693, minAgeYears: 1, maxAgeYears: 12, doseMl: 5 },
        { minLb: 33.2896, maxLb: 50.7063, minAgeYears: 1, maxAgeYears: 12, doseMl: 7.5 },
        { minLb: 50.9272, maxLb: 88.1849, minAgeYears: 1, maxAgeYears: 12, doseMl: 10 },
        { minLb: 88.4053, maxLb: 999, minAgeYears: 1, maxAgeYears: 12, doseMl: 12.5 }
      ],
      noMatchingBandMessage:
        'The entered age and/or weight does not match a configured oseltamivir prophylaxis dose band. Verify the product label or consult a clinician.'
    }
  ],

  information: {
    class: 'Neuraminidase inhibitor antiviral',

    indications: [
      'Treatment of influenza',
      'Post-exposure prophylaxis of influenza'
    ],

    mechanism:
      'Inhibits influenza virus neuraminidase, reducing release of newly formed viral particles from infected cells.',

    precautions: [
      'For treatment, initiate as soon as possible and within 48 hours of influenza symptom onset when indicated.',
      'Treatment is labeled for patients 2 weeks of age and older; prophylaxis is labeled for patients 1 year of age and older.',
      'Dose adjustment is required in moderate or severe renal impairment; DoseCare does not currently perform renal dose adjustment.',
      'Serious hypersensitivity reactions can occur.',
      'Neuropsychiatric events have been reported; monitor clinically, especially in children and adolescents.'
    ],

    adverseEffects: [
      'Nausea and vomiting',
      'Headache',
      'Abdominal pain or other gastrointestinal symptoms',
      'Hypersensitivity reactions are uncommon but can be serious'
    ],

    notes:
      'The labeled oral suspension concentration is 6 mg/mL. For children 2 weeks to less than 1 year, treatment is 3 mg/kg per dose twice daily for 5 days. For children 1–12 years, treatment and prophylaxis use weight-band dosing. Prophylaxis is not labeled for children younger than 1 year.',

    administration:
      'Shake the oral suspension well before each dose and measure with an accurate oral dosing device. The supplied product is constituted with water by the pharmacist before dispensing.'
  },

  sources: [
    {
      organization: 'DailyMed',
      title: 'Oseltamivir Phosphate for Oral Suspension — Pediatric Treatment and Prophylaxis',
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=82df3237-636b-7bf9-3ba0-2b476e74bf4c'
    },
    {
      organization: 'U.S. Food and Drug Administration',
      title: 'Tamiflu (oseltamivir phosphate) Prescribing Information',
      url: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2014/021087s065%2C021246s048lbl.pdf'
    }
  ]
});
