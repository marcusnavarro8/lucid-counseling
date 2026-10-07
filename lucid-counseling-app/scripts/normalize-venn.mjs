import sharp from 'sharp';
import path from 'node:path';

// Crop each venn circle to its alpha bounding box, then pad to an identical
// square so all three render at exactly the same visual size.
const OUT = path.resolve('public/media');
const SIDE = 1000;

for (const name of ['venn-mind', 'venn-body', 'venn-heart']) {
  const file = path.join(OUT, `${name}.png`);
  const { data, info } = await sharp(file)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  let minX = width,
    minY = height,
    maxX = 0,
    maxY = 0;
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * channels + 3] > 8) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  if (maxX < minX) {
    minX = 0;
    minY = 0;
    maxX = width - 1;
    maxY = height - 1;
  }
  const bw = maxX - minX + 1;
  const bh = maxY - minY + 1;
  const side = Math.max(bw, bh);
  const padL = Math.floor((side - bw) / 2);
  const padT = Math.floor((side - bh) / 2);

  const cropped = await sharp(file)
    .extract({ left: minX, top: minY, width: bw, height: bh })
    .extend({
      top: padT,
      bottom: side - bh - padT,
      left: padL,
      right: side - bw - padL,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .resize(SIDE, SIDE, { fit: 'fill' })
    .png()
    .toBuffer();
  await sharp(cropped).toFile(file);
  console.log(name, `${bw}x${bh} → ${SIDE}²`);
}
