/* DoseCare V2 — Amoxicillin
 * Pediatric oral-suspension regimens based on current DailyMed prescribing information.
 */
DoseCareV2Database.register({
  id: 'amoxicillin',
  name: 'Amoxicillin',
  genericName: 'Amoxicillin',
  activeIngredient: 'Amoxicillin',
  dosageForm: 'Oral suspension',
  route: 'Oral',
  category: 'Antibacterial / Aminopenicillin',
  formulations: [
    {
      id: 'amoxicillin-400mg-5ml',
      display: 'Amoxicillin 400 mg/5 mL oral suspension',
      concentration: { amount: 400, unit: 'mg', volume: 5, volumeUnit: 'mL' }
    }
  ],
  regimens: [
    {
      id: 'ent-mild-q12h', condition: 'Ear/Nose/Throat — Mild/Moderate — every 12 hours',
      type: 'mg_per_kg_per_day', minDose: 25, maxDose: 25, frequency: 2,
      frequencyText: 'Every 12 hours', requiresAge: true, requiresWeight: true,
      minAgeMonths: 3, maxWeightKg: 39.9,
      allowedFormulations: ['amoxicillin-400mg-5ml']
    },
    {
      id: 'ent-mild-q8h', condition: 'Ear/Nose/Throat — Mild/Moderate — every 8 hours',
      type: 'mg_per_kg_per_day', minDose: 20, maxDose: 20, frequency: 3,
      frequencyText: 'Every 8 hours', requiresAge: true, requiresWeight: true,
      minAgeMonths: 3, maxWeightKg: 39.9,
      allowedFormulations: ['amoxicillin-400mg-5ml']
    },
    {
      id: 'ent-severe-q12h', condition: 'Ear/Nose/Throat — Severe — every 12 hours',
      type: 'mg_per_kg_per_day', minDose: 45, maxDose: 45, frequency: 2,
      frequencyText: 'Every 12 hours', requiresAge: true, requiresWeight: true,
      minAgeMonths: 3, maxWeightKg: 39.9,
      allowedFormulations: ['amoxicillin-400mg-5ml']
    },
    {
      id: 'ent-severe-q8h', condition: 'Ear/Nose/Throat — Severe — every 8 hours',
      type: 'mg_per_kg_per_day', minDose: 40, maxDose: 40, frequency: 3,
      frequencyText: 'Every 8 hours', requiresAge: true, requiresWeight: true,
      minAgeMonths: 3, maxWeightKg: 39.9,
      allowedFormulations: ['amoxicillin-400mg-5ml']
    },
    {
      id: 'lrt-q12h', condition: 'Lower Respiratory Tract — Mild/Moderate or Severe — every 12 hours',
      type: 'mg_per_kg_per_day', minDose: 45, maxDose: 45, frequency: 2,
      frequencyText: 'Every 12 hours', requiresAge: true, requiresWeight: true,
      minAgeMonths: 3, maxWeightKg: 39.9,
      allowedFormulations: ['amoxicillin-400mg-5ml']
    },
    {
      id: 'lrt-q8h', condition: 'Lower Respiratory Tract — Mild/Moderate or Severe — every 8 hours',
      type: 'mg_per_kg_per_day', minDose: 40, maxDose: 40, frequency: 3,
      frequencyText: 'Every 8 hours', requiresAge: true, requiresWeight: true,
      minAgeMonths: 3, maxWeightKg: 39.9,
      allowedFormulations: ['amoxicillin-400mg-5ml']
    }
  ],
  information: {
    class: 'Aminopenicillin antibacterial',
    indications: [
      'Treatment of susceptible bacterial infections when the selected labeled regimen is appropriate, including ear/nose/throat, lower respiratory tract, skin/skin structure, and genitourinary infections.'
    ],
    mechanism: 'Beta-lactam antibacterial that inhibits bacterial cell-wall synthesis by binding penicillin-binding proteins.',
    contraindications: [
      'History of serious hypersensitivity reaction such as anaphylaxis or Stevens-Johnson syndrome to amoxicillin or another beta-lactam antibacterial.'
    ],
    precautions: [
      'Use only when the selected regimen is appropriate for the suspected or confirmed bacterial infection.',
      'Severe renal impairment requires dose adjustment according to prescribing information.',
      'Monitor for serious hypersensitivity reactions and clinically significant antibiotic-associated diarrhea.'
    ],
    adverseEffects: [
      'Diarrhea',
      'Nausea',
      'Skin rash',
      'Hypersensitivity reactions including anaphylaxis',
      'Antibiotic-associated colitis'
    ],
    interactions: [
      'Probenecid may increase and prolong amoxicillin blood concentrations.',
      'Oral anticoagulants may require monitoring because prothrombin time changes have been reported with beta-lactam antibacterials.'
    ],
    administration: [
      'Oral suspension may be administered without regard to meals; the 400 mg/5 mL suspension has been studied when administered at the start of a light meal.',
      'Shake the oral suspension well before each dose and measure with an appropriate oral dosing device.'
    ],
    pediatricUse: [
      'The selected pediatric regimens apply to children older than 3 months and weighing less than 40 kg.',
      'For infants aged 3 months or younger, the selected DailyMed labeling gives a separate upper dose of 30 mg/kg/day divided every 12 hours; this is intentionally not encoded here because DoseCare V2 is using the >3-month regimen set for this record.',
      'Children weighing 40 kg or more should be dosed according to adult recommendations rather than the pediatric weight-based regimens encoded here.',
      'Treatment for Streptococcus pyogenes infections should be at least 10 days according to the prescribing information.'
    ],
    notes: 'The pediatric calculator record is intentionally limited to the 400 mg/5 mL oral suspension and labeled pediatric regimens for patients >3 months and <40 kg. DoseCare does not extrapolate these regimens to infants ≤3 months or patients ≥40 kg.'
  },
  sources: [
    {
      organization: 'DailyMed',
      title: 'Amoxicillin for Oral Suspension — 400 mg/5 mL',
      url: 'https://www.dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=575f97d5-ea44-481f-977d-7a28300b2a5f'
    },
    {
      organization: 'DailyMed',
      title: 'Amoxicillin for Oral Suspension — Prescribing Information',
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1b9c0a98-2a31-4b23-ac4f-7c3f14b6f92f'
    }
  ]
});
