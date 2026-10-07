import { Link } from 'react-router-dom';
import { PORTAL_URL } from '../lib/ui';
import {
  Logo,
  IconPhone,
  IconFax,
  IconMail,
  IconPin,
  IconInstagram,
  IconFacebook,
} from '../icons';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col footer-about">
          <div className="nav-brand static">
            <Logo className="nav-logo" />
            <span>Lucid Counseling Center</span>
          </div>
          <p>
            Compassionate, culturally responsive telehealth therapy across
            Florida — in English, Spanish, Portuguese, and Arabic.
          </p>
          <div className="footer-social">
            <a
              href="https://www.instagram.com/lucidcounselingcenter"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <IconInstagram className="footer-social-ico" />
            </a>
            <a
              href="https://www.facebook.com/lucidcounselingcenter"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <IconFacebook className="footer-social-ico" />
            </a>
          </div>
        </div>

        <div className="footer-col footer-explore">
          <h4>Explore</h4>
          <div className="footer-explore-links">
            <Link to="/">Home</Link>
            <Link to="/#about">About Us</Link>
            <Link to="/services">Services</Link>
            <Link to="/team">Meet the Team</Link>
            <Link to="/faq">FAQ</Link>
            <a href={PORTAL_URL} target="_blank" rel="noopener noreferrer">
              Client Portal
            </a>
          </div>
        </div>

        <div className="footer-col footer-contact">
          <h4>Get in touch</h4>
          <div className="footer-contact-row">
            <a href="tel:+13529883300" className="footer-phone">
              <IconPhone className="footer-ico" /> 352-988-3300
            </a>
            <span>
              <IconFax className="footer-ico" /> Fax 352-670-0043
            </span>
            <span>
              <IconPin className="footer-ico" /> Telehealth across Florida
            </span>
          </div>
          <div className="footer-routed">
            <span className="footer-routed-label">Billing</span>
            <a
              href="mailto:hayderodriguez@lucidcounselingcenter.com"
              className="footer-email"
            >
              <IconMail className="footer-ico" />{' '}
              hayderodriguez@lucidcounselingcenter.com
            </a>
          </div>
          <div className="footer-routed">
            <span className="footer-routed-label">Scheduling</span>
            <a
              href="mailto:info@lucidcounselingcenter.com"
              className="footer-email"
            >
              <IconMail className="footer-ico" /> info@lucidcounselingcenter.com
            </a>
          </div>
          <div className="footer-routed">
            <span className="footer-routed-label">Career opportunities</span>
            <a
              href="mailto:administration@lucidcounselingcenter.com"
              className="footer-email"
            >
              <IconMail className="footer-ico" />{' '}
              administration@lucidcounselingcenter.com
            </a>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {year} Lucid Counseling Center. All rights reserved.</span>
        <span className="footer-legal">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/hipaa">HIPAA Notice</Link>
        </span>
      </div>
    </footer>
  );
}
