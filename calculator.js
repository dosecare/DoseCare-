/* =========================================
   DoseCare
   Pediatric Dose Calculator
   FULL UPDATED VERSION

   - Oral liquid medicines only
   - Syrups / Oral Solutions / Oral Suspensions
   - mg/kg/dose
   - mg/kg/day
   - condition-based dosing
   - severity-based dosing
   - Frequency + interval in hours
   - mg → mL conversion
   - Step-by-step calculation
   - 3 result cards
   - Patient information
   - Extended medicine information
   - Mechanism of action
   - Active ingredient
   - Drug class
   - Therapeutic uses
   - Important information
   - Warnings
   - Duration
   - History using localStorage
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
const conditionGroup =
    document.getElementById("condition-group");

const conditionSelect =
    document.getElementById("condition-select");

const selectedConditionInfo =
    document.getElementById("selected-condition-info");


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

    const number = Number(value);

    if (!Number.isFinite(number)) {
        return "—";
    }

    const rounded =
        Number(
            number.toFixed(decimals)
        );

    return rounded.toLocaleString("en-US");
}


function normalizeText(value) {

    return String(value ?? "")
        .trim()
        .toLowerCase();
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


/* =========================================
   MEDICINE INFORMATION HELPERS
========================================= */

function getMedicineField(
    medicine,
    fields,
    fallback = ""
) {

    if (!medicine) {
        return fallback;
    }

    for (const field of fields) {

        const value =
            medicine[field];

        if (
            value !== undefined &&
            value !== null &&
            value !== ""
        ) {

            return value;
        }
    }

    return fallback;
}


function getMedicineDrugClass(medicine) {

    const value =
        getMedicineField(
            medicine,
            [
                "drugClass",
                "drugClasses",
                "class",
                "therapeuticClass",
                "pharmacologicalClass"
            ],
            ""
        );


    if (Array.isArray(value)) {

        return value
            .filter(Boolean)
            .join(" · ");
    }


    return String(value || "");
}


function getActiveIngredient(medicine) {

    const value =
        getMedicineField(
            medicine,
            [
                "activeIngredient",
                "activeIngredients",
                "active_ingredient",
                "genericName",
                "ingredient"
            ],
            ""
        );


    if (Array.isArray(value)) {

        return value
            .filter(Boolean)
            .join(", ");
    }


    return String(value || "");
}


function getMechanismOfAction(medicine) {

    return getMedicineField(
        medicine,
        [
            "mechanismOfAction",
            "mechanism",
            "mechanism_of_action",
            "pharmacologicalMechanism",
            "howItWorks"
        ],
        ""
    );
}


function getTherapeuticUses(medicine) {

    const value =
        getMedicineField(
            medicine,
            [
                "therapeuticUses",
                "therapeuticUse",
                "uses",
                "indications",
                "indication"
            ],
            ""
        );


    if (Array.isArray(value)) {

        return value
            .filter(Boolean)
            .join(", ");
    }


    return String(value || "");
}


function getMedicineNotes(medicine) {

    const value =
        getMedicineField(
            medicine,
            [
                "notes",
                "importantInformation",
                "importantNotes",
                "clinicalNotes"
            ],
            ""
        );


    if (Array.isArray(value)) {

        return value
            .filter(Boolean)
            .join(" ");
    }


    return String(value || "");
}


function getMedicineWarnings(medicine) {

    const value =
        getMedicineField(
            medicine,
            [
                "warnings",
                "warning",
                "importantWarnings",
                "precautions"
            ],
            ""
        );


    if (Array.isArray(value)) {

        return value
            .filter(Boolean)
            .join(" ");
    }


    return String(value || "");
}


function getContraindications(medicine) {

    const value =
        getMedicineField(
            medicine,
            [
                "contraindications",
                "contraindication"
            ],
            ""
        );


    if (Array.isArray(value)) {

        return value
            .filter(Boolean)
            .join(", ");
    }


    return String(value || "");
}


function getCommonAdverseEffects(medicine) {

    const value =
        getMedicineField(
            medicine,
            [
                "commonAdverseEffects",
                "adverseEffects",
                "sideEffects",
                "commonSideEffects"
            ],
            ""
        );


    if (Array.isArray(value)) {

        return value
            .filter(Boolean)
            .join(", ");
    }


    return String(value || "");
}


function getMonitoringInformation(medicine) {

    const value =
        getMedicineField(
            medicine,
            [
                "monitoring",
                "monitoringParameters",
                "clinicalMonitoring"
            ],
            ""
        );


    if (Array.isArray(value)) {

        return value
            .filter(Boolean)
            .join(", ");
    }


    return String(value || "");
}


function getStorageInformation(medicine) {

    const value =
        getMedicineField(
            medicine,
            [
                "storage",
                "storageInformation"
            ],
            ""
        );


    if (Array.isArray(value)) {

        return value
            .filter(Boolean)
            .join(" ");
    }


    return String(value || "");
}


/* =========================================
   MEDICINE FORM
   STRICTLY ORAL LIQUIDS
========================================= */

