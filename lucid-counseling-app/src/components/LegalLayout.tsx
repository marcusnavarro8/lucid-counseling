import { motion } from 'framer-motion';
import { Reveal } from '../lib/motion';
import { item } from '../lib/ui';

export type LegalSection = { h: string; p: string[] };

export default function LegalLayout({
  eyebrow,
  title,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <div className="page">
      <section className="page-hero">
        <div className="container">
          <Reveal onLoad className="page-hero-inner">
            <motion.div className="eyebrow" variants={item}>
              {eyebrow}
            </motion.div>
            <motion.h1 variants={item}>{title}</motion.h1>
            <motion.p variants={item}>{intro}</motion.p>
          </Reveal>
        </div>
      </section>

      <section className="section legal-body">
        <div className="container legal-narrow">
          <Reveal>
            {sections.map((s) => (
              <motion.div className="legal-section" variants={item} key={s.h}>
                <h2>{s.h}</h2>
                {s.p.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </motion.div>
            ))}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
