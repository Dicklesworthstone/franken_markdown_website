import { webkit } from "playwright-core";
import { readdirSync } from "node:fs";
const dir = readdirSync(`${process.env.HOME}/.cache/ms-playwright`).find((d) => d.startsWith("webkit-"));
const browser = await webkit.launch({ executablePath: `${process.env.HOME}/.cache/ms-playwright/${dir}/pw_run.sh` });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto("https://franken-markdown.com/", { waitUntil: "networkidle" });
await page.waitForFunction(() => document.getElementById("pg-status")?.textContent?.includes("ALIVE"), null, { timeout: 90000 });
console.log("webkit: worker ALIVE");
await page.waitForFunction(() => document.getElementById("pg-html-frame")?.srcdoc?.includes("<h1"), null, { timeout: 20000 });
console.log("webkit: html preview rendered");
await page.locator("#pg-toggle-pdf").click();
await page.waitForFunction(() => {
  const frame = document.getElementById("pg-pdf-frame");
  const fallback = document.getElementById("pg-pdf-fallback");
  const open = document.getElementById("pg-pdf-fallback-open");
  return frame?.src.startsWith("blob:") ||
    (!fallback.classList.contains("hidden") && open.href.startsWith("blob:"));
}, null, { timeout: 30000 });
console.log("webkit: pdf path =", await page.evaluate(() =>
  document.getElementById("pg-pdf-frame").src.startsWith("blob:") ? "inline viewer" : "fallback"));
await page.locator("#pg-toggle-html").click();
await page.locator("#pg-input").fill("# WebKit share test\n\nJavaScriptCore payload");
await page.locator("#pg-share").click();
await page.waitForFunction(() => window.location.hash.includes("doc="), null, { timeout: 15000 });
const hash = await page.evaluate(() => window.location.hash);
console.log("webkit: share hash built,", hash.length, "chars,", hash.includes("zdoc=") ? "compressed" : "plain doc= (no CompressionStream)");
const reader = await browser.newPage();
await reader.goto("https://franken-markdown.com/" + hash, { waitUntil: "networkidle" });
await reader.waitForFunction(() => document.getElementById("pg-html-frame")?.srcdoc?.includes("WebKit share test"), null, { timeout: 90000 });
console.log("webkit: share round-trip renders, maximized =",
  await reader.evaluate(() => document.getElementById("pg-root").classList.contains("pg-max")));
console.log("webkit: page errors:", errors.length, errors.slice(0, 2).join(" | "));
await browser.close();
process.exit(errors.length === 0 ? 0 : 1);
