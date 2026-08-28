/* The Operating Theater: two-pane live playground.
   Left: syntax-highlighted Markdown editor (textarea + overlay).
   Right: HTML or PDF rendered by the franken_markdown wasm core in a worker. */

import { highlightMarkdown } from "./md-highlight.js?v=6";

const SAMPLES = {
  showcase: `# FrankenMarkdown

A **clean-room, zero-dependency** Rust engine that turns Markdown into a
gorgeous self-contained HTML page *and* a professional-typography PDF — with
embedded subset fonts, real kerning, ligatures, and LaTeX-grade line breaking.

> This preview is being rendered **right now, in your browser**, by the same
> wasm core that ships in the \`fmd\` CLI. Native and WASM output are proven
> byte-for-byte identical in CI.

## Inline formatting

You get **bold**, *italic*, ***bold italic***, \`inline code\`,
~~strikethrough~~, and composable nesting like ***\`bold-italic code\`*** or a
**bold link to [the docs](https://github.com/Dicklesworthstone/franken_markdown)**.

## Tables

| Feature           |  Status  |                       Notes |
| :---------------- | :------: | --------------------------: |
| HTML output       | working  |       all-in-one, themeable |
| PDF output        | working  | embedded fonts, kerning, KP |
| Syntax highlight  | working  |         16+ languages       |
| Zero dependencies | yes      |    the engine has no crates |

## Task list

- [x] Parse the document into an AST
- [x] Shape glyphs with kerning and ligatures
- [x] Knuth–Plass line breaking
- [ ] Full widow/orphan pagination control

## Code

\`\`\`rust
use franken_markdown::{parse_markdown, render_html_document, HtmlOptions};

fn main() {
    let doc = parse_markdown("# It's alive!");
    let html = render_html_document(&doc, &HtmlOptions::default());
    println!("{} bytes of self-contained HTML", html.unwrap().len());
}
\`\`\`

---

Switch the toggle above to **PDF** to typeset this exact document with
Knuth–Plass line breaking, embedded subset fonts, and tagged structure.
`,

  code: `# The clean-room highlighter

One highlighter, shared by HTML and PDF. No \`syntect\`, no regex engine —
a hand-written scanner per language family.

\`\`\`rust
/// Knuth-Plass badness for a line at adjustment ratio \`r\`.
fn badness(r: f64) -> f64 {
    if r < -1.0 { f64::INFINITY } else { 100.0 * r.abs().powi(3) }
}
\`\`\`

\`\`\`python
def subset(font, text):
    """Keep only the glyphs the document actually uses."""
    keep = {font.glyph_id(ch) for ch in set(text)}
    return font.retain(sorted(keep))
\`\`\`

\`\`\`ts
type Output = { format: "html" | "pdf"; bytes: Uint8Array };
const out: Output = await renderer.renderPdf(source, { font: "serif" });
\`\`\`

\`\`\`sql
SELECT lang, COUNT(*) AS fences
FROM code_blocks
GROUP BY lang
ORDER BY fences DESC;
\`\`\`

\`\`\`bash
fmd README.md --to both --out README.html   # HTML + PDF from one parse
SOURCE_DATE_EPOCH=1700000000 fmd spec.md --to pdf --out spec.pdf
\`\`\`

\`\`\`mermaid
flowchart LR
    A[Markdown] --> B[AST]
    B --> C[HTML]
    B --> D[PDF]
\`\`\`
`,

  tables: `# Column allocation, measured

Dense headers get useful width instead of an equal-column squeeze: every
column is measured (min-content and max-content), then a constrained
wrapping-badness solver spends the page width where it reduces wrapping.

| Pipeline stage | Optimization | Practical effect |
|---|---|---|
| Parser line scanning | Byte-level candidate guards skip probes on plain prose | README-style files stay on contiguous byte walks |
| PDF shaping | Render-local shaped-width caches avoid recomputing kerning and ligatures | Repeated tokens reuse nearby cache entries |
| Compression | Hand-rolled DEFLATE with precomputed fixed-Huffman codes | No second full scan over page and font streams |
| Tables | Min/max column measurement feeds a wrapping-badness allocator | Dense tables stop forcing ugly header wraps |

| Right | Center | Left |
|--:|:-:|:--|
| 1,204 | ok | alpha |
| 88 | ok | beta |
| 7 | ok | gamma |

> Try the PDF toggle — the same measurement drives both surfaces.
`
};

