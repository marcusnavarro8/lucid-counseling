import { motion } from 'framer-motion';
import { Link, Navigate, useParams, useNavigate } from 'react-router-dom';
import { Reveal, I } from '../lib/motion';
import { item, openBooking } from '../lib/ui';
import { Arrow, ArrowLeft, IconGlobe, IconCheck } from '../icons';
import Avatar from '../components/Avatar';
import { TEAM, getMember, nativeLang, isClinician, photoFor } from '../data/team';

export default function MemberDetail() {
  const { slug = '' } = useParams();
  const navigate = useNavigate();
  const m = getMember(slug);
  if (!m) return <Navigate to="/team" replace />;

  const goBack = () =>
    window.history.state?.idx > 0 ? navigate(-1) : navigate('/team');

  const index = TEAM.findIndex((x) => x.slug === m.slug);
  const firstName = m.name.replace(/^Dr\.\s+/, '').split(' ')[0];
  // Non-clinical staff aren't booked, and have no focus/language panel.
  const clinician = isClinician(m);
  const hasPanel = m.specialties.length > 0 || m.languages.length > 0;

  return (
    <div className="page detail" key={m.slug}>
      <section className="page-hero member-hero">
        <div className="container">
          <Reveal onLoad className="member-hero-inner">
            <motion.div variants={item} className="member-back-wrap">
              <button type="button" className="back-link" onClick={goBack}>
                <ArrowLeft className="back-ico" /> All team members
              </button>
            </motion.div>
            <motion.div variants={item}>
              <Avatar
                name={m.name}
                index={index}
                src={photoFor(m.slug)}
                className="member-avatar"
              />
            </motion.div>
            <motion.div className="member-head" variants={item}>
              {m.credentials !== m.role && (
                <span className="team-cred member-cred">{m.credentials}</span>
              )}
              <h1>{m.name}</h1>
              <p className="member-role">{m.role}</p>
              {m.languages.length > 0 && (
                <span className="team-langs member-langs">
                  <IconGlobe className="team-lang-ico" />
                  {m.languages.map(nativeLang).join(' · ')}
                </span>
              )}
            </motion.div>
            <I className="page-hero-actions member-actions" variants={item}>
              {clinician ? (
                <button className="btn btn-primary" onClick={openBooking}>
                  Request an Appointment <Arrow className="btn-arrow" />
                </button>
              ) : (
                <a className="btn btn-primary" href={`mailto:${m.email}`}>
                  Email {firstName} <Arrow className="btn-arrow" />
                </a>
              )}
            </I>
          </Reveal>
        </div>
      </section>

      <section className="section member-body">
        <div className={`container member-grid${hasPanel ? '' : ' single'}`}>
          <Reveal className="member-about">
            <motion.h2 variants={item}>About {firstName}</motion.h2>
            {m.bio.map((p, i) => (
              <motion.p key={i} variants={item}>
                {p}
              </motion.p>
            ))}
          </Reveal>
          {hasPanel && (
            <Reveal className="member-side">
              <motion.div className="member-card" variants={item}>
                {m.specialties.length > 0 && (
                  <>
                    <h3>Areas of focus</h3>
                    <ul className="check-list">
                      {m.specialties.map((sp) => (
                        <li key={sp}>
                          <IconCheck className="check-ico" />
                          {sp}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {m.languages.length > 0 && (
                  <>
                    <h3 className="member-card-langs-h">Languages</h3>
                    <div className="member-lang-chips">
                      {m.languages.map((l) => (
                        <span className="ins-chip" key={l}>
                          {nativeLang(l)}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            </Reveal>
          )}
        </div>
      </section>

      <section className="section cta-band">
        <div className="container">
          <Reveal className="cta-band-inner">
            <motion.h2 variants={item}>
              {clinician
                ? `Ready to work with ${firstName}?`
                : 'Ready to get started?'}
            </motion.h2>
            <motion.p variants={item}>
              Request an appointment online and your counselor will confirm the
              time — or reach out and we'll help you get started.
            </motion.p>
            <I className="cta-band-actions" variants={item}>
              <button className="btn btn-primary" onClick={openBooking}>
                Request an Appointment <Arrow className="btn-arrow" />
              </button>
              <Link to="/team" className="btn btn-link">
                See the Whole Team
              </Link>
            </I>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
