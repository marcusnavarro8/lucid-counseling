// Download each team member's headshot and crop to a uniform square for the
// Team grid. URLs were verified per member (named files from the client's team
// grid; cryptic ones confirmed on each person's own profile page). An entry is
// one of:
//   • a path relative to BASE (the client's WordPress uploads),
//   • a full https:// URL, for members whose only headshot lives on their own
//     Psychology Today profile,
//   • a bare filename, for headshots the client emailed over — those live in
//     LOCAL (`../Images/team/`, the same sibling folder as the scene renders,
//     kept outside the repo like the rest of the source imagery).
//
// The square is cut with sharp's attention strategy by default. An optional
// third element tunes the crop for photos where that lands badly:
//   • a string ('top', …) just moves the anchor — for sources that have
//     headroom the attention crop threw away;
//   • { extract: { left, top, size } } takes that square of the source (after
//     EXIF rotation) — for subjects framed off-centre in a source with no
//     spare width, at the cost of some upscaling;
//   • { extend: { top, left, right } } synthesises margin, as a fraction of the
//     source height/width, for sources already cut at the hairline. Sides are
//     mirrored; the top is a blurred smear of the edge row feathered into the
//     real pixels, which at avatar size reads as out-of-focus hair/background.
//     It IS invented image — the honest fix is an uncropped original from the
//     client; this only buys breathing room until one arrives.
// A string and an object can't be combined; put `position` in the object.
//
// Re-runnable: by default it only fetches slugs that don't have a file yet, so
// re-running to add one new member can't disturb the existing crops. Pass
// --force to re-download everything, or delete a single output file to redo
// just that member (e.g. when the client sends a replacement headshot).
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { mkdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';
const BASE = 'https://i0.wp.com/lucidcounselingcenter.com/wp-content/uploads/';
const LOCAL = fileURLToPath(new URL('../../Images/team/', import.meta.url));

const PHOTOS = [
  ['paula-navarro', '2025/01/Paula-Navarro-Jan-2025-320x400_full-bg.png'],
  ['debbye-lopez', '2023/12/Debbye-Lopez-Ramos.jpg', { extend: { top: 0.06 }, position: 'top' }],
  ['alexis-lane', '2025/12/IMG_7461.jpeg'],
  ['brittaney-gragg', '2024/02/Brittaney-Gragg01.png'],
  ['alma-rojas', '2026/03/Alma-109.jpg'],
  ['loreley-castro', '2024/01/Loreley-Castro.jpg'],
  ['veronica-cavalcante', '2024/05/Veronica-Cavalcante-320x400-1.png'],
  ['paula-zubieta', '2024/06/Paula-Zubieta-320x400-1.png', { extend: { top: 0.06 }, position: 'top' }],
  ['julie-bouchie', '2026/05/IMG_3453-2.jpg'],
  ['tatiana-gerhardt', '2025/10/knockout.jpg', { extend: { top: 0.06 }, position: 'top' }],
  ['hayde-rodriguez', '2024/03/Haydee-Rodriguez-320x400-1.jpg'],
  // Psychology Today profiles supplied by the client (no headshot on the
  // client's own site yet).
  [
    'laura-delgado',
    'https://photos.psychologytoday.com/3d12fc3b-3d5a-4ce7-bf44-20150040d426/1/320x400.jpeg',
    // framed left of centre with no spare width: mirror the curtain to centre her
    { extend: { top: 0.06, left: 0.225 }, position: 'top' },
  ],
  [
    'jonathan-garcia',
    'https://photos.psychologytoday.com/b2d6cfab-93e8-4765-b39c-265748f4aa2e/1/320x400.jpeg',
    { extract: { left: 64, top: 0, size: 256 } },
  ],
  [
    'stephanie-mojica',
    'https://photos.psychologytoday.com/95fdde3c-4f50-490b-b6aa-7f64489b2fd3/1/320x400.jpeg',
  ],
  [
    'natividad-sanchez',
    'https://photos.psychologytoday.com/9ac4cc0c-b951-49a8-ad86-adf70a5d17b5/1/320x400.jpeg',
  ],
  // Headshots the client emailed over (Sep 2026) — Marcus had none anywhere,
  // and the other three replace the older WordPress crops.
  ['marcus-navarro', 'marcus-navarro.jpg'],
  ['lauren-pintar', 'lauren-pintar.jpg'],
  // source has generous headroom; this square puts the crown ~7% down
  ['lucy-dergarabedian', 'lucy-dergarabedian.jpg', { extract: { left: 0, top: 102, size: 1264 } }],
  ['graziela-silva', 'graziela-silva.jpg', 'top'],
];

const FORCE = process.argv.includes('--force');

// Synthesise margin around a source that was cut too tight (see PHOTOS notes).
// `buf` is already EXIF-rotated. Sides mirror the edge; the top is a blurred
// smear of the top row, feathered over the first few real rows so no seam shows.
async function extendEdges(buf, { top = 0, left = 0, right = 0 }) {
  const { width, height } = await sharp(buf).metadata();
  const sides = { left: Math.round(width * left), right: Math.round(width * right) };
  let out = buf;
  if (sides.left || sides.right) {
    out = await sharp(out).extend({ ...sides, extendWith: 'mirror' }).toBuffer();
  }
  const pad = Math.round(height * top);
  if (pad) {
    const w = width + sides.left + sides.right;
    const feather = Math.round(height * 0.04);
    const ext = await sharp(out).extend({ top: pad, extendWith: 'copy' }).toBuffer();
    const band = await sharp(ext)
      .extract({ left: 0, top: 0, width: w, height: pad + feather })
      .blur(6)
      .toBuffer();
    const fade = Buffer.from(
      `<svg width="${w}" height="${pad + feather}"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">` +
        `<stop offset="${(pad / (pad + feather)).toFixed(3)}" stop-color="#fff" stop-opacity="1"/>` +
        `<stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>` +
        `<rect width="100%" height="100%" fill="url(#g)"/></svg>`
    );
    const bandFaded = await sharp(band)
      .ensureAlpha()
      .composite([{ input: fade, blend: 'dest-in' }])
      .png()
      .toBuffer();
    out = await sharp(ext).composite([{ input: bandFaded, left: 0, top: 0 }]).png().toBuffer();
  }
  return out;
}

async function cropSquare(buf, opts) {
  const o = typeof opts === 'string' ? { position: opts } : opts ?? {};
  // .rotate() with no angle honours the EXIF orientation flag, which phone
  // photos rely on — without it a portrait shot can come out on its side.
  let src = await sharp(buf).rotate().toBuffer();
  if (o.extend) src = await extendEdges(src, o.extend);
  let pipe = sharp(src);
  if (o.extract) {
    const { left, top, size } = o.extract;
    pipe = pipe.extract({ left, top, width: size, height: size });
  }
  return pipe.resize(SIZE, SIZE, {
    fit: 'cover',
    position: o.position ?? sharp.strategy.attention,
  });
}

const SIZE = 560;
const OUTDIR = fileURLToPath(new URL('../public/media/team/', import.meta.url));
await mkdir(OUTDIR, { recursive: true });

const thumbs = [];
const report = [];

for (const [slug, path, opts] of PHOTOS) {
  const dest = `${OUTDIR}${slug}.jpg`;
  if (!FORCE && existsSync(dest)) {
    thumbs.push(await sharp(dest).resize(200, 200).jpeg().toBuffer());
    report.push(`${slug}: skipped (already downloaded)`);
    continue;
  }
  try {
    let buf;
    if (!path.includes('/')) {
      buf = await readFile(LOCAL + path);
    } else {
      const url = path.startsWith('http') ? path : BASE + path;
      const r = await fetch(url, { headers: { 'User-Agent': UA } });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      buf = Buffer.from(await r.arrayBuffer());
    }
    const square = await cropSquare(buf, opts);
    await square.clone().jpeg({ quality: 82 }).toFile(dest);
    thumbs.push(await square.clone().resize(200, 200).jpeg().toBuffer());
    report.push(`${slug}: ok`);
  } catch (e) {
    thumbs.push(null);
    report.push(`${slug}: ERROR ${e.message}`);
  }
}

console.log(report.join('\n'));

const COLS = 5;
const rows = Math.ceil(thumbs.length / COLS);
const placed = thumbs
  .map((input, i) =>
    input ? { input, left: (i % COLS) * 200, top: Math.floor(i / COLS) * 200 } : null
  )
  .filter(Boolean);
await sharp({
  create: { width: COLS * 200, height: rows * 200, channels: 3, background: '#ddd' },
})
  .composite(placed)
  .png()
  .toFile('/tmp/team-contact.png');

console.log(`\nGrid order (row-major): ${PHOTOS.map((p) => p[0]).join(', ')}`);
