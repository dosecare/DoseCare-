/* DoseCare V2 — bilingual UI controller. */
(function () {
  'use strict';

  const KEY = 'dosecareLanguage';
  const translations = {
    'WELCOME': 'مرحبًا',
    'Pediatric Dose Calculator': 'حاسبة جرعات أدوية الأطفال',
    'Developed by': 'تطوير',
    'START CALCULATOR': 'ابدأ الحساب',
    'DOSE CALCULATOR': 'حاسبة الجرعة',
    'Select the medicine to begin.': 'اختر الدواء للبدء.',
    'Search medicine': 'البحث عن الدواء',
    'Type the first letters of a medicine…': 'اكتب الأحرف الأولى من اسم الدواء…',
    'Treatment': 'الدواء',
    'Select treatment': 'اختر الدواء',
    'Condition': 'الحالة',
    'Select condition / regimen': 'اختر الحالة / نظام الجرعة',
    'Recommended pediatric dose': 'جرعة الأطفال الموصى بها',
    'Select a treatment first': 'اختر الدواء أولًا',
    'Age': 'العمر',
    'Weight': 'الوزن',
    'Weeks': 'أسابيع',
    'Months': 'أشهر',
    'Years': 'سنوات',
    'Oral-liquid concentration': 'تركيز المستحضر الفموي السائل',
    'CALCULATE DOSE': 'احسب الجرعة',
    'Calculation result': 'نتيجة الحساب',
    'Back to calculator': 'العودة إلى الحاسبة',
    'PATIENT INFORMATION': 'معلومات المريض',
    'Medicine': 'الدواء',
    'Condition / regimen': 'الحالة / نظام الجرعة',
    'Formulation': 'الشكل والتركيز',
    'Regimen': 'نظام الجرعة',
    'STEP-BY-STEP CALCULATION': 'الحساب خطوة بخطوة',
    'ADDITIONAL DETAILS': 'تفاصيل إضافية',
    'Active ingredient': 'المادة الفعالة',
    'Drug class': 'الفئة الدوائية',
    'Maximum daily dose': 'الحد الأقصى للجرعة اليومية',
    'Calculated daily dose': 'الجرعة اليومية المحسوبة',
    'Mechanism of action': 'آلية العمل',
    'Indications': 'دواعي الاستعمال',
    'Precautions & warnings': 'الاحتياطات والتحذيرات',
    'Adverse effects': 'الآثار الجانبية',
    'Interactions': 'التداخلات الدوائية',
    'Notes': 'ملاحظات',
    'SOURCES & REFERENCES': 'المصادر والمراجع',
    'No source record attached.': 'لا يوجد مصدر مرفق.',
    'No calculation found': 'لم يتم العثور على عملية حساب',
    'Return to the calculator and enter patient information.': 'ارجع إلى الحاسبة وأدخل معلومات المريض.',
    'BACK TO CALCULATOR': 'العودة إلى الحاسبة',
    'Result unavailable': 'النتيجة غير متاحة',
    'The calculation could not be read safely.': 'تعذر قراءة نتيجة الحساب بشكل آمن.'
  };

  function addSwitcher() {
    document.querySelectorAll('.topbar').forEach(topbar => {
      if (topbar.querySelector('.language-switcher')) return;
      const wrap = document.createElement('div');
      wrap.className = 'language-switcher';
      wrap.setAttribute('aria-label', 'Language');
      wrap.innerHTML = '<button type="button" data-lang="ar">عربي</button><span aria-hidden="true">|</span><button type="button" data-lang="en">EN</button>';
      topbar.appendChild(wrap);
    });

    const welcome = document.querySelector('.welcome');
    if (welcome && !welcome.querySelector('.language-switcher')) {
      const wrap = document.createElement('div');
      wrap.className = 'language-switcher welcome-language-switcher';
      wrap.setAttribute('aria-label', 'Language');
      wrap.innerHTML = '<button type="button" data-lang="ar">عربي</button><span aria-hidden="true">|</span><button type="button" data-lang="en">EN</button>';
      welcome.appendChild(wrap);
    }
  }

  function translateStatic(root) {
    const walker = document.createTreeWalker(root || document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      const text = node.nodeValue.trim();
      if (!text || !translations[text]) return;
      if (!node.__dosecareOriginal) node.__dosecareOriginal = text;
      if (document.documentElement.lang === 'ar') node.nodeValue = node.nodeValue.replace(text, translations[text]);
      else node.nodeValue = node.nodeValue.replace(text, node.__dosecareOriginal);
    });

    document.querySelectorAll('[placeholder]').forEach(el => {
      if (!el.dataset.enPlaceholder) el.dataset.enPlaceholder = el.placeholder;
      if (document.documentElement.lang === 'ar') {
        if (el.id === 'medicine-search') el.placeholder = 'اكتب الأحرف الأولى من اسم الدواء…';
      } else el.placeholder = el.dataset.enPlaceholder;
    });
  }

  function setLanguage(lang) {
    const normalized = lang === 'ar' ? 'ar' : 'en';
    document.documentElement.lang = normalized;
    document.documentElement.dir = normalized === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('arabic-ui', normalized === 'ar');
    try { localStorage.setItem(KEY, normalized); } catch (_) {}
    translateStatic(document.body);
    document.querySelectorAll('.language-switcher button').forEach(button => {
      button.classList.toggle('active', button.dataset.lang === normalized);
      button.setAttribute('aria-pressed', String(button.dataset.lang === normalized));
    });
  }

  function init() {
    addSwitcher();
    document.addEventListener('click', event => {
      const button = event.target.closest('.language-switcher button');
      if (button) setLanguage(button.dataset.lang);
    });
    let saved = 'en';
    try { saved = localStorage.getItem(KEY) || 'en'; } catch (_) {}
    setLanguage(saved);
    const observer = new MutationObserver(mutations => {
      if (document.documentElement.lang !== 'ar') return;
      mutations.forEach(m => m.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) translateStatic(node);
      }));
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
