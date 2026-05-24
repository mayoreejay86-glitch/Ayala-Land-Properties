import { DEVELOPMENTS } from '../data';
import { SectionHeader } from '../shared/SectionHeader';
import { Reveal } from '../shared/Reveal';
import { DevelopmentCard } from './DevelopmentCard';

export function FeaturedDevelopments() {
  return (
    <section
      id="developments"
      className="relative py-28 md:py-36 bg-forest-deep"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 md:gap-16">
          <SectionHeader
            eyebrow="Featured Developments"
            title="Premier addresses, <em>masterfully positioned</em>."
            body="Each development at Parklinks is conceived as a singular statement — anchored to the estate masterplan, yet distinct in architecture, address, and yield profile."
          />
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-10">
          {DEVELOPMENTS.map((dev, i) => (
            <Reveal key={dev.id} delay={i * 0.08}>
              <DevelopmentCard dev={dev} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
