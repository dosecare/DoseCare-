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
  category: 'Antibiotics',
  formulations: [
    { id: '125mg-5mL', display: '125 mg/5 mL', dosageForm: 'Oral Suspension', concentration: { amount: 125, unit: 'mg', volume: 5, volumeUnit: 'mL' }, mgPer5mL: 125, mgPerMl: 25 },
    { id: '187mg-5mL', display: '187 mg/5 mL', dosageForm: 'Oral Suspension', concentration: { amount: 187, unit: 'mg', volume: 5, volumeUnit: 'mL' }, mgPer5mL: 187, mgPerMl: 37.4 },
    { id: '250mg-5mL', display: '250 mg/5 mL', dosageForm: 'Oral Suspension', concentration: { amount: 250, unit: 'mg', volume: 5, volumeUnit: 'mL' }, mgPer5mL: 250, mgPerMl: 50 },
    { id: '375mg-5mL', display: '375 mg/5 mL', dosageForm: 'Oral Suspension', concentration: { amount: 375, unit: 'mg', volume: 5, volumeUnit: 'mL' }, mgPer5mL: 375, mgPerMl: 75 }
  ],
  regimens: [
    {
      id: 'usual-infections-q8h', condition: 'Usual susceptible bacterial infections', type: 'mg_per_kg_per_day',
      minDose: 20, maxDose: 20, doseUnit: 'mg/kg/day', frequency: 3,
      frequencyText: 'Every 8 hours', requiresAge: true, requiresWeight: true, minAgeMonths: 1, maximumDailyDose: 1000,
      allowedFormulations: ['125mg-5mL', '250mg-5mL']
    },
    {
      id: 'serious-infections-otitis-q8h', condition: 'More serious infection / otitis media', type: 'mg_per_kg_per_day',
      minDose: 40, maxDose: 40, doseUnit: 'mg/kg/day', frequency: 3,
      frequencyText: 'Every 8 hours', requiresAge: true, requiresWeight: true, minAgeMonths: 1, maximumDailyDose: 1000,
      allowedFormulations: ['125mg-5mL', '250mg-5mL']
    },
    {
      id: 'pharyngitis-q12h', condition: 'Pharyngitis', type: 'mg_per_kg_per_day',
      minDose: 20, maxDose: 20, doseUnit: 'mg/kg/day', frequency: 2,
      frequencyText: 'Every 12 hours', requiresAge: true, requiresWeight: true, minAgeMonths: 1, maximumDailyDose: 1000,
      durationText: 'At least 10 days for beta-hemolytic streptococcal infection',
      allowedFormulations: ['187mg-5mL', '375mg-5mL']
    },
    {
      id: 'otitis-q12h', condition: 'Otitis media', type: 'mg_per_kg_per_day',
      minDose: 40, maxDose: 40, doseUnit: 'mg/kg/day', frequency: 2,
      frequencyText: 'Every 12 hours', requiresAge: true, requiresWeight: true, minAgeMonths: 1, maximumDailyDose: 1000,
      allowedFormulations: ['187mg-5mL', '375mg-5mL']
    }
  ],
  information: {
    class: 'Second-generation cephalosporin antibiotic',
    mechanism: 'Cefaclor inhibits bacterial cell-wall synthesis by binding to penicillin-binding proteins.',
    indications: ['Susceptible respiratory tract infections', 'Otitis media', 'Pharyngitis', 'Other susceptible bacterial infections'],
    contraindications: ['Serious hypersensitivity to cefaclor or cephalosporin antibiotics'],
    adverseEffects: ['Diarrhea', 'Nausea', 'Vomiting', 'Rash', 'Hypersensitivity reactions', 'Clostridioides difficile-associated diarrhea'],
    precautions: ['Use only for bacterial infections with an appropriate indication.', 'Assess beta-lactam allergy history before administration.', 'Cefaclor is substantially renally excreted; consider renal function when clinically appropriate.'],
    interactions: ['Probenecid can increase beta-lactam exposure.'],
    administration: 'Shake the oral suspension well before each dose and use an accurate metric measuring device. Follow the specific product storage instructions after reconstitution.',
    pediatricUse: 'DailyMed labeling recommends 20 mg/kg/day divided every 8 hours for usual pediatric infections and 40 mg/kg/day for more serious infections and otitis media, with a maximum of 1 g/day. For otitis media and pharyngitis, the total daily dose may be divided every 12 hours. Safety and effectiveness are not established in infants younger than 1 month.',
    maximumDose: 'Maximum pediatric dosage: 1 g/day.',
    notes: 'The selected DailyMed labeling includes 125, 187, 250 and 375 mg/5 mL suspension strengths. Some currently marketed labels list only selected strengths, so the formulation selector must remain tied to the available product strength.'
  },
  sources: [
    { organization: 'DailyMed', title: 'Cefaclor Suspension — pediatric dosage and maximum 1 g/day', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9e8890f0-e04a-4555-ac8d-d1b792a5c276' },
    { organization: 'DailyMed', title: 'Cefaclor Suspension — current 125/250 mg per 5 mL label', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=224af904-38f3-4210-a750-e21006db4c66' }
  ]
});
