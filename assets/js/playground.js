/* The Operating Theater: two-pane live playground.
   Left: syntax-highlighted Markdown editor (textarea + overlay).
   Right: HTML or PDF rendered by the franken_markdown wasm core in a worker. */

import { highlightMarkdown } from "./md-highlight.js";

const SAMPLES = {
  showcase: `# franken_markdown

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

  try {
    worker = new Worker(new URL("./render-worker.js", import.meta.url), { type: "module" });
  } catch (error) {
    setStatus("dead", "WORKER FAILED");
    showFatal(`This browser could not start the render worker: ${error.message}`);
    return;
  }

  worker.onmessage = (event) => {
    const msg = event.data;
    if (msg.type === "ready") {
      workerReady = true;
      setStatus("alive", "IT'S ALIVE");
      ensureLive("html");
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
        setStatus("alive", "RENDER FAILED");
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

  function showDiagnostics(diagnostics) {
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
    link.download = `franken-playground.${format}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 4000);
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
    if (event.key === "Tab") {
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
      }
    });
  }

  styleToggle(els.toggleHtml, true);
  styleToggle(els.togglePdf, false);
}
