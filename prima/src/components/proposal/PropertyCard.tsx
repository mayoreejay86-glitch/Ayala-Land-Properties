import type { Property, GeneratedProposalCopy } from "@/lib/types";
import { PaymentCalculator } from "./PaymentCalculator";

type Props = {
  property: Property;
  block?: GeneratedProposalCopy["propertyBlocks"][number];
  index: number;
};

export function PropertyCard({ property, block, index }: Props) {
  return (
    <article className="border-t border-gold/40 pt-14 md:pt-20 mt-14 md:mt-20 first:border-none first:mt-0 first:pt-0">
      <div className="flex items-baseline justify-between flex-wrap gap-3 mb-6">
        <p className="eyebrow">Option {String(index + 1).padStart(2, "0")}</p>
        <p className="text-[0.72rem] tracking-[0.2em] uppercase text-gray-dark">
          {property.location}
        </p>
      </div>

      <h3 className="font-serif text-[clamp(1.8rem,3.4vw,2.8rem)] font-light leading-[1.15] mb-2">
        {property.projectName}
        {property.tower ? (
          <em className="italic text-gold not-italic"> · {property.tower}</em>
        ) : null}
      </h3>
      <p className="text-sm tracking-[0.15em] uppercase text-gray-dark mb-8">
        {property.unitType} · {property.floorAreaSqm} sqm · Turnover {property.turnoverDate}
      </p>

      <div
        className="w-full aspect-[16/10] bg-center bg-cover bg-no-repeat mb-10"
        style={{ backgroundImage: `url(${property.heroImageUrl})` }}
        aria-label={`${property.projectName} exterior`}
      />

      {block ? (
        <div className="mb-10 max-w-[720px]">
          <p className="eyebrow mb-4">Why I recommended this for you</p>
          <p className="font-serif italic text-xl md:text-2xl text-charcoal leading-[1.45]">
            {block.whyRecommended}
          </p>
        </div>
      ) : null}

      <div className="grid md:grid-cols-2 gap-10 md:gap-14 mb-12">
        <div>
          <p className="eyebrow mb-4">Selling Points</p>
          <ul className="space-y-3">
            {(block?.sellingPoints ?? property.sellingPoints).map((s) => (
              <li key={s} className="flex gap-3 text-[0.98rem] font-light leading-[1.7] text-gray-dark">
                <span className="text-gold mt-2">◆</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">Amenities</p>
          <ul className="space-y-3">
            {property.amenities.map((a) => (
              <li key={a} className="flex gap-3 text-[0.98rem] font-light leading-[1.7] text-gray-dark">
                <span className="text-gold mt-2">◆</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <PaymentCalculator property={property} />
    </article>
  );
}
