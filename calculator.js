/* =========================================
   DoseCare
   Pediatric Dose Calculator

   CORRECTED VERSION
   - Oral liquid medicines only
   - Syrups / Oral Suspensions / Oral Solutions
   - Multiple pediatric dosing regimens
   - mg/kg/dose
   - mg/kg/day
   - condition-based regimens
   - severity-based regimens
   - Correct age / weight requirements
   - mg → mL conversion
   - Transparent step-by-step calculation
   - 3 result cards
   - Patient information
   - Dose information
   - Calculation history
========================================= */


/* =========================================
   STORAGE
========================================= */

const HISTORY_STORAGE_KEY = "dosecareHistory";


/* =========================================
   DOM ELEMENTS
========================================= */

const medicineSelect =
    document.getElementById("medicine-select");

const medicineSearch =
    document.getElementById("medicine");

const medicineResults =
    document.getElementById("medicine-results");

const clearMedicine =
    document.getElementById("clear-medicine");

const ageInput =
    document.getElementById("age");

const ageUnit =
    document.getElementById("age-unit");

const weightInput =
    document.getElementById("weight");

const regimenSelect =
    document.getElementById("regimen-select");

const selectedRegimenInfo =
    document.getElementById("selected-regimen");

const concentrationSelect =
    document.getElementById("concentration-select");

const concentrationValue =
    document.getElementById("concentration-value");

const concentrationVolume =
    document.getElementById("concentration-volume");

const calculateButton =
    document.getElementById("calculate-button");

const validationMessage =
    document.getElementById("validation-message");

const resultCard =
    document.getElementById("result-card");

const doseResult =
    document.getElementById("dose-result");

const doseUnit =
    document.getElementById("dose-unit");

const resultDetails =
    document.getElementById("result-details");

const backButton =
    document.getElementById("back-button");

const selectedMedicineInfo =
    document.getElementById("selected-medicine-info");

const selectedConcentration =
    document.getElementById("selected-concentration");

const minimumDose =
    document.getElementById("minimum-dose");

const maximumDose =
    document.getElementById("maximum-dose");

const doseFrequency =
    document.getElementById("dose-frequency");

const resultPerDose =
    document.getElementById("result-per-dose");

const resultImportant =
    document.getElementById("result-important");


/* =========================================
   CURRENT STATE
========================================= */

let selectedMedicine = null;
let selectedRegimen = null;


/* =========================================
   BASIC HELPERS
========================================= */

function getMedicineName(medicine) {

    if (!medicine) {
        return "Medicine";
    }

    return (
        medicine.genericName ||
        medicine.name ||
        "Medicine"
    );
}


function formatNumber(value, decimals = 2) {

    if (!Number.isFinite(Number(value))) {
        return "—";
    }

    const rounded =
        Number(
            Number(value).toFixed(decimals)
        );

    return rounded.toLocaleString("en-US", {
        maximumFractionDigits: decimals
    });
}


function normalizeText(value) {

    return String(value || "")
        .trim()
        .toLowerCase()
        .replace(/[\s_-]+/g, "_");
}


function escapeHtml(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function cloneObject(object) {

    if (
        !object ||
        typeof object !== "object"
    ) {
        return object;
    }

    try {

        return JSON.parse(
            JSON.stringify(object)
        );

    } catch {

        return {
            ...object
        };
    }
}


function isFinitePositive(value) {

    return (
        Number.isFinite(Number(value)) &&
        Number(value) > 0
    );
}


/* =========================================
   MEDICINE FORM
========================================= */

function isLiquidMedicine(medicine) {

    if (!medicine) {
        return false;
    }

    const possibleForms = [
        medicine.dosageForm,
        medicine.dosage_form,
        medicine.form,
        medicine.routeForm,
        medicine.preparation,
        medicine.pharmaceuticalForm
    ];

    const forms =
        possibleForms
            .filter(Boolean)
            .map(normalizeText);


    /*
       DoseCare supports ONLY:
       - syrup
       - oral suspension
       - oral solution
       - oral liquid
    */

    const forbiddenForms = [
        "tablet",
        "tablets",
        "tab",
        "capsule",
        "capsules",
        "cap",
        "chewable",
        "chewables",
        "injection",
        "injectable",
        "iv",
        "im",
        "intravenous",
        "intramuscular",
        "cream",
        "ointment",
        "gel",
        "suppository"
    ];


    if (
        forms.some(
            form =>
                forbiddenForms.includes(form)
        )
    ) {

        return false;
    }


    const allowedLiquidForms = [
        "syrup",
        "suspension",
        "oral_suspension",
        "solution",
        "oral_solution",
        "oral_liquid",
        "liquid"
    ];


    if (
        forms.some(
            form =>
                allowedLiquidForms.includes(form) ||
                form.includes("oral_suspension") ||
                form.includes("oral_solution") ||
                form.includes("oral_liquid") ||
                form.includes("syrup")
        )
    ) {

        return true;
    }


    /*
       If no explicit dosage form exists,
       a valid concentration can still identify
       an oral liquid medicine in the existing
       DoseCare database.
    */

    return (
        forms.length === 0 &&
        getAvailableConcentrations(medicine).length > 0
    );
}


/* =========================================
   CONCENTRATION PARSER
========================================= */

function parseConcentrationString(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return null;
    }


    const text =
        String(value)
            .trim()
            .toLowerCase()
            .replace(/,/g, ".")
            .replace(/\s+/g, "");


    /*
       Supports:

       250mg/5ml
       250mg/5mL
       250mgper5ml
       250mg/5
    */

    let match =
        text.match(
            /(\d+(?:\.\d+)?)mg(?:\/|per)(\d+(?:\.\d+)?)ml/
        );


    if (match) {

        const mg =
            Number(match[1]);

        const ml =
            Number(match[2]);

        if (
            isFinitePositive(mg) &&
            isFinitePositive(ml)
        ) {

            return {
                mg,
                ml
            };
        }
    }


    /*
       Supports:

       250 mg / 5 mL
       250 mg per 5 mL
    */

    match =
        text.match(
            /(\d+(?:\.\d+)?)mg(?:\/|per)(?:ml)?(\d+(?:\.\d+)?)/
        );


    if (match) {

        const mg =
            Number(match[1]);

        const ml =
            Number(match[2]);

        if (
            isFinitePositive(mg) &&
            isFinitePositive(ml)
        ) {

            return {
                mg,
                ml
            };
        }
    }


    return null;
}


/* =========================================
   GET CONCENTRATIONS
========================================= */

function getAvailableConcentrations(medicine) {

    if (!medicine) {
        return [];
    }

    let raw = [];


    if (
        Array.isArray(
            medicine.concentrations
        )
    ) {

        raw =
            medicine.concentrations;

    } else if (
        Array.isArray(
            medicine.availableConcentrations
        )
    ) {

        raw =
            medicine.availableConcentrations;

    } else if (
        Array.isArray(
            medicine.formulations
        )
    ) {

        raw =
            medicine.formulations
                .map(
                    item =>
                        item &&
                        (
                            item.concentration ||
                            item.strength ||
                            item.concentrationValue
                        )
                )
                .filter(Boolean);

    } else if (
        medicine.concentration
    ) {

        raw = [
            medicine.concentration
        ];

    } else if (
        medicine.concentrationMg &&
        medicine.concentrationMl
    ) {

        raw = [
            {
                mg:
                    medicine.concentrationMg,

                ml:
                    medicine.concentrationMl
            }
        ];
    }


    const normalized = [];


    raw.forEach(item => {

        let result = null;


        /* String */

        if (
            typeof item === "string"
        ) {

            result =
                parseConcentrationString(
                    item
                );
        }


        /* Object */

        else if (
            item &&
            typeof item === "object"
        ) {

            const mg =
                Number(
                    item.mg ??
                    item.mgPerVolume ??
                    item.concentrationMg ??
                    item.amount
                );

            const ml =
                Number(
                    item.ml ??
                    item.volume ??
                    item.concentrationMl ??
                    item.volumeMl
                );


            if (
                isFinitePositive(mg) &&
                isFinitePositive(ml)
            ) {

                result = {
                    mg,
                    ml
                };
            }


            if (
                !result &&
                item.concentration
            ) {

                result =
                    parseConcentrationString(
                        item.concentration
                    );
            }


            if (
                !result &&
                item.strength
            ) {

                result =
                    parseConcentrationString(
                        item.strength
                    );
            }
        }


        if (!result) {
            return;
        }


        const duplicate =
            normalized.some(
                item =>
                    item.mg === result.mg &&
                    item.ml === result.ml
            );


        if (!duplicate) {
            normalized.push(result);
        }
    });


    return normalized;
}


