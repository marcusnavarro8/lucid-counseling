import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';
import { group, item, SHOW_ALL } from './ui';

// Reveal-on-scroll wrapper + the two card layout helpers. Kept in a
// components-only module (separate from ./ui constants/hooks) so React Fast
// Refresh stays happy.

export function Reveal({
  children,
  onLoad = false,
  className,
}: {
  children: ReactNode;
  onLoad?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={group}
      initial="hidden"
      {...(onLoad || SHOW_ALL
        ? { animate: 'show' }
        : { whileInView: 'show', viewport: { margin: '-90px' } })}
    >
      {children}
    </motion.div>
  );
}

// Thin alias for `motion.div` as a real component (so this module exports
// only components — keeps React Fast Refresh happy).
export function I(props: HTMLMotionProps<'div'>) {
  return <motion.div {...props} />;
}

// Desktop: one grouped staggered Reveal (all cards together).
// Mobile: each card reveals on its own as it scrolls into view (one at a
// time) — same `item` animation as every other element on the page.
export function CardGrid({
  perCard,
  className,
  children,
}: {
  perCard: boolean;
  className: string;
  children: ReactNode;
}) {
  if (perCard) return <div className={className}>{children}</div>;
  return <Reveal className={className}>{children}</Reveal>;
}

export function Card({
  perCard,
  className,
  children,
}: {
  perCard: boolean;
  className: string;
  children: ReactNode;
}) {
  if (!perCard)
    return (
      <motion.div className={className} variants={item}>
        {children}
      </motion.div>
    );
  return (
    <motion.div
      className={className}
      variants={item}
      initial="hidden"
      {...(SHOW_ALL
        ? { animate: 'show' }
        : { whileInView: 'show', viewport: { margin: '-60px' } })}
    >
      {children}
    </motion.div>
  );
}
