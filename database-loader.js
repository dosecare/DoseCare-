/* =========================================
   DoseCare — CENTRAL DATABASE LOADER
========================================= */
(function () {
    "use strict";

    function validateDatabase() {
        const list = Array.isArray(window.medicines) ? window.medicines : [];
        const seen = new Set();
        const errors = [];

        list.forEach((medicine, index) => {
            if (!medicine || typeof medicine !== "object") {
                errors.push(`Record ${index + 1}: invalid object`);
                return;
            }
            if (!medicine.id) {
                errors.push(`Record ${index + 1}: missing id`);
                return;
            }
            if (seen.has(medicine.id)) {
                errors.push(`${medicine.id}: duplicate id`);
                return;
            }
            seen.add(medicine.id);

            if (window.DoseCareMedicineSchema && typeof window.DoseCareMedicineSchema.validate === "function") {
                const result = window.DoseCareMedicineSchema.validate(medicine);
                if (!result.valid) {
                    errors.push(...result.errors.map(error => `${medicine.id}: ${error}`));
                }
            }
        });

        return {
            valid: errors.length === 0,
            errors,
            count: list.length
        };
    }

    function publish() {
        const medicines = Array.isArray(window.medicines) ? window.medicines : [];
        const validation = validateDatabase();

        window.DoseCareDatabase = window.DoseCareDatabase || {};
        window.DoseCareDatabase.version = "1.6.0";
        window.DoseCareDatabase.core = "medicines.js";
        window.DoseCareDatabase.medicines = medicines;
        window.DoseCareDatabase.validation = validation;
        window.DoseCareDatabase.rejected = validation.errors;
        window.DoseCareDatabase.ready = true;

        window.dispatchEvent(new CustomEvent("dosecare:database-ready", {
            detail: { medicines, validation }
        }));

        return medicines;
    }

    window.DoseCareDatabaseLoader = Object.freeze({
        getMedicines: () => Array.isArray(window.medicines) ? [...window.medicines] : [],
        validate: validateDatabase,
        publish
    });

    // Medicine files are loaded by the HTML in a deterministic order.
    // This loader must NOT dynamically reload them or app.js/script.js.
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", publish, { once: true });
    } else {
        publish();
    }
})();
