import sharp from "sharp";
import { readdirSync, statSync, unlinkSync } from "node:fs";
for (const f of readdirSync("screenshots")) {
  if (!f.endsWith(".png")) continue;
  const src = `screenshots/${f}`;
  const out = src.replace(/\.png$/, ".webp");
  await sharp(src).webp({ quality: 82 }).toFile(out);
  console.log(f, "->", out, Math.round(statSync(src).size / 1024) + "KB ->", Math.round(statSync(out).size / 1024) + "KB");
  unlinkSync(src);
}
