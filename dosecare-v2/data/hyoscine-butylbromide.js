/* DoseCare V2 — Hyoscine Butylbromide pediatric oral syrup
 * Product-specific pediatric dosing based on the approved BUSCOPAN 0.1% syrup professional information (SAHPRA).
 */
(function (global) {
  'use strict';
  const db = global.DoseCareV2Database;
  if (!db || typeof db.register !== 'function') throw new Error('DoseCareV2Database is not available');

  db.register({
    id: 'hyoscine-butylbromide',
    name: 'Hyoscine Butylbromide',
    genericName: 'Hyoscine Butylbromide',
    activeIngredient: 'Hyoscine butylbromide',
    dosageForm: 'Oral syrup',
    route: 'Oral',
    category: 'Gastrointestinal / Antispasmodic',
    formulations: [{
      id: 'buscopan-0-1-percent-syrup',
      display: 'Hyoscine Butylbromide 5 mg/5 mL oral syrup (0.1%)',
      concentration: { amount: 5, unit: 'mg', volume: 5, volumeUnit: 'mL' }
    }],
    regimens: [
      {
        id: 'age-1-3-months', condition: 'Gastrointestinal spasm', type: 'label_age_based',
        minAgeMonths: 1.0001, maxAgeMonths: 3, requiresAge: true, requiresWeight: false,
        doseMin: 2.5, doseMax: 2.5, doseUnit: 'mg/dose', volumeMin: 2.5, volumeMax: 2.5,
        frequency: 3, dosesPerDay: 3, frequencyText: '2.5 mL three times daily',
        allowedFormulations: ['buscopan-0-1-percent-syrup']
      },
      {
        id: 'age-over-3-months-1-year', condition: 'Gastrointestinal spasm', type: 'label_age_based',
        minAgeMonths: 3.0001, maxAgeMonths: 12, requiresAge: true, requiresWeight: false,
        doseMin: 2.5, doseMax: 5, doseUnit: 'mg/dose', volumeMin: 2.5, volumeMax: 5,
        frequency: 3, dosesPerDay: 3, frequencyText: '2.5–5 mL three times daily; start with the lowest recommended dose',
        allowedFormulations: ['buscopan-0-1-percent-syrup']
      },
      {
        id: 'age-over-1-3-years', condition: 'Gastrointestinal spasm', type: 'label_age_based',
        minAgeMonths: 12.0001, maxAgeMonths: 36, requiresAge: true, requiresWeight: false,
        doseMin: 5, doseMax: 10, doseUnit: 'mg/dose', volumeMin: 5, volumeMax: 10,
        frequency: 3, dosesPerDay: 3, frequencyText: '5–10 mL three times daily; start with the lowest recommended dose',
        allowedFormulations: ['buscopan-0-1-percent-syrup']
      },
      {
        id: 'age-over-3-6-years', condition: 'Gastrointestinal spasm', type: 'label_age_based',
        minAgeMonths: 36.0001, maxAgeMonths: 72, requiresAge: true, requiresWeight: false,
        doseMin: 10, doseMax: 10, doseUnit: 'mg/dose', volumeMin: 10, volumeMax: 10,
        frequency: 3, dosesPerDay: 3, frequencyText: '10 mL three times daily',
        allowedFormulations: ['buscopan-0-1-percent-syrup']
      },
      {
        id: 'age-over-6-12-years', condition: 'Gastrointestinal spasm', type: 'label_age_based',
        minAgeMonths: 72.0001, maxAgeMonths: 144, requiresAge: true, requiresWeight: false,
        doseMin: 10, doseMax: 20, doseUnit: 'mg/dose', volumeMin: 10, volumeMax: 20,
        frequency: 3, dosesPerDay: 3, frequencyText: '10–20 mL three times daily; start with the lowest recommended dose',
        allowedFormulations: ['buscopan-0-1-percent-syrup']
      }
    ],
    information: {
      class: 'Antimuscarinic antispasmodic',
      mechanism: 'Quaternary ammonium anticholinergic that exerts a peripheral antispasmodic action on smooth muscle of the gastrointestinal, biliary and urinary tracts; it does not readily cross the blood-brain barrier.',
      indications: ['Symptomatic relief of conditions associated with gastrointestinal spasm.'],
      contraindications: [
        'Hypersensitivity to hyoscine butylbromide or any excipient.',
        'Myasthenia gravis.',
        'Mechanical gastrointestinal stenosis.',
        'Paralytic or obstructive ileus.',
        'Megacolon.',
        'Narrow-angle glaucoma.',
        'Porphyria.',
        'Enlarged prostate.',
        'Fever.',
        'Tachycardia.'
      ],
      precautions: [
        'Do not use continuously or for extended periods without investigating the cause of abdominal pain.',
        'Severe or unexplained abdominal pain that persists or worsens, especially with fever, vomiting, bowel changes, abdominal tenderness, fainting, hypotension or blood in stool, requires immediate medical assessment.',
        'Use caution in patients susceptible to intestinal or urinary obstruction or tachyarrhythmia.',
        'Use caution in pyrexia because anticholinergics may reduce sweating.',
        'Use caution in impaired metabolic, hepatic or renal function because adverse effects may be more likely.',
        'Use the lowest recommended dose for the age initially.'
      ],
      adverseEffects: [
        'Dry mouth.',
        'Tachycardia.',
        'Skin reactions such as urticaria or pruritus.',
        'Abnormal sweating.',
        'Urinary retention.',
        'Hypersensitivity reactions including anaphylaxis.',
        'Rare or post-marketing bradycardia, palpitations and arrhythmias.'
      ],
      interactions: [
        'Tricyclic and tetracyclic antidepressants may intensify anticholinergic effects.',
        'Antihistamines may intensify anticholinergic effects.',
        'Quinidine, amantadine, antipsychotics and other anticholinergic medicines may intensify anticholinergic effects.',
        'Metoclopramide may reduce the gastrointestinal effects of both medicines.',
        'Beta-adrenergic medicines may have enhanced tachycardic effects.',
        'Other central nervous system depressants may enhance CNS depression.'
      ],
      administration: 'Administer orally using an accurate measuring device. Start with the lowest recommended dose for the child’s age. Do not use continuously or for prolonged periods without evaluating the cause of abdominal pain.',
      pediatricUse: 'The referenced BUSCOPAN 0.1% syrup label provides age-based dosing from babies older than 1 month through 12 years. Children older than 12 years and adults use 20 mL four times daily, but that adult/adolescent regimen is intentionally not included in this pediatric calculator record.',
      notes: 'This record is product-specific to BUSCOPAN 0.1% syrup containing 5 mg/5 mL. DoseCare must not extrapolate these age-based doses to other hyoscine butylbromide liquid concentrations. The referenced label is from SAHPRA and was revised 13 April 2022.',
      sources: [
        {
          organization: 'SAHPRA',
          title: 'BUSCOPAN 0.1% syrup — Approved Professional Information',
          url: 'https://pi-pil-repository.sahpra.org.za/wp-content/uploads/2022/05/pi_buscopan-01-syrup-13-04-2022_APPROVED.pdf'
        }
      ]
    },
    sources: [
      {
        organization: 'SAHPRA',
        title: 'BUSCOPAN 0.1% syrup — Approved Professional Information',
        url: 'https://pi-pil-repository.sahpra.org.za/wp-content/uploads/2022/05/pi_buscopan-01-syrup-13-04-2022_APPROVED.pdf'
      }
    ]
  });
})(window);