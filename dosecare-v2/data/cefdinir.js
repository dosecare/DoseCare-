// DoseCare V2 — Cefdinir oral suspension
// Source: DailyMed cefdinir for oral suspension labels.
window.DoseCareV2Database?.register({
  id: 'cefdinir',
  name: 'Cefdinir',
  genericName: 'Cefdinir',
  dosageForm: 'Oral Suspension',
  formulations: [
    { display: '125 mg/5 mL', concentration: { amount: 125, unit: 'mg', volume: 5, volumeUnit: 'mL' } },
    { display: '250 mg/5 mL', concentration: { amount: 250, unit: 'mg', volume: 5, volumeUnit: 'mL' } }
  ],
  regimens: [
    { id: 'aom-q12h', condition: 'Acute bacterial otitis media', dose: 7, minDose: 7, maxDose: 7, unit: 'mg/kg/dose', frequencyText: 'Every 12 hours', duration: '5–10 days', minAgeMonths: 6, maxDailyDose: 600 },
    { id: 'aom-q24h', condition: 'Acute bacterial otitis media', dose: 14, minDose: 14, maxDose: 14, unit: 'mg/kg/day', frequencyText: 'Every 24 hours', duration: '10 days', minAgeMonths: 6, maxDailyDose: 600 },
    { id: 'sinus-q12h', condition: 'Acute maxillary sinusitis', dose: 7, minDose: 7, maxDose: 7, unit: 'mg/kg/dose', frequencyText: 'Every 12 hours', duration: '10 days', minAgeMonths: 6, maxDailyDose: 600 },
    { id: 'sinus-q24h', condition: 'Acute maxillary sinusitis', dose: 14, minDose: 14, maxDose: 14, unit: 'mg/kg/day', frequencyText: 'Every 24 hours', duration: '10 days', minAgeMonths: 6, maxDailyDose: 600 },
    { id: 'pharyngitis-q12h', condition: 'Pharyngitis / tonsillitis', dose: 7, minDose: 7, maxDose: 7, unit: 'mg/kg/dose', frequencyText: 'Every 12 hours', duration: '5–10 days', minAgeMonths: 6, maxDailyDose: 600 },
    { id: 'pharyngitis-q24h', condition: 'Pharyngitis / tonsillitis', dose: 14, minDose: 14, maxDose: 14, unit: 'mg/kg/day', frequencyText: 'Every 24 hours', duration: '10 days', minAgeMonths: 6, maxDailyDose: 600 },
    { id: 'skin-q12h', condition: 'Uncomplicated skin and skin-structure infection', dose: 7, minDose: 7, maxDose: 7, unit: 'mg/kg/dose', frequencyText: 'Every 12 hours', duration: '10 days', minAgeMonths: 6, maxDailyDose: 600 }
  ]
});