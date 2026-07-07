import { chromium } from "playwright-core";
import { existsSync } from "node:fs";
const CHROME = [`${process.env.HOME}/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome`,
  `${process.env.HOME}/.cache/ms-playwright/chromium-1200/chrome-linux64/chrome`].find(p => existsSync(p));
const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const url = process.argv[2] || "https://franken-markdown.pages.dev/";
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForFunction(() => document.getElementById("pg-status")?.textContent?.includes("ALIVE"), null, { timeout: 45000 });
console.log("status:", await page.locator("#pg-status").textContent());
await page.locator("#pg-toggle-pdf").click();
await page.waitForFunction(() => document.getElementById("pg-pdf-frame")?.src.startsWith("blob:"), null, { timeout: 30000 });
console.log("pdf: ok");
console.log("stats:", await page.locator("#pg-stats").textContent());
await browser.close();
console.log("LIVE SMOKE PASSED");
