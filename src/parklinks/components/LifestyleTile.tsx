import { Trees, Utensils, Bike, HeartPulse, Briefcase, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { LifestyleTile as Tile } from '../data';

const ICONS: Record<Tile['icon'], LucideIcon> = {
  Trees,
  Utensils,
  Bike,
  HeartPulse,
  Briefcase,
  Users,
};

export function LifestyleTileCard({ tile }: { tile: Tile }) {
  const Icon = ICONS[tile.icon];
  return (
    <article className="group relative overflow-hidden border border-gold-warm/15 hover:border-gold-warm/45 transition-colors duration-700">
      <div className="relative" style={{ aspectRatio: '4 / 5' }}>
        <img
          src={tile.image}
          alt={tile.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/45 to-transparent" />

        <div className="absolute inset-0 p-7 md:p-8 flex flex-col justify-end">
          <Icon size={20} strokeWidth={1.4} className="text-gold-warm mb-5" />
          <h3 className="font-serif text-xl md:text-[1.55rem] text-ivory leading-tight">
            {tile.title}
          </h3>
          <p className="mt-3 text-ivory/75 font-light leading-[1.7] text-[0.88rem] max-w-[36ch]">
            {tile.body}
          </p>
        </div>
      </div>
    </article>
  );
}
