
var FORM_ENDPOINT = "https://naoerosoccer.netlify.app/", FORM_MODE = "no-cors";
var CONFIG = { ocobBalls: 113, ocobGoal: 3500, ocobUpdated: "April 2026" };
var NS = "http://www.w3.org/2000/svg";
function starPoints(R, cx, cy){ var r = R * 0.52, pts = []; for (var i = 0; i < 24; i++){ var a = (i * 15 - 90) * Math.PI / 180, rad = i % 2 ? r : R; pts.push((cx + rad * Math.cos(a)).toFixed(2) + "," + (cy + rad * Math.sin(a)).toFixed(2)); } return pts.join(" "); }
document.querySelectorAll("[data-star]").forEach(function(g){ var p = document.createElementNS(NS, "polygon"); p.setAttribute("points", starPoints(+g.dataset.star, +(g.dataset.cx || 0), +(g.dataset.cy || 0))); p.setAttribute("fill", "#ffffff"); g.appendChild(p); });
document.querySelectorAll("[data-strings]").forEach(function(svg){ for (var x = -240; x < 1200; x += 30){ [[x, x + 240], [x + 240, x]].forEach(function(pair){ var l = document.createElementNS(NS, "line"); l.setAttribute("x1", pair[0]); l.setAttribute("y1", 6); l.setAttribute("x2", pair[1]); l.setAttribute("y2", 64); svg.appendChild(l); }); } });
(function(){ var bar = document.querySelector("[data-progress]"), lab = document.querySelector("[data-progress-label]"); if (!bar) return; var pct = Math.min(100, Math.round(CONFIG.ocobBalls / CONFIG.ocobGoal * 1000) / 10); bar.style.width = pct + "%"; lab.textContent = CONFIG.ocobBalls.toLocaleString("en") + " of " + CONFIG.ocobGoal.toLocaleString("en") + " balls donated (" + pct + "%), last updated " + CONFIG.ocobUpdated + "."; })();
var nav = document.getElementById("nav"), menuBtn = document.getElementById("menu-btn");
if (menuBtn) menuBtn.addEventListener("click", function(){ var open = nav.classList.toggle("open"); menuBtn.setAttribute("aria-expanded", open ? "true" : "false"); });
(function(){ var q = new URLSearchParams(location.search); var s = document.getElementById("f-subject"), r = document.getElementById("j-role"); if (s && q.get("subject")) s.value = q.get("subject"); if (r && q.get("role")) r.value = q.get("role"); })();
function wireForm(form, statusEl){ if (!form) return; function say(msg){ statusEl.textContent = msg; statusEl.hidden = false; }
  form.addEventListener("submit", function(e){ e.preventDefault(); var name = form.elements.name.value.trim(), email = form.elements.email.value.trim();
    if (!name || !/^\S+@\S+\.\S+$/.test(email)){ say("Please fill in your name and a valid email address."); return; }
    fetch(FORM_ENDPOINT, { method: "POST", mode: FORM_MODE, headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(new FormData(form)).toString() })
      .then(function(r){ if (r.type !== "opaque" && !r.ok) throw 0; form.reset(); say("Thank you. Your message has been sent and we will get back to you."); })
      .catch(function(){ say("The message could not be sent. Please try again, or email contact@naurusoccer.com."); }); }); }
