import { TrendingUp } from 'lucide-react';
import { MARKET_BULLETS, MARKET_COPY } from '../data';
import { SectionHeader } from '../shared/SectionHeader';
import { Reveal } from '../shared/Reveal';
import { ImageSlot } from '../shared/ImageSlot';

export function MarketInsights() {
  return (
    <section id="insights" className="relative py-28 md:py-36 bg-forest">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <SectionHeader
          eyebrow={MARKET_COPY.eyebrow}
          title={MARKET_COPY.title}
          body={MARKET_COPY.body}
        />

        <div className="mt-20 grid lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-20 items-start">
          <Reveal>
            <div className="relative">
              <ImageSlot
                src={MARKET_COPY.chartImage}
                alt={MARKET_COPY.chartAlt}
                ratio="5 / 4"
                placeholderLabel="Market appreciation chart"
              />
              <div className="absolute -bottom-5 left-5 right-5 md:left-8 md:right-8 pl-glass-dark px-6 py-5 flex items-center gap-4">
                <TrendingUp size={20} strokeWidth={1.4} className="text-gold-warm flex-shrink-0" />
                <div>
                  <div className="text-[0.62rem] tracking-[0.3em] uppercase text-gold-warm">
                    Estate Premium
                  </div>
                  <div className="text-ivory text-sm font-light leading-[1.5]">
                    Estate-format residences command an average 28% appreciation premium over standalone condos over a 10-year horizon.
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <ul className="space-y-10 lg:pt-6">
            {MARKET_BULLETS.map((b, i) => (
              <Reveal key={b.title} as="li" delay={i * 0.08}>
                <div className="flex gap-5">
                  <div className="flex-shrink-0 font-serif text-gold-warm text-xl pt-0.5 w-7 text-right">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl text-ivory leading-tight mb-2">
                      {b.title}
                    </h3>
                    <p className="text-ivory/65 font-light leading-[1.8] text-[0.92rem] max-w-xl">
                      {b.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
