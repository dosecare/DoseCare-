/* =========================================
   DoseCare — MEDICINE TEMPLATE
=========================================

   COPY this file when adding a new medicine.
   Replace the placeholder values only.

   Do NOT edit calculator.js for a new medicine.
========================================= */

registerMedicines([
    {
        id: "medicine-id",

        genericName: "Medicine Name",

        brandNames: [],

        drugClass: [],

        route: "oral",

        dosageForms: [
            "oral suspension"
        ],

        formulations: [
            {
                dosageForm: "oral suspension",
                concentration: {
                    amount: 0,
                    unit: "mg",
                    volume: 5,
                    volumeUnit: "mL"
                },
                display: "0 mg/5 mL"
            }
        ],

        indications: [],
        conditions: [],

        moa: "",

        pediatric: {
            age: {
                minimumMonths: 0
            }
        },

        dosing: {
            calculatorReady: false,
            regimens: []
        },

        references: []
    }
]);
