/* DoseCare V2 — Metronidazole oral suspension */
window.DoseCareV2Database?.register({
  id: 'metronidazole',
  name: 'Metronidazole',
  genericName: 'Metronidazole',
  activeIngredient: 'Metronidazole',
  dosageForm: 'Oral suspension',
  route: 'Oral',
  category: 'Antiparasitic / Antibacterial',
  formulations: [
    {
      display: '500 mg/5 mL',
      mgPer5mL: 500,
      concentration: { amount: 500, unit: 'mg', volume: 5, volumeUnit: 'mL' }
    }
  ],
  regimens: [
    {
      id: 'amebiasis-pediatric',
      type: 'mg_per_kg_per_day',
      minDose: 35,
      maxDose: 50,
      doseUnit: 'mg/kg/day',
      frequency: 3,
      frequencyText: 'Divided into 3 doses',
      maximumDailyDose: 2250,
      maximumDosePerAdministration: 750,
      condition: 'Amebiasis (acute intestinal amebiasis or amebic liver abscess)',
      minAgeMonths: 0,
      durationDays: { min: 10, max: 10 },
      notes: 'Current LIKMEZ labeling establishes pediatric safety and effectiveness for amebiasis. Dose 35–50 mg/kg/24 hours divided into 3 doses; maximum 2,250 mg/day and 750 mg per dose; oral treatment for 10 days.'
    }
  ],
  information: {
    class: 'Nitroimidazole antimicrobial',
    indications: [
      'Acute intestinal amebiasis (amoebic dysentery)',
      'Amebic liver abscess'
    ],
    mechanism: 'Metronidazole is reduced inside susceptible anaerobic organisms and protozoa to reactive intermediates that damage cellular DNA and inhibit nucleic-acid synthesis.',
    precautions: [
      'Use only for an established or strongly suspected susceptible infection.',
      'Avoid in patients with hypersensitivity to metronidazole or other nitroimidazole derivatives.',
      'Contraindicated with disulfiram use within the previous 2 weeks.',
      'Avoid alcohol and products containing propylene glycol during treatment and for at least 3 days after the last dose.',
      'Contraindicated in patients with Cockayne syndrome.',
      'Neurologic toxicity including peripheral neuropathy, encephalopathy and seizures has been reported, particularly with prolonged therapy.',
      'Use caution in severe hepatic impairment; current oral-suspension labeling recommends a 50% dose reduction in Child-Pugh C.',
      'Amebic liver abscess may require drainage/aspiration in addition to antimicrobial therapy.'
    ],
    adverseEffects: [
      'Nausea, vomiting, abdominal discomfort and diarrhea',
      'Metallic taste',
      'Headache and dizziness',
      'Rash or hypersensitivity reactions',
      'Peripheral neuropathy and other neurologic adverse effects with prolonged exposure',
      'Rare severe hepatic injury'
    ],
    interactions: [
      'Disulfiram: contraindicated if used within the previous 2 weeks.',
      'Alcohol/propylene glycol: avoid during therapy and for at least 3 days after treatment.',
      'Warfarin: may increase anticoagulant effect; monitor INR as clinically appropriate.',
      'Lithium, busulfan, cyclosporine and selected enzyme-inducing drugs may interact with metronidazole.'
    ],
    notes: 'DoseCare deliberately models only the pediatric oral regimen explicitly established by the current oral-suspension label: amebiasis. The same label does not establish pediatric safety/effectiveness for trichomoniasis or anaerobic bacterial infections, so those indications are not enabled here. Shake well and use a calibrated oral dosing device.',
    monitoring: [
      'Clinical response and hydration status',
      'Neurologic symptoms during prolonged treatment',
      'Liver function when clinically indicated',
      'Relevant drug interaction monitoring, especially anticoagulation when applicable'
    ]
  },
  sources: [
    {
      organization: 'DailyMed',
      title: 'LIKMEZ — metronidazole oral suspension, current labeling',
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e20c14eb-5361-4a93-ab46-a7bd9aeb9b98'
    },
    {
      organization: 'FDA',
      title: 'LIKMEZ (metronidazole) oral suspension prescribing information',
      url: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2023/216755s000lbl.pdf'
    }
  ]
});
