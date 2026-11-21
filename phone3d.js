/* Phone3D — a real CSS-3D phone (front glass, stacked metal sides, back) with
   live, scrollable screens that push in like a native app. Drag to turn it, it
   follows the pointer gently and eases back to its pose. */
window.Phone3D = (function () {
  "use strict";
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const DEPTH = 14; // thickness in px (stacked slices)

  function mount(root, opts) {
    const screens = opts.screens; // [{src,w,h,label:{en,ar}}]
    root.classList.add("p3");
    let slices = "";
    for (let i = 1; i < DEPTH; i++) slices += `<i class="p3-sl" style="transform:translateZ(${-i}px)"></i>`;
    root.innerHTML = `
      <div class="p3-stage">
        <div class="p3-shadow" aria-hidden="true"></div>
        <div class="p3-body">
          ${slices}
          <div class="p3-back" style="transform:translateZ(${-DEPTH}px) rotateY(180deg)"><div class="p3-cam"><i></i><i></i><i></i></div><div class="p3-logo">${opts.backLogo ? `<img src="${opts.backLogo}" alt="">` : ""}</div></div>
          <div class="p3-btn p3-b1" style="transform:translateZ(${-DEPTH / 2}px) rotateY(-90deg)"></div>
          <div class="p3-btn p3-b2" style="transform:translateZ(${-DEPTH / 2}px) rotateY(-90deg)"></div>
          <div class="p3-btn p3-b3" style="transform:translateZ(${-DEPTH / 2}px) rotateY(90deg)"></div>
          <div class="p3-front">
            <div class="p3-glass">
              <div class="p3-screens"></div>
              <div class="p3-island" aria-hidden="true"></div>
              <div class="p3-home" aria-hidden="true"></div>
              <i class="p3-glare" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>`;
    const stage = root.querySelector(".p3-stage"), body = root.querySelector(".p3-body"), host = root.querySelector(".p3-screens");
    let cur = -1, busy = false;
    function fit(el) { const h = el.querySelector(".p3-html"); if (h) h.style.zoom = (host.clientWidth || 300) / parseFloat(h.style.width); }
    const ro = new ResizeObserver(() => host.querySelectorAll(".p3-scr").forEach(fit)); ro.observe(host);
    function show(i, dir) {
      if (i === cur || busy) return;
      const s = screens[i];
      const el = document.createElement("div");
      el.className = "p3-scr";
      if (s.html) { el.innerHTML = `<div class="p3-html" style="width:${s.w || 390}px">${typeof s.html === "function" ? s.html() : s.html}</div>`; fit(el); }
      else el.innerHTML = `<img src="${s.src}" width="${s.w}" height="${s.h}" alt="${s.alt || ""}" draggable="false">`;
      const old = host.querySelector(".p3-scr.on");
      host.appendChild(el);
      cur = i;
      if (!old || RM) { el.classList.add("on"); old && old.remove(); return; }
      busy = true;
      const fwd = dir > 0;
      el.classList.add(fwd ? "in-f" : "in-b");
      requestAnimationFrame(() => requestAnimationFrame(() => {
        el.classList.add("on"); el.classList.remove("in-f", "in-b");
        old.classList.add(fwd ? "out-f" : "out-b"); old.classList.remove("on");
      }));
      setTimeout(() => { old.remove(); busy = false; }, 560);
    }
    // pose: base tilt + pointer follow + drag
    const base = { x: 6, y: opts.rtl ? 16 : -16 };
    let rx = base.x, ry = base.y, tx = base.x, ty = base.y, drag = null, vis = true, raf;
    function apply() { body.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`; root.style.setProperty("--ry", ry.toFixed(1)); }
    function loop() {
      if (!vis) { raf = null; return; }
      rx += (tx - rx) * .09; ry += (ty - ry) * .09; apply();
      raf = requestAnimationFrame(loop);
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
    const io = new IntersectionObserver(e => { vis = e[0].isIntersecting; if (vis) kick(); }); io.observe(root);
    const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
    function onMove(e) {
      if (drag || RM || !fine) return;
      const r = stage.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
      tx = base.x - py * 14; ty = base.y + px * 26; kick();
    }
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", () => { if (!drag) { tx = base.x; ty = base.y; kick(); } });
    // drag anywhere on the phone except the screen (the screen scrolls)
    stage.addEventListener("pointerdown", e => {
      if (e.target.closest(".p3-screens")) return;
      drag = { x: e.clientX, y: e.clientY, rx: tx, ry: ty }; stage.setPointerCapture(e.pointerId); root.classList.add("dragging");
    });
    stage.addEventListener("pointermove", e => {
      if (!drag) return;
      ty = drag.ry + (e.clientX - drag.x) * .45; tx = Math.max(-35, Math.min(35, drag.rx - (e.clientY - drag.y) * .3)); kick();
    });
    const end = () => {
      if (!drag) return; drag = null; root.classList.remove("dragging");
      // ease back to the closest front-facing pose
      setTimeout(() => { if (!drag) { tx = base.x; ty = base.y; kick(); } }, RM ? 0 : 1400);
    };
    stage.addEventListener("pointerup", end); stage.addEventListener("pointercancel", end);
    apply(); kick();
    show(opts.start || 0, 1);
    return {
      show(i) { show(i, i > cur ? 1 : -1); },
      get index() { return cur; },
      destroy() { io.disconnect(); ro.disconnect(); vis = false; }
    };
  }
  return { mount };
})();
