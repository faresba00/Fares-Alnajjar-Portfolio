(function(){
"use strict";
const D=window.DATA;
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const root=document.documentElement;
const RM=matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasG=typeof window.gsap!=="undefined"&&typeof window.ScrollTrigger!=="undefined";
if(hasG) gsap.registerPlugin(ScrollTrigger);
const fine=matchMedia("(hover:hover) and (pointer:fine)").matches;
const AR=()=>root.lang==="ar";
const T=o=>o?(AR()?o.ar:o.en):"";
function store(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}}
const lockSvg='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>';
const arrSvg='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14m-6-6l6 6-6 6"/></svg>';

/* ============ kashida (Thmanyah guide: before final letter only, once per word) ============ */
const TATWEEL="ـ";
function setK(el,n){const [pre,last]=el.dataset.k.split("|");if(el._n===n)return;el._n=n;el.textContent=pre+TATWEEL.repeat(n)+last}
function initK(scope){
  $$(".ksh",scope).forEach(el=>{
    if(el._io)return; el._max=+el.dataset.k.split("|")[2]||3; setK(el,0);
    el._io=new IntersectionObserver(es=>es.forEach(e=>{
      const target=e.isIntersecting?el._max:0; clearInterval(el._t);
      if(RM){setK(el,target);return}
      el._t=setInterval(()=>{const c=Math.max(0,el._n);if(c===target){clearInterval(el._t);return}setK(el,c+(target>c?1:-1))},110);
    }),{threshold:.6});
    el._io.observe(el);
  });
}

/* ============ rotator ============ */
const rotEl=$("#rot"); let rotIdx=0, rotTimers=[];
function typeTo(txt){
  rotTimers.forEach(clearInterval); rotTimers=[];
  if(RM){rotEl.textContent=txt;return}
  let cur=rotEl.textContent;
  const del=setInterval(()=>{if(cur.length){cur=cur.slice(0,-1);rotEl.textContent=cur||"​";return}clearInterval(del);let i=0;const add=setInterval(()=>{i++;rotEl.textContent=txt.slice(0,i);if(i>=txt.length)clearInterval(add)},55);rotTimers.push(add)},26);
  rotTimers.push(del);
}
setInterval(()=>{const L=D.ROT[root.lang]||D.ROT.en;rotIdx=(rotIdx+1)%L.length;typeTo(L[rotIdx])},2700);

/* ============ marquee: one rAF loop, eased velocity, direction follows scroll ============ */
(function marquee(){
  const tr=$("#mq"); if(!tr)return;
  const grp=()=>`<div class="grp">${D.MARQ.map(w=>`<span>${w}</span>`).join("")}</div>`;
  tr.innerHTML=grp()+grp()+grp();
  let x=0, v=0.5, dir=-1, boost=0, lastY=scrollY, gw=0;
  const measure=()=>{gw=tr.firstElementChild.getBoundingClientRect().width};
  measure(); addEventListener("resize",measure); document.fonts&&document.fonts.ready.then(measure);
  addEventListener("scroll",()=>{const dy=scrollY-lastY;lastY=scrollY;if(dy!==0)dir=dy>0?-1:1;boost=Math.min(14,boost+Math.abs(dy)*.06)},{passive:true});
  let vis=true; new IntersectionObserver(e=>{vis=e[0].isIntersecting}).observe(tr);
  (function loop(){
    if(vis&&!RM){boost*=.92; const speed=(v+boost)*dir; x+=speed; if(gw){if(x<=-gw)x+=gw;if(x>0)x-=gw} tr.style.transform=`translate3d(${x}px,0,0)`}
    requestAnimationFrame(loop);
  })();
})();

/* ============ resizable name frame ============ */
(function nameFrame(){
  const nf=$("#nf"), dim=$("#dimlbl"), reset=$("#nfReset"); if(!nf)return;
  let userW=null;
  const h1=()=>AR()?$("#hn-ar"):$("#hn-en");
  const words=()=>$$(".w",h1());
  const pad=32;
  function bounds(){
    const ws=words(); const widest=Math.max(...ws.map(w=>w.getBoundingClientRect().width));
    const maxW=Math.min(innerWidth-32,$(".hero .wrap").clientWidth-16);
    return {min:Math.ceil(widest+pad+2),max:Math.floor(maxW)};
  }
  function upd(){const r=nf.getBoundingClientRect();dim.textContent=`W ${Math.round(r.width)} × H ${Math.round(r.height)}`}
  function flip(fn){
    const ws=words(); const before=ws.map(w=>w.getBoundingClientRect());
    fn();
    if(RM)return;
    ws.forEach((w,i)=>{const a=before[i],b=w.getBoundingClientRect();const dx=a.left-b.left,dy=a.top-b.top;
      if(Math.abs(dx)>2||Math.abs(dy)>2){w.animate([{transform:`translate(${dx}px,${dy}px)`},{transform:"none"}],{duration:520,easing:"cubic-bezier(.2,.7,.1,1)"})}});
  }
  function setW(w){const b=bounds();w=Math.max(b.min,Math.min(b.max,w));
    const lines=()=>new Set(words().map(x=>Math.round(x.getBoundingClientRect().top))).size;
    const l0=lines(); nf.style.width=w+"px"; const l1=lines();
    if(l0!==l1){nf.style.width="";const keep=nf.getBoundingClientRect();nf.style.width=keep.width+"px";flip(()=>{nf.style.width=w+"px"})}
    upd();}
  function init(){nf.style.width="";const b=bounds();nf.style.width=Math.min(b.max,Math.max(b.min,b.min))+"px";if(userW)setW(userW);upd()}
  window.__nfInit=()=>{userW=null;nf.classList.remove("resized");init()};
  let drag=null;
  $$(".hd",nf).forEach(h=>{
    h.addEventListener("pointerdown",e=>{e.preventDefault();h.setPointerCapture(e.pointerId);h.classList.add("drag");$("#ring")&&$("#ring").classList.add("rs");
      drag={h:h.dataset.h,x:e.clientX,w:nf.getBoundingClientRect().width}});
    h.addEventListener("pointermove",e=>{if(!drag)return;const dx=e.clientX-drag.x;const left=drag.h.includes("w");
      let w=drag.w+(left?-dx:dx); userW=w; nf.classList.add("resized"); setW(w)});
    const end=()=>{drag=null;h.classList.remove("drag");$("#ring")&&$("#ring").classList.remove("rs")};
    h.addEventListener("pointerup",end);h.addEventListener("pointercancel",end);
    h.addEventListener("keydown",e=>{if(e.key==="ArrowLeft"||e.key==="ArrowRight"){e.preventDefault();const cur=nf.getBoundingClientRect().width;const d=(e.key==="ArrowRight"?1:-1)*(h.dataset.h.includes("w")?-1:1)*24;userW=cur+d;nf.classList.add("resized");setW(userW)}});
  });
  reset.addEventListener("click",()=>{userW=null;nf.classList.remove("resized");const b=bounds();flip(()=>{nf.style.width=b.min+"px"});upd()});
  addEventListener("resize",()=>{clearTimeout(nf._t);nf._t=setTimeout(init,120)});
  (document.fonts?document.fonts.ready:Promise.resolve()).then(init); init();
})();

/* ============ ERP modules ============ */
function buildMods(){
  $("#mods").innerHTML=D.MODS.map((m,i)=>`<article class="mod rv2"><div class="ads" data-i="${i}" data-cursor="View" role="button" tabindex="0" aria-label="${m.en} ads"><img src="img/cl/link/${m.c}.webp" alt="${m.en} ad 1" loading="lazy" width="720" height="1280"><img src="img/cl/link/${m.c}2.webp" alt="${m.en} ad 2" loading="lazy" width="720" height="1280"><span class="flip">${AR()?"إعلانان":"2 ads"}</span></div>
  <div class="body"><div class="top"><span class="code ltr">${m.c}</span><span class="nda-badge">${lockSvg}${AR()?"الواجهات سرية":"UI under NDA"}</span></div><h3>${T({en:m.en,ar:m.ar})}</h3><p>${AR()?m.dar:m.den}</p>${m.used?`<div class="used"><span class="tag">${m.usedBy?T(m.usedBy):(AR()?"مطبّق لدى Planet Donuts":"Live at Planet Donuts")}</span></div>`:""}</div></article>`).join("");
  $$("#mods .ads").forEach(a=>{const open=()=>{const i=+a.dataset.i;const list=[];D.MODS.forEach(m=>{list.push({src:`img/cl/link/${m.c}.webp`,t:m.c+" · "+T({en:m.en,ar:m.ar})});list.push({src:`img/cl/link/${m.c}2.webp`,t:m.c+" · "+T({en:m.en,ar:m.ar})})});lbOpen(list,i*2)};
    a.addEventListener("click",open);a.addEventListener("keydown",e=>{if(e.key==="Enter")open()})});
}

/* ============ Planet ecosystem map ============ */
const KCOL={link:"#3D8BFF",built:"#FFD900",own:"#E01583"};
function buildMap(){
  const g=$("#lines"),f=$("#flows"),nodes=$("#nodes");const NS="http://www.w3.org/2000/svg";const by=Object.fromEntries(D.SYS.map(s=>[s.c,s]));
  g.innerHTML="";f.innerHTML="";nodes.innerHTML="";
  D.LINKS.forEach(([a,b],i)=>{const A=by[a],B=by[b];const p=document.createElementNS(NS,"path");const mx=(A.x+B.x)/2+(i%2?14:-14),my=(A.y+B.y)/2+(i%2?-14:14);
    p.setAttribute("d",`M${A.x},${A.y} Q${mx},${my} ${B.x},${B.y}`);p.setAttribute("class","ln"+(a==="ERP"?" hot":""));p.id="ln"+i;p.dataset.a=a;p.dataset.b=b;g.appendChild(p);
    if(!RM&&a==="ERP"){const c=document.createElementNS(NS,"circle");c.setAttribute("r","3.2");c.setAttribute("fill",KCOL[B.k]);const am=document.createElementNS(NS,"animateMotion");am.setAttribute("dur",(2.4+i*.35)+"s");am.setAttribute("repeatCount","indefinite");if(i%2){am.setAttribute("keyPoints","1;0");am.setAttribute("keyTimes","0;1");am.setAttribute("calcMode","linear")}const mp=document.createElementNS(NS,"mpath");mp.setAttribute("href","#ln"+i);mp.setAttributeNS("http://www.w3.org/1999/xlink","href","#ln"+i);am.appendChild(mp);c.appendChild(am);f.appendChild(c)}});
  D.SYS.forEach(s=>{const d=document.createElement("div");d.className=`node k-${s.k}`+(s.core?" core":"");d.dataset.c=s.c;d.style.left=(s.x/6)+"%";d.style.top=(s.y/6)+"%";
    d.innerHTML=`<div class="dot">${s.c}</div><small><span class="en">${s.en}</span><span class="ar">${s.ar}</span></small>`;d.addEventListener("mouseenter",()=>hl(s.c));d.addEventListener("mouseleave",()=>hl(null));nodes.appendChild(d)});
}
function hl(c){$$(".node").forEach(n=>n.classList.toggle("on",n.dataset.c===c));$$("#lines path").forEach(p=>{const on=c&&(p.dataset.a===c||p.dataset.b===c);p.style.stroke=on?"#fff":"";p.style.strokeWidth=on?"2.2":""});$$("#legend .row").forEach(r=>r.classList.toggle("on",r.dataset.c===c))}
function buildLegend(){const L=$("#legend");L.innerHTML=D.SYS.map(s=>`<div class="row" data-c="${s.c}"><i style="background:${KCOL[s.k]}"></i><b>${s.c}</b><span>${AR()?s.dar:s.den}</span></div>`).join("");$$(".row",L).forEach(r=>{r.addEventListener("mouseenter",()=>hl(r.dataset.c));r.addEventListener("mouseleave",()=>hl(null))})}
function buildDomains(){$("#domains").innerHTML=D.DOMAINS.map(d=>`<div><b>${T(d)}</b><span>${AR()?d.dar:d.den}</span></div>`).join("");$$("[data-nda]").forEach(b=>b.innerHTML=lockSvg+(AR()?"سرّي · محمي باتفاقية":"Confidential · NDA"))}

/* app strip + POS */
const sH=D.APPSTRIP.map(n=>`<img src="img/pd/m${n}.webp" alt="" loading="lazy" width="440" height="880">`).join("");$("#strip").innerHTML=sH+sH;
const posscr=$("#posscr"),posth=$("#posthumbs");let posI=0,posT;
posscr.innerHTML=D.POS.map((p,i)=>`<img src="img/pd/${p[0]}.webp" alt="POS — ${p[1]}" loading="lazy" width="1440" height="1024" class="${i?"":"on"}">`).join("");
posth.innerHTML=D.POS.map((p,i)=>`<button type="button" class="${i?"":"on"}" aria-label="${p[1]}"><img src="img/pd/${p[0]}.webp" alt="" loading="lazy"><i></i></button>`).join("");
function posGo(i){posI=i;$$("img",posscr).forEach((m,k)=>m.classList.toggle("on",k===i));$$("button",posth).forEach((b,k)=>{b.classList.remove("on");if(k===i){void b.offsetWidth;b.classList.add("on")}});clearTimeout(posT);if(!RM)posT=setTimeout(()=>posGo((posI+1)%D.POS.length),4200)}
$$("button",posth).forEach((b,i)=>b.addEventListener("click",()=>posGo(i)));posGo(0);

/* planet website tabs */
function buildWeb(){
  const tabs=$("#webtabs"),img=$("#webimg"),url=$("#weburl");
  if(!D.WEB.length){$("#s-web").hidden=true;return}
  const cur=Math.max(0,$$("button",tabs).findIndex(b=>b.getAttribute("aria-selected")==="true"));
  tabs.innerHTML=D.WEB.map((p,i)=>`<button role="tab" aria-selected="${i===cur}" data-i="${i}">${T(p)}</button>`).join("");
  const go=i=>{const p=D.WEB[i];$$("button",tabs).forEach((b,k)=>b.setAttribute("aria-selected",k===i));img.style.opacity=0;
    setTimeout(()=>{img.style.animation="none";img.src=p.src;img.width=p.w;img.height=p.h;url.textContent="planetdonuts.com/home/"+p.k;const done=()=>{sizeAuto();void img.offsetWidth;img.style.animation="";img.style.opacity=1};img.complete?done():img.onload=done},300)};
  $$("button",tabs).forEach(b=>b.addEventListener("click",()=>go(+b.dataset.i)));
  if(!img.getAttribute("src")){img.src=D.WEB[0].src;img.width=D.WEB[0].w;img.height=D.WEB[0].h;
    $("#webvp").addEventListener("mouseenter",()=>img.style.animationPlayState="paused");$("#webvp").addEventListener("mouseleave",()=>img.style.animationPlayState="")}
}
/* store badges */
const icoApple='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2.5" width="12" height="19" rx="3"/><path d="M10.5 18.5h3"/></svg>';
const icoPlay='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M6 3.5v17l14-8.5z"/></svg>';
function storeHTML(k){const S=D.STORES[k];if(!S)return"";return `<div class="stores">${S.ios?`<a class="store" href="${S.ios}" target="_blank" rel="noopener">${icoApple}<span><small>${AR()?"حمّله من":"Download on the"}</small><b>App Store</b></span></a>`:""}${S.android?`<a class="store" href="${S.android}" target="_blank" rel="noopener">${icoPlay}<span><small>${AR()?"احصل عليه من":"Get it on"}</small><b>Google Play</b></span></a>`:""}</div>`}
function sizeAuto(scope){
  $$(".autoscroll",scope).forEach(img=>{const box=img.parentElement;const w=box.clientWidth,h=box.clientHeight;if(!w)return;
    const nw=img.naturalWidth||+img.getAttribute("width"),nh=img.naturalHeight||+img.getAttribute("height");if(!nw)return;
    const d=Math.max(0,w*nh/nw-h);img.style.setProperty("--d",d+"px");if(img.dataset.speed!=="fixed"&&(img.id==="webimg"||img.closest(".cp")))img.style.setProperty("--dur",Math.max(8,d/80)+"s")});
}
document.addEventListener("load",e=>{if(e.target.classList&&e.target.classList.contains("autoscroll"))sizeAuto()},true);
addEventListener("resize",()=>{clearTimeout(window._rs);window._rs=setTimeout(()=>sizeAuto(),150)});

/* ============ work gallery ============ */
const CAT={ui:["UI/UX","UI/UX"],brand:["Branding","هوية بصرية"],social:["Social","وسائل التواصل"],print:["Print","مطبوعات"]};
function wMatch(c,f){return f==="all"||c.dataset.cat===f||c.dataset.who===f}
function buildWork(){
  $("#grid").innerHTML=D.WORK.map((w,i)=>`<figure class="card" data-cat="${w[1]}" data-who="${w[2]}" data-i="${i}" data-cursor="View" tabindex="0" role="button" aria-label="${w[3]}"><img src="img/work/p${w[0]}.webp" alt="${w[3]}" loading="lazy" width="1600" height="900"><span class="who ${w[2]}">${w[2]==="link"?(AR()?"عميل لدى Link":"Link client"):(AR()?"عمل حر":"Freelance")}</span><figcaption class="meta"><b>${AR()?w[4]:w[3]}</b><span>${CAT[w[1]][AR()?1:0]}</span></figcaption></figure>`).join("");
  const f=$("#filters [aria-pressed=true]").dataset.f;$$(".card").forEach(c=>c.hidden=!wMatch(c,f));
}
$$("#filters button").forEach(b=>b.addEventListener("click",()=>{const f=b.dataset.f;$$("#filters button").forEach(x=>x.setAttribute("aria-pressed",x===b));const cards=$$(".card");cards.forEach(c=>c.hidden=!wMatch(c,f));
  if(hasG&&!RM)gsap.fromTo(cards.filter(c=>!c.hidden),{y:30,opacity:0},{y:0,opacity:1,stagger:.05,duration:.6,ease:"power3.out",clearProps:"all"});if(hasG)ScrollTrigger.refresh()}));
$("#grid").addEventListener("click",e=>{const c=e.target.closest(".card");if(!c)return;const vis=$$(".card").filter(x=>!x.hidden);lbOpen(vis.map(x=>({src:$("img",x).src,t:D.WORK[+x.dataset.i][AR()?4:3]})),vis.indexOf(c))});
$("#grid").addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.classList.contains("card")){e.preventDefault();e.target.click()}});

