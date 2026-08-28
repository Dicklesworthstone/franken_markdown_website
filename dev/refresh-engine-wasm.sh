#!/usr/bin/env bash
# Copy a verified engine wasm package into this site and (optionally) deploy.
#
# Usage:
#   dev/refresh-engine-wasm.sh [--deploy] [engine-dir]
#
# engine-dir defaults to a sibling ../franken_markdown checkout. The official
# parity gate is scripts/check-wasm-package.sh in that repo. This script never
# runs wasm-opt: on the 0.3.5 module, -Oz/-O4/-Os grew gzip and brotli even
# though they shrank raw bytes. Cloudflare Pages already brotli-encodes, so
# the transfer-optimal artifact is the wasm-bindgen output as-is.
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEPLOY=0
ENGINE=""
for arg in "$@"; do
  case "$arg" in
    --deploy) DEPLOY=1 ;;
    --*) echo "unknown flag $arg" >&2; exit 64 ;;
    *) ENGINE="$arg" ;;
  esac
done
ENGINE="${ENGINE:-$ROOT/../franken_markdown}"
PKG="$ENGINE/target/fmd-checks/wasm-package"
STAGED="$ROOT/dev/engine-wasm"
if [[ ! -s "$PKG/pkg/franken_markdown_bg.wasm" ]]; then
  echo "missing $PKG/pkg/franken_markdown_bg.wasm — run scripts/check-wasm-package.sh in the engine repo first (or pass a directory that already contains wrapper + pkg/)." >&2
  exit 66
fi
V="$(python3 -c "import json; print(json.load(open('$ENGINE/wasm/package.json'))['version'])")"
mkdir -p "$STAGED/$V/pkg" "$ROOT/assets/wasm/$V/pkg"
cp "$PKG/franken_markdown.js" "$STAGED/$V/franken_markdown.js"
cp "$PKG/franken_markdown.d.ts" "$STAGED/$V/franken_markdown.d.ts"
cp "$PKG/pkg/franken_markdown.js" "$STAGED/$V/pkg/franken_markdown.js"
cp "$PKG/pkg/franken_markdown_bg.wasm" "$STAGED/$V/pkg/franken_markdown_bg.wasm"
cp "$STAGED/$V/franken_markdown.js" "$ROOT/assets/wasm/$V/franken_markdown.js"
cp "$STAGED/$V/franken_markdown.d.ts" "$ROOT/assets/wasm/$V/franken_markdown.d.ts"
cp "$STAGED/$V/pkg/franken_markdown.js" "$ROOT/assets/wasm/$V/pkg/franken_markdown.js"
cp "$STAGED/$V/pkg/franken_markdown_bg.wasm" "$ROOT/assets/wasm/$V/pkg/franken_markdown_bg.wasm"
python3 - "$ROOT" "$V" <<'PY'
import pathlib, re, sys
root, ver = pathlib.Path(sys.argv[1]), sys.argv[2]
worker = root / "assets/js/render-worker.js"
text = worker.read_text()
text2, n = re.subn(r'from "\.\./wasm/[\d.]+/franken_markdown\.js"', f'from "../wasm/{ver}/franken_markdown.js"', text)
if n != 1:
    raise SystemExit(f"worker import rewrite failed (n={n})")
worker.write_text(text2)
play = root / "assets/js/playground.js"
pt = play.read_text()
m = re.search(r'render-worker\.js\?v=(\d+)', pt)
if not m:
    raise SystemExit("playground worker cache-bust not found")
nxt = str(int(m.group(1)) + 1)
pt2 = pt.replace(f"render-worker.js?v={m.group(1)}", f"render-worker.js?v={nxt}")
play.write_text(pt2)
idx = root / "index.html"
it = idx.read_text()
im = re.search(r'playground\.js\?v=(\d+)', it)
if not im:
    raise SystemExit("index playground cache-bust not found")
it2 = it.replace(f"playground.js?v={im.group(1)}", f"playground.js?v={nxt}")
idx.write_text(it2)
hdr = root / "_headers"
rule = f"/assets/wasm/{ver}/pkg/franken_markdown_bg.wasm"
if rule not in hdr.read_text():
    hdr.write_text(hdr.read_text() + f"\n{rule}\n  Content-Type: application/wasm\n  Cache-Control: public, max-age=0, must-revalidate\n")
print(f"wired assets/wasm/{ver} and cache-bust ?v={nxt}")
PY
RAW=$(wc -c < "$ROOT/assets/wasm/$V/pkg/franken_markdown_bg.wasm")
GZ=$(gzip -c "$ROOT/assets/wasm/$V/pkg/franken_markdown_bg.wasm" | wc -c)
echo "wasm $V raw=${RAW// /} gzip=${GZ// /}"
if [[ "$DEPLOY" -eq 1 ]]; then
  DIST="$(mktemp -d /tmp/fmd-site-dist-XXXX)"
  cp -R "$ROOT/index.html" "$ROOT/assets" "$ROOT/_headers" "$ROOT/robots.txt" "$ROOT/.nojekyll" "$DIST/"
  wrangler pages deploy "$DIST" --project-name franken-markdown --branch main --commit-dirty=true
fi
