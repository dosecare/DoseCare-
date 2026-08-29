/* DoseCare V2 result renderer. */
(function () {
  const root = document.getElementById('result-stack');
  const raw = sessionStorage.getItem('dosecareV2Result');
  document.getElementById('back-calculator').addEventListener('click', () => location.href = 'calculator.html');

  if (!raw) {
    root.innerHTML = '<div class="glass-panel empty-result"><h2>No calculation found</h2><p>Return to the calculator and enter the required patient information.</p><button class="v2-primary" onclick="location.href=\'calculator.html\'">BACK TO CALCULATOR</button></div>';
    return;
  }

  let data;
  try { data = JSON.parse(raw); } catch { data = null; }
  if (!data?.medicine || !data?.regimen) {
    root.innerHTML = '<div class="glass-panel empty-result"><h2>Result unavailable</h2><p>The saved calculation could not be read.</p></div>';
    return;
  }

  const m = data.medicine;
  const r = data.regimen;
  const esc = value => String(value ?? '').replace(/[&<>\"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));
  const fmt = n => Number.isFinite(Number(n)) ? Number(n).toFixed(2).replace(/\.00$/, '').replace(/(\.\d)0$/, '$1') : '—';
  const range = (low, high, unit) => `${fmt(low)}${Math.abs(Number(low)-Number(high)) < 1e-9 ? '' : `–${fmt(high)}`} ${unit}`;

  const frequencyText = r.frequencyText || r.interval || (data.frequency ? `${data.frequency} times daily` : 'As specified by the regimen');
  const doseText = `${range(data.lowMg, data.highMg, 'mg/dose')}`;
  const volumeText = data.lowMl != null ? `${range(data.lowMl, data.highMl, 'mL/dose')}` : 'Verify the oral-liquid concentration to obtain mL.';

  const condition = data.condition ? `<div class="result-meta"><span>Condition</span><strong>${esc(data.condition)}</strong></div>` : '';
  const concentration = data.formulation ? (data.formulation.concentration || data.formulation.display || data.formulation.form || '') : '';

  const stepDose = r.type === 'mg_per_kg_per_day' ?
    `${fmt(data.weight)} kg × ${fmt(r.minDose)}–${fmt(r.maxDose)} mg/kg/day ÷ ${fmt(data.frequency)} doses/day` :
    `${fmt(data.weight)} kg × ${fmt(r.minDose)}–${fmt(r.maxDose)} mg/kg/dose`;

  let calculation = `<div class="calc-step"><span>01</span><div><strong>Weight-based dose</strong><p>${esc(stepDose)} = <b>${esc(doseText)}</b></p></div></div>`;
  if (r.maxDailyDose != null) calculation += `<div class="calc-step"><span>02</span><div><strong>Maximum daily dose check</strong><p>Configured maximum: <b>${esc(r.maxDailyDose)} mg/day</b>.</p></div></div>`;
  if (data.mgPer5mL) {
    const stepNo = r.maxDailyDose != null ? '03' : '02';
    calculation += `<div class="calc-step"><span>${stepNo}</span><div><strong>Convert mg to mL</strong><p>${esc(concentration || `${data.mgPer5mL} mg/5 mL`)} → <b>${esc(volumeText)}</b></p></div></div>`;
  }

  const refs = Array.isArray(m.references) ? m.references : [];
  const referencesHtml = refs.length ? refs.map(ref => `<a class="reference-item" href="${esc(ref.url || '#')}" target="_blank" rel="noopener noreferrer"><span>${esc(ref.organization || 'Source')}</span><strong>${esc(ref.title || ref.id || 'Reference')}</strong></a>`).join('') : '<p class="muted">No reference record is attached to this medicine yet.</p>';

  root.innerHTML = `
    <article class="result-card result-hero glass-panel">
      <p class="card-label">DOSE RESULT</p>
      <div class="result-title-row"><h2>${esc(m.genericName || m.name)}</h2><span>${esc(r.doseUnit || r.unit || '')}</span></div>
      ${condition}
      <div class="dose-output"><strong>${esc(doseText)}</strong><strong>${esc(volumeText)}</strong></div>
      <div class="result-meta"><span>Frequency</span><strong>${esc(frequencyText)}</strong></div>
      ${concentration ? `<div class="result-meta"><span>Concentration</span><strong>${esc(concentration)}</strong></div>` : ''}
    </article>

    <article class="result-card glass-panel">
      <p class="card-label">CALCULATION DETAILS</p>
      <div class="calculation-list">${calculation}</div>
    </article>

    <article class="result-card glass-panel">
      <p class="card-label">MEDICINE INFORMATION</p>
      <h2 class="medicine-heading">${esc(m.genericName || m.name)}</h2>
      <div class="info-grid">
        <div><span>Active ingredient</span><strong>${esc(m.activeIngredient || m.genericName || m.name)}</strong></div>
        <div><span>Drug class</span><strong>${esc(Array.isArray(m.drugClass) ? m.drugClass.join(' · ') : (m.class || '—'))}</strong></div>
        <div><span>Frequency</span><strong>${esc(frequencyText)}</strong></div>
        <div><span>Maximum dose</span><strong>${esc(r.maxDailyDose != null ? `${r.maxDailyDose} mg/day` : (m.dosing?.maxDailyDose != null ? `${m.dosing.maxDailyDose} mg/day` : 'Not specified in this regimen'))}</strong></div>
      </div>
      <div class="info-block"><span>Mechanism of action</span><p>${esc(m.moa || 'Not provided')}</p></div>
      <div class="info-block"><span>Indications</span><p>${esc(m.indications || 'Not provided')}</p></div>
      <div class="info-block"><span>Clinical notes</span><p>${esc(m.notes || 'Follow the selected regimen and verify patient-specific clinical factors.')}</p></div>
      <div class="sources"><p class="card-label">SOURCES &amp; REFERENCES</p>${referencesHtml}</div>
    </article>
  `;
})();
