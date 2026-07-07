import { chromium } from "playwright-core";
import { existsSync } from "node:fs";
const CHROME = [`${process.env.HOME}/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome`,
  `${process.env.HOME}/.cache/ms-playwright/chromium-1200/chrome-linux64/chrome`].find(p => existsSync(p));
const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("console", (m) => console.log("[console]", m.type(), m.text()));
page.on("pageerror", (e) => console.log("[pageerror]", String(e)));
await page.goto("https://franken-markdown.com/", { waitUntil: "networkidle" });
await page.waitForFunction(() => document.getElementById("pg-status")?.textContent?.includes("ALIVE"), null, { timeout: 45000 });
await page.locator("#pg-input").fill("# Shared via URL\n\nInside the link.");
const result = await page.evaluate(async () => {
  try {
    document.getElementById("pg-share").click();
    await new Promise((r) => setTimeout(r, 2500));
    return { hash: window.location.hash.slice(0, 60), btn: document.getElementById("pg-share").textContent, cs: typeof CompressionStream };
  } catch (e) { return { err: String(e) }; }
});
console.log(JSON.stringify(result, null, 2));
await browser.close();
