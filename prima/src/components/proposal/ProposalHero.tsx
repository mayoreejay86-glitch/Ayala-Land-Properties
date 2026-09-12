import type { Proposal } from "@/lib/types";

export function ProposalHero({ proposal }: { proposal: Proposal }) {
  const heroImg = proposal.properties[0]?.heroImageUrl;

  return (
    <header className="relative min-h-[80vh] md:min-h-[92vh] flex items-end overflow-hidden">
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: heroImg
            ? `linear-gradient(to bottom, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0.8) 100%), url(${heroImg})`
            : "linear-gradient(135deg, #1a1a1a 0%, #4a4540 100%)",
        }}
      />
      <div className="relative z-10 px-6 md:px-[60px] pb-20 md:pb-28 max-w-[1000px]">
        <p className="text-[0.7rem] tracking-[0.3em] uppercase text-gold-light mb-6 flex items-center gap-3.5 before:content-[''] before:block before:w-10 before:h-[1px] before:bg-gold-light">
          A private proposal for {proposal.brief.name}
        </p>
        <h1 className="font-serif text-[clamp(2.4rem,5.5vw,4.8rem)] font-light leading-[1.05] text-white mb-6">
          {proposal.copy.coverHeadline}
        </h1>
        <p className="text-base md:text-lg font-light text-white/85 leading-[1.75] max-w-[640px]">
          {proposal.copy.personalizedIntro}
        </p>
      </div>
    </header>
  );
}
