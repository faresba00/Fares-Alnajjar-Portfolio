/* Flipbook — StPageFlip (page-flip 2.0.7) wrapped for RTL reading, hard covers, page-edge thickness, gloss cover, counter, thumbnails and zoom. */
window.Book = (function () {
  "use strict";
  const SRC = "https://cdn.jsdelivr.net/npm/page-flip@2.0.7/dist/js/page-flip.browser.js";
  let loading = null;
  function ensure() {
    if (window.St && window.St.PageFlip) return Promise.resolve();
    if (loading) return loading;
    loading = new Promise((res, rej) => { const s = document.createElement("script"); s.src = SRC; s.onload = res; s.onerror = rej; document.head.appendChild(s); });
    return loading;
  }
  const ico = {
    prev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M15 6l-6 6 6 6"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 6l6 6-6 6"/></svg>',
    zoom: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4M11 8v6M8 11h6"/></svg>'
  };

  /* opts: { pages:[url...] in READING order (cover first, back last), w, h (page px ratio), rtl, labels:{page, of, cover, back, hint}, onZoom(list, idx) } */
  function mount(root, opts) {
    const N = opts.pages.length, rtl = !!opts.rtl;
    const order = rtl ? opts.pages.slice().reverse() : opts.pages.slice();   // physical (LTR engine) order
    const toRead = i => (rtl ? N - 1 - i : i);                                // engine index -> reading index
    const toEng = r => (rtl ? N - 1 - r : r);
    root.classList.add("bk");
    root.innerHTML = `
      <div class="bk-stage">
        <div class="bk-shift"><div class="bk-edges"><i class="bk-el"></i><i class="bk-er"></i></div><div class="bk-book"></div></div>
      </div>
      <div class="bk-ui">
        <button class="ib bk-a" type="button" aria-label="${opts.labels.prevLbl}">${ico.prev}</button>
        <div class="bk-count" aria-live="polite"></div>
        <button class="ib bk-b" type="button" aria-label="${opts.labels.nextLbl}">${ico.next}</button>
        <button class="ib bk-z" type="button" aria-label="${opts.labels.zoom}">${ico.zoom}</button>
      </div>
      <div class="bk-thumbs" dir="${rtl ? "rtl" : "ltr"}"></div>
      <p class="bk-hint">${opts.labels.hint}</p>`;
    const bookEl = root.querySelector(".bk-book"), shift = root.querySelector(".bk-shift");
    const el = root.querySelector(".bk-el"), er = root.querySelector(".bk-er");
    order.forEach((src, i) => {
      const d = document.createElement("div");
      const hard = i === 0 || i === N - 1;
      d.className = "bk-page" + (hard ? " bk-hard" : "");
      if (hard) d.setAttribute("data-density", "hard");
      const r = toRead(i);
      d.innerHTML = `<img src="${src}" alt="" ${r < 4 || r > N - 3 ? "" : 'loading="lazy"'} draggable="false">${r === 0 ? '<i class="bk-gloss"></i>' : ""}<i class="bk-paper"></i>`;
      bookEl.appendChild(d);
    });
    const thumbs = root.querySelector(".bk-thumbs");
    thumbs.innerHTML = opts.pages.map((src, r) => `<button type="button" data-r="${r}" aria-label="${r + 1}"><img src="${src}" alt="" loading="lazy"></button>`).join("");

    const pf = new St.PageFlip(bookEl, {
      width: opts.w, height: opts.h, size: "stretch",
      minWidth: 280, maxWidth: 900, minHeight: 140, maxHeight: 1200,
      maxShadowOpacity: 0.55, showCover: true, drawShadow: true,
      flippingTime: 900, usePortrait: true, mobileScrollSupport: true,
      swipeDistance: 24, showPageCorners: true, startPage: rtl ? N - 1 : 0, autoSize: true
    });
    pf.loadFromHTML(bookEl.querySelectorAll(".bk-page"));

    const cnt = root.querySelector(".bk-count");
    function readIdx() { return toRead(pf.getCurrentPageIndex()); }
    function update() {
      const e = pf.getCurrentPageIndex(), r = toRead(e), portrait = pf.getOrientation() === "portrait";
      // centre a closed book (cover or back alone)
      let tx = 0;
      if (!portrait) { if (e === 0) tx = -25; else if (e === N - 1) tx = 25; }
      shift.style.transform = `translateX(${tx}%)`;
      // page-edge stacks: thickness proportional to pages on each side
      const leftPages = portrait ? 0 : e, rightPages = portrait ? 0 : N - 1 - e;
      const k = Math.min(10, 2 + N / 6);
      el.style.width = (e === 0 || portrait ? 0 : Math.max(1.5, (leftPages / N) * k)) + "px";
      er.style.width = (e === N - 1 || portrait ? 0 : Math.max(1.5, (rightPages / N) * k)) + "px";
      root.classList.toggle("bk-closed", !portrait && (e === 0 || e === N - 1));
      const off = opts.offset || 0, tot = N - 2 - off, num = x => String(x - off).padStart(2, "0"), iso = t => "\u2066" + t + "\u2069";
      let label;
      if (r === 0) label = opts.labels.cover;
      else if (r === N - 1) label = opts.labels.back;
      else if (portrait) label = r <= off ? opts.labels.intro : `${opts.labels.page} ${iso(num(r))} ${opts.labels.of} ${iso(tot)}`;
      else { const a = r % 2 === 1 ? r : r - 1; label = a + 1 <= off ? opts.labels.intro : `${opts.labels.pages} ${iso(num(Math.max(a, off + 1)) + "–" + num(Math.min(a + 1, N - 2)))} ${opts.labels.of} ${iso(tot)}`; }
      cnt.textContent = label;
      const pair = x => (x === 0 || x === N - 1) ? x : (x % 2 === 1 ? x : x - 1);
      thumbs.querySelectorAll("button").forEach(b => { const br = +b.dataset.r; b.classList.toggle("on", portrait ? br === r : pair(br) === pair(r)); });
      const on = thumbs.querySelector("button.on"); if (on && root.offsetParent) { const tr = thumbs.getBoundingClientRect(), br = on.getBoundingClientRect(); if (br.left < tr.left || br.right > tr.right) thumbs.scrollBy({ left: br.left - tr.left - tr.width / 2 + br.width / 2, behavior: "smooth" }); }
    }
    pf.on("flip", update); pf.on("changeOrientation", () => setTimeout(update, 30)); pf.on("init", update);
    setTimeout(update, 60);
    // reading-direction aware controls: "a" is the visually-left button
    const back = () => (rtl ? pf.flipNext() : pf.flipPrev()), fwd = () => (rtl ? pf.flipPrev() : pf.flipNext());
    root.querySelector(".bk-a").onclick = () => (rtl ? fwd() : back());   // left arrow: RTL → forward
    root.querySelector(".bk-b").onclick = () => (rtl ? back() : fwd());
    root.querySelector(".bk-z").onclick = () => opts.onZoom && opts.onZoom(opts.pages, readIdx());
    thumbs.addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; const r = +b.dataset.r; pf.flip(toEng(r)); });
    function key(e) {
      if (!root.isConnected || !root.offsetParent) return;
      const r = root.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return;
      if (e.key === "ArrowLeft") { e.preventDefault(); root.querySelector(".bk-a").click(); }
      if (e.key === "ArrowRight") { e.preventDefault(); root.querySelector(".bk-b").click(); }
    }
    addEventListener("keydown", key);
    return { destroy() { removeEventListener("keydown", key); try { pf.destroy(); } catch (e) {} }, pf };
  }
  return { ensure, mount };
})();
