/* =========================================
   DoseCare
   Medicine Library
========================================= */


/* =========================================
   DOM
========================================= */

const medicineGrid =
    document.getElementById(
        "medicine-grid"
    );


const searchInput =
    document.getElementById(
        "medicine-library-search"
    );


const classFilter =
    document.getElementById(
        "medicine-class-filter"
    );


const conditionFilter =
    document.getElementById(
        "medicine-condition-filter"
    );


const medicineCount =
    document.getElementById(
        "medicine-count"
    );


const emptyState =
    document.getElementById(
        "empty-state"
    );


const modal =
    document.getElementById(
        "medicine-modal"
    );


const modalOverlay =
    document.getElementById(
        "modal-overlay"
    );


const closeModal =
    document.getElementById(
        "close-modal"
    );


const detailsContent =
    document.getElementById(
        "medicine-details-content"
    );


const backButton =
    document.getElementById(
        "back-button"
    );


/* =========================================
   PARTICLES
========================================= */

const particles =
    document.getElementById(
        "particles"
    );


if (particles) {

    for (let i = 0; i < 25; i++) {

        const particle =
            document.createElement(
                "span"
            );


        particle.className =
            "particle";


        particle.style.left =
            `${Math.random() * 100}%`;


        particle.style.top =
            `${Math.random() * 100}%`;


        particle.style.animationDelay =
            `${Math.random() * 8}s`;


        particles.appendChild(
            particle
        );

    }

}


/* =========================================
   SAFE ARRAY HELPER
========================================= */

function toArray(value) {

    if (Array.isArray(value)) {

        return value;

    }


    if (
        typeof value ===
        "string"
    ) {

        return value
            .split("·")
            .map(
                item =>
                    item.trim()
            )
            .filter(Boolean);

    }


    return [];

}


/* =========================================
   SAFE TEXT HELPER
========================================= */

function getText(
    value,
    fallback = ""
) {

    if (
        value === undefined ||
        value === null
    ) {

        return fallback;

    }


    if (
        Array.isArray(value)
    ) {

        return value
            .join(" · ");

    }


    return String(value);

}


/* =========================================
   FILTER DATA
========================================= */

function initializeFilters() {

    if (
        !classFilter ||
        !conditionFilter
    ) {

        return;

    }


    const classes =
        new Set();


    const conditions =
        new Set();


    if (
        !Array.isArray(
            medicines
        )
    ) {

        return;

    }


    medicines.forEach(
        (medicine) => {

            const drugClasses =
                toArray(
                    medicine.drugClass
                );


            drugClasses.forEach(
                (drugClass) => {

                    classes.add(
                        drugClass
                    );

                }
            );


            const medicineConditions =
                toArray(
                    medicine.conditions
                );


            medicineConditions.forEach(
                (condition) => {

                    conditions.add(
                        condition
                    );

                }
            );

        }
    );


    Array.from(classes)
        .sort()
        .forEach(
            (drugClass) => {

                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    drugClass;


                option.textContent =
                    drugClass;


                classFilter.appendChild(
                    option
                );

            }
        );


    Array.from(conditions)
        .sort()
        .forEach(
            (condition) => {

                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    condition;


                option.textContent =
                    formatName(
                        condition
                    );


                conditionFilter.appendChild(
                    option
                );

            }
        );

}


/* =========================================
   FORMAT NAME
========================================= */

function formatName(
    text
) {

    return String(text)
        .split(" ")
        .map(
            word =>
                word.charAt(0).toUpperCase() +
                word.slice(1)
        )
        .join(" ");

}


/* =========================================
   FILTER MEDICINES
========================================= */

function getFilteredMedicines() {

    const search =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const selectedClass =
        classFilter
            ? classFilter.value
            : "";


    const selectedCondition =
        conditionFilter
            ? conditionFilter.value
            : "";


    if (
        !Array.isArray(
            medicines
        )
    ) {

        return [];

    }


    return medicines.filter(
        (medicine) => {

            const name =
                getText(
                    medicine.genericName ||
                    medicine.name
                ).toLowerCase();


            const brands =
                toArray(
                    medicine.brandNames
                );


            const brandMatch =
                brands.some(
                    brand =>
                        brand
                            .toLowerCase()
                            .includes(
                                search
                            )
                );


            const matchesSearch =
                !search ||
                name.includes(
                    search
                ) ||
                brandMatch;


            const drugClasses =
                toArray(
                    medicine.drugClass
                );


            const matchesClass =
                !selectedClass ||
                drugClasses.includes(
                    selectedClass
                );


            const conditions =
                toArray(
                    medicine.conditions
                );


            const matchesCondition =
                !selectedCondition ||
                conditions.includes(
                    selectedCondition
                );


            return (
                matchesSearch &&
                matchesClass &&
                matchesCondition
            );

        }
    );

}


