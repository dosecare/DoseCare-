/*
 * DoseCare Calculator V2
 *
 * Rebuild of the calculator UI logic without changing the existing CSS or
 * medicine records. Medicine-specific dosing structures are preserved.
 * This file is intended to run on the rebuild/calculator-v2 branch first.
 */
(function (global) {
    "use strict";

    const state = {
        medicines: [],
        selectedMedicine: null,
        selectedRegimen: null,
        selectedConcentration: null,
        selectedCondition: null
    };

    function $(id) {
        return document.getElementById(id);
    }

    function clearSelect(select, placeholder) {
        if (!select) return;
        select.innerHTML = "";
        const option = document.createElement("option");
        option.value = "";
        option.textContent = placeholder;
        select.appendChild(option);
    }

    function number(value) {
        const n = Number(value);
        return Number.isFinite(n) ? n : null;
    }

    function ageInMonths() {
        const value = number($("age") && $("age").value);
        if (value == null || value < 0) return null;
        return $("age-unit") && $("age-unit").value === "years" ? value * 12 : value;
    }

    function regimenList(source) {
        return global.DoseCareDosingEngineV2.resolveRegimens(source);
    }

    function concentrationList(source, regimen) {
        const candidates = [];
        const add = (value) => {
            if (Array.isArray(value)) candidates.push(...value);
            else if (value != null) candidates.push(value);
        };

        add(regimen && regimen.concentrations);
        add(regimen && regimen.formulations);
        add(regimen && regimen.concentration);
        add(source && source.concentrations);
        add(source && source.formulations);
        add(source && source.concentration);

        return candidates;
    }

    function conditionKey(regimen) {
        return regimen && (
            regimen.condition || regimen.indication || regimen.clinicalCondition ||
            regimen.conditionName || regimen.forCondition
        );
    }

    function regimenAppliesToPatient(regimen) {
        const age = ageInMonths();
        const minAge = number(regimen.minAgeMonths ?? regimen.minimumAgeMonths);
        const maxAge = number(regimen.maxAgeMonths ?? regimen.maximumAgeMonths);

        if (age != null) {
            if (minAge != null && age < minAge) return false;
            if (maxAge != null && age > maxAge) return false;
        }

        return true;
    }

    function renderMedicines() {
        const select = $("medicine-select");
        const results = $("medicine-results");
        const search = $("medicine");
        if (!select) return;

        clearSelect(select, "Select a medicine");
        if (results) results.innerHTML = "";

        state.medicines.forEach((medicine, index) => {
            const source = medicine.source;
            const option = document.createElement("option");
            option.value = String(index);
            option.textContent = medicine.name;
            select.appendChild(option);
        });

        if (search) search.addEventListener("input", renderSearchResults, { passive: true });
        select.addEventListener("change", () => selectMedicine(Number(select.value)));
        renderSearchResults();
    }

    function renderSearchResults() {
        const container = $("medicine-results");
        const input = $("medicine");
        if (!container || !input) return;

        const query = input.value.trim().toLowerCase();
        container.innerHTML = "";
        if (!query) return;

        state.medicines
            .filter((medicine) => medicine.name.toLowerCase().includes(query))
            .slice(0, 10)
            .forEach((medicine) => {
                const index = state.medicines.indexOf(medicine);
                const button = document.createElement("button");
                button.type = "button";
                button.textContent = medicine.name;
                button.addEventListener("click", () => {
                    $("medicine-select").value = String(index);
                    selectMedicine(index);
                    input.value = medicine.name;
                    container.innerHTML = "";
                });
                container.appendChild(button);
            });
    }

    function renderMedicineInfo(medicine) {
        const target = $("selected-medicine-info");
        if (!target) return;
        target.textContent = "";
        if (!medicine) return;

        const source = medicine.source;
        const forms = medicine.forms.filter(Boolean).join(", ");
        const route = medicine.route || "";
        const info = document.createElement("div");
        info.textContent = [medicine.name, forms, route].filter(Boolean).join(" • ");
        target.appendChild(info);
    }

    function renderConditions(regimens) {
        const group = $("condition-group");
        const select = $("condition-select");
        if (!group || !select) return;

        const conditions = [];
        regimens.forEach((regimen) => {
            const value = conditionKey(regimen);
            if (value && !conditions.includes(String(value))) conditions.push(String(value));
        });

        clearSelect(select, "Select a condition");
        group.style.display = conditions.length > 0 ? "" : "none";

        conditions.forEach((condition) => {
            const option = document.createElement("option");
            option.value = condition;
            option.textContent = condition;
            select.appendChild(option);
        });

        select.onchange = () => {
            state.selectedCondition = select.value || null;
            renderRegimens();
        };
    }

    function renderRegimens() {
        const select = $("regimen-select");
        if (!select || !state.selectedMedicine) return;

        const source = state.selectedMedicine.source;
        let regimens = regimenList(source).filter(regimenAppliesToPatient);
        if (state.selectedCondition) {
            regimens = regimens.filter((regimen) => String(conditionKey(regimen) || "") === state.selectedCondition);
        }

        clearSelect(select, "Select a dose regimen");
        select.disabled = regimens.length === 0;

        regimens.forEach((regimen, index) => {
            const option = document.createElement("option");
            option.value = String(index);
            option.textContent = regimen.label || regimen.name || regimen.description || regimen.type || "Pediatric dosing regimen";
            select.appendChild(option);
        });

        select.onchange = () => {
            const index = Number(select.value);
            state.selectedRegimen = Number.isInteger(index) ? regimens[index] || null : null;
            renderConcentrations();
        };

        state._visibleRegimens = regimens;
        renderConcentrations();
    }

    function renderConcentrations() {
        const select = $("concentration-select");
        if (!select || !state.selectedMedicine) return;

        const concentrations = concentrationList(state.selectedMedicine.source, state.selectedRegimen);
        clearSelect(select, "Select a concentration");
        select.disabled = concentrations.length === 0;

        concentrations.forEach((concentration, index) => {
            const option = document.createElement("option");
            option.value = String(index);
            option.textContent = formatConcentration(concentration);
            select.appendChild(option);
        });

        select.onchange = () => {
            const index = Number(select.value);
            state.selectedConcentration = concentrations[index] || null;
            renderSelectedConcentration();
        };

        state._visibleConcentrations = concentrations;
        state.selectedConcentration = null;
        renderSelectedConcentration();
    }

    function formatConcentration(concentration) {
        if (!concentration) return "";
        if (typeof concentration === "string") return concentration;
        const amount = number(concentration.amount ?? concentration.mg ?? concentration.strength);
        const unit = concentration.unit || "mg";
        const volume = number(concentration.volume ?? concentration.ml);
        const volumeUnit = concentration.volumeUnit || "mL";
        if (amount != null && volume != null) return `${amount} ${unit} / ${volume} ${volumeUnit}`;
        return concentration.label || concentration.name || "Available concentration";
    }

    function renderSelectedConcentration() {
        const target = $("selected-concentration");
        if (!target) return;
        target.textContent = state.selectedConcentration ? formatConcentration(state.selectedConcentration) : "";
    }

    function selectMedicine(index) {
        state.selectedMedicine = state.medicines[index] || null;
        state.selectedRegimen = null;
        state.selectedConcentration = null;
        state.selectedCondition = null;
        renderMedicineInfo(state.selectedMedicine);

        if (!state.selectedMedicine) {
            clearSelect($("regimen-select"), "Select a dose regimen");
            clearSelect($("concentration-select"), "Select a concentration");
            return;
        }

        const regimens = regimenList(state.selectedMedicine.source);
        renderConditions(regimens);
        renderRegimens();
    }

    function validateInputs() {
        const medicine = state.selectedMedicine;
        const regimen = state.selectedRegimen;
        const weight = number($("weight") && $("weight").value);
        const message = $("validation-message");

        const fail = (text) => {
            if (message) {
                message.style.display = "";
                const p = message.querySelector("p");
                if (p) p.textContent = text;
            }
            return false;
        };

        if (!medicine) return fail("Select a medicine first.");
        if (!regimen) return fail("Select a pediatric dosing regimen.");
        if (weight == null || weight <= 0) return fail("Enter a valid patient weight.");
        if (!state.selectedConcentration) return fail("Select an available concentration.");
        if (message) message.style.display = "none";
        return true;
    }

    function renderResult(result) {
        const set = (id, value) => {
            const element = $(id);
            if (element) element.textContent = value == null ? "—" : value;
        };

        set("dose-result", result.perDoseMg != null ? formatNumber(result.perDoseMg) : "—");
        set("dose-unit", "mg");
        set("dose-result-ml", result.volumeMlPerDose != null ? formatNumber(result.volumeMlPerDose) : "—");
        set("dose-frequency", result.frequency || "—");
        set("result-per-dose", "Per dose");
        set("result-patient-age", $("age") && $("age").value ? `${$("age").value} ${$("age-unit").value}` : "—");
        set("result-patient-weight", `${$("weight").value} kg`);

        const steps = $("calculation-steps");
        if (steps) {
            steps.innerHTML = "";
            const lines = [];
            const type = result.regimen.type || result.regimen.dosingType || "Medicine-specific regimen";
            lines.push(`Regimen: ${type}`);
            if (result.perDoseMg != null) lines.push(`Dose per administration: ${formatNumber(result.perDoseMg)} mg`);
            if (result.totalMgPerDay != null) lines.push(`Total per day: ${formatNumber(result.totalMgPerDay)} mg/day`);
            if (result.volumeMlPerDose != null) lines.push(`Volume: ${formatNumber(result.volumeMlPerDose)} mL per dose`);
            lines.forEach((line) => {
                const div = document.createElement("div");
                div.textContent = line;
                steps.appendChild(div);
            });
        }

        const resultCard = $("result-card");
        if (resultCard) resultCard.style.display = "";
    }

    function formatNumber(value) {
        const n = number(value);
        if (n == null) return "—";
        return Number.isInteger(n) ? String(n) : n.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
    }

    function calculate() {
        if (!validateInputs()) return;

        const source = state.selectedMedicine.source;
        const regimen = state.selectedRegimen;
        const weight = number($("weight").value);
        const resultList = global.DoseCareDosingEngineV2.calculate(
            Object.assign({}, source, { regimens: [regimen] }),
            { weight, ageMonths: ageInMonths() }
        );

        const result = resultList[0];
        if (!result) {
            const message = $("validation-message");
            if (message) {
                message.style.display = "";
                const p = message.querySelector("p");
                if (p) p.textContent = "This medicine-specific regimen could not be calculated safely by the current engine.";
            }
            return;
        }

        // Use the concentration explicitly selected by the user.
        result.concentration = state.selectedConcentration;
        result.volumeMlPerDose = global.DoseCareDosingEngineV2.concentrationToMl(result.perDoseMg, state.selectedConcentration);
        renderResult(result);
    }

    function init() {
        if (!global.DoseCareDatabaseV2 || !global.DoseCareDosingEngineV2) {
            console.error("DoseCare V2 dependencies are missing.");
            return;
        }

        state.medicines = global.DoseCareDatabaseV2.getCalculatorMedicines();
        console.info("DoseCare V2 medicines loaded:", state.medicines.length);
        renderMedicines();

        const calculateButton = $("calculate-button");
        if (calculateButton) calculateButton.addEventListener("click", calculate);

        const clearButton = $("clear-medicine");
        if (clearButton) clearButton.addEventListener("click", () => {
            const input = $("medicine");
            if (input) input.value = "";
            renderSearchResults();
        });
    }

    global.DoseCareCalculatorV2 = Object.freeze({
        init,
        state
    });

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init, { once: true });
    } else {
        init();
    }
})(window);
