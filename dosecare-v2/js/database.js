/* DoseCare V2 — independent database registry.
   This file intentionally does not import or read legacy medicines.js.
*/
(function (global) {
  'use strict';
  const records = Array.isArray(global.DOSECARE_V2_MEDICINES)
    ? global.DOSECARE_V2_MEDICINES
    : [];

  function getAll() {
    return records.slice();
  }

  function getById(id) {
    return records.find(medicine => medicine.id === id) || null;
  }

  global.DoseCareV2Database = Object.freeze({ getAll, getById });
})(window);
