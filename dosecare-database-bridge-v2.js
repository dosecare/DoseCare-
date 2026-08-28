/* DoseCare V2 compatibility bridge.
 * The existing medicine files use the global lexical `medicines` array.
 * Expose that exact array as window.medicines for V2 without changing
 * any medicine record or forcing a new schema.
 */
(function (global) {
    "use strict";

    try {
        if (typeof medicines !== "undefined" && Array.isArray(medicines)) {
            global.medicines = medicines;
        }
    } catch (error) {
        console.warn("DoseCare V2 database bridge could not access medicines:", error);
    }
})(window);
