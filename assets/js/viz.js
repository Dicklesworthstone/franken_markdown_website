/* Interactive visualizations. Each one lazy-initializes via IntersectionObserver
   and degrades gracefully under prefers-reduced-motion. Algorithms are real
   implementations (greedy vs. total-fit line breaking, glyph accounting), not
   canned animations. */

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function whenVisible(el, init, margin = "240px") {
  if (!el) return;
  if (!("IntersectionObserver" in window)) {
    init();
    return;
  }
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        io.disconnect();
        init();
        return;
      }
    }
  }, { rootMargin: margin });
  io.observe(el);
}

/* ================================================================== */
/* 1. Assembly line — pipeline stage explorer                          */
/* ================================================================== */

const PIPELINE_STAGES = {
  source: {
    title: "Markdown source",
    body: "A file, stdin, or a raw string. The engine never reads the filesystem or the network itself — bytes in, bytes out. That is what makes the same core run natively and in this very page.",
    facts: ["input: UTF-8 markdown", "hosts: CLI · library · WASM", "limit guards before parse"]
  },
  parser: {
    title: "Scanner + clean-room parser",
    body: "A hand-written block and inline parser (CommonMark/GFM subset) with byte-level candidate guards: ordinary prose stays on contiguous byte walks and skips the expensive probes entirely. Conformance is a ratcheted CI floor — it can rise, never drop.",
    facts: ["zero parser crates", "379/652 CommonMark ratchet", "recoverable diagnostics with byte spans"]
  },
  ast: {
    title: "One document AST",
    body: "Parse once, render many. Every output surface reads the same renderer-neutral tree, so HTML and PDF can never drift apart structurally. The typed theme model rides alongside: colors, spacing, code theme, page contract.",
    facts: ["single parse per document", "shared typed theme", "spanned variant for tooling"]
  },
  html: {
    title: "HTML emitter",
    body: "A self-contained preview document: inlined CSS, deterministic embedded TTF font subsets, dark-mode support, responsive tables, and the shared clean-room syntax highlighter. No JavaScript required in the output.",
    facts: ["one .html file, no CDN", "dark mode via media query", "safe escaping by default"]
  },
  pdf: {
    title: "Layout + PDF writer",
    body: "Real font metrics, GPOS kerning, GSUB ligatures, Knuth–Plass line breaking, Liang hyphenation, measured-column tables, tagged structure, and a hand-rolled DEFLATE compressor. Compact, deterministic bytes — CI diffs renders byte-for-byte.",
    facts: ["Knuth–Plass + Liang hyphenation", "subset fonts, tagged PDF", "hand-rolled zlib/DEFLATE"]
  },
  wasm: {
    title: "WASM ABI",
    body: "The same core compiled to wasm32 with a thin wasm-bindgen adapter. Fonts and images arrive as bytes from the host. CI proves the browser build renders byte-identical HTML and PDF to the native binary.",
    facts: ["1.5 MB gzipped, fonts included", "native ↔ wasm parity gate", "no threads, fs, or network"]
  }
};

function initPipeline() {
  const root = document.getElementById("viz-pipeline");
  if (!root) return;
  const stages = root.querySelectorAll("[data-stage]");
  const title = document.getElementById("pipeline-detail-title");
  const body = document.getElementById("pipeline-detail-body");
  const facts = document.getElementById("pipeline-detail-facts");
  const order = ["source", "parser", "ast", "html", "pdf", "wasm"];
  let cycleTimer = 0;
  let index = 0;

  function select(key, fromUser) {
    const info = PIPELINE_STAGES[key];
    if (!info) return;
    for (const stage of stages) {
      const active = stage.dataset.stage === key;
      stage.classList.toggle("pipeline-active", active);
    }
    title.textContent = info.title;
    body.textContent = info.body;
    facts.replaceChildren();
    for (const fact of info.facts) {
      const chip = document.createElement("span");
      chip.className = "inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] text-emerald-400/90";
      chip.textContent = fact;
      facts.appendChild(chip);
    }
    if (fromUser) {
      window.clearInterval(cycleTimer);
      cycleTimer = 0;
    }
  }

  for (const stage of stages) {
    stage.addEventListener("click", () => select(stage.dataset.stage, true));
    stage.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        select(stage.dataset.stage, true);
      }
    });
  }

  select("source", false);
  if (!reducedMotion) {
    cycleTimer = window.setInterval(() => {
      index = (index + 1) % order.length;
      select(order[index], false);
    }, 3200);
  }
}