function formatConcentration(concentration) {

    if (!concentration) {
        return "";
    }

    return (
        `${formatNumber(concentration.mg)} mg/${formatNumber(concentration.ml)} mL`
    );
}


/* =========================================
   CONCENTRATION UI
========================================= */

function populateConcentrations(medicine) {

    if (!concentrationSelect) {
        return;
    }


    concentrationSelect.innerHTML = "";


    const option =
        document.createElement("option");

    option.value = "";
    option.textContent =
        "Select a concentration";


    concentrationSelect.appendChild(
        option
    );


    const concentrations =
        getAvailableConcentrations(
            medicine
        );


    concentrations.forEach(
        concentration => {

            const item =
                document.createElement(
                    "option"
                );

            item.value =
                JSON.stringify(
                    concentration
                );

            item.textContent =
                formatConcentration(
                    concentration
                );

            concentrationSelect.appendChild(
                item
            );
        }
    );


    concentrationSelect.disabled =
        concentrations.length === 0;


    if (concentrationValue) {
        concentrationValue.value = "";
    }


    if (concentrationVolume) {
        concentrationVolume.value = "";
    }


    updateSelectedConcentration();
}


function updateSelectedConcentration() {

    if (!concentrationSelect) {
        return;
    }


    const value =
        concentrationSelect.value;


    if (!value) {

        if (selectedConcentration) {
            selectedConcentration.innerHTML = "";
        }

        return;
    }


    try {

        const concentration =
            JSON.parse(value);


        if (concentrationValue) {

            concentrationValue.value =
                concentration.mg;
        }


        if (concentrationVolume) {

            concentrationVolume.value =
                concentration.ml;
        }


        if (selectedConcentration) {

            selectedConcentration.innerHTML = `
                <strong>Selected concentration:</strong>
                ${escapeHtml(
                    formatConcentration(
                        concentration
                    )
                )}
            `;
        }

    } catch (error) {

        console.error(
            "Concentration error:",
            error
        );
    }
}


if (concentrationSelect) {

    concentrationSelect.addEventListener(
        "change",
        updateSelectedConcentration
    );
}


/* =========================================
   MEDICINE LIST
========================================= */

function getAvailableMedicines() {

    if (
        !Array.isArray(
            medicines
        )
    ) {
        return [];
    }


    return medicines.filter(
        medicine =>
            isLiquidMedicine(
                medicine
            )
    );
}


function getMedicineByIdSafe(id) {

    if (
        typeof getMedicineById ===
        "function"
    ) {

        const medicine =
            getMedicineById(id);

        if (medicine) {
            return medicine;
        }
    }


    return getAvailableMedicines()
        .find(
            medicine =>
                String(medicine.id) ===
                String(id)
        );
}


/* =========================================
   POPULATE MEDICINE SELECT
========================================= */

function populateMedicineSelect() {

    if (!medicineSelect) {
        return;
    }


    medicineSelect.innerHTML = "";


    const defaultOption =
        document.createElement(
            "option"
        );

    defaultOption.value = "";
    defaultOption.textContent =
        "Select a medicine";


    medicineSelect.appendChild(
        defaultOption
    );


    getAvailableMedicines()
        .forEach(
            medicine => {

                const option =
                    document.createElement(
                        "option"
                    );

                option.value =
                    String(
                        medicine.id
                    );

                option.textContent =
                    getMedicineName(
                        medicine
                    );

                medicineSelect.appendChild(
                    option
                );
            }
        );
}


/* =========================================
   REGIMEN EXTRACTION
========================================= */

function normalizeRegimen(
    regimen,
    fallbackLabel = "Recommended dose"
) {

    if (
        !regimen ||
        typeof regimen !== "object"
    ) {
        return null;
    }


    const result =
        cloneObject(regimen);


    result.label =
        result.label ||
        result.name ||
        result.title ||
        result.regimenName ||
        result.condition ||
        result.indication ||
        fallbackLabel;


    return result;
}


function getMedicineRegimens(medicine) {

    if (
        !medicine ||
        !medicine.dosing
    ) {
        return [];
    }


    const dosing =
        medicine.dosing;


    const regimens = [];


    if (
        Array.isArray(
            dosing.regimens
        )
    ) {

        dosing.regimens.forEach(
            (item, index) => {

                const regimen =
                    normalizeRegimen(
                        item,
                        `Dose option ${index + 1}`
                    );

                if (regimen) {
                    regimens.push(regimen);
                }
            }
        );
    }


    if (
        regimens.length === 0 &&
        Array.isArray(
            dosing.options
        )
    ) {

        dosing.options.forEach(
            (item, index) => {

                const regimen =
                    normalizeRegimen(
                        item,
                        `Dose option ${index + 1}`
                    );

                if (regimen) {
                    regimens.push(regimen);
                }
            }
        );
    }


    if (
        regimens.length === 0 &&
        Array.isArray(
            dosing.conditionBased
        )
    ) {

        dosing.conditionBased.forEach(
            (item, index) => {

                const regimen =
                    normalizeRegimen(
                        item,
                        `Dose option ${index + 1}`
                    );

                if (regimen) {
                    regimens.push(regimen);
                }
            }
        );
    }


    if (
        regimens.length === 0 &&
        Array.isArray(
            dosing.indications
        )
    ) {

        dosing.indications.forEach(
            (item, index) => {

                const regimen =
                    normalizeRegimen(
                        item,
                        `Dose option ${index + 1}`
                    );

                if (regimen) {
                    regimens.push(regimen);
                }
            }
        );
    }


    if (
        regimens.length === 0 &&
        dosing.conditions &&
        typeof dosing.conditions === "object" &&
        !Array.isArray(
            dosing.conditions
        )
    ) {

        Object.entries(
            dosing.conditions
        )
        .forEach(
            ([condition, regimen]) => {

                const normalized =
                    normalizeRegimen(
                        regimen,
                        condition
                    );


                if (normalized) {

                    if (!normalized.condition) {

                        normalized.condition =
                            condition;
                    }


                    if (!normalized.label) {

                        normalized.label =
                            condition;
                    }


                    regimens.push(
                        normalized
                    );
                }
            }
        );
    }


    if (
        regimens.length === 0 &&
        dosing.regimen &&
        typeof dosing.regimen === "object"
    ) {

        const regimen =
            normalizeRegimen(
                dosing.regimen
            );

        if (regimen) {
            regimens.push(regimen);
        }
    }


    if (
        regimens.length === 0 &&
        dosing.generalRegimen
    ) {

        const regimen =
            normalizeRegimen(
                dosing.generalRegimen,
                "General pediatric dose"
            );

        if (regimen) {
            regimens.push(regimen);
        }
    }


    if (
        regimens.length === 0 &&
        (
            dosing.type ||
            dosing.calculationType ||
            dosing.minDose !== undefined ||
            dosing.maxDose !== undefined ||
            dosing.dose !== undefined
        )
    ) {

        const regimen =
            normalizeRegimen(
                dosing
            );

        if (regimen) {
            regimens.push(regimen);
        }
    }


    return regimens;
}


/* =========================================
   REGIMEN TYPE
========================================= */

function getRegimenType(regimen) {

    if (!regimen) {
        return "";
    }


    return normalizeText(
        regimen.calculationType ||
        regimen.dosingType ||
        regimen.type ||
        ""
    );
}


/* =========================================
   REGIMEN LABEL
========================================= */

