window.DoseCareData = window.DoseCareData || {};
window.DoseCareData.cephalexin = {
  id: "cephalexin",
  genericName: "Cephalexin",
  dosageForm: "Oral Suspension",
  route: "oral",
  concentrations: ["125 mg/5 mL", "250 mg/5 mL"],
  ageMinimumYears: 1,
  conditions: [
    {
      id: "usual-infections",
      name: "Usual pediatric infections",
      regimens: [
        { type: "mg_per_kg_per_day", min: 25, max: 50, frequency: 4, durationDays: "7-14", unit: "mg/kg/day" },
        { type: "mg_per_kg_per_day", min: 25, max: 50, frequency: 2, durationDays: "7-14", unit: "mg/kg/day", note: "For streptococcal pharyngitis and skin/skin-structure infections, the total daily dose may be divided every 12 hours." }
      ]
    },
    {
      id: "severe-infections",
      name: "Severe infections",
      regimens: [
        { type: "mg_per_kg_per_day", min: 50, max: 100, frequency: 4, durationDays: "7-14", unit: "mg/kg/day" }
      ]
    },
    {
      id: "otitis-media",
      name: "Otitis media",
      regimens: [
        { type: "mg_per_kg_per_day", min: 75, max: 100, frequency: 4, unit: "mg/kg/day" }
      ]
    },
    {
      id: "streptococcal-pharyngitis",
      name: "β-hemolytic streptococcal infection",
      regimens: [
        { type: "mg_per_kg_per_day", min: 25, max: 50, frequency: 2, durationDays: "10+", unit: "mg/kg/day", note: "Treatment should be given for at least 10 days." }
      ]
    }
  ],
  notes: [
    "For pediatric patients over 1 year of age according to the referenced prescribing information.",
    "All listed formulations are oral suspensions only."
  ],
  sources: [
    { title: "DailyMed – Cephalexin for Oral Suspension", url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=655f38e8-1c4d-4cbc-9f52-bb881f065b2d" },
    { title: "DailyMed – Cephalexin for oral suspension prescribing information", url: "https://www.dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=d31da5be-c939-4aa0-adb8-b26a1396b228&type=display" }
  ]
};
