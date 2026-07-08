import { chromium } from "playwright-core";
import { existsSync } from "node:fs";
const CHROME = [`${process.env.HOME}/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome`,
  `${process.env.HOME}/.cache/ms-playwright/chromium-1200/chrome-linux64/chrome`].find(p => existsSync(p));
const browser = await chromium.launch({ executablePath: CHROME });

// 1. wasm fetch count + page weight on cold load
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const fetches = [];
page.on("response", (r) => fetches.push({ url: r.url().replace("https://franken-markdown.com", ""), status: r.status() }));
await page.goto("https://franken-markdown.com/", { waitUntil: "networkidle" });
await page.waitForFunction(() => document.getElementById("pg-status")?.textContent?.includes("ALIVE"), null, { timeout: 45000 });
const wasmFetches = fetches.filter(f => f.url.includes(".wasm"));
console.log("wasm fetches:", wasmFetches.length, JSON.stringify(wasmFetches));
const weight = await page.evaluate(() =>
  performance.getEntriesByType("resource").reduce((s, e) => s + (e.transferSize || 0), 0));
console.log("total transferred:", (weight / 1024).toFixed(0), "KB");

// 2. KP viz after fonts loaded — check for overflow
await page.locator("#viz-knuth").scrollIntoViewIfNeeded();
await page.waitForTimeout(1200);
const kpOverflow = await page.evaluate(() => {
  const lines = document.querySelectorAll("#kp-optimal .kp-line");
  let worst = 0;
  for (const l of lines) worst = Math.max(worst, l.scrollWidth - l.clientWidth);
  return worst;
});
console.log("KP worst line overflow px:", kpOverflow);
await page.close();

// 3. Tablet viewport
const tab = await browser.newPage({ viewport: { width: 820, height: 1180 } });
await tab.goto("https://franken-markdown.com/", { waitUntil: "networkidle" });
await tab.waitForFunction(() => document.getElementById("pg-status")?.textContent?.includes("ALIVE"), null, { timeout: 45000 });
await tab.locator("#playground").scrollIntoViewIfNeeded();
await tab.waitForTimeout(600);
await tab.screenshot({ path: "dev/screenshots/r4-tablet-playground.png" });
await tab.close();

// 4. Mobile maximized
const mob = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mob.goto("https://franken-markdown.com/#view=max", { waitUntil: "networkidle" });
await mob.waitForFunction(() => document.getElementById("pg-status")?.textContent?.includes("ALIVE"), null, { timeout: 45000 });
await mob.waitForTimeout(1500);
await mob.screenshot({ path: "dev/screenshots/r4-mobile-maximized.png" });
await mob.close();

await browser.close();
console.log("probe done");
