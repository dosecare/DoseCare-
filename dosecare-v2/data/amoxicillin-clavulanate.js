/* DoseCare V2 — Amoxicillin/Clavulanate */
DoseCareV2Database.register({
  id: 'amoxicillin-clavulanate',
  name: 'Amoxicillin/Clavulanate',
  genericName: 'Amoxicillin and Clavulanate Potassium',
  activeIngredient: 'Amoxicillin + Clavulanate potassium',
  dosageForm: 'Oral suspension',
  route: 'Oral',
  formulations: [
    { id: '125-31.25', display: '125 mg/31.25 mg per 5 mL', mgPer5mL: 125, concentration: { amount: 125, unit: 'mg amoxicillin', volume: 5, volumeUnit: 'mL' }, clavulanateMgPer5mL: 31.25 },
    { id: '200-28.5', display: '200 mg/28.5 mg per 5 mL', mgPer5mL: 200, concentration: { amount: 200, unit: 'mg amoxicillin', volume: 5, volumeUnit: 'mL' }, clavulanateMgPer5mL: 28.5 },
    { id: '250-62.5', display: '250 mg/62.5 mg per 5 mL', mgPer5mL: 250, concentration: { amount: 250, unit: 'mg amoxicillin', volume: 5, volumeUnit: 'mL' }, clavulanateMgPer5mL: 62.5 },
    { id: '400-57', display: '400 mg/57 mg per 5 mL', mgPer5mL: 400, concentration: { amount: 400, unit: 'mg amoxicillin', volume: 5, volumeUnit: 'mL' }, clavulanateMgPer5mL: 57 },
    { id: '600-42.9', display: '600 mg/42.9 mg per 5 mL', mgPer5mL: 600, concentration: { amount: 600, unit: 'mg amoxicillin', volume: 5, volumeUnit: 'mL' }, clavulanateMgPer5mL: 42.9 }
  ],
  regimens: [
    { id: 'high-dose-600-q12h', condition: 'High-dose regimen — every 12 hours', type: 'mg_per_kg_per_day', minDose: 90, maxDose: 90, frequency: 2, frequencyText: 'Every 12 hours', requiresAge: true, requiresWeight: true, minAgeMonths: 3, maxAgeMonths: 144, maxWeightKg: 40, allowedFormulations: ['600-42.9'], durationDays: 10 },
    { id: 'less-severe-q12h', condition: 'Less severe infections — every 12 hours', type: 'mg_per_kg_per_day', minDose: 25, maxDose: 25, frequency: 2, frequencyText: 'Every 12 hours', requiresAge: true, requiresWeight: true, minAgeMonths: 3, maxAgeMonths: 144, maxWeightKg: 40, allowedFormulations: ['200-28.5', '400-57'], durationDays: 10 },
    { id: 'less-severe-q8h', condition: 'Less severe infections — every 8 hours', type: 'mg_per_kg_per_day', minDose: 20, maxDose: 20, frequency: 3, frequencyText: 'Every 8 hours', requiresAge: true, requiresWeight: true, minAgeMonths: 3, maxAgeMonths: 144, maxWeightKg: 40, allowedFormulations: ['125-31.25', '250-62.5'], durationDays: 10 },
    { id: 'severe-q12h', condition: 'Otitis media / sinusitis / lower respiratory tract / more severe infections — every 12 hours', type: 'mg_per_kg_per_day', minDose: 45, maxDose: 45, frequency: 2, frequencyText: 'Every 12 hours', requiresAge: true, requiresWeight: true, minAgeMonths: 3, maxAgeMonths: 144, maxWeightKg: 40, allowedFormulations: ['200-28.5', '400-57'], durationDays: 10 },
    { id: 'severe-q8h', condition: 'Otitis media / sinusitis / lower respiratory tract / more severe infections — every 8 hours', type: 'mg_per_kg_per_day', minDose: 40, maxDose: 40, frequency: 3, frequencyText: 'Every 8 hours', requiresAge: true, requiresWeight: true, minAgeMonths: 3, maxAgeMonths: 144, maxWeightKg: 40, allowedFormulations: ['125-31.25', '250-62.5'], durationDays: 10 }
  ],
  information: {
    class: 'Aminopenicillin/beta-lactamase inhibitor antibacterial',
    indications: ['Selected susceptible bacterial infections for which the labeled pediatric regimen is appropriate'],
    mechanism: 'Amoxicillin inhibits bacterial cell-wall synthesis; clavulanate inhibits selected beta-lactamases.',
    precautions: ['Formulations are not interchangeable because their amoxicillin-to-clavulanate ratios differ.', 'Dose regimens are based on the amoxicillin component.', 'The 600 mg/42.9 mg per 5 mL formulation has a distinct 90 mg/kg/day regimen and must not be substituted with the 200 mg/28.5 mg or 400 mg/57 mg formulations.', 'Administer at the start of a meal to improve tolerability and clavulanate absorption.'],
    adverseEffects: ['Diarrhea', 'Nausea', 'Rash', 'Hypersensitivity reactions'],
    notes: 'For pediatric patients 3 months to 12 years weighing 40 kg or less, the formulation-specific regimen must be followed. The 600 mg/42.9 mg per 5 mL formulation is labeled at 90 mg/kg/day divided every 12 hours for 10 days.'
  },
  sources: [
    { organization: 'DailyMed', title: 'Amoxicillin and Clavulanate Potassium 600 mg/42.9 mg per 5 mL Oral Suspension', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=6339bcdb-060f-4558-9f42-6bf7f935e138' },
    { organization: 'DailyMed', title: 'Amoxicillin and Clavulanate Potassium Oral Suspension', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=474c822b-dc3d-4a55-8159-2b4b799d535b' }
  ]
});
