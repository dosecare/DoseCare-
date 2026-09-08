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
    indications: [
      'Recurrent or persistent acute otitis media in appropriately selected pediatric patients',
      'Acute bacterial sinusitis when the formulation-specific pediatric regimen is appropriate',
      'Other susceptible bacterial infections only when a validated formulation-specific pediatric regimen is selected'
    ],
    mechanism: 'Amoxicillin inhibits bacterial cell-wall synthesis; clavulanate inhibits selected beta-lactamases.',
    contraindications: [
      'Serious hypersensitivity reaction to amoxicillin, clavulanate, penicillins, or other beta-lactam antibacterials',
      'History of cholestatic jaundice or hepatic dysfunction associated with amoxicillin/clavulanate'
    ],
    precautions: [
      'Formulations are not interchangeable because their amoxicillin-to-clavulanate ratios differ.',
      'Dose regimens are based on the amoxicillin component.',
      'The 600 mg/42.9 mg per 5 mL formulation has a distinct 90 mg/kg/day regimen and must not be substituted with the 200 mg/28.5 mg or 400 mg/57 mg formulations.',
      'Administer at the start of a meal to improve gastrointestinal tolerability and clavulanate absorption.',
      'Use caution in patients with hepatic impairment and monitor hepatic function when clinically indicated.',
      'Consider antibiotic-associated diarrhea and severe hypersensitivity reactions, including anaphylaxis.',
      'The 600 mg/42.9 mg per 5 mL product contains aspartame/phenylalanine and should be considered in patients with phenylketonuria.'
    ],
    adverseEffects: ['Diarrhea', 'Nausea', 'Rash', 'Hypersensitivity reactions', 'Hepatic dysfunction/cholestatic jaundice', 'Antibiotic-associated colitis'],
    interactions: ['Warfarin and other oral anticoagulants may require monitoring of anticoagulant effect.', 'Probenecid may increase and prolong amoxicillin exposure.', 'Allopurinol may increase the likelihood of rash with amoxicillin.'],
    administration: 'Take the suspension at the start of a meal or snack. Shake well before each dose. Reconstituted suspension should be refrigerated and discarded after 10 days for the cited 600 mg/42.9 mg per 5 mL product.',
    pediatricUse: 'Safety and effectiveness of the cited 600 mg/42.9 mg per 5 mL suspension are not established below 3 months or above 40 kg. For 3 months to 12 years and ≤40 kg, the formulation-specific regimen must be followed.',
    notes: 'For the 600 mg/42.9 mg per 5 mL formulation, current DailyMed labeling specifies 90 mg/kg/day based on amoxicillin, divided every 12 hours for 10 days, providing 6.4 mg/kg/day clavulanic acid. Do not interchange formulations solely by calculated mL because their clavulanate exposure differs.'
  },
  sources: [
    { organization: 'DailyMed', title: 'Amoxicillin and Clavulanate Potassium 600 mg/42.9 mg per 5 mL Oral Suspension', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=6339bcdb-060f-4558-9f42-6bf7f935e138' },
    { organization: 'DailyMed', title: 'Amoxicillin and Clavulanate Potassium Oral Suspension', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=474c822b-dc3d-4a55-8159-2b4b799d535b' }
  ]
});