wireForm(document.getElementById("contact-form"), document.getElementById("form-status"));
wireForm(document.getElementById("join-form-el"), document.getElementById("join-status"));
document.querySelectorAll("[data-copy]").forEach(function(btn){ btn.addEventListener("click", function(){ if (navigator.clipboard) navigator.clipboard.writeText(btn.dataset.copy).then(function(){ btn.textContent = "Copied"; }, function(){}); }); });
var yr = document.getElementById("year"); if (yr) yr.textContent = new Date().getFullYear();
if (document.getElementById("island-stage")) { (function(){
var DISTRICTS = [
  {n:"Anetan",a:355,w:27,where:"North",t:"The northern tip of the island.",clan:""},
  {n:"Anabar",a:22,w:26,where:"North-east",t:"A quiet stretch of the north-east coast.",clan:""},
  {n:"Ijuw",a:48,w:20,where:"North-east",t:"One of the least populated districts, on the north-east corner.",clan:""},
  {n:"Anibare",a:68,w:50,where:"East",t:"Home of Anibare Bay, the island's best-known beach, and a fishing harbour.",clan:""},
  {n:"Meneng",a:118,w:52,where:"South-east",t:"One of the largest districts, on the south-east coast.",clan:""},
  {n:"Yaren",a:170,w:28,where:"South",t:"Seat of parliament and government, next to the airport. Nauru has no official capital; Yaren fills the role.",clan:""},
  {n:"Boe",a:198,w:14,where:"South-west",t:"Small and densely populated, at the end of the runway.",clan:""},
  {n:"Aiwo",a:212,w:26,where:"West",t:"The port and the phosphate works, with the great cantilever loaders reaching over the reef.",clan:""},
  {n:"Denigomodu",a:238,w:20,where:"West",t:"The most populous district, and home of the hospital.",clan:""},
  {n:"Nibok",a:258,w:24,where:"West",t:"On the west coast, below the Topside plateau.",clan:""},
  {n:"Uaboe",a:282,w:20,where:"North-west",t:"One of the smallest districts, on the north-west coast.",clan:""},
  {n:"Baitsi",a:302,w:26,where:"North-west",t:"On the north-west coast, between Uaboe and Ewa.",clan:""},
  {n:"Ewa",a:328,w:27,where:"North",t:"On the north coast, home of Kayser College.",clan:""},
  {n:"Buada",a:-1,w:0,where:"Interior",t:"The only district without a coastline, gathered around Buada Lagoon in a green hollow of the plateau.",clan:""}
];

var TRIBES = ["Deiboe","Eamwidamit","Eamwidara","Eamwit","Eamgum","Eano","Emeo","Eoraru","Irutsi","Iruwa","Iwi","Ranibok"];
var NS = "http://www.w3.org/2000/svg";
document.documentElement.classList.add("js");

function starPoints(R, cx, cy){
  var r = R * 0.52, pts = [];
  for (var i = 0; i < 24; i++){
    var a = (i * 15 - 90) * Math.PI / 180, rad = i % 2 ? r : R;
    pts.push((cx + rad * Math.cos(a)).toFixed(2) + "," + (cy + rad * Math.sin(a)).toFixed(2));
  }
  return pts.join(" ");
}
document.querySelectorAll("[data-star]").forEach(function(g){
  var p = document.createElementNS(NS, "polygon");
  p.setAttribute("points", starPoints(+g.dataset.star, +(g.dataset.cx || 0), +(g.dataset.cy || 0)));
  p.setAttribute("fill", "#ffffff");
  g.appendChild(p);
});

/* string-figure dividers */
document.querySelectorAll("[data-strings]").forEach(function(svg){
  for (var x = -240; x < 1200; x += 30){
    [[x, x + 240], [x + 240, x]].forEach(function(pair){
      var l = document.createElementNS(NS, "line");
      l.setAttribute("x1", pair[0]); l.setAttribute("y1", 6);
      l.setAttribute("x2", pair[1]); l.setAttribute("y2", 64);
      svg.appendChild(l);
    });
  }
});

document.querySelectorAll("[data-credit]").forEach(function(s){
  var c = CREDITS[s.dataset.credit]; s.textContent = c ? "Photo: " + c : "Photo credit to be added";
});

/* 3D island */
(function(){
  var stage = document.getElementById("island-stage"), info = document.getElementById("district-info"), list = document.getElementById("district-list");
  var btns = [], meshes = [], current = -1;
  function select(k){
    current = k; var d = DISTRICTS[k];
    info.textContent = "";
    var w = document.createElement("p"); w.className = "where"; w.textContent = d.where;
    var h = document.createElement("h3"); h.textContent = d.n;
    var p = document.createElement("p"); p.textContent = d.t;
    info.appendChild(w); info.appendChild(h); info.appendChild(p);
    if (d.clan){ var c = document.createElement("p"); c.textContent = d.clan; info.appendChild(c); }
    btns.forEach(function(b, i){ b.classList.toggle("on", i === k); });
    meshes.forEach(function(m, i){ m.material.emissive.setHex(i === k ? 0x7a6a00 : 0x000000); m.position.y = i === k ? 0.045 : 0; });
  }
  DISTRICTS.forEach(function(d, i){
    var li = document.createElement("li"), b = document.createElement("button");
    b.type = "button"; b.textContent = d.n; b.addEventListener("click", function(){ touched = true; select(i); });
    li.appendChild(b); list.appendChild(li); btns.push(b);
  });
  var touched = false, renderer;
  try {
    if (!window.THREE) throw 0;
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  } catch (e) {
    document.getElementById("island-hint").textContent = "3D view unavailable in this browser. Use the list.";
    select(5); return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  stage.insertBefore(renderer.domElement, stage.firstChild);
  var scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(38, 4 / 3, 0.1, 50);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x224466, 0.6));
  var sun = new THREE.DirectionalLight(0xfff2cc, 0.5); sun.position.set(2, 3, 1.5); scene.add(sun);

  var TAU = Math.PI * 2, NT = 180, NR = 12, BX = -0.16, BZ = 0.14, BR = 0.27;
  function ss(a, b, x){ var t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); }
  function outline(t){
    var d = Math.atan2(Math.sin(t - 1.62), Math.cos(t - 1.62));
    return 1 + 0.13 * Math.cos(2 * (t - 0.6)) - 0.1 * Math.exp(-Math.pow(d / 0.36, 2));
  }
  function pt(i, j){
    var t = i / NT * TAU, rn = j / NR, r = rn * outline(t), x = r * Math.sin(t), z = -r * Math.cos(t);
    var e = 1 - rn, db = Math.hypot(x - BX, z - BZ) / BR;
    var y = rn >= 1 ? 0.004 : 0.02 + 0.17 * ss(0.1, 0.3, e) + 0.022 * Math.sin(x * 11) * Math.cos(z * 9) * ss(0.2, 0.4, e);
    if (db < 1) y = Math.max(0.03, y - 0.1 * (1 - db * db));
    var c;
    if (db < 0.42) c = [0.2, 0.58, 0.7];
    else if (db < 1) c = [0.16, 0.45, 0.22];
    else if (e < 0.06) c = [0.93, 0.87, 0.68];
    else if (e < 0.22) c = [0.22, 0.55, 0.28];
    else { var m = 0.5 + 0.5 * Math.sin(x * 17 + z * 13); c = [0.36 + 0.14 * m, 0.46 + 0.08 * m, 0.3 + 0.1 * m]; }
    return { p: [x, y, z], c: c };
  }
  function districtOf(x, z){
    if (Math.hypot(x - BX, z - BZ) < BR) return 13;
    var a = (Math.atan2(x, -z) * 180 / Math.PI + 360) % 360;
    for (var k = 0; k < 13; k++) if (((a - DISTRICTS[k].a + 360) % 360) < DISTRICTS[k].w) return k;
    return 0;
  }
  var buf = DISTRICTS.map(function(){ return { p: [], c: [] }; });
  function tri(a, b, c){
    var k = districtOf((a.p[0] + b.p[0] + c.p[0]) / 3, (a.p[2] + b.p[2] + c.p[2]) / 3);
    [a, b, c].forEach(function(v){ buf[k].p.push(v.p[0], v.p[1], v.p[2]); buf[k].c.push(v.c[0], v.c[1], v.c[2]); });
  }
  for (var i = 0; i < NT; i++) for (var j = 0; j < NR; j++){
    var a = pt(i, j), b = pt(i + 1, j), c = pt(i + 1, j + 1), d = pt(i, j + 1);
    if (j > 0) tri(a, c, b);
    tri(a, d, c);
  }
  var group = new THREE.Group(); scene.add(group);
  buf.forEach(function(bf, k){
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(bf.p, 3));
    g.setAttribute("color", new THREE.Float32BufferAttribute(bf.c, 3));
    g.computeVertexNormals();
    var m = new THREE.Mesh(g, new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide }));
    m.userData.k = k; group.add(m); meshes.push(m);
  });
  /* reef shelf */
  var rp = [];
  for (var q = 0; q < NT; q++){
    var t0 = q / NT * TAU, t1 = (q + 1) / NT * TAU, r0 = outline(t0) * 1.13, r1 = outline(t1) * 1.13;
    rp.push(0, -0.004, 0, r0 * Math.sin(t0), -0.004, -r0 * Math.cos(t0), r1 * Math.sin(t1), -0.004, -r1 * Math.cos(t1));
  }
  var rg = new THREE.BufferGeometry(); rg.setAttribute("position", new THREE.Float32BufferAttribute(rp, 3));
  scene.add(new THREE.Mesh(rg, new THREE.MeshBasicMaterial({ color: 0x5fd0d8, transparent: true, opacity: 0.55, side: THREE.DoubleSide })));
  /* north marker */
  var cv = document.createElement("canvas"); cv.width = cv.height = 64;
  var cx = cv.getContext("2d"); cx.fillStyle = "#ece910"; cx.font = "bold 44px sans-serif"; cx.textAlign = "center"; cx.textBaseline = "middle"; cx.fillText("N", 32, 34);
  var north = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(cv), transparent: true }));
  north.scale.set(0.22, 0.22, 1); north.position.set(0, 0.06, -1.5); scene.add(north);

  var az = 0.5, pol = 0.95, dist = 3.6;
  function place(){
    camera.position.set(dist * Math.sin(pol) * Math.sin(az), dist * Math.cos(pol), dist * Math.sin(pol) * Math.cos(az));
    camera.lookAt(0, 0, 0);
  }
  var el = renderer.domElement, down = null, moved = 0, ray = new THREE.Raycaster(), v2 = new THREE.Vector2();
  function hit(ev){
    var r = el.getBoundingClientRect();
    v2.set((ev.clientX - r.left) / r.width * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(v2, camera);
    var h = ray.intersectObjects(meshes);
    return h.length ? h[0].object.userData.k : -1;
  }
  el.addEventListener("pointerdown", function(ev){ down = [ev.clientX, ev.clientY]; moved = 0; touched = true; try { el.setPointerCapture(ev.pointerId); } catch (e) {} });
  el.addEventListener("pointermove", function(ev){
    if (!down){ el.style.cursor = hit(ev) >= 0 ? "pointer" : "grab"; return; }
    var dx = ev.clientX - down[0], dy = ev.clientY - down[1];
    moved += Math.abs(dx) + Math.abs(dy); down = [ev.clientX, ev.clientY];
    az -= dx * 0.008; pol = Math.max(0.2, Math.min(1.4, pol - dy * 0.006));
  });
  el.addEventListener("pointerup", function(ev){ if (down && moved < 6){ var k = hit(ev); if (k >= 0) select(k); } down = null; });
  el.addEventListener("pointercancel", function(){ down = null; });
  document.getElementById("zoom-in").addEventListener("click", function(){ dist = Math.max(2.2, dist - 0.4); });
  document.getElementById("zoom-out").addEventListener("click", function(){ dist = Math.min(5.5, dist + 0.4); });
  function size(){
    var w = stage.clientWidth, h = stage.clientHeight; if (!w || !h) return;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  if (window.ResizeObserver) new ResizeObserver(size).observe(stage); else window.addEventListener("resize", size);
  var still = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function frame(){
    requestAnimationFrame(frame);
    if (!stage.clientWidth) return;
    if (!touched && !still) az += 0.0025;
    place(); renderer.render(scene, camera);
  }
  select(5); size(); frame();
})();

