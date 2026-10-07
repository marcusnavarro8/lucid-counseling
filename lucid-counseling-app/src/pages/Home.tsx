import { useRef, useState, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Reveal, I, CardGrid, Card } from '../lib/motion';
import { item, scrollTo, useIsMobile, openBooking, SHOW_ALL } from '../lib/ui';
import {
  Arrow,
  ArrowDown,
  IconReach,
  IconSearch,
  IconBegin,
  IconGlobe,
  IconShield,
  IconHeart,
  IconChevron,
} from '../icons';
import { ServiceIcon } from '../lib/serviceIcons';
import { HOME_SERVICE_SLUGS, getSpecialty } from '../data/specialties';
import { INSURANCE_PLANS } from '../data/insurance';

/* ---------- hero ---------- */
function Hero() {
  return (
    <section className="hero">
      <picture>
        <source media="(max-width: 760px)" srcSet="/media/hero-home-mobile.jpg" />
        <img
          src="/media/hero-home.jpg"
          alt="A woman wrapped in a soft blanket, holding a warm drink in a cozy sunlit room with a laptop nearby and a sunset over the sea through the window"
          className="hero-layer hero-bg"
        />
      </picture>
      <div className="hero-veil" />
      <div className="container">
        <Reveal onLoad className="hero-content">
          <I className="eyebrow" variants={item}>
            Online therapy · Florida
          </I>
          <motion.h1 variants={item}>
            Helping you find clarity, <em>healing</em>, &amp; growth.
          </motion.h1>
          <motion.p variants={item}>
            Life can feel overwhelming at times. We offer a supportive space to
            help you understand yourself, strengthen your relationships, and
            move forward with confidence.
          </motion.p>
          <I className="hero-actions" variants={item}>
            <button className="btn btn-primary" onClick={openBooking}>
              Request an Appointment <Arrow className="btn-arrow" />
            </button>
            <button className="btn btn-link" onClick={() => scrollTo('how')}>
              See how we help
            </button>
          </I>
        </Reveal>
      </div>
      <button
        className="hero-scroll"
        onClick={() => scrollTo('weight')}
        aria-label="Scroll down"
      >
        <span>Scroll</span>
        <ArrowDown className="hero-scroll-arrow" />
      </button>
    </section>
  );
}

