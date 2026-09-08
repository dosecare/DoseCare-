/* DoseCare V2 — Cefprozil oral suspension */
window.DoseCareV2Database?.register({
  id: 'cefprozil',
  name: 'Cefprozil',
  genericName: 'Cefprozil',
  activeIngredient: 'Cefprozil',
  dosageForm: 'Oral Suspension',
  route: 'Oral',
  category: 'Antibiotics',
  formulations: [
    { id: '125mg-5mL', dosageForm: 'Oral Suspension', concentration: { amount: 125, unit: 'mg', volume: 5, volumeUnit: 'mL' }, display: '125 mg/5 mL', mgPer5mL: 125, mgPerMl: 25 },
    { id: '250mg-5mL', dosageForm: 'Oral Suspension', concentration: { amount: 250, unit: 'mg', volume: 5, volumeUnit: 'mL' }, display: '250 mg/5 mL', mgPer5mL: 250, mgPerMl: 50 }
  ],
  regimens: [
    { id: 'pharyngitis-tonsillitis-7-5-mg-kg-q12h', condition: 'Pharyngitis / tonsillitis', type: 'mg_per_kg_per_dose', minDose: 7.5, maxDose: 7.5, doseUnit: 'mg/kg/dose', frequency: 2, frequencyText: 'Every 12 hours for 10 days', minAgeYears: 2, maxAgeYears: 12, maximumDailyDose: 500, requiresWeight: true, requiresAge: true, allowedFormulations: ['125mg-5mL', '250mg-5mL'] },
    { id: 'skin-infection-20-mg-kg-day', condition: 'Uncomplicated skin and skin-structure infection', type: 'mg_per_kg_per_day', minDose: 20, maxDose: 20, doseUnit: 'mg/kg/day', frequency: 1, frequencyText: 'Once daily for 10 days', minAgeYears: 2, maxAgeYears: 12, maximumDailyDose: 500, requiresWeight: true, requiresAge: true, allowedFormulations: ['125mg-5mL', '250mg-5mL'] },
    { id: 'otitis-media-15-mg-kg-q12h', condition: 'Acute otitis media', type: 'mg_per_kg_per_dose', minDose: 15, maxDose: 15, doseUnit: 'mg/kg/dose', frequency: 2, frequencyText: 'Every 12 hours for 10 days', minAgeMonths: 6, maxAgeYears: 12, maximumDailyDose: 1000, requiresWeight: true, requiresAge: true, allowedFormulations: ['125mg-5mL', '250mg-5mL'] },
    { id: 'acute-sinusitis-7-5-mg-kg-q12h', condition: 'Acute sinusitis — standard dose', type: 'mg_per_kg_per_dose', minDose: 7.5, maxDose: 7.5, doseUnit: 'mg/kg/dose', frequency: 2, frequencyText: 'Every 12 hours for 10 days', minAgeMonths: 6, maxAgeYears: 12, maximumDailyDose: 1000, requiresWeight: true, requiresAge: true, allowedFormulations: ['125mg-5mL', '250mg-5mL'] },
    { id: 'acute-sinusitis-15-mg-kg-q12h', condition: 'Acute sinusitis — higher dose', type: 'mg_per_kg_per_dose', minDose: 15, maxDose: 15, doseUnit: 'mg/kg/dose', frequency: 2, frequencyText: 'Every 12 hours for 10 days', minAgeMonths: 6, maxAgeYears: 12, maximumDailyDose: 1000, requiresWeight: true, requiresAge: true, allowedFormulations: ['125mg-5mL', '250mg-5mL'] }
  ],
  information: {
    class: 'Second-generation cephalosporin antibacterial',
    mechanism: 'Semi-synthetic cephalosporin antibacterial that inhibits bacterial cell-wall synthesis.',
    indications: ['Pharyngitis and tonsillitis', 'Acute otitis media', 'Acute sinusitis', 'Uncomplicated skin and skin-structure infections'],
    contraindications: ['Known allergy to the cephalosporin class of antibiotics.'],
    adverseEffects: ['Diarrhea', 'Nausea', 'Vomiting', 'Abdominal pain', 'Rash', 'Urticaria', 'Hypersensitivity reactions', 'Rarely, C. difficile-associated diarrhea/colitis and severe cutaneous or hematologic reactions.'],
    precautions: [
      'Use caution in patients with a history of penicillin or other beta-lactam hypersensitivity because cross-sensitivity may occur.',
      'Reduce the total daily dose in severe renal impairment (creatinine clearance 0–29 mL/min) to 50% of the standard dose; use standard dosing when creatinine clearance is 30–120 mL/min.',
      'No dosage adjustment is necessary for hepatic impairment according to the label.',
      'Consider C. difficile-associated diarrhea in patients with significant or persistent diarrhea during or after therapy.',
      'Use only for proven or strongly suspected susceptible bacterial infections to reduce antimicrobial resistance.',
      'Prolonged use may result in overgrowth of nonsusceptible organisms or superinfection.'
    ],
    interactions: [
      'Aminoglycosides: concomitant administration with cephalosporins has been associated with nephrotoxicity.',
      'Probenecid: doubles cefprozil exposure (AUC).',
      'Cephalosporins may cause false-positive urine glucose tests using copper-reduction methods.'
    ],
    administration: 'Administer orally. Cefprozil oral suspension is available as 125 mg/5 mL and 250 mg/5 mL. For Streptococcus pyogenes pharyngitis/tonsillitis, treatment should be given for at least 10 days. Use an appropriate metric measuring device.',
    pediatricUse: 'Safety and effectiveness are established for otitis media and acute sinusitis from 6 months to 12 years, and for pharyngitis/tonsillitis and uncomplicated skin/skin-structure infections from 2 to 12 years. Safety and effectiveness below these age thresholds have not been established for the corresponding indications.',
    maximumDose: 'Do not exceed recommended adult doses. Pediatric regimens in the label are limited by the corresponding adult maximums; duration is generally 10 days for the listed pediatric indications.',
    notes: 'The current label was updated May 4, 2026. For acute sinusitis, the higher 15 mg/kg every 12 hours dose is intended for moderate to severe infections.'
  },
  sources: [
    { organization: 'DailyMed / U.S. National Library of Medicine', title: 'Cefprozil for oral suspension — current labeling, updated May 4, 2026', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=800a2ec0-4798-4423-9613-d03024cf1f0e' },
    { organization: 'U.S. Food and Drug Administration', title: 'Cefprozil — Oral products', url: 'https://www.fda.gov/drugs/development-resources/cefprozil-oral-products' }
  ]
});
