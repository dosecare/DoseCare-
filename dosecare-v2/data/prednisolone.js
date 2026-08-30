/* DoseCare V2 — Prednisolone oral solution
 * Sources cross-checked: current DailyMed oral-solution labeling; GINA pediatric asthma guidance; NHS/BTS-SIGN pediatric acute-asthma guidance.
 * Oral liquid only.
 */
window.DoseCareV2Database?.register({
  id: 'prednisolone',
  name: 'Prednisolone',
  genericName: 'Prednisolone',
  activeIngredient: 'Prednisolone',
  dosageForm: 'Oral Solution',
  route: 'Oral',
  formulations: [
    { display: '15 mg/5 mL (3 mg/mL)', concentration: { amount: 15, unit: 'mg', volume: 5, volumeUnit: 'mL' }, mgPer5mL: 15 }
  ],
  regimens: [
    {
      id: 'acute-asthma-2y-plus',
      condition: 'Acute asthma exacerbation',
      type: 'mg_per_kg_per_day',
      minDose: 1,
      maxDose: 2,
      unit: 'mg/kg/day',
      frequency: 1,
      frequencyText: 'Every 24 hours',
      requiresAge: true,
      requiresWeight: true,
      minAgeYears: 2,
      maximumDailyDose: 40
    }
  ],
  information: {
    class: 'Systemic glucocorticoid (corticosteroid)',
    mechanism: 'Prednisolone binds intracellular glucocorticoid receptors and alters gene transcription, producing anti-inflammatory and immunosuppressive effects.',
    mechanismOfAction: 'Glucocorticoid receptor agonist that suppresses multiple inflammatory pathways and reduces airway inflammation.',
    indications: ['Systemic inflammatory and immune-mediated disorders', 'Acute asthma exacerbations requiring systemic corticosteroid treatment'],
    contraindications: ['Systemic fungal infections', 'Hypersensitivity to prednisolone or formulation components'],
    adverseEffects: ['Increased appetite', 'Mood or sleep disturbance', 'Fluid retention and blood-pressure elevation', 'Hyperglycemia', 'Increased infection risk', 'With prolonged therapy: growth suppression, osteoporosis, cataracts/glaucoma and adrenal suppression'],
    warningsPrecautions: ['Corticosteroids can suppress immunity, worsen or mask infections.', 'Use caution with varicella/measles exposure, tuberculosis, Strongyloides and other serious infections.', 'Prolonged therapy can suppress the hypothalamic-pituitary-adrenal axis; abrupt withdrawal after prolonged treatment can be unsafe.', 'Monitor growth and development in children receiving prolonged corticosteroid therapy.'],
    interactions: ['Live or live-attenuated vaccines may present increased risk during immunosuppressive corticosteroid therapy.', 'NSAIDs may increase gastrointestinal adverse-effect risk.', 'CYP3A4 inhibitors/inducers can alter corticosteroid exposure.'],
    administration: 'Administer orally using a calibrated oral syringe or other accurate measuring device. Short courses for acute asthma generally do not require tapering; prolonged therapy requires clinician-directed dose reduction.',
    pediatricUse: 'For acute asthma exacerbation, pediatric guidelines support oral prednisolone 1–2 mg/kg/day with a maximum of 40 mg/day in children 2 years and older in the selected regimen. The exact course duration depends on clinical response and guideline/product context.',
    hepaticImpairment: 'Use cautiously; systemic corticosteroid exposure and effects may be altered in hepatic impairment.',
    notes: 'DoseCare V1 encodes the acute-asthma regimen only. Other prednisolone indications require condition-specific dosing and are not extrapolated into this regimen.',
    sources: [
      { organization: 'DailyMed', title: 'Prednisolone Oral Solution USP 15 mg/5 mL — current labeling', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=757b41c4-a0fe-4a09-8816-a4cdb7558f41' },
      { organization: 'GINA', title: 'Management of asthma exacerbations in children 5 years and younger', url: 'https://ginasthma.org/wp-content/uploads/2023/05/GINA-Main-report-2023_tracked-v-2022_202305_03-WMSA.pdf' },
      { organization: 'Healthcare Improvement Scotland / BTS-SIGN pathway', title: 'Initial treatment of acute asthma in children', url: 'https://www.rightdecisions.scot.nhs.uk/asthma-pathway-bts-nice-sign-sign-244/managing-acute-asthma/management-of-acute-asthma-in-children/initial-treatment-of-acute-asthma-in-children/' }
    ]
  }
});
