import { useEffect, useState } from 'react';
import { useReducedMotion, type Variants } from 'framer-motion';
import Lenis from 'lenis';

/* ---------- external scheduler (HIPAA-compliant portal the client owns) ------
   Two doors into the same TheraNest portal: every "Request an Appointment"
   button sends people to create an account and send an appointment *request*
   (the counselor confirms it — nothing is booked instantly); the "Client
   Portal" link in the nav and footer is for returning clients, who already
   have a login and shouldn't be pushed back through sign-up. */
export const BOOKING_URL = 'https://lucid.mytheranest.com/account/signup';
export const PORTAL_URL = 'https://lucid.mytheranest.com/Home/Login';
export const openBooking = () =>
  window.open(BOOKING_URL, '_blank', 'noopener,noreferrer');

/* `?all` renders every section in its final state (skips scroll-gating) —
   handy for print, previews, and visual QA. */
export const SHOW_ALL =
  typeof window !== 'undefined' && window.location.search.includes('all');

/* ---------- smooth scroll ---------- */
let lenisRef: Lenis | null = null;

/* Scroll-position subscribers.

   Lenis drives the page from its own rAF loop, so anything that needs to follow
   the scroll should listen to Lenis rather than to native 'scroll' events —
   those are dispatched by the browser only at a rendering opportunity, and a
   backgrounded or throttled tab can skip them entirely. We feed both sources
   into the same callback: Lenis while it's running, native 'scroll' for the
   reduced-motion path where no Lenis instance exists. */
const scrollSubs = new Set<(y: number) => void>();
const emitScroll = (y: number) => scrollSubs.forEach((f) => f(y));

export function onScrollChange(cb: (y: number) => void) {
  const native = () => cb(window.scrollY);
  scrollSubs.add(cb);
  window.addEventListener('scroll', native, { passive: true });
  return () => {
    scrollSubs.delete(cb);
    window.removeEventListener('scroll', native);
  };
}

/* ---------- wheel-momentum guard ----------

   On macOS a trackpad or Magic Mouse flick keeps emitting wheel events for a
   second or more after the fingers lift (a free-spinning mouse wheel, longer).
   Click a card while that tail is still running and the leftover deltas are
   applied to the *new* page, dragging it down from the top we just jumped to.
   At the bottom of the Team grid the tail is invisible — the page is already
   at its limit — so it looks like the detail page simply opened at the bottom.
   Desktop-only: touch scrolling is native (syncTouch: false) and its momentum
   stops the moment a finger lands.

   After every navigation, wheel events that belong to the same continuous
   stream (no pause of GAP ms since the previous one) are swallowed, for at
   most MAX ms. A deliberate scroll starts after a pause, so it gets through.
   Capture-phase on window so neither Lenis (bubble listener on window) nor the
   native scroll sees the swallowed events. */
const MOMENTUM_GAP = 120;
const MOMENTUM_MAX = 1500;
let guardUntil = 0;
let lastWheelAt = -Infinity;

function onWheelCapture(e: WheelEvent) {
  const now = performance.now();
  if (now < guardUntil && now - lastWheelAt < MOMENTUM_GAP) {
    e.preventDefault();
    e.stopImmediatePropagation();
  } else {
    guardUntil = 0; // a pause = a new gesture; stand down until the next nav
  }
  lastWheelAt = now;
}

/* Arm the guard — call on every navigation. Deliberately does NOT touch
   lastWheelAt: if the last wheel event was a while ago there is no tail to
   absorb, and the first event after the click is a real scroll. */
export function absorbWheelMomentum() {
  guardUntil = performance.now() + MOMENTUM_MAX;
}

export function useLenis() {
  const reduce = useReducedMotion();
  // Installed regardless of reduced motion: a native momentum tail carries
  // across a navigation just the same.
  useEffect(() => {
    window.addEventListener('wheel', onWheelCapture, {
      capture: true,
      passive: false,
    });
    return () =>
      window.removeEventListener('wheel', onWheelCapture, { capture: true });
  }, []);
  useEffect(() => {
    if (reduce || SHOW_ALL) return;
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true, syncTouch: false });
    lenis.on('scroll', (l: Lenis) => emitScroll(l.animatedScroll));
    lenisRef = lenis;
    let id: number;
    const raf = (t: number) => {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenisRef = null;
      lenis.destroy();
    };
  }, [reduce]);
}

// in-flight scroll-restore animation frame (so a navigation can cancel it)
let restoreRaf = 0;

/* Cancel any running scroll restoration — call this on every navigation so a
   restore loop from a previous "back" never bleeds into a new (forward) page. */
export function cancelScrollRestore() {
  if (restoreRaf) {
    cancelAnimationFrame(restoreRaf);
    restoreRaf = 0;
  }
}

/* Jump instantly to a y-position (keeps Lenis in sync). */
export function jumpTo(y: number) {
  cancelScrollRestore();
  if (lenisRef) {
    // The route just swapped the document, so Lenis is still holding the
    // previous page's scroll limit. Re-measure before moving or it will snap
    // back to a bound that no longer exists.
    lenisRef.resize();
    lenisRef.scrollTo(y, { immediate: true });
  }
  window.scrollTo(0, y);
}

/* Reset scroll to the top instantly — used on forward route changes so a new
   page opens at its hero rather than inheriting the previous scroll. */
export function jumpToTop() {
  jumpTo(0);
}

