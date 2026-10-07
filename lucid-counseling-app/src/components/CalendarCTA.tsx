/* ---------- weekly availability calendar (UI only) ----------
 *
 * SAVED FOR LATER — this is the original client-side booking calendar. It is
 * intentionally NOT rendered in the current design (the site links out to the
 * practice's HIPAA-compliant scheduler instead). Keep it here: it's the basis
 * for wiring a real scheduler later (see PLANNING.md). To use it, render
 * <CalendarCTA calIn /> inside a section and drive `calIn` from scroll.
 */
import { useMemo, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Reveal } from '../lib/motion';
import { item, easing, BOOKING_URL } from '../lib/ui';
import { Arrow } from '../icons';

// every half hour, 9:00 AM → 5:00 PM
const SLOTS = (() => {
  const out: string[] = [];
  for (let m = 9 * 60; m <= 17 * 60; m += 30) {
    const h = Math.floor(m / 60);
    const mm = m % 60 === 0 ? '00' : '30';
    const ampm = h < 12 ? 'AM' : 'PM';
    const h12 = h % 12 === 0 ? 12 : h % 12;
    out.push(`${h12}:${mm} ${ampm}`);
  }
  return out;
})();

function useWeek() {
  return useMemo(() => {
    const days = [];
    const d = new Date();
    // next 6 business days, starting tomorrow (skip Sat/Sun)
    while (days.length < 6) {
      d.setDate(d.getDate() + 1);
      const dow = d.getDay();
      if (dow === 0 || dow === 6) continue;
      const dayNum = d.getDate();
      days.push({
        id: d.toISOString().slice(0, 10),
        dow: d.toLocaleDateString('en-US', { weekday: 'short' }),
        day: dayNum,
        mon: d.toLocaleDateString('en-US', { month: 'short' }),
        slots: SLOTS.map((t, s) => ({
          t,
          // deterministic "already booked" pattern (~30%)
          booked: (dayNum * 7 + s * 3) % 10 < 3,
        })),
      });
    }
    return days;
  }, []);
}

const calReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easing } },
};

export default function CalendarCTA({ calIn }: { calIn: boolean }) {
  const week = useWeek();
  const [sel, setSel] = useState<{ d: string; t: string } | null>(null);

  return (
    <Reveal className="cta-content">
      <motion.div
        className="eyebrow"
        variants={item}
        style={{
          color: '#4f3d1f',
          textShadow: '0 1px 14px rgba(255, 253, 249, 0.85)',
        }}
      >
        Book a free consultation
      </motion.div>
      <motion.h2 variants={item}>
        Take the first step toward feeling like yourself again.
      </motion.h2>
      <motion.div
        className="cal"
        variants={calReveal}
        initial="hidden"
        animate={calIn ? 'show' : 'hidden'}
      >
        <div className="cal-grid">
          {week.map((d) => (
            <div className="cal-day" key={d.id}>
              <div className="cal-date">
                <span>{d.dow}</span>
                <strong>{d.day}</strong>
                <span>{d.mon}</span>
              </div>
              <div className="cal-slots" data-lenis-prevent>
                {d.slots.map(({ t, booked }) => {
                  const active = sel?.d === d.id && sel?.t === t;
                  return (
                    <button
                      key={t}
                      disabled={booked}
                      className={`cal-slot${active ? ' active' : ''}${
                        booked ? ' booked' : ''
                      }`}
                      onClick={() => !booked && setSel({ d: d.id, t })}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="cal-foot">
          {sel ? (
            <span>
              Selected: <strong>{sel.t}</strong> on{' '}
              {new Date(sel.d).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          ) : (
            <span className="cal-hint">
              Pick a time that works for you — it's just a friendly hello.
            </span>
          )}
          <button
            className="btn btn-primary cal-confirm"
            disabled={!sel}
            aria-disabled={!sel}
            onClick={() =>
              sel &&
              window.open(BOOKING_URL, '_blank', 'noopener,noreferrer')
            }
          >
            Confirm time <Arrow className="btn-arrow" />
          </button>
        </div>
      </motion.div>
    </Reveal>
  );
}
