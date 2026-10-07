import sharp from 'sharp';
import { copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const SRC = '/Users/augusto.proano/Documents/Scalepro/Lucid Counseling Center/images';
const OUT = path.resolve('public/media');
const s = (n) => path.join(SRC, `ChatGPT Image May 17, 2026, ${n} AM.png`);

// Opaque scenes & black-bg blend assets — copy untouched.
const plain = {
  '06_01_07': 'hero-bg.png',
  '01_08_22': 'fog.png',
  '01_08_37': 'venn-glow.png',
  '01_08_41': 'cta-sky.png',
  '01_09_16': 'cta-godrays.png',
  '01_09_12': 'og-image.png',
  '05_22_01': 'tele-bg.png',
};
// Cut-out subjects on a magenta matte — de-fringe + clean alpha.
const cutout = {
  '01_08_34': 'hero-curtains.png',
  '01_08_58': 'interior.png',
  '01_08_29': 'venn-mind.png',
  '01_08_26': 'venn-body.png',
  '01_09_03': 'venn-heart.png',
  '01_09_07': 'cta-ground.png',
  '07_21_36': 'cta-ground-mobile.png',
};
// (the logo is NOT part of this pipeline — see process-new-logo.mjs)

await mkdir(OUT, { recursive: true });

async function deFringe(input, output) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i],
      g = data[i + 1],
      b = data[i + 2],
      a = data[i + 3];
    const magentaness = Math.min(r, b) - g; // high = magenta matte
    if (a < 12 || magentaness > 95) {
      data[i + 3] = 0; // fully clear
    } else if (magentaness > 18) {
      // soft edge: drop opacity and neutralise the pink tint
      const k = (magentaness - 18) / 77;
      data[i + 3] = Math.round(a * (1 - k));
      data[i] = Math.round(r - (r - g) * 0.85);
      data[i + 2] = Math.round(b - (b - g) * 0.85);
    }
  }
  await sharp(data, { raw: { width, height, channels } })
    .png({ quality: 92 })
    .toFile(output);
  return `${width}x${height}`;
}

for (const [k, name] of Object.entries(plain)) {
  await copyFile(s(k), path.join(OUT, name));
  console.log('copied   ', name);
}
for (const [k, name] of Object.entries(cutout)) {
  console.log('defringed', name, await deFringe(s(k), path.join(OUT, name)));
}
// mobile portrait backgrounds (opaque) — downscaled for fast mobile load
for (const [k, name] of [
  ['06_01_10', 'hero-bg-mobile.png'],
  ['04_47_25', 'cta-sky-mobile.png'],
  ['05_22_05', 'tele-bg-mobile.png'],
]) {
  await sharp(s(k)).resize({ width: 1000 }).png({ quality: 90 }).toFile(path.join(OUT, name));
  console.log('mobile   ', name);
}
// equalise the three venn circles so they render at the same visual size
await import('./normalize-venn.mjs');
console.log('done');
