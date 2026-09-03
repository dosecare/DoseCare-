/* DoseCare V2 — Azithromycin oral suspension */
window.DoseCareV2Database?.register({
  id: 'azithromycin',
  name: 'Azithromycin',
  genericName: 'Azithromycin',
  activeIngredient: 'Azithromycin',
  dosageForm: 'Oral suspension',
  route: 'Oral',
  category: 'Antibiotic',
  formulations: [
    { display: '100 mg/5 mL', mgPer5mL: 100, concentration: { amount: 100, unit: 'mg', volume: 5, volumeUnit: 'mL' } },
    { display: '200 mg/5 mL', mgPer5mL: 200, concentration: { amount: 200, unit: 'mg', volume: 5, volumeUnit: 'mL' } }
  ],
  regimens: [
    {
      id: 'aom-single-dose', type: 'mg_per_kg_single_dose', minDose: 30, maxDose: 30, doseUnit: 'mg/kg/dose', frequency: 1,
      frequencyText: 'Single dose', maximumDosePerAdministration: 1500, minAgeMonths: 6,
      condition: 'Acute otitis media'
    },
    {
      id: 'aom-3-day', type: 'condition_based', frequency: 1, frequencyText: 'Once daily for 3 days', minAgeMonths: 6,
      condition: 'Acute otitis media', schedule: [{ dayRange: 'Days 1–3', doseMgPerKg: 10, maxDoseMg: 500 }]
    },
    {
      id: 'aom-5-day', type: 'condition_based', frequency: 1, frequencyText: 'Once daily for 5 days', minAgeMonths: 6,
      condition: 'Acute otitis media', schedule: [
        { dayRange: 'Day 1', doseMgPerKg: 10, maxDoseMg: 500 },
        { dayRange: 'Days 2–5', doseMgPerKg: 5, maxDoseMg: 250 }
      ]
    },
    {
      id: 'sinusitis-3-day', type: 'mg_per_kg_per_day', minDose: 10, maxDose: 10, doseUnit: 'mg/kg/day', frequency: 1,
      frequencyText: 'Once daily for 3 days', minAgeMonths: 6, maximumDailyDose: 500,
      condition: 'Acute bacterial sinusitis'
    },
    {
      id: 'cap-5-day', type: 'condition_based', frequency: 1, frequencyText: 'Once daily for 5 days', minAgeMonths: 6,
      condition: 'Community-acquired pneumonia', schedule: [
        { dayRange: 'Day 1', doseMgPerKg: 10, maxDoseMg: 500 },
        { dayRange: 'Days 2–5', doseMgPerKg: 5, maxDoseMg: 250 }
      ]
    },
    {
      id: 'pharyngitis-5-day', type: 'mg_per_kg_per_day', minDose: 12, maxDose: 12, doseUnit: 'mg/kg/day', frequency: 1,
      frequencyText: 'Once daily for 5 days', minAgeYears: 2, maximumDailyDose: 500,
      condition: 'Pharyngitis / tonsillitis'
    }
  ],
  information: {
    class: 'Macrolide antibiotic',
    indications: ['Acute otitis media', 'Acute bacterial sinusitis', 'Community-acquired pneumonia', 'Pharyngitis / tonsillitis'],
    mechanism: 'Macrolide antibacterial that inhibits bacterial protein synthesis by binding to the 50S ribosomal subunit.',
    precautions: ['Use only for infections for which azithromycin is an appropriate antibacterial choice.', 'Consider QT-prolongation risk and relevant cardiac history or interacting medicines.', 'Discontinue and seek medical assessment if significant hepatic injury or severe hypersensitivity occurs.'],
    adverseEffects: ['Diarrhea, nausea, abdominal pain and vomiting may occur.', 'Hypersensitivity reactions can occur.', 'QT prolongation and serious arrhythmias are uncommon but clinically important risks.'],
    notes: 'Oral suspension is supplied as 100 mg/5 mL or 200 mg/5 mL after constitution. Shake well before each use. The cited label specifies age 6 months and above for otitis media, acute bacterial sinusitis and community-acquired pneumonia; pharyngitis/tonsillitis dosing is for age 2 years and above.'
  },
  sources: [
    { organization: 'DailyMed', title: 'Azithromycin for Oral Suspension — Pediatric Dosage Guidelines', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=99e5bd22-a721-4e2e-a46c-d61a53c25c3d' },
    { organization: 'DailyMed', title: 'Azithromycin Oral Suspension — Pediatric Dosage Tables and Concentrations', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3f7c7421-411d-c04e-e063-6394a90a4aa0' }
  ]
});
