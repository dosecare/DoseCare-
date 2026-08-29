/* DoseCare V2 — Paracetamol
   Independent V2 medicine record. Do not import legacy medicine files.
   Source basis: FDA pediatric oral-liquid acetaminophen guidance + current DailyMed labels.
*/
window.DOSECARE_V2_MEDICINES = window.DOSECARE_V2_MEDICINES || [];
window.DOSECARE_V2_MEDICINES.push({
  id: 'paracetamol',
  genericName: 'Paracetamol (Acetaminophen)',
  activeIngredient: 'Acetaminophen',
  dosageForm: 'Oral suspension',
  route: 'Oral',
  formulations: [
    {
      concentration: { amount: 160, unit: 'mg', volume: 5, volumeUnit: 'mL' },
      label: '160 mg/5 mL'
    }
  ],
  dosing: {
    type: 'label_weight_age_based',
    frequency: 'every 4 hours as needed',
    maximumDosesPer24Hours: 5,
    requiresWeightOrAge: true,
    regimenSource: 'DailyMed label'
  },
  information: {
    class: 'Analgesic / antipyretic',
    indications: ['Temporary reduction of fever', 'Relief of minor aches and pains'],
    mechanism: 'Analgesic and antipyretic; the precise mechanism is not fully established.',
    precautions: ['Do not combine with another medicine containing acetaminophen.', 'Use caution in children with liver disease.'],
    adverseEffects: ['Serious liver injury can occur with overdose.', 'Serious skin reactions are possible.']
  },
  sources: [
    {
      organization: 'U.S. FDA',
      title: 'Over-the-Counter Pediatric Oral Liquid Drug Products Containing Acetaminophen',
      url: 'https://www.fda.gov/files/drugs/published/Over-the-Counter-Pediatric-Oral-Liquid-Drug-Products-Containing-Acetaminophen.pdf'
    },
    {
      organization: 'DailyMed',
      title: "Children's Acetaminophen Oral Suspension — 160 mg/5 mL",
      url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=38b839b6-de7d-4f33-a19a-efc92cdad92c'
    }
  ]
});
