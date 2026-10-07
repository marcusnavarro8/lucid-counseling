import sharp from 'sharp';
import path from 'node:path';

// Brand logo: a soft painted emblem on a flat neutral-grey field.
// The field is desaturated (sat ~0.01) and sits at a steady luminance
// (~0.72); the emblem deviates from it — either coloured (sun, waves,
// leaf) or notably lighter/darker (sun glow, crescent). Key the flat
// grey to transparent, keep anything that departs from it, feather the
// soft edges, then crop to the emblem with a small margin.
const SRC =
  '/Users/augusto.proano/Documents/Scalepro/Lucid Counseling Center/Images/lucid_logo.png';
const OUT = path.resolve('public/media/logo.png');

const { data, info } = await sharp(SRC)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;

const clamp = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const FIELD_LUM = 0.72;

let minX = W,
  minY = H,
  maxX = 0,
  maxY = 0;

for (let p = 0; p < W * H; p++) {
  const i = p * C;
  const r = data[i],
    g = data[i + 1],
    b = data[i + 2],
    a0 = data[i + 3];
  const mx = Math.max(r, g, b),
    mn = Math.min(r, g, b);
  const sat = mx ? (mx - mn) / mx : 0;
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  // departure from the flat grey field — by colour or by brightness
  const satTerm = (sat - 0.045) / 0.1;
  const lumTerm = (Math.abs(lum - FIELD_LUM) - 0.05) / 0.16;
  const keep = clamp(Math.max(satTerm, lumTerm));
  const a = Math.round(Math.min(a0, Math.pow(keep, 0.8) * 255));
  data[i + 3] = a;
  if (a > 28) {
    const x = p % W,
      y = (p / W) | 0;
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
}

const margin = Math.round((maxX - minX) * 0.06);
const left = Math.max(0, minX - margin);
const top = Math.max(0, minY - margin);
const w = Math.min(W - left, maxX - minX + margin * 2);
const h = Math.min(H - top, maxY - minY + margin * 2);

await sharp(data, { raw: { width: W, height: H, channels: C } })
  .extract({ left, top, width: w, height: h })
  .png()
  .toFile(OUT);
console.log('logo →', `${w}x${h}`, 'crop', { left, top });
