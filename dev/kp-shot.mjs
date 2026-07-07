import { chromium } from "playwright-core";
import { existsSync } from "node:fs";
const CHROME = [`${process.env.HOME}/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome`,
  `${process.env.HOME}/.cache/ms-playwright/chromium-1200/chrome-linux64/chrome`].find(p => existsSync(p));
const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:8899/", { waitUntil: "domcontentloaded" });
await page.locator("#viz-knuth").scrollIntoViewIfNeeded();
await page.waitForTimeout(800);
console.log(await page.locator("#kp-verdict").textContent());
console.log("greedy:", await page.locator("#kp-greedy-stats").textContent());
console.log("kp:    ", await page.locator("#kp-optimal-stats").textContent());
await page.screenshot({ path: "dev/screenshots/04-knuth-default.png" });
await browser.close();
