/* DoseCare V2 — Lactulose oral solution
 * Sources cross-checked: 2026 ESPGHAN/NASPGHAN pediatric functional constipation guideline; NICE CG99; current DailyMed labeling.
 * Oral liquid only. Pediatric constipation dosing below is guideline-based; current DailyMed labeling for the selected lactulose product states pediatric safety/effectiveness have not been established.
 */
window.DoseCareV2Database?.register({
  id: 'lactulose',
  name: 'Lactulose',
  genericName: 'Lactulose',
  activeIngredient: 'Lactulose',
  dosageForm: 'Oral Solution',
  route: 'Oral',
  formulations: [
    { display: '10 g/15 mL (667 mg/mL)', concentration: { amount: 10, unit: 'g', volume: 15, volumeUnit: 'mL' }, mgPer5mL: 3333.33 }
  ],
  regimens: [
    {
      id: 'functional-constipation-neonate-7m',
      condition: 'Functional constipation — maintenance therapy',
      type: 'mg_per_kg_per_day',
      minDose: 350,
      maxDose: 700,
      unit: 'mg/kg/day',
      frequency: 1,
      alternativeFrequency: 2,
      frequencyText: 'Once daily or divided into 2 doses',
      requiresAge: true,
      requiresWeight: true,
      minAgeMonths: 0,
      maxAgeMonths: 6
    },
    {
      id: 'functional-constipation-7m-18y',
      condition: 'Functional constipation — maintenance therapy',
      type: 'mg_per_kg_per_day',
      minDose: 600,
      maxDose: 2000,
      unit: 'mg/kg/day',
      frequency: 1,
      alternativeFrequency: 2,
      frequencyText: 'Once daily or divided into 2 doses',
      requiresAge: true,
      requiresWeight: true,
      minAgeMonths: 7,
      maxAgeMonths: 216
    }
  ],
  information: {
    class: 'Osmotic laxative',
    mechanismOfAction: 'Lactulose is a synthetic disaccharide that is metabolized by colonic bacteria to low-molecular-weight acids, increasing osmotic water retention in the colon and promoting softer stools and colonic motility.',
    indications: ['Functional constipation'],
    contraindications: ['Intestinal obstruction or suspected gastrointestinal obstruction', 'Hypersensitivity to lactulose or formulation components'],
    adverseEffects: ['Flatulence', 'Abdominal cramps', 'Diarrhea', 'Nausea', 'Vomiting', 'Excessive diarrhea can cause fluid and electrolyte disturbances'],
    warningsPrecautions: ['Dose should be adjusted according to stool consistency and clinical response.', 'Reduce or discontinue if significant diarrhea develops.', 'Use cautiously in patients with electrolyte disturbances or conditions requiring strict electrolyte control.', 'Pediatric constipation dosing in DoseCare is guideline-based and should not be represented as established pediatric dosing from the selected DailyMed product label.'],
    interactions: ['Other laxatives may increase the risk of diarrhea and electrolyte disturbance.', 'Antacids may theoretically alter the laxative effect; clinical significance is uncertain.'],
    administration: 'Administer orally using an accurate measuring device. The solution may be mixed with water, milk, or fruit juice when appropriate.',
    pediatricUse: 'The 2026 ESPGHAN/NASPGHAN guideline lists lactulose at 350–700 mg/kg/day for neonates and infants through 7 months, and 0.6–2 g/kg/day for 7–18 years, given once daily or in 2 divided doses. DoseCare encodes the non-overlapping age boundaries as 0–6 months and 7–18 years. Current DailyMed labeling for the selected 10 g/15 mL product states that pediatric safety and effectiveness have not been established; therefore these DoseCare regimens are explicitly guideline-based rather than product-label pediatric dosing.',
    hepaticImpairment: 'Not applicable to the selected constipation regimen; lactulose has minimal systemic absorption.',
    notes: 'PEG is generally preferred first-line when available; lactulose is an established alternative/therapeutic option. This regimen is for functional constipation, not hepatic encephalopathy.',
    sources: [
      { organization: 'ESPGHAN / NASPGHAN', title: 'Guidelines for treatment of functional constipation in children aged 0–18 years (2026) — primary pediatric dosing source', url: 'https://onlinelibrary.wiley.com/doi/10.1002/jpn3.70447' },
      { organization: 'NICE', title: 'CG99 — Constipation in children and young people: diagnosis and management', url: 'https://www.nice.org.uk/guidance/cg99/chapter/Recommendations' },
      { organization: 'DailyMed', title: 'Lactulose Solution USP 10 g/15 mL — current labeling; pediatric safety/effectiveness not established', url: 'https://www.dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8b79d0d6-b9e3-436e-bab7-01451b6f45cd' }
    ]
  },
  sources: [
    { organization: 'ESPGHAN / NASPGHAN', title: 'Guidelines for treatment of functional constipation in children aged 0–18 years (2026) — primary pediatric dosing source', url: 'https://onlinelibrary.wiley.com/doi/10.1002/jpn3.70447' },
    { organization: 'NICE', title: 'CG99 — Constipation in children and young people: diagnosis and management', url: 'https://www.nice.org.uk/guidance/cg99/chapter/Recommendations' },
    { organization: 'DailyMed', title: 'Lactulose Solution USP 10 g/15 mL — current labeling; pediatric safety/effectiveness not established', url: 'https://www.dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8b79d0d6-b9e3-436e-bab7-01451b6f45cd' }
  ]
});
