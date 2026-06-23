window.__YAWP_CSS__="/* ============================================================\n   YAWP OVERLAY  — THE DESIGN ZONE\n   Everything the overlay + Today canvas draws is styled here.\n   This is yours. The engine (overlay.js) only sets geometry and\n   fills in text/content. How it LOOKS is all in this file.\n   ============================================================ */\n\n:host{\n  /* tokens — semantic roles, light set. change these first */\n  --accent: #292929;            /* dev overlay color — selectable in settings */\n  --accent-soft: color-mix(in srgb, var(--accent) 10%, transparent);\n  --label-bg: #18181B;\n  --label-ink: #ffffff;\n  --ui-bg: #ffffff;             /* bar + popover surface */\n  --ui-surface: #ffffff;        /* cards */\n  --ui-hover: #f6f6f9;          /* hover fill */\n  --ui-ink: #18181B;            /* primary text/icons */\n  --ui-line: #e7e7ec;           /* hairlines */\n  --muted: #6b6b78;             /* secondary text */\n  --ui-shadow: rgba(0,0,0,.12);\n  --switch-on: #22C55E;         /* overlay active = green */\n  --mono: \"IBM Plex Mono\", ui-monospace, monospace;\n  --sans: Inter, system-ui, sans-serif;\n  --ease: cubic-bezier(.22,.61,.36,1);  /* clean ease-out, no overshoot */\n}\n/* dark set — same roles, inverted lightness. accent stays violet. */\n:host([data-theme=\"dark\"]){\n  --accent-soft: rgba(124,58,237,.22);\n  --label-bg: #ececef;\n  --label-ink: #18181b;\n  --ui-bg: #1a1a1d;\n  --ui-surface: #242428;\n  --ui-hover: #2a2a30;\n  --ui-ink: #ececef;\n  --ui-line: #2a2a2f;\n  --muted: #8b8b94;\n  --ui-shadow: rgba(0,0,0,.5);\n  --switch-on: #2DD46B;\n  --accent-soft: color-mix(in srgb, var(--accent) 18%, transparent);\n}\n\n.layer{ position:fixed; inset:0; pointer-events:none; }\n\n/* ---- the snap box drawn around the hovered element ---- */\n.box{\n  position:fixed;\n  border:1px solid var(--accent);\n  background:var(--accent-soft);\n  box-sizing:border-box;\n}\n\n/* ---- the readout label ---- */\n.label{\n  position:absolute;\n  left:0; top:100%;\n  margin-top:4px;\n  display:inline-flex; align-items:center; gap:8px;\n  background:var(--label-bg); color:var(--label-ink);\n  padding:4px 8px; border-radius:6px;\n  font-family:var(--sans); font-size:11px; font-weight:500;\n  white-space:nowrap; line-height:1;\n  box-shadow:0 2px 8px rgba(0,0,0,.18);\n}\n.label.flip{ top:auto; bottom:100%; margin-top:0; margin-bottom:4px; }\n.label .tag{ opacity:.8 }\n.label .dims{ font-family:var(--mono); }\n.label .x{ opacity:.45; padding:0 1px }\n.label .kind{\n  font-family:var(--mono); text-transform:uppercase; font-size:9px;\n  letter-spacing:.06em; background:var(--accent); color:#fff;\n  padding:2px 4px; border-radius:3px;\n}\n\n/* ============================================================\n   CLIPS POPOVER  — revealed from the toolbar; a small floating\n   window above the HUD showing this session's clips.\n   ============================================================ */\n.clips-pop{\n  position:fixed; left:50%; bottom:76px;\n  transform:translateX(-50%) translateY(8px) scale(.98);\n  transform-origin:center bottom;\n  width:320px; max-height:60vh; pointer-events:auto;\n  background:var(--ui-bg); color:var(--ui-ink);\n  border:1px solid var(--ui-line); border-radius:16px;\n  box-shadow:0 18px 50px var(--ui-shadow);\n  display:flex; flex-direction:column; overflow:hidden;\n  font-family:var(--sans);\n  opacity:0; visibility:hidden;\n  /* exit (~20% faster) */\n  transition:opacity .14s var(--ease), transform .14s var(--ease), visibility .14s;\n}\n.clips-pop.open{\n  opacity:1; visibility:visible; transform:translateX(-50%) translateY(0) scale(1);\n  /* enter */\n  transition:opacity .18s var(--ease), transform .18s var(--ease), visibility 0s;\n}\n.clips-pop .head{\n  display:flex; align-items:baseline; gap:8px;\n  padding:14px 16px 12px; border-bottom:1px solid var(--ui-line);\n}\n.clips-pop .head .t{ font-weight:600; font-size:14px; letter-spacing:-0.01em }\n.clips-pop .head .count{ font-family:var(--mono); font-size:12px; color:var(--muted) }\n.clips-pop .head .clear{\n  margin-left:auto; font:inherit; font-size:11px; cursor:pointer; color:var(--muted);\n  background:transparent; border:0; padding:2px 4px;\n}\n.clips-pop .head .clear:hover{ color:var(--ui-ink) }\n\n.ystack{ overflow:auto; padding:12px; display:flex; flex-direction:column; gap:10px; }\n.ystack .empty{ color:var(--muted); font-size:13px; text-align:center; padding:28px 12px; line-height:1.5 }\n\n/* settings pill (opens above, from the gear) */\n.settings-pill{\n  position:fixed; left:50%; bottom:76px;\n  transform:translateX(-50%) translateY(8px) scale(.98);\n  transform-origin:center bottom;\n  pointer-events:auto;\n  display:inline-flex; align-items:center; gap:6px;\n  background:var(--ui-bg); color:var(--ui-ink);\n  border:1px solid var(--ui-line); border-radius:999px;\n  padding:4px 6px;\n  box-shadow:0 1px 2px rgba(0,0,0,.06), 0 12px 34px var(--ui-shadow);\n  opacity:0; visibility:hidden;\n  transition:opacity .14s var(--ease), transform .14s var(--ease), visibility .14s;\n}\n.settings-pill.open{\n  opacity:1; visibility:visible; transform:translateX(-50%) translateY(0) scale(1);\n  transition:opacity .18s var(--ease), transform .18s var(--ease), visibility 0s;\n}\n.settings-pill .ibtn{\n  display:inline-flex; align-items:center; justify-content:center; cursor:pointer;\n  background:transparent; border:0; color:var(--muted);\n  padding:6px; border-radius:999px; line-height:0;\n  transition:background-color .12s var(--ease), color .12s var(--ease), transform .1s var(--ease);\n}\n.settings-pill .ibtn:hover{ background:var(--ui-hover); color:var(--ui-ink) }\n.settings-pill .ibtn:active{ transform:scale(.94) }\n\n/* color picker — one swatch that morphs open into the options */\n.settings-pill .colorpick{ display:inline-flex; align-items:center }\n.settings-pill .opts{ display:inline-flex; align-items:center }\n.settings-pill .sw{\n  width:18px; height:18px; flex:0 0 auto; padding:0; cursor:pointer;\n  border:0; border-radius:50%; background:var(--c); margin-left:6px;\n  box-shadow:inset 0 0 0 1px rgba(0,0,0,.14);\n  transition:width .2s var(--ease), margin .2s var(--ease), opacity .18s var(--ease), transform .18s var(--ease);\n}\n.settings-pill .opts .sw:first-child{ margin-left:0 }\n.settings-pill .colorpick:not(.open) .sw{ margin-left:0 }\n.settings-pill .colorpick:not(.open) .sw:not(.sel){ width:0; opacity:0; transform:scale(.3); pointer-events:none }\n.settings-pill .sw.sel{ box-shadow:0 0 0 2px var(--ui-bg), 0 0 0 3px var(--ui-ink) }\n\n/* ---- a captured card ---- */\n.ycard{\n  border:1px solid var(--ui-line); border-radius:12px; overflow:hidden;\n  background:var(--ui-surface);\n}\n.ycard.enter{ animation:cardIn .28s var(--ease) both }\n@keyframes cardIn{ from{ opacity:0; transform:translateY(8px) } to{ opacity:1; transform:none } }\n\n.ycard .body{ padding:10px 12px }\n.ycard .meta{\n  display:flex; align-items:center; gap:6px;\n  font-family:var(--mono); font-size:10px; color:var(--muted);\n  padding:7px 12px; border-top:1px solid var(--ui-line);\n}\n.ycard .meta .badge{\n  text-transform:uppercase; letter-spacing:.05em; color:var(--accent); font-weight:500;\n}\n.ycard .meta .src{ margin-left:auto; overflow:hidden; text-overflow:ellipsis; white-space:nowrap }\n\n.ycard.image img{ display:block; width:100%; height:auto; max-height:220px; object-fit:cover; background:#f6f6f9 }\n.ycard.link .ttl{ font-size:13px; font-weight:500; line-height:1.35;\n  display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden }\n.ycard.link .href{ font-family:var(--mono); font-size:10px; color:var(--muted); margin-top:4px;\n  overflow:hidden; text-overflow:ellipsis; white-space:nowrap }\n.ycard.clip .tagn{ font-family:var(--mono); font-size:11px; color:var(--accent) }\n.ycard.clip .txt{ font-size:12px; color:var(--ui-ink); margin-top:5px; line-height:1.45;\n  display:-webkit-box; -webkit-line-clamp:4; -webkit-box-orient:vertical; overflow:hidden }\n\n/* ============================================================\n   TOOLBAR / HUD  — the chrome you toggle from\n   ============================================================ */\n.toolbar{\n  position:fixed;\n  left:calc(50% - 160px); bottom:24px; transform:translateX(-50%);\n  pointer-events:auto;\n  display:flex; align-items:center; gap:6px;\n  background:var(--ui-bg); color:var(--ui-ink);\n  border:1px solid var(--ui-line); border-radius:999px;\n  padding:4px 6px;\n  font-family:var(--sans); font-size:13px;\n  box-shadow:0 1px 2px rgba(0,0,0,.06), 0 12px 34px var(--ui-shadow);\n  user-select:none;\n  transform-origin:center bottom;\n  animation:barIn .22s var(--ease) both;\n}\n@keyframes barIn{\n  from{ opacity:0; transform:translateX(-50%) translateY(8px) scale(.96) }\n  to{   opacity:1; transform:translateX(-50%) translateY(0) scale(1) }\n}\n/* inline mount (embedded under the wordmark): no fixed-centering entrance */\n:host([data-inline]) .toolbar{ animation:none }\n.toolbar .name{ font-weight:600; letter-spacing:-0.01em }\n.toolbar .logo{ height:17px; width:auto; display:block; color:var(--ui-ink); margin:0 8px 0 4px; transform-origin:center }\n.toolbar .spin{ animation:logoSpin .5s var(--ease); transform-origin:center }\n@keyframes logoSpin{ from{ transform:rotate(0) } to{ transform:rotate(360deg) } }\n.toolbar .sep{ width:1px; height:20px; background:var(--ui-line) }\n.toolbar .stat{ font-family:var(--mono); font-size:12px; color:var(--muted) }\n\n/* segmented action well — highlights · theme · settings */\n.toolbar .grp{\n  display:inline-flex; align-items:center; gap:2px;\n  background:var(--ui-hover); border-radius:999px; padding:3px;\n}\n.toolbar .grp .ibtn:hover{ background:var(--ui-surface) }\n.toolbar .hl.pulse{ animation:clipsPulse .28s var(--ease) }\n@keyframes clipsPulse{ 0%{ background:var(--accent-soft) } 100%{ background:transparent } }\n\n/* ghost icon buttons — theme toggle + settings */\n.toolbar .ibtn{\n  display:inline-flex; align-items:center; justify-content:center; cursor:pointer;\n  background:transparent; border:0; color:var(--muted);\n  padding:5px; border-radius:999px; line-height:0;\n  transition:background-color .12s var(--ease), color .12s var(--ease), transform .1s var(--ease);\n}\n.toolbar .ibtn:hover{ background:var(--ui-hover); color:var(--ui-ink) }\n.toolbar .ibtn:active{ transform:scale(.94) }\n.toolbar .gear{ transition:background-color .12s var(--ease), color .12s var(--ease), transform .2s var(--ease) }\n.toolbar .gear:active{ transform:rotate(90deg) }\n\n.switch{ display:inline-flex; align-items:center; gap:8px; cursor:pointer; transition:transform .1s var(--ease); }\n.switch:active{ transform:scale(.96) }\n.switch .track{\n  width:32px; height:18px; border-radius:999px; background:var(--ui-line);\n  position:relative; transition:background .15s var(--ease);\n}\n.switch .knob{\n  position:absolute; top:2px; left:2px; width:14px; height:14px;\n  border-radius:50%; background:#fff; box-shadow:0 1px 3px rgba(0,0,0,.25);\n  transition:transform .15s var(--ease);\n}\n.switch[data-on=\"true\"] .track{ background:var(--switch-on) }\n.switch[data-on=\"true\"] .knob{ transform:translateX(14px) }\n\n.kbd{\n  font-family:var(--mono); font-size:10px; color:var(--muted);\n  border:1px solid var(--ui-line); border-radius:6px; padding:2px 6px;\n  box-shadow:0 1px 0 var(--ui-line);\n}\n\n/* respect reduced motion — kill entrance, pulse, and all transforms */\n@media (prefers-reduced-motion: reduce){\n  .toolbar{ animation:none }\n  .clips-pop, .clips-pop.open, .settings-pill, .settings-pill.open{ transition:none; transform:translateX(-50%) translateY(0) }\n  .toolbar .ibtn, .settings-pill .ibtn, .settings-pill .sw, .switch, .switch .track, .switch .knob, .ycard, .ycard.enter{ transition:none; animation:none }\n  .toolbar .ibtn:active, .switch:active{ transform:none }\n  .toolbar .hl.pulse, .toolbar .spin{ animation:none }\n}\n";
/* ============================================================
   YAWP OVERLAY ENGINE  (the part Claude owns)
   ------------------------------------------------------------
   The loop: overlay on -> hover snaps to an element -> click
   CAPTURES it into Today's canvas as a card (image / link / clip).
   Clean seams so the UI (overlay.css) can change freely:
     pick(x,y)     -> which element is under the cursor
     classify(el)  -> what kind of capture it is
     capture(el)   -> push a card into Today
   The engine never decides how things look — only geometry and
   content. Styling lives entirely in overlay.css.
   ============================================================ */
