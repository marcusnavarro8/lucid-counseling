/* Hand-coded SVGs — true vector, themeable via currentColor. */
type P = { className?: string };
const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/* Brand mark — the client's supplied emblem. */
export const Logo = ({ className }: P) => (
  <img
    className={className}
    src="/media/logo.png"
    alt="Lucid Counseling Center"
    width={44}
    height={44}
  />
);

export const IconMind = ({ className }: P) => (
  <svg className={className} viewBox="0 0 32 32" {...base} aria-hidden="true">
    <path d="M20.5 7.5a6 6 0 0 1 .5 11.7V24a2.5 2.5 0 0 1-5 0v-1H14a3 3 0 0 1-3-3 4 4 0 0 1-1.6-7.3A5.5 5.5 0 0 1 20.5 7.5Z" />
    <path d="M16 12.5v6.5M16 13a2.4 2.4 0 0 0 2.4-2.4M16 16.5a2.4 2.4 0 0 1-2.6-2" />
  </svg>
);

export const IconBody = ({ className }: P) => (
  <svg className={className} viewBox="0 0 32 32" {...base} aria-hidden="true">
    <path d="M16 27c0-9 3.5-15 10-17-1 9-4.5 14-10 15Z" />
    <path d="M16 27c0-6-2.5-10-7-11.5C9.5 21 12 25 16 27Z" />
    <path d="M16 27v-9" />
  </svg>
);

export const IconHeart = ({ className }: P) => (
  <svg className={className} viewBox="0 0 32 32" {...base} aria-hidden="true">
    <path d="M16 26S5.5 19.5 5.5 12.5A5.5 5.5 0 0 1 16 10a5.5 5.5 0 0 1 10.5 2.5C26.5 19.5 16 26 16 26Z" />
    <path d="M10.5 13.5h3l1.5-2.5 2 5 1.5-2.5h3" />
  </svg>
);

export const IconReach = ({ className }: P) => (
  <svg className={className} viewBox="0 0 32 32" {...base} aria-hidden="true">
    <path d="M27 6 4 14.5l9 3 3 9L27 6Z" />
    <path d="m13 17.5 6-6" />
  </svg>
);

export const IconTalk = ({ className }: P) => (
  <svg className={className} viewBox="0 0 32 32" {...base} aria-hidden="true">
    <path d="M5 11a4 4 0 0 1 4-4h9a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4h-6l-5 4v-4a4 4 0 0 1-2-3.5Z" />
    <path d="M24 14h1a4 4 0 0 1 4 4v4a4 4 0 0 1-2 3.5V29l-4-3h-3a4 4 0 0 1-3.5-2" />
  </svg>
);

export const IconBegin = ({ className }: P) => (
  <svg className={className} viewBox="0 0 32 32" {...base} aria-hidden="true">
    <path d="M4 24h24" />
    <path d="M9 24c1.5-7 4.5-10.5 7-10.5S21.5 17 23 24" />
    <circle cx="16" cy="9" r="3.5" />
    <path d="M16 2.5v2M22.5 5l-1.4 1.4M9.5 5l1.4 1.4" />
  </svg>
);

export const Arrow = ({ className }: P) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    {...base}
    aria-hidden="true"
    width="18"
    height="18"
  >
    <path d="M5 12h13M13 6l6 6-6 6" />
  </svg>
);

export const ArrowDown = ({ className }: P) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    {...base}
    aria-hidden="true"
    width="18"
    height="18"
  >
    <path d="M12 5v13M6 12l6 6 6-6" />
  </svg>
);

/* ---------- service / specialty glyphs (32×32, line) ---------- */
export const IconWave = ({ className }: P) => (
  <svg className={className} viewBox="0 0 32 32" {...base} aria-hidden="true">
    <path d="M4 12c2-2.5 4-2.5 6 0s4 2.5 6 0 4-2.5 6 0 4 2.5 6 0" />
    <path d="M4 19c2-2.5 4-2.5 6 0s4 2.5 6 0 4-2.5 6 0 4 2.5 6 0" />
  </svg>
);

export const IconShield = ({ className }: P) => (
  <svg className={className} viewBox="0 0 32 32" {...base} aria-hidden="true">
    <path d="M16 4 6 8v6c0 6 4 10.5 10 14 6-3.5 10-8 10-14V8l-10-4Z" />
    <path d="m12 16 3 3 5-6" />
  </svg>
);

export const IconUsers = ({ className }: P) => (
  <svg className={className} viewBox="0 0 32 32" {...base} aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <circle cx="22" cy="13.5" r="3.2" />
    <path d="M5 25c0-4 3.2-6.5 7-6.5s7 2.5 7 6.5" />
    <path d="M21 19c3 .3 6 2.5 6 6" />
  </svg>
);

