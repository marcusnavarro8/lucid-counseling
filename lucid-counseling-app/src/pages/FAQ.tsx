import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Reveal, I } from '../lib/motion';
import { item, openBooking } from '../lib/ui';
import { Arrow, IconChevron } from '../icons';

const FAQS = [
  {
    q: 'How do I get started?',
    a: 'Getting started is simple — request an appointment online, call us at 352-988-3300, or email info@lucidcounselingcenter.com. Online requests go to the counselor, who confirms your time. We’ll help you find the right therapist and a time that works for you.',
  },
  {
    q: 'Do you offer in-person sessions?',
    a: 'We provide secure, HIPAA-compliant telehealth sessions to clients across the state of Florida — so you can meet with your counselor from wherever you feel most comfortable.',
  },
  {
    q: 'I’m already a client — how do I request my next session?',
    a: 'Sign in to the secure client portal to request your next session, see upcoming appointments, and message your counselor. New clients create an account first, then send their first appointment request.',
  },
  {
    q: 'What languages do you offer therapy in?',
    a: 'Our team provides therapy in English, Spanish, Portuguese, and Arabic.',
  },
  {
    q: 'Do you accept insurance?',
    a: 'Yes. We’re in-network with many major insurance plans, and the list keeps growing. If you don’t see your plan, reach out and we’ll help you check your benefits.',
  },
  {
    q: 'Who should I contact about billing or scheduling?',
    a: 'For billing questions, email Hayde Rodriguez, our Administrator, at hayderodriguez@lucidcounselingcenter.com. For scheduling questions, email info@lucidcounselingcenter.com or call 352-988-3300.',
  },
  {
    q: 'How will I know which therapist is right for me?',
    a: 'If you’re not sure who to choose, we’ll help match you with a therapist based on your needs, preferences, and availability. You can also schedule a consultation call to find the right fit.',
  },
  {
    q: 'Is telehealth private and secure? Are you HIPAA compliant?',
    a: 'Yes. Lucid Counseling Center is fully HIPAA compliant. Your privacy is protected, and sessions are conducted over a secure, HIPAA compliant platform.',
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <button className="faq-q" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span>{q}</span>
        <IconChevron className="faq-chevron" />
      </button>
      <div className="faq-a" hidden={!open}>
        <p>{a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="page">
      <section className="page-hero">
        <div className="container">
          <Reveal onLoad className="page-hero-inner">
            <motion.div className="eyebrow" variants={item}>
              Frequently asked questions
            </motion.div>
            <motion.h1 variants={item}>Answers before you begin.</motion.h1>
            <motion.p variants={item}>
              A few of the questions we hear most often. Don't see yours? We're
              always happy to help.
            </motion.p>
          </Reveal>
        </div>
      </section>

      <section className="section faq-body">
        <div className="container faq-narrow">
          <Reveal className="faq-list">
            <motion.div variants={item}>
              {FAQS.map((f) => (
                <FaqItem key={f.q} q={f.q} a={f.a} />
              ))}
            </motion.div>
          </Reveal>
          <Reveal className="faq-cta">
            <motion.div variants={item}>
              <I className="cta-band-actions">
                <button className="btn btn-primary" onClick={openBooking}>
                  Request an Appointment <Arrow className="btn-arrow" />
                </button>
                <Link to="/services" className="btn btn-link">
                  Explore Services
                </Link>
              </I>
            </motion.div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
