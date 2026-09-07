/* DoseCare V2 — Prednisolone oral solution
 * Sources cross-checked: current DailyMed oral-solution labeling; GINA 2026; BTS/NICE/SIGN pediatric acute-asthma guidance.
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
    { id: '15-5', display: '15 mg/5 mL (3 mg/mL)', concentration: { amount: 15, unit: 'mg', volume: 5, volumeUnit: 'mL' }, mgPer5mL: 15 }
  ],
  regimens: [
    {
      id: 'acute-asthma-2-5y',
      condition: 'Acute asthma exacerbation',
      type: 'mg_per_kg_per_day',
      minDose: 1,
      maxDose: 2,
      unit: 'mg/kg/day',
      frequency: 1,
      frequencyText: 'Once daily',
      requiresAge: true,
      requiresWeight: true,
      minAgeYears: 2,
      maxAgeYears: 5,
      maximumDailyDose: 30,
      durationText: 'Usually up to 5 days; follow clinical response and the applicable guideline.'
    },
    {
      id: 'acute-asthma-6-11y',
      condition: 'Acute asthma exacerbation',
      type: 'mg_per_kg_per_day',
      minDose: 1,
      maxDose: 2,
      unit: 'mg/kg/day',
      frequency: 1,
      frequencyText: 'Once daily',
      requiresAge: true,
      requiresWeight: true,
      minAgeYears: 6,
      maxAgeYears: 11,
      maximumDailyDose: 40,
      durationText: 'Usually 3–5 days; follow clinical response and the applicable guideline.'
    },
    {
      id: 'acute-asthma-12-18y',
      condition: 'Acute asthma exacerbation',
      type: 'fixed_dose',
      minDose: 30,
      maxDose: 40,
      unit: 'mg/day',
      frequency: 1,
      frequencyText: 'Once daily',
      requiresAge: true,
      requiresWeight: false,
      minAgeYears: 12,
      maxAgeYears: 18,
      durationText: 'Usually 3–5 days; continue until recovery according to clinical response and local guidance.'
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
    administration: 'Administer orally using a calibrated oral syringe or other accurate measuring device. For acute asthma, the duration should follow the applicable pediatric asthma guideline and clinical response.',
    pediatricUse: 'For children 2–5 years with moderate or severe acute asthma exacerbation, GINA 2026 recommends oral prednisone/prednisolone 1–2 mg/kg/day with a maximum of 30 mg/day. For children 6–11 years, GINA 2026 recommends 1–2 mg/kg/day with a maximum of 40 mg/day, usually for 3–5 days. For children older than 5 years, BTS/NICE/SIGN guidance supports 30–40 mg orally once daily.',
    hepaticImpairment: 'Use cautiously; systemic corticosteroid exposure and effects may be altered in hepatic impairment.',
    notes: 'DoseCare encodes acute-asthma systemic corticosteroid regimens only. Other prednisolone indications require condition-specific dosing and are not extrapolated into this calculator.',
    sources: [
      { organization: 'DailyMed', title: 'Prednisolone Oral Solution USP 15 mg/5 mL — current labeling', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4f83514d-5342-4748-a0d3-b0306ca303c8' },
      { organization: 'GINA', title: 'GINA 2026 Strategy Report — acute asthma and wheezing in children 5 years and younger; children 6–11 years', url: 'https://ginasthma.org/wp-content/uploads/2026/05/GINA-2026-Strategy-Report-WMS.pdf' },
      { organization: 'Healthcare Improvement Scotland / BTS-NICE-SIGN', title: 'Initial treatment of acute asthma in children', url: 'https://www.rightdecisions.scot.nhs.uk/asthma-pathway-bts-nice-sign-sign-244/managing-acute-asthma/management-of-acute-asthma-in-children/initial-treatment-of-acute-asthma-in-children/' }
    ]
  },
  sources: [
    { organization: 'DailyMed', title: 'Prednisolone Oral Solution USP 15 mg/5 mL — current labeling', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4f83514d-5342-4748-a0d3-b0306ca303c8' },
    { organization: 'GINA', title: 'GINA 2026 Strategy Report — acute asthma and wheezing in children 5 years and younger; children 6–11 years', url: 'https://ginasthma.org/wp-content/uploads/2026/05/GINA-2026-Strategy-Report-WMS.pdf' },
    { organization: 'Healthcare Improvement Scotland / BTS-NICE-SIGN', title: 'Initial treatment of acute asthma in children', url: 'https://www.rightdecisions.scot.nhs.uk/asthma-pathway-bts-nice-sign-sign-244/managing-acute-asthma/management-of-acute-asthma-in-children/initial-treatment-of-acute-asthma-in-children/' }
  ]
});
