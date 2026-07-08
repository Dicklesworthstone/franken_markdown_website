import { firefox } from "playwright-core";
import { readdirSync } from "node:fs";
const dir = readdirSync(`${process.env.HOME}/.cache/ms-playwright`).find((d) => d.startsWith("firefox-"));
const browser = await firefox.launch({ executablePath: `${process.env.HOME}/.cache/ms-playwright/${dir}/firefox/firefox` });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto("https://franken-markdown.com/", { waitUntil: "networkidle" });
await page.waitForFunction(() => document.getElementById("pg-status")?.textContent?.includes("ALIVE"), null, { timeout: 60000 });
console.log("firefox: worker ALIVE");
await page.waitForFunction(() => document.getElementById("pg-html-frame")?.srcdoc?.includes("<h1"), null, { timeout: 20000 });
console.log("firefox: html preview rendered");
await page.locator("#pg-toggle-pdf").click();
// Playwright's Firefox profile disables pdf.js (navigator.pdfViewerEnabled ===
// false), so the app legitimately takes EITHER the inline-viewer path or the
// "open PDF" fallback. Accept both; report which engaged.
await page.waitForFunction(() => {
  const frame = document.getElementById("pg-pdf-frame");
  const fallback = document.getElementById("pg-pdf-fallback");
  const open = document.getElementById("pg-pdf-fallback-open");
  return frame?.src.startsWith("blob:") ||
    (!fallback.classList.contains("hidden") && open.href.startsWith("blob:"));
}, null, { timeout: 30000 });
console.log("firefox: pdf path =", await page.evaluate(() =>
  document.getElementById("pg-pdf-frame").src.startsWith("blob:") ? "inline viewer" : "fallback (pdfViewerEnabled=false)"));
// Share round-trip (CompressionStream deflate-raw needs FF >= 113).
// Return to the HTML pane first: sharing from the PDF pane embeds fmt=pdf,
// and the reader would then (correctly) never touch the HTML frame.
await page.locator("#pg-toggle-html").click();
await page.locator("#pg-input").fill("# Firefox share test\n\ncross-browser payload");
await page.locator("#pg-share").click();
await page.waitForFunction(() => window.location.hash.includes("doc="), null, { timeout: 15000 });
const hash = await page.evaluate(() => window.location.hash);
const reader = await browser.newPage();
await reader.goto("https://franken-markdown.com/" + hash, { waitUntil: "networkidle" });
await reader.waitForFunction(() => document.getElementById("pg-html-frame")?.srcdoc?.includes("Firefox share test"), null, { timeout: 60000 });
console.log("firefox: share round-trip renders, maximized =",
  await reader.evaluate(() => document.getElementById("pg-root").classList.contains("pg-max")));
console.log("firefox: page errors:", errors.length, errors.slice(0, 2).join(" | "));
await page.screenshot({ path: "dev/screenshots/r7-firefox.png" });
await browser.close();
process.exit(errors.length === 0 ? 0 : 1);
