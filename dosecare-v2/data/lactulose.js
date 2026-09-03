/* DoseCare V2 — Lactulose oral solution
 * Sources cross-checked: current DailyMed lactulose solution labeling; 2026 ESPGHAN/NASPGHAN pediatric functional constipation guideline; NICE CG99.
 * Oral liquid only. DoseCare encodes oral lactulose dosing only.
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
    warningsPrecautions: ['Dose should be adjusted according to stool consistency and clinical response.', 'Reduce or discontinue if significant diarrhea develops.', 'Use cautiously in patients with electrolyte disturbances or conditions requiring strict electrolyte control.'],
    interactions: ['Other laxatives may increase the risk of diarrhea and electrolyte disturbance.', 'Antacids may theoretically alter the laxative effect; clinical significance is uncertain.'],
    administration: 'Administer orally using an accurate measuring device. The solution may be mixed with water, milk, or fruit juice when appropriate.',
    pediatricUse: 'The 2026 ESPGHAN/NASPGHAN guideline recognizes lactulose as having a therapeutic role in functional constipation. Typical dosing is 350–700 mg/kg/day for neonates and infants through 6 months, and 0.6–2 g/kg/day for 7 months through 18 years, in one or two divided doses. DoseCare does not extrapolate beyond these supported age ranges.',
    hepaticImpairment: 'Not applicable to the selected constipation regimen; lactulose has minimal systemic absorption.',
    notes: 'PEG is generally preferred first-line when available; lactulose is an established alternative/therapeutic option. This regimen is for functional constipation, not hepatic encephalopathy.',
    sources: [
      { organization: 'DailyMed', title: 'Lactulose Solution USP 10 g/15 mL — current labeling', url: 'https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=163d5093-e35c-0bbf-e063-6294a90a803e' },
      { organization: 'ESPGHAN / NASPGHAN', title: 'Guidelines for treatment of functional constipation in children aged 0–18 years (2026)', url: 'https://onlinelibrary.wiley.com/doi/10.1002/jpn3.70447' },
      { organization: 'NICE', title: 'CG99 — Constipation in children and young people: diagnosis and management', url: 'https://www.nice.org.uk/guidance/cg99/chapter/Recommendations' }
    ]
  },
  sources: [
    { organization: 'DailyMed', title: 'Lactulose Solution USP 10 g/15 mL — current labeling', url: 'https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=163d5093-e35c-0bbf-e063-6294a90a803e' },
    { organization: 'ESPGHAN / NASPGHAN', title: 'Guidelines for treatment of functional constipation in children aged 0–18 years (2026)', url: 'https://onlinelibrary.wiley.com/doi/10.1002/jpn3.70447' },
    { organization: 'NICE', title: 'CG99 — Constipation in children and young people: diagnosis and management', url: 'https://www.nice.org.uk/guidance/cg99/chapter/Recommendations' }
  ]
});
