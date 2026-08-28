/* =========================================
   DoseCare — CENTRAL DATABASE LOADER
=========================================

   ONE RULE FOR FUTURE MEDICINES
   -----------------------------------------
   Medicine-system files are registered here.
   The calculator does NOT need to be edited
   when a medicine is added.

   The loader also protects the central array
   against duplicate/invalid registrations.
========================================= */

(function () {
    "use strict";

    const MEDICINE_MODULES = [
        "antibiotics.js",
        "analgesics.js",
        "respiratory.js"
    ];

    window.DoseCareDatabase = {
        version: "1.2.0",
        core: "medicines.js",
        modules: Object.freeze([...MEDICINE_MODULES]),
        loaded: []
    };

    window.DOSECARE_MEDICINE_MODULES =
        Object.freeze(["medicines.js", ...MEDICINE_MODULES]);

    /* -----------------------------------------
       SAFE REGISTRATION BRIDGE
       -----------------------------------------
       Legacy medicine files currently use
           medicines.push(...)
       while the migration is in progress.

       We intercept that operation centrally so
       duplicate IDs and invalid entries cannot
       silently corrupt the database.
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
       DYNAMIC MODULE LOADER
       -----------------------------------------
       index.html loads only the core database and
       this loader. Medicine-system files are loaded
       from this single manifest.
    ----------------------------------------- */

    function loadModule(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = src;
            script.async = false;

            script.onload = () => {
                window.DoseCareDatabase.loaded.push(src);
                resolve(src);
            };

            script.onerror = () => {
                console.error(`DoseCare: failed to load ${src}`);
                reject(new Error(`Failed to load ${src}`));
            };

            document.head.appendChild(script);
        });
    }

    window.DoseCareDatabase.ready = (async function () {
        for (const module of MEDICINE_MODULES) {
            await loadModule(module);
        }

        window.dispatchEvent(
            new CustomEvent("dosecare:database-ready", {
                detail: {
                    count: Array.isArray(window.medicines)
                        ? window.medicines.length
                        : 0,
                    modules: [...window.DoseCareDatabase.loaded]
                }
            })
        );

        return window.medicines;
    })();
})();