function getRegimenLabel(regimen) {

    if (!regimen) {
        return "Dose option";
    }


    if (regimen.label) {

        return String(
            regimen.label
        );
    }


    if (regimen.condition) {

        return String(
            regimen.condition
        );
    }


    if (regimen.indication) {

        return String(
            regimen.indication
        );
    }


    const type =
        getRegimenType(
            regimen
        );


    const min =
        Number(
            regimen.minDose ??
            regimen.dose
        );


    const max =
        Number(
            regimen.maxDose ??
            regimen.dose
        );


    const validMin =
        Number.isFinite(min);


    const validMax =
        Number.isFinite(max);


    let doseText = "";


    if (
        validMin &&
        validMax
    ) {

        doseText =
            isSingleValue(
                min,
                max
            )
                ? formatNumber(min)
                : `${formatNumber(min)}–${formatNumber(max)}`;
    }


    if (
        type ===
        "mg_per_kg_per_dose"
    ) {

        return `${doseText} mg/kg/dose`;
    }


    if (
        type ===
        "mg_per_kg_per_day"
    ) {

        return `${doseText} mg/kg/day`;
    }


    if (
        type ===
        "condition_based"
    ) {

        return (
            doseText
                ? `${doseText} mg/kg`
                : "Condition-based dose"
        );
    }


    if (
        type ===
        "severity_based"
    ) {

        return (
            doseText
                ? `${doseText} mg/kg/day`
                : "Severity-based dose"
        );
    }


    return (
        doseText
            ? `${doseText} mg/kg`
            : "Dose option"
    );
}


/* =========================================
   REGIMEN SELECT UI
========================================= */

function createRegimenSelector(medicine) {

    if (!regimenSelect) {
        return;
    }


    const regimens =
        getMedicineRegimens(
            medicine
        );


    selectedRegimen = null;


    regimenSelect.innerHTML = "";


    const defaultOption =
        document.createElement("option");


    defaultOption.value = "";


    defaultOption.textContent =
        regimens.length
            ? "Select a dose regimen"
            : "No dose regimen available";


    regimenSelect.appendChild(
        defaultOption
    );


    regimens.forEach(
        (regimen, index) => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                String(index);


            option.textContent =
                getRegimenLabel(
                    regimen
                );


            regimenSelect.appendChild(
                option
            );
        }
    );


    regimenSelect.disabled =
        regimens.length === 0;


    if (regimens.length === 1) {

        selectedRegimen =
            regimens[0];


        regimenSelect.value =
            "0";


        displaySelectedRegimenInfo(
            selectedRegimen
        );


        return;
    }


    if (selectedRegimenInfo) {

        selectedRegimenInfo.innerHTML =
            regimens.length
                ? ""
                : `
                    <div class="medicine-info-warning">
                        No pediatric dosing regimen has been
                        configured for this medicine.
                    </div>
                `;
    }
}


function displaySelectedRegimenInfo(regimen) {

    if (!selectedRegimenInfo) {
        return;
    }


    if (!regimen) {

        selectedRegimenInfo.innerHTML =
            "";

        return;
    }


    const frequency =
        getFrequencyText(
            regimen,
            getFrequencyNumber(regimen)
        );


    selectedRegimenInfo.innerHTML = `
        <div class="selected-regimen-card">

            <strong>
                ${escapeHtml(
                    getRegimenLabel(
                        regimen
                    )
                )}
            </strong>

            <span>
                ${escapeHtml(
                    frequency
                )}
            </span>

        </div>
    `;
}


if (regimenSelect) {

    regimenSelect.addEventListener(
        "change",
        () => {

            const index =
                Number(
                    regimenSelect.value
                );


            const regimens =
                getMedicineRegimens(
                    selectedMedicine
                );


            if (
                !Number.isInteger(index) ||
                !regimens[index]
            ) {

                selectedRegimen =
                    null;


                if (selectedRegimenInfo) {

                    selectedRegimenInfo.innerHTML =
                        "";
                }


                hideValidation();
                hideResult();

                return;
            }


            selectedRegimen =
                regimens[index];


            displaySelectedRegimenInfo(
                selectedRegimen
            );


            hideValidation();
            hideResult();
        }
    );
}


/* =========================================
   SELECT MEDICINE
========================================= */

function selectMedicine(medicine) {

    if (!medicine) {
        return;
    }


    if (
        !isLiquidMedicine(
            medicine
        )
    ) {

        showValidation(
            "DoseCare currently supports syrups and oral liquid medicines only."
        );

        return;
    }


    selectedMedicine =
        medicine;


    selectedRegimen =
        null;


    if (medicineSearch) {

        medicineSearch.value =
            getMedicineName(
                medicine
            );
    }


    if (medicineSelect) {

        medicineSelect.value =
            String(
                medicine.id
            );
    }


    if (clearMedicine) {

        clearMedicine.style.display =
            "flex";
    }


    populateConcentrations(
        medicine
    );


    createRegimenSelector(
        medicine
    );


    if (selectedMedicineInfo) {

        const form =
            medicine.dosageForm ||
            medicine.dosage_form ||
            medicine.form ||
            "Oral liquid";


        selectedMedicineInfo.innerHTML = `
            <strong>
                ${escapeHtml(
                    getMedicineName(
                        medicine
                    )
                )}
            </strong>

            <span>
                ${escapeHtml(
                    form
                )}
            </span>
        `;
    }


    hideSearchResults();
    hideValidation();
    hideResult();
}


function clearSelectedMedicine() {

    selectedMedicine =
        null;


    selectedRegimen =
        null;


    if (medicineSelect) {

        medicineSelect.value =
            "";
    }


    if (medicineSearch) {

        medicineSearch.value =
            "";
    }


    if (regimenSelect) {

        regimenSelect.innerHTML = `
            <option value="">
                Select a dose regimen
            </option>
        `;


        regimenSelect.disabled =
            true;
    }


    if (selectedRegimenInfo) {

        selectedRegimenInfo.innerHTML =
            "";
    }


    if (concentrationSelect) {

        concentrationSelect.innerHTML = `
            <option value="">
                Select a concentration
            </option>
        `;


        concentrationSelect.disabled =
            true;
    }


    if (concentrationValue) {

        concentrationValue.value =
            "";
    }


    if (concentrationVolume) {

        concentrationVolume.value =
            "";
    }


    if (selectedMedicineInfo) {

        selectedMedicineInfo.innerHTML =
            "";
    }


    if (selectedConcentration) {

        selectedConcentration.innerHTML =
            "";
    }


    if (clearMedicine) {

        clearMedicine.style.display =
            "none";
    }


    hideValidation();
    hideResult();
}


/* =========================================
   MEDICINE SELECT CHANGE
========================================= */

if (medicineSelect) {

    medicineSelect.addEventListener(
        "change",
        () => {

            const id =
                medicineSelect.value;


            if (!id) {

                clearSelectedMedicine();

                return;
            }


            const medicine =
                getMedicineByIdSafe(id);


            selectMedicine(
                medicine
            );
        }
    );
}


/* =========================================
   MEDICINE SEARCH
========================================= */

if (medicineSearch) {

    medicineSearch.addEventListener(
        "input",
        () => {

            const searchTerm =
                medicineSearch.value
                    .trim()
                    .toLowerCase();


            if (clearMedicine) {

                clearMedicine.style.display =
                    searchTerm
                        ? "flex"
                        : "none";
            }


            if (!searchTerm) {

                hideSearchResults();

                return;
            }


            const results =
                getAvailableMedicines()
                    .filter(
                        medicine => {

                            const name =
                                getMedicineName(
                                    medicine
                                )
                                .toLowerCase();


                            const brands =
                                Array.isArray(
                                    medicine.brandNames
                                )
                                    ? medicine.brandNames
                                    : [];


                            const brandMatch =
                                brands.some(
                                    brand =>
                                        String(
                                            brand
                                        )
                                        .toLowerCase()
                                        .includes(
                                            searchTerm
                                        )
                                );


                            const drugClass =
                                Array.isArray(
                                    medicine.drugClass
                                )
                                    ? medicine.drugClass
                                        .join(" ")
                                        .toLowerCase()
                                    : String(
                                        medicine.drugClass ||
                                        medicine.class ||
                                        ""
                                    )
                                    .toLowerCase();


                            return (
                                name.includes(
                                    searchTerm
                                ) ||
                                brandMatch ||
                                drugClass.includes(
                                    searchTerm
                                )
                            );
                        }
                    );


            showSearchResults(
                results
            );
        }
    );
}


/* =========================================
   SHOW SEARCH RESULTS
========================================= */

