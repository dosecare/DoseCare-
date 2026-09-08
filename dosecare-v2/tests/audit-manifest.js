window.DoseCareV2Audit = (() => {
  const expectedIds = [
    'amoxicillin','amoxicillin-clavulanate','azithromycin','cephalexin','cefuroxime','cefixime','cefpodoxime','cefdinir','cefprozil','clarithromycin','clindamycin','cefaclor','erythromycin','metronidazole',
    'paracetamol','ibuprofen','mefenamic-acid','ambroxol','carbocisteine','bromhexine','guaifenesin','dextromethorphan','cetirizine','loratadine','desloratadine','chlorpheniramine','fexofenadine','diphenhydramine','hydroxyzine','ondansetron','prednisolone','salbutamol',
    'lactulose','omeprazole','magnesium-hydroxide','famotidine','sulfamethoxazole-trimethoprim','zinc-sulfate','domperidone','simethicone','hyoscine-butylbromide','sodium-citrate','vitamin-d3','iron','multivitamin','multivitamin-iron','folic-acid','fluconazole','mebendazole','nitazoxanide'
  ];

  // These are the only regimen types with deterministic implementations in dosing-engine.js.
  // Clinical conditions belong on the regimen as metadata (for example `condition`), not as a
  // calculator type. Generic `weight_based` is intentionally rejected because it is ambiguous
  // between mg/kg/dose, mg/kg/day, and weight-band dosing.
  const validTypes = new Set([
    'mg_per_kg_per_day',
    'mg_per_kg_per_dose',
    'fixed_dose',
    'age_based',
    'label_age_based',
    'label_weight_age_based',
    'scheduled'
  ]);

  const errors = [], warnings = [];
  const db = window.DoseCareV2Database;
  if (!db) return { passed:false, errors:['Database is not loaded'], warnings:[] };
  const medicines = db.getAll();
  const actualIds = medicines.map(m => m.id);
  const missing = expectedIds.filter(id => !actualIds.includes(id));
  const extra = actualIds.filter(id => !expectedIds.includes(id));
  if (missing.length) errors.push(`Missing expected medicines: ${missing.join(', ')}`);
  if (extra.length) errors.push(`Unexpected medicine IDs: ${extra.join(', ')}`);
  if (actualIds.length !== expectedIds.length) errors.push(`Expected ${expectedIds.length} medicines, found ${actualIds.length}`);

  const finitePositive = value => Number.isFinite(Number(value)) && Number(value) > 0;
  const finiteNonNegative = value => Number.isFinite(Number(value)) && Number(value) >= 0;
  const hasAny = (obj, keys) => keys.some(key => obj[key] != null);

  for (const m of medicines) {
    for (const field of ['id','name','dosageForm','route','formulations','regimens','information','sources']) {
      if (m[field] == null) errors.push(`${m.id}: missing required field ${field}`);
    }
    if (m.route !== 'Oral') errors.push(`${m.id}: route must be Oral`);
    if (!/suspension|solution|syrup|drops|liquid/i.test(String(m.dosageForm || ''))) errors.push(`${m.id}: dosageForm is not an oral liquid`);
    if (!Array.isArray(m.formulations) || !m.formulations.length) errors.push(`${m.id}: no formulations`);

    for (const f of (m.formulations || [])) {
      const c = f.concentration || {};
      const amount = Number(c.amount ?? f.amount ?? f.mgPer5mL ?? f.strengthMg ?? 0);
      const volume = Number(c.volume ?? f.volume ?? (f.mgPer5mL ? 5 : 0));
      if (!(amount > 0) || !(volume > 0)) errors.push(`${m.id}: invalid formulation concentration`);
    }

    if (!Array.isArray(m.regimens) || !m.regimens.length) errors.push(`${m.id}: no regimens`);
    const formulationIds = new Set((m.formulations || []).map(f => f.id).filter(Boolean));
    for (const r of (m.regimens || [])) {
      const prefix = `${m.id}/${r.id || 'missing-regimen-id'}`;
      if (!r.id) errors.push(`${m.id}: regimen missing id`);
      if (!validTypes.has(r.type)) errors.push(`${prefix}: unsupported regimen type ${r.type}`);
      if (r.frequency != null && !finitePositive(r.frequency)) errors.push(`${prefix}: invalid frequency`);
      if (r.minDose != null && !finiteNonNegative(r.minDose)) errors.push(`${prefix}: invalid minDose`);
      if (r.maxDose != null && !finiteNonNegative(r.maxDose)) errors.push(`${prefix}: invalid maxDose`);
      if (r.minDose != null && r.maxDose != null && Number(r.maxDose) < Number(r.minDose)) errors.push(`${prefix}: maxDose is below minDose`);
      if (r.dose != null && !finiteNonNegative(r.dose)) errors.push(`${prefix}: invalid dose`);

      for (const fid of (r.allowedFormulations || [])) {
        if (formulationIds.size && !formulationIds.has(fid)) errors.push(`${prefix}: unknown allowedFormulation ${fid}`);
      }

      for (const [minKey, maxKey, label] of [
        ['minAgeWeeks','maxAgeWeeks','weeks'],
        ['minAgeMonths','maxAgeMonths','months'],
        ['minAgeYears','maxAgeYears','years'],
        ['minWeightKg','maxWeightKg','kg']
      ]) {
        if (r[minKey] != null && r[maxKey] != null && Number(r[maxKey]) < Number(r[minKey])) {
          errors.push(`${prefix}: ${label} maximum is below minimum`);
        }
      }

      if (['mg_per_kg_per_day','mg_per_kg_per_dose'].includes(r.type)) {
        if (!hasAny(r, ['dose','minDose'])) errors.push(`${prefix}: weight-based regimen has no dose value`);
        if (r.maxDose == null && r.dose == null && r.minDose == null) errors.push(`${prefix}: weight-based regimen has no upper dose value`);
        if (!finitePositive(r.frequency ?? r.dosesPerDay ?? r.frequencyPerDay)) errors.push(`${prefix}: weight-based regimen requires a positive frequency`);
      }

      if (['fixed_dose','age_based'].includes(r.type)) {
        if (!hasAny(r, ['dose','minDose'])) errors.push(`${prefix}: fixed/age regimen has no dose value`);
        if (r.maxDose == null && r.dose == null && r.minDose == null) errors.push(`${prefix}: fixed/age regimen has no upper dose value`);
      }

      if (r.type === 'label_age_based') {
        for (const key of ['doseMin','doseMax','volumeMin','volumeMax']) {
          if (!finiteNonNegative(r[key])) errors.push(`${prefix}: label_age_based requires valid ${key}`);
        }
        if (finiteNonNegative(r.doseMin) && finiteNonNegative(r.doseMax) && Number(r.doseMax) < Number(r.doseMin)) errors.push(`${prefix}: doseMax is below doseMin`);
        if (finiteNonNegative(r.volumeMin) && finiteNonNegative(r.volumeMax) && Number(r.volumeMax) < Number(r.volumeMin)) errors.push(`${prefix}: volumeMax is below volumeMin`);
      }

      if (r.type === 'label_weight_age_based') {
        if (!Array.isArray(r.table) || !r.table.length) errors.push(`${prefix}: label_weight_age_based requires a non-empty table`);
        else r.table.forEach((row, index) => {
          if (!finiteNonNegative(row.minLb) || !finiteNonNegative(row.maxLb) || Number(row.maxLb) < Number(row.minLb)) errors.push(`${prefix}: invalid weight band at table row ${index + 1}`);
          if (!finiteNonNegative(row.doseMl)) errors.push(`${prefix}: invalid doseMl at table row ${index + 1}`);
          if (row.minAgeYears != null && row.maxAgeYears != null && Number(row.maxAgeYears) < Number(row.minAgeYears)) errors.push(`${prefix}: invalid age band at table row ${index + 1}`);
        });
      }

      if (r.type === 'scheduled' && (!Array.isArray(r.schedule) || !r.schedule.length)) errors.push(`${prefix}: scheduled regimen requires a non-empty schedule`);
    }

    const info = m.information || {};
    if (info.mechanism == null) warnings.push(`${m.id}: missing canonical information.mechanism`);
    if (info.precautions == null) warnings.push(`${m.id}: missing canonical information.precautions`);
    if (info.mechanismOfAction != null || info.warningsPrecautions != null || info.source != null || info.sourceUrl != null) errors.push(`${m.id}: legacy metadata key leaked into runtime`);
    if (!Array.isArray(m.sources) || !m.sources.length) errors.push(`${m.id}: no sources`);
  }

  return { passed: errors.length === 0, errors, warnings, medicineCount: medicines.length };
})();
