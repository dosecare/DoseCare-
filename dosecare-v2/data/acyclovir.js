/* DoseCare V2 — Acyclovir oral suspension */

window.DoseCareV2Database?.register({
  id: 'acyclovir',
  name: 'Acyclovir',
  genericName: 'Acyclovir',
  activeIngredient: 'Acyclovir',
  dosageForm: 'Oral suspension',
  route: 'Oral',
  category: 'Antiviral',

  formulations: [
    {
      display: '200 mg/5 mL',
      mgPer5mL: 200,
      concentration: { amount: 200, unit: 'mg', volume: 5, volumeUnit: 'mL' }
    }
  ],

  regimens: [
    {
      id: 'chickenpox-pediatric',
      type: 'mg_per_kg_per_dose',
      condition: 'Chickenpox (varicella)',
      minDose: 20,
      maxDose: 20,
      doseUnit: 'mg/kg/dose',
      frequency: 4,
      frequencyText: 'Four times daily for 5 days',
      minAgeYears: 2,
      maximumDosePerAdministration: 800,
      maximumDailyDose: 3200,
      requiresAge: true,
      requiresWeight: true,
      notes: 'For children 2 years of age and older: 20 mg/kg per dose orally four times daily for 5 days. Children over 40 kg should receive the adult dose of 800 mg four times daily for 5 days.'
    }
  ],

  information: {
    class: 'Nucleoside analogue antiviral',
    indications: [
      'Chickenpox (varicella)'
    ],
    mechanism:
      'Acyclovir is phosphorylated by viral thymidine kinase and then inhibits viral DNA polymerase, interfering with viral DNA synthesis.',
    precautions: [
      'Use the regimen appropriate to the confirmed or suspected viral infection.',
      'Adequate hydration is important, particularly in patients receiving higher doses or those at risk of renal impairment.',
      'Dose adjustment is required in acute or chronic renal impairment according to the product labeling.',
      'Review concomitant medicines and renal function when clinically appropriate.',
      'The selected labeled pediatric chickenpox regimen is for children 2 years of age and older.'
    ],
    adverseEffects: [
      'Nausea',
      'Vomiting',
      'Diarrhea',
      'Headache',
      'Rash',
      'Renal impairment, particularly with inadequate hydration or renal risk factors',
      'Rare neurologic adverse effects'
    ],
    notes:
      'Acyclovir oral suspension contains 200 mg in 5 mL (40 mg/mL). Shake well before use. The selected pediatric regimen is from current DailyMed labeling for chickenpox.'
  },

  sources: [
    {
      organization: 'DailyMed',
      title: 'Acyclovir Oral Suspension USP — Prescribing Information',
      url: 'https://www.dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a4c1305c-f18c-4fb0-83d8-2822341f2dfa'
    },
    {
      organization: 'DailyMed',
      title: 'Acyclovir Oral Suspension — Pediatric Chickenpox Dosing',
      url: 'https://www.dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=37761c4f-4378-472e-a41b-6a1d40575cb7'
    }
  ]
});
