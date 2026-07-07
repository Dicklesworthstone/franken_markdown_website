/* Tiny dependency-free Markdown source highlighter for the playground editor.
   Produces HTML for a <pre> overlay that sits behind a transparent <textarea>.
   It must preserve the source text exactly (character-for-character) so the
   overlay and the textarea stay visually aligned; only <span> wrappers are
   added around runs. */

const AMP = /[&<>]/g;
const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;" };

function esc(text) {
  return text.replace(AMP, (ch) => ESCAPES[ch]);
}

function span(cls, text) {
  return `<span class="${cls}">${esc(text)}</span>`;
}

/* Inline tokens: code spans, bold, italic, links, autolinks. Order matters —
   code spans win over emphasis, per CommonMark. This is a display heuristic,
   not a conformant parser; the real parser lives in the wasm module. */
function highlightInline(text) {
  let out = "";
  let i = 0;
  const n = text.length;
  while (i < n) {
    const rest = text.slice(i);

    // Inline code: `...` (single backtick runs only; good enough for display)
    const code = rest.match(/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/);
    if (code) {
      out += span("md-code", code[0]);
      i += code[0].length;
      continue;
    }

    // Images / links: ![alt](url) or [text](url)
    const link = rest.match(/^(!?\[)([^\]\n]*)(\]\()([^)\n]*)(\))/);
    if (link) {
      out += span("md-marker", link[1]);
      out += span("md-link", link[2]);
      out += span("md-marker", link[3]);
      out += span("md-url", link[4]);
      out += span("md-marker", link[5]);
      i += link[0].length;
      continue;
    }

    // Autolink: <https://...>
    const auto = rest.match(/^<(https?:\/\/[^>\s]+)>/);
    if (auto) {
      out += span("md-link", auto[0]);
      i += auto[0].length;
      continue;
    }

    // Bold (** or __), possibly wrapping italic
    const bold = rest.match(/^(\*\*|__)(?!\s)([\s\S]*?\S)\1/);
    if (bold && bold[0].length <= 220) {
      out += span("md-marker", bold[1]) + span("md-bold", bold[2]) + span("md-marker", bold[1]);
      i += bold[0].length;
      continue;
    }

    // Italic (* or _)
    const em = rest.match(/^(\*|_)(?![\s*_])([^*_\n]*?\S)\1/);
    if (em && em[0].length <= 160) {
      out += span("md-marker", em[1]) + span("md-em", em[2]) + span("md-marker", em[1]);
      i += em[0].length;
      continue;
    }

    // Strikethrough
    const strike = rest.match(/^~~(?!\s)([\s\S]*?\S)~~/);
    if (strike && strike[0].length <= 160) {
      out += span("md-marker", "~~") + span("md-em", strike[1]) + span("md-marker", "~~");
      i += strike[0].length;
      continue;
    }

    // Plain run up to the next candidate special character
    const next = rest.slice(1).search(/[`*_[<~!]/);
    const take = next === -1 ? rest.length : next + 1;
    out += esc(rest.slice(0, take));
    i += take;
  }
  return out;
}

/** Highlight full Markdown source; returns HTML for the overlay <pre>. */
export function highlightMarkdown(source) {
  const lines = source.split("\n");
  const out = [];
  let inFence = false;
  let fenceMarker = "";

  for (const line of lines) {
    // Fence open/close
    const fence = line.match(/^(\s*)(```+|~~~+)(.*)$/);
    if (fence) {
      if (!inFence) {
        inFence = true;
        fenceMarker = fence[2][0];
        out.push(esc(fence[1]) + span("md-fence", fence[2]) + span("md-h", fence[3]));
      } else if (fence[2][0] === fenceMarker && fence[3].trim() === "") {
        inFence = false;
        out.push(esc(fence[1]) + span("md-fence", fence[2]) + esc(fence[3]));
      } else {
        out.push(span("md-codeblock", line));
      }
      continue;
    }
    if (inFence) {
      out.push(span("md-codeblock", line));
      continue;
    }

    // ATX heading
    const h = line.match(/^(\s{0,3})(#{1,6})(\s+)(.*)$/);
    if (h) {
      out.push(esc(h[1]) + span("md-marker", h[2]) + esc(h[3]) + span("md-h", h[4]));
      continue;
    }

    // Setext underline
    if (/^\s{0,3}(=+|-{2,})\s*$/.test(line)) {
      out.push(span("md-hr", line));
      continue;
    }

    // Horizontal rule
    if (/^\s{0,3}((\*\s*){3,}|(-\s*){3,}|(_\s*){3,})$/.test(line)) {
      out.push(span("md-hr", line));
      continue;
    }

    // Blockquote
    const bq = line.match(/^(\s{0,3}(?:>\s?)+)(.*)$/);
    if (bq) {
      out.push(span("md-marker", bq[1]) + `<span class="md-quote">${highlightInline(bq[2])}</span>`);
      continue;
    }

    // Table row
    if (/^\s*\|/.test(line) || /^\s*[^|]+\|[^|]+/.test(line) && /\|/.test(line) && /^[\s|:\-]+$/.test(line)) {
      if (/^[\s|:\-]+$/.test(line)) {
        out.push(span("md-marker", line));
        continue;
      }
    }
    if (/^\s*\|.*\|\s*$/.test(line)) {
      const cells = line.split(/(\|)/);
      let row = "";
      for (const part of cells) {
        row += part === "|" ? span("md-marker", "|") : highlightInline(part);
      }
      out.push(row);
      continue;
    }

    // List items (with optional task marker)
    const li = line.match(/^(\s*)([-+*]|\d{1,9}[.)])(\s+)(\[[ xX]\]\s+)?(.*)$/);
    if (li) {
      let row = esc(li[1]) + span("md-marker", li[2]) + esc(li[3]);
      if (li[4]) row += span("md-task", li[4]);
      row += highlightInline(li[5]);
      out.push(row);
      continue;
    }

    // Reference definition
    const ref = line.match(/^(\s{0,3}\[)([^\]]+)(\]:\s*)(\S+)(.*)$/);
    if (ref) {
      out.push(
        span("md-marker", ref[1]) + span("md-link", ref[2]) + span("md-marker", ref[3]) +
        span("md-url", ref[4]) + span("md-em", ref[5])
      );
      continue;
    }

    out.push(highlightInline(line));
  }

  // Trailing newline so the overlay's height matches the textarea when the
  // source ends with "\n" (a <pre> collapses a final empty line otherwise).
  return out.join("\n") + "\n";
}
