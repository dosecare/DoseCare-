/* DoseCare V2 — Cephalexin */
DoseCareV2Database.register({
  id: 'cephalexin',
  name: 'Cephalexin',
  genericName: 'Cephalexin',
  activeIngredient: 'Cephalexin',
  dosageForm: 'Oral suspension',
  route: 'Oral',
  formulations: [
    { display: '125 mg/5 mL', mgPer5mL: 125, concentration: { amount: 125, unit: 'mg', volume: 5, volumeUnit: 'mL' } },
    { display: '250 mg/5 mL', mgPer5mL: 250, concentration: { amount: 250, unit: 'mg', volume: 5, volumeUnit: 'mL' } }
  ],
  regimens: [
    {
      id: 'usual-infections-qid', condition: 'Usual infections', type: 'mg_per_kg_per_day', minDose: 25, maxDose: 50, frequency: 4,
      frequencyText: 'Every 6 hours', durationDays: '7–14', unit: 'mg/kg/day', minAgeMonths: 13
    },
    {
      id: 'usual-infections-bid', condition: 'Usual infections — selected conditions', type: 'mg_per_kg_per_day', minDose: 25, maxDose: 50, frequency: 2,
      frequencyText: 'Every 12 hours', durationDays: '7–14', unit: 'mg/kg/day', minAgeMonths: 13,
      note: 'For streptococcal pharyngitis and skin/skin-structure infections, the total daily dose may be divided every 12 hours.'
    },
    {
      id: 'severe-infections-qid', condition: 'Severe infections', type: 'mg_per_kg_per_day', minDose: 50, maxDose: 100, frequency: 4,
      frequencyText: 'Every 6 hours', durationDays: '7–14', unit: 'mg/kg/day', minAgeMonths: 13
    },
    {
      id: 'otitis-media-qid', condition: 'Otitis media', type: 'mg_per_kg_per_day', minDose: 75, maxDose: 100, frequency: 4,
      frequencyText: 'Every 6 hours', unit: 'mg/kg/day', minAgeMonths: 13
    },
    {
      id: 'streptococcal-pharyngitis-bid', condition: 'Streptococcal pharyngitis', type: 'mg_per_kg_per_day', minDose: 25, maxDose: 50, frequency: 2,
      frequencyText: 'Every 12 hours', durationDays: '10 days minimum', unit: 'mg/kg/day', minAgeMonths: 13,
      note: 'Treatment should be given for at least 10 days.'
    }
  ],
  information: {
    class: 'Cephalosporin antibacterial',
    indications: ['Respiratory tract infections', 'Otitis media', 'Skin and skin-structure infections', 'Bone infections', 'Genitourinary infections'],
    mechanism: 'Cephalexin is a cephalosporin antibacterial that inhibits bacterial cell-wall synthesis.',
    precautions: ['Check for a history of serious hypersensitivity to cephalexin, cephalosporins, penicillins, or other beta-lactam antibacterials.', 'Use caution in patients with renal impairment; dosage adjustment may be required.', 'Antibiotic-associated diarrhea, including Clostridioides difficile-associated diarrhea, can occur.'],
    adverseEffects: ['Diarrhea', 'Nausea', 'Vomiting', 'Abdominal discomfort', 'Rash', 'Hypersensitivity reactions'],
    notes: 'Current DailyMed labeling applies the pediatric oral-suspension regimen to children over 1 year of age. For pediatric patients, the total daily dose is 25–50 mg/kg/day for usual infections, 50–100 mg/kg/day for severe infections, and 75–100 mg/kg/day for otitis media, divided into appropriate doses.'
  },
  sources: [
    { organization: 'DailyMed', title: 'Cephalexin for Oral Suspension', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=655f38e8-1c4d-4cbc-9f52-bb881f065b2d' },
    { organization: 'DailyMed', title: 'Cephalexin oral suspension prescribing information', url: 'https://www.dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=d31da5be-c939-4aa0-adb8-b26a1396b228&type=display' }
  ]
});
