/* DoseCare V2 — Nitazoxanide pediatric oral suspension. */
window.DoseCareV2Database.register({
  id: 'nitazoxanide',
  name: 'Nitazoxanide',
  genericName: 'Nitazoxanide',
  brandNames: ['ALINIA for Oral Suspension'],
  dosageForm: 'Oral suspension',
  route: 'Oral',
  category: 'Antiprotozoal',
  formulations: [
    {
      id: 'nitazoxanide-100mg-per-5ml',
      dosageForm: 'Oral suspension',
      concentration: { amount: 100, unit: 'mg', volume: 5, volumeUnit: 'mL' },
      display: '100 mg/5 mL',
      mgPerMl: 20
    }
  ],
  regimens: [
    {
      id: 'nitazoxanide-giardia-cryptosporidium-1-3-years',
      condition: 'Diarrhea caused by Giardia lamblia or Cryptosporidium parvum',
      type: 'label_age_based',
      minAgeYears: 1,
      maxAgeYears: 3.999,
      doseMin: 100,
      doseMax: 100,
      doseUnit: 'mg/dose',
      volumeMin: 5,
      volumeMax: 5,
      volumeUnit: 'mL/dose',
      frequency: 2,
      frequencyText: 'Every 12 hours with food for 3 days',
      maxDosesPer24h: 2,
      requiresAge: true,
      requiresWeight: false,
      allowedFormulations: ['nitazoxanide-100mg-per-5ml']
    },
    {
      id: 'nitazoxanide-giardia-cryptosporidium-4-11-years',
      condition: 'Diarrhea caused by Giardia lamblia or Cryptosporidium parvum',
      type: 'label_age_based',
      minAgeYears: 4,
      maxAgeYears: 11.999,
      doseMin: 200,
      doseMax: 200,
      doseUnit: 'mg/dose',
      volumeMin: 10,
      volumeMax: 10,
      volumeUnit: 'mL/dose',
      frequency: 2,
      frequencyText: 'Every 12 hours with food for 3 days',
      maxDosesPer24h: 2,
      requiresAge: true,
      requiresWeight: false,
      allowedFormulations: ['nitazoxanide-100mg-per-5ml']
    },
    {
      id: 'nitazoxanide-giardia-cryptosporidium-12-years-plus-suspension',
      condition: 'Diarrhea caused by Giardia lamblia or Cryptosporidium parvum',
      type: 'label_age_based',
      minAgeYears: 12,
      doseMin: 500,
      doseMax: 500,
      doseUnit: 'mg/dose',
      volumeMin: 25,
      volumeMax: 25,
      volumeUnit: 'mL/dose',
      frequency: 2,
      frequencyText: 'Every 12 hours with food for 3 days; suspension option for patients 12 years and older',
      maxDosesPer24h: 2,
      requiresAge: true,
      requiresWeight: false,
      allowedFormulations: ['nitazoxanide-100mg-per-5ml']
    }
  ],
  information: {
    mechanism: 'Nitazoxanide is an antiprotozoal agent used against Giardia lamblia and Cryptosporidium parvum.',
    indications: 'Treatment of diarrhea caused by Giardia lamblia or Cryptosporidium parvum.',
    precautions: [
      'Take with food.',
      'Safety and efficacy of the oral suspension have not been established in children younger than 1 year.',
      'The 500 mg tablet should not be used in children 11 years or younger because it exceeds the recommended pediatric dose; this record uses the oral suspension.'
    ],
    pediatricUse: 'DailyMed labeling provides 100 mg every 12 hours for ages 1–3 years, 200 mg every 12 hours for ages 4–11 years, and 500 mg every 12 hours for patients 12 years and older; treatment duration is 3 days.'
  },
  sources: [
    {
      title: 'DailyMed — ALINIA (nitazoxanide) for oral suspension prescribing information',
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e90f98d9-3c9b-4e75-ba18-5517283eadf0'
    },
    {
      title: 'DailyMed — ALINIA oral suspension pediatric use and dosage',
      url: 'https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=e90f98d9-3c9b-4e75-ba18-5517283eadf0&type=display'
    }
  ]
});
