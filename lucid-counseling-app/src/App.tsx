import { useEffect, useLayoutEffect, useRef } from 'react';
import {
  Routes,
  Route,
  useLocation,
  useNavigationType,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {
  useLenis,
  jumpToTop,
  restoreScroll,
  restoreToAnchor,
  getBackAnchor,
  cancelScrollRestore,
  absorbWheelMomentum,
  onScrollChange,
  scrollTo,
  easeOutQuart,
  SHOW_ALL,
} from './lib/ui';
import Home from './pages/Home';
import Services from './pages/Services';
import SpecialtyDetail from './pages/SpecialtyDetail';
import Team from './pages/Team';
import MemberDetail from './pages/MemberDetail';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import Hipaa from './pages/Hipaa';

// On route change:
//  • hash present → land on that anchor (glide, if we were already here).
//  • BACK (POP) with a saved position → restore where you were.
//  • everything else (forward nav) → start at the top.
function ScrollManager() {
  const location = useLocation();
  const navType = useNavigationType();
  const positions = useRef<Map<string, number>>(new Map());
  const lastY = useRef(0);
  const prev = useRef<{ key: string; pathname: string } | null>(null);

  // Track scroll continuously. This ref — not a window.scrollY read taken at
  // navigation time — is what we file away for the entry we're leaving. The
  // moment a shorter page is committed the browser clamps window.scrollY to
  // the new document, and reading it then would save that clamped value as
  // "where the user was", so going back would land near the bottom instead of
  // on the card they clicked.
  useEffect(() => {
    lastY.current = window.scrollY;
    return onScrollChange((y) => {
      lastY.current = y;
    });
  }, []);

  // Layout effect, not effect: the scroll position has to be settled before the
  // browser paints the new route. Doing this after paint shows one frame of the
  // new page at the old offset — and on a page shorter than the one you left,
  // that offset is clamped to its very bottom, which is exactly what you see
  // when a nav link or a team card appears to "open at the bottom".
  useLayoutEffect(() => {
    if (SHOW_ALL) return;
    const map = positions.current;
    const key = location.key;
    const from = prev.current;
    let hashTimer: number | undefined;

    // remember the outgoing entry before anything moves
    if (from && from.key !== key) map.set(from.key, lastY.current);
    const changedPage = !from || from.pathname !== location.pathname;
    prev.current = { key, pathname: location.pathname };

    // cancel any restore still running from a previous "back" before we decide
    // what this navigation should do (prevents a forward page starting mid-way)
    cancelScrollRestore();
    // and don't let a trackpad/wheel momentum tail from the page we're leaving
    // scroll the page we're arriving on
    absorbWheelMomentum();

    if (location.hash) {
      const id = location.hash.slice(1);
      if (changedPage) {
        // Arriving from another page: land on the section directly. Gliding
        // would mean a 1.7s scroll past content the visitor didn't ask to see.
        // restoreToAnchor lands synchronously, then keeps correcting for a few
        // frames while the new page's imagery settles into its final height.
        if (!restoreToAnchor(id)) jumpToTop();
      } else {
        // Already on this page → glide from wherever we are.
        hashTimer = window.setTimeout(() => scrollTo(id, 1.7, easeOutQuart), 90);
      }
    } else if (navType === 'POP') {
      // section-level back (e.g. Services → category) if a card recorded one,
      // otherwise restore the exact pixel position we saved for this entry
      const anchorId = getBackAnchor(location.pathname);
      if (!(anchorId && restoreToAnchor(anchorId))) {
        if (map.has(key)) restoreScroll(map.get(key)!);
        else jumpToTop();
      }
    } else {
      jumpToTop();
    }

    return () => {
      if (hashTimer) clearTimeout(hashTimer);
    };
  }, [location.key, location.hash, location.pathname, navType]);

  return null;
}

export default function App() {
  useLenis();
  useEffect(() => {
    if (SHOW_ALL) document.body.classList.add('qa');
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  }, []);
  return (
    <>
      <Navbar />
      <ScrollManager />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<SpecialtyDetail />} />
          <Route path="/team" element={<Team />} />
          <Route path="/team/:slug" element={<MemberDetail />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/hipaa" element={<Hipaa />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
