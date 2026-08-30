window.DoseCareV2Database?.register({
  id: 'diphenhydramine',
  name: 'Diphenhydramine',
  genericName: 'Diphenhydramine HCl',
  dosageForm: 'Oral Solution',
  category: 'Antihistamine',
  formulations: [{ concentration: { amount: 12.5, unit: 'mg', volume: 5, volumeUnit: 'mL' }, display: '12.5 mg/5 mL' }],
  regimens: [{
    id: 'allergy-6-12',
    condition: 'Allergy symptoms',
    type: 'label_age_based',
    minAgeYears: 6,
    maxAgeYears: 11,
    doseMin: 12.5,
    doseMax: 25,
    doseUnit: 'mg/dose',
    volumeMin: 5,
    volumeMax: 10,
    volumeUnit: 'mL/dose',
    frequencyText: 'Every 4–6 hours as needed',
    maxDosesPer24h: 6,
    requiresAge: true,
    requiresWeight: false
  }],
  information: {
    mechanismOfAction: 'First-generation H1 antihistamine that competitively blocks histamine H1 receptors.',
    indications: ['Allergic symptoms', 'Urticaria and itching'],
    adverseEffects: ['Drowsiness', 'Dizziness', 'Dry mouth', 'Blurred vision'],
    warningsPrecautions: ['May cause marked sedation. Do not use to make a child sleepy.', 'Avoid duplicate diphenhydramine-containing products.'],
    sources: [
      { organization: 'DailyMed', title: 'Diphenhydramine HCl Oral Solution 12.5 mg/5 mL', url: 'https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=7406e4e4-3093-4cd1-80ce-93f7b6db2a87' },
      { organization: 'American Academy of Pediatrics', title: 'A Parent’s Guide to Over-the-Counter Medicines for Children', url: 'https://www.healthychildren.org/English/safety-prevention/at-home/medication-safety/Pages/Choosing-Over-the-Counter-Medicines-for-Your-Child.aspx' }
    ]
  },
  sources: [
    { organization: 'DailyMed', title: 'Diphenhydramine HCl Oral Solution 12.5 mg/5 mL', url: 'https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=7406e4e4-3093-4cd1-80ce-93f7b6db2a87' },
    { organization: 'American Academy of Pediatrics', title: 'A Parent’s Guide to Over-the-Counter Medicines for Children', url: 'https://www.healthychildren.org/English/safety-prevention/at-home/medication-safety/Pages/Choosing-Over-the-Counter-Medicines-for-Your-Child.aspx' }
  ]
});