function showSearchResults(results) {

    if (!medicineResults) {
        return;
    }


    medicineResults.innerHTML = "";


    if (!results.length) {

        const empty =
            document.createElement(
                "div"
            );


        empty.className =
            "medicine-result-item";


        empty.innerHTML =
            "<span>No liquid medicine found</span>";


        medicineResults.appendChild(
            empty
        );


        medicineResults.style.display =
            "block";


        return;
    }


    results.forEach(
        medicine => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "medicine-result-item";


            const name =
                getMedicineName(
                    medicine
                );


            const drugClass =
                Array.isArray(
                    medicine.drugClass
                )
                    ? medicine.drugClass.join(
                        " · "
                    )
                    : (
                        medicine.drugClass ||
                        medicine.class ||
                        "Medicine"
                    );


            item.innerHTML = `
                <strong>
                    ${escapeHtml(name)}
                </strong>

                <span>
                    ${escapeHtml(drugClass)}
                </span>
            `;


            item.addEventListener(
                "click",
                () => {

                    selectMedicine(
                        medicine
                    );
                }
            );


            medicineResults.appendChild(
                item
            );
        }
    );


    medicineResults.style.display =
        "block";
}


function hideSearchResults() {

    if (medicineResults) {

        medicineResults.style.display =
            "none";
    }
}


if (clearMedicine) {

    clearMedicine.addEventListener(
        "click",
        () => {

            clearSelectedMedicine();

            hideSearchResults();
        }
    );
}


document.addEventListener(
    "click",
    event => {

        if (
            medicineSearch &&
            medicineResults &&
            !medicineSearch.contains(
                event.target
            ) &&
            !medicineResults.contains(
                event.target
            )
        ) {

            hideSearchResults();
        }
    }
);


/* =========================================
   VALIDATION
========================================= */

function showValidation(message) {

    if (!validationMessage) {
        return;
    }


    const paragraph =
        validationMessage.querySelector(
            "p"
        );


    if (paragraph) {

        paragraph.textContent =
            message;
    }


    validationMessage.style.display =
        "flex";
}


function hideValidation() {

    if (validationMessage) {

        validationMessage.style.display =
            "none";
    }
}


/* =========================================
   RESULT
========================================= */

function hideResult() {

    if (resultCard) {

        resultCard.style.display =
            "none";
    }
}


function showResult() {

    if (resultCard) {

        resultCard.style.display =
            "block";
    }
}


/* =========================================
   AGE
========================================= */

function getAgeInMonths() {

    const age =
        ageInput
            ? parseFloat(
                ageInput.value
            )
            : NaN;


    if (!Number.isFinite(age)) {
        return null;
    }


    const unit =
        ageUnit
            ? normalizeText(
                ageUnit.value
            )
            : "years";


    if (
        unit === "month" ||
        unit === "months" ||
        unit === "mo"
    ) {

        return age;
    }


    return age * 12;
}


function formatAgeFromMonths(months) {

    if (!Number.isFinite(months)) {
        return "—";
    }


    if (months < 12) {

        return (
            `${formatNumber(months, 0)} month(s)`
        );
    }


    const years =
        months / 12;


    if (
        Number.isInteger(
            years
        )
    ) {

        return (
            `${years} year(s)`
        );
    }


    return (
        `${formatNumber(years, 1)} year(s)`
    );
}


/* =========================================
   AGE VALIDATION
========================================= */

function validateMedicineAge(medicine) {

    const ageMonths =
        getAgeInMonths();


    /*
       Age is optional unless the
       regimen/database explicitly requires it.
    */

    if (!Number.isFinite(ageMonths)) {

        return {
            valid: true
        };
    }


    const dosing =
        medicine &&
        medicine.dosing;


    if (!dosing) {

        return {
            valid: true
        };
    }


    const minimumMonths =
        Number(
            dosing.minimumAgeMonths
        );


    const minimumYears =
        Number(
            dosing.minimumAgeYears
        );


    const maximumYears =
        Number(
            dosing.maximumAgeYears
        );


    if (
        Number.isFinite(
            minimumMonths
        ) &&
        ageMonths <
            minimumMonths
    ) {

        return {

            valid: false,

            message:
                `${getMedicineName(medicine)} is not configured for use below ${formatAgeFromMonths(minimumMonths)}.`
        };
    }


    if (
        Number.isFinite(
            minimumYears
        ) &&
        ageMonths <
            minimumYears * 12
    ) {

        return {

            valid: false,

            message:
                `${getMedicineName(medicine)} is not configured for use below ${minimumYears} year(s).`
        };
    }


    if (
        Number.isFinite(
            maximumYears
        ) &&
        ageMonths >
            maximumYears * 12
    ) {

        return {

            valid: false,

            message:
                `${getMedicineName(medicine)} is not configured for pediatric dosing above ${maximumYears} years.`
        };
    }


    return {
        valid: true
    };
}


/* =========================================
   REGIMEN REQUIREMENTS
========================================= */

function regimenRequiresAge(regimen) {

    if (!regimen) {
        return false;
    }


    if (
        regimen.requiresAge !== undefined
    ) {

        return Boolean(
            regimen.requiresAge
        );
    }


    if (
        regimen.ageRequired !== undefined
    ) {

        return Boolean(
            regimen.ageRequired
        );
    }


    if (
        regimen.ageRange ||
        regimen.minimumAge ||
        regimen.minimumAgeMonths ||
        regimen.minimumAgeYears ||
        regimen.maximumAge ||
        regimen.maximumAgeMonths ||
        regimen.maximumAgeYears
    ) {

        return true;
    }


    return false;
}


function regimenRequiresWeight(regimen) {

    if (!regimen) {
        return false;
    }


    if (
        regimen.requiresWeight !== undefined
    ) {

        return Boolean(
            regimen.requiresWeight
        );
    }


    if (
        regimen.weightRequired !== undefined
    ) {

        return Boolean(
            regimen.weightRequired
        );
    }


    const type =
        getRegimenType(
            regimen
        );


    /*
       Weight is required for the
       standard weight-based regimens.
    */

    if (
        type === "mg_per_kg_per_dose" ||
        type === "mg_per_kg_per_day" ||
        type === "weight_based" ||
        type === "condition_based" ||
        type === "severity_based"
    ) {

        return true;
    }


    return false;
}


/* =========================================
   FREQUENCY NUMBER
========================================= */

function getFrequencyNumber(
    dosing
) {

    if (!dosing) {
        return 1;
    }


    const direct =
        Number(
            dosing.frequency
        );


    if (
        Number.isFinite(direct) &&
        direct > 0
    ) {

        return direct;
    }


    if (
        Array.isArray(
            dosing.frequencyOptions
        )
    ) {

        const first =
            Number(
                dosing.frequencyOptions[0]
            );


        if (
            Number.isFinite(first) &&
            first > 0
        ) {

            return first;
        }
    }


    return 1;
}


/* =========================================
   CALCULATE DOSING RULE
========================================= */

