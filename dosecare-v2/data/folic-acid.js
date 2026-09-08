/* DoseCare V2 — Folic acid pediatric oral solution. */
window.DoseCareV2Database.register({
  id: 'folic-acid',
  name: 'Folic Acid',
  genericName: 'Folic acid',
  brandNames: ['QUIOFIC', 'FOLIC ACID Oral Solution'],
  dosageForm: 'Oral solution',
  route: 'Oral',
  formulations: [
    {
      id: 'folic-acid-0-2mg-per-ml',
      dosageForm: 'Oral solution',
      concentration: { amount: 0.2, unit: 'mg', volume: 1, volumeUnit: 'mL' },
      display: '0.2 mg/mL (1 mg/5 mL)',
      mgPerMl: 0.2
    }
  ],
  regimens: [
    {
      id: 'folic-acid-initial-up-to-1mg-daily',
      type: 'fixed_dose',
      condition: 'Initial treatment of folic acid deficiency megaloblastic anaemia',
      minAgeMonths: 0,
      dose: 1,
      unit: 'mg/day (up to)',
      frequency: 1,
      frequencyText: 'Once daily',
      allowedFormulations: ['folic-acid-0-2mg-per-ml']
    },
    {
      id: 'folic-acid-maintenance-birth-23-months',
      type: 'fixed_dose',
      condition: 'Maintenance after clinical and haematologic response',
      minAgeMonths: 0,
      maxAgeMonths: 23.999,
      dose: 0.1,
      unit: 'mg/day',
      frequency: 1,
      frequencyText: 'Once daily',
      allowedFormulations: ['folic-acid-0-2mg-per-ml']
    },
    {
      id: 'folic-acid-maintenance-2-to-under-4-years',
      type: 'fixed_dose',
      condition: 'Maintenance after clinical and haematologic response',
      minAgeYears: 2,
      maxAgeYears: 3.999,
      dose: 0.3,
      unit: 'mg/day (up to)',
      frequency: 1,
      frequencyText: 'Once daily',
      allowedFormulations: ['folic-acid-0-2mg-per-ml']
    },
    {
      id: 'folic-acid-maintenance-4-years-and-older',
      type: 'fixed_dose',
      condition: 'Maintenance after clinical and haematologic response',
      minAgeYears: 4,
      dose: 0.4,
      unit: 'mg/day',
      frequency: 1,
      frequencyText: 'Once daily',
      allowedFormulations: ['folic-acid-0-2mg-per-ml']
    }
  ],
  information: {
    mechanism: 'Folic acid is required for tetrahydrofolate-dependent one-carbon transfer reactions involved in nucleic-acid synthesis and normal erythropoiesis.',
    indications: 'Treatment of megaloblastic anaemia due to folic acid deficiency in pediatric patients, with label-defined maintenance dosing after clinical and haematologic response.',
    contraindications: [
      'Hypersensitivity to folic acid or any ingredient of the oral solution.'
    ],
    precautions: [
      'Rule out pernicious anaemia before using doses greater than 0.4 mg/day except where the label provides a specific exception.',
      'Folic acid alone is not recommended for pernicious anaemia or other megaloblastic anaemias caused by vitamin B12 deficiency.',
      'Doses above 0.1 mg/day can obscure the hematologic manifestations of vitamin B12 deficiency while neurologic injury progresses.',
      'Protect the oral solution from light and store in the original container; discard unused solution 30 days after first opening.'
    ],
    adverseEffects: [
      'Hypersensitivity reactions including rash, itching, malaise, and bronchospasm.',
      'Gastrointestinal reactions including nausea, anorexia, abdominal distension, flatulence, and dysgeusia.',
      'Neurological reactions including altered sleep patterns, difficulty concentrating, irritability, overactivity, excitement, depression, confusion, or impaired judgement.',
      'Decreased vitamin B12 serum levels with prolonged folic acid therapy; increased seizures have been reported in patients with epilepsy receiving phenobarbital, primidone, or phenytoin.'
    ],
    interactions: [
      'Phenytoin and other anticonvulsants may have altered effects or folate levels with folic acid therapy.',
      'Valproate, sulfasalazine, isoniazid, cycloserine, trimethoprim, pyrimethamine, methotrexate, triamterene, and some GI-binding or acid-suppressing agents may reduce folate availability or absorption; review concomitant therapy clinically.'
    ],
    administration: 'Take orally once daily. The solution may be taken with or without food. Use an oral dosing syringe for accurate measurement. For the 0.2 mg/mL formulation, 1 mg equals 5 mL, 0.4 mg equals 2 mL, 0.3 mg equals 1.5 mL, and 0.1 mg equals 0.5 mL.',
    pediatricUse: 'DailyMed label provides pediatric initial treatment up to 1 mg/day regardless of age, followed by maintenance dosing of 0.1 mg/day from birth to 23 months, up to 0.3 mg/day from 2 to under 4 years, and 0.4 mg/day from 4 years and older.'
  },
  sources: [
    {
      title: 'DailyMed — QUIOFIC (folic acid) oral solution',
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b868b314-591d-458b-be82-2bcd0b73cce1'
    },
    {
      title: 'DailyMed — FOLIC ACID oral solution',
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=96618bf8-6c03-4df3-9896-b7ef27ca392a'
    }
  ]
});
