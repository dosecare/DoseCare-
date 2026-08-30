/* DoseCare V2 — Amoxicillin */
DoseCareV2Database.register({
  id: 'amoxicillin',
  name: 'Amoxicillin',
  genericName: 'Amoxicillin',
  activeIngredient: 'Amoxicillin',
  dosageForm: 'Oral suspension',
  route: 'Oral',
  formulations: [
    { display: '400 mg/5 mL', mgPer5mL: 400, concentration: { amount: 400, unit: 'mg', volume: 5, volumeUnit: 'mL' } }
  ],
  regimens: [
    { id: 'infant-under-3m-q12h', condition: 'Age ≤3 months — upper pediatric dose', type: 'mg_per_kg_per_day', minDose: 30, maxDose: 30, frequency: 2, frequencyText: 'Every 12 hours', requiresAge: true, requiresWeight: true, minAgeMonths: 0, maxAgeMonths: 3 },
    { id: 'ent-mild-q12h', condition: 'Ear/Nose/Throat — Mild/Moderate — every 12 hours', type: 'mg_per_kg_per_day', minDose: 25, maxDose: 25, frequency: 2, frequencyText: 'Every 12 hours', requiresAge: true, requiresWeight: true, minAgeMonths: 3, maxWeightKg: 39.9 },
    { id: 'ent-mild-q8h', condition: 'Ear/Nose/Throat — Mild/Moderate — every 8 hours', type: 'mg_per_kg_per_day', minDose: 20, maxDose: 20, frequency: 3, frequencyText: 'Every 8 hours', requiresAge: true, requiresWeight: true, minAgeMonths: 3, maxWeightKg: 39.9 },
    { id: 'ent-severe-q12h', condition: 'Ear/Nose/Throat — Severe — every 12 hours', type: 'mg_per_kg_per_day', minDose: 45, maxDose: 45, frequency: 2, frequencyText: 'Every 12 hours', requiresAge: true, requiresWeight: true, minAgeMonths: 3, maxWeightKg: 39.9 },
    { id: 'ent-severe-q8h', condition: 'Ear/Nose/Throat — Severe — every 8 hours', type: 'mg_per_kg_per_day', minDose: 40, maxDose: 40, frequency: 3, frequencyText: 'Every 8 hours', requiresAge: true, requiresWeight: true, minAgeMonths: 3, maxWeightKg: 39.9 },
    { id: 'lrt-q12h', condition: 'Lower Respiratory Tract — every 12 hours', type: 'mg_per_kg_per_day', minDose: 45, maxDose: 45, frequency: 2, frequencyText: 'Every 12 hours', requiresAge: true, requiresWeight: true, minAgeMonths: 3, maxWeightKg: 39.9 },
    { id: 'lrt-q8h', condition: 'Lower Respiratory Tract — every 8 hours', type: 'mg_per_kg_per_day', minDose: 40, maxDose: 40, frequency: 3, frequencyText: 'Every 8 hours', requiresAge: true, requiresWeight: true, minAgeMonths: 3, maxWeightKg: 39.9 }
  ],
  information: {
    class: 'Aminopenicillin antibacterial',
    indications: ['Treatment of susceptible bacterial infections for which the selected labeled regimen is appropriate'],
    mechanism: 'Amoxicillin is a beta-lactam antibacterial agent that inhibits bacterial cell-wall synthesis.',
    precautions: ['Contraindicated in patients with serious hypersensitivity reactions to amoxicillin or other beta-lactam antibacterial drugs.', 'Use only for infections for which the selected regimen is appropriate.', 'Dose adjustment may be required in renal impairment.'],
    adverseEffects: ['Diarrhea', 'Nausea', 'Skin rash', 'Hypersensitivity reactions, including anaphylaxis'],
    notes: 'The encoded pediatric regimens are tied to the referenced prescribing information. Patients weighing 40 kg or more should not be routed through these pediatric regimens. The ≤3-month regimen is an upper-dose rule and should not be treated as an indication-specific infection regimen.'
  },
  sources: [
    { organization: 'DailyMed', title: 'Amoxicillin for Oral Suspension — 400 mg/5 mL', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=575f97d5-ea44-481f-977d-7a28300b2a5f' },
    { organization: 'DailyMed', title: 'Amoxicillin for Oral Suspension — Prescribing Information', url: 'https://dailymed.nlm.nih.gov/dailymed/getFile.cfm?setid=1b9c0a98-2a31-4b23-ac4f-7c3f14b6f92f' }
  ]
});
