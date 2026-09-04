/* DoseCare V2 — Erythromycin ethylsuccinate oral suspension */
window.DoseCareV2Database?.register({
  id: 'erythromycin',
  name: 'Erythromycin',
  genericName: 'Erythromycin ethylsuccinate',
  activeIngredient: 'Erythromycin',
  dosageForm: 'Oral suspension',
  route: 'Oral',
  category: 'Antibiotic',
  formulations: [
    { display: '200 mg/5 mL', mgPer5mL: 200, concentration: { amount: 200, unit: 'mg', volume: 5, volumeUnit: 'mL' } },
    { display: '400 mg/5 mL', mgPer5mL: 400, concentration: { amount: 400, unit: 'mg', volume: 5, volumeUnit: 'mL' } }
  ],
  regimens: [
    {
      id: 'mild-moderate-infections', type: 'mg_per_kg_per_day', minDose: 30, maxDose: 50,
      doseUnit: 'mg/kg/day', frequency: 4, frequencyText: 'Every 6 hours',
      maximumDailyDose: 1600,
      condition: 'Mild to moderate susceptible bacterial infections',
      notes: 'The current label gives 30–50 mg/kg/day in equally divided doses every 6 hours. The labeled mild-to-moderate pediatric weight schedule reaches 1600 mg/day above 100 lb.'
    },
    {
      id: 'mild-moderate-infections-q8h', type: 'mg_per_kg_per_day', minDose: 30, maxDose: 50,
      doseUnit: 'mg/kg/day', frequency: 3, frequencyText: 'Every 8 hours',
      maximumDailyDose: 1600,
      condition: 'Mild to moderate susceptible bacterial infections',
      notes: 'Alternative administration schedule: one-third of the total daily dose every 8 hours.'
    },
    {
      id: 'mild-moderate-infections-q12h', type: 'mg_per_kg_per_day', minDose: 30, maxDose: 50,
      doseUnit: 'mg/kg/day', frequency: 2, frequencyText: 'Every 12 hours',
      maximumDailyDose: 1600,
      condition: 'Mild to moderate susceptible bacterial infections',
      notes: 'Alternative administration schedule: one-half of the total daily dose every 12 hours.'
    },
    {
      id: 'pertussis', type: 'mg_per_kg_per_day', minDose: 40, maxDose: 50,
      doseUnit: 'mg/kg/day', frequency: 4, frequencyText: 'Divided doses every 6 hours',
      condition: 'Pertussis (whooping cough)', durationDays: { min: 5, max: 14 },
      notes: 'The label states that optimal dose and duration have not been established; 40–50 mg/kg/day was used in reported clinical studies.'
    },
    {
      id: 'intestinal-amebiasis', type: 'mg_per_kg_per_day', minDose: 30, maxDose: 50,
      doseUnit: 'mg/kg/day', frequency: 4, frequencyText: 'Divided doses',
      condition: 'Intestinal amebiasis', durationDays: { min: 10, max: 14 },
      notes: 'Oral erythromycins only; extraintestinal amebiasis requires other agents.'
    }
  ],
  information: {
    class: 'Macrolide antibiotic',
    indications: [
      'Mild to moderate upper respiratory tract infections caused by susceptible organisms',
      'Mild to moderate lower respiratory tract infections caused by susceptible organisms',
      'Listeriosis',
      'Pertussis (whooping cough)',
      'Respiratory tract infections due to Mycoplasma pneumoniae',
      'Mild to moderate skin and skin-structure infections caused by susceptible organisms',
      'Diphtheria as an adjunct to antitoxin',
      'Erythrasma',
      'Intestinal amebiasis'
    ],
    mechanism: 'Macrolide antibacterial that inhibits bacterial protein synthesis by binding to the 50S ribosomal subunit.',
    precautions: [
      'Use only when infection is proven or strongly suspected to be caused by susceptible bacteria.',
      'Avoid in patients with known hypersensitivity to erythromycin.',
      'Erythromycin can prolong the QT interval and has been associated with torsades de pointes; avoid in patients with known QT prolongation, significant bradycardia, uncorrected hypokalemia or hypomagnesemia, and with specified class IA or class III antiarrhythmics.',
      'Oral erythromycin products can cause hepatic dysfunction, including hepatocellular or cholestatic hepatitis.',
      'Use caution in hepatic impairment because erythromycin is principally excreted by the liver.',
      'Important CYP3A4 and other drug interactions occur; the label contraindicates concomitant use with terfenadine, astemizole, pimozide, and cisapride, and with lovastatin or simvastatin.',
      'Antibiotic-associated diarrhea, including C. difficile-associated diarrhea, can occur.'
    ],
    adverseEffects: [
      'Nausea, vomiting, abdominal pain and diarrhea',
      'Hepatic dysfunction or cholestatic hepatitis',
      'Hypersensitivity reactions',
      'QT prolongation and ventricular arrhythmias including torsades de pointes',
      'Rare reversible hearing loss, particularly with high doses or renal impairment'
    ],
    notes: 'Erythromycin ethylsuccinate oral suspension may be administered without regard to meals. The current DailyMed labeling provides 200 mg/5 mL and 400 mg/5 mL oral suspensions. Pediatric dosing depends on age, weight and infection severity. More severe infections may require doubling the usual 30–50 mg/kg/day dose, but that higher regimen is deliberately not enabled as a generic calculator rule because the label does not provide a single universal pediatric maximum for that doubled regimen.',
    monitoring: ['Clinical response', 'GI tolerance', 'Liver function when clinically indicated', 'QT-risk and interacting medicines when clinically relevant']
  },
  sources: [
    { organization: 'DailyMed', title: 'Erythromycin Ethylsuccinate for Oral Suspension — current labeling', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1d9eb7cb-0b11-4f6e-8a9c-1bcff37fe0b5' },
    { organization: 'DailyMed', title: 'Ery-Ped — erythromycin ethylsuccinate suspension', url: 'https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=94b4658c-f4f5-4257-a1e3-82fd3155dee6' }
  ]
});
