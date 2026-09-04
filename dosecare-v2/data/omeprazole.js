/* DoseCare V2 — Omeprazole oral suspension
 * Oral liquid only. Pediatric regimen is evidence-based and limited to GERD/acid-related disease.
 * Formulation: 2 mg/mL oral suspension. Pediatric dose: 1–4 mg/kg/day once daily, maximum 40 mg/day.
 * Dose source: NASPGHAN/ESPGHAN pediatric GERD guideline; formulation source: Nationwide Children's Hospital pediatric GERD guideline.
 */
window.DoseCareV2Database?.register({
  id: 'omeprazole',
  name: 'Omeprazole',
  genericName: 'Omeprazole',
  activeIngredient: 'Omeprazole',
  dosageForm: 'Oral Suspension',
  route: 'Oral',
  formulations: [
    { display: '2 mg/mL', concentration: { amount: 2, unit: 'mg', volume: 1, volumeUnit: 'mL' }, mgPerMl: 2 }
  ],
  regimens: [
    {
      id: 'gerd-pediatric-1-4-mgkg-day',
      condition: 'GERD / reflux-related acid disease',
      type: 'mg_per_kg_per_day',
      minDose: 1,
      maxDose: 4,
      unit: 'mg/kg/day',
      frequency: 1,
      frequencyText: 'Once daily',
      requiresAge: true,
      requiresWeight: true,
      minAgeYears: 1,
      maximumDailyDose: 40
    }
  ],
  information: {
    class: 'Proton pump inhibitor (PPI)',
    mechanismOfAction: 'Omeprazole irreversibly inhibits the gastric H+/K+-ATPase proton pump in gastric parietal cells, suppressing the final step of gastric acid secretion.',
    indications: ['GERD and reflux-related acid disease when acid suppression is clinically indicated', 'Reflux-related erosive esophagitis'],
    contraindications: ['Hypersensitivity to omeprazole or other substituted benzimidazoles', 'Concomitant use with rilpivirine-containing products where contraindicated by product labeling'],
    adverseEffects: ['Headache', 'Abdominal pain', 'Diarrhea', 'Nausea', 'Constipation', 'With prolonged use, clinically important risks can include hypomagnesemia, vitamin B12 deficiency and enteric infections'],
    warningsPrecautions: ['PPIs should not be used for isolated physiologic infant regurgitation without an appropriate indication.', 'Reassess the need for ongoing acid suppression regularly.', 'Consider infectious, nutritional and electrolyte risks with prolonged therapy.', 'Administer before meals when directed; timing should follow the product and clinical regimen used.'],
    interactions: ['Omeprazole can interact with medicines whose absorption depends on gastric pH.', 'CYP2C19-mediated interactions may occur with some medicines.', 'Check the current product label for clinically important interactions before use.'],
    administration: 'Administer the oral suspension using an accurate oral syringe. For maximal PPI effect, administer before a meal when specified by the product or clinical regimen.',
    pediatricUse: 'The NASPGHAN/ESPGHAN pediatric GERD guideline lists omeprazole at 1–4 mg/kg/day with an adult-based maximum of 40 mg/day. The selected pediatric formulation reference provides a 2 mg/mL suspension. DoseCare limits this configured regimen to children aged 1 year and older and does not extrapolate it to otherwise healthy infants with physiologic regurgitation.',
    notes: 'DoseCare includes an oral suspension formulation only. Capsules, tablets and orally disintegrating tablets are excluded by project scope. PPIs are recommended for reflux-related erosive esophagitis and may be used for typical GERD symptoms; they should not be used solely for uncomplicated infant regurgitation.',
    sources: [
      { organization: 'Nationwide Children’s Hospital', title: 'Gastroesophageal Reflux Guidelines — Omeprazole suspension 2 mg/mL', url: 'https://www.nationwidechildrens.org/-/media/nch/for-medical-professionals/practice-tools-new/gastroesophageal-reflux-guidelines.ashx' },
      { organization: 'NASPGHAN / ESPGHAN', title: 'Pediatric Gastroesophageal Reflux Clinical Practice Guidelines — omeprazole 1–4 mg/kg/day; maximum 40 mg/day', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5958910/' },
      { organization: 'American Academy of Pediatrics', title: 'Gastroesophageal Reflux: Management Guidance for the Pediatrician', url: 'https://publications.aap.org/pediatrics/article/131/5/e1684/31266/Gastroesophageal-Reflux-Management-Guidance-for' },
      { organization: 'NICE', title: 'Gastro-oesophageal reflux disease in children and young people: diagnosis and management', url: 'https://www.nice.org.uk/guidance/ng1/chapter/Recommendations' }
    ]
  },
  sources: [
    { organization: 'Nationwide Children’s Hospital', title: 'Gastroesophageal Reflux Guidelines — Omeprazole suspension 2 mg/mL', url: 'https://www.nationwidechildrens.org/-/media/nch/for-medical-professionals/practice-tools-new/gastroesophageal-reflux-guidelines.ashx' },
    { organization: 'NASPGHAN / ESPGHAN', title: 'Pediatric Gastroesophageal Reflux Clinical Practice Guidelines — omeprazole 1–4 mg/kg/day; maximum 40 mg/day', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5958910/' },
    { organization: 'American Academy of Pediatrics', title: 'Gastroesophageal Reflux: Management Guidance for the Pediatrician', url: 'https://publications.aap.org/pediatrics/article/131/5/e1684/31266/Gastroesophageal-Reflux-Management-Guidance-for' },
    { organization: 'NICE', title: 'Gastro-oesophageal reflux disease in children and young people: diagnosis and management', url: 'https://www.nice.org.uk/guidance/ng1/chapter/Recommendations' }
  ]
});