function isLiquidMedicine(medicine) {

    if (!medicine) {
        return false;
    }


    /* -----------------------------------------
       COLLECT DOSAGE FORMS
       Supports both:
       dosageForm
       dosageForms
    ----------------------------------------- */

    const possibleForms = [

        medicine.dosageForm,
        medicine.dosageForms,

        medicine.dosage_form,
        medicine.form,
        medicine.routeForm,
        medicine.preparation,
        medicine.pharmaceuticalForm

    ];


    const forms = possibleForms
        .flatMap(value => {

            if (Array.isArray(value)) {
                return value;
            }

            return value
                ? [value]
                : [];

        })
        .filter(Boolean)
        .map(normalizeText);


    /* -----------------------------------------
       FORBIDDEN DOSAGE FORMS

       DoseCare supports ONLY:
       Syrups
       Oral Solutions
       Oral Suspensions
       Oral Liquids
    ----------------------------------------- */

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
        "iv injection",
        "intravenous",

        "im",
        "intramuscular",

        "suppository",
        "suppositories",

        "cream",
        "ointment",
        "gel",
        "patch",

        "powder",
        "granules",

        "lozenge"

    ];


    /* -----------------------------------------
       REJECT IF ANY FORBIDDEN FORM EXISTS
    ----------------------------------------- */

    if (
        forms.some(
            form =>
                forbiddenForms.includes(form)
        )
    ) {

        return false;

    }


    /* -----------------------------------------
       ACCEPTED ORAL LIQUID FORMS
    ----------------------------------------- */

    const acceptedLiquidForms = [

        "syrup",
        "syrups",

        "oral syrup",

        "oral solution",
        "oral solutions",

        "oral suspension",
        "oral suspensions",

        "oral liquid",
        "oral liquids",

        "solution",
        "suspension"

    ];


    const hasAcceptedLiquidForm =
        forms.some(
            form =>
                acceptedLiquidForms.includes(form)
        );


    if (hasAcceptedLiquidForm) {

        return true;

    }


    /* -----------------------------------------
       IF A FORM WAS PROVIDED BUT IT IS NOT
       AN ACCEPTED ORAL LIQUID, REJECT IT.
    ----------------------------------------- */

    if (forms.length > 0) {

        return false;

    }


    /* -----------------------------------------
       FALLBACK

       Only allow medicines that are explicitly
       oral AND have a valid liquid concentration.
    ----------------------------------------- */

    const route =
        normalizeText(
            medicine.route
        );

    const administrationRoute =
        normalizeText(
            medicine.administrationRoute
        );


    const isOral =

        route === "oral" ||

        administrationRoute === "oral" ||

        route.includes("oral") ||

        administrationRoute.includes("oral");


    if (
        isOral &&
        getAvailableConcentrations(medicine).length > 0
    ) {

        return true;

    }


    return false;

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
            .replace(/\s+/g, "");


    let match =
        text.match(
            /^(\d+(?:\.\d+)?)mg\/(?:per)?(\d+(?:\.\d+)?)ml$/
        );


    if (!match) {

        match =
            text.match(
                /^(\d+(?:\.\d+)?)mg\/(\d+(?:\.\d+)?)ml$/
            );
    }


    if (!match) {
        return null;
    }


    const mg =
        Number(match[1]);

    const ml =
        Number(match[2]);


    if (
        !Number.isFinite(mg) ||
        !Number.isFinite(ml) ||
        mg <= 0 ||
        ml <= 0
    ) {
        return null;
    }


    return {
        mg,
        ml
    };
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
                            item.strength
                        )
                )
                .filter(Boolean);

      } else if (
        Array.isArray(
            medicine.commonPediatricConcentrations
        )
    ) {

        raw =
            medicine.commonPediatricConcentrations;

    } else if (
        medicine.concentration
    ) {

        raw = [
            medicine.concentration
        ];

    } else if (
        medicine.concentrationMg !== undefined &&
        medicine.concentrationMl !== undefined
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


        if (
            typeof item === "string"
        ) {

            result =
                parseConcentrationString(
                    item
                );

        } else if (
            item &&
            typeof item === "object"
        ) {

            const mg =
                Number(
                    item.mg ??
                    item.mgPerVolume ??
                    item.concentrationMg
                );

            const ml =
                Number(
                    item.ml ??
                    item.volume ??
                    item.concentrationMl
                );


            if (
                Number.isFinite(mg) &&
                Number.isFinite(ml) &&
                mg > 0 &&
                ml > 0
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
                existing =>
                    existing.mg === result.mg &&
                    existing.ml === result.ml
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


    const defaultOption =
        document.createElement("option");

    defaultOption.value = "";

    defaultOption.textContent =
        "Select a concentration";

    concentrationSelect.appendChild(
        defaultOption
    );


    const concentrations =
        getAvailableConcentrations(
            medicine
        );


    concentrations.forEach(
        concentration => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                JSON.stringify(
                    concentration
                );

            option.textContent =
                formatConcentration(
                    concentration
                );

            concentrationSelect.appendChild(
                option
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
            selectedConcentration.innerHTML =
                "";
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
            window.medicines
        ) &&
        !Array.isArray(
            typeof medicines !== "undefined"
                ? medicines
                : null
        )
    ) {
        return [];
    }


    const medicineData =
        Array.isArray(window.medicines)
            ? window.medicines
            : medicines;


    return medicineData.filter(
        medicine =>
            isLiquidMedicine(
                medicine
            )
    );
}


/* =========================================
   MEDICINE BY ID
========================================= */

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
        cloneObject(
            regimen
        );


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
   CONDITION REGIMENS
   Shows only when the medicine has
   multiple condition-specific regimens.
========================================= */

function getConditionRegimens(medicine) {

    if (
        !medicine ||
        !medicine.dosing
    ) {
        return [];
    }

    const dosing =
        medicine.dosing;

    const conditions = [];

    /* -----------------------------------------
       dosing.conditionBased[]
    ----------------------------------------- */

    if (
        Array.isArray(
            dosing.conditionBased
        )
    ) {

        dosing.conditionBased.forEach(
            (item, index) => {

                const regimen =
                    normalizeRegimen(
                        item,
                        `Condition ${index + 1}`
                    );

                if (!regimen) {
                    return;
                }

                const condition =
                    regimen.condition ||
                    regimen.indication ||
                    regimen.label ||
                    regimen.name;

                if (condition) {

                    regimen.condition =
                        String(condition);

                    conditions.push(
                        regimen
                    );
                }
            }
        );
    }


    /* -----------------------------------------
       dosing.conditions{}
    ----------------------------------------- */

    if (
        conditions.length === 0 &&
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

                if (!normalized) {
                    return;
                }

                normalized.condition =
                    normalized.condition ||
                    condition;

                normalized.label =
                    normalized.label ||
                    condition;

                conditions.push(
                    normalized
                );
            }
        );
    }


    /* -----------------------------------------
       dosing.indications[]
    ----------------------------------------- */

    if (
        conditions.length === 0 &&
        Array.isArray(
            dosing.indications
        )
    ) {

        dosing.indications.forEach(
            (item, index) => {

                const regimen =
                    normalizeRegimen(
                        item,
                        `Condition ${index + 1}`
                    );

                if (!regimen) {
                    return;
                }

                const condition =
                    regimen.condition ||
                    regimen.indication ||
                    regimen.label ||
                    regimen.name;

                if (condition) {

                    regimen.condition =
                        String(condition);

                    conditions.push(
                        regimen
                    );
                }
            }
        );
    }


    /*
       Remove duplicate conditions.
    */

    const unique = [];

    const seen = new Set();

    conditions.forEach(
        regimen => {

            const key =
                normalizeText(
                    regimen.condition
                );

            if (
                key &&
                !seen.has(key)
            ) {

                seen.add(key);

                unique.push(
                    regimen
                );
            }
        }
    );


    /*
       Condition selector appears ONLY
       when there are 2+ conditions.
    */

    if (unique.length < 2) {
        return [];
    }


    return unique;
}
/* =========================================
   CONDITION SELECTOR UI
========================================= */

function createConditionSelector(medicine) {

    if (
        !conditionGroup ||
        !conditionSelect
    ) {
        return;
    }


    const conditions =
        getConditionRegimens(
            medicine
        );


    conditionSelect.innerHTML = `
        <option value="">
            Select a condition
        </option>
    `;


    /*
       Hide condition selector when
       medicine does not have multiple
       condition-specific regimens.
    */

    if (
        conditions.length < 2
    ) {

        conditionGroup.style.display =
            "none";

        if (selectedConditionInfo) {

            selectedConditionInfo.innerHTML =
                "";
        }

        return;
    }


    conditions.forEach(
        (regimen, index) => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                String(index);

            option.textContent =
                getConditionLabel(
                    regimen
                );

            conditionSelect.appendChild(
                option
            );
        }
    );


    conditionGroup.style.display =
        "block";
}


function getConditionLabel(regimen) {

    if (!regimen) {
        return "Condition";
    }


    return (
        regimen.condition ||
        regimen.indication ||
        regimen.label ||
        regimen.name ||
        "Condition"
    );
}


function getSelectedConditionRegimen() {

    if (
        !selectedMedicine ||
        !conditionSelect
    ) {
        return null;
    }


    const conditions =
        getConditionRegimens(
            selectedMedicine
        );


    const index =
        Number(
            conditionSelect.value
        );


    if (
        !Number.isInteger(index) ||
        !conditions[index]
    ) {
        return null;
    }


    return conditions[index];
}


function displaySelectedCondition(
    regimen
) {

    if (!selectedConditionInfo) {
        return;
    }


    if (!regimen) {

        selectedConditionInfo.innerHTML =
            "";

        return;
    }


    selectedConditionInfo.innerHTML = `

        <div class="selected-condition-card">

            <span>
                Selected condition
            </span>

            <strong>
                ${escapeHtml(
                    getConditionLabel(
                        regimen
                    )
                )}
            </strong>

        </div>

    `;
}
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
/* =========================================
   CONDITION CHANGE
========================================= */

if (conditionSelect) {

    conditionSelect.addEventListener(
        "change",
        () => {

            const regimen =
                getSelectedConditionRegimen();


            if (!regimen) {

                displaySelectedCondition(
                    null
                );

                selectedRegimen =
                    null;

                hideValidation();
                hideResult();

                return;
            }


            selectedRegimen =
                regimen;


            displaySelectedCondition(
                regimen
            );


            /*
               The selected condition becomes
               the active dosing regimen.
            */

            displaySelectedRegimenInfo(
                regimen
            );


            hideValidation();
            hideResult();
        }
    );
}

    if (regimen.indication) {
        return String(
            regimen.indication
        );
    }


    const type =
        normalizeText(
            regimen.type
        );


    const min =
        regimen.minDose ??
        regimen.dose;

    const max =
        regimen.maxDose ??
        regimen.dose;


    const doseText =
        min !== undefined
            ? (
                min === max
                    ? `${min}`
                    : `${min}–${max}`
            )
            : "";


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
   FREQUENCY + HOURS
========================================= */

