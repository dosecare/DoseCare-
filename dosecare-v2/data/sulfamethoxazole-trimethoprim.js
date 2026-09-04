/* DoseCare V2 — Sulfamethoxazole / Trimethoprim oral suspension */
DoseCareV2Database.register({
  id: 'sulfamethoxazole-trimethoprim',
  name: 'Sulfamethoxazole / Trimethoprim',
  genericName: 'Sulfamethoxazole and Trimethoprim',
  activeIngredient: 'Sulfamethoxazole + Trimethoprim',
  dosageForm: 'Oral suspension',
  route: 'Oral',
  category: 'Antibiotic',
  formulations: [
    {
      display: '200 mg sulfamethoxazole / 40 mg trimethoprim per 5 mL',
      mgPer5mL: 40,
      concentration: { amount: 40, unit: 'mg trimethoprim', volume: 5, volumeUnit: 'mL' },
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
      durationDays: { min: 10, max: 14 },
      condition: 'Urinary tract infection'
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
      condition: 'Acute otitis media'
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
      condition: 'Shigellosis'
    }
  ],
  information: {
    class: 'Sulfonamide + dihydrofolate reductase inhibitor antibacterial combination',
    indications: [
      'Urinary tract infections due to susceptible bacteria',
      'Acute otitis media due to susceptible Streptococcus pneumoniae or Haemophilus influenzae when this combination offers an advantage over other antimicrobials',
      'Shigellosis when antibacterial therapy is indicated'
    ],
    mechanism: 'Sulfamethoxazole inhibits bacterial dihydropteroate synthase and trimethoprim inhibits bacterial dihydrofolate reductase, producing sequential blockade of folate synthesis.',
    precautions: [
      'Contraindicated in pediatric patients younger than 2 months.',
      'Do not use in patients with known hypersensitivity to trimethoprim or sulfonamides, or with a history of drug-induced immune thrombocytopenia from these agents.',
      'Not recommended in severe renal insufficiency when renal function cannot be monitored.',
      'Renal impairment requires dose reduction: standard regimen above CrCl 30 mL/min; half the usual regimen at CrCl 15–30 mL/min; use is not recommended below 15 mL/min. DoseCare does not currently perform renal dose adjustment.',
      'Serious hypersensitivity reactions, severe skin reactions, blood dyscrasias, and hepatic injury can occur; discontinue at the first appearance of rash or other serious adverse reaction.',
      'Maintain adequate hydration and monitor clinically when prolonged or high-dose therapy is required.',
      'For acute otitis media, repeated use in children under 2 years has limited safety data and the label restricts use to situations where this combination offers an advantage.'
    ],
    adverseEffects: [
      'Nausea, vomiting and loss of appetite',
      'Rash and hypersensitivity reactions',
      'Photosensitivity',
      'Diarrhea',
      'Rare but serious Stevens-Johnson syndrome / toxic epidermal necrolysis',
      'Blood dyscrasias including thrombocytopenia, leukopenia and megaloblastic anemia',
      'Hyperkalemia and other electrolyte abnormalities may occur'
    ],
    interactions: [
      'Dofetilide: concomitant use is contraindicated.',
      'Warfarin and other medicines affected by CYP2C9 may have increased effects.',
      'ACE inhibitors, ARBs, spironolactone and other potassium-raising medicines may increase hyperkalemia risk.',
      'Methotrexate toxicity may increase because of antifolate effects.'
    ],
    notes: 'The pediatric labeled dose is 40 mg/kg/day sulfamethoxazole plus 8 mg/kg/day trimethoprim, divided every 12 hours. The calculator uses the trimethoprim component as the dosing and conversion basis: 40 mg trimethoprim per 5 mL. The label lists a standard pediatric course of 10 days for UTI and acute otitis media and 5 days for shigellosis. This record intentionally excludes Pneumocystis jirovecii treatment/prophylaxis because those regimens use different dosing structures (including BSA-based prophylaxis) that the current DoseCare engine does not model safely.',
    administration: 'Shake well before each dose. Measure with an accurate oral dosing device. Encourage adequate fluid intake unless clinically contraindicated.'
  },
  sources: [
    {
      organization: 'DailyMed',
      title: 'Sulfamethoxazole and Trimethoprim Oral Suspension, USP — updated March 26, 2026',
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=69af86b4-9c9f-4a70-b448-97b36698f3cd'
    },
    {
      organization: 'DailyMed',
      title: 'Sulfamethoxazole and Trimethoprim Oral Suspension — pediatric dosage and renal adjustment',
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=acc3df02-1e99-46e6-8a31-9b26261c6daa'
    }
  ]
});
