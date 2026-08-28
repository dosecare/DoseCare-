/* =========================================
   DoseCare — MEDICINE API
========================================= */
(function () {
    "use strict";

    function database() {
        return window.DoseCareDatabase || {};
    }

    function all() {
        const db = database();
        if (Array.isArray(db.medicines)) return db.medicines;
        return typeof window.getAllMedicines === "function"
            ? window.getAllMedicines()
            : (Array.isArray(window.medicines) ? window.medicines : []);
    }

    function get(id) {
        if (id && typeof id === "object") return id;
        return all().find(medicine => medicine && String(medicine.id) === String(id)) || null;
    }

    function regimens(medicineOrId) {
        const medicine = get(medicineOrId);
        if (!medicine || !medicine.dosing) return [];
        if (Array.isArray(medicine.dosing.regimens)) return medicine.dosing.regimens;
        if (Array.isArray(medicine.dosing.conditionBased)) return medicine.dosing.conditionBased;
        return medicine.dosing.type ? [medicine.dosing] : [];
    }

    function formulations(medicineOrId) {
        const medicine = get(medicineOrId);
        return medicine && Array.isArray(medicine.formulations) ? medicine.formulations : [];
    }

    function concentrations(medicineOrId) {
        const medicine = get(medicineOrId);
        if (!medicine) return [];
        if (Array.isArray(medicine.concentrations)) return medicine.concentrations;
        if (Array.isArray(medicine.formulations)) {
            return medicine.formulations.map(item => item && item.concentration).filter(Boolean);
        }
        return medicine.concentration ? [medicine.concentration] : [];
    }

    function conditions(medicineOrId) {
        const medicine = get(medicineOrId);
        if (!medicine) return [];
        const values = [];
        if (Array.isArray(medicine.conditions)) values.push(...medicine.conditions);
        values.push(...regimens(medicine).map(regimen => regimen && (regimen.condition || regimen.indication)));
        return [...new Set(values.filter(Boolean).map(String))];
    }

    function isReady() {
        return Array.isArray(window.medicines) && window.medicines.length >= 0;
    }

    window.DoseCareMedicineAPI = Object.freeze({
        all,
        get,
        regimens,
        formulations,
        concentrations,
        conditions,
        isReady
    });

    /* Compatibility bridge for legacy helper signatures in calculator.js. */
    function installCalculatorBridge() {
        const originalGetMedicineById = window.getMedicineById;
        if (typeof originalGetMedicineById === "function" && !originalGetMedicineById.__doseCareCompat) {
            const compatibleGetMedicineById = function (id) {
                if (id && typeof id === "object") return id;
                return originalGetMedicineById(id) || get(id);
            };
            Object.defineProperty(compatibleGetMedicineById, "__doseCareCompat", { value: true });
            window.getMedicineById = compatibleGetMedicineById;
        }

        window.getMedicineRegimens = function (medicineOrId) {
            return regimens(medicineOrId);
        };

        window.medicineRequiresCondition = function (medicineOrId) {
            const medicine = get(medicineOrId);
            if (!medicine || !medicine.dosing) return false;
            return medicine.dosing.type === "condition_based" ||
                (Array.isArray(medicine.dosing.conditionBased) && medicine.dosing.conditionBased.length > 0) ||
                medicine.indicationSpecific === true;
        };
    }

    /* calculator.js is loaded later in the HTML. A zero-delay task runs
       after the synchronous script stack, so the legacy declarations have
       been created before we install the bridge. */
    setTimeout(installCalculatorBridge, 0);
    window.addEventListener("load", installCalculatorBridge, { once: true });
})();
