/* DoseCare V2 — Amoxicillin/Clavulanate */
DoseCareV2Database.register({
  id: 'amoxicillin-clavulanate',
  name: 'Amoxicillin/Clavulanate',
  genericName: 'Amoxicillin and Clavulanate Potassium',
  activeIngredient: 'Amoxicillin + Clavulanate potassium',
  dosageForm: 'Oral suspension',
  route: 'Oral',
  formulations: [
    { display: '125 mg/31.25 mg per 5 mL', mgPer5mL: 125, concentration: { amount: 125, unit: 'mg amoxicillin', volume: 5, volumeUnit: 'mL' }, clavulanateMgPer5mL: 31.25 },
    { display: '200 mg/28.5 mg per 5 mL', mgPer5mL: 200, concentration: { amount: 200, unit: 'mg amoxicillin', volume: 5, volumeUnit: 'mL' }, clavulanateMgPer5mL: 28.5 },
    { display: '250 mg/62.5 mg per 5 mL', mgPer5mL: 250, concentration: { amount: 250, unit: 'mg amoxicillin', volume: 5, volumeUnit: 'mL' }, clavulanateMgPer5mL: 62.5 },
    { display: '400 mg/57 mg per 5 mL', mgPer5mL: 400, concentration: { amount: 400, unit: 'mg amoxicillin', volume: 5, volumeUnit: 'mL' }, clavulanateMgPer5mL: 57 },
    { display: '600 mg/42.9 mg per 5 mL', mgPer5mL: 600, concentration: { amount: 600, unit: 'mg amoxicillin', volume: 5, volumeUnit: 'mL' }, clavulanateMgPer5mL: 42.9 }
  ],
  regimens: [
    { id: 'less-severe-q12h', condition: 'Less severe infections — every 12 hours', type: 'mg_per_kg_per_day', minDose: 25, maxDose: 25, frequency: 2, frequencyText: 'Every 12 hours', requiresAge: true, requiresWeight: true, minAgeMonths: 3, maxWeightKg: 39.9 },
    { id: 'less-severe-q8h', condition: 'Less severe infections — every 8 hours', type: 'mg_per_kg_per_day', minDose: 20, maxDose: 20, frequency: 3, frequencyText: 'Every 8 hours', requiresAge: true, requiresWeight: true, minAgeMonths: 3, maxWeightKg: 39.9 },
    { id: 'severe-om-sinus-lrt-q12h', condition: 'Otitis media / sinusitis / lower respiratory tract / more severe infections — every 12 hours', type: 'mg_per_kg_per_day', minDose: 45, maxDose: 45, frequency: 2, frequencyText: 'Every 12 hours', requiresAge: true, requiresWeight: true, minAgeMonths: 3, maxWeightKg: 39.9 },
    { id: 'severe-om-sinus-lrt-q8h', condition: 'Otitis media / sinusitis / lower respiratory tract / more severe infections — every 8 hours', type: 'mg_per_kg_per_day', minDose: 40, maxDose: 40, frequency: 3, frequencyText: 'Every 8 hours', requiresAge: true, requiresWeight: true, minAgeMonths: 3, maxWeightKg: 39.9 },
    { id: 'infant-q12h', condition: 'Infants younger than 3 months — every 12 hours', type: 'mg_per_kg_per_day', minDose: 30, maxDose: 30, frequency: 2, frequencyText: 'Every 12 hours', requiresAge: true, requiresWeight: true, maxAgeMonths: 2.99 }
  ],
  information: {
    class: 'Aminopenicillin/beta-lactamase inhibitor antibacterial',
    indications: ['Selected susceptible bacterial infections for which the labeled pediatric regimen is appropriate'],
    mechanism: 'Amoxicillin inhibits bacterial cell-wall synthesis; clavulanate inhibits selected beta-lactamases.',
    precautions: ['Formulations are not interchangeable because their amoxicillin-to-clavulanate ratios differ.', 'Dose regimens are based on the amoxicillin component.', 'The 200 mg/28.5 mg and 400 mg/57 mg per 5 mL formulations contain aspartame and should not be used in phenylketonuric patients according to the selected labeling.', 'Administer with food to improve tolerability.'],
    adverseEffects: ['Diarrhea', 'Nausea', 'Rash', 'Hypersensitivity reactions'],
    notes: 'For pediatric patients 3 months and older and weighing less than 40 kg, the selected label provides every-12-hour and every-8-hour regimens. Patients weighing 40 kg or more are dosed according to adult recommendations.'
  },
  sources: [
    { organization: 'DailyMed', title: 'Amoxicillin and Clavulanate Potassium for Oral Suspension', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3b4f868d-6a3e-8276-e063-6294a90a6457' },
    { organization: 'DailyMed', title: 'Amoxicillin and Clavulanate Potassium for Oral Suspension — Prescribing Information', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e5bd9918-b073-c50b-e053-2a95a90af205' }
  ]
});