const els = {
  root: document.getElementById("pg-root"),
  maximize: document.getElementById("pg-maximize"),
  share: document.getElementById("pg-share"),
  input: document.getElementById("pg-input"),
  highlight: document.getElementById("pg-highlight"),
  toggleHtml: document.getElementById("pg-toggle-html"),
  togglePdf: document.getElementById("pg-toggle-pdf"),
  paneHtml: document.getElementById("pg-pane-html"),
  panePdf: document.getElementById("pg-pane-pdf"),
  htmlFrame: document.getElementById("pg-html-frame"),
  pdfFrame: document.getElementById("pg-pdf-frame"),
  pdfFallback: document.getElementById("pg-pdf-fallback"),
  pdfFallbackOpen: document.getElementById("pg-pdf-fallback-open"),
  font: document.getElementById("pg-font"),
  dark: document.getElementById("pg-dark"),
  linenos: document.getElementById("pg-linenos"),
  downloadHtml: document.getElementById("pg-download-html"),
  downloadPdf: document.getElementById("pg-download-pdf"),
  status: document.getElementById("pg-status"),
  statusDot: document.getElementById("pg-status-dot"),
  stats: document.getElementById("pg-stats"),
  diag: document.getElementById("pg-diag"),
  count: document.getElementById("pg-count"),
  previewLabel: document.getElementById("pg-preview-label")
};

/* --- URL fragment codec: the document travels inside the link. ---
   #zdoc=<base64url(deflate-raw(utf8))>  compressed payload (preferred)
   #doc=<base64url(utf8)>                uncompressed fallback
   #view=max                             open the playground full-page
   #fmt=pdf                              start on the PDF pane */

