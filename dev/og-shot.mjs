import { chromium } from "playwright-core";
import { existsSync } from "node:fs";
const CHROME = [`${process.env.HOME}/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome`,
  `${process.env.HOME}/.cache/ms-playwright/chromium-1200/chrome-linux64/chrome`].find(p => existsSync(p));
const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage({ viewport: { width: 1500, height: 788 }, deviceScaleFactor: 0.8 });
await page.goto("http://localhost:8899/", { waitUntil: "networkidle" });
await page.addStyleTag({ content: "#site-header{display:none!important} .glow-orb{animation:none!important} main{padding-top:0}" });
await page.evaluate(() => { document.querySelector("section").style.paddingTop = "70px"; });
await page.waitForTimeout(2600);
await page.screenshot({ path: "assets/img/og.png" });
await browser.close();
console.log("og image written");
