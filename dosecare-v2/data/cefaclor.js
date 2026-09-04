/* DoseCare V2 — Cefaclor oral suspension
 * Oral liquid only. Pediatric dosing is from DailyMed labeling.
 */
window.DoseCareV2Database?.register({
  id: 'cefaclor',
  name: 'Cefaclor',
  genericName: 'Cefaclor',
  activeIngredient: 'Cefaclor',
  dosageForm: 'Oral Suspension',
  route: 'Oral',
  formulations: [
    { display: '125 mg/5 mL', concentration: { amount: 125, unit: 'mg', volume: 5, volumeUnit: 'mL' }, mgPer5mL: 125 },
    { display: '250 mg/5 mL', concentration: { amount: 250, unit: 'mg', volume: 5, volumeUnit: 'mL' }, mgPer5mL: 250 }
  ],
  regimens: [
    {
      id: 'usual-infections-q8h', condition: 'Usual susceptible bacterial infections', type: 'mg_per_kg_per_day',
      minDose: 20, maxDose: 20, unit: 'mg/kg/day', frequency: 3,
      frequencyText: 'Every 8 hours', requiresAge: true, requiresWeight: true, maximumDailyDose: 1000
    },
    {
      id: 'serious-infections-otitis-q8h', condition: 'More serious infection / otitis media', type: 'mg_per_kg_per_day',
      minDose: 40, maxDose: 40, unit: 'mg/kg/day', frequency: 3,
      frequencyText: 'Every 8 hours', requiresAge: true, requiresWeight: true, maximumDailyDose: 1000
    },
    {
      id: 'pharyngitis-q12h', condition: 'Pharyngitis', type: 'mg_per_kg_per_day',
      minDose: 20, maxDose: 20, unit: 'mg/kg/day', frequency: 2,
      frequencyText: 'Every 12 hours', requiresAge: true, requiresWeight: true, maximumDailyDose: 1000,
      durationText: 'At least 10 days for beta-hemolytic streptococcal infection'
    },
    {
      id: 'otitis-q12h', condition: 'Otitis media', type: 'mg_per_kg_per_day',
      minDose: 40, maxDose: 40, unit: 'mg/kg/day', frequency: 2,
      frequencyText: 'Every 12 hours', requiresAge: true, requiresWeight: true, maximumDailyDose: 1000
    }
  ],
  information: {
    class: 'Second-generation cephalosporin antibiotic',
    mechanismOfAction: 'Cefaclor inhibits bacterial cell-wall synthesis by binding to penicillin-binding proteins.',
    indications: ['Susceptible respiratory tract infections', 'Otitis media', 'Pharyngitis', 'Other susceptible bacterial infections'],
    contraindications: ['Serious hypersensitivity to cefaclor or cephalosporin antibiotics'],
    adverseEffects: ['Diarrhea', 'Nausea', 'Vomiting', 'Rash', 'Hypersensitivity reactions', 'Clostridioides difficile-associated diarrhea'],
    warningsPrecautions: ['Use only for bacterial infections with an appropriate indication.', 'Assess beta-lactam allergy history before administration.', 'Adjust therapy appropriately in significant renal impairment when clinically indicated.'],
    interactions: ['Warfarin and other anticoagulants may require monitoring.', 'Probenecid can affect beta-lactam concentrations.'],
    administration: 'Shake the oral suspension well before each dose and use an accurate measuring device. Follow product storage instructions after reconstitution.',
    pediatricUse: 'DailyMed labeling recommends 20 mg/kg/day divided every 8 hours for usual pediatric infections and 40 mg/kg/day for more serious infections and otitis media, with a maximum of 1 g/day. For otitis media and pharyngitis, the total daily dose may be divided every 12 hours.',
    notes: 'Cefaclor is included as oral suspension only. The selected DailyMed labeling is older than some other DoseCare sources, so this medicine should be re-reviewed if a newer authoritative pediatric label becomes available.',
    sources: [
      { organization: 'DailyMed', title: 'Cefaclor Suspension — pediatric dosage and maximum 1 g/day', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9e8890f0-e04a-4555-ac8d-d1b792a5c276' }
    ]
  },
  sources: [
    { organization: 'DailyMed', title: 'Cefaclor Suspension — pediatric dosage and maximum 1 g/day', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9e8890f0-e04a-4555-ac8d-d1b792a5c276' }
  ]
});