function calculateDosingRule(
    medicine,
    weight,
    regimen
) {

    if (!medicine) {

        return {

            success: false,

            message:
                "Please select a medicine."
        };
    }


    const dosing =
        regimen ||
        medicine.dosing;


    if (!dosing) {

        return {

            success: false,

            message:
                "A pediatric dosing regimen has not been configured for this medicine."
        };
    }


    const type =
        getRegimenType(
            dosing
        );


    /* =====================================
       MG / KG / DOSE
    ===================================== */

    if (
        type ===
        "mg_per_kg_per_dose"
    ) {

        const minDose =
            Number(
                dosing.minDose ??
                dosing.dose
            );


        const maxDose =
            Number(
                dosing.maxDose ??
                dosing.dose
            );


        if (
            !Number.isFinite(minDose) ||
            !Number.isFinite(maxDose)
        ) {

            return {

                success: false,

                message:
                    "The selected dosing regimen is incomplete."
            };
        }


        let minMg =
            weight *
            minDose;


        let maxMg =
            weight *
            maxDose;


        const frequency =
            getFrequencyNumber(
                dosing
            );


        let maxPerDoseApplied =
            false;


        let maxDailyDoseApplied =
            false;


        /*
           Apply maximum per dose.
        */

        if (
            Number.isFinite(
                Number(
                    dosing.maxPerDose
                )
            )
        ) {

            const cap =
                Number(
                    dosing.maxPerDose
                );


            if (maxMg > cap) {

                maxMg =
                    cap;

                maxPerDoseApplied =
                    true;
            }
        }


        let dailyMinMg =
            minMg *
            frequency;


        let dailyMaxMg =
            maxMg *
            frequency;


        /*
           Apply maximum daily dose.
        */

        if (
            Number.isFinite(
                Number(
                    dosing.maxDailyDose
                )
            )
        ) {

            const cap =
                Number(
                    dosing.maxDailyDose
                );


            if (
                dailyMaxMg >
                cap
            ) {

                dailyMaxMg =
                    cap;


                maxMg =
                    Math.min(
                        maxMg,
                        cap / frequency
                    );


                maxDailyDoseApplied =
                    true;
            }
        }


        return {

            success: true,

            type,

            minDoseRate:
                minDose,

            maxDoseRate:
                maxDose,

            minMg,

            maxMg,

            dailyMinMg,

            dailyMaxMg,

            frequency:
                getFrequencyText(
                    dosing,
                    frequency
                ),

            dosesPerDay:
                frequency,

            unit:
                "mg/kg/dose",

            duration:
                dosing.duration ||
                "",

            maxPerDose:
                Number(
                    dosing.maxPerDose
                ),

            maxDailyDose:
                Number(
                    dosing.maxDailyDose
                ),

            maxPerDoseApplied,

            maxDailyDoseApplied
        };
    }


    /* =====================================
       MG / KG / DAY
    ===================================== */

    if (
        type ===
            "mg_per_kg_per_day" ||
        type ===
            "weight_based"
    ) {

        const minDailyDose =
            Number(
                dosing.minDose ??
                dosing.dose
            );


        const maxDailyDose =
            Number(
                dosing.maxDose ??
                dosing.dose
            );


        if (
            !Number.isFinite(
                minDailyDose
            ) ||
            !Number.isFinite(
                maxDailyDose
            )
        ) {

            return {

                success: false,

                message:
                    "The selected dosing regimen is incomplete."
            };
        }


        let dailyMinMg =
            weight *
            minDailyDose;


        let dailyMaxMg =
            weight *
            maxDailyDose;


        let maxDailyDoseApplied =
            false;


        if (
            Number.isFinite(
                Number(
                    dosing.maxDailyDose
                )
            )
        ) {

            const cap =
                Number(
                    dosing.maxDailyDose
                );


            if (
                dailyMaxMg >
                cap
            ) {

                dailyMaxMg =
                    cap;

                maxDailyDoseApplied =
                    true;
            }
        }


        const frequency =
            getFrequencyNumber(
                dosing
            );


        let minMg =
            dailyMinMg /
            frequency;


        let maxMg =
            dailyMaxMg /
            frequency;


        let maxPerDoseApplied =
            false;


        if (
            Number.isFinite(
                Number(
                    dosing.maxPerDose
                )
            )
        ) {

            const cap =
                Number(
                    dosing.maxPerDose
                );


            if (
                maxMg >
                cap
            ) {

                maxMg =
                    cap;

                maxPerDoseApplied =
                    true;
            }
        }


        return {

            success: true,

            type,

            minDoseRate:
                minDailyDose,

            maxDoseRate:
                maxDailyDose,

            minMg,

            maxMg,

            dailyMinMg,

            dailyMaxMg,

            frequency:
                getFrequencyText(
                    dosing,
                    frequency
                ),

            dosesPerDay:
                frequency,

            unit:
                "mg/kg/day",

            duration:
                dosing.duration ||
                "",

            maxPerDose:
                Number(
                    dosing.maxPerDose
                ),

            maxDailyDose:
                Number(
                    dosing.maxDailyDose
                ),

            maxPerDoseApplied,

            maxDailyDoseApplied
        };
    }


    /* =====================================
       CONDITION BASED
    ===================================== */

    if (
        type ===
        "condition_based"
    ) {

        /*
           condition_based must explicitly declare
           how the dose is calculated.

           Supported:
           - mg/kg/dose
           - mg/kg/day
           - dose / fixed dose
        */

        const calculationType =
            normalizeText(
                dosing.calculationType ||
                dosing.doseBasis ||
                dosing.unit ||
                dosing.basis ||
                ""
            );


        if (
            calculationType ===
            "mg_per_kg_per_dose"
        ) {

            return calculateDosingRule(
                medicine,
                weight,
                {
                    ...dosing,
                    type:
                        "mg_per_kg_per_dose"
                }
            );
        }


        if (
            calculationType ===
                "mg_per_kg_per_day" ||
            calculationType ===
                "weight_based"
        ) {

            return calculateDosingRule(
                medicine,
                weight,
                {
                    ...dosing,
                    type:
                        "mg_per_kg_per_day"
                }
            );
        }


        /*
           If no calculation basis is explicitly
           configured, do NOT guess.
        */

        return {

            success: false,

            message:
                "The condition-based regimen does not specify how the dose should be calculated."
        };
    }


    /* =====================================
       SEVERITY BASED
    ===================================== */

    if (
        type ===
        "severity_based"
    ) {

        const minDailyDose =
            Number(
                dosing.minDose ??
                dosing.dose
            );


        const maxDailyDose =
            Number(
                dosing.maxDose ??
                dosing.dose
            );


        if (
            !Number.isFinite(
                minDailyDose
            ) ||
            !Number.isFinite(
                maxDailyDose
            )
        ) {

            return {

                success: false,

                message:
                    "The selected severity-based dosing regimen is incomplete."
            };
        }


        const frequencies =
            Array.isArray(
                dosing.frequencyOptions
            )
                ? dosing.frequencyOptions
                    .map(Number)
                    .filter(
                        value =>
                            Number.isFinite(
                                value
                            ) &&
                            value > 0
                    )
                : [];


        const frequency =
            getFrequencyNumber(
                dosing
            ) ||
            frequencies[0] ||
            1;


        const dailyMinMg =
            weight *
            minDailyDose;


        const dailyMaxMg =
            weight *
            maxDailyDose;


        const minMg =
            dailyMinMg /
            frequency;


        const maxMg =
            dailyMaxMg /
            frequency;


        return {

            success: true,

            type,

            minDoseRate:
                minDailyDose,

            maxDoseRate:
                maxDailyDose,

            minMg,

            maxMg,

            dailyMinMg,

            dailyMaxMg,

            frequency:
                getFrequencyText(
                    dosing,
                    frequency
                ),

            dosesPerDay:
                frequency,

            unit:
                "mg/kg/day",

            duration:
                dosing.duration ||
                "",

            maxPerDose:
                Number(
                    dosing.maxPerDose
                ),

            maxDailyDose:
                Number(
                    dosing.maxDailyDose
                )
        };
    }


    /* =====================================
       FIXED DOSE
    ===================================== */

    if (
        type ===
            "fixed_dose" ||
        type ===
            "fixed"
    ) {

        const minMg =
            Number(
                dosing.minDose ??
                dosing.dose
            );


        const maxMg =
            Number(
                dosing.maxDose ??
                dosing.dose
            );


        if (
            !Number.isFinite(minMg) ||
            !Number.isFinite(maxMg)
        ) {

            return {

                success: false,

                message:
                    "The selected fixed-dose regimen is incomplete."
            };
        }


        const frequency =
            getFrequencyNumber(
                dosing
            );


        return {

            success: true,

            type,

            minDoseRate:
                minMg,

            maxDoseRate:
                maxMg,

            minMg,

            maxMg,

            dailyMinMg:
                minMg *
                frequency,

            dailyMaxMg:
                maxMg *
                frequency,

            frequency:
                getFrequencyText(
                    dosing,
                    frequency
                ),

            dosesPerDay:
                frequency,

            unit:
                "mg/dose",

            duration:
                dosing.duration ||
                "",

            maxPerDose:
                Number(
                    dosing.maxPerDose
                ),

            maxDailyDose:
                Number(
                    dosing.maxDailyDose
                )
        };
    }


    return {

        success: false,

        message:
            "The selected dosing regimen has an unsupported dosing type."
    };
}


/* =========================================
   FREQUENCY TEXT
========================================= */

function getFrequencyText(
    dosing,
    frequency
) {

    if (
        dosing &&
        dosing.interval
    ) {

        return String(
            dosing.interval
        );
    }


    if (
        dosing &&
        dosing.frequencyText
    ) {

        return String(
            dosing.frequencyText
        );
    }


    if (frequency === 1) {

        return "Once daily";
    }


    if (frequency === 2) {

        return "Twice daily";
    }


    if (frequency === 3) {

        return "Three times daily";
    }


    if (frequency === 4) {

        return "Four times daily";
    }


    return (
        `${frequency} times daily`
    );
}


