import { chromium } from "playwright-core";
import { existsSync } from "node:fs";
const CHROME = [`${process.env.HOME}/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome`,
  `${process.env.HOME}/.cache/ms-playwright/chromium-1200/chrome-linux64/chrome`].find(p => existsSync(p));
const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage({ viewport: { width: 1440, height: 860 }, deviceScaleFactor: 2 });
await page.goto("https://franken-markdown.com/", { waitUntil: "networkidle" });
await page.waitForFunction(() => document.getElementById("pg-status")?.textContent?.includes("ALIVE"), null, { timeout: 45000 });
await page.waitForTimeout(3200); // hero terminal typing settles
await page.screenshot({ path: "dev/screenshots/readme-hero.png" });
// Playground with PDF pane for the gallery
await page.locator("#playground").scrollIntoViewIfNeeded();
await page.evaluate(() => window.scrollBy(0, -80));
await page.locator("#pg-toggle-pdf").click();
await page.waitForFunction(() => document.getElementById("pg-pdf-frame")?.src.startsWith("blob:"), null, { timeout: 30000 });
await page.waitForTimeout(1500);
await page.screenshot({ path: "dev/screenshots/readme-playground.png" });
await browser.close();
console.log("shots done");
