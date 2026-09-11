/* DoseCare V2 — lightweight persistent UI language layer. */
(function () {
  'use strict';
  const KEY = 'dosecareV2Language';
  const dict = {
    'DOSE CALCULATOR':'حاسبة الجرعة', 'Select the medicine to begin.':'اختر الدواء للبدء.',
    'Search medicine':'بحث عن الدواء', 'Treatment':'الدواء', 'Select treatment':'اختر الدواء',
    'Condition':'الحالة', 'Select condition / regimen':'اختر الحالة / النظام العلاجي',
    'Condition / regimen':'الحالة / النظام العلاجي', 'Recommended pediatric dose':'الجرعة الموصى بها للأطفال',
    'Select a treatment first':'اختر الدواء أولاً', 'Select a condition / regimen to view the dose':'اختر الحالة / النظام العلاجي لعرض الجرعة',
    'Dose not configured':'الجرعة غير مهيأة', 'Age':'العمر', 'Weight':'الوزن', 'Weeks':'أسابيع', 'Months':'أشهر', 'Years':'سنوات',
    'Oral-liquid concentration':'تركيز المستحضر الفموي السائل', 'CALCULATE DOSE':'احسب الجرعة',
    'Regimen / frequency':'النظام العلاجي / التكرار', 'Calculation result':'نتيجة الحساب',
    'Back to calculator':'العودة إلى الحاسبة', 'PATIENT INFORMATION':'معلومات المريض',
    'Medicine':'الدواء', 'Pediatric dose':'جرعة الأطفال', 'Formulation':'المستحضر', 'Regimen':'النظام العلاجي',
    'STEP-BY-STEP CALCULATION':'الحساب خطوة بخطوة', 'ADDITIONAL DETAILS':'تفاصيل إضافية',
    'Active ingredient':'المادة الفعالة', 'Drug class':'الفئة الدوائية', 'Maximum daily dose':'الحد الأقصى للجرعة اليومية',
    'Calculated daily dose':'الجرعة اليومية المحسوبة', 'Mechanism of action':'آلية العمل', 'Indications':'دواعي الاستعمال',
    'Precautions & warnings':'الاحتياطات والتحذيرات', 'Adverse effects':'الآثار الجانبية', 'Interactions':'التداخلات الدوائية',
    'Notes':'ملاحظات', 'SOURCES & REFERENCES':'المصادر والمراجع', 'No source record attached.':'لا يوجد مصدر مرفق بهذا السجل.',
    'BACK TO CALCULATOR':'العودة إلى الحاسبة', 'No calculation found':'لم يتم العثور على عملية حساب.',
    'Return to the calculator and enter patient information.':'ارجع إلى الحاسبة وأدخل معلومات المريض.',
    'Result unavailable':'النتيجة غير متاحة', 'The calculation could not be read safely.':'تعذر قراءة نتيجة الحساب بشكل آمن.',
    'Not provided':'غير مُدخل', 'Not required':'غير مطلوب', 'Not available':'غير متاح', 'Not configured':'غير مهيأ',
    'See source label':'راجع ملصق المصدر', 'Not specified':'غير محدد', 'Not applicable':'لا ينطبق',
    'Search medicine':'بحث عن الدواء'
  };
  function language(){ return localStorage.getItem(KEY) || 'en'; }
  function translate(root){
    const lang=language();
    root.querySelectorAll('*').forEach(el=>{
      if(el.children.length) return;
      const text=el.textContent.trim();
      if(!text) return;
      if(lang==='ar' && dict[text]) el.textContent=dict[text];
      else if(lang==='en'){
        const original=Object.keys(dict).find(k=>dict[k]===text);
        if(original) el.textContent=original;
      }
    });
    root.querySelectorAll('[placeholder]').forEach(el=>{
      if(lang==='ar' && el.placeholder.startsWith('Type the first letters')) el.placeholder='اكتب الأحرف الأولى من اسم الدواء…';
      else if(lang==='en') el.placeholder='Type the first letters of a medicine…';
    });
    document.documentElement.lang=lang;
    document.documentElement.dir=lang==='ar'?'rtl':'ltr';
  }
  function addToggle(){
    if(document.getElementById('dosecare-language-toggle')) return;
    const topbar=document.querySelector('.topbar'); if(!topbar) return;
    const button=document.createElement('button');
    button.id='dosecare-language-toggle'; button.type='button'; button.className='language-toggle';
    button.addEventListener('click',()=>{localStorage.setItem(KEY,language()==='en'?'ar':'en');translate(document.body);button.textContent=language()==='en'?'عربي':'English';});
    topbar.appendChild(button);
    button.textContent=language()==='en'?'عربي':'English';
  }
  function boot(){ addToggle(); translate(document.body); const observer=new MutationObserver(()=>translate(document.body)); observer.observe(document.body,{childList:true,subtree:true,characterData:true}); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
