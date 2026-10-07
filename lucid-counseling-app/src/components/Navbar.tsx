import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo, IconMenu, IconClose } from '../icons';
import { openBooking, scrollTo, easeOutQuart, PORTAL_URL } from '../lib/ui';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/#about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/team', label: 'Meet the Team' },
];

// Returning clients already have a TheraNest login; this is their door, so
// they never have to go back through the "Request an Appointment" sign-up.
// External, so it's a plain anchor in a new tab rather than a router Link.
function PortalLink({
  className,
  onClick,
}: {
  className: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={PORTAL_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={onClick}
    >
      Client Portal
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // which home section is "current" (drives the active nav item on the home page)
  const [section, setSection] = useState<'top' | 'about' | null>('top');
  const location = useLocation();
  const onHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route (or hash) changes.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  // Scroll-spy: on the home page, light up "Home" near the top and "About"
  // while the About section sits across the middle of the viewport.
  useEffect(() => {
    if (!onHome) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSection(null);
      return;
    }
    const compute = () => {
      if (window.scrollY < window.innerHeight * 0.6) {
        setSection('top');
        return;
      }
      const about = document.getElementById('about');
      if (about) {
        const r = about.getBoundingClientRect();
        const mid = window.innerHeight / 2;
        if (r.top <= mid && r.bottom >= mid) {
          setSection('about');
          return;
        }
      }
      setSection(null);
    };
    compute();
    window.addEventListener('scroll', compute, { passive: true });
    window.addEventListener('resize', compute);
    return () => {
      window.removeEventListener('scroll', compute);
      window.removeEventListener('resize', compute);
    };
  }, [onHome, location.key]);

  const isActive = (to: string) => {
    if (to === '/') return onHome && section === 'top';
    if (to === '/#about') return onHome && section === 'about';
    return (
      location.pathname === to || location.pathname.startsWith(to + '/')
    );
  };

  // Clicking Home (or the brand) while already on the home page should glide
  // smoothly back to the top instead of re-navigating.
  const onHomeClick = (e: React.MouseEvent) => {
    setOpen(false);
    if (onHome) {
      e.preventDefault();
      scrollTo(0, 1.7, easeOutQuart);
    }
  };

  return (
    <nav className={`nav${scrolled || open ? ' scrolled' : ''}`}>
      <Link className="nav-brand" to="/" onClick={onHomeClick}>
        <Logo className="nav-logo" />
        <span className="nav-brand-name">
          <span>Lucid</span>
          <span>Counseling Center</span>
        </span>
      </Link>

      <div className="nav-right">
        {LINKS.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            onClick={l.to === '/' ? onHomeClick : undefined}
            className={`nav-link${isActive(l.to) ? ' active' : ''}`}
          >
            {l.label}
          </Link>
        ))}
        <PortalLink className="nav-link" />
        <button className="nav-cta" onClick={openBooking}>
          Request an Appointment
        </button>
      </div>

      <button
        className="nav-burger"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <IconClose className="nav-burger-ico" />
        ) : (
          <IconMenu className="nav-burger-ico" />
        )}
      </button>

      <div className={`nav-mobile${open ? ' open' : ''}`}>
        {LINKS.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            onClick={l.to === '/' ? onHomeClick : () => setOpen(false)}
            className={`nav-mobile-link${isActive(l.to) ? ' active' : ''}`}
          >
            {l.label}
          </Link>
        ))}
        <PortalLink className="nav-mobile-link" onClick={() => setOpen(false)} />
        <button
          className="btn btn-primary nav-mobile-cta"
          onClick={() => {
            setOpen(false);
            openBooking();
          }}
        >
          Request an Appointment
        </button>
      </div>
    </nav>
  );
}