function getFrequencyNumber(dosing) {

    if (!dosing) {
        return 1;
    }


    const frequency =
        Number(
            dosing.frequency
        );


    if (
        Number.isFinite(
            frequency
        ) &&
        frequency > 0
    ) {
        return frequency;
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


function getFrequencyHours(
    dosing,
    frequency
) {

    if (!dosing) {
        return null;
    }


    const explicitHours =
        Number(
            dosing.intervalHours ??
            dosing.frequencyHours ??
            dosing.hoursBetweenDoses
        );


    if (
        Number.isFinite(explicitHours) &&
        explicitHours > 0
    ) {

        return explicitHours;
    }


    const intervalText =
        normalizeText(
            dosing.interval ||
            dosing.frequencyText ||
            ""
        );


    const hourMatch =
        intervalText.match(
            /(\d+(?:\.\d+)?)\s*(?:hour|hours|hr|hrs|h)/
        );


    if (hourMatch) {

        const hours =
            Number(
                hourMatch[1]
            );

        if (
            Number.isFinite(hours) &&
            hours > 0
        ) {
            return hours;
        }
    }


    const numericFrequency =
        Number(
            frequency
        );


    if (
        Number.isFinite(
            numericFrequency
        ) &&
        numericFrequency > 0
    ) {

        const calculatedHours =
            24 /
            numericFrequency;


        if (
            Number.isFinite(
                calculatedHours
            )
        ) {

            return calculatedHours;
        }
    }


    return null;
}


function formatFrequencyHours(hours) {

    if (
        !Number.isFinite(hours) ||
        hours <= 0
    ) {
        return "";
    }


    if (
        Math.abs(
            hours -
            Math.round(hours)
        ) < 0.001
    ) {

        return `${Math.round(hours)} hours`;
    }


    return `${formatNumber(hours, 1)} hours`;
}


function getFrequencyText(
    dosing,
    frequency
) {

    const explicitText =
        dosing &&
        (
            dosing.frequencyText ||
            dosing.interval
        );


    let baseText = "";


    if (explicitText) {

        baseText =
            String(
                explicitText
            );

    } else {

        const numericFrequency =
            Number(
                frequency
            );


        if (numericFrequency === 1) {
            baseText = "Once daily";

        } else if (numericFrequency === 2) {
            baseText = "Twice daily";

        } else if (numericFrequency === 3) {
            baseText = "Three times daily";

        } else if (numericFrequency === 4) {
            baseText = "Four times daily";

        } else {

            baseText =
                `${formatNumber(numericFrequency, 0)} times daily`;
        }
    }


    const hours =
        getFrequencyHours(
            dosing,
            frequency
        );


    if (
        Number.isFinite(hours)
    ) {

        const hoursText =
            formatFrequencyHours(
                hours
            );


        if (
            !normalizeText(baseText)
                .includes(
                    normalizeText(hoursText)
                )
        ) {

            return (
                `${baseText} (every ${hoursText.replace(
                    " hours",
                    " hours"
                )})`
            );
        }
    }


    return baseText;
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


    const frequencyNumber =
        getFrequencyNumber(
            regimen
        );


    const frequency =
        getFrequencyText(
            regimen,
            frequencyNumber
        );


    const doseText =
        getRegimenLabel(
            regimen
        );


    selectedRegimenInfo.innerHTML = `
        <div class="selected-regimen-card">

            <strong>
                ${escapeHtml(
                    doseText
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
            "DoseCare currently supports oral liquid medicines only: syrups, oral solutions, and oral suspensions."
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
                    String(form)
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
        medicineSelect.value = "";
    }


    if (medicineSearch) {
        medicineSearch.value = "";
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
        concentrationValue.value = "";
    }


    if (concentrationVolume) {
        concentrationVolume.value = "";
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


            if (!medicine) {

                showValidation(
                    "The selected medicine could not be found."
                );

                return;
            }


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
                                getMedicineDrugClass(
                                    medicine
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
            "<span>No oral liquid medicine found</span>";

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
                getMedicineDrugClass(
                    medicine
                ) ||
                "Medicine";


            item.innerHTML = `
                <strong>
                    ${escapeHtml(name)}
                </strong>

                <span>
                    ${escapeHtml(
                        String(
                            drugClass
                        )
                    )}
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

    } else {

        validationMessage.textContent =
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

/* =====================================
   3. AGE
===================================== */

const age =
    ageInput
        ? parseFloat(
            ageInput.value
        )
        : NaN;


const ageUnitValue =
    ageUnit
        ? normalizeText(
            ageUnit.value
        )
        : "years";


const ageMonths =
    Number.isFinite(age)
        ? (
            ageUnitValue === "month" ||
            ageUnitValue === "months" ||
            ageUnitValue === "mo"
                ? age
                : age * 12
        )
        : NaN;


/* =====================================
   4. WEIGHT
===================================== */

const weight =
    weightInput &&
    weightInput.value !== ""
        ? parseFloat(
            weightInput.value
        )
        : NaN;


/* =====================================
   5. DETERMINE REQUIRED PATIENT DATA
===================================== */

const baseDosing =
    selectedMedicine &&
    selectedMedicine.dosing
        ? selectedMedicine.dosing
        : null;


const dosingType =
    selectedRegimen &&
    selectedRegimen.type
        ? normalizeText(
            selectedRegimen.type
        )
        : baseDosing &&
          baseDosing.type
            ? normalizeText(
                baseDosing.type
            )
            : "";


/*
   Age is required for:
   - fixed_age_dose

   Weight is required for:
   - mg/kg/dose
   - mg/kg/day
   - weight_based
   - weight_based_fixed_dose
   - condition_based
   - severity_based

   fixed_daily_dose does not automatically
   require age or weight unless its database
   regimen specifically requires them.
*/

const requiresAge =
    dosingType ===
    "fixed_age_dose";


const requiresWeight =
    dosingType ===
        "mg_per_kg_per_dose" ||
    dosingType ===
        "mg_per_kg_per_day" ||
    dosingType ===
        "weight_based" ||
    dosingType ===
        "weight_based_fixed_dose" ||
    dosingType ===
        "condition_based" ||
    dosingType ===
        "severity_based";


if (
    requiresAge &&
    (
        !Number.isFinite(age) ||
        age < 0
    )
) {

    showValidation(
        "Please enter the patient's age."
    );

    return;
}


if (
    requiresWeight &&
    (
        !Number.isFinite(weight) ||
        weight <= 0
    )
) {

    showValidation(
        "Please enter the patient's weight."
    );

    return;
}


/* =====================================
   6. AGE VALIDATION
===================================== */

if (
    requiresAge ||
    Number.isFinite(ageMonths)
) {

    const ageValidation =
        validateMedicineAge(
            selectedMedicine
        );


    if (
        !ageValidation.valid
    ) {

        showValidation(
            ageValidation.message
        );

        return;
    }
}
/* =========================================
   DOSING CALCULATION
   Supports:
   - mg/kg/dose
   - mg/kg/day
   - condition_based
   - severity_based
   - fixed_age_dose
   - weight_based_fixed_dose
   - fixed_daily_dose
========================================= */

function calculateDosingRule(
    medicine,
    weight,
    regimen,
    ageMonths
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
        normalizeText(
            dosing.type
        );


    /* =====================================
       HELPER
       Parse numeric dose ranges
       Example:
       "5–10" → [5, 10]
       "5-10" → [5, 10]
    ===================================== */

    function parseDoseRange(value) {

        if (
            typeof value === "number" &&
            Number.isFinite(value)
        ) {

            return {
                min: value,
                max: value
            };
        }


        if (
            typeof value !== "string"
        ) {
            return null;
        }


        const cleaned =
            value
                .replace(/–/g, "-")
                .trim();


        const match =
            cleaned.match(
                /^(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)$/
            );


        if (match) {

            const min =
                Number(match[1]);

            const max =
                Number(match[2]);


            if (
                Number.isFinite(min) &&
                Number.isFinite(max) &&
                min >= 0 &&
                max >= min
            ) {

                return {
                    min,
                    max
                };
            }
        }


        const single =
            Number(cleaned);


        if (
            Number.isFinite(single) &&
            single >= 0
        ) {

            return {
                min: single,
                max: single
            };
        }


        return null;
    }


    /* =====================================
       FIND AGE-BASED REGIMEN
    ===================================== */

    function findAgeRegimen() {

        if (
            !Number.isFinite(ageMonths)
        ) {
            return null;
        }


        const ageRegimens =
            Array.isArray(
                dosing.ageBasedDosing
            )
                ? dosing.ageBasedDosing
                : [];


        for (
            const item of ageRegimens
        ) {

            const minMonths =
                Number(
                    item.minimumAgeMonths
                );


            const maxMonths =
                Number(
                    item.maximumAgeMonths
                );


            const minYears =
                Number(
                    item.minimumAgeYears
                );


            const maxYears =
                Number(
                    item.maximumAgeYears
                );


            const lowerBound =
                Number.isFinite(minMonths)
                    ? minMonths
                    : Number.isFinite(minYears)
                        ? minYears * 12
                        : 0;


            const upperBound =
                Number.isFinite(maxMonths)
                    ? maxMonths
                    : Number.isFinite(maxYears)
                        ? maxYears * 12
                        : Infinity;


            if (
                ageMonths >= lowerBound &&
                ageMonths < upperBound
            ) {

                return item;
            }


            /*
               If the final age group has no
               maximum age, allow it.
            */

            if (
                ageMonths >= lowerBound &&
                upperBound === Infinity
            ) {

                return item;
            }
        }


        return null;
    }


    /* =====================================
       FIND WEIGHT-BASED REGIMEN
    ===================================== */

    function findWeightRegimen() {

        if (
            !Number.isFinite(weight)
        ) {
            return null;
        }


        const weightRegimens =
            Array.isArray(
                dosing.weightBasedDosing
            )
                ? dosing.weightBasedDosing
                : [];


        for (
            const item of weightRegimens
        ) {

            const minWeight =
                Number(
                    item.minimumWeightKg
                );


            const maxWeight =
                Number(
                    item.maximumWeightKg
                );


            const lowerBound =
                Number.isFinite(minWeight)
                    ? minWeight
                    : 0;


            const upperBound =
                Number.isFinite(maxWeight)
                    ? maxWeight
                    : Infinity;


            /*
               Use < for the upper boundary so
               30 kg belongs to the next regimen
               when the database defines 30 kg
               as its lower boundary.
            */

            if (
                weight >= lowerBound &&
                weight < upperBound
            ) {

                return item;
            }


            if (
                weight >= lowerBound &&
                upperBound === Infinity
            ) {

                return item;
            }
        }


        return null;
    }


    /* =====================================
       FIXED AGE DOSE
    ===================================== */

    if (
        type ===
        "fixed_age_dose"
    ) {

        const ageRegimen =
            findAgeRegimen();


        if (!ageRegimen) {

            return {
                success: false,

                message:
                    "No pediatric dose regimen matches the patient's age for this medicine."
            };
        }


        const doseRange =
            parseDoseRange(
                ageRegimen.doseMg ??
                ageRegimen.doseRangeMg
            );


        if (!doseRange) {

            return {
                success: false,

                message:
                    "The age-specific dose is incomplete or invalid for this medicine."
            };
        }


        const frequency =
            Number(
                ageRegimen.frequencyPerDay ??
                ageRegimen.dosesPerDay ??
                dosing.frequencyPerDay ??
                dosing.frequency
            );


        const frequencyValue =
            Number.isFinite(frequency) &&
            frequency > 0
                ? frequency
                : 1;


        const frequencyText =
            ageRegimen.frequencyText ||
            dosing.frequencyText ||
            dosing.frequency ||
            "As directed";


        const intervalHours =
            Number(
                ageRegimen.intervalHours ??
                ageRegimen.minimumIntervalHours ??
                dosing.intervalHours
            );


        const dailyMinMg =
            doseRange.min *
            frequencyValue;


        const dailyMaxMg =
            doseRange.max *
            frequencyValue;


        return {

            success: true,

            type:
                "fixed_dose",

            originalType:
                type,

            minDoseRate:
                doseRange.min,

            maxDoseRate:
                doseRange.max,

            minMg:
                doseRange.min,

            maxMg:
                doseRange.max,

            dailyMinMg,

            dailyMaxMg,

            frequency:
                String(
                    frequencyText
                ),

            dosesPerDay:
                frequencyValue,

            intervalHours:
                Number.isFinite(
                    intervalHours
                )
                    ? intervalHours
                    : getFrequencyHours(
                        ageRegimen,
                        frequencyValue
                    ),

            unit:
                "mg/dose",

            duration:
                ageRegimen.duration ||
                dosing.duration ||
                "",

            maxPerDose:
                Number.isFinite(
                    Number(
                        ageRegimen.maximumDoseMg
                    )
                )
                    ? Number(
                        ageRegimen.maximumDoseMg
                    )
                    : null,

            maxDailyDose:
                Number.isFinite(
                    Number(
                        ageRegimen.maximumDailyDoseMg
                    )
                )
                    ? Number(
                        ageRegimen.maximumDailyDoseMg
                    )
                    : null,

            matchedRegimen:
                ageRegimen
        };
    }


    /* =====================================
       FIXED WEIGHT-BASED DOSE
    ===================================== */

    if (
        type ===
        "weight_based_fixed_dose"
    ) {

        const weightRegimen =
            findWeightRegimen();


        if (!weightRegimen) {

            return {
                success: false,

                message:
                    "No pediatric dose regimen matches the patient's weight for this medicine."
            };
        }


        const doseRange =
            parseDoseRange(
                weightRegimen.doseMg ??
                weightRegimen.doseRangeMg
            );


        if (!doseRange) {

            return {
                success: false,

                message:
                    "The weight-specific dose is incomplete or invalid for this medicine."
            };
        }


        const frequency =
            Number(
                weightRegimen.frequencyPerDay ??
                weightRegimen.dosesPerDay ??
                dosing.frequencyPerDay ??
                dosing.frequency
            );


        const frequencyValue =
            Number.isFinite(frequency) &&
            frequency > 0
                ? frequency
                : 1;


        const frequencyText =
            weightRegimen.frequencyText ||
            dosing.frequencyText ||
            dosing.frequency ||
            "As directed";


        const intervalHours =
            Number(
                weightRegimen.intervalHours ??
                weightRegimen.minimumIntervalHours ??
                dosing.intervalHours
            );


        const dailyMinMg =
            doseRange.min *
            frequencyValue;


        const dailyMaxMg =
            doseRange.max *
            frequencyValue;


        return {

            success: true,

            type:
                "fixed_dose",

            originalType:
                type,

            minDoseRate:
                doseRange.min,

            maxDoseRate:
                doseRange.max,

            minMg:
                doseRange.min,

            maxMg:
                doseRange.max,

            dailyMinMg,

            dailyMaxMg,

            frequency:
                String(
                    frequencyText
                ),

            dosesPerDay:
                frequencyValue,

            intervalHours:
                Number.isFinite(
                    intervalHours
                )
                    ? intervalHours
                    : getFrequencyHours(
                        weightRegimen,
                        frequencyValue
                    ),

            unit:
                "mg/dose",

            duration:
                weightRegimen.duration ||
                dosing.duration ||
                "",

            maxPerDose:
                Number.isFinite(
                    Number(
                        weightRegimen.maximumDoseMg
                    )
                )
                    ? Number(
                        weightRegimen.maximumDoseMg
                    )
                    : null,

            maxDailyDose:
                Number.isFinite(
                    Number(
                        weightRegimen.maximumDailyDoseMg
                    )
                )
                    ? Number(
                        weightRegimen.maximumDailyDoseMg
                    )
                    : null,

            matchedRegimen:
                weightRegimen
        };
    }


    /* =====================================
       FIXED DAILY DOSE
    ===================================== */

    if (
        type ===
        "fixed_daily_dose"
    ) {

        const dailyMin =
            Number(
                dosing.totalDailyDoseMg ??
                dosing.minDailyDoseMg
            );


        const dailyMax =
            Number(
                dosing.maximumDailyDoseMg ??
                dosing.totalDailyDoseMg ??
                dosing.maxDailyDoseMg ??
                dosing.minDailyDoseMg
            );


        if (
            !Number.isFinite(dailyMin) ||
            !Number.isFinite(dailyMax) ||
            dailyMin < 0 ||
            dailyMax < dailyMin
        ) {

            return {
                success: false,

                message:
                    "The fixed daily dose is incomplete or invalid for this medicine."
            };
        }


        const frequency =
            Number(
                dosing.frequencyPerDay ??
                dosing.dosesPerDay ??
                dosing.frequency
            );


        /*
           Do NOT guess how a daily dose should
           be divided. A product must provide a
           valid frequency before DoseCare can
           calculate a per-dose amount.
        */

        if (
            !Number.isFinite(frequency) ||
            frequency <= 0
        ) {

            return {
                success: false,

                message:
                    "The medicine provides a daily dose but does not provide a valid number of doses per day. DoseCare will not guess the division."
            };
        }


        const minMg =
            dailyMin /
            frequency;


        const maxMg =
            dailyMax /
            frequency;


        return {

            success: true,

            type:
                "fixed_daily_dose",

            originalType:
                type,

            minDoseRate:
                null,

            maxDoseRate:
                null,

            minMg,

            maxMg,

            dailyMinMg:
                dailyMin,

            dailyMaxMg:
                dailyMax,

            frequency:
                dosing.frequencyText ||
                dosing.frequency ||
                `Every ${24 / frequency} hours`,

            dosesPerDay:
                frequency,

            intervalHours:
                getFrequencyHours(
                    dosing,
                    frequency
                ),

            unit:
                "mg/dose",

            duration:
                dosing.duration ||
                "",

            maxPerDose:
                null,

            maxDailyDose:
                dailyMax
        };
    }


    /* =====================================
       MG/KG/DOSE
    ===================================== */

    if (
        type ===
        "mg_per_kg_per_dose"
    ) {

        if (
            !Number.isFinite(weight) ||
            weight <= 0
        ) {

            return {
                success: false,

                message:
                    "Weight is required for this dosing regimen."
            };
        }


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
            !Number.isFinite(maxDose) ||
            minDose < 0 ||
            maxDose < minDose
        ) {

            return {
                success: false,

                message:
                    "The selected dosing regimen is incomplete or invalid."
            };
        }


        const frequency =
            getFrequencyNumber(
                dosing
            );


        let minMg =
            weight *
            minDose;


        let maxMg =
            weight *
            maxDose;


        let appliedMaxPerDose =
            null;


        const configuredMaxPerDose =
            Number(
                dosing.maxPerDose
            );


        if (
            Number.isFinite(
                configuredMaxPerDose
            ) &&
            configuredMaxPerDose > 0
        ) {

            appliedMaxPerDose =
                configuredMaxPerDose;

            maxMg =
                Math.min(
                    maxMg,
                    configuredMaxPerDose
                );
        }


        let dailyMinMg =
            minMg *
            frequency;


        let dailyMaxMg =
            maxMg *
            frequency;


        let appliedMaxDailyDose =
            null;


        const configuredMaxDailyDose =
            Number(
                dosing.maxDailyDose
            );


        if (
            Number.isFinite(
                configuredMaxDailyDose
            ) &&
            configuredMaxDailyDose > 0
        ) {

            appliedMaxDailyDose =
                configuredMaxDailyDose;


            dailyMaxMg =
                Math.min(
                    dailyMaxMg,
                    configuredMaxDailyDose
                );


            maxMg =
                Math.min(
                    maxMg,
                    configuredMaxDailyDose /
                    frequency
                );
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

            intervalHours:
                getFrequencyHours(
                    dosing,
                    frequency
                ),

            unit:
                "mg/kg/dose",

            duration:
                dosing.duration ||
                "",

            maxPerDose:
                appliedMaxPerDose,

            maxDailyDose:
                appliedMaxDailyDose
        };
    }


    /* =====================================
       MG/KG/DAY
    ===================================== */

    if (
        type ===
            "mg_per_kg_per_day" ||
        type ===
            "weight_based"
    ) {

        if (
            !Number.isFinite(weight) ||
            weight <= 0
        ) {

            return {
                success: false,

                message:
                    "Weight is required for this dosing regimen."
            };
        }


        const minDailyDose =
            Number(
                dosing.minDose ??
                dosing.dose
            );


        const maxDailyDoseRate =
            Number(
                dosing.maxDose ??
                dosing.dose
            );


        if (
            !Number.isFinite(
                minDailyDose
            ) ||
            !Number.isFinite(
                maxDailyDoseRate
            ) ||
            minDailyDose < 0 ||
            maxDailyDoseRate < minDailyDose
        ) {

            return {
                success: false,

                message:
                    "The selected dosing regimen is incomplete or invalid."
            };
        }


        const frequency =
            getFrequencyNumber(
                dosing
            );


        let dailyMinMg =
            weight *
            minDailyDose;


        let dailyMaxMg =
            weight *
            maxDailyDoseRate;


        let appliedMaxDailyDose =
            null;


        const configuredMaxDailyDose =
            Number(
                dosing.maxDailyDose
            );


        if (
            Number.isFinite(
                configuredMaxDailyDose
            ) &&
            configuredMaxDailyDose > 0
        ) {

            appliedMaxDailyDose =
                configuredMaxDailyDose;


            dailyMaxMg =
                Math.min(
                    dailyMaxMg,
                    configuredMaxDailyDose
                );
        }


        let minMg =
            dailyMinMg /
            frequency;


        let maxMg =
            dailyMaxMg /
            frequency;


        let appliedMaxPerDose =
            null;


        const configuredMaxPerDose =
            Number(
                dosing.maxPerDose
            );


        if (
            Number.isFinite(
                configuredMaxPerDose
            ) &&
            configuredMaxPerDose > 0
        ) {

            appliedMaxPerDose =
                configuredMaxPerDose;

            maxMg =
                Math.min(
                    maxMg,
                    configuredMaxPerDose
                );
        }


        return {

            success: true,

            type,

            minDoseRate:
                minDailyDose,

            maxDoseRate:
                maxDailyDoseRate,

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

            intervalHours:
                getFrequencyHours(
                    dosing,
                    frequency
                ),

            unit:
                "mg/kg/day",

            duration:
                dosing.duration ||
                "",

            maxPerDose:
                appliedMaxPerDose,

            maxDailyDose:
                appliedMaxDailyDose
        };
    }


    /* =====================================
       CONDITION BASED
    ===================================== */

    if (
        type ===
        "condition_based"
    ) {

        if (
            !Number.isFinite(weight) ||
            weight <= 0
        ) {

            return {
                success: false,

                message:
                    "Weight is required for this condition-based dosing regimen."
            };
        }


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
            !Number.isFinite(maxDose) ||
            minDose < 0 ||
            maxDose < minDose
        ) {

            return {
                success: false,

                message:
                    "The selected dosing regimen is incomplete or invalid."
            };
        }


        const frequency =
            getFrequencyNumber(
                dosing
            );


        const dailyMinMg =
            weight *
            minDose;


        const dailyMaxMg =
            weight *
            maxDose;


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

            intervalHours:
                getFrequencyHours(
                    dosing,
                    frequency
                ),

            unit:
                "mg/kg/day",

            duration:
                dosing.duration ||
                "",

            maxPerDose:
                null,

            maxDailyDose:
                Number.isFinite(
                    Number(
                        dosing.maxDailyDose
                    )
                )
                    ? Number(
                        dosing.maxDailyDose
                    )
                    : null
        };
    }


    /* =====================================
       SEVERITY BASED
    ===================================== */

    if (
        type ===
        "severity_based"
    ) {

        if (
            !Number.isFinite(weight) ||
            weight <= 0
        ) {

            return {
                success: false,

                message:
                    "Weight is required for this dosing regimen."
            };
        }


        const minDailyDose =
            Number(
                dosing.minDose
            );


        const maxDailyDoseRate =
            Number(
                dosing.maxDose
            );


        if (
            !Number.isFinite(
                minDailyDose
            ) ||
            !Number.isFinite(
                maxDailyDoseRate
            ) ||
            minDailyDose < 0 ||
            maxDailyDoseRate < minDailyDose
        ) {

            return {
                success: false,

                message:
                    "The selected dosing regimen is incomplete or invalid."
            };
        }


        const frequency =
            getFrequencyNumber(
                dosing
            );


        const dailyMinMg =
            weight *
            minDailyDose;


        const dailyMaxMg =
            weight *
            maxDailyDoseRate;


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
                maxDailyDoseRate,

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

            intervalHours:
                getFrequencyHours(
                    dosing,
                    frequency
                ),

            unit:
                "mg/kg/day",

            duration:
                dosing.duration ||
                "",

            maxPerDose:
                null,

            maxDailyDose:
                Number.isFinite(
                    Number(
                        dosing.maxDailyDose
                    )
                )
                    ? Number(
                        dosing.maxDailyDose
                    )
                    : null
        };
    }


    return {

        success: false,

        message:
            "The selected dosing regimen has an unsupported dosing type."
    };
}


    const type =
        normalizeText(
            dosing.type
        );


    /* =====================================
       MG/KG/DOSE
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
            !Number.isFinite(maxDose) ||
            minDose < 0 ||
            maxDose < minDose
        ) {

            return {

                success: false,

                message:
                    "The selected dosing regimen is incomplete or invalid."
            };
        }


        const frequency =
            getFrequencyNumber(
                dosing
            );


        let minMg =
            weight *
            minDose;


        let maxMg =
            weight *
            maxDose;


        let appliedMaxPerDose = null;


        const configuredMaxPerDose =
            Number(
                dosing.maxPerDose
            );


        if (
            Number.isFinite(
                configuredMaxPerDose
            ) &&
            configuredMaxPerDose > 0
        ) {

            appliedMaxPerDose =
                configuredMaxPerDose;


            maxMg =
                Math.min(
                    maxMg,
                    configuredMaxPerDose
                );
        }


        let dailyMinMg =
            minMg *
            frequency;


        let dailyMaxMg =
            maxMg *
            frequency;


        let appliedMaxDailyDose = null;


        const configuredMaxDailyDose =
            Number(
                dosing.maxDailyDose
            );


        if (
            Number.isFinite(
                configuredMaxDailyDose
            ) &&
            configuredMaxDailyDose > 0
        ) {

            appliedMaxDailyDose =
                configuredMaxDailyDose;


            dailyMaxMg =
                Math.min(
                    dailyMaxMg,
                    configuredMaxDailyDose
                );


            maxMg =
                Math.min(
                    maxMg,
                    configuredMaxDailyDose /
                    frequency
                );
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

            intervalHours:
                getFrequencyHours(
                    dosing,
                    frequency
                ),

            unit:
                "mg/kg/dose",

            duration:
                dosing.duration ||
                "",

            maxPerDose:
                appliedMaxPerDose,

            maxDailyDose:
                appliedMaxDailyDose
        };
    }


    /* =====================================
       MG/KG/DAY
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


        const maxDailyDoseRate =
            Number(
                dosing.maxDose ??
                dosing.dose
            );


        if (
            !Number.isFinite(
                minDailyDose
            ) ||
            !Number.isFinite(
                maxDailyDoseRate
            ) ||
            minDailyDose < 0 ||
            maxDailyDoseRate < minDailyDose
        ) {

            return {

                success: false,

                message:
                    "The selected dosing regimen is incomplete or invalid."
            };
        }


        const frequency =
            getFrequencyNumber(
                dosing
            );


        let dailyMinMg =
            weight *
            minDailyDose;


        let dailyMaxMg =
            weight *
            maxDailyDoseRate;


        let appliedMaxDailyDose = null;


        const configuredMaxDailyDose =
            Number(
                dosing.maxDailyDose
            );


        if (
            Number.isFinite(
                configuredMaxDailyDose
            ) &&
            configuredMaxDailyDose > 0
        ) {

            appliedMaxDailyDose =
                configuredMaxDailyDose;


            dailyMaxMg =
                Math.min(
                    dailyMaxMg,
                    configuredMaxDailyDose
                );
        }


        let minMg =
            dailyMinMg /
            frequency;


        let maxMg =
            dailyMaxMg /
            frequency;


        let appliedMaxPerDose = null;


        const configuredMaxPerDose =
            Number(
                dosing.maxPerDose
            );


        if (
            Number.isFinite(
                configuredMaxPerDose
            ) &&
            configuredMaxPerDose > 0
        ) {

            appliedMaxPerDose =
                configuredMaxPerDose;


            maxMg =
                Math.min(
                    maxMg,
                    configuredMaxPerDose
                );
        }


        return {

            success: true,

            type,

            minDoseRate:
                minDailyDose,

            maxDoseRate:
                maxDailyDoseRate,

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

            intervalHours:
                getFrequencyHours(
                    dosing,
                    frequency
                ),

            unit:
                "mg/kg/day",

            duration:
                dosing.duration ||
                "",

            maxPerDose:
                appliedMaxPerDose,

            maxDailyDose:
                appliedMaxDailyDose
        };
    }


    /* =====================================
       CONDITION BASED
    ===================================== */

    if (
        type ===
        "condition_based"
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
            !Number.isFinite(maxDose) ||
            minDose < 0 ||
            maxDose < minDose
        ) {

            return {

                success: false,

                message:
                    "The selected dosing regimen is incomplete or invalid."
            };
        }


        const frequency =
            getFrequencyNumber(
                dosing
            );


        let dailyMinMg =
            weight *
            minDose;


        let dailyMaxMg =
            weight *
            maxDose;


        let appliedMaxDailyDose = null;


        const configuredMaxDailyDose =
            Number(
                dosing.maxDailyDose
            );


        if (
            Number.isFinite(
                configuredMaxDailyDose
            ) &&
            configuredMaxDailyDose > 0
        ) {

            appliedMaxDailyDose =
                configuredMaxDailyDose;


            dailyMaxMg =
                Math.min(
                    dailyMaxMg,
                    configuredMaxDailyDose
                );
        }


        let minMg =
            dailyMinMg /
            frequency;


        let maxMg =
            dailyMaxMg /
            frequency;


        let appliedMaxPerDose = null;


        const configuredMaxPerDose =
            Number(
                dosing.maxPerDose
            );


        if (
            Number.isFinite(
                configuredMaxPerDose
            ) &&
            configuredMaxPerDose > 0
        ) {

            appliedMaxPerDose =
                configuredMaxPerDose;


            maxMg =
                Math.min(
                    maxMg,
                    configuredMaxPerDose
                );
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

            intervalHours:
                getFrequencyHours(
                    dosing,
                    frequency
                ),

            unit:
                "mg/kg/day",

            duration:
                dosing.duration ||
                "",

            maxPerDose:
                appliedMaxPerDose,

            maxDailyDose:
                appliedMaxDailyDose
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
                dosing.minDose
            );


        const maxDailyDoseRate =
            Number(
                dosing.maxDose
            );


        if (
            !Number.isFinite(
                minDailyDose
            ) ||
            !Number.isFinite(
                maxDailyDoseRate
            ) ||
            minDailyDose < 0 ||
            maxDailyDoseRate < minDailyDose
        ) {

            return {

                success: false,

                message:
                    "The selected dosing regimen is incomplete or invalid."
            };
        }


        const frequency =
            getFrequencyNumber(
                dosing
            );


        let dailyMinMg =
            weight *
            minDailyDose;


        let dailyMaxMg =
            weight *
            maxDailyDoseRate;


        let appliedMaxDailyDose = null;


        const configuredMaxDailyDose =
            Number(
                dosing.maxDailyDose
            );


        if (
            Number.isFinite(
                configuredMaxDailyDose
            ) &&
            configuredMaxDailyDose > 0
        ) {

            appliedMaxDailyDose =
                configuredMaxDailyDose;


            dailyMaxMg =
                Math.min(
                    dailyMaxMg,
                    configuredMaxDailyDose
                );
        }


        let minMg =
            dailyMinMg /
            frequency;


        let maxMg =
            dailyMaxMg /
            frequency;


        let appliedMaxPerDose = null;


        const configuredMaxPerDose =
            Number(
                dosing.maxPerDose
            );


        if (
            Number.isFinite(
                configuredMaxPerDose
            ) &&
            configuredMaxPerDose > 0
        ) {

            appliedMaxPerDose =
                configuredMaxPerDose;


            maxMg =
                Math.min(
                    maxMg,
                    configuredMaxPerDose
                );
        }


        return {

            success: true,

            type,

            minDoseRate:
                minDailyDose,

            maxDoseRate:
                maxDailyDoseRate,

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

            intervalHours:
                getFrequencyHours(
                    dosing,
                    frequency
                ),

            unit:
                "mg/kg/day",

            duration:
                dosing.duration ||
                "",

            maxPerDose:
                appliedMaxPerDose,

            maxDailyDose:
                appliedMaxDailyDose
        };
    }


    return {

        success: false,

        message:
            "The selected dosing regimen has an unsupported dosing type."
    };
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
   RANGE HELPERS
