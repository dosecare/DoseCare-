/* DoseCare Vitamins & Supplements — #41 Vitamin D3 */

const vitaminsMedicines = [
    {
        id: "vitamin-d3",
        genericName: "Cholecalciferol (Vitamin D3)",
        name: "Vitamin D3",
        brandNames: ["D-VITE Pediatric Oral Liquid"],
        system: "Vitamins & Supplements",
        drugClass: ["Vitamin D supplement"],
        class: "Vitamin D supplement",
        route: "oral",
        dosageForms: ["oral solution", "oral liquid"],
        concentrations: [
            {
                mg: 0.01,
                ml: 1,
                display: "400 IU (10 mcg) / 1 mL",
                equivalentIU: 400
            }
        ],
        formulations: [
            {
                dosageForm: "oral liquid",
                concentration: { mg: 0.01, ml: 1, equivalentIU: 400 },
                display: "400 IU (10 mcg) / 1 mL"
            }
        ],
        conditions: ["routine vitamin D supplementation"],
        indications: "Routine vitamin D supplementation when indicated.",
        moa: "Vitamin D promotes intestinal calcium and phosphate absorption and supports normal bone mineralization.",
        pediatric: { minimumAgeMonths: 0, maximumAgeMonths: 48 },
        dosing: {
            configured: true,
            calculatorReady: true,
            type: "fixed_dose",
            regimens: [
                {
                    id: "vitamin-d3-routine-400iu",
                    condition: "routine vitamin D supplementation",
                    type: "fixed_dose",
                    minimumAgeMonths: 0,
                    maximumAgeMonths: 48,
                    dose: 0.01,
                    doseUnit: "mg/day",
                    displayDose: 400,
                    displayDoseUnit: "IU/day",
                    volume: 1,
                    volumeUnit: "mL/day",
                    frequency: 1,
                    frequencyText: "Once daily"
                }
            ]
        },
        notes: "The selected formulation provides 400 IU (10 mcg) cholecalciferol per 1 mL. The product label directs 1 mL daily and states not to exceed 1 mL/day unless a physician recommends otherwise.",
        warnings: "Keep out of reach of children. Excessive vitamin D intake can cause toxicity. Check total daily intake when using other vitamin D-containing products.",
        references: [
            {
                id: "dailymed-d-vite-2026",
                organization: "DailyMed",
                title: "D-VITE Pediatric Oral Liquid — Cholecalciferol Solution",
                sourceType: "Official product label",
                url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f823cb3a-607c-4272-a0c1-da823dabd8e9"
            },
            {
                id: "nih-vitamin-d-fact-sheet",
                organization: "NIH Office of Dietary Supplements",
                title: "Vitamin D — Health Professional Fact Sheet",
                sourceType: "Authoritative clinical reference",
                url: "https://ods.od.nih.gov/factsheets/VITAMIND/HealthProfessional/"
            }
        ]
    }
];

vitaminsMedicines.forEach(medicine => {
    if (!medicines.some(existingMedicine => String(existingMedicine.id) === String(medicine.id))) {
        medicines.push(medicine);
    }
});

function getVitaminsMedicines() { return vitaminsMedicines; }
function getVitaminsMedicineCount() { return vitaminsMedicines.length; }

console.log("DoseCare Vitamins Loaded:", vitaminsMedicines.map(medicine => medicine.id));
