import { INVESTMENT_STATS, INVESTMENT_COPY } from '../data';
import { SectionHeader } from '../shared/SectionHeader';
import { Reveal } from '../shared/Reveal';
import { StatCard } from './StatCard';

export function InvestmentHighlights() {
  return (
    <section
      id="investment"
      className="relative py-28 md:py-36 bg-forest"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <SectionHeader
          eyebrow={INVESTMENT_COPY.eyebrow}
          title={INVESTMENT_COPY.title}
          body={INVESTMENT_COPY.body}
        />

        <Reveal delay={0.1}>
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-2">
            {INVESTMENT_STATS.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
