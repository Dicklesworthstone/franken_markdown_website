import { chromium } from "playwright-core";
import { existsSync } from "node:fs";
const CHROME = [`${process.env.HOME}/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome`,
  `${process.env.HOME}/.cache/ms-playwright/chromium-1200/chrome-linux64/chrome`].find(p => existsSync(p));
const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage();
const warnings = [];
page.on("console", (m) => { if (/OTS|Failed to decode/i.test(m.text())) warnings.push(m.text().slice(0, 90)); });
await page.goto("file://" + process.argv[2], { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
const fonts = await page.evaluate(async () => {
  await document.fonts.ready;
  return [...document.fonts].map(f => `${f.family} ${f.weight} ${f.style}: ${f.status}`);
});
console.log("OTS/decode warnings:", warnings.length);
for (const w of warnings) console.log("  ", w);
console.log("document.fonts:");
for (const f of fonts) console.log("  ", f);
await browser.close();
process.exit(warnings.length === 0 && fonts.every(f => f.endsWith("loaded")) ? 0 : 1);
