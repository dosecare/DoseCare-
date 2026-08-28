/* =========================================
   DOSECARE
   THEME SYSTEM
   Default = Dark Mode
========================================= */


/* =========================================
   THEME STORAGE
========================================= */

const THEME_STORAGE_KEY =
    "dosecare-theme";


/* =========================================
   GET SAVED THEME
========================================= */

function getSavedTheme() {

    const savedTheme =
        localStorage.getItem(
            THEME_STORAGE_KEY
        );

    /*
       Dark is always the default.
    */

    return savedTheme === "light"
        ? "light"
        : "dark";
}


/* =========================================
   APPLY THEME
========================================= */

function applyTheme(theme) {

    const isLight =
        theme === "light";


    /* -------------------------------------
       BODY
    ------------------------------------- */

    document.body.classList.toggle(
        "light-mode",
        isLight
    );


    /* -------------------------------------
       HTML
    ------------------------------------- */

    document.documentElement.classList.toggle(
        "light-mode",
        isLight
    );


    /* -------------------------------------
       SAVE
    ------------------------------------- */

    localStorage.setItem(
        THEME_STORAGE_KEY,
        isLight
            ? "light"
            : "dark"
    );


    /* -------------------------------------
       UPDATE UI
    ------------------------------------- */

    updateThemeUI(
        isLight
            ? "light"
            : "dark"
    );

}


/* =========================================
   UPDATE THEME UI
========================================= */

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


    /* -------------------------------------
       TOGGLE
    ------------------------------------- */

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


    /* -------------------------------------
       STATUS
    ------------------------------------- */

    if (themeStatus) {

        themeStatus.textContent =
            isLight
                ? "Light Mode"
                : "Dark Mode";

    }

}


/* =========================================
   INITIALIZE THEME
========================================= */

applyTheme(
    getSavedTheme()
);


/* =========================================
   THEME TOGGLE
========================================= */

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


        const newTheme =
            currentTheme === "light"
                ? "dark"
                : "light";


        applyTheme(
            newTheme
        );

    }
);


/* =========================================
   CALCULATOR READINESS COMPATIBILITY
========================================= */
/*
   Medicine records may use either:
       dosing.calculatorReady === true
   or the older:
       dosing.configured === true

   The old readiness check required configured === true
   even when calculatorReady was explicitly true. That caused
   valid medicines to disappear from the calculator.

   This compatibility layer runs after medicine registration
   and before calculator.js, because theme.js is loaded between
   the medicine files and calculator.js.
*/

if (
    typeof window.getAllMedicines === "function"
) {

    window.isMedicineCalculatorReady =
        function (id) {

            const medicine =
                window.getMedicineById
                    ? window.getMedicineById(id)
                    : null;

            if (
                !medicine ||
                !medicine.dosing
            ) {
                return false;
            }

            const dosing =
                medicine.dosing;

            /* Explicit opt-out always wins. */
            if (
                dosing.calculatorReady === false
            ) {
                return false;
            }

            /*
               Accept the current database flag.
               Keep configured === true for backward compatibility.
            */
            return (
                dosing.calculatorReady === true ||
                dosing.configured === true
            );
        };

    window.getCalculatorReadyMedicines =
        function () {

            return window
                .getAllMedicines()
                .filter(
                    medicine =>
                        window.isMedicineCalculatorReady(
                            medicine.id
                        )
                );
        };
}