/* tribes star */
(function(){
  var g = document.getElementById("tribe-star"), list = document.getElementById("tribe-list");
  var R = 48, r = R * 0.52, pts = [], btns = [], core = [];
  function xy(rad, deg){ var a = deg * Math.PI / 180; return (rad * Math.cos(a)).toFixed(2) + "," + (rad * Math.sin(a)).toFixed(2); }
  for (var i = 0; i < 12; i++) core.push(xy(r, i * 30 - 75));
  var c = document.createElementNS(NS, "polygon");
  c.setAttribute("points", core.join(" ")); c.setAttribute("fill", "#ffffff"); g.appendChild(c);
  function select(n){
    pts.forEach(function(p, i){ p.classList.toggle("on", i === n); });
    btns.forEach(function(b, i){ b.classList.toggle("on", i === n); });
  }
  TRIBES.forEach(function(name, i){
    var d = i * 30 - 90, p = document.createElementNS(NS, "polygon");
    p.setAttribute("points", [xy(R, d), xy(r, d + 15), xy(r, d - 15)].join(" "));
    p.setAttribute("class", "pt"); g.appendChild(p); pts.push(p);
    var li = document.createElement("li"), b = document.createElement("button");
    b.type = "button"; b.textContent = name;
    if (name === "Irutsi" || name === "Iwi"){ var s = document.createElement("small"); s.textContent = "No longer surviving"; b.appendChild(s); }
    b.addEventListener("mouseenter", function(){ select(i); });
    b.addEventListener("focus", function(){ select(i); });
    b.addEventListener("click", function(){ select(i); });
    li.appendChild(b); list.appendChild(li); btns.push(b);
  });
  select(0);
})();


})(); }
