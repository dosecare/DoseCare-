/* DoseCare Dosing Engine V2 — medicine-specific regimen interpreter. */
(function (global) {
    "use strict";

    function number(value) {
        const n = Number(value);
        return Number.isFinite(n) ? n : null;
    }

    function firstNumber(object, keys) {
        if (!object || typeof object !== "object") return null;
        for (const key of keys) {
            const n = number(object[key]);
            if (n != null) return n;
        }
        return null;
    }

    function frequencyCount(frequency) {
        if (frequency == null) return null;
        if (typeof frequency === "number" && Number.isFinite(frequency)) return frequency;
        const raw = String(frequency).trim().toLowerCase();
        if (/^once daily$|^qd$|^od$|^once$/.test(raw)) return 1;
        if (/^twice daily$|^bid$/.test(raw)) return 2;
        if (/^three times daily$|^tid$/.test(raw)) return 3;
        if (/^four times daily$|^qid$/.test(raw)) return 4;
        const match = raw.match(/(\d+)\s*(?:times|x)\s*(?:daily|per day)?/);
        return match ? Number(match[1]) : null;
    }

    function concentrationToMl(mg, concentration) {
        if (mg == null || !concentration) return null;
        if (Array.isArray(concentration)) {
            for (const item of concentration) {
                const result = concentrationToMl(mg, item);
                if (result != null) return result;
            }
            return null;
        }
        const nested = concentration.concentration;
        if (nested && nested !== concentration) return concentrationToMl(mg, nested);
        const strength = firstNumber(concentration, ["mg", "amount", "strength"]);
        const volume = firstNumber(concentration, ["ml", "volume"]);
        if (strength == null || volume == null || strength <= 0 || volume <= 0) return null;
        return (mg / strength) * volume;
    }

    function resolveRegimens(source) {
        if (!source) return [];
        if (Array.isArray(source.regimens)) return source.regimens;
        if (Array.isArray(source.dosingRegimens)) return source.dosingRegimens;
        if (Array.isArray(source.doseRegimens)) return source.doseRegimens;
        if (Array.isArray(source.dosing)) return source.dosing;
        if (source.dosing && typeof source.dosing === "object") {
            if (Array.isArray(source.dosing.regimens)) return source.dosing.regimens;
            return [source.dosing];
        }
        if (source.dose && typeof source.dose === "object") return [source.dose];
        return [];
    }

    function calculate(source, patient) {
        const weight = number(patient && patient.weight);
        const regimens = resolveRegimens(source);
        const results = [];

        for (const regimen of regimens) {
            const type = String(regimen.type || regimen.dosingType || regimen.calculationType || "").toLowerCase();
            let totalMg = null;
            let perDoseMg = null;
            let frequency = regimen.frequency ?? regimen.freq ?? null;

            let mgPerKgDose = firstNumber(regimen, ["mgPerKgPerDose", "mg_per_kg_per_dose", "mgKgDose"]);
            let mgPerKgDay = firstNumber(regimen, ["mgPerKgPerDay", "mg_per_kg_per_day", "mgKgDay"]);
            let fixedDose = firstNumber(regimen, ["doseMg", "mg", "dose"]);

            const minDose = firstNumber(regimen, ["minDose", "minimumDose"]);
            const maxDose = firstNumber(regimen, ["maxDose", "maximumDose"]);
            const doseUnit = String(regimen.doseUnit || "").toLowerCase();

            if (mgPerKgDose == null && minDose != null && /mg\/kg\/dose|mg_per_kg_per_dose/.test(doseUnit)) {
                mgPerKgDose = minDose;
            }
            if (mgPerKgDay == null && minDose != null && /mg\/kg\/day|mg_per_kg_per_day/.test(doseUnit)) {
                mgPerKgDay = minDose;
            }

            if (type.includes("mg_per_kg_per_dose") || type.includes("mg/kg/dose") || mgPerKgDose != null) {
                if (weight == null || mgPerKgDose == null) continue;
                perDoseMg = weight * mgPerKgDose;
                totalMg = perDoseMg * (frequencyCount(frequency) || 1);
            } else if (type.includes("mg_per_kg_per_day") || type.includes("mg/kg/day") || mgPerKgDay != null) {
                if (weight == null || mgPerKgDay == null) continue;
                totalMg = weight * mgPerKgDay;
                const dosesPerDay = frequencyCount(frequency) || firstNumber(regimen, ["dosesPerDay", "frequencyPerDay"]);
                perDoseMg = dosesPerDay ? totalMg / dosesPerDay : null;
            } else if (fixedDose != null) {
                perDoseMg = fixedDose;
                totalMg = fixedDose * (frequencyCount(frequency) || 1);
            } else {
                continue;
            }

            const concentration = regimen.concentration || regimen.formulation ||
                (source.concentrations && source.concentrations[0]) || source.concentration;
            const ml = concentrationToMl(perDoseMg, concentration);

            results.push({
                regimen,
                frequency,
                perDoseMg,
                totalMgPerDay: totalMg,
                volumeMlPerDose: ml,
                concentration,
                doseRange: minDose != null && maxDose != null && minDose !== maxDose ? { minDose, maxDose } : null
            });
        }
        return results;
    }

    global.DoseCareDosingEngineV2 = Object.freeze({ calculate, concentrationToMl, frequencyCount, resolveRegimens });
})(typeof window !== "undefined" ? window : globalThis);