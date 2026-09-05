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
        id: 'age-1-3-months',
        condition: 'Gastrointestinal spasm',
        type: 'label_age_based',
        minAgeMonths: 1.0001,
        maxAgeMonths: 3,
        requiresAge: true,
        requiresWeight: false,
        doseMin: 2.5,
        doseMax: 2.5,
        doseUnit: 'mL/dose',
        frequency: 3,
        dosesPerDay: 3,
        frequencyText: '2.5 mL three times daily',
        allowedFormulations: ['buscopan-0-1-percent-syrup']
      },
      {
        id: 'age-over-3-months-1-year',
        condition: 'Gastrointestinal spasm',
        type: 'label_age_based',
        minAgeMonths: 3.0001,
        maxAgeMonths: 12,
        requiresAge: true,
        requiresWeight: false,
        doseMin: 2.5,
        doseMax: 5,
        doseUnit: 'mL/dose',
        frequency: 3,
        dosesPerDay: 3,
        frequencyText: '2.5–5 mL three times daily; start with the lowest recommended dose',
        allowedFormulations: ['buscopan-0-1-percent-syrup']
      },
      {
        id: 'age-over-1-3-years',
        condition: 'Gastrointestinal spasm',
        type: 'label_age_based',
        minAgeMonths: 12.0001,
        maxAgeMonths: 36,
        requiresAge: true,
        requiresWeight: false,
        doseMin: 5,
        doseMax: 10,
        doseUnit: 'mL/dose',
        frequency: 3,
        dosesPerDay: 3,
        frequencyText: '5–10 mL three times daily; start with the lowest recommended dose',
        allowedFormulations: ['buscopan-0-1-percent-syrup']
      },
      {
        id: 'age-over-3-6-years',
        condition: 'Gastrointestinal spasm',
        type: 'label_age_based',
        minAgeMonths: 36.0001,
        maxAgeMonths: 72,
        requiresAge: true,
        requiresWeight: false,
        doseMin: 10,
        doseMax: 10,
        doseUnit: 'mL/dose',
        frequency: 3,
        dosesPerDay: 3,
        frequencyText: '10 mL three times daily',
        allowedFormulations: ['buscopan-0-1-percent-syrup']
      },
      {
        id: 'age-over-6-12-years',
        condition: 'Gastrointestinal spasm',
        type: 'label_age_based',
        minAgeMonths: 72.0001,
        maxAgeMonths: 144,
        requiresAge: true,
        requiresWeight: false,
        doseMin: 10,
        doseMax: 20,
        doseUnit: 'mL/dose',
        frequency: 3,
        dosesPerDay: 3,
        frequencyText: '10–20 mL three times daily; start with the lowest recommended dose',
        allowedFormulations: ['buscopan-0-1-percent-syrup']
      }
    ],
    information: {
      indication: 'Symptomatic relief of conditions associated with gastrointestinal spasm.',
      mechanism: 'Antimuscarinic antispasmodic that reduces smooth-muscle spasm in the gastrointestinal tract.',
      precautions: [
        'Do not use continuously or for extended periods without investigating the cause of abdominal pain.',
        'Severe or unexplained abdominal pain with red flags requires medical assessment.',
        'The lowest recommended dose for the age should be used initially.'
      ],
      contraindications: [
        'Hypersensitivity to hyoscine butylbromide.',
        'Myasthenia gravis.',
        'Mechanical gastrointestinal stenosis or paralytic/obstructive ileus.',
        'Megacolon.',
        'Narrow-angle glaucoma.',
        'Porphyria.',
        'Tachycardia or other listed product-specific contraindications.'
      ],
      source: 'SAHPRA — Approved Professional Information: BUSCOPAN 0.1% syrup, approved 13 April 2022.',
      sourceUrl: 'https://pi-pil-repository.sahpra.org.za/wp-content/uploads/2022/05/pi_buscopan-01-syrup-13-04-2022_APPROVED.pdf'
    }
  });
})(window);