/* ---------- the weight lifts ---------- */
function Weight() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const fogX = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const fogScale = useTransform(scrollYProgress, [0, 1], [1.15, 1.35]);
  const fogOp = useTransform(scrollYProgress, [0, 0.4, 0.9], [1, 0.85, 0.15]);

  return (
    <section className="section weight" id="weight" ref={ref}>
      <motion.img
        src="/media/fog.png"
        alt=""
        className="fog"
        style={{ x: fogX, scale: fogScale, opacity: fogOp }}
      />
      <div className="container">
        <Reveal className="weight-inner">
          <motion.h2 variants={item}>
            Some seasons feel heavier than others.
          </motion.h2>
          <motion.p variants={item}>
            Anxiety, burnout, grief, the quiet weight of carrying it all alone.
            You don't have to keep holding it by yourself — and you don't have
            to have it all figured out to begin.
          </motion.p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- how we help ---------- */
function HowWeHelp() {
  const perCard = useIsMobile(820) && !SHOW_ALL;
  const services = HOME_SERVICE_SLUGS.map(getSpecialty).filter(
    (s): s is NonNullable<typeof s> => Boolean(s)
  );
  return (
    <section className="section help" id="how">
      <div className="container">
        <Reveal className="help-head">
          <motion.div className="eyebrow" variants={item}>
            How we help
          </motion.div>
          <motion.h2 className="title" variants={item} style={{ margin: '0 auto' }}>
            Care for whatever you're carrying.
          </motion.h2>
          <motion.p className="help-lead" variants={item}>
            A few of the areas we support — each with compassionate, evidence-based
            care tailored to you.
          </motion.p>
        </Reveal>

        <CardGrid perCard={perCard} className="help-grid">
          {services.map((s) => (
            <Card perCard={perCard} className="help-card" key={s.slug}>
              <Link to={`/services/${s.slug}`} className="help-card-link">
                <ServiceIcon name={s.icon} className="help-ico" />
                <h3>{s.name}</h3>
                <p>{s.blurb}</p>
                <span className="card-more">
                  Learn more <Arrow className="btn-arrow" />
                </span>
              </Link>
            </Card>
          ))}
        </CardGrid>

        <Reveal className="help-foot">
          <motion.div variants={item}>
            <Link to="/services" className="btn btn-primary">
              View More Services <Arrow className="btn-arrow" />
            </Link>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- about us ---------- */
function AboutUs() {
  const pills = [
    { Ico: IconHeart, t: 'Licensed & pre-licensed counselors' },
    { Ico: IconGlobe, t: 'Care in English, Spanish, Portuguese & Arabic' },
    { Ico: IconShield, t: 'Telehealth across Florida' },
  ];
  return (
    <section className="section about" id="about">
      <div className="container about-inner">
        <Reveal className="about-media">
          <motion.img
            variants={item}
            src="/media/about-team.jpg"
            alt="The Lucid Counseling Center team — warm, diverse counselors meeting together, one greeting a client on a telehealth video call"
          />
        </Reveal>
        <Reveal className="about-copy">
          <motion.div className="eyebrow" variants={item}>
            About us
          </motion.div>
          <motion.h2 variants={item}>
            A collaborative team, here for you.
          </motion.h2>
          <motion.p variants={item}>
            Lucid Counseling is a collaborative team of licensed and pre-licensed
            mental health counselors committed to accessible, culturally
            responsive care. We believe healing happens when clients feel
            understood, supported, and empowered.
          </motion.p>
          <I className="about-pills" variants={item}>
            {pills.map(({ Ico, t }) => (
              <span className="about-pill" key={t}>
                <Ico className="about-pill-ico" />
                {t}
              </span>
            ))}
          </I>
          <I className="about-actions" variants={item}>
            <Link to="/team" className="btn btn-primary">
              Meet the Team <Arrow className="btn-arrow" />
            </Link>
          </I>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- what to expect ---------- */
const expectSteps = [
  {
    Ico: IconReach,
    n: 'STEP 01',
    t: 'Reach Out',
    d: 'Schedule online or call our office. No forms, no pressure — just a first hello.',
  },
  {
    Ico: IconSearch,
    n: 'STEP 02',
    t: 'Match With a Therapist',
    d: 'We help pair you with the right fit for your needs, preferences, and availability.',
  },
  {
    Ico: IconBegin,
    n: 'STEP 03',
    t: 'Begin Healing',
    d: 'Start therapy at your own pace, with support every step of the way.',
  },
];

function WhatToExpect() {
  const perCard = useIsMobile(820) && !SHOW_ALL;
  return (
    <section className="section steps" id="expect">
      <div className="container">
        <Reveal className="steps-head">
          <motion.div className="eyebrow" variants={item}>
            What to expect
          </motion.div>
          <motion.h2 className="title" variants={item} style={{ margin: '0 auto' }}>
            Starting is simpler than it feels.
          </motion.h2>
          <motion.p className="help-lead" variants={item}>
            Starting therapy doesn't have to feel intimidating. Here's how it
            works.
          </motion.p>
        </Reveal>
        <CardGrid perCard={perCard} className="steps-grid">
          {expectSteps.map(({ Ico, n, t, d }) => (
            <Card perCard={perCard} className="step" key={n}>
              <div className="step-n">{n}</div>
              <Ico className="step-ico" />
              <h3>{t}</h3>
              <p>{d}</p>
            </Card>
          ))}
        </CardGrid>
      </div>
    </section>
  );
}

/* ---------- telehealth band (who we help · languages) ---------- */
function Telehealth() {
  return (
    <section className="section tele" id="connect">
      <picture>
        <source media="(max-width: 760px)" srcSet="/media/tele-bg-mobile.png" />
        <img
          src="/media/tele-bg.png"
          alt="A cozy sunlit nook with a soft armchair, knit throw, laptop and a warm mug — a calm space for an online therapy session"
          className="tele-bg"
        />
      </picture>
      <div className="tele-veil" />
      <div className="container">
        <Reveal className="tele-copy">
          <motion.div className="eyebrow" variants={item}>
            From wherever you are
          </motion.div>
          <motion.h2 variants={item}>
            For individuals, couples, and families across Florida.
          </motion.h2>
          <motion.p variants={item}>
            Secure, HIPAA-compliant sessions you can take from your couch,
            your car, or a quiet corner of your day — with a counselor who
            listens in the language you think and feel in.
          </motion.p>
          <I className="tele-tags" variants={item}>
            <span>English</span>
            <span>Español</span>
            <span>Português</span>
            <span>العربية</span>
          </I>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- insurance ---------- */
function Insurance() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(SHOW_ALL);
  // height of the first two rows of chips (collapsed state) + full height
  const [collapsedH, setCollapsedH] = useState<number | null>(null);
  const [fullH, setFullH] = useState(0);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const GAP = 10; // matches .ins-grid row gap
    const measure = () => {
      const top = grid.getBoundingClientRect().top;
      const rows: number[] = [];
      for (const c of Array.from(grid.children) as HTMLElement[]) {
        const t = Math.round(c.getBoundingClientRect().top - top);
        if (!rows.some((r) => Math.abs(r - t) < 2)) rows.push(t);
      }
      rows.sort((a, b) => a - b);
      setFullH(grid.scrollHeight);
      // clip to the bottom of the second row (start of the third row − gap)
      setCollapsedH(rows.length <= 2 ? null : rows[2] - GAP);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(grid);
    return () => ro.disconnect();
  }, []);

  const collapsible = collapsedH !== null && !SHOW_ALL;
  const maxH = !collapsible ? undefined : expanded ? fullH : collapsedH!;

  return (
    <section className="section insurance" id="insurance">
      <div className="container">
        <Reveal className="ins-head">
          <motion.div className="eyebrow" variants={item}>
            Insurance
          </motion.div>
          <motion.h2 className="title" variants={item} style={{ margin: '0 auto' }}>
            Do you accept insurance?
          </motion.h2>
          <motion.p className="help-lead" variants={item}>
            Yes — we're in-network with many major plans, and the list keeps
            growing. Don't see yours? Reach out and we'll help you check your
            benefits.
          </motion.p>
        </Reveal>
        <Reveal className="ins-panel">
          <div
            className="ins-collapse"
            style={{ maxHeight: maxH, overflow: collapsible ? 'hidden' : undefined }}
          >
            <motion.div className="ins-grid" variants={item} ref={gridRef}>
              {INSURANCE_PLANS.map((p) => (
                <span className="ins-chip" key={p}>
                  {p}
                </span>
              ))}
            </motion.div>
          </div>
          {collapsible && (
            <motion.div className="ins-toggle" variants={item}>
              <button
                className="ins-toggle-btn"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
              >
                {expanded
                  ? 'Show fewer'
                  : `Show all ${INSURANCE_PLANS.length} plans`}
                <IconChevron className={`ins-toggle-ico${expanded ? ' up' : ''}`} />
              </button>
            </motion.div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- final cta (parallax scene, links out to scheduler) ---------- */
function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const isMobile = useIsMobile();
  const skyScd = useTransform(scrollYProgress, [0, 1], [1, 1.75]);
  const skyScm = useTransform(scrollYProgress, [0, 1], [1.05, 1.22]);
  const skyYd = useTransform(scrollYProgress, [0, 1], ['-6%', '10%']);
  const skyYm = useTransform(scrollYProgress, [0, 1], ['-5%', '6%']);
  const groundYd = useTransform(scrollYProgress, [0, 1], [230, -80]);
  const groundYm = useTransform(scrollYProgress, [0, 1], [130, -55]);
  const groundScd = useTransform(scrollYProgress, [0, 1], [1.06, 1.32]);
  const groundScm = useTransform(scrollYProgress, [0, 1], [1.22, 1.42]);
  const raysOp = useTransform(scrollYProgress, [0, 0.5, 1], [0.12, 1, 0.65]);
  const raysScale = useTransform(scrollYProgress, [0, 1], [1.55, 1.28]);
  const raysYd = useTransform(scrollYProgress, [0, 1], ['-16%', '12%']);
  const raysYm = useTransform(scrollYProgress, [0, 1], ['-18%', '14%']);
  const skyStyle = isMobile
    ? { scale: skyScm, y: skyYm }
    : { scale: skyScd, y: skyYd };
  const groundStyle = isMobile
    ? { y: groundYm, scale: groundScm }
    : { y: groundYd, scale: groundScd };

  return (
    <section className="cta cta-final" id="cta" ref={ref}>
      <picture>
        <source media="(max-width: 760px)" srcSet="/media/cta-sky-mobile.png" />
        <motion.img src="/media/cta-sky.png" alt="" className="cta-sky" style={skyStyle} />
      </picture>
      <motion.img
        src="/media/cta-godrays.png"
        alt=""
        className="cta-godrays"
        style={{ opacity: raysOp, scale: raysScale, y: isMobile ? raysYm : raysYd }}
      />
      <picture>
        <source media="(max-width: 760px)" srcSet="/media/cta-ground-mobile.png" />
        <motion.img
          src="/media/cta-ground.png"
          alt=""
          className="cta-ground"
          style={groundStyle}
        />
      </picture>
      <div className="cta-veil" />
      <div className="container">
        <Reveal className="cta-content">
          <motion.div
            className="eyebrow"
            variants={item}
            style={{ color: '#4f3d1f', textShadow: '0 1px 14px rgba(255, 253, 249, 0.85)' }}
          >
            Your journey starts here
          </motion.div>
          <motion.h2 variants={item}>Ready to get started?</motion.h2>
          <motion.p className="cta-sub" variants={item}>
            Request your appointment online and your counselor will confirm the
            time — or call us and we'll help match you with the right therapist.
          </motion.p>
          <I className="cta-actions" variants={item}>
            <button className="btn btn-primary" onClick={openBooking}>
              Request an Appointment <Arrow className="btn-arrow" />
            </button>
            <a className="btn btn-ghost" href="tel:+13529883300">
              Prefer to talk? Call 352-988-3300
            </a>
          </I>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Weight />
      <HowWeHelp />
      <AboutUs />
      <WhatToExpect />
      <Telehealth />
      <Insurance />
      <FinalCTA />
    </>
  );
}