/* =========================================
   MG → ML
========================================= */

function calculateVolume(
    doseMg,
    concentrationMg,
    concentrationMl
) {

    if (
        !Number.isFinite(doseMg) ||
        !Number.isFinite(concentrationMg) ||
        !Number.isFinite(concentrationMl) ||
        concentrationMg <= 0 ||
        concentrationMl <= 0
    ) {

        return NaN;
    }


    return (
        doseMg *
        concentrationMl
    ) /
    concentrationMg;
}


/* =========================================
   RANGE FORMATTERS
========================================= */

function isSingleValue(min, max) {

    return (
        Number.isFinite(min) &&
        Number.isFinite(max) &&
        Math.abs(max - min) < 0.001
    );
}


function formatRange(
    min,
    max,
    unit = ""
) {

    if (
        !Number.isFinite(min) ||
        !Number.isFinite(max)
    ) {

        return "—";
    }


    if (
        isSingleValue(
            min,
            max
        )
    ) {

        return `${formatNumber(min)}${unit}`;
    }


    return (
        `${formatNumber(min)}–${formatNumber(max)}${unit}`
    );
}


/* =========================================
   CALCULATION STEP HELPERS
========================================= */

function buildDoseCalculationSteps(
    result,
    weight,
    concentrationMg,
    concentrationMl
) {

    const steps = [];


    const minMg =
        result.minMg;


    const maxMg =
        result.maxMg;


    const minMl =
        calculateVolume(
            minMg,
            concentrationMg,
            concentrationMl
        );


    const maxMl =
        calculateVolume(
            maxMg,
            concentrationMg,
            concentrationMl
        );


    const type =
        result.type;


    /*
       ======================================
       FIXED DOSE
       ======================================
    */

    if (
        type === "fixed_dose" ||
        type === "fixed"
    ) {

        steps.push({

            title:
                "Dose from selected regimen",

            description:
                "The selected regimen provides a fixed dose.",

            equation:
                `${formatNumber(minMg)} mg/dose`,

            result:
                `${formatRange(
                    minMg,
                    maxMg,
                    " mg"
                )} per dose`
        });
    }


    /*
       ======================================
       MG/KG/DOSE
       ======================================
    */

    else if (
        type ===
        "mg_per_kg_per_dose"
    ) {

        steps.push({

            title:
                "Calculate minimum dose",

            description:
                `${formatNumber(result.minDoseRate)} mg/kg/dose × ${formatNumber(weight)} kg`,

            equation:
                `${formatNumber(result.minDoseRate)} × ${formatNumber(weight)} = ${formatNumber(minMg)} mg`,

            result:
                `${formatNumber(minMg)} mg/dose`
        });


        if (
            !isSingleValue(
                result.minDoseRate,
                result.maxDoseRate
            )
        ) {

            steps.push({

                title:
                    "Calculate maximum dose",

                description:
                    `${formatNumber(result.maxDoseRate)} mg/kg/dose × ${formatNumber(weight)} kg`,

                equation:
                    `${formatNumber(result.maxDoseRate)} × ${formatNumber(weight)} = ${formatNumber(maxMg)} mg`,

                result:
                    `${formatNumber(maxMg)} mg/dose`
            });
        }


        if (
            result.maxPerDoseApplied
        ) {

            steps.push({

                title:
                    "Apply maximum dose limit",

                description:
                    `The calculated dose exceeds the configured maximum of ${formatNumber(result.maxPerDose)} mg/dose.`,

                equation:
                    `Maximum allowed = ${formatNumber(result.maxPerDose)} mg/dose`,

                result:
                    `${formatNumber(maxMg)} mg/dose`
            });
        }


        if (
            result.maxDailyDoseApplied
        ) {

            steps.push({

                title:
                    "Apply maximum daily dose limit",

                description:
                    `The daily dose was limited according to the configured maximum daily dose.`,

                equation:
                    `${formatNumber(result.maxDailyDose)} mg/day ÷ ${formatNumber(result.dosesPerDay)} doses/day`,

                result:
                    `${formatNumber(maxMg)} mg/dose maximum`
            });
        }
    }


    /*
       ======================================
       MG/KG/DAY
       ======================================
    */

    else {

        steps.push({

            title:
                "Calculate minimum daily dose",

            description:
                `${formatNumber(result.minDoseRate)} mg/kg/day × ${formatNumber(weight)} kg`,

            equation:
                `${formatNumber(result.minDoseRate)} × ${formatNumber(weight)} = ${formatNumber(result.dailyMinMg)} mg/day`,

            result:
                `${formatNumber(result.dailyMinMg)} mg/day`
        });


        steps.push({

            title:
                "Divide minimum daily dose by frequency",

            description:
                `${formatNumber(result.dailyMinMg)} mg/day ÷ ${formatNumber(result.dosesPerDay)} doses/day`,

            equation:
                `${formatNumber(result.dailyMinMg)} ÷ ${formatNumber(result.dosesPerDay)} = ${formatNumber(minMg)} mg/dose`,

            result:
                `${formatNumber(minMg)} mg/dose`
        });


        if (
            !isSingleValue(
                result.minDoseRate,
                result.maxDoseRate
            )
        ) {

            steps.push({

                title:
                    "Calculate maximum daily dose",

                description:
                    `${formatNumber(result.maxDoseRate)} mg/kg/day × ${formatNumber(weight)} kg`,

                equation:
                    `${formatNumber(result.maxDoseRate)} × ${formatNumber(weight)} = ${formatNumber(result.dailyMaxMg)} mg/day`,

                result:
                    `${formatNumber(result.dailyMaxMg)} mg/day`
            });


            steps.push({

                title:
                    "Divide maximum daily dose by frequency",

                description:
                    `${formatNumber(result.dailyMaxMg)} mg/day ÷ ${formatNumber(result.dosesPerDay)} doses/day`,

                equation:
                    `${formatNumber(result.dailyMaxMg)} ÷ ${formatNumber(result.dosesPerDay)} = ${formatNumber(maxMg)} mg/dose`,

                result:
                    `${formatNumber(maxMg)} mg/dose`
            });
        }
    }


    /*
       ======================================
       MG → ML
       ======================================
    */

    steps.push({

        title:
            "Convert minimum dose from mg to mL",

        description:
            `Dose in mg × bottle volume ÷ concentration in mg`,

        equation:
            `(${formatNumber(minMg)} mg × ${formatNumber(concentrationMl)} mL) ÷ ${formatNumber(concentrationMg)} mg`,

        result:
            `${formatNumber(minMl)} mL/dose`
    });


    if (
        !isSingleValue(
            minMg,
            maxMg
        )
    ) {

        steps.push({

            title:
                "Convert maximum dose from mg to mL",

            description:
                `Maximum dose in mg × bottle volume ÷ concentration in mg`,

            equation:
                `(${formatNumber(maxMg)} mg × ${formatNumber(concentrationMl)} mL) ÷ ${formatNumber(concentrationMg)} mg`,

            result:
                `${formatNumber(maxMl)} mL/dose`
        });
    }


    return {
        steps,
        minMl,
        maxMl
    };
}


/* =========================================
   RESULT CARD HTML
========================================= */

