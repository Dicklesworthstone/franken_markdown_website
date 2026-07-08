import { chromium } from "playwright-core";
import { existsSync } from "node:fs";
const CHROME = [`${process.env.HOME}/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome`,
  `${process.env.HOME}/.cache/ms-playwright/chromium-1200/chrome-linux64/chrome`].find(p => existsSync(p));
const browser = await chromium.launch({ executablePath: CHROME });
for (const [w, h, name] of [[1440, 900, "desktop"], [820, 1180, "tablet"], [390, 844, "phone"]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto("http://localhost:8899/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(400);
  const state = await page.evaluate(() => {
    const nav = document.querySelector("#site-header nav");
    const gh = document.querySelector('#site-header a[href*="github"]');
    const burger = document.getElementById("mobile-menu-button");
    const header = document.getElementById("site-header");
    const hr = header.getBoundingClientRect();
    const overflow = [...header.querySelectorAll("*")].some((el) => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && (r.right > hr.right + 1 || r.left < hr.left - 1);
    });
    const vis = (el) => !!el && getComputedStyle(el).display !== "none";
    return { nav: vis(nav), github: vis(gh), burger: vis(burger), overflow };
  });
  console.log(`${name} (${w}px):`, JSON.stringify(state));
  if (name === "tablet") await page.screenshot({ path: "dev/screenshots/r4-tablet-header.png", clip: { x: 0, y: 0, width: w, height: 120 } });
  await page.close();
}
await browser.close();
