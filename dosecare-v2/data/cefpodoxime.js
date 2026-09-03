/* DoseCare V2 — Cefpodoxime proxetil */
DoseCareV2Database.register({
  id: 'cefpodoxime',
  name: 'Cefpodoxime',
  genericName: 'Cefpodoxime proxetil',
  activeIngredient: 'Cefpodoxime',
  dosageForm: 'Oral suspension',
  route: 'Oral',
  formulations: [
    { display: '50 mg/5 mL', mgPer5mL: 50, concentration: { amount: 50, unit: 'mg', volume: 5, volumeUnit: 'mL' } },
    { display: '100 mg/5 mL', mgPer5mL: 100, concentration: { amount: 100, unit: 'mg', volume: 5, volumeUnit: 'mL' } }
  ],
  regimens: [
    { id: 'aom', condition: 'Acute otitis media', type: 'mg_per_kg_per_day', minDose: 10, maxDose: 10, doseUnit: 'mg/kg/day', frequency: 2, frequencyText: 'Every 12 hours', requiresAge: true, requiresWeight: true, minAgeMonths: 2, maximumDailyDose: 400, maximumDosePerAdministration: 200, durationDays: 5 },
    { id: 'pharyngitis', condition: 'Pharyngitis / tonsillitis', type: 'mg_per_kg_per_day', minDose: 10, maxDose: 10, doseUnit: 'mg/kg/day', frequency: 2, frequencyText: 'Every 12 hours', requiresAge: true, requiresWeight: true, minAgeMonths: 2, maximumDailyDose: 200, maximumDosePerAdministration: 100, durationDays: { min: 5, max: 10 } },
    { id: 'sinusitis', condition: 'Acute maxillary sinusitis', type: 'mg_per_kg_per_day', minDose: 10, maxDose: 10, doseUnit: 'mg/kg/day', frequency: 2, frequencyText: 'Every 12 hours', requiresAge: true, requiresWeight: true, minAgeMonths: 2, maximumDailyDose: 400, maximumDosePerAdministration: 200, durationDays: 10 }
  ],
  information: {
    class: 'Third-generation cephalosporin antibacterial',
    notes: 'Pediatric regimens encoded from the selected DailyMed prescribing information. Doses are expressed as cefpodoxime active moiety. Oral suspension may be given without regard to food. Renal impairment may require interval adjustment.'
  },
  sources: [
    { organization: 'DailyMed', title: 'Cefpodoxime Proxetil for Oral Suspension, USP', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=edf589b2-f796-4522-a5e6-2bd0a833922f' }
  ]
});
