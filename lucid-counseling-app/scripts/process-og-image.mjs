// The social-share card (Open Graph / Twitter image). The source is a full
// render with the logo already in it — ../Images/og-image.png — and this just
// sizes it to the 1200×630 that Facebook, LinkedIn, iMessage etc. expect.
// Re-run after replacing og-image.png, then bump the ?v= on the two image
// tags in index.html so link previews fetch the new one.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const SRC = fileURLToPath(new URL('../../Images/og-image.png', import.meta.url));
const OUT = fileURLToPath(new URL('../public/media/og-image.jpg', import.meta.url));

await sharp(SRC)
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(OUT);
const m = await sharp(OUT).metadata();
console.log('wrote', OUT, `${m.width}x${m.height}`);
