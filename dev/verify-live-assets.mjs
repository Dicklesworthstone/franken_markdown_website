/* Compare every asset the live page references against the local working
   tree, byte for byte (sha256). Catches stale edge entries and forgotten
   ?v= bumps — the failure modes that once served desktop users mobile CSS.

   Run: bun dev/verify-live-assets.mjs [origin]   (default https://franken-markdown.com)

   The reference closure is read from index.html (stylesheet + scripts + og
   image + fonts) plus the JS import chain (module specifiers + worker URL +
   wasm bundle), so a new reference can't silently escape verification. */

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const ORIGIN = (process.argv[2] || "https://franken-markdown.com").replace(/\/$/, "");

const html = readFileSync("index.html", "utf8");
const refs = new Set();

// index.html: href/src references into assets/
for (const m of html.matchAll(/(?:href|src)="(assets\/[^"]+)"/g)) refs.add(m[1]);
// og image meta URLs
for (const m of html.matchAll(/content="https:\/\/[^"]*\/(assets\/img\/[^"]+)"/g)) refs.add(m[1]);

// JS import chain: module specifiers + worker URL, resolved relative to assets/js/
const jsQueue = [...refs].filter((r) => r.startsWith("assets/js/"));
const seen = new Set(jsQueue);
while (jsQueue.length > 0) {
  const ref = jsQueue.pop();
  const file = ref.split("?")[0];
  const src = readFileSync(file, "utf8");
  const specs = [
    ...[...src.matchAll(/from "(\.[^"]+)"/g)].map((m) => m[1]),
    ...[...src.matchAll(/new URL\("(\.[^"]+)", import\.meta\.url\)/g)].map((m) => m[1])
  ];
  for (const spec of specs) {
    const u = new URL(spec, `https://x/${file}`);
    const entry = u.pathname.slice(1) + u.search;
    if (!seen.has(entry)) {
      seen.add(entry);
      refs.add(entry);
      if (entry.split("?")[0].endsWith(".js")) jsQueue.push(entry);
    }
  }
}

// The wasm-bindgen glue fetches the binary beside itself.
for (const ref of [...refs]) {
  if (/wasm\/[^?]*\/pkg\/franken_markdown\.js/.test(ref)) {
    refs.add(ref.split("?")[0].replace(/franken_markdown\.js$/, "franken_markdown_bg.wasm"));
  }
}

const sha = (buf) => createHash("sha256").update(buf).digest("hex").slice(0, 12);
let stale = 0;
for (const ref of [...refs].sort()) {
  const file = ref.split("?")[0];
  const local = sha(readFileSync(file));
  const res = await fetch(`${ORIGIN}/${ref}`, { cache: "no-store" });
  const remote = sha(Buffer.from(await res.arrayBuffer()));
  const ok = res.ok && local === remote;
  if (!ok) stale++;
  console.log(`${ok ? "OK   " : "STALE"} ${ref}  local=${local} remote=${remote} http=${res.status} cf=${res.headers.get("cf-cache-status") || "-"}`);
}
console.log(stale === 0 ? "ALL LIVE ASSETS MATCH LOCAL" : `${stale} STALE ASSET(S)`);
process.exit(stale === 0 ? 0 : 1);