(function () {
  "use strict";

  if (window.__YAWP_LOADED__) { console.log("[yawp] already loaded"); return; }
  window.__YAWP_LOADED__ = true;

  // ---- state ----
  let active = false;
  let overUI = false;
  let currentEl = null;
  let lastPoint = { x: 0, y: 0 };
  let raf = 0;
  let colOpen = false;
  let setOpen = false;
  var ACCENTS = ["#292929", "#FF1744", "#FF6D00", "#FFD600", "#00E676", "#2979FF", "#AA00FF"];

  // ---- Today store (localStorage preview of "today's canvas persists") ----
  const dayKey = "yawp-today-" + new Date().toISOString().slice(0, 10);
  let today = load();
  function load() {
    try { return JSON.parse(localStorage.getItem(dayKey) || "[]"); }
    catch (e) { return []; }
  }
  function persist() { localStorage.setItem(dayKey, JSON.stringify(today)); }

  // ---- shadow host (style-isolated, sits above the page) ----
  // inline mount: if __YAWP_MOUNT__ is a selector, the bar lives in that
  // container (in-flow) instead of fixed bottom-center.
  const MOUNT = window.__YAWP_MOUNT__ ? document.querySelector(window.__YAWP_MOUNT__) : null;
  const host = document.createElement("div");
  host.setAttribute("data-overlay-host", "");
  if (MOUNT) {
    host.setAttribute("data-inline", "");
    host.style.cssText = "display:inline-block;";
  } else {
    host.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:2147483647;";
  }
  const root = host.attachShadow({ mode: "open" });
  (MOUNT || document.documentElement).appendChild(host);

  // CSS: inlined when injected onto a live site (__YAWP_CSS__), else the file.
  // Prefer a constructed stylesheet (CSP-exempt, survives strict sites like
  // Pinterest); fall back to a <style> tag, then to a linked file.
  if (window.__YAWP_CSS__) {
    let done = false;
    try {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(window.__YAWP_CSS__);
      root.adoptedStyleSheets = [sheet];
      done = true;
    } catch (e) {}
    if (!done) {
      const s = document.createElement("style");
      s.textContent = window.__YAWP_CSS__;
      root.appendChild(s);
    }
  } else {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "overlay.css";
    root.appendChild(link);
  }

  initTheme();
  initAccent();

  const hoverLayer = el("div", "layer hover-layer");
  const toolbar = buildToolbar();
  const colorPill = buildColorPill();
  const settingsPop = buildSettings();
  root.append(hoverLayer, colorPill, settingsPop, toolbar);

  // ---- the picker: which element is under (x, y) ----
  function pick(x, y) {
    const stack = document.elementsFromPoint(x, y); // topmost first = most specific
    for (const node of stack) {
      if (!(node instanceof HTMLElement)) continue;
      if (node === document.body || node === document.documentElement) continue;
      if (node === host || host.contains(node)) continue; // never our own UI
      const r = node.getBoundingClientRect();
      if (r.width <= 2 || r.height <= 2) continue; // skip noise
      return node;
    }
    return null;
  }

  // ---- what kind of capture is this element? ----
  // Prefer the IMAGE: on sites like Pinterest the click usually lands on a
  // wrapper, so dig for an <img> inside, then a CSS background-image, before
  // falling back to link / clip.
  function classify(node) {
    const img = node.tagName === "IMG" ? node : node.querySelector("img");
    if (img && (img.currentSrc || img.src)) {
      return { kind: "image", src: img.currentSrc || img.src, alt: img.alt || "" };
    }
    const r = node.getBoundingClientRect();
    if (r.width > 80 && r.height > 80) {
      const bg = getComputedStyle(node).backgroundImage;
      const m = bg && bg.match(/url\(["']?(.*?)["']?\)/);
      if (m && m[1] && !m[1].startsWith("data:")) {
        let src = m[1];
        try { src = new URL(src, location.href).href; } catch (e) {}
        return { kind: "image", src: src, alt: "" };
      }
    }
    const a = node.closest("a[href]");
    if (a) {
      let host2 = location.host;
      try { host2 = new URL(a.href, location.href).host; } catch (e) {}
      const text = (a.textContent || "").trim().replace(/\s+/g, " ").slice(0, 100);
      return { kind: "link", href: a.href, text: text || a.href, host: host2 };
    }
    const d = describe(node);
    const txt = (node.textContent || "").trim().replace(/\s+/g, " ").slice(0, 160);
    return { kind: "clip", tag: d.tag, w: d.w, h: d.h, text: txt };
  }

  // ---- describe an element for the hover label ----
  function describe(node) {
    let tag = node.tagName.toLowerCase();
    if (node.id) tag += "#" + node.id;
    else if (node.classList.length) tag += "." + node.classList[0];
    const r = node.getBoundingClientRect();
    return { tag, w: Math.round(r.width), h: Math.round(r.height), rect: r };
  }

  // ---- draw the hover box (geometry + text only) ----
  function drawHover(node) {
    const info = describe(node);
    const c = classify(node);
    const r = info.rect;
    const box = el("div", "box");
    box.style.left = r.left + "px";
    box.style.top = r.top + "px";
    box.style.width = r.width + "px";
    box.style.height = r.height + "px";

    const label = el("div", "label");
    if (r.top < 28) label.classList.add("flip");
    const kindTxt = c.kind === "clip" ? "clip" : c.kind;
    label.innerHTML =
      '<span class="kind"></span><span class="tag"></span>' +
      '<span class="dims"><span class="w"></span><span class="x">×</span><span class="hh"></span></span>';
    label.querySelector(".kind").textContent = kindTxt;
    label.querySelector(".tag").textContent = info.tag;
    label.querySelector(".w").textContent = info.w;
    label.querySelector(".hh").textContent = info.h;
    box.appendChild(label);
    hoverLayer.appendChild(box);
  }

  // ---- capture: the whole point. element -> card on Today ----
  function capture(node) {
    const card = classify(node);
    card.at = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    card.from = location.host || "localhost";
    today.unshift(card);
    persist();
    pulse();
    flash(node);
  }

  // brief confirmation pulse where you clicked
  function flash(node) {
    const r = node.getBoundingClientRect();
    const f = el("div", "box");
    f.style.cssText =
      "position:fixed;left:" + r.left + "px;top:" + r.top + "px;width:" + r.width +
      "px;height:" + r.height + "px;border:2px solid var(--accent);background:var(--accent-soft);" +
      "transition:opacity .4s ease;pointer-events:none;";
    hoverLayer.appendChild(f);
    requestAnimationFrame(() => (f.style.opacity = "0"));
    setTimeout(() => f.remove(), 420);
  }

  // ---- per-frame hover update ----
  function update() {
    raf = 0;
    hoverLayer.textContent = "";
    if (!active || overUI) return;
    currentEl = pick(lastPoint.x, lastPoint.y);
    if (currentEl) drawHover(currentEl);
  }
  function schedule() { if (!raf) raf = requestAnimationFrame(update); }

  // brief attention pulse on the Highlights button when something lands
  function pulse() {
    const b = toolbar.querySelector(".hl");
    if (!b) return;
    b.classList.remove("pulse");
    void b.offsetWidth;
    b.classList.add("pulse");
  }

  // ---- events ----
  function onMove(e) { lastPoint = { x: e.clientX, y: e.clientY }; if (active) schedule(); }
  function onScroll() { if (active) schedule(); }
  function onClick(e) {
    if (!active || overUI) return;
    e.preventDefault();
    e.stopPropagation();
    if (currentEl) capture(currentEl);
  }
  function onKey(e) {
    if (e.key === "o" || e.key === "O") toggle();
    else if (e.key === "Escape" && active) toggle();
  }
  window.addEventListener("mousemove", onMove, true);
  window.addEventListener("scroll", onScroll, true);
  window.addEventListener("click", onClick, true);
  window.addEventListener("keydown", onKey, true);

  // ---- toggle ----
  function toggle(force) {
    active = typeof force === "boolean" ? force : !active;
    document.body.style.cursor = active ? "crosshair" : "";
    toolbar.querySelector(".switch").dataset.on = String(active);
    if (!active) hoverLayer.textContent = "";
    else { schedule(); spinActivate(); }
  }
  function openCanvas() {
    // dev: the canvas lives on the local server
    window.open("http://127.0.0.1:5750/canvas.html", "yawp-canvas");
  }
  function spinActivate() {
    [".logo", ".gear"].forEach(function (sel) {
      const e = toolbar.querySelector(sel);
      if (!e) return;
      e.classList.remove("spin");
      e.getBoundingClientRect(); // force reflow (works on SVG, unlike offsetWidth) so it restarts every time
      e.classList.add("spin");
    });
  }

  // ---- theme (light/dark) — data-theme on the shadow host ----
  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem("yawp-theme"); } catch (e) {}
    var dark = saved ? saved === "dark"
      : (window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches);
    host.setAttribute("data-theme", dark ? "dark" : "light");
  }
  function toggleTheme() {
    var dark = host.getAttribute("data-theme") === "dark";
    host.setAttribute("data-theme", dark ? "light" : "dark");
    try { localStorage.setItem("yawp-theme", dark ? "light" : "dark"); } catch (e) {}
  }

  // ---- overlay color (accent) — selectable in settings ----
  function getAccent() {
    try { return localStorage.getItem("yawp-accent") || ACCENTS[0]; } catch (e) { return ACCENTS[0]; }
  }
  function initAccent() { host.style.setProperty("--accent", getAccent()); }
  function setAccent(c) {
    host.style.setProperty("--accent", c);
    try { localStorage.setItem("yawp-accent", c); } catch (e) {}
  }

  // ---- toolbar (baseline chrome — redesign freely) ----
  function buildToolbar() {
    const bar = el("div", "toolbar");
    // clips glyph (candidate 3)
    var stackIco =
      '<svg class="ico" width="14" height="14" viewBox="0 0 24 24" fill="none" ' +
      'stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M11 13H13.6024C13.868 13 14.1228 12.8943 14.3104 12.7062L20.2946 6.70711C20.6843 6.31644 20.6839 5.68395 20.2937 5.29377L18.707 3.70711C18.3165 3.31659 17.6834 3.31659 17.2928 3.70711L11.2929 9.70712C11.1054 9.89465 11 10.149 11 10.4142V13Z"/>' +
      '<path d="M12.0003 21.0001C11.5003 21.0001 8.93732 20.1295 6.71782 17.91C3.00784 14.2 2.05809 9.13466 4.5965 6.59626C6.68218 4.51058 10.4738 4.77977 13.8179 7.00007"/>' +
      '<path d="M17.1066 10C19.9926 13.3312 21.2145 16.7286 19.0002 18.5C17.3414 19.8271 15.2423 18.2924 14.0176 17.1094"/></svg>';
    // settings glyph (filled)
    var gearIco =
      '<svg class="ico" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">' +
      '<path fill-rule="evenodd" clip-rule="evenodd" d="M3 8.08489C3 7.36234 3.38973 6.69597 4.01949 6.34173L11.0195 2.4043C11.6283 2.06185 12.3717 2.06185 12.9805 2.4043L19.9805 6.34176C20.6103 6.69599 21 7.36236 21 8.08492L21 15.9152C21 16.6378 20.6103 17.3041 19.9805 17.6584L12.9805 21.5958C12.3717 21.9382 11.6283 21.9383 11.0195 21.5958L4.01954 17.6587C3.38975 17.3044 3 16.6381 3 15.9155V8.08489ZM8.50003 12C8.50003 10.067 10.067 8.5 12 8.5C13.933 8.5 15.5 10.067 15.5 12C15.5 13.933 13.933 15.5 12 15.5C10.067 15.5 8.50003 13.933 8.50003 12Z"/></svg>';
    // select-element glyph (target frame)
    var pickIco =
      '<svg class="ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M19 4H5C4.44772 4 4 4.44772 4 5V19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V5C20 4.44772 19.5523 4 19 4Z"/>' +
      '<path d="M12 4V6M12 20V18M4 12H6M20 12H18"/>' +
      '<path d="M10 12H14M12 10V14"/></svg>';
    // theme glyph (half-disc — reads instantly as light/dark)
    var themeIco =
      '<svg class="ico" width="15" height="15" viewBox="0 0 24 24" fill="none">' +
      '<path fill-rule="evenodd" clip-rule="evenodd" d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4V20ZM22 12C22 17.5228 17.5228 22 12 22C11.6252 22 11.2549 21.9793 10.8901 21.939C5.88912 21.3862 2 17.148 2 12C2 6.85205 5.88912 2.61382 10.8901 2.06098C11.2549 2.02066 11.6252 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="currentColor"/></svg>';
    bar.innerHTML =
      '<svg class="logo" viewBox="0 0 381 476" fill="currentColor" aria-label="yawp"><path d="M237.804 282.322C263.126 246.443 337.141 136.295 323.802 94.8784C317.679 75.8632 294.155 73.7294 291.138 48.8075C289.811 37.8407 292.632 26.0893 299.535 17.3803C306.859 8.14179 316.229 1.72781 328.079 0.424477C340.596 -0.952398 353.378 1.77699 363.283 9.83284C374.241 18.7459 378.916 32.4366 380.302 46.105C389.092 132.737 278.149 280.801 225.259 345.933C184.142 395.14 124.372 465.31 56.3614 474.822C41.3639 476.077 26.9056 474.721 14.712 465.185C-17.9158 439.466 8.22229 382.28 49.2355 395.695C66.2658 399.873 73.6681 422.551 92.3033 419.386C128.64 413.214 161.959 374.445 183.838 348.139C182.336 290.919 175.778 232.177 167.482 175.556C164.133 152.696 152.281 65.439 135.752 53.7017C133.839 52.3432 131.495 51.7427 129.182 52.2436C111.666 56.0365 102.549 86.9186 94.0886 100.425C92.0178 103.729 88.9773 105.892 85.1294 106.69C80.6525 107.619 75.65 106.247 71.9072 103.698C69.2392 101.92 67.443 99.1015 66.96 95.9335C64.8865 82.9119 87.0679 45.9836 95.6664 34.9311C110.223 16.2217 123.445 3.7142 147.686 0.288084C161.61 -1.20381 176.127 3.10903 186.116 12.9888C195.001 21.7755 201.302 34.2513 205.315 46.019C214.633 73.3373 218.587 102.297 222.994 130.715C230.893 181.153 236.694 231.233 237.804 282.322Z"/></svg>' +
      '<label class="switch" data-on="false"><span class="track"><span class="knob"></span></span></label>' +
      '<div class="grp">' +
        '<button class="ibtn hl" title="Highlights this session">' + stackIco + '</button>' +
        '<button class="ibtn pick" title="Soon!">' + pickIco + '</button>' +
        '<button class="ibtn gear" title="Settings">' + gearIco + '</button>' +
      '</div>';
    // inline fallback so the HUD is visible even if a strict CSP blocks our CSS
    var look =
      "pointer-events:auto;display:flex;align-items:center;gap:6px;" +
      "background:var(--ui-bg);color:var(--ui-ink);border:1px solid var(--ui-line);border-radius:999px;" +
      "padding:4px 6px;font:13px Inter,system-ui,sans-serif;" +
      "box-shadow:0 8px 30px var(--ui-shadow);";
    if (MOUNT) {
      // in-flow under the wordmark; kill the fixed-centering entrance (no translateX)
      bar.style.cssText = "position:static;animation:none;transform:none;" + look;
    } else {
      var pos = window.__YAWP_CENTER__
        ? "top:50%;bottom:auto;left:50%;transform:translate(-50%,-50%);" // dead center (design sandbox)
        : "top:auto;left:50%;bottom:24px;transform:translateX(-50%);";   // bottom-center (live)
      bar.style.cssText = "position:fixed;" + pos + "z-index:2147483647;" + look;
    }
    bar.addEventListener("mouseenter", () => (overUI = true));
    bar.addEventListener("mouseleave", () => (overUI = false));
    bar.querySelector(".switch").addEventListener("click", () => toggle());
    bar.querySelector(".hl").addEventListener("click", () => toggleColorPill());
    // .pick (canvas) is disabled for now — tooltip says "Soon!"
    bar.querySelector(".gear").addEventListener("click", () => toggleSettings());
    return bar;
  }

  // ---- position a pill centered above a toolbar button ----
  function positionPill(pill, btnSel) {
    const br = toolbar.getBoundingClientRect();
    const gr = toolbar.querySelector(btnSel).getBoundingClientRect();
    pill.style.left = gr.left + gr.width / 2 + "px";
    pill.style.bottom = window.innerHeight - br.top + 10 + "px";
  }

  // ---- color pill (opens from the Highlights icon) ----
  function buildColorPill() {
    const p = el("div", "settings-pill color-pill");
    var cur = getAccent();
    var sw = ACCENTS.map(function (c) {
      return '<button class="sw' + (c.toLowerCase() === cur.toLowerCase() ? " sel" : "") +
        '" data-c="' + c + '" style="--c:' + c + '" title="' + c + '"></button>';
    }).join("");
    // the colorpick is always expanded inside this pill — it IS the selector
    p.innerHTML = '<div class="colorpick open"><div class="opts">' + sw + '</div></div>';
    p.querySelector(".colorpick").addEventListener("click", function (e) {
      const s = e.target.closest(".sw");
      if (!s) return;
      setAccent(s.dataset.c);
      p.querySelectorAll(".sw").forEach(function (x) { x.classList.toggle("sel", x === s); });
      toggleColorPill(false); // pick → close
    });
    p.addEventListener("mouseenter", () => (overUI = true));
    p.addEventListener("mouseleave", () => (overUI = false));
    return p;
  }
  function toggleColorPill(force) {
    colOpen = typeof force === "boolean" ? force : !colOpen;
    if (colOpen) { positionPill(colorPill, ".hl"); setOpen = false; settingsPop.classList.remove("open"); }
    colorPill.classList.toggle("open", colOpen);
  }

  // ---- settings pill (opens from the gear) — theme only ----
  function buildSettings() {
    var themeIco =
      '<svg class="ico" width="15" height="15" viewBox="0 0 24 24" fill="none">' +
      '<path fill-rule="evenodd" clip-rule="evenodd" d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4V20ZM22 12C22 17.5228 17.5228 22 12 22C11.6252 22 11.2549 21.9793 10.8901 21.939C5.88912 21.3862 2 17.148 2 12C2 6.85205 5.88912 2.61382 10.8901 2.06098C11.2549 2.02066 11.6252 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="currentColor"/></svg>';
    const p = el("div", "settings-pill");
    p.innerHTML = '<button class="ibtn theme" title="Light / dark">' + themeIco + '</button>';
    p.querySelector(".theme").addEventListener("click", toggleTheme);
    p.addEventListener("mouseenter", () => (overUI = true));
    p.addEventListener("mouseleave", () => (overUI = false));
    return p;
  }
  function toggleSettings(force) {
    setOpen = typeof force === "boolean" ? force : !setOpen;
    if (setOpen) {
      positionPill(settingsPop, ".gear");
      colOpen = false; colorPill.classList.remove("open");
    }
    settingsPop.classList.toggle("open", setOpen);
  }

  // ---- helper ----
  function el(tag, cls) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    return n;
  }

  console.log("[yawp overlay] ready — press O, then click anything to clip it to Today");
})();
