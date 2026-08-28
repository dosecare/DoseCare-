/* =========================================
   DoseCare
   UNIFIED MEDICINE DATABASE
========================================= */
/* =========================================
   CENTRAL MEDICINE DATABASE
========================================= */
/*
    IMPORTANT
    -----------------------------------------
    This file is the central database layer.
    Medicine data must NOT be written directly
    into this file.
    Individual medicine-system files should
    register their medicines through:
        registerMedicines([...]);
    Example:
        registerMedicines([
            medicineObject
        ]);
    Supported system files may include:
        medicines/analgesics.js
        medicines/antibiotics.js
        medicines/respiratory.js
        medicines/gastrointestinal.js
    A separate database loader can load these
    files and call registerMedicines().
    DoseCare scope:
    Pediatric oral-liquid medicines ONLY.
    Allowed dosage forms:
    - Oral solution
    - Oral suspension
    - Syrup
    NOT allowed:
    - Tablets
    - Capsules
    - Chewables
    - Injections
    - IV / IM
    - Suppositories
    - Other non-oral dosage forms
========================================= */
const medicines = [];
/* =========================================
   REGISTER MEDICINES
========================================= */
/*
    Central registration function.
    This replaces direct:
        medicines.push(...)
    from medicine-system files.
    It also prevents duplicate IDs.
*/
function registerMedicines(medicineList) {
    if (!Array.isArray(medicineList)) {
        console.warn(
            "DoseCare: registerMedicines() expects an array."
        );
        return [];
    }
    const registered = [];
    medicineList.forEach(
        medicine => {
            if (
                !medicine ||
                typeof medicine !== "object"
            ) {
                console.warn(
                    "DoseCare: Invalid medicine object skipped.",
                    medicine
                );
                return;
            }
            if (!medicine.id) {
                console.warn(
                    "DoseCare: Medicine without ID was skipped.",
                    medicine
                );
                return;
            }
            const existingMedicine =
                medicines.find(
                    existing =>
                        String(existing.id) ===
                        String(medicine.id)
                );
            if (existingMedicine) {
                console.warn(
                    `DoseCare: Duplicate medicine ID "${medicine.id}" skipped.`
                );
                return;
            }
            medicines.push(medicine);
            registered.push(medicine);
        }
    );
    return registered;
}
/* =========================================
   GET MEDICINE BY ID
========================================= */
function getMedicineById(id) {
    if (!id) {
        return null;
    }
    return medicines.find(
        medicine =>
            String(medicine.id) ===
            String(id)
    ) || null;
}
/* =========================================
   GET MEDICINE BY GENERIC NAME
========================================= */
function getMedicineByName(name) {
    if (!name) {
        return null;
    }
    const search =
        String(name)
            .trim()
            .toLowerCase();
    if (!search) {
        return null;
    }
    return medicines.find(
        medicine =>
            String(
                medicine.genericName || ""
            )
            .trim()
            .toLowerCase() === search
    ) || null;
}
/* =========================================
   GET MEDICINE NAME
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
/* =========================================
   SEARCH MEDICINES
========================================= */
function searchMedicines(searchTerm) {
    if (!searchTerm) {
        return medicines;
    }
    const search =
        String(searchTerm)
            .trim()
            .toLowerCase();
    if (!search) {
        return medicines;
    }
    return medicines.filter(
        medicine => {
            const genericName =
                String(
                    medicine.genericName || ""
                )
                .toLowerCase();
            const medicineName =
                String(
                    medicine.name || ""
                )
                .toLowerCase();
            const brands =
                Array.isArray(
                    medicine.brandNames
                )
                    ? medicine.brandNames
                    : [];
            const drugClass =
                Array.isArray(
                    medicine.drugClass
                )
                    ? medicine.drugClass.join(" ")
                    : String(
                        medicine.drugClass || ""
                    );
            const className =
                String(
                    medicine.class || ""
                )
                .toLowerCase();
            const condition =
                String(
                    medicine.condition || ""
                )
                .toLowerCase();
            const conditions =
                Array.isArray(
                    medicine.conditions
                )
                    ? medicine.conditions.join(" ")
                    : "";
            const indications =
                String(
                    medicine.indications || ""
                )
                .toLowerCase();
            const brandMatch =
                brands.some(
                    brand =>
                        String(brand)
                            .toLowerCase()
                            .includes(search)
                );
            return (
                genericName.includes(search) ||
                medicineName.includes(search) ||
                brandMatch ||
                drugClass
                    .toLowerCase()
                    .includes(search) ||
                className.includes(search) ||
                condition.includes(search) ||
                conditions
                    .toLowerCase()
                    .includes(search) ||
                indications.includes(search)
            );
        }
    );
}
/* =========================================
   GET ALL MEDICINES
========================================= */
function getAllMedicines() {
    return medicines;
}
/* =========================================
   GET ALL MEDICINE CONDITIONS
========================================= */
function getAllMedicineConditions() {
    const conditionSet =
        new Set();
    medicines.forEach(
        medicine => {
            /*
                New database structure:
                conditions: [...]
            */
            if (
                Array.isArray(
                    medicine.conditions
                )
            ) {
                medicine.conditions.forEach(
                    condition => {
                        if (condition) {
                            conditionSet.add(
                                String(condition)
                                    .trim()
                            );
                        }
                    }
                );
            }
            /*
                Backward compatibility:
                condition: "..."
            */
            if (
                medicine.condition &&
                typeof medicine.condition ===
                    "string"
            ) {
                conditionSet.add(
                    medicine.condition.trim()
                );
            }
        }
    );
    return Array.from(
        conditionSet
    )
    .filter(Boolean)
    .sort(
        (a, b) =>
            a.localeCompare(
                b,
                undefined,
                {
                    sensitivity: "base"
                }
            )
    );
}
/* =========================================
   GET CONDITIONS FOR ONE MEDICINE
========================================= */
function getMedicineConditions(id) {
    const medicine =
        getMedicineById(id);
    if (!medicine) {
        return [];
    }
    const conditionSet =
        new Set();
    /*
        Preferred structure:
        conditions: [...]
    */
    if (
        Array.isArray(
            medicine.conditions
        )
    ) {
        medicine.conditions.forEach(
            condition => {
                if (condition) {
                    conditionSet.add(
                        String(condition)
                            .trim()
                    );
                }
            }
        );
    }
    /*
        Backward compatibility:
        condition: "..."
    */
    if (
        medicine.condition &&
        typeof medicine.condition ===
            "string"
    ) {
        conditionSet.add(
            medicine.condition.trim()
        );
    }
    return Array.from(
        conditionSet
    )
    .filter(Boolean)
    .sort(
        (a, b) =>
            a.localeCompare(
                b,
                undefined,
                {
                    sensitivity: "base"
                }
            )
    );
}
/* =========================================
   CHECK IF MEDICINE REQUIRES CONDITION
========================================= */
/*
    A medicine is considered condition-dependent
    when its dosing configuration explicitly uses:
        type: "condition_based"
    OR contains a conditionBased array.
*/
function medicineRequiresCondition(id) {
    const medicine =
        getMedicineById(id);
    if (!medicine || !medicine.dosing) {
        return false;
    }
    const dosing =
        medicine.dosing;
    return (
        dosing.type ===
            "condition_based"
        ||
        Array.isArray(
            dosing.conditionBased
        )
    );
}
/* =========================================
   GET MEDICINES BY CONDITION
========================================= */
function getMedicinesByCondition(condition) {
    if (
        !condition ||
        String(condition)
            .trim()
            .toLowerCase() === "all"
    ) {
        return medicines;
    }
    const searchCondition =
        String(condition)
            .trim()
            .toLowerCase();
    return medicines.filter(
        medicine => {
            const medicineConditions =
                getMedicineConditions(
                    medicine.id
                );
            return medicineConditions.some(
                item =>
                    String(item)
                        .trim()
                        .toLowerCase() ===
                    searchCondition
            );
        }
    );
}
/* =========================================
   GET MEDICINES BY DRUG CLASS
========================================= */
function getMedicinesByDrugClass(drugClass) {
    if (!drugClass) {
        return medicines;
    }
    const searchClass =
        String(drugClass)
            .trim()
            .toLowerCase();
    return medicines.filter(
        medicine => {
            if (
                !Array.isArray(
                    medicine.drugClass
                )
            ) {
                return false;
            }
            return medicine.drugClass.some(
                item =>
                    String(item)
                        .trim()
                        .toLowerCase() ===
                    searchClass
            );
        }
    );
}
/* =========================================
   GET MEDICINE DOSING
========================================= */
function getMedicineDosing(id) {
    const medicine =
        getMedicineById(id);
    if (!medicine) {
        return null;
    }
    return medicine.dosing || null;
}
/* =========================================
   CHECK DOSING CONFIGURATION
========================================= */
function isMedicineDosingConfigured(id) {
    const dosing =
        getMedicineDosing(id);
    return Boolean(
        dosing &&
        dosing.configured === true
    );
}
/* =========================================
   GET DOSING TYPE
========================================= */
function getMedicineDosingType(id) {
    const dosing =
        getMedicineDosing(id);
    if (!dosing) {
        return null;
    }
    return dosing.type || null;
}
/* =========================================
   CHECK CONDITION-BASED DOSING
========================================= */
function hasConditionBasedDosing(id) {
    const dosing =
        getMedicineDosing(id);
    if (!dosing) {
        return false;
    }
    return (
        dosing.type ===
            "condition_based"
        ||
        Array.isArray(
            dosing.conditionBased
        )
    );
}
/* =========================================
   CHECK CALCULATOR READINESS
========================================= */
/*
    Some medicines may intentionally exist
    in the database but NOT be calculator-ready.
    Examples:
        fixed_dose
        weight_band
    until the corresponding engine exists.
*/
function isMedicineCalculatorReady(id) {
    const medicine =
        getMedicineById(id);
    if (!medicine || !medicine.dosing) {
        return false;
    }
    const dosing =
        medicine.dosing;
    if (
        dosing.calculatorReady === false
    ) {
        return false;
    }
    return (
        dosing.configured === true
    );
}
/* =========================================
   GET MEDICINE REFERENCES
========================================= */
function getMedicineReferences(id) {
    const medicine =
        getMedicineById(id);
    if (!medicine) {
        return [];
    }
    return Array.isArray(
        medicine.references
    )
        ? medicine.references
        : [];
}
/* =========================================
   FAVORITES STORAGE
========================================= */
const FAVORITES_STORAGE_KEY =
    "dosecareFavorites";
