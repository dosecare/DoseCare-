/* =========================================================
   DoseCare — FIXED DOSE SUPPORT

   General support for explicitly configured fixed-dose
   pediatric oral-liquid regimens.

   This is intentionally separate from medicine data.
   It does not invent doses; it only calculates values
   already configured in the central medicine database.
========================================================= */

(function () {
    "use strict";

    function number(value) {
        const n = Number(value);
        return Number.isFinite(n) ? n : null;
    }

    function text(value, fallback = "") {
        return value === undefined || value === null
            ? fallback
            : String(value);
    }

    function format(value, decimals = 2) {
        const n = number(value);
        if (n === null) return "—";
        return String(Number(n.toFixed(decimals)));
    }

    function showValidation(message) {
        const box = document.getElementById("validation-message");
        if (!box) return;
        const paragraph = box.querySelector("p");
        if (paragraph) paragraph.textContent = message;
        box.style.display = "flex";
    }

    function hideValidation() {
        const box = document.getElementById("validation-message");
        if (box) box.style.display = "none";
    }

    function getSelectedMedicine() {
        const select = document.getElementById("medicine-select");
        if (!select || !select.value || !Array.isArray(window.medicines)) {
            return null;
        }
        return window.medicines.find(
            medicine => String(medicine.id) === String(select.value)
        ) || null;
    }

    function getSelectedRegimen(medicine) {
        const select = document.getElementById("regimen-select");
        if (!medicine || !medicine.dosing) return null;

        const regimens = Array.isArray(medicine.dosing.regimens)
            ? medicine.dosing.regimens
            : [medicine.dosing];

        if (select && select.value) {
            const index = Number(select.value);
            if (Number.isInteger(index) && regimens[index]) {
                return regimens[index];
            }

            const byId = regimens.find(
                regimen => String(regimen.id || "") === String(select.value)
            );
            if (byId) return byId;
        }

        return regimens.length === 1 ? regimens[0] : null;
    }

    function getSelectedConcentration() {
        const select = document.getElementById("concentration-select");
        if (!select || !select.value) return null;

        try {
            const parsed = JSON.parse(select.value);
            const mg = number(parsed.mg);
            const ml = number(parsed.ml);
            if (mg === null || ml === null || mg <= 0 || ml <= 0) {
                return null;
            }
            return { mg, ml };
        } catch {
            return null;
        }
    }

    function getAgeMonths() {
        const age = number(document.getElementById("age")?.value);
        const unit = document.getElementById("age-unit")?.value || "months";
        if (age === null || age < 0) return null;
        return unit === "years" ? age * 12 : age;
    }

    function checkAge(regimen) {
        const ageMonths = getAgeMonths();
        if (ageMonths === null) {
            return { valid: false, message: "Patient age is required for this fixed-dose regimen." };
        }

        const min = number(regimen.minimumAgeMonths);
        const max = number(regimen.maximumAgeMonths);

        if (min !== null && ageMonths < min) {
            return { valid: false, message: `This regimen is not configured for patients younger than ${min} months.` };
        }

        if (max !== null && ageMonths > max) {
            return { valid: false, message: `This regimen is not configured for patients older than ${max} months.` };
        }

        return { valid: true };
    }

    function calculateFixedDose(regimen, concentration) {
        const dose = number(regimen.dose);
        if (dose === null || dose < 0) return null;

        const doseUnit = text(regimen.doseUnit, "mg/dose").toLowerCase();
        const frequency = number(regimen.frequency) || 1;

        let doseMgPerAdministration = dose;
        let dailyDoseMg = dose;

        if (doseUnit.includes("/day")) {
            dailyDoseMg = dose;
            doseMgPerAdministration = dose / frequency;
        }

        const mgPerMl = concentration.mg / concentration.ml;
        const volumeMl = doseMgPerAdministration / mgPerMl;

        return {
            doseMgPerAdministration,
            dailyDoseMg,
            volumeMl,
            frequency,
            mgPerMl
        };
    }

    function renderResult(medicine, regimen, concentration, calculation) {
        const resultCard = document.getElementById("result-card");
        const doseResult = document.getElementById("dose-result");
        const doseUnit = document.getElementById("dose-unit");
        const doseResultMl = document.getElementById("dose-result-ml");
        const resultPerDose = document.getElementById("result-per-dose");
        const frequency = document.getElementById("dose-frequency");
        const minDose = document.getElementById("minimum-dose");
        const maxDose = document.getElementById("maximum-dose");
        const steps = document.getElementById("calculation-steps");
        const details = document.getElementById("result-details");
        const activeIngredient = document.getElementById("result-active-ingredient");
        const drugClass = document.getElementById("result-drug-class");
        const therapeuticUse = document.getElementById("result-therapeutic-use");
        const duration = document.getElementById("result-duration");
        const clinicalNotes = document.getElementById("result-clinical-notes");
        const important = document.getElementById("result-important");

        const displayDose = number(regimen.displayDose);
        const displayUnit = text(regimen.displayDoseUnit, regimen.doseUnit || "mg/dose");

        if (doseResult) doseResult.textContent = format(displayDose !== null ? displayDose : calculation.doseMgPerAdministration);
        if (doseUnit) doseUnit.textContent = displayDose !== null ? displayUnit : "mg";
        if (doseResultMl) doseResultMl.textContent = format(calculation.volumeMl);
        if (resultPerDose) resultPerDose.textContent = "Per administration";
        if (frequency) frequency.textContent = regimen.frequencyText || `${calculation.frequency} times daily`;
        if (minDose) minDose.textContent = displayDose !== null ? `${format(displayDose)} ${displayUnit}` : `${format(calculation.doseMgPerAdministration)} mg`;
        if (maxDose) maxDose.textContent = displayDose !== null ? `${format(displayDose)} ${displayUnit}` : `${format(calculation.doseMgPerAdministration)} mg`;

        if (steps) {
            const clinicalDose = displayDose !== null
                ? `${format(displayDose)} ${displayUnit}`
                : `${format(calculation.doseMgPerAdministration)} mg/dose`;

            steps.innerHTML = `
                <div class="calculation-step">
                    <span class="step-number">1</span>
                    <div><strong>Apply configured age-based dose</strong><p>${clinicalDose}</p></div>
                </div>
                <div class="calculation-step">
                    <span class="step-number">2</span>
                    <div><strong>Use selected concentration</strong><p>${format(concentration.mg)} mg / ${format(concentration.ml)} mL = ${format(calculation.mgPerMl)} mg/mL</p></div>
                </div>
                <div class="calculation-step">
                    <span class="step-number">3</span>
                    <div><strong>Convert dose to volume</strong><p>${format(calculation.doseMgPerAdministration)} mg ÷ ${format(calculation.mgPerMl)} mg/mL = ${format(calculation.volumeMl)} mL</p></div>
                </div>
            `;
        }

        if (details) {
            details.innerHTML = `<p>Configured regimen: ${text(regimen.label || regimen.condition, "Fixed-dose pediatric regimen")}</p>`;
        }

        if (activeIngredient) activeIngredient.textContent = text(medicine.genericName || medicine.activeIngredient, "—");
        if (drugClass) drugClass.textContent = Array.isArray(medicine.drugClass) ? medicine.drugClass.join(" · ") : text(medicine.drugClass || medicine.class, "—");
        if (therapeuticUse) therapeuticUse.textContent = text(medicine.indications || medicine.therapeuticUses, "—");
        if (duration) duration.textContent = text(regimen.duration, "—");
        if (clinicalNotes) clinicalNotes.textContent = text(medicine.notes, "—");
        if (important) important.innerHTML = medicine.warnings ? `<strong>Important:</strong> ${text(medicine.warnings)}` : "";

        if (resultCard) {
            resultCard.style.display = "block";
            resultCard.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }

    function handleFixedDoseCalculation(event) {
        const medicine = getSelectedMedicine();
        const regimen = getSelectedRegimen(medicine);

        if (!medicine || !regimen || regimen.type !== "fixed_dose") {
            return;
        }

        event.preventDefault();

        const ageCheck = checkAge(regimen);
        if (!ageCheck.valid) {
            showValidation(ageCheck.message);
            return;
        }

        const concentration = getSelectedConcentration();
        if (!concentration) {
            showValidation("Select the available oral-liquid concentration before calculating.");
            return;
        }

        const calculation = calculateFixedDose(regimen, concentration);
        if (!calculation) {
            showValidation("The configured fixed-dose regimen could not be calculated safely.");
            return;
        }

        hideValidation();
        renderResult(medicine, regimen, concentration, calculation);
    }

    function init() {
        const button = document.getElementById("calculate-button");
        if (!button) return;
        button.addEventListener("click", handleFixedDoseCalculation, true);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
