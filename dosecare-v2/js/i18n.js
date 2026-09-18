/* DoseCare V2 — persistent Arabic/English UI + medical-content translation layer. */
(function () {
  'use strict';

  const KEY = 'dosecareV2Language';

  const dict = {
    'DOSE CALCULATOR':'حاسبة الجرعة',
    'Select the medicine to begin.':'اختر الدواء للبدء.',
    'Search medicine':'بحث عن الدواء',
    'Treatment':'الدواء',
    'Select treatment':'اختر الدواء',
    'Condition':'الحالة',
    'Condition / regimen':'الحالة / النظام العلاجي',
    'Select condition / regimen':'اختر الحالة / النظام العلاجي',
    'Recommended pediatric dose':'الجرعة الموصى بها للأطفال',
    'Select a treatment first':'اختر الدواء أولاً',
    'Select a condition / regimen to view the dose':'اختر الحالة / النظام العلاجي لعرض الجرعة',
    'Dose not configured':'الجرعة غير مهيأة',
    'Age':'العمر','Weight':'الوزن','Weeks':'أسابيع','Months':'أشهر','Years':'سنوات',
    'Oral-liquid concentration':'تركيز المستحضر الفموي السائل',
    'CALCULATE DOSE':'احسب الجرعة',
    'Regimen / frequency':'النظام العلاجي / التكرار',
    'Calculation result':'نتيجة الحساب',
    'Back to calculator':'العودة إلى الحاسبة',
    'PATIENT INFORMATION':'معلومات المريض',
    'Medicine':'الدواء','Pediatric dose':'جرعة الأطفال','Formulation':'المستحضر','Regimen':'النظام العلاجي',
    'STEP-BY-STEP CALCULATION':'الحساب خطوة بخطوة',
    'ADDITIONAL DETAILS':'تفاصيل إضافية',
    'Active ingredient':'المادة الفعالة','Drug class':'الفئة الدوائية',
    'Maximum daily dose':'الحد الأقصى للجرعة اليومية',
    'Calculated daily dose':'الجرعة اليومية المحسوبة',
    'Mechanism of action':'آلية العمل','Indications':'دواعي الاستعمال',
    'Precautions & warnings':'الاحتياطات والتحذيرات',
    'Adverse effects':'الآثار الجانبية','Interactions':'التداخلات الدوائية',
    'Notes':'ملاحظات','SOURCES & REFERENCES':'المصادر والمراجع',
    'No source record attached.':'لا يوجد مصدر مرفق بهذا السجل.',
    'BACK TO CALCULATOR':'العودة إلى الحاسبة',
    'No calculation found':'لم يتم العثور على عملية حساب.',
    'Return to the calculator and enter patient information.':'ارجع إلى الحاسبة وأدخل معلومات المريض.',
    'Result unavailable':'النتيجة غير متاحة',
    'The calculation could not be read safely.':'تعذر قراءة نتيجة الحساب بشكل آمن.',
    'Not provided':'غير مُدخل','Not required':'غير مطلوب','Not available':'غير متاح',
    'Not configured':'غير مهيأ','See source label':'راجع ملصق المصدر','Not specified':'غير محدد',
    'Not applicable':'لا ينطبق','Source':'المصدر','Reference':'المرجع',
    'Volume-based rehydration':'إماهة محسوبة حسب الحجم',
    'Calculate total ORS volume':'حساب الحجم الكلي لمحلول الإماهة الفموي',
    'Age-based volume':'الحجم حسب العمر',
    'Scheduled regimen':'نظام علاجي مجدول',
    'Scheduled phase total':'إجمالي المرحلة المجدولة',
    'Label dose selection':'اختيار الجرعة من ملصق المستحضر',
    'Daily dose calculation':'حساب الجرعة اليومية',
    'Divide by frequency':'تقسيم الجرعة حسب التكرار',
    'Weight-based dose calculation':'حساب الجرعة حسب الوزن',
    'Maximum-dose check':'التحقق من الحد الأقصى للجرعة',
    'mg → mL conversion':'تحويل mg إلى mL',
    'Alternative frequency':'التكرار البديل',
    'Initial dose':'الجرعة الأولية',
    'This ORS regimen is calculated in mL, not mg. No drug concentration conversion is applied.':'يُحسب هذا النظام لمحلول الإماهة الفموي بوحدة mL وليس mg، ولا يُطبّق تحويل تركيز دوائي.',
    'The labeled time-dependent schedule was applied without collapsing the doses into a single daily frequency.':'تم تطبيق الجدول الزمني المحدد في المصدر دون دمج الجرعات في تكرار يومي واحد.',
    'The configured condition-based schedule was applied using the entered weight of':'تم تطبيق النظام المرتبط بالحالة باستخدام الوزن المُدخل وهو',
    'The configured pediatric regimen produced':'أنتج النظام العلاجي المخصص للأطفال',
    'Configured regimen':'النظام العلاجي المهيأ',
    'every 24 hours':'كل 24 ساعة',
    'Every 24 hours':'كل 24 ساعة',
    'every 12 hours':'كل 12 ساعة',
    'Every 12 hours':'كل 12 ساعة',
    'every 8 hours':'كل 8 ساعات',
    'Every 8 hours':'كل 8 ساعات',
    'every 6 hours':'كل 6 ساعات',
    'Every 6 hours':'كل 6 ساعات',
    'every 4 hours':'كل 4 ساعات',
    'Every 4 hours':'كل 4 ساعات',
    'once daily':'مرة واحدة يومياً',
    'Once daily':'مرة واحدة يومياً',
    'twice daily':'مرتين يومياً',
    'Twice daily':'مرتين يومياً',
    'three times daily':'ثلاث مرات يومياً',
    'Three times daily':'ثلاث مرات يومياً',
    'four times daily':'أربع مرات يومياً',
    'Four times daily':'أربع مرات يومياً',
    'as needed':'عند الحاجة',
    'Single dose':'جرعة واحدة',
    'Divided doses':'جرعات مقسمة',
    'Not applicable':'لا ينطبق'
  };

  /* Common medical phrases used by the medicine records. This is a translation
     layer only: it does not alter the underlying dose, source, or calculation. */
  const medical = [
    ['Macrolide antibacterial that inhibits bacterial protein synthesis by binding to the 50S ribosomal subunit.','مضاد بكتيري من مجموعة الماكروليدات يثبط تصنيع البروتين البكتيري من خلال الارتباط بالوحدة الريبوسومية 50S.'],
    ['Macrolide antibiotic','مضاد حيوي من مجموعة الماكروليدات'],
    ['Second-generation cephalosporin antibiotic','مضاد حيوي من السيفالوسبورينات من الجيل الثاني'],
    ['Third-generation cephalosporin antibiotic','مضاد حيوي من السيفالوسبورينات من الجيل الثالث'],
    ['Second-generation cephalosporin antibacterial','مضاد بكتيري من السيفالوسبورينات من الجيل الثاني'],
    ['Third-generation cephalosporin antibacterial','مضاد بكتيري من السيفالوسبورينات من الجيل الثالث'],
    ['Cephalosporin antibacterial','مضاد بكتيري من السيفالوسبورينات'],
    ['Aminopenicillin antibacterial','مضاد بكتيري من مجموعة الأمينوبنسلين'],
    ['Aminopenicillin/beta-lactamase inhibitor antibacterial','مضاد بكتيري من مجموعة الأمينوبنسلين مع مثبط بيتا-لاكتاماز'],
    ['Lincosamide antibacterial','مضاد بكتيري من مجموعة اللينكوساميدات'],
    ['Nitroimidazole antimicrobial','مضاد ميكروبي من مجموعة النيتروإيميدازول'],
    ['Sulfonamide + dihydrofolate reductase inhibitor antibacterial combination','مزيج مضاد بكتيري من السلفوناميد ومثبط إنزيم اختزال ثنائي هيدروفولات'],
    ['Nonsteroidal anti-inflammatory drug (NSAID)','مضاد التهاب غير ستيرويدي (NSAID)'],
    ['Analgesic / antipyretic','مسكن وخافض للحرارة'],
    ['Mucolytic agent','عامل مذيـب للبلغم'],
    ['Mucolytic','مذيب للبلغم'],
    ['Expectorant','طارد للبلغم'],
    ['Antitussive','مثبط للسعال'],
    ['Second-generation antihistamine','مضاد هيستامين من الجيل الثاني'],
    ['Second-generation H1 antihistamine','مضاد لمستقبلات H1 من الجيل الثاني'],
    ['Dopamine antagonist / antiemetic','مضاد لمستقبلات الدوبامين ومضاد للقيء'],
    ['Antiflatulent / antigas','مضاد للغازات وانتفاخ البطن'],
    ['Antimuscarinic antispasmodic','مضاد تشنج مضاد للمسكارين'],
    ['Mineral / micronutrient supplement','مكمل معدني / من المغذيات الدقيقة'],
    ['Cough suppressant','مثبط للسعال'],
    ['Beta-lactam antibacterial that inhibits bacterial cell-wall synthesis.','مضاد بكتيري من بيتا-لاكتام يثبط تصنيع جدار الخلية البكتيرية.'],
    ['inhibits bacterial cell-wall synthesis','يثبط تصنيع جدار الخلية البكتيرية'],
    ['inhibits bacterial protein synthesis','يثبط تصنيع البروتين البكتيري'],
    ['inhibits histamine-mediated allergic symptoms','يقلل الأعراض التحسسية الناتجة عن الهيستامين'],
    ['Selective peripheral H1-receptor antagonist that reduces histamine-mediated allergic symptoms.','مضاد انتقائي لمستقبلات H1 المحيطية يقلل الأعراض التحسسية الناتجة عن الهيستامين.'],
    ['Selective H1-receptor antagonist that reduces histamine-mediated allergic symptoms.','مضاد انتقائي لمستقبلات H1 يقلل الأعراض التحسسية الناتجة عن الهيستامين.'],
    ['Peripheral dopamine D2-receptor antagonist that increases upper gastrointestinal motility and reduces nausea and vomiting.','مضاد لمستقبلات الدوبامين D2 المحيطية يزيد حركة الجزء العلوي من الجهاز الهضمي ويقلل الغثيان والقيء.'],
    ['reduces mucus viscosity and supports clearance of respiratory secretions','يقلل لزوجة المخاط ويساعد على طرح الإفرازات التنفسية'],
    ['helps loosen and thin bronchial secretions, making mucus easier to clear by coughing','يساعد على تليين وتخفيف إفرازات الشعب الهوائية، مما يسهل طرح المخاط بالسعال'],
    ['reduces the cough reflex','يقلل منعكس السعال'],
    ['reduces surface tension of gas bubbles, facilitating their coalescence and passage','يقلل التوتر السطحي لفقاعات الغاز، مما يسهل تجمعها ومرورها'],
    ['reduces smooth-muscle spasm in the gastrointestinal tract','يقلل تشنج العضلات الملساء في الجهاز الهضمي'],
    ['Acute otitis media','التهاب الأذن الوسطى الحاد'],
    ['Acute bacterial sinusitis','التهاب الجيوب الأنفية البكتيري الحاد'],
    ['Community-acquired pneumonia','ذات الرئة المكتسبة من المجتمع'],
    ['Pharyngitis / tonsillitis','التهاب البلعوم / اللوزتين'],
    ['Pharyngitis and tonsillitis','التهاب البلعوم واللوزتين'],
    ['Acute maxillary sinusitis','التهاب الجيب الفكي الحاد'],
    ['Otitis media','التهاب الأذن الوسطى'],
    ['Respiratory tract infections','التهابات الجهاز التنفسي'],
    ['Skin and skin-structure infections','التهابات الجلد وبُنى الجلد'],
    ['Urinary tract infections','التهابات المسالك البولية'],
    ['Nausea and vomiting','الغثيان والقيء'],
    ['Pain / fever','الألم / الحمى'],
    ['Gas symptoms','أعراض الغازات'],
    ['Gastrointestinal spasm','تشنج الجهاز الهضمي'],
    ['Cough with chest congestion / excessive mucus','السعال مع احتقان الصدر / زيادة المخاط'],
    ['Perennial allergic rhinitis','التهاب الأنف التحسسي المستمر'],
    ['Chronic urticaria','الشرى المزمن'],
    ['Allergic rhinitis','التهاب الأنف التحسسي'],
    ['Hay fever / allergic rhinitis symptoms','أعراض حمى القش / التهاب الأنف التحسسي'],
    ['Serious bacterial infection','عدوى بكتيرية شديدة'],
    ['Severe bacterial infection','عدوى بكتيرية شديدة'],
    ['More severe bacterial infection','عدوى بكتيرية أشد'],
    ['Mild to moderate susceptible bacterial infections','عدوى بكتيرية حساسة خفيفة إلى متوسطة الشدة'],
    ['Amebiasis','داء الأميبات'],
    ['Amebic liver abscess','خراج الكبد الأميبي'],
    ['Shigellosis','داء الشيغيلات'],
    ['Urinary tract infection','عدوى المسالك البولية'],
    ['Acute diarrhea — adjunct to ORS','الإسهال الحاد — علاج مساعد مع محلول الإماهة الفموي'],
    ['Mild to moderate upper respiratory tract infections caused by susceptible organisms','التهابات الجهاز التنفسي العلوي الخفيفة إلى المتوسطة الناتجة عن كائنات حساسة'],
    ['Mild to moderate lower respiratory tract infections caused by susceptible organisms','التهابات الجهاز التنفسي السفلي الخفيفة إلى المتوسطة الناتجة عن كائنات حساسة'],
    ['Temporary reduction of fever','خفض مؤقت للحمى'],
    ['Temporary relief of minor aches and pains','تخفيف مؤقت للآلام والأوجاع البسيطة'],
    ['Diarrhea','الإسهال'],['Nausea','الغثيان'],['Vomiting','القيء'],['Abdominal pain','ألم البطن'],
    ['Abdominal discomfort','انزعاج البطن'],['Headache','الصداع'],['Dizziness','الدوخة'],
    ['Fatigue','التعب'],['Dry mouth','جفاف الفم'],['Rash','الطفح الجلدي'],
    ['Hypersensitivity reactions','تفاعلات فرط الحساسية'],['Somnolence','النعاس'],
    ['Drowsiness','النعاس'],['Nausea and vomiting','الغثيان والقيء'],
    ['Gastrointestinal discomfort','انزعاج الجهاز الهضمي'],
    ['Gastrointestinal ulceration or bleeding','تقرح أو نزيف الجهاز الهضمي'],
    ['Renal impairment','قصور وظائف الكلى'],['Hepatic impairment','قصور وظائف الكبد'],
    ['Severe skin reactions','تفاعلات جلدية شديدة'],
    ['Serious gastrointestinal bleeding can occur.','قد يحدث نزيف خطير في الجهاز الهضمي.'],
    ['Severe allergic reactions can occur.','قد تحدث تفاعلات تحسسية شديدة.'],
    ['Use only for infections for which','استخدم فقط للعدوى التي يكون فيها'],
    ['Use the lowest effective dose for the shortest duration necessary.','استخدم أقل جرعة فعالة لأقصر مدة ضرورية.'],
    ['Do not exceed','لا تتجاوز'],
    ['Ask a doctor before use','استشر الطبيب قبل الاستخدام'],
    ['Seek medical advice','اطلب المشورة الطبية'],
    ['Use with caution','استخدم بحذر'],
    ['Contraindicated','ممنوع الاستخدام في'],
    ['Hypersensitivity to','فرط الحساسية تجاه'],
    ['Shake well before use.','رُج جيداً قبل الاستخدام.'],
    ['Shake well before each use.','رُج جيداً قبل كل استخدام.'],
    ['Use an accurate measuring device','استخدم أداة قياس دقيقة'],
    ['oral suspension','معلق فموي'],['Oral suspension','معلق فموي'],
    ['Oral solution','محلول فموي'],['Oral Solution','محلول فموي'],
    ['Oral syrup','شراب فموي'],['Oral Syrup','شراب فموي'],
    ['Oral drops','قطرات فموية'],
    ['Extended-release oral suspension','معلق فموي ممتد المفعول'],
    ['Every 4 hours as needed','كل 4 ساعات عند الحاجة'],
    ['Every 6–8 hours as needed','كل 6–8 ساعات عند الحاجة'],
    ['Four times daily','أربع مرات يومياً'],
    ['Three times daily','ثلاث مرات يومياً'],
    ['Two times daily','مرتين يومياً'],
    ['Twice daily','مرتين يومياً'],
    ['Once daily','مرة واحدة يومياً'],
    ['Every 12 hours','كل 12 ساعة'],['Every 8 hours','كل 8 ساعات'],['Every 6 hours','كل 6 ساعات'],
    ['Every 24 hours','كل 24 ساعة'],['Single dose','جرعة واحدة'],
    ['as needed','عند الحاجة'],['at bedtime','عند وقت النوم'],
    ['after meals','بعد الوجبات'],['with food','مع الطعام'],['without food','دون التقيد بالطعام'],
    ['Children under 2 years','الأطفال دون عمر سنتين'],
    ['pediatric patients','المرضى من الأطفال'],['pediatric patient','مريض من الأطفال'],
    ['not established','لم تثبت سلامته/فعاليته'],['not recommended','غير موصى به'],
    ['maximum daily dose','الحد الأقصى للجرعة اليومية'],
    ['daily dose','الجرعة اليومية'],['per dose','لكل جرعة'],
    ['mg/kg/day','mg/kg/day'],['mg/kg/dose','mg/kg/dose']
  ];

  function language(){ return localStorage.getItem(KEY) || 'en'; }

  // Full medical phrase layer. Terminology is aligned with the WHO Eastern Mediterranean
  // Unified Medical Dictionary; medicine-specific content remains faithful to the source label.
  const fullMedical = {
    'Analgesic / antipyretic':'مسكن وخافض للحرارة',
    'Nonsteroidal anti-inflammatory drug (NSAID)':'مضاد التهاب غير ستيرويدي (NSAID)',
    'Mucolytic agent':'عامل حالّ للبلغم',
    'Mucolytic':'حالّ للبلغم',
    'Expectorant':'طارد للبلغم',
    'Antitussive':'مثبط للسعال',
    'Aminopenicillin antibacterial':'مضاد بكتيري من مجموعة الأمينوبنسلين',
    'Cephalosporin antibacterial':'مضاد بكتيري من مجموعة السيفالوسبورينات',
    'Second-generation cephalosporin antibacterial':'مضاد بكتيري من الجيل الثاني من السيفالوسبورينات',
    'Third-generation cephalosporin antibacterial':'مضاد بكتيري من الجيل الثالث من السيفالوسبورينات',
    'Macrolide antibacterial':'مضاد بكتيري من مجموعة الماكروليدات',
    'Macrolide antibiotic':'مضاد حيوي من مجموعة الماكروليدات',
    'Lincosamide antibacterial':'مضاد بكتيري من مجموعة اللينكوساميدات',
    'Nitroimidazole antimicrobial':'مضاد للميكروبات من مجموعة النيتروإيميدازول',
    'Second-generation antihistamine':'مضاد هيستامين من الجيل الثاني',
    'Second-generation H1 antihistamine':'مضاد هيستامين انتقائي لمستقبلات H1 من الجيل الثاني',
    'First-generation H1 antihistamine':'مضاد هيستامين من الجيل الأول لمستقبلات H1',
    'Selective 5-HT3 receptor antagonist; antiemetic':'مضاد انتقائي لمستقبلات 5-HT3؛ مضاد للقيء',
    'Systemic glucocorticoid (corticosteroid)':'غلوكوكورتيكويد جهازي (كورتيكوستيرويد)',
    'Antimuscarinic antispasmodic':'مضاد للتشنج ذو تأثير مضاد للمسكارين',
    'Gastrointestinal / Antispasmodic':'دوائي هضمي / مضاد للتشنج',
    'Temporary reduction of fever':'خفض مؤقت للحمى',
    'Temporary relief of minor aches and pains':'تخفيف مؤقت للآلام والأوجاع البسيطة',
    'Respiratory tract conditions with excessive/viscous mucus':'حالات الجهاز التنفسي المصحوبة بزيادة أو لزوجة الإفرازات المخاطية',
    'Respiratory tract disorders with excessive, viscous mucus':'اضطرابات الجهاز التنفسي المصحوبة بزيادة ولزوجة المخاط',
    'Respiratory tract disorders with viscid mucoid secretions':'اضطرابات الجهاز التنفسي المصحوبة بإفرازات مخاطية لزجة',
    'Cough with chest congestion / excessive mucus':'السعال المصحوب باحتقان صدري أو زيادة المخاط',
    'Acute otitis media':'التهاب الأذن الوسطى الحاد',
    'Acute bacterial sinusitis':'التهاب الجيوب الأنفية البكتيري الحاد',
    'Acute maxillary sinusitis':'التهاب الجيب الفكي الحاد',
    'Community-acquired pneumonia':'ذات الرئة المكتسبة من المجتمع',
    'Pharyngitis / tonsillitis':'التهاب البلعوم / التهاب اللوزتين',
    'Pharyngitis and tonsillitis':'التهاب البلعوم والتهاب اللوزتين',
    'Streptococcus pyogenes infection':'عدوى العقدية المقيحة (Streptococcus pyogenes)',
    'Otitis media':'التهاب الأذن الوسطى',
    'Pain / fever':'الألم / الحمى',
    'Pain including muscular, traumatic and dental pain':'الألم، بما في ذلك الألم العضلي والرضحي وألم الأسنان',
    'Headache':'الصداع',
    'Diarrhea':'الإسهال',
    'Nausea':'الغثيان',
    'Vomiting':'القيء',
    'Abdominal pain':'ألم البطن',
    'Abdominal discomfort':'انزعاج البطن',
    'Rash':'الطفح الجلدي',
    'Hypersensitivity reactions':'تفاعلات فرط الحساسية',
    'Drowsiness':'النعاس',
    'Dizziness':'الدوخة',
    'Fatigue':'التعب',
    'Dry mouth':'جفاف الفم',
    'Constipation':'الإمساك',
    'Headache, nausea, abdominal pain and vomiting may occur.':'قد يحدث الصداع والغثيان وألم البطن والقيء.',
    'Hypersensitivity reactions can occur.':'قد تحدث تفاعلات فرط الحساسية.',
    'Severe skin reactions can occur.':'قد تحدث تفاعلات جلدية شديدة.',
    'Serious gastrointestinal bleeding can occur.':'قد يحدث نزف هضمي خطير.',
    'Do not use with another medicine containing acetaminophen.':'لا تستخدمه مع دواء آخر يحتوي على الأسيتامينوفين.',
    'Ask a doctor before use if the child has liver disease.':'استشر الطبيب قبل الاستخدام إذا كان الطفل مصابًا بمرض كبدي.',
    'Use only for infections for which azithromycin is an appropriate antibacterial choice.':'يُستخدم فقط للعدوى التي يكون فيها أزيثروميسين خيارًا مناسبًا للعلاج بمضاد بكتيري.',
    'Use only for infections for which the selected regimen is appropriate.':'يُستخدم فقط للعدوى التي يكون فيها النظام العلاجي المحدد مناسبًا.',
    'Use the lowest effective dose for the shortest duration necessary.':'استخدم أقل جرعة فعالة لأقصر مدة ضرورية.',
    'Do not combine with other NSAIDs unless specifically directed.':'لا تجمعه مع مضادات الالتهاب غير الستيرويدية الأخرى إلا بتوجيه طبي محدد.',
    'Use an appropriate measuring device for liquid dosing.':'استخدم أداة قياس مناسبة لجرعات المستحضر السائل.',
    'Shake well before use.':'رُج العبوة جيدًا قبل الاستخدام.',
    'Shake well before each use.':'رُج العبوة جيدًا قبل كل استخدام.',
    'Shake well before each dose.':'رُج العبوة جيدًا قبل كل جرعة.',
    'Every 4 hours as needed':'كل 4 ساعات عند الحاجة',
    'Every 6–8 hours as needed':'كل 6–8 ساعات عند الحاجة',
    'Every 8 hours':'كل 8 ساعات',
    'Every 12 hours':'كل 12 ساعة',
    'Every 24 hours':'كل 24 ساعة',
    'Once daily':'مرة واحدة يوميًا',
    'Twice daily':'مرتان يوميًا',
    'Three times daily':'ثلاث مرات يوميًا',
    'Four times daily':'أربع مرات يوميًا',
    'Single dose':'جرعة واحدة',
    'Do not exceed':'لا تتجاوز',
    'Oral suspension':'معلق فموي',
    'Oral solution':'محلول فموي',
    'Oral syrup':'شراب فموي',
    'Extended-release oral suspension':'معلق فموي ممتد المفعول',
    'For oral use.':'للاستخدام عن طريق الفم.',
    'For oral use':'للاستخدام عن طريق الفم',
    'mild to moderate':'خفيف إلى متوسط',
    'severe infections':'العدوى الشديدة',
    'serious bacterial infection':'عدوى بكتيرية خطيرة',
    'susceptible bacterial infections':'العدوى البكتيرية الحساسة للدواء',
    'bacterial cell-wall synthesis':'تصنيع جدار الخلية البكتيرية',
    'bacterial protein synthesis':'تصنيع البروتين في البكتيريا',
    '50S ribosomal subunit':'الوحدة الريبوسومية 50S',
    'beta-lactamase':'بيتا-لاكتاماز',
    'prostaglandin synthesis':'تصنيع البروستاغلاندينات',
    'prostaglandin activity':'نشاط البروستاغلاندينات',
    'renal impairment':'قصور كلوي',
    'hepatic impairment':'قصور كبدي',
    'gastrointestinal':'الجهاز الهضمي',
    'respiratory tract':'الجهاز التنفسي',
    'skin and skin-structure infections':'عدوى الجلد والأنسجة الجلدية',
    'urinary tract infections':'عدوى المسالك البولية',
    'adverse effects':'الآثار الجانبية',
    'warnings and precautions':'التحذيرات والاحتياطات',
    'contraindications':'موانع الاستعمال',
    'interactions':'التداخلات الدوائية',
    'administration':'طريقة الإعطاء',
    'pediatric use':'الاستخدام لدى الأطفال',
    'monitoring':'المراقبة',
    'clinical response':'الاستجابة السريرية'
  };

  function replaceMedical(text){
    let out=String(text);
    medical.concat(Object.entries(fullMedical)).sort((a,b)=>b[0].length-a[0].length).forEach(([en,ar])=>{
      out=out.split(en).join(ar);
    });
    return out;
  }

  function translateMedicineSpecific(root){
    const state=window.DoseCareV2ResultMedicine;
    const db=window.DoseCareV2Arabic;
    if(!state || !db || !db[state.id]) return;
    const ar=db[state.id];
    root.querySelectorAll('.medical-dynamic[data-medical-field]').forEach(el=>{
      if(!el.dataset.i18nOriginal) el.dataset.i18nOriginal=el.textContent;
      const field=el.dataset.medicalField;
      const original=el.dataset.i18nOriginal;
      if(language()==='en'){
        el.textContent=original;
        return;
      }
      let value=ar[field];
      if(Array.isArray(value)) value=value.join(' • ');
      el.textContent=(value!=null && String(value).trim()) ? value : replaceMedical(original);
    });
  }

  function translate(root){
    const lang=language();
    translateMedicineSpecific(root);

    root.querySelectorAll('*').forEach(el=>{
      if(el.children.length) return;
      const text=el.textContent.trim();
      if(!text) return;
      if(lang==='ar'){
        if(dict[text]) el.textContent=dict[text];
        else if(el.closest('.medical-dynamic')) el.textContent=replaceMedical(text);
      }else{
        /* English is the source language; don't try to reverse medical prose. */
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
    button.id='dosecare-language-toggle';
    button.type='button';
    button.className='language-toggle';
    button.setAttribute('aria-label','Change language');
    button.title='Change language';
    button.addEventListener('click',()=>{
      localStorage.setItem(KEY,language()==='en'?'ar':'en');
      translate(document.body);
      button.textContent=language()==='en'?'عربي':'English';
    });
    topbar.appendChild(button);
    button.textContent=language()==='en'?'عربي':'English';
  }

  function boot(){
    // The welcome screen is intentionally English-only and should not pay the
    // translation/observer cost.
    if(document.body.classList.contains('welcome-page')) return;

    addToggle();
    translate(document.body);

    // Dynamic calculator/result content can change several times in one tick.
    // Debounce translation so we do one DOM pass instead of translating the
    // entire page for every individual mutation.
    let scheduled=false;
    const observer=new MutationObserver(()=>{
      if(scheduled) return;
      scheduled=true;
      setTimeout(()=>{
        scheduled=false;
        translate(document.body);
      },80);
    });
    observer.observe(document.body,{childList:true,subtree:true,characterData:true});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot);
  else boot();
})();