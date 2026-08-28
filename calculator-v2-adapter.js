/*
 * DoseCare Calculator V2 UI Adapter
 *
 * Compatibility guard for the rebuilt calculator.
 * V2 owns the calculator state and DOM events. This file must not
 * populate or overwrite the medicine select when V2 is active.
 */
(function (global) {
    "use strict";

    function handoff() {
        if (global.DoseCareCalculatorV2) {
            // Calculator V2 is the single owner of the calculator UI.
            return;
        }
        console.warn("DoseCare V2 adapter: Calculator V2 is not available.");
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", handoff, { once: true });
    } else {
        handoff();
    }

    global.DoseCareCalculatorV2Adapter = Object.freeze({
        active: () => Boolean(global.DoseCareCalculatorV2)
    });
})(window);