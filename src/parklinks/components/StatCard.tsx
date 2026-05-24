import { motion, useInView, useMotionValue, useTransform, animate } from 'motion/react';
import { useEffect, useRef } from 'react';
import type { Key } from 'react';
import type { InvestmentStat } from '../data';

type StatCardProps = { stat: InvestmentStat; index: number; key?: Key };

/**
 * Animated stat with count-up on first scroll into view.
 * Falls back gracefully for non-numeric values like "< 8".
 */
export function StatCard({ stat, index }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const numericTarget = parseFloat(stat.value.replace(/[^0-9.]/g, ''));
  const hasNumber = !Number.isNaN(numericTarget);
  const prefix = stat.value.match(/^[^0-9.]+/)?.[0] ?? '';

  const count = useMotionValue(0);
  const decimals = stat.value.includes('.') ? 1 : 0;
  const rounded = useTransform(count, (v) =>
    `${prefix}${v.toFixed(decimals)}`,
  );

  useEffect(() => {
    if (!hasNumber || !inView) return;
    const controls = animate(count, numericTarget, {
      duration: 1.6,
      ease: [0.2, 0.7, 0.2, 1],
      delay: index * 0.08,
    });
    return controls.stop;
  }, [hasNumber, inView, numericTarget, count, index]);

  return (
    <div
      ref={ref}
      className="relative pl-7 md:pl-9 py-8 md:py-10 border-l border-gold-warm/30 group hover:border-gold-warm/70 transition-colors duration-500"
    >
      <div className="flex items-baseline gap-1 font-serif text-ivory">
        {hasNumber ? (
          <motion.span style={{ fontSize: 'clamp(2.6rem, 5vw, 4rem)' }} className="font-light leading-none text-gold-warm">
            {rounded}
          </motion.span>
        ) : (
          <span style={{ fontSize: 'clamp(2.6rem, 5vw, 4rem)' }} className="font-light leading-none text-gold-warm">
            {stat.value}
          </span>
        )}
        {stat.unit && (
          <span className="text-2xl md:text-3xl text-gold-warm/70 font-light leading-none">
            {stat.unit}
          </span>
        )}
      </div>
      <div className="mt-3 text-[0.62rem] tracking-[0.3em] uppercase text-ivory/55">
        {stat.label}
      </div>
      <p className="mt-4 text-ivory/65 font-light leading-[1.7] text-[0.9rem] max-w-[40ch]">
        {stat.body}
      </p>
    </div>
  );
}
