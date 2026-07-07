import { chromium } from "playwright-core";
import { existsSync } from "node:fs";
const CHROME = [`${process.env.HOME}/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome`,
  `${process.env.HOME}/.cache/ms-playwright/chromium-1200/chrome-linux64/chrome`].find(p => existsSync(p));
const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:8899/", { waitUntil: "domcontentloaded" });
await page.locator("#viz-knuth").scrollIntoViewIfNeeded();
await page.waitForTimeout(600);
const results = [];
for (let w = 280; w <= 560; w += 4) {
  await page.locator("#kp-slider").fill(String(w));
  const g = await page.locator("#kp-greedy-stats").textContent();
  const o = await page.locator("#kp-optimal-stats").textContent();
  const verdict = await page.locator("#kp-verdict").textContent();
  const gd = parseFloat(g.match(/demerits ([\d.]+)/)[1]);
  const od = parseFloat(o.match(/demerits ([\d.]+)/)[1]);
  const gw = parseFloat(g.match(/worst \|r\| ([\d.]+)/)[1]);
  const ow = parseFloat(o.match(/worst \|r\| ([\d.]+)/)[1]);
  results.push({ w, gd, od, gw, ow, pct: gd > 0 ? (1 - od / gd) * 100 : 0 });
}
results.sort((a, b) => b.pct - a.pct);
console.log("top 12 by improvement:");
for (const r of results.slice(0, 12)) {
  console.log(`w=${r.w}  greedy=${r.gd.toFixed(1)} (worst|r| ${r.gw})  kp=${r.od.toFixed(1)} (worst|r| ${r.ow})  improvement=${r.pct.toFixed(1)}%`);
}
await browser.close();
