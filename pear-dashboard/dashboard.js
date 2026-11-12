/* PEAR dashboard: world map, trends, country profile, data table.
   Data: /pear-dashboard/data/pear_country.json (built by update_data.R). */
(function () {
  "use strict";

  // ---- Settings -----------------------------------------------------------
  // At launch: set RELEASE_URL to the official dataset page (e.g. Dataverse).
  var RELEASE_URL = "https://doi.org/10.7910/DVN/UKEBMH";
  // At launch: set to the Codebook_v2.pdf and Country_Notes_v2.pdf files on Dataverse
  // (buttons stay greyed out while empty). Update at every new data version.
  var CODEBOOK_URL = "https://dataverse.harvard.edu/file.xhtml?fileId=14413469";
  var NOTES_URL = "https://dataverse.harvard.edu/file.xhtml?fileId=14413465";
  // var CITATION = "Wiebrecht, Felix. Forthcoming. “Parliamentary Elites in Authoritarian Regimes (PEAR): New Data.” Journal of Peace Research.";
  var CITATION = "Wiebrecht, Felix. 2026. “Parliamentary Elites in Authoritarian Regimes (PEAR): New Data.” Journal of Peace Research. https://doi.org/10.1093/jopres/xjag087";
  var DATA_URL = "/pear-dashboard/data/pear_country.json";
  var DEFAULT_TRENDS = [];  // countries pre-selected in the trends chart (none)
  var DEFAULT_PROFILE = "";  // country profile starts on the "Choose a country" prompt
  var MAX_SERIES = 6;

  // Colours (validated categorical order; sequential blue ramp; diverging blue-red)
  var SERIES = ["#2a78d6", "#eb6834", "#1baf7a", "#eda100", "#e87ba4", "#008300"];
  var SEQ = [[0, "#cde2fb"], [0.17, "#9ec5f4"], [0.33, "#6da7ec"], [0.5, "#3987e5"], [0.67, "#256abf"], [0.83, "#184f95"], [1, "#0d366b"]];
  var DIV = [[0, "#b8323a"], [0.25, "#e98a86"], [0.5, "#efefef"], [0.75, "#86b6ef"], [1, "#1c5cab"]];
  var INK = "#222222", INK2 = "#444444", MUTED = "#777777", GRID = "#e6e6e6", AXIS = "#bbbbbb";
  var FONT = '"Source Serif 4", Georgia, serif';

  // ---- Variables ----------------------------------------------------------
  // groups: which of all/rp/rs/op exist; cov: coverage column shown alongside
  var GROUPS = [
    { key: "all", suffix: "", label: "All MPs" },
    { key: "rp", suffix: "_rp", label: "Ruling party" },
    { key: "rs", suffix: "_rs", label: "Regime supporters" },
    { key: "op", suffix: "_op", label: "Opposition" }
  ];
  var ALLG = ["all", "rp", "rs", "op"];
  var VARS = [
    { cat: "Turnover", key: "retentionrate", label: "Retention rate", unit: "%", groups: ALLG, cov: null,
      desc: "Share of MPs who also held a seat in the previous legislative term. Missing when the previous term’s coverage is outside 95–105%." },

    { cat: "Gender", key: "women_share", label: "Women MPs", unit: "%", groups: ALLG, cov: "coverage_gender",
      desc: "Share of women among MPs with known gender (within the selected group)." },

    { cat: "Age", key: "meanage", label: "Mean age", unit: "years", groups: ALLG, cov: "coverage_age",
      desc: "Mean age of MPs with known age at the start of the term." },
    { cat: "Age", key: "medianage", label: "Median age", unit: "years", groups: ALLG, cov: "coverage_age",
      desc: "Median age of MPs with known age at the start of the term." },
    { cat: "Age", key: "thirtyorunder_share", label: "Aged 30 or under", unit: "%", groups: ALLG, cov: "coverage_age", desc: "Share of MPs aged 30 or under, among MPs with known age." },
    { cat: "Age", key: "thirtyfiveorunder_share", label: "Aged 35 or under", unit: "%", groups: ALLG, cov: "coverage_age", desc: "Share of MPs aged 35 or under, among MPs with known age." },
    { cat: "Age", key: "fortyorunder_share", label: "Aged 40 or under", unit: "%", groups: ALLG, cov: "coverage_age", desc: "Share of MPs aged 40 or under, among MPs with known age." },
    { cat: "Age", key: "seventyorover_share", label: "Aged 70 or over", unit: "%", groups: ALLG, cov: "coverage_age", desc: "Share of MPs aged 70 or over, among MPs with known age." },
    { cat: "Age", key: "seventyfiveorover_share", label: "Aged 75 or over", unit: "%", groups: ALLG, cov: "coverage_age", desc: "Share of MPs aged 75 or over, among MPs with known age." },
    { cat: "Age", key: "eightyorover_share", label: "Aged 80 or over", unit: "%", groups: ALLG, cov: "coverage_age", desc: "Share of MPs aged 80 or over, among MPs with known age." },

    { cat: "Young and old women MPs", key: "womenthirtyorunder_share", label: "Women MPs aged 30 or under", unit: "%", groups: ALLG, cov: "coverage_age", desc: "Women aged 30 or under as a share of all MPs with known age and gender (within the selected group)." },
    { cat: "Young and old women MPs", key: "womenthirtyfiveorunder_share", label: "Women MPs aged 35 or under", unit: "%", groups: ALLG, cov: "coverage_age", desc: "Women aged 35 or under as a share of all MPs with known age and gender (within the selected group)." },
    { cat: "Young and old women MPs", key: "womenfortyorunder_share", label: "Women MPs aged 40 or under", unit: "%", groups: ALLG, cov: "coverage_age", desc: "Women aged 40 or under as a share of all MPs with known age and gender (within the selected group)." },
    { cat: "Young and old women MPs", key: "womenseventyorover_share", label: "Women MPs aged 70 or over", unit: "%", groups: ALLG, cov: "coverage_age", desc: "Women aged 70 or over as a share of all MPs with known age and gender (within the selected group)." },
    { cat: "Young and old women MPs", key: "womenseventyfiveorover_share", label: "Women MPs aged 75 or over", unit: "%", groups: ALLG, cov: "coverage_age", desc: "Women aged 75 or over as a share of all MPs with known age and gender (within the selected group)." },
    { cat: "Young and old women MPs", key: "womeneightyorover_share", label: "Women MPs aged 80 or over", unit: "%", groups: ["all", "rp", "rs"], cov: "coverage_age", desc: "Women aged 80 or over as a share of all MPs with known age and gender (within the selected group)." },

    { cat: "Parties", key: "rulingparty_share", label: "Ruling party seat share", unit: "%", groups: ["all"], cov: "coverage_party", desc: "Share of MPs (with known party) who belong to the ruling party." },
    { cat: "Parties", key: "regimesupporters_share", label: "Regime supporters’ seat share", unit: "%", groups: ["all"], cov: "coverage_party", desc: "Share of MPs (with known party) classified as regime supporters: the ruling party plus loyal and allied parties." },
    { cat: "Parties", key: "opposition_share", label: "Opposition seat share", unit: "%", groups: ["all"], cov: "coverage_party", desc: "Share of MPs (with known party) classified as opposition." },
    { cat: "Parties", key: "num_parties", label: "Number of parties", unit: "parties", groups: ["all"], cov: "coverage_party", desc: "Number of distinct parties among MPs." },

    { cat: "Legislature", key: "leg_seats", label: "Seats", unit: "seats", groups: ["all"], cov: "coverage_mps", desc: "Nominal number of seats in the lower or unicameral chamber." },
    { cat: "Legislature", key: "no", label: "MPs identified", unit: "MPs", groups: ["all"], cov: "coverage_mps", desc: "Number of MPs identified in PEAR for this term." },
    { cat: "Legislature", key: "seatchange_rel", label: "Change in seats", unit: "%", groups: ["all"], cov: "coverage_mps", diverging: true, desc: "Change in the number of seats relative to the previous term. Missing when the previous term is not in PEAR." },

    { cat: "Coverage", key: "coverage_mps", label: "Coverage: MPs", unit: "%", groups: ["all"], cov: null, desc: "MPs identified in PEAR as a share of the chamber’s seats (can exceed 100%)." },
    { cat: "Coverage", key: "coverage_gender", label: "Coverage: gender", unit: "%", groups: ["all"], cov: null, desc: "Share of MPs whose gender is known." },
    { cat: "Coverage", key: "coverage_age", label: "Coverage: age", unit: "%", groups: ["all"], cov: null, desc: "Share of MPs whose age is known." },
    { cat: "Coverage", key: "coverage_party", label: "Coverage: party", unit: "%", groups: ["all"], cov: null, desc: "Share of MPs whose party affiliation is known." },
  ];
  var VAR_BY_KEY = {};
  VARS.forEach(function (v) { VAR_BY_KEY[v.key] = v; });

  // ---- State --------------------------------------------------------------
  var S = {
    columns: [], rows: [], countries: [],
    varKey: "women_share", group: "all", year: 2020,
    trends: [], profile: DEFAULT_PROFILE,
    tab: "map", zRange: {}
  };

  // ---- Helpers ------------------------------------------------------------
  function $(id) { return document.getElementById(id); }
  function el(tag, attrs, text) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    if (text != null) e.textContent = text;
    return e;
  }
  function isNum(x) { return typeof x === "number" && isFinite(x); }
  function col(varKey, group) {
    var g = GROUPS.filter(function (x) { return x.key === group; })[0];
    return varKey + (g ? g.suffix : "");
  }
  function currentCol() { return col(S.varKey, S.group); }
  function groupLabel(group) { return GROUPS.filter(function (g) { return g.key === group; })[0].label; }
  function fmt(v, unit) {
    if (!isNum(v)) return "–";
    if (unit === "%" || unit === "pp") return v.toFixed(1) + (unit === "%" ? "%" : " pp");
    if (unit === "years") return v.toFixed(1);
    return Math.round(v).toLocaleString("en-GB");
  }
  function varTitle() {
    var v = VAR_BY_KEY[S.varKey];
    return v.label + (v.groups.length > 1 ? " — " + groupLabel(S.group) : "");
  }
  function axisTitle() {
    var v = VAR_BY_KEY[S.varKey];
    return v.unit === "%" ? v.label + " (%)" : v.unit === "pp" ? v.label + " (pp)" : v.label + " (" + v.unit + ")";
  }
  function termsOf(country) {
    return S.rows.filter(function (r) { return r.country === country; })
      .sort(function (a, b) { return a.legislature_start - b.legislature_start; });
  }
  function baseLayout(extra) {
    var l = {
      font: { family: FONT, size: 12, color: INK2 },
      paper_bgcolor: "rgba(0,0,0,0)", plot_bgcolor: "rgba(0,0,0,0)",
      margin: { l: 56, r: 24, t: 16, b: 44 },
      hoverlabel: { bgcolor: "#ffffff", bordercolor: GRID, font: { family: FONT, color: INK, size: 12 }, align: "left" },
      xaxis: { gridcolor: GRID, linecolor: AXIS, zeroline: false, tickfont: { color: MUTED }, fixedrange: true },
      yaxis: { gridcolor: GRID, linecolor: AXIS, zeroline: false, tickfont: { color: MUTED }, fixedrange: true, rangemode: "tozero" }
    };
    return Object.assign(l, extra || {});
  }
  var PCONF = { displayModeBar: false, responsive: true };
  function yearRange(rowsList) {
    var ys = [];
    rowsList.forEach(function (rows) { rows.forEach(function (r) { ys.push(r.legislature_start); }); });
    if (!ys.length) return [1943, 2027];
    return [Math.min.apply(null, ys) - 2, Math.max.apply(null, ys) + 2];
  }

  // ---- Controls -----------------------------------------------------------
  function buildControls() {
    var sel = $("pd-var"), cats = {};
    VARS.forEach(function (v) {
      if (!cats[v.cat]) { cats[v.cat] = el("optgroup", { label: v.cat }); sel.appendChild(cats[v.cat]); }
      var o = el("option", { value: v.key }, v.label);
      cats[v.cat].appendChild(o);
    });
    sel.value = S.varKey;
    sel.addEventListener("change", function () {
      S.varKey = sel.value;
      if (VAR_BY_KEY[S.varKey].groups.indexOf(S.group) < 0) S.group = "all";
      refresh();
    });

    var seg = $("pd-group");
    GROUPS.forEach(function (g) {
      var b = el("button", { type: "button", "data-group": g.key, "aria-pressed": "false" }, g.label);
      b.addEventListener("click", function () { S.group = g.key; refresh(); });
      seg.appendChild(b);
    });

    var yr = $("pd-year");
    // slider range from the data (first to latest legislature start year), not fixed in the HTML
    var starts = S.rows.map(function (r) { return r.legislature_start; });
    yr.min = Math.min.apply(null, starts);
    yr.max = Math.max.apply(null, starts);
    S.year = Math.min(Math.max(S.year, +yr.min), +yr.max);
    yr.value = S.year;
    yr.addEventListener("input", function () { S.year = +yr.value; renderMap(); });

    // tabs
    ["map", "trends", "profile"].forEach(function (t) {
      $("tab-" + t).addEventListener("click", function () { showTab(t); });
    });
    // $("pd-citation").textContent = CITATION;
    // citation text + the DOI as a clickable link (opens in a new tab)
    var citeBox = $("pd-citation"), doiAt = CITATION.indexOf("https://doi.org/");
    citeBox.textContent = doiAt >= 0 ? CITATION.slice(0, doiAt) : CITATION;
    if (doiAt >= 0) {
      var doiUrl = CITATION.slice(doiAt);
      citeBox.appendChild(el("a", { href: doiUrl, target: "_blank", rel: "noopener" }, doiUrl));
    }

    var rel = $("pd-release");
    if (RELEASE_URL) { rel.href = RELEASE_URL; }
    else { rel.setAttribute("aria-disabled", "true"); rel.removeAttribute("href"); rel.textContent = "Download the dataset (link added at launch)"; }

    // codebook + country notes (Dataverse files); greyed out until the URLs are set
    [["pd-codebook", CODEBOOK_URL], ["pd-notes", NOTES_URL]].forEach(function (b) {
      var a = $(b[0]);
      if (b[1]) { a.href = b[1]; }
      else { a.setAttribute("aria-disabled", "true"); a.removeAttribute("href"); }
    });

    // data version line, from the "meta" block written by update_data.R
    if (S.meta && S.meta.version) {
      $("pd-version").textContent = "Data: PEAR version " + S.meta.version + (S.meta.updated ? ", updated " + S.meta.updated : "") + ".";
    }

    // country lists
    var ps = $("pd-profile-country");
    ps.appendChild(el("option", { value: "" }, "Choose a country\u2026"));
    S.countries.forEach(function (c) { ps.appendChild(el("option", { value: c }, c)); });
    combobox($("pd-add-country"), function (name) {
      if (addCountry(name)) { $("pd-add-country").value = ""; renderTrends(); }
    });
    ps.value = S.profile;
    ps.addEventListener("change", function () { S.profile = ps.value; renderProfile(); });

    $("pd-add-btn").addEventListener("click", addFromInput);

  }

  function syncControls() {
    var v = VAR_BY_KEY[S.varKey];
    $("pd-var").value = S.varKey;
    Array.prototype.forEach.call($("pd-group").children, function (b) {
      var g = b.getAttribute("data-group");
      var ok = v.groups.indexOf(g) >= 0 && S.columns.indexOf(col(S.varKey, g)) >= 0;
      b.disabled = !ok;
      b.setAttribute("aria-pressed", String(g === S.group));
    });
    $("pd-var-desc").textContent = v.desc;
  }

  function showTab(t) {
    S.tab = t;
    if (history.replaceState) history.replaceState(null, "", "#" + t);
    ["map", "trends", "profile"].forEach(function (x) {
      $("tab-" + x).setAttribute("aria-selected", String(x === t));
      $("panel-" + x).hidden = x !== t;
    });
    refresh();
  }

  function refresh() {
    syncControls();
    if (S.tab === "map") renderMap();
    if (S.tab === "trends") renderTrends();
    if (S.tab === "profile") renderProfile();
  }



  // ---- Country combobox -----------------------------------------------------
  // Text input with a scrollable, filterable list of countries (mouse and keyboard).
  var comboCount = 0;
  function combobox(input, onPick) {
    var id = "pd-combo-" + (++comboCount), list = el("ul", { class: "pd-combo-list", role: "listbox", id: id });
    list.hidden = true;
    input.parentNode.appendChild(list);
    input.setAttribute("role", "combobox");
    input.setAttribute("aria-autocomplete", "list");
    input.setAttribute("aria-controls", id);
    input.setAttribute("aria-expanded", "false");
    var items = [], active = -1;
    function render() {
      var q = input.value.trim().toLowerCase();
      items = S.countries.filter(function (c) { return !q || c.toLowerCase().indexOf(q) >= 0; });
      list.textContent = ""; active = -1;
      if (!items.length) { list.appendChild(el("li", { class: "pd-combo-empty" }, "No matching country")); }
      items.forEach(function (c, i) {
        var li = el("li", { role: "option", id: id + "-" + i, "aria-selected": "false" }, c);
        li.addEventListener("mousedown", function (e) { e.preventDefault(); pick(c); });
        list.appendChild(li);
      });
      open();
    }
    function open() { list.hidden = false; input.setAttribute("aria-expanded", "true"); }
    function close() { list.hidden = true; input.setAttribute("aria-expanded", "false"); input.removeAttribute("aria-activedescendant"); }
    function setActive(i) {
      var lis = list.querySelectorAll('li[role="option"]');
      if (!lis.length) return;
      if (active >= 0 && lis[active]) lis[active].setAttribute("aria-selected", "false");
      active = (i + lis.length) % lis.length;
      lis[active].setAttribute("aria-selected", "true");
      lis[active].scrollIntoView({ block: "nearest" });
      input.setAttribute("aria-activedescendant", lis[active].id);
    }
    function pick(c) { close(); onPick(c); }
    input.addEventListener("focus", render);
    input.addEventListener("click", render);
    input.addEventListener("input", render);
    input.addEventListener("blur", function () { setTimeout(close, 100); });
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); if (list.hidden) render(); setActive(active + 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setActive(active - 1); }
      else if (e.key === "Enter") {
        e.preventDefault();
        var q = input.value.trim().toLowerCase();
        var exact = items.filter(function (c) { return c.toLowerCase() === q; })[0];
        var choice = active >= 0 ? items[active] : (exact || (items.length === 1 ? items[0] : null));
        if (choice) pick(choice);
      }
      else if (e.key === "Escape") { close(); }
    });
  }

  // ---- Coverage rules (map and trends) --------------------------------------
  // A term is shown only if coverage is 95-105% on the relevant dimension(s):
  // age variables -> age; women MPs -> gender; women age-bracket shares -> age AND gender;
  // ruling party / regime supporter / opposition seat shares and number of parties -> party
  function covRules(varKey) {
    var v = VAR_BY_KEY[varKey], rules = [];
    if (v.cov === "coverage_age") rules.push("coverage_age");
    if (varKey === "women_share" || (v.cov === "coverage_age" && varKey.indexOf("women") === 0)) rules.push("coverage_gender");
    if (["rulingparty_share", "regimesupporters_share", "opposition_share", "num_parties"].indexOf(varKey) >= 0) rules.push("coverage_party");
    return rules;
  }
  function covPass(r, rules) { return rules.every(function (k) { return r[k] >= 95 && r[k] <= 105; }); }
  function covNames(rules) { return rules.map(function (k) { return k.replace("coverage_", ""); }).join(" or "); }
  function covText(r, rules) {
    return rules.map(function (k) { var n = k.replace("coverage_", ""); return n.charAt(0).toUpperCase() + n.slice(1) + " coverage " + fmt(r[k], "%"); }).join(", ");
  }

  // ---- Chart menu: full screen, print, image/PDF export with watermark ----
  // var WATERMARK = "Source: PEAR (Wiebrecht, Journal of Peace Research) · felixwiebrecht.com/pear";
  var WATERMARK = "Source: PEAR (Wiebrecht 2026, Journal of Peace Research) · doi.org/10.1093/jopres/xjag087 · felixwiebrecht.com/pear";
  var JSPDF_URL = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";

  function slug(t) { return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80); }

  // Build an export copy of the figure with a title and the watermark; the chart on screen is untouched.
  function exportFigure(gd, title, w, h) {
    var layout = JSON.parse(JSON.stringify(gd.layout));
    var m = layout.margin || {};
    layout.margin = { l: m.l || 40, r: m.r || 24, t: (m.t || 16) + 56, b: (m.b || 40) + 44 + (layout.showlegend ? 40 : 0) };
    if (layout.showlegend && layout.legend) { layout.legend.y = 0; layout.legend.yanchor = "top"; layout.legend.yref = "paper"; layout.legend.y = -0.08; }
    layout.paper_bgcolor = "#ffffff";
    layout.width = w; layout.height = h;
    var ann = (layout.annotations || []).slice();
    ann.push({ text: "<b>" + title + "</b>", xref: "paper", yref: "paper", x: 0, y: 1, xanchor: "left", yanchor: "bottom",
      yshift: 24, showarrow: false, align: "left", font: { family: FONT, size: 18, color: INK } });
    ann.push({ text: WATERMARK, xref: "paper", yref: "paper", x: 0, y: 0, xanchor: "left", yanchor: "top",
      yshift: -(layout.margin.b - 18), showarrow: false, align: "left", font: { family: FONT, size: 11, color: MUTED } });
    layout.annotations = ann;
    return { data: gd.data, layout: layout };
  }

  function saveUrl(url, name) {
    var a = el("a", { href: url, download: name });
    document.body.appendChild(a); a.click(); a.remove();
  }

  function loadJsPDF() {
    if (window.jspdf) return Promise.resolve(window.jspdf.jsPDF);
    return new Promise(function (resolve, reject) {
      var sc = el("script", { src: JSPDF_URL });
      sc.onload = function () { resolve(window.jspdf.jsPDF); };
      sc.onerror = function () { reject(new Error("PDF library could not be loaded")); };
      document.head.appendChild(sc);
    });
  }

  function exportChart(card, gd, getTitle, kind) {
    var title = getTitle();
    var w = 1400, h = Math.round(1400 * gd.clientHeight / Math.max(gd.clientWidth, 1)) + 100;
    var fig = exportFigure(gd, title, w, h);
    var name = "PEAR_" + slug(title);
    if (kind === "svg") return Plotly.toImage(fig, { format: "svg", width: w, height: h }).then(function (u) { saveUrl(u, name + ".svg"); });
    if (kind === "png" || kind === "jpeg") return Plotly.toImage(fig, { format: kind, width: w, height: h, scale: 2 }).then(function (u) { saveUrl(u, name + (kind === "png" ? ".png" : ".jpg")); });
    if (kind === "pdf") return Promise.all([Plotly.toImage(fig, { format: "png", width: w, height: h, scale: 2 }), loadJsPDF()]).then(function (res) {
      var JsPDF = res[1], doc = new JsPDF({ orientation: w >= h ? "landscape" : "portrait", unit: "pt", format: [w, h] });
      doc.addImage(res[0], "PNG", 0, 0, w, h);
      doc.save(name + ".pdf");
    });
    if (kind === "print") return Plotly.toImage(fig, { format: "png", width: w, height: h, scale: 2 }).then(function (u) {
      var f = el("iframe", { title: "print", "aria-hidden": "true" });
      f.style.position = "fixed"; f.style.width = "0"; f.style.height = "0"; f.style.border = "0";
      document.body.appendChild(f);
      var d = f.contentWindow.document;
      d.open(); d.write("<!doctype html><title>" + name + "</title><style>@page{margin:12mm}body{margin:0}img{width:100%}</style><img>"); d.close();
      var img = d.querySelector("img");
      img.onload = function () { f.contentWindow.focus(); f.contentWindow.print(); setTimeout(function () { f.remove(); }, 1000); };
      img.src = u;
    });
    if (kind === "fullscreen") {
      if (document.fullscreenElement) return document.exitFullscreen();
      if (card.requestFullscreen) return card.requestFullscreen();
    }
  }

  function addChartMenu(card, gd, getTitle) {
    if (card.querySelector(".pd-menu-btn")) return;
    var btn = el("button", { type: "button", class: "pd-menu-btn", "aria-haspopup": "menu", "aria-expanded": "false", "aria-label": "Chart options" }, "☰");
    var menu = el("ul", { class: "pd-menu", role: "menu" });
    menu.hidden = true;
    var items = [["fullscreen", "View in full screen"], ["print", "Print chart"], null,
      ["png", "Download PNG image"], ["jpeg", "Download JPEG image"], ["pdf", "Download PDF document"], ["svg", "Download SVG vector image"]];
    items.forEach(function (it) {
      if (!it) { menu.appendChild(el("li", { role: "separator" })); return; }
      var li = el("li", { role: "none" });
      var b = el("button", { type: "button", role: "menuitem" }, it[1]);
      b.addEventListener("click", function () {
        close();
        Promise.resolve(exportChart(card, gd, getTitle, it[0])).catch(function (e) { $("pd-status").textContent = "Export failed: " + e.message; });
      });
      li.appendChild(b); menu.appendChild(li);
    });
    function close() { menu.hidden = true; btn.setAttribute("aria-expanded", "false"); }
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = menu.hidden;
      menu.hidden = !open; btn.setAttribute("aria-expanded", String(open));
      if (open) menu.querySelector("button").focus();
    });
    document.addEventListener("click", function (e) { if (!card.contains(e.target)) close(); });
    menu.addEventListener("keydown", function (e) { if (e.key === "Escape") { close(); btn.focus(); } });
    card.appendChild(btn); card.appendChild(menu);
  }

  document.addEventListener("fullscreenchange", function () {
    var charts = document.querySelectorAll(".pd-chart-card .js-plotly-plot");
    Array.prototype.forEach.call(charts, function (g) { Plotly.Plots.resize(g); });
  });

  // ---- Map ----------------------------------------------------------------
  function zRangeFor(c) {
    if (S.zRange[c]) return S.zRange[c];
    var vals = S.rows.map(function (r) { return r[c]; }).filter(isNum).sort(function (a, b) { return a - b; });
    // 2nd-98th percentile so a few extreme terms don't flatten the colour scale
    var lo = vals.length ? vals[Math.floor(0.02 * (vals.length - 1))] : 0;
    var hi = vals.length ? vals[Math.ceil(0.98 * (vals.length - 1))] : 1;
    if (VAR_BY_KEY[S.varKey].unit === "%" && !VAR_BY_KEY[S.varKey].diverging) lo = Math.min(0, lo);
    S.zRange[c] = [lo, hi];
    return S.zRange[c];
  }

  function renderMap() {
    $("pd-year-out").textContent = S.year;
    var c = currentCol(), v = VAR_BY_KEY[S.varKey];
    var inForce = {};
    S.rows.forEach(function (r) {
      if (r.legislature_start <= S.year && r.legislature_end >= S.year && r.iso !== "DDR") {
        var cur = inForce[r.iso];
        if (!cur || r.legislature_start > cur.legislature_start) inForce[r.iso] = r;
      }
    });
    var have = [], miss = [];
    var covFilter = covRules(S.varKey);
    var covName = covNames(covFilter);
    var covOk = function (r) { return covPass(r, covFilter); };
    Object.keys(inForce).forEach(function (iso) {
      var r = inForce[iso];
      (isNum(r[c]) && covOk(r) ? have : miss).push(r);
    });
    $("pd-missing-label").textContent = covFilter.length ? "PEAR term, no data or " + covName + " coverage outside 95\u2013105%" : "PEAR term, no data for this variable";
    var zr = zRangeFor(c);
    var hover = function (r) {
      var cov = v.cov ? "<br>Coverage (" + v.cov.replace("coverage_", "") + "): " + fmt(r[v.cov], "%") : "";
      return "<b>" + fmt(r[c], v.unit) + "</b>" + (v.unit !== "%" && v.unit !== "pp" ? " " + v.unit : "") +
        "<br>" + r.country + " · term " + r.legislature_start + "–" + r.legislature_end + cov;
    };
    var traces = [{
      type: "choropleth", locationmode: "ISO-3",
      locations: have.map(function (r) { return r.iso; }),
      z: have.map(function (r) { return r[c]; }),
      text: have.map(hover), hovertemplate: "%{text}<extra></extra>",
      zmin: v.diverging ? -Math.max(Math.abs(zr[0]), Math.abs(zr[1])) : zr[0],
      zmax: v.diverging ? Math.max(Math.abs(zr[0]), Math.abs(zr[1])) : zr[1],
      colorscale: v.diverging ? DIV : SEQ,
      marker: { line: { color: "#ffffff", width: 0.6 } },
      colorbar: { title: { text: v.unit === "%" ? "%" : v.unit, side: "top", font: { size: 11, color: INK2 } },
        thickness: 10, len: 0.6, outlinewidth: 0, tickfont: { color: MUTED, size: 11 } }
    }, {
      type: "choropleth", locationmode: "ISO-3",
      locations: miss.map(function (r) { return r.iso; }),
      z: miss.map(function () { return 1; }),
      text: miss.map(function (r) {
        var why = covFilter.length && isNum(r[c]) ? covFilter.map(function (k) {
          var n = k.replace("coverage_", ""); return n.charAt(0).toUpperCase() + n.slice(1) + " coverage " + fmt(r[k], "%");
        }).join(", ") + " (needs 95\u2013105%)" : "No data";
        return "<b>" + why + "</b><br>" + r.country + " \u00b7 term " + r.legislature_start + "\u2013" + r.legislature_end;
      }),
      hovertemplate: "%{text}<extra></extra>",
      colorscale: [[0, "#c8c8c8"], [1, "#c8c8c8"]], showscale: false,
      marker: { line: { color: "#ffffff", width: 0.6 } }
    }];
    var layout = baseLayout({
      margin: { l: 0, r: 0, t: 8, b: 0 },
      geo: { projection: { type: "natural earth" }, showframe: false, showcoastlines: false,
        showland: true, landcolor: "#eeeeee", showcountries: true, countrycolor: "#ffffff",
        bgcolor: "rgba(0,0,0,0)", lataxis: { range: [-56, 84] } },
      dragmode: false
    });
    Plotly.react("pd-map", traces, layout, PCONF);
    addChartMenu($("pd-map-card"), $("pd-map"), function () { return varTitle() + ", " + S.year; });
  }

  // ---- Trends -------------------------------------------------------------
  function freeSlot() {
    var used = S.trends.map(function (t) { return t.slot; });
    for (var i = 0; i < MAX_SERIES; i++) if (used.indexOf(i) < 0) return i;
    return -1;
  }
  function addCountry(name) {
    if (S.countries.indexOf(name) < 0) return false;
    if (S.trends.some(function (t) { return t.name === name; })) return false;
    var slot = freeSlot();
    if (slot < 0) return false;
    S.trends.push({ name: name, slot: slot });
    return true;
  }
  function addFromInput() {
    var inp = $("pd-add-country"), val = inp.value.trim();
    var hits = S.countries.filter(function (c) { return c.toLowerCase().indexOf(val.toLowerCase()) >= 0; });
    var match = S.countries.filter(function (c) { return c.toLowerCase() === val.toLowerCase(); })[0] || (val && hits.length === 1 ? hits[0] : null);
    if (match && addCountry(match)) { inp.value = ""; renderTrends(); }
  }
  function renderChips() {
    var box = $("pd-chips");
    box.textContent = "";
    S.trends.forEach(function (t) {
      var chip = el("span", { class: "pd-chip" });
      var key = el("i", { class: "pd-key" }); key.style.background = SERIES[t.slot];
      chip.appendChild(key);
      chip.appendChild(document.createTextNode(t.name));
      var x = el("button", { type: "button", "aria-label": "Remove " + t.name }, "×");
      x.addEventListener("click", function () {
        S.trends = S.trends.filter(function (y) { return y.name !== t.name; });
        renderTrends();
      });
      chip.appendChild(x);
      box.appendChild(chip);
    });
    var full = S.trends.length >= MAX_SERIES;
    $("pd-add-btn").disabled = full;
    $("pd-add-country").disabled = full;
  }
  function renderTrends() {
    renderChips();
    var c = currentCol(), v = VAR_BY_KEY[S.varKey], traces = [], annotations = [];
    var rules = covRules(S.varKey);
    var shown = function (r) { return isNum(r[c]) && covPass(r, rules); };
    $("pd-trends-note").textContent = "Each point is one legislative term, placed at the year of its election. Gaps mean no data for that term" +
      (rules.length ? " or " + covNames(rules) + " coverage outside 95\u2013105%." : ".");
    S.trends.forEach(function (t) {
      var rows = termsOf(t.name);
      var color = SERIES[t.slot];
      traces.push({
        type: "scatter", mode: "lines+markers", name: t.name,
        x: rows.map(function (r) { return r.legislature_start; }),
        y: rows.map(function (r) { return shown(r) ? r[c] : null; }),
        text: rows.map(function (r) {
          var cov = rules.length ? "<br>" + covText(r, rules) : "";
          return "<b>" + fmt(r[c], v.unit) + "</b><br>" + t.name + " \u00b7 term " + r.legislature_start + "\u2013" + r.legislature_end + cov;
        }),
        hovertemplate: "%{text}<extra></extra>",
        line: { color: color, width: 2 },
        marker: { color: color, size: 8, line: { color: "#ffffff", width: 2 } },
        connectgaps: false
      });
      // direct label at the last point with data
      for (var i = rows.length - 1; i >= 0; i--) {
        if (shown(rows[i])) {
          annotations.push({ x: rows[i].legislature_start, y: rows[i][c], text: t.name, showarrow: false,
            xanchor: "left", xshift: 8, font: { color: INK, size: 12 } });
          break;
        }
      }
    });
    var layout = baseLayout({
      margin: { l: 60, r: 110, t: 44, b: 44 },
      showlegend: traces.length >= 2,
      legend: { orientation: "h", x: 0, y: -0.14, font: { color: INK2 } },
      hovermode: "closest", hoverdistance: 24,
      annotations: annotations
    });
    layout.yaxis.title = { text: axisTitle(), font: { color: INK2 } };
    layout.xaxis.range = yearRange(S.trends.map(function (t) { return termsOf(t.name); }));
    if (v.diverging) { layout.yaxis.rangemode = "normal"; layout.yaxis.zeroline = true; layout.yaxis.zerolinecolor = AXIS; }
    if (!traces.length) {
      layout.annotations = [{ text: "Add a country to see its trend", showarrow: false, xref: "paper", yref: "paper", x: 0.5, y: 0.5, font: { color: MUTED, size: 14 } }];
    }
    Plotly.react("pd-trends", traces, layout, PCONF);
    addChartMenu($("pd-trends-card"), $("pd-trends"), function () { return varTitle() + ": " + S.trends.map(function (t) { return t.name; }).join(", "); });
  }

  // ---- Country profile ----------------------------------------------------
  var PROFILE_CHARTS = [
    { key: "retentionrate", title: "Retention rate (%)", unit: "%" },
    { key: "women_share", title: "Women MPs (%)", unit: "%" },
    { key: "meanage", title: "Mean age (years)", unit: "years" },
    { key: "opposition_share", title: "Opposition seat share (%)", unit: "%" }
  ];
  function tile(label, value, sub) {
    var t = el("div", { class: "pd-tile" });
    t.appendChild(el("div", { class: "pd-tile-label" }, label));
    t.appendChild(el("div", { class: "pd-tile-value" }, value));
    if (sub) t.appendChild(el("div", { class: "pd-tile-sub" }, sub));
    return t;
  }
  function renderProfile() {
    var rows = S.profile ? termsOf(S.profile) : [];
    $("pd-profile-country").value = S.profile;
    $("pd-profile-empty").hidden = rows.length > 0;
    $("pd-profile-body").hidden = rows.length === 0;
    var tiles = $("pd-tiles"); tiles.textContent = "";
    if (!rows.length) return;
    var last = rows[rows.length - 1];
    // coverage rules (same as map and trends): a value counts only with 95-105% coverage
    var passes = function (r, key) { return isNum(r[key]) && covPass(r, covRules(key)); };
    var lastTerm = last.legislature_start + "\u2013" + last.legislature_end;
    tiles.appendChild(tile("Legislative terms in PEAR", String(rows.length), "first term " + rows[0].legislature_start + "\u2013" + rows[0].legislature_end + ", latest " + lastTerm));
    tiles.appendChild(tile("MPs identified, " + lastTerm + " term", fmt(last.no, "MPs"), "of " + fmt(last.leg_seats, "seats") + " seats"));
    tiles.appendChild(tile("Women MPs, " + lastTerm + " term", passes(last, "women_share") ? fmt(last.women_share, "%") : "\u2013",
      "gender coverage " + fmt(last.coverage_gender, "%") + (passes(last, "women_share") || !isNum(last.women_share) ? "" : " (needs 95\u2013105%)")));
    tiles.appendChild(tile("Mean age, " + lastTerm + " term", passes(last, "meanage") ? last.meanage.toFixed(1) : "\u2013",
      "age coverage " + fmt(last.coverage_age, "%") + (passes(last, "meanage") || !isNum(last.meanage) ? "" : " (needs 95\u2013105%)")));

    var box = $("pd-multiples"); box.textContent = "";
    // create all slots first so the grid has its final column widths before plotting
    var divs = PROFILE_CHARTS.map(function (pc, i) {
      var wrap = el("div");
      wrap.appendChild(el("div", { class: "pd-mini-title" }, pc.title));
      var card = el("div", { class: "pd-chart-card" });
      var div = el("div", { class: "pd-chart", id: "pd-mini-" + i });
      card.appendChild(div); wrap.appendChild(card); box.appendChild(wrap);
      return div;
    });
    PROFILE_CHARTS.forEach(function (pc, i) {
      var div = divs[i];
      var layout = baseLayout({ margin: { l: 44, r: 12, t: 40, b: 32 }, showlegend: false, hovermode: "closest" });
      layout.xaxis.range = yearRange([rows]);
      if (!rows.some(function (r) { return passes(r, pc.key); })) {
        var rl = covRules(pc.key);
        var anyData = rows.some(function (r) { return isNum(r[pc.key]); });
        layout.annotations = [{ text: anyData && rl.length ? "No terms with 95\u2013105% " + covNames(rl) + " coverage" : "No data for this country",
          showarrow: false, xref: "paper", yref: "paper", x: 0.5, y: 0.5, font: { color: MUTED, size: 13 } }];
        layout.yaxis.showticklabels = false;
      }
      Plotly.newPlot(div, [{
        type: "scatter", mode: "lines+markers",
        x: rows.map(function (r) { return r.legislature_start; }),
        y: rows.map(function (r) { return passes(r, pc.key) ? r[pc.key] : null; }),
        text: rows.map(function (r) {
          var rules = covRules(pc.key);
          return "<b>" + fmt(r[pc.key], pc.unit) + "</b><br>term " + r.legislature_start + "\u2013" + r.legislature_end + (rules.length ? "<br>" + covText(r, rules) : "");
        }),
        hovertemplate: "%{text}<extra></extra>",
        line: { color: SERIES[0], width: 2 }, marker: { color: SERIES[0], size: 8, line: { color: "#fff", width: 2 } },
        connectgaps: false
      }], layout, PCONF);
      addChartMenu(div.parentNode, div, function () { return S.profile + ": " + pc.title; });
    });

    var cols = [
      ["legislature_start", "Start", null], ["legislature_end", "End", null], ["leg_seats", "Seats", "seats"],
      ["no", "MPs identified", "MPs"], ["coverage_mps", "Coverage", "%"], ["women_share", "Women", "%"],
      ["meanage", "Mean age", "years"], ["retentionrate", "Retention", "%"], ["opposition_share", "Opposition", "%"],
      ["num_parties", "Parties", "parties"]
    ];
    fillTable($("pd-profile-table"), cols, rows, function (r, key) {
      var rules = VAR_BY_KEY[key] ? covRules(key) : [];
      return rules.length && isNum(r[key]) && !covPass(r, rules) ? covText(r, rules) + " (needs 95\u2013105%)" : null;
    });
  }

  // ---- Tables ---------------------------------------------------------------
  function fillTable(table, cols, rows, hide) {
    table.textContent = "";
    var thead = el("thead"), tr = el("tr");
    cols.forEach(function (cdef) {
      var num = cdef[2] !== null;
      var th = el("th", { scope: "col", class: num ? "pd-num" : "" });
      th.textContent = cdef[1];
      tr.appendChild(th);
    });
    thead.appendChild(tr); table.appendChild(thead);
    var tbody = el("tbody");
    rows.forEach(function (r) {
      var row = el("tr");
      cols.forEach(function (cdef) {
        var val = r[cdef[0]], num = cdef[2] !== null;
        var hidden = hide ? hide(r, cdef[0]) : null;
        var txt = hidden ? "\u2013" : (num ? fmt(val, cdef[2]) : String(val));
        var td = el("td", { class: (num ? "pd-num" : "") + (num && (!isNum(val) || hidden) ? " pd-na" : "") });
        if (num && (hidden || !isNum(val))) {
          // explain every dash with an instant tooltip (hover, keyboard focus or tap)
          var tip = el("span", { class: "pd-tip", tabindex: "0", "data-tip": hidden || "No data for this term" }, txt);
          td.appendChild(tip);
        } else td.textContent = txt;
        row.appendChild(td);
      });
      tbody.appendChild(row);
    });
    table.appendChild(tbody);
  }
  // ---- Instant tooltips for [data-tip] elements (table dashes) ----------------
  var tipBox = null;
  function showTip(t) {
    if (!tipBox) { tipBox = el("div", { class: "pd-tipbox", role: "tooltip" }); (document.querySelector(".pear-dash") || document.body).appendChild(tipBox); }
    tipBox.textContent = t.getAttribute("data-tip");
    tipBox.hidden = false;
    var r = t.getBoundingClientRect(), b = tipBox.getBoundingClientRect();
    var left = Math.min(Math.max(8, r.right - b.width), window.innerWidth - b.width - 8);
    var top = r.top - b.height - 8 < 8 ? r.bottom + 8 : r.top - b.height - 8;
    tipBox.style.left = left + "px"; tipBox.style.top = top + "px";
  }
  function hideTip() { if (tipBox) tipBox.hidden = true; }
  ["mouseover", "focusin"].forEach(function (ev) {
    document.addEventListener(ev, function (e) { var t = e.target.closest && e.target.closest("[data-tip]"); if (t) showTip(t); });
  });
  ["mouseout", "focusout"].forEach(function (ev) {
    document.addEventListener(ev, function (e) { if (e.target.closest && e.target.closest("[data-tip]")) hideTip(); });
  });
  window.addEventListener("scroll", hideTip, true);

  // ---- Load ---------------------------------------------------------------
  function load() {
    $("pd-status").textContent = "Loading data…";
    fetch(DATA_URL).then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    }).then(function (data) {
      S.meta = data.meta || {};
      S.columns = data.columns;
      S.rows = data.rows.map(function (arr) {
        var o = {};
        data.columns.forEach(function (k, i) { o[k] = arr[i]; });
        return o;
      });
      S.countries = Array.from(new Set(S.rows.map(function (r) { return r.country; }))).sort(function (a, b) { return a.localeCompare(b); });
      DEFAULT_TRENDS.forEach(addCountry);
      // optional ?var=...&group=... in the address, for linking to a view
      var qs = new URLSearchParams(location.search);
      if (VAR_BY_KEY[qs.get("var")]) S.varKey = qs.get("var");
      if (VAR_BY_KEY[S.varKey].groups.indexOf(qs.get("group")) >= 0) S.group = qs.get("group");
      if (S.countries.indexOf(qs.get("country")) >= 0) S.profile = qs.get("country");
      $("pd-status").textContent = "";
      buildControls();
      var h = location.hash.replace("#", "");
      if (["map", "trends", "profile"].indexOf(h) >= 0) showTab(h); else refresh();
    }).catch(function (err) {
      $("pd-status").textContent = "The data could not be loaded (" + err.message + ").";
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", load);
  else load();
})();