/* ================================================================== */
/* 2. Knuth–Plass vs greedy line breaking (real algorithms)            */
/* ================================================================== */

const KP_TEXT =
  "In olden times when wishing still helped one, there lived a king whose " +
  "daughters were all beautiful; and the youngest was so beautiful that the " +
  "sun itself, which has seen so much, was astonished whenever it shone in " +
  "her face. Close by the king's castle lay a great dark forest, and under " +
  "an old lime-tree in the forest was a well.";

function initKnuth() {
  const root = document.getElementById("viz-knuth");
  if (!root) return;
  const slider = document.getElementById("kp-slider");
  const widthLabel = document.getElementById("kp-width-label");
  const panels = {
    greedy: { host: document.getElementById("kp-greedy"), stats: document.getElementById("kp-greedy-stats") },
    optimal: { host: document.getElementById("kp-optimal"), stats: document.getElementById("kp-optimal-stats") }
  };

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const FONT = "500 15px 'Inter Variable', Inter, sans-serif";
  ctx.font = FONT;

  const words = KP_TEXT.split(/\s+/);
  let wordWidths = [];
  let spaceWidth = 0;
  let stretch = 0;
  let shrink = 0;
  function measure() {
    ctx.font = FONT;
    wordWidths = words.map((w) => ctx.measureText(w).width);
    spaceWidth = ctx.measureText(" ").width;
    stretch = spaceWidth / 2;
    shrink = spaceWidth / 3;
  }
  measure();

  function lineMetrics(i, j, target) {
    // words[i..j) on one line
    let natural = 0;
    for (let k = i; k < j; k++) natural += wordWidths[k];
    const spaces = j - i - 1;
    natural += spaces * spaceWidth;
    const diff = target - natural;
    let ratio;
    if (diff >= 0) ratio = spaces > 0 ? diff / (spaces * stretch) : (diff > 2 ? Infinity : 0);
    else ratio = spaces > 0 ? diff / (spaces * shrink) : -Infinity;
    const badness = ratio < -1 || !Number.isFinite(ratio)
      ? Infinity
      : Math.min(10000, 100 * Math.pow(Math.abs(ratio), 3));
    return { natural, spaces, ratio, badness };
  }

  function greedyBreaks(target) {
    const breaks = [0];
    let lineStart = 0;
    let width = 0;
    for (let k = 0; k < words.length; k++) {
      const add = (k === lineStart ? 0 : spaceWidth) + wordWidths[k];
      if (k > lineStart && width + add > target) {
        breaks.push(k);
        lineStart = k;
        width = wordWidths[k];
      } else {
        width += add;
      }
    }
    breaks.push(words.length);
    return breaks;
  }

  function optimalBreaks(target) {
    // Total-fit dynamic program: minimize sum of (1 + badness)^2 over lines.
    const n = words.length;
    const INF = Number.POSITIVE_INFINITY;
    const cost = new Array(n + 1).fill(INF);
    const prev = new Array(n + 1).fill(-1);
    cost[0] = 0;
    for (let j = 1; j <= n; j++) {
      for (let i = j - 1; i >= 0; i--) {
        const m = lineMetrics(i, j, target);
        if (m.natural > target * 1.6 && m.badness === Infinity && i < j - 1) break;
        const isLast = j === n;
        const b = isLast ? (m.ratio < -1 ? Infinity : 0) : m.badness;
        if (b === Infinity) continue;
        const demerits = Math.pow(1 + b / 100, 2);
        if (cost[i] + demerits < cost[j]) {
          cost[j] = cost[i] + demerits;
          prev[j] = i;
        }
      }
    }
    if (prev[n] === -1) return greedyBreaks(target); // degenerate width
    const breaks = [];
    for (let k = n; k >= 0; k = prev[k]) {
      breaks.unshift(k);
      if (k === 0) break;
    }
    return breaks;
  }

  function badnessColor(badness, isLast) {
    if (isLast) return "transparent";
    if (!Number.isFinite(badness)) return "rgba(239,68,68,0.28)";
    const t = Math.min(1, badness / 400);
    if (t < 0.25) return `rgba(16,185,129,${0.05 + t * 0.2})`;
    if (t < 0.6) return `rgba(251,191,36,${0.08 + t * 0.22})`;
    return `rgba(239,68,68,${0.1 + t * 0.22})`;
  }

  function renderPanel(kind, breaks, target) {
    const { host, stats } = panels[kind];
    host.replaceChildren();
    host.style.width = `${target + 16}px`;
    let total = 0;
    let worst = 0;
    for (let b = 0; b < breaks.length - 1; b++) {
      const i = breaks[b];
      const j = breaks[b + 1];
      const isLast = b === breaks.length - 2;
      const m = lineMetrics(i, j, target);
      const line = document.createElement("div");
      line.className = "kp-line";
      line.style.font = FONT;
      line.style.width = `${target}px`;
      line.style.padding = "1px 8px";
      line.style.background = badnessColor(m.badness, isLast);
      const extra = isLast || m.spaces === 0 ? 0 : (target - m.natural) / m.spaces;
      line.style.wordSpacing = `${extra.toFixed(3)}px`;
      line.textContent = words.slice(i, j).join(" ");
      const b100 = isLast ? 0 : (Number.isFinite(m.badness) ? m.badness : 10000);
      line.title = isLast
        ? "last line — set solid, no justification"
        : `adjustment ratio r = ${m.ratio.toFixed(2)} · badness ${Math.round(b100)}`;
      total += Math.pow(1 + b100 / 100, 2);
      if (!isLast) worst = Math.max(worst, Math.abs(m.ratio));
      host.appendChild(line);
    }
    stats.textContent = `${breaks.length - 1} lines · total demerits ${total.toFixed(1)} · worst |r| ${worst.toFixed(2)}`;
    return total;
  }

  function update() {
    const target = Number(slider.value);
    widthLabel.textContent = `${target}px measure`;
    const g = renderPanel("greedy", greedyBreaks(target), target);
    const o = renderPanel("optimal", optimalBreaks(target), target);
    const verdict = document.getElementById("kp-verdict");
    if (verdict) {
      const pct = g > 0 ? Math.max(0, Math.min(99.9, (1 - o / g) * 100)) : 0;
      verdict.textContent = pct > 0.5
        ? `Total-fit cut demerits by ${pct.toFixed(pct > 99 ? 1 : 0)}% at this measure.`
        : "At this measure both strategies agree — drag the slider.";
    }
  }

  slider.addEventListener("input", update);
  update();
  // Measurements taken before the webfont finished loading used fallback
  // metrics; re-MEASURE (not just re-render) once fonts settle.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      measure();
      update();
    }).catch(() => {});
  }
}

