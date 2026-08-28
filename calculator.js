/* =========================================
   DoseCare
   Pediatric Oral-Liquid Dose Calculator

   FULL REBUILT VERSION
   PART 1 / 5

   Scope:
   - Pediatric oral liquids only
   - Syrups
   - Oral solutions
   - Oral suspensions

   Supported dosing:
   - mg/kg/dose
   - mg/kg/day
   - condition-based
   - severity-based
   - fixed-dose (when explicitly supported)
   - weight-band (when explicitly supported)

   Features:
   - Medicine selection
   - Medicine search
   - Condition selection
   - Age in months / years
   - Weight in kg
   - Concentration selection
   - mg -> mL conversion
   - Frequency handling
   - Step-by-step calculation
   - Patient information
   - Medicine information
   - Warnings / precautions
   - History using localStorage
   - 3 result cards

   IMPORTANT:
   This file works with the central
   DoseCare medicine database.

   Medicines are NOT defined here.
========================================= */


/* =========================================
   STORAGE
========================================= */

const HISTORY_STORAGE_KEY =
    "dosecareHistory";


/* =========================================
   DOM ELEMENTS
========================================= */

const medicineSelect =
    document.getElementById(
        "medicine-select"
    );

const medicineSearch =
    document.getElementById(
        "medicine"
    );

const medicineResults =
    document.getElementById(
        "medicine-results"
    );

const clearMedicine =
    document.getElementById(
        "clear-medicine"
    );


const ageInput =
    document.getElementById(
        "age"
    );

const ageUnit =
    document.getElementById(
        "age-unit"
    );


const weightInput =
    document.getElementById(
        "weight"
    );


const regimenSelect =
    document.getElementById(
        "regimen-select"
    );

const selectedRegimenInfo =
    document.getElementById(
        "selected-regimen"
    );


const concentrationSelect =
    document.getElementById(
        "concentration-select"
    );

const concentrationValue =
    document.getElementById(
        "concentration-value"
    );

const concentrationVolume =
    document.getElementById(
        "concentration-volume"
    );


const calculateButton =
    document.getElementById(
        "calculate-button"
    );


const validationMessage =
    document.getElementById(
        "validation-message"
    );


const resultCard =
    document.getElementById(
        "result-card"
    );

const doseResult =
    document.getElementById(
        "dose-result"
    );

const doseUnit =
    document.getElementById(
        "dose-unit"
    );

const resultDetails =
    document.getElementById(
        "result-details"
    );


const backButton =
    document.getElementById(
        "back-button"
    );


const selectedMedicineInfo =
    document.getElementById(
        "selected-medicine-info"
    );

const selectedConcentration =
    document.getElementById(
        "selected-concentration"
    );


const minimumDose =
    document.getElementById(
        "minimum-dose"
    );

const maximumDose =
    document.getElementById(
        "maximum-dose"
    );

const doseFrequency =
    document.getElementById(
        "dose-frequency"
    );

const resultPerDose =
    document.getElementById(
        "result-per-dose"
    );


const resultImportant =
    document.getElementById(
        "result-important"
    );


const conditionGroup =
    document.getElementById(
        "condition-group"
    );

const conditionSelect =
    document.getElementById(
        "condition-select"
    );

const selectedConditionInfo =
    document.getElementById(
        "selected-condition-info"
    );


/* =========================================
   CURRENT STATE
========================================= */

let selectedMedicine = null;

let selectedRegimen = null;

let selectedConditionRegimen = null;


/* =========================================
   BASIC HELPERS
========================================= */

function getMedicineName(
    medicine
) {

    if (!medicine) {
        return "Medicine";
    }

    return (
        medicine.genericName ||
        medicine.name ||
        "Medicine"
    );

}


function formatNumber(
    value,
    decimals = 2
) {

    const number =
        Number(value);

    if (
        !Number.isFinite(
            number
        )
    ) {
        return "—";
    }

    const rounded =
        Number(
            number.toFixed(
                decimals
            )
        );

    return rounded.toLocaleString(
        "en-US"
    );

}


function normalizeText(
    value
) {

    return String(
        value ?? ""
    )
        .trim()
        .toLowerCase();

}


