# Lucid Counseling Center — Website

The marketing website for Lucid Counseling Center (online therapy across
Florida). A static site built with React + Vite + TypeScript, Framer Motion
(reveals and parallax) and Lenis (smooth scrolling). There is no server, no
database and no admin panel: all content lives in the source files, and the
site is published by building it and uploading the output.

Pages: Home · Services (+ one page per specialty) · Meet the Team (+ one page
per member) · FAQ · Privacy Policy · HIPAA Notice. Booking buttons link out to
the practice's TheraNest portal.

## Requirements

- Node.js 20 or newer (built with Node 22) and npm.

## Run, build, deploy

```bash
npm install      # once
npm run dev      # local dev server → http://localhost:7777
npm run build    # typecheck + production build → dist/
npm run preview  # serve the production build locally
npm run lint     # eslint
npm run deploy   # build, then publish dist/ to Cloudflare Pages (needs `npx wrangler login`)
```

`npm run build` runs the TypeScript project build first, so a type error fails
the build (unused variables count as errors).

## Hosting

The output of `npm run build` (the `dist/` folder) is the whole website. Upload
its contents to any static host. Two hosts are pre-configured:

- **Cloudflare Pages** — `wrangler.toml`, `public/_headers` and
  `public/_redirects` (caching, security headers, legacy-URL redirects and the
  single-page-app fallback).
- **Apache shared hosting (Bluehost, cPanel, etc.)** — `public/.htaccess` does
  the same job for Apache: HTTPS + non-www canonical host, legacy redirects,
  caching, security headers, and the fallback.

The fallback matters: this is a single-page app, so a request for
`/team/paula-navarro` must be answered with `index.html` and the app renders
the right page. Without it, deep links and page refreshes 404.

## Where things live

| What | Where |
|---|---|
| Team members (name, title, bio, focus, languages) | `src/data/team.ts` |
| Team headshots | `public/media/team/<slug>.jpg` (see below) |
| Specialties / services copy | `src/data/specialties.ts` |
| Accepted insurance plans | `src/data/insurance.ts` |
| Booking + client-portal URLs (TheraNest) | `src/lib/ui.tsx` (`BOOKING_URL`, `PORTAL_URL`) |
| Navigation links | `src/components/Navbar.tsx` |
| Footer (phone, fax, email routing, social links) | `src/components/Footer.tsx` |
| Home page sections | `src/pages/Home.tsx` |
| FAQ / Privacy / HIPAA text | `src/pages/FAQ.tsx`, `Privacy.tsx`, `Hipaa.tsx` |
| Page title, description, social preview tags | `index.html` |
| Social-share image (1200×630) | `public/media/og-image.jpg`, made by `scripts/process-og-image.mjs` from `../Images/og-image.png` |
| Logo + favicon | `public/media/logo.png`, `public/favicon.png`, made by `scripts/process-new-logo.mjs` from `../Images/lucid_logo.png` |
| Styling (one global stylesheet, design tokens on `:root`) | `src/index.css` |
| Icons and logo (inline SVG) | `src/icons.tsx` |
| Old-URL redirects | `public/_redirects` and `public/.htaccess` (keep in sync) |

### Team headshots

Headshots are cropped to a uniform 560×560 square by
`scripts/fetch-team-photos.mjs`. Each member has one entry there: a URL, or a
bare filename for a photo supplied directly — those live in `../Images/team/`
(a sibling folder of this project, so the originals stay out of the build).
An optional third value tunes the crop for a photo that comes out badly (anchor
`'top'`, an explicit square `{ extract }`, or synthesised headroom `{ extend }`
for a source cut at the hairline — see the notes at the top of the script).

To add or replace a photo: drop the original in `../Images/team/<slug>.jpg`,
add or edit the member's entry, delete `public/media/team/<slug>.jpg` if it
already exists, and run:

```bash
node scripts/fetch-team-photos.mjs
```

It only regenerates photos that are missing, so existing crops are never
disturbed. To remove a member, delete their entry in `src/data/team.ts` and
their photo.

### Scene imagery

The hero, telehealth and call-to-action scenes are generated renders. The
sources live in `../Images/`; `scripts/process-assets.mjs` produces the
optimised versions in `public/media/` (cut-out de-fringing, mobile variants,
Venn-circle normalisation). Only re-run it if the source renders change.

## Domain cutover checklist

When the site moves from the temporary `pages.dev` address to
lucidcounselingcenter.com:

1. Set `VITE_SITE_URL=https://lucidcounselingcenter.com` in `.env`, rebuild
   and deploy — this makes the `og:url` / `og:image` tags in `index.html`
   absolute to the real domain (social scrapers need absolute URLs).
2. Refresh cached link previews, which otherwise keep showing the old site:
   Facebook / Instagram / WhatsApp → https://developers.facebook.com/tools/debug/
   ("Scrape again"); LinkedIn → https://www.linkedin.com/post-inspector/.
   iMessage and Slack re-fetch when the link is shared with anything appended
   (e.g. `?x=1`).
3. Whenever `og-image.jpg` changes, bump the `?v=` on both image tags in
   `index.html` and re-scrape as above.

## Notes

- `?all` on any URL renders every section in its final state and disables
  smooth scrolling — for screenshots and visual QA, not for browsing.
- Respects `prefers-reduced-motion`.
- The site promises telehealth "over a secure, HIPAA-compliant platform" —
  wording confirmed with the practice (sessions may be video or phone).
