import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Reveal, I, CardGrid, Card } from '../lib/motion';
import { item, useIsMobile, openBooking, SHOW_ALL } from '../lib/ui';
import { Arrow, IconGlobe, IconSearch } from '../icons';
import Avatar from '../components/Avatar';
import { TEAM, nativeLang, photoFor } from '../data/team';

export default function Team() {
  const perCard = useIsMobile(760) && !SHOW_ALL;
  return (
    <div className="page">
      {/* hero */}
      <section className="page-hero">
        <div className="container">
          <Reveal onLoad className="page-hero-inner">
            <motion.div className="eyebrow" variants={item}>
              Meet the Team
            </motion.div>
            <motion.h1 variants={item}>
              Compassionate counselors, ready to walk with you.
            </motion.h1>
            <motion.p variants={item}>
              Meet our dedicated team of counselors — each equipped with the
              expertise, warmth, and cultural understanding to guide you toward
              well-being and growth.
            </motion.p>
            <I className="page-hero-actions" variants={item}>
              <button className="btn btn-primary" onClick={openBooking}>
                Request an Appointment <Arrow className="btn-arrow" />
              </button>
              <Link to="/services" className="btn btn-link">
                Explore Services
              </Link>
            </I>
          </Reveal>
        </div>
      </section>

      {/* grid */}
      <section className="section team-body">
        <div className="container">
          <CardGrid perCard={perCard} className="team-grid">
            {TEAM.map((m, i) => (
              <Card perCard={perCard} className="team-card" key={m.slug}>
                <Link to={`/team/${m.slug}`} className="team-card-link">
                  <Avatar
                    name={m.name}
                    index={i}
                    src={photoFor(m.slug)}
                    className="team-avatar"
                  />
                  <h3>{m.name}</h3>
                  <span className="team-cred">{m.credentials}</span>
                  <p className="team-focus">{m.focus}</p>
                  {m.languages.length > 0 && (
                    <span className="team-langs">
                      <IconGlobe className="team-lang-ico" />
                      {m.languages.map(nativeLang).join(' · ')}
                    </span>
                  )}
                </Link>
              </Card>
            ))}
          </CardGrid>
        </div>
      </section>

      {/* match section */}
      <section className="section match">
        <div className="container">
          <Reveal className="match-inner">
            <motion.div className="match-ico" variants={item}>
              <IconSearch className="match-ico-svg" />
            </motion.div>
            <motion.div className="eyebrow" variants={item}>
              Find the right therapist for you
            </motion.div>
            <motion.h2 variants={item}>Not sure who to choose?</motion.h2>
            <motion.p variants={item}>
              We'll help match you with a therapist based on your needs,
              preferences, and availability — so you can start with the right
              fit.
            </motion.p>
            <I className="match-actions" variants={item}>
              <button className="btn btn-primary" onClick={openBooking}>
                Request a Consultation Call <Arrow className="btn-arrow" />
              </button>
            </I>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
