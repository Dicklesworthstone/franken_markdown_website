import { chromium } from "playwright-core";
import { existsSync } from "node:fs";
const CHROME = [`${process.env.HOME}/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome`,
  `${process.env.HOME}/.cache/ms-playwright/chromium-1200/chrome-linux64/chrome`].find(p => existsSync(p));
const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage();
const hash = process.argv[2];
await page.goto("https://franken-markdown.com/" + hash, { waitUntil: "networkidle" });
await page.waitForFunction(() => document.getElementById("pg-html-frame")?.srcdoc?.includes("Hello from a URL"), null, { timeout: 45000 });
console.log("README sample link verified: renders 'Hello from a URL', maximized =",
  await page.evaluate(() => document.getElementById("pg-root").classList.contains("pg-max")));
await browser.close();
