import { chromium } from "playwright-core";
import { existsSync } from "node:fs";
const CHROME = [`${process.env.HOME}/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome`,
  `${process.env.HOME}/.cache/ms-playwright/chromium-1200/chrome-linux64/chrome`].find(p => existsSync(p));
const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage();
const fontWarnings = [];
page.on("console", (m) => { if (/OTS parsing|Failed to decode downloaded font/i.test(m.text())) fontWarnings.push(m.text()); });
await page.goto("https://franken-markdown.com/", { waitUntil: "networkidle" });
await page.waitForFunction(() => document.getElementById("pg-status")?.textContent?.includes("ALIVE"), null, { timeout: 45000 });
await page.waitForFunction(() => document.getElementById("pg-html-frame")?.srcdoc?.includes("<h1"), null, { timeout: 15000 });
await page.waitForTimeout(1500);
console.log("wasm dir used:", await page.evaluate(async () => (await (await fetch("/assets/js/render-worker.js?v=4")).text()).match(/wasm\/[\d.]+/)?.[0]));
console.log("OTS/font warnings on production:", fontWarnings.length);
await page.locator("#pg-toggle-pdf").click();
await page.waitForFunction(() => document.getElementById("pg-pdf-frame")?.src.startsWith("blob:"), null, { timeout: 30000 });
console.log("pdf render: ok");
await browser.close();
process.exit(fontWarnings.length === 0 ? 0 : 1);
