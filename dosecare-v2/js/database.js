/* DoseCare V2 — central medicine registry. */
(function (global) {
  'use strict';
  const records = [];

  function normalizeInformation(information) {
    const source = information && typeof information === 'object' ? information : {};
    const normalized = { ...source };

    // Canonical V2 keys. Keep backward compatibility with older medicine files,
    // but expose only the canonical schema to the rest of the application.
    if (normalized.mechanism == null && normalized.mechanismOfAction != null) {
      normalized.mechanism = normalized.mechanismOfAction;
    }
    if (normalized.precautions == null && normalized.warningsPrecautions != null) {
      normalized.precautions = normalized.warningsPrecautions;
    }

    delete normalized.mechanismOfAction;
    delete normalized.warningsPrecautions;
    return normalized;
  }

  function normalizeMedicine(medicine) {
    if (!medicine || typeof medicine !== 'object' || !medicine.id) {
      throw new Error('Invalid DoseCare V2 medicine record.');
    }

    return {
      ...medicine,
      information: normalizeInformation(medicine.information)
    };
  }

  function register(medicine) {
    const normalized = normalizeMedicine(medicine);
    if (records.some(item => item.id === normalized.id)) {
      throw new Error(`Duplicate medicine id: ${normalized.id}`);
    }
    records.push(Object.freeze(normalized));
  }

  function getAll() { return records.slice(); }
  function getById(id) { return records.find(medicine => medicine.id === id) || null; }

  global.DoseCareV2Database = Object.freeze({ register, getAll, getById });
})(window);
