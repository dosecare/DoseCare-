/* DoseCare V2 — Macrogol 3350 pediatric oral powder
 * Primary product source: CosmoCol Paediatric 6.9 g powder for oral solution SmPC (emc).
 * Oral powder for solution only. No tablets/capsules/injections.
 */
window.DoseCareV2Database?.register({
  id: 'macrogol',
  name: 'Macrogol 3350',
  genericName: 'Macrogol 3350',
  activeIngredient: 'Macrogol 3350 with electrolytes',
  dosageForm: 'Powder for oral solution',
  route: 'Oral',
  category: 'Gastrointestinal / Laxative',
  formulations: [
    {
      id: 'macrogol-paediatric-6-9g-sachet',
      display: 'Macrogol 3350 6.563 g + electrolytes per sachet',
      sachetBased: true,
      sachetContent: { macrogol3350: 6.563, unit: 'g' },
      reconstitution: 'Dissolve each sachet in 62.5 mL water.'
    }
  ],
  regimens: [
    {
      id: 'chronic-constipation-2-6',
      condition: 'Chronic constipation — maintenance therapy',
      type: 'sachet_age_based',
      minAgeMonths: 24,
      maxAgeMonths: 83.999,
      requiresAge: true,
      requiresWeight: false,
      doseMin: 1,
      doseMax: 1,
      doseUnit: 'sachet/day',
      frequency: 1,
      frequencyText: '1 sachet once daily initially; adjust every other day according to response',
      normalMaximum: 4,
      maximumUnit: 'sachets/day',
      allowedFormulations: ['macrogol-paediatric-6-9g-sachet']
    },
    {
      id: 'chronic-constipation-7-11',
      condition: 'Chronic constipation — maintenance therapy',
      type: 'sachet_age_based',
      minAgeMonths: 84,
      maxAgeMonths: 131.999,
      requiresAge: true,
      requiresWeight: false,
      doseMin: 2,
      doseMax: 2,
      doseUnit: 'sachets/day',
      frequency: 1,
      frequencyText: '2 sachets once daily initially; adjust every other day according to response',
      normalMaximum: 4,
      maximumUnit: 'sachets/day',
      allowedFormulations: ['macrogol-paediatric-6-9g-sachet']
    },
    {
      id: 'faecal-impaction-5-11',
      condition: 'Faecal impaction — disimpaction',
      type: 'sachet_schedule',
      minAgeMonths: 60,
      maxAgeMonths: 131.999,
      requiresAge: true,
      requiresWeight: false,
      frequencyText: 'Divide the daily sachet dose over 12 hours; stop when disimpaction occurs',
      schedule: [
        { dayRange: 'Day 1', doseSachets: 4 },
        { dayRange: 'Day 2', doseSachets: 6 },
        { dayRange: 'Day 3', doseSachets: 8 },
        { dayRange: 'Day 4', doseSachets: 10 },
        { dayRange: 'Day 5', doseSachets: 12 },
        { dayRange: 'Day 6', doseSachets: 12 },
        { dayRange: 'Day 7', doseSachets: 12 }
      ],
      allowedFormulations: ['macrogol-paediatric-6-9g-sachet']
    }
  ],
  information: {
    class: 'Osmotically acting laxative',
    mechanismOfAction: 'Macrogol 3350 retains water in the intestinal lumen by osmotic action, increasing stool volume and softening stool to facilitate bowel movement.',
    indications: ['Chronic constipation in children aged 2–11 years', 'Faecal impaction in children aged 5–11 years'],
    contraindications: ['Intestinal perforation or obstruction', 'Ileus', 'Severe inflammatory bowel disease such as Crohn disease, ulcerative colitis or toxic megacolon', 'Hypersensitivity to active substances or excipients'],
    adverseEffects: ['Abdominal pain', 'Borborygmi', 'Diarrhoea', 'Vomiting', 'Nausea', 'Anorectal discomfort', 'Abdominal distension', 'Flatulence'],
    warningsPrecautions: ['Maintain adequate usual fluid intake; the reconstituted solution does not replace normal fluid intake.', 'Confirm faecal impaction clinically before using the high-dose disimpaction regimen.', 'Use caution with high doses in children with impaired gag reflex, reflux oesophagitis or reduced consciousness.', 'Oral medicines may have reduced absorption if taken close to macrogol; the SmPC advises avoiding other oral medicines from one hour before through one hour after administration.', 'Renal impairment and cardiovascular impairment require particular clinical consideration for faecal impaction regimens.'],
    interactions: ['Other oral medicines may have transiently reduced absorption because macrogol can increase gastrointestinal transit.'],
    administration: 'Dissolve each 6.9 g paediatric sachet in 62.5 mL water before oral administration.',
    pediatricUse: 'For chronic constipation, the licensed paediatric product starts at 1 sachet daily for ages 2–6 years and 2 sachets daily for ages 7–11 years, adjusted every other day; normal maximum 4 sachets/day. For faecal impaction in ages 5–11 years, the labeled course increases from 4 sachets on day 1 to 12 sachets/day on days 5–7, divided over 12 hours, and is stopped when disimpaction occurs.',
    notes: 'DoseCare uses the licensed paediatric sachet regimen rather than converting macrogol into mg/mL. Each sachet contains 6.563 g macrogol 3350 plus electrolytes and is dissolved in 62.5 mL water.',
    sources: [
      { organization: 'electronic Medicines Compendium (emc)', title: 'CosmoCol Paediatric 6.9 g powder for oral solution — Summary of Product Characteristics', url: 'https://www.medicines.org.uk/emc/product/3671/smpc' }
    ]
  },
  sources: [
    { organization: 'electronic Medicines Compendium (emc)', title: 'CosmoCol Paediatric 6.9 g powder for oral solution — Summary of Product Characteristics', url: 'https://www.medicines.org.uk/emc/product/3671/smpc' }
  ]
});
