/* DoseCare V2 — Ondansetron oral solution
 * Sources cross-checked: DailyMed current oral-solution labels; FDA Zofran label; WHO EMLc review/guidance.
 * Oral liquid only.
 */
window.DoseCareV2Database?.register({
  id: 'ondansetron',
  name: 'Ondansetron',
  genericName: 'Ondansetron hydrochloride',
  activeIngredient: 'Ondansetron',
  dosageForm: 'Oral Solution',
  route: 'Oral',
  formulations: [
    { display: '4 mg/5 mL', concentration: { amount: 4, unit: 'mg', volume: 5, volumeUnit: 'mL' }, mgPer5mL: 4 }
  ],
  regimens: [
    {
      id: 'chemotherapy-4-11',
      condition: 'Moderately emetogenic chemotherapy',
      type: 'fixed_dose', dose: 4, minDose: 4, maxDose: 4,
      unit: 'mg/dose', frequency: 3, frequencyText: 'Every 8 hours',
      requiresAge: true, requiresWeight: false, minAgeYears: 4, maxAgeYears: 11
    },
    {
      id: 'chemotherapy-12-plus',
      condition: 'Moderately emetogenic chemotherapy',
      type: 'fixed_dose', dose: 8, minDose: 8, maxDose: 8,
      unit: 'mg/dose', frequency: 2, frequencyText: 'Every 12 hours',
      requiresAge: true, requiresWeight: false, minAgeYears: 12
    }
  ],
  information: {
    class: 'Selective 5-HT3 receptor antagonist; antiemetic',
    mechanismOfAction: 'Blocks serotonin (5-HT3) receptors involved in the vomiting reflex, including receptors on vagal afferents and centrally in the chemoreceptor trigger zone.',
    indications: [
      'Prevention of nausea and vomiting associated with moderately emetogenic cancer chemotherapy',
      'Other labeled indications exist for highly emetogenic chemotherapy, radiotherapy, and postoperative nausea/vomiting; pediatric oral-liquid dosing in this V1 dataset is limited to the supported regimen above.'
    ],
    contraindications: [
      'Hypersensitivity to ondansetron or formulation components',
      'Concomitant apomorphine use'
    ],
    adverseEffects: [
      'Headache',
      'Constipation',
      'Diarrhea',
      'Fatigue/malaise',
      'QT interval prolongation and serious arrhythmias are important rare risks'
    ],
    warningsPrecautions: [
      'Avoid in congenital long-QT syndrome.',
      'Consider ECG monitoring in patients with electrolyte abnormalities, heart failure, bradyarrhythmias, or concomitant QT-prolonging medicines.',
      'Hypersensitivity reactions including anaphylaxis and bronchospasm may occur.',
      'Serotonin syndrome has been reported, particularly with serotonergic medicines.'
    ],
    interactions: [
      'Apomorphine — contraindicated.',
      'Other QT-prolonging medicines may increase arrhythmia risk.',
      'Serotonergic medicines may increase serotonin-syndrome risk.'
    ],
    administration: 'Oral solution may be administered without regard to food. Use an accurate oral measuring device.',
    pediatricUse: 'The labeled oral-solution pediatric regimen is for patients 4 years and older for moderately emetogenic chemotherapy; the 12–17 year regimen is the same as the adult regimen.',
    hepaticImpairment: 'In severe hepatic impairment, total daily dose should not exceed 8 mg.',
    notes: 'This DoseCare V1 entry intentionally does not extrapolate ondansetron dosing to acute gastroenteritis because the current U.S. product label does not list that indication; clinical guidelines may discuss off-label pediatric use separately.',
    sources: [
      { organization: 'DailyMed', title: 'Ondansetron Oral Solution — current prescribing information', url: 'https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=05cf8d4f-ac57-4177-e063-6394a90ae804' },
      { organization: 'FDA', title: 'ZOFRAN (ondansetron) prescribing information', url: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2016/020103s035_020605s019_020781s019lbl.pdf' },
      { organization: 'WHO', title: 'Ondansetron — EMLc review', url: 'https://cdn.who.int/media/docs/default-source/2025-eml-expert-committee/reviews/r.1_emlc-review_attachment1.pdf' }
    ]
  }
});
