import type { Development, DevelopmentStatus } from '../data';
import { Cta } from '../shared/Cta';

const STATUS_TONE: Record<DevelopmentStatus, string> = {
  'Pre-Selling': 'bg-gold-warm/15 text-gold-warm border-gold-warm/40',
  'Selling Fast': 'bg-rose-500/15 text-rose-200 border-rose-300/40',
  'Coming Soon': 'bg-ivory/10 text-ivory/70 border-ivory/25',
  'Ready for Turnover': 'bg-emerald-500/15 text-emerald-200 border-emerald-300/40',
};

export function DevelopmentCard({ dev }: { dev: Development }) {
  return (
    <article className="group relative flex flex-col overflow-hidden border border-gold-warm/15 bg-forest/40 hover:border-gold-warm/45 transition-all duration-700">
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4 / 3' }}>
        <img
          src={dev.image}
          alt={`${dev.name} render — placeholder`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/30 to-transparent" />

        <span
          className={`absolute top-5 left-5 inline-flex items-center px-3 py-1.5 text-[0.6rem] tracking-[0.28em] uppercase font-medium border ${STATUS_TONE[dev.status]}`}
        >
          {dev.status}
        </span>

        <div className="absolute top-5 right-5 text-[0.6rem] tracking-[0.28em] uppercase text-ivory/70">
          {dev.brand}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-7 md:p-9">
        <h3 className="font-serif text-2xl md:text-[1.7rem] text-ivory mb-3 leading-tight">
          {dev.name}
        </h3>
        <p className="text-ivory/65 font-light leading-[1.8] text-[0.92rem]">
          {dev.description}
        </p>

        <div className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-gold-warm/15 pt-6">
          {dev.facts.map((fact) => (
            <div key={fact.label}>
              <div className="text-[0.58rem] tracking-[0.3em] uppercase text-ivory/45 mb-1">
                {fact.label}
              </div>
              <div className="text-ivory/90 text-[0.88rem] font-light leading-snug">
                {fact.value}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-7 pt-6 border-t border-gold-warm/15">
          <div className="text-[0.58rem] tracking-[0.3em] uppercase text-gold-warm mb-2">
            Investment Angle
          </div>
          <p className="text-ivory/75 font-light italic leading-[1.7] text-[0.9rem]">
            {dev.investmentAngle}
          </p>
        </div>

        <div className="mt-8 flex">
          <Cta href="#signup" variant="ghost">Inquire</Cta>
        </div>
      </div>
    </article>
  );
}
