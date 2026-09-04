window.DoseCareV2Audit = (() => {
  const expectedIds = [
    'amoxicillin','amoxicillin-clavulanate','azithromycin','cephalexin','cefuroxime','cefixime','cefpodoxime','cefdinir','cefprozil','clarithromycin','clindamycin',
    'paracetamol','ibuprofen','mefenamic-acid','cetirizine','loratadine','diphenhydramine','salbutamol','ondansetron','lactulose','magnesium-hydroxide','omeprazole','prednisolone'
  ];
  const validTypes = new Set(['mg_per_kg_per_day','mg_per_kg_per_dose','condition_based','fixed_dose','age_based','label_age_based','label_weight_age_based','scheduled','weight_based']);
  const errors = [], warnings = [];
  const db = window.DoseCareV2Database;
  if (!db) return { passed:false, errors:['Database is not loaded'], warnings:[] };
  const medicines = db.getAll();
  const actualIds = medicines.map(m => m.id);
  const missing = expectedIds.filter(id => !actualIds.includes(id));
  const extra = actualIds.filter(id => !expectedIds.includes(id));
  if (missing.length) errors.push(`Missing expected medicines: ${missing.join(', ')}`);
  if (extra.length) warnings.push(`Unexpected medicine IDs: ${extra.join(', ')}`);
  if (actualIds.length !== expectedIds.length) errors.push(`Expected ${expectedIds.length} medicines, found ${actualIds.length}`);

  for (const m of medicines) {
    for (const field of ['id','name','dosageForm','route','formulations','regimens','information','sources']) {
      if (m[field] == null) errors.push(`${m.id}: missing required field ${field}`);
    }
    if (m.route !== 'Oral') errors.push(`${m.id}: route must be Oral`);
    if (!/suspension|solution|syrup/i.test(String(m.dosageForm || ''))) errors.push(`${m.id}: dosageForm is not an oral liquid`);
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
      if (!r.id) errors.push(`${m.id}: regimen missing id`);
      if (!validTypes.has(r.type)) errors.push(`${m.id}/${r.id}: unsupported regimen type ${r.type}`);
      if (r.frequency != null && !(Number(r.frequency) > 0)) errors.push(`${m.id}/${r.id}: invalid frequency`);
      for (const fid of (r.allowedFormulations || [])) {
        if (formulationIds.size && !formulationIds.has(fid)) errors.push(`${m.id}/${r.id}: unknown allowedFormulation ${fid}`);
      }
    }
    const info = m.information || {};
    if (info.mechanism == null) warnings.push(`${m.id}: missing canonical information.mechanism`);
    if (info.precautions == null) warnings.push(`${m.id}: missing canonical information.precautions`);
    if (info.mechanismOfAction != null || info.warningsPrecautions != null) errors.push(`${m.id}: legacy metadata key leaked into runtime`);
    if (!Array.isArray(m.sources) || !m.sources.length) errors.push(`${m.id}: no sources`);
  }
  return { passed: errors.length === 0, errors, warnings, medicineCount: medicines.length };
})();
