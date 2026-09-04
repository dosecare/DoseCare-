/* DoseCare V2 — Ondansetron oral solution
 * Oral liquid only.
 * Pediatric chemotherapy dosing is represented as explicit labeled phases so the calculator does not collapse a time-dependent regimen into one fixed frequency.
 */
window.DoseCareV2Database?.register({
  id: 'ondansetron',
  name: 'Ondansetron',
  genericName: 'Ondansetron hydrochloride',
  activeIngredient: 'Ondansetron',
  dosageForm: 'Oral Solution',
  route: 'Oral',
  formulations: [
    { id: '4-5', display: '4 mg/5 mL', concentration: { amount: 4, unit: 'mg', volume: 5, volumeUnit: 'mL' }, mgPer5mL: 4 }
  ],
  regimens: [
    {
      id: 'chemotherapy-4-11-initial',
      condition: 'Moderately emetogenic chemotherapy — initial phase',
      type: 'fixed_dose', unit: 'mg/dose',
      schedule: [
        { timeAfterHours: 0, doseMg: 4, label: '30 minutes before chemotherapy' },
        { timeAfterHours: 4, doseMg: 4, label: '4 hours after the first dose' },
        { timeAfterHours: 8, doseMg: 4, label: '8 hours after the first dose' }
      ],
      frequencyText: '4 mg 30 minutes before chemotherapy, then 4 mg at 4 and 8 hours after the first dose',
      requiresAge: true, requiresWeight: false, minAgeYears: 4, maxAgeYears: 11
    },
    {
      id: 'chemotherapy-4-11-post',
      condition: 'Moderately emetogenic chemotherapy — post-chemotherapy phase',
      type: 'fixed_dose', dose: 4, minDose: 4, maxDose: 4, unit: 'mg/dose',
      frequency: 3, frequencyText: '4 mg three times daily (every 8 hours) for 1–2 days after completion of chemotherapy',
      requiresAge: true, requiresWeight: false, minAgeYears: 4, maxAgeYears: 11
    },
    {
      id: 'chemotherapy-12-17-initial',
      condition: 'Moderately emetogenic chemotherapy — initial phase',
      type: 'fixed_dose', unit: 'mg/dose',
      schedule: [
        { timeAfterHours: 0, doseMg: 8, label: '30 minutes before chemotherapy' },
        { timeAfterHours: 8, doseMg: 8, label: '8 hours after the first dose' }
      ],
      frequencyText: '8 mg 30 minutes before chemotherapy, then 8 mg 8 hours after the first dose',
      requiresAge: true, requiresWeight: false, minAgeYears: 12, maxAgeYears: 17
    },
    {
      id: 'chemotherapy-12-17-post',
      condition: 'Moderately emetogenic chemotherapy — post-chemotherapy phase',
      type: 'fixed_dose', dose: 8, minDose: 8, maxDose: 8, unit: 'mg/dose',
      frequency: 2, frequencyText: '8 mg twice daily (every 12 hours) for 1–2 days after completion of chemotherapy',
      requiresAge: true, requiresWeight: false, minAgeYears: 12, maxAgeYears: 17
    }
  ],
  information: {
    class: 'Selective 5-HT3 receptor antagonist; antiemetic',
    mechanismOfAction: 'Blocks serotonin (5-HT3) receptors involved in the vomiting reflex, including receptors on vagal afferents and centrally in the chemoreceptor trigger zone.',
    indications: ['Prevention of nausea and vomiting associated with moderately emetogenic cancer chemotherapy'],
    contraindications: ['Hypersensitivity to ondansetron or formulation components', 'Concomitant apomorphine use'],
    adverseEffects: ['Headache', 'Constipation', 'Diarrhea', 'Fatigue/malaise', 'QT interval prolongation and serious arrhythmias are important rare risks'],
    warningsPrecautions: ['Avoid in congenital long-QT syndrome.', 'Consider ECG monitoring in patients with electrolyte abnormalities, heart failure, bradyarrhythmias, or concomitant QT-prolonging medicines.', 'Hypersensitivity reactions including anaphylaxis and bronchospasm may occur.', 'Serotonin syndrome has been reported with serotonergic medicines.'],
    interactions: ['Apomorphine — contraindicated.', 'Other QT-prolonging medicines may increase arrhythmia risk.', 'Serotonergic medicines may increase serotonin-syndrome risk.'],
    administration: 'Administer the oral solution using an accurate oral measuring device. For chemotherapy, select the appropriate initial or post-chemotherapy phase.',
    pediatricUse: 'Current ondansetron oral-solution labeling specifies 4 mg for ages 4–11 years and 8 mg for ages 12–17 years for moderately emetogenic chemotherapy, with different initial and post-chemotherapy schedules.',
    hepaticImpairment: 'In severe hepatic impairment, total daily dose should not exceed 8 mg.',
    notes: 'DoseCare deliberately does not extrapolate ondansetron dosing to acute gastroenteritis. Tablets and orally disintegrating tablets are excluded; this entry is oral solution only.',
    sources: [
      { organization: 'DailyMed', title: 'Ondansetron Oral Solution USP 4 mg/5 mL — current prescribing information', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=04800a86-2391-44e6-8763-d65e8a916c26' },
      { organization: 'FDA', title: 'ZOFRAN (ondansetron) prescribing information', url: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2016/020103s035_020605s019_020781s019lbl.pdf' }
    ]
  },
  sources: [
    { organization: 'DailyMed', title: 'Ondansetron Oral Solution USP 4 mg/5 mL — current prescribing information', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=04800a86-2391-44e6-8763-d65e8a916c26' },
    { organization: 'FDA', title: 'ZOFRAN (ondansetron) prescribing information', url: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2016/020103s035_020605s019_020781s019lbl.pdf' }
  ]
});