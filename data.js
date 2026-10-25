window.DATA = {
  ROT: {
    en: ["ERP systems", "mobile apps", "POS systems", "admin dashboards", "websites", "e-commerce", "packaging"],
    ar: ["أنظمة ERP", "تطبيقات الهاتف", "أنظمة نقاط البيع", "لوحات التحكم", "المواقع الإلكترونية", "المتاجر الإلكترونية", "التغليف"]
  },
  MARQ: ["Business Analysis", "UI Design", "UX Research", "User Flows", "Roles & Permissions", "Prototyping", "Design Systems", "ERP", "POS", "Dashboards", "Mobile Apps", "Websites", "E-commerce", "Packaging", "Branding"],

  MODS: [
    { c: "POS", en: "Point of Sale", ar: "نقاط البيع", den: "Sales, orders and branches, with a fast cashier screen and multiple payment methods.", dar: "إدارة المبيعات والطلبات والفروع، بواجهة سريعة للكاشير وطرق دفع متعددة.", used: true, usedBy: { en: "Live at Planet Donuts & Donuttery", ar: "مطبّق لدى Planet Donuts و Donuttery" } },
    { c: "WH", en: "Warehouse", ar: "المستودعات", den: "Live inventory and the movement of materials between warehouses and branches.", dar: "تتبّع المخزون وحركة المواد بين المستودعات والفروع لحظة بلحظة.", used: true },
    { c: "FAC", en: "Factory", ar: "المصانع", den: "Production lines, manufacturing orders and branch requests in one flow.", dar: "إدارة خطوط الإنتاج وأوامر التصنيع وطلبات الفروع في مسار واحد.", used: true },
    { c: "HR", en: "Human Resources", ar: "الموارد البشرية", den: "Employees, their records and HR procedures in a single system.", dar: "إدارة الموظفين وبياناتهم وإجراءاتهم في نظام واحد." },
    { c: "CRM", en: "Customer Relations", ar: "علاقات العملاء", den: "Customers, opportunities and communication, to build stronger relationships.", dar: "متابعة العملاء والفرص والتواصل لبناء علاقات أقوى." },
    { c: "PUR", en: "Purchasing", ar: "المشتريات", den: "Purchase requests, suppliers and invoices, with smart invoice reading.", dar: "طلبات الشراء والموردون والفواتير، مع قراءة ذكية للفواتير." },
    { c: "ECO", en: "E-commerce", ar: "التجارة الإلكترونية", den: "A branded online store and app, tailored to each business.", dar: "متجر إلكتروني وتطبيق بهوية كل نشاط تجاري." }
  ],

  SYS: [
    { c: "ERP", k: "link", core: 1, x: 300, y: 300, en: "ERP System", ar: "نظام ERP", den: "Link product, customized: ties every operation together.", dar: "منتج Link مخصّص: يربط العمليات التشغيلية كلها." },
    { c: "POS", k: "link", x: 300, y: 75, en: "Point of Sale", ar: "نقاط البيع", den: "Link product, customized for orders, sales and branches.", dar: "منتج Link مخصّص للطلبات والمبيعات والفروع." },
    { c: "WH", k: "link", x: 476, y: 160, en: "Warehouse", ar: "المستودعات", den: "ERP module: inventory and material movement.", dar: "وحدة من ERP: المخزون وحركة المواد." },
    { c: "FAC", k: "link", x: 519, y: 350, en: "Factory", ar: "المصنع", den: "ERP module: production lines and manufacturing orders.", dar: "وحدة من ERP: خطوط الإنتاج وأوامر التصنيع." },
    { c: "AI", k: "built", x: 398, y: 503, en: "AI Invoices", ar: "فواتير AI", den: "Built for Planet, reusable: OCR for supplier invoices.", dar: "صُمّم لـ Planet وقابل للتعميم: قراءة فواتير الموردين." },
    { c: "WEB", k: "own", x: 202, y: 503, en: "Website", ar: "الموقع", den: "Planet only: the official website.", dar: "خاص بـ Planet: الموقع الرسمي." },
    { c: "APP", k: "own", x: 81, y: 350, en: "Mobile App", ar: "التطبيق", den: "Planet only: ordering app for customers.", dar: "خاص بـ Planet: تطبيق الطلب للعملاء." },
    { c: "ADMIN", k: "built", x: 124, y: 160, en: "Admin", ar: "لوحة التحكم", den: "Built for Planet, reusable: 100+ screens.", dar: "صُمّمت لـ Planet وقابلة للتعميم: أكثر من 100 شاشة." }
  ],
  LINKS: [["ERP","POS"],["ERP","WH"],["ERP","FAC"],["ERP","AI"],["ERP","WEB"],["ERP","APP"],["ERP","ADMIN"],["POS","WH"],["WH","FAC"],["APP","WEB"],["ADMIN","POS"],["AI","WH"],["APP","POS"]],

  DOMAINS: [
    { en: "Analytics", ar: "التحليلات", den: "Statistics dashboards, shifts and financial summaries", dar: "لوحات الإحصائيات، والورديات، والملخّصات المالية" },
    { en: "Operations", ar: "التشغيل", den: "Branches, franchises, POS orders, special orders, delivery partners", dar: "الفروع، والامتيازات التجارية، وطلبات نقاط البيع، والطلبات الخاصة، وشركاء التوصيل" },
    { en: "Products & menu", ar: "المنتجات والقوائم", den: "Products, categories and options; assigning menus to branches", dar: "المنتجات والفئات والخيارات، وإسناد القوائم إلى الفروع" },
    { en: "Marketing", ar: "التسويق", den: "Offers and promotions, gift cards, subscriptions, points and rewards, notifications, app content", dar: "العروض، وبطاقات الهدايا، والاشتراكات، والنقاط والمكافآت، والإشعارات، ومحتوى التطبيق" },
    { en: "Stock", ar: "المخزون", den: "Branch stock, warehouse orders and factory orders", dar: "مخزون الفروع، وطلبات المستودع، وطلبات المصنع" },
    { en: "People", ar: "الموارد البشرية", den: "Employees, roles and permissions, careers", dar: "الموظفون، والأدوار والصلاحيات، والوظائف" },
    { en: "Customers", ar: "العملاء", den: "Customer records, feedback, call center, questionnaires", dar: "سجلات العملاء، والملاحظات، ومركز الاتصال، والاستبيانات" },
    { en: "Control", ar: "الرقابة", den: "Audit log of every action in the system", dar: "سجل تدقيق لكل إجراء في النظام" }
  ],

  APPSTRIP: [6, 11, 7, 3, 4, 8, 9, 10, 12],
  POS: [["p3","Menu","القائمة"],["p4","Cart & payment","السلة والدفع"],["p5","Tables","الطاولات"],["p6","Order details","تفاصيل الطلب"],["p7","Drinks","المشروبات"],["p1","Lock screen","شاشة القفل"],["p2","Login","تسجيل الدخول"]],

  /* planet official site captures (filled from live site) */
  WEB: [
    { k: "dashboard", en: "Home", ar: "الرئيسية", src: "img/pd/web-home.webp", w: 1200, h: 3567 },
    { k: "careers", en: "Careers", ar: "الوظائف", src: "img/pd/web-careers.webp", w: 1200, h: 2673 },
    { k: "partners", en: "Partnerships", ar: "شراكاتنا", src: "img/pd/web-partners.webp", w: 1200, h: 1360 },
    { k: "contact", en: "Contact", ar: "تواصل معنا", src: "img/pd/web-contact.webp", w: 1200, h: 1756 }
  ],
  WEBM: null,

  STORES: {
    planet: { ios: "https://apps.apple.com/us/app/planet-donut/id6478827982?l=ar", android: "https://play.google.com/store/apps/details?id=com.planetdonuts.www" },
    offerat: { ios: "https://apps.apple.com/jo/app/offerat-%D8%A3%D9%88%D9%81%D8%B1%D8%A7%D8%AA/id6456388871", android: "https://play.google.com/store/apps/details?id=com.topdeliveryapp.customer" }
  },

  CLIENTS: [
    { id: "istatieh", name: { en: "Istatieh Decorations", ar: "ديكورات استيتية" }, sub: { en: "Ayoub Statieh", ar: "أيوب ستيتية" }, cover: "img/cl/istatieh/b00.webp",
      tag: { en: "Catalogue · Social · Website", ar: "كتالوج · وسائل التواصل · موقع" },
      theme: { bg: "#140608", fg: "#FBF2F2", muted: "#C9A6A9", accent: "#D3203A", logo: "#ffffff" },
      logo: "img/cl/istatieh/logo.webp", logoNote: true,
      url: "https://istatieh.com/",
      about: { en: "A decoration group founded in 1966: decor materials, interior design, wood industries and fit-out across Jordan. For them I designed a 42-page bilingual catalogue, a modular social media system in four themes, and their website.", ar: "مجموعة متخصصة في الديكور منذ عام 1966: مواد الديكور، والتصميم الداخلي، والصناعات الخشبية، والتنفيذ في الأردن. صمّمتُ لها كتالوجًا ثنائي اللغة من 42 صفحة، ونظامًا بصريًا لوسائل التواصل بأربعة أنماط، إضافةً إلى موقعها الإلكتروني." },
      meta: { en: ["Link client", "Print catalogue", "Social system", "Website"], ar: ["عميل لدى Link", "كتالوج مطبوع", "نظام وسائل التواصل", "موقع إلكتروني"] },
      sections: [
        { type: "book", key: "istatieh", t: { en: "The catalogue · 42 pages", ar: "الكتالوج · 42 صفحة" }, s: { en: "A square, bilingual catalogue: company story, services, product lines and partners. Turn the pages like the printed book.", ar: "كتالوج مربّع ثنائي اللغة: قصة الشركة، والخدمات، وخطوط المنتجات، والشركاء. قلّب الصفحات كما في النسخة المطبوعة." },
          pages: Array.from({ length: 42 }, (_, i) => "img/cl/istatieh/b" + String(i).padStart(2, "0") + ".webp"), w: 1000, h: 1000, offset: 2, square: 1 },
        { type: "ig", t: { en: "Instagram grid · 4 themes", ar: "شبكة إنستغرام · 4 أنماط" }, s: { en: "Nine posts planned as one grid, alternating red and white, then redesigned in four themes. Switch themes to see the same content take a new look.", ar: "تسعة منشورات صُمّمت كشبكة واحدة بتناوب الأحمر والأبيض، ثم أُعيد تصميمها بأربعة أنماط. بدّل النمط لترى المحتوى نفسه بهوية جديدة." },
          handle: "istatieh.decor", themes: 4, count: 9, base: "img/cl/istatieh/t" },
        { type: "social", cols: 2, t: { en: "Standalone posts", ar: "منشورات منفصلة" }, items: [{ src: "img/cl/istatieh/x1.webp" }, { src: "img/cl/istatieh/x2.webp" }] },
        { type: "site", t: { en: "The website", ar: "الموقع الإلكتروني" }, s: { en: "Services, brands, articles and projects, all in Arabic.", ar: "الخدمات، والعلامات التجارية، والمقالات، والمشاريع." }, pages: [
          { en: "Home", ar: "الرئيسية", src: "img/cl/istatieh/web-home.webp", w: 1200, h: 3655 },
          { en: "About", ar: "من نحن", src: "img/cl/istatieh/web-about.webp", w: 1200, h: 3500 }
        ] },
        { type: "wide", t: { en: "Early website concept", ar: "تصميم سابق للموقع" }, items: [{ src: "img/work/p16.webp", full: 1 }] }
      ] },
    { id: "ozom", name: { en: "Ozom · Al-Ebtikar Co.", ar: "أوزوم · شركة الابتكار" }, cover: "img/cl/ozom/b00.webp",
      tag: { en: "Company profile · Website", ar: "بروفايل الشركة · موقع" },
      theme: { bg: "#0d120b", fg: "#F2F5EF", muted: "#A9B5A2", accent: "#7E9A5E", logo: "#ffffff" },
      url: "https://ozomgroup.com/home-page",
      about: { en: "A steel pipes and tubes factory in Al-Muwaqqar industrial city, Jordan, exporting across the region. I designed their company profile and their website.", ar: "مصنع للمواسير والتيوبات الحديدية في مدينة الموقّر الصناعية بالأردن، ويصدّر إلى أسواق المنطقة. صمّمتُ بروفايل الشركة وموقعها الإلكتروني." },
      meta: { en: ["Link client", "Company profile", "Website"], ar: ["عميل لدى Link", "بروفايل الشركة", "موقع إلكتروني"] },
      sections: [
        { type: "book", key: "ozom", t: { en: "Company profile · A4", ar: "بروفايل الشركة · A4" }, s: { en: "Products, standards and steel grades, certificates and markets, laid out page by page.", ar: "المنتجات، والمعايير ودرجات الحديد، والشهادات، والأسواق، صفحةً بصفحة." },
          pages: Array.from({ length: 12 }, (_, i) => "img/cl/ozom/b" + String(i).padStart(2, "0") + ".webp"), w: 707, h: 1000, offset: 0 },
        { type: "site", t: { en: "The website", ar: "الموقع الإلكتروني" }, pages: [ { en: "Home", ar: "الرئيسية", src: "img/cl/ozom/web-home.webp", w: 1200, h: 3658 } ] }
      ] },
    { id: "offerat", name: { en: "Offerat", ar: "أوفرات" }, cover: "img/cl/offerat/ad2.webp",
      tag: { en: "Apps · Admin · Campaigns", ar: "تطبيقات · لوحة تحكم · حملات" },
      theme: { bg: "#170d29", fg: "#F6F2FF", muted: "#B8ABD6", accent: "#FFC400", logo: "#ffffff" },
      about: { en: "A food deals and delivery platform in Jordan, live on the App Store and Google Play. I designed the customer app, the restaurant app and the admin panel, plus their sponsored campaigns.", ar: "منصة أردنية لعروض المطاعم والتوصيل، منشورة على متجري App Store و Google Play. صمّمتُ تطبيق العملاء، وتطبيق المطاعم، ولوحة التحكم، إلى جانب حملاتها الإعلانية الممولة." },
      meta: { en: ["Link client", "Mobile apps", "Admin panel", "Sponsored ads"], ar: ["عميل لدى Link", "تطبيقات الهاتف", "لوحة تحكم", "إعلانات ممولة"] },
      sections: [
        { type: "apps", store: "offerat", t: { en: "The customer app · live", ar: "تطبيق العملاء · منشور" }, s: { en: "Screens from the live app.", ar: "شاشات من التطبيق المنشور." }, items: [1, 2, 3, 4].map(i => "img/cl/offerat/app" + i + ".webp") },
        { type: "social", t: { en: "Sponsored campaigns", ar: "حملات إعلانية ممولة" }, s: { en: "Exclusive restaurant deals on the app. Six picks from a much larger series.", ar: "عروض حصرية لمطاعم شريكة على التطبيق، ستة منشورات مختارة من سلسلة أكبر بكثير." }, items: [1, 2, 3, 4, 5, 6].map(i => ({ src: "img/cl/offerat/ad" + i + ".webp" })) },
        { type: "wide", t: { en: "Apps & admin panel", ar: "التطبيقات ولوحة التحكم" }, items: [{ src: "img/work/p18.webp", full: 1 }] },
        { type: "wide", t: { en: "More social media", ar: "منشورات أخرى" }, items: [{ src: "img/work/p13.webp", full: 1 }] }
      ] },
    { id: "link", name: { en: "Link Business Solutions", ar: "Link Business Solutions" }, cover: "img/cl/link/POS.webp",
      tag: { en: "ERP ad campaign · Social", ar: "حملة إعلانية · وسائل التواصل" },
      theme: { bg: "#0a0f1f", fg: "#EEF3FF", muted: "#9AA6C4", accent: "#3D8BFF", logo: "#0f1730" },
      about: { en: "A Jordanian digital solutions company: UI/UX, websites, visual identities and custom business systems. Besides designing their ERP suite, I designed the advertising campaign for every module and the company’s social media.", ar: "شركة أردنية للحلول الرقمية: تصميم الواجهات، وتطوير المواقع، والهويات البصرية، والأنظمة المخصّصة لإدارة الشركات. إلى جانب تصميم منظومة ERP، صمّمتُ الحملة الإعلانية لكل وحدة ومحتوى وسائل التواصل للشركة." },
      meta: { en: ["Employer", "Campaigns", "Social media", "2024–2026"], ar: ["جهة العمل", "حملات إعلانية", "وسائل التواصل", "2024–2026"] },
      sections: [
        { type: "story", t: { en: "ERP module campaign", ar: "حملة وحدات المنظومة" }, s: { en: "Two story ads for each of the seven modules, one visual language across the suite.", ar: "إعلانان بمقاس القصص لكل وحدة من الوحدات السبع، بلغة بصرية موحّدة." },
          items: ["POS","POS2","WH","WH2","FAC","FAC2","HR","HR2","CRM","CRM2","PUR","PUR2","ECO","ECO2"].map(k => ({ src: "img/cl/link/" + k + ".webp", t: k.replace("2", " · 2") })) },
        { type: "wide", t: { en: "Social media", ar: "وسائل التواصل" }, s: { en: "Posts for the company’s own channels.", ar: "منشورات لقنوات الشركة." }, items: [{ src: "img/work/p7.webp", full: 1, t: "Link Business Solutions" }] }
      ] },
    { id: "yahmaa", name: { en: "Yahmaa Medical", ar: "شركة اليهماء الطبية" }, cover: "img/cl/yahmaa/cover.webp",
      tag: { en: "Website UI/UX", ar: "تصميم موقع إلكتروني" },
      theme: { bg: "#120a0c", fg: "#F7F1F2", muted: "#B9A6AA", accent: "#C8324A", logo: "#3a1820" },
      logo: "img/cl/yahmaa/logo.webp", logoNote: true,
      url: "https://yahmma.linkco.jo/",
      about: { en: "A leading provider of pharmaceutical and medical supplies, part of Ez Alsahra Holding, across four sectors: pharmaceuticals, medical devices, nutraceuticals and dermo-cosmetics. I designed the full UI/UX of their website.", ar: "شركة رائدة في توريد الأدوية والمستلزمات الطبية، تابعة لمجموعة عز الصحراء القابضة، وتعمل في أربعة قطاعات: الأدوية، والأجهزة الطبية، والمكمّلات الغذائية، ومستحضرات العناية. صمّمتُ تجربة موقعها الإلكتروني وواجهاته بالكامل." },
      meta: { en: ["Link client", "Website", "UI/UX", "Live"], ar: ["عميل لدى Link", "موقع إلكتروني", "UI/UX", "منشور"] },
      sections: [ { type: "site", t: { en: "The website", ar: "الموقع الإلكتروني" }, s: { en: "Product search, four sectors, partners and product details.", ar: "البحث عن المنتجات، والقطاعات الأربعة، والشركاء، وتفاصيل المنتجات." }, pages: [
          { en: "Home", ar: "الرئيسية", src: "img/cl/yahmaa/home.webp", w: 1200, h: 4182 },
          { en: "Products", ar: "المنتجات", src: "img/cl/yahmaa/products.webp", w: 1200, h: 1788 },
          { en: "About", ar: "من نحن", src: "img/cl/yahmaa/about.webp", w: 1200, h: 1618 },
          { en: "Contact", ar: "تواصل معنا", src: "img/cl/yahmaa/contact.webp", w: 1200, h: 2149 }
        ], mobile: { src: "img/cl/yahmaa/m-home.webp", w: 440, h: 6197 } } ] },
    { id: "donuttery", name: { en: "Donuttery", ar: "دوناتري" }, cover: "img/cl/donuttery/logo.webp", coverFit: "contain", coverBg: "#ffffff",
      tag: { en: "POS · Dashboard", ar: "نقاط البيع · لوحة التحكم" },
      theme: { bg: "#06161f", fg: "#EEF9FF", muted: "#9DC3D3", accent: "#18B4E6", logo: "#ffffff" },
      logo: "img/cl/donuttery/logo.webp", logoNote: true,
      about: { en: "A shop for every kind of donut, plus coffee. Their point-of-sale system and admin dashboard run on the Link product suite I designed, customized for their branches.", ar: "متجر للدونات بأنواعها والقهوة. يعمل نظام نقاط البيع ولوحة التحكم لديه على منظومة Link التي صمّمتُها، بعد تخصيصها لفروعه." },
      meta: { en: ["Link client", "POS", "Dashboard"], ar: ["عميل لدى Link", "نقاط البيع", "لوحة التحكم"] },
      sections: [ { type: "nda", t: { en: "What I designed", ar: "ما صمّمته" }, s: { en: "Both systems hold the client’s internal data, so the screens stay private.", ar: "يضمّ النظامان بيانات داخلية للعميل، لذلك تبقى الشاشات خاصة." }, items: [
        { c: "POS", en: "Point of sale", ar: "نظام نقاط البيع", den: "Fast ordering at the counter: donuts by type and box size, coffee orders, payment and receipts.", dar: "طلب سريع عند الكاشير: الدونات حسب النوع وحجم العلبة، وطلبات القهوة، والدفع، والإيصالات." },
        { c: "ADMIN", en: "Admin dashboard", ar: "لوحة التحكم", den: "Products and menus, branches, sales reports and staff permissions in one place.", dar: "المنتجات والقوائم، والفروع، وتقارير المبيعات، وصلاحيات الموظفين في مكان واحد." } ] } ] },
    { id: "shea", name: { en: "She Shea", ar: "شي شيا" }, cover: "img/cl/shea/s2.webp",
      tag: { en: "Social media", ar: "وسائل التواصل" },
      theme: { bg: "#0c0a09", fg: "#F8F1E8", muted: "#C2B19C", accent: "#E2BB8E", logo: "#000000" },
      logo: "img/cl/shea/logo.webp", logoNote: true,
      about: { en: "A shea butter skincare brand. I designed their social media: product posts with a calm, premium mood and a dark, textured look.", ar: "علامة تجارية لمنتجات العناية بزبدة الشيا. صمّمتُ محتوى وسائل التواصل: منشورات للمنتجات بأجواء هادئة وفاخرة وطابع داكن." },
      meta: { en: ["Link client", "Social media"], ar: ["عميل لدى Link", "وسائل التواصل"] },
      sections: [ { type: "social", cols: 5, t: { en: "Social media", ar: "وسائل التواصل" }, items: [1,2,3,4,5,6,7,8,9,10].map(i => ({ src: "img/cl/shea/s" + i + ".webp" })) } ] },
    { id: "ghaith", name: { en: "Ghaith Bakeries", ar: "مخابز غيث" }, cover: "img/cl/ghaith/s3.webp",
      tag: { en: "Menu · Social media", ar: "قائمة المنتجات · وسائل التواصل" },
      theme: { bg: "#2a0a10", fg: "#F8EBD9", muted: "#D7B9A4", accent: "#E9C08A", logo: "#F6E7CF" },
      logo: "img/cl/ghaith/logo.webp", logoNote: true,
      about: { en: "A bakery of breads, pastries, cakes and oriental sweets. I designed their printed product menu and their social media campaigns.", ar: "مخابز للخبز والمعجنات والكيك والحلويات الشرقية. صمّمتُ قائمة المنتجات المطبوعة وحملات وسائل التواصل." },
      meta: { en: ["Link client", "Print menu", "Social media"], ar: ["عميل لدى Link", "قائمة مطبوعة", "وسائل التواصل"] },
      sections: [
        { type: "social", t: { en: "Social media", ar: "وسائل التواصل" }, s: { en: "Warm, appetizing product posts with one consistent layout.", ar: "منشورات دافئة وشهية للمنتجات بتخطيط موحّد." }, items: [1,2,3,4,5,6].map(i => ({ src: "img/cl/ghaith/s" + i + ".webp" })) },
        { type: "menu", t: { en: "Product menu · 8 pages", ar: "قائمة المنتجات · ٨ صفحات" }, s: { en: "Hundreds of items organized by category, with clear prices and units. Swipe through the pages.", ar: "مئات الأصناف مرتّبة حسب الفئات، بأسعار ووحدات واضحة. اسحب لتصفّح الصفحات." }, items: [1,2,3,4,5,6,7,8].map(i => ({ src: "img/cl/ghaith/m" + i + ".webp" })) }
      ] },
    { id: "fresh", name: { en: "Fresh & Tasty", ar: "ملحمة فريش آند تيستي" }, cover: "img/cl/fresh/f2.webp",
      tag: { en: "Packaging · Uniform", ar: "تغليف · زيّ الموظفين" },
      theme: { bg: "#140707", fg: "#FBF1F0", muted: "#C9A9A6", accent: "#E2232A", logo: "#ffffff" },
      about: { en: "A butchery specialized in fresh meat. I designed their take-away packaging system in three sizes and several colorways, with print-ready dielines, plus the staff aprons.", ar: "ملحمة متخصصة باللحوم الطازجة. صمّمتُ نظام علب التغليف بثلاثة أحجام وعدة ألوان، مع قوالب جاهزة للطباعة، إضافةً إلى مرايل الموظفين." },
      meta: { en: ["Link client", "Packaging", "Dielines", "Uniform"], ar: ["عميل لدى Link", "تغليف", "قوالب طباعة", "زيّ الموظفين"] },
      sections: [
        { type: "wide", t: { en: "The box range", ar: "مجموعة العلب" }, s: { en: "One gable box, several colorways, so every product line is recognizable at a glance.", ar: "علبة واحدة بعدة ألوان، ليُعرف كل خط منتجات من النظرة الأولى." }, items: [ { src: "img/cl/fresh/f1.webp", full: 1 }, { src: "img/cl/fresh/f2.webp" }, { src: "img/cl/fresh/f3.webp" }, { src: "img/cl/fresh/f5.webp" }, { src: "img/cl/fresh/f6.webp" }, { src: "img/cl/fresh/f4.webp" }, { src: "img/cl/fresh/f7.webp" } ] },
        { type: "wide", t: { en: "Print-ready dielines · S / M / L", ar: "قوالب الطباعة · صغير / وسط / كبير" }, s: { en: "Dielines with folding handles so boxes stack on each other.", ar: "قوالب بمقابض قابلة للطي، لتُرصّ العلب فوق بعضها." }, items: [ { src: "img/cl/fresh/f17.webp", full: 1 }, { src: "img/cl/fresh/f13.webp" }, { src: "img/cl/fresh/f14.webp" }, { src: "img/cl/fresh/f12.webp" }, { src: "img/cl/fresh/f15.webp" } ] },
        { type: "wide", t: { en: "Staff aprons", ar: "مرايل الموظفين" }, s: { en: "The brand’s stripes carried onto the shop floor.", ar: "خطوط الهوية تنتقل إلى أرض المحل." }, items: [ { src: "img/cl/fresh/f8.webp" }, { src: "img/cl/fresh/f9.webp" }, { src: "img/cl/fresh/f10.webp", full: 1 } ] }
      ] },
    { id: "yalda", name: { en: "YALDA Chocolate", ar: "يلدا للشوكولاتة" }, cover: "img/cl/yalda/tub-dark.webp", coverFit: "contain", coverBg: "radial-gradient(circle at 50% 60%,#5a3620,#1a0f08 70%)",
      tag: { en: "Packaging · 5 flavors", ar: "تغليف · ٥ نكهات" },
      theme: { bg: "#140c08", fg: "#FBF3EA", muted: "#CDB6A0", accent: "#D7A75B", logo: "#2a1a10" },
      about: { en: "Wrap-around labels for 5 kg tubs of chocolate cream: one identity, five flavors, each with its own color world. Locally made.", ar: "ملصقات دائرية لعبوات كريمة الشوكولاتة بسعة ٥ كغ: هوية واحدة وخمس نكهات، لكل نكهة عالمها اللوني الخاص. منتج محلي." },
      meta: { en: ["Link client", "Label design", "5 kg tub"], ar: ["عميل لدى Link", "تصميم ملصقات", "عبوة ٥ كغ"] },
      sections: [ { type: "tubs", t: { en: "Pick a flavor", ar: "اختر النكهة" }, s: { en: "Drag the tub to spin it.", ar: "اسحب العبوة لتدويرها." } } ] },
    { id: "hadaya", name: { en: "Hadaya", ar: "هدايا" }, cover: "img/work/p17.webp",
      tag: { en: "App · Website", ar: "تطبيق · موقع" },
      theme: { bg: "#1d0a10", fg: "#FFF1F3", muted: "#D8AEB7", accent: "#E8456A", logo: "#ffffff" },
      about: { en: "A gifts and party-services marketplace. I designed the mobile app and the website across every stage, from research to final UI.", ar: "سوق للهدايا وخدمات الحفلات. صمّمتُ تطبيق الهاتف والموقع الإلكتروني في جميع المراحل، من البحث حتى الواجهة النهائية." },
      meta: { en: ["Link client", "Mobile app", "Website"], ar: ["عميل لدى Link", "تطبيق هاتف", "موقع إلكتروني"] },
      sections: [ { type: "wide", t: { en: "App & website", ar: "التطبيق والموقع" }, items: [{ src: "img/work/p17.webp", full: 1 }] } ] },
    { id: "qeem", name: { en: "Qeem Real Estate", ar: "قيم العقارية" }, cover: "img/work/p10.webp",
      tag: { en: "Social · Outdoor", ar: "وسائل التواصل · إعلانات خارجية" },
      theme: { bg: "#06191c", fg: "#ECF8F8", muted: "#9CC3C5", accent: "#2FB7B0", logo: "#ffffff" },
      about: { en: "A Saudi real estate investment and auctions company. During six months on site I designed the advertising for properties and public auctions, following INFATH guidelines.", ar: "شركة سعودية للاستثمار العقاري والمزادات. خلال ستة أشهر من العمل لديها، صمّمتُ الإعلانات الخاصة بالعقارات والمزادات العلنية وفق متطلبات (إنفاذ)." },
      meta: { en: ["Former employer", "Saudi Arabia", "Social media", "Billboards"], ar: ["جهة عمل سابقة", "السعودية", "وسائل التواصل", "لوحات إعلانية"] },
      sections: [ { type: "wide", t: { en: "Social media", ar: "وسائل التواصل" }, items: [{ src: "img/work/p10.webp", full: 1 }] }, { type: "wide", t: { en: "Outdoor billboards", ar: "اللوحات الإعلانية الخارجية" }, items: [{ src: "img/work/p11.webp", full: 1 }] } ] }
  ],

  FLAVORS: [
    { k: "dark", en: "Dark chocolate", ar: "الشوكولاتة الداكنة", bg: "#24160d", glow: "#7a4a2a", lid: "#3a2416", fg: "#FBF3EA", sw: "#4a2c1a" },
    { k: "white", en: "White chocolate", ar: "الشوكولاتة البيضاء", bg: "#e9e2d6", glow: "#ffffff", lid: "#f3ede4", fg: "#2a1d12", sw: "#f2ead9" },
    { k: "hazelnut", en: "Hazelnut", ar: "البندق", bg: "#5a3a24", glow: "#c08a5a", lid: "#6b4529", fg: "#FBF3EA", sw: "#9a6a42" },
    { k: "pistachio", en: "Pistachio", ar: "الفستق الحلبي", bg: "#0f3a22", glow: "#3f9a5a", lid: "#14452a", fg: "#F1FBF4", sw: "#3c8a52" },
    { k: "lotus", en: "Lotus", ar: "اللوتس", bg: "#8a4416", glow: "#e0893d", lid: "#9c5220", fg: "#FFF6EC", sw: "#c9772f" }
  ],

  WORK: [
    [4, "brand", "free", "Logofolio · Thirsty Camel, Sahab, Competition Hub and more", "مجموعة شعارات · Thirsty Camel وسحاب و Competition Hub وغيرها"],
    [19, "ui", "link", "She Glow — app & website", "She Glow — تطبيق وموقع"],
    [5, "brand", "free", "Abaya — brand & campaign", "عباية — هوية وحملة"],
    [9, "brand", "link", "Zait Sanabel — logo & packaging", "زيت سنابل — شعار وتغليف"],
    [6, "brand", "free", "NF Esports — team kit", "NF Esports — زيّ الفريق"],
    [12, "social", "link", "AWJ Travel & Tourism — social", "أوج للسياحة والسفر — وسائل التواصل"],
    [23, "print", "free", "Atr Al Thahab — perfume packaging & outdoor", "عطر الذهب — تغليف وإعلانات خارجية"],
    [21, "print", "free", "90 Al-La’eeb — stationery & print", "90 اللعيب — قرطاسية ومطبوعات"],
    [24, "social", "free", "Restaurant campaigns", "حملات مطاعم"],
    [25, "social", "free", "Social media posts", "منشورات وسائل التواصل"],
    [22, "print", "free", "Book covers · Magic Knife & Assassin Decision", "أغلفة كتب · الخنجر السحري وقرار مأجور"]
  ]
};
