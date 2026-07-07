/* Headless end-to-end check of the site + wasm playground.
   Run: bun dev/e2e.mjs  (expects the site served at http://localhost:8899) */

import { chromium } from "playwright-core";
import { existsSync } from "node:fs";

const CHROME = [
  `${process.env.HOME}/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome`,
  `${process.env.HOME}/.cache/ms-playwright/chromium-1200/chrome-linux64/chrome`
].find((p) => existsSync(p));

if (!CHROME) {
  console.error("no cached chromium found");
  process.exit(1);
}

const failures = [];
const check = (name, ok, extra = "") => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${extra ? ` — ${extra}` : ""}`);
  if (!ok) failures.push(name);
};

const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const consoleErrors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") consoleErrors.push(msg.text());
});
page.on("pageerror", (err) => consoleErrors.push(String(err)));

await page.goto("http://localhost:8899/", { waitUntil: "networkidle" });
check("page loads", (await page.title()).includes("franken_markdown"));

// Wait for the wasm worker to come alive and render the first HTML preview.
await page.waitForFunction(
  () => document.getElementById("pg-status")?.textContent?.includes("ALIVE"),
  null,
  { timeout: 30000 }
).catch(() => {});
const status = await page.locator("#pg-status").textContent();
check("wasm worker alive", status.includes("ALIVE"), `status=${status}`);

// HTML preview should contain rendered content from the sample doc.
await page.waitForFunction(() => {
  const frame = document.getElementById("pg-html-frame");
  return frame && frame.srcdoc && frame.srcdoc.includes("<h1");
}, null, { timeout: 15000 }).catch(() => {});
const srcdocLen = await page.evaluate(() => document.getElementById("pg-html-frame").srcdoc.length);
check("html preview rendered", srcdocLen > 10000, `${srcdocLen} bytes of srcdoc`);

const stats = await page.locator("#pg-stats").textContent();
check("render stats shown", /ms in worker/.test(stats), stats.trim());

// Type into the editor and confirm a re-render happens.
await page.locator("#pg-input").click();
await page.keyboard.press("Control+End");
await page.keyboard.type("\n\n## Injected by e2e\n\nfresh *paragraph* here.");
await page.waitForFunction(
  () => document.getElementById("pg-html-frame").srcdoc.includes("Injected by e2e"),
  null,
  { timeout: 15000 }
).catch(() => {});
const liveOk = await page.evaluate(() =>
  document.getElementById("pg-html-frame").srcdoc.includes("Injected by e2e"));
check("live re-render on typing", liveOk);

await page.screenshot({ path: "dev/screenshots/01-playground-html.png" });

// Toggle to PDF and confirm the pdf iframe gets a blob url.
await page.locator("#pg-toggle-pdf").click();
await page.waitForFunction(() => {
  const f = document.getElementById("pg-pdf-frame");
  return f && f.src.startsWith("blob:");
}, null, { timeout: 30000 }).catch(() => {});
const pdfSrc = await page.evaluate(() => document.getElementById("pg-pdf-frame").src);
check("pdf preview blob set", pdfSrc.startsWith("blob:"), pdfSrc.slice(0, 40));
const pdfStats = await page.locator("#pg-stats").textContent();
check("pdf stats shown", /PDF/.test(pdfStats), pdfStats.trim());
await page.waitForTimeout(1200); // let the pdf viewer paint
await page.screenshot({ path: "dev/screenshots/02-playground-pdf.png" });

// Toggle back to HTML — should present instantly from cache.
await page.locator("#pg-toggle-html").click();
const backOk = await page.evaluate(() =>
  !document.getElementById("pg-pane-html").classList.contains("hidden"));
check("toggle back to html", backOk);

// Sample chips swap the document.
await page.locator("[data-sample='code']").click();
await page.waitForFunction(
  () => document.getElementById("pg-html-frame").srcdoc.includes("clean-room highlighter"),
  null,
  { timeout: 15000 }
).catch(() => {});
const sampleOk = await page.evaluate(() =>
  document.getElementById("pg-html-frame").srcdoc.includes("clean-room highlighter"));
check("sample chip swaps document", sampleOk);

// Maximize mode.
await page.locator("#pg-maximize").click();
const maxOn = await page.evaluate(() => document.getElementById("pg-root").classList.contains("pg-max"));
check("maximize enters full page", maxOn);
await page.waitForTimeout(400);
await page.screenshot({ path: "dev/screenshots/08-maximized.png" });
await page.keyboard.press("Escape");
const maxOff = await page.evaluate(() => !document.getElementById("pg-root").classList.contains("pg-max"));
check("escape exits full page", maxOff);

// Share: the document travels in the URL fragment.
await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
await page.locator("#pg-share").click();
await page.waitForFunction(() => window.location.hash.includes("doc="), null, { timeout: 10000 });
const shareHash = await page.evaluate(() => window.location.hash);
check("share builds doc-carrying hash", /^#view=max&(fmt=pdf&)?z?doc=/.test(shareHash), `${shareHash.length} chars`);

// Round trip: open the share link in a fresh page.
const reader = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await reader.goto("http://localhost:8899/" + shareHash, { waitUntil: "networkidle" });
await reader.waitForFunction(() => document.getElementById("pg-status")?.textContent?.includes("ALIVE"), null, { timeout: 30000 }).catch(() => {});
const rtMax = await reader.evaluate(() => document.getElementById("pg-root").classList.contains("pg-max"));
const rtDoc = await reader.evaluate(() => document.getElementById("pg-input").value);
check("share link opens maximized", rtMax);
check("share link carries the document", rtDoc.includes("clean-room highlighter"));
await reader.waitForFunction(() => document.getElementById("pg-html-frame").srcdoc.includes("clean-room highlighter"), null, { timeout: 15000 }).catch(() => {});
const rtRendered = await reader.evaluate(() => document.getElementById("pg-html-frame").srcdoc.includes("clean-room highlighter"));
check("shared document renders on load", rtRendered);
await reader.screenshot({ path: "dev/screenshots/09-shared-link.png" });
await reader.close();
await page.evaluate(() => history.replaceState(null, "", "#"));

// Visualizations init.
await page.locator("#pipeline").scrollIntoViewIfNeeded();
await page.waitForTimeout(700);
const pipelineTitle = await page.locator("#pipeline-detail-title").textContent();
check("pipeline viz initialized", pipelineTitle.trim().length > 0, pipelineTitle.trim());
await page.screenshot({ path: "dev/screenshots/03-pipeline.png" });

await page.locator("#viz-knuth").scrollIntoViewIfNeeded();
await page.waitForTimeout(700);
const kpLines = await page.locator("#kp-optimal .kp-line").count();
check("knuth-plass viz renders lines", kpLines > 3, `${kpLines} lines`);
await page.locator("#kp-slider").fill("320");
const kpLinesNarrow = await page.locator("#kp-optimal .kp-line").count();
check("knuth-plass slider reflows", kpLinesNarrow > kpLines, `${kpLines} -> ${kpLinesNarrow}`);
await page.screenshot({ path: "dev/screenshots/04-knuth.png" });

await page.locator("#viz-subset").scrollIntoViewIfNeeded();
await page.waitForTimeout(700);
const kept = await page.locator("#subset-kept").textContent();
check("subset viz counts glyphs", /\d+ \/ 94/.test(kept), kept);

await page.locator("#viz-deps").scrollIntoViewIfNeeded();
await page.waitForTimeout(1200);
const depNodes = await page.locator("#deps-left-svg circle").count();
check("deps graph populated", depNodes > 30, `${depNodes} nodes`);
await page.screenshot({ path: "dev/screenshots/05-deps.png" });

// Hero screenshot at top (after everything settled).
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(1500);
await page.screenshot({ path: "dev/screenshots/00-hero.png" });

// Mobile pass.
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto("http://localhost:8899/", { waitUntil: "networkidle" });
await mobile.waitForFunction(
  () => document.getElementById("pg-status")?.textContent?.includes("ALIVE"),
  null,
  { timeout: 30000 }
).catch(() => {});
await mobile.screenshot({ path: "dev/screenshots/06-mobile-hero.png" });
await mobile.locator("#playground").scrollIntoViewIfNeeded();
await mobile.waitForTimeout(800);
await mobile.screenshot({ path: "dev/screenshots/07-mobile-playground.png" });
const menuVisible = await mobile.locator("#mobile-menu-button").isVisible();
check("mobile menu button visible", menuVisible);

check("no console errors", consoleErrors.length === 0, consoleErrors.slice(0, 3).join(" | "));

await browser.close();
console.log(failures.length === 0 ? "\nALL CHECKS PASSED" : `\n${failures.length} FAILURES: ${failures.join(", ")}`);
process.exit(failures.length === 0 ? 0 : 1);
