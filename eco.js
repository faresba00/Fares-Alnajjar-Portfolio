/* Link ECO — the same storefront, re-skinned for a clothing brand.
   Built in code on the restaurant layout: web pages at 1200px, app at 390px, Arabic RTL. */
window.EcoClothing = (function () {
  "use strict";
  // ---------- garment illustrations (flat, original) ----------
  function shade(hex, a) {
    const n = parseInt(hex.slice(1), 16); let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    const f = c => Math.max(0, Math.min(255, Math.round(a < 0 ? c * (1 + a) : c + (255 - c) * a)));
    return `rgb(${f(r)},${f(g)},${f(b)})`;
  }
  const SHAPES = {
    tee: c => `<path d="M62 40 L38 52 L22 84 L44 94 L52 78 L52 168 L148 168 L148 78 L156 94 L178 84 L162 52 L138 40 Q120 56 100 56 Q80 56 62 40Z" fill="${c}"/><path d="M62 40 Q80 56 100 56 Q120 56 138 40 L132 37 Q118 48 100 48 Q82 48 68 37Z" fill="${shade(c, -.25)}"/><path d="M52 78 L52 168 L70 168 L70 70Z" fill="${shade(c, -.12)}"/>`,
    hoodie: c => `<path d="M60 46 L34 60 L18 140 L40 146 L52 96 L52 172 L148 172 L148 96 L160 146 L182 140 L166 60 L140 46 Q100 70 60 46Z" fill="${c}"/><path d="M64 46 Q70 18 100 16 Q130 18 136 46 Q120 62 100 62 Q80 62 64 46Z" fill="${shade(c, -.18)}"/><path d="M78 44 Q100 58 122 44 Q118 30 100 28 Q82 30 78 44Z" fill="${shade(c, -.45)}"/><path d="M74 122 L126 122 L132 150 L68 150Z" fill="${shade(c, -.12)}"/><path d="M92 60 L90 92 M108 60 L110 92" stroke="${shade(c, .55)}" stroke-width="3" stroke-linecap="round"/>`,
    dress: c => `<path d="M78 22 L86 22 Q90 40 100 40 Q110 40 114 22 L122 22 L126 64 Q118 76 118 84 L160 176 L40 176 L82 84 Q82 76 74 64Z" fill="${c}"/><path d="M74 64 Q100 76 126 64 L124 80 Q100 90 76 80Z" fill="${shade(c, -.3)}"/><path d="M82 84 L40 176 L70 176 L94 90Z" fill="${shade(c, -.12)}"/><path d="M118 84 L160 176 L146 176 L112 92Z" fill="${shade(c, .14)}"/>`,
    jacket: c => `<path d="M60 36 L30 52 L20 150 L44 156 L52 94 L52 172 L148 172 L148 94 L156 156 L180 150 L170 52 L140 36 L120 30 L100 70 L80 30Z" fill="${c}"/><path d="M80 30 L100 70 L88 92 L66 44Z M120 30 L100 70 L112 92 L134 44Z" fill="${shade(c, -.3)}"/><path d="M100 70 L100 172" stroke="${shade(c, -.45)}" stroke-width="3"/><circle cx="92" cy="104" r="3" fill="${shade(c, .5)}"/><circle cx="92" cy="128" r="3" fill="${shade(c, .5)}"/><path d="M60 126 L84 126" stroke="${shade(c, -.3)}" stroke-width="3"/><path d="M116 126 L140 126" stroke="${shade(c, -.3)}" stroke-width="3"/>`,
    jeans: c => `<path d="M60 20 L140 20 L148 180 L110 180 L100 76 L90 180 L52 180Z" fill="${c}"/><path d="M60 20 L140 20 L141 34 L59 34Z" fill="${shade(c, -.25)}"/><path d="M100 34 L100 76" stroke="${shade(c, -.4)}" stroke-width="2.5"/><path d="M66 40 Q74 62 92 52 M134 40 Q126 62 108 52" stroke="${shade(c, .35)}" stroke-width="2.5" fill="none"/><path d="M52 180 L58 120 L72 120 L66 180Z" fill="${shade(c, -.12)}"/>`,
    sneaker: c => `<path d="M24 120 Q30 80 64 76 L96 74 Q110 96 140 100 L170 108 Q186 114 184 132 L184 140 L22 140 Q18 132 24 120Z" fill="${c}"/><path d="M20 140 L186 140 L186 152 Q186 158 178 158 L28 158 Q20 158 20 150Z" fill="#f4f1ea"/><path d="M20 146 L186 146" stroke="#d9d3c7" stroke-width="2"/><path d="M64 76 L96 74 Q104 90 118 96 L88 102 Q70 94 64 76Z" fill="${shade(c, -.2)}"/><path d="M84 92 L104 86 M90 100 L112 92 M96 108 L120 100" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M130 112 Q150 118 172 120" stroke="${shade(c, .45)}" stroke-width="4" fill="none" stroke-linecap="round"/>`,
    bag: c => `<path d="M70 70 Q70 30 100 30 Q130 30 130 70" stroke="${shade(c, -.35)}" stroke-width="7" fill="none"/><path d="M40 70 L160 70 L150 176 L50 176Z" fill="${c}"/><path d="M40 70 L160 70 L158 86 L42 86Z" fill="${shade(c, -.2)}"/><rect x="88" y="104" width="24" height="16" rx="3" fill="${shade(c, .5)}"/>`,
    cap: c => `<path d="M40 120 Q40 56 100 56 Q160 56 160 120Z" fill="${c}"/><path d="M40 120 L176 120 Q186 124 176 134 L40 134Z" fill="${shade(c, -.25)}"/><circle cx="100" cy="56" r="7" fill="${shade(c, -.3)}"/><path d="M100 60 L100 120 M70 66 Q84 92 84 120 M130 66 Q116 92 116 120" stroke="${shade(c, -.15)}" stroke-width="2" fill="none"/>`,
    shirt: c => `<path d="M64 36 L36 50 L22 140 L44 146 L52 92 L52 172 L148 172 L148 92 L156 146 L178 140 L164 50 L136 36 L120 32 L100 52 L80 32Z" fill="${c}"/><path d="M80 32 L100 52 L92 64 L74 40Z M120 32 L100 52 L108 64 L126 40Z" fill="#fff" opacity=".9"/><path d="M100 52 L100 172" stroke="${shade(c, -.25)}" stroke-width="2"/><circle cx="104" cy="80" r="2.6" fill="#fff"/><circle cx="104" cy="104" r="2.6" fill="#fff"/><circle cx="104" cy="128" r="2.6" fill="#fff"/><path d="M118 70 L136 70 L136 86 L118 86Z" fill="${shade(c, -.12)}"/>`
  };
  function art(kind, color, bg, opt) {
    opt = opt || {};
    return `<svg class="g-art" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" aria-hidden="true" style="background:${bg}">
      <ellipse cx="100" cy="${kind === "sneaker" ? 162 : 186}" rx="70" ry="8" fill="rgba(0,0,0,.08)"/>${SHAPES[kind](color)}</svg>`;
  }
  // ---------- data ----------
  const P = [
    { n: "هودي أوفرسايز", k: "hoodie", c: "#2B3A67", bg: "#E7EAF3", p: "24.900", o: "29.900", d: "قطن ثقيل بقبعة وجيب أمامي، قصّة واسعة.", cat: "رجالي", tag: "الأكثر مبيعًا" },
    { n: "فستان صيفي", k: "dress", c: "#C2604B", bg: "#F6E6E0", p: "32.500", d: "قماش كتان خفيف بخصر مشدود وتنورة واسعة.", cat: "نسائي", tag: "جديد" },
    { n: "جاكيت دنيم", k: "jacket", c: "#4F6D8F", bg: "#E3EAF1", p: "39.000", d: "دنيم مغسول بأزرار معدنية وجيبين.", cat: "رجالي" },
    { n: "تيشيرت قطن", k: "tee", c: "#E8B24A", bg: "#FBF0D9", p: "9.900", o: "12.500", d: "قطن ١٠٠٪ بياقة دائرية، مريح لكل يوم.", cat: "رجالي", tag: "عرض" },
    { n: "قميص أكسفورد", k: "shirt", c: "#7FA3C4", bg: "#E6EEF6", p: "19.500", d: "قماش أكسفورد بياقة بأزرار، قصّة مستقيمة.", cat: "رجالي" },
    { n: "بنطال جينز", k: "jeans", c: "#344E7A", bg: "#E2E7F0", p: "27.000", d: "جينز مرن بقصّة مستقيمة وخصر متوسط.", cat: "نسائي" },
    { n: "حذاء رياضي", k: "sneaker", c: "#1F8A70", bg: "#DFF1EB", p: "45.000", o: "52.000", d: "نعل خفيف ومريح، مناسب للمشي والجري.", cat: "أحذية", tag: "عرض" },
    { n: "حقيبة توت", k: "bag", c: "#B88A5A", bg: "#F3E9DD", p: "14.500", d: "قماش كانفاس متين بحمّالات طويلة.", cat: "إكسسوارات" },
    { n: "قبعة بيسبول", k: "cap", c: "#3C3C3C", bg: "#ECECEC", p: "7.500", d: "قطن بإبزيم خلفي قابل للتعديل.", cat: "إكسسوارات" },
    { n: "هودي أطفال", k: "hoodie", c: "#E07A9A", bg: "#FBE7EE", p: "16.000", d: "قطن ناعم بقبعة، مقاسات من ٢ إلى ١٢ سنة.", cat: "أطفال", tag: "جديد" }
  ];
  const CATS = [["رجالي", "shirt", "#2B3A67", "#E7EAF3"], ["نسائي", "dress", "#C2604B", "#F6E6E0"], ["أطفال", "hoodie", "#E07A9A", "#FBE7EE"], ["أحذية", "sneaker", "#1F8A70", "#DFF1EB"], ["إكسسوارات", "bag", "#B88A5A", "#F3E9DD"], ["رياضي", "tee", "#E8B24A", "#FBF0D9"], ["جاكيتات", "jacket", "#4F6D8F", "#E3EAF1"], ["جينز", "jeans", "#344E7A", "#E2E7F0"], ["قبعات", "cap", "#3C3C3C", "#ECECEC"], ["قمصان", "shirt", "#7FA3C4", "#E6EEF6"]];
  const I = {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>',
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 8h14l-1 12H6z"/><path d="M9 8a3 3 0 016 0"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4.5-6 8-6s7 2 8 6"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11l9-7 9 7v9H3z"/></svg>',
    grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></svg>',
    list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-6 7-12a7 7 0 00-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>',
    bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 16V11a6 6 0 0112 0v5l2 2H4z"/><path d="M10 20a2 2 0 004 0"/></svg>',
    truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 7h14M9 7V4h6v3M7 7l1 13h8l1-13"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 12l5 5 9-10"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="#E8B24A"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg>'
  };
  const stars = n => `<span class="ec-stars">${I.star.repeat(n)}</span>`;
  const price = (p, o) => `<b class="ec-price">${p} د.أ</b>${o ? `<s class="ec-old">${o}</s>` : ""}`;
  const logo = `<span class="ec-logo"><b>Link</b><i>ECO</i></span>`;

  // ---------- WEB (1200px) ----------
  const webHead = active => `<header class="w-top"><div class="w-in">${logo}
      <nav>${["الرئيسية", "المتجر", "العروض", "من نحن", "تواصل معنا"].map(x => `<a class="${x === active ? "on" : ""}">${x}</a>`).join("")}</nav>
      <div class="w-search">${I.search}<span>ابحث عن قطعة، ماركة، أو مقاس...</span></div>
      <div class="w-ic">${I.heart}<span class="w-bag">${I.bag}<em>3</em></span>${I.user}</div></div></header>
    <div class="w-sub"><div class="w-in"><span class="w-chip">${I.truck} توصيل مجاني فوق ٣٠ د.أ</span><span class="w-chip">${I.pin} فرع عبدون · مفتوح حتى ١٠:٠٠ م</span><span class="w-chip ok">إرجاع مجاني خلال ١٤ يومًا</span></div></div>`;
  const webFoot = `<footer class="w-foot"><div class="w-in"><div>${logo}<p>متجر أزياء أردني، تشكيلات جديدة كل موسم وتوصيل لكل المحافظات.</p></div>
      ${[["تسوّق", ["رجالي", "نسائي", "أطفال", "أحذية"]], ["حسابي", ["طلباتي", "المفضلة", "العناوين", "الإعدادات"]], ["المساعدة", ["الشحن", "الإرجاع", "دليل المقاسات", "الأسئلة الشائعة"]], ["تواصل معنا", ["06 500 0000", "hello@linkeco.jo", "عمّان، الأردن"]]].map(([h, l]) => `<div><h5>${h}</h5>${l.map(x => `<a>${x}</a>`).join("")}</div>`).join("")}</div>
      <div class="w-in w-copy">© 2026 Link ECO · تم التطوير بواسطة Link</div></footer>`;
  const card = (x, big) => `<div class="w-card${big ? " big" : ""}"><div class="w-im">${art(x.k, x.c, x.bg)}${x.tag ? `<span class="w-tag">${x.tag}</span>` : ""}<span class="w-fav">${I.heart}</span></div><div class="w-cb"><h6>${x.n}</h6><p>${x.d}</p><div class="w-row">${price(x.p, x.o)}<span class="w-add">+</span></div></div></div>`;

  function webHome() {
    return `<div class="ec-web">${webHead("الرئيسية")}
    <section class="w-hero"><div class="w-in"><div class="w-ht"><span class="w-kick">تشكيلة الشتاء ٢٠٢٦</span><h1>دفء يليق بك،<br>وأناقة لكل يوم.</h1><p>قطع مختارة بخامات مريحة وقصّات عصرية، تصلك لباب البيت خلال ٢٤ ساعة.</p><div class="w-btns"><a class="w-b pri">تسوّق الآن</a><a class="w-b">اكتشف التشكيلة</a></div>
      <div class="w-stats"><div><b>+١٢٠٠</b><span>قطعة</span></div><div><b>٢٤ ساعة</b><span>توصيل</span></div><div><b>٤.٩</b><span>تقييم العملاء</span></div></div></div>
      <div class="w-collage">${art("jacket", "#C9A46A", "transparent")}${art("hoodie", "#E7EAF3", "transparent")}${art("sneaker", "#E8B24A", "transparent")}</div></div></section>
    <section class="w-sec"><div class="w-in w-about"><div class="w-ab-img">${art("dress", "#C2604B", "#F6E6E0")}${art("shirt", "#7FA3C4", "#E6EEF6")}</div>
      <div><span class="w-kick">قصّتنا</span><h2>بدأنا بمحل صغير في عبدون</h2><p>من قطعة واحدة إلى أكثر من ألف قطعة. نختار الخامات بأنفسنا، ونجرّب كل قصّة قبل أن تصل إليك.</p>
      <div class="w-feat"><div><b>خامات مختارة</b><span>قطن وكتان ودنيم بجودة عالية.</span></div><div><b>مقاسات دقيقة</b><span>دليل مقاسات لكل قطعة.</span></div></div></div></div></section>
    <section class="w-sec"><div class="w-in"><div class="w-sh"><div><span class="w-kick">الأكثر طلبًا</span><h2>الأكثر طلبًا عند زبائننا</h2></div><a class="w-more">عرض الكل</a></div>
      <div class="w-g3">${[P[0], P[1], P[6]].map(x => card(x, 1)).join("")}</div></div></section>
    <section class="w-band"><div class="w-in">${[["+١٢٬٠٠٠", "عميل سعيد"], ["٣", "فروع في عمّان"], ["٤.٩ ★", "متوسط التقييم"], ["٢٤ ساعة", "مدة التوصيل"]].map(([a, b]) => `<div><b>${a}</b><span>${b}</span></div>`).join("")}</div></section>
    <section class="w-sec"><div class="w-in"><div class="w-sh"><div><span class="w-kick">فروعنا</span><h2>أقرب فرع إلك</h2></div></div>
      <div class="w-g3">${[["عبدون", "شارع عبدون الرئيسي", "#2B3A67"], ["الصويفية", "مجمّع الصويفية التجاري", "#C2604B"], ["إربد", "شارع الجامعة", "#1F8A70"]].map(([a, b, c]) => `<div class="w-branch"><div class="w-store" style="--c:${c}"><i></i><i></i><i></i><span>Link ECO</span></div><div class="w-cb"><h6>${a}</h6><p>${I.pin} ${b}</p><p>مفتوح ١٠:٠٠ ص – ١٠:٠٠ م</p><a class="w-b out">اطلب من هذا الفرع</a></div></div>`).join("")}</div></div></section>
    <section class="w-sec"><div class="w-in"><div class="w-sh"><div><span class="w-kick">آراء العملاء</span><h2>كلام زبائننا أصدق من كلامنا</h2></div></div>
      <div class="w-g3">${[["المقاس مضبوط والخامة أحسن من الصور.", "سارة"], ["وصل الطلب ثاني يوم، والتغليف مرتب.", "أحمد"], ["الإرجاع كان سهل جدًا، وما في ولا سؤال.", "لين"]].map(([t, n]) => `<div class="w-rev">${stars(5)}<p>${t}</p><b>${n}</b></div>`).join("")}</div></div></section>
    <section class="w-sec"><div class="w-in"><div class="w-promo"><div><h3>خصم ٢٠٪ على أول طلب</h3><p>استخدم الكود WELCOME20 عند الدفع.</p></div><a class="w-b pri">ابدأ التسوّق</a>${art("bag", "#C9A46A", "transparent")}</div></div></section>
    ${webFoot}</div>`;
  }
  function webShop() {
    const g = list => `<div class="w-g5">${list.map(x => card(x)).join("")}</div>`;
    return `<div class="ec-web">${webHead("المتجر")}
    <div class="w-in w-shop"><aside class="w-side"><h6>الأصناف</h6>${CATS.slice(0, 8).map((c, i) => `<a class="${i === 0 ? "on" : ""}"><span class="w-cat">${art(c[1], c[2], c[3])}</span>${c[0]}<em>${8 + i * 3}</em></a>`).join("")}</aside>
      <div class="w-main"><div class="w-banners"><div class="w-ban" style="--b:#2B3A67">${art("jacket", "#C9A46A", "transparent")}<div><b>تشكيلة الجاكيتات</b><span>خصم حتى ٣٠٪</span><a class="w-b pri sm">تسوّق</a></div></div><div class="w-ban" style="--b:#C2604B">${art("dress", "#F6E6E0", "transparent")}<div><b>فساتين الموسم</b><span>وصلت حديثًا</span></div></div></div>
      <div class="w-strip">${[["توصيل مجاني", "فوق ٣٠ د.أ"], ["إرجاع مجاني", "خلال ١٤ يومًا"], ["دفع آمن", "بطاقة أو عند الاستلام"]].map(([a, b]) => `<div><b>${a}</b><span>${b}</span></div>`).join("")}</div>
      <div class="w-sh"><div><span class="w-kick">العروض</span><h2>عروض هذا الأسبوع</h2></div><a class="w-more">الكل</a></div>${g([P[3], P[6], P[0], P[7], P[8]])}
      <div class="w-sh"><div><span class="w-kick">رجالي</span><h2>رجالي</h2></div><a class="w-more">الكل</a></div>${g([P[4], P[2], P[0], P[3], P[8]])}
      <div class="w-sh"><div><span class="w-kick">نسائي</span><h2>نسائي</h2></div><a class="w-more">الكل</a></div>${g([P[1], P[5], P[7], P[1], P[5]])}</div></div>
    ${webFoot}</div>`;
  }
  function webProduct() {
    const x = P[0];
    return `<div class="ec-web">${webHead("المتجر")}
    <div class="w-in w-crumb">الرئيسية / المتجر / رجالي / <b>${x.n}</b></div>
    <div class="w-in w-prod"><div class="w-gal"><div class="w-big">${art(x.k, x.c, x.bg)}<span class="w-tag">${x.tag}</span></div><div class="w-thumbs">${[x.c, "#3C3C3C", "#C9A46A", "#7FA3C4"].map((c, i) => `<span class="${i ? "" : "on"}">${art("hoodie", c, x.bg)}</span>`).join("")}</div></div>
      <div class="w-info"><span class="w-pill">رجالي · جديد الموسم</span><h1>${x.n}</h1><div class="w-rate">${stars(5)} <b>4.9</b> <span>(214 تقييم)</span></div><p>${x.d} مناسب للطقس البارد، ويُغسل في الغسالة.</p>
        <div class="w-pr">${price(x.p, x.o)}<span class="w-save">وفّر ٥ د.أ</span></div><div class="w-meta"><span>${I.truck} يصلك خلال ٢٤ ساعة</span><span>${I.pin} متوفر بفرع عبدون</span></div>
        <div class="w-opt"><div class="w-oh"><b>المقاس</b><span class="req">مطلوب · اختر ١</span></div><div class="w-sizes">${["S", "M", "L", "XL", "XXL"].map(s => `<span class="${s === "L" ? "on" : ""}${s === "XXL" ? " off" : ""}">${s}</span>`).join("")}</div><a class="w-guide">دليل المقاسات</a></div>
        <div class="w-opt"><div class="w-oh"><b>اللون</b><span class="req">كحلي</span></div><div class="w-colors">${[x.c, "#3C3C3C", "#C9A46A", "#7FA3C4", "#E8E3D9"].map((c, i) => `<i class="${i ? "" : "on"}" style="background:${c}"></i>`).join("")}</div></div>
        <div class="w-opt"><div class="w-oh"><b>إضافات</b><span>اختياري</span></div>${[["تغليف هدية", "+1.500"], ["تطريز الاسم", "+3.000"]].map(([a, b], i) => `<label class="w-radio${i ? "" : " on"}"><i>${i ? "" : I.check}</i>${a}<em>${b} د.أ</em></label>`).join("")}</div>
        <div class="w-buy"><div class="w-qty"><span>−</span><b>1</b><span>+</span></div><a class="w-b pri lg">أضف إلى السلة · ${x.p} د.أ</a><span class="w-fav2">${I.heart}</span></div></div></div>
    <div class="w-in"><div class="w-sh"><div><span class="w-kick">التقييمات</span><h2>ماذا يقول العملاء</h2></div></div>
      <div class="w-reviews"><div class="w-score"><b>4.9</b>${stars(5)}<span>214 تقييم</span>${[92, 6, 1, 1, 0].map((v, i) => `<div class="w-bar"><em>${5 - i}</em><i><u style="width:${v}%"></u></i></div>`).join("")}</div>
      <div class="w-rl">${[["المقاس L مضبوط تمامًا، والقماش ثقيل ودافي.", "سارة"], ["لون الكحلي أحلى من الصور.", "عمر"], ["ثاني مرة بطلبه، ممتاز.", "ريم"]].map(([t, n]) => `<div class="w-rev">${stars(5)}<p>${t}</p><b>${n}</b></div>`).join("")}</div></div>
      <div class="w-sh"><div><span class="w-kick">قد يعجبك</span><h2>قطع تكمّل إطلالتك</h2></div></div><div class="w-g5">${[P[5], P[6], P[8], P[2], P[3]].map(y => card(y)).join("")}</div></div>
    ${webFoot}</div>`;
  }
  function webCart() {
    const items = [[P[0], "L · كحلي", 1], [P[6], "42 · أخضر", 1], [P[3], "M · خردلي", 2]];
    return `<div class="ec-web">${webHead("")}
    <div class="w-in w-steps">${["السلة", "معلومات التوصيل", "الدفع"].map((s, i) => `<span class="${i ? "" : "on"}"><i>${i + 1}</i>${s}</span>`).join("")}</div>
    <div class="w-in w-cart"><div class="w-items"><h2>سلة المشتريات <span>(٤ قطع)</span></h2><div class="w-addr">${I.truck}<div><b>توصيل إلى المنزل</b><span>عبدون · خلال ٢٤ ساعة</span></div><a>تغيير</a></div>
      ${items.map(([x, v, q]) => `<div class="w-it"><span class="w-ti">${art(x.k, x.c, x.bg)}</span><div><h6>${x.n}</h6><p>${v}</p><div class="w-qty sm"><span>−</span><b>${q}</b><span>+</span></div></div><div class="w-ip">${price(x.p)}<span class="w-del">${I.trash}</span></div></div>`).join("")}
      <div class="w-note"><b>ملاحظة للطلب</b><span>أضف ملاحظة للتغليف أو التوصيل...</span></div></div>
      <aside class="w-sum"><h5>ملخص الطلب</h5><div class="w-code"><span>كود الخصم</span><a>تطبيق</a></div><p class="w-ok">${I.check} توصيلك مجاني لأن طلبك فوق ٣٠ د.أ</p>
      ${[["المجموع الفرعي", "89.700"], ["خصم الموسم", "−5.000"], ["التوصيل", "مجانًا"], ["الضريبة ١٦٪", "13.552"]].map(([a, b]) => `<div class="w-sr"><span>${a}</span><b>${b}</b></div>`).join("")}
      <div class="w-sr tot"><span>الإجمالي</span><b>98.252 د.أ</b></div><a class="w-b pri lg">متابعة لإتمام الطلب</a></aside></div>
    ${webFoot}</div>`;
  }

  // ---------- APP (390px) ----------
  const status = `<div class="a-st"><b>9:41</b><span><i></i><i></i><i></i></span></div>`;
  const nav = on => `<nav class="a-nav">${[["الرئيسية", I.home], ["المتجر", I.grid], ["السلة", I.bag], ["طلباتي", I.list], ["حسابي", I.user]].map(([t, ic]) => `<a class="${t === on ? "on" : ""}">${ic}${t === "السلة" ? "<em>3</em>" : ""}<span>${t}</span></a>`).join("")}</nav>`;
  const aCard = x => `<div class="a-card"><div class="a-im">${art(x.k, x.c, x.bg)}<span class="a-fav">${I.heart}</span>${x.tag ? `<span class="a-tag">${x.tag}</span>` : ""}</div><h6>${x.n}</h6><div class="a-row">${price(x.p, x.o)}<span class="a-add">+</span></div></div>`;
  function appHome() {
    return `<div class="ec-app">${status}<div class="a-pad">
      <div class="a-hello"><span class="a-bell">${I.bell}</span><div><small>مساء الخير، فارس</small><b>${I.pin} المنزل · عبدون</b></div></div>
      <div class="a-search">${I.search}<span>ابحث عن قطعة أو ماركة...</span></div>
      <div class="a-track"><div class="a-th"><b>#2041</b><span class="a-badge">طلبك قيد التجهيز</span><a>تتبّع</a></div><div class="a-steps">${["جديد", "مقبول", "قيد التجهيز", "مع السائق", "تم التسليم"].map((s, i) => `<span class="${i < 2 ? "done" : i === 2 ? "now" : ""}"><i>${i < 2 ? I.check : ""}</i>${s}</span>`).join("")}</div></div>
      <div class="a-ban"><div><b>تشكيلة الشتاء</b><span>خصم حتى ٣٠٪ على الجاكيتات</span><a>تسوّق</a></div>${art("jacket", "#C9A46A", "transparent")}</div><div class="a-dots"><i class="on"></i><i></i><i></i></div>
      <div class="a-h"><b>الأصناف</b></div><div class="a-cats">${CATS.map(c => `<span><i>${art(c[1], c[2], c[3])}</i>${c[0]}</span>`).join("")}</div>
      <div class="a-h"><b>العروض</b><a>الكل</a></div><div class="a-g2">${[P[3], P[6]].map(aCard).join("")}</div>
      <div class="a-h"><b>الأكثر طلبًا</b></div><div class="a-g2">${[P[0], P[1], P[2], P[5]].map(aCard).join("")}</div></div>${nav("الرئيسية")}</div>`;
  }
  function appShop() {
    const row = x => `<div class="a-li"><div><h6>${x.n}</h6><p>${x.d}</p><div class="a-row">${price(x.p, x.o)}<span class="a-add">+</span></div></div><span class="a-li-im">${art(x.k, x.c, x.bg)}</span></div>`;
    return `<div class="ec-app">${status}<div class="a-pad">
      <div class="a-title"><h1>المتجر</h1><span class="a-sbtn">${I.search}</span></div><p class="a-sub"><i></i> فرع عبدون · مفتوح حتى ١٠:٠٠ م</p>
      <div class="a-chips">${["العروض", "رجالي", "نسائي", "أطفال", "أحذية", "إكسسوارات"].map((c, i) => `<span class="${i === 1 ? "on" : ""}">${c}</span>`).join("")}</div>
      <div class="a-h"><b>رجالي <small>٤ قطع</small></b></div>${[P[0], P[4], P[2], P[3]].map(row).join("")}
      <div class="a-h"><b>نسائي <small>٢ قطع</small></b></div>${[P[1], P[5]].map(row).join("")}</div>${nav("المتجر")}</div>`;
  }
  function appProduct() {
    const x = P[0];
    const opt = (t, req, rows) => `<div class="a-opt"><div class="a-oh"><b>${t}</b><span class="${req ? "req" : ""}">${req ? "مطلوب · اختر ١" : "اختياري"}</span></div>${rows}</div>`;
    return `<div class="ec-app">${status}<div class="a-hero">${art(x.k, x.c, x.bg)}</div>
      <div class="a-sheet"><div class="a-thumbs">${[x.c, "#3C3C3C", "#C9A46A"].map(c => `<span>${art("hoodie", c, x.bg)}</span>`).join("")}</div>
      <span class="a-tag2">رجالي · جديد</span><div class="a-pt"><h1>${x.n}</h1><span class="a-fav2">${I.heart}</span></div><div class="a-rate">${stars(5)} <b>4.9</b> <small>(214 تقييم)</small></div><p class="a-desc">${x.d}</p>
      <div class="a-pr">${price(x.p, x.o)}<small>${I.truck} يصلك خلال ٢٤ ساعة</small></div>
      ${opt("المقاس", 1, `<div class="a-sizes">${["S", "M", "L", "XL", "XXL"].map(s => `<span class="${s === "L" ? "on" : ""}">${s}</span>`).join("")}</div>`)}
      ${opt("اللون", 1, [["كحلي", x.c], ["أسود", "#3C3C3C"], ["رملي", "#C9A46A"]].map(([n, c], i) => `<label class="a-radio${i ? "" : " on"}"><i class="sw" style="background:${c}"></i>${n}<em>${i ? "" : "متوفر"}</em><u></u></label>`).join(""))}
      ${opt("إضافات", 0, [["تغليف هدية", "+1.500"], ["تطريز الاسم", "+3.000"]].map(([n, p], i) => `<label class="a-radio chk${i ? "" : " on"}">${n}<em>${p} د.أ</em><u>${i ? "" : I.check}</u></label>`).join(""))}
      <div class="a-total">${x.p} أساسي + 1.500 تغليف = 26.400 د.أ</div>
      <div class="a-buy"><div class="a-qty"><span>−</span><b>1</b><span>+</span></div><a>أضف إلى السلة · 26.400 د.أ</a></div></div>${nav("المتجر")}</div>`;
  }
  function appCart() {
    const items = [[P[0], "L · كحلي", 1], [P[6], "42 · أخضر", 1], [P[3], "M · خردلي", 2]];
    return `<div class="ec-app">${status}<div class="a-pad">
      <div class="a-title"><h1>السلة</h1></div><p class="a-sub">٣ منتجات · ٤ قطع</p>
      <div class="a-addr">${I.truck}<div><b>توصيل إلى المنزل</b><small>عبدون · خلال ٢٤ ساعة</small></div><a>تغيير</a></div>
      ${items.map(([x, v, q]) => `<div class="a-ci"><span class="a-li-im">${art(x.k, x.c, x.bg)}</span><div><h6>${x.n}</h6><p>${v}</p><div class="a-row"><div class="a-qty sm"><span>−</span><b>${q}</b><span>+</span></div>${price(x.p)}</div></div><span class="a-del">${I.trash}</span></div>`).join("")}
      <div class="a-code"><span>كود الخصم</span><a>تطبيق</a></div><p class="a-ok">${I.check} توصيلك مجاني لأن طلبك فوق ٣٠ د.أ</p>
      <div class="a-sum">${[["المجموع الفرعي", "89.700 د.أ"], ["خصم الموسم", "−5.000 د.أ"], ["التوصيل", "مجانًا"], ["الضريبة ١٦٪", "13.552 د.أ"]].map(([a, b]) => `<div><span>${a}</span><b>${b}</b></div>`).join("")}<div class="tot"><span>الإجمالي</span><b>98.252 د.أ</b></div></div>
      <a class="a-cta">متابعة لإتمام الطلب · 98.252 د.أ</a></div>${nav("السلة")}</div>`;
  }
  return { web: [webHome, webShop, webProduct, webCart], app: [appHome, appShop, appProduct, appCart] };
})();
