import { chromium } from "playwright-core";
import { existsSync } from "node:fs";
const CHROME = [`${process.env.HOME}/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome`,
  `${process.env.HOME}/.cache/ms-playwright/chromium-1200/chrome-linux64/chrome`].find(p => existsSync(p));
const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("https://franken-markdown.com/", { waitUntil: "networkidle" });
await page.waitForFunction(() => document.getElementById("pg-status")?.textContent?.includes("ALIVE"), null, { timeout: 45000 });
const probe = await page.evaluate(async () => {
  const src = await (await fetch("/assets/js/playground.js")).text();
  document.getElementById("pg-maximize").click();
  await new Promise((r) => setTimeout(r, 300));
  const maxOn = document.getElementById("pg-root").classList.contains("pg-max");
  return { jsHasZdoc: src.includes("zdoc"), jsLen: src.length, maxWorks: maxOn };
});
console.log(JSON.stringify(probe));
await browser.close();
