/*
 * DoseCare Database Loader V2
 * Read-only adapter for the existing database.
 * Does not impose one medicine schema.
 */
(function (global) {
    "use strict";

    const ORAL_LIQUID_FORMS = new Set([
        "syrup", "syrups", "oral syrup",
        "oral solution", "oral solutions",
        "oral suspension", "oral suspensions",
        "oral liquid", "oral liquids",
        "solution", "suspension"
    ]);

    const FORBIDDEN_FORMS = new Set([
        "tablet", "tablets", "tab", "capsule", "capsules", "cap",
        "chewable", "chewables", "injection", "injectable", "iv",
        "iv injection", "intravenous", "im", "intramuscular",
        "suppository", "suppositories", "cream", "ointment", "gel",
        "patch", "powder", "granules", "lozenge"
    ]);

    function text(value) {
        return String(value == null ? "" : value).trim().toLowerCase().replace(/\s+/g, " ");
    }

    function valuesFromMedicine(medicine, keys) {
        const values = [];
        keys.forEach((key) => {
            const value = medicine && medicine[key];
            if (Array.isArray(value)) values.push(...value);
            else if (value != null && value !== "") values.push(value);
        });
        return values;
    }

    function isOralLiquid(medicine) {
        if (!medicine || typeof medicine !== "object") return false;
        const forms = valuesFromMedicine(medicine, [
            "dosageForm", "dosageForms", "dosage_form", "form",
            "routeForm", "preparation", "pharmaceuticalForm"
        ]).map(text).filter(Boolean);

        if (forms.some((form) => FORBIDDEN_FORMS.has(form))) return false;
        if (forms.some((form) => ORAL_LIQUID_FORMS.has(form))) return true;
        if (forms.length > 0) return false;

        const routes = valuesFromMedicine(medicine, ["route", "administrationRoute"]).map(text);
        return routes.some((route) => route === "oral" || route.includes("oral"));
    }

    function getSourceMedicines() {
        /*
         * medicines.js declares `const medicines`, so it is intentionally
         * not a window property. Its public getAllMedicines() function IS
         * available to later classic scripts, so use that first.
         */
        if (typeof global.getAllMedicines === "function") {
            const database = global.getAllMedicines();
            if (Array.isArray(database)) return database;
        }
        if (Array.isArray(global.medicines)) return global.medicines;
        if (Array.isArray(global.medicineDatabase)) return global.medicineDatabase;
        if (Array.isArray(global.DoseCareMedicines)) return global.DoseCareMedicines;
        return [];
    }

    function getId(medicine, index) {
        return medicine.id || medicine.code || medicine.key ||
            text(medicine.genericName || medicine.name || medicine.brandName) ||
            `medicine-${index}`;
    }

    function getName(medicine) {
        return medicine.genericName || medicine.name || medicine.generic_name || medicine.brandName || "Unnamed medicine";
    }

    function getForms(medicine) {
        return valuesFromMedicine(medicine, [
            "dosageForm", "dosageForms", "dosage_form", "form",
            "routeForm", "preparation", "pharmaceuticalForm"
        ]);
    }

    function normalizeMedicine(medicine, index) {
        return {
            id: getId(medicine, index),
            name: getName(medicine),
            genericName: medicine.genericName || medicine.generic_name || medicine.name || "",
            forms: getForms(medicine),
            route: medicine.route || medicine.administrationRoute || "",
            source: medicine,
            dosing: medicine.dosing || medicine.dose || medicine.regimens || null,
            concentrations: medicine.concentrations || medicine.formulations || medicine.concentration || null
        };
    }

    function getCalculatorMedicines() {
        return getSourceMedicines()
            .filter(isOralLiquid)
            .map(normalizeMedicine);
    }

    global.DoseCareDatabaseV2 = Object.freeze({
        getSourceMedicines,
        isOralLiquid,
        normalizeMedicine,
        getCalculatorMedicines
    });
})(typeof window !== "undefined" ? window : globalThis);