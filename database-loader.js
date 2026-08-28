/* =========================================
   DoseCare — CENTRAL DATABASE LOADER
=========================================

   SINGLE RESPONSIBILITY
   ---------------------
   1. Load every medicine-system module.
   2. Wait until the database is complete.
   3. Only then start the application scripts.

   FUTURE MEDICINE RULE
   --------------------
   Add the medicine data file and add its path
   to MEDICINE_MODULES. The calculator does not
   need to be edited just because a medicine is added.
========================================= */

(function () {
    "use strict";

    const MEDICINE_MODULES = [
        "antibiotics.js",
        "analgesics.js",
        "respiratory.js"
    ];

    const APP_MODULES = [
        "app.js",
        "script.js"
    ];

    window.DoseCareDatabase = {
        version: "1.3.0",
        core: "medicines.js",
        modules: Object.freeze([...MEDICINE_MODULES]),
        loaded: [],
        appLoaded: []
    };

    window.DOSECARE_MEDICINE_MODULES = Object.freeze([
        "medicines.js",
        ...MEDICINE_MODULES
    ]);

    /* -----------------------------------------
       LEGACY REGISTRATION SAFETY
       -----------------------------------------
       Existing medicine modules may still use
           medicines.push(...)
       during migration. Keep them working while
       rejecting invalid objects and duplicate IDs.
    ----------------------------------------- */

    if (Array.isArray(window.medicines)) {
        const nativePush = window.medicines.push.bind(window.medicines);

        window.medicines.push = function (...items) {
            const existingIds = new Set(
                this
                    .filter(item => item && typeof item === "object")
                    .map(item => item.id)
                    .filter(Boolean)
            );

            const accepted = [];

            items.forEach(item => {
                if (!item || typeof item !== "object") {
                    console.warn("DoseCare: invalid medicine skipped.", item);
                    return;
                }

                if (!item.id || typeof item.id !== "string") {
                    console.warn("DoseCare: medicine without valid ID skipped.", item);
                    return;
                }

                if (existingIds.has(item.id)) {
                    console.warn(`DoseCare: duplicate medicine ID skipped: ${item.id}`);
                    return;
                }

                existingIds.add(item.id);
                accepted.push(item);
            });

            return nativePush(...accepted);
        };
    }

    /* -----------------------------------------
       SEQUENTIAL SCRIPT LOADER
       -----------------------------------------
       App scripts must NOT execute until all medicine
       modules have finished loading. This removes the
       race condition that can make medicines disappear.
    ----------------------------------------- */

    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = src;
            script.async = false;

            script.onload = () => resolve(src);
            script.onerror = () => {
                console.error(`DoseCare: failed to load ${src}`);
                reject(new Error(`Failed to load ${src}`));
            };

            document.head.appendChild(script);
        });
    }

    async function loadAll() {
        for (const module of MEDICINE_MODULES) {
            const loaded = await loadScript(module);
            window.DoseCareDatabase.loaded.push(loaded);
        }

        window.dispatchEvent(new CustomEvent("dosecare:database-ready", {
            detail: {
                count: Array.isArray(window.medicines)
                    ? window.medicines.length
                    : 0,
                modules: [...window.DoseCareDatabase.loaded]
            }
        }));

        for (const appModule of APP_MODULES) {
            const loaded = await loadScript(appModule);
            window.DoseCareDatabase.appLoaded.push(loaded);
        }

        window.dispatchEvent(new CustomEvent("dosecare:ready", {
            detail: {
                medicineCount: Array.isArray(window.medicines)
                    ? window.medicines.length
                    : 0,
                medicineModules: [...window.DoseCareDatabase.loaded],
                appModules: [...window.DoseCareDatabase.appLoaded]
            }
        }));

        return window.medicines;
    }

    window.DoseCareDatabase.ready = loadAll();
})();
