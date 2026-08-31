window.DoseCareV2Database?.register({
  id: 'clarithromycin',
  name: 'Clarithromycin',
  genericName: 'Clarithromycin',
  dosageForm: 'Oral Suspension',
  category: 'Antibiotic',
  formulations: [
    { concentration: { amount: 125, unit: 'mg', volume: 5, volumeUnit: 'mL' }, display: '125 mg/5 mL' },
    { concentration: { amount: 250, unit: 'mg', volume: 5, volumeUnit: 'mL' }, display: '250 mg/5 mL' }
  ],
  regimens: [{
    id: 'standard-pediatric-15-mg-kg-day',
    condition: 'Standard susceptible bacterial infection',
    type: 'mg_per_kg_per_day',
    minDose: 15,
    maxDose: 15,
    doseUnit: 'mg/kg/day',
    frequency: 2,
    frequencyText: 'Every 12 hours for 10 days',
    minAgeMonths: 6,
    requiresWeight: true,
    requiresAge: true
  }],
  information: {
    mechanismOfAction: 'Macrolide antibacterial that inhibits bacterial protein synthesis by binding to the 50S ribosomal subunit.',
    indications: ['Acute otitis media', 'Pharyngitis/tonsillitis', 'Community-acquired pneumonia', 'Acute maxillary sinusitis', 'Uncomplicated skin and skin structure infections caused by susceptible organisms'],
    adverseEffects: ['Abdominal pain', 'Diarrhea', 'Nausea', 'Vomiting', 'Dysgeusia', 'Rash'],
    warningsPrecautions: ['Safety and effectiveness of the oral suspension have not been established in children younger than 6 months.', 'Clarithromycin can prolong the QT interval and should be avoided in patients with relevant QT-prolongation risk.', 'Important drug interactions occur because clarithromycin inhibits CYP3A; review concomitant medicines carefully.', 'Use only for proven or strongly suspected susceptible bacterial infections.'],
    sources: [
      { organization: 'DailyMed / U.S. National Library of Medicine', title: 'Clarithromycin for Oral Suspension — Prescribing Information', url: 'https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=22457862-0f88-4be8-b507-1c8f264269f2&type=display' },
      { organization: 'electronic Medicines Compendium (emc)', title: 'Clarithromycin 125 mg/5 mL Oral Suspension — SmPC', url: 'https://www.medicines.org.uk/emc/product/4360/smpc' },
      { organization: 'electronic Medicines Compendium (emc)', title: 'Clarithromycin 250 mg/5 mL Granules for Oral Suspension — SmPC', url: 'https://www.medicines.org.uk/emc/product/12807/smpc' },
      { organization: 'NHS', title: 'Clarithromycin — About and How It Works', url: 'https://www.nhs.uk/medicines/clarithromycin/about-clarithromycin/' }
    ]
  },
  sources: [
    { organization: 'DailyMed / U.S. National Library of Medicine', title: 'Clarithromycin for Oral Suspension — Prescribing Information', url: 'https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=22457862-0f88-4be8-b507-1c8f264269f2&type=display' },
    { organization: 'electronic Medicines Compendium (emc)', title: 'Clarithromycin 125 mg/5 mL Oral Suspension — SmPC', url: 'https://www.medicines.org.uk/emc/product/4360/smpc' },
    { organization: 'electronic Medicines Compendium (emc)', title: 'Clarithromycin 250 mg/5 mL Granules for Oral Suspension — SmPC', url: 'https://www.medicines.org.uk/emc/product/12807/smpc' },
    { organization: 'NHS', title: 'Clarithromycin — About and How It Works', url: 'https://www.nhs.uk/medicines/clarithromycin/about-clarithromycin/' }
  ]
});
