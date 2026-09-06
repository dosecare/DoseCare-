/* DoseCare Vitamins & Supplements — #41 Vitamin D3 */

const vitaminsMedicines = [
    {
        id: "vitamin-d3",
        genericName: "Cholecalciferol (Vitamin D3)",
        name: "Vitamin D3",
        brandNames: ["D-VITE Pediatric Oral Liquid"],
        system: "Vitamins & Supplements",
        drugClass: ["Vitamin D supplement"],
        class: "Vitamin D supplement",
        route: "oral",
        dosageForms: ["oral solution", "oral liquid"],
        concentrations: [{ mg: 0.01, ml: 1, display: "400 IU (10 mcg) / 1 mL", equivalentIU: 400 }],
        formulations: [{ dosageForm: "oral liquid", concentration: { mg: 0.01, ml: 1, equivalentIU: 400 }, display: "400 IU (10 mcg) / 1 mL" }],
        conditions: ["routine vitamin D supplementation"],
        indications: "Routine vitamin D supplementation when indicated.",
        moa: "Vitamin D promotes intestinal calcium and phosphate absorption and supports normal bone mineralization.",
        pediatric: { minimumAgeMonths: 0, maximumAgeMonths: 48 },
        dosing: {
            configured: true,
            calculatorReady: true,
            type: "fixed_dose",
            regimens: [{
                id: "vitamin-d3-routine-400iu",
                condition: "routine vitamin D supplementation",
                type: "fixed_dose",
                minimumAgeMonths: 0,
                maximumAgeMonths: 48,
                dose: 0.01,
                doseUnit: "mg/day",
                displayDose: 400,
                displayDoseUnit: "IU/day",
                volume: 1,
                volumeUnit: "mL/day",
                frequency: 1,
                frequencyText: "Once daily"
            }]
        },
        notes: "The selected formulation provides 400 IU (10 mcg) cholecalciferol per 1 mL. The product label directs 1 mL daily and states not to exceed 1 mL/day unless a physician recommends otherwise.",
        warnings: "Keep out of reach of children. Excessive vitamin D intake can cause toxicity. Check total daily intake when using other vitamin D-containing products.",
        references: [
            { id: "dailymed-d-vite-2026", organization: "DailyMed", title: "D-VITE Pediatric Oral Liquid — Cholecalciferol Solution", sourceType: "Official product label", url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f823cb3a-607c-4272-a0c1-da823dabd8e9" },
            { id: "nih-vitamin-d-fact-sheet", organization: "NIH Office of Dietary Supplements", title: "Vitamin D — Health Professional Fact Sheet", sourceType: "Authoritative clinical reference", url: "https://ods.od.nih.gov/factsheets/VITAMIND/HealthProfessional/" }
        ]
    }
];

/* Register through the central database when available. */
if (typeof registerMedicines === "function") {
    registerMedicines(vitaminsMedicines);
} else {
    console.error("DoseCare: central registerMedicines() is not available.");
}

function getVitaminsMedicines() { return vitaminsMedicines; }
function getVitaminsMedicineCount() { return vitaminsMedicines.length; }

/* =========================================================
   FIXED-DOSE CALCULATION BRIDGE
   Supports only explicitly configured fixed-dose regimens.
   This is a temporary compatibility bridge until fixed-dose
   handling is fully centralized in the dosing engine.
========================================================= */

window.addEventListener("load", function () {
    const button = document.getElementById("calculate-button");
    if (!button) return;

    button.addEventListener("click", function (event) {
        const medicineSelect = document.getElementById("medicine-select");
        const regimenSelect = document.getElementById("regimen-select");
        const concentrationSelect = document.getElementById("concentration-select");
        const ageInput = document.getElementById("age");
        const ageUnit = document.getElementById("age-unit");

        if (!medicineSelect?.value || !regimenSelect?.value || !concentrationSelect?.value) return;

        /* IMPORTANT: medicines is a top-level lexical binding in medicines.js,
           not window.medicines. */
        const medicineDatabase = typeof medicines !== "undefined" ? medicines : [];
        const medicine = medicineDatabase.find(m => String(m.id) === String(medicineSelect.value));
        if (!medicine?.dosing) return;

        const regimens = Array.isArray(medicine.dosing.regimens) ? medicine.dosing.regimens : [medicine.dosing];
        const regimen = regimens[Number(regimenSelect.value)] || regimens.find(r => String(r.id || "") === String(regimenSelect.value));
        if (!regimen || regimen.type !== "fixed_dose") return;

        event.preventDefault();
        event.stopImmediatePropagation();

        const age = Number(ageInput?.value);
        const months = ageUnit?.value === "years" ? age * 12 : age;
        if (!Number.isFinite(age) || age < 0) {
            showFixedDoseValidation("Patient age is required for this fixed-dose regimen.");
            return;
        }
        if (regimen.minimumAgeMonths != null && months < Number(regimen.minimumAgeMonths)) {
            showFixedDoseValidation(`This regimen is not configured for patients younger than ${regimen.minimumAgeMonths} months.`);
            return;
        }
        if (regimen.maximumAgeMonths != null && months > Number(regimen.maximumAgeMonths)) {
            showFixedDoseValidation(`This regimen is not configured for patients older than ${regimen.maximumAgeMonths} months.`);
            return;
        }

        let concentration;
        try { concentration = JSON.parse(concentrationSelect.value); } catch { showFixedDoseValidation("Select a valid oral-liquid concentration."); return; }
        const mg = Number(concentration?.mg);
        const ml = Number(concentration?.ml);
        const dose = Number(regimen.dose);
        const frequency = Number(regimen.frequency) || 1;
        if (!(mg > 0) || !(ml > 0) || !(dose >= 0)) {
            showFixedDoseValidation("The configured concentration or dose is invalid.");
            return;
        }

        const mgPerMl = mg / ml;
        const doseMg = String(regimen.doseUnit || "").toLowerCase().includes("/day") ? dose / frequency : dose;
        const volumeMl = doseMg / mgPerMl;
        const displayDose = Number.isFinite(Number(regimen.displayDose)) ? Number(regimen.displayDose) : doseMg;
        const displayUnit = regimen.displayDoseUnit || "mg/dose";
        const set = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value; };

        set("dose-result", String(Number(displayDose.toFixed(2))));
        set("dose-unit", displayUnit);
        set("dose-result-ml", String(Number(volumeMl.toFixed(2))));
        set("result-per-dose", "Per administration");
        set("dose-frequency", regimen.frequencyText || `${frequency} times daily`);
        set("minimum-dose", `${Number(displayDose.toFixed(2))} ${displayUnit}`);
        set("maximum-dose", `${Number(displayDose.toFixed(2))} ${displayUnit}`);
        set("result-active-ingredient", medicine.genericName || "—");
        set("result-drug-class", Array.isArray(medicine.drugClass) ? medicine.drugClass.join(" · ") : (medicine.drugClass || medicine.class || "—"));
        set("result-therapeutic-use", medicine.indications || "—");
        set("result-duration", regimen.duration || "—");
        set("result-clinical-notes", medicine.notes || "—");

        const details = document.getElementById("result-details");
        if (details) details.innerHTML = `<p>Configured regimen: ${regimen.label || regimen.condition || "Fixed-dose pediatric regimen"}</p>`;

        const steps = document.getElementById("calculation-steps");
        if (steps) steps.innerHTML = `
            <div class="calculation-step"><span class="step-number">1</span><div><strong>Apply configured dose</strong><p>${displayDose} ${displayUnit}</p></div></div>
            <div class="calculation-step"><span class="step-number">2</span><div><strong>Normalize concentration</strong><p>${mg} mg / ${ml} mL = ${Number(mgPerMl.toFixed(4))} mg/mL</p></div></div>
            <div class="calculation-step"><span class="step-number">3</span><div><strong>Convert dose to volume</strong><p>${Number(doseMg.toFixed(4))} mg ÷ ${Number(mgPerMl.toFixed(4))} mg/mL = ${Number(volumeMl.toFixed(2))} mL</p></div></div>
        `;

        const warning = document.getElementById("result-important");
        if (warning) warning.innerHTML = medicine.warnings ? `<strong>Important:</strong> ${medicine.warnings}` : "";

        const result = document.getElementById("result-card");
        if (result) result.style.display = "block";
        const validation = document.getElementById("validation-message");
        if (validation) validation.style.display = "none";
    }, true);
});

function showFixedDoseValidation(message) {
    const box = document.getElementById("validation-message");
    if (!box) return;
    const paragraph = box.querySelector("p");
    if (paragraph) paragraph.textContent = message;
    box.style.display = "flex";
}

console.log("DoseCare Vitamins Loaded:", vitaminsMedicines.map(medicine => medicine.id));