function buildResultCards(
    result,
    concentrationMg,
    concentrationMl
) {

    if (!resultCard) {
        return;
    }


    const ageMonths =
        getAgeInMonths();


    const ageText =
        Number.isFinite(ageMonths)
            ? formatAgeFromMonths(
                ageMonths
            )
            : "Not required";


    const weight =
        weightInput
            ? parseFloat(
                weightInput.value
            )
            : NaN;


    const weightText =
        Number.isFinite(weight)
            ? `${formatNumber(weight)} kg`
            : "Not required";


    const minMg =
        result.minMg;


    const maxMg =
        result.maxMg;


    const minMl =
        calculateVolume(
            minMg,
            concentrationMg,
            concentrationMl
        );


    const maxMl =
        calculateVolume(
            maxMg,
            concentrationMg,
            concentrationMl
        );


    /* =====================================
       FINAL DOSE
    ===================================== */

    const finalMg =
        formatRange(
            minMg,
            maxMg,
            " mg"
        );


    const finalMl =
        formatRange(
            minMl,
            maxMl,
            " mL"
        );


    /* =====================================
       CALCULATION STEPS
    ===================================== */

    const calculation =
        buildDoseCalculationSteps(
            result,
            weight,
            concentrationMg,
            concentrationMl
        );


    let calculationHTML = "";


    calculation.steps.forEach(
        (step, index) => {

            const number =
                String(
                    index + 1
                )
                .padStart(
                    2,
                    "0"
                );


            calculationHTML += `

                <div class="calculation-step">

                    <span class="calculation-step-number">
                        ${number}
                    </span>

                    <div class="calculation-step-content">

                        <strong>
                            ${escapeHtml(
                                step.title
                            )}
                        </strong>

                        <p>
                            ${escapeHtml(
                                step.description
                            )}
                        </p>

                        <div class="calculation-equation">

                            ${escapeHtml(
                                step.equation
                            )}

                        </div>

                        <div class="calculation-step-result">

                            =
                            <strong>
                                ${escapeHtml(
                                    step.result
                                )}
                            </strong>

                        </div>

                    </div>

                </div>

            `;
        }
    );


    /*
       Final calculation summary
    */

    calculationHTML += `

        <div class="calculation-step calculation-final-step">

            <span class="calculation-step-number">
                ✓
            </span>

            <div class="calculation-step-content">

                <strong>
                    Final calculated dose
                </strong>

                <div class="calculation-equation">

                    ${escapeHtml(finalMg)}

                    <span>
                        =
                    </span>

                    ${escapeHtml(finalMl)}

                    <strong>
                        per dose
                    </strong>

                </div>

            </div>

        </div>

    `;


    /* =====================================
       DOSE INFORMATION
    ===================================== */

    let informationHTML = "";


    informationHTML += `

        <div class="dose-info-row">

            <span>
                Frequency
            </span>

            <strong>
                ${escapeHtml(
                    result.frequency ||
                    "—"
                )}
            </strong>

        </div>

    `;


    if (
        Number.isFinite(
            result.dailyMinMg
        ) &&
        Number.isFinite(
            result.dailyMaxMg
        )
    ) {

        informationHTML += `

            <div class="dose-info-row">

                <span>
                    Total daily dose
                </span>

                <strong>
                    ${formatRange(
                        result.dailyMinMg,
                        result.dailyMaxMg,
                        " mg/day"
                    )}
                </strong>

            </div>

        `;
    }


    informationHTML += `

        <div class="dose-info-row">

            <span>
                Concentration
            </span>

            <strong>
                ${escapeHtml(
                    formatConcentration({
                        mg:
                            concentrationMg,
                        ml:
                            concentrationMl
                    })
                )}
            </strong>

        </div>

    `;


    if (
        Number.isFinite(
            result.maxPerDose
        )
    ) {

        const maxPerDoseMl =
            calculateVolume(
                result.maxPerDose,
                concentrationMg,
                concentrationMl
            );


        informationHTML += `

            <div class="dose-info-row">

                <span>
                    Maximum per dose
                </span>

                <strong>

                    ${formatNumber(
                        result.maxPerDose
                    )}
                    mg

                    ${
                        Number.isFinite(
                            maxPerDoseMl
                        )
                            ? ` / ${formatNumber(maxPerDoseMl)} mL`
                            : ""
                    }

                </strong>

            </div>

        `;
    }


    if (
        Number.isFinite(
            result.maxDailyDose
        )
    ) {

        const maxDailyMl =
            calculateVolume(
                result.maxDailyDose,
                concentrationMg,
                concentrationMl
            );


        informationHTML += `

            <div class="dose-info-row">

                <span>
                    Maximum daily dose
                </span>

                <strong>

                    ${formatNumber(
                        result.maxDailyDose
                    )}
                    mg/day

                    ${
                        Number.isFinite(
                            maxDailyMl
                        )
                            ? ` / ${formatNumber(maxDailyMl)} mL/day`
                            : ""
                    }

                </strong>

            </div>

        `;
    }


    if (result.duration) {

        informationHTML += `

            <div class="dose-info-row">

                <span>
                    Duration
                </span>

                <strong>
                    ${escapeHtml(
                        result.duration
                    )}
                </strong>

            </div>

        `;
    }


    /* =====================================
       IMPORTANT INFORMATION
    ===================================== */

    let importantHTML = "";


    if (
        selectedMedicine &&
        selectedMedicine.notes
    ) {

        importantHTML += `

            <div class="result-note">

                <span>
                    i
                </span>

                <p>

                    <strong>
                        Important note
                    </strong>

                    ${escapeHtml(
                        selectedMedicine.notes
                    )}

                </p>

            </div>

        `;
    }


    if (
        selectedMedicine &&
        selectedMedicine.warnings
    ) {

        importantHTML += `

            <div class="result-note warning-note">

                <span>
                    !
                </span>

                <p>

                    <strong>
                        Warning
                    </strong>

                    ${escapeHtml(
                        selectedMedicine.warnings
                    )}

                </p>

            </div>

        `;
    }


    /* =====================================
       BUILD THREE CARDS
    ===================================== */

    resultCard.innerHTML = `

        <!-- =================================
             CARD 1 — FINAL DOSE
        ================================== -->

        <div class="dose-result-card final-dose-card">

            <div class="dose-card-header">

                <div>

                    <span class="dose-card-label">
                        FINAL RESULT
                    </span>

                    <h3>
                        ${escapeHtml(
                            getMedicineName(
                                selectedMedicine
                            )
                        )}
                    </h3>

                </div>

                <div class="dose-card-icon">
                    ✓
                </div>

            </div>


            <div class="patient-summary">

                <div>

                    <span>
                        Patient age
                    </span>

                    <strong>
                        ${escapeHtml(
                            ageText
                        )}
                    </strong>

                </div>


                <div>

                    <span>
                        Weight
                    </span>

                    <strong>
                        ${escapeHtml(
                            weightText
                        )}
                    </strong>

                </div>

            </div>


            <div class="final-dose-values">

                <div class="final-dose-item">

                    <span>
                        Dose
                    </span>

                    <strong>
                        ${finalMg}
                    </strong>

                    <small>
                        per dose
                    </small>

                </div>


                <div class="final-dose-item">

                    <span>
                        Volume
                    </span>

                    <strong>
                        ${finalMl}
                    </strong>

                    <small>
                        per dose
                    </small>

                </div>

            </div>


            <div class="final-dose-frequency">

                <span>
                    Frequency
                </span>

                <strong>
                    ${escapeHtml(
                        result.frequency ||
                        "—"
                    )}
                </strong>

            </div>

        </div>


        <!-- =================================
             CARD 2 — CALCULATION
        ================================== -->

        <div class="dose-result-card calculation-card">

            <div class="dose-card-header">

                <div>

                    <span class="dose-card-label">
                        STEP-BY-STEP
                    </span>

                    <h3>
                        Dose Calculation
                    </h3>

                </div>

                <div class="dose-card-icon">
                    =
                </div>

            </div>


            <div class="calculation-regimen">

                <span>
                    Selected regimen
                </span>

                <strong>
                    ${escapeHtml(
                        getRegimenLabel(
                            selectedRegimen
                        )
                    )}
                </strong>

            </div>


            <div class="calculation-steps">

                ${calculationHTML}

            </div>

        </div>


        <!-- =================================
             CARD 3 — DOSE INFORMATION
        ================================== -->

        <div class="dose-result-card information-card">

            <div class="dose-card-header">

                <div>

                    <span class="dose-card-label">
                        DOSE INFORMATION
                    </span>

                    <h3>
                        Additional Details
                    </h3>

                </div>

                <div class="dose-card-icon">
                    i
                </div>

            </div>


            <div class="dose-information-list">

                ${informationHTML}

            </div>


            ${
                importantHTML
                    ? `
                        <div class="important-information">

                            ${importantHTML}

                        </div>
                    `
                    : ""
            }

        </div>


        <!-- =================================
             SAFETY WARNING
        ================================== -->

        <div class="result-warning">

            <span>
                ⚠
            </span>

            <p>
                This result is a calculation aid and
                does not replace professional clinical
                judgment, the medicine's approved
                pediatric dosing guidelines, or
                verification by a pharmacist or physician.
            </p>

        </div>

    `;


    showResult();
}


/* =========================================
   LEGACY DISPLAY FUNCTION
========================================= */

