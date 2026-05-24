import { MapPin, Route, Trees, Building2, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ESTATE_FACTS, OVERVIEW_COPY } from '../data';
import type { OverviewFact } from '../data';
import { SectionHeader } from '../shared/SectionHeader';
import { Reveal } from '../shared/Reveal';
import { ImageSlot } from '../shared/ImageSlot';

const ICONS: Record<OverviewFact['icon'], LucideIcon> = {
  MapPin,
  Route,
  Trees,
  Building2,
  ShieldCheck,
};

export function EstateOverview() {
  return (
    <section id="overview" className="relative py-28 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <SectionHeader
          eyebrow={OVERVIEW_COPY.eyebrow}
          title={OVERVIEW_COPY.title}
          body={OVERVIEW_COPY.body}
        />

        <div className="mt-20 grid lg:grid-cols-[1.05fr_1fr] gap-16 lg:gap-20 items-start">
          <ul className="space-y-10">
            {ESTATE_FACTS.map((fact, i) => {
              const Icon = ICONS[fact.icon];
              return (
                <Reveal key={fact.title} as="li" delay={i * 0.06}>
                  <div className="flex items-start gap-6 group">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-gold-warm/30 group-hover:border-gold-warm/70 transition-colors duration-500">
                      <Icon size={18} strokeWidth={1.4} className="text-gold-warm" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-2xl text-ivory mb-2 leading-tight">
                        {fact.title}
                      </h3>
                      <p className="text-ivory/65 font-light leading-[1.8] text-[0.95rem] max-w-xl">
                        {fact.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ul>

          <Reveal delay={0.15} className="lg:sticky lg:top-32">
            <div className="relative">
              <ImageSlot
                src={OVERVIEW_COPY.mapImage}
                alt={OVERVIEW_COPY.mapAlt}
                ratio="4 / 5"
                placeholderLabel="Estate masterplan render"
              />
              <div className="absolute -bottom-6 -left-6 pl-glass-dark px-6 py-4 max-w-[260px]">
                <div className="text-[0.62rem] tracking-[0.32em] uppercase text-gold-warm mb-1">
                  Masterplan
                </div>
                <div className="text-ivory text-sm font-light leading-[1.6]">
                  35 hectares · two cities · one private bridge
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