/* ============ lightbox ============ */
const lb=$("#lb"),lbi=$("#lbi"),lbt=$("#lbt"),lbs=$("#lbs");let lbList=[],lbI=0,lbLast=null;
function lbShow(){const it=lbList[lbI];lbi.src=it.src;lbi.alt=it.t||"";lbt.textContent=it.t||"";lbs.classList.toggle("tall",!!it.tall);lbs.scrollTop=0}
function lbOpen(list,i){lbLast=document.activeElement;lbList=list;lbI=Math.max(0,i);lbShow();lb.classList.add("open");$("#lbx").focus();if(!cp.classList.contains("open"))document.body.style.overflow="hidden"}
window.lbOpen=lbOpen;
function lbClose(){lb.classList.remove("open");if(!cp.classList.contains("open"))document.body.style.overflow="";lbLast&&lbLast.focus()}
$("#lbx").onclick=lbClose;$("#lbn").onclick=()=>{lbI=(lbI+1)%lbList.length;lbShow()};$("#lbp").onclick=()=>{lbI=(lbI-1+lbList.length)%lbList.length;lbShow()};
lb.addEventListener("click",e=>{if(e.target===lb||e.target===lbs)lbClose()});

/* ============ clients ============ */
const cp=$("#cp"),cpin=$("#cpin");let cpIdx=-1,cpLast=null,cpLive=[];
const chev=d=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="${d<0?"M15 6l-6 6 6 6":"M9 6l6 6-6 6"}"/></svg>`;
function buildClients(){
  $("#cgrid").innerHTML=D.CLIENTS.map((c,i)=>`<button class="ccard rv2" data-i="${i}" data-cursor="Open" type="button"><div class="cv${c.coverFit==="contain"?" fit":""}" style="${c.coverBg?`background:${c.coverBg}`:""}"><img src="${c.cover}" alt="" loading="lazy"></div><span class="go">${arrSvg}</span><span class="meta"><span class="cnt">${String(i+1).padStart(2,"0")}</span><b>${T(c.name)}</b><small>${T(c.tag)}</small></span></button>`).join("");
  $$("#cgrid .ccard").forEach(b=>b.addEventListener("click",()=>openClient(+b.dataset.i)));
}
function figs(items,cls,delayMod){return items.map((it,i)=>`<figure class="rv-in" data-g="${i}" style="transition-delay:${(i%delayMod)*70}ms"><img src="${it.src||it}" alt="" loading="lazy"></figure>`).join("")}
function secHTML(s,ci,si){
  const head=`<div class="wrap"><h3 class="rv-in">${T(s.t)}</h3>${s.s?`<p class="sub rv-in">${T(s.s)}</p>`:""}`;
  if(s.type==="social")return `<section class="cp-sec">${head}<div class="g-social${s.cols?" c"+s.cols:""}">${figs(s.items,"",s.cols||3)}</div></div></section>`;
  if(s.type==="story")return `<section class="cp-sec">${head}<div class="g-story">${s.items.map((it,i)=>`<figure class="rv-in" data-g="${i}" style="transition-delay:${(i%7)*60}ms"><img src="${it.src}" alt="${it.t||""}" loading="lazy"><figcaption class="cap ltr">${it.t||""}</figcaption></figure>`).join("")}</div></div></section>`;
  if(s.type==="wide")return `<section class="cp-sec">${head}<div class="g-wide">${s.items.map((it,i)=>`<figure class="rv-in ${it.full?"full":""}" data-g="${i}" style="transition-delay:${(i%2)*90}ms"><img src="${it.src}" alt="" loading="lazy" style="--ar:${it.full?"16/9":"4/3"}"></figure>`).join("")}</div></div></section>`;
  if(s.type==="menu")return `<section class="cp-sec">${head}<div class="menu-rail" id="rail">${figs(s.items,"",5)}</div><div class="rail-nav"><button class="ib" data-rail="-1" aria-label="Previous">${chev(-1)}</button><button class="ib" data-rail="1" aria-label="Next">${chev(1)}</button></div></div></section>`;
  if(s.type==="site")return `<section class="cp-sec">${head}${s.pages&&s.pages.length?`${s.pages.length>1?`<div class="tabs rv-in cptabs" data-s="${si}">${s.pages.map((p,i)=>`<button role="tab" aria-selected="${i===0}" data-i="${i}">${T(p)}</button>`).join("")}</div>`:""}<div class="web-row rv-in${s.mobile?"":" solo"}"><div class="device"><div class="chrome"><div class="dots"><i></i><i></i><i></i></div><div class="url ltr">${ci.url.replace(/^https?:\/\//,"").replace(/\/$/,"")}</div></div><div class="viewport" data-cursor="Scroll"><img class="autoscroll cpweb" src="${s.pages[0].src}" width="${s.pages[0].w}" height="${s.pages[0].h}" alt=""></div></div>${s.mobile?`<div class="phone"><div class="scr"><img class="autoscroll" src="${s.mobile.src}" width="${s.mobile.w}" height="${s.mobile.h}" alt="" style="--dur:20s" data-speed="fixed"></div></div>`:""}</div>`:""}<div class="visit"><a class="btn pri" href="${ci.url}" target="_blank" rel="noopener">${AR()?"زيارة الموقع":"Visit the live site"} ↗</a></div></div></section>`;
  if(s.type==="book")return `<section class="cp-sec cp-book">${head}<div class="bk-mount rv-in" data-s="${si}" style="--r:${s.w/s.h}"></div></div></section>`;
  if(s.type==="apps")return `<section class="cp-sec">${head}<div class="g-apps">${s.items.map((src,i)=>`<figure class="phone rv-in" data-g="${i}" style="transition-delay:${i*90}ms"><div class="scr"><img src="${src}" alt="" loading="lazy"></div></figure>`).join("")}</div>${storeHTML(s.store)}</div></section>`;
  if(s.type==="nda")return `<section class="cp-sec">${head}<div class="g-nda">${s.items.map((it,i)=>`<article class="cbox rv-in" style="transition-delay:${i*90}ms"><span class="redact"></span><div class="top"><span class="code ltr">${it.c}</span><span class="nda-badge">${lockSvg}${AR()?"سرّي · محمي":"Confidential · protected"}</span></div><h4>${T(it)}</h4><p>${AR()?it.dar:it.den}</p><div class="ghost" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div></article>`).join("")}</div></div></section>`;
  if(s.type==="ig"){const tiles=Array.from({length:s.count},(_,i)=>`<button type="button" class="ig-t" data-g="${i}" aria-label="${i+1}"><span class="ig-f"><img src="${s.base}1-${i+1}.webp" alt="" loading="lazy"></span></button>`).join("");
    return `<section class="cp-sec">${head}<div class="ig rv-in" data-s="${si}"><div class="ig-phone"><div class="ig-top ltr"><b>${s.handle}</b></div><div class="ig-prof"><div class="ig-av"><img src="${ci.logo}" alt=""></div><div class="ig-st ltr"><div><b>${s.count}</b><span>${AR()?"منشورات":"posts"}</span></div><div><b>4</b><span>${AR()?"أنماط":"themes"}</span></div></div></div><div class="ig-name">${T(ci.name)}</div><div class="ig-grid">${tiles}</div></div><div class="ig-side"><div class="ig-k">${AR()?"اختر النمط":"Pick a theme"}</div><div class="ig-themes">${Array.from({length:s.themes},(_,k)=>`<button type="button" aria-pressed="${k===0}" data-t="${k+1}"><span class="sw t${k+1}"></span>${AR()?"النمط":"Theme"} ${k+1}</button>`).join("")}</div><p class="ig-note">${AR()?"المحتوى نفسه في المنشورات التسعة، بتصميم مختلف لكل نمط. اضغط على أي منشور لتكبيره.":"Same nine posts, a different design per theme. Tap any post to enlarge it."}</p></div></div></div></section>`}
  if(s.type==="tubs"){const F=D.FLAVORS;return `<section class="cp-sec">${head}<div class="yalda-stage rv-in" id="ystage"><div class="glow"></div><canvas class="parts" id="yparts"></canvas><div class="yalda-info"><div class="k">YALDA · 5 KG</div><h4 id="yname">${T(F[0])}</h4><p>${AR()?"كريمة شوكولاتة بنكهة غنية، بعبوة ٥ كغ.":"Rich chocolate cream in a 5 kg tub."}</p><div class="flavors" id="yflv">${F.map((f,i)=>`<button type="button" aria-pressed="${i===0}" data-i="${i}"><i style="background:${f.sw}"></i>${T(f)}</button>`).join("")}</div><div class="drag-hint">↔ ${AR()?"اسحب العبوة لتدويرها":"Drag the tub to spin it"}</div></div><div class="tubwrap"><img class="tubfb" id="ytubfb" src="img/cl/yalda/tub-dark.webp" alt="YALDA tub"><canvas class="tub" id="ytub" aria-label="YALDA tub"></canvas></div></div><div class="yalda-row rv-in">${F.map((f,i)=>`<button type="button" data-i="${i}" style="background:${f.bg}" aria-label="${T(f)}"><img src="img/cl/yalda/tub-${f.k}.webp" alt="" loading="lazy"><span>${T(f)}</span></button>`).join("")}</div><div class="label-strip rv-in"><img id="ylabel" src="img/cl/yalda/dark.webp" alt="Flat label"><span class="cap">${AR()?"الملصق مفرودًا":"The label, flat"}</span></div></div></section>`}
  return "";
}
function bookLabels(){return AR()?{prevLbl:"الصفحة السابقة",nextLbl:"الصفحة التالية",zoom:"تكبير الصفحة",hint:"اسحب زاوية الصفحة أو استخدم الأسهم لتقليبها",cover:"الغلاف الأمامي",back:"الغلاف الخلفي",page:"صفحة",pages:"الصفحات",of:"من",intro:"المقدمة"}:{prevLbl:"Previous page",nextLbl:"Next page",zoom:"Zoom page",hint:"Drag a page corner or use the arrows to turn pages",cover:"Front cover",back:"Back cover",page:"Page",pages:"Pages",of:"of",intro:"Introduction"}}
function destroyLive(){cpLive.forEach(x=>{try{x.destroy()}catch(e){}});cpLive=[]}
function openClient(i){
  const c=D.CLIENTS[i];if(!c)return;destroyLive();cpIdx=i;if(!cp.classList.contains("open"))cpLast=document.activeElement;
  const th=c.theme;cp.style.setProperty("--cbg",th.bg);cp.style.setProperty("--cfg",th.fg);cp.style.setProperty("--cmuted",th.muted);cp.style.setProperty("--accent",th.accent);cp.style.setProperty("--clogo",th.logo);
  const next=D.CLIENTS[(i+1)%D.CLIENTS.length];
  const hero=c.logo?`<img src="${c.logo}" alt="${T(c.name)} logo">`:`<img src="${c.cover}" alt="" class="${c.coverFit==="contain"?"fit":"fill"}">`;
  const heroBg=!c.logo&&c.coverBg?`background:${c.coverBg};`:"";
  cpin.innerHTML=`<div class="cp-bar"><span class="crumb"><span>${AR()?"العملاء":"Clients"}</span><span>/</span><b>${T(c.name)}</b></span><span class="btns"><button class="ib" id="cpPrev" aria-label="Previous client">${chev(-1)}</button><button class="ib" id="cpNext" aria-label="Next client">${chev(1)}</button><button class="ib" id="cpClose" aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button></span></div>
  <div class="wrap cp-hero"><div><div class="eyebrow rv-in" style="color:var(--cmuted)">${String(i+1).padStart(2,"0")} / ${String(D.CLIENTS.length).padStart(2,"0")} · ${T(c.tag)}</div><h2 class="rv-in">${T(c.name)}</h2>${c.sub?`<div class="cp-sub rv-in">${T(c.sub)}</div>`:""}<p class="rv-in">${T(c.about)}</p><div class="cp-meta rv-in">${(AR()?c.meta.ar:c.meta.en).map(m=>`<span>${m}</span>`).join("")}</div></div><div class="lg-wrap rv-in"><div class="lg ${c.logo?"":"nolg"}" style="${heroBg}">${hero}</div>${c.logoNote?`<small class="lg-note">${AR()?"شعار العميل":"Client’s logo"}</small>`:""}</div></div>
  ${c.sections.map((s,si)=>secHTML(s,c,si)).join("")}
  <div class="wrap"><button class="cp-next" id="cpNext2" type="button" style="width:100%;text-align:start"><span><small>${AR()?"العميل التالي":"Next client"}</small><b>${T(next.name)}</b></span><span class="ib">${arrSvg.replace("<svg",'<svg style="'+(AR()?"transform:scaleX(-1)":"")+'"')}</span></button></div>`;
  cp.scrollTop=0;cp.classList.add("open");document.body.style.overflow="hidden";cp.setAttribute("aria-label",T(c.name));
  try{history.replaceState(null,"","#c-"+c.id)}catch(e){}
  $("#cpClose").onclick=closeClient;$("#cpNext").onclick=$("#cpNext2").onclick=()=>openClient((i+1)%D.CLIENTS.length);$("#cpPrev").onclick=()=>openClient((i-1+D.CLIENTS.length)%D.CLIENTS.length);
  const io=new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle("in",e.isIntersecting)),{root:cp,threshold:.08});
  $$(".rv-in",cpin).forEach(el=>io.observe(el));cpLive.push({destroy:()=>io.disconnect()});
  // galleries -> lightbox
  $$(".cp-sec",cpin).forEach(sec=>{const fs=$$("figure",sec);fs.forEach((f,k)=>f.addEventListener("click",()=>lbOpen(fs.map(x=>({src:$("img",x).src,t:T(c.name),tall:!!x.closest(".menu-rail")})),k)))});
  $$("[data-rail]",cpin).forEach(b=>b.addEventListener("click",()=>{const r=$("#rail");r.scrollBy({left:+b.dataset.rail*r.clientWidth*.8,behavior:"smooth"})}));
  $$(".cptabs",cpin).forEach(tabs=>{const s=c.sections[+tabs.dataset.s];const im=$(".cpweb",tabs.closest(".cp-sec"));$$("button",tabs).forEach(b=>b.addEventListener("click",()=>{$$("button",tabs).forEach(x=>x.setAttribute("aria-selected",x===b));const p=s.pages[+b.dataset.i];im.style.opacity=0;setTimeout(()=>{im.style.animation="none";im.src=p.src;im.width=p.w;im.height=p.h;const done=()=>{sizeAuto(cpin);void im.offsetWidth;im.style.animation="";im.style.opacity=1};im.complete?done():im.onload=done},250)}))});
  setTimeout(()=>sizeAuto(cpin),400);$$("img.autoscroll",cpin).forEach(im=>im.addEventListener("load",()=>sizeAuto(cpin)));
  // flipbooks
  $$(".bk-mount",cpin).forEach(el=>{const s=c.sections[+el.dataset.s];
    el.innerHTML=`<div class="bk-load">${AR()?"جارٍ تجهيز الكتاب…":"Preparing the book…"}</div>`;
    Book.ensure().then(()=>{if(!el.isConnected)return;const b=Book.mount(el,{pages:s.pages,w:s.w,h:s.h,rtl:s.rtl!==false,offset:s.offset||0,labels:bookLabels(),
      onZoom:(list,idx)=>lbOpen(list.map((src,k)=>({src,t:T(c.name)+" · "+(k===0?bookLabels().cover:k===list.length-1?bookLabels().back:(k>(s.offset||0)?String(k-(s.offset||0)).padStart(2,"0"):bookLabels().intro))})),idx)});
      el.classList.toggle("bk-sq",!!s.square);cpLive.push(b)}).catch(()=>{el.innerHTML=`<div class="g-social c4">${s.pages.map(p=>`<figure><img src="${p}" alt="" loading="lazy"></figure>`).join("")}</div>`})});
  // instagram theme grid
  $$(".ig",cpin).forEach(el=>{const s=c.sections[+el.dataset.s];let th=1,busy=false;const tiles=$$(".ig-t",el);
    const pre=t=>{for(let k=1;k<=s.count;k++){const im=new Image();im.src=`${s.base}${t}-${k}.webp`}};
    setTimeout(()=>{for(let t=2;t<=s.themes;t++)pre(t)},1200);
    $$(".ig-themes button",el).forEach(b=>b.addEventListener("click",()=>{const t=+b.dataset.t;if(t===th||busy)return;busy=true;th=t;$$(".ig-themes button",el).forEach(x=>x.setAttribute("aria-pressed",x===b));
      el.dataset.theme=t;
      tiles.forEach((tl,k)=>{const f=$(".ig-f",tl),im=$("img",tl);const order=(Math.floor(k/3)+k%3);
        setTimeout(()=>{f.classList.add("out");setTimeout(()=>{const n=new Image();n.onload=n.onerror=()=>{im.src=n.src;f.classList.remove("out");f.classList.add("inn");setTimeout(()=>f.classList.remove("inn"),420)};n.src=`${s.base}${t}-${k+1}.webp`},260)},RM?0:order*70)});
      setTimeout(()=>busy=false,RM?300:900)}));
    tiles.forEach((tl,k)=>tl.addEventListener("click",()=>lbOpen(Array.from({length:s.count},(_,j)=>({src:`${s.base}${th}-${j+1}.webp`,t:T(c.name)+" · "+(AR()?"النمط ":"Theme ")+th})),k)))});
  if(c.sections.some(s=>s.type==="tubs"))initYalda();
  setTimeout(()=>$("#cpClose").focus({preventScroll:true}),50);
}
function closeClient(){cp.classList.remove("open");document.body.style.overflow="";try{history.replaceState(null,"",location.pathname+location.search)}catch(e){}cpLast&&cpLast.focus&&cpLast.focus({preventScroll:true});setTimeout(()=>{if(!cp.classList.contains("open")){destroyLive();cpin.innerHTML=""}},900)}
addEventListener("keydown",e=>{
  if(lb.classList.contains("open")){if(e.key==="Escape")lbClose();if(e.key==="ArrowRight")$("#lbn").click();if(e.key==="ArrowLeft")$("#lbp").click();e.stopImmediatePropagation();return}
  if(cp.classList.contains("open")&&e.key==="Escape")closeClient();
},true);

/* ============ YALDA — real 3D tub (three.js), flat-label fallback image while it loads ============ */
function initYalda(){
  const st=$("#ystage");if(!st)return;const F=D.FLAVORS;let cur=0,tub=null;
  const fb=$("#ytubfb"),cv=$("#ytub");
  const apply=i=>{cur=i;const f=F[i];st.style.setProperty("--ybg",f.bg);st.style.setProperty("--yglow",f.glow);st.style.setProperty("--yfg",f.fg);$("#yname").textContent=T(f);
    $$("#yflv button").forEach((b,k)=>b.setAttribute("aria-pressed",k===i));$$(".yalda-row button",cpin).forEach((b,k)=>b.classList.toggle("on",k===i));
    fb.src=`img/cl/yalda/tub-${f.k}.webp`;if(tub)tub.set(f);$("#ylabel").src=`img/cl/yalda/${f.k}.webp`;burst(f)};
  $$("#yflv button").forEach(b=>b.addEventListener("click",()=>apply(+b.dataset.i)));
  $$(".yalda-row button",cpin).forEach(b=>b.addEventListener("click",()=>{apply(+b.dataset.i);st.scrollIntoView({behavior:RM?"auto":"smooth",block:"center"})}));
  $("#ylabel").parentElement.addEventListener("click",()=>lbOpen(F.map(f=>({src:`img/cl/yalda/${f.k}.webp`,t:"YALDA · "+T(f)})),cur));
  Tub3D.ensure().then(()=>{if(!cv.isConnected)return;try{tub=Tub3D.stage(cv,F,cur);cpLive.push(tub);st.classList.add("gl")}catch(e){}}).catch(()=>{});
  const pc=$("#yparts"),px=pc.getContext("2d");let parts=[],alive=true;cpLive.push({destroy:()=>{alive=false}});
  function burst(f){const W=pc.clientWidth,H=pc.clientHeight;for(let i=0;i<26;i++)parts.push({x:Math.random()*W,y:H+Math.random()*H*.3,r:3+Math.random()*9,v:.3+Math.random()*.9,c:f.sw,a:.2+Math.random()*.5,w:Math.random()*Math.PI*2})}
  apply(0);
  (function loop(){if(!alive||!pc.isConnected)return;const dpr=Math.min(devicePixelRatio||1,2),W=pc.clientWidth,H=pc.clientHeight;if(pc.width!==Math.round(W*dpr)){pc.width=Math.round(W*dpr);pc.height=Math.round(H*dpr)}px.setTransform(dpr,0,0,dpr,0,0);px.clearRect(0,0,W,H);
    parts=parts.filter(p=>p.y>-20);parts.forEach(p=>{p.y-=p.v;p.w+=.02;p.x+=Math.sin(p.w)*.4;px.globalAlpha=p.a;px.fillStyle=p.c;px.beginPath();px.ellipse(p.x,p.y,p.r,p.r*.8,p.w,0,Math.PI*2);px.fill()});px.globalAlpha=1;
    if(parts.length<14&&!RM)burst(F[cur]);requestAnimationFrame(loop)})();
}

/* ============ copy + CV ============ */
const toast=$("#toast");
function say(t){toast.textContent=t;toast.classList.add("on");clearTimeout(toast._t);toast._t=setTimeout(()=>toast.classList.remove("on"),1900)}
$$("[data-copy]").forEach(b=>b.addEventListener("click",()=>{const v=b.dataset.copy;const sel=()=>{const el=b.closest(".ci").querySelector(".v");const r=document.createRange();r.selectNodeContents(el);const s=getSelection();s.removeAllRanges();s.addRange(r);say(AR()?"حُدّد النص، انسخه يدويًا":"Text selected. Copy it manually.")};
  try{navigator.clipboard.writeText(v).then(()=>say((AR()?"تم النسخ: ":"Copied: ")+v),sel)}catch(e){sel()}}));
let dl=null;
if(window.claude&&typeof window.claude.use==="function"){window.claude.use("downloads").then(d=>{dl=d}).catch(()=>{})}
$$("[data-cv]").forEach(a=>a.addEventListener("click",async e=>{if(!dl)return;e.preventDefault();
  try{const r=await fetch("Fares-Alnajjar-CV.pdf");const b=await r.blob();await dl.save({filename:"Fares-Alnajjar-CV.pdf",data:b});say(AR()?"تم تحميل السيرة الذاتية":"CV downloaded")}
  catch(err){if(err&&err.code==="declined")return;say(AR()?"تعذّر التحميل، حاول مرة أخرى":"Download didn’t start. Try again.")}}));

/* ============ cursor ============ */
if(fine&&!RM){root.classList.add("has-cursor");const cur=$("#cur"),ring=$("#ring"),lbl=$("#ringlbl");let mx=-100,my=-100,rx=-100,ry=-100;
  addEventListener("mousemove",e=>{mx=e.clientX;my=e.clientY;cur.style.transform=`translate(${mx}px,${my}px)`});
  (function loop(){rx+=(mx-rx)*.16;ry+=(my-ry)*.16;ring.style.transform=`translate(${rx}px,${ry}px)`;requestAnimationFrame(loop)})();
  const L={View:["View","عرض"],Zoom:["Zoom","تكبير"],Scroll:["Scroll","تمرير"],Open:["Open","افتح"]};
  document.addEventListener("mouseover",e=>{const t=e.target.closest("[data-cursor]");ring.classList.toggle("big",!!t);if(t)lbl.textContent=(L[t.dataset.cursor]||["",""])[AR()?1:0]});}

/* ============ hex canvas ============ */
(function hex(){const cv=$("#hex");if(!cv)return;const ctx=cv.getContext("2d");let W,H,t=0,px=.7,py=.4,tx=.7,ty=.4,vis=true;
  function rs(){const dpr=Math.min(devicePixelRatio||1,2);W=cv.clientWidth;H=cv.clientHeight;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)}rs();addEventListener("resize",rs);
  cv.parentElement.addEventListener("mousemove",e=>{const r=cv.getBoundingClientRect();tx=(e.clientX-r.left)/r.width;ty=(e.clientY-r.top)/r.height});
  new IntersectionObserver(es=>{vis=es[0].isIntersecting}).observe(cv);const R=34,hw=Math.sqrt(3)*R;
  (function draw(){if(vis){t+=.006;if(!fine){tx=.5+Math.cos(t*.9)*.35;ty=.45+Math.sin(t*1.3)*.25}px+=(tx-px)*.05;py+=(ty-py)*.05;ctx.clearRect(0,0,W,H);
    const cx=px*W,cy=py*H,rad=Math.max(W,H)*.42;const acc=getComputedStyle(document.body).getPropertyValue("--accent").trim()||"#E10600";ctx.lineWidth=1;ctx.strokeStyle=acc;ctx.fillStyle=acc;
    for(let row=-1,y=0;y<H+R*2;row++,y=row*R*1.5){for(let col=-1;col*hw<W+hw;col++){const x=col*hw+(row%2?hw/2:0);const d=Math.hypot(x-cx,y-cy);const a=Math.max(0,1-d/rad);const wave=.5+.5*Math.sin(d*.02-t*4);ctx.globalAlpha=.04+a*a*.5*(.55+.45*wave);
      ctx.beginPath();for(let k=0;k<6;k++){const an=Math.PI/180*(60*k-30);const X=x+R*.94*Math.cos(an),Y=y+R*.94*Math.sin(an);k?ctx.lineTo(X,Y):ctx.moveTo(X,Y)}ctx.closePath();ctx.stroke();if(a>.55&&wave>.92){ctx.globalAlpha=(a-.55)*.5;ctx.fill()}}}ctx.globalAlpha=1}
    if(!RM)requestAnimationFrame(draw)})();})();
(function(){const m=$("#mp");if(!m||RM)return;let t=Math.random()*10;(function f(){t+=.008;m.style.left=(55+Math.sin(t)*14+Math.sin(t*2.3)*4)+"%";m.style.top=(32+Math.cos(t*1.4)*16)+"%";requestAnimationFrame(f)})()})();

/* ============ nav + progress ============ */
const nav=$("#nav"),prog=$("#prog");let lastY=0;
function onScroll(){const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;prog.style.transform=`scaleX(${h>0?y/h:0})`;nav.classList.toggle("solid",y>40);nav.classList.toggle("hide",y>lastY&&y>500);lastY=y;
  let on=null;["about","erp","planet","clients","work","cv","contact"].forEach(id=>{const s=document.getElementById(id);if(s&&s.getBoundingClientRect().top<innerHeight*.4)on=id});$$(".nav ul a").forEach(a=>a.classList.toggle("on",a.getAttribute("href")==="#"+on))}
addEventListener("scroll",onScroll,{passive:true});
$$("[data-count]").forEach(el=>{const end=+el.dataset.count;new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting||RM)return;const t0=performance.now();(function f(t){const p=Math.min(1,(t-t0)/1400);el.textContent=Math.round(end*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(t0)}),{threshold:.6}).observe(el)});

/* ============ GSAP choreography — rebuilt from scratch on every language switch ============ */
let ctx=null;
function choreo(){
  if(!hasG||RM)return;
  if(ctx)ctx.revert();
  ctx=gsap.context(()=>{
    const TA="play reverse play reverse";
    $$(".rv").forEach(el=>{if(!el.offsetParent&&getComputedStyle(el).position!=="fixed")return;gsap.fromTo(el,{y:46,opacity:0},{y:0,opacity:1,duration:1,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 90%",end:"bottom 6%",toggleActions:TA}})});
    gsap.utils.toArray(".svc").length&&gsap.fromTo(".svc",{y:60,opacity:0},{y:0,opacity:1,stagger:.08,duration:.9,ease:"power3.out",scrollTrigger:{trigger:".services",start:"top 88%",toggleActions:TA}});
    gsap.fromTo("#mods .mod",{y:80,opacity:0,rotateX:12,transformPerspective:1200},{y:0,opacity:1,rotateX:0,stagger:.07,duration:1,ease:"power3.out",scrollTrigger:{trigger:"#mods",start:"top 85%",toggleActions:TA}});
    gsap.fromTo("#cgrid .ccard",{y:70,opacity:0,scale:.95},{y:0,opacity:1,scale:1,stagger:.06,duration:.9,ease:"power3.out",scrollTrigger:{trigger:"#cgrid",start:"top 88%",toggleActions:TA}});
    $$(".card").forEach((c,i)=>gsap.fromTo(c,{y:70,opacity:0},{y:0,opacity:1,duration:1,ease:"power3.out",delay:(i%2)*.08,scrollTrigger:{trigger:c,start:"top 92%",toggleActions:TA}}));
    ScrollTrigger.create({trigger:"#planet",start:"top 55%",end:"bottom 45%",toggleClass:{targets:document.body,className:"pd"}});
    $$("#lines path").forEach(p=>{const len=p.getTotalLength();gsap.set(p,{strokeDasharray:len,strokeDashoffset:len})});
    gsap.to("#lines path",{strokeDashoffset:0,stagger:.06,ease:"none",scrollTrigger:{trigger:"#map",start:"top 80%",end:"center 50%",scrub:.8}});
    gsap.fromTo(".node",{scale:.4,opacity:0},{scale:1,opacity:1,stagger:.06,ease:"back.out(1.6)",duration:.7,scrollTrigger:{trigger:"#map",start:"top 75%",toggleActions:TA}});
    gsap.fromTo("#legend .row",{x:AR()?30:-30,opacity:0},{x:0,opacity:1,stagger:.05,duration:.6,scrollTrigger:{trigger:"#legend",start:"top 85%",toggleActions:TA}});
    gsap.fromTo(".phones .phone",{y:140,opacity:0,rotateX:18},{y:0,opacity:1,rotateX:0,stagger:.12,duration:1.2,ease:"power4.out",scrollTrigger:{trigger:"#phones",start:"top 85%",toggleActions:TA}});
    $$(".phones .phone").forEach(ph=>gsap.to(ph,{yPercent:-(+ph.dataset.par||0)/6,ease:"none",scrollTrigger:{trigger:"#phones",start:"top bottom",end:"bottom top",scrub:true}}));
    [".device",".tablet"].forEach(s=>$$(s).forEach(el=>{if(el.closest(".cp"))return;gsap.fromTo(el,{rotateX:22,y:80,transformPerspective:1400,opacity:0,scale:.94},{rotateX:0,y:0,opacity:1,scale:1,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 95%",end:"top 45%",scrub:.8}})}));
    gsap.fromTo(".pd-logo img.main",{scale:.7,rotate:-6},{scale:1,rotate:0,ease:"none",scrollTrigger:{trigger:".pd-logo",start:"top bottom",end:"center center",scrub:.6}});
    gsap.fromTo("#tlfill",{scaleY:0},{scaleY:1,ease:"none",scrollTrigger:{trigger:"#tl",start:"top 70%",end:"bottom 60%",scrub:.5}});
    gsap.fromTo(".big-cta",{opacity:.15,y:60},{opacity:1,y:0,ease:"none",scrollTrigger:{trigger:".big-cta",start:"top 95%",end:"center 55%",scrub:.6}});
    gsap.to(".hero-txt",{y:-80,opacity:.25,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:true}});
    gsap.to(".hero .portrait",{y:60,scale:1.05,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:true}});
  });
  ScrollTrigger.refresh();
  requestAnimationFrame(()=>{ScrollTrigger.refresh();ScrollTrigger.update();
    ScrollTrigger.getAll().forEach(st=>{if(st.isActive&&st.animation&&st.vars.toggleActions)st.animation.play()})});
}

/* ============ language ============ */
function render(){
  rotIdx=0;rotEl.textContent=(D.ROT[root.lang]||D.ROT.en)[0];
  buildMods();buildLegend();buildDomains();buildWork();buildClients();buildWeb();$("#pdstores")&&($("#pdstores").innerHTML=storeHTML("planet"));
  $$(".ksh").forEach(k=>{k._n=-1;setK(k,0);if(k._io){k._io.disconnect();k._io=null}});initK(document);
  window.__nfInit&&window.__nfInit();
  sizeAuto();
}
function setLang(l){root.lang=l;root.dir=l==="ar"?"rtl":"ltr";store("fa-lang",l);render();requestAnimationFrame(()=>{choreo();onScroll()})}
$("#langBtn").addEventListener("click",()=>{const next=AR()?"en":"ar";const cpOpen=cp.classList.contains("open")?cpIdx:-1;
  const main=$("main");main.style.transition="opacity .25s";main.style.opacity=0;
  setTimeout(()=>{setLang(next);if(cpOpen>-1)openClient(cpOpen);main.style.opacity=1},260)});

/* ============ intro ============ */
function intro(){const loader=$("#loader"),bar=$("#ldbar"),pct=$("#ldpct");let p=0;const start=performance.now();const MIN=RM?0:900;
  (function tick(){const loaded=document.readyState==="complete";const el=performance.now()-start;const target=loaded?100:Math.min(90,el/12);p+=(target-p)*.18;if(loaded&&el>MIN&&p>99.2)p=100;bar.style.width=p+"%";pct.textContent=String(Math.round(p)).padStart(3,"0");
    if(p>=100){loader.classList.add("done");if(hasG&&!RM){gsap.fromTo(".h-in",{y:40,opacity:0},{y:0,opacity:1,stagger:.1,duration:1.1,ease:"power4.out",delay:.25,clearProps:"transform,opacity"})}setTimeout(()=>loader.remove(),1200);return}
    requestAnimationFrame(tick)})();
  setTimeout(()=>{if(document.getElementById("loader")){loader.classList.add("done");setTimeout(()=>loader.remove(),1200)}},5000);}

/* smooth anchor scrolling in JS (CSS smooth-scroll breaks ScrollTrigger re-measuring) */
document.addEventListener("click",e=>{const a=e.target.closest('a[href^="#"]');if(!a)return;const id=a.getAttribute("href").slice(1);const t=id?document.getElementById(id):null;if(!t&&id!=="top")return;e.preventDefault();
  const y=id==="top"?0:t.getBoundingClientRect().top+scrollY-70;scrollTo({top:y,behavior:RM?"auto":"smooth"})});

/* ============ boot ============ */
buildMap();
const saved=store("fa-lang");
root.lang=saved==="en"||saved==="ar"?saved:"ar";root.dir=root.lang==="ar"?"rtl":"ltr";
render();choreo();onScroll();intro();
addEventListener("load",()=>{sizeAuto();if(hasG)ScrollTrigger.refresh()});
const h=location.hash.match(/^#c-(\w+)/);if(h){const i=D.CLIENTS.findIndex(c=>c.id===h[1]);if(i>-1)setTimeout(()=>openClient(i),600)}
})();
