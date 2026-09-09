/* DoseCare V2 — input requirement patch.
 * Keeps Age/Weight visibility aligned with the regimen's actual calculation input.
 * Medical eligibility bounds do not, by themselves, force an input field to be shown.
 */
(function () {
  'use strict';

  function init() {
    const db = window.DoseCareV2Database;
    const medicine = document.getElementById('medicine-select');
    const condition = document.getElementById('condition-select');
    const ageField = document.getElementById('age-value')?.closest('.field');
    const weightField = document.getElementById('weight-value')?.closest('.field');
    if (!db || !medicine || !condition || !ageField || !weightField) return;

    const age = document.getElementById('age-value');
    const weight = document.getElementById('weight-value');
    const frequency = () => document.getElementById('frequency-select');

    const groups = rs => {
      const map = new Map();
      rs.forEach(r => {
        const key = r.condition || r.conditions?.[0] || r.id;
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(r);
      });
      return [...map.entries()];
    };

    const ageMonths = () => {
      const v = Number(age?.value);
      const u = document.getElementById('age-unit')?.value;
      if (!Number.isFinite(v) || v < 0) return null;
      if (u === 'years') return v * 12;
      if (u === 'weeks') return v / 4.34524;
      return v;
    };

    const matchesAge = r => {
      const a = ageMonths();
      if (a === null) return false;
      let min = r.minAgeMonths, max = r.maxAgeMonths;
      if (r.minAgeYears !== undefined) min = Number(r.minAgeYears) * 12;
      if (r.maxAgeYears !== undefined) max = Number(r.maxAgeYears) * 12;
      return (min === undefined || a >= Number(min)) && (max === undefined || a <= Number(max));
    };

    function selectedRegimen() {
      const m = db.getById(medicine.value);
      if (!m) return null;
      const gs = groups(m.regimens || []);
      const g = gs.find(([k]) => k === condition.value)?.[1] || (gs.length === 1 ? gs[0][1] : []);
      if (!g.length) return null;
      const ageMatches = g.filter(matchesAge);
      if (ageMatches.length === 1) return ageMatches[0];
      const f = frequency();
      if (f?.value) return g.find(r => r.id === f.value) || g[0];
      return g[0];
    }

    function requirements(r) {
      if (!r) return { age: false, weight: false, alternative: false };
      if (r.requiresAge !== undefined || r.requiresWeight !== undefined) {
        return { age: r.requiresAge === true, weight: r.requiresWeight === true, alternative: false };
      }
      if (r.type === 'label_weight_age_based') return { age: true, weight: true, alternative: true };
      if (['mg_per_kg_per_day','mg_per_kg_day','mg_per_kg_per_dose','mg_per_kg_single_dose','weight_based'].includes(r.type)) {
        return { age: false, weight: true, alternative: false };
      }
      if (['age_based','label_age_based','volume_by_age','sachet_age_based','sachet_schedule','probiotic_product'].includes(r.type)) {
        return { age: true, weight: false, alternative: false };
      }
      if (r.type === 'volume_per_kg') return { age: false, weight: true, alternative: false };
      return { age: false, weight: false, alternative: false };
    }

    function apply() {
      const r = selectedRegimen();
      const q = requirements(r);
      ageField.hidden = !q.age;
      weightField.hidden = !q.weight;
      if (!q.age && age) age.value = '';
      if (!q.weight && weight) weight.value = '';
      ageField.dataset.requirement = q.alternative ? 'age-or-weight' : q.age ? 'age' : 'none';
      weightField.dataset.requirement = q.alternative ? 'age-or-weight' : q.weight ? 'weight' : 'none';
    }

    medicine.addEventListener('change', () => setTimeout(apply, 0));
    condition.addEventListener('change', () => setTimeout(apply, 0));
    document.addEventListener('change', e => {
      if (e.target === document.getElementById('age-unit') || e.target === frequency()) setTimeout(apply, 0);
    });
    age?.addEventListener('input', () => setTimeout(apply, 0));
    apply();
  }

  if (window.DoseCareV2Ready) init();
  else document.addEventListener('dosecare:v2-ready', init, { once: true });
})();