========================================= */

function isSingleValue(min, max) {

    return (
        Number.isFinite(min) &&
        Number.isFinite(max) &&
        Math.abs(
            max - min
        ) < 0.001
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

        return (
            `${formatNumber(min)}${unit}`
        );
    }


    return (
        `${formatNumber(min)}–${formatNumber(max)}${unit}`
    );
}


/* =========================================
   INFORMATION ROW
========================================= */

function buildInformationRow(
    label,
    value,
    allowHtml = false
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {
        return "";
    }


    return `

        <div class="dose-info-row">

            <span>
                ${escapeHtml(label)}
            </span>

            <strong>
                ${
                    allowHtml
                        ? value
                        : escapeHtml(
                            String(value)
                        )
                }
            </strong>

        </div>
    `;
}


/* =========================================
   MEDICINE INFORMATION SECTION
========================================= */

function buildMedicineInformationHTML() {

    if (!selectedMedicine) {
        return "";
    }


    const activeIngredient =
        getActiveIngredient(
            selectedMedicine
        );


    const drugClass =
        getMedicineDrugClass(
            selectedMedicine
        );


    const mechanism =
        getMechanismOfAction(
            selectedMedicine
        );


    const therapeuticUses =
        getTherapeuticUses(
            selectedMedicine
        );


    const contraindications =
        getContraindications(
            selectedMedicine
        );


    const adverseEffects =
        getCommonAdverseEffects(
            selectedMedicine
        );


    const monitoring =
        getMonitoringInformation(
            selectedMedicine
        );


    const storage =
        getStorageInformation(
            selectedMedicine
        );


    const notes =
        getMedicineNotes(
            selectedMedicine
        );


    const warnings =
        getMedicineWarnings(
            selectedMedicine
        );


    let html = "";


    if (activeIngredient) {

        html += `

            <div class="medicine-detail-block">

                <span class="medicine-detail-label">
                    Active ingredient
                </span>

                <p>
                    ${escapeHtml(
                        activeIngredient
                    )}
                </p>

            </div>
        `;
    }


    if (drugClass) {

        html += `

            <div class="medicine-detail-block">

                <span class="medicine-detail-label">
                    Drug class
                </span>

                <p>
                    ${escapeHtml(
                        drugClass
                    )}
                </p>

            </div>
        `;
    }


    if (mechanism) {

        html += `

            <div class="medicine-detail-block">

                <span class="medicine-detail-label">
                    Mechanism of action
                </span>

                <p>
                    ${escapeHtml(
                        mechanism
                    )}
                </p>

            </div>
        `;
    }


    if (therapeuticUses) {

        html += `

            <div class="medicine-detail-block">

                <span class="medicine-detail-label">
                    Therapeutic uses
                </span>

                <p>
                    ${escapeHtml(
                        therapeuticUses
                    )}
                </p>

            </div>
        `;
    }


    if (contraindications) {

        html += `

            <div class="medicine-detail-block">

                <span class="medicine-detail-label">
                    Contraindications
                </span>

                <p>
                    ${escapeHtml(
                        contraindications
                    )}
                </p>

            </div>
        `;
    }


    if (adverseEffects) {

        html += `

            <div class="medicine-detail-block">

                <span class="medicine-detail-label">
                    Common adverse effects
                </span>

                <p>
                    ${escapeHtml(
                        adverseEffects
                    )}
                </p>

            </div>
        `;
    }


    if (monitoring) {

        html += `

            <div class="medicine-detail-block">

                <span class="medicine-detail-label">
                    Monitoring
                </span>

                <p>
                    ${escapeHtml(
                        monitoring
                    )}
                </p>

            </div>
        `;
    }


    if (storage) {

        html += `

            <div class="medicine-detail-block">

                <span class="medicine-detail-label">
                    Storage
                </span>

                <p>
                    ${escapeHtml(
                        storage
                    )}
                </p>

            </div>
        `;
    }


    if (notes) {

        html += `

            <div class="medicine-detail-block">

                <span class="medicine-detail-label">
                    Important information
                </span>

                <p>
                    ${escapeHtml(
                        notes
                    )}
                </p>

            </div>
        `;
    }


    if (warnings) {

        html += `

            <div class="medicine-detail-block warning-detail-block">

                <span class="medicine-detail-label">
                    Warnings
                </span>

                <p>
                    ${escapeHtml(
                        warnings
                    )}
                </p>

            </div>
        `;
    }


    if (!html) {

        return `
            <div class="medicine-detail-empty">
                Additional medicine information is not
                available in the current medicine record.
            </div>
        `;
    }


    return html;
}


