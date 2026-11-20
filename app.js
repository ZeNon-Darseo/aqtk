/* ============================================================
   AQTK — interactions
   ============================================================ */
(function () {
  "use strict";
  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Motion preference (user toggle) ---------- */
  const AOM_KEY = "aqtk_motion_off";
  let motionOff = false;
  try { motionOff = localStorage.getItem(AOM_KEY) === "1"; } catch (e) {}
  if (reduce) motionOff = true;
  const applyMotion = () => document.documentElement.classList.toggle("aom", motionOff);
  applyMotion();

  /* ---------- i18n ---------- */
  const kz = {
    top_addr:"Ақтөбе қ., Ватутин к-сі, 1", top_hours:"Дс–Жм · 09:00–18:00", brand_sub:"Колледж · Ақтөбе",
    nav_about:"Колледж туралы", nav_study:"Оқу", nav_students:"Студенттерге", nav_admission:"Талапкерге", nav_production:"Өндіріс", nav_news:"Жаңалықтар", nav_contacts:"Байланыс", nav_cta:"Өтінім беру",
    hero_eyebrow:"Ақтөбе · Қазақстан · мемлекеттік колледж",
    hero_title:"Болашақты<br>өз <em>қолымызбен</em> құрамыз.",
    hero_sub:"Ақтөбе құрылыс және технология колледжі — құрылыс, электрмен жабдықтау, IT және дәнекерлеу ісі саласында сұранысқа ие мамандар даярлайтын мемлекеттік оқу орны.",
    hero_cta1:"Мамандық таңдау", hero_cta2:"Қабылдау комиссиясы", hero_chip1:"мамандық", hero_chip2:"жұмысқа орналасу", hero_chip3:"Дуальды оқыту", hero_scroll:"Төмен қарай",
    stat1:"жыл кадр даярлау", stat2:"бүгінгі студент", stat3:"ТиПО мамандығы", stat4:"түлек жұмысқа орналасқан",
    about_badge:"құрылған жылы", about_caption:"Бас корпус · Ватутин к-сі, 1, Ақтөбе", about_eyebrow:"Колледж туралы",
    about_title:"<em>Шеберлік</em> туатын орын",
    about_lead:"Сексен жылдан астам уақыт бойы колледж өңірді құратын, жарықтандыратын және байланыстыратын мамандар даярлайды.",
    about_p1:"AQTK — заманауи материалдық-техникалық база, дәнекерлеу шеберханалары, IT-зертханалар және электротехникалық кабинеттер. Біз теорияны дуальды оқыту жүйесі бойынша серіктес кәсіпорындардағы нақты тәжірибемен ұштастырамыз.",
    about_p2:"Біздің студенттер — WorldSkills Kazakhstan чемпионаттарының жүлдегерлері, ал түлектер Ақтөбе облысы мен бүкіл Қазақстанның жетекші құрылыс, энергетика және IT-компанияларында сұранысқа ие.",
    val1_t:"1-курстан тәжірибе", val1_s:"Шеберханалар мен нақты нысандар", val2_t:"Жұмыс кепілдігі", val2_s:"40+ серіктес кәсіпорын", val3_t:"Мемлекеттік гранттар", val3_s:"Бюджеттік орындар мен стипендия", val4_t:"WorldSkills", val4_s:"Кәсіби шеберлік чемпионаттары",
    director_name:"Есенгалиева Гулден Утежановна", director_role:"Колледж директоры · мемлекеттік оқу орны, Ақтөбе.",
    dept_eyebrow:"Бөлімдер", dept_title:"Үш бөлім — <em>бір стандарт</em>", dept_lead:"Әр бөлім өз профильдік даярлығын заманауи жабдықта, сала практиктерінің жетекшілігімен жүргізеді.",
    dept1_t:"Электрмен жабдықтау және IT", dept1_s:"Энергетика, электр монтажі, бағдарламалау және компьютерлік желілер.", dept1_m:"3 мамандық · 4 зертхана",
    dept2_t:"Газ-электр дәнекерлеу және құрылыс", dept2_s:"Дәнекерлеу өндірісі, ғимарат пен жол құрылысы.", dept2_m:"3 мамандық · 6 шеберхана",
    dept3_t:"Жалпы білім беретін пәндер", dept3_s:"Іргелі даярлық, тілдер және цифрлық сауаттылық.", dept3_m:"12 пән · 1-курс",
    spec_eyebrow:"Оқу · мамандықтар", spec_title:"Өз <em>мамандығыңызды</em> таңдаңыз", spec_lead:"ТиПО-ның мемлекеттік білім беру бағдарламалары. Толық мәлімет, оқу мерзімі мен мансап перспективасын көру үшін мамандықты басыңыз.",
    spec_f_all:"Барлық мамандық", spec_f_it:"Электрмен жабдықтау және IT", spec_f_weld:"Дәнекерлеу және құрылыс",
    spec_dept_build:"Дәнекерлеу және құрылыс бөлімі", spec_dept_it:"Электрмен жабдықтау және IT бөлімі",
    spec_dur1:"2 ж 10 ай · 3 ж 10 ай", spec_dur2:"2 ж 10 ай · 3 ж 10 ай",
    spec1_desc:"Ғимараттарды жобалау, тұрғызу және пайдалану бойынша мамандар даярлау. Студенттер құрылыс материалдарын, конструкцияларды, смета ісін зерделейді және BIM-технологиялармен, геодезиялық жабдықпен жұмыс істейді.",
    spec2_desc:"Өңірдің ең сұранысқа ие мамандықтарының бірі. Қол доғалы, жартылай автоматты және аргон-доғалы дәнекерлеу, сызбаларды оқу, жіктердің сапасын бақылау. Түлектер халықаралық сертификаттар мен разрядтар алады.",
    spec3_desc:"Кәсіпорындар мен желілердің электрожабдығын монтаждау, жөндеу және пайдалану. Электротехника, релелік қорғау, автоматика, өнеркәсіптік қауіпсіздік және өлшеу аспаптарымен жұмыс.",
    spec4_desc:"Веб және мобильді қосымшалар әзірлеу, дерекқорлар, алгоритмдер мен тестілеу. Заманауи технологиялар стекі, жобалық жұмыс және өңірдің IT-компанияларындағы тағылымдамалар.",
    spec5_desc:"Компьютерлік техниканы құрастыру және қызмет көрсету, жергілікті желілерді құру және әкімшілендіру, киберқауіпсіздік және серверлік жабдық. Нақты желілік жабдықта тәжірибе.",
    spec6_desc:"Автомобиль жолдары мен аэродром жабындарын жобалау, салу және күтіп ұстау. Жол материалдары, геодезия, машиналар мен механизмдер, жол жұмыстарын ұйымдастыру.",
    spec_base:"База: 9 / 11-сынып", spec_grant:"Грант + ақылы", spec_dual:"Дуальды оқыту", spec_cert:"НАКС сертификаты", spec_group:"1000 В дейін рұқсат", spec_lab:"Өз IT-зертханасы", spec_intern:"Тағылымдамалар", spec_cyber:"Киберқауіпсіздік", spec_net:"Желілер мен серверлер", spec_demand:"Жоғары сұраныс",
    sk_estimate:"Смета ісі", sk_geo:"Геодезия", sk_qc:"Сапаны бақылау", sk_relay:"Релелік қорғау", sk_auto:"Автоматика", sk_mount:"Электр монтажі", sk_net:"Желілер", sk_hw:"Hardware", sk_roads:"Жол жұмыстары", sk_mat:"Материалдар",
    spec_apply:"Мамандыққа түсу",
    life_eyebrow:"Студенттерге", life_title:"<em>Оқу мен өмір</em> үшін бәрі", life_lead:"Цифрлық сервистер, қолдау және қанық студенттік өмір — кестеден кәсіби шеберлік чемпионаттарына дейін.",
    life1_t:"Сабақ кестесі", life1_s:"Барлық топтар үшін пар, емтихан және консультация кестесі онлайн.", life2_t:"Электрондық оқыту", life2_s:"Курстар, дәрістер, тесттер және электрондық журнал бар Moodle порталы.", life3_t:"Жатақхана", life3_s:"Қаладан тыс студенттерге корпустар жанындағы жайлы жатақхана.", life4_t:"Стипендия мен грант", life4_s:"Мемлекеттік стипендиялар, атаулы гранттар және әлеуметтік қолдау.", life5_t:"Кітапхана", life5_s:"Электрондық каталог, оқу залдары және оқу әдебиетіне қолжетімділік.", life6_t:"WorldSkills және клубтар", life6_s:"Чемпионаттарға дайындық, спорт, шығармашылық және студенттік өзін-өзі басқару.", life_open:"Ашу", life_more:"Толығырақ",
    adm_eyebrow:"Талапкерге · қабылдау 2026", adm_title:"Түсу — <em>оңай</em>", adm_lead:"Мемлекеттік гранттар мен ақылы бөлімге құжат қабылдау. Өтінім қалдырыңыз — қабылдау комиссиясы сізбен хабарласып, мамандық таңдауға көмектеседі.",
    step1_t:"Өтінім қалдырыңыз", step1_s:"Сайттағы форманы толтырыңыз немесе қабылдау комиссиясына қоңырау шалыңыз.", step2_t:"Құжаттарды жинаңыз", step2_s:"Аттестат, жеке куәлік, 3×4 фото және 075-У меданықтамасы.", step3_t:"Әңгімелесуден өтіңіз", step3_s:"Мамандық бойынша консультация және құжат түпнұсқаларын тапсыру.", step4_t:"Қабылдау", step4_s:"Қабылдау туралы бұйрық, студенттік билет және оқудың басталуы.",
    docs_t:"Түсуге арналған құжаттар", doc1:"Білім туралы аттестат (түпнұсқа)", doc2:"Жеке куәлік / туу туралы куәлік", doc3:"3×4 көлемінде 4 фото", doc4:"075-У меданықтамасы және 063 екпе картасы", doc5:"ЕНТ / грант сертификаты (болса)", cl_reset:"Тазалау", dl_rules:"Қабылдау қағидалары (PDF)", dl_brochure:"Колледж брошюрасы (PDF)",
    form_t:"Түсуге өтінім", form_sub:"Форманы толтырыңыз — жұмыс күні ішінде қайта қоңырау шаламыз.", form_name:"Аты-жөні", form_name_err:"Аты-жөніңізді көрсетіңіз", form_phone:"Телефон", form_phone_err:"Дұрыс нөмір енгізіңіз", form_base:"Оқу базасы", form_base9:"9-сынып", form_base11:"11-сынып", form_spec:"Мамандық", form_spec_ph:"Мамандықты таңдаңыз", form_spec_err:"Мамандықты таңдаңыз", form_msg:"Түсініктеме (міндетті емес)", form_submit:"Өтінім жіберу", form_note:"Түймені басу арқылы сіз дербес деректерді өңдеуге келісесіз.", form_ok_t:"Өтінім қабылданды!", form_ok_s:"Рақмет! Қабылдау комиссиясы жақын арада сізбен хабарласады.", form_again:"Тағы бір өтінім беру", form_sending:"Жіберілуде…", form_err:"Өтінімді жіберу мүмкін болмады. Бізге қоңырау шалыңыз: +7 702 144 64 04.",
    prod_eyebrow:"Оқу-өндірістік жұмыс", prod_title:"<em>Нақты өндірісте</em> үйренеміз", prod_lead:"Дуальды оқыту, өз шеберханаларымыз және кәсіби шеберлік чемпионаттары — студенттеріміз бірінші курстан нақты жабдықпен жұмыс істейді.",
    prod1_t:"WorldSkills Kazakhstan", prod1_s:"Дәнекерлеу, электр монтажі және IT бойынша өңірлік және республикалық чемпионаттардың жүлдегерлері.", prod2_t:"Өз шеберханаларымыз", prod2_s:"6 дәнекерлеу посты, электротехникалық және IT-зертханалар, құрылыс алаңы.", prod3_t:"Ақылы тәжірибе", prod3_s:"Жұмысқа орналасумен серіктес кәсіпорындардағы өндірістік тәжірибе.", partners_label:"Серіктес кәсіпорындар",
    news_eyebrow:"Жаңалықтар мен оқиғалар", news_title:"<em>Колледж</em> өмірі", news_all:"Барлығы", news_events:"Оқиғалар", news_ws:"WorldSkills", news_adm:"Қабылдау", news_read:"Оқу", news_all_btn:"Барлық жаңалық",
    insta_eyebrow:"Біз әлеуметтік желіде", insta_follow:"Жазылу",
    trust_t:"Адал қабылдау және сыбайлас жемқорлыққа қарсы саясат", trust_s:"Қабылдау — тек құжаттар бойынша және конкурс негізінде. Кез келген бұзушылық туралы сенім телефонына хабарлаңыз.", trust_btn:"Сенім телефоны",
    cont_eyebrow:"Байланыс", cont_title:"<em>Танысуға</em> келіңіз", cont_addr:"Мекенжай", cont_addr_s:"Ақтөбе облысы, Қазақстан", cont_phone:"Қабылдау комиссиясы", cont_phone_s:"Дс–Жм · 09:00–18:00", cont_mail_s:"Күні ішінде жауап береміз", cont_social:"Әлеуметтік желі", cont_map:"Картадан ашу",
    foot_about:"Ақтөбе құрылыс және технология колледжі. Техникалық және кәсіптік білім беретін мемлекеттік оқу орны.", foot_c1:"Колледж", foot_c2:"Оқу", foot_c3:"Байланыс", foot_rights:"Ақтөбе құрылыс және технология колледжі", foot_privacy:"Құпиялылық саясаты", foot_terms:"Жария оферта",
    chat_title:"AQTK қабылдауы", chat_status:"онлайн · бірден жауап береміз",
    nav_college:"Колледж", nav_history:"Тарих", nav_management:"Басшылық", nav_staff:"Оқытушылар", nav_achievements:"Жетістіктер", nav_accreditation:"Құжаттар", nav_schedule:"Сабақ кестесі", nav_services:"Сервистер", nav_employment:"Тәжірибе", nav_dormitory:"Жатақхана", nav_media:"БАҚ", nav_symbols:"Рәміздер",
    act_read:"Оқу", act_watch:"Көру",
    hist_eyebrow:"Колледж тарихы", hist_title:"<em>80 жылдан</em> астам кадр даярлау", hist_lead:"Ақтөбе құрылыс және технология колледжі — бай тарихы бар мемлекеттік оқу орны. Колледж кәсіптік училищеден заманауи көпбейінді колледжге дейінгі жолды жүріп өтті.", hist_cap:"Бас корпус · Ватутин к-сі, 1, Ақтөбе",
    hist_y1:"1944", hist_1t:"Құрылуы", hist_1s:"Ақтөбе облысының құрылыс саласы үшін білікті жұмысшылар даярлайтын оқу орнының құрылуы.",
    hist_y2:"1960-жж.", hist_2t:"Кеңею", hist_2s:"Жаңа мамандықтардың ашылуы: электр монтажі, дәнекерлеу өндірісі, құрылыс технологиялары.",
    hist_y3:"1990-жж.", hist_3t:"Жаңғырту", hist_3s:"Орта буын мамандарын даярлауға көшу, ТиПО-ның жаңа білім беру бағдарламаларын енгізу.",
    hist_y4:"2000-жж.", hist_4t:"Цифрландыру", hist_4s:"IT-зертханалардың құрылуы, электрондық оқытуды енгізу, WorldSkills чемпионаттарына қатысу.",
    hist_y5:"2020-жж.", hist_5t:"Болашақ колледжі", hist_5s:"Дуальды оқыту, халықаралық сертификаттар, түлектердің 98% жұмысқа орналасуы.",
    mgmt_eyebrow:"Басқару құрылымы", mgmt_title:"Колледж <em>басшылығы</em>", mgmt_dir_name:"Есенгалиева Гулден Утежановна", mgmt_dir_role:"Колледж директоры · мемлекеттік оқу орны, Ақтөбе.",
    org1_t:"Колледж директоры", org1_s:"Есенгалиева Г. У.", org2_t:"Директор орынбасарлары", org2_s:"Оқу · тәрбие · өндіріс", org3_t:"Әдістемелік кеңес", org3_s:"Оқу процесін үйлестіру", org4_t:"Комплаенс-қызмет", org4_s:"Сыбайлас жемқорлыққа қарсы қызмет", org5_t:"Колледж кеңесі", org5_s:"Жалпы басшылық және стратегия",
    staff_eyebrow:"Педагогикалық құрам", staff_title:"Біздің <em>оқытушылар</em>", staff_lead:"Колледж әкімшілігі мен педагогтары — студентті бірінші курстан дипломға дейін жетелейтін команда.", staff_meta:"Бөлімнің педагогикалық құрамы", staff_p1:"Колледж директоры", staff_p2:"Оқу-өндірістік жұмыс жөніндегі директор орынбасары", staff_p3:"Оқу-әдістемелік жұмыс жөніндегі директор орынбасары", staff_p4:"Шаруашылық жұмысы жөніндегі директор орынбасары", staff_p5:"Химия пәнінің оқытушысы", staff_p6:"Оқу жұмысы жөніндегі директор орынбасары",
    staff1_t:"Электрмен жабдықтау және IT бөлімі", staff1_s:"Энергетика, электр монтажі, бағдарламалау және компьютерлік желілер.",
    staff2_t:"Газ-электр дәнекерлеу және құрылыс бөлімі", staff2_s:"Дәнекерлеу өндірісі, ғимарат пен жол құрылысы.",
    staff3_t:"Жалпы білім беретін пәндер бөлімі", staff3_s:"Іргелі даярлық, тілдер және цифрлық сауаттылық.",
    ach_eyebrow:"Жетістіктер", ach_title:"WorldSkills <em>жүлдегерлері</em>", ach_lead:"Колледж студенттері — өңірлік және республикалық кәсіби шеберлік чемпионаттарының жүлдегерлері.", ach_cap:"WorldSkills · колледждің дәнекерлеу шеберханасы",
    ach1_t:"WorldSkills Aktobe–2025", ach1_s:"Алтын медальдар: дәнекерлеу технологиясы, желілік әкімшілендіру, сылау, плитка, кірпіш қалау.", ach2_t:"DalaSKILLS-2025", ach2_s:"Маңғыстаудағы өңіраралық чемпионат: кірпіш қалаудан 3-орын.", ach3_t:"Рейтинг", ach3_s:"Түлектердің жұмысқа орналасуының жоғары көрсеткіштері.",
    acc_eyebrow:"Аккредитация және лицензиялар", acc_title:"Ресми <em>құжаттар</em>", acc_docs:"Құжаттар", acc1:"Білім беру қызметіне лицензия", acc2:"Аккредитация туралы куәлік", acc3:"Колледж жарғысы", acc4:"Қазақстан Республикасының мемлекеттік рәміздері",
    sch_eyebrow:"Сабақ кестесі", sch_title:"Оқу <em>сабақтары</em>", sch_lead:"Барлық топтар мен бөлімдер үшін пар, емтихан және консультация кестесі.",
    sch1_t:"I семестр", sch1_s:"Бірінші семестрдің оқу сабақтарының кестесі.", sch2_t:"II семестр", sch2_s:"Екінші семестрдің оқу сабақтарының кестесі.", sch3_t:"Емтихандар", sch3_s:"Бөлімдер бойынша емтихан сессияларының кестесі.",
    srv_eyebrow:"Студенттерге", srv_title:"Сервистер мен <em>қолдау</em>",
    srv1_t:"Электрондық кітапхана", srv1_s:"Оқу әдебиетінің каталогы және электрондық ресурстар.", srv2_t:"Спорт секциялары", srv2_s:"Колледждің секциялары мен спорттық іс-шаралары.", srv3_t:"Медпункт", srv3_s:"Студенттерге медициналық қызмет көрсету.", srv4_t:"Психологиялық қызмет", srv4_s:"Студенттерге әлеуметтік-психологиялық қолдау.", srv5_t:"Ар-намыс кодексі", srv5_s:"Студенттердің мінез-құлық ережелері мен этикасы.", srv6_t:"Үйірмелер мен секциялар", srv6_s:"Колледждің шығармашылық және техникалық үйірмелері.",
    emp_eyebrow:"Оқу-өндірістік жұмыс", emp_title:"Жұмысқа орналасу және <em>тәжірибе</em>",
    emp1_t:"WorldSkills", emp1_s:"Кәсіби шеберлік чемпионаттары.", emp2_t:"Жұмысқа орналасу мәліметтері", emp2_s:"Түлектердің жұмысқа орналасу статистикасы.", emp3_t:"Тәжірибе", emp3_s:"Кәсіпорындардағы өндірістік тәжірибе.", emp4_t:"Біздің түлектер", emp4_s:"Колледж түлектерінің табыс тарихы.", emp5_t:"Меморандумдар мен шарттар", emp5_s:"Кәсіпорындармен және серіктестермен келісімдер.", emp6_t:"Дуальды оқыту", emp6_s:"Дуальды оқытудың ережелері, қағидалары мен шарттары.",
    dorm_eyebrow:"Жатақхана", dorm_title:"Студенттердің <em>тұруы</em>", dorm_lead:"Қаладан тыс студенттерге оқу корпустарының жанындағы жайлы жатақхана.", dorm_cap:"Жатақхана · корпустардың жанында", dorm_bt:"Колледж жатақханасы", dorm_bs:"Орындар өтініш бойынша бөлінеді. Өтініш құжаттармен бірге тапсырылады. Бірінші кезекте — грант иелері мен жеңілдік санаттары.",
    media_eyebrow:"БАҚ және медиа", media_title:"Бейнематериалдар мен <em>газеттер</em>", media_cap:"Aqtóbe телеарнасының сюжеті · дәнекерлеу шеберханасы",
    med1_t:"Бейнематериалдар", med1_s:"Колледж өмірі мен қызметі туралы бейне.", med2_t:"Газеттер", med2_s:"Колледждің мерзімді басылымдары.", med3_t:"Кәсіпорын пікірлері", med3_s:"Серіктестер мен жұмыс берушілердің пікірлері.",
    sym_eyebrow:"Мемлекеттік рәміздер", sym_title:"Қазақстан Республикасының <em>рәміздері</em>", sym_bt:"Мемлекеттік рәміздер", sym_bs:"Қазақстан Республикасының әнұраны, туы мен елтаңбасы. Колледж мемлекеттік рәміздер мен ел дәстүрлеріне құрмет тәрбиелейді.",
    spec1_name:"Ғимараттар мен құрылыстарды салу және пайдалану", spec1_qual:"Техник-құрылысшы",
    spec2_name:"Дәнекерлеу ісі (газ-электр дәнекерлеу)", spec2_qual:"Дәнекерлеуші-технолог",
    spec3_name:"Электрмен жабдықтау (салалар бойынша)", spec3_qual:"Техник-электрик",
    spec4_name:"Бағдарламалық қамтамасыз ету (түрлері бойынша)", spec4_qual:"Техник-бағдарламашы",
    spec5_name:"Есептеу техникасы және ақпараттық желілер", spec5_qual:"КТ және желілер технигі",
    spec6_name:"Автомобиль жолдары мен аэродромдарды салу", spec6_qual:"Техник-құрылысшы",
    news1_date:"2025 ж. 26 мамыр", news1_t:"SKILLS CAMP: 120 оқушыға арналған кәсіптік лагерь", news1_s:"Қаланың 7 мектебінен 120 оқушы: дәнекерлеу, электр монтаждау, IT және 3D модельдеу.",
    news2_date:"2025 ж. 21 мамыр", news2_t:"WorldSkills Aktobe–2025: дәнекерлеуден алтын медаль", news2_s:"Ербөлек Расбек Танабергенұлы 19–21 мамырдағы аймақтық чемпионатта «Дәнекерлеу технологиясы» бойынша алтын медаль жеңіп алды.",
    news3_date:"2025 ж. 20 мамыр", news3_t:"Мемлекеттік білім беру тапсырысына вакантты орындар", news3_s:"81 вакантты орын, оның ішінде IT-мамандықтар — 2 және 3-курсқа қабылдау ашық.",
    news4_date:"2025 ж. 30 сәуір", news4_t:"DalaSKILLS-2025: кірпіш қалаудан жүлделі 3-орын", news4_s:"Тілектес Жігер Маңғыстаудағы өңіраралық чемпионатта «Кірпіш қалау» құзыреттілігі бойынша 3-орын иеленді.",
    news5_date:"2025 ж. 30 сәуір", news5_t:"Рика ТВ: Жұмысшы мамандықтар жылы туралы интервью", news5_s:"Директор орынбасары Марина Курманова «Из первых рук» бағдарламасында кәсіпкерлер палатасымен меморандум туралы айтып берді.",
    news6_date:"2025 ж. 16 сәуір", news6_t:"«Таңдауың – тағдырың» ашық есік күні", news6_s:"Оқушылар колледж өкілдерімен кездесті: мамандықтар, білім беру бағдарламалары және талапкерлердің сұрақтарына жауаптар.",
    prod_cap1:"Дәнекерлеу шеберханасы", prod_cap2:"Электр монтажі", prod_cap3:"Құрылыс",
    cont_addr_val:"Ватутин к-сі, 1, Ақтөбе қ.", map_addr:"Ватутин к-сі, 1", map_street:"Ватутин к-сі", map_river:"Илек өзені", foot_addr:"Ватутин к-сі, 1, Ақтөбе", map_scheme:"Сызба", map_live:"Карта",
    mt_label:"Анимация", im_eyebrow:"AQTK · электрондық портал", im_apply:"Өтінім қалдыру", im_call:"Қоңырау шалу", cont_site:"Сайт",
    gallery_title:"Колледж өмірі", gallery_site:"Ресми сайт", news_empty:"Бұл санатта әзірге жаңалық жоқ.", tour_btn:"Виртуалды тур", tour_eyebrow:"AQTK // виртуалды тур", archive_btn:"Фотоархив", archive_eyebrow:"AQTK // фотоархив · 2025", archive_title:"Колледж шежіресі", archive_hint:"Фотоны басыңыз — навигациясы бар көрініс ашылады",
    mq1:"Дәнекерлеу ісі", mq2:"Құрылыс", mq3:"Электрмен жабдықтау", mq4:"Ақпараттық технологиялар", mq5:"WorldSkills", mq6:"Дуальды оқыту"
  };
  const en = {
    top_addr:"1 Vatutin St, Aktobe", top_hours:"Mon–Fri · 09:00–18:00", brand_sub:"College · Aktobe",
    nav_about:"About", nav_study:"Programs", nav_students:"Students", nav_admission:"Admissions", nav_production:"Production", nav_news:"News", nav_contacts:"Contacts", nav_cta:"Apply now",
    hero_eyebrow:"Aktobe · Kazakhstan · state college",
    hero_title:"We build the future<br>with our own <em>hands.</em>",
    hero_sub:"Aktobe College of Construction and Technology is a state institution training in-demand specialists in construction, power supply, IT and welding.",
    hero_cta1:"Choose a specialty", hero_cta2:"Admissions office", hero_chip1:"specialties", hero_chip2:"employment", hero_chip3:"Dual education", hero_scroll:"Scroll",
    stat1:"years of training", stat2:"students today", stat3:"TVET specialties", stat4:"of graduates employed",
    about_badge:"founded", about_caption:"Main building · 1 Vatutin St, Aktobe", about_eyebrow:"About the college",
    about_title:"Where <em>mastery</em> is born",
    about_lead:"For over eighty years the college has trained the specialists who build, light and connect our region.",
    about_p1:"AQTK means a modern facility base, welding workshops, IT labs and electrical engineering rooms. We combine theory with real practice at partner companies through a dual education system.",
    about_p2:"Our students are WorldSkills Kazakhstan medalists, and our graduates are in demand at leading construction, energy and IT companies across the Aktobe region and all of Kazakhstan.",
    val1_t:"Practice from year 1", val1_s:"Workshops and real sites", val2_t:"Job guarantee", val2_s:"40+ partner companies", val3_t:"State grants", val3_s:"Budget places and stipends", val4_t:"WorldSkills", val4_s:"Professional skill championships",
    director_name:"Gulden U. Yessengaliyeva", director_role:"College director · public educational institution, Aktobe.",
    dept_eyebrow:"Departments", dept_title:"Three departments — <em>one standard</em>", dept_lead:"Each department runs its own profile training on modern equipment under the guidance of industry practitioners.",
    dept1_t:"Power supply & IT", dept1_s:"Energy, electrical installation, programming and computer networks.", dept1_m:"3 specialties · 4 labs",
    dept2_t:"Welding & construction", dept2_s:"Welding production, building and road construction.", dept2_m:"3 specialties · 6 workshops",
    dept3_t:"General education", dept3_s:"Foundation training, languages and digital literacy.", dept3_m:"12 subjects · year 1",
    spec_eyebrow:"Programs · specialties", spec_title:"Choose your <em>profession</em>", spec_lead:"State TVET education programs. Click a specialty to see details, study duration and career prospects.",
    spec_f_all:"All specialties", spec_f_it:"Power supply & IT", spec_f_weld:"Welding & construction",
    spec_dept_build:"Welding & construction dept.", spec_dept_it:"Power supply & IT dept.",
    spec_dur1:"2y 10m · 3y 10m", spec_dur2:"2y 10m · 3y 10m",
    spec1_desc:"Training specialists in designing, erecting and operating buildings. Students study materials, structures and cost estimation, and work with BIM technologies and surveying equipment.",
    spec2_desc:"One of the region's most in-demand trades. Manual arc, semi-automatic and argon-arc welding, reading drawings, weld quality control. Graduates earn international certificates and grades.",
    spec3_desc:"Installation, commissioning and operation of electrical equipment for plants and grids. Electrical engineering, relay protection, automation, industrial safety and measuring instruments.",
    spec4_desc:"Web and mobile app development, databases, algorithms and testing. A modern tech stack, project work and internships at regional IT companies.",
    spec5_desc:"Assembling and servicing computer hardware, building and administering local networks, cybersecurity and server equipment. Hands-on practice with real network gear.",
    spec6_desc:"Design, construction and maintenance of highways and airfield pavements. Road materials, surveying, machines and mechanisms, organization of road works.",
    spec_base:"Entry: grade 9 / 11", spec_grant:"Grant + paid", spec_dual:"Dual education", spec_cert:"NAKS certificate", spec_group:"Clearance up to 1000 V", spec_lab:"Own IT lab", spec_intern:"Internships", spec_cyber:"Cybersecurity", spec_net:"Networks & servers", spec_demand:"High demand",
    sk_estimate:"Cost estimation", sk_geo:"Surveying", sk_qc:"Quality control", sk_relay:"Relay protection", sk_auto:"Automation", sk_mount:"Wiring", sk_net:"Networks", sk_hw:"Hardware", sk_roads:"Road works", sk_mat:"Materials",
    spec_apply:"Apply for this specialty",
    life_eyebrow:"For students", life_title:"Everything for <em>study and life</em>", life_lead:"Digital services, support and a rich student life — from the class schedule to skill championships.",
    life1_t:"Class schedule", life1_s:"Current schedule of classes, exams and consultations online for every group.", life2_t:"E-learning", life2_s:"A Moodle portal with courses, lectures, tests and an electronic gradebook.", life3_t:"Dormitory", life3_s:"A comfortable dormitory for non-resident students next to the campus.", life4_t:"Stipends & grants", life4_s:"State stipends, named grants and social support.", life5_t:"Library", life5_s:"An electronic catalog, reading rooms and access to study literature.", life6_t:"WorldSkills & clubs", life6_s:"Championship training, sports, arts and student self-government.", life_open:"Open", life_more:"Learn more",
    adm_eyebrow:"Admissions · intake 2026", adm_title:"Applying is <em>easy</em>", adm_lead:"Document intake for state grants and paid places. Leave a request — the admissions office will contact you and help you choose a specialty.",
    step1_t:"Leave a request", step1_s:"Fill in the form on the site or call the admissions office.", step2_t:"Gather documents", step2_s:"Certificate, ID, a 3×4 photo and medical form 075-U.", step3_t:"Attend an interview", step3_s:"Specialty consultation and submission of original documents.", step4_t:"Enrollment", step4_s:"Enrollment order, student ID and the start of studies.",
    docs_t:"Documents for admission", doc1:"Education certificate (original)", doc2:"ID card / birth certificate", doc3:"Four 3×4 photos", doc4:"Medical certificate 075-U & vaccination card 063", doc5:"ENT / grant certificate (if available)", cl_reset:"Reset", dl_rules:"Admission rules (PDF)", dl_brochure:"College brochure (PDF)",
    form_t:"Application form", form_sub:"Fill in the form — we'll call back within a working day.", form_name:"Full name", form_name_err:"Enter your full name", form_phone:"Phone", form_phone_err:"Enter a valid number", form_base:"Entry base", form_base9:"Grade 9", form_base11:"Grade 11", form_spec:"Specialty", form_spec_ph:"Choose a specialty", form_spec_err:"Choose a specialty", form_msg:"Comment (optional)", form_submit:"Send application", form_note:"By clicking the button you agree to the processing of personal data.", form_ok_t:"Application received!", form_ok_s:"Thank you! The admissions office will contact you shortly.", form_again:"Submit another application", form_sending:"Sending…", form_err:"Could not send the application. Please call us: +7 702 144 64 04.",
    prod_eyebrow:"Training & production", prod_title:"We learn on <em>real production</em>", prod_lead:"Dual education, our own workshops and skill championships — our students work with real equipment from the first year.",
    prod1_t:"WorldSkills Kazakhstan", prod1_s:"Medalists of regional and national championships in welding, electrical installation and IT.", prod2_t:"Our own workshops", prod2_s:"6 welding stations, electrical and IT labs, a construction site.", prod3_t:"Paid practice", prod3_s:"Industrial practice at partner companies with employment.", partners_label:"Partner companies",
    news_eyebrow:"News & events", news_title:"College <em>life</em>", news_all:"All", news_events:"Events", news_ws:"WorldSkills", news_adm:"Admissions", news_read:"Read", news_all_btn:"All news",
    insta_eyebrow:"Find us on social", insta_follow:"Follow",
    trust_t:"Fair admissions & anti-corruption policy", trust_s:"Enrollment is based on documents and competition only. Report any violations to the trust hotline.", trust_btn:"Trust hotline",
    cont_eyebrow:"Contacts", cont_title:"Come and <em>meet us</em>", cont_addr:"Address", cont_addr_s:"Aktobe region, Kazakhstan", cont_phone:"Admissions office", cont_phone_s:"Mon–Fri · 09:00–18:00", cont_mail_s:"We reply within a day", cont_social:"Social", cont_map:"Open in maps",
    foot_about:"Aktobe College of Construction and Technology. A state institution of technical and vocational education.", foot_c1:"College", foot_c2:"Programs", foot_c3:"Contacts", foot_rights:"Aktobe College of Construction and Technology", foot_privacy:"Privacy policy", foot_terms:"Public offer",
    chat_title:"AQTK Admissions", chat_status:"online · we reply instantly",
    nav_college:"College", nav_history:"History", nav_management:"Management", nav_staff:"Faculty", nav_achievements:"Achievements", nav_accreditation:"Documents", nav_schedule:"Schedule", nav_services:"Services", nav_employment:"Practice", nav_dormitory:"Dormitory", nav_media:"Media", nav_symbols:"State symbols",
    act_read:"Read", act_watch:"Watch",
    hist_eyebrow:"College history", hist_title:"Over <em>80 years</em> of training", hist_lead:"Aktobe College of Construction and Technology is a state institution with a rich history. The college has grown from a vocational school into a modern multidisciplinary college.", hist_cap:"Main building · 1 Vatutin St, Aktobe",
    hist_y1:"1944", hist_1t:"Foundation", hist_1s:"Establishment of a school to train skilled workers for the construction industry of the Aktobe region.",
    hist_y2:"1960s", hist_2t:"Expansion", hist_2s:"New specialties opened: electrical installation, welding production, construction technologies.",
    hist_y3:"1990s", hist_3t:"Modernization", hist_3s:"Transition to training mid-level specialists and introduction of new TVET programs.",
    hist_y4:"2000s", hist_4t:"Digitalization", hist_4s:"IT labs created, e-learning introduced, participation in WorldSkills championships.",
    hist_y5:"2020s", hist_5t:"College of the future", hist_5s:"Dual education, international certificates, 98% graduate employment.",
    mgmt_eyebrow:"Governance", mgmt_title:"College <em>leadership</em>", mgmt_dir_name:"Gulden U. Yessengaliyeva", mgmt_dir_role:"College director · public educational institution, Aktobe.",
    org1_t:"College director", org1_s:"Yessengaliyeva G. U.", org2_t:"Deputy directors", org2_s:"Academic · education · production", org3_t:"Methodical council", org3_s:"Coordination of the learning process", org4_t:"Compliance service", org4_s:"Anti-corruption activity", org5_t:"College council", org5_s:"Overall governance and strategy",
    staff_eyebrow:"Faculty", staff_title:"Our <em>teachers</em>", staff_lead:"The college administration and teaching team — guiding every student from first year to diploma.", staff_meta:"Department faculty", staff_p1:"College Director", staff_p2:"Deputy Director for Academic & Production Affairs", staff_p3:"Deputy Director for Academic & Methodological Affairs", staff_p4:"Deputy Director for Administrative Affairs", staff_p5:"Chemistry Teacher", staff_p6:"Deputy Director for Academic Affairs",
    staff1_t:"Power supply & IT department", staff1_s:"Energy, electrical installation, programming and computer networks.",
    staff2_t:"Welding & construction department", staff2_s:"Welding production, building and road construction.",
    staff3_t:"General education department", staff3_s:"Foundation training, languages and digital literacy.",
    ach_eyebrow:"Achievements", ach_title:"<em>WorldSkills</em> medalists", ach_lead:"Our students are medalists of regional and national professional skill championships.", ach_cap:"WorldSkills · college welding workshop",
    ach1_t:"WorldSkills Aktobe–2025", ach1_s:"Gold medals: welding technologies, network administration, plastering, tiling, bricklaying.", ach2_t:"DalaSKILLS-2025", ach2_s:"Interregional championship in Mangystau: 3rd place in bricklaying.", ach3_t:"Ranking", ach3_s:"High graduate employment rates.",
    acc_eyebrow:"Accreditation & licenses", acc_title:"Official <em>documents</em>", acc_docs:"Documents", acc1:"License for educational activity", acc2:"Accreditation certificate", acc3:"College charter", acc4:"State symbols of the Republic of Kazakhstan",
    sch_eyebrow:"Schedule", sch_title:"Class <em>schedule</em>", sch_lead:"Current schedule of classes, exams and consultations for all groups and departments.",
    sch1_t:"Semester I", sch1_s:"Class schedule for the first semester.", sch2_t:"Semester II", sch2_s:"Class schedule for the second semester.", sch3_t:"Exams", sch3_s:"Examination session schedule by department.",
    srv_eyebrow:"For students", srv_title:"Services & <em>support</em>",
    srv1_t:"E-library", srv1_s:"A catalog of study literature and electronic resources.", srv2_t:"Sports clubs", srv2_s:"College sports clubs and events.", srv3_t:"Medical room", srv3_s:"Medical care for students.", srv4_t:"Psychological service", srv4_s:"Social and psychological support for students.", srv5_t:"Code of honor", srv5_s:"Rules of conduct and student ethics.", srv6_t:"Clubs & societies", srv6_s:"Creative and technical clubs of the college.",
    emp_eyebrow:"Training & production", emp_title:"Employment & <em>practice</em>",
    emp1_t:"WorldSkills", emp1_s:"Professional skill championships.", emp2_t:"Employment data", emp2_s:"Statistics on graduate employment.", emp3_t:"Practice", emp3_s:"Industrial practice at enterprises.", emp4_t:"Our graduates", emp4_s:"Success stories of college graduates.", emp5_t:"Memoranda & contracts", emp5_s:"Agreements with enterprises and partners.", emp6_t:"Dual education", emp6_s:"Rules, regulations and contracts of dual education.",
    dorm_eyebrow:"Dormitory", dorm_title:"Student <em>housing</em>", dorm_lead:"A comfortable dormitory for non-resident students next to the academic buildings.", dorm_cap:"Dormitory · next to the campus", dorm_bt:"College dormitory", dorm_bs:"Places are allocated by application. The application is submitted together with admission documents. Priority is given to grant holders and privileged categories.",
    media_eyebrow:"Media & press", media_title:"Videos & <em>newspapers</em>", media_cap:"Aqtóbe TV report · welding workshop",
    med1_t:"Video materials", med1_s:"Videos about the life and work of the college.", med2_t:"Newspapers", med2_s:"Periodicals of the college.", med3_t:"Company reviews", med3_s:"Feedback from partners and employers.",
    sym_eyebrow:"State symbols", sym_title:"Symbols of the <em>Republic of Kazakhstan</em>", sym_bt:"State symbols", sym_bs:"The anthem, flag and emblem of the Republic of Kazakhstan. The college fosters respect for state symbols and the country's traditions.",
    spec1_name:"Building construction & operation", spec1_qual:"Construction technician",
    spec2_name:"Welding (gas & arc)", spec2_qual:"Welding technologist",
    spec3_name:"Power supply (by sector)", spec3_qual:"Electrical technician",
    spec4_name:"Software development", spec4_qual:"Software technician",
    spec5_name:"Computer engineering & networks", spec5_qual:"Network & hardware technician",
    spec6_name:"Road & airfield construction", spec6_qual:"Construction technician",
    news1_date:"May 26, 2025", news1_t:"SKILLS CAMP: a trade camp for 120 schoolchildren", news1_s:"120 pupils from 7 city schools: welding, electrical installation, IT and 3D modelling.",
    news2_date:"May 21, 2025", news2_t:"WorldSkills Aktobe–2025: gold in welding", news2_s:"Rasbek Yerbolek won gold in Welding Technologies at the regional championship on May 19–21.",
    news3_date:"May 20, 2025", news3_t:"Vacant state-grant places: additional admission", news3_s:"81 vacant state-order places, including IT specialties — admission open for years 2 and 3.",
    news4_date:"April 30, 2025", news4_t:"DalaSKILLS-2025: bronze in bricklaying", news4_s:"Zhiger Tilektes took 3rd place in Bricklaying at the interregional championship in Mangystau.",
    news5_date:"April 30, 2025", news5_t:"Rika TV interview: Year of Working Professions", news5_s:"Deputy director Marina Kurmanova discussed the memorandum with the Chamber of Entrepreneurs on the Iz pervykh ruk show.",
    news6_date:"April 16, 2025", news6_t:"Open doors day: Your choice is your destiny", news6_s:"Schoolchildren met college representatives: specialties, study programmes and answers to applicants' questions.",
    prod_cap1:"Welding workshop", prod_cap2:"Electrical installation", prod_cap3:"Construction",
    cont_addr_val:"1 Vatutin St, Aktobe", map_addr:"1 Vatutin St", map_street:"Vatutin St", map_river:"Ilek River", foot_addr:"1 Vatutin St, Aktobe", map_scheme:"Scheme", map_live:"Map",
    mt_label:"Motion", im_eyebrow:"AQTK · e-portal", im_apply:"Leave a request", im_call:"Call", cont_site:"Website",
    gallery_title:"College life", gallery_site:"Official website", news_empty:"No news in this category yet.", tour_btn:"Virtual tour", tour_eyebrow:"AQTK // virtual tour", archive_btn:"Photo archive", archive_eyebrow:"AQTK // photo archive · 2025", archive_title:"College chronicle", archive_hint:"Click a photo to open the viewer with navigation",
    mq1:"Welding", mq2:"Construction", mq3:"Power supply", mq4:"Information technology", mq5:"WorldSkills", mq6:"Dual education"
  };
  const dicts = { kz, en };
  let lang = "ru";
  try { const saved = localStorage.getItem("aqtk_lang"); if (saved && (saved === "ru" || saved === "kz" || saved === "en")) lang = saved; } catch (e) {}
  const i18nEls = $$("[data-i18n]");
  const baseline = new Map();
  i18nEls.forEach(el => {
    const svgs = $$("svg", el).map(s => s.outerHTML).join("");
    baseline.set(el, { html: el.innerHTML, svg: svgs, hasSvg: svgs.length > 0 });
  });
  const esc = t => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  let bootReady = false;
  function refreshLangDynamic(emit) {
    if (typeof rebuildChat === "function") rebuildChat();
    const ci = $("#chatText"); if (ci) ci.placeholder = (chatData[lang] && chatData[lang].placeholder) || "";
    if (typeof renderMarquee === "function") renderMarquee();
    if (typeof currentDoc !== "undefined" && currentDoc && typeof renderDoc === "function") renderDoc(currentDoc);
    if (typeof lastApply !== "undefined" && lastApply && typeof renderSuccess === "function") renderSuccess();
    const ne = $("#newsEmpty"); if (ne && typeof newsEmptyText === "function") ne.textContent = newsEmptyText();
    if (emit) window.dispatchEvent(new Event("langchange"));
  }
  function setLang(next) {
    lang = next;
    try { localStorage.setItem("aqtk_lang", next); } catch (e) {}
    document.documentElement.lang = next === "kz" ? "kk" : next;
    i18nEls.forEach(el => {
      const key = el.getAttribute("data-i18n");
      const base = baseline.get(el);
      if (!base) return;
      const val = next === "ru" ? null : (dicts[next] && dicts[next][key]);
      if (val == null) { el.innerHTML = base.html; }
      else { el.innerHTML = base.hasSvg ? esc(val) + base.svg : val; }
      if (el.classList && el.classList.contains("glitch")) {
        el.setAttribute("data-text", el.textContent.replace(/\s+/g, " ").trim());
      }
    });
    $$(".lang button").forEach(b => b.classList.toggle("active", b.dataset.lang === next));
    const root = document.documentElement;
    root.classList.remove("lang-flash");
    void root.offsetWidth;
    root.classList.add("lang-flash");
    clearTimeout(setLang._ft);
    setLang._ft = setTimeout(() => root.classList.remove("lang-flash"), 620);
    if (bootReady) refreshLangDynamic(true);
  }
  $$(".lang button").forEach(b => b.addEventListener("click", () => setLang(b.dataset.lang)));
  if (lang !== "ru") setLang(lang);

  /* ---------- Page-aware nav active ---------- */
  (function () {
    const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    const map = { "index.html":"index.html", "about.html":"about.html", "programs.html":"programs.html", "students.html":"students.html", "admission.html":"admission.html", "news.html":"news.html", "contacts.html":"contacts.html" };
    const cur = map[page] || "index.html";
    $$(".nav-links > a, .nav-links .nav-drop-btn, .nav-links .nav-drop-panel a").forEach(a => a.classList.remove("active"));
    $$(".nav-links a").forEach(a => {
      const href = (a.getAttribute("href") || "").split("#")[0];
      if (href === cur) a.classList.add("active");
    });
    const drop = $("#navDropBtn");
    if (drop && (cur === "about.html" || cur === "students.html")) drop.classList.add("active");
  })();

  /* ---------- Header scroll + scrollspy ---------- */
  const header = $("#header");
  const navLinks = $$(".nav-links a");
  const spyMap = new Map();
  navLinks.forEach(a => { const href = a.getAttribute("href") || ""; if (href.charAt(0) !== "#") return; const sec = document.getElementById(href.slice(1)); if (sec) spyMap.set(sec, a); });
  let ticking = false;
  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle("scrolled", y > 20);
    $("#toTop").classList.toggle("show", y > 700);
    if (!reduce && !motionOff) {
      const hero = $(".hero");
      if (hero) { const h = hero.offsetHeight; const c = $(".hero .wrap"); if (y < h && c) { c.style.transform = "translateY(" + (y * 0.16) + "px)"; c.style.opacity = String(Math.max(0, 1 - y / (h * 0.82))); } }
    }
    ticking = false;
  }
  window.addEventListener("scroll", () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  onScroll();
  if ("IntersectionObserver" in window) {
    const dropBtn = $("#navDropBtn");
    const spy = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { const a = spyMap.get(e.target); if (a) {
        spyMap.forEach(l => l.classList.remove("active"));
        if (dropBtn) dropBtn.classList.remove("active");
        a.classList.add("active");
        if (dropBtn && a.closest("#navDropPanel")) dropBtn.classList.add("active");
      } } });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    spyMap.forEach((a, sec) => spy.observe(sec));
  }

  /* ---------- Mobile menu ---------- */
  const burger = $("#burger"), menu = $("#mobileMenu");
  function toggleMenu(open) {
    burger.classList.toggle("open", open);
    menu.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  }
  burger.addEventListener("click", () => toggleMenu(!menu.classList.contains("open")));
  $$("#mobileMenu a").forEach(a => a.addEventListener("click", () => toggleMenu(false)));
  document.addEventListener("keydown", e => { if (e.key === "Escape") { toggleMenu(false); closeChat(); } });

  /* ---------- Nav dropdown ---------- */
  (function () {
    const drop = $(".nav-drop"), btn = $("#navDropBtn");
    if (!drop || !btn) return;
    const setOpen = open => { drop.classList.toggle("open", open); btn.setAttribute("aria-expanded", String(open)); };
    btn.addEventListener("click", e => { e.stopPropagation(); setOpen(!drop.classList.contains("open")); });
    $$("#navDropPanel a").forEach(a => a.addEventListener("click", () => setOpen(false)));
    document.addEventListener("click", e => { if (!drop.contains(e.target)) setOpen(false); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") setOpen(false); });
    window.addEventListener("scroll", () => setOpen(false), { passive: true });
  })();

  /* ---------- Reveal on scroll ---------- */
  if ("IntersectionObserver" in window && !reduce) {
    const rev = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    $$(".reveal, .stagger").forEach(el => rev.observe(el));
  } else { $$(".reveal, .stagger").forEach(el => el.classList.add("in")); }

  /* ---------- Counters ---------- */
  function animateCount(el) {
    const target = +el.dataset.count, suffix = el.dataset.suffix || "", dur = 1600, t0 = performance.now();
    function tick(now) {
      const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * e).toLocaleString("ru-RU") + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  if ("IntersectionObserver" in window) {
    const co = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => { if (e.isIntersecting) { reduce ? (e.target.textContent = (+e.target.dataset.count).toLocaleString("ru-RU") + (e.target.dataset.suffix || "")) : animateCount(e.target); obs.unobserve(e.target); } });
    }, { threshold: 0.5 });
    $$("[data-count]").forEach(el => co.observe(el));
  } else { $$("[data-count]").forEach(el => el.textContent = (+el.dataset.count).toLocaleString("ru-RU") + (el.dataset.suffix || "")); }

  /* ---------- Specialties: accordion + filter ---------- */
  const specs = $$(".spec");
  specs.forEach(sp => {
    const head = $(".spec-head", sp);
    head.addEventListener("click", () => {
      const open = sp.classList.contains("open");
      specs.forEach(o => { o.classList.remove("open"); $(".spec-head", o).setAttribute("aria-expanded", "false"); });
      if (!open) { sp.classList.add("open"); head.setAttribute("aria-expanded", "true"); }
    });
  });
  const specFilter = $("#specFilter");
  if (specFilter) specFilter.addEventListener("click", e => {
    const btn = e.target.closest("button"); if (!btn) return;
    $$("#specFilter button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    specs.forEach(sp => {
      const show = f === "all" || sp.dataset.dept === f;
      sp.style.display = show ? "" : "none";
      if (show) { sp.classList.remove("in"); void sp.offsetWidth; sp.classList.add("in"); }
    });
  });
  $$("[data-spec]").forEach(btn => btn.addEventListener("click", () => {
    const sel = $("#fSpec"); if (sel) { sel.value = btn.dataset.spec; sel.closest(".field").classList.remove("invalid"); }
    setTimeout(() => { const n = $("#fName"); if (n) n.focus({ preventScroll: true }); }, 650);
  }));

  /* ---------- News filter ---------- */
  const newsCards = $$("#newsGrid .news-card");
  const newsTabs = $("#newsTabs");
  if (newsTabs) newsTabs.addEventListener("click", e => {
    const btn = e.target.closest("button"); if (!btn) return;
    $$("#newsTabs button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const cat = btn.dataset.cat; let shown = 0;
    newsCards.forEach(c => { const show = cat === "all" || c.dataset.cat === cat; c.style.display = show ? "" : "none"; if (show) shown++; });
    let empty = $("#newsEmpty");
    if (!shown) { if (!empty) { empty = document.createElement("div"); empty.id = "newsEmpty"; empty.className = "news-empty"; $("#newsGrid").appendChild(empty); } empty.textContent = newsEmptyText(); }
    else if (empty) empty.remove();
  });
  function newsEmptyText() { return lang === "ru" ? "Пока нет новостей в этой категории." : ((dicts[lang] && dicts[lang].news_empty) || "Пока нет новостей в этой категории."); }

  /* ---------- Admission form ---------- */
  const form = $("#applyForm"), success = $("#applySuccess");
  let lastApply = null;
  function renderSuccess() {
    if (!lastApply) return;
    const first = lastApply.first, phone = lastApply.phone;
    const msgs = { ru: first + ", спасибо! Приёмная комиссия свяжется с вами по номеру " + phone + ".", kz: first + ", рақмет! Қабылдау комиссиясы сізбен " + phone + " нөмірі бойынша хабарласады.", en: first + ", thank you! Admissions will contact you at " + phone + "." };
    $("#successMsg").textContent = msgs[lang] || msgs.ru;
  }
  function setInvalid(field, bad) { field.closest(".field").classList.toggle("invalid", bad); return !bad; }
  if (form) {
  ["fName", "fPhone", "fSpec"].forEach(id => { const el = $("#" + id); el.addEventListener("input", () => el.closest(".field").classList.remove("invalid")); el.addEventListener("change", () => el.closest(".field").classList.remove("invalid")); });
  const submitSpan = form.querySelector('[data-i18n="form_submit"]');
  const submitLabel = () => lang === "ru" ? "Отправить заявку" : ((dicts[lang] && dicts[lang].form_submit) || "Отправить заявку");
  const sendingLabel = () => lang === "ru" ? "Отправка…" : ((dicts[lang] && dicts[lang].form_sending) || "Отправка…");
  const isLocal = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) || location.protocol === "file:";
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const name = $("#fName"), phone = $("#fPhone"), spec = $("#fSpec");
    const okName = setInvalid(name, name.value.trim().length < 3);
    const digits = phone.value.replace(/\D/g, "");
    const okPhone = setInvalid(phone, digits.length < 10 || digits.length > 12);
    const okSpec = setInvalid(spec, !spec.value);
    if (!(okName && okPhone && okSpec)) { const bad = $(".field.invalid input, .field.invalid select"); if (bad) bad.focus(); return; }
    const showSuccess = () => {
      const ref = "AQTK-2026-" + String(Math.floor(1000 + Math.random() * 9000));
      $("#successRef").textContent = ref;
      const first = name.value.trim().split(/\s+/)[0];
      lastApply = { first: first, phone: phone.value.trim() };
      renderSuccess();
      form.style.display = "none"; success.classList.add("show");
    };
    const bot = form.querySelector('[name="bot-field"]');
    if (bot && bot.value) { showSuccess(); return; }
    if (isLocal) { showSuccess(); return; }
    const btn = form.querySelector('[type="submit"]');
    btn.disabled = true; submitSpan.textContent = sendingLabel(); $("#applyErr").hidden = true;
    try {
      const body = new URLSearchParams(new FormData(form)).toString();
      const res = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body });
      if (!res.ok) throw new Error("HTTP " + res.status);
      showSuccess();
    } catch (err) {
      $("#applyErr").hidden = false;
    } finally {
      btn.disabled = false; submitSpan.textContent = submitLabel();
    }
  });
  $("#applyAgain").addEventListener("click", () => { lastApply = null; form.reset(); form.style.display = ""; success.classList.remove("show"); $("#applyErr").hidden = true; $$(".field.invalid").forEach(f => f.classList.remove("invalid")); $("#fName").focus(); });
  }

  /* ---------- Back to top ---------- */
  $("#toTop").addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }));

  /* ---------- Marquee seamless (trilingual) ---------- */
  const MQ_ICONS = ["i-flame", "i-build", "i-zap", "i-cpu", "i-trophy", "i-tools"];
  const MQ_RU = ["Сварочное дело", "Строительство", "Электроснабжение", "Информационные технологии", "WorldSkills", "Дуальное обучение"];
  function renderMarquee() {
    const mq = $("#marquee"); if (!mq) return;
    const d = dicts[lang] || {};
    let html = "";
    for (let i = 0; i < 6; i++) {
      const label = lang === "ru" ? MQ_RU[i] : (d["mq" + (i + 1)] || MQ_RU[i]);
      html += '<span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><use href="#' + MQ_ICONS[i] + '"/></svg>' + esc(label) + "</span>";
    }
    mq.innerHTML = html + html;
  }
  renderMarquee();

  /* ============================================================
     AI admissions assistant — self-contained NLU + knowledge base
     ============================================================ */
  const chatData = {
    ru: { placeholder:"Спросите о поступлении, специальностях, грантах…",
      greet:"Здравствуйте! Я — <b>ИИ-помощник</b> приёмной комиссии AQTK. Понимаю вопросы о специальностях, документах, сроках, стоимости и грантах, могу <b>подобрать профессию</b> под ваши интересы и сравнить направления. С чего начнём?",
      quick:[["recommend","Подобрать специальность"],["specs","Все специальности"],["docs","Документы"],["cost","Стоимость и гранты"],["dates","Сроки приёма"]] },
    kz: { placeholder:"Түсу, мамандықтар, гранттар туралы сұраңыз…",
      greet:"Сәлеметсіз бе! Мен — AQTK қабылдау комиссиясының <b>ИИ-көмекшісімін</b>. Мамандықтар, құжаттар, мерзімдер, ақы мен гранттар туралы сұрақтарды түсінемін, қызығушылығыңызға қарай <b>мамандық таңдай</b> аламын. Неден бастаймыз?",
      quick:[["recommend","Мамандық таңдау"],["specs","Барлық мамандық"],["docs","Құжаттар"],["cost","Ақысы мен грант"],["dates","Қабылдау мерзімі"]] },
    en: { placeholder:"Ask about admission, specialties, grants…",
      greet:"Hello! I'm the AQTK admissions <b>AI assistant</b>. I understand questions about specialties, documents, deadlines, fees and grants, can <b>recommend a profession</b> based on your interests and compare programs. Where shall we start?",
      quick:[["recommend","Recommend a specialty"],["specs","All specialties"],["docs","Documents"],["cost","Fees & grants"],["dates","Admission dates"]] }
  };

  /* ---- Knowledge base ---- */
  const KB = {
    phone:"+7 (702) 144-64-04", email:"aqtk.college@yandex.kz",
    address:{ ru:"г. Актобе, ул. Ватутина, 1", kz:"Ақтөбе қ., Ватутин к-сі, 1", en:"1 Vatutin St, Aktobe" },
    hours:{ ru:"Пн–Пт 09:00–18:00", kz:"Дс–Жм 09:00–18:00", en:"Mon–Fri 09:00–18:00" },
    paidPerYear:250000,
    specs:[
      { id:"build", code:"07320100", dept:"build",
        name:{ ru:"Строительство и эксплуатация зданий и сооружений", kz:"Ғимараттар мен құрылыстарды салу және пайдалану", en:"Building construction & operation" },
        qual:{ ru:"Техник-строитель", kz:"Техник-құрылысшы", en:"Construction technician" },
        desc:{ ru:"Проектирование, возведение и эксплуатация зданий: материалы, конструкции, сметное дело, BIM и геодезия.", kz:"Ғимараттарды жобалау, тұрғызу және пайдалану: материалдар, конструкциялар, смета, BIM және геодезия.", en:"Design, erection and operation of buildings: materials, structures, cost estimation, BIM and surveying." },
        skills:["AutoCAD","BIM",{ru:"Сметное дело",kz:"Смета ісі",en:"Estimating"},{ru:"Геодезия",kz:"Геодезия",en:"Surveying"}],
        careers:{ ru:["Инженер-строитель","Прораб","Сметчик","BIM-техник"], kz:["Құрылыс инженері","Прораб","Сметашы","BIM-техник"], en:["Civil engineer","Site foreman","Estimator","BIM technician"] },
        tags:["строит","здани","дом","прораб","проектир","чертеж","bim","autocad","смет","геодез","конструкц","құрылыс","ғимарат","building","construct","civil","foreman"],
        interest:"build" },
      { id:"weld", code:"07150300", dept:"build",
        name:{ ru:"Сварочное дело (газоэлектросварка)", kz:"Дәнекерлеу ісі (газ-электр дәнекерлеу)", en:"Welding (gas & arc)" },
        qual:{ ru:"Сварщик-технолог", kz:"Дәнекерлеуші-технолог", en:"Welding technologist" },
        desc:{ ru:"Ручная дуговая, полуавтоматическая и аргонодуговая сварка, чтение чертежей, контроль качества швов. Сертификат НАКС и разряды.", kz:"Қол доғалы, жартылай автоматты және аргон-доғалы дәнекерлеу, сызбаларды оқу, жіктер сапасын бақылау. НАКС сертификаты мен разрядтар.", en:"Manual arc, semi-automatic and argon-arc welding, reading drawings, weld quality control. NAKS certificate and grades." },
        skills:["MMA","MIG/MAG","TIG",{ru:"Контроль качества",kz:"Сапаны бақылау",en:"Quality control"}],
        careers:{ ru:["Сварщик 4–6 разряда","Сварщик-технолог","Контролёр качества","Мастер участка"], kz:["4–6 разрядты дәнекерлеуші","Дәнекерлеуші-технолог","Сапа бақылаушысы","Учаске шебері"], en:["Grade 4–6 welder","Welding technologist","QC inspector","Shop foreman"] },
        tags:["сварк","сварщик","шов","электросвар","газосвар","аргон","накс","nakc","разряд","дәнекер","дәнекерлеу","weld","welder","arc","mig","tig"],
        interest:"hands" },
      { id:"electro", code:"07130700", dept:"it",
        name:{ ru:"Электроснабжение (по отраслям)", kz:"Электрмен жабдықтау (салалар бойынша)", en:"Power supply (by sector)" },
        qual:{ ru:"Техник-электрик", kz:"Техник-электрик", en:"Electrical technician" },
        desc:{ ru:"Монтаж, наладка и эксплуатация электрооборудования предприятий и сетей. Релейная защита, автоматика, допуск до 1000 В.", kz:"Кәсіпорындар мен желілердің электрожабдығын монтаждау, жөндеу және пайдалану. Релелік қорғау, автоматика, 1000 В дейін рұқсат.", en:"Installation, commissioning and operation of electrical equipment for plants and grids. Relay protection, automation, clearance up to 1000 V." },
        skills:[{ru:"Релейная защита",kz:"Релелік қорғау",en:"Relay protection"},{ru:"Автоматика",kz:"Автоматика",en:"Automation"},{ru:"Электромонтаж",kz:"Электр монтажі",en:"Wiring"}],
        careers:{ ru:["Электромонтёр","Техник-электрик","Энергетик","Наладчик автоматики"], kz:["Электр монтажшы","Техник-электрик","Энергетик","Автоматика жөндеуші"], en:["Electrician","Electrical technician","Power engineer","Automation commissioning"] },
        tags:["электр","энергет","ток","напряжен","вольт","монтаж","релей","автомат","1000","электроснаб","электрмен","жабдықтау","electric","power","energy","voltage","relay"],
        interest:"hands" },
      { id:"soft", code:"06130100", dept:"it",
        name:{ ru:"Программное обеспечение (по видам)", kz:"Бағдарламалық қамтамасыз ету (түрлері бойынша)", en:"Software development" },
        qual:{ ru:"Техник-программист", kz:"Техник-бағдарламашы", en:"Software technician" },
        desc:{ ru:"Разработка веб- и мобильных приложений, базы данных, алгоритмы и тестирование. Проектная работа и стажировки в IT-компаниях.", kz:"Веб және мобильді қосымшалар әзірлеу, дерекқорлар, алгоритмдер мен тестілеу. Жобалық жұмыс және IT-компаниялардағы тағылымдамалар.", en:"Web and mobile app development, databases, algorithms and testing. Project work and internships at IT companies." },
        skills:["Python","JavaScript","SQL","Web"],
        careers:{ ru:["Frontend/Backend-разработчик","Мобильный разработчик","QA-инженер","Техник-программист"], kz:["Frontend/Backend әзірлеуші","Мобильді әзірлеуші","QA-инженер","Техник-бағдарламашы"], en:["Frontend/Backend developer","Mobile developer","QA engineer","Software technician"] },
        tags:["программ","код","разработ","python","javascript","js","web","веб","приложен","алгоритм","sql","it","айти","бағдарлама","әзірлеу","software","develop","program","code","app","frontend","backend"],
        interest:"computer" },
      { id:"hardware", code:"06120200", dept:"it",
        name:{ ru:"Вычислительная техника и информационные сети", kz:"Есептеу техникасы және ақпараттық желілер", en:"Computer engineering & networks" },
        qual:{ ru:"Техник по КТ и сетям", kz:"КТ және желілер технигі", en:"Network & hardware technician" },
        desc:{ ru:"Сборка и обслуживание компьютеров, построение и администрирование сетей, кибербезопасность и серверы. Практика на реальном оборудовании.", kz:"Компьютерлерді құрастыру және қызмет көрсету, желілерді құру және әкімшілендіру, киберқауіпсіздік және серверлер. Нақты жабдықта тәжірибе.", en:"Assembling and servicing computers, building and administering networks, cybersecurity and servers. Hands-on practice on real gear." },
        skills:["Cisco","Linux",{ru:"Сети",kz:"Желілер",en:"Networks"},"Hardware"],
        careers:{ ru:["Системный администратор","Сетевой инженер","Специалист по кибербезопасности","Техник по КТ"], kz:["Жүйелік әкімші","Желілік инженер","Киберқауіпсіздік маманы","КТ технигі"], en:["System administrator","Network engineer","Cybersecurity specialist","Hardware technician"] },
        tags:["компьютер","сет","сервер","cisco","linux","кибер","безопас","hardware","желез","админ","желі","есептеу","техника","network","server","cyber","security","sysadmin","hardware"],
        interest:"computer" },
      { id:"roads", code:"07320300", dept:"build",
        name:{ ru:"Строительство автомобильных дорог и аэродромов", kz:"Автомобиль жолдары мен аэродромдарды салу", en:"Road & airfield construction" },
        qual:{ ru:"Техник-строитель", kz:"Техник-құрылысшы", en:"Construction technician" },
        desc:{ ru:"Проектирование, строительство и содержание дорог и аэродромных покрытий. Дорожные материалы, геодезия, машины и механизмы.", kz:"Жолдар мен аэродром жабындарын жобалау, салу және күтіп ұстау. Жол материалдары, геодезия, машиналар мен механизмдер.", en:"Design, construction and maintenance of roads and airfield pavements. Road materials, surveying, machines and mechanisms." },
        skills:[{ru:"Дорожные работы",kz:"Жол жұмыстары",en:"Road works"},{ru:"Материалы",kz:"Материалдар",en:"Materials"},{ru:"Геодезия",kz:"Геодезия",en:"Surveying"}],
        careers:{ ru:["Техник-дорожник","Мастер дорожных работ","Геодезист","Инженер по эксплуатации дорог"], kz:["Жол технигі","Жол жұмыстарының шебері","Геодезист","Жолдарды пайдалану инженері"], en:["Road technician","Road works foreman","Surveyor","Road maintenance engineer"] },
        tags:["дорог","аэродром","трасс","шоссе","асфальт","покрыт","дорожн","жол","аэродром","road","highway","airfield","asphalt","pavement"],
        interest:"build" }
    ]
  };
  const specById = id => KB.specs.find(s => s.id === id);
  const dur = (base, lg) => base === 11
    ? { ru:"2 г 10 мес", kz:"2 ж 10 ай", en:"2y 10m" }[lg]
    : { ru:"3 г 10 мес", kz:"3 ж 10 ай", en:"3y 10m" }[lg];
  const months = base => base === 11 ? 34 : 46;
  const money = n => n.toLocaleString("ru-RU") + " ₸";

  /* ---- NLU ---- */
  const norm = s => s.toLowerCase().replace(/ё/g, "е").replace(/[^a-zа-яәғқңөұүһі0-9\s]/gi, " ").replace(/\s+/g, " ").trim();
  function lev(a, b) {
    if (a === b) return 0;
    const m = a.length, n = b.length;
    if (!m) return n; if (!n) return m;
    let prev = Array.from({ length: n + 1 }, (_, i) => i), cur = new Array(n + 1);
    for (let i = 1; i <= m; i++) {
      cur[0] = i;
      for (let j = 1; j <= n; j++)
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      [prev, cur] = [cur, prev];
    }
    return prev[n];
  }
  const INTENTS = {
    greet:{ w:3, k:["привет","здравств","добрый день","добрый вечер","салем","сәлем","hello","hi","hey","салам"] },
    recommend:{ w:4, k:["подобрать","подбор","посоветуй","порекоменд","помоги выбрать","помочь выбрать","что выбрать","кем стать","какую профессию","не знаю что","таңда","ұсын","кеңес","recommend","suggest","help me choose","which profession","what should i"] },
    compare:{ w:4, k:["сравни","сравнение","или","vs","versus","салыстыр","compare","better","лучше"] },
    specs:{ w:2, k:["специальн","професс","направлен","программ","маманд","оқу","specialt","program","profession","какие есть","что есть","список"] },
    docs:{ w:3, k:["документ","аттестат","справк","фото","мед","075","құжат","анықтама","document","certificate","photo","medical","papers"] },
    dates:{ w:3, k:["срок","когда","дат","приём","прием","дедлайн","мерзім","қашан","қабылдау","deadline","date","when","intake","до какого"] },
    cost:{ w:3, k:["стои","цена","плат","грант","стипенд","бесплат","сколько стоит","ақы","тегін","баға","cost","price","fee","grant","tuition","scholarship","free","сколько платить"] },
    duration:{ w:3, k:["сколько учиться","сколько лет","сколько год","длительн","срок обуч","мерзім","оқу ұзақты","қанша жыл","how long","duration","years of study"] },
    contacts:{ w:3, k:["контакт","адрес","телефон","почт","где вы","добрат","байланыс","мекен","contact","address","phone","where","email","location","как добраться","номер"] },
    dorm:{ w:3, k:["общежит","жатақ","жиль","прожив","где жить","dorm","housing","hostel","accommodation"] },
    schedule:{ w:3, k:["расписан","пары","сабақ","кесте","schedule","timetable","занятия"] },
    ws:{ w:3, k:["worldskills","world skills","чемпионат","конкурс","жарыс","championship","skills","олимпиад"] },
    dual:{ w:3, k:["дуальн","практик","стажиров","производств","тәжірибе","дуальды","internship","practice","dual","работодател"] },
    grant:{ w:3, k:["грант","стипенд","бюджет","бесплатн","тегін","grant","scholarship","stipend","budget","free tuition"] },
    partners:{ w:3, k:["партнер","предприят","компан","работодател","серіктес","partner","company","employer","трудоустрой","job"] },
    about:{ w:2, k:["о колледж","об колледж","истори","основан","құрылған","тарих","about","history","founded","расскажи о","что за колледж"] },
    apply:{ w:3, k:["подать заяв","оставить заяв","поступить","записа","заполнить форм","өтінім","түсу","apply","enroll","application","как поступить","хочу поступить"] },
    base:{ w:2, k:["9 класс","11 класс","после 9","после 11","сынып","grade 9","grade 11","after 9","after 11","классов"] },
    thanks:{ w:3, k:["спасибо","благодар","рахмет","thanks","thank you","спс"] }
  };
  function detectLang(text) {
    if (/[әғқңөұүһі]/i.test(text)) return "kz";
    const letters = text.replace(/[^a-zа-я]/gi, "");
    if (!letters) return lang;
    const latin = (text.match(/[a-z]/gi) || []).length;
    return latin / letters.length > 0.6 ? "en" : "ru";
  }
  function scoreIntents(n, tokens) {
    const scores = {};
    for (const [name, def] of Object.entries(INTENTS)) {
      let s = 0;
      for (const k of def.k) {
        if (n.includes(k)) { s += def.w + (k.length > 6 ? 1 : 0); continue; }
        const kw = k.split(" ");
        if (kw.length === 1 && k.length >= 4)
          for (const t of tokens) if (t.length >= 4 && lev(t, k) <= (k.length >= 7 ? 2 : 1)) { s += def.w * 0.7; break; }
      }
      if (s > 0) scores[name] = s;
    }
    return Object.entries(scores).sort((a, b) => b[1] - a[1]);
  }
  function extractSpecs(n, tokens) {
    const out = [];
    for (const sp of KB.specs) {
      let s = 0;
      if (n.includes(sp.code)) s += 10;
      for (const tag of sp.tags) if (n.includes(tag)) s += tag.length > 5 ? 2 : 1.4;
      const nameWords = norm(sp.name.ru).split(" ").filter(w => w.length > 4);
      for (const t of tokens) for (const w of nameWords) if (t.length >= 4 && lev(t, w) <= 1) { s += 1; break; }
      if (s > 0) out.push([sp.id, s]);
    }
    return out.sort((a, b) => b[1] - a[1]).map(x => x[0]);
  }
  const extractBase = n => /11|одиннадцат|он бір|он бир|eleven/.test(n) ? 11 : /9|девят|тоғыз|тоғыз|nine/.test(n) ? 9 : null;

  /* ---- Dialogue state ---- */
  const ctx = { lastIntent:null, lastSpec:null, lastBase:null, flow:null, quick:null, turns:0 };
  const L = (lg, ru, kz, en) => ({ ru, kz, en }[lg] || ru);
  const skillName = (s, lg) => typeof s === "string" ? s : s[lg];
  const link = (href, lg, ru, kz, en) => `<a href="${href}" data-chat-link>${L(lg, ru, kz, en)} →</a>`;

  function specCard(sp, lg, base) {
    const b = base || ctx.lastBase || 9;
    const facts = [
      `<span class="ai-fact"><b>${L(lg,"Код","Код","Code")}</b> ${sp.code}</span>`,
      `<span class="ai-fact"><b>${L(lg,"Квалификация","Біліктілік","Qualification")}</b> ${sp.qual[lg]}</span>`,
      `<span class="ai-fact"><b>${L(lg,"Срок","Мерзім","Duration")}</b> ${dur(b, lg)} · ${L(lg,"база 9/11","9/11 база","base 9/11")}</span>`,
      `<span class="ai-fact"><b>${L(lg,"Оплата","Төлем","Fees")}</b> ${L(lg,"грант + платно","грант + ақылы","grant + paid")}</span>`
    ].join("");
    const tags = sp.skills.map(s => `<span class="ai-tag">${skillName(s, lg)}</span>`).join("");
    const careers = sp.careers[lg].slice(0, 4).join(" · ");
    return `<div class="ai-spec">
      <div class="ai-spec-top"><span class="ai-spec-code">${sp.code}</span><b>${sp.name[lg]}</b></div>
      <p>${sp.desc[lg]}</p>
      <div class="ai-facts">${facts}</div>
      <div class="ai-tags">${tags}</div>
      <p class="ai-careers"><b>${L(lg,"Кем работать:","Кім болуға:","Careers:")}</b> ${careers}</p>
      <div class="ai-spec-cta">${link("#admission", lg, "Поступить на эту специальность", "Осы мамандыққа түсу", "Apply for this specialty")}</div>
    </div>`;
  }

  /* ---- Response builders ---- */
  const builders = {
    greet(lg){ return { blocks:[chatData[lg].greet], quick:chatData[lg].quick }; },
    thanks(lg){ return { blocks:[L(lg,"Рад помочь! Если появятся ещё вопросы о поступлении — обращайтесь. Могу подобрать специальность или рассказать о грантах.",
      "Көмектескеніме қуаныштымын! Түсу туралы тағы сұрақтар болса — хабарласыңыз. Мамандық таңдай аламын немесе гранттар туралы айта аламын.",
      "Happy to help! If you have more questions about admission, just ask. I can recommend a specialty or explain grants.")],
      quick:[["recommend",L(lg,"Подобрать специальность","Мамандық таңдау","Recommend a specialty")],["apply",L(lg,"Подать заявку","Өтінім беру","Apply now")]] }; },
    specs(lg){
      const cards = KB.specs.map(sp => `<div class="ai-spec-mini"><b>${sp.name[lg]}</b><span>${sp.code} · ${sp.qual[lg]}</span></div>`).join("");
      return { blocks:[
        L(lg,"В колледже <b>6 специальностей</b> на базе 9 и 11 классов, все с дуальным обучением и грантами:",
          "Колледжде 9 және 11-сынып базасында <b>6 мамандық</b> бар, барлығы дуальды оқыту және гранттармен:",
          "The college offers <b>6 specialties</b> on grade 9 and 11 entry, all with dual education and grants:"),
        `<div class="ai-spec-list">${cards}</div>`,
        L(lg,"Нажмите на любую в разделе «Специальности» или спросите меня подробнее — например, «расскажи про сварку».",
          "«Мамандықтар» бөлімінде кез келгенін басыңыз немесе менен толығырақ сұраңыз — мысалы, «дәнекерлеу туралы айт».",
          "Tap any in the Specialties section or ask me for details — e.g. “tell me about welding”.")],
        quick:[["recommend",L(lg,"Подобрать под меня","Маған таңдау","Pick for me")],["weld",L(lg,"Про сварку","Дәнекерлеу","Welding")],["soft",L(lg,"Про IT","IT туралы","About IT")],["cost",L(lg,"Стоимость","Ақысы","Fees")]] };
    },
    spec_detail(lg, sp, base){
      return { blocks:[ specCard(sp, lg, base) ],
        quick:[["cost:"+sp.id,L(lg,"Сколько стоит","Қанша тұрады","How much")],["docs",L(lg,"Документы","Құжаттар","Documents")],["compare",L(lg,"Сравнить","Салыстыру","Compare")],["apply",L(lg,"Поступить","Түсу","Apply")]] };
    },
    docs(lg){
      const items = [
        L(lg,"Аттестат об образовании (оригинал)","Білім туралы аттестат (түпнұсқа)","Education certificate (original)"),
        L(lg,"Удостоверение личности / свидетельство о рождении","Жеке куәлік / туу туралы куәлік","ID card / birth certificate"),
        L(lg,"6 фотографий 3×4","3×4 көлемінде 6 фото","Six 3×4 photos"),
        L(lg,"Медицинская справка формы 075-У","075-У нысанындағы медициналық анықтама","Medical certificate form 075-U"),
        L(lg,"Сертификат ЕНТ / гранта (при наличии)","ЕНТ / грант сертификаты (болса)","ENT / grant certificate (if available)")
      ].map(x => `<li>${x}</li>`).join("");
      return { blocks:[
        L(lg,"Для поступления нужен пакет документов:","Түсу үшін құжаттар пакеті қажет:","To apply you need the following documents:"),
        `<ul class="ai-list">${items}</ul>`,
        L(lg,"Оригиналы подаёте после консультации. Если чего-то не хватает — комиссия подскажет, как восстановить.",
          "Түпнұсқаларды консультациядан кейін тапсырасыз. Бірдеңе жетіспесе — комиссия қалпына келтіруді айтады.",
          "You submit originals after the consultation. If something is missing, admissions will tell you how to restore it.")],
        quick:[["dates",L(lg,"Сроки приёма","Қабылдау мерзімі","Deadlines")],["apply",L(lg,"Подать заявку","Өтінім беру","Apply now")],["cost",L(lg,"Гранты","Гранттар","Grants")]] };
    },
    dates(lg){
      return { blocks:[
        L(lg,"Приём на <b>2026–2027</b> учебный год уже открыт:", "<b>2026–2027</b> оқу жылына қабылдау ашық:", "Applications for <b>2026–2027</b> are open:"),
        `<ul class="ai-list"><li>${L(lg,"Гранты — до <b>25 августа</b>","Гранттар — <b>25 тамызға</b> дейін","Grants — until <b>Aug 25</b>")}</li><li>${L(lg,"Платное отделение — до <b>20 сентября</b>","Ақылы бөлім — <b>20 қыркүйекке</b> дейін","Paid places — until <b>Sep 20</b>")}</li><li>${L(lg,"Зачисление — конец августа","Қабылдау — тамыздың соңы","Enrollment — late August")}</li></ul>`,
        L(lg,"Советую не тянуть: популярные специальности (сварка, IT) заполняются быстро. Оставьте заявку — напомним сроки.",
          "Кешіктірмеңіз: танымал мамандықтар (дәнекерлеу, IT) тез толады. Өтінім қалдырыңыз — мерзімді еске саламыз.",
          "Don't wait: popular specialties (welding, IT) fill up fast. Leave a request and we'll remind you.")],
        quick:[["apply",L(lg,"Подать заявку","Өтінім беру","Apply now")],["docs",L(lg,"Документы","Құжаттар","Documents")],["grant",L(lg,"Про гранты","Гранттар","Grants")]] };
    },
    cost(lg, sp, base){
      const b = base || ctx.lastBase || 9;
      const total = Math.round(KB.paidPerYear * months(b) / 12 / 1000) * 1000;
      const head = sp
        ? L(lg,`Стоимость обучения на «${sp.name.ru}»:`,`«${sp.name.kz}» мамандығының ақысы:`,`Tuition for “${sp.name.en}”:`)
        : L(lg,"По стоимости обучения в AQTK:","AQTK-да оқу ақысы туралы:","About tuition at AQTK:");
      return { blocks:[ head,
        `<ul class="ai-list"><li>${L(lg,"<b>Грант</b> — обучение бесплатно + стипендия (большинство специальностей)","<b>Грант</b> — оқу тегін + стипендия (көптеген мамандық)","<b>Grant</b> — free tuition + stipend (most specialties)")}</li><li>${L(lg,`<b>Платно</b> — от ${money(KB.paidPerYear)}/год`,`<b>Ақылы</b> — жылына ${money(KB.paidPerYear)}-ден`,`<b>Paid</b> — from ${money(KB.paidPerYear)}/year`)}</li><li>${L(lg,`За весь срок (${dur(b, lg)}) ≈ <b>${money(total)}</b>`,`Толық мерзім (${dur(b, lg)}) ≈ <b>${money(total)}</b>`,`Full term (${dur(b, lg)}) ≈ <b>${money(total)}</b>`)}</li></ul>`,
        L(lg,`Точную сумму и наличие грантов подтвердит комиссия: <b>${KB.phone}</b>.`,`Нақты соманы және гранттарды комиссия растайды: <b>${KB.phone}</b>.`,`Admissions confirms the exact fee and grant availability: <b>${KB.phone}</b>.`)],
        quick:[["grant",L(lg,"Как получить грант","Грантты қалай алуға","How to get a grant")],["apply",L(lg,"Подать заявку","Өтінім беру","Apply now")],["dates",L(lg,"Сроки","Мерзімдер","Deadlines")]] };
    },
    duration(lg, sp, base){
      const b = base || ctx.lastBase || 9;
      const name = sp ? sp.name[lg] : L(lg,"большинство специальностей","көптеген мамандық","most specialties");
      return { blocks:[
        L(lg,`Срок обучения (${name}): <b>${dur(9, lg)}</b> после 9 классов и <b>${dur(11, lg)}</b> после 11.`,
          `Оқу мерзімі (${name}): 9-сыныптан кейін <b>${dur(9, lg)}</b>, 11-сыныптан кейін <b>${dur(11, lg)}</b>.`,
          `Study duration (${name}): <b>${dur(9, lg)}</b> after grade 9 and <b>${dur(11, lg)}</b> after grade 11.`),
        L(lg,"Обучение дуальное: часть времени в колледже, часть — на предприятии, поэтому к выпуску уже есть опыт и разряд.",
          "Оқыту дуальды: уақыттың бір бөлігі колледжде, бір бөлігі кәсіпорында, сондықтан түлегенде тәжірибе мен разряд бар.",
          "Training is dual: part at college, part at a company, so by graduation you already have experience and a grade.")],
        quick:[["cost",L(lg,"Стоимость","Ақысы","Fees")],["docs",L(lg,"Документы","Құжаттар","Documents")],["dual",L(lg,"Дуальное обучение","Дуальды оқыту","Dual education")]] };
    },
    grant(lg){
      return { blocks:[
        L(lg,"<b>Государственные гранты</b> покрывают обучение полностью и дают стипендию. Распределяются по конкурсу аттестатов и результатам ЕНТ/собеседования.",
          "<b>Мемлекеттік гранттар</b> оқуды толық жабады және стипендия береді. Аттестаттар конкурсы және ЕНТ/әңгімелесу нәтижесі бойынша бөлінеді.",
          "<b>State grants</b> cover tuition fully and include a stipend. They are awarded by certificate competition and ENT/interview results."),
        `<ul class="ai-list"><li>${L(lg,"Подайте заявку и документы до 25 августа","Өтінім мен құжаттарды 25 тамызға дейін тапсырыңыз","Submit your request and documents by Aug 25")}</li><li>${L(lg,"Высокий средний балл аттестата повышает шансы","Аттестаттың жоғары орташа балы мүмкіндікті арттырады","A high certificate GPA improves your chances")}</li><li>${L(lg,"Есть именные гранты и социальная поддержка","Атаулы гранттар мен әлеуметтік қолдау бар","Named grants and social support are available")}</li></ul>`,
        L(lg,"Даже без гранта можно учиться платно, а позже перевестись на освободившееся бюджетное место.",
          "Грантсыз да ақылы оқуға болады, кейін босаған бюджеттік орынға ауысуға болады.",
          "Even without a grant you can study paid and later transfer to a freed budget place.")],
        quick:[["apply",L(lg,"Подать заявку","Өтінім беру","Apply now")],["cost",L(lg,"Платное обучение","Ақылы оқу","Paid tuition")],["dates",L(lg,"Сроки","Мерзімдер","Deadlines")]] };
    },
    contacts(lg){
      return { blocks:[
        `<ul class="ai-list"><li><b>${L(lg,"Адрес","Мекенжай","Address")}:</b> ${KB.address[lg]}</li><li><b>${L(lg,"Телефон","Телефон","Phone")}:</b> ${KB.phone}</li><li><b>Email:</b> ${KB.email}</li><li><b>${L(lg,"Часы работы","Жұмыс уақыты","Hours")}:</b> ${KB.hours[lg]}</li></ul>`,
        L(lg,"Приёмная комиссия находится в главном корпусе. Приезжайте на консультацию — покажем мастерские и лаборатории.",
          "Қабылдау комиссиясы бас корпуста орналасқан. Консультацияға келіңіз — шеберханалар мен зертханаларды көрсетеміз.",
          "The admissions office is in the main building. Come for a consultation — we'll show you the workshops and labs.")],
        quick:[["apply",L(lg,"Подать заявку","Өтінім беру","Apply now")],["dates",L(lg,"Сроки приёма","Қабылдау мерзімі","Deadlines")],["dorm",L(lg,"Общежитие","Жатақхана","Dormitory")]] };
    },
    dorm(lg){
      return { blocks:[
        L(lg,"Да, у колледжа есть <b>общежитие</b> для иногородних студентов рядом с корпусами. Места распределяются по заявлению, в первую очередь — грантникам и льготным категориям.",
          "Иә, колледжде қаладан тыс студенттерге арналған <b>жатақхана</b> бар, корпустардың жанында. Орындар өтініш бойынша, бірінші кезекте грант иегерлері мен жеңілдік санаттарына бөлінеді.",
          "Yes, the college has a <b>dormitory</b> for non-resident students next to the campus. Places are assigned on request, prioritizing grant holders and eligible categories."),
        L(lg,"Заявление на общежитие подаёте вместе с документами при поступлении.",
          "Жатақханаға өтінішті түсу кезінде құжаттармен бірге тапсырасыз.",
          "You submit the dormitory request together with your admission documents.")],
        quick:[["docs",L(lg,"Документы","Құжаттар","Documents")],["contacts",L(lg,"Контакты","Байланыс","Contacts")],["grant",L(lg,"Гранты","Гранттар","Grants")]] };
    },
    schedule(lg){
      return { blocks:[
        L(lg,"Актуальное расписание пар, экзаменов и консультаций доступно в <b>электронном журнале</b> и на портале Moodle для студентов.",
          "Пар, емтихан және консультация кестесі студенттерге арналған <b>электрондық журналда</b> және Moodle порталында қолжетімді.",
          "The current schedule of classes, exams and consultations is available in the <b>e-gradebook</b> and the Moodle portal for students."),
        L(lg,"Занятия идут по дуальной модели: теория в колледже + практика на предприятии.",
          "Сабақтар дуальды модель бойынша өтеді: колледжде теория + кәсіпорында тәжірибе.",
          "Classes follow the dual model: theory at college + practice at a company.")],
        quick:[["dual",L(lg,"Дуальное обучение","Дуальды оқыту","Dual education")],["contacts",L(lg,"Контакты","Байланыс","Contacts")]] };
    },
    ws(lg){
      return { blocks:[
        L(lg,"Наши студенты — <b>призёры WorldSkills Kazakhstan</b> по сварке, электромонтажу и IT. Готовим к чемпионатам в собственных мастерских на реальном оборудовании.",
          "Біздің студенттер — <b>WorldSkills Kazakhstan жүлдегерлері</b> (дәнекерлеу, электр монтажі, IT). Чемпионаттарға өз шеберханаларымызда нақты жабдықта дайындаймыз.",
          "Our students are <b>WorldSkills Kazakhstan medalists</b> in welding, electrical installation and IT. We train in our own workshops on real equipment."),
        L(lg,"Участие в чемпионатах даёт преимущества при трудоустройстве и поступлении в вузы-партнёры.",
          "Чемпионаттарға қатысу жұмысқа орналасуда және серіктес ЖОО-ға түсуде артықшылық береді.",
          "Competing gives an edge in employment and admission to partner universities.")],
        quick:[["weld",L(lg,"Сварка","Дәнекерлеу","Welding")],["dual",L(lg,"Практика","Тәжірибе","Practice")],["specs",L(lg,"Специальности","Мамандықтар","Specialties")]] };
    },
    dual(lg){
      return { blocks:[
        L(lg,"<b>Дуальное обучение</b> — ключевая модель колледжа: теория в аудиториях чередуется с оплачиваемой практикой на предприятиях-партнёрах.",
          "<b>Дуальды оқыту</b> — колледждің негізгі моделі: аудиториядағы теория серіктес кәсіпорындардағы ақылы тәжірибемен алмасады.",
          "<b>Dual education</b> is the college's core model: classroom theory alternates with paid practice at partner companies."),
        `<ul class="ai-list"><li>${L(lg,"40+ предприятий-партнёров","40+ серіктес кәсіпорын","40+ partner companies")}</li><li>${L(lg,"Практика с 1 курса, собственное оборудование","1-курстан тәжірибе, өз жабдығымыз","Practice from year 1, our own equipment")}</li><li>${L(lg,"98% выпускников трудоустроены","Түлектердің 98% жұмысқа орналасқан","98% of graduates are employed")}</li></ul>`],
        quick:[["partners",L(lg,"Партнёры","Серіктестер","Partners")],["specs",L(lg,"Специальности","Мамандықтар","Specialties")],["apply",L(lg,"Поступить","Түсу","Apply")]] };
    },
    partners(lg){
      return { blocks:[
        L(lg,"Колледж сотрудничает с <b>40+ предприятиями</b> Актюбинской области и Казахстана в строительстве, энергетике, металлургии и IT. Студенты проходят там практику, а лучшие получают предложение о работе ещё до выпуска.",
          "Колледж Ақтөбе облысы мен Қазақстанның құрылыс, энергетика, металлургия және IT саласындағы <b>40+ кәсіпорнымен</b> ынтымақтасады. Студенттер сол жерде тәжірибеден өтеді, үздіктері түлемей жатып жұмыс ұсынысын алады.",
          "The college partners with <b>40+ companies</b> in the Aktobe region and Kazakhstan across construction, energy, metallurgy and IT. Students intern there, and the best receive job offers before graduation."),
        L(lg,"Именно поэтому трудоустройство выпускников — 98%.",
          "Сондықтан түлектерді жұмысқа орналастыру — 98%.",
          "That's why graduate employment is 98%.")],
        quick:[["dual",L(lg,"Дуальное обучение","Дуальды оқыту","Dual education")],["specs",L(lg,"Специальности","Мамандықтар","Specialties")]] };
    },
    about(lg){
      return { blocks:[
        L(lg,"<b>AQTK</b> — Актюбинский колледж строительства и технологии, государственное учебное заведение с более чем 80-летней историей. Готовим специалистов, которые строят, освещают и связывают регион.",
          "<b>AQTK</b> — Ақтөбе құрылыс және технология колледжі, 80 жылдан астам тарихы бар мемлекеттік оқу орны. Өңірді құратын, жарықтандыратын және байланыстыратын мамандар даярлаймыз.",
          "<b>AQTK</b> — Aktobe College of Construction and Technology, a state institution with 80+ years of history. We train the specialists who build, light and connect the region."),
        `<ul class="ai-list"><li>${L(lg,"6 специальностей, 3 отделения","6 мамандық, 3 бөлім","6 specialties, 3 departments")}</li><li>${L(lg,"Современные мастерские и IT-лаборатории","Заманауи шеберханалар мен IT-зертханалар","Modern workshops and IT labs")}</li><li>${L(lg,"Гранты, стипендии, общежитие","Гранттар, стипендиялар, жатақхана","Grants, stipends, dormitory")}</li></ul>`,
        link("#about", lg, "Подробнее о колледже", "Колледж туралы толығырақ", "More about the college")],
        quick:[["specs",L(lg,"Специальности","Мамандықтар","Specialties")],["recommend",L(lg,"Подобрать профессию","Мамандық таңдау","Recommend a profession")],["contacts",L(lg,"Контакты","Байланыс","Contacts")]] };
    },
    apply(lg, sp){
      const pre = sp ? L(lg,`Отлично, «${sp.name.ru}» — хороший выбор! `,`Тамаша, «${sp.name.kz}» — жақсы таңдау! `,`Great, “${sp.name.en}” is a solid choice! `) : "";
      return { blocks:[
        pre + L(lg,"Чтобы поступить, оставьте заявку — комиссия перезвонит в течение рабочего дня и поможет с документами.",
          "Түсу үшін өтінім қалдырыңыз — комиссия жұмыс күні ішінде қайта қоңырау шалып, құжаттарға көмектеседі.",
          "To apply, leave a request — admissions will call back within a working day and help with the documents."),
        `<ol class="ai-list ai-steps"><li>${L(lg,"Заполните форму заявки","Өтінім формасын толтырыңыз","Fill in the application form")}</li><li>${L(lg,"Соберите документы","Құжаттарды жинаңыз","Gather the documents")}</li><li>${L(lg,"Пройдите консультацию/собеседование","Консультация/әңгімелесуден өтіңіз","Attend the consultation/interview")}</li><li>${L(lg,"Получите приказ о зачислении","Қабылдау туралы бұйрықты алыңыз","Receive the enrollment order")}</li></ol>`,
        link("#admission", lg, "Перейти к форме заявки", "Өтінім формасына өту", "Go to the application form")],
        quick:[["docs",L(lg,"Какие документы","Қандай құжаттар","Which documents")],["dates",L(lg,"Сроки","Мерзімдер","Deadlines")],["cost",L(lg,"Стоимость","Ақысы","Fees")]] };
    },
    fallback(lg){
      return { blocks:[
        L(lg,"Хороший вопрос! Я могу подробнее рассказать о специальностях, документах, сроках, стоимости и грантах, подобрать профессию или сравнить направления. Уточните, что интересует — или позвоните в комиссию.",
          "Жақсы сұрақ! Мамандықтар, құжаттар, мерзімдер, ақы мен гранттар туралы толығырақ айта аламын, мамандық таңдай аламын немесе бағыттарды салыстыра аламын. Не қызықтыратынын нақтылаңыз — немесе комиссияға қоңырау шалыңыз.",
          "Great question! I can explain specialties, documents, deadlines, fees and grants, recommend a profession or compare programs. Tell me what interests you — or call admissions."),
        L(lg,`Для быстрого ответа: <b>${KB.phone}</b>.`,`Жылдам жауап үшін: <b>${KB.phone}</b>.`,`For a quick answer: <b>${KB.phone}</b>.`)],
        quick:[["recommend",L(lg,"Подобрать специальность","Мамандық таңдау","Recommend a specialty")],["specs",L(lg,"Специальности","Мамандықтар","Specialties")],["contacts",L(lg,"Контакты","Байланыс","Contacts")]] };
    }
  };

  /* ---- Guided recommendation flow ---- */
  const REC_CHIPS = {
    interest:[["rec:hands",L0("Работать руками / техника","Қолмен жұмыс / техника","Hands-on / machinery")],["rec:computer",L0("Компьютеры и код","Компьютер мен код","Computers & code")],["rec:build",L0("Строить здания и дороги","Ғимарат пен жол салу","Build things")],["rec:unsure",L0("Пока не знаю","Әзірше білмеймін","Not sure yet")]],
    hands:[["rec:weld",L0("Сварка и металл","Дәнекерлеу және металл","Welding & metal")],["rec:electro",L0("Электрика и энергетика","Электр және энергетика","Electrical & power")]],
    computer:[["rec:soft",L0("Писать код и приложения","Код пен қосымша жазу","Write code & apps")],["rec:hardware",L0("Сети, серверы, кибербезопасность","Желі, сервер, киберқауіпсіздік","Networks & security")]],
    build:[["rec:buildings",L0("Здания и сооружения","Ғимараттар мен құрылыстар","Buildings & structures")],["rec:roads",L0("Дороги и аэродромы","Жолдар мен аэродромдар","Roads & airfields")]]
  };
  function L0(ru, kz, en){ return [ru, kz, en]; }
  function recChipLabels(arr, lg){ return arr.map(([k, tri]) => [k, tri[{ru:0,kz:1,en:2}[lg]]]); }
  function interestFromText(n){
    if (/свар|металл|дәнекер|weld|metal/.test(n)) return "weld";
    if (/электр|энерг|ток|электрмен|electric|power/.test(n)) return "electro";
    if (/код|программ|приложен|бағдарлама|code|software|develop/.test(n)) return "soft";
    if (/сет|сервер|кибер|желі|network|server|cyber|hardware/.test(n)) return "hardware";
    if (/здани|дом|ғимарат|building/.test(n)) return "buildings";
    if (/дорог|жол|road|highway/.test(n)) return "roads";
    if (/рук|техник|қолмен|hands|machin/.test(n)) return "hands";
    if (/компьютер|it|айти|computer/.test(n)) return "computer";
    if (/строит|құрылыс|build/.test(n)) return "build";
    return null;
  }
  function recommendStart(lg){
    ctx.flow = { type:"recommend", step:"interest" };
    return { blocks:[
      L(lg,"Давайте подберём специальность под вас. Что вам ближе?",
        "Сізге мамандық таңдайық. Не жақын?",
        "Let's find the right specialty for you. What appeals to you more?")],
      quick:recChipLabels(REC_CHIPS.interest, lg) };
  }
  function recommendStep(lg, branch){
    const f = ctx.flow;
    if (branch === "hands"){ f.step = "hands"; return { blocks:[L(lg,"Отлично, работа руками! Что интереснее?","Тамаша, қолмен жұмыс! Не қызық?","Great, hands-on work! Which is more interesting?")], quick:recChipLabels(REC_CHIPS.hands, lg) }; }
    if (branch === "computer"){ f.step = "computer"; return { blocks:[L(lg,"IT — отличный выбор! Что ближе?","IT — тамаша таңдау! Не жақын?","IT is a great choice! Which is closer?")], quick:recChipLabels(REC_CHIPS.computer, lg) }; }
    if (branch === "build"){ f.step = "build"; return { blocks:[L(lg,"Строительство — всегда востребовано. Что интереснее?","Құрылыс — әрқашан сұранысқа ие. Не қызық?","Construction is always in demand. Which is more interesting?")], quick:recChipLabels(REC_CHIPS.build, lg) }; }
    if (branch === "unsure"){
      ctx.flow = null;
      const weld = specById("weld"), soft = specById("soft");
      return { blocks:[
        L(lg,"Тогда покажу два самых универсальных и востребованных направления — от них легко оттолкнуться:",
          "Онда ең әмбебап және сұранысқа ие екі бағытты көрсетейін — олардан бастау оңай:",
          "Then here are the two most versatile, in-demand directions — a great starting point:"),
        specCard(weld, lg), specCard(soft, lg),
        L(lg,"Можете сравнить их или рассказать, что любите делать в свободное время — сузим выбор.",
          "Оларды салыстыра аласыз немесе бос уақытта не істегенді ұнататыныңызды айтыңыз — таңдауды тарылтамыз.",
          "You can compare them or tell me what you enjoy doing in your free time — we'll narrow it down.")],
        quick:[["compare:weld:soft",L(lg,"Сравнить сварку и IT","Дәнекерлеу мен IT салыстыру","Compare welding & IT")],["contacts",L(lg,"Спросить комиссию","Комиссиядан сұрау","Ask admissions")]] };
    }
    const map = { weld:"weld", electro:"electro", soft:"soft", hardware:"hardware", buildings:"build", roads:"roads" };
    const id = map[branch];
    if (id){
      ctx.flow = null; ctx.lastSpec = id;
      const sp = specById(id);
      const why = {
        weld:L(lg,"вы любите работу руками и металл — сварщики стабильно в топе спроса и зарплат.", "сіз қолмен жұмыс пен металды ұнатасыз — дәнекерлеушілер сұраныс пен жалақыда тұрақты көшбасшы.", "you enjoy hands-on work and metal — welders are consistently top in demand and pay."),
        electro:L(lg,"вам близка техника и энергетика — электрики нужны на любом производстве.", "сізге техника мен энергетика жақын — электриктер кез келген өндірісте қажет.", "you're drawn to technology and energy — electricians are needed at any plant."),
        soft:L(lg,"вам нравится логика и код — разработчики востребованы и могут работать удалённо.", "сізге логика мен код ұнайды — әзірлеушілер сұранысқа ие және қашықтан жұмыс істей алады.", "you enjoy logic and code — developers are in demand and can work remotely."),
        hardware:L(lg,"вам интересны сети и железо — сисадмины и сетевые инженеры нужны каждой компании.", "сізді желі мен темір қызықтырады — жүйелік әкімшілер мен желі инженерлері әр компанияға қажет.", "you're into networks and hardware — every company needs sysadmins and network engineers."),
        build:L(lg,"вам нравится создавать здания — техники-строители ведут проекты от чертежа до сдачи.", "сізге ғимарат тұрғызу ұнайды — техник-құрылысшылар жобаларды сызбадан тапсыруға дейін жүргізеді.", "you like creating buildings — construction technicians run projects from drawing to handover."),
        roads:L(lg,"вам близка работа на открытом воздухе и масштабные проекты — дорожники всегда при деле.", "сізге ашық ауада жұмыс пен ауқымды жобалар жақын — жолшылар әрқашан жұмыспен қамтылған.", "you like outdoor work and large-scale projects — road builders are always busy.")
      }[id];
      return { blocks:[
        L(lg,`Вам подходит <b>«${sp.name.ru}»</b> — ${why}`,`Сізге <b>«${sp.name.kz}»</b> сәйкес келеді — ${why}`,`<b>“${sp.name.en}”</b> suits you — ${why}`),
        specCard(sp, lg)],
        quick:[["apply:"+id,L(lg,"Поступить сюда","Осыған түсу","Apply here")],["cost:"+id,L(lg,"Сколько стоит","Қанша тұрады","How much")],["compare",L(lg,"Сравнить с другой","Басқамен салыстыру","Compare with another")],["recommend",L(lg,"Подобрать заново","Қайта таңдау","Start over")]] };
    }
    return recommendStart(lg);
  }

  /* ---- Comparison ---- */
  function compare(lg, a, b){
    const row = (label, fa, fb) => `<tr><th>${label}</th><td>${fa}</td><td>${fb}</td></tr>`;
    const base = ctx.lastBase || 9;
    const html = `<div class="ai-compare-wrap"><table class="ai-compare">
      <tr><th></th><td><b>${a.name[lg]}</b></td><td><b>${b.name[lg]}</b></td></tr>
      ${row(L(lg,"Код","Код","Code"), a.code, b.code)}
      ${row(L(lg,"Квалификация","Біліктілік","Qualification"), a.qual[lg], b.qual[lg])}
      ${row(L(lg,"Срок (база "+base+")","Мерзім ("+base+" база)","Duration (base "+base+")"), dur(base, lg), dur(base, lg))}
      ${row(L(lg,"Оплата","Төлем","Fees"), L(lg,"грант + платно","грант + ақылы","grant + paid"), L(lg,"грант + платно","грант + ақылы","grant + paid"))}
      ${row(L(lg,"Ключевые навыки","Негізгі дағдылар","Key skills"), a.skills.map(s=>skillName(s,lg)).join(", "), b.skills.map(s=>skillName(s,lg)).join(", "))}
      ${row(L(lg,"Карьера","Мансап","Careers"), a.careers[lg][0], b.careers[lg][0])}
    </table></div>`;
    return { blocks:[
      L(lg,`Сравниваю <b>${a.name.ru}</b> и <b>${b.name.ru}</b>:`,`<b>${a.name.kz}</b> және <b>${b.name.kz}</b> салыстырамын:`,`Comparing <b>${a.name.en}</b> and <b>${b.name.en}</b>:`),
      html,
      L(lg,"Обе специальности с грантами и дуальным обучением. Выбор зависит от того, что вам ближе — расскажите, и я порекомендую.",
        "Екі мамандық та грантпен және дуальды оқытумен. Таңдау сізге не жақын екеніне байланысты — айтыңыз, мен ұсынамын.",
        "Both offer grants and dual education. The choice depends on what suits you — tell me and I'll recommend.")],
      quick:[["apply:"+a.id,L(lg,"Выбрать первое","Біріншісін таңдау","Pick the first")],["apply:"+b.id,L(lg,"Выбрать второе","Екіншісін таңдау","Pick the second")],["recommend",L(lg,"Помочь выбрать","Таңдауға көмек","Help me choose")]] };
    }

  /* ---- Intent resolution ---- */
  function resolve(text, forcedKey){
    const lg = detectLang(text) || lang;
    const n = norm(text), tokens = n.split(" ").filter(Boolean);
    ctx.turns++;

    if (forcedKey && forcedKey.startsWith("rec:")) return recommendStep(lg, forcedKey.slice(4));
    if (forcedKey && forcedKey.startsWith("apply:")){ const sp = specById(forcedKey.slice(6)); ctx.lastSpec = sp.id; return builders.apply(lg, sp); }
    if (forcedKey && forcedKey.startsWith("cost:")){ const sp = specById(forcedKey.slice(5)); ctx.lastSpec = sp.id; return builders.cost(lg, sp); }
    if (forcedKey && forcedKey.startsWith("compare:")){ const [, x, y] = forcedKey.split(":"); return compare(lg, specById(x), specById(y)); }
    if (forcedKey && builders[forcedKey]) return builders[forcedKey](lg, ctx.lastSpec ? specById(ctx.lastSpec) : null, ctx.lastBase);

    if (ctx.flow && ctx.flow.type === "recommend"){
      const branch = interestFromText(n);
      if (branch) return recommendStep(lg, branch);
      if (/не знаю|білмей|not sure|unsure/.test(n)) return recommendStep(lg, "unsure");
    }

    const matched = extractSpecs(n, tokens);
    const base = extractBase(n); if (base) ctx.lastBase = base;
    const ranked = scoreIntents(n, tokens);
    let intent = ranked.length ? ranked[0][0] : null;

    if (/сравн|салыстыр|compare|\bили\b|\bvs\b|немесе/.test(n) && matched.length >= 2)
      return compare(lg, specById(matched[0]), specById(matched[1]));
    if (intent === "compare"){
      if (matched.length >= 2) return compare(lg, specById(matched[0]), specById(matched[1]));
      if (ctx.lastSpec && matched.length === 1) return compare(lg, specById(ctx.lastSpec), specById(matched[0]));
      return { blocks:[L(lg,"Назовите две специальности для сравнения — например, «сравни сварку и IT».","Салыстыру үшін екі мамандық атаңыз — мысалы, «дәнекерлеу мен IT салыстыр».","Name two specialties to compare — e.g. “compare welding and IT”.")],
        quick:[["compare:weld:soft",L(lg,"Сварка и IT","Дәнекерлеу мен IT","Welding & IT")],["compare:build:roads",L(lg,"Здания и дороги","Ғимарат пен жол","Buildings & roads")],["compare:soft:hardware",L(lg,"ПО и сети","БҚ мен желі","Software & networks")]] };
    }
    if (intent === "recommend") return recommendStart(lg);

    const followUp = /^(а|и|ну|ок|ал|тағы|еще|more|and|what about|а сколько|какие|сколько)/.test(n) || tokens.length <= 3;
    if (matched.length){
      ctx.lastSpec = matched[0];
      const sp = specById(matched[0]);
      if (intent === "cost") return builders.cost(lg, sp, base);
      if (intent === "duration") return builders.duration(lg, sp, base);
      if (intent === "apply") return builders.apply(lg, sp);
      if (!intent || intent === "specs" || intent === "spec_detail" || followUp) return builders.spec_detail(lg, sp, base);
    }
    if (followUp && ctx.lastSpec && ["cost","duration","docs","apply","grant"].includes(intent))
      return builders[intent](lg, specById(ctx.lastSpec), base);

    if (intent === "specs" && matched.length === 0) return builders.specs(lg);
    if (intent && builders[intent]){ ctx.lastIntent = intent; return builders[intent](lg, ctx.lastSpec ? specById(ctx.lastSpec) : null, base); }
    if (matched.length) return builders.spec_detail(lg, specById(matched[0]), base);
    return builders.fallback(lg);
  }

  /* ---- Chat UI ---- */
  const fab = $("#chatFab"), panel = $("#chatPanel"), log = $("#chatLog"), quick = $("#chatQuick"), badge = $("#chatBadge");
  const chatText = $("#chatText"), chatSend = $(".chat-send"), chatStatusEl = $("#chatStatus"), chatClearBtn = $("#chatClear");
  let chatStarted = false, busy = false;
  const AI_ENDPOINT = "/.netlify/functions/chat";
  const CHAT_STORE = "aqtk_chat_v1";
  let aiStatus = "unknown";
  const aiHistory = [];
  function scrollLog(){ log.scrollTop = log.scrollHeight; }
  function addMsg(html, who){
    const m = document.createElement("div"); m.className = "msg " + who; m.innerHTML = html;
    log.appendChild(m); scrollLog(); return m;
  }
  function disableInput(){ if (chatText) chatText.disabled = true; if (chatSend) chatSend.disabled = true; }
  function enableInput(){ if (chatText) { chatText.disabled = false; chatText.focus(); } if (chatSend) chatSend.disabled = false; }
  const thinkingHTML = () => '<span class="ai-thinking"><span class="typing"><i></i><i></i><i></i></span><span class="ai-thinking-label">' +
    L(lang, "ИИ думает…", "ЖИ ойлануда…", "AI is thinking…") + '</span></span>';
  function setQuick(list){
    const items = (list && list.length ? list : (chatData[lang] && chatData[lang].quick) || []);
    quick.innerHTML = "";
    items.forEach(([k, label]) => {
      const b = document.createElement("button"); b.type = "button"; b.textContent = label;
      b.addEventListener("click", () => { if (busy) return; handleQuick(k, label); });
      quick.appendChild(b);
    });
  }
  function rebuildChat(){ setQuick(ctx.quick || (chatData[lang] && chatData[lang].quick)); }

  /* ---- live AI status pill ---- */
  function statusText(){
    if (aiStatus === "online") return L(lang, "ИИ онлайн · нейросеть", "ЖИ онлайн · нейрожелі", "AI online · neural net");
    if (aiStatus === "offline") return L(lang, "офлайн-помощник", "офлайн-көмекші", "offline assistant");
    return L(lang, "онлайн · отвечаем сразу", "онлайн · жауап береміз", "online · instant replies");
  }
  function paintStatus(){
    if (chatStatusEl) {
      chatStatusEl.textContent = statusText();
      chatStatusEl.classList.toggle("is-online", aiStatus === "online");
      chatStatusEl.classList.toggle("is-offline", aiStatus === "offline");
    }
    if (chatClearBtn) {
      const t = L(lang, "Очистить диалог", "Диалогты тазалау", "Clear conversation");
      chatClearBtn.title = t; chatClearBtn.setAttribute("aria-label", t);
    }
  }
  function setAIStatus(s){ if (aiStatus === s) { paintStatus(); return; } aiStatus = s; paintStatus(); }
  async function probeAI(){
    try {
      const r = await fetch(AI_ENDPOINT, { method: "GET", headers: { "Accept": "application/json" } });
      if (!r.ok) { setAIStatus("offline"); return; }
      const d = await r.json().catch(() => null);
      setAIStatus(d && d.configured ? "online" : "offline");
    } catch (e) { setAIStatus("offline"); }
  }

  /* ---- markdown → safe HTML ---- */
  function formatAIReply(text){
    const raw = String(text || "");
    const escaped = raw.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const bolded = escaped.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/`([^`]+)`/g, "<code>$1</code>");
    const linked = bolded.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
    const lines = linked.split(/\r?\n/);
    let html = "", listType = null;
    const closeList = () => { if (listType) { html += listType === "ol" ? "</ol>" : "</ul>"; listType = null; } };
    for (const line of lines) {
      const ul = line.match(/^\s*[-*•]\s+(.*)$/);
      const ol = line.match(/^\s*\d+[.)]\s+(.*)$/);
      if (ul) { if (listType !== "ul") { closeList(); html += '<ul class="ai-list">'; listType = "ul"; } html += `<li>${ul[1]}</li>`; }
      else if (ol) { if (listType !== "ol") { closeList(); html += '<ol class="ai-list ai-ol">'; listType = "ol"; } html += `<li>${ol[1]}</li>`; }
      else { closeList(); if (line.trim() === "") html += ""; else html += `<p>${line}</p>`; }
    }
    closeList();
    return html || `<p>${escaped}</p>`;
  }

  /* ---- conversation memory across pages ---- */
  function saveChat(){ try { sessionStorage.setItem(CHAT_STORE, JSON.stringify({ h: aiHistory.slice(-20) })); } catch (e) {} }
  function loadChat(){
    try {
      const raw = sessionStorage.getItem(CHAT_STORE); if (!raw) return false;
      const d = JSON.parse(raw); if (!d || !Array.isArray(d.h) || !d.h.length) return false;
      d.h.forEach(m => {
        if (!m || typeof m.content !== "string") return;
        if (m.role === "user") { addMsg(esc(m.content), "user"); aiHistory.push(m); }
        else if (m.role === "assistant") { addMsg(`<div class="ai-block">${formatAIReply(m.content)}</div>`, "bot"); aiHistory.push(m); }
      });
      return aiHistory.length > 0;
    } catch (e) { return false; }
  }
  function clearChat(){
    aiHistory.length = 0; ctx.quick = null; ctx.lastIntent = null; ctx.flow = null;
    try { sessionStorage.removeItem(CHAT_STORE); } catch (e) {}
    log.innerHTML = ""; chatStarted = true;
    addMsg(chatData[lang].greet, "bot"); rebuildChat(); scrollLog();
  }

  /* ---- streaming-style reveal: types prose, fades lists ---- */
  function streamReply(container, html, done){
    container.innerHTML = "";
    const wrap = document.createElement("div"); wrap.className = "ai-block"; container.appendChild(wrap);
    const tmp = document.createElement("div"); tmp.innerHTML = html;
    const blocks = Array.from(tmp.children);
    if (reduce || motionOff || !blocks.length) { wrap.innerHTML = html; if (done) done(); return; }
    let bi = 0;
    function nextBlock(){
      const c = $(".type-caret", wrap); if (c) c.remove();
      if (bi >= blocks.length) { wrap.classList.add("tw-done"); if (done) done(); return; }
      const node = blocks[bi++];
      const target = node.cloneNode(false); wrap.appendChild(target);
      const inner = node.innerHTML;
      if (node.tagName === "UL" || node.tagName === "OL" || !inner) {
        target.innerHTML = inner; target.style.animation = "aiBlockIn .4s var(--ease-out) both";
        scrollLog(); container.__twTimer = setTimeout(nextBlock, 160); return;
      }
      const { frames } = twFrames(inner);
      const total = frames.length - 1; let n = 0;
      const chunk = Math.max(3, Math.round(total / 70));
      (function tick(){
        if (motionOff) { target.innerHTML = inner; container.__twTimer = setTimeout(nextBlock, 0); return; }
        n = Math.min(total, n + chunk);
        target.innerHTML = frames[n] + (n < total ? TW_CARET : "");
        scrollLog();
        if (n < total) container.__twTimer = setTimeout(tick, 16);
        else container.__twTimer = setTimeout(nextBlock, 110);
      })();
    }
    nextBlock();
  }

  /* ---- real AI request ---- */
  async function requestAI(text){
    const ctrl = new AbortController();
    const to = setTimeout(() => ctrl.abort(), 30000);
    let resp;
    try {
      resp = await fetch(AI_ENDPOINT, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, lang: lang, history: aiHistory.slice(-10) }), signal: ctrl.signal
      });
    } finally { clearTimeout(to); }
    let data = null; try { data = await resp.json(); } catch (e) {}
    if (!resp.ok || !data || !data.reply) throw new Error(data && data.error ? data.error : "AI unavailable");
    return data.reply;
  }

  /* ---- quick actions: instant rich scripted cards ---- */
  function handleQuick(key, label){
    if (busy) return;
    addMsg(esc(label), "user");
    busy = true; disableInput();
    const res = resolve(label, key);
    const typing = addMsg(thinkingHTML(), "bot");
    const blocks = (res && res.blocks) || [esc(L(lang, "Уточните вопрос или позвоните: +7 (702) 144-64-04.", "Сұрақты нақтылаңыз немесе қоңырау шалыңыз: +7 (702) 144-64-04.", "Please refine your question or call: +7 (702) 144-64-04."))];
    ctx.quick = res && res.quick ? res.quick : (chatData[lang] && chatData[lang].quick);
    setTimeout(() => {
      typing.classList.add("ai-answer");
      typing.innerHTML = blocks.map((b, i) => `<div class="ai-block" style="animation-delay:${(i * 0.12).toFixed(2)}s">${b}</div>`).join("");
      scrollLog(); rebuildChat(); busy = false; enableInput();
    }, reduce ? 100 : 360 + Math.random() * 240);
  }

  /* ---- free text: real neural AI, graceful offline fallback ---- */
  async function handleChatInput(text){
    const v = String(text || "").trim(); if (!v || busy) return;
    addMsg(esc(v), "user"); if (chatText) chatText.value = "";
    busy = true; disableInput();
    const typing = addMsg(thinkingHTML(), "bot");
    const finish = () => { busy = false; enableInput(); };
    try {
      const reply = await requestAI(v);
      setAIStatus("online");
      aiHistory.push({ role: "user", content: v }); aiHistory.push({ role: "assistant", content: reply });
      if (aiHistory.length > 20) aiHistory.splice(0, aiHistory.length - 20);
      saveChat();
      typing.classList.add("ai-answer"); typing.innerHTML = "";
      setQuick(chatData[lang] && chatData[lang].quick);
      streamReply(typing, formatAIReply(reply), () => { scrollLog(); finish(); });
    } catch (err) {
      setAIStatus("offline");
      let res = null; try { res = resolve(v, null); } catch (e) {}
      const blocks = (res && res.blocks) || [esc(L(lang, "Не удалось получить ответ. Попробуйте позже или позвоните: +7 (702) 144-64-04.", "Жауап алу мүмкін болмады. Кейінірек көріңіз немесе қоңырау шалыңыз: +7 (702) 144-64-04.", "Could not get a response. Try later or call: +7 (702) 144-64-04."))];
      typing.classList.add("ai-answer");
      typing.innerHTML = blocks.map((b, i) => `<div class="ai-block" style="animation-delay:${(i * 0.12).toFixed(2)}s">${b}</div>`).join("");
      ctx.quick = res && res.quick ? res.quick : (chatData[lang] && chatData[lang].quick);
      scrollLog(); rebuildChat(); finish();
    }
  }
  function openChat(){
    panel.classList.add("open"); fab.setAttribute("aria-expanded", "true"); badge.style.display = "none";
    if (!chatStarted) {
      chatStarted = true;
      if (!loadChat()) addMsg(chatData[lang].greet, "bot");
      rebuildChat(); probeAI();
    }
    paintStatus();
    setTimeout(() => chatText && chatText.focus(), 350);
  }
  function closeChat(){ panel.classList.remove("open"); fab.setAttribute("aria-expanded", "false"); }
  if (fab) fab.addEventListener("click", () => panel.classList.contains("open") ? closeChat() : openChat());
  const chatCloseBtn = $("#chatClose"); if (chatCloseBtn) chatCloseBtn.addEventListener("click", closeChat);
  if (chatClearBtn) chatClearBtn.addEventListener("click", () => { if (!busy) clearChat(); });
  const chatFormEl = $("#chatForm");
  if (chatFormEl) chatFormEl.addEventListener("submit", e => {
    e.preventDefault(); if (busy) return;
    const v = chatText ? chatText.value.trim() : ""; if (!v) return;
    handleChatInput(v);
  });
  if (log) log.addEventListener("click", e => { const a = e.target.closest("[data-chat-link]"); if (a) closeChat(); });
  window.addEventListener("langchange", paintStatus);
  paintStatus();

  /* ============================================================
     ENHANCEMENT PASS — motion & graphics layer
     ============================================================ */
  const fine = window.matchMedia("(pointer: fine)").matches;
  const el = html => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };

  /* ---------- Branded intro ---------- */
  (function () {
    const node = el(
      '<div class="intro" id="intro" aria-hidden="true"><div class="intro-inner">' +
      '<svg class="intro-mark" viewBox="0 0 48 48" fill="none">' +
      '<path class="tri" d="M24 9l14 30H10z" stroke="#00E5FF" stroke-width="2.6" stroke-linejoin="round"/>' +
      '<circle class="dot" cx="24" cy="30" r="3.4" fill="#FF3CAC"/>' +
      '<path d="M17 33h14" stroke="#00FFD1" stroke-width="2.2" stroke-linecap="round"/></svg>' +
      '<div class="intro-word">AQTK</div>' +
      '<div class="intro-count" id="introCount">00</div>' +
'<div class="intro-tag">Aktobe · Kazakhstan</div>' +
      '<div class="intro-bar"><i></i></div></div></div>'
    );
    document.body.prepend(node);
    const counter = node.querySelector("#introCount");
    if (counter && !reduce) {
      let v = 0;
      const iv = setInterval(() => {
        v = Math.min(100, v + Math.ceil(Math.random() * 7 + 3));
        counter.textContent = String(v).padStart(2, "0");
        if (v >= 100) clearInterval(iv);
      }, 60);
    } else if (counter) { counter.textContent = "100"; }
    let done = false;
    function finish() {
      if (done) return; done = true;
      document.body.classList.add("ready");
      node.classList.add("done");
      setTimeout(() => node.remove(), 900);
    }
    if (reduce) { finish(); return; }
    if (document.readyState === "complete") setTimeout(finish, 350);
    else window.addEventListener("load", () => setTimeout(finish, 350));
    setTimeout(finish, 1500);
  })();

  /* ---------- Scroll progress ---------- */
  (function () {
    const bar = el('<div class="scroll-progress" id="progress"></div>');
    document.body.appendChild(bar);
    let tick = false;
    function upd() {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
      tick = false;
    }
    window.addEventListener("scroll", () => { if (!tick) { tick = true; requestAnimationFrame(upd); } }, { passive: true });
    window.addEventListener("resize", upd);
    upd();
  })();

  /* ---------- Typewriter for big headings ---------- */
  const TW_VOID = { br:1, img:1, hr:1, input:1, meta:1, link:1, source:1, wbr:1, area:1, base:1, col:1, embed:1, track:1 };
  const TW_CARET = '<span class="type-caret" aria-hidden="true"></span>';
  function twFrames(html) {
    const dec = document.createElement("div");
    const stack = [], frames = [""], plains = [""];
    let out = "", plain = "", i = 0;
    while (i < html.length) {
      const ch = html[i];
      if (ch === "<") {
        const j = html.indexOf(">", i);
        const tag = j === -1 ? ch : html.slice(i, j + 1);
        i = j === -1 ? i + 1 : j + 1;
        out += tag;
        const m = tag.match(/^<\s*(\/?)\s*([a-zA-Z0-9]+)/);
        if (m) {
          const name = m[2].toLowerCase();
          if (m[1] === "/") { for (let k = stack.length - 1; k >= 0; k--) if (stack[k] === name) { stack.splice(k, 1); break; } }
          else if (!TW_VOID[name] && !/\/\s*>$/.test(tag)) stack.push(name);
          if (name === "br" && m[1] !== "/") plain += " ";
        }
      } else {
        let c = ch, d = ch;
        if (ch === "&") { const j = html.indexOf(";", i); if (j !== -1 && j - i <= 10) { c = html.slice(i, j + 1); dec.innerHTML = c; d = dec.textContent; i = j + 1; } else i++; }
        else i++;
        out += c; plain += d;
        let bal = out;
        for (let k = stack.length - 1; k >= 0; k--) bal += "</" + stack[k] + ">";
        frames.push(bal); plains.push(plain);
      }
    }
    return { frames, plains };
  }
  function twFinish(el, frames, plains, total, keepCaret) {
    if (el.__twTimer) { clearTimeout(el.__twTimer); el.__twTimer = null; }
    el.innerHTML = frames[total] + (keepCaret ? TW_CARET : "");
    if (el.classList.contains("glitch")) el.setAttribute("data-text", plains[total]);
    el.classList.add("tw-done");
  }
  function typeInto(el, html, opts) {
    opts = opts || {};
    if (el.__twTimer) { clearTimeout(el.__twTimer); el.__twTimer = null; }
    const { frames, plains } = twFrames(html);
    const total = frames.length - 1, speed = opts.speed || 34, glitch = el.classList.contains("glitch");
    el.classList.remove("tw-done");
    if (reduce || motionOff || total === 0) { twFinish(el, frames, plains, total, false); if (opts.done) opts.done(); return; }
    let n = 0;
    el.innerHTML = TW_CARET;
    if (glitch) el.setAttribute("data-text", "");
    function step() {
      if (motionOff) { twFinish(el, frames, plains, total, false); if (opts.done) opts.done(); return; }
      n++;
      el.innerHTML = frames[n] + TW_CARET;
      if (glitch) el.setAttribute("data-text", plains[n]);
      if (n < total) {
        const last = plains[n].slice(-1);
        const d = last === " " ? speed * 0.55 : (/[.,!?;:—]/.test(last) ? speed * 3.2 : speed);
        el.__twTimer = setTimeout(step, d);
      } else { twFinish(el, frames, plains, total, true); if (opts.done) opts.done(); }
    }
    el.__twTimer = setTimeout(step, opts.startDelay == null ? 140 : opts.startDelay);
  }
  function typeHero() {
    const h1 = $(".hero h1"); if (!h1) return;
    h1.classList.remove("reveal-hero", "d2");
    const html = h1.innerHTML.replace(/<span class="type-caret"[^>]*><\/span>/g, "");
    h1.dataset.twHtml = html;
    typeInto(h1, html, { speed: 40, startDelay: 160 });
  }
  (function initHeroTyping() {
    const h1 = $(".hero h1"); if (!h1) return;
    h1.classList.remove("reveal-hero", "d2");
    h1.dataset.twHtml = h1.innerHTML;
    if (reduce || motionOff) { typeInto(h1, h1.dataset.twHtml, { speed: 40 }); return; }
    let started = false, mo = null;
    const go = () => { if (started) return; started = true; if (mo) mo.disconnect(); typeHero(); };
    if (document.body.classList.contains("ready")) go();
    else {
      mo = new MutationObserver(() => { if (document.body.classList.contains("ready")) go(); });
      mo.observe(document.body, { attributes: true, attributeFilter: ["class"] });
      setTimeout(go, 2200);
    }
  })();
  (function initTitleTyping() {
    const titles = $$("h2.title");
    titles.forEach(h => { h.classList.remove("reveal"); h.classList.add("tw-title"); });
    if (reduce || motionOff) { titles.forEach(h => h.classList.add("tw-done")); return; }
    const io = new IntersectionObserver((es, obs) => {
      es.forEach(e => {
        if (!e.isIntersecting) return;
        const h = e.target; obs.unobserve(h);
        if (h.dataset.twDone) return;
        typeInto(h, h.innerHTML, { speed: 24, startDelay: 60, done: () => { h.dataset.twDone = "1"; } });
      });
    }, { threshold: 0.35 });
    titles.forEach(h => io.observe(h));
    window.addEventListener("langchange", () => {
      titles.forEach(h => {
        if (h.__twTimer) { clearTimeout(h.__twTimer); h.__twTimer = null; h.dataset.twDone = "1"; h.classList.add("tw-done"); const c = $(".type-caret", h); if (c) c.remove(); }
      });
      const h1 = $(".hero h1"); if (!h1) return;
      if (h1.__twTimer) { clearTimeout(h1.__twTimer); h1.__twTimer = null; }
      h1.dataset.twHtml = h1.innerHTML;
      typeInto(h1, h1.dataset.twHtml, { speed: 40, startDelay: 80 });
    });
  })();

  /* ---------- Welding sparks (hero canvas) ---------- */
  (function () {
    if (reduce) return;
    const hero = $(".hero"); if (!hero) return;
    const cv = el('<canvas class="sparks"></canvas>');
    hero.appendChild(cv);
    const ctx = cv.getContext("2d"); if (!ctx) { cv.remove(); return; }
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const colors = ["0,229,255", "157,77,255", "255,60,172", "0,255,209"];
    let w = 0, h = 0, parts = [], raf = null, running = false, visible = true;
    function spawn(p) {
      p.x = Math.random() * w;
      p.y = h + Math.random() * 60;
      p.vy = -(0.3 + Math.random() * 0.95);
      p.vx = (Math.random() - 0.5) * 0.35;
      p.r = 0.8 + Math.random() * 1.7;
      p.c = colors[(Math.random() * colors.length) | 0];
      p.ph = Math.random() * Math.PI * 2;
      p.sp = 0.02 + Math.random() * 0.05;
      return p;
    }
    function build() {
      w = hero.offsetWidth; h = hero.offsetHeight;
      cv.style.width = w + "px"; cv.style.height = h + "px";
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(80, Math.max(16, Math.floor(w / 16)));
      parts = []; for (let i = 0; i < n; i++) { const p = spawn({}); p.y = Math.random() * h; parts.push(p); }
    }
    function frame() {
      if (!running) return;
      if (motionOff) { raf = requestAnimationFrame(frame); return; }
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        p.y += p.vy; p.x += p.vx; p.ph += p.sp;
        if (p.y < -20 || p.x < -20 || p.x > w + 20) spawn(p);
        const a = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(p.ph));
        ctx.beginPath();
        ctx.shadowBlur = 8; ctx.shadowColor = "rgba(" + p.c + ",0.9)";
        ctx.fillStyle = "rgba(" + p.c + "," + a.toFixed(3) + ")";
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(frame);
    }
    function start() { if (running || !visible || document.hidden) return; running = true; raf = requestAnimationFrame(frame); }
    function stop() { running = false; if (raf) cancelAnimationFrame(raf); raf = null; }
    build();
    let rt = null;
    const rebuild = () => { clearTimeout(rt); rt = setTimeout(build, 120); };
    window.addEventListener("resize", rebuild);
    if ("ResizeObserver" in window) new ResizeObserver(rebuild).observe(hero);
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(es => { es.forEach(e => { visible = e.isIntersecting; visible ? start() : stop(); }); }, { threshold: 0 }).observe(cv);
    }
    document.addEventListener("visibilitychange", () => { document.hidden ? stop() : start(); });
    start();
  })();

  /* ---------- Cursor glow ---------- */
  (function () {
    if (!fine || reduce) return;
    const glow = el('<div class="cursor-glow"></div>');
    const dot = el('<div class="cursor-dot"></div>');
    document.body.appendChild(glow);
    document.body.appendChild(dot);
    let gx = window.innerWidth / 2, gy = window.innerHeight / 2, tx = gx, ty = gy, raf = null;
    function loop() {
      gx += (tx - gx) * 0.12; gy += (ty - gy) * 0.12;
      glow.style.transform = "translate3d(" + (gx - 170) + "px," + (gy - 170) + "px,0)";
      dot.style.transform = "translate3d(" + tx + "px," + ty + "px,0)";
      if (Math.abs(tx - gx) > 0.4 || Math.abs(ty - gy) > 0.4) raf = requestAnimationFrame(loop);
      else raf = null;
    }
    window.addEventListener("pointermove", e => {
      tx = e.clientX; ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(loop);
    }, { passive: true });
    document.addEventListener("pointerover", e => {
      if (e.target.closest("a,button,.spec-head,.partner,.dept,.life-card,.value,.stat,.news-card,.insta-item,.contact-item,.hero-chip")) dot.classList.add("is-on");
    });
    document.addEventListener("pointerout", e => {
      if (e.target.closest("a,button,.spec-head,.partner,.dept,.life-card,.value,.stat,.news-card,.insta-item,.contact-item,.hero-chip")) dot.classList.remove("is-on");
    });
  })();

  /* ---------- Magnetic buttons ---------- */
  if (fine && !reduce) $$(".btn").forEach(b => {
    b.addEventListener("pointermove", e => {
      if (motionOff) return;
      const r = b.getBoundingClientRect();
      const px = ((e.clientX - r.left) / r.width - 0.5) * 16;
      const py = ((e.clientY - r.top) / r.height - 0.5) * 12;
      b.style.transform = "translate(" + px.toFixed(1) + "px," + py.toFixed(1) + "px)";
    });
    b.addEventListener("pointerleave", () => { b.style.transform = ""; });
  });

  /* ---------- Ripple ---------- */
  document.addEventListener("click", e => {
    if (reduce || motionOff) return;
    const t = e.target.closest(".btn, .spec-head, .chat-quick button"); if (!t) return;
    const r = t.getBoundingClientRect(), size = Math.max(r.width, r.height) * 2;
    const s = document.createElement("span");
    s.className = "ripple";
    s.style.width = s.style.height = size + "px";
    s.style.left = (e.clientX - r.left - size / 2) + "px";
    s.style.top = (e.clientY - r.top - size / 2) + "px";
    t.appendChild(s);
    setTimeout(() => s.remove(), 720);
  });

  /* ---------- 3D tilt cards ---------- */
  if (fine && !reduce) $$(".dept, .news-card, .life-card").forEach(c => {
    c.addEventListener("pointermove", e => {
      if (motionOff) return;
      const r = c.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      c.style.transform = "perspective(900px) rotateX(" + (-py * 6).toFixed(2) + "deg) rotateY(" + (px * 8).toFixed(2) + "deg) translateY(-4px)";
    });
    c.addEventListener("pointerleave", () => { c.style.transform = ""; });
  });

  /* ---------- Clip-path image reveals ---------- */
  (function () {
    const imgs = $$(".about-media, .prod-media figure, .insta-item");
    imgs.forEach(n => n.classList.add("img-reveal"));
    if ("IntersectionObserver" in window && !reduce) {
      const io = new IntersectionObserver((es, obs) => {
        es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } });
      }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
      imgs.forEach(n => io.observe(n));
    } else imgs.forEach(n => n.classList.add("in"));
  })();

  /* ---------- Varied reveal assignment ---------- */
  (function () {
    const variants = ["reveal-up","reveal-left","reveal-right","reveal-scale","reveal-blur","reveal-clip","reveal-rotate","reveal-down"];
    const sections = $$("section[id]");
    sections.forEach((sec, si) => {
      const reveals = $$(".reveal", sec);
      reveals.forEach((el, i) => {
        // remove base transform classes already? .reveal has none by default now
        const v = variants[(si + i) % variants.length];
        el.classList.add(v);
      });
    });
  })();

  /* ---------- Hero orb mouse parallax ---------- */
  (function () {
    if (reduce) return;
    const orb = $(".hero-orb"); if (!orb) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
    function loop() {
      if (motionOff) { orb.style.transform = "translateY(-50%)"; raf = null; return; }
      cx += (tx - cx) * .08; cy += (ty - cy) * .08;
      orb.style.transform = "translateY(-50%) translate3d(" + cx.toFixed(1) + "px," + cy.toFixed(1) + "px,0) rotateY(" + (cx * .05).toFixed(2) + "deg)";
      if (Math.abs(tx - cx) > .3 || Math.abs(ty - cy) > .3) raf = requestAnimationFrame(loop);
      else raf = null;
    }
    window.addEventListener("pointermove", e => {
      if (motionOff) return;
      const r = orb.getBoundingClientRect();
      tx = (e.clientX - (r.left + r.width / 2)) * .18;
      ty = (e.clientY - (r.top + r.height / 2)) * .18;
      if (!raf) raf = requestAnimationFrame(loop);
    }, { passive: true });
  })();

  /* ---------- Page transition overlay ---------- */
  (function () {
    const overlay = document.createElement("div");
    overlay.className = "page-transition";
    document.body.appendChild(overlay);
    document.addEventListener("click", e => {
      const a = e.target.closest("a[href^='#']");
      if (!a || reduce || motionOff) return;
      overlay.classList.add("active");
      setTimeout(() => overlay.classList.remove("active"), 420);
    });
  })();

  /* ---------- Holographic card light tracking ---------- */
  (function () {
    if (!fine || reduce) return;
    $$(".spec, .dept, .life-card, .value, .news-card, .contact-item, .stat, .partner, .insta-item").forEach(c => {
      c.addEventListener("pointermove", e => {
        if (motionOff) return;
        const r = c.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        c.style.setProperty("--mx", x + "%");
        c.style.setProperty("--my", y + "%");
      });
    });
  })();

  /* ---------- FX: lasers, arcs, rings, plasma, cursor trail ---------- */
  (function () {
    if (reduce) return;
    const cv = document.createElement("canvas");
    cv.id = "fxCanvas";
    cv.style.cssText = "position:fixed;inset:0;z-index:1;pointer-events:none;";
    document.body.prepend(cv);
    const ctx = cv.getContext("2d");
    if (!ctx) { cv.remove(); return; }
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const mobile = window.matchMedia("(max-width:760px)").matches;
    let w = 0, h = 0, raf = null, visible = true, mx = -9999, my = -9999;
    const trail = [];
    const lasers = [];
    const arcs = [];
    const rings = [];
    for (let i = 0; i < 4; i++) rings.push({
      cx: Math.random(), cy: Math.random(),
      r: 70 + Math.random() * 150,
      speed: .003 + Math.random() * .006,
      angle: Math.random() * Math.PI * 2,
      tilt: .3 + Math.random() * .7,
      color: ["0,229,255","157,77,255","255,60,172","0,255,209"][i % 4],
      w: 1 + Math.random() * 1.2
    });
    const clouds = [];
    for (let i = 0; i < 5; i++) clouds.push({
      x: Math.random(), y: Math.random(),
      r: 130 + Math.random() * 180,
      vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25,
      color: ["0,229,255","157,77,255","255,60,172","0,255,209","36,107,253"][i % 5],
      phase: Math.random() * Math.PI * 2
    });

    let prevW = 0, prevH = 0;
    function build() {
      const pw = prevW, ph = prevH;
      w = window.innerWidth; h = window.innerHeight;
      cv.style.width = w + "px"; cv.style.height = h + "px";
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (pw && ph) {
        const sx = w / pw, sy = h / ph;
        rings.forEach(r => { r.cx *= sx; r.cy *= sy; });
        clouds.forEach(c => { c.x *= sx; c.y *= sy; });
      } else {
        rings.forEach(r => { r.cx = Math.random() * w; r.cy = Math.random() * h; });
        clouds.forEach(c => { c.x = Math.random() * w; c.y = Math.random() * h; });
      }
      prevW = w; prevH = h;
    }

    function spawnLaser() {
      const types = ["diag","horiz","persp","sweep"];
      const t = types[Math.random() * types.length | 0];
      const color = Math.random() < .5 ? "0,229,255" : (Math.random() < .5 ? "157,77,255" : "255,60,172");
      const life = 2000 + Math.random() * 3000;
      let l;
      if (t === "horiz") l = { type: t, y: Math.random() * h, x: -200, speed: 1.5 + Math.random() * 2, len: 180 + Math.random() * 260, color, life, age: 0, lw: 1.2 + Math.random() * 1.6 };
      else if (t === "diag") {
        const fromTop = Math.random() < .5;
        l = { type: t, x: fromTop ? Math.random() * w * .6 : -100, y: fromTop ? -100 : Math.random() * h * .6, vx: 2 + Math.random() * 2, vy: 2 + Math.random() * 2, len: 200 + Math.random() * 200, color, life, age: 0, lw: 1.2 + Math.random() * 1.4 };
      } else if (t === "persp") l = { type: t, x: Math.random() * w, y: h * .4 + Math.random() * h * .2, vx: (Math.random() - .5) * .8, vy: -1.2 - Math.random() * 1.5, len: 260 + Math.random() * 200, color, life, age: 0, lw: 1 + Math.random() * 1.2 };
      else l = { type: "sweep", y: Math.random() * h, x: -300, speed: 3 + Math.random() * 2, len: w + 600, color, life, age: 0, lw: 2 + Math.random() * 2 };
      lasers.push(l);
    }

    function spawnArc() {
      const x1 = Math.random() * w, y1 = Math.random() * h;
      const x2 = x1 + (Math.random() - .5) * 300, y2 = y1 + (Math.random() - .5) * 300;
      const segs = 6 + (Math.random() * 6 | 0);
      const pts = [];
      for (let i = 0; i <= segs; i++) { const t = i / segs; pts.push({ x: x1 + (x2 - x1) * t + (Math.random() - .5) * 40, y: y1 + (y2 - y1) * t + (Math.random() - .5) * 40 }); }
      arcs.push({ pts, color: Math.random() < .5 ? "0,229,255" : "157,77,255", life: 300 + Math.random() * 400, age: 0 });
    }

    let lastLaser = 0, lastArc = 0;
    let prevTs = 0, dtAvg = 16, slowFrames = 0, fastFrames = 0, lowPower = false;
    function frame(ts) {
      if (!visible || document.hidden) { prevTs = ts; raf = requestAnimationFrame(frame); return; }
      if (motionOff) { ctx.clearRect(0, 0, w, h); prevTs = ts; raf = requestAnimationFrame(frame); return; }
      if (prevTs) { const dt = ts - prevTs; if (dt > 0 && dt < 200) dtAvg += (dt - dtAvg) * 0.1; }
      prevTs = ts;
      if (!lowPower && dtAvg > 30) { if (++slowFrames > 30) { lowPower = true; slowFrames = 0; } } else slowFrames = 0;
      if (lowPower && dtAvg < 22) { if (++fastFrames > 90) { lowPower = false; fastFrames = 0; } } else fastFrames = 0;
      const glow = lowPower ? 0 : 1;
      ctx.clearRect(0, 0, w, h);

      // plasma clouds
      for (const c of clouds) {
        c.x += c.vx; c.y += c.vy; c.phase += .008;
        if (c.x < -c.r) c.x = w + c.r; if (c.x > w + c.r) c.x = -c.r;
        if (c.y < -c.r) c.y = h + c.r; if (c.y > h + c.r) c.y = -c.r;
        const g = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.r);
        g.addColorStop(0, "rgba(" + c.color + "," + (0.05 + 0.04 * Math.sin(c.phase)) + ")");
        g.addColorStop(1, "rgba(" + c.color + ",0)");
        ctx.fillStyle = g;
        ctx.fillRect(c.x - c.r, c.y - c.r, c.r * 2, c.r * 2);
      }

      // rings
      for (const r of rings) {
        r.angle += r.speed;
        ctx.save();
        ctx.translate(r.cx, r.cy);
        ctx.rotate(r.angle);
        ctx.scale(1, r.tilt);
        ctx.beginPath();
        ctx.arc(0, 0, r.r, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(" + r.color + ",.3)";
        ctx.lineWidth = r.w;
        ctx.shadowBlur = 12 * glow; ctx.shadowColor = "rgba(" + r.color + ",.5)";
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(0, 0, r.r, r.angle * 2, r.angle * 2 + 1.2);
        ctx.strokeStyle = "rgba(" + r.color + ",.85)";
        ctx.lineWidth = r.w * 1.6;
        ctx.shadowBlur = 16 * glow; ctx.shadowColor = "rgba(" + r.color + ",.9)";
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.restore();
      }

      // spawn lasers
      const spawnMul = lowPower ? 2.2 : 1;
      if (ts - lastLaser > (mobile ? 900 : 400) * spawnMul) { spawnLaser(); lastLaser = ts; }
      if (ts - lastArc > (mobile ? 2400 : 1500) * spawnMul) { if (Math.random() < .5) spawnArc(); lastArc = ts; }

      // lasers
      for (let i = lasers.length - 1; i >= 0; i--) {
        const l = lasers[i];
        l.age += 16;
        if (l.age > l.life) { lasers.splice(i, 1); continue; }
        const fade = Math.min(1, (l.life - l.age) / 600) * Math.min(1, l.age / 400);
        if (l.type === "horiz") l.x += l.speed;
        else if (l.type === "diag") { l.x += l.vx; l.y += l.vy; }
        else if (l.type === "persp") { l.x += l.vx; l.y += l.vy; }
        else if (l.type === "sweep") l.x += l.speed;

        let x0, y0, x1, y1;
        if (l.type === "horiz") { x0 = l.x; y0 = l.y; x1 = l.x - l.len; y1 = l.y; }
        else if (l.type === "diag") { x0 = l.x; y0 = l.y; x1 = l.x - l.len * .6; y1 = l.y - l.len * .6; }
        else if (l.type === "persp") { x0 = l.x; y0 = l.y; x1 = l.x - l.len * .4; y1 = l.y + l.len * .4; }
        else { x0 = l.x; y0 = l.y; x1 = l.x - l.len; y1 = l.y; }

        const g = ctx.createLinearGradient(x0, y0, x1, y1);
        g.addColorStop(0, "rgba(" + l.color + "," + (0.85 * fade).toFixed(3) + ")");
        g.addColorStop(.3, "rgba(" + l.color + "," + (0.4 * fade).toFixed(3) + ")");
        g.addColorStop(1, "rgba(" + l.color + ",0)");
        ctx.strokeStyle = g;
        ctx.lineWidth = l.lw;
        ctx.shadowBlur = 18 * glow; ctx.shadowColor = "rgba(" + l.color + ",.9)";
        ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
        ctx.shadowBlur = 0;

        const pulseT = l.age / l.life;
        const px = x0 + (x1 - x0) * pulseT, py = y0 + (y1 - y0) * pulseT;
        const pg = ctx.createRadialGradient(px, py, 0, px, py, 14);
        pg.addColorStop(0, "rgba(" + l.color + "," + (.9 * fade).toFixed(3) + ")");
        pg.addColorStop(1, "rgba(" + l.color + ",0)");
        ctx.fillStyle = pg;
        ctx.beginPath(); ctx.arc(px, py, 14, 0, Math.PI * 2); ctx.fill();

        if (l.x > w + 400 || l.x < -w - 400 || l.y > h + 400 || l.y < -h - 400) lasers.splice(i, 1);
      }

      // arcs
      for (let i = arcs.length - 1; i >= 0; i--) {
        const a = arcs[i];
        a.age += 16;
        if (a.age > a.life) { arcs.splice(i, 1); continue; }
        const fade = Math.min(1, (a.life - a.age) / 200);
        ctx.strokeStyle = "rgba(" + a.color + "," + (.7 * fade).toFixed(3) + ")";
        ctx.lineWidth = 1.4;
        ctx.shadowBlur = 12 * glow; ctx.shadowColor = "rgba(" + a.color + ",.8)";
        ctx.beginPath();
        a.pts.forEach((p, idx) => { if (idx === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); });
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // cursor trail
      if (mx > -9000) {
        trail.push({ x: mx, y: my, t: ts });
        const trailCap = lowPower ? 8 : 20;
        while (trail.length > trailCap) trail.shift();
        for (let i = 1; i < trail.length; i++) {
          const p = trail[i - 1], q = trail[i];
          const a = (i / trail.length) * .55;
          ctx.strokeStyle = "rgba(0,229,255," + a.toFixed(3) + ")";
          ctx.lineWidth = 2;
          ctx.shadowBlur = 10 * glow; ctx.shadowColor = "rgba(0,229,255,.8)";
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          ctx.shadowBlur = 0;
        }
        const hg = ctx.createRadialGradient(mx, my, 0, mx, my, 30);
        hg.addColorStop(0, "rgba(0,229,255,.55)");
        hg.addColorStop(1, "rgba(0,229,255,0)");
        ctx.fillStyle = hg;
        ctx.beginPath(); ctx.arc(mx, my, 30, 0, Math.PI * 2); ctx.fill();
      }
      while (trail.length && ts - trail[0].t > 450) trail.shift();

      raf = requestAnimationFrame(frame);
    }

    build();
    window.addEventListener("resize", () => { clearTimeout(window.__fx); window.__fx = setTimeout(build, 150); });
    window.addEventListener("pointermove", e => { mx = e.clientX; my = e.clientY; }, { passive: true });
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(es => { es.forEach(e => { visible = e.isIntersecting; }); }, { threshold: 0 });
      io.observe(cv);
    }
    document.addEventListener("visibilitychange", () => { if (document.hidden) { if (raf) cancelAnimationFrame(raf); raf = null; } else { if (!raf) raf = requestAnimationFrame(frame); } });
    raf = requestAnimationFrame(frame);
  })();

  /* ---------- Motion toggle (TZ §10.9) ---------- */
  (function () {
    const btn = $("#motionToggle"); if (!btn) return;
    const TITLES = {
      ru: { on: "Выключить анимации", off: "Включить анимации" },
      kz: { on: "Анимацияны өшіру", off: "Анимацияны қосу" },
      en: { on: "Disable animations", off: "Enable animations" }
    };
    const sync = () => {
      btn.setAttribute("aria-pressed", motionOff ? "true" : "false");
      const t = TITLES[lang] || TITLES.ru;
      btn.title = motionOff ? t.off : t.on;
      btn.setAttribute("aria-label", btn.title);
    };
    const resetTransforms = () => {
      $$(".btn, .dept, .news-card, .life-card, .spec, .value, .contact-item, .stat, .partner, .insta-item").forEach(el => {
        el.style.transform = ""; el.style.removeProperty("--mx"); el.style.removeProperty("--my");
      });
      const hw = $(".hero .wrap"); if (hw) { hw.style.transform = ""; hw.style.opacity = ""; }
      const orb = $(".hero-orb"); if (orb) orb.style.transform = "translateY(-50%)";
    };
    sync();
    window.addEventListener("langchange", sync);
    btn.addEventListener("click", () => {
      motionOff = !motionOff;
      try { localStorage.setItem(AOM_KEY, motionOff ? "1" : "0"); } catch (e) {}
      applyMotion();
      resetTransforms();
      sync();
      window.dispatchEvent(new Event("motionchange"));
    });
  })();

  /* ---------- Document content (trilingual) ---------- */
  let currentDoc = null;
  const DOCS = {
    "Расписание · I семестр": {
      ru: ["Расписание · I семестр", `<p>Занятия идут по семестровой системе. I семестр длится с сентября по декабрь, пары начинаются в 09:00.</p><span class="im-h">Что входит</span><ul><li>Общеобразовательные и профильные дисциплины</li><li>Практика в мастерских и лабораториях</li><li>Текущий контроль и рубежные аттестации</li></ul><p class="im-note">Расписание по группам публикуется в электронном портале и на стендах отделения.</p>`],
      kz: ["Кесте · I семестр", `<p>Оқу семестрлік жүйе бойынша жүреді. I семестр қыркүйектен желтоқсанға дейін созылады, сабақтар 09:00-де басталады.</p><span class="im-h">Құрамы</span><ul><li>Жалпы білім және бейіндік пәндер</li><li>Шеберханалар мен зертханалардағы практика</li><li>Ағымдағы бақылау және аралық аттестация</li></ul><p class="im-note">Топтар бойынша кесте электрондық порталда және бөлімше стендтерінде жарияланады.</p>`],
      en: ["Schedule · Semester I", `<p>Classes follow the semester system. Semester I runs from September to December, lessons start at 09:00.</p><span class="im-h">Includes</span><ul><li>General and profile subjects</li><li>Workshop and laboratory practice</li><li>Continuous assessment and mid-term checks</li></ul><p class="im-note">The group schedule is published on the e-portal and department boards.</p>`]
    },
    "Расписание · II семестр": {
      ru: ["Расписание · II семестр", `<p>II семестр длится с января по май и завершается летней экзаменационной сессией и производственной практикой.</p><span class="im-h">Особенности</span><ul><li>Углублённая профильная подготовка</li><li>Подготовка к чемпионатам WorldSkills</li><li>Промежуточная аттестация перед сессией</li></ul><p><a class="im-dl" href="assets/real/docs/doc4.pdf" download>Скачать: расписание 1 курса, II семестр (PDF)</a></p><p class="im-note">Изменения в расписании доводятся через кураторов и электронный портал.</p>`],
      kz: ["Кесте · II семестр", `<p>II семестр қаңтардан мамырға дейін созылады және жазғы емтихан сессиясымен әрі өндірістік практикамен аяқталады.</p><span class="im-h">Ерекшеліктері</span><ul><li>Тереңдетілген бейіндік дайындық</li><li>WorldSkills чемпионаттарына дайындық</li><li>Сессия алдындағы аралық аттестация</li></ul><p><a class="im-dl" href="assets/real/docs/doc4.pdf" download>Жүктеу: 1-курс кестесі, II семестр (PDF)</a></p><p class="im-note">Кестедегі өзгерістер кураторлар мен электрондық портал арқылы хабарланады.</p>`],
      en: ["Schedule · Semester II", `<p>Semester II runs from January to May and ends with the summer exam session and industrial practice.</p><span class="im-h">Highlights</span><ul><li>Advanced profile training</li><li>Preparation for WorldSkills championships</li><li>Mid-term assessment before the session</li></ul><p><a class="im-dl" href="assets/real/docs/doc4.pdf" download>Download: year-1 schedule, semester II (PDF)</a></p><p class="im-note">Schedule changes are announced via curators and the e-portal.</p>`]
    },
    "Экзаменационные сессии": {
      ru: ["Экзаменационные сессии", `<p>Сессии проходят дважды в год — зимняя и летняя. Формы контроля: экзамен, дифференцированный зачёт и защита практических работ.</p><span class="im-h">Правила</span><ul><li>Допуск — при отсутствии задолженностей по текущему контролю</li><li>Пересдача — в установленные деканатом сроки</li><li>Результаты фиксируются в ведомости и зачётной книжке</li></ul><p class="im-note">График сессии утверждается приказом и публикуется заранее.</p>`],
      kz: ["Емтихан сессиялары", `<p>Сессиялар жылына екі рет — қысқы және жазғы өтеді. Бақылау түрлері: емтихан, сараланған сынақ және практикалық жұмыстарды қорғау.</p><span class="im-h">Ережелер</span><ul><li>Ағымдағы бақылау бойынша қарыз болмаған жағдайда жіберіледі</li><li>Қайта тапсыру — белгіленген мерзімде</li><li>Нәтижелер ведомость пен сынақ кітапшасында тіркеледі</li></ul><p class="im-note">Сессия кестесі бұйрықпен бекітіліп, алдын ала жарияланады.</p>`],
      en: ["Exam sessions", `<p>Sessions are held twice a year — winter and summer. Assessment forms: exam, graded credit and defence of practical work.</p><span class="im-h">Rules</span><ul><li>Admission requires no outstanding continuous-assessment debts</li><li>Retakes within the dates set by the dean's office</li><li>Results are recorded in the grade sheet and student record book</li></ul><p class="im-note">The session timetable is approved by order and published in advance.</p>`]
    },
    "Электронная библиотека": {
      ru: ["Электронная библиотека", `<p>Библиотека колледжа предоставляет доступ к учебной литературе, методическим пособиям и электронным ресурсам по всем специальностям.</p><span class="im-h">Доступно</span><ul><li>Учебники и практикумы в электронном виде</li><li>Методические указания к лабораторным работам</li><li>Подписные образовательные базы и журналы</li></ul><p class="im-note">Доступ к ресурсам — по читательскому билету через портал колледжа.</p>`],
      kz: ["Электрондық кітапхана", `<p>Колледж кітапханасы барлық мамандықтар бойынша оқу әдебиетіне, әдістемелік құралдарға және электрондық ресурстарға қолжетімділік береді.</p><span class="im-h">Қолжетімді</span><ul><li>Электрондық оқулықтар мен практикумдар</li><li>Зертханалық жұмыстарға әдістемелік нұсқаулар</li><li>Жазылым бойынша білім базалары мен журналдар</li></ul><p class="im-note">Ресурстарға қолжетімділік — колледж порталы арқылы оқырман билетімен.</p>`],
      en: ["E-library", `<p>The college library provides access to textbooks, methodological guides and electronic resources for every programme.</p><span class="im-h">Available</span><ul><li>Digital textbooks and practicum materials</li><li>Lab-work methodological guidelines</li><li>Subscribed educational databases and journals</li></ul><p class="im-note">Access is granted with a library card through the college portal.</p>`]
    },
    "Спортивные секции": {
      ru: ["Спортивные секции", `<p>Колледж поддерживает студенческий спорт: команды выступают на городских и областных соревнованиях.</p><span class="im-h">Направления</span><ul><li>Волейбол, баскетбол и мини-футбол</li><li>Национальные виды спорта и борьба</li><li>Лёгкая атлетика и общая физподготовка</li></ul><p class="im-note">Запись в секции — через преподавателя физвоспитания, занятия бесплатные.</p>`],
      kz: ["Спорт секциялары", `<p>Колледж студенттік спортты қолдайды: командалар қалалық және облыстық жарыстарда өнер көрсетеді.</p><span class="im-h">Бағыттары</span><ul><li>Волейбол, баскетбол және мини-футбол</li><li>Ұлттық спорт түрлері және күрес</li><li>Жеңіл атлетика және жалпы дене дайындығы</li></ul><p class="im-note">Секцияларға жазылу — дене тәрбиесі оқытушысы арқылы, сабақтар тегін.</p>`],
      en: ["Sports clubs", `<p>The college supports student sport: teams compete at city and regional events.</p><span class="im-h">Disciplines</span><ul><li>Volleyball, basketball and futsal</li><li>National sports and wrestling</li><li>Athletics and general fitness</li></ul><p class="im-note">Sign up through the PE teacher; sessions are free of charge.</p>`]
    },
    "Медицинский пункт": {
      ru: ["Медицинский пункт", `<p>Медицинский пункт оказывает первую помощь студентам и сотрудникам в течение учебного дня.</p><span class="im-h">Услуги</span><ul><li>Первая доврачебная помощь</li><li>Контроль санитарного состояния мастерских</li><li>Профилактические осмотры и справки</li></ul><p class="im-note">Режим работы совпадает с расписанием занятий; в экстренных случаях звоните 103.</p>`],
      kz: ["Медициналық пункт", `<p>Медициналық пункт оқу күні ішінде студенттер мен қызметкерлерге алғашқы көмек көрсетеді.</p><span class="im-h">Қызметтері</span><ul><li>Алғашқы дәрігерге дейінгі көмек</li><li>Шеберханалардың санитарлық жағдайын бақылау</li><li>Профилактикалық тексерулер мен анықтамалар</li></ul><p class="im-note">Жұмыс режимі сабақ кестесімен сәйкес келеді; жедел жағдайда 103 нөміріне қоңырау шалыңыз.</p>`],
      en: ["Medical point", `<p>The medical point provides first aid to students and staff throughout the study day.</p><span class="im-h">Services</span><ul><li>First pre-medical aid</li><li>Sanitary oversight of workshops</li><li>Preventive check-ups and certificates</li></ul><p class="im-note">Opening hours follow the class schedule; in an emergency call 103.</p>`]
    },
    "Психологическая служба": {
      ru: ["Психологическая служба", `<p>Психолог колледжа помогает студентам в адаптации, разрешении конфликтов и планировании карьеры. Конфиденциально.</p><span class="im-h">Направления</span><ul><li>Индивидуальные консультации</li><li>Поддержка первокурсников в период адаптации</li><li>Профориентация и тренинги soft skills</li></ul><p class="im-note">Запись на консультацию — через куратора или напрямую в кабинет психолога.</p>`],
      kz: ["Психологиялық қызмет", `<p>Колледж психологы студенттерге бейімделуде, жанжалдарды шешуде және мансапты жоспарлауда көмектеседі. Құпия түрде.</p><span class="im-h">Бағыттары</span><ul><li>Жеке консультациялар</li><li>Бірінші курс студенттерін бейімделу кезеңінде қолдау</li><li>Кәсіби бағдар және soft skills тренингтері</li></ul><p class="im-note">Консультацияға жазылу — куратор арқылы немесе тікелей психолог кабинетінде.</p>`],
      en: ["Psychological service", `<p>The college psychologist helps students with adaptation, conflict resolution and career planning. Confidential.</p><span class="im-h">Areas</span><ul><li>Individual counselling</li><li>Support for first-year students during adaptation</li><li>Career guidance and soft-skills training</li></ul><p class="im-note">Book a session through your curator or directly at the psychologist's office.</p>`]
    },
    "Кодекс чести студента": {
      ru: ["Кодекс чести студента", `<p>Кодекс закрепляет нормы поведения, академической честности и уважения к сообществу колледжа.</p><span class="im-h">Принципы</span><ul><li>Честность в учёбе и недопустимость плагиата</li><li>Уважение к преподавателям, однокурсникам и символам РК</li><li>Бережное отношение к имуществу и мастерским</li></ul><p class="im-note">Соблюдение кодекса — условие участия в студенческом самоуправлении и мероприятиях.</p>`],
      kz: ["Студент ар-намыс кодексі", `<p>Кодекс мінез-құлық нормаларын, академиялық адалдықты және колледж қауымдастығына құрметті бекітеді.</p><span class="im-h">Қағидалары</span><ul><li>Оқудағы адалдық және плагиатқа жол бермеу</li><li>Оқытушыларға, курстастарға және ҚР рәміздеріне құрмет</li><li>Мүлік пен шеберханаларға ұқыпты қарау</li></ul><p class="im-note">Кодексті сақтау — студенттік өзін-өзі басқару мен іс-шараларға қатысу шарты.</p>`],
      en: ["Student code of honour", `<p>The code sets standards of conduct, academic integrity and respect for the college community.</p><span class="im-h">Principles</span><ul><li>Honesty in study and zero tolerance for plagiarism</li><li>Respect for teachers, peers and the symbols of Kazakhstan</li><li>Care for property and workshops</li></ul><p class="im-note">Observing the code is a condition for student self-government and event participation.</p>`]
    },
    "Кружки и секции": {
      ru: ["Кружки и секции", `<p>Внеучебная жизнь колледжа: технические, творческие и спортивные объединения для студентов всех отделений.</p><span class="im-h">Примеры</span><ul><li>Робототехника и программирование</li><li>Вокал, танцы и студенческий театр</li><li>Волонтёрство и экологические проекты</li></ul><p class="im-note">Расписание кружков обновляется в начале каждого семестра.</p>`],
      kz: ["Үйірмелер мен секциялар", `<p>Колледждің оқудан тыс өмірі: барлық бөлімше студенттеріне арналған техникалық, шығармашылық және спорттық бірлестіктер.</p><span class="im-h">Мысалдар</span><ul><li>Робототехника және бағдарламалау</li><li>Вокал, би және студенттік театр</li><li>Волонтёрлік және экологиялық жобалар</li></ul><p class="im-note">Үйірмелер кестесі әр семестр басында жаңартылады.</p>`],
      en: ["Clubs & societies", `<p>Extracurricular life: technical, creative and sports groups for students of every department.</p><span class="im-h">Examples</span><ul><li>Robotics and programming</li><li>Vocals, dance and student theatre</li><li>Volunteering and eco projects</li></ul><p class="im-note">The club timetable is refreshed at the start of each semester.</p>`]
    },
    "Сведения о трудоустройстве": {
      ru: ["Сведения о трудоустройстве", `<p>Колледж содействует трудоустройству выпускников через партнёрские предприятия и центр карьеры.</p><span class="im-h">Поддержка</span><ul><li>Ярмарки вакансий и встречи с работодателями</li><li>Помощь в составлении резюме и подготовке к собеседованию</li><li>Направление на производственную практику с перспективой найма</li></ul><p class="im-note">Статистика трудоустройства публикуется ежегодно в отчёте колледжа.</p>`],
      kz: ["Жұмысқа орналасу мәліметтері", `<p>Колледж түлектердің жұмысқа орналасуына серіктес кәсіпорындар мен мансап орталығы арқылы жәрдемдеседі.</p><span class="im-h">Қолдау</span><ul><li>Вакансия жәрмеңкелері және жұмыс берушілермен кездесулер</li><li>Резюме құруға және сұхбатқа дайындалуға көмек</li><li>Жұмысқа қабылдау перспективасымен өндірістік практикаға жіберу</li></ul><p class="im-note">Жұмысқа орналасу статистикасы жыл сайын колледж есебінде жарияланады.</p>`],
      en: ["Employment information", `<p>The college helps graduates find work through partner enterprises and a career centre.</p><span class="im-h">Support</span><ul><li>Job fairs and meetings with employers</li><li>Help with CVs and interview preparation</li><li>Industrial practice placements with hiring prospects</li></ul><p class="im-note">Employment statistics are published annually in the college report.</p>`]
    },
    "Производственная практика": {
      ru: ["Производственная практика", `<p>Практика проходит на базе партнёрских предприятий и в мастерских колледжа под руководством наставников.</p><span class="im-h">Этапы</span><ul><li>Учебная практика — освоение базовых операций</li><li>Производственная практика — работа на предприятии</li><li>Преддипломная практика — сбор материала для дипломного проекта</li></ul><p class="im-note">Место практики закрепляется договором; студент ведёт дневник и отчёт.</p>`],
      kz: ["Өндірістік практика", `<p>Практика серіктес кәсіпорындар базасында және колледж шеберханаларында тәлімгерлердің жетекшілігімен өтеді.</p><span class="im-h">Кезеңдері</span><ul><li>Оқу практикасы — негізгі операцияларды меңгеру</li><li>Өндірістік практика — кәсіпорында жұмыс</li><li>Диплом алды практикасы — дипломдық жобаға материал жинау</li></ul><p class="im-note">Практика орны шартпен бекітіледі; студент күнделік пен есеп жүргізеді.</p>`],
      en: ["Industrial practice", `<p>Practice takes place at partner enterprises and in college workshops under mentor supervision.</p><span class="im-h">Stages</span><ul><li>Training practice — mastering basic operations</li><li>Industrial practice — work at an enterprise</li><li>Pre-diploma practice — gathering material for the diploma project</li></ul><p class="im-note">The placement is fixed by contract; the student keeps a diary and report.</p>`]
    },
    "Наши выпускники": {
      ru: ["Наши выпускники", `<p>Выпускники AQTK работают на предприятиях Актобе и Казахстана, многие продолжают обучение в вузах по профильным направлениям.</p><span class="im-h">Траектории</span><ul><li>Трудоустройство по специальности на предприятиях-партнёрах</li><li>Поступление в технические вузы по сокращённым программам</li><li>Собственное дело и участие в чемпионатах профмастерства</li></ul><p class="im-note">Истории успешных выпускников публикуются в разделе СМИ и на днях открытых дверей.</p>`],
      kz: ["Біздің түлектер", `<p>AQTK түлектері Ақтөбе мен Қазақстан кәсіпорындарында жұмыс істейді, көбі бейіндік бағыттар бойынша ЖОО-да оқуын жалғастырады.</p><span class="im-h">Траекториялар</span><ul><li>Серіктес кәсіпорындарда мамандық бойынша жұмысқа орналасу</li><li>Қысқартылған бағдарламалар бойынша техникалық ЖОО-ға түсу</li><li>Өз кәсібі және кәсіби шеберлік чемпионаттарына қатысу</li></ul><p class="im-note">Табысты түлектер тарихы БАҚ бөлімінде және ашық есік күндерінде жарияланады.</p>`],
      en: ["Our graduates", `<p>AQTK graduates work at enterprises in Aktobe and across Kazakhstan; many continue into profile university programmes.</p><span class="im-h">Paths</span><ul><li>Employment by specialty at partner enterprises</li><li>Admission to technical universities via shortened programmes</li><li>Own business and participation in skills championships</li></ul><p class="im-note">Success stories are published in the media section and at open days.</p>`]
    },
    "Меморандумы и договоры": {
      ru: ["Меморандумы и договоры", `<p>Колледж заключает меморандумы и договоры с предприятиями и вузами для развития дуального обучения и практики.</p><span class="im-h">Форматы</span><ul><li>Меморандумы о сотрудничестве с работодателями</li><li>Договоры на производственную практику студентов</li><li>Соглашения о целевой подготовке и стажировках</li></ul><p class="im-note">Реестр действующих соглашений доступен в электронном портале колледжа.</p>`],
      kz: ["Меморандумдар мен шарттар", `<p>Колледж дуальды оқыту мен практиканы дамыту үшін кәсіпорындармен және ЖОО-мен меморандумдар мен шарттар жасасады.</p><span class="im-h">Форматтары</span><ul><li>Жұмыс берушілермен ынтымақтастық меморандумдары</li><li>Студенттердің өндірістік практикасына шарттар</li><li>Мақсатты дайындық және тағылымдамалар туралы келісімдер</li></ul><p class="im-note">Қолданыстағы келісімдер тізілімі колледждің электрондық порталында қолжетімді.</p>`],
      en: ["Memoranda & agreements", `<p>The college signs memoranda and agreements with enterprises and universities to develop dual education and practice.</p><span class="im-h">Formats</span><ul><li>Cooperation memoranda with employers</li><li>Student industrial-practice contracts</li><li>Targeted-training and internship agreements</li></ul><p class="im-note">The register of active agreements is available on the college e-portal.</p>`]
    },
    "Дуальное обучение": {
      ru: ["Дуальное обучение", `<p>Дуальная система сочетает теорию в колледже с оплачиваемой практикой на предприятии — студент учится и работает одновременно.</p><span class="im-h">Преимущества</span><ul><li>Реальный производственный опыт до выпуска</li><li>Наставник от предприятия и стипендия/оплата труда</li><li>Высокая вероятность трудоустройства после диплома</li></ul><p class="im-note">Отбор на дуальные группы проводится совместно колледжем и предприятием-партнёром.</p>`],
      kz: ["Дуальды оқыту", `<p>Дуальды жүйе колледждегі теорияны кәсіпорындағы ақылы практикамен ұштастырады — студент бір мезгілде оқиды және жұмыс істейді.</p><span class="im-h">Артықшылықтары</span><ul><li>Түлекке дейін нақты өндірістік тәжірибе</li><li>Кәсіпорыннан тәлімгер және шәкіртақы/еңбекақы</li><li>Дипломнан кейін жұмысқа орналасудың жоғары ықтималдығы</li></ul><p class="im-note">Дуальды топтарға іріктеуді колледж бен серіктес кәсіпорын бірлесіп жүргізеді.</p>`],
      en: ["Dual education", `<p>The dual system combines college theory with paid enterprise practice — students learn and work at the same time.</p><span class="im-h">Benefits</span><ul><li>Real production experience before graduation</li><li>An enterprise mentor plus a stipend/wage</li><li>High likelihood of employment after the diploma</li></ul><p class="im-note">Selection for dual groups is run jointly by the college and the partner enterprise.</p>`]
    },
    "Видеоматериалы": {
      ru: ["Видеоматериалы", `<p>Видеораздел знакомит с колледжем: мастерские, лаборатории, студенческая жизнь и отзывы работодателей.</p><span class="im-h">Темы</span><ul><li>Экскурсии по отделениям и мастерским</li><li>Репортажи с чемпионатов WorldSkills</li><li>Интервью с выпускниками и преподавателями</li></ul><p class="im-note">Новые ролики публикуются на официальных площадках колледжа.</p>`],
      kz: ["Бейнематериалдар", `<p>Бейне бөлім колледжбен таныстырады: шеберханалар, зертханалар, студенттік өмір және жұмыс берушілер пікірлері.</p><span class="im-h">Тақырыптары</span><ul><li>Бөлімшелер мен шеберханалар бойынша экскурсиялар</li><li>WorldSkills чемпионаттарынан репортаждар</li><li>Түлектер мен оқытушылармен сұхбаттар</li></ul><p class="im-note">Жаңа роликтер колледждің ресми алаңдарында жарияланады.</p>`],
      en: ["Video materials", `<p>The video section introduces the college: workshops, labs, student life and employer feedback.</p><span class="im-h">Topics</span><ul><li>Tours of departments and workshops</li><li>Reports from WorldSkills championships</li><li>Interviews with graduates and teachers</li></ul><p class="im-note">New videos are published on the college's official channels.</p>`]
    },
    "Газеты колледжа": {
      ru: ["Газеты колледжа", `<p>Студенческая пресса освещает события колледжа, достижения и творчество студентов.</p><span class="im-h">Рубрики</span><ul><li>Новости отделений и студенческого самоуправления</li><li>Очерки о преподавателях и выпускниках</li><li>Литературные и художественные работы студентов</li></ul><p class="im-note">Выпуски газеты доступны в библиотеке и в электронном виде.</p>`],
      kz: ["Колледж газеттері", `<p>Студенттік баспасөз колледж оқиғаларын, жетістіктер мен студенттер шығармашылығын жариялайды.</p><span class="im-h">Айдарлары</span><ul><li>Бөлімшелер мен студенттік өзін-өзі басқару жаңалықтары</li><li>Оқытушылар мен түлектер туралы очерктер</li><li>Студенттердің әдеби және көркем жұмыстары</li></ul><p class="im-note">Газет шығарылымдары кітапханада және электрондық түрде қолжетімді.</p>`],
      en: ["College newspapers", `<p>The student press covers college events, achievements and student creativity.</p><span class="im-h">Sections</span><ul><li>Department and student-government news</li><li>Features on teachers and graduates</li><li>Students' literary and artistic work</li></ul><p class="im-note">Issues are available in the library and in digital form.</p>`]
    },
    "Отзывы предприятий": {
      ru: ["Отзывы предприятий", `<p>Работодатели оценивают подготовку студентов AQTK во время практики и после трудоустройства.</p><span class="im-h">Что отмечают</span><ul><li>Практические навыки и дисциплину выпускников</li><li>Готовность к работе на современном оборудовании</li><li>Ответственность и обучаемость молодых специалистов</li></ul><p class="im-note">Отзывы и благодарственные письма хранятся в центре карьеры колледжа.</p>`],
      kz: ["Кәсіпорын пікірлері", `<p>Жұмыс берушілер AQTK студенттерінің дайындығын практика кезінде және жұмысқа орналасқаннан кейін бағалайды.</p><span class="im-h">Не атап өтеді</span><ul><li>Түлектердің практикалық дағдылары мен тәртібі</li><li>Заманауи жабдықта жұмыс істеуге дайындығы</li><li>Жас мамандардың жауапкершілігі мен үйренгіштігі</li></ul><p class="im-note">Пікірлер мен алғыс хаттар колледждің мансап орталығында сақталады.</p>`],
      en: ["Employer feedback", `<p>Employers assess AQTK students during practice and after hiring.</p><span class="im-h">They note</span><ul><li>Graduates' practical skills and discipline</li><li>Readiness to work on modern equipment</li><li>Responsibility and learnability of young specialists</li></ul><p class="im-note">Reviews and letters of appreciation are kept at the college career centre.</p>`]
    },
    "Новость · SKILLS CAMP": {
      ru: ["SKILLS CAMP: профлагерь для 120 школьников", `<p><b>26 мая 2025.</b> На базе колледжа начал работу летний профессиональный лагерь SKILLS CAMP, охвативший 120 школьников из 7 школ города: №25, №26, №30, №34, №36, №40 и №47.</p><span class="im-h">Направления лагеря</span><ul><li>Сварочное дело — первые швы под присмотром мастеров</li><li>Электромонтажные работы — сборка учебных схем</li><li>IT-технологии — мобилография и 3D-моделирование</li><li>Строительные компетенции — кладка и отделка</li></ul><p>Каждый день лагеря — это практика в мастерских колледжа, знакомство с профессией «руками» и работа с наставниками из числа преподавателей и студентов-призёров чемпионатов.</p><p class="im-note">SKILLS CAMP — часть профориентационной программы колледжа в рамках Года рабочих профессий.</p>`],
      kz: ["SKILLS CAMP: 120 оқушыға арналған кәсіптік лагерь", `<p><b>2025 жылғы 26 мамыр.</b> Колледж базасында жазғы кәсіптік лагерь өз жұмысын бастады: қаланың №25, №26, №30, №34, №36, №40 және №47 мектептерінен 120 оқушы қамтылды.</p><span class="im-h">Лагерь бағыттары</span><ul><li>Дәнекерлеу ісі — шеберлердің қарауымен алғашқы жіктер</li><li>Электр монтаждау жұмыстары — оқу схемаларын құрастыру</li><li>IT-технология — мобилография және 3D модельдеу</li><li>Құрылыс құзыреттіліктері — қалау және әрлеу</li></ul><p>Лагерьдің әр күні — колледж шеберханаларындағы практика, мамандықпен «қолмен» танысу және оқытушылар мен чемпионат жүлдегерлері-студенттердің тәлімгерлігі.</p><p class="im-note">SKILLS CAMP — Жұмысшы мамандықтар жылы аясындағы колледждің кәсіптік бағдар беру бағдарламасының бөлігі.</p>`],
      en: ["SKILLS CAMP: a trade camp for 120 schoolchildren", `<p><b>May 26, 2025.</b> The college launched the SKILLS CAMP summer trade camp for 120 pupils from 7 city schools: No. 25, 26, 30, 34, 36, 40 and 47.</p><span class="im-h">Camp tracks</span><ul><li>Welding — first seams under the masters' supervision</li><li>Electrical installation — assembling training circuits</li><li>IT — mobile photography and 3D modelling</li><li>Construction skills — bricklaying and finishing</li></ul><p>Every camp day is hands-on practice in the college workshops, a first feel for the trade, and mentoring by teachers and championship-winning students.</p><p class="im-note">SKILLS CAMP is part of the college's career-guidance programme for the Year of Working Professions.</p>`]
    },
    "Новость · WorldSkills золото": {
      ru: ["WorldSkills Aktobe–2025: золото в сварке", `<p><b>21 мая 2025.</b> На региональном чемпионате профессионального мастерства «WorldSkills Aktobe – 2025», прошедшем 19–21 мая, студент колледжа Ербөлек Расбек Танабергенұлы показал высочайшее мастерство и завоевал <b>золотую медаль</b> в компетенции «Сварочные технологии».</p><span class="im-h">Другие медали колледжа на чемпионате</span><ul><li>Золото — Сергей Шинкоренко (штукатурные работы), Ислам Адилханов (сетевое и системное администрирование), Карим Черниязов (облицовка плиткой), Жігер Тілектес (кирпичная кладка), Диас Ғайнеденов (сухое строительство)</li><li>Бронза — Александр Доценко (кибербезопасность), Амирлан Шаукенов (веб-технологии)</li></ul><p>Компанию победителю в сварке на пьедестале составил Апетов Канат Петржанович. Поздравляем чемпионов и их наставников!</p><p class="im-note">Фото с чемпионата — в фотоархиве раздела «Жизнь колледжа».</p>`],
      kz: ["WorldSkills Aktobe–2025: дәнекерлеуден алтын медаль", `<p><b>2025 жылғы 21 мамыр.</b> 2025 жылғы 19-21 мамыр аралығында өткен «WorldSkills Aktobe – 2025» аймақтық кәсіби шеберлік чемпионатында «Дәнекерлеу технологиясы» құзыреттілігі бойынша Ербөлек Расбек Танабергенұлы өзінің жоғары кәсіби шеберлігін көрсетіп <b>АЛТЫН МЕДАЛЬ</b> иегері атанды. Компатриот: Апетов Канат Петржанович. ҚҰТТЫҚТАЙМЫЗ!</p><span class="im-h">Чемпионаттағы колледждің басқа медальдары</span><ul><li>Алтын — Шинкоренко Сергей (сылау жұмыстары), Адилханов Ислам (желілік және жүйелік әкімшілендіру), Черниязов Карим (плитка төсеу), Тілектес Жігер (кірпіш қалау), Ғайнеденов Диас (құрғақ құрылыс)</li><li>Қола — Доценко Александр (киберқауіпсіздік), Шаукенов Амирлан (веб-технологиялар)</li></ul><p class="im-note">Чемпионат фотолары — «Колледж өмірі» бөлімінің фотоархивінде.</p>`],
      en: ["WorldSkills Aktobe–2025: gold in welding", `<p><b>May 21, 2025.</b> At the WorldSkills Aktobe–2025 regional skills championship held on May 19–21, college student Rasbek Tanabergenuly Yerbolek demonstrated outstanding craftsmanship and won the <b>gold medal</b> in Welding Technologies.</p><span class="im-h">The college's other medals</span><ul><li>Gold — Sergey Shinkorenko (plastering), Islam Adilkhanov (network & system administration), Karim Cherniyazov (wall & floor tiling), Zhiger Tilektes (bricklaying), Dias Gainedenov (dry construction)</li><li>Bronze — Alexander Dotsenko (cyber security), Amirlan Shaukenov (web technologies)</li></ul><p>Kanat Petrzhanovich Apetov joined the welding winner on the podium. Congratulations to the champions and their mentors!</p><p class="im-note">Championship photos are in the photo archive of the College Life section.</p>`]
    },
    "Новость · Вакантные места": {
      ru: ["Вакантные места на госзаказ: допприём", `<p><b>20 мая 2025.</b> Колледж объявил приём на вакантные места по государственному образовательному заказу — всего <b>81 место</b>, в том числе на IT-специальности.</p><span class="im-h">IT-направления</span><ul><li>06130100 «Программное обеспечение» (по видам)</li><li>4S06130103 «Разработчик программного обеспечения»: 2 курс — 1 место (на базе 9 кл.) и 2 места (на базе 11 кл.), 3 курс — 2 места (на базе 11 кл.), язык обучения — государственный</li></ul><p>Обучение на дневном отделении — бесплатное, студентам госзаказа выплачивается стипендия и предоставляется питание.</p><p><a class="im-dl" href="assets/real/docs/doc5.pdf" download>Скачать: вакантные места на 20.05.2025 (PDF)</a></p><p class="im-note">Приём идёт до заполнения мест. Уточнить наличие — в приёмной комиссии: +7 702 144 64 04.</p>`],
      kz: ["Мемлекеттік білім беру тапсырысына вакантты орындар", `<p><b>2025 жылғы 20 мамыр.</b> Колледж мемлекеттік білім беру тапсырысы бойынша вакантты орындарға қабылдау жариялады — барлығы <b>81 орын</b>, оның ішінде IT-мамандықтар.</p><span class="im-h">IT-бағыттары</span><ul><li>06130100 «Бағдарламалық қамтамасыз ету» (түрлері бойынша)</li><li>4S06130103 «Бағдарламалық қамтамасыз ету әзірлеушісі»: 2-курс — 1 орын (9 сынып негізінде) және 2 орын (11 сынып негізінде), 3-курс — 2 орын (11 сынып негізінде), оқыту тілі — мемлекеттік</li></ul><p>Күндізгі бөлімде оқу — тегін, мемтапсырыс студенттеріне шәкіртақы төленеді және тамақтандыру беріледі.</p><p><a class="im-dl" href="assets/real/docs/doc5.pdf" download>Жүктеу: 20.05.2025 ж. вакантты орындар (PDF)</a></p><p class="im-note">Қабылдау орындар толғанша жүреді. Нақтылау — қабылдау комиссиясында: +7 702 144 64 04.</p>`],
      en: ["Vacant state-grant places: additional admission", `<p><b>May 20, 2025.</b> The college announced admission to vacant state education-order places — <b>81 places</b> in total, including IT specialties.</p><span class="im-h">IT tracks</span><ul><li>06130100 Software development (by type)</li><li>4S06130103 Software developer: year 2 — 1 place (after grade 9) and 2 places (after grade 11), year 3 — 2 places (after grade 11), language of instruction — Kazakh</li></ul><p>Full-time study is free; state-order students receive a stipend and meals.</p><p><a class="im-dl" href="assets/real/docs/doc5.pdf" download>Download: vacant places as of 20.05.2025 (PDF)</a></p><p class="im-note">Admission continues until places are filled. Check availability with the admissions office: +7 702 144 64 04.</p>`]
    },
    "Новость · DalaSKILLS": {
      ru: ["DalaSKILLS-2025: бронза в кирпичной кладке", `<p><b>30 апреля 2025.</b> На межрегиональном чемпионате мастерства «DalaSKILLS – 2025», прошедшем 28–30 апреля в Мангистау, студент колледжа Тілектес Жігер выступил в компетенции «Кирпичная кладка» и завоевал <b>почётное 3-е место</b>.</p><p>Поздравляем нашего призёра и его наставника Жолдасбай Махамбетұлы с достойным выступлением! Уже в мае Жігер подтвердил класс, взяв золото в кирпичной кладке на WorldSkills Aktobe–2025.</p><p class="im-note">Фото с чемпионата — в фотоархиве раздела «Жизнь колледжа».</p>`],
      kz: ["DalaSKILLS-2025: кірпіш қалаудан жүлделі 3-орын", `<p><b>2025 жылғы 30 сәуір.</b> 2025 жылғы 28-30 сәуір аралығында Маңғыстауда өткен «DalaSKILLS – 2025» өңіраралық шеберлік чемпионатына «Кірпіш қалау» құзыреттілігі бойынша колледж білім алушысы Тілектес Жігер қатысып, <b>ЖҮЛДЕЛІ 3-ОРЫН</b> иегері атанды!</p><p>Жеңімпазымызды және жетекшісі Жолдасбай Махамбетұлын жеңістерімен құттықтаймыз! Мамыр айында Жігер WorldSkills Aktobe–2025 чемпионатында кірпіш қалаудан алтын алып, шеберлігін растады.</p><p class="im-note">Чемпионат фотолары — «Колледж өмірі» бөлімінің фотоархивінде.</p>`],
      en: ["DalaSKILLS-2025: bronze in bricklaying", `<p><b>April 30, 2025.</b> At the DalaSKILLS–2025 interregional skills championship held April 28–30 in Mangystau, college student Zhiger Tilektes competed in Bricklaying and took <b>3rd place</b>.</p><p>Congratulations to our medallist and his mentor Zholdasbay Makhambetuly! In May, Zhiger confirmed his class by winning gold in bricklaying at WorldSkills Aktobe–2025.</p><p class="im-note">Championship photos are in the photo archive of the College Life section.</p>`]
    },
    "Новость · Рика ТВ": {
      ru: ["Интервью на Рика ТВ: Год рабочих профессий", `<p><b>30 апреля 2025.</b> На телеканале «Рика ТВ» прошла запись интервью, посвящённого реализации проектов в рамках Года рабочих профессий.</p><p>В студии выступили Айнур Баймуратова, начальник отдела развития человеческого капитала Региональной палаты предпринимателей, и Марина Курманова, заместитель директора по методической работе строительно-технического колледжа.</p><p>Обсудили важные аспекты действия меморандума между Палатой предпринимателей, колледжем и социальными партнёрами: дуальное обучение, практику на предприятиях и трудоустройство выпускников.</p><p class="im-note">Полный выпуск программы «Из первых рук» вышел в пятницу, 2 мая, в 13:30 на Рика ТВ.</p>`],
      kz: ["Рика ТВ: Жұмысшы мамандықтар жылы туралы интервью", `<p><b>2025 жылғы 30 сәуір.</b> «Рика ТВ» телеарнасында Жұмысшы мамандықтар жылы аясындағы жобаларды жүзеге асыруға арналған сұхбат жазылды.</p><p>Студияда Өңірлік кәсіпкерлер палатасының адами капиталды дамыту бөлімінің бастығы Айнур Баймуратова және құрылыс-техникалық колледж директорының әдістемелік жұмыс жөніндегі орынбасары Марина Курманова сөз сөйледі.</p><p>Кәсіпкерлер палатасы, колледж және әлеуметтік серіктестер арасындағы меморандумның маңызды аспектілері талқыланды: дуальды оқыту, кәсіпорындардағы практика және түлектерді жұмысқа орналастыру.</p><p class="im-note">«Из первых рук» бағдарламасының толық шығарылымы 2 мамыр, жұма күні сағат 13:30-да Рика ТВ-да шықты.</p>`],
      en: ["Rika TV interview: Year of Working Professions", `<p><b>April 30, 2025.</b> Rika TV recorded an interview on projects implemented within the Year of Working Professions.</p><p>The guests were Ainur Baimuratova, head of human-capital development at the Regional Chamber of Entrepreneurs, and Marina Kurmanova, deputy director for methodological work at the construction & technical college.</p><p>They discussed key aspects of the memorandum between the Chamber of Entrepreneurs, the college and social partners: dual education, enterprise practice and graduate employment.</p><p class="im-note">The full episode of the Iz pervykh ruk show aired on Friday, May 2 at 13:30 on Rika TV.</p>`]
    },
    "Новость · День открытых дверей": {
      ru: ["День открытых дверей «Таңдауың – тағдырың»", `<p><b>16 апреля 2025.</b> В рамках дня открытых дверей «Таңдауың – тағдырың: Мамандыққа бір қадам» («Твой выбор — твоя судьба: один шаг к профессии») состоялась встреча школьников с представителями колледжа.</p><p>Цель — помочь школьникам осознанно выбрать будущий профессиональный путь: дать ориентиры в выборе специальности и всестороннюю информацию о колледжах.</p><p>В ходе встречи специалисты рассказали о направлениях колледжа, образовательных программах и будущих профессиях, а также ответили на вопросы абитуриентов.</p><p class="im-note">Профориентационная работа продолжается: следите за анонсами в разделе «Новости» и в Instagram колледжа.</p>`],
      kz: ["«Таңдауың – тағдырың» ашық есік күні", `<p><b>2025 жылғы 16 сәуір.</b> Оқушыларға мамандық таңдауда бағыт-бағдар беру, колледждер туралы жан-жақты ақпарат ұсыну арқылы болашақ кәсіби жолын саналы түрде таңдауға көмектесу мақсатында «Таңдауың – тағдырың: Мамандыққа бір қадам» атты ашық есік күні аясында оқушылар колледж өкілдерімен кездесу өткізілді.</p><p>Кездесу барысында оқу орындарының мамандары өз колледждерінің бағыттары, білім беру бағдарламалары және болашақ мамандықтар туралы ақпарат беріп, талапкерлердің сұрақтарына жауап берді.</p><p class="im-note">Кәсіптік бағдар беру жұмысы жалғасуда: хабарландыруларды «Жаңалықтар» бөлімінен және колледждің Instagram-парақшасынан қадағалаңыз.</p>`],
      en: ["Open doors day: Your choice is your destiny", `<p><b>April 16, 2025.</b> Within the open-doors day "Tandauyn – tagdyryn: One step to a profession", schoolchildren met representatives of the college.</p><p>The goal was to help pupils choose their future career path consciously — with guidance on specialties and full information about colleges.</p><p>During the meeting, specialists presented the college's tracks, study programmes and future professions, and answered applicants' questions.</p><p class="im-note">Career guidance continues: follow announcements in the News section and on the college's Instagram.</p>`]
    },
    "Все новости и события": {
      ru: ["Все новости и события", `<p>Лента колледжа объединяет события, достижения WorldSkills и объявления приёмной комиссии.</p><span class="im-h">Категории</span><ul><li>События — мастерские, дни открытых дверей, студенческая жизнь</li><li>WorldSkills — чемпионаты и победы студентов</li><li>Приём — гранты, сроки и дополнительный набор</li></ul><p class="im-note">Используйте фильтр категорий в разделе «Новости», чтобы найти нужное.</p>`],
      kz: ["Барлық жаңалықтар мен оқиғалар", `<p>Колледж таспасы оқиғаларды, WorldSkills жетістіктерін және қабылдау комиссиясының хабарландыруларын біріктіреді.</p><span class="im-h">Санаттары</span><ul><li>Оқиғалар — шеберханалар, ашық есік күндері, студенттік өмір</li><li>WorldSkills — чемпионаттар мен студенттер жеңістері</li><li>Қабылдау — гранттар, мерзімдер және қосымша набор</li></ul><p class="im-note">Қажеттісін табу үшін «Жаңалықтар» бөліміндегі санат сүзгісін пайдаланыңыз.</p>`],
      en: ["All news & events", `<p>The college feed combines events, WorldSkills achievements and admissions announcements.</p><span class="im-h">Categories</span><ul><li>Events — workshops, open days, student life</li><li>WorldSkills — championships and student wins</li><li>Admissions — grants, deadlines and additional intake</li></ul><p class="im-note">Use the category filter in the News section to find what you need.</p>`]
    },
    "Политика конфиденциальности": {
      ru: ["Политика конфиденциальности", `<p>Сайт обрабатывает только те данные, которые вы добровольно оставляете в заявке: имя, телефон и выбранную специальность.</p><span class="im-h">Принципы</span><ul><li>Данные используются только для связи приёмной комиссии</li><li>Не передаются третьим лицам и не публикуются</li><li>Хранятся не дольше, чем требуется для обработки заявки</li></ul><p class="im-note">По вопросам обработки данных обращайтесь в приёмную комиссию колледжа.</p>`],
      kz: ["Құпиялылық саясаты", `<p>Сайт тек өтінімде ерікті түрде қалдырған деректерді өңдейді: аты, телефоны және таңдалған мамандық.</p><span class="im-h">Қағидалары</span><ul><li>Деректер тек қабылдау комиссиясының байланысы үшін пайдаланылады</li><li>Үшінші тұлғаларға берілмейді және жарияланбайды</li><li>Өтінімді өңдеуге қажетті мерзімнен артық сақталмайды</li></ul><p class="im-note">Деректерді өңдеу мәселелері бойынша колледждің қабылдау комиссиясына жүгініңіз.</p>`],
      en: ["Privacy policy", `<p>The site processes only the data you voluntarily leave in a request: name, phone and chosen programme.</p><span class="im-h">Principles</span><ul><li>Data is used solely for admissions contact</li><li>Not shared with third parties or published</li><li>Kept no longer than needed to process the request</li></ul><p class="im-note">For data-processing questions, contact the college admissions office.</p>`]
    },
    "Публичная оферта": {
      ru: ["Публичная оферта", `<p>Оставляя заявку на сайте, вы соглашаетесь на обработку контактных данных для связи по вопросам поступления.</p><span class="im-h">Условия</span><ul><li>Заявка не является договором об оказании платных услуг</li><li>Условия обучения и оплаты определяются приказом о зачислении</li><li>Вы можете отозвать согласие, обратившись в приёмную комиссию</li></ul><p class="im-note">Полные условия приёма публикуются в правилах приёма колледжа.</p>`],
      kz: ["Жария оферта", `<p>Сайтта өтінім қалдыра отырып, сіз түсу мәселелері бойынша байланысу үшін контактілі деректерді өңдеуге келісесіз.</p><span class="im-h">Шарттары</span><ul><li>Өтінім ақылы қызмет көрсету шарты болып табылмайды</li><li>Оқу мен төлем шарттары қабылдау туралы бұйрықпен айқындалады</li><li>Қабылдау комиссиясына жүгіну арқылы келісімді кері қайтара аласыз</li></ul><p class="im-note">Қабылдаудың толық шарттары колледждің қабылдау қағидаларында жарияланады.</p>`],
      en: ["Public offer", `<p>By leaving a request on the site you agree to the processing of contact data for admissions communication.</p><span class="im-h">Terms</span><ul><li>A request is not a paid-services contract</li><li>Study and payment terms are set by the enrolment order</li><li>You may withdraw consent by contacting the admissions office</li></ul><p class="im-note">Full admission terms are published in the college admission rules.</p>`]
    }
  };
  function renderDoc(name) {
    const entry = DOCS[name];
    const title = $("#infoModalTitle"), body = $("#infoModalBody");
    if (!entry) {
      if (title) title.textContent = name || "Материал";
      if (body) body.innerHTML = `<p>${lang === "kz" ? "Бұл бөлім колледждің электрондық порталында қолжетімді. Өтінім қалдырыңыз немесе қабылдау комиссиясына хабарласыңыз." : lang === "en" ? "This section is available on the college e-portal. Leave a request or contact admissions." : "Этот раздел доступен в электронном портале колледжа. Оставьте заявку или свяжитесь с приёмной комиссией."}</p>`;
      return;
    }
    const arr = entry[lang] || entry.ru;
    if (title) title.textContent = arr[0];
    if (body) { body.innerHTML = arr[1]; body.scrollTop = 0; }
  }

  /* ---------- Focus trap helper ---------- */
  function trapTab(e, root) {
    const f = $$('a[href], button:not([disabled]), input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])', root).filter(el => !el.hidden && el.getClientRects().length);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ---------- Info modal for data-doc links ---------- */
  (function () {
    const modal = $("#infoModal"); if (!modal) return;
    let lastFocus = null;
    function open(name) {
      lastFocus = document.activeElement;
      currentDoc = name;
      renderDoc(name);
      modal.hidden = false;
      document.documentElement.style.overflow = "hidden";
      const c = $(".im-close", modal); if (c) c.focus();
    }
    function close() {
      if (modal.hidden) return;
      modal.hidden = true;
      currentDoc = null;
      document.documentElement.style.overflow = "";
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    $$("a[data-doc]").forEach(a => a.addEventListener("click", e => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
      e.preventDefault();
      open(a.getAttribute("data-doc"));
    }));
    $$("[data-close]", modal).forEach(el => el.addEventListener("click", close));
    document.addEventListener("open-doc", e => open(e.detail));
    document.addEventListener("keydown", e => {
      if (modal.hidden) return;
      if (e.key === "Escape") close();
      else if (e.key === "Tab") trapTab(e, $(".info-modal-card", modal));
    });
  })();

  /* ---------- Lightbox (gallery + production media) ---------- */
  (function () {
    const lb = $("#lightbox"); if (!lb) return;
    const img = $("#lbImage"), cap = $("#lbCaption"), count = $("#lbCount");
    const prev = $("#lbPrev"), next = $("#lbNext");
    let lastFocus = null, list = [], idx = 0;
    const gallery = $$(".insta-item").map(a => { const im = $("img", a); return im ? { src: im.getAttribute("src"), caption: im.alt || "" } : null; }).filter(Boolean);
    const prod = $$(".prod-media figure").map(f => { const im = $("img", f); return im ? { src: im.getAttribute("src"), fig: f } : null; }).filter(Boolean);
    const LB_L = {
      ru: { prev: "Предыдущее фото", next: "Следующее фото", label: "Просмотр изображения", close: "Закрыть" },
      kz: { prev: "Алдыңғы фото", next: "Келесі фото", label: "Суретті қарау", close: "Жабу" },
      en: { prev: "Previous photo", next: "Next photo", label: "Image viewer", close: "Close" }
    };
    function syncLabels() {
      const t = LB_L[lang] || LB_L.ru;
      prev.setAttribute("aria-label", t.prev); next.setAttribute("aria-label", t.next);
      lb.setAttribute("aria-label", t.label); $(".lb-close", lb).setAttribute("aria-label", t.close);
    }
    syncLabels();
    window.addEventListener("langchange", syncLabels);
    function show(i) {
      idx = (i + list.length) % list.length;
      const it = list[idx];
      img.src = it.src;
      const caption = it.fig ? ($("figcaption", it.fig) || {}).textContent || "" : it.caption;
      img.alt = caption; cap.textContent = caption;
      count.textContent = (idx + 1) + " / " + list.length;
      const single = list.length < 2;
      prev.hidden = single; next.hidden = single; count.hidden = single;
      [idx + 1, idx - 1].forEach(j => { const n = list[(j + list.length) % list.length]; if (n) { const p = new Image(); p.src = n.src; } });
    }
    function open(items, i) {
      lastFocus = document.activeElement;
      list = items;
      lb.hidden = false;
      document.documentElement.style.overflow = "hidden";
      show(i);
      const c = $(".lb-close", lb); if (c) c.focus();
    }
    function close() {
      if (lb.hidden) return;
      lb.hidden = true; img.src = "";
      document.documentElement.style.overflow = document.querySelector("#archiveModal:not([hidden]), #tourModal:not([hidden]), #infoModal:not([hidden])") ? "hidden" : "";
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    prev.addEventListener("click", () => show(idx - 1));
    next.addEventListener("click", () => show(idx + 1));
    $$(".insta-item").forEach((a, i) => a.addEventListener("click", e => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
      e.preventDefault();
      open(gallery, i);
    }));
    $$(".prod-media figure").forEach((f, i) => {
      f.setAttribute("role", "button"); f.tabIndex = 0;
      const act = e => {
        if (e.type === "keydown" && e.key !== "Enter" && e.key !== " ") return;
        e.preventDefault();
        open(prod, i);
      };
      f.addEventListener("click", act);
      f.addEventListener("keydown", act);
    });
    $$("[data-close]", lb).forEach(el => el.addEventListener("click", close));
    document.addEventListener("open-lightbox", e => {
      const d = e.detail || {};
      if (Array.isArray(d.items) && d.items.length) open(d.items, d.index || 0);
    });
    document.addEventListener("keydown", e => {
      if (lb.hidden) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") show(idx - 1);
      else if (e.key === "ArrowRight") show(idx + 1);
      else if (e.key === "Tab") trapTab(e, lb);
    });
    let tx = null;
    lb.addEventListener("touchstart", e => { tx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", e => {
      if (tx === null) return;
      const dx = e.changedTouches[0].clientX - tx; tx = null;
      if (Math.abs(dx) > 40 && list.length > 1) show(idx + (dx < 0 ? 1 : -1));
    }, { passive: true });
  })();

  /* ---------- Applicant document checklist ---------- */
  (function () {
    const root = $("#docChecklist"); if (!root) return;
    const boxes = $$("input[data-cl]", root);
    const bar = $("#clBar"), count = $("#clCount"), reset = $("#clReset");
    const KEY = "aqtk_checklist";
    let state = [];
    try { state = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { state = []; }
    const LABELS = {
      ru: n => n === boxes.length ? "Все документы собраны!" : "Собрано " + n + " из " + boxes.length,
      kz: n => n === boxes.length ? "Барлық құжаттар жиналды!" : n + " / " + boxes.length + " жиналды",
      en: n => n === boxes.length ? "All documents ready!" : n + " of " + boxes.length + " collected"
    };
    function sync() {
      const n = boxes.filter(b => b.checked).length;
      bar.style.width = (n / boxes.length * 100) + "%";
      count.textContent = (LABELS[lang] || LABELS.ru)(n);
      count.classList.toggle("done", n === boxes.length);
    }
    boxes.forEach((b, i) => {
      b.checked = !!state[i];
      b.addEventListener("change", () => { state[i] = b.checked; try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} sync(); });
    });
    reset.addEventListener("click", () => { state = []; boxes.forEach(b => { b.checked = false; }); try { localStorage.removeItem(KEY); } catch (e) {} sync(); });
    window.addEventListener("langchange", sync);
    sync();
  })();

  /* ---------- Command palette (Ctrl+K) ---------- */
  (function () {
    const pal = $("#cmdk"); if (!pal) return;
    const input = $("#cmdkInput"), results = $("#cmdkResults"), btn = $("#searchBtn");
    let items = [], view = [], active = 0, lastFocus = null;
    const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
    const GROUPS = {
      ru: { sections: "Разделы", specs: "Специальности", docs: "Документы", news: "Новости", actions: "Действия" },
      kz: { sections: "Бөлімдер", specs: "Мамандықтар", docs: "Құжаттар", news: "Жаңалықтар", actions: "Әрекеттер" },
      en: { sections: "Sections", specs: "Specialties", docs: "Documents", news: "News", actions: "Actions" }
    };
    const T = {
      ru: { ph: "Поиск: разделы, специальности, документы…", empty: "Ничего не найдено", apply: "Подать заявку", call: "Позвонить в приёмную комиссию", wa: "Написать в WhatsApp", ig: "Открыть Instagram", lang: "Сменить язык (RU → KZ → EN)", motion: "Анимации: вкл / выкл", tour: "Виртуальный тур по колледжу", archive: "Фотоархив · 2025" },
      kz: { ph: "Іздеу: бөлімдер, мамандықтар, құжаттар…", empty: "Ештеңе табылмады", apply: "Өтінім беру", call: "Қабылдау комиссиясына қоңырау шалу", wa: "WhatsApp-қа жазу", ig: "Instagram-ды ашу", lang: "Тілді ауыстыру (RU → KZ → EN)", motion: "Анимациялар: қосу / өшіру", tour: "Колледж бойынша виртуалды тур", archive: "Фотоархив · 2025" },
      en: { ph: "Search: sections, specialties, documents…", empty: "Nothing found", apply: "Apply now", call: "Call admissions", wa: "Message on WhatsApp", ig: "Open Instagram", lang: "Switch language (RU → KZ → EN)", motion: "Animations: on / off", tour: "Virtual college tour", archive: "Photo archive · 2025" }
    };
    function flash(el) { el.classList.remove("cmdk-flash"); void el.offsetWidth; el.classList.add("cmdk-flash"); setTimeout(() => el.classList.remove("cmdk-flash"), 1500); }
    function gotoEl(el) { close(); el.scrollIntoView({ behavior: reduce || motionOff ? "auto" : "smooth", block: "start" }); flash(el); }
    function build() {
      const t = T[lang] || T.ru;
      items = [];
      $$(".section[id]").forEach(s => { const h = $("h2", s); if (!h) return; items.push({ g: "sections", title: h.textContent.trim(), kw: s.id, icon: "i-arrow", run: () => gotoEl(s) }); });
      $$(".spec").forEach(sp => {
        const b = $(".spec-title b", sp); if (!b) return;
        const code = $(".spec-code", sp);
        items.push({ g: "specs", title: b.textContent.trim(), kw: (code ? code.textContent : "") + " " + b.textContent, icon: "i-cap", run: () => { gotoEl(sp); const head = $(".spec-head", sp); if (head && head.getAttribute("aria-expanded") === "false") head.click(); } });
      });
      Object.keys(DOCS).forEach(k => { const arr = DOCS[k][lang] || DOCS[k].ru; items.push({ g: "docs", title: arr[0], kw: k + " " + arr[0], icon: "i-file", run: () => { close(); document.dispatchEvent(new CustomEvent("open-doc", { detail: k })); } }); });
      $$(".news-card").forEach(c => { const h = $("h3", c); if (!h) return; items.push({ g: "news", title: h.textContent.trim(), kw: h.textContent, icon: "i-zap", run: () => gotoEl(c) }); });
      items.push({ g: "actions", title: t.apply, kw: "заявка поступление admission форма өтінім", icon: "i-send", run: () => { gotoEl($("#admission")); setTimeout(() => { const f = $("#fName"); if (f) f.focus({ preventScroll: true }); }, reduce || motionOff ? 0 : 650); } });
      items.push({ g: "actions", title: t.call, kw: "телефон звонок phone қоңырау", icon: "i-phone", run: () => { close(); location.href = "tel:+77021446404"; } });
      items.push({ g: "actions", title: t.wa, kw: "whatsapp ватсап", icon: "i-wa", run: () => { close(); window.open("https://wa.me/77021446404", "_blank", "noopener"); } });
      items.push({ g: "actions", title: t.ig, kw: "instagram инстаграм", icon: "i-ig", run: () => { close(); window.open("https://www.instagram.com/aqtk_aqtobe/", "_blank", "noopener"); } });
      items.push({ g: "actions", title: t.lang, kw: "язык тіл language қазақша english", icon: "i-globe", run: () => { close(); setLang(lang === "ru" ? "kz" : lang === "kz" ? "en" : "ru"); } });
      items.push({ g: "actions", title: t.motion, kw: "анимация motion қозғалыс анимациялар", icon: "i-zap", run: () => { close(); const mt = $("#motionToggle"); if (mt) mt.click(); } });
      items.push({ g: "actions", title: t.tour, kw: "тур tour виртуальный экскурсия виртуалды", icon: "i-expand", run: () => { close(); const b = $("#tourBtn"); if (b) b.click(); } });
      items.push({ g: "actions", title: t.archive, kw: "фотоархив архив фото archive галерея фото", icon: "i-grid", run: () => { close(); const b = $("#archiveBtn"); if (b) b.click(); } });
      input.placeholder = t.ph;
    }
    function render(q) {
      q = q.trim().toLowerCase();
      const words = q.split(/\s+/).filter(Boolean);
      let matches;
      if (!words.length) {
        matches = items.filter(i => i.g === "actions").concat(items.filter(i => i.g === "sections").slice(0, 8));
      } else {
        matches = items.map(i => {
          const title = i.title.toLowerCase(), kw = (i.kw || "").toLowerCase();
          let score = 0;
          for (const w of words) {
            if (title.startsWith(w)) score += 3;
            else if (title.includes(w)) score += 2;
            else if (kw.includes(w)) score += 1;
            else return null;
          }
          return { i, score };
        }).filter(Boolean).sort((a, b) => b.score - a.score).slice(0, 14).map(m => m.i);
      }
      view = matches; active = 0;
      const g = GROUPS[lang] || GROUPS.ru;
      if (!matches.length) { results.innerHTML = `<div class="cmdk-empty">${esc((T[lang] || T.ru).empty)}</div>`; return; }
      let html = "", lastG = "";
      matches.forEach((m, n) => {
        if (m.g !== lastG) { html += `<div class="cmdk-group">${esc(g[m.g])}</div>`; lastG = m.g; }
        html += `<button type="button" class="cmdk-item${n === 0 ? " active" : ""}" data-i="${n}" role="option" aria-selected="${n === 0}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><use href="#${m.icon}"/></svg><span class="cmdk-t">${esc(m.title)}</span><span class="cmdk-hint">↵</span></button>`;
      });
      results.innerHTML = html;
    }
    function setActive(n) {
      if (!view.length) return;
      active = (n + view.length) % view.length;
      $$(".cmdk-item", results).forEach((el, i) => { el.classList.toggle("active", i === active); el.setAttribute("aria-selected", i === active ? "true" : "false"); });
      const el = $(`.cmdk-item[data-i="${active}"]`, results);
      if (el) el.scrollIntoView({ block: "nearest" });
    }
    function open() {
      lastFocus = document.activeElement;
      build();
      pal.hidden = false;
      document.documentElement.style.overflow = "hidden";
      input.value = ""; render("");
      input.focus();
    }
    function close() {
      if (pal.hidden) return;
      pal.hidden = true;
      document.documentElement.style.overflow = "";
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    btn.addEventListener("click", open);
    $$("[data-close]", pal).forEach(el => el.addEventListener("click", close));
    input.addEventListener("input", () => render(input.value));
    results.addEventListener("click", e => { const b = e.target.closest(".cmdk-item"); if (b) view[+b.dataset.i].run(); });
    results.addEventListener("mousemove", e => { const b = e.target.closest(".cmdk-item"); if (b && +b.dataset.i !== active) setActive(+b.dataset.i); });
    document.addEventListener("keydown", e => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K" || e.key === "л" || e.key === "Л")) { e.preventDefault(); pal.hidden ? open() : close(); return; }
      if (pal.hidden) return;
      if (e.key === "Escape") { e.preventDefault(); close(); }
      else if (e.key === "ArrowDown") { e.preventDefault(); setActive(active + 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setActive(active - 1); }
      else if (e.key === "Enter") { e.preventDefault(); if (view[active]) view[active].run(); }
      else if (e.key === "Tab") trapTab(e, $(".cmdk-card", pal));
    });
    window.addEventListener("langchange", () => { if (!pal.hidden) { build(); render(input.value); } });
  })();

  /* ---------- Map scheme / live toggle ---------- */
  (function () {
    const sb = $("#mapSchemeBtn"), lb = $("#mapLiveBtn"), schema = $("#mapSchema"), live = $("#mapLive"), frame = $("#mapFrame");
    if (!sb || !lb || !schema || !live || !frame) return;
    function show(which) {
      const isLive = which === "live";
      schema.hidden = isLive; live.hidden = !isLive;
      sb.classList.toggle("active", !isLive); lb.classList.toggle("active", isLive);
      sb.setAttribute("aria-pressed", String(!isLive)); lb.setAttribute("aria-pressed", String(isLive));
      if (isLive && !frame.getAttribute("src") && frame.dataset.src) frame.src = frame.dataset.src;
    }
    sb.addEventListener("click", () => show("schema"));
    lb.addEventListener("click", () => show("live"));
  })();

  /* ---------- Virtual tour ---------- */
  (function () {
    const modal = $("#tourModal"); if (!modal) return;
    const img = $("#tourImage"), title = $("#tourTitle"), desc = $("#tourDesc"), fact = $("#tourFact"), count = $("#tourCount"), dots = $("#tourDots");
    const prev = $("#tourPrev"), next = $("#tourNext"), play = $("#tourPlay"), btn = $("#tourBtn");
    const STOPS = [
      { img: "assets/real/news2.webp",
        ru: { t: "Главный корпус", d: "Главный корпус колледжа на улице Ватутина в Актобе. Здесь находятся приёмная комиссия, учебные кабинеты и администрация — с этого здания начинается путь каждого студента.", f: "Актобе · ул. Ватутина, 1" },
        kz: { t: "Бас корпус", d: "Ақтөбе қаласы, Ватутин көшесіндегі колледждің бас корпусы. Мұнда қабылдау комиссиясы, оқу кабинеттері мен әкімшілік орналасқан — әр студенттің жолы осы ғимараттан басталады.", f: "Ақтөбе · Ватутин к-сі, 1" },
        en: { t: "Main building", d: "The college main building on Vatutin Street in Aktobe. It houses the admissions office, classrooms and administration — every student's journey starts here.", f: "Aktobe · 1 Vatutin St" } },
      { img: "assets/welding.webp",
        ru: { t: "Сварочная мастерская", d: "Мастерская отделения сварки и строительства: посты TIG/MIG, вытяжка и средства индивидуальной защиты. Студенты отрабатывают компетенции WorldSkills «Сварочные технологии» на производственном оборудовании.", f: "Стандарт WorldSkills · 6 постов" },
        kz: { t: "Дәнекерлеу шеберханасы", d: "Дәнекерлеу және құрылыс бөлімінің шеберханасы: TIG/MIG посттары, сорғыш және жеке қорғаныс құралдары. Студенттер WorldSkills «Дәнекерлеу технологиясы» құзыреттілігін өндірістік жабдықта шыңдайды.", f: "WorldSkills стандарты · 6 пост" },
        en: { t: "Welding workshop", d: "The welding department workshop: TIG/MIG stations, extraction and personal protective gear. Students train WorldSkills Welding Technologies competences on production-grade equipment.", f: "WorldSkills standard · 6 stations" } },
      { img: "assets/real/news28.webp",
        ru: { t: "IT-лаборатория", d: "Компьютерные классы специальностей «Программное обеспечение» и «Вычислительная техника и информационные сети». Здесь пишут код, настраивают сети и готовятся к чемпионатам по сетевому администрированию.", f: "2 IT-специальности · госзаказ" },
        kz: { t: "IT-зертханасы", d: "«Бағдарламалық қамтамасыз ету» және «Есептеу техникасы және ақпараттық желілер» мамандықтарының компьютерлік сыныптары. Мұнда код жазады, желілерді баптайды және желілік әкімшілендіру чемпионаттарына дайындалады.", f: "2 IT-мамандық · мемтапсырыс" },
        en: { t: "IT laboratory", d: "Computer labs for Software and Computer Hardware & Networks specialties. Students write code, configure networks and prepare for network administration championships.", f: "2 IT specialties · state grant" } },
      { img: "assets/real/news11.webp",
        ru: { t: "Учебные лаборатории", d: "Лабораторные занятия на реальном оборудовании: студенты работают с чертежами, схемами и инструментом под руководством мастеров производственного обучения и наставников с предприятий.", f: "Дуальное обучение" },
        kz: { t: "Оқу зертханалары", d: "Нақты жабдықтағы зертханалық сабақтар: студенттер сызбалармен, схемалармен және құралмен өндірістік оқыту шеберлері мен кәсіпорын тәлімгерлерінің жетекшілігімен жұмыс істейді.", f: "Дуальды оқыту" },
        en: { t: "Training laboratories", d: "Hands-on lab classes on real equipment: students work with drawings, circuits and tools guided by vocational masters and mentors from partner companies.", f: "Dual education" } },
      { img: "assets/real/basketbol.webp",
        ru: { t: "Спортивный зал", d: "Спортзал колледжа: баскетбол и волейбол, секции и турниры между отделениями. Студенческая волейбольная лига собирает команды 1–2 курсов каждый семестр.", f: "Волейбольная лига · секции" },
        kz: { t: "Спорт залы", d: "Колледждің спорт залы: баскетбол мен волейбол, секциялар мен бөлімдер арасындағы турнирлер. Студенттік волейбол лигасы әр семестрде 1–2 курс командаларын жинайды.", f: "Волейбол лигасы · секциялар" },
        en: { t: "Sports hall", d: "The college sports hall: basketball and volleyball, clubs and inter-department tournaments. The student volleyball league gathers 1st–2nd year teams every semester.", f: "Volleyball league · clubs" } },
      { img: "assets/real/footbal.webp",
        ru: { t: "Футбольное поле", d: "Собственное футбольное поле колледжа — домашняя арена сборной и площадка для мероприятий на открытом воздухе. Здесь же проходят тренировки и межколледжные матчи.", f: "Сборная колледжа" },
        kz: { t: "Футбол алаңы", d: "Колледждің өз футбол алаңы — құраманың үй аренасы және ашық аспан астындағы іс-шаралар алаңы. Мұнда жаттығулар мен колледжаралық матчтар өтеді.", f: "Колледж құрамасы" },
        en: { t: "Football field", d: "The college's own football field — home ground of the team and a venue for open-air events, training sessions and inter-college matches.", f: "College national team" } }
    ];
    const L = {
      ru: { prev: "Предыдущая локация", next: "Следующая локация", play: "Автопоказ", close: "Закрыть" },
      kz: { prev: "Алдыңғы локация", next: "Келесі локация", play: "Автокөрсетілім", close: "Жабу" },
      en: { prev: "Previous location", next: "Next location", play: "Autoplay", close: "Close" }
    };
    let idx = 0, lastFocus = null, timer = null;
    function syncLabels() {
      const t = L[lang] || L.ru;
      prev.setAttribute("aria-label", t.prev); next.setAttribute("aria-label", t.next);
      play.setAttribute("aria-label", t.play); $(".tour-close", modal).setAttribute("aria-label", t.close);
    }
    function render() {
      const s = STOPS[idx], t = s[lang] || s.ru;
      img.src = s.img; img.alt = t.t;
      img.style.animation = "none"; void img.offsetWidth; img.style.animation = "fadeIn .45s var(--ease-out)";
      title.textContent = t.t; desc.textContent = t.d; fact.textContent = t.f;
      count.textContent = (idx + 1) + " / " + STOPS.length;
      $$("button", dots).forEach((b, i) => { b.classList.toggle("active", i === idx); b.setAttribute("aria-selected", i === idx ? "true" : "false"); b.setAttribute("aria-label", (STOPS[i][lang] || STOPS[i].ru).t); });
    }
    function go(i) { idx = (i + STOPS.length) % STOPS.length; render(); }
    function stopPlay() { if (timer) { clearInterval(timer); timer = null; } play.setAttribute("aria-pressed", "false"); }
    function open() {
      lastFocus = document.activeElement;
      modal.hidden = false;
      document.documentElement.style.overflow = "hidden";
      syncLabels(); go(0);
      $(".tour-close", modal).focus();
    }
    function close() {
      if (modal.hidden) return;
      stopPlay();
      modal.hidden = true;
      document.documentElement.style.overflow = "";
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    STOPS.forEach((s, i) => {
      const b = document.createElement("button");
      b.type = "button"; b.setAttribute("role", "tab");
      b.addEventListener("click", () => { stopPlay(); go(i); });
      dots.appendChild(b);
    });
    if (btn) btn.addEventListener("click", open);
    document.addEventListener("open-tour", open);
    prev.addEventListener("click", () => { stopPlay(); go(idx - 1); });
    next.addEventListener("click", () => { stopPlay(); go(idx + 1); });
    play.addEventListener("click", () => {
      if (timer) { stopPlay(); return; }
      play.setAttribute("aria-pressed", "true");
      timer = setInterval(() => go(idx + 1), 4500);
    });
    $$("[data-close]", modal).forEach(el => el.addEventListener("click", close));
    document.addEventListener("keydown", e => {
      if (modal.hidden) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") { stopPlay(); go(idx - 1); }
      else if (e.key === "ArrowRight") { stopPlay(); go(idx + 1); }
      else if (e.key === "Tab") trapTab(e, $(".tour-card", modal));
    });
    let tx = null;
    const stage = $(".tour-stage", modal);
    stage.addEventListener("touchstart", e => { tx = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener("touchend", e => {
      if (tx === null) return;
      const dx = e.changedTouches[0].clientX - tx; tx = null;
      if (Math.abs(dx) > 40) { stopPlay(); go(idx + (dx < 0 ? 1 : -1)); }
    }, { passive: true });
    window.addEventListener("langchange", () => { if (!modal.hidden) { syncLabels(); render(); } });
  })();

  /* ---------- Photo archive ---------- */
  (function () {
    const modal = $("#archiveModal"); if (!modal) return;
    const grid = $("#archiveGrid"), tabs = $("#archiveTabs"), countEl = $("#archiveCount"), btn = $("#archiveBtn");
    const A = (n, cat, ru, kz, en) => ({ img: "assets/real/archive/arch" + n + ".webp", cat, ru, kz, en });
    const PHOTOS = [
      A(1, "events", { d: "февраль 2025", c: "Открытие декады «Құрылыс пен дәнекерлеу — шеберліктің шыңы»: театрализованное представление" }, { d: "2025 ж. ақпан", c: "«Құрылыс пен дәнекерлеу — шеберліктің шыңы» декадасының ашылуы: театрландырылған қойылым" }, { d: "February 2025", c: "Opening of the Construction & Welding skills decade: a theatrical performance" }),
      A(2, "sport", { d: "февраль–март 2025", c: "Волейбольная лига среди студентов 1–2 курсов" }, { d: "2025 ж. ақпан–наурыз", c: "1–2 курс студенттері арасындағы волейбол лигасы" }, { d: "Feb–Mar 2025", c: "Volleyball league among 1st–2nd year students" }),
      A(3, "events", { d: "18 марта 2025", c: "Дефиле «ЭтноFashion» ко Дню национальной одежды" }, { d: "2025 ж. 18 наурыз", c: "Ұлттық киім күніне арналған «ЭтноFashion» дефилеі" }, { d: "March 18, 2025", c: "EthnoFashion runway show for National Dress Day" }),
      A(4, "events", { d: "март 2025", c: "«Наурыз — құт-береке бастауы!»: бауырсак-вечер профкома" }, { d: "2025 ж. наурыз", c: "«Наурыз — құт-береке бастауы!»: кәсіподақ комитетінің бауырсақ кеші" }, { d: "March 2025", c: "Nauryz celebration: the trade union's baursak party" }),
      A(5, "events", { d: "16 апреля 2025", c: "Профориентационная выставка «Қадам-Life» в школе №69" }, { d: "2025 ж. 16 сәуір", c: "№69 мектептегі «Қадам-Life» кәсіптік бағдар беру көрмесі" }, { d: "April 16, 2025", c: "Kadam-Life career-guidance exhibition at school No. 69" }),
      A(6, "events", { d: "апрель 2025", c: "Подписание трёхсторонних меморандумов с Палатой предпринимателей" }, { d: "2025 ж. сәуір", c: "Кәсіпкерлер палатасымен үшжақты меморандумдарға қол қою" }, { d: "April 2025", c: "Signing tripartite memoranda with the Chamber of Entrepreneurs" }),
      A(7, "events", { d: "апрель 2025", c: "Благотворительная ярмарка «Жанашырлық алаңы» отделения газосварки" }, { d: "2025 ж. сәуір", c: "Газ бен дәнекерлеу бөлімінің «Жанашырлық алаңы» қайырымдылық жәрмеңкесі" }, { d: "April 2025", c: "Zhanashyrlyk alany charity fair of the gas-welding department" }),
      A(8, "ws", { d: "28–30 апреля 2025", c: "DalaSKILLS-2025: Тілектес Жігер и наставник — 3-е место в кирпичной кладке" }, { d: "2025 ж. 28–30 сәуір", c: "DalaSKILLS-2025: Тілектес Жігер және тәлімгері — кірпіш қалаудан 3-орын" }, { d: "April 28–30, 2025", c: "DalaSKILLS-2025: Zhiger Tilektes and his mentor — 3rd place in bricklaying" }),
      A(9, "events", { d: "апрель 2025", c: "Республиканский форум рабочей молодёжи в Атырау" }, { d: "2025 ж. сәуір", c: "Атыраудағы жұмысшы жастардың республикалық форумы" }, { d: "April 2025", c: "Republican forum of working youth in Atyrau" }),
      A(10, "events", { d: "30 апреля 2025", c: "Запись интервью на Рика ТВ: Год рабочих профессий" }, { d: "2025 ж. 30 сәуір", c: "Рика ТВ-да сұхбат жазу: Жұмысшы мамандықтар жылы" }, { d: "April 30, 2025", c: "Recording the Rika TV interview: Year of Working Professions" }),
      A(11, "study", { d: "май 2025", c: "Экскурсия первокурсников в Военный институт им. Т. Бигелдинова" }, { d: "2025 ж. мамыр", c: "Бірінші курс студенттерінің Т. Бигелдинов атындағы Әскери институтқа экскурсиясы" }, { d: "May 2025", c: "First-year students' tour of the T. Bigeldinov Military Institute" }),
      A(12, "ws", { d: "19–21 мая 2025", c: "WorldSkills Aktobe-2025: золото «Сварочные технологии» — Ербөлек Расбек" }, { d: "2025 ж. 19–21 мамыр", c: "WorldSkills Aktobe-2025: «Дәнекерлеу технологиясы» бойынша алтын — Ербөлек Расбек" }, { d: "May 19–21, 2025", c: "WorldSkills Aktobe-2025: gold in Welding Technologies — Rasbek Yerbolek" }),
      A(13, "ws", { d: "19–21 мая 2025", c: "WorldSkills: золото «Сетевое и системное администрирование» — Адилханов Ислам" }, { d: "2025 ж. 19–21 мамыр", c: "WorldSkills: «Желілік және жүйелік әкімшілендіру» бойынша алтын — Адилханов Ислам" }, { d: "May 19–21, 2025", c: "WorldSkills: gold in Network & System Administration — Islam Adilkhanov" }),
      A(14, "ws", { d: "19–21 мая 2025", c: "WorldSkills: бронза «Веб-технологии» — Шаукенов Амирлан" }, { d: "2025 ж. 19–21 мамыр", c: "WorldSkills: «Веб-технологиялар» бойынша қола — Шаукенов Амирлан" }, { d: "May 19–21, 2025", c: "WorldSkills: bronze in Web Technologies — Amirlan Shaukenov" }),
      A(15, "ws", { d: "2025", c: "WorldSkills: «Облицовка плиткой» — Абиев Шынгысхан Есенгельдинулы" }, { d: "2025 ж.", c: "WorldSkills: «Плитка төсеу» — Абиев Шынгысхан Есенгельдинулы" }, { d: "2025", c: "WorldSkills: Wall & Floor Tiling — Shyngyskhan Abiev" }),
      A(16, "study", { d: "май 2025", c: "Открытие профлагеря SKILLS CAMP: 120 школьников из 7 школ" }, { d: "2025 ж. мамыр", c: "SKILLS CAMP кәсіптік лагерінің ашылуы: 7 мектептен 120 оқушы" }, { d: "May 2025", c: "SKILLS CAMP opening: 120 pupils from 7 schools" }),
      A(17, "study", { d: "июнь 2025", c: "SKILLS CAMP: вторая неделя профлагеря" }, { d: "2025 ж. маусым", c: "SKILLS CAMP: кәсіптік лагерьдің екінші аптасы" }, { d: "June 2025", c: "SKILLS CAMP: the camp's second week" }),
      A(18, "study", { d: "июнь 2025", c: "Конкурс «Үздік жас педагог – 2025»: 7 молодых педагогов колледжа" }, { d: "2025 ж. маусым", c: "«Үздік жас педагог – 2025» байқауы: колледждің 7 жас педагогы" }, { d: "June 2025", c: "Best Young Teacher 2025 contest: 7 young college teachers" })
    ];
    const L = {
      ru: { all: "Все", ws: "WorldSkills", events: "События", sport: "Спорт", study: "Учёба", close: "Закрыть", open: "Открыть фото", count: n => n + " фото", empty: "В этой категории пока нет фото." },
      kz: { all: "Барлығы", ws: "WorldSkills", events: "Оқиғалар", sport: "Спорт", study: "Оқу", close: "Жабу", open: "Фотоны ашу", count: n => n + " фото", empty: "Бұл санатта әзірге фото жоқ." },
      en: { all: "All", ws: "WorldSkills", events: "Events", sport: "Sport", study: "Studies", close: "Close", open: "Open photo", count: n => n + " photos", empty: "No photos in this category yet." }
    };
    const CATS = ["all", "ws", "events", "sport", "study"];
    let cat = "all", lastFocus = null;
    const t = () => L[lang] || L.ru;
    const tOf = p => p[lang] || p.ru;
    const filtered = () => cat === "all" ? PHOTOS : PHOTOS.filter(p => p.cat === cat);
    function renderTabs() {
      tabs.innerHTML = "";
      CATS.forEach(c => {
        const b = document.createElement("button");
        b.type = "button"; b.setAttribute("role", "tab");
        b.textContent = t()[c];
        b.classList.toggle("active", c === cat);
        b.setAttribute("aria-selected", c === cat ? "true" : "false");
        b.addEventListener("click", () => { cat = c; renderTabs(); renderGrid(); });
        tabs.appendChild(b);
      });
    }
    function renderGrid() {
      const list = filtered(), lb = t();
      grid.innerHTML = "";
      if (!list.length) {
        const d = document.createElement("div");
        d.className = "archive-empty"; d.textContent = lb.empty;
        grid.appendChild(d);
      }
      list.forEach((p, i) => {
        const tr = tOf(p);
        const b = document.createElement("button");
        b.type = "button"; b.className = "archive-item";
        b.setAttribute("aria-label", lb.open + ": " + tr.c);
        const catCls = p.cat === "ws" ? " ws" : p.cat === "sport" ? " sport" : p.cat === "study" ? " study" : "";
        b.innerHTML = `<span class="ph"><img loading="lazy" decoding="async" src="${p.img}" alt=""><span class="a-cat${catCls}">${lb[p.cat]}</span><span class="a-zoom"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><use href="#i-expand"/></svg></span></span><span class="a-body"><span class="a-date">${tr.d}</span><span class="a-cap">${tr.c}</span></span>`;
        b.addEventListener("click", () => {
          document.dispatchEvent(new CustomEvent("open-lightbox", { detail: { items: list.map(x => ({ src: x.img, caption: tOf(x).c })), index: i } }));
        });
        grid.appendChild(b);
      });
      countEl.textContent = lb.count(list.length);
      grid.scrollTop = 0;
    }
    function syncLabels() { $(".archive-close", modal).setAttribute("aria-label", t().close); }
    function open() {
      lastFocus = document.activeElement;
      modal.hidden = false;
      document.documentElement.style.overflow = "hidden";
      syncLabels(); renderTabs(); renderGrid();
      $(".archive-close", modal).focus();
    }
    function close() {
      if (modal.hidden) return;
      modal.hidden = true;
      document.documentElement.style.overflow = "";
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    if (btn) btn.addEventListener("click", open);
    document.addEventListener("open-archive", open);
    $$("[data-close]", modal).forEach(el => el.addEventListener("click", close));
    document.addEventListener("keydown", e => {
      if (modal.hidden) return;
      const above = ["#lightbox", "#cmdk", "#infoModal", "#tourModal"].some(s => { const el = $(s); return el && !el.hidden; });
      if (above) return;
      if (e.key === "Escape") close();
      else if (e.key === "Tab") trapTab(e, $(".archive-card", modal));
    }, true);
    window.addEventListener("langchange", () => { if (!modal.hidden) { syncLabels(); renderTabs(); renderGrid(); } });
  })();

  /* ---------- Section scene tint + per-section accent ---------- */
  (function () {
    const secs = $$(".section");
    if (!secs.length) return;
    const ACCENTS = {
      about: "#00E5FF", history: "#FFB800", management: "#246BFD", staff: "#00FFD1",
      achievements: "#FFB800", accreditation: "#246BFD", schedule: "#00E5FF", studentservices: "#00FFD1",
      employment: "#9D4DFF", dormitory: "#FF3CAC", media: "#9D4DFF", statesymbols: "#FFB800",
      stats: "#00E5FF", specialties: "#246BFD", students: "#00FFD1", admission: "#FF3CAC",
      production: "#FFB800", news: "#00E5FF", gallery: "#9D4DFF", contacts: "#00FFD1"
    };
    secs.forEach(s => { const c = ACCENTS[s.id]; if (c) s.style.setProperty("--accent", c); });
    if ("IntersectionObserver" in window && !reduce) {
      const io = new IntersectionObserver(es => {
        es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("scene-in"); io.unobserve(e.target); } });
      }, { threshold: 0.12 });
      secs.forEach(s => io.observe(s));
    } else {
      secs.forEach(s => s.classList.add("scene-in"));
    }
  })();

  bootReady = true;
  refreshLangDynamic(false);
})();