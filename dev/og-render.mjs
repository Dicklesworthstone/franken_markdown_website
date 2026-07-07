import { chromium } from "playwright-core";
import { existsSync } from "node:fs";
const CHROME = [`${process.env.HOME}/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome`,
  `${process.env.HOME}/.cache/ms-playwright/chromium-1200/chrome-linux64/chrome`].find(p => existsSync(p));
const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.goto(`file://${process.cwd()}/dev/og.html`, { waitUntil: "networkidle" });
await page.waitForTimeout(300);
await page.screenshot({ path: "assets/img/og.png" });
await browser.close();
console.log("og rendered");