/* =========================================
   RESULT CARD
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
            ? formatAgeFromMonths(ageMonths)
            : "—";


    const weight =
        weightInput
            ? parseFloat(
                weightInput.value
            )
            : NaN;


    const weightText =
        Number.isFinite(weight)
            ? `${formatNumber(weight)} kg`
            : "—";


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
       STEP-BY-STEP CALCULATION
    ===================================== */

    let calculationHTML = "";


  const isPerDose =
    result.type ===
    "mg_per_kg_per_dose";

const isPerDay =
    result.type ===
        "mg_per_kg_per_day" ||
    result.type ===
        "weight_based" ||
    result.type ===
        "condition_based" ||
    result.type ===
        "severity_based";

const isFixedDose =
    result.type ===
        "fixed_dose" ||
    result.type ===
        "fixed_daily_dose";


    const rateIsSingle =
        isSingleValue(
            result.minDoseRate,
            result.maxDoseRate
        );

/* -------------------------------------
   FIXED DOSE
------------------------------------- */

if (isFixedDose) {

    calculationHTML += `

        <div class="calculation-step">

            <span class="calculation-step-number">
                01
            </span>

            <div class="calculation-step-content">

                <strong>
                    Select the age/weight-specific dose
                </strong>

                <p>
                    DoseCare matched the patient's
                    ${
                        result.originalType ===
                        "fixed_age_dose"
                            ? "age"
                            : result.originalType ===
                              "weight_based_fixed_dose"
                                ? "weight"
                                : "configured regimen"
                    }
                    to the medicine's approved dosing rule.
                </p>

                <div class="calculation-equation">

                    <strong>
                        ${formatNumber(result.minMg)}
                        ${
                            isSingleValue(
                                result.minMg,
                                result.maxMg
                            )
                                ? ""
                                : `–${formatNumber(result.maxMg)}`
                        }
                        mg/dose
                    </strong>

                </div>

            </div>

        </div>
    `;

}


