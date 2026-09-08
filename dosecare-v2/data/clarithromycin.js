/* DoseCare V2 — Clarithromycin oral suspension */
window.DoseCareV2Database?.register({
  id: 'clarithromycin',
  name: 'Clarithromycin',
  genericName: 'Clarithromycin',
  activeIngredient: 'Clarithromycin',
  dosageForm: 'Granules for Oral Suspension',
  route: 'Oral',
  category: 'Antibiotic',
  formulations: [
    { id: '125mg-5mL', concentration: { amount: 125, unit: 'mg', volume: 5, volumeUnit: 'mL' }, display: '125 mg/5 mL' },
    { id: '250mg-5mL', concentration: { amount: 250, unit: 'mg', volume: 5, volumeUnit: 'mL' }, display: '250 mg/5 mL' }
  ],
  regimens: [
    {
      id: 'standard-pediatric-15-mg-kg-day', condition: 'Standard pediatric regimen', type: 'mg_per_kg_per_day',
      minDose: 15, maxDose: 15, doseUnit: 'mg/kg/day', frequency: 2,
      frequencyText: 'Every 12 hours for 10 days', minAgeMonths: 6,
      maximumDailyDose: 1000, maximumDosePerAdministration: 500,
      requiresWeight: true, requiresAge: true, allowedFormulations: ['125mg-5mL','250mg-5mL']
    },
    {
      id: 'mac-treatment-prophylaxis-pediatric', condition: 'Treatment or prophylaxis of disseminated Mycobacterium avium complex (MAC)',
      type: 'mg_per_kg_per_dose', minDose: 7.5, maxDose: 7.5, doseUnit: 'mg/kg/dose', frequency: 2,
      frequencyText: 'Every 12 hours; use with appropriate companion antimycobacterial therapy for MAC treatment',
      minAgeMonths: 20, maximumDosePerAdministration: 500,
      requiresWeight: true, requiresAge: true, allowedFormulations: ['125mg-5mL','250mg-5mL']
    }
  ],
  information: {
    class: 'Macrolide antibacterial',
    mechanism: 'Macrolide antibacterial that inhibits bacterial protein synthesis by binding to the 50S ribosomal subunit.',
    indications: ['Acute otitis media', 'Pharyngitis/tonsillitis', 'Community-acquired pneumonia', 'Acute maxillary sinusitis', 'Uncomplicated skin and skin-structure infections caused by susceptible organisms', 'Treatment or prophylaxis of disseminated Mycobacterium avium complex (MAC) infection in appropriate pediatric patients'],
    contraindications: ['Hypersensitivity to clarithromycin or other macrolides.', 'Concomitant use with contraindicated medicines listed in the product label, including cisapride, pimozide, certain ergot alkaloids, lurasidone, lomitapide, lovastatin, and simvastatin.', 'History of cholestatic jaundice/hepatic dysfunction associated with prior clarithromycin use.'],
    precautions: ['Safety and effectiveness of the oral suspension have not been established in children younger than 6 months for antibacterial indications; MAC prophylaxis safety has not been studied below 20 months.', 'Clarithromycin can prolong the QT interval; review cardiac risk factors and concomitant QT-prolonging medicines.', 'Clarithromycin is a strong CYP3A inhibitor and has clinically important drug interactions.', 'Dose reduction is required in severe renal impairment and in specified renal/atazanavir or ritonavir combinations.', 'Use only for proven or strongly suspected susceptible bacterial infections.'],
    interactions: ['Major CYP3A-mediated interactions; clinically important interactions include certain statins, antiarrhythmics, anticoagulants and immunosuppressants. Review the current product label before use.'],
    adverseEffects: ['Abdominal pain', 'Diarrhea', 'Nausea', 'Vomiting', 'Dysgeusia', 'Rash', 'QT prolongation and hepatotoxicity are important serious risks.'],
    pediatricUse: 'For antibacterial indications, the cited DailyMed label establishes oral-suspension safety and effectiveness in pediatric patients 6 months and older. For disseminated MAC treatment/prophylaxis, pediatric use is based on 7.5 mg/kg every 12 hours up to 500 mg every 12 hours, with prophylaxis safety not established below 20 months.',
    administration: 'May be given with or without food. Shake well before each use. After reconstitution, store at 15–30°C and use within 14 days; do not refrigerate according to the cited DailyMed product label.',
    notes: 'The suspension is supplied as granules requiring reconstitution. Available concentrations are 125 mg/5 mL and 250 mg/5 mL.'
  },
  sources: [
    { organization: 'DailyMed / U.S. National Library of Medicine', title: 'Clarithromycin for Oral Suspension — Prescribing Information', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=fad1e5a3-59f9-4868-9937-d3b061ab8f00' },
    { organization: 'DailyMed / U.S. National Library of Medicine', title: 'Clarithromycin for Suspension — Prescribing Information', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=22457862-0f88-4be8-b507-1c8f264269f2' }
  ]
});
