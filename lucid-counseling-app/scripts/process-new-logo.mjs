// The logo pipeline. Chroma-keys the magenta matte off the butterfly render
// in ../Images/lucid_logo.png (the current mark — older ones are kept beside it
// as logo-previous-<date>.png), de-fringes the blended edge pixels, and writes:
//   • public/media/logo.png   — the nav/footer mark, trimmed + padded square
//   • public/favicon.png      — the same mark at 256px
// Re-run after replacing lucid_logo.png. The favicon is cached hard by
// browsers, so also bump the ?v= on the two favicon links in index.html.
// (The social-share card, public/media/og-image.jpg, is a separate render with
// the mark already in it — see process-og-image.mjs.)
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const SRC = fileURLToPath(new URL('../../Images/lucid_logo.png', import.meta.url));
const OUT = fileURLToPath(new URL('../public/media/logo.png', import.meta.url));
const FAVICON = fileURLToPath(new URL('../public/favicon.png', import.meta.url));

const T0 = 55; // <= this distance from the key → fully transparent (pure matte)
const T1 = 135; // >= this distance → fully opaque (subject)

// The mark is two flat brand colours — upper wings Dusty Blue, lower wings
// Sage (see the brand board). Image generators drift a shade bright or
// saturated, so every subject pixel is snapped to the exact palette value by
// hue (bluer than green → blue, otherwise sage); anti-aliased edges keep their
// alpha. Set to false for a render that isn't a two-colour mark.
const SNAP_TO_PALETTE = true;
const DUSTY_BLUE = [0x8f, 0xa8, 0xb9];
const SAGE = [0xa8, 0xbf, 0xae];

const clamp = (v) => (v < 0 ? 0 : v > 255 ? 255 : v);

const { data, info } = await sharp(SRC)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
// magenta key: sampled from the top-left corner, since each render's matte
// comes out a slightly different magenta
const KR = data[0],
  KG = data[1],
  KB = data[2];
const out = Buffer.alloc(width * height * 4);

for (let i = 0, j = 0; i < data.length; i += channels, j += 4) {
  let r = data[i],
    g = data[i + 1],
    b = data[i + 2];
  const dr = r - KR,
    dg = g - KG,
    db = b - KB;
  const dist = Math.sqrt(dr * dr + dg * dg + db * db);

  let a;
  if (dist <= T0) a = 0;
  else if (dist >= T1) a = 255;
  else a = Math.round(((dist - T0) / (T1 - T0)) * 255);

  if (a > 0 && a < 255) {
    // un-premultiply the key out of the partially-transparent edge so the
    // magenta fringe doesn't tint the outline
    const af = a / 255;
    r = clamp((r - (1 - af) * KR) / af);
    g = clamp((g - (1 - af) * KG) / af);
    b = clamp((b - (1 - af) * KB) / af);
  }
  // light magenta-spill suppression on opaque pixels (pull R/B toward G where
  // the pixel skews magenta — guards against any residual pink cast)
  if (a === 255) {
    const m = (r + b) / 2;
    if (m > g) {
      const k = Math.min(1, (m - g) / 90) * 0.5;
      r = clamp(r - (m - g) * k);
      b = clamp(b - (m - g) * k);
    }
  }

  if (SNAP_TO_PALETTE && a > 0) {
    [r, g, b] = b > g ? DUSTY_BLUE : SAGE;
  }

  out[j] = r;
  out[j + 1] = g;
  out[j + 2] = b;
  out[j + 3] = a;
}

// write the keyed full-size transparent image, then trim + fit into a square
const tmp = OUT.replace(/logo\.png$/, 'logo-tmp.png');
await sharp(out, { raw: { width, height, channels: 4 } }).png().toFile(tmp);

const meta = await sharp(tmp).trim({ threshold: 1 }).toBuffer();
await sharp(meta)
  .resize(460, 460, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .extend({
    top: 26,
    bottom: 26,
    left: 26,
    right: 26,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toFile(OUT);

const fs = await import('node:fs');
fs.unlinkSync(tmp);
const final = await sharp(OUT).metadata();
console.log('wrote', OUT, `${final.width}x${final.height}`);

// favicon: the trimmed mark on a transparent 256 square with a little air
await sharp(meta)
  .resize(232, 232, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .extend({ top: 12, bottom: 12, left: 12, right: 12, background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(FAVICON);
console.log('wrote', FAVICON);
