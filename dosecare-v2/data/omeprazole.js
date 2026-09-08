/* DoseCare V2 — Omeprazole oral suspension
 * Oral liquid only. Pediatric regimens are product-specific and indication-specific.
 * Formulation: 2 mg/mL powder for oral suspension after constitution.
 * Primary current formulation source: 2026 emc SmPC for Omeprazole 2 mg/mL oral suspension.
 */
window.DoseCareV2Database?.register({
  id: 'omeprazole',
  name: 'Omeprazole',
  genericName: 'Omeprazole',
  activeIngredient: 'Omeprazole',
  dosageForm: 'Powder for Oral Suspension',
  route: 'Oral',
  formulations: [
    { id: '2mg-1mL', display: '2 mg/mL after constitution', concentration: { amount: 2, unit: 'mg', volume: 1, volumeUnit: 'mL' }, mgPerMl: 2 }
  ],
  regimens: [
    {
      id: 'reflux-1m-1y-1mgkg',
      condition: 'Reflux oesophagitis / symptomatic GERD — children 1 month to <1 year',
      type: 'mg_per_kg_per_day',
      minDose: 1,
      maxDose: 1,
      doseUnit: 'mg/kg/day',
      frequency: 1,
      frequencyText: 'Once daily',
      requiresAge: true,
      requiresWeight: true,
      minAgeMonths: 1,
      maxAgeMonths: 11,
      maximumDailyDose: 10
    },
    {
      id: 'reflux-1y-10-20kg',
      condition: 'Reflux oesophagitis / symptomatic GERD — children ≥1 year, 10–20 kg',
      type: 'fixed_dose',
      dose: 10,
      minDose: 10,
      maxDose: 10,
      doseUnit: 'mg/day',
      frequency: 1,
      frequencyText: 'Once daily; may be increased to 20 mg once daily if needed',
      requiresAge: true,
      requiresWeight: true,
      minAgeYears: 1,
      minWeightKg: 10,
      maxWeightKg: 20,
      maximumDailyDose: 15,
      alternativeDose: 20,
      alternativeDoseUnit: 'mg/day',
      alternativeNote: '20 mg/day requires a higher-strength omeprazole formulation; this 2 mg/mL product is limited to 15 mg/day.'
    }
  ],
  information: {
    class: 'Proton pump inhibitor (PPI)',
    mechanism: 'Omeprazole inhibits the gastric H+/K+-ATPase proton pump in gastric parietal cells, suppressing the final step of gastric acid secretion.',
    indications: ['Treatment of reflux oesophagitis in children over 1 month of age', 'Symptomatic treatment of heartburn and acid regurgitation in gastro-oesophageal reflux disease in children over 1 month of age'],
    contraindications: ['Hypersensitivity to omeprazole, substituted benzimidazoles, or formulation excipients', 'Concomitant use with rilpivirine-containing medicines where contraindicated by product labeling'],
    adverseEffects: ['Headache', 'Abdominal pain', 'Diarrhea', 'Constipation', 'Nausea', 'Vomiting', 'Flatulence', 'Long-term PPI therapy may be associated with gastrointestinal infections and other clinically relevant effects'],
    precautions: ['Reassess prolonged therapy periodically.', 'PPI treatment can slightly increase susceptibility to gastrointestinal infections such as Salmonella and Campylobacter.', 'Use with attention to the product sodium and potassium content, particularly in patients with renal impairment or controlled electrolyte intake.', 'Do not use this formulation to administer doses above 15 mg/day; use an appropriate higher-strength formulation instead.'],
    interactions: ['Omeprazole can alter absorption of medicines whose absorption is pH-dependent.', 'CYP2C19-mediated interactions can occur with some medicines.', 'Check the current product information for clinically important interactions before use.'],
    administration: 'The constituted suspension should be administered orally using the supplied or an accurate oral syringe. Take on an empty stomach at least 30 minutes before a meal. Reconstitution must be performed according to the product instructions before dispensing/administration.',
    pediatricUse: 'The current 2 mg/mL SmPC specifies 1 mg/kg once daily for children 1 month to 1 year (maximum 10 mg/day), and 10 mg once daily for children ≥1 year weighing 10–20 kg with possible increase to 20 mg using an appropriate higher-strength formulation. This 2 mg/mL product itself is limited to a maximum of 15 mg/day, so the 20 mg regimen is not represented as calculable with this formulation.',
    hepaticImpairment: 'The selected SmPC states that dose adjustment is not needed in hepatic impairment.',
    renalImpairment: 'The selected SmPC states that dose adjustment is not needed in renal impairment.',
    notes: 'This entry represents a specific 2 mg/mL powder-for-oral-suspension product. Higher labeled doses require another omeprazole strength/formulation and are not converted using this formulation.'
  },
  sources: [
    { organization: 'emc / Rosemont Pharmaceuticals', title: 'Omeprazole 2 mg/ml, Powder for Oral Suspension — SmPC, updated 17 April 2026', url: 'https://www.medicines.org.uk/emc/product/11031/smpc' },
    { organization: 'emc / Rosemont Pharmaceuticals', title: 'Omeprazole 4 mg/ml, Powder for Oral Suspension — SmPC', url: 'https://www.medicines.org.uk/emc/product/11032/smpc' },
    { organization: 'NICE', title: 'Gastro-oesophageal reflux disease in children and young people: diagnosis and management', url: 'https://www.nice.org.uk/guidance/ng1/chapter/Recommendations' }
  ]
});