export const IconHome = ({ className }: P) => (
  <svg className={className} viewBox="0 0 32 32" {...base} aria-hidden="true">
    <path d="M5 15 16 5l11 10" />
    <path d="M8 13v12h16V13" />
    <path d="M13 25v-6h6v6" />
  </svg>
);

export const IconCloud = ({ className }: P) => (
  <svg className={className} viewBox="0 0 32 32" {...base} aria-hidden="true">
    <path d="M10 22a5 5 0 0 1-.6-9.96A7 7 0 0 1 23 13.5a4.5 4.5 0 0 1-.5 8.5H10Z" />
    <path d="M13 26.5l-1 2M18 26.5l-1 2" />
  </svg>
);

export const IconCompass = ({ className }: P) => (
  <svg className={className} viewBox="0 0 32 32" {...base} aria-hidden="true">
    <circle cx="16" cy="16" r="12" />
    <path d="m21 11-3.2 6.8L11 21l3.2-6.8L21 11Z" />
  </svg>
);

export const IconClipboard = ({ className }: P) => (
  <svg className={className} viewBox="0 0 32 32" {...base} aria-hidden="true">
    <path d="M11 6H8a2 2 0 0 0-2 2v17a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3" />
    <rect x="11" y="4" width="10" height="5" rx="1.5" />
    <path d="M11 15h10M11 20h7" />
  </svg>
);

export const IconPaw = ({ className }: P) => (
  <svg className={className} viewBox="0 0 32 32" {...base} aria-hidden="true">
    <circle cx="11" cy="11" r="2.2" />
    <circle cx="21" cy="11" r="2.2" />
    <circle cx="7.5" cy="16.5" r="2" />
    <circle cx="24.5" cy="16.5" r="2" />
    <path d="M16 16c-3 0-5.5 2.2-5.5 5 0 2.2 2.3 3.2 5.5 3.2s5.5-1 5.5-3.2c0-2.8-2.5-5-5.5-5Z" />
  </svg>
);

export const IconGlobe = ({ className }: P) => (
  <svg className={className} viewBox="0 0 32 32" {...base} aria-hidden="true">
    <circle cx="16" cy="16" r="12" />
    <path d="M4 16h24M16 4c3.5 4 3.5 20 0 24M16 4c-3.5 4-3.5 20 0 24" />
  </svg>
);

export const IconSearch = ({ className }: P) => (
  <svg className={className} viewBox="0 0 32 32" {...base} aria-hidden="true">
    <circle cx="14" cy="14" r="8" />
    <path d="m20 20 6 6" />
  </svg>
);

export const IconSpark = ({ className }: P) => (
  <svg className={className} viewBox="0 0 32 32" {...base} aria-hidden="true">
    <path d="M16 4c.8 6 2 7.2 8 8-6 .8-7.2 2-8 8-.8-6-2-7.2-8-8 6-.8 7.2-2 8-8Z" />
  </svg>
);

/* ---------- contact / footer glyphs ---------- */
export const IconPhone = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" {...base} aria-hidden="true">
    <path d="M6 3h3l1.5 5-2 1.5a12 12 0 0 0 5 5l1.5-2 5 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4 5.2 2 2 0 0 1 6 3Z" />
  </svg>
);

export const IconMail = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" {...base} aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
);

export const IconFax = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" {...base} aria-hidden="true">
    <path d="M7 9V4h10v5" />
    <path d="M5 9h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2v-5H7v5H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Z" />
    <path d="M17 13.5h.01" />
  </svg>
);

export const IconClock = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" {...base} aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </svg>
);

export const IconPin = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" {...base} aria-hidden="true">
    <path d="M12 21c5-5.2 7.5-9 7.5-12A7.5 7.5 0 0 0 4.5 9c0 3 2.5 6.8 7.5 12Z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

export const IconInstagram = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" {...base} aria-hidden="true">
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M17.2 6.8h.01" />
  </svg>
);

export const IconFacebook = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" {...base} aria-hidden="true">
    <path d="M14 8.5V7a1.5 1.5 0 0 1 1.5-1.5H17V3h-2.2A4 4 0 0 0 11 7v1.5H8.5V11H11v9.5h3V11h2.2L17 8.5h-3Z" />
  </svg>
);

/* ---------- ui controls ---------- */
export const IconCheck = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" {...base} aria-hidden="true">
    <path d="m5 12.5 4.5 4.5L19 7" />
  </svg>
);

export const IconChevron = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" {...base} aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const IconMenu = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" {...base} aria-hidden="true">
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const IconClose = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" {...base} aria-hidden="true">
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const ArrowLeft = ({ className }: P) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    {...base}
    aria-hidden="true"
    width="18"
    height="18"
  >
    <path d="M19 12H6M11 6l-6 6 6 6" />
  </svg>
);