/* ================================================================== */
/* 3. Font subsetting — only the glyphs you use                        */
/* ================================================================== */

const GLYPH_FULL_BYTES = 269 * 1024; // bundled body face, full TTF
const GLYPH_OVERHEAD = 3.2 * 1024;   // tables that always ship
const GLYPH_COST = 210;              // approx outline bytes per kept glyph

function initSubset() {
  const root = document.getElementById("viz-subset");
  if (!root) return;
  const input = document.getElementById("subset-input");
  const grid = document.getElementById("subset-grid");
  const kept = document.getElementById("subset-kept");
  const barFull = document.getElementById("subset-bar-full");
  const barSub = document.getElementById("subset-bar-sub");
  const bytes = document.getElementById("subset-bytes");

  const glyphs = [];
  for (let code = 33; code <= 126; code++) glyphs.push(String.fromCharCode(code));

  const cells = new Map();
  for (const g of glyphs) {
    const cell = document.createElement("span");
    cell.className = "flex items-center justify-center rounded border border-white/5 bg-white/[0.02] font-mono text-[11px] text-slate-600 transition-all duration-300";
    cell.textContent = g;
    grid.appendChild(cell);
    cells.set(g, cell);
  }

  function update() {
    const used = new Set(input.value.replace(/\s/g, "").split(""));
    let count = 0;
    for (const [g, cell] of cells) {
      const active = used.has(g);
      if (active) count++;
      cell.classList.toggle("border-emerald-500/50", active);
      cell.classList.toggle("bg-emerald-500/15", active);
      cell.classList.toggle("text-emerald-300", active);
      cell.classList.toggle("shadow-[0_0_10px_rgba(16,185,129,0.25)]", active);
      cell.classList.toggle("text-slate-600", !active);
    }
    const subBytes = GLYPH_OVERHEAD + count * GLYPH_COST;
    const pct = Math.max(1.5, (subBytes / GLYPH_FULL_BYTES) * 100);
    kept.textContent = `${count} / ${glyphs.length}`;
    barFull.style.width = "100%";
    barSub.style.width = `${pct.toFixed(1)}%`;
    bytes.textContent = `${(GLYPH_FULL_BYTES / 1024).toFixed(0)} KB full face → ~${(subBytes / 1024).toFixed(1)} KB subset (illustrative)`;
  }

  input.addEventListener("input", update);
  update();
}

