/* =========================================
   DoseCare — CENTRAL DATABASE LOADER
=========================================

   SINGLE ENTRY POINT FOR MEDICINE DATA
   -----------------------------------------
   HTML pages load ONLY this file for the
   medicine database.

   To add a future medicine system:
   1. Create its data file.
   2. Add ONE filename to MEDICINE_MODULES.

   calculator.js and the HTML do NOT change.

   Current medicine files remain in the repository
   root during this stabilization phase so existing
   data does not need to be rewritten.
========================================= */

(function () {
    "use strict";

    const MEDICINE_CORE = "medicines.js";

    const MEDICINE_MODULES = [
        "antibiotics.js",
        "analgesics.js",
        "respiratory.js"
    ];

    /*
       Keep the configuration visible for diagnostics
       and future validation tools.
    */
    window.DOSECARE_MEDICINE_MODULES =
        Object.freeze([
            MEDICINE_CORE,
            ...MEDICINE_MODULES
        ]);

    window.DoseCareDatabase = {
        version: "1.1.0",
        core: MEDICINE_CORE,
        modules: [...MEDICINE_MODULES]
    };

    /*
       Load scripts synchronously and in a guaranteed order.
       The legacy medicine files register into the central
       `medicines` array, so they must run after medicines.js
       and before calculator.js / medicines-page.js.
    */
    const currentScript =
        document.currentScript;

    const basePath =
        currentScript
            ? currentScript.src.substring(
                0,
                currentScript.src.lastIndexOf("/") + 1
            )
            : "";

    const files = [
        MEDICINE_CORE,
        ...MEDICINE_MODULES
    ];

    files.forEach(function (file) {
        document.write(
            '<script src="' +
            basePath +
            file +
            '"><\\/script>'
        );
    });
})();
