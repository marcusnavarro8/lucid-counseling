import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Reveal, I, CardGrid, Card } from '../lib/motion';
import {
  item,
  useIsMobile,
  openBooking,
  setBackAnchor,
  SHOW_ALL,
} from '../lib/ui';
import { Arrow } from '../icons';
import { ServiceIcon } from '../lib/serviceIcons';
import { CATEGORIES, SPECIALTIES } from '../data/specialties';

// stable element id for a category section (used for section-level "back")
const catId = (name: string) =>
  'svc-cat-' + name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');

export default function Services() {
  const mobile = useIsMobile(760);
  const perCard = mobile && !SHOW_ALL;
  return (
    <div className="page">
      {/* page hero */}
      <section className="page-hero">
        <div className="container">
          <Reveal onLoad className="page-hero-inner">
            <motion.div className="eyebrow" variants={item}>
              Services &amp; Specialties
            </motion.div>
            <motion.h1 variants={item}>
              Comprehensive counseling, tailored just for you.
            </motion.h1>
            <motion.p variants={item}>
              Whatever you're facing, you don't have to face it alone. Explore
              the areas we support — and if you're not sure where you fit, we'll
              help you find the right starting point.
            </motion.p>
            <I className="page-hero-actions" variants={item}>
              <button className="btn btn-primary" onClick={openBooking}>
                Request a Consultation <Arrow className="btn-arrow" />
              </button>
              <Link to="/team" className="btn btn-link">
                Meet Our Therapists
              </Link>
            </I>
          </Reveal>
        </div>
      </section>

      {/* grouped categories */}
      <section className="section svc-body">
        <div className="container">
          {CATEGORIES.map((cat) => {
            const items = SPECIALTIES.filter((s) => s.category === cat.name);
            if (!items.length) return null;
            return (
              <div className="svc-cat" id={catId(cat.name)} key={cat.name}>
                <Reveal className="svc-cat-head">
                  <motion.div className="svc-cat-ico" variants={item}>
                    <ServiceIcon name={cat.icon} className="svc-cat-ico-svg" />
                  </motion.div>
                  <motion.h2 variants={item}>{cat.name}</motion.h2>
                  <motion.p variants={item}>{cat.copy}</motion.p>
                </Reveal>
                <CardGrid perCard={perCard} className="svc-grid">
                  {items.map((s) => (
                    <Card perCard={perCard} className="svc-card" key={s.slug}>
                      <Link
                        id={`svc-card-${s.slug}`}
                        to={`/services/${s.slug}`}
                        className="svc-card-link"
                        onClick={() =>
                          setBackAnchor(
                            '/services',
                            // mobile: return to the exact card; desktop (wide
                            // multi-column grid): return to the category section
                            mobile ? `svc-card-${s.slug}` : catId(cat.name)
                          )
                        }
                      >
                        <ServiceIcon name={s.icon} className="svc-card-ico" />
                        <h3>{s.name}</h3>
                        <p className="svc-card-def">{s.definition}</p>
                        <div className="svc-card-signs">
                          {s.signs.slice(0, 3).map((sign) => (
                            <span className="svc-tag" key={sign}>
                              {sign}
                            </span>
                          ))}
                        </div>
                        <span className="card-more">
                          How we help <Arrow className="btn-arrow" />
                        </span>
                      </Link>
                    </Card>
                  ))}
                </CardGrid>
              </div>
            );
          })}
        </div>
      </section>

      {/* not sure? */}
      <section className="section notsure">
        <div className="container">
          <Reveal className="notsure-inner">
            <motion.h2 variants={item}>
              Not sure what you're looking for?
            </motion.h2>
            <motion.p variants={item}>
              That's completely okay. Tell us a little about what's going on and
              we'll help match you with the right therapist for your needs,
              preferences, and availability.
            </motion.p>
            <I className="notsure-actions" variants={item}>
              <button className="btn btn-primary" onClick={openBooking}>
                Request a Consultation <Arrow className="btn-arrow" />
              </button>
              <Link to="/team" className="btn btn-link">
                Meet Our Therapists
              </Link>
            </I>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
