/* DoseCare V2 — Clarithromycin oral suspension */
window.DoseCareV2Database?.register({
  id: 'clarithromycin',
  name: 'Clarithromycin',
  genericName: 'Clarithromycin',
  activeIngredient: 'Clarithromycin',
  dosageForm: 'Oral Suspension',
  route: 'Oral',
  formulations: [
    { concentration: { amount: 125, unit: 'mg', volume: 5, volumeUnit: 'mL' }, display: '125 mg/5 mL', mgPer5mL: 125 },
    { concentration: { amount: 250, unit: 'mg', volume: 5, volumeUnit: 'mL' }, display: '250 mg/5 mL', mgPer5mL: 250 }
  ],
  regimens: [
    {
      id: 'standard-pediatric-15-mg-kg-day',
      condition: 'Standard pediatric regimen',
      type: 'mg_per_kg_per_day',
      minDose: 15,
      maxDose: 15,
      doseUnit: 'mg/kg/day',
      frequency: 2,
      frequencyText: 'Every 12 hours for 10 days',
      minAgeMonths: 6,
      maximumDailyDose: 1000,
      maximumDosePerAdministration: 500,
      requiresWeight: true,
      requiresAge: true
    }
  ],
  information: {
    class: 'Macrolide antibacterial',
    mechanism: 'Macrolide antibacterial that inhibits bacterial protein synthesis by binding to the 50S ribosomal subunit.',
    indications: ['Acute otitis media', 'Pharyngitis/tonsillitis', 'Community-acquired pneumonia', 'Acute maxillary sinusitis', 'Uncomplicated skin and skin-structure infections caused by susceptible organisms'],
    contraindications: ['Hypersensitivity to clarithromycin or other macrolides', 'Selected serious drug interactions and contraindicated concomitant medicines according to product labeling'],
    adverseEffects: ['Abdominal pain', 'Diarrhea', 'Nausea', 'Vomiting', 'Dysgeusia', 'Rash'],
    precautions: ['Safety and effectiveness of the oral suspension have not been established in children younger than 6 months in the selected label.', 'Clarithromycin can prolong the QT interval; review cardiac risk factors and concomitant QT-prolonging medicines.', 'Clarithromycin is a strong CYP3A inhibitor and has clinically important drug interactions.', 'Use only for proven or strongly suspected susceptible bacterial infections.'],
    pediatricUse: 'The selected DailyMed pediatric regimen is 15 mg/kg/day divided every 12 hours for 10 days, up to the adult dose. The oral suspension strengths are 125 mg/5 mL and 250 mg/5 mL.',
    administration: 'May be given with or without food. Shake the oral suspension as directed on the product label.'
  },
  sources: [
    { organization: 'DailyMed / U.S. National Library of Medicine', title: 'Clarithromycin for Oral Suspension — Prescribing Information', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=22457862-0f88-4be8-b507-1c8f264269f2' },
    { organization: 'electronic Medicines Compendium (emc)', title: 'Clarithromycin 125 mg/5 mL Oral Suspension — SmPC', url: 'https://www.medicines.org.uk/emc/product/4360/smpc' },
    { organization: 'electronic Medicines Compendium (emc)', title: 'Clarithromycin 250 mg/5 mL Granules for Oral Suspension — SmPC', url: 'https://www.medicines.org.uk/emc/product/12807/smpc' }
  ]
});
