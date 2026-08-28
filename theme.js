/* =========================================
   DOSECARE
   THEME SYSTEM
   Default = Dark Mode
========================================= */


const THEME_STORAGE_KEY =
    "dosecare-theme";


function getSavedTheme() {

    const savedTheme =
        localStorage.getItem(
            THEME_STORAGE_KEY
        );

    return savedTheme === "light"
        ? "light"
        : "dark";
}


function applyTheme(theme) {

    const isLight =
        theme === "light";

    document.body.classList.toggle(
        "light-mode",
        isLight
    );

    document.documentElement.classList.toggle(
        "light-mode",
        isLight
    );

    localStorage.setItem(
        THEME_STORAGE_KEY,
        isLight
            ? "light"
            : "dark"
    );

    updateThemeUI(
        isLight
            ? "light"
            : "dark"
    );
}


function updateThemeUI(theme) {

    const themeToggle =
        document.getElementById(
            "theme-toggle"
        );

    const themeStatus =
        document.getElementById(
            "theme-status"
        );

    const isLight =
        theme === "light";

    if (themeToggle) {

        themeToggle.classList.toggle(
            "light",
            isLight
        );

        themeToggle.setAttribute(
            "aria-pressed",
            isLight
                ? "true"
                : "false"
        );

        const icon =
            themeToggle.querySelector(
                ".theme-toggle-icon"
            );

        if (icon) {
            icon.textContent =
                isLight
                    ? "☀"
                    : "☾";
        }
    }

    if (themeStatus) {
        themeStatus.textContent =
            isLight
                ? "Light Mode"
                : "Dark Mode";
    }
}


applyTheme(
    getSavedTheme()
);


document.addEventListener(
    "click",
    function (event) {

        const toggle =
            event.target.closest(
                "#theme-toggle"
            );

        if (!toggle) return;

        const currentTheme =
            getSavedTheme();

        applyTheme(
            currentTheme === "light"
                ? "dark"
                : "light"
        );
    }
);


/* =========================================
   CALCULATOR READINESS COMPATIBILITY
=========================================

   The database currently contains two readiness
   conventions:

       dosing.calculatorReady === true
       dosing.configured === true

   A medicine is ready when calculatorReady is true
   OR the legacy configured flag is true.

   Explicit calculatorReady === false always wins.

   This prevents valid medicines from disappearing
   merely because they do not carry the old
   `configured` property.
========================================= */

function doseCareIsCalculatorReady(medicine) {

    if (
        !medicine ||
        !medicine.dosing
    ) {
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
        dosing.calculatorReady === true ||
        dosing.configured === true
    );
}


window.isMedicineCalculatorReady =
    function (id) {

        if (
            typeof window.getMedicineById !==
            "function"
        ) {
            return false;
        }

        return doseCareIsCalculatorReady(
            window.getMedicineById(id)
        );
    };


window.getCalculatorReadyMedicines =
    function () {

        if (
            typeof window.getAllMedicines !==
            "function"
        ) {
            return [];
        }

        return window
            .getAllMedicines()
            .filter(
                doseCareIsCalculatorReady
            );
    };