/* =========================================
   GET FAVORITES
========================================= */
function getFavoriteMedicines() {
    const saved =
        localStorage.getItem(
            FAVORITES_STORAGE_KEY
        );
    if (!saved) {
        return [];
    }
    try {
        const favorites =
            JSON.parse(saved);
        return Array.isArray(
            favorites
        )
            ? favorites
            : [];
    }
    catch (error) {
        console.error(
            "Favorites loading error:",
            error
        );
        return [];
    }
}
/* =========================================
   SAVE FAVORITES
========================================= */
function saveFavoriteMedicines(favorites) {
    if (!Array.isArray(favorites)) {
        return;
    }
    localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(favorites)
    );
}
/* =========================================
   CHECK FAVORITE
========================================= */
function isFavoriteMedicine(id) {
    const favorites =
        getFavoriteMedicines();
    return favorites.some(
        medicine =>
            String(medicine.id) ===
            String(id)
    );
}
/* =========================================
   TOGGLE FAVORITE
========================================= */
function toggleFavoriteMedicine(id) {
    const medicine =
        getMedicineById(id);
    if (!medicine) {
        return false;
    }
    let favorites =
        getFavoriteMedicines();
    const existingIndex =
        favorites.findIndex(
            item =>
                String(item.id) ===
                String(id)
        );
    /* -------------------------------------
       REMOVE
    ------------------------------------- */
    if (existingIndex !== -1) {
        favorites.splice(
            existingIndex,
            1
        );
        saveFavoriteMedicines(
            favorites
        );
        return false;
    }
    /* -------------------------------------
       ADD
    ------------------------------------- */
    favorites.push({
        id:
            medicine.id,
        name:
            medicine.genericName ||
            medicine.name,
        genericName:
            medicine.genericName ||
            medicine.name,
        class:
            medicine.class || "",
        drugClass:
            Array.isArray(
                medicine.drugClass
            )
                ? medicine.drugClass
                : [],
        condition:
            medicine.condition || "",
        conditions:
            Array.isArray(
                medicine.conditions
            )
                ? medicine.conditions
                : []
    });
    saveFavoriteMedicines(
        favorites
    );
    return true;
}
/* =========================================
   UPDATE FAVORITE BUTTONS
========================================= */
function updateFavoriteButtons() {
    document
        .querySelectorAll(
            ".favorite-button"
        )
        .forEach(
            button => {
                const id =
                    button.dataset.id;
                const active =
                    isFavoriteMedicine(id);
                button.classList.toggle(
                    "active",
                    active
                );
                button.textContent =
                    active
                        ? "★"
                        : "☆";
                button.setAttribute(
                    "aria-label",
                    active
                        ? "Remove from favorites"
                        : "Add to favorites"
                );
            }
        );
}
/* =========================================
   INITIALIZE FAVORITE BUTTONS
========================================= */
function initializeFavoriteButtons() {
    document
        .querySelectorAll(
            ".favorite-button"
        )
        .forEach(
            button => {
                if (
                    button.dataset.favoriteReady ===
                    "true"
                ) {
                    return;
                }
                button.dataset.favoriteReady =
                    "true";
                button.addEventListener(
                    "click",
                    event => {
                        event.preventDefault();
                        event.stopPropagation();
                        const id =
                            button.dataset.id;
                        toggleFavoriteMedicine(
                            id
                        );
                        updateFavoriteButtons();
                    }
                );
            }
        );
    updateFavoriteButtons();
}
/* =========================================
   ORAL-LIQUID FORMULATION CHECK
========================================= */
function isAllowedOralLiquidForm(form) {
    if (!form) {
        return false;
    }
    const normalized =
        String(form)
            .trim()
            .toLowerCase();
    return (
        normalized ===
            "oral solution"
        ||
        normalized ===
            "oral suspension"
        ||
        normalized ===
            "syrup"
    );
}
/* =========================================
   VALIDATE MEDICINE FORMULATIONS
========================================= */
function validateMedicineFormulations(medicine) {
    if (!medicine) {
        return false;
    }
    /*
        Some older medicine files use:
            dosageForms: [...]
        while the newer schema uses:
            formulations: [
                {
                    form: "oral suspension"
                }
            ]
    */
    if (
        Array.isArray(
            medicine.formulations
        )
    ) {
        medicine.formulations.forEach(
            formulation => {
                if (
                    !formulation ||
                    !isAllowedOralLiquidForm(
                        formulation.form
                    )
                ) {
                    console.warn(
                        `DoseCare: "${medicine.genericName || medicine.id}" contains a non-oral-liquid formulation.`
                    );
                }
            }
        );
    }
    if (
        Array.isArray(
            medicine.dosageForms
        )
    ) {
        medicine.dosageForms.forEach(
            dosageForm => {
                if (
                    !isAllowedOralLiquidForm(
                        dosageForm
                    )
                ) {
                    console.warn(
                        `DoseCare: "${medicine.genericName || medicine.id}" contains a non-oral-liquid dosage form.`
                    );
                }
            }
        );
    }
    return true;
}
/* =========================================
   DATABASE VALIDATION
========================================= */
function validateMedicineDatabase() {
    const requiredFields = [
        "id",
        "genericName",
        "name",
        "brandNames",
        "drugClass",
        "class",
        "conditions",
        "route",
        "indications",
        "moa",
        "pediatric",
        "dosing",
        "references"
    ];
    medicines.forEach(
        medicine => {
            /* ---------------------------------
               REQUIRED FIELDS
            --------------------------------- */
            requiredFields.forEach(
                field => {
                    if (
                        medicine[field] ===
                        undefined
                    ) {
                        console.warn(
                            `Medicine "${medicine.genericName || medicine.id}" is missing "${field}".`
                        );
                    }
                }
            );
            /* ---------------------------------
               ID
            --------------------------------- */
            if (
                !medicine.id
            ) {
                console.warn(
                    "Medicine is missing a valid ID."
                );
            }
            /* ---------------------------------
               CONDITIONS
            --------------------------------- */
            if (
                !Array.isArray(
                    medicine.conditions
                )
            ) {
                /*
                    condition is retained only
                    for backward compatibility.
                */
                if (
                    !medicine.condition
                ) {
                    console.warn(
                        `Medicine "${medicine.genericName}" has no conditions data.`
                    );
                }
            }
            /* ---------------------------------
               BRAND NAMES
            --------------------------------- */
            if (
                !Array.isArray(
                    medicine.brandNames
                )
            ) {
                console.warn(
                    `Medicine "${medicine.genericName}" has invalid brandNames data.`
                );
            }
            /* ---------------------------------
               DRUG CLASS
            --------------------------------- */
            if (
                !Array.isArray(
                    medicine.drugClass
                )
            ) {
                console.warn(
                    `Medicine "${medicine.genericName}" has invalid drugClass data.`
                );
            }
            /* ---------------------------------
               ROUTE
            --------------------------------- */
            if (
                medicine.route &&
                String(
                    medicine.route
                )
                .trim()
                .toLowerCase() !==
                    "oral"
            ) {
                console.warn(
                    `Medicine "${medicine.genericName}" has a non-oral route.`
                );
            }
            /* ---------------------------------
               FORMULATIONS
            --------------------------------- */
            validateMedicineFormulations(
                medicine
            );
            /* ---------------------------------
               DOSING
            --------------------------------- */
            if (
                !medicine.dosing ||
                typeof medicine.dosing !==
                    "object"
            ) {
                console.warn(
                    `Medicine "${medicine.genericName}" has invalid dosing configuration.`
                );
                return;
            }
            /* ---------------------------------
               DOSING TYPE
            --------------------------------- */
            const validDosingTypes = [
                "mg_per_kg_per_dose",
                "mg_per_kg_per_day",
                "condition_based",
                "fixed_dose",
                "weight_band"
            ];
            if (
                medicine.dosing.type &&
                !validDosingTypes.includes(
                    medicine.dosing.type
                )
            ) {
                console.warn(
                    `Medicine "${medicine.genericName}" has unknown dosing type "${medicine.dosing.type}".`
                );
            }
            /* ---------------------------------
               CONFIGURATION
            --------------------------------- */
            /*
                Not every medicine needs to be
                calculator-ready immediately.
                Therefore configured:false is
                allowed and is NOT treated as a
                database error.
            */
            if (
                medicine.dosing.configured ===
                undefined
            ) {
                console.warn(
                    `Medicine "${medicine.genericName}" does not specify dosing.configured.`
                );
            }
            /* ---------------------------------
               CONDITION-BASED DOSING
            --------------------------------- */
            if (
                medicine.dosing.type ===
                    "condition_based"
            ) {
                if (
                    !Array.isArray(
                        medicine.dosing.conditionBased
                    )
                ) {
                    console.warn(
                        `Medicine "${medicine.genericName}" is condition-based but has no conditionBased regimen array.`
                    );
                }
            }
            /* ---------------------------------
               REFERENCES
            --------------------------------- */
            if (
                !Array.isArray(
                    medicine.references
                )
            ) {
                console.warn(
                    `Medicine "${medicine.genericName}" has invalid references data.`
                );
            }
        }
    );
}
/* =========================================
   CHECK DUPLICATE MEDICINE IDS
========================================= */
function checkDuplicateMedicineIds() {
    const ids =
        new Set();
    medicines.forEach(
        medicine => {
            if (!medicine.id) {
                return;
            }
            const normalizedId =
                String(
                    medicine.id
                )
                .trim()
                .toLowerCase();
            if (
                ids.has(
                    normalizedId
                )
            ) {
                console.error(
                    `Duplicate medicine ID found: ${medicine.id}`
                );
            }
            ids.add(
                normalizedId
            );
        }
    );
}
/* =========================================
   CHECK DATABASE
========================================= */
function checkMedicineDatabase() {
    checkDuplicateMedicineIds();
    validateMedicineDatabase();
}
/* =========================================
   DATABASE STATUS
========================================= */
function getMedicineDatabaseStatus() {
    return {
        totalMedicines:
            medicines.length,
        configuredMedicines:
            medicines.filter(
                medicine =>
                    medicine.dosing &&
                    medicine.dosing.configured ===
                        true
            ).length,
        calculatorReadyMedicines:
            medicines.filter(
                medicine =>
                    isMedicineCalculatorReady(
                        medicine.id
                    )
            ).length,
        conditionBasedMedicines:
            medicines.filter(
                medicine =>
                    hasConditionBasedDosing(
                        medicine.id
                    )
            ).length,
        medicinesWithReferences:
            medicines.filter(
                medicine =>
                    Array.isArray(
                        medicine.references
                    ) &&
                    medicine.references.length > 0
            ).length
    };
}
/* =========================================
   OPTIONAL GLOBAL DATABASE ACCESS
========================================= */
/*
    Keeps the central database accessible
    to the loader and other scripts without
    exposing medicine data as separate globals.
    Existing code can continue using:
        medicines
    and new loader code can use:
        DoseCareDatabase.registerMedicines(...)
*/
window.DoseCareDatabase = {
    medicines,
    registerMedicines,
    getMedicineById,
    getMedicineByName,
    getMedicineName,
    searchMedicines,
    getAllMedicines,
    getAllMedicineConditions,
    getMedicineConditions,
    medicineRequiresCondition,
    getMedicinesByCondition,
    getMedicinesByDrugClass,
    getMedicineDosing,
    isMedicineDosingConfigured,
    getMedicineDosingType,
    hasConditionBasedDosing,
    isMedicineCalculatorReady,
    getMedicineReferences,
    validateMedicineDatabase,
    checkDuplicateMedicineIds,
    checkMedicineDatabase,
    getMedicineDatabaseStatus
};
