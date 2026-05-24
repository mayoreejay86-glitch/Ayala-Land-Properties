import { LIFESTYLE_TILES, LIFESTYLE_COPY } from '../data';
import { SectionHeader } from '../shared/SectionHeader';
import { Reveal } from '../shared/Reveal';
import { LifestyleTileCard } from './LifestyleTile';

export function Lifestyle() {
  return (
    <section id="lifestyle" className="relative py-28 md:py-36 bg-forest-deep">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <SectionHeader
          eyebrow={LIFESTYLE_COPY.eyebrow}
          title={LIFESTYLE_COPY.title}
          body={LIFESTYLE_COPY.body}
        />

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {LIFESTYLE_TILES.map((tile, i) => (
            <Reveal key={tile.title} delay={i * 0.06}>
              <LifestyleTileCard tile={tile} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <figure className="mt-24 md:mt-28 max-w-4xl mx-auto text-center">
            <div className="pl-divider"><span /></div>
            <blockquote className="font-serif italic text-ivory/85 leading-[1.4]"
                        style={{ fontSize: 'clamp(1.4rem, 2.6vw, 2.1rem)' }}>
              “{LIFESTYLE_COPY.pullQuote}”
            </blockquote>
            <figcaption className="mt-6 text-[0.62rem] tracking-[0.32em] uppercase text-gold-warm">
              — {LIFESTYLE_COPY.pullAttribution}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