function escapeHtml(
    value
) {

    return String(
        value ?? ""
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


function cloneObject(
    object
) {

    if (
        !object ||
        typeof object !==
        "object"
    ) {
        return object;
    }

    try {

        return JSON.parse(
            JSON.stringify(
                object
            )
        );

    } catch {

        return {
            ...object
        };

    }

}


/* =========================================
   GENERIC MEDICINE FIELD HELPER
========================================= */

function getMedicineField(
    medicine,
    fields,
    fallback = ""
) {

    if (!medicine) {
        return fallback;
    }

    for (
        const field
        of fields
    ) {

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


/* =========================================
   MEDICINE INFORMATION HELPERS
========================================= */

function getMedicineDrugClass(
    medicine
) {

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

    if (
        Array.isArray(
            value
        )
    ) {

        return value
            .filter(Boolean)
            .join(" · ");

    }

    return String(
        value || ""
    );

}


function getActiveIngredient(
    medicine
) {

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

    if (
        Array.isArray(
            value
        )
    ) {

        return value
            .filter(Boolean)
            .join(", ");

    }

    return String(
        value || ""
    );

}


function getMechanismOfAction(
    medicine
) {

    return getMedicineField(
        medicine,
        [
            "mechanismOfAction",
            "mechanism",
            "mechanism_of_action",
            "pharmacologicalMechanism",
            "howItWorks",
            "moa"
        ],
        ""
    );

}


function getTherapeuticUses(
    medicine
) {

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

    if (
        Array.isArray(
            value
        )
    ) {

        return value
            .filter(Boolean)
            .join(", ");

    }

    return String(
        value || ""
    );

}


function getMedicineNotes(
    medicine
) {

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

    if (
        Array.isArray(
            value
        )
    ) {

        return value
            .filter(Boolean)
            .join(" ");

    }

    return String(
        value || ""
    );

}


function getMedicineWarnings(
    medicine
) {

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

    if (
        Array.isArray(
            value
        )
    ) {

        return value
            .filter(Boolean)
            .join(" ");

    }

    return String(
        value || ""
    );

}


/* =========================================
   ORAL LIQUID VALIDATION
========================================= */

/*
   DoseCare ONLY accepts:

   - Syrup
   - Oral Solution
   - Oral Suspension
   - Explicit Oral Liquid

   It rejects:

   - Tablets
   - Capsules
   - Chewables
   - Suppositories
   - Injections
   - IV
   - IM
   - Creams
   - Ointments
   - Gels
   - Patches
   - Powders
   - Granules
   - Lozenges
*/

function isLiquidMedicine(
    medicine
) {

    if (!medicine) {
        return false;
    }


    const possibleForms = [

        medicine.dosageForm,

        medicine.dosageForms,

        medicine.dosage_form,

        medicine.form,

        medicine.routeForm,

        medicine.preparation,

        medicine.pharmaceuticalForm

    ];


    const forms =
        possibleForms
            .flatMap(
                value => {

                    if (
                        Array.isArray(
                            value
                        )
                    ) {

                        return value;

                    }

                    return value
                        ? [value]
                        : [];

                }
            )
            .filter(Boolean)
            .map(
                normalizeText
            );


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


    if (
        forms.some(
            form =>
                forbiddenForms.includes(
                    form
                )
        )
    ) {

        return false;

    }


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
            acceptedLiquidForms.some(
                acceptedForm =>
                    form === acceptedForm ||
                    form.includes(acceptedForm)
            )
    );

    if (
        hasAcceptedLiquidForm
    ) {

        return true;

    }


    /*
       If a dosage form was explicitly
       supplied and it was not accepted,
       reject the medicine.
    */

    if (
        forms.length > 0
    ) {

        return false;

    }


    /*
       Fallback:

       Only accept a medicine when:
       - route is oral
       - AND a valid concentration exists
    */

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
        getAvailableConcentrations(
            medicine
        ).length > 0
    ) {

        return true;

    }


    return false;

}


/* =========================================
   CONCENTRATION PARSER
========================================= */

function parseConcentrationString(
    value
) {

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
            .replace(
                /\s+/g,
                ""
            );


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
        Number(
            match[1]
        );

    const ml =
        Number(
            match[2]
        );


    if (
        !Number.isFinite(
            mg
        ) ||
        !Number.isFinite(
            ml
        ) ||
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
   GET AVAILABLE CONCENTRATIONS
========================================= */

function getAvailableConcentrations(
    medicine
) {

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

    }

    else if (
        Array.isArray(
            medicine.availableConcentrations
        )
    ) {

        raw =
            medicine.availableConcentrations;

    }

    else if (
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

    }

    else if (
        Array.isArray(
            medicine.commonPediatricConcentrations
        )
    ) {

        raw =
            medicine.commonPediatricConcentrations;

    }

    else if (
        medicine.concentration
    ) {

        raw = [
            medicine.concentration
        ];

    }

    else if (
        medicine.concentrationMg !==
            undefined &&
        medicine.concentrationMl !==
            undefined
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


    raw.forEach(
        item => {

            let result = null;


            if (
                typeof item ===
                "string"
            ) {

                result =
                    parseConcentrationString(
                        item
                    );

            }

            else if (
                item &&
                typeof item ===
                "object"
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
                    Number.isFinite(
                        mg
                    ) &&
                    Number.isFinite(
                        ml
                    ) &&
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
                        existing.mg ===
                            result.mg &&
                        existing.ml ===
                            result.ml
                );


            if (
                !duplicate
            ) {

                normalized.push(
                    result
                );

            }

        }
    );


    return normalized;

}


/* =========================================
   FORMAT CONCENTRATION
========================================= */

function formatConcentration(
    concentration
) {

    if (!concentration) {
        return "";
    }

    return (
        `${formatNumber(
            concentration.mg
        )} mg/${formatNumber(
            concentration.ml
        )} mL`
    );

}


/* =========================================
   CONCENTRATION UI
========================================= */

function populateConcentrations(
    medicine
) {

    if (
        !concentrationSelect
    ) {
        return;
    }


    concentrationSelect.innerHTML =
        "";


    const defaultOption =
        document.createElement(
            "option"
        );

    defaultOption.value =
        "";

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


    if (
        concentrationValue
    ) {

        concentrationValue.value =
            "";

    }


    if (
        concentrationVolume
    ) {

        concentrationVolume.value =
            "";

    }


    updateSelectedConcentration();

}


/* =========================================
   UPDATE SELECTED CONCENTRATION
========================================= */

function updateSelectedConcentration() {

    if (
        !concentrationSelect
    ) {
        return;
    }


    const value =
        concentrationSelect.value;


    if (!value) {

        if (
            selectedConcentration
        ) {

            selectedConcentration.innerHTML =
                "";

        }

        return;

    }


    try {

        const concentration =
            JSON.parse(
                value
            );


        if (
            concentrationValue
        ) {

            concentrationValue.value =
                concentration.mg;

        }


        if (
            concentrationVolume
        ) {

            concentrationVolume.value =
                concentration.ml;

        }


        if (
            selectedConcentration
        ) {

            selectedConcentration.innerHTML = `

                <strong>
                    Selected concentration:
                </strong>

                ${escapeHtml(
                    formatConcentration(
                        concentration
                    )
                )}

            `;

        }

    }

    catch (error) {

        console.error(
            "DoseCare concentration error:",
            error
        );

    }

}


/* =========================================
   MEDICINE DATABASE ACCESS
========================================= */

/*
   IMPORTANT FIX:

   The central database is created as:

       const medicines = [];

   in medicine.js.

   This function safely reads it without
   crashing when calculator.js loads before
   medicine.js.
*/

function getMedicineDatabase() {

    try {

        if (
            Array.isArray(
                window.medicines
            )
        ) {

            return window.medicines;

        }

    } catch {
        /* ignore */
    }


    try {

        if (
            typeof medicines !==
            "undefined" &&
            Array.isArray(
                medicines
            )
        ) {

            return medicines;

        }

    } catch {
        /* ignore */
    }


    return [];

}


/* =========================================
   GET AVAILABLE MEDICINES
========================================= */

function getAvailableMedicines() {

    const medicineData =
        getMedicineDatabase();


    if (
        !Array.isArray(
            medicineData
        )
    ) {

        return [];

    }


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

function getMedicineByIdSafe(
    id
) {

    if (!id) {
        return null;
    }


    try {

        if (
            typeof getMedicineById ===
            "function"
        ) {

            const medicine =
                getMedicineById(
                    id
                );


            if (medicine) {

                return medicine;

            }

        }

    } catch {
        /* fallback below */
    }


    return getAvailableMedicines()
        .find(
            medicine =>
                String(
                    medicine.id
                ) ===
                String(id)
        ) || null;

}


/* =========================================
   POPULATE MEDICINE SELECT
========================================= */

function populateMedicineSelect() {

    if (
        !medicineSelect
    ) {

        return;

    }


    medicineSelect.innerHTML =
        "";


    const defaultOption =
        document.createElement(
            "option"
        );


    defaultOption.value =
        "";

    defaultOption.textContent =
        "Select a medicine";


    medicineSelect.appendChild(
        defaultOption
    );


    const availableMedicines =
        getAvailableMedicines();


    availableMedicines.forEach(
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
   NORMALIZE REGIMEN
========================================= */

function normalizeRegimen(
    regimen,
    fallbackLabel =
        "Recommended dose"
) {

    if (
        !regimen ||
        typeof regimen !==
        "object"
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


/* =========================================
   GET MEDICINE REGIMENS
========================================= */

function getMedicineRegimens(
    medicine
) {

    if (
        !medicine ||
        !medicine.dosing
    ) {

        return [];

    }


    const dosing =
        medicine.dosing;


    const regimens = [];


    /* -----------------------------------------
       1. dosing.regimens[]
    ----------------------------------------- */

    if (
        Array.isArray(
            dosing.regimens
        )
    ) {

        dosing.regimens.forEach(
            (
                item,
                index
            ) => {

                const regimen =
                    normalizeRegimen(
                        item,
                        `Dose option ${index + 1}`
                    );


                if (regimen) {

                    regimens.push(
                        regimen
                    );

                }

            }
        );

    }


    /* -----------------------------------------
       2. dosing.options[]
    ----------------------------------------- */

    if (
        regimens.length === 0 &&
        Array.isArray(
            dosing.options
        )
    ) {

        dosing.options.forEach(
            (
                item,
                index
            ) => {

                const regimen =
                    normalizeRegimen(
                        item,
                        `Dose option ${index + 1}`
                    );


                if (regimen) {

                    regimens.push(
                        regimen
                    );

                }

            }
        );

    }


    /* -----------------------------------------
       3. dosing.conditionBased[]
    ----------------------------------------- */

    if (
        regimens.length === 0 &&
        Array.isArray(
            dosing.conditionBased
        )
    ) {

        dosing.conditionBased.forEach(
            (
                item,
                index
            ) => {

                const regimen =
                    normalizeRegimen(
                        item,
                        `Dose option ${index + 1}`
                    );


                if (regimen) {

                    regimens.push(
                        regimen
                    );

                }

            }
        );

    }


    /* -----------------------------------------
       4. dosing.indications[]
    ----------------------------------------- */

    if (
        regimens.length === 0 &&
        Array.isArray(
            dosing.indications
        )
    ) {

        dosing.indications.forEach(
            (
                item,
                index
            ) => {

                const regimen =
                    normalizeRegimen(
                        item,
                        `Dose option ${index + 1}`
                    );


                if (regimen) {

                    regimens.push(
                        regimen
                    );

                }

            }
        );

    }


    /* -----------------------------------------
       5. dosing.conditions{}
    ----------------------------------------- */

    if (
        regimens.length === 0 &&
        dosing.conditions &&
        typeof dosing.conditions ===
            "object" &&
        !Array.isArray(
            dosing.conditions
        )
    ) {

        Object.entries(
            dosing.conditions
        ).forEach(
            (
                [
                    condition,
                    regimen
                ]
            ) => {

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


                regimens.push(
                    normalized
                );

            }
        );

    }


    /* -----------------------------------------
       6. dosing.regimen
    ----------------------------------------- */

    if (
        regimens.length === 0 &&
        dosing.regimen &&
        typeof dosing.regimen ===
            "object"
    ) {

        const regimen =
            normalizeRegimen(
                dosing.regimen
            );


        if (regimen) {

            regimens.push(
                regimen
            );

        }

    }


    /* -----------------------------------------
       7. dosing.generalRegimen
    ----------------------------------------- */

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

            regimens.push(
                regimen
            );

        }

    }


    /* -----------------------------------------
       8. Direct dosing object

       Handles:

       {
           type:
               "mg_per_kg_per_dose",

           minDose:
               10,

           maxDose:
               15
       }
    ----------------------------------------- */

    if (
        regimens.length === 0 &&
        (
            dosing.type ||
            dosing.minDose !==
                undefined ||
            dosing.maxDose !==
                undefined ||
            dosing.dose !==
                undefined
        )
    ) {

        const regimen =
            normalizeRegimen(
                dosing
            );


        if (regimen) {

            regimens.push(
                regimen
            );

        }

    }


    return regimens;

}


/* =========================================
   CONDITION REGIMENS
========================================= */

/*
   IMPORTANT DESIGN RULE:

   medicine.conditions[]
       = informational / searchable conditions

   dosing.conditionBased[]
   dosing.conditions{}
   dosing.indications[]
   indicationSpecific
       = actual dosing conditions

   Therefore we NEVER use
   medicine.conditions[] alone to invent
   a dosing regimen.
*/

function getConditionRegimens(
    medicine
) {

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
       1. dosing.conditionBased[]
    ----------------------------------------- */

    if (
        Array.isArray(
            dosing.conditionBased
        )
    ) {

        dosing.conditionBased.forEach(
            (
                item,
                index
            ) => {

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
                        String(
                            condition
                        );


                    conditions.push(
                        regimen
                    );

                }

            }
        );

    }


    /* -----------------------------------------
       2. dosing.conditions{}
    ----------------------------------------- */

    if (
        conditions.length === 0 &&
        dosing.conditions &&
        typeof dosing.conditions ===
            "object" &&
        !Array.isArray(
            dosing.conditions
        )
    ) {

        Object.entries(
            dosing.conditions
        ).forEach(
            (
                [
                    condition,
                    regimen
                ]
            ) => {

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
       3. dosing.indications[]
    ----------------------------------------- */

    if (
        conditions.length === 0 &&
        Array.isArray(
            dosing.indications
        )
    ) {

        dosing.indications.forEach(
            (
                item,
                index
            ) => {

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
                        String(
                            condition
                        );


                    conditions.push(
                        regimen
                    );

                }

            }
        );

    }


    /* -----------------------------------------
       4. indicationSpecific medicines

       Example:

       Meloxicam:
       indicationSpecific: true
       dosing.indication:
           "Juvenile Rheumatoid Arthritis"

       Naproxen:
       conditionBased[] is already handled.
    ----------------------------------------- */

    if (
        conditions.length === 0 &&
        medicine.indicationSpecific ===
            true
    ) {

        const condition =
            dosing.condition ||
            dosing.indication ||
            medicine.condition;


        if (condition) {

            const regimen =
                normalizeRegimen(
                    dosing,
                    String(
                        condition
                    )
                );


            if (regimen) {

                regimen.condition =
                    String(
                        condition
                    );

                regimen.label =
                    String(
                        condition
                    );


                conditions.push(
                    regimen
                );

            }

        }

    }


    /* -----------------------------------------
       REMOVE DUPLICATE CONDITIONS
    ----------------------------------------- */

    const unique = [];

    const seen =
        new Set();


    conditions.forEach(
        regimen => {

            const key =
                normalizeText(
                    regimen.condition
                );


            if (
                key &&
                !seen.has(
                    key
                )
            ) {

                seen.add(
                    key
                );

                unique.push(
                    regimen
                );

            }

        }
    );


    return unique;

}


/* =========================================
   MEDICINE REQUIRES CONDITION
========================================= */

function medicineRequiresCondition(
    medicine
) {

    if (!medicine) {
        return false;
    }


    const conditions =
        getConditionRegimens(
            medicine
        );


    /*
       IMPORTANT:

       If there is even ONE actual
       condition-specific dosing regimen,
       the user must explicitly select
       the condition.

       This fixes the previous behavior
       where a single condition was hidden.
    */

    return (
        conditions.length > 0
    );

}


/* =========================================
   CONDITION LABEL
========================================= */

function getConditionLabel(
    regimen
) {

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


/* =========================================
   CREATE CONDITION SELECTOR
========================================= */

function createConditionSelector(
    medicine
) {

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


    if (
        selectedConditionInfo
    ) {

        selectedConditionInfo.innerHTML =
            "";

    }


    /*
       No condition-specific regimen:
       hide selector.
    */

    if (
        conditions.length === 0
    ) {

        conditionGroup.style.display =
            "none";


        selectedConditionRegimen =
            null;


        return;

    }


    /*
       One OR more condition regimens:
       show selector.

       The user must select it
       explicitly.
    */

    conditions.forEach(
        (
            regimen,
            index
        ) => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                String(
                    index
                );


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


/* =========================================
   GET SELECTED CONDITION REGIMEN
========================================= */

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
        !Number.isInteger(
            index
        ) ||
        !conditions[index]
    ) {

        return null;

    }


    return conditions[
        index
    ];

}


/* =========================================
   DISPLAY SELECTED CONDITION
========================================= */

function displaySelectedCondition(
    regimen
) {

    if (
        !selectedConditionInfo
    ) {

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


/* =========================================
   GET SELECTED REGIMEN
========================================= */

function getActiveRegimen() {

    /*
       Condition-based medicine:
       selected condition MUST be chosen.
    */

    if (
        medicineRequiresCondition(
            selectedMedicine
        )
    ) {

        return (
            selectedConditionRegimen ||
            getSelectedConditionRegimen()
        );

    }


    /*
       Normal medicine:
       use selected regimen if available.
    */

    return (
        selectedRegimen ||
        getMedicineRegimens(
            selectedMedicine
        )[0] ||
        null
    );

}


/* =========================================
   GET REGIMEN LABEL
========================================= */

function getRegimenLabel(
    regimen
) {

    if (!regimen) {
        return "Dose option";
    }


    if (
        regimen.label
    ) {

        return String(
            regimen.label
        );

    }


    if (
        regimen.condition
    ) {

        return String(
            regimen.condition
        );

    }


    if (
        regimen.indication
    ) {

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

        return (
            `${doseText} mg/kg/dose`
        );

    }


    if (
        type ===
        "mg_per_kg_per_day"
    ) {

        return (
            `${doseText} mg/kg/day`
        );

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


    if (
        type ===
        "fixed_dose"
    ) {

        return (
            doseText
                ? `${doseText} mg`
                : "Fixed dose"
        );

    }


    if (
        type ===
        "weight_band"
    ) {

        return "Weight-band dose";

    }


    return (
        doseText
            ? `${doseText} mg/kg`
            : "Dose option"
    );

}


/* =========================================
   DISPLAY SELECTED REGIMEN
========================================= */

function displaySelectedRegimenInfo(
    regimen
) {

    if (
        !selectedRegimenInfo
    ) {

        return;

    }


    if (!regimen) {

        selectedRegimenInfo.innerHTML =
            "";

        return;

    }


    const label =
        getRegimenLabel(
            regimen
        );


    const frequency =
        regimen.frequencyText ||
        regimen.frequency ||
        regimen.interval ||
        "";


    selectedRegimenInfo.innerHTML = `

        <div class="selected-regimen-card">

            <strong>
                ${escapeHtml(
                    label
                )}
            </strong>

            ${
                frequency
                    ? `
                        <span>
                            ${escapeHtml(
                                String(
                                    frequency
                                )
                            )}
                        </span>
                      `
                    : ""
            }

        </div>

    `;

}


/* =========================================
   CONDITION SELECT CHANGE
========================================= */

if (
    conditionSelect
) {

    conditionSelect.addEventListener(
        "change",
        () => {

            const regimen =
                getSelectedConditionRegimen();


            if (!regimen) {

                selectedConditionRegimen =
                    null;

                selectedRegimen =
                    null;


                displaySelectedCondition(
                    null
                );


                if (
                    selectedRegimenInfo
                ) {

                    selectedRegimenInfo.innerHTML =
                        "";

                }


                hideValidation();

                hideResult();

                return;

            }


            selectedConditionRegimen =
                regimen;


            selectedRegimen =
                regimen;


            displaySelectedCondition(
                regimen
            );


            displaySelectedRegimenInfo(
                regimen
            );


            hideValidation();

            hideResult();

        }
    );

}


/* =========================================
   END OF PART 1
========================================= */
/* =========================================
   DoseCare
   CALCULATOR ENGINE
   PART 2 / 5

   Continues directly after PART 1.

   Responsibilities:
   - Medicine selection
   - Condition selection
   - Regimen selection
   - Patient age / weight
   - Input validation
   - Dosing-type detection
   - Calculation preparation
========================================= */


/* =========================================
   CALCULATOR STATE
========================================= */

const calculatorState = {

    medicineId:
        null,

    condition:
        null,

    regimen:
        null,

    age:
        null,

    ageUnit:
        "years",

    weight:
        null,

    concentration:
        null,

    concentrationUnit:
        "mg/5mL",

    frequency:
        null,

    lastCalculation:
        null

};


/* =========================================
   GET CURRENT CALCULATOR MEDICINE
========================================= */

function getSelectedMedicine() {

    if (!calculatorState.medicineId) {
        return null;
    }

    return getMedicineById(
        calculatorState.medicineId
    );

}


/* =========================================
   SET SELECTED MEDICINE
========================================= */

function setSelectedMedicine(medicineId) {

    const medicine =
        getMedicineById(medicineId);


    if (!medicine) {

        calculatorState.medicineId =
            null;

        calculatorState.condition =
            null;

        calculatorState.regimen =
            null;

        return null;

    }


    calculatorState.medicineId =
        medicine.id;

    calculatorState.condition =
        null;

    calculatorState.regimen =
        null;


    return medicine;

}


/* =========================================
   GET MEDICINE CONDITIONS
========================================= */

function getMedicineConditions(medicine) {

    if (!medicine) {
        return [];
    }


    const conditions =
        Array.isArray(
            medicine.conditions
        )
            ? medicine.conditions
            : [];


    return [
        ...new Set(
            conditions
                .filter(Boolean)
                .map(
                    condition =>
                        String(condition).trim()
                )
                .filter(Boolean)
        )
    ];

}


/* =========================================
   CHECK IF MEDICINE REQUIRES CONDITION
========================================= */

function medicineRequiresCondition(medicine) {

    if (!medicine) {
        return false;
    }


    const dosing =
        medicine.dosing;


    if (!dosing) {
        return false;
    }


    if (
        dosing.type ===
        "condition_based"
    ) {
        return true;
    }


    if (
        Array.isArray(
            dosing.conditionBased
        ) &&
        dosing.conditionBased.length > 0
    ) {
        return true;
    }


    if (
        medicine.indicationSpecific ===
        true
    ) {

        return true;

    }


    return false;

}


/* =========================================
   GET CONDITION-BASED REGIMENS
========================================= */

function getConditionBasedRegimens(medicine) {

    if (!medicine) {
        return [];
    }


    const dosing =
        medicine.dosing;


    if (!dosing) {
        return [];
    }


    if (
        !Array.isArray(
            dosing.conditionBased
        )
    ) {

        return [];

    }


    return dosing.conditionBased.filter(
        regimen =>
            regimen &&
            typeof regimen ===
            "object"
    );

}


/* =========================================
   GET REGIMENS FOR MEDICINE
========================================= */

function getMedicineRegimens(medicine) {

    if (!medicine) {
        return [];
    }


    const dosing =
        medicine.dosing;


    if (!dosing) {
        return [];
    }


    if (
        dosing.type ===
        "condition_based"
    ) {

        return getConditionBasedRegimens(
            medicine
        );

    }


    return [

        dosing

    ];

}


/* =========================================
   GET REGIMENS FOR CONDITION
========================================= */

function getRegimensForCondition(
    medicine,
    condition
) {

    if (
        !medicine ||
        !condition
    ) {
        return [];
    }


    const regimens =
        getMedicineRegimens(
            medicine
        );


    const searchCondition =
        String(condition)
            .trim()
            .toLowerCase();


    return regimens.filter(
        regimen => {

            const regimenCondition =
                String(
                    regimen.condition ||
                    regimen.indication ||
                    regimen.label ||
                    ""
                )
                .trim()
                .toLowerCase();


            return (
                regimenCondition ===
                searchCondition
            );

        }
    );

}


/* =========================================
   SET CONDITION
========================================= */

function setCalculatorCondition(
    condition
) {

    const medicine =
        getSelectedMedicine();


    if (!medicine) {
        return null;
    }


    const conditions =
        getMedicineConditions(
            medicine
        );


    const selected =
        conditions.find(
            item =>
                String(item)
                    .trim()
                    .toLowerCase() ===
                String(condition)
                    .trim()
                    .toLowerCase()
        );


    if (!selected) {

        calculatorState.condition =
            null;

        calculatorState.regimen =
            null;

        return null;

    }


    calculatorState.condition =
        selected;


    const regimens =
        getRegimensForCondition(
            medicine,
            selected
        );


    calculatorState.regimen =
        regimens.length === 1
            ? regimens[0]
            : null;


    return {

        condition:
            selected,

        regimens

    };

}


/* =========================================
   SET REGIMEN
========================================= */

function setCalculatorRegimen(
    regimen
) {

    if (
        !regimen ||
        typeof regimen !==
        "object"
    ) {

        calculatorState.regimen =
            null;

        return null;

    }


    calculatorState.regimen =
        regimen;


    return regimen;

}


/* =========================================
   GET ACTIVE DOSING REGIMEN
========================================= */

function getActiveDosingRegimen() {

    const medicine =
        getSelectedMedicine();


    if (!medicine) {
        return null;
    }


    if (
        calculatorState.regimen
    ) {

        return calculatorState.regimen;

    }


    const dosing =
        medicine.dosing;


    if (!dosing) {
        return null;
    }


    if (
        dosing.type !==
        "condition_based"
    ) {

        return dosing;

    }


    return null;

}


/* =========================================
   GET DOSING TYPE
========================================= */

function getMedicineDosingType(
    medicine
) {

    if (
        !medicine ||
        !medicine.dosing
    ) {
        return null;
    }


    const regimen =
        calculatorState.regimen ||
        medicine.dosing;


    return regimen.type ||
        null;

}


/* =========================================
   CHECK CALCULATOR READINESS
========================================= */

function isCalculatorReadyForMedicine(
    medicine
) {

    if (!medicine) {
        return false;
    }


    if (
        !medicine.dosing
    ) {
        return false;
    }


    if (
        medicine.dosing.configured !==
        true
    ) {

        return false;

    }


    if (
        medicine.dosing.calculatorReady ===
        false
    ) {

        return false;

    }


    if (
        medicine.dosing.type ===
        "condition_based" &&
        !calculatorState.regimen
    ) {

        return false;

    }


    return true;

}


/* =========================================
   SET PATIENT AGE
========================================= */

function setPatientAge(
    age,
    unit
) {

    const numericAge =
        Number(age);


    if (
        !Number.isFinite(
            numericAge
        ) ||
        numericAge < 0
    ) {

        calculatorState.age =
            null;

        return false;

    }


    const normalizedUnit =
        String(
            unit || "years"
        )
            .trim()
            .toLowerCase();


    if (
        normalizedUnit !==
        "years" &&
        normalizedUnit !==
        "months"
    ) {

        return false;

    }


    calculatorState.age =
        numericAge;

    calculatorState.ageUnit =
        normalizedUnit;


    return true;

}


/* =========================================
   GET AGE IN MONTHS
========================================= */

function getPatientAgeInMonths() {

    if (
        calculatorState.age ===
        null ||
        calculatorState.age ===
        undefined
    ) {

        return null;

    }


    if (
        calculatorState.ageUnit ===
        "months"
    ) {

        return calculatorState.age;

    }


    return calculatorState.age * 12;

}


/* =========================================
   GET AGE IN YEARS
========================================= */

function getPatientAgeInYears() {

    const months =
        getPatientAgeInMonths();


    if (months === null) {
        return null;
    }


    return months / 12;

}


/* =========================================
   SET PATIENT WEIGHT
========================================= */

function setPatientWeight(
    weight
) {

    const numericWeight =
        Number(weight);


    if (
        !Number.isFinite(
            numericWeight
        ) ||
        numericWeight <= 0
    ) {

        calculatorState.weight =
            null;

        return false;

    }


    calculatorState.weight =
        numericWeight;


    return true;

}


/* =========================================
   SET CONCENTRATION
========================================= */

function setMedicineConcentration(
    concentration
) {

    const numericConcentration =
        Number(concentration);


    if (
        !Number.isFinite(
            numericConcentration
        ) ||
        numericConcentration <= 0
    ) {

        calculatorState.concentration =
            null;

        return false;

    }


    calculatorState.concentration =
        numericConcentration;


    return true;

}


/* =========================================
   SET CONCENTRATION UNIT
========================================= */

function setConcentrationUnit(
    unit
) {

    if (!unit) {
        return false;
    }


    calculatorState.concentrationUnit =
        String(unit)
            .trim();


    return true;

}


/* =========================================
   NORMALIZE AGE REQUIREMENT
========================================= */

function checkAgeRequirement(
    medicine,
    regimen
) {

    if (
        !medicine ||
        !regimen
    ) {

        return {

            valid: false,

            reason:
                "Medicine dosing information is unavailable."

        };

    }


    const ageMonths =
        getPatientAgeInMonths();


    const minimumAgeMonths =
        regimen.minimumAgeMonths ??
        medicine.dosing?.minimumAgeMonths ??
        null;


    const maximumAgeMonths =
        regimen.maximumAgeMonths ??
        medicine.dosing?.maximumAgeMonths ??
        null;


    const minimumAgeYears =
        regimen.minimumAgeYears ??
        medicine.dosing?.minimumAgeYears ??
        null;


    const maximumAgeYears =
        regimen.maximumAgeYears ??
        medicine.dosing?.maximumAgeYears ??
        null;


    if (
        ageMonths === null
    ) {

        return {

            valid: true,

            reason: null

        };

    }


    if (
        minimumAgeMonths !== null &&
        ageMonths <
        Number(minimumAgeMonths)
    ) {

        return {

            valid: false,

            reason:
                `This medicine is not configured for patients younger than ${minimumAgeMonths} months.`

        };

    }


    if (
        maximumAgeMonths !== null &&
        ageMonths >
        Number(maximumAgeMonths)
    ) {

        return {

            valid: false,

            reason:
                `This medicine is not configured for patients older than ${maximumAgeMonths} months.`

        };

    }


    if (
        minimumAgeYears !== null &&
        ageMonths <
        Number(minimumAgeYears) * 12
    ) {

        return {

            valid: false,

            reason:
                `This medicine is not configured for patients younger than ${minimumAgeYears} years.`

        };

    }


    if (
        maximumAgeYears !== null &&
        ageMonths >
        Number(maximumAgeYears) * 12
    ) {

        return {

            valid: false,

            reason:
                `This medicine is not configured for patients older than ${maximumAgeYears} years.`

        };

    }


    return {

        valid: true,

        reason: null

    };

}


/* =========================================
   CHECK WEIGHT REQUIREMENT
========================================= */

function checkWeightRequirement(
    regimen
) {

    if (!regimen) {

        return {

            valid: false,

            reason:
                "No dosing regimen selected."

        };

    }


    const dosingType =
        regimen.type;


    const weightRequiredTypes = [

        "mg_per_kg_per_dose",

        "mg_per_kg_per_day",

        "condition_based",

        "weight_band"

    ];


    if (
        weightRequiredTypes.includes(
            dosingType
        ) &&
        (
            calculatorState.weight ===
            null ||
            calculatorState.weight <= 0
        )
    ) {

        return {

            valid: false,

            reason:
                "Patient weight is required for this dosing regimen."

        };

    }


    return {

        valid: true,

        reason: null

    };

}


/* =========================================
   CHECK CONDITION REQUIREMENT
========================================= */

function checkConditionRequirement(
    medicine
) {

    if (
        !medicineRequiresCondition(
            medicine
        )
    ) {

        return {

            valid: true,

            reason: null

        };

    }


    if (
        !calculatorState.condition
    ) {

        return {

            valid: false,

            reason:
                "Select the clinical condition before calculating the dose."

        };

    }


    if (
        !calculatorState.regimen
    ) {

        return {

            valid: false,

            reason:
                "No dosing regimen is available for the selected condition."

        };

    }


    return {

        valid: true,

        reason: null

    };

}


/* =========================================
   VALIDATE CALCULATOR INPUT
========================================= */

function validateCalculatorInput() {

    const medicine =
        getSelectedMedicine();


    if (!medicine) {

        return {

            valid: false,

            reason:
                "Please select a medicine."

        };

    }


    const regimen =
        getActiveDosingRegimen();


    if (!regimen) {

        return {

            valid: false,

            reason:
                "No valid dosing regimen is available for this medicine."

        };

    }


    if (
        medicine.dosing?.configured !==
        true
    ) {

        return {

            valid: false,

            reason:
                "This medicine is not configured for DoseCare calculation."

        };

    }


    const conditionCheck =
        checkConditionRequirement(
            medicine
        );


    if (
        !conditionCheck.valid
    ) {

        return conditionCheck;

    }


    const ageCheck =
        checkAgeRequirement(
            medicine,
            regimen
        );


    if (
        !ageCheck.valid
    ) {

        return ageCheck;

    }


    const weightCheck =
        checkWeightRequirement(
            regimen
        );


    if (
        !weightCheck.valid
    ) {

        return weightCheck;

    }


    return {

        valid: true,

        reason: null,

        medicine,

        regimen

    };

}


/* =========================================
   GET NUMERIC DOSE RANGE
========================================= */

function getDoseRange(
    regimen
) {

    if (!regimen) {

        return {

            min: null,

            max: null

        };

    }


    const min =
        Number(
            regimen.minDose
        );


    const max =
        Number(
            regimen.maxDose
        );


    return {

        min:
            Number.isFinite(min)
                ? min
                : null,

        max:
            Number.isFinite(max)
                ? max
                : null

    };

}


/* =========================================
   GET FREQUENCY
========================================= */

function getRegimenFrequency(
    regimen
) {

    if (!regimen) {
        return null;
    }


    if (
        Number.isFinite(
            Number(
                regimen.frequencyPerDay
            )
        )
    ) {

        return Number(
            regimen.frequencyPerDay
        );

    }


    if (
        Number.isFinite(
            Number(
                regimen.frequency
            )
        )
    ) {

        return Number(
            regimen.frequency
        );

    }


    return null;

}


/* =========================================
   GET INTERVAL HOURS
========================================= */

function getRegimenIntervalHours(
    regimen
) {

    if (!regimen) {
        return null;
    }


    if (
        Number.isFinite(
            Number(
                regimen.intervalHours
            )
        )
    ) {

        return Number(
            regimen.intervalHours
        );

    }


    const frequency =
        getRegimenFrequency(
            regimen
        );


    if (
        frequency &&
        frequency > 0
    ) {

        return 24 / frequency;

    }


    return null;

}


/* =========================================
   CALCULATE MG/KG/DOSE
========================================= */

function calculateMgPerKgPerDose(
    weight,
    regimen
) {

    const doseRange =
        getDoseRange(
            regimen
        );


    if (
        !Number.isFinite(
            weight
        ) ||
        weight <= 0
    ) {

        return null;

    }


    if (
        doseRange.min === null
    ) {

        return null;

    }


    const minDoseMg =
        weight *
        doseRange.min;


    const maxDoseMg =
        doseRange.max !== null
            ? weight *
              doseRange.max
            : minDoseMg;


    return {

        minDoseMg,

        maxDoseMg,

        doseUnit:
            "mg/dose",

        basis:
            "mg/kg/dose"

    };

}


/* =========================================
   CALCULATE MG/KG/DAY
========================================= */

function calculateMgPerKgPerDay(
    weight,
    regimen
) {

    const doseRange =
        getDoseRange(
            regimen
        );


    if (
        !Number.isFinite(
            weight
        ) ||
        weight <= 0
    ) {

        return null;

    }


    if (
        doseRange.min === null
    ) {

        return null;

    }


    const frequency =
        getRegimenFrequency(
            regimen
        );


    if (
        !frequency ||
        frequency <= 0
    ) {

        return null;

    }


    const minDailyDoseMg =
        weight *
        doseRange.min;


    const maxDailyDoseMg =
        doseRange.max !== null
            ? weight *
              doseRange.max
            : minDailyDoseMg;


    const minDosePerAdministration =
        minDailyDoseMg /
        frequency;


    const maxDosePerAdministration =
        maxDailyDoseMg /
        frequency;


    return {

        minDailyDoseMg,

        maxDailyDoseMg,

        minDosePerAdministration,

        maxDosePerAdministration,

        frequency,

        doseUnit:
            "mg/dose",

        dailyUnit:
            "mg/day",

        basis:
            "mg/kg/day"

    };

}


/* =========================================
   CHECK WEIGHT BAND
========================================= */

function findWeightBand(
    weight,
    regimen
) {

    if (
        !Number.isFinite(weight) ||
        weight <= 0 ||
        !regimen
    ) {

        return null;

    }


    const bands =
        Array.isArray(
            regimen.weightBands
        )
            ? regimen.weightBands
            : [];


    return bands.find(
        band => {

            const min =
                Number(
                    band.minWeightKg
                );


            const max =
                band.maxWeightKg !==
                undefined &&
                band.maxWeightKg !==
                null
                    ? Number(
                        band.maxWeightKg
                    )
                    : Infinity;


            return (
                weight >= min &&
                weight <= max
            );

        }
    ) || null;

}


/* =========================================
   CALCULATE WEIGHT BAND
========================================= */

function calculateWeightBand(
    weight,
    regimen
) {

    const band =
        findWeightBand(
            weight,
            regimen
        );


    if (!band) {

        return {

            valid: false,

            reason:
                "The patient's weight does not fall within a configured dosing band."

        };

    }


    return {

        valid: true,

        doseMg:
            Number(
                band.doseMg
            ),

        doseVolumeMl:
            band.doseVolumeMl !==
            undefined
                ? Number(
                    band.doseVolumeMl
                )
                : null,

        frequency:
            band.frequency ??
            regimen.frequency ??
            null,

        intervalHours:
            band.intervalHours ??
            regimen.intervalHours ??
            null,

        band

    };

}


/* =========================================
   MAIN DOSE CALCULATION
========================================= */

function calculateDose() {

    const validation =
        validateCalculatorInput();


    if (
        !validation.valid
    ) {

        return {

            success: false,

            error:
                validation.reason

        };

    }


    const medicine =
        validation.medicine;


    const regimen =
        validation.regimen;


    const weight =
        calculatorState.weight;


    const dosingType =
        regimen.type;


    let calculation =
        null;


    /* -------------------------------------
       MG/KG/DOSE
    ------------------------------------- */

    if (
        dosingType ===
        "mg_per_kg_per_dose"
    ) {

        calculation =
            calculateMgPerKgPerDose(
                weight,
                regimen
            );

    }


    /* -------------------------------------
       MG/KG/DAY
    ------------------------------------- */

    else if (
        dosingType ===
        "mg_per_kg_per_day"
    ) {

        calculation =
            calculateMgPerKgPerDay(
                weight,
                regimen
            );

    }


    /* -------------------------------------
       CONDITION BASED
    ------------------------------------- */

    else if (
        dosingType ===
        "condition_based"
    ) {

        const nestedType =
            regimen.type;


        if (
            nestedType ===
            "mg_per_kg_per_dose"
        ) {

            calculation =
                calculateMgPerKgPerDose(
                    weight,
                    regimen
                );

        }

        else if (
            nestedType ===
            "mg_per_kg_per_day"
        ) {

            calculation =
                calculateMgPerKgPerDay(
                    weight,
                    regimen
                );

        }

        else {

            return {

                success: false,

                error:
                    "The selected condition has a dosing method that is not supported by the current calculator."

            };

        }

    }


    /* -------------------------------------
       WEIGHT BAND
    ------------------------------------- */

    else if (
        dosingType ===
        "weight_band"
    ) {

        calculation =
            calculateWeightBand(
                weight,
                regimen
            );


        if (
            !calculation.valid
        ) {

            return {

                success: false,

                error:
                    calculation.reason

            };

        }

    }


    /* -------------------------------------
       FIXED DOSE
    ------------------------------------- */

    else if (
        dosingType ===
        "fixed_dose"
    ) {

        return {

            success: false,

            error:
                "This medicine uses a fixed-dose regimen that is not currently supported by the calculator."

        };

    }


    /* -------------------------------------
       UNKNOWN DOSING TYPE
    ------------------------------------- */

    else {

        return {

            success: false,

            error:
                `Unsupported dosing type: ${dosingType || "unknown"}`

        };

    }


    if (!calculation) {

        return {

            success: false,

            error:
                "Unable to calculate the dose from the configured regimen."

        };

    }


    const result = {

        success:
            true,

        medicineId:
            medicine.id,

        medicineName:
            getMedicineName(
                medicine
            ),

        condition:
            calculatorState.condition,

        dosingType,

        regimen,

        patient: {

            age:
                calculatorState.age,

            ageUnit:
                calculatorState.ageUnit,

            ageMonths:
                getPatientAgeInMonths(),

            ageYears:
                getPatientAgeInYears(),

            weightKg:
                calculatorState.weight

        },

        calculation,

        concentration:
            calculatorState.concentration,

        concentrationUnit:
            calculatorState.concentrationUnit,

        timestamp:
            new Date().toISOString()

    };


    calculatorState.lastCalculation =
        result;


    return result;

}


/* =========================================
   RESET CALCULATOR
========================================= */

function resetCalculator() {

    calculatorState.medicineId =
        null;

    calculatorState.condition =
        null;

    calculatorState.regimen =
        null;

    calculatorState.age =
        null;

    calculatorState.ageUnit =
        "years";

    calculatorState.weight =
        null;

    calculatorState.concentration =
        null;

    calculatorState.concentrationUnit =
        "mg/5mL";

    calculatorState.frequency =
        null;

    calculatorState.lastCalculation =
        null;


    return true;

}
/* =========================================
   DoseCare
   CALCULATOR ENGINE
   PART 3 / 5

   Responsibilities:
   - Frequency handling
   - Alternative frequency
   - mg → mL conversion
   - Concentration normalization
   - Step-by-step calculation
   - Result preparation
========================================= */


/* =========================================
   FREQUENCY OPTIONS
========================================= */

function getFrequencyOptions(regimen) {

    if (!regimen) {
        return [];
    }

    const options = [];


    /* -------------------------------------
       PRIMARY FREQUENCY
    ------------------------------------- */

    const primaryFrequency =
        regimen.frequencyPerDay ??
        regimen.frequency ??
        null;


    const primaryInterval =
        regimen.intervalHours ??
        null;


    if (
        primaryFrequency !== null ||
        primaryInterval !== null
    ) {

        options.push({

            id:
                "primary",

            label:
                regimen.frequencyText ||
                regimen.interval ||
                (
                    primaryFrequency
                        ? `${primaryFrequency} times daily`
                        : `Every ${primaryInterval} hours`
                ),

            frequencyPerDay:
                primaryFrequency !== null
                    ? Number(primaryFrequency)
                    : (
                        primaryInterval
                            ? 24 / Number(primaryInterval)
                            : null
                    ),

            intervalHours:
                primaryInterval !== null
                    ? Number(primaryInterval)
                    : (
                        primaryFrequency
                            ? 24 / Number(primaryFrequency)
                            : null
                    ),

            alternative:
                false

        });

    }


    /* -------------------------------------
       ALTERNATIVE FREQUENCY
    ------------------------------------- */

    const alternativeFrequency =
        regimen.alternativeFrequency;


    if (
        alternativeFrequency !==
        undefined &&
        alternativeFrequency !==
        null
    ) {

        let frequencyPerDay =
            null;

        let intervalHours =
            null;

        let label =
            null;


        if (
            typeof alternativeFrequency ===
            "number"
        ) {

            frequencyPerDay =
                Number(
                    alternativeFrequency
                );

            intervalHours =
                frequencyPerDay > 0
                    ? 24 / frequencyPerDay
                    : null;

            label =
                `${frequencyPerDay} times daily`;

        }

        else if (
            typeof alternativeFrequency ===
            "object"
        ) {

            frequencyPerDay =
                alternativeFrequency.frequencyPerDay ??
                alternativeFrequency.frequency ??
                null;

            intervalHours =
                alternativeFrequency.intervalHours ??
                null;

            label =
                alternativeFrequency.frequencyText ||
                alternativeFrequency.label ||
                alternativeFrequency.interval ||
                null;


            if (
                !intervalHours &&
                frequencyPerDay
            ) {

                intervalHours =
                    24 /
                    Number(
                        frequencyPerDay
                    );

            }

        }

        else {

            label =
                String(
                    alternativeFrequency
                );

        }


        options.push({

            id:
                "alternative",

            label,

            frequencyPerDay:
                frequencyPerDay !== null
                    ? Number(
                        frequencyPerDay
                    )
                    : null,

            intervalHours:
                intervalHours !== null
                    ? Number(
                        intervalHours
                    )
                    : null,

            alternative:
                true

        });

    }


    return options;

}


/* =========================================
   SET FREQUENCY
========================================= */

function setCalculatorFrequency(
    frequencyId
) {

    const medicine =
        getSelectedMedicine();


    if (!medicine) {
        return null;
    }


    const regimen =
        getActiveDosingRegimen();


    if (!regimen) {
        return null;
    }


    const options =
        getFrequencyOptions(
            regimen
        );


    const selected =
        options.find(
            option =>
                option.id ===
                frequencyId
        );


    if (!selected) {
        return null;
    }


    calculatorState.frequency =
        selected;


    return selected;

}


/* =========================================
   GET ACTIVE FREQUENCY
========================================= */

function getActiveFrequency(
    regimen
) {

    if (
        calculatorState.frequency
    ) {

        return calculatorState.frequency;

    }


    const options =
        getFrequencyOptions(
            regimen
        );


    return options.length > 0
        ? options[0]
        : null;

}


/* =========================================
   NORMALIZE CONCENTRATION
========================================= */

/*
   DoseCare stores concentration in a
   human-friendly format such as:

   250 mg / 5 mL

   The calculator internally converts it
   into:

   mg per mL
*/

function normalizeConcentration(
    concentration,
    unit
) {

    const value =
        Number(
            concentration
        );


    if (
        !Number.isFinite(value) ||
        value <= 0
    ) {

        return null;

    }


    const normalizedUnit =
        String(
            unit || "mg/5mL"
        )
            .replace(/\s/g, "")
            .toLowerCase();


    /* -------------------------------------
       mg / mL
    ------------------------------------- */

    if (
        normalizedUnit ===
        "mg/ml"
    ) {

        return {

            value,

            mgPerMl:
                value,

            unit:
                "mg/mL",

            volumeBasisMl:
                1

        };

    }


    /* -------------------------------------
       mg / 5 mL
    ------------------------------------- */

    if (
        normalizedUnit ===
        "mg/5ml" ||
        normalizedUnit ===
        "mgper5ml"
    ) {

        return {

            value,

            mgPerMl:
                value / 5,

            unit:
                "mg/5 mL",

            volumeBasisMl:
                5

        };

    }


    /* -------------------------------------
       mg / 10 mL
    ------------------------------------- */

    if (
        normalizedUnit ===
        "mg/10ml" ||
        normalizedUnit ===
        "mgper10ml"
    ) {

        return {

            value,

            mgPerMl:
                value / 10,

            unit:
                "mg/10 mL",

            volumeBasisMl:
                10

        };

    }


    /* -------------------------------------
       mg / 1 mL
    ------------------------------------- */

    if (
        normalizedUnit ===
        "mg/1ml" ||
        normalizedUnit ===
        "mgper1ml"
    ) {

        return {

            value,

            mgPerMl:
                value,

            unit:
                "mg/mL",

            volumeBasisMl:
                1

        };

    }


    return null;

}


/* =========================================
   CALCULATE MG TO ML
========================================= */

function convertMgToMl(
    doseMg,
    concentration,
    concentrationUnit
) {

    const numericDose =
        Number(
            doseMg
        );


    if (
        !Number.isFinite(
            numericDose
        ) ||
        numericDose < 0
    ) {

        return null;

    }


    const normalized =
        normalizeConcentration(
            concentration,
            concentrationUnit
        );


    if (!normalized) {
        return null;
    }


    const volumeMl =
        numericDose /
        normalized.mgPerMl;


    return {

        doseMg:
            numericDose,

        concentration:
            normalized.value,

        concentrationUnit:
            normalized.unit,

        mgPerMl:
            normalized.mgPerMl,

        volumeMl

    };

}


/* =========================================
   CONVERT DOSE RANGE TO ML
========================================= */

function convertDoseRangeToMl(
    minDoseMg,
    maxDoseMg,
    concentration,
    concentrationUnit
) {

    const minResult =
        convertMgToMl(
            minDoseMg,
            concentration,
            concentrationUnit
        );


    if (!minResult) {
        return null;
    }


    const maxResult =
        convertMgToMl(
            maxDoseMg,
            concentration,
            concentrationUnit
        );


    if (!maxResult) {
        return null;
    }


    return {

        minVolumeMl:
            minResult.volumeMl,

        maxVolumeMl:
            maxResult.volumeMl,

        concentration:
            minResult.concentration,

        concentrationUnit:
            minResult.concentrationUnit,

        mgPerMl:
            minResult.mgPerMl

    };

}


/* =========================================
   ROUND CALCULATION VALUE
========================================= */

function roundDoseValue(
    value,
    decimals = 2
) {

    if (
        !Number.isFinite(
            Number(value)
        )
    ) {

        return null;

    }


    const factor =
        Math.pow(
            10,
            decimals
        );


    return Math.round(
        Number(value) *
        factor
    ) / factor;

}


/* =========================================
   FORMAT NUMBER
========================================= */

function formatDoseNumber(
    value,
    decimals = 2
) {

    const rounded =
        roundDoseValue(
            value,
            decimals
        );


    if (rounded === null) {
        return "—";
    }


    return String(
        rounded
    );

}


/* =========================================
   FORMAT DOSE RANGE
========================================= */

function formatDoseRange(
    min,
    max,
    unit
) {

    const minText =
        formatDoseNumber(
            min
        );


    const maxText =
        formatDoseNumber(
            max
        );


    if (
        min === max ||
        max === null ||
        max === undefined
    ) {

        return `${minText} ${unit}`;

    }


    return `${minText}–${maxText} ${unit}`;

}


/* =========================================
   BUILD PATIENT STEP
========================================= */

function buildPatientStep(
    patient
) {

    const steps = [];


    if (
        patient.weightKg !==
        null &&
        patient.weightKg !==
        undefined
    ) {

        steps.push({

            label:
                "Patient weight",

            value:
                `${formatDoseNumber(
                    patient.weightKg
                )} kg`

        });

    }


    if (
        patient.age !==
        null &&
        patient.age !==
        undefined
    ) {

        steps.push({

            label:
                "Patient age",

            value:
                `${formatDoseNumber(
                    patient.age
                )} ${patient.ageUnit}`

        });

    }


    return steps;

}


/* =========================================
   BUILD DOSING STEP
========================================= */

function buildDosingStep(
    regimen
) {

    if (!regimen) {
        return null;
    }


    const range =
        getDoseRange(
            regimen
        );


    const frequency =
        getActiveFrequency(
            regimen
        );


    return {

        dosingType:
            regimen.type,

        doseRange:
            range,

        unit:
            regimen.unit ||
            null,

        frequency:
            frequency,

        formula:
            getDosingFormula(
                regimen

            )

    };

}


/* =========================================
   GET DOSING FORMULA
========================================= */

function getDosingFormula(
    regimen
) {

    if (!regimen) {
        return null;
    }


    switch (
        regimen.type
    ) {

        case "mg_per_kg_per_dose":

            return (
                "Dose (mg) = Weight (kg) × Dose (mg/kg/dose)"
            );


        case "mg_per_kg_per_day":

            return (
                "Daily dose (mg/day) = Weight (kg) × Dose (mg/kg/day)"
            );


        case "weight_band":

            return (
                "Dose is selected from the configured weight band."
            );


        case "fixed_dose":

            return (
                "Dose is selected from the configured fixed-dose regimen."
            );


        default:

            return null;

    }

}


/* =========================================
   BUILD MG CALCULATION STEPS
========================================= */

function buildMgCalculationSteps(
    result
) {

    if (
        !result ||
        !result.calculation
    ) {

        return [];

    }


    const calculation =
        result.calculation;


    const regimen =
        result.regimen;


    const weight =
        result.patient.weightKg;


    const steps = [];


    /* -------------------------------------
       MG/KG/DOSE
    ------------------------------------- */

    if (
        result.dosingType ===
        "mg_per_kg_per_dose"
    ) {

        steps.push({

            step:
                1,

            title:
                "Apply weight-based dose",

            formula:
                `${formatDoseNumber(
                    weight
                )} kg × ${formatDoseRange(
                    regimen.minDose,
                    regimen.maxDose,
                    "mg/kg/dose"
                )}`,

            result:
                formatDoseRange(
                    calculation.minDoseMg,
                    calculation.maxDoseMg,
                    "mg/dose"
                )

        });

    }


    /* -------------------------------------
       MG/KG/DAY
    ------------------------------------- */

    else if (
        result.dosingType ===
        "mg_per_kg_per_day"
    ) {

        steps.push({

            step:
                1,

            title:
                "Calculate total daily dose",

            formula:
                `${formatDoseNumber(
                    weight
                )} kg × ${formatDoseRange(
                    regimen.minDose,
                    regimen.maxDose,
                    "mg/kg/day"
                )}`,

            result:
                formatDoseRange(
                    calculation.minDailyDoseMg,
                    calculation.maxDailyDoseMg,
                    "mg/day"
                )

        });


        steps.push({

            step:
                2,

            title:
                "Divide by daily frequency",

            formula:
                `${formatDoseRange(
                    calculation.minDailyDoseMg,
                    calculation.maxDailyDoseMg,
                    "mg/day"
                )} ÷ ${calculation.frequency}`,

            result:
                formatDoseRange(
                    calculation.minDosePerAdministration,
                    calculation.maxDosePerAdministration,
                    "mg/dose"
                )

        });

    }


    /* -------------------------------------
       WEIGHT BAND
    ------------------------------------- */

    else if (
        result.dosingType ===
        "weight_band"
    ) {

        steps.push({

            step:
                1,

            title:
                "Select weight band",

            formula:
                `${formatDoseNumber(
                    weight
                )} kg`,

            result:
                calculation.band
                    ? (
                        calculation.band.minWeightKg !==
                        undefined
                            ? `${calculation.band.minWeightKg} kg and above`
                            : "Configured weight band"
                    )
                    : "Configured weight band"

        });


        steps.push({

            step:
                2,

            title:
                "Apply configured dose",

            formula:
                "Weight-band regimen",

            result:
                `${formatDoseNumber(
                    calculation.doseMg
                )} mg/dose`

        });

    }


    return steps;

}


/* =========================================
   BUILD CONCENTRATION STEP
========================================= */

function buildConcentrationStep(
    doseMg,
    concentration,
    concentrationUnit
) {

    const conversion =
        convertMgToMl(
            doseMg,
            concentration,
            concentrationUnit
        );


    if (!conversion) {
        return null;
    }


    return {

        formula:
            `${formatDoseNumber(
                doseMg
            )} mg ÷ ${formatDoseNumber(
                conversion.concentration
            )} ${conversion.concentrationUnit}`,

        normalizedFormula:
            `${formatDoseNumber(
                doseMg
            )} mg ÷ ${formatDoseNumber(
                conversion.mgPerMl
            )} mg/mL`,

        result:
            `${formatDoseNumber(
                conversion.volumeMl
            )} mL`

    };

}


/* =========================================
   BUILD FREQUENCY STEP
========================================= */

function buildFrequencyStep(
    regimen
) {

    const frequency =
        getActiveFrequency(
            regimen
        );


    if (!frequency) {
        return null;
    }


    return {

        label:
            "Frequency",

        text:
            frequency.label ||
            "As configured",

        frequencyPerDay:
            frequency.frequencyPerDay,

        intervalHours:
            frequency.intervalHours,

        alternative:
            frequency.alternative === true

    };

}


/* =========================================
   BUILD COMPLETE STEP-BY-STEP
========================================= */

function buildStepByStepCalculation(
    result
) {

    if (
        !result ||
        result.success !== true
    ) {

        return [];

    }


    const steps = [];


    /* -------------------------------------
       PATIENT
    ------------------------------------- */

    const patientSteps =
        buildPatientStep(
            result.patient
        );


    patientSteps.forEach(
        (item, index) => {

            steps.push({

                step:
                    steps.length + 1,

                title:
                    item.label,

                formula:
                    null,

                result:
                    item.value

            });

        }
    );


    /* -------------------------------------
       CONDITION
    ------------------------------------- */

    if (
        result.condition
    ) {

        steps.push({

            step:
                steps.length + 1,

            title:
                "Selected condition",

            formula:
                null,

            result:
                result.condition

        });

    }


    /* -------------------------------------
       DOSING CALCULATION
    ------------------------------------- */

    const dosingSteps =
        buildMgCalculationSteps(
            result
        );


    dosingSteps.forEach(
        item => {

            steps.push({

                step:
                    steps.length + 1,

                title:
                    item.title,

                formula:
                    item.formula,

                result:
                    item.result

            });

        }
    );


    /* -------------------------------------
       MG → ML
    ------------------------------------- */

    if (
        result.concentration !==
        null &&
        result.concentration !==
        undefined
    ) {

        let doseForConversion =
            null;


        if (
            result.calculation
                .minDoseMg !==
            undefined
        ) {

            doseForConversion =
                result.calculation
                    .minDoseMg;

        }

        else if (
            result.calculation
                .minDosePerAdministration !==
            undefined
        ) {

            doseForConversion =
                result.calculation
                    .minDosePerAdministration;

        }

        else if (
            result.calculation
                .doseMg !==
            undefined
        ) {

            doseForConversion =
                result.calculation
                    .doseMg;

        }


        if (
            doseForConversion !==
            null
        ) {

            const concentrationStep =
                buildConcentrationStep(
                    doseForConversion,
                    result.concentration,
                    result.concentrationUnit
                );


            if (
                concentrationStep
            ) {

                steps.push({

                    step:
                        steps.length + 1,

                    title:
                        "Convert mg to mL",

                    formula:
                        concentrationStep
                            .normalizedFormula,

                    result:
                        concentrationStep
                            .result

                });

            }

        }

    }


    /* -------------------------------------
       FREQUENCY
    ------------------------------------- */

    const frequencyStep =
        buildFrequencyStep(
            result.regimen
        );


    if (
        frequencyStep
    ) {

        steps.push({

            step:
                steps.length + 1,

            title:
                frequencyStep.label,

            formula:
                null,

            result:
                frequencyStep.text

        });

    }


    return steps;

}


/* =========================================
   ADD ML RESULT TO CALCULATION
========================================= */

function attachMlCalculation(
    result
) {

    if (
        !result ||
        result.success !== true
    ) {

        return result;

    }


    if (
        result.concentration ===
        null ||
        result.concentration ===
        undefined
    ) {

        return result;

    }


    const calculation =
        result.calculation;


    let minDoseMg =
        null;

    let maxDoseMg =
        null;


    if (
        calculation.minDoseMg !==
        undefined
    ) {

        minDoseMg =
            calculation.minDoseMg;

        maxDoseMg =
            calculation.maxDoseMg ??
            calculation.minDoseMg;

    }

    else if (
        calculation.minDosePerAdministration !==
        undefined
    ) {

        minDoseMg =
            calculation
                .minDosePerAdministration;

        maxDoseMg =
            calculation
                .maxDosePerAdministration ??
            calculation
                .minDosePerAdministration;

    }

    else if (
        calculation.doseMg !==
        undefined
    ) {

        minDoseMg =
            calculation.doseMg;

        maxDoseMg =
            calculation.doseMg;

    }


    if (
        minDoseMg === null
    ) {

        return result;

    }


    const ml =
        convertDoseRangeToMl(
            minDoseMg,
            maxDoseMg,
            result.concentration,
            result.concentrationUnit
        );


    if (!ml) {

        return {

            ...result,

            conversionError:
                "Invalid medicine concentration."

        };

    }


    result.calculation = {

        ...result.calculation,

        minDoseMl:
            ml.minVolumeMl,

        maxDoseMl:
            ml.maxVolumeMl,

        concentrationMgPerMl:
            ml.mgPerMl

    };


    return result;

}


/* =========================================
   BUILD FINAL RESULT OBJECT
========================================= */

function buildCalculationResult(
    baseResult
) {

    if (
        !baseResult ||
        baseResult.success !== true
    ) {

        return baseResult;

    }


    const result =
        attachMlCalculation(
            baseResult
        );


    result.stepByStep =
        buildStepByStepCalculation(
            result
        );


    result.display =
        {

            medicine:
                result.medicineName,

            condition:
                result.condition ||
                null,

            patient:
                {

                    age:
                        result.patient.age,

                    ageUnit:
                        result.patient.ageUnit,

                    weightKg:
                        result.patient.weightKg

                },

            dose:
                {

                    mg:
                        result.calculation.minDoseMg !==
                        undefined
                            ? result.calculation.minDoseMg
                            : result.calculation
                                .minDosePerAdministration ??
                              result.calculation
                                .doseMg ??
                              null,

                    maxMg:
                        result.calculation.maxDoseMg !==
                        undefined
                            ? result.calculation.maxDoseMg
                            : result.calculation
                                .maxDosePerAdministration ??
                              result.calculation
                                .doseMg ??
                              null,

                    mL:
                        result.calculation.minDoseMl ??
                        null,

                    maxMl:
                        result.calculation.maxDoseMl ??
                        null

                },

            frequency:
                getActiveFrequency(
                    result.regimen
                )

        };


    return result;

}


/* =========================================
   COMPLETE CALCULATION
========================================= */

function calculateAndPrepareDose() {

    const baseResult =
        calculateDose();


    if (
        !baseResult ||
        baseResult.success !== true
    ) {

        return baseResult;

    }


    return buildCalculationResult(
        baseResult
    );

}


/* =========================================
   GET LAST CALCULATION
========================================= */

function getLastCalculation() {

    return calculatorState
        .lastCalculation ||
        null;

}


/* =========================================
   CALCULATOR RESULT SUMMARY
========================================= */

function getCalculationSummary(
    result
) {

    if (
        !result ||
        result.success !== true
    ) {

        return null;

    }


    const display =
        result.display;


    let doseText =
        "Dose unavailable";


    if (
        display &&
        display.dose
    ) {

        const minMg =
            display.dose.mg;


        const maxMg =
            display.dose.maxMg;


        const minMl =
            display.dose.mL;


        const maxMl =
            display.dose.maxMl;


        if (
            minMg !== null &&
            minMg !== undefined
        ) {

            doseText =
                formatDoseRange(
                    minMg,
                    maxMg,
                    "mg"
                );


            if (
                minMl !== null &&
                minMl !== undefined
            ) {

                doseText +=
                    ` (${formatDoseRange(
                        minMl,
                        maxMl,
                        "mL"
                    )})`;

            }

        }

    }


    return {

        medicine:
            result.medicineName,

        condition:
            result.condition,

        dose:
            doseText,

        frequency:
            display?.frequency?.label ||
            result.regimen?.frequencyText ||
            result.regimen?.interval ||
            null

    };

}


/* =========================================
   SAFETY CHECK BEFORE DISPLAY
========================================= */

function validateCalculatedResult(
    result
) {

    if (
        !result ||
        result.success !== true
    ) {

        return {

            valid: false,

            reason:
                "No valid calculation result."

        };

    }


    if (
        !result.medicineId
    ) {

        return {

            valid: false,

            reason:
                "Medicine information is missing."

        };

    }


    if (
        !result.regimen
    ) {

        return {

            valid: false,

            reason:
                "Dosing regimen is missing."

        };

    }


    if (
        !result.patient
    ) {

        return {

            valid: false,

            reason:
                "Patient information is missing."

        };

    }


    if (
        result.calculation ===
        undefined ||
        result.calculation ===
        null
    ) {

        return {

            valid: false,

            reason:
                "Calculation data is missing."

        };

    }


    return {

        valid: true,

        reason: null

    };

}


/* =========================================
   FINAL CALCULATOR API
========================================= */

const DoseCareCalculator = {

    state:
        calculatorState,

    getSelectedMedicine,

    setSelectedMedicine,

    getMedicineConditions,

    medicineRequiresCondition,

    getConditionBasedRegimens,

    getMedicineRegimens,

    getRegimensForCondition,

    setCalculatorCondition,

    setCalculatorRegimen,

    getActiveDosingRegimen,

    getMedicineDosingType,

    isCalculatorReadyForMedicine,

    setPatientAge,

    getPatientAgeInMonths,

    getPatientAgeInYears,

    setPatientWeight,

    setMedicineConcentration,

    setConcentrationUnit,

    checkAgeRequirement,

    checkWeightRequirement,

    checkConditionRequirement,

    validateCalculatorInput,

    getDoseRange,

    getRegimenFrequency,

    getRegimenIntervalHours,

    calculateMgPerKgPerDose,

    calculateMgPerKgPerDay,

    findWeightBand,

    calculateWeightBand,

    calculateDose,

    getFrequencyOptions,

    setCalculatorFrequency,

    getActiveFrequency,

    normalizeConcentration,

    convertMgToMl,

    convertDoseRangeToMl,

    roundDoseValue,

    formatDoseNumber,

    formatDoseRange,

    getDosingFormula,

    buildStepByStepCalculation,

    buildCalculationResult,

    calculateAndPrepareDose,

    getLastCalculation,

    getCalculationSummary,

    validateCalculatedResult

};


/* =========================================
   GLOBAL ACCESS
========================================= */

if (
    typeof window !==
    "undefined"
) {

    window.DoseCareCalculator =
        DoseCareCalculator;

}

   /* =========================================
   DATABASE STATUS HELPERS
========================================= */

function getMedicineDatabaseStatus() {

    const totalMedicines =
        medicines.length;


    const configuredMedicines =
        medicines.filter(
            medicine =>
                medicine &&
                medicine.dosing &&
                medicine.dosing.configured === true
        ).length;


    const calculatorReadyMedicines =
        medicines.filter(
            medicine =>
                medicine &&
                medicine.dosing &&
                medicine.dosing.calculatorReady !== false &&
                medicine.dosing.configured === true
        ).length;


    const medicinesWithConditions =
        medicines.filter(
            medicine =>
                medicine &&
                Array.isArray(
                    medicine.conditions
                ) &&
                medicine.conditions.length > 0
        ).length;


    const medicinesWithReferences =
        medicines.filter(
            medicine =>
                medicine &&
                Array.isArray(
                    medicine.references
                ) &&
                medicine.references.length > 0
        ).length;


    const oralLiquidMedicines =
        medicines.filter(
            medicine =>
                medicine &&
                String(
                    medicine.route || ""
                ).toLowerCase() === "oral" &&
                Array.isArray(
                    medicine.dosageForms
                ) &&
                medicine.dosageForms.some(
                    form =>
                        [
                            "syrup",
                            "oral syrup",
                            "oral solution",
                            "oral suspension"
                        ].includes(
                            String(form)
                                .trim()
                                .toLowerCase()
                        )
                )
        ).length;


    return {

        totalMedicines,

        configuredMedicines,

        calculatorReadyMedicines,

        medicinesWithConditions,

        medicinesWithReferences,

        oralLiquidMedicines

    };

}


/* =========================================
   GET MEDICINES BY SYSTEM
========================================= */

function getMedicinesBySystem(system) {

    if (!system) {
        return medicines;
    }


    const searchSystem =
        String(system)
            .trim()
            .toLowerCase();


    if (!searchSystem) {
        return medicines;
    }


    return medicines.filter(
        medicine => {

            const medicineSystem =
                String(
                    medicine.system || ""
                )
                .trim()
                .toLowerCase();


            const systems =
                Array.isArray(
                    medicine.systems
                )
                    ? medicine.systems
                    : [];


            return (

                medicineSystem ===
                searchSystem ||

                systems.some(
                    item =>
                        String(item)
                            .trim()
                            .toLowerCase() ===
                        searchSystem
                )

            );

        }
    );

}


/* =========================================
   GET ALL DRUG CLASSES
========================================= */

function getAllMedicineDrugClasses() {

    const classSet =
        new Set();


    medicines.forEach(
        medicine => {

            if (
                !medicine
            ) {
                return;
            }


            if (
                Array.isArray(
                    medicine.drugClass
                )
            ) {

                medicine.drugClass.forEach(
                    drugClass => {

                        if (
                            drugClass
                        ) {

                            classSet.add(
                                String(
                                    drugClass
                                ).trim()
                            );

                        }

                    }
                );

            }

        }
    );


    return Array.from(
        classSet
    ).sort(
        (a, b) =>
            a.localeCompare(
                b
            )
    );

}


/* =========================================
   GET ALL SYSTEMS
========================================= */

function getAllMedicineSystems() {

    const systemSet =
        new Set();


    medicines.forEach(
        medicine => {

            if (!medicine) {
                return;
            }


            if (
                medicine.system
            ) {

                systemSet.add(
                    String(
                        medicine.system
                    ).trim()
                );

            }


            if (
                Array.isArray(
                    medicine.systems
                )
            ) {

                medicine.systems.forEach(
                    system => {

                        if (
                            system
                        ) {

                            systemSet.add(
                                String(
                                    system
                                ).trim()
                            );

                        }

                    }
                );

            }

        }
    );


    return Array.from(
        systemSet
    ).sort(
        (a, b) =>
            a.localeCompare(
                b
            )
    );

}


/* =========================================
   GET CONDITION DATA
========================================= */

/*
    Conditions are now treated as an
    important part of the medicine data.

    A medicine may have:

    - one condition
    - multiple conditions
    - condition-specific dosing

    The calculator can use the condition
    selected for the medicine instead of
    assuming that every medicine has one
    universal pediatric regimen.
*/

function getMedicineConditions(id) {

    const medicine =
        getMedicineById(id);


    if (!medicine) {
        return [];
    }


    if (
        Array.isArray(
            medicine.conditions
        )
    ) {

        return medicine.conditions
            .filter(
                condition =>
                    condition !== null &&
                    condition !== undefined &&
                    String(
                        condition
                    ).trim() !== ""
            )
            .map(
                condition =>
                    String(
                        condition
                    ).trim()
            );

    }


    if (
        medicine.condition
    ) {

        return [
            String(
                medicine.condition
            ).trim()
        ];

    }


    return [];

}


/* =========================================
   GET CONDITION DOSING OPTIONS
========================================= */

function getMedicineConditionDosing(id) {

    const medicine =
        getMedicineById(id);


    if (!medicine) {
        return [];
    }


    const dosing =
        medicine.dosing;


    if (
        !dosing ||
        typeof dosing !== "object"
    ) {

        return [];

    }


    if (
        !Array.isArray(
            dosing.conditionBased
        )
    ) {

        return [];

    }


    return dosing.conditionBased.filter(
        item =>
            item &&
            typeof item === "object"
    );

}


/* =========================================
   GET DOSING FOR CONDITION
========================================= */

function getMedicineDosingForCondition(
    id,
    condition
) {

    const medicine =
        getMedicineById(id);


    if (
        !medicine ||
        !medicine.dosing
    ) {

        return null;

    }


    const dosing =
        medicine.dosing;


    if (
        !condition
    ) {

        return dosing;

    }


    const searchCondition =
        String(condition)
            .trim()
            .toLowerCase();


    if (
        Array.isArray(
            dosing.conditionBased
        )
    ) {

        const conditionDosing =
            dosing.conditionBased.find(
                item => {

                    if (
                        !item ||
                        typeof item !==
                        "object"
                    ) {

                        return false;

                    }


                    const values = [

                        item.condition,

                        item.indication,

                        item.label

                    ];


                    return values.some(
                        value =>
                            value &&
                            String(value)
                                .trim()
                                .toLowerCase() ===
                            searchCondition
                    );

                }
            );


        if (
            conditionDosing
        ) {

            return conditionDosing;

        }

    }


    return null;

}


/* =========================================
   CHECK WHETHER MEDICINE REQUIRES CONDITION
========================================= */

function medicineRequiresCondition(id) {

    const medicine =
        getMedicineById(id);


    if (!medicine) {
        return false;
    }


    const dosing =
        medicine.dosing;


    if (
        !dosing ||
        typeof dosing !== "object"
    ) {

        return false;

    }


    if (
        dosing.type ===
        "condition_based"
    ) {

        return true;

    }


    if (
        Array.isArray(
            dosing.conditionBased
        ) &&
        dosing.conditionBased.length > 0
    ) {

        return true;

    }


    if (
        medicine.indicationSpecific ===
        true
    ) {

        return true;

    }


    return false;

}


/* =========================================
   CHECK MEDICINE CALCULATOR READINESS
========================================= */

function isMedicineCalculatorReady(id) {

    const medicine =
        getMedicineById(id);


    if (
        !medicine ||
        !medicine.dosing
    ) {

        return false;

    }


    if (
        medicine.dosing.configured !==
        true
    ) {

        return false;

    }


    if (
        medicine.dosing.calculatorReady ===
        false
    ) {

        return false;

    }


    return true;

}


/* =========================================
   GET CALCULATOR-READY MEDICINES
========================================= */

function getCalculatorReadyMedicines() {

    return medicines.filter(
        medicine =>
            isMedicineCalculatorReady(
                medicine.id
            )
    );

}


/* =========================================
   GET NON-CALCULATOR MEDICINES
========================================= */

function getNonCalculatorMedicines() {

    return medicines.filter(
        medicine =>
            !isMedicineCalculatorReady(
                medicine.id
            )
    );

}


/* =========================================
   GET MEDICINE CONCENTRATIONS
========================================= */

function getMedicineConcentrations(id) {

    const medicine =
        getMedicineById(id);


    if (!medicine) {
        return [];
    }


    if (
        Array.isArray(
            medicine.commonPediatricConcentrations
        )
    ) {

        return medicine
            .commonPediatricConcentrations
            .filter(
                concentration =>
                    concentration !==
                    null &&
                    concentration !==
                    undefined &&
                    String(
                        concentration
                    ).trim() !== ""
            );

    }


    if (
        Array.isArray(
            medicine.concentrations
        )
    ) {

        return medicine.concentrations;

    }


    return [];

}


/* =========================================
   PARSE CONCENTRATION
========================================= */

/*
    Converts:

        "250 mg/5 mL"

    into:

        {
            mg: 250,
            mL: 5,
            mgPerMl: 50
        }

    This helper is intentionally defensive
    because concentrations may be stored
    as strings in the medicine database.
*/

function parseMedicineConcentration(
    concentration
) {

    if (
        concentration === null ||
        concentration === undefined
    ) {

        return null;

    }


    const value =
        String(
            concentration
        )
        .trim()
        .toLowerCase()
        .replace(
            /\s+/g,
            ""
        );


    if (!value) {
        return null;
    }


    const match =
        value.match(
            /^([\d.]+)mg\/([\d.]+)ml$/
        );


    if (!match) {
        return null;
    }


    const mg =
        Number(
            match[1]
        );


    const mL =
        Number(
            match[2]
        );


    if (
        !Number.isFinite(mg) ||
        !Number.isFinite(mL) ||
        mg <= 0 ||
        mL <= 0
    ) {

        return null;

    }


    return {

        mg,

        mL,

        mgPerMl:
            mg / mL

    };

}


/* =========================================
   CONVERT MG TO ML
========================================= */

function convertMedicineMgToMl(
    doseMg,
    concentration
) {

    const dose =
        Number(
            doseMg
        );


    if (
        !Number.isFinite(dose) ||
        dose < 0
    ) {

        return null;

    }


    const parsed =
        parseMedicineConcentration(
            concentration
        );


    if (
        !parsed ||
        !parsed.mgPerMl
    ) {

        return null;

    }


    return dose /
        parsed.mgPerMl;

}


/* =========================================
   FORMAT VOLUME
========================================= */

function formatMedicineVolume(
    volume
) {

    const numericVolume =
        Number(
            volume
        );


    if (
        !Number.isFinite(
            numericVolume
        )
    ) {

        return "";

    }


    if (
        numericVolume === 0
    ) {

        return "0 mL";

    }


    if (
        numericVolume < 1
    ) {

        return (
            numericVolume
                .toFixed(2)
                .replace(
                    /0+$/,
                    ""
                )
                .replace(
                    /\.$/,
                    ""
                ) +
            " mL"
        );

    }


    return (
        numericVolume
            .toFixed(1)
            .replace(
                /\.0$/,
                ""
            ) +
        " mL"
    );

}


/* =========================================
   DATABASE SAFETY FILTER
========================================= */

/*
    DoseCare is restricted to pediatric
    oral-liquid medicines.

    This helper does NOT modify the database.

    It is used to identify records that do
    not satisfy the project's dosage-form
    restrictions.
*/

function isPediatricOralLiquidMedicine(
    medicine
) {

    if (
        !medicine ||
        typeof medicine !== "object"
    ) {

        return false;

    }


    const route =
        String(
            medicine.route || ""
        )
        .trim()
        .toLowerCase();


    if (
        route !== "oral"
    ) {

        return false;

    }


    if (
        !Array.isArray(
            medicine.dosageForms
        )
    ) {

        return false;

    }


    const allowedForms = [

        "syrup",
        "oral syrup",
        "oral solution",
        "oral suspension"

    ];


    return medicine.dosageForms.some(
        form =>
            allowedForms.includes(
                String(form)
                    .trim()
                    .toLowerCase()
            )
    );

}


/* =========================================
   GET VALID DOSECARE MEDICINES
========================================= */

function getValidDoseCareMedicines() {

    return medicines.filter(
        medicine =>
            isPediatricOralLiquidMedicine(
                medicine
            )
    );

}


/* =========================================
   GET MEDICINES REQUIRING AGE
========================================= */

function getMedicinesRequiringAge() {

    return medicines.filter(
        medicine => {

            const dosing =
                medicine &&
                medicine.dosing;


            if (
                !dosing ||
                typeof dosing !== "object"
            ) {

                return false;

            }


            return (

                dosing.minimumAgeMonths !==
                undefined ||

                dosing.minimumAgeYears !==
                undefined ||

                dosing.maximumAgeMonths !==
                undefined ||

                dosing.maximumAgeYears !==
                undefined

            );

        }
    );

}


/* =========================================
   GET MEDICINE AGE LIMITS
========================================= */

function getMedicineAgeLimits(id) {

    const medicine =
        getMedicineById(id);


    if (
        !medicine ||
        !medicine.dosing
    ) {

        return null;

    }


    const dosing =
        medicine.dosing;


    return {

        minimumAgeMonths:
            dosing.minimumAgeMonths ??
            null,

        maximumAgeMonths:
            dosing.maximumAgeMonths ??
            null,

        minimumAgeYears:
            dosing.minimumAgeYears ??
            null,

        maximumAgeYears:
            dosing.maximumAgeYears ??
            null

    };

}


/* =========================================
   NORMALIZE AGE TO MONTHS
========================================= */

function normalizeAgeToMonths(
    age,
    unit
) {

    const numericAge =
        Number(age);


    if (
        !Number.isFinite(
            numericAge
        ) ||
        numericAge < 0
    ) {

        return null;

    }


    const normalizedUnit =
        String(
            unit || ""
        )
        .trim()
        .toLowerCase();


    if (
        normalizedUnit ===
        "month" ||
        normalizedUnit ===
        "months"
    ) {

        return numericAge;

    }


    if (
        normalizedUnit ===
        "year" ||
        normalizedUnit ===
        "years"
    ) {

        return numericAge * 12;

    }


    return null;

}


/* =========================================
   CHECK AGE ELIGIBILITY
========================================= */

function isMedicineAgeEligible(
    id,
    age,
    unit
) {

    const medicine =
        getMedicineById(id);


    if (!medicine) {
        return false;
    }


    const dosing =
        medicine.dosing;


    if (
        !dosing ||
        typeof dosing !== "object"
    ) {

        return true;

    }


    const ageMonths =
        normalizeAgeToMonths(
            age,
            unit
        );


    if (
        ageMonths === null
    ) {

        return false;

    }


    if (
        dosing.minimumAgeMonths !==
        undefined &&
        ageMonths <
        Number(
            dosing.minimumAgeMonths
        )
    ) {

        return false;

    }


    if (
        dosing.maximumAgeMonths !==
        undefined &&
        ageMonths >
        Number(
            dosing.maximumAgeMonths
        )
    ) {

        return false;

    }


    if (
        dosing.minimumAgeYears !==
        undefined &&
        ageMonths <
        Number(
            dosing.minimumAgeYears
        ) * 12
    ) {

        return false;

    }


    if (
        dosing.maximumAgeYears !==
        undefined &&
        ageMonths >=
        Number(
            dosing.maximumAgeYears
        ) * 12
    ) {

        return false;

    }


    return true;

}


/* =========================================
   DATABASE INITIALIZATION
========================================= */

function initializeMedicineDatabase() {

    try {

        checkMedicineDatabase();

        console.info(
            "DoseCare medicine database initialized:",
            getMedicineDatabaseStatus()
        );

    }
    catch (error) {

        console.error(
            "DoseCare medicine database initialization error:",
            error
        );

    }

}


/* =========================================
   GLOBAL ACCESS
========================================= */

/*
    Expose the central database helpers
    when DoseCare is running in a browser.

    This does not replace existing functions.
    It only makes the unified database
    accessible to calculator and library
    modules when required.
*/

if (
    typeof window !== "undefined"
) {

    window.DoseCareMedicineDatabase = {

        medicines,

        getMedicineById,

        getMedicineByName,

        getMedicineName,

        searchMedicines,

        getAllMedicines,

        getAllMedicineConditions,

        getMedicinesByCondition,

        getMedicinesByDrugClass,

        getMedicineDosing,

        isMedicineDosingConfigured,

        getMedicineReferences,

        getAllMedicineDrugClasses,

        getAllMedicineSystems,

        getMedicinesBySystem,

        getMedicineConditions,

        getMedicineConditionDosing,

        getMedicineDosingForCondition,

        medicineRequiresCondition,

        isMedicineCalculatorReady,

        getCalculatorReadyMedicines,

        getNonCalculatorMedicines,

        getMedicineConcentrations,

        parseMedicineConcentration,

        convertMedicineMgToMl,

        formatMedicineVolume,

        isPediatricOralLiquidMedicine,

        getValidDoseCareMedicines,

        getMedicinesRequiringAge,

        getMedicineAgeLimits,

        normalizeAgeToMonths,

        isMedicineAgeEligible,

        getMedicineDatabaseStatus,

        checkMedicineDatabase,

        initializeMedicineDatabase

    };

}


/* =========================================
   END OF PART 4
========================================= */

/*
   IMPORTANT:
   The medicine database itself is populated
   by the separate system files:

   - antibiotics.js
   - respiratory.js
   - analgesics.js

   Do NOT add individual medicines here.

   Part 5 will contain the final database
   initialization / compatibility section.
*/

/* =========================================
   DOSECARE DATABASE COMPATIBILITY LAYER
========================================= */

/*
    This section keeps the central database
    compatible with the rest of DoseCare.

    Medicine system files are responsible for
    adding their own medicines to:

        medicines[]

    This file only provides the central
    database and its helper functions.
*/


/* =========================================
   SAFE DATABASE INITIALIZATION
========================================= */

function initializeDoseCareDatabase() {

    if (
        !Array.isArray(
            medicines
        )
    ) {

        console.error(
            "DoseCare database is not available."
        );

        return false;

    }


    try {

        checkMedicineDatabase();

        return true;

    }
    catch (error) {

        console.error(
            "DoseCare database validation failed:",
            error
        );

        return false;

    }

}


/* =========================================
   DATABASE READY CHECK
========================================= */

function isDoseCareDatabaseReady() {

    return (

        Array.isArray(
            medicines
        ) &&

        medicines.length >= 0

    );

}


/* =========================================
   GET DATABASE SUMMARY
========================================= */

function getDoseCareDatabaseSummary() {

    const status =
        getMedicineDatabaseStatus();


    return {

        total:
            status.totalMedicines,

        configured:
            status.configuredMedicines,

        calculatorReady:
            status.calculatorReadyMedicines,

        withConditions:
            status.medicinesWithConditions,

        withReferences:
            status.medicinesWithReferences,

        validOralLiquid:
            status.oralLiquidMedicines

    };

}


/* =========================================
   FINAL DATABASE VALIDATION
========================================= */

/*
    This validation runs after the individual
    medicine-system files have populated the
    central database.

    It does not remove or modify medicines.
*/

function finalizeDoseCareDatabase() {

    if (
        !isDoseCareDatabaseReady()
    ) {

        console.error(
            "DoseCare database is not ready."
        );

        return false;

    }


    checkMedicineDatabase();


    console.info(
        "DoseCare medicine database ready.",
        getDoseCareDatabaseSummary()
    );


    return true;

}


/* =========================================
   BROWSER GLOBAL API
========================================= */

if (
    typeof window !== "undefined"
) {

    window.DoseCareMedicineDatabase = {

        ...window.DoseCareMedicineDatabase,

        initializeDoseCareDatabase,

        isDoseCareDatabaseReady,

        getDoseCareDatabaseSummary,

        finalizeDoseCareDatabase

    };

}


/* =========================================
   OPTIONAL AUTO VALIDATION
========================================= */

/*
    Do NOT execute database initialization
    immediately here.

    The individual medicine files may still
    need to load first.

    The database should therefore be finalized
    after:

        1. medicine.js
        2. antibiotics.js
        3. respiratory.js
        4. analgesics.js

    have been loaded.
*/


if (
    typeof window !== "undefined"
) {

    window.addEventListener(
    "load",
    () => {

        try {

            finalizeDoseCareDatabase();

            populateMedicineSelect();

        }
        catch (error) {

            console.error(
                "DoseCare calculator initialization error:",
                error
            );

        }

    }
);


/* =========================================
   BACKWARD COMPATIBILITY
========================================= */

/*
    Existing DoseCare code may call these
    functions directly.

    Keep the original function names
    available globally without creating
    duplicate database arrays.
*/

if (
    typeof window !== "undefined"
) {

    window.getMedicineById =
        getMedicineById;

    window.getMedicineByName =
        getMedicineByName;

    window.getMedicineName =
        getMedicineName;

    window.searchMedicines =
        searchMedicines;

    window.getAllMedicines =
        getAllMedicines;

    window.getAllMedicineConditions =
        getAllMedicineConditions;

    window.getMedicinesByCondition =
        getMedicinesByCondition;

    window.getMedicinesByDrugClass =
        getMedicinesByDrugClass;

    window.getMedicineDosing =
        getMedicineDosing;

    window.isMedicineDosingConfigured =
        isMedicineDosingConfigured;

    window.getMedicineReferences =
        getMedicineReferences;

    window.getMedicineConditions =
        getMedicineConditions;

    window.getMedicineConditionDosing =
        getMedicineConditionDosing;

    window.getMedicineDosingForCondition =
        getMedicineDosingForCondition;

    window.medicineRequiresCondition =
        medicineRequiresCondition;

    window.isMedicineCalculatorReady =
        isMedicineCalculatorReady;

    window.getCalculatorReadyMedicines =
        getCalculatorReadyMedicines;

    window.getMedicineConcentrations =
        getMedicineConcentrations;

    window.parseMedicineConcentration =
        parseMedicineConcentration;

    window.convertMedicineMgToMl =
        convertMedicineMgToMl;

    window.formatMedicineVolume =
        formatMedicineVolume;

    window.isPediatricOralLiquidMedicine =
        isPediatricOralLiquidMedicine;

    window.getValidDoseCareMedicines =
        getValidDoseCareMedicines;

    window.normalizeAgeToMonths =
        normalizeAgeToMonths;

    window.isMedicineAgeEligible =
        isMedicineAgeEligible;

}


/* =========================================
   END OF UNIFIED MEDICINE DATABASE
========================================= */

/*
    DoseCare
    Unified Medicine Database

    Database responsibilities:

    ✓ Central medicines[] array
    ✓ Medicine lookup
    ✓ Medicine search
    ✓ Condition lookup
    ✓ Condition-specific dosing lookup
    ✓ Drug-class filtering
    ✓ System filtering
    ✓ Dosing configuration checks
    ✓ Calculator readiness checks
    ✓ Concentration parsing
    ✓ mg → mL conversion
    ✓ Age normalization
    ✓ Age eligibility checks
    ✓ Favorites support
    ✓ Database validation
    ✓ Duplicate ID detection
    ✓ Oral-liquid safety filtering

    Medicine responsibilities:

    ✓ Individual medicine data
    ✓ Pediatric indications
    ✓ Pediatric dosing
    ✓ Conditions
    ✓ Concentrations
    ✓ Contraindications
    ✓ Precautions
    ✓ Adverse effects
    ✓ References

    Medicine data must remain inside the
    appropriate system files.

    DO NOT add individual medicines here.
*/
