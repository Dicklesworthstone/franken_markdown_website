import { chromium } from "playwright-core";
import { existsSync } from "node:fs";
const CHROME = [`${process.env.HOME}/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome`,
  `${process.env.HOME}/.cache/ms-playwright/chromium-1200/chrome-linux64/chrome`].find(p => existsSync(p));
const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage();
let wasmFetches = 0;
page.on("response", (r) => { if (r.url().includes(".wasm")) wasmFetches++; });
await page.goto("https://franken-markdown.com/", { waitUntil: "networkidle" });
await page.waitForFunction(() => document.getElementById("pg-status")?.textContent?.includes("ALIVE"), null, { timeout: 45000 });
console.log("wasm fetches after preload removal:", wasmFetches);
await browser.close();
process.exit(wasmFetches === 1 ? 0 : 1);
