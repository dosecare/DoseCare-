/* DoseCare Calculator V2 UI adapter.
 * V2 owns the UI when present. This file is only a compatibility fallback.
 */
(function (global) {
    "use strict";

    function getMedicines() {
        if (typeof global.getAllMedicines === "function") {
            const list = global.getAllMedicines();
            return Array.isArray(list) ? list : [];
        }
        if (Array.isArray(global.medicines)) return global.medicines;
        return [];
    }

    function isOralLiquid(medicine) {
        if (!medicine) return false;
        const values = [];
        [medicine.dosageForm, medicine.dosageForms, medicine.dosage_form,
         medicine.form, medicine.routeForm, medicine.preparation,
         medicine.pharmaceuticalForm].forEach(value => {
            if (Array.isArray(value)) values.push(...value);
            else if (value != null) values.push(value);
        });
        const forms = values.map(value => String(value).trim().toLowerCase());
        const forbidden = new Set([
            "tablet", "tablets", "tab", "capsule", "capsules", "cap",
            "chewable", "chewables", "injection", "injectable", "iv",
            "iv injection", "intravenous", "im", "intramuscular",
            "suppository", "suppositories", "cream", "ointment", "gel",
            "patch", "powder", "granules", "lozenge"
        ]);
        const accepted = new Set([
            "syrup", "syrups", "oral syrup", "oral solution", "oral solutions",
            "oral suspension", "oral suspensions", "oral liquid", "oral liquids",
            "solution", "suspension"
        ]);
        if (forms.some(form => forbidden.has(form))) return false;
        if (forms.some(form => accepted.has(form))) return true;
        return forms.length === 0 && String(medicine.route || medicine.administrationRoute || "").toLowerCase().includes("oral");
    }

    function initFallback() {
        // Never compete with the V2 calculator, which owns state and listeners.
        if (global.DoseCareCalculatorV2) return;
        const select = document.getElementById("medicine-select");
        if (!select) return;
        const medicines = getMedicines().filter(isOralLiquid);
        select.innerHTML = '<option value="">Select a medicine</option>';
        medicines.forEach((medicine, index) => {
            const option = document.createElement("option");
            option.value = medicine.id || String(index);
            option.textContent = medicine.genericName || medicine.name || medicine.brandName || "Unnamed medicine";
            select.appendChild(option);
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initFallback, { once: true });
    } else {
        initFallback();
    }
})(window);