/* =========================================
   DoseCare — CENTRAL DATABASE CONFIG
=========================================

   ONE RULE FOR FUTURE MEDICINES
   -----------------------------------------
   A medicine-system file is registered here.

   The calculator NEVER needs to be edited when
   a new medicine is added.

   Current legacy files stay in the repository
   root during stabilization. We will migrate them
   only after the calculator core is stable.
========================================= */

(function () {
    "use strict";

    const MEDICINE_MODULES = [
        "antibiotics.js",
        "analgesics.js",
        "respiratory.js"
    ];

    window.DoseCareDatabase = {
        version: "1.1.0",
        core: "medicines.js",
        modules: Object.freeze([
            ...MEDICINE_MODULES
        ])
    };

    window.DOSECARE_MEDICINE_MODULES =
        Object.freeze([
            "medicines.js",
            ...MEDICINE_MODULES
        ]);
})();
