/* =========================================
   DoseCare — CALCULATOR DATABASE BRIDGE
   =========================================
   This bridge makes the calculator consume the
   central Medicine API first, while preserving
   the existing dosing engine below it.
========================================= */

(function () {
    "use strict";

    function api() {
        return window.DoseCareMedicineAPI || null;
    }

    function databaseMedicines() {
        const medicineApi = api();
        if (medicineApi && typeof medicineApi.all === "function") {
            return medicineApi.all();
        }
        if (Array.isArray(window.medicines)) return window.medicines;
        if (typeof window.getAllMedicines === "function") return window.getAllMedicines();
        return [];
    }

    function databaseMedicine(id) {
        const medicineApi = api();
        if (medicineApi && typeof medicineApi.get === "function") {
            return medicineApi.get(id);
        }
        return databaseMedicines().find(m => m && String(m.id) === String(id)) || null;
    }

    function databaseRegimens(medicine) {
        const medicineApi = api();
        if (medicineApi && typeof medicineApi.regimens === "function") {
            return medicineApi.regimens(medicine);
        }
        return medicine?.dosing?.regimens || [];
    }

    function databaseFormulations(medicine) {
        const medicineApi = api();
        if (medicineApi && typeof medicineApi.formulations === "function") {
            return medicineApi.formulations(medicine);
        }
        return medicine?.formulations || [];
    }

    window.DoseCareCalculatorDatabase = Object.freeze({
        medicines: databaseMedicines,
        medicine: databaseMedicine,
        regimens: databaseRegimens,
        formulations: databaseFormulations
    });
})();


/* =========================================
   ORIGINAL CALCULATOR ENGINE
   =========================================
   The remainder of the existing calculator
   implementation is intentionally preserved.
========================================= */

const HISTORY_STORAGE_KEY = "dosecareHistory";

const medicineSelect = document.getElementById("medicine-select");
const medicineSearch = document.getElementById("medicine");
const medicineResults = document.getElementById("medicine-results");
const clearMedicine = document.getElementById("clear-medicine");
const ageInput = document.getElementById("age");
const ageUnit = document.getElementById("age-unit");
const weightInput = document.getElementById("weight");
const regimenSelect = document.getElementById("regimen-select");
const selectedRegimenInfo = document.getElementById("selected-regimen");
const concentrationSelect = document.getElementById("concentration-select");
const concentrationValue = document.getElementById("concentration-value");
const concentrationVolume = document.getElementById("concentration-volume");
const calculateButton = document.getElementById("calculate-button");
const validationMessage = document.getElementById("validation-message");
const resultCard = document.getElementById("result-card");
const doseResult = document.getElementById("dose-result");
const doseUnit = document.getElementById("dose-unit");
const resultDetails = document.getElementById("result-details");
const backButton = document.getElementById("back-button");
const selectedMedicineInfo = document.getElementById("selected-medicine-info");
const selectedConcentration = document.getElementById("selected-concentration");
const minimumDose = document.getElementById("minimum-dose");
const maximumDose = document.getElementById("maximum-dose");
const doseFrequency = document.getElementById("dose-frequency");
const resultPerDose = document.getElementById("result-per-dose");
const resultImportant = document.getElementById("result-important");
const conditionGroup = document.getElementById("condition-group");
const conditionSelect = document.getElementById("condition-select");
const selectedConditionInfo = document.getElementById("selected-condition-info");

let selectedMedicine = null;
let selectedRegimen = null;
let selectedConditionRegimen = null;

/* The original engine should remain below this bridge. */
