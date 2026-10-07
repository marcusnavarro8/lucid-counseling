import { motion } from 'framer-motion';
import { Link, Navigate, useParams, useNavigate } from 'react-router-dom';
import { Reveal, I } from '../lib/motion';
import { item, openBooking } from '../lib/ui';
import { Arrow, ArrowLeft, IconCheck, IconSpark } from '../icons';
import { ServiceIcon } from '../lib/serviceIcons';
import { getSpecialty, SPECIALTIES } from '../data/specialties';

export default function SpecialtyDetail() {
  const { slug = '' } = useParams();
  const navigate = useNavigate();
  const s = getSpecialty(slug);
  if (!s) return <Navigate to="/services" replace />;

  // "go back" so the services list restores to where you were (e.g. the
  // Behavioral section); fall back to /services if there's no history
  const goBack = () =>
    window.history.state?.idx > 0 ? navigate(-1) : navigate('/services');

  const related = SPECIALTIES.filter(
    (x) => x.category === s.category && x.slug !== s.slug
  ).slice(0, 3);

  return (
    // key by slug so navigating between related specialties remounts the page
    // and its reveal animations replay
    <div className="page detail" key={s.slug}>
      {/* hero */}
      <section className="page-hero detail-hero">
        <div className="container">
          <Reveal onLoad className="page-hero-inner">
            <motion.div variants={item}>
              <button type="button" className="back-link" onClick={goBack}>
                <ArrowLeft className="back-ico" /> All services
              </button>
            </motion.div>
            <motion.div className="detail-hero-ico" variants={item}>
              <ServiceIcon name={s.icon} className="detail-hero-ico-svg" />
            </motion.div>
            <motion.div className="eyebrow" variants={item}>
              {s.category}
            </motion.div>
            <motion.h1 variants={item}>{s.name}</motion.h1>
            <motion.p variants={item}>{s.tagline}</motion.p>
            <I className="page-hero-actions" variants={item}>
              <button className="btn btn-primary" onClick={openBooking}>
                Request an Appointment <Arrow className="btn-arrow" />
              </button>
              <Link to="/team" className="btn btn-link">
                Meet Our Therapists
              </Link>
            </I>
          </Reveal>
        </div>
      </section>

      <section className="section detail-body">
        <div className="container">
          {/* definition */}
          <Reveal className="detail-lead">
            <motion.p variants={item}>{s.definition}</motion.p>
          </Reveal>

          {/* signs + how we help */}
          <div className="detail-cols">
            <Reveal className="detail-block">
              <motion.h2 variants={item}>Common signs</motion.h2>
              <motion.ul className="check-list" variants={item}>
                {s.signs.map((sign) => (
                  <li key={sign}>
                    <IconCheck className="check-ico" />
                    {sign}
                  </li>
                ))}
              </motion.ul>
            </Reveal>
            <Reveal className="detail-block">
              <motion.h2 variants={item}>How we help</motion.h2>
              <motion.ul className="help-list" variants={item}>
                {s.help.map((h) => (
                  <li key={h}>
                    <IconSpark className="help-list-ico" />
                    {h}
                  </li>
                ))}
              </motion.ul>
            </Reveal>
          </div>

          {/* process */}
          <Reveal className="detail-steps">
            <motion.div className="detail-step" variants={item}>
              <span className="detail-step-n">01</span>
              <h3>What therapy looks like</h3>
              <p>{s.therapy}</p>
            </motion.div>
            <motion.div className="detail-step" variants={item}>
              <span className="detail-step-n">02</span>
              <h3>Your first session</h3>
              <p>{s.firstSession}</p>
            </motion.div>
            <motion.div className="detail-step" variants={item}>
              <span className="detail-step-n">03</span>
              <h3>Results &amp; outcomes</h3>
              <p>{s.outcome}</p>
            </motion.div>
          </Reveal>

          {/* related */}
          {related.length > 0 && (
            <Reveal className="detail-related">
              <motion.h2 variants={item}>Related areas</motion.h2>
              <motion.div className="detail-related-grid" variants={item}>
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to={`/services/${r.slug}`}
                    className="detail-related-card"
                  >
                    <ServiceIcon name={r.icon} className="detail-related-ico" />
                    <span>{r.name}</span>
                    <Arrow className="btn-arrow" />
                  </Link>
                ))}
              </motion.div>
            </Reveal>
          )}
        </div>
      </section>

      {/* cta */}
      <section className="section cta-band">
        <div className="container">
          <Reveal className="cta-band-inner">
            <motion.h2 variants={item}>
              You don't have to navigate this alone.
            </motion.h2>
            <motion.p variants={item}>
              Reach out today and take the first step toward feeling like
              yourself again.
            </motion.p>
            <I className="cta-band-actions" variants={item}>
              <button className="btn btn-primary" onClick={openBooking}>
                Request an Appointment <Arrow className="btn-arrow" />
              </button>
              <a className="btn btn-secondary" href="tel:+13529883300">
                Call 352-988-3300
              </a>
            </I>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