/* Robustly restore a saved scroll position after a BACK navigation only. The
   destination (e.g. the tall Team grid, single-column on mobile) is often
   taller than the page we came from, and Lenis can still hold the previous,
   shorter scroll limit — which clamps a deep target so it lands too high.
   Recalculate Lenis's dimensions and retry across a few frames until we reach
   the target (cancellable, so a subsequent navigation stops it cleanly). */
export function restoreScroll(y: number) {
  cancelScrollRestore();
  let attempts = 0;
  const step = () => {
    if (lenisRef) {
      lenisRef.resize();
      lenisRef.scrollTo(y, { immediate: true });
    }
    window.scrollTo(0, y);
    attempts += 1;
    if (Math.abs(window.scrollY - y) > 2 && attempts < 14) {
      restoreRaf = requestAnimationFrame(step);
    } else {
      restoreRaf = 0;
    }
  };
  // First attempt runs synchronously: the caller is a layout effect, so this
  // lands before the browser paints and the restored position is simply where
  // the page appears — never a visible jump from the top.
  step();
}

/* --- section-level "back" for listing pages ---------------------------------
   On a wide desktop grid you can click a card whose section isn't at the top,
   so pixel-restoring the exact scroll feels off. Instead, the card records its
   category section; on the way back we snap that section just under the navbar.
   (Peek, don't consume, so it's safe under StrictMode's double-invoked effects
   and survives the forward→back round trip; it's simply overwritten on the next
   card click.) */
let backAnchor: { path: string; id: string } | null = null;
export function setBackAnchor(path: string, id: string) {
  backAnchor = { path, id };
}
export function getBackAnchor(path: string): string | null {
  return backAnchor && backAnchor.path === path ? backAnchor.id : null;
}
// Document-top of an element via the offsetTop chain — a LAYOUT position that
// (unlike getBoundingClientRect) ignores the reveal animations' translate
// transforms, so anchoring doesn't land short.
function docTop(el: HTMLElement): number {
  let y = 0;
  let node: HTMLElement | null = el;
  while (node) {
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return y;
}

export function restoreToAnchor(id: string): boolean {
  if (!document.getElementById(id)) return false;
  cancelScrollRestore();
  const OFFSET = 84; // ~compact navbar height + a little breathing room
  let attempts = 0;
  let lastY = -1;
  const step = () => {
    const el = document.getElementById(id);
    if (!el) {
      restoreRaf = 0;
      return;
    }
    const y = Math.max(0, Math.round(docTop(el) - OFFSET));
    if (lenisRef) {
      lenisRef.resize();
      lenisRef.scrollTo(y, { immediate: true });
    }
    window.scrollTo(0, y);
    attempts += 1;
    // keep correcting until the target is stable and reached (or we give up)
    if ((y !== lastY || Math.abs(window.scrollY - y) > 2) && attempts < 16) {
      lastY = y;
      restoreRaf = requestAnimationFrame(step);
    } else {
      restoreRaf = 0;
    }
  };
  step();
  return true;
}

/* ---------- gentle reveal ---------- */
export const easing = [0.22, 1, 0.36, 1] as const;

export const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};
export const item: Variants = {
  hidden: { opacity: 0, y: 26, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.1, ease: easing },
    // Drop the leftover transform/filter layer once revealed — a persistent
    // sub-pixel transform + blur(0) rasterises text and smears thin serif
    // strokes (the f/j in the display headings).
    transitionEnd: { filter: 'none', y: 0 },
  },
};

// Glide through Lenis with a moderate, symmetric ease so jumping past a tall
// section feels like one smooth motion rather than a teleport or a long
// dwell. Falls back to native when Lenis is off.
export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
// fast out of the gate, strong deceleration toward the end
export const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

export const scrollTo = (
  // an element id, or a y-position (0 = top of the page)
  target: string | number,
  duration = 1.1,
  ease: (t: number) => number = easeInOutCubic
) => {
  const el = typeof target === 'number' ? null : document.getElementById(target);
  if (typeof target === 'string' && !el) return;
  // slower glide on mobile (the long scroll feels rushed on small screens)
  const onMobile =
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 760px)').matches;
  const dur = onMobile ? duration * 1.6 : duration;
  // Measure the navbar's *compact* height (it shrinks once scrolled) so the
  // eased scroll already targets the final resting place — no post-animation
  // snap. See the original App.tsx for the full rationale.
  const compactNavH = () => {
    const nav = document.querySelector<HTMLElement>('.nav');
    if (!nav) return 0;
    const wasScrolled = nav.classList.contains('scrolled');
    if (wasScrolled) return nav.getBoundingClientRect().height;
    const prev = nav.style.transition;
    nav.style.transition = 'none';
    nav.classList.add('scrolled');
    const h = nav.getBoundingClientRect().height;
    nav.classList.remove('scrolled');
    nav.style.transition = prev;
    return h;
  };
  const computeY = () => {
    if (!el) return target as number;
    return Math.max(
      0,
      Math.round(window.scrollY + el.getBoundingClientRect().top - compactNavH())
    );
  };
  const destY = computeY();
  if (lenisRef) {
    lenisRef.scrollTo(destY, {
      duration: dur,
      easing: ease,
      onComplete: () => window.scrollTo(0, computeY()),
    });
  } else if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  } else {
    window.scrollTo({ top: destY, behavior: 'smooth' });
  }
};

export function useIsMobile(maxWidth = 760) {
  const query = `(max-width: ${maxWidth}px)`;
  const [m, setM] = useState(
    typeof window !== 'undefined' && window.matchMedia(query).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return m;
}