/* ================================================================== */
/* 4. Dependency graph — the usual stack vs. the monster               */
/* ================================================================== */

const USUAL_CRATES = [
  "comrak", "syntect", "onig", "onig_sys", "regex", "regex-syntax", "aho-corasick",
  "memchr", "serde", "serde_derive", "syn", "quote", "proc-macro2", "unicode-ident",
  "plist", "yaml-rust", "walkdir", "printpdf", "lopdf", "image", "png", "fdeflate",
  "flate2", "miniz_oxide", "ttf-parser", "fontdb", "unicode-bidi", "unicode-script",
  "bitflags", "log", "cfg-if", "once_cell", "thiserror", "adler2", "crc32fast", "base64"
];

function initDeps() {
  const root = document.getElementById("viz-deps");
  if (!root) return;
  const svg = document.getElementById("deps-left-svg");
  if (!svg) return;
  const NS = "http://www.w3.org/2000/svg";
  const W = 460;
  const H = 380;
  const cx = W / 2;
  const cy = H / 2;

  function el(name, attrs) {
    const node = document.createElementNS(NS, name);
    for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
    return node;
  }

  const center = el("circle", { cx, cy, r: 26, fill: "rgba(239,68,68,0.12)", stroke: "rgba(239,68,68,0.6)", "stroke-width": 1.5 });
  const centerLabel = el("text", {
    x: cx, y: cy + 4, "text-anchor": "middle", fill: "#fca5a5",
    "font-size": 10, "font-weight": 800, "font-family": "var(--font-mono)"
  });
  centerLabel.textContent = "your renderer";

  const rings = [82, 128, 172];
  USUAL_CRATES.forEach((name, i) => {
    const ring = rings[i % rings.length];
    const jitter = ((i * 2654435761) % 17) - 8;
    const angle = (i / USUAL_CRATES.length) * Math.PI * 2 + (i % 2 ? 0.15 : -0.1);
    const x = cx + Math.cos(angle) * (ring + jitter);
    const y = cy + Math.sin(angle) * (ring + jitter) * 0.78;
    const edge = el("line", {
      x1: cx, y1: cy, x2: x, y2: y,
      stroke: "rgba(148,163,184,0.18)", "stroke-width": 0.7
    });
    svg.appendChild(edge);
    const dot = el("circle", { cx: x, cy: y, r: 3.4, fill: "rgba(148,163,184,0.45)" });
    const label = el("text", {
      x, y: y - 7, "text-anchor": "middle", fill: "rgba(148,163,184,0.6)",
      "font-size": 8.5, "font-family": "var(--font-mono)"
    });
    label.textContent = name;
    if (!reducedMotion) {
      const delay = `${(i * 45)}ms`;
      for (const node of [edge, dot, label]) {
        node.style.opacity = "0";
        node.style.transition = `opacity 600ms var(--ease-stripe) ${delay}`;
      }
      requestAnimationFrame(() => requestAnimationFrame(() => {
        edge.style.opacity = "1";
        dot.style.opacity = "1";
        label.style.opacity = "1";
      }));
    }
    svg.appendChild(dot);
    svg.appendChild(label);
  });
  svg.appendChild(center);
  svg.appendChild(centerLabel);

  // Animated counters
  for (const counter of root.querySelectorAll("[data-count-to]")) {
    animateCount(counter);
  }
}

function animateCount(node) {
  const target = Number(node.dataset.countTo);
  const suffix = node.dataset.countSuffix || "";
  if (reducedMotion || !Number.isFinite(target)) {
    node.textContent = `${target}${suffix}`;
    return;
  }
  const t0 = performance.now();
  const dur = 1200;
  function tick(t) {
    const p = Math.min(1, (t - t0) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    node.textContent = `${Math.round(target * eased)}${suffix}`;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ================================================================== */

whenVisible(document.getElementById("viz-pipeline"), initPipeline);
whenVisible(document.getElementById("viz-knuth"), initKnuth);
whenVisible(document.getElementById("viz-subset"), initSubset);
whenVisible(document.getElementById("viz-deps"), initDeps);

export { animateCount };
