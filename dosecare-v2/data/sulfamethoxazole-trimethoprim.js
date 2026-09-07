/* DoseCare V2 — Sulfamethoxazole / Trimethoprim oral suspension
 * Oral liquid only. Pediatric automatic dosing follows current DailyMed
 * labeling for 200 mg sulfamethoxazole + 40 mg trimethoprim per 5 mL.
 */
window.DoseCareV2Database?.register({
  id: 'sulfamethoxazole-trimethoprim',
  name: 'Sulfamethoxazole / Trimethoprim',
  genericName: 'Sulfamethoxazole and Trimethoprim',
  activeIngredient: 'Sulfamethoxazole + Trimethoprim',
  dosageForm: 'Oral Suspension',
  route: 'Oral',
  category: 'Antibiotic',
  formulations: [
    {
      id: '200-40-5mL',
      dosageForm: 'Oral Suspension',
      display: '200 mg sulfamethoxazole + 40 mg trimethoprim per 5 mL',
      concentration: { amount: 40, unit: 'mg trimethoprim', volume: 5, volumeUnit: 'mL' },
      mgPer5mL: 40,
      dosingBasis: 'trimethoprim'
    }
  ],
  regimens: [
    {
      id: 'uti',
      type: 'mg_per_kg_per_day',
      minDose: 8,
      maxDose: 8,
      doseUnit: 'mg/kg/day trimethoprim',
      frequency: 2,
      frequencyText: 'Every 12 hours',
      requiresAge: true,
      requiresWeight: true,
      minAgeMonths: 2,
      durationDays: 10,
      condition: 'Urinary tract infection',
      allowedFormulations: ['200-40-5mL']
    },
    {
      id: 'acute-otitis-media',
      type: 'mg_per_kg_per_day',
      minDose: 8,
      maxDose: 8,
      doseUnit: 'mg/kg/day trimethoprim',
      frequency: 2,
      frequencyText: 'Every 12 hours',
      requiresAge: true,
      requiresWeight: true,
      minAgeMonths: 2,
      durationDays: 10,
      condition: 'Acute otitis media',
      allowedFormulations: ['200-40-5mL'],
      notes: 'Use only when the combination offers an advantage over other antimicrobials, as specified by labeling.'
    },
    {
      id: 'shigellosis',
      type: 'mg_per_kg_per_day',
      minDose: 8,
      maxDose: 8,
      doseUnit: 'mg/kg/day trimethoprim',
      frequency: 2,
      frequencyText: 'Every 12 hours',
      requiresAge: true,
      requiresWeight: true,
      minAgeMonths: 2,
      durationDays: 5,
      condition: 'Shigellosis',
      allowedFormulations: ['200-40-5mL']
    }
  ],
  information: {
    class: 'Sulfonamide + dihydrofolate reductase inhibitor antibacterial combination',
    mechanism: 'Sulfamethoxazole inhibits bacterial dihydropteroate synthase and trimethoprim inhibits bacterial dihydrofolate reductase, producing sequential blockade of folate synthesis.',
    indications: [
      'Urinary tract infections due to susceptible bacteria',
      'Acute otitis media due to susceptible Streptococcus pneumoniae or Haemophilus influenzae when this combination offers an advantage over other antimicrobials',
      'Shigellosis when antibacterial therapy is indicated'
    ],
    contraindications: [
      'Hypersensitivity to trimethoprim or sulfonamides',
      'History of drug-induced immune thrombocytopenia caused by trimethoprim or sulfonamides',
      'Pediatric patients younger than 2 months'
    ],
    precautions: [
      'Not recommended in severe renal insufficiency when renal function cannot be monitored.',
      'Renal impairment requires dose reduction: standard regimen above CrCl 30 mL/min; half the usual regimen at CrCl 15–30 mL/min; use is not recommended below 15 mL/min. DoseCare does not currently perform renal dose adjustment.',
      'Serious hypersensitivity reactions, severe skin reactions, blood dyscrasias, and hepatic injury can occur; discontinue at the first appearance of rash or other serious adverse reaction.',
      'Maintain adequate hydration unless clinically contraindicated.',
      'For acute otitis media, use is limited to situations where this combination offers an advantage over other antimicrobials.'
    ],
    adverseEffects: [
      'Nausea, vomiting and loss of appetite',
      'Rash and hypersensitivity reactions',
      'Photosensitivity',
      'Diarrhea',
      'Stevens-Johnson syndrome / toxic epidermal necrolysis (rare but serious)',
      'Blood dyscrasias including thrombocytopenia, leukopenia and megaloblastic anemia',
      'Hyperkalemia and other electrolyte abnormalities'
    ],
    interactions: [
      'Dofetilide: concomitant use is contraindicated.',
      'Warfarin and other medicines affected by CYP2C9 may have increased effects.',
      'ACE inhibitors, ARBs, spironolactone and other potassium-raising medicines may increase hyperkalemia risk.',
      'Methotrexate toxicity may increase because of antifolate effects.'
    ],
    pediatricUse: 'The labeled pediatric dose for UTI and acute otitis media is 40 mg/kg/day sulfamethoxazole plus 8 mg/kg/day trimethoprim, divided every 12 hours, in children 2 months and older. Shigellosis uses the same daily dose for 5 days. DoseCare uses the trimethoprim component as the dosing and conversion basis: 40 mg trimethoprim per 5 mL.',
    administration: 'Shake well before each dose. Measure with an accurate oral dosing device. Encourage adequate fluid intake unless clinically contraindicated.',
    notes: 'DoseCare intentionally excludes Pneumocystis jirovecii treatment/prophylaxis because those regimens use different dosing structures, including BSA-based prophylaxis, that the current engine does not model safely. The configured automatic regimens are limited to labeled pediatric oral-liquid regimens supported by weight-based dosing.'
  },
  sources: [
    {
      organization: 'DailyMed',
      title: 'Sulfamethoxazole and Trimethoprim Oral Suspension — pediatric dosage and renal adjustment',
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=acc3df02-1e99-46e6-8a31-9b26261c6daa'
    },
    {
      organization: 'DailyMed',
      title: 'Sulfamethoxazole and Trimethoprim Oral Suspension — current product information',
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=69af86b4-9c9f-4a70-b448-97b36698f3cd'
    }
  ]
});
