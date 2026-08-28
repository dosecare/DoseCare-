/* =========================================
   DoseCare — CENTRAL DATABASE LOADER
========================================= */
(function () {
    "use strict";

    const MEDICINE_MODULES = ["antibiotics.js", "analgesics.js", "respiratory.js"];
    const APP_MODULES = ["app.js", "script.js"];

    window.DoseCareDatabase = {
        version: "1.5.0",
        core: "medicines.js",
        modules: Object.freeze([...MEDICINE_MODULES]),
        loaded: [],
        rejected: [],
        appLoaded: [],
        ready: null
    };

    window.DOSECARE_MEDICINE_MODULES = Object.freeze(["medicines.js", ...MEDICINE_MODULES]);

    function installLegacyPushGuard() {
        if (!Array.isArray(window.medicines) || window.medicines.__doseCareGuarded) return;
        const nativePush = window.medicines.push.bind(window.medicines);
        const registry = window.medicines;
        registry.push = function (...items) {
            const ids = new Set(registry.map(item => item && item.id).filter(Boolean));
            const accepted = [];
            for (const item of items) {
                if (!item || typeof item !== "object" || typeof item.id !== "string") {
                    console.warn("DoseCare: skipped invalid medicine record.");
                    continue;
                }
                if (ids.has(item.id)) {
                    console.warn(`DoseCare: skipped duplicate medicine ID: ${item.id}`);
                    continue;
                }
                ids.add(item.id);
                accepted.push(item);
            }
            return nativePush(...accepted);
        };
        Object.defineProperty(registry, "__doseCareGuarded", { value: true, enumerable: false });
    }

    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const existing = document.querySelector(`script[data-dosecare-module="${src}"]`);
            if (existing) return resolve(src);
            const script = document.createElement("script");
            script.src = src;
            script.async = false;
            script.dataset.dosecareModule = src;
            script.onload = () => resolve(src);
            script.onerror = () => reject(new Error(`DoseCare failed to load ${src}`));
            document.head.appendChild(script);
        });
    }

    function validateDatabase() {
        const list = Array.isArray(window.medicines) ? window.medicines : [];
        const seen = new Set();
        const errors = [];
        list.forEach((medicine, index) => {
            if (!medicine || typeof medicine !== "object") {
                errors.push(`Record ${index + 1}: invalid object`);
                return;
            }
            if (!medicine.id) errors.push(`Record ${index + 1}: missing id`);
            else if (seen.has(medicine.id)) errors.push(`${medicine.id}: duplicate id`);
            else seen.add(medicine.id);
            if (window.DoseCareMedicineSchema) {
                const result = window.DoseCareMedicineSchema.validate(medicine);
                if (!result.valid) errors.push(...result.errors.map(error => `${medicine.id || index + 1}: ${error}`));
            }
        });
        return { valid: errors.length === 0, errors, count: list.length };
    }

    async function loadAll() {
        installLegacyPushGuard();
        for (const module of MEDICINE_MODULES) {
            const loaded = await loadScript(module);
            window.DoseCareDatabase.loaded.push(loaded);
        }

        const validation = validateDatabase();
        window.DoseCareDatabase.validation = validation;
        window.DoseCareDatabase.medicines = window.medicines;

        if (!validation.valid) {
            console.error("DoseCare medicine validation failed:", validation.errors);
            window.DoseCareDatabase.rejected = [...validation.errors];
        }

        window.dispatchEvent(new CustomEvent("dosecare:database-ready", {
            detail: { medicines: window.medicines, validation }
        }));

        for (const module of APP_MODULES) {
            const loaded = await loadScript(module);
            window.DoseCareDatabase.appLoaded.push(loaded);
        }

        window.dispatchEvent(new CustomEvent("dosecare:ready", {
            detail: { medicineCount: window.medicines.length, validation }
        }));
        return window.medicines;
    }

    window.DoseCareDatabaseLoader = Object.freeze({
        getModules: () => [...MEDICINE_MODULES],
        getMedicines: () => Array.isArray(window.medicines) ? [...window.medicines] : [],
        validate: validateDatabase
    });

    window.DoseCareDatabase.ready = loadAll().catch(error => {
        console.error("DoseCare database initialization failed:", error);
        window.DoseCareDatabase.error = error;
        throw error;
    });
})();