/* =========================================
   RENDER MEDICINES
========================================= */

function renderMedicines() {

    if (
        !medicineGrid
    ) {

        return;

    }


    const filtered =
        getFilteredMedicines();


    medicineGrid.innerHTML =
        "";


    if (
        medicineCount
    ) {

        medicineCount.textContent =
            `${filtered.length} medicine${
                filtered.length === 1
                    ? ""
                    : "s"
            }`;

    }


    if (
        !filtered.length
    ) {

        if (
            emptyState
        ) {

            emptyState.style.display =
                "block";

        }

        return;

    }


    if (
        emptyState
    ) {

        emptyState.style.display =
            "none";

    }


    filtered.forEach(
        (medicine) => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "medicine-card";


            const classes =
                toArray(
                    medicine.drugClass
                )
                .slice(0, 2)
                .join(" · ");


            const medicineName =
                getText(
                    medicine.genericName ||
                    medicine.name,
                    "Unknown Medicine"
                );


            const indicationText =
                getText(
                    medicine.indications ||
                    medicine.condition,
                    "Medicine information"
                );


            card.innerHTML = `

                <div class="medicine-card-top">

                    <div class="medicine-symbol">
                        +
                    </div>

                    <span class="medicine-category">
                        ${
                            classes ||
                            "Medicine"
                        }
                    </span>

                </div>


                <h3>
                    ${medicineName}
                </h3>


                <p class="medicine-indication">
                    ${indicationText}
                </p>


                <button
                    class="view-medicine"
                    type="button"
                >
                    View information
                    <span>→</span>
                </button>

            `;


            const viewButton =
                card.querySelector(
                    ".view-medicine"
                );


            if (
                viewButton
            ) {

                viewButton.addEventListener(
                    "click",
                    () => {

                        openMedicineDetails(
                            medicine
                        );

                    }
                );

            }


            medicineGrid.appendChild(
                card
            );

        }
    );

}


/* =========================================
   OPEN MEDICINE DETAILS
========================================= */

