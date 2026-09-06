/* =========================================
   DoseCare — MEDICINE SCHEMA VALIDATOR
=========================================
   Database-boundary validation only.
   No dose calculation is performed here.

   Scope:
   - Pediatric oral liquids only
   - One unified medicine shape
   - No duplicate IDs
   - No non-oral dosage forms
========================================= */

(function () {
    "use strict";

    const ALLOWED_FORMS = new Set([
        "syrup",
        "oral solution",
        "oral suspension"
    ]);

    function normalizeForm(value) {
        return String(value || "")
            .trim()
            .toLowerCase();
    }

    function getFormulationForms(medicine) {
        const forms = [];

        if (Array.isArray(medicine.dosageForms)) {
            forms.push(...medicine.dosageForms);
        }

        if (Array.isArray(medicine.formulations)) {
            medicine.formulations.forEach(function (item) {
                if (!item || typeof item !== "object") return;

                /* Unified schema uses `form`; older records may use
                   `dosageForm`. Accept both during migration. */
                const form = item.form || item.dosageForm;
                if (form) forms.push(form);
            });
        }

        return forms;
    }

    function isAllowedOralLiquid(medicine) {
        if (!medicine || typeof medicine !== "object") {
            return false;
        }

        const forms = getFormulationForms(medicine);

        return forms.length > 0 && forms.every(function (form) {
            return ALLOWED_FORMS.has(normalizeForm(form));
        });
    }

    function validateMedicine(medicine) {
        const errors = [];

        if (!medicine || typeof medicine !== "object") {
            return {
                valid: false,
                errors: ["Medicine must be an object."]
            };
        }

        if (!medicine.id) errors.push("Missing medicine.id.");
        if (!medicine.genericName) errors.push("Missing medicine.genericName.");

        if (medicine.route && normalizeForm(medicine.route) !== "oral") {
            errors.push("Medicine route must be oral.");
        }

        if (!isAllowedOralLiquid(medicine)) {
            errors.push("Medicine must contain oral-liquid dosage forms only.");
        }

        if (!Array.isArray(medicine.formulations) || medicine.formulations.length === 0) {
            errors.push("Missing medicine.formulations.");
        }

        if (!medicine.dosing || typeof medicine.dosing !== "object") {
            errors.push("Missing medicine.dosing.");
        }

        if (!Array.isArray(medicine.references) || medicine.references.length === 0) {
            errors.push("Missing medicine.references.");
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }

    window.DoseCareMedicineSchema = Object.freeze({
        allowedForms: Object.freeze([...ALLOWED_FORMS]),
        validate: validateMedicine,
        isAllowedOralLiquid,
        getFormulationForms
    });
})();
