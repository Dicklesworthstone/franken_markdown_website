import { chromium } from "playwright-core";
import { existsSync } from "node:fs";
const CHROME = [`${process.env.HOME}/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome`,
  `${process.env.HOME}/.cache/ms-playwright/chromium-1200/chrome-linux64/chrome`].find(p => existsSync(p));
const browser = await chromium.launch({ executablePath: CHROME });

// 1. Failure path: block the wasm binary — the UI must report, not hang.
const fail = await browser.newPage();
await fail.route("**/*.wasm*", (route) => route.abort());
await fail.goto("http://localhost:8899/", { waitUntil: "domcontentloaded" });
await fail.waitForFunction(
  () => /WASM FAILED|WORKER/.test(document.getElementById("pg-status")?.textContent || ""),
  null, { timeout: 30000 }
).catch(() => {});
const failState = await fail.evaluate(() => ({
  status: document.getElementById("pg-status").textContent,
  diag: document.getElementById("pg-diag").textContent.slice(0, 80)
}));
console.log("wasm-blocked state:", JSON.stringify(failState));
await fail.close();

// 2. Stress: rapid typing interleaved with rapid format toggles.
const page = await browser.newPage();
await page.goto("http://localhost:8899/", { waitUntil: "networkidle" });
await page.waitForFunction(() => document.getElementById("pg-status")?.textContent?.includes("ALIVE"), null, { timeout: 45000 });
for (let i = 0; i < 12; i++) {
  await page.locator("#pg-input").click();  // toggle clicks steal focus; reclaim it
  await page.keyboard.press("Control+End");
  await page.keyboard.type(`\n\nstress pass ${i} *emphasis* **bold**`);
  await page.locator(i % 2 ? "#pg-toggle-pdf" : "#pg-toggle-html").click();
  await page.waitForTimeout(60);
}
await page.locator("#pg-input").click();
await page.keyboard.press("Control+End");
await page.keyboard.type("\n\n## FINAL STRESS MARKER\n");
await page.locator("#pg-toggle-html").click();
await page.waitForFunction(
  () => document.getElementById("pg-html-frame")?.srcdoc?.includes("FINAL STRESS MARKER"),
  null, { timeout: 20000 }
);
await page.locator("#pg-toggle-pdf").click();
const before = await page.evaluate(() => document.getElementById("pg-pdf-frame").src);
await page.waitForFunction(
  (prev) => {
    const s = document.getElementById("pg-status")?.textContent || "";
    return s.includes("ALIVE") && document.getElementById("pg-pdf-frame").src.startsWith("blob:");
  }, before, { timeout: 20000 }
);
const end = await page.evaluate(() => ({
  status: document.getElementById("pg-status").textContent,
  stats: document.getElementById("pg-stats").textContent
}));
console.log("stress end state:", JSON.stringify(end));
const consistent = /PDF/.test(end.stats) && end.status.includes("ALIVE");
console.log(consistent ? "STRESS: consistent final state" : "STRESS: INCONSISTENT");
await browser.close();
process.exit(failState.status.includes("FAILED") || failState.status.includes("WORKER") ? (consistent ? 0 : 1) : 1);