function openMedicineDetails(
    medicine
) {

    if (
        !detailsContent ||
        !modal
    ) {

        return;

    }


    const medicineName =
        getText(
            medicine.genericName ||
            medicine.name,
            "Unknown Medicine"
        );


    const drugClasses =
        toArray(
            medicine.drugClass
        );


    const indications =
        toArray(
            medicine.indications
        );


    if (
        !indications.length &&
        medicine.condition
    ) {

        indications.push(
            medicine.condition
        );

    }


    const dosageForms =
        toArray(
            medicine.dosageForms
        );


    const routes =
        toArray(
            medicine.routes ||
            medicine.route
        );


    const contraindications =
        toArray(
            medicine.contraindications
        );


    const precautions =
        toArray(
            medicine.precautions
        );


    const adverseEffects =
        toArray(
            medicine.adverseEffects ||
            medicine.sideEffects
        );


    const interactions =
        toArray(
            medicine.interactions
        );


    const references =
        toArray(
            medicine.references
        );


    const mechanism =
        getText(
            medicine.mechanismOfAction ||
            medicine.moa,
            "Information not available yet."
        );


    const pediatricNotes =
        getText(
            medicine.pediatricNotes ||
            medicine.pediatric,
            "Pediatric information will be added after verification."
        );


    const referenceHTML =
        references.length
            ? references
                .map(
                    (reference) => {

                        if (
                            typeof reference ===
                            "object"
                        ) {

                            const organization =
                                reference.organization ||
                                "";


                            const title =
                                reference.title ||
                                "";


                            const year =
                                reference.year
                                    ? ` (${reference.year})`
                                    : "";


                            const url =
                                reference.url ||
                                "";


                            if (url) {

                                return `
                                    <li>
                                        ${
                                            organization
                                                ? `<strong>${organization}</strong> — `
                                                : ""
                                        }
                                        ${
                                            title ||
                                            "Reference"
                                        }
                                        ${year}

                                        <br>

                                        <a
                                            href="${url}"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            View source
                                        </a>
                                    </li>
                                `;

                            }


                            return `
                                <li>
                                    ${
                                        organization
                                            ? `<strong>${organization}</strong> — `
                                            : ""
                                    }
                                    ${
                                        title ||
                                        "Reference"
                                    }
                                    ${year}
                                </li>
                            `;

                        }


                        return `
                            <li>
                                ${reference}
                            </li>
                        `;

                    }
                )
                .join("")
            : `
                <li>
                    Verified references will be added.
                </li>
            `;


    detailsContent.innerHTML = `

        <div class="details-header">

            <span class="section-label">
                MEDICINE INFORMATION
            </span>

            <h2>
                ${medicineName}
            </h2>

            <p>
                ${
                    drugClasses.length
                        ? drugClasses.join(" · ")
                        : "Medicine"
                }
            </p>

        </div>


        <div class="details-section">

            <h3>
                Mechanism of Action
            </h3>

            <p>
                ${mechanism}
            </p>

        </div>


        <div class="details-section">

            <h3>
                Indications
            </h3>

            ${
                indications.length
                    ? `
                        <ul>
                            ${
                                indications
                                    .map(
                                        item =>
                                            `<li>${item}</li>`
                                    )
                                    .join("")
                            }
                        </ul>
                    `
                    : `
                        <p>
                            Information not available yet.
                        </p>
                    `
            }

        </div>


        <div class="details-section">

            <h3>
                Dosage Forms
            </h3>

            <p>
                ${
                    dosageForms.length
                        ? dosageForms.join(" · ")
                        : "Not available yet."
                }
            </p>

        </div>


        <div class="details-section">

            <h3>
                Routes
            </h3>

            <p>
                ${
                    routes.length
                        ? routes.join(" · ")
                        : "Not available yet."
                }
            </p>

        </div>


        <div class="details-section">

            <h3>
                Contraindications
            </h3>

            ${
                contraindications.length
                    ? `
                        <ul>
                            ${
                                contraindications
                                    .map(
                                        item =>
                                            `<li>${item}</li>`
                                    )
                                    .join("")
                            }
                        </ul>
                    `
                    : `
                        <p>
                            Not available yet.
                        </p>
                    `
            }

        </div>


        <div class="details-section">

            <h3>
                Precautions
            </h3>

            ${
                precautions.length
                    ? `
                        <ul>
                            ${
                                precautions
                                    .map(
                                        item =>
                                            `<li>${item}</li>`
                                    )
                                    .join("")
                            }
                        </ul>
                    `
                    : `
                        <p>
                            Not available yet.
                        </p>
                    `
            }

        </div>


        <div class="details-section">

            <h3>
                Side Effects
            </h3>

            ${
                adverseEffects.length
                    ? `
                        <ul>
                            ${
                                adverseEffects
                                    .map(
                                        item =>
                                            `<li>${item}</li>`
                                    )
                                    .join("")
                            }
                        </ul>
                    `
                    : `
                        <p>
                            Not available yet.
                        </p>
                    `
            }

        </div>


        <div class="details-section">

            <h3>
                Drug Interactions
            </h3>

            ${
                interactions.length
                    ? `
                        <ul>
                            ${
                                interactions
                                    .map(
                                        item =>
                                            `<li>${item}</li>`
                                    )
                                    .join("")
                            }
                        </ul>
                    `
                    : `
                        <p>
                            Not available yet.
                        </p>
                    `
            }

        </div>


        <div class="details-section">

            <h3>
                Pediatric Notes
            </h3>

            <p>
                ${pediatricNotes}
            </p>

        </div>


        <div class="details-section reference-section">

            <h3>
                References
            </h3>

            <ul>
                ${referenceHTML}
            </ul>

        </div>

    `;


    modal.classList.add(
        "open"
    );

}


/* =========================================
   CLOSE MODAL
========================================= */

function closeMedicineModal() {

    if (
        modal
    ) {

        modal.classList.remove(
            "open"
        );

    }

}


if (
    closeModal
) {

    closeModal.addEventListener(
        "click",
        closeMedicineModal
    );

}


if (
    modalOverlay
) {

    modalOverlay.addEventListener(
        "click",
        closeMedicineModal
    );

}


/* =========================================
   SEARCH & FILTER EVENTS
========================================= */

if (
    searchInput
) {

    searchInput.addEventListener(
        "input",
        renderMedicines
    );

}


if (
    classFilter
) {

    classFilter.addEventListener(
        "change",
        renderMedicines
    );

}


if (
    conditionFilter
) {

    conditionFilter.addEventListener(
        "change",
        renderMedicines
    );

}


/* =========================================
   BACK TO HOME
========================================= */

if (
    backButton
) {

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

initializeFilters();

renderMedicines();
