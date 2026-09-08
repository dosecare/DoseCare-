/* DoseCare V2 — Cefpodoxime proxetil oral suspension */
DoseCareV2Database.register({
  id: 'cefpodoxime',
  name: 'Cefpodoxime',
  genericName: 'Cefpodoxime proxetil',
  activeIngredient: 'Cefpodoxime',
  dosageForm: 'Granules for Oral Suspension',
  route: 'Oral',
  formulations: [
    { id: '50mg-5mL', display: '50 mg/5 mL', concentration: { amount: 50, unit: 'mg', volume: 5, volumeUnit: 'mL' } },
    { id: '100mg-5mL', display: '100 mg/5 mL', concentration: { amount: 100, unit: 'mg', volume: 5, volumeUnit: 'mL' } }
  ],
  regimens: [
    { id: 'aom', condition: 'Acute otitis media', type: 'mg_per_kg_per_day', minDose: 10, maxDose: 10, doseUnit: 'mg/kg/day', frequency: 2, frequencyText: 'Every 12 hours', requiresAge: true, requiresWeight: true, minAgeMonths: 2, maxAgeYears: 12, maximumDailyDose: 400, maximumDosePerAdministration: 200, durationDays: 5, allowedFormulations:['50mg-5mL','100mg-5mL'] },
    { id: 'pharyngitis', condition: 'Pharyngitis / tonsillitis', type: 'mg_per_kg_per_day', minDose: 10, maxDose: 10, doseUnit: 'mg/kg/day', frequency: 2, frequencyText: 'Every 12 hours', requiresAge: true, requiresWeight: true, minAgeMonths: 2, maxAgeYears: 12, maximumDailyDose: 200, maximumDosePerAdministration: 100, durationDays: { min: 5, max: 10 }, allowedFormulations:['50mg-5mL','100mg-5mL'] },
    { id: 'sinusitis', condition: 'Acute maxillary sinusitis', type: 'mg_per_kg_per_day', minDose: 10, maxDose: 10, doseUnit: 'mg/kg/day', frequency: 2, frequencyText: 'Every 12 hours', requiresAge: true, requiresWeight: true, minAgeMonths: 2, maxAgeYears: 12, maximumDailyDose: 400, maximumDosePerAdministration: 200, durationDays: 10, allowedFormulations:['50mg-5mL','100mg-5mL'] }
  ],
  information: {
    class: 'Third-generation cephalosporin antibacterial',
    indications: ['Acute otitis media', 'Pharyngitis and/or tonsillitis', 'Acute maxillary sinusitis'],
    mechanism: 'Cefpodoxime is a beta-lactam antibacterial that inhibits bacterial cell-wall synthesis.',
    contraindications: ['Known serious hypersensitivity to cefpodoxime or cephalosporin antibiotics.'],
    precautions: ['Check for a history of serious hypersensitivity to cefpodoxime, cephalosporins, penicillins, or other beta-lactam antibacterials.', 'Dose regimens are based on cefpodoxime active moiety.', 'Severe renal impairment may require extending the dosing interval; DoseCare currently does not perform renal dose adjustment.', 'Antibiotic-associated diarrhea, including Clostridioides difficile-associated diarrhea, can occur.'],
    interactions: ['Antacids and H2-receptor antagonists may reduce cefpodoxime absorption by increasing gastric pH; follow product labeling when co-administering.', 'Probenecid may increase cefpodoxime exposure.'],
    adverseEffects: ['Diarrhea', 'Nausea', 'Vomiting', 'Abdominal discomfort', 'Rash', 'Hypersensitivity reactions'],
    administration: 'May be administered without regard to food. Shake the reconstituted suspension well before each dose and use an accurate measuring device. Follow the product-specific reconstitution and storage instructions.',
    pediatricUse: 'Pediatric labeling covers infants and children 2 months through 12 years. The labeled dose is 10 mg/kg/day divided every 12 hours, with indication-specific maximum daily and per-dose limits.',
    notes: 'The oral suspension is a granule-for-suspension product. Adult/adolescent regimens are intentionally excluded from this pediatric calculator scope.'
  },
  sources: [
    { organization: 'DailyMed', title: 'Cefpodoxime Proxetil granules for oral suspension — pediatric dosing', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=edf589b2-f796-4522-a5e6-2bd0a833922f' }
  ]
});
