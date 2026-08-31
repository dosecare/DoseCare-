/* DoseCare V2 — central medicine registry. */
(function (global) {
  'use strict';
  const records = [];

  function register(medicine) {
    if (!medicine || !medicine.id) throw new Error('Invalid DoseCare V2 medicine record.');
    if (records.some(item => item.id === medicine.id)) throw new Error(`Duplicate medicine id: ${medicine.id}`);
    records.push(Object.freeze(medicine));
  }
  function getAll() { return records.slice(); }
  function getById(id) { return records.find(medicine => medicine.id === id) || null; }
  global.DoseCareV2Database = Object.freeze({ register, getAll, getById });
})(window);