function displayDoseResult(
    result,
    concentrationMg,
    concentrationMl
) {

    buildResultCards(
        result,
        concentrationMg,
        concentrationMl
    );
}


/* =========================================
   HISTORY
========================================= */

function getCalculationHistory() {

    const saved =
        localStorage.getItem(
            HISTORY_STORAGE_KEY
        );


    if (!saved) {
        return [];
    }


    try {

        const history =
            JSON.parse(
                saved
            );


        return Array.isArray(
            history
        )
            ? history
            : [];

    } catch {

        return [];
    }
}


function saveCalculationToHistory(data) {

    let history =
        getCalculationHistory();


    const now =
        new Date();


    const item = {

        id:
            Date.now(),

        medicine:
            data.medicine,

        regimen:
            data.regimen,

        dose:
            data.dose,

        doseUnit:
            data.doseUnit,

        volume:
            data.volume,

        age:
            data.age,

        ageUnit:
            data.ageUnit,

        weight:
            data.weight,

        concentration:
            data.concentration,

        frequency:
            data.frequency,

        duration:
            data.duration,

        date:
            now.toLocaleDateString(
                "en-GB"
            ),

        time:
            now.toLocaleTimeString(
                "en-US",
                {
                    hour:
                        "2-digit",

                    minute:
                        "2-digit"
                }
            ),

        timestamp:
            now.getTime()
    };


    history.unshift(
        item
    );


    history =
        history.slice(
            0,
            50
        );


    localStorage.setItem(
        HISTORY_STORAGE_KEY,
        JSON.stringify(
            history
        )
    );
}


/* =========================================
   GET SELECTED CONCENTRATION
========================================= */

function getSelectedConcentration() {

    let mg = NaN;
    let ml = NaN;


    if (
        concentrationSelect &&
        concentrationSelect.value
    ) {

        try {

            const value =
                JSON.parse(
                    concentrationSelect.value
                );


            mg =
                Number(
                    value.mg
                );


            ml =
                Number(
                    value.ml
                );

        } catch {

            mg = NaN;
            ml = NaN;
        }
    }


    if (
        !Number.isFinite(mg) ||
        !Number.isFinite(ml)
    ) {

        mg =
            concentrationValue
                ? parseFloat(
                    concentrationValue.value
                )
                : NaN;


        ml =
            concentrationVolume
                ? parseFloat(
                    concentrationVolume.value
                )
                : NaN;
    }


    return {
        mg,
        ml
    };
}


/* =========================================
   VALIDATE REQUIRED INPUTS
========================================= */

function validateCalculationInputs() {

    if (!selectedMedicine) {

        return {

            valid: false,

            message:
                "Please select a medicine before calculating the dose."
        };
    }


    if (!selectedRegimen) {

        return {

            valid: false,

            message:
                "Please select the dose regimen you want to calculate."
        };
    }


    /*
       AGE
    */

    if (
        regimenRequiresAge(
            selectedRegimen
        )
    ) {

        const age =
            ageInput
                ? parseFloat(
                    ageInput.value
                )
                : NaN;


        if (
            !Number.isFinite(age) ||
            age < 0
        ) {

            return {

                valid: false,

                message:
                    "Please enter the patient's age."
            };
        }
    }


    /*
       WEIGHT
    */

    if (
        regimenRequiresWeight(
            selectedRegimen
        )
    ) {

        const weight =
            weightInput
                ? parseFloat(
                    weightInput.value
                )
                : NaN;


        if (
            !Number.isFinite(weight) ||
            weight <= 0
        ) {

            return {

                valid: false,

                message:
                    "Please enter the patient's weight."
            };
        }
    }


    /*
       AGE LIMITS
    */

    const ageValidation =
        validateMedicineAge(
            selectedMedicine
        );


    if (
        !ageValidation.valid
    ) {

        return {

            valid: false,

            message:
                ageValidation.message
        };
    }


    /*
       CONCENTRATION
    */

    const concentration =
        getSelectedConcentration();


    if (
        !isFinitePositive(
            concentration.mg
        ) ||
        !isFinitePositive(
            concentration.ml
        )
    ) {

        return {

            valid: false,

            message:
                "Please select the available medicine concentration."
        };
    }


    return {

        valid: true,

        concentration
    };
}


/* =========================================
   CALCULATE DOSE
========================================= */

if (calculateButton) {

    calculateButton.addEventListener(
        "click",
        calculateDose
    );
}


function calculateDose() {

    hideValidation();
    hideResult();


    /*
       ======================================
       1. CHECK REGIMEN
       ======================================
    */

    const regimens =
        getMedicineRegimens(
            selectedMedicine
        );


    if (
        selectedMedicine &&
        regimens.length === 1 &&
        !selectedRegimen
    ) {

        selectedRegimen =
            regimens[0];
    }


    if (
        regimens.length > 1 &&
        !selectedRegimen
    ) {

        showValidation(
            "Please select the dose / regimen you want to calculate."
        );

        return;
    }


    /*
       ======================================
       2. VALIDATE INPUTS
       ======================================
    */

    const validation =
        validateCalculationInputs();


    if (
        !validation.valid
    ) {

        showValidation(
            validation.message
        );

        return;
    }


    const concentration =
        validation.concentration;


    const concentrationMg =
        concentration.mg;


    const concentrationMl =
        concentration.ml;


    /*
       ======================================
       3. WEIGHT
       ======================================
    */

    const weight =
        weightInput
            ? parseFloat(
                weightInput.value
            )
            : NaN;


    /*
       ======================================
       4. CALCULATE
       ======================================
    */

    const result =
        calculateDosingRule(
            selectedMedicine,
            weight,
            selectedRegimen
        );


    if (
        !result.success
    ) {

        showValidation(
            result.message ||
            "Unable to calculate the pediatric dose."
        );

        return;
    }


    /*
       ======================================
       5. DISPLAY
       ======================================
    */

    displayDoseResult(
        result,
        concentrationMg,
        concentrationMl
    );


    /*
       ======================================
       6. HISTORY
       ======================================
    */

    const minMl =
        calculateVolume(
            result.minMg,
            concentrationMg,
            concentrationMl
        );


    const maxMl =
        calculateVolume(
            result.maxMg,
            concentrationMg,
            concentrationMl
        );


    const doseText =
        isSingleValue(
            result.minMg,
            result.maxMg
        )

            ? `${formatNumber(result.minMg)} mg`

            : `${formatNumber(result.minMg)}–${formatNumber(result.maxMg)} mg`;


    const volumeText =
        isSingleValue(
            minMl,
            maxMl
        )

            ? `${formatNumber(minMl)} mL`

            : `${formatNumber(minMl)}–${formatNumber(maxMl)} mL`;


    saveCalculationToHistory({

        medicine:
            getMedicineName(
                selectedMedicine
            ),

        regimen:
            getRegimenLabel(
                selectedRegimen
            ),

        dose:
            doseText,

        doseUnit:
            "per dose",

        volume:
            volumeText,

        age:
            ageInput
                ? ageInput.value
                : "",

        ageUnit:
            ageUnit
                ? ageUnit.value
                : "",

        weight:
            weightInput
                ? weightInput.value
                : "",

        concentration:
            `${concentrationMg} mg/${concentrationMl} mL`,

        frequency:
            result.frequency ||
            "",

        duration:
            result.duration ||
            ""
    });
}


/* =========================================
   BACK BUTTON
========================================= */

if (backButton) {

    backButton.addEventListener(
        "click",
        () => {

            window.location.href =
                "index.html";
        }
    );
}


/* =========================================
   INITIALIZE
========================================= */

function initializeCalculator() {

    populateMedicineSelect();


    if (concentrationSelect) {

        concentrationSelect.innerHTML =
            "";


        const option =
            document.createElement(
                "option"
            );


        option.value =
            "";


        option.textContent =
            "Select a concentration";


        concentrationSelect.appendChild(
            option
        );


        concentrationSelect.disabled =
            true;
    }


    if (regimenSelect) {

        regimenSelect.innerHTML = `
            <option value="">
                Select a dose regimen
            </option>
        `;


        regimenSelect.disabled =
            true;
    }


    if (selectedMedicine) {

        populateConcentrations(
            selectedMedicine
        );


        createRegimenSelector(
            selectedMedicine
        );
    }


    hideValidation();
    hideResult();
}


/* =========================================
   START
========================================= */

initializeCalculator();
