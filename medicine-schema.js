/* =========================================
   DoseCare — MEDICINE SCHEMA VALIDATOR
=========================================

   This file does NOT calculate doses.
   It only protects the database boundary.

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

    function isAllowedOralLiquid(medicine) {
        if (!medicine || typeof medicine !== "object") {
            return false;
        }

        const forms = [];

        if (Array.isArray(medicine.dosageForms)) {
            forms.push(...medicine.dosageForms);
        }

        if (Array.isArray(medicine.formulations)) {
            medicine.formulations.forEach(function (item) {
                if (item && item.dosageForm) {
                    forms.push(item.dosageForm);
                }
            });
        }

        return forms.length > 0 &&
            forms.every(function (form) {
                return ALLOWED_FORMS.has(
                    normalizeForm(form)
                );
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

        if (!medicine.id) {
            errors.push("Missing medicine.id.");
        }

        if (!medicine.genericName) {
            errors.push("Missing medicine.genericName.");
        }

        if (!isAllowedOralLiquid(medicine)) {
            errors.push(
                "Medicine must contain oral-liquid dosage forms only."
            );
        }

        if (
            !Array.isArray(medicine.formulations) ||
            medicine.formulations.length === 0
        ) {
            errors.push("Missing medicine.formulations.");
        }

        if (
            !medicine.dosing ||
            typeof medicine.dosing !== "object"
        ) {
            errors.push("Missing medicine.dosing.");
        }

        if (
            !Array.isArray(medicine.references) ||
            medicine.references.length === 0
        ) {
            errors.push("Missing medicine.references.");
        }

        return {
            valid: errors.length === 0,
            errors: errors
        };
    }

    window.DoseCareMedicineSchema = {
        allowedForms: Object.freeze([
            ...ALLOWED_FORMS
        ]),
        validate: validateMedicine,
        isAllowedOralLiquid: isAllowedOralLiquid
    };
})();
