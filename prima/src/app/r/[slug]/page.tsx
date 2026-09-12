import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DEMO_PROPOSAL } from "@/data/demo";
import type { Proposal } from "@/lib/types";
import { ProposalHero } from "@/components/proposal/ProposalHero";
import { PropertyCard } from "@/components/proposal/PropertyCard";
import { ShareCTA } from "@/components/proposal/ShareCTA";

// Once Supabase is wired up, replace this with a real DB read.
async function loadProposal(slug: string): Promise<Proposal | null> {
  if (slug === DEMO_PROPOSAL.slug) return DEMO_PROPOSAL;
  return null;
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const p = await loadProposal(slug);
  if (!p) return { title: "Proposal not found" };

  const title = `A private proposal for ${p.brief.name}`;
  const description = p.copy.personalizedIntro.slice(0, 180);
  const image = p.properties[0]?.heroImageUrl;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [image] : undefined,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function ProposalPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const proposal = await loadProposal(slug);
  if (!proposal) notFound();

  const propertyBlock = (id: string) =>
    proposal.copy.propertyBlocks.find((b) => b.propertyId === id);

  return (
    <main className="bg-cream text-charcoal">
      <ProposalHero proposal={proposal} />

      {/* Reflected brief — trust signal */}
      <section className="px-6 md:px-[60px] py-20 md:py-28 max-w-[900px] mx-auto">
        <p className="eyebrow mb-5">Here's what I heard you're looking for</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-gold/40 py-8">
          <Brief label="Budget" value={`₱${(proposal.brief.budgetInPhp / 1_000_000).toFixed(1)}M`} />
          <Brief label="Use" value={useCaseLabel(proposal.brief.useCase)} />
          {proposal.brief.bedroomsWanted ? (
            <Brief label="Bedrooms" value={`${proposal.brief.bedroomsWanted}BR`} />
          ) : null}
          {proposal.brief.locationPref ? (
            <Brief label="Location" value={proposal.brief.locationPref} />
          ) : null}
          {proposal.brief.timeline ? (
            <Brief label="Timeline" value={proposal.brief.timeline} />
          ) : null}
        </div>
        {proposal.brief.notes ? (
          <p className="mt-8 font-serif italic text-lg text-gray-dark max-w-[720px]">
            "{proposal.brief.notes}"
          </p>
        ) : null}
      </section>

      {/* Options */}
      <section className="px-6 md:px-[60px] py-16 md:py-24 max-w-[1100px] mx-auto">
        {proposal.properties.map((prop, i) => (
          <PropertyCard
            key={prop.id}
            property={prop}
            block={propertyBlock(prop.id)}
            index={i}
          />
        ))}
      </section>

      {/* Comparison insight */}
      {proposal.copy.comparisonInsight ? (
        <section className="px-6 md:px-[60px] py-20 md:py-28 bg-charcoal text-white">
          <div className="max-w-[820px] mx-auto">
            <p className="text-[0.7rem] tracking-[0.3em] uppercase text-gold-light mb-6 flex items-center gap-3.5 before:content-[''] before:block before:w-10 before:h-[1px] before:bg-gold-light">
              How they compare
            </p>
            <p className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] font-light leading-[1.4]">
              {proposal.copy.comparisonInsight}
            </p>
          </div>
        </section>
      ) : null}

      {/* Closing + CTA */}
      <section className="px-6 md:px-[60px] py-24 md:py-32 text-center max-w-[820px] mx-auto">
        <p className="eyebrow mb-6 justify-center">Next Step</p>
        <p className="font-serif italic text-xl md:text-2xl text-charcoal leading-[1.6] mb-10 max-w-[640px] mx-auto">
          {proposal.copy.closingLine}
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <a
            href={`viber://chat?number=${proposal.agentContact.phone.replace(/[^+\d]/g, "")}`}
            className="px-10 py-4 bg-charcoal text-white text-[0.72rem] tracking-[0.22em] uppercase font-medium hover:bg-gold transition-colors"
          >
            Chat on Viber
          </a>
          <a
            href={`mailto:${proposal.agentContact.email}?subject=${encodeURIComponent(`Re: private proposal`)}`}
            className="px-10 py-4 border border-gold text-charcoal text-[0.72rem] tracking-[0.22em] uppercase font-medium hover:bg-gold hover:text-white transition-colors"
          >
            Email {proposal.agentName}
          </a>
          <a
            href={`tel:${proposal.agentContact.phone.replace(/[^+\d]/g, "")}`}
            className="px-10 py-4 border border-gold text-charcoal text-[0.72rem] tracking-[0.22em] uppercase font-medium hover:bg-gold hover:text-white transition-colors"
          >
            Book a Private Viewing
          </a>
        </div>

        <div className="border-t border-gold/40 pt-10 mt-4">
          <p className="text-[0.65rem] tracking-[0.25em] uppercase text-gray-mid mb-2">
            Presented by
          </p>
          <p className="font-serif italic text-lg text-charcoal">
            <span className="text-gold not-italic">{proposal.agentName}</span> · Ayala Land Premier
          </p>
        </div>

        {/* Agent share bar — only meaningful when the agent is viewing their own proposal */}
        <div className="mt-14 pt-10 border-t border-gold/30">
          <p className="text-[0.65rem] tracking-[0.2em] uppercase text-gray-mid mb-5">
            Agent view · share this proposal
          </p>
          <ShareCTA proposal={proposal} />
        </div>
      </section>
    </main>
  );
}

function Brief({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[0.6rem] tracking-[0.25em] uppercase text-gray-dark">{label}</p>
      <p className="font-serif text-lg text-charcoal mt-1">{value}</p>
    </div>
  );
}

function useCaseLabel(u: Proposal["brief"]["useCase"]): string {
  switch (u) {
    case "primary": return "Primary home";
    case "investment": return "Investment";
    case "vacation": return "Second home";
    case "family": return "Family residence";
  }
}
