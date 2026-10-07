import { initials } from '../data/team';

// Warm brand tones used as the monogram fallback (shown while the photo loads
// or if it fails). The legacy headshots were mismatched sizes, so each photo is
// pre-cropped to a uniform square (see scripts/fetch-team-photos.mjs).
const TONES = [
  { bg: 'linear-gradient(150deg, #a9c0cf, #8fa8b9)', fg: '#283a44' }, // dusty blue
  { bg: 'linear-gradient(150deg, #a6cdc9, #7fb0ad)', fg: '#234240' }, // soft teal
  { bg: 'linear-gradient(150deg, #bcd0c2, #a8bfae)', fg: '#33433a' }, // sage
  { bg: 'linear-gradient(150deg, #e2cdad, #d3b58c)', fg: '#473722' }, // warm sand
];

export default function Avatar({
  name,
  index = 0,
  src,
  className = '',
}: {
  name: string;
  index?: number;
  src?: string;
  className?: string;
}) {
  const tone = TONES[index % TONES.length];
  return (
    <div
      className={`avatar ${className}`}
      style={{ background: tone.bg, color: tone.fg }}
      aria-hidden="true"
    >
      <span>{initials(name)}</span>
      {src && <img src={src} alt="" className="avatar-img" loading="lazy" />}
    </div>
  );
}
