/*
 * DoseCare Calculator V2 UI Adapter
 *
 * Keeps the existing calculator HTML/CSS intact and connects the
 * existing medicine database to the V2 engine without imposing a
 * universal medicine schema.
 */
(function () {
    "use strict";

    const state = {
        medicines: [],
        selectedMedicine: null
    };

    function byId(id) {
        return document.getElementById(id);
    }

    function text(value) {
        return value == null ? "" : String(value).trim();
    }

    function getDatabase() {
        if (typeof DoseCareDatabaseV2 !== "undefined" &&
            typeof DoseCareDatabaseV2.getMedicines === "function") {
            return DoseCareDatabaseV2.getMedicines();
        }

        if (typeof medicines !== "undefined" && Array.isArray(medicines)) {
            return medicines;
        }

        if (Array.isArray(window.medicines)) {
            return window.medicines;
        }

        return [];
    }

    function isOralLiquid(medicine) {
        if (!medicine) return false;

        const values = [];
        [
            medicine.dosageForm,
            medicine.dosageForms,
            medicine.dosage_form,
            medicine.form,
            medicine.routeForm,
            medicine.preparation,
            medicine.pharmaceuticalForm
        ].forEach(value => {
            if (Array.isArray(value)) values.push(...value);
            else if (value) values.push(value);
        });

        const normalized = values.map(v => text(v).toLowerCase());

        const forbidden = [
            "tablet", "tablets", "capsule", "capsules", "chewable", "chewables",
            "injection", "injectable", "iv", "intravenous", "im", "intramuscular",
            "suppository", "suppositories", "cream", "ointment", "gel", "patch",
            "powder", "granules", "lozenge"
        ];

        if (normalized.some(value => forbidden.includes(value))) return false;

        const accepted = [
            "syrup", "syrups", "oral syrup", "oral solution", "oral solutions",
            "oral suspension", "oral suspensions", "oral liquid", "oral liquids",
            "solution", "suspension"
        ];

        if (normalized.some(value => accepted.includes(value))) return true;

        return normalized.length === 0;
    }

    function medicineName(medicine) {
        return text(
            medicine.name || medicine.genericName || medicine.brandName || medicine.id
        );
    }

    function populate() {
        const select = byId("medicine-select");
        if (!select) return;

        state.medicines = getDatabase().filter(isOralLiquid);
        select.innerHTML = '<option value="">Select a medicine</option>';

        state.medicines.forEach((medicine, index) => {
            const option = document.createElement("option");
            option.value = text(medicine.id) || String(index);
            option.textContent = medicineName(medicine);
            option.dataset.index = String(index);
            select.appendChild(option);
        });

        console.info("DoseCare V2: medicines loaded:", state.medicines.length);
    }

    function findMedicine(value) {
        return state.medicines.find((medicine, index) =>
            text(medicine.id) === value || String(index) === value
        ) || null;
    }

    function renderSelection(medicine) {
        const info = byId("selected-medicine-info");
        if (!info) return;

        if (!medicine) {
            info.innerHTML = "";
            return;
        }

        const name = medicineName(medicine);
        const form = medicine.dosageForm || medicine.form || "Oral liquid";

        info.innerHTML = `
            <div class="selected-medicine-name">${name}</div>
            <div class="selected-medicine-form">${text(form)}</div>
        `;
    }

    function selectMedicine(value) {
        state.selectedMedicine = findMedicine(value);
        renderSelection(state.selectedMedicine);

        if (typeof window.DoseCareCalculatorV2 !== "undefined" &&
            typeof window.DoseCareCalculatorV2.setMedicine === "function") {
            window.DoseCareCalculatorV2.setMedicine(state.selectedMedicine);
        }
    }

    function bind() {
        const select = byId("medicine-select");
        if (select) {
            select.addEventListener("change", function () {
                selectMedicine(this.value);
            });
        }

        const search = byId("medicine");
        const results = byId("medicine-results");
        if (search && results) {
            search.addEventListener("input", function () {
                const query = text(this.value).toLowerCase();
                results.innerHTML = "";
                if (!query) return;

                state.medicines
                    .filter(medicine => medicineName(medicine).toLowerCase().includes(query))
                    .slice(0, 10)
                    .forEach(medicine => {
                        const item = document.createElement("button");
                        item.type = "button";
                        item.textContent = medicineName(medicine);
                        item.addEventListener("click", function () {
                            const select = byId("medicine-select");
                            if (!select) return;
                            select.value = text(medicine.id);
                            if (!select.value) {
                                const index = state.medicines.indexOf(medicine);
                                select.value = String(index);
                            }
                            selectMedicine(select.value);
                            search.value = medicineName(medicine);
                            results.innerHTML = "";
                        });
                        results.appendChild(item);
                    });
            });
        }
    }

    window.addEventListener("load", function () {
        try {
            populate();
            bind();
        } catch (error) {
            console.error("DoseCare V2 adapter initialization error:", error);
        }
    });

    window.DoseCareCalculatorV2Adapter = {
        populate,
        getMedicines: () => state.medicines.slice(),
        getSelectedMedicine: () => state.selectedMedicine
    };
})();
