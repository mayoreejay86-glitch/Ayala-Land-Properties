import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { HERO } from '../data';
import { Cta } from '../shared/Cta';

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden pl-grain flex items-center"
    >
      <div className="absolute inset-0 -z-10">
        <img
          src={HERO.bgImage}
          alt={HERO.bgAlt}
          className="absolute inset-0 w-full h-full object-cover animate-hero-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/70 via-forest-deep/50 to-forest-deep" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/80 via-transparent to-transparent" />
      </div>

      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 pt-32 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
          className="max-w-3xl"
        >
          <span className="pl-eyebrow">{HERO.eyebrow}</span>

          <h1 className="mt-7 font-serif font-light text-ivory leading-[1.05] tracking-[-0.01em]"
              style={{ fontSize: 'clamp(2.6rem, 6.5vw, 5.5rem)' }}>
            {HERO.headlineLead}{' '}
            <span className="italic text-gold-warm">{HERO.headlineAccent}</span>
            <br />
            {HERO.headlineTail}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
            className="mt-8 text-ivory/80 font-light text-base md:text-lg leading-[1.8] max-w-2xl"
          >
            {HERO.subhead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease: [0.2, 0.7, 0.2, 1] }}
            className="mt-12 flex flex-wrap gap-4"
          >
            <Cta href={HERO.primaryCta.href}>{HERO.primaryCta.label}</Cta>
            <Cta href={HERO.secondaryCta.href} variant="ghost" showArrow={false}>
              {HERO.secondaryCta.label}
            </Cta>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.a
          href="#overview"
          aria-label="Scroll to estate overview"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute left-1/2 -translate-x-1/2 bottom-10 flex flex-col items-center gap-3 text-ivory/60 hover:text-ivory transition-colors"
        >
          <span className="text-[0.62rem] tracking-[0.4em] uppercase">Discover</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={18} strokeWidth={1.2} />
          </motion.div>
        </motion.a>
      </div>
    </section>
  );
}
