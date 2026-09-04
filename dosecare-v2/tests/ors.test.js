/* DoseCare V2 — ORS-specific regression tests. */
(function(){
  'use strict';
  const engine=window.DoseCareORS;
  const db=window.DoseCareV2Database;
  if(!engine||!db)throw new Error('DoseCare ORS engine/database not loaded');
  const tests=[];
  const assert=(c,m)=>{if(!c)throw new Error(m);};
  const near=(a,b,e=1e-9)=>Math.abs(a-b)<e;
  const test=(name,fn)=>tests.push({name,fn});
  test('ORS is registered with three WHO-based volume regimens',()=>{
    const m=db.getById('ors');
    assert(m,'Missing ORS');
    assert(m.formulations[0].volumeBased===true,'ORS must use volume-based formulation');
    assert(m.regimens.length===3,'Expected Plan A under 2, Plan A age 2–10, and Plan B');
  });
  test('ORS Plan A under 2 years returns 50–100 mL after each loose stool',()=>{
    const m=db.getById('ors'),r=m.regimens.find(x=>x.id==='plan-a-under-2');
    const result=engine.calculate({medicine:m,regimen:r,age:12,ageUnit:'months',formulation:m.formulations[0]});
    assert(result.ok,result.error||'Calculation failed');
    assert(near(result.lowMl,50)&&near(result.highMl,100),'Expected 50–100 mL');
  });
  test('ORS Plan A age 2–10 returns 100–200 mL after each loose stool',()=>{
    const m=db.getById('ors'),r=m.regimens.find(x=>x.id==='plan-a-2-to-10');
    const result=engine.calculate({medicine:m,regimen:r,age:5,ageUnit:'years',formulation:m.formulations[0]});
    assert(result.ok,result.error||'Calculation failed');
    assert(near(result.lowMl,100)&&near(result.highMl,200),'Expected 100–200 mL');
  });
  test('ORS Plan B calculates 75 mL/kg over 4 hours',()=>{
    const m=db.getById('ors'),r=m.regimens.find(x=>x.id==='plan-b-some-dehydration');
    const result=engine.calculate({medicine:m,regimen:r,weight:10,age:3,ageUnit:'years',formulation:m.formulations[0]});
    assert(result.ok,result.error||'Calculation failed');
    assert(near(result.lowMl,750),'Expected 750 mL total');
    assert(near(result.lowMl/4,187.5),'Expected about 187.5 mL/hour');
    assert(result.lowMg===null&&result.mgPerMl===null,'ORS must not be represented as mg or mg/mL');
  });
  window.DoseCareORSTests={run(){const results=tests.map(t=>{try{t.fn();return{name:t.name,passed:true};}catch(error){return{name:t.name,passed:false,error:error.message};}});return{passed:results.every(x=>x.passed),results};}};
})();
