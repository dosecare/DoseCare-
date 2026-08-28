/* =========================================
   DoseCare — CENTRAL DATABASE LOADER
=========================================

   ONE RULE FOR FUTURE MEDICINES
   -----------------------------------------
   Add the medicine data file, then add its
   filename to MEDICINE_MODULES below.

   The calculator must NEVER need to be edited
   when a medicine is added.

   Current legacy medicine modules are kept
   unchanged during stabilization.
========================================= */

(function () {
    "use strict";

    const MEDICINE_MODULES = [
        "antibiotics.js",
        "analgesics.js",
        "respiratory.js"
    ];

    window.DOSECARE_MEDICINE_MODULES =
        Object.freeze([...MEDICINE_MODULES]);

    window.DoseCareDatabase = {
        modules: [...MEDICINE_MODULES],
        version: "1.0.0"
    };
})();
