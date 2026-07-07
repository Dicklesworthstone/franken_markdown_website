# franken_markdown_website

The static demo site for [franken_markdown](https://github.com/Dicklesworthstone/franken_markdown) —
"The Monster Markdown Engine." A self-contained HTML/CSS/JS site (no framework, no
build step at deploy time) whose centerpiece is a live two-pane playground: Markdown
in, rendered HTML or typeset PDF out, powered by the real franken_markdown engine
compiled to WebAssembly and running in a Web Worker.

Visual language: the FrankenSuite "Laboratory of Beautiful Monsters" system
(bolts, stitches, glitches, the eye), re-keyed to British Racing Green.

## Layout

```
index.html                  the whole site (single page, scroll narrative)
assets/css/site.css         compiled Tailwind v4 + custom design system (committed)
assets/js/main.js           chrome: header, reveals, glitch, monster eye, hero terminal
assets/js/playground.js     two-pane editor + HTML/PDF toggle + downloads
assets/js/render-worker.js  module worker hosting the wasm renderer
assets/js/md-highlight.js   editor overlay markdown highlighter
assets/js/viz.js            pipeline / Knuth-Plass / subsetting / deps visualizations
assets/wasm/                the @franken-suite/franken-markdown package (wrapper + pkg glue + .wasm)
assets/fonts/               self-hosted Inter + JetBrains Mono (latin variable woff2)
dev/tailwind.css            CSS source (tokens, materials, keyframes)
_headers                    Cloudflare Pages headers
.nojekyll                   keep GitHub Pages from running Jekyll
```

## Local development

```bash
bun install                       # only needed to rebuild CSS
bun run css                       # compile dev/tailwind.css -> assets/css/site.css
bun run css:watch                 # ... in watch mode
bun run serve                     # http://localhost:8899 (any static server works)
```

The compiled `assets/css/site.css` is committed, so deployment never needs Node/Bun.
Modules + WASM require http(s) — `file://` will not work.

## Refreshing the WASM artifacts

The wasm package is built and verified by the engine repo's official gate
(native ↔ wasm byte parity + size budget):

```bash
cd ../franken_markdown
scripts/check-wasm-package.sh <run-id>
cp target/fmd-checks/wasm-package/franken_markdown.{js,d.ts} ../franken_markdown_website/assets/wasm/
cp target/fmd-checks/wasm-package/pkg/franken_markdown.js     ../franken_markdown_website/assets/wasm/pkg/
cp target/fmd-checks/wasm-package/pkg/franken_markdown_bg.wasm ../franken_markdown_website/assets/wasm/pkg/
```

## Deploying

**Cloudflare Pages** — create a Pages project, connect the repo, framework preset
"None", build command empty, output directory `/`. (`_headers` sets caching and the
wasm content type.) Or push directly:

```bash
npx wrangler pages deploy . --project-name franken-markdown
```

**GitHub Pages** — Settings → Pages → deploy from branch `main`, folder `/ (root)`.
`.nojekyll` is already present. GitHub serves `.wasm` with the correct MIME type.

## Notes

- The playground renders through `assets/js/render-worker.js`, so typing stays
  smooth while the engine typesets PDFs off the main thread.
- PDF preview uses the browser's native inline viewer when available
  (`navigator.pdfViewerEnabled`); otherwise it falls back to an "open PDF" button
  (mobile browsers mostly cannot inline PDFs).
- Everything is self-contained: no CDNs, no external fonts, no analytics.