/* -------------------------------------
   MG/KG/DOSE
------------------------------------- */

else if (isPerDose) {
    /* -------------------------------------
       MG/KG/DOSE
    ------------------------------------- */

    if (isPerDose) {

        calculationHTML += `

            <div class="calculation-step">

                <span class="calculation-step-number">
                    01
                </span>

                <div class="calculation-step-content">

                    <strong>
                        Calculate dose in mg
                    </strong>

                    <p>
                        ${formatNumber(result.minDoseRate)}
                        mg/kg/dose ×
                        ${formatNumber(weight)}
                        kg
                    </p>

                    <div class="calculation-equation">

                        ${formatNumber(result.minDoseRate)}
                        ×
                        ${formatNumber(weight)}
                        =

                        <strong>
                            ${formatNumber(minMg)} mg/dose
                        </strong>

                    </div>

                </div>

            </div>
        `;


        if (!rateIsSingle) {

            calculationHTML += `

                <div class="calculation-step">

                    <span class="calculation-step-number">
                        02
                    </span>

                    <div class="calculation-step-content">

                        <strong>
                            Calculate maximum dose
                        </strong>

                        <p>
                            ${formatNumber(result.maxDoseRate)}
                            mg/kg/dose ×
                            ${formatNumber(weight)}
                            kg
                        </p>

                        <div class="calculation-equation">

                            ${formatNumber(result.maxDoseRate)}
                            ×
                            ${formatNumber(weight)}
                            =

                            <strong>
                                ${formatNumber(maxMg)} mg/dose
                            </strong>

                        </div>

                    </div>

                </div>
            `;
        }
    }


    /* -------------------------------------
       MG/KG/DAY
    ------------------------------------- */

    else {

        calculationHTML += `

            <div class="calculation-step">

                <span class="calculation-step-number">
                    01
                </span>

                <div class="calculation-step-content">

                    <strong>
                        Calculate total daily dose
                    </strong>

                    <p>
                        ${formatNumber(result.minDoseRate)}
                        mg/kg/day ×
                        ${formatNumber(weight)}
                        kg
                    </p>

                    <div class="calculation-equation">

                        ${formatNumber(result.minDoseRate)}
                        ×
                        ${formatNumber(weight)}
                        =

                        <strong>
                            ${formatNumber(result.dailyMinMg)} mg/day
                        </strong>

                    </div>

                </div>

            </div>


            <div class="calculation-step">

                <span class="calculation-step-number">
                    02
                </span>

                <div class="calculation-step-content">

                    <strong>
                        Divide by frequency
                    </strong>

                    <p>
                        ${formatNumber(result.dailyMinMg)}
                        mg/day ÷
                        ${formatNumber(result.dosesPerDay, 0)}
                        doses/day
                    </p>

                    <div class="calculation-equation">

                        ${formatNumber(result.dailyMinMg)}
                        ÷
                        ${formatNumber(result.dosesPerDay, 0)}
                        =

                        <strong>
                            ${formatNumber(minMg)} mg/dose
                        </strong>

                    </div>

                </div>

            </div>
        `;


        if (!rateIsSingle) {

            calculationHTML += `

                <div class="calculation-step">

                    <span class="calculation-step-number">
                        03
                    </span>

                    <div class="calculation-step-content">

                        <strong>
                            Calculate maximum daily dose
                        </strong>

                        <p>
                            ${formatNumber(result.maxDoseRate)}
                            mg/kg/day ×
                            ${formatNumber(weight)}
                            kg
                        </p>

                        <div class="calculation-equation">

                            ${formatNumber(result.maxDoseRate)}
                            ×
                            ${formatNumber(weight)}
                            =

                            <strong>
                                ${formatNumber(result.dailyMaxMg)}
                                mg/day
                            </strong>

                        </div>

                    </div>

                </div>
            `;
        }
    }


    /* -------------------------------------
       MG → ML
    ------------------------------------- */

    const volumeStepNumber =
        isPerDose
            ? (rateIsSingle ? "02" : "03")
            : (rateIsSingle ? "03" : "04");


    calculationHTML += `

        <div class="calculation-step">

            <span class="calculation-step-number">
                ${volumeStepNumber}
            </span>

            <div class="calculation-step-content">

                <strong>
                    Convert mg to mL
                </strong>

                <p>
                    Dose (mg) × volume (mL)
                    ÷ concentration (mg)
                </p>

                <div class="calculation-equation calculation-fraction">

                    <span>
                        ${formatNumber(minMg)}
                        mg ×
                        ${formatNumber(concentrationMl)}
                        mL
                    </span>

                    <span class="fraction-line"></span>

                    <span>
                        ${formatNumber(concentrationMg)}
                        mg
                    </span>

                    <span>
                        =
                        <strong>
                            ${formatNumber(minMl)}
                            mL/dose
                        </strong>
                    </span>

                </div>

            </div>

        </div>
    `;


    if (
        !isSingleValue(
            minMg,
            maxMg
        )
    ) {

        calculationHTML += `

            <div class="calculation-step">

                <span class="calculation-step-number">
                    ${isPerDose ? "04" : "05"}
                </span>

                <div class="calculation-step-content">

                    <strong>
                        Calculate maximum volume
                    </strong>

                    <p>
                        ${formatNumber(maxMg)}
                        mg ×
                        ${formatNumber(concentrationMl)}
                        mL ÷
                        ${formatNumber(concentrationMg)}
                        mg
                    </p>

                    <div class="calculation-equation">

                        ${formatNumber(maxMg)}
                        ×
                        ${formatNumber(concentrationMl)}
                        ÷
                        ${formatNumber(concentrationMg)}
                        =

                        <strong>
                            ${formatNumber(maxMl)}
                            mL/dose
                        </strong>

                    </div>

                </div>

            </div>
        `;
    }


    /* =====================================
       DOSE INFORMATION
    ===================================== */

    let informationHTML = "";


    informationHTML +=
        buildInformationRow(
            "Frequency",
            result.frequency || "—"
        );


    if (
        Number.isFinite(
            result.intervalHours
        )
    ) {

        informationHTML +=
            buildInformationRow(
                "Interval between doses",
                `Every ${formatFrequencyHours(
                    result.intervalHours
                )}`
            );
    }


    if (
        Number.isFinite(result.dailyMinMg) &&
        Number.isFinite(result.dailyMaxMg)
    ) {

        informationHTML +=
            buildInformationRow(
                "Total daily dose",
                formatRange(
                    result.dailyMinMg,
                    result.dailyMaxMg,
                    " mg/day"
                )
            );
    }


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


        informationHTML +=
            buildInformationRow(
                "Maximum per dose",
                `
                    ${formatNumber(
                        result.maxPerDose
                    )}
                    mg
                    ${
                        Number.isFinite(
                            maxPerDoseMl
                        )
                            ? `
                                /
                                ${formatNumber(
                                    maxPerDoseMl
                                )}
                                mL
                            `
                            : ""
                    }
                `,
                true
            );
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


        informationHTML +=
            buildInformationRow(
                "Maximum daily dose",
                `
                    ${formatNumber(
                        result.maxDailyDose
                    )}
                    mg/day
                    ${
                        Number.isFinite(
                            maxDailyMl
                        )
                            ? `
                                /
                                ${formatNumber(
                                    maxDailyMl
                                )}
                                mL/day
                            `
                            : ""
                    }
                `,
                true
            );
    }


    if (result.duration) {

        informationHTML +=
            buildInformationRow(
                "Duration",
                result.duration
            );
    }


    if (
        Number.isFinite(
            concentrationMg
        ) &&
        Number.isFinite(
            concentrationMl
        )
    ) {

        informationHTML +=
            buildInformationRow(
                "Concentration",
                `${formatNumber(
                    concentrationMg
                )} mg / ${formatNumber(
                    concentrationMl
                )} mL`
            );
    }


    /* =====================================
       EXTENDED MEDICINE INFORMATION
    ===================================== */

    const medicineInformationHTML =
        buildMedicineInformationHTML();


    /* =====================================
       IMPORTANT INFORMATION
    ===================================== */

    let importantHTML = "";


    const notes =
        getMedicineNotes(
            selectedMedicine
        );


    const warnings =
        getMedicineWarnings(
            selectedMedicine
        );


    if (notes) {

        importantHTML += `

            <div class="result-note">

                <span>
                    i
                </span>

                <p>

                    <strong>
                        Important information
                    </strong>

                    ${escapeHtml(
                        notes
                    )}

                </p>

            </div>
        `;
    }


    if (warnings) {

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
                        warnings
                    )}

                </p>

            </div>
        `;
    }


    /* =====================================
       THREE RESULT CARDS
    ===================================== */

    resultCard.innerHTML = `

        <!-- =================================
             CARD 1 — FINAL RESULT
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
                        ${escapeHtml(ageText)}
                    </strong>

                </div>


                <div>

                    <span>
                        Weight
                    </span>

                    <strong>
                        ${escapeHtml(weightText)}
                    </strong>

                </div>

            </div>


            <div class="final-dose-values">

                <div class="final-dose-item">

                    <span>
                        Final dose
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
                        Final volume
                    </span>

                    <strong>
                        ${finalMl}
                    </strong>

                    <small>
                        per dose
                    </small>

                </div>

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


            <div class="calculation-frequency">

                <span>
                    Administration
                </span>

                <strong>
                    ${escapeHtml(
                        result.frequency || "—"
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
                        Medicine & Dose Details
                    </h3>

                </div>

                <div class="dose-card-icon">
                    i
                </div>

            </div>


            <div class="dose-information-list">

                ${informationHTML}

            </div>


            <div class="medicine-information-section">

                <div class="medicine-information-title">

                    <span>
                        MEDICINE INFORMATION
                    </span>

                    <h4>
                        About this medicine
                    </h4>

                </div>


                <div class="medicine-information-list">

                    ${medicineInformationHTML}

                </div>

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
                judgment, approved pediatric dosing
                guidance, or verification by a pharmacist
                or physician.
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

        intervalHours:
            data.intervalHours,

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


    try {

        localStorage.setItem(
            HISTORY_STORAGE_KEY,
            JSON.stringify(
                history
            )
        );

    } catch (error) {

        console.error(
            "Unable to save history:",
            error
        );
    }
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


    /* =====================================
       1. MEDICINE
    ===================================== */

    if (!selectedMedicine) {

        showValidation(
            "Please select a medicine before calculating the dose."
        );

        return;
    }


    if (
        !isLiquidMedicine(
            selectedMedicine
        )
    ) {

        showValidation(
            "DoseCare supports oral liquid medicines only."
        );

        return;
    }


    /* =====================================
       2. REGIMEN
    ===================================== */

    const regimens =
        getMedicineRegimens(
            selectedMedicine
        );


    if (
        regimens.length > 1 &&
        !selectedRegimen
    ) {

        showValidation(
            "Please select the dose / regimen you want to calculate."
        );

        return;
    }


    if (
        regimens.length === 1 &&
        !selectedRegimen
    ) {

        selectedRegimen =
            regimens[0];
    }


    if (!selectedRegimen) {

        showValidation(
            "A pediatric dosing regimen has not been configured for this medicine."
        );

        return;
    }


    /* =====================================
       3. AGE
    ===================================== */

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

        showValidation(
            "Please enter the patient's age."
        );

        return;
    }


    /* =====================================
       4. WEIGHT
    ===================================== */

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

        showValidation(
            "Please enter the patient's weight."
        );

        return;
    }


    /* =====================================
       5. AGE VALIDATION
    ===================================== */

    const ageValidation =
        validateMedicineAge(
            selectedMedicine
        );


    if (
        !ageValidation.valid
    ) {

        showValidation(
            ageValidation.message
        );

        return;
    }


    /* =====================================
       6. CONCENTRATION
    ===================================== */

    const concentration =
        getSelectedConcentration();


    const concentrationMg =
        concentration.mg;


    const concentrationMl =
        concentration.ml;


    if (
        !Number.isFinite(
            concentrationMg
        ) ||
        !Number.isFinite(
            concentrationMl
        ) ||
        concentrationMg <= 0 ||
        concentrationMl <= 0
    ) {

        showValidation(
            "Please select the available medicine concentration."
        );

        return;
    }


    /* =====================================
       7. CALCULATE
    ===================================== */

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


    /* =====================================
       8. DISPLAY
    ===================================== */

    displayDoseResult(
        result,
        concentrationMg,
        concentrationMl
    );


    /* =====================================
       9. HISTORY
    ===================================== */

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

        intervalHours:
            result.intervalHours ||
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

        option.value = "";

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

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeCalculator
    );

} else {

    initializeCalculator();
}
