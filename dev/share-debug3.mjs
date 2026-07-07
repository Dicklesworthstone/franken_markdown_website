import { chromium } from "playwright-core";
import { existsSync } from "node:fs";
const CHROME = [`${process.env.HOME}/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome`,
  `${process.env.HOME}/.cache/ms-playwright/chromium-1200/chrome-linux64/chrome`].find(p => existsSync(p));
const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const jsResponses = [];
page.on("response", (r) => {
  if (r.url().includes("playground.js") || r.url().endsWith("/")) {
    jsResponses.push({ url: r.url(), status: r.status(), fromCache: r.fromServiceWorker(), cfCache: r.headers()["cf-cache-status"], age: r.headers()["age"], len: r.headers()["content-length"] });
  }
});
await page.goto("https://franken-markdown.com/", { waitUntil: "networkidle" });
const htmlHasV3 = await page.evaluate(() => document.documentElement.outerHTML.includes("playground.js?v=3"));
const probe = await page.evaluate(async () => {
  const src = await (await fetch("/assets/js/playground.js?v=3")).text();
  return { v3HasZdoc: src.includes("zdoc"), v3Len: src.length };
});
console.log("html has ?v=3 refs:", htmlHasV3);
console.log(JSON.stringify(jsResponses, null, 2));
console.log(JSON.stringify(probe));
await browser.close();