function b64urlEncode(bytes) {
  let binary = "";
  const CHUNK = 0x8000;
  for (let i = 0; i < bytes.length; i += CHUNK) {
    binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlDecode(text) {
  const b64 = text.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(text.length / 4) * 4, "=");
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function pipeBytes(bytes, TransformCtor, mode) {
  const stream = new Blob([bytes]).stream().pipeThrough(new TransformCtor(mode));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

function parseFragment() {
  const raw = window.location.hash.slice(1);
  if (!raw || !raw.includes("=")) return {};
  const params = new URLSearchParams(raw);
  return {
    doc: params.get("doc"),
    zdoc: params.get("zdoc"),
    fmt: params.get("fmt"),
    view: params.get("view")
  };
}

/* Returns { doc } on success, { error } when a document param was present but
   could not be decoded (so callers can say so instead of silently showing the
   default sample), and {} when the fragment carries no document at all. */
async function decodeFragmentDoc(frag) {
  if (frag.zdoc != null) {
    if (typeof DecompressionStream === "undefined") {
      return { error: "This browser cannot decompress this share link (no CompressionStream support). Ask the sender to re-share from a browser without compression, or open the link in a current browser." };
    }
    try {
      return { doc: new TextDecoder().decode(await pipeBytes(b64urlDecode(frag.zdoc), DecompressionStream, "deflate-raw")) };
    } catch {
      return { error: "The document in this share link is corrupted or truncated (some chat apps shorten long URLs). Ask the sender for the full link." };
    }
  }
  if (frag.doc != null) {
    try {
      return { doc: new TextDecoder().decode(b64urlDecode(frag.doc)) };
    } catch {
      return { error: "The document in this share link is corrupted or truncated (some chat apps shorten long URLs). Ask the sender for the full link." };
    }
  }
  return {};
}

if (els.input) {
  bootPlayground();
}

function bootPlayground() {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  let worker = null;
  let workerReady = false;
  let docVersion = 0;
  let activeFormat = "html";
  let debounceTimer = 0;
  let nextId = 1;
  let pdfUrl = null;
  let pdfFallbackUrl = null;
  let maximized = false;

  const pendingResolvers = new Map();
  const live = {
    html: { running: false, dirty: false },
    pdf: { running: false, dirty: false }
  };
  // Last successfully presented render per format, with the doc version it saw.
  const presented = { html: null, pdf: null };

  setStatus("reanimating", "REANIMATING…");
  els.input.value = SAMPLES.showcase;
  refreshEditor();

  /* Apply the URL fragment (maximize view, start format, embedded document)
     before the first render so shared links open exactly as authored. */
  const fragmentApplied = (async () => {
    const frag = parseFragment();
    if (frag.view === "max") setMaximized(true);
    if (frag.fmt === "pdf") setFormat("pdf");
    const result = await decodeFragmentDoc(frag);
    if (result.doc !== undefined) {
      els.input.value = result.doc;
      refreshEditor();
      docVersion += 1;
      clearSampleChips();
    } else if (result.error) {
      // Make the failure visible in the document itself: a silent fallback to
      // the sample would look like the sender shared the wrong thing.
      els.input.value = `# This share link did not decode\n\n${result.error}\n`;
      refreshEditor();
      docVersion += 1;
      clearSampleChips();
    }
  })();

  try {
    worker = new Worker(new URL("./render-worker.js?v=8", import.meta.url), { type: "module" });
  } catch (error) {
    setStatus("dead", "WORKER FAILED");
    showFatal(`This browser could not start the render worker: ${error.message}`);
    return;
  }

  worker.onmessage = (event) => {
    const msg = event.data;
    if (msg.type === "ready") {
      fragmentApplied.finally(() => {
        workerReady = true;
        setStatus("alive", "IT'S ALIVE");
        ensureLive(activeFormat);
      });
      return;
    }
    if (msg.type === "init-error") {
      setStatus("dead", "WASM FAILED");
      showFatal(`The wasm module failed to load: ${msg.error}`);
      return;
    }
    if (msg.type === "result") {
      const resolver = pendingResolvers.get(msg.id);
      if (!resolver) return;
      pendingResolvers.delete(msg.id);
      if (msg.ok) resolver.resolve(msg);
      else resolver.reject(new Error(msg.error));
    }
  };

  worker.onerror = (event) => {
    setStatus("dead", "WORKER ERROR");
    showFatal(`Render worker error: ${event.message || "unknown"}`);
    // Fail any in-flight renders/downloads instead of leaving their promises
    // pending forever.
    for (const [, resolver] of pendingResolvers) {
      resolver.reject(new Error("render worker crashed"));
    }
    pendingResolvers.clear();
  };

  function workerRender(format, markdown, options) {
    return new Promise((resolve, reject) => {
      const id = nextId++;
      pendingResolvers.set(id, { resolve, reject });
      worker.postMessage({ id, format, markdown, options });
    });
  }

  function currentOptions(format) {
    const options = {
      font: els.font.value,
      darkMode: els.dark.value,
      metadataEpochSeconds: 1700000000
    };
    if (format === "pdf" && els.linenos.checked) {
      options.codeLineNumbers = true;
    }
    return options;
  }

  /* Live rendering: at most one in-flight render per format; if the source
     changes mid-render, run once more with the latest text. */
  async function ensureLive(format) {
    if (!workerReady) return;
    const state = live[format];
    if (state.running) {
      state.dirty = true;
      return;
    }
    state.running = true;
    do {
      state.dirty = false;
      const version = docVersion;
      setStatus("busy", format === "pdf" ? "TYPESETTING PDF" : "RENDERING HTML");
      try {
        const res = await workerRender(format, els.input.value, currentOptions(format));
        presented[format] = { version, res };
        if (activeFormat === format) present(format, res);
        setStatus("alive", "IT'S ALIVE");
      } catch (error) {
        setStatus("busy", "RENDER FAILED");
        showDiagnostics([{ severity: "error", start: 0, end: 0, message: error.message }]);
      }
      if (docVersion !== version) state.dirty = true;
    } while (state.dirty);
    state.running = false;
  }

  function present(format, res) {
    if (format === "html") {
      els.htmlFrame.srcdoc = decoder.decode(res.bytes.slice());
    } else {
      const blob = new Blob([res.bytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      if (navigator.pdfViewerEnabled === false) {
        els.pdfFrame.classList.add("hidden");
        els.pdfFallback.classList.remove("hidden");
        if (pdfFallbackUrl) URL.revokeObjectURL(pdfFallbackUrl);
        pdfFallbackUrl = url;
        els.pdfFallbackOpen.href = url;
      } else {
        els.pdfFrame.src = `${url}#toolbar=0&navpanes=0`;
        if (pdfUrl) URL.revokeObjectURL(pdfUrl);
        pdfUrl = url;
      }
    }
    const kb = (res.bytes.byteLength / 1024).toFixed(1);
    els.stats.textContent = `${res.ms.toFixed(0)} ms in worker · ${res.sourceLength.toLocaleString()} B markdown → ${kb} KB ${format.toUpperCase()}`;
    showDiagnostics(res.diagnostics);
  }

  let lastDiagKey = null;
  function showDiagnostics(diagnostics) {
    // Skip identical re-renders: the container is aria-live, and re-inserting
    // the same text would re-announce it to screen readers on every render.
    const key = JSON.stringify(diagnostics || []);
    if (key === lastDiagKey) return;
    lastDiagKey = key;
    els.diag.replaceChildren();
    if (!diagnostics || diagnostics.length === 0) {
      const item = document.createElement("span");
      item.className = "text-emerald-500/50";
      item.textContent = "NO_DIAGNOSTICS";
      els.diag.appendChild(item);
      return;
    }
    for (const d of diagnostics) {
      const item = document.createElement("span");
      item.className = d.severity === "error" ? "text-red-400" : "text-amber-400";
      item.textContent = `${d.severity.toUpperCase()} ${d.start}–${d.end}: ${d.message}`;
      els.diag.appendChild(item);
    }
  }

  function showFatal(message) {
    showDiagnostics([{ severity: "error", start: 0, end: 0, message }]);
  }

  function setStatus(kind, label) {
    els.status.textContent = label;
    const dot = els.statusDot;
    dot.className = "h-1.5 w-1.5 rounded-full transition-colors";
    if (kind === "alive") {
      dot.classList.add("bg-emerald-500", "shadow-[0_0_8px_#10b981]", "animate-pulse");
    } else if (kind === "busy") {
      dot.classList.add("bg-amber-400", "shadow-[0_0_8px_#fbbf24]");
    } else if (kind === "dead") {
      dot.classList.add("bg-red-500", "shadow-[0_0_8px_#ef4444]");
    } else {
      dot.classList.add("bg-emerald-500/60", "animate-pulse");
    }
  }

  function refreshEditor() {
    els.highlight.innerHTML = highlightMarkdown(els.input.value);
    els.count.textContent = `${encoder.encode(els.input.value).byteLength.toLocaleString()} B`;
  }

  function invalidate() {
    docVersion += 1;
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(() => {
      ensureLive(activeFormat);
    }, 170);
  }

  function setFormat(format) {
    if (activeFormat === format) return;
    activeFormat = format;
    const htmlActive = format === "html";
    els.paneHtml.classList.toggle("hidden", !htmlActive);
    els.panePdf.classList.toggle("hidden", htmlActive);
    els.toggleHtml.setAttribute("aria-pressed", String(htmlActive));
    els.togglePdf.setAttribute("aria-pressed", String(!htmlActive));
    els.previewLabel.textContent = htmlActive ? "self_contained.html" : "tagged_output.pdf";
    styleToggle(els.toggleHtml, htmlActive);
    styleToggle(els.togglePdf, !htmlActive);
    const cached = presented[format];
    if (cached && cached.version === docVersion) {
      present(format, cached.res);
    } else {
      ensureLive(format);
    }
  }

  function styleToggle(button, active) {
    button.classList.toggle("bg-emerald-500", active);
    button.classList.toggle("text-black", active);
    button.classList.toggle("shadow-[0_0_20px_rgba(16,185,129,0.35)]", active);
    button.classList.toggle("text-slate-400", !active);
  }

  function setMaximized(on) {
    maximized = on;
    els.root.classList.toggle("pg-max", on);
    els.root.classList.add("revealed");
    document.body.classList.toggle("pg-max-open", on);
    els.maximize.setAttribute("aria-pressed", String(on));
    els.maximize.querySelector(".pg-max-icon-expand").classList.toggle("hidden", on);
    els.maximize.querySelector(".pg-max-icon-collapse").classList.toggle("hidden", !on);
    els.maximize.querySelector(".pg-max-label").textContent = on ? "Exit" : "Maximize";
    // Keep the rest of the page out of the tab order / accessibility tree
    // while the playground overlays it (no-op where inert is unsupported).
    for (const node of document.querySelectorAll("body > .skip-link, #site-header, #mobile-menu, footer, main > section:not(#playground), #playground > :not(#pg-root)")) {
      node.toggleAttribute("inert", on);
    }
    // Exiting should also retire a #view=max fragment, or the next reload
    // (and any link copied from the address bar) re-maximizes unexpectedly.
    if (!on && window.location.hash.includes("view=max")) {
      const params = new URLSearchParams(window.location.hash.slice(1));
      params.delete("view");
      const rest = params.toString();
      history.replaceState(null, "", rest === "" ? window.location.pathname : `#${rest}`);
    }
  }

  function clearSampleChips() {
    for (const chip of document.querySelectorAll("[data-sample]")) {
      chip.setAttribute("aria-pressed", "false");
      chip.classList.remove("border-emerald-500/60", "text-emerald-300");
      chip.classList.add("text-slate-400");
    }
  }

  /* Build a link that carries the document in the URL fragment: no server,
     no storage — the fragment never even leaves the browser. */
  async function share() {
    const bytes = new TextEncoder().encode(els.input.value);
    let param = "doc";
    let payload = bytes;
    if (typeof CompressionStream !== "undefined") {
      try {
        payload = await pipeBytes(bytes, CompressionStream, "deflate-raw");
        param = "zdoc";
      } catch {
        payload = bytes;
        param = "doc";
      }
    }
    const parts = ["view=max"];
    if (activeFormat === "pdf") parts.push("fmt=pdf");
    parts.push(`${param}=${b64urlEncode(payload)}`);
    history.replaceState(null, "", `#${parts.join("&")}`);
    const url = window.location.href;
    let copied = true;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      copied = false;
    }
    els.share.textContent = copied ? "✓ Link copied" : "✓ Link in address bar";
    window.setTimeout(() => {
      els.share.textContent = "⚡ Share";
    }, 2200);
    if (url.length > 30000) {
      showDiagnostics([{ severity: "warning", start: 0, end: 0, message: `share link is ${url.length.toLocaleString()} characters — some chat apps truncate very long URLs` }]);
    } else {
      els.stats.textContent = `share link: ${url.length.toLocaleString()} chars — the document travels inside the URL`;
    }
  }

  /* Download filename: the document's first heading, lowercased with
     underscores for spaces — "# My Great Doc" downloads as my_great_doc.pdf. */
  function docFilenameBase() {
    // Search outside fenced code blocks so a `# comment` inside a bash fence
    // never becomes the filename.
    const lines = els.input.value.split("\n");
    let inFence = false;
    let fenceMarker = "";
    const kept = [];
    for (const line of lines) {
      const fence = line.match(/^\s*(```+|~~~+)/);
      if (fence) {
        if (!inFence) {
          inFence = true;
          fenceMarker = fence[1][0];
        } else if (fence[1][0] === fenceMarker) {
          inFence = false;
        }
        kept.push("");
        continue;
      }
      kept.push(inFence ? "" : line);
    }
    const src = kept.join("\n");
    let title = null;
    const atx = src.match(/^[ \t]{0,3}#{1,6}[ \t]+(.+?)[ \t]*#*[ \t]*$/m);
    if (atx) {
      title = atx[1];
    } else {
      const setext = src.match(/^[ \t]{0,3}(\S[^\n]*)\n[ \t]{0,3}=+[ \t]*$/m);
      if (setext) title = setext[1];
    }
    if (!title) return "franken-playground";
    const slug = title
      .replace(/['’]/g, "")
      .replace(/[`*_~]/g, "")
      .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, "_")
      .replace(/^_+|_+$/g, "");
    return slug || "franken-playground";
  }

  async function download(format) {
    const cached = presented[format];
    let res;
    try {
      res = cached && cached.version === docVersion
        ? cached.res
        : await workerRender(format, els.input.value, currentOptions(format));
    } catch (error) {
      showFatal(`Download render failed: ${error.message}`);
      return;
    }
    const mime = format === "pdf" ? "application/pdf" : "text/html; charset=utf-8";
    const blob = new Blob([res.bytes], { type: mime });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${docFilenameBase()}.${format}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    // Generous delay: "ask where to save" dialogs can hold the blob open far
    // longer than a few seconds. One document's bytes are cheap to keep.
    window.setTimeout(() => URL.revokeObjectURL(url), 120000);
  }

  /* --- wire events --- */

  els.input.addEventListener("input", () => {
    refreshEditor();
    invalidate();
  });

  els.input.addEventListener("scroll", () => {
    els.highlight.scrollTop = els.input.scrollTop;
    els.highlight.scrollLeft = els.input.scrollLeft;
  }, { passive: true });

  els.input.addEventListener("keydown", (event) => {
    // Plain Tab indents; Shift+Tab (and modified Tab) stays a focus move so
    // keyboard users are never trapped in the editor.
    if (event.key === "Tab" && !event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey) {
      event.preventDefault();
      els.input.setRangeText("  ", els.input.selectionStart, els.input.selectionEnd, "end");
      refreshEditor();
      invalidate();
    }
  });

  els.toggleHtml.addEventListener("click", () => setFormat("html"));
  els.togglePdf.addEventListener("click", () => setFormat("pdf"));
  els.downloadHtml.addEventListener("click", () => download("html"));
  els.downloadPdf.addEventListener("click", () => download("pdf"));
  els.maximize.addEventListener("click", () => setMaximized(!maximized));
  els.share.addEventListener("click", () => { void share(); });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && maximized) setMaximized(false);
  });
  window.addEventListener("hashchange", () => {
    void (async () => {
      const frag = parseFragment();
      if (frag.view === "max") setMaximized(true);
      if (frag.fmt === "pdf") setFormat("pdf");
      const result = await decodeFragmentDoc(frag);
      const doc = result.doc !== undefined
        ? result.doc
        : result.error
          ? `# This share link did not decode\n\n${result.error}\n`
          : undefined;
      if (doc !== undefined && doc !== els.input.value) {
        els.input.value = doc;
        refreshEditor();
        docVersion += 1;
        clearSampleChips();
        ensureLive(activeFormat);
      }
    })();
  });

  for (const control of [els.font, els.dark, els.linenos]) {
    control.addEventListener("change", () => {
      docVersion += 1;
      ensureLive(activeFormat);
    });
  }

  for (const chip of document.querySelectorAll("[data-sample]")) {
    chip.addEventListener("click", () => {
      const sample = SAMPLES[chip.dataset.sample];
      if (!sample) return;
      els.input.value = sample;
      refreshEditor();
      docVersion += 1;
      ensureLive(activeFormat);
      for (const other of document.querySelectorAll("[data-sample]")) {
        other.setAttribute("aria-pressed", String(other === chip));
        other.classList.toggle("border-emerald-500/60", other === chip);
        other.classList.toggle("text-emerald-300", other === chip);
        // Keep the color classes mutually exclusive; both present would leave
        // the winner to stylesheet order.
        other.classList.toggle("text-slate-400", other !== chip);
      }
    });
  }

  // The fragment may already have switched the active format (#fmt=pdf), so
  // style the chips from state instead of assuming the HTML default.
  styleToggle(els.toggleHtml, activeFormat === "html");
  styleToggle(els.togglePdf, activeFormat === "pdf");
}
