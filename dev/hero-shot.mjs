import { chromium } from "playwright-core";
import { existsSync } from "node:fs";
const CHROME = [`${process.env.HOME}/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome`,
  `${process.env.HOME}/.cache/ms-playwright/chromium-1200/chrome-linux64/chrome`].find(p => existsSync(p));
const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("https://franken-markdown.com/", { waitUntil: "networkidle" });
await page.waitForTimeout(5000); // typing settles
await page.screenshot({ path: "dev/screenshots/r5-hero-terminal.png" });
await browser.close();
console.log("shot");
