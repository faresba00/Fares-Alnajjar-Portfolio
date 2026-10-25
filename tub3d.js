/* YALDA tub — real 3D (three.js r128). Label wraps the full circumference of a tapered tub; seam hidden at the back. */
window.Tub3D = (function () {
  "use strict";
  let THREE = null;
  const texCache = {};
  function loadTex(url) {
    if (texCache[url]) return texCache[url];
    const t = new THREE.TextureLoader().load(url);
    t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 8;
    t.wrapS = THREE.RepeatWrapping;
    t.offset.x = 0.5;          // u=0 faces the camera; shift so the label's centre (logo) is at the front and the seam sits at the back
    texCache[url] = t;
    return t;
  }
  function lidTexture(hex) {
    const c = document.createElement("canvas");
    c.width = c.height = 1024;
    const g = c.getContext("2d");
    const grd = g.createRadialGradient(420, 380, 60, 512, 512, 560);
    grd.addColorStop(0, shade(hex, 0.22));
    grd.addColorStop(1, shade(hex, -0.12));
    g.fillStyle = grd; g.fillRect(0, 0, 1024, 1024);
    g.strokeStyle = "rgba(255,255,255,.22)"; g.lineWidth = 6;
    g.beginPath(); g.arc(512, 512, 430, 0, Math.PI * 2); g.stroke();
    g.strokeStyle = "rgba(0,0,0,.18)"; g.lineWidth = 3;
    g.beginPath(); g.arc(512, 512, 415, 0, Math.PI * 2); g.stroke();
    g.fillStyle = "#D7A75B";
    g.font = "700 150px Georgia, 'Times New Roman', serif";
    g.textAlign = "center"; g.textBaseline = "middle";
    g.fillText("YALDA", 512, 520);
    const t = new THREE.CanvasTexture(c);
    t.encoding = THREE.sRGBEncoding; t.anisotropy = 8;
    return t;
  }
  function shade(hex, a) {
    const n = parseInt(hex.slice(1), 16); let r = n >> 16, gg = (n >> 8) & 255, b = n & 255;
    const f = c => Math.max(0, Math.min(255, Math.round(a < 0 ? c * (1 + a) : c + (255 - c) * a)));
    return `rgb(${f(r)},${f(gg)},${f(b)})`;
  }
  function shadowTexture() {
    const c = document.createElement("canvas"); c.width = c.height = 256;
    const g = c.getContext("2d");
    const grd = g.createRadialGradient(128, 128, 10, 128, 128, 128);
    grd.addColorStop(0, "rgba(0,0,0,.55)"); grd.addColorStop(0.6, "rgba(0,0,0,.18)"); grd.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = grd; g.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(c);
  }

  // Tub geometry: label body (open tapered cylinder), lid with skirt, base ring
  function buildTub(flavor) {
    const grp = new THREE.Group();
    const rTop = 1.0, rBot = 0.9, h = 1.3;            // label aspect ≈ circumference / height
    const bodyMat = new THREE.MeshStandardMaterial({ map: loadTex(`img/cl/yalda/${flavor.k}.webp`), roughness: 0.42, metalness: 0.05 });
    const body = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBot, h, 160, 1, true), bodyMat);
    grp.add(body);
    // inner wall (so the open top never shows a void)
    const inner = new THREE.Mesh(new THREE.CylinderGeometry(rTop * 0.985, rBot * 0.985, h, 96, 1, true),
      new THREE.MeshStandardMaterial({ color: 0xeeeae4, roughness: 0.8, side: THREE.BackSide }));
    grp.add(inner);
    // base
    const base = new THREE.Mesh(new THREE.CylinderGeometry(rBot * 1.002, rBot * 0.97, 0.06, 96),
      new THREE.MeshStandardMaterial({ color: new THREE.Color(shade(flavor.lid, -0.2)).convertSRGBToLinear(), roughness: 0.5 }));
    base.position.y = -h / 2 - 0.03; grp.add(base);
    // lid: skirt + top + rim
    const lidCol = new THREE.Color(flavor.lid).convertSRGBToLinear();
    const lidMat = new THREE.MeshStandardMaterial({ color: lidCol, roughness: 0.3, metalness: 0.1 });
    const skirt = new THREE.Mesh(new THREE.CylinderGeometry(rTop * 1.045, rTop * 1.055, 0.2, 128, 1, true), lidMat);
    skirt.position.y = h / 2 + 0.06; grp.add(skirt);
    const topMat = new THREE.MeshStandardMaterial({ map: lidTexture(flavor.lid), roughness: 0.28, metalness: 0.1 });
    const top = new THREE.Mesh(new THREE.CircleGeometry(rTop * 1.045, 128), topMat);
    top.rotation.x = -Math.PI / 2; top.position.y = h / 2 + 0.16; grp.add(top);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(rTop * 1.045, 0.035, 16, 128), lidMat);
    rim.rotation.x = Math.PI / 2; rim.position.y = h / 2 + 0.155; grp.add(rim);
    const rimLow = new THREE.Mesh(new THREE.TorusGeometry(rTop * 1.055, 0.02, 12, 128), lidMat);
    rimLow.rotation.x = Math.PI / 2; rimLow.position.y = h / 2 - 0.04; grp.add(rimLow);
    // floor shadow
    const sh = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 3.2), new THREE.MeshBasicMaterial({ map: shadowTexture(), transparent: true, depthWrite: false }));
    sh.rotation.x = -Math.PI / 2; sh.position.y = -h / 2 - 0.065; grp.add(sh);
    grp.userData = { bodyMat, lidMat, topMat, baseMat: base.material };
    return grp;
  }

  function makeScene(canvas, opts) {
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: !!opts.snapshot });
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.setClearColor(0x000000, 0);
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
    cam.position.set(0, 1.55, 5.3); cam.lookAt(0, 0.05, 0);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x3a2a20, 0.75));
    const key = new THREE.DirectionalLight(0xffffff, 1.25); key.position.set(-3, 4, 4); scene.add(key);
    const rimL = new THREE.DirectionalLight(0xffe6c8, 0.7); rimL.position.set(4, 2, -3); scene.add(rimL);
    const fill = new THREE.DirectionalLight(0xffffff, 0.35); fill.position.set(3, 0.5, 4); scene.add(fill);
    return { renderer, scene, cam };
  }

  function ensure() {
    if (window.THREE) { THREE = window.THREE; return Promise.resolve(); }
    return new Promise((res, rej) => {
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
      s.onload = () => { THREE = window.THREE; res(); }; s.onerror = rej;
      document.head.appendChild(s);
    });
  }

  // Interactive stage: one renderer, drag to spin, inertia, swap flavor with a quick spin
  function stage(canvas, flavors, startIdx) {
    const { renderer, scene, cam } = makeScene(canvas, {});
    let tub = buildTub(flavors[startIdx || 0]); scene.add(tub);
    let rot = -0.35, vel = 0.004, drag = null, running = true, vis = true;
    const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
    function size() {
      const w = canvas.clientWidth, h = canvas.clientHeight; if (!w || !h) return;
      renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2)); renderer.setSize(w, h, false);
      cam.aspect = w / h; cam.updateProjectionMatrix();
      const fitH = 2.25 / (2 * Math.tan((cam.fov * Math.PI) / 360));
      const fitW = 2.6 / (2 * Math.tan((cam.fov * Math.PI) / 360) * cam.aspect);
      const d = Math.max(fitH, fitW) * 1.08;
      cam.position.set(0, d * 0.29, d); cam.lookAt(0, 0.08, 0);
    }
    size(); const ro = new ResizeObserver(size); ro.observe(canvas);
    const io = new IntersectionObserver(e => { vis = e[0].isIntersecting; }); io.observe(canvas);
    canvas.addEventListener("pointerdown", e => { drag = { x: e.clientX, r: rot }; canvas.setPointerCapture(e.pointerId); });
    canvas.addEventListener("pointermove", e => { if (!drag) return; const nr = drag.r + (e.clientX - drag.x) * 0.012; vel = (nr - rot) * 0.6; rot = nr; });
    const up = () => { drag = null; }; canvas.addEventListener("pointerup", up); canvas.addEventListener("pointercancel", up);
    (function loop() {
      if (!running) return;
      if (vis) {
        if (!drag) { vel = vel * 0.95 + (RM ? 0 : 0.004) * 0.05; rot += vel; }
        tub.rotation.y = rot; renderer.render(scene, cam);
      }
      requestAnimationFrame(loop);
    })();
    return {
      set(f) { scene.remove(tub); tub = buildTub(f); tub.rotation.y = rot; scene.add(tub); vel += 0.22; },
      destroy() { running = false; ro.disconnect(); io.disconnect(); renderer.dispose(); }
    };
  }

  // Static snapshots (thumbnails) from one offscreen renderer
  function snapshots(flavors, w, h) {
    const c = document.createElement("canvas"); c.width = w; c.height = h; c.style.width = w + "px"; c.style.height = h + "px";
    const { renderer, scene, cam } = makeScene(c, { snapshot: true });
    renderer.setPixelRatio(1); renderer.setSize(w, h, false);
    cam.aspect = w / h; cam.updateProjectionMatrix();
    const d = 6.0; cam.position.set(0, d * 0.29, d); cam.lookAt(0, 0.08, 0);
    const out = [];
    return Promise.all(flavors.map(f => new Promise(r => { const t = loadTex(`img/cl/yalda/${f.k}.webp`); if (t.image && t.image.complete) r(); else t.onUpdate = r; setTimeout(r, 2500); })))
      .then(() => {
        flavors.forEach(f => { const t = buildTub(f); t.rotation.y = -0.35; scene.add(t); renderer.render(scene, cam); out.push(c.toDataURL("image/png")); scene.remove(t); });
        renderer.dispose(); return out;
      });
  }
  return { ensure, stage, snapshots };
})();
