/* =========================================
   DoseCare — MEDICINE API
   =========================================
   The calculator talks to this API instead of
   depending on individual medicine files.
========================================= */
(function () {
    "use strict";

    function database() {
        return window.DoseCareDatabase || {};
    }

    function all() {
        return Array.isArray(database().medicines)
            ? database().medicines
            : (typeof window.getAllMedicines === "function" ? window.getAllMedicines() : []);
    }

    function get(id) {
        return all().find(medicine => medicine && medicine.id === id) || null;
    }

    function regimens(medicineOrId) {
        const medicine = typeof medicineOrId === "string" ? get(medicineOrId) : medicineOrId;
        return medicine && medicine.dosing && Array.isArray(medicine.dosing.regimens)
            ? medicine.dosing.regimens
            : [];
    }

    function formulations(medicineOrId) {
        const medicine = typeof medicineOrId === "string" ? get(medicineOrId) : medicineOrId;
        return medicine && Array.isArray(medicine.formulations) ? medicine.formulations : [];
    }

    function conditions(medicineOrId) {
        return [...new Set(regimens(medicineOrId)
            .map(regimen => regimen && regimen.condition)
            .filter(Boolean))];
    }

    function isReady() {
        return database().ready === true;
    }

    window.DoseCareMedicineAPI = Object.freeze({
        all,
        get,
        regimens,
        formulations,
        conditions,
        isReady
    });
})();
