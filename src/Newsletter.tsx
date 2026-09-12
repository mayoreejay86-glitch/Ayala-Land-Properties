import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Sparkles, ArrowRight, Phone, Mail } from 'lucide-react';

// Real Parklinks images extracted from the ALP Marketing Materials Drive.
// Served from public/images/parklinks/ (Vite root) and prima/public/images/parklinks/ (Next.js).
const SKYLINE = "/images/parklinks/towers-dusk.jpg";
const TOWER = "/images/parklinks/3br-corner.jpg";
const ARCH = "/images/parklinks/living-area.jpg";
const WELLNESS = "/images/parklinks/master-bedroom.jpg";
const INVEST = "/images/parklinks/kitchen.jpg";

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="font-sans text-[0.7rem] tracking-[0.28em] uppercase text-gold flex items-center gap-3.5 before:content-[''] before:block before:w-8 before:h-[1px] before:bg-gold">
    {children}
  </p>
);

const Rule = () => (
  <div className="w-full h-[1px] bg-gold/40" />
);

const Newsletter = () => {
  return (
    <div className="newsletter bg-cream text-charcoal">
      {/* Masthead */}
      <header className="px-6 md:px-[60px] pt-10 pb-6">
        <div className="flex items-center justify-between text-[0.65rem] tracking-[0.28em] uppercase text-gray-dark/70 mb-5">
          <span className="font-serif text-base tracking-[0.08em] text-charcoal">
            Ayala Land <span className="text-gold">Premier</span>
          </span>
          <span className="hidden md:block">The Premier Journal</span>
          <span>Vol I · Issue 01 · May 2026</span>
        </div>
        <Rule />
      </header>

      {/* Hero */}
      <section className="relative h-[88vh] min-h-[620px] overflow-hidden flex items-end">
        <div
          className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat animate-hero-zoom"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(10,10,10,0.25) 0%, rgba(10,10,10,0.75) 100%), url('${SKYLINE}')`,
          }}
        />
        <div className="relative z-10 px-6 md:px-[60px] pb-24 max-w-[1000px]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            <p className="font-sans text-[0.7rem] tracking-[0.3em] uppercase text-gold-light mb-6 flex items-center gap-3.5 before:content-[''] before:block before:w-10 before:h-[1px] before:bg-gold-light">
              The Featured Address — Quezon City
            </p>
            <h1 className="font-serif text-[clamp(2.6rem,6vw,5.4rem)] font-light leading-[1.05] text-white mb-7">
              Where the City Meets<br />Its <em className="italic text-gold-light not-italic">Quiet Center</em>
            </h1>
            <p className="text-base md:text-lg font-light text-white/85 leading-[1.7] max-w-[600px] tracking-[0.02em]">
              An editorial introduction to Parklinks North &amp; South Tower —
              a residence shaped by greenery, geometry, and a generation of Ayala Land craftsmanship.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Editor's note */}
      <section className="px-6 md:px-[60px] py-24 md:py-32 max-w-[820px] mx-auto">
        <Eyebrow>A Letter from the Editor</Eyebrow>
        <h2 className="font-serif text-[clamp(1.9rem,3.4vw,2.8rem)] font-light leading-[1.25] text-charcoal mt-5 mb-8">
          For the discerning few who measure home in <em className="italic text-gold not-italic">decades</em>, not square meters.
        </h2>
        <div className="space-y-5 text-[1rem] font-light leading-[1.85] text-gray-dark">
          <p>
            To our investors, principals, and families — welcome to the first issue of The Premier Journal.
            This is a quiet conversation, written for the few who already know what they are looking for:
            a residence that holds its composure over time, an address whose meaning compounds with the years,
            and a partner who treats discretion as a standard, not a service.
          </p>
          <p>
            Inside, we look at one of the most considered new addresses in the metro, the shifting
            climate of Philippine luxury real estate, and a few quiet pleasures we believe make a
            residence feel like home.
          </p>
        </div>
        <p className="mt-10 font-serif italic text-lg text-charcoal">— Ree jay</p>
      </section>

      <div className="px-6 md:px-[60px]"><Rule /></div>

      {/* Featured Property — Parklinks */}
      <section className="px-6 md:px-[60px] py-24 md:py-32">
        <div className="max-w-[1240px] mx-auto">
          <Eyebrow>The Featured Property</Eyebrow>
          <div className="flex items-baseline justify-between flex-wrap gap-4 mt-5 mb-12">
            <h2 className="font-serif text-[clamp(2.2rem,4vw,3.4rem)] font-light leading-[1.15] text-charcoal max-w-[760px]">
              Parklinks <em className="italic text-gold not-italic">North &amp; South Tower</em>
            </h2>
            <p className="font-sans text-[0.78rem] tracking-[0.2em] uppercase text-gray-dark flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-gold" /> Quezon City · Pasig
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            <div className="relative aspect-[4/5] overflow-hidden">
              <div
                className="absolute inset-0 bg-center bg-cover bg-no-repeat"
                style={{ backgroundImage: `url('${TOWER}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <span className="absolute top-6 left-6 px-3 py-1 border border-white/70 text-white text-[0.65rem] tracking-[0.2em] uppercase backdrop-blur-sm">
                Pre-Selling
              </span>
            </div>

            <div className="md:pt-6">
              <p className="font-serif italic text-xl text-gold mb-6">
                A residence inside the greenest urban estate in the metro.
              </p>
              <div className="space-y-5 text-[0.98rem] font-light leading-[1.85] text-gray-dark">
                <p>
                  Set within a 35-hectare master-planned joint venture of Ayala Land and Eton
                  Properties — 52% of it open space — Parklinks North and South Tower offer a way
                  of living that very few addresses in the country can promise: calm, walkable,
                  and quietly cinematic at every hour.
                </p>
                <p>
                  Interiors are organized around long sightlines and natural light, with finishes
                  chosen for the way they age. Amenities are positioned to feel like a private
                  resort club, not a building lobby.
                </p>
              </div>

              <div className="mt-10 space-y-4">
                <div className="flex justify-between border-b border-gold/30 pb-3">
                  <span className="text-[0.72rem] tracking-[0.2em] uppercase text-gray-dark">Unit Sizes</span>
                  <span className="font-serif text-charcoal">70 – 306 sqm · 1BR to 4BR</span>
                </div>
                <div className="flex justify-between border-b border-gold/30 pb-3">
                  <span className="text-[0.72rem] tracking-[0.2em] uppercase text-gray-dark">Starting Price</span>
                  <span className="font-serif text-charcoal">from ~₱10.5M · up to ~₱125M</span>
                </div>
                <div className="flex justify-between border-b border-gold/30 pb-3">
                  <span className="text-[0.72rem] tracking-[0.2em] uppercase text-gray-dark">Turnover</span>
                  <span className="font-serif text-charcoal">North Q3 2026 · South Q2 2029</span>
                </div>
                <div className="flex justify-between border-b border-gold/30 pb-3">
                  <span className="text-[0.72rem] tracking-[0.2em] uppercase text-gray-dark">Signature Amenities</span>
                  <span className="font-serif text-charcoal text-right max-w-[60%]">45F Horizon Terrace · 10F Pool &amp; Fitness · 24/7 Concierge</span>
                </div>
              </div>

              <a
                href="#presentation"
                className="inline-flex items-center gap-3 mt-10 text-[0.75rem] tracking-[0.22em] uppercase text-charcoal border-b border-gold pb-1 hover:text-gold transition-colors"
              >
                Request the Full Brochure <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Stat strip */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 border-y border-gold/40 py-10">
            {[
              { label: 'Towers', value: '2' },
              { label: 'Floors Each', value: '55' },
              { label: 'Total Units', value: '593' },
              { label: 'Estate Size', value: '35 ha' },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`text-center px-4 ${i !== 0 ? 'md:border-l md:border-gold/30' : ''}`}
              >
                <p className="font-serif text-[1.4rem] font-light text-gold-light leading-tight">{s.value}</p>
                <p className="mt-2 text-[0.65rem] tracking-[0.25em] uppercase text-gray-dark">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Insights */}
      <section className="bg-white/60 px-6 md:px-[60px] py-24 md:py-32">
        <div className="max-w-[920px] mx-auto">
          <Eyebrow>Market Insights · Philippines · 2026</Eyebrow>
          <h2 className="font-serif text-[clamp(2rem,3.6vw,3rem)] font-light leading-[1.2] text-charcoal mt-5 mb-12">
            The luxury inventory is <em className="italic text-gold not-italic">quietly tightening</em>.
          </h2>

          <div className="grid md:grid-cols-2 gap-12 text-[1rem] font-light leading-[1.85] text-gray-dark">
            <div className="space-y-5">
              <p>
                Prime supply across Makati, BGC, and the new Ortigas–Quezon City corridor has
                continued to thin through the last twenty-four months. Developers with land
                banks of estate-scale quality are now the exception, not the norm.
              </p>
              <p>
                At the same time, the country's high-net-worth population has grown faster than
                premier inventory can replace itself — and a meaningful share of that demand is
                being placed by Filipino principals returning home, not foreign capital.
              </p>
            </div>
            <div className="space-y-5">
              <p>
                Ayala Land's premier portfolio sits at the centre of this shift. Estate-driven
                projects like Parklinks remain among the few where land, design, and stewardship
                are held by one institution from masterplan to turnover.
              </p>
              <p>
                For long-horizon buyers, the question has moved from <em className="italic">where to buy</em>{' '}
                to <em className="italic">whether a comparable address will still be available next year</em>.
              </p>
            </div>
          </div>

          <blockquote className="mt-16 border-l-2 border-gold pl-8 font-serif italic text-[clamp(1.4rem,2.2vw,1.9rem)] font-light leading-[1.35] text-charcoal max-w-[760px]">
            "The most resilient addresses in this market are the ones that were never sold on price."
          </blockquote>
        </div>
      </section>

      {/* Lifestyle */}
      <section className="px-6 md:px-[60px] py-24 md:py-32">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <div>
              <Eyebrow>The Lifestyle</Eyebrow>
              <h2 className="font-serif text-[clamp(2rem,3.6vw,3rem)] font-light leading-[1.2] text-charcoal mt-5 max-w-[640px]">
                Three quiet pleasures of a Parklinks address.
              </h2>
            </div>
            <p className="font-serif italic text-gray-dark max-w-[320px]">
              Architecture, wellness, and the long view — the things a residence is finally judged on.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                img: ARCH,
                eyebrow: 'Architecture',
                title: 'A design language that ages well.',
                body: 'Long horizontal lines, deep shaded balconies, and a restrained material palette — interiors built to feel current a decade from now, not just on turnover day.',
              },
              {
                img: WELLNESS,
                eyebrow: 'Wellness',
                title: 'A green spine instead of a corridor.',
                body: 'Parklinks is organised around a continuous park, not a road. Residents wake up to tree canopy, walk to coffee under shade, and step out of the lobby into something closer to a botanical garden than a driveway.',
              },
              {
                img: INVEST,
                eyebrow: 'Investment Trends',
                title: 'Quezon City as the next premier corridor.',
                body: 'Infrastructure, schools, and head offices have all moved north. The Ortigas–QC line is quietly becoming the metro\'s third premier address after Makati and BGC — and unit prices still reflect the older perception.',
              },
            ].map((c) => (
              <motion.article
                key={c.eyebrow}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden mb-7">
                  <div
                    className="w-full h-full bg-center bg-cover bg-no-repeat transition-transform duration-700 hover:scale-105"
                    style={{ backgroundImage: `url('${c.img}')` }}
                  />
                </div>
                <div className="w-10 h-[1px] bg-gold mb-4" />
                <p className="text-[0.65rem] tracking-[0.25em] uppercase text-gold mb-3">{c.eyebrow}</p>
                <h3 className="font-serif text-[1.55rem] font-light text-charcoal leading-tight mb-4">
                  {c.title}
                </h3>
                <p className="text-[0.95rem] font-light leading-[1.8] text-gray-dark">{c.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Matters — charcoal panel */}
      <section className="bg-charcoal text-white px-6 md:px-[60px] py-28 md:py-36">
        <div className="max-w-[1100px] mx-auto">
          <p className="font-sans text-[0.7rem] tracking-[0.3em] uppercase text-gold-light mb-6 flex items-center gap-3.5 before:content-[''] before:block before:w-10 before:h-[1px] before:bg-gold-light">
            Why This Matters
          </p>
          <h2 className="font-serif text-[clamp(2.2rem,4vw,3.4rem)] font-light leading-[1.15] mb-16 max-w-[820px]">
            The value of a premier address is not what it costs today — it is what it <em className="italic text-gold-light not-italic">cannot be replicated</em> tomorrow.
          </h2>

          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            {[
              {
                n: '01',
                title: 'Compounding Value',
                body: 'Estate-led Ayala addresses have historically held and grown their value through every market cycle — because the land, the design, and the standard of stewardship are not separable.',
              },
              {
                n: '02',
                title: 'Genuine Scarcity',
                body: 'There are only so many ways to assemble 35 hectares of contiguous prime land inside the metro. Parklinks is one of the last of its kind, not the first of many.',
              },
              {
                n: '03',
                title: 'The Ayala Legacy',
                body: 'For more than eight decades, Ayala Land has built the addresses Filipino families pass to the next generation. The brand is not a marketing line — it is the resale value.',
              },
            ].map((p) => (
              <div key={p.n}>
                <p className="font-serif text-[2.4rem] font-light text-gold-light leading-none mb-5">{p.n}</p>
                <h3 className="font-serif text-[1.4rem] font-light text-white mb-4">{p.title}</h3>
                <p className="text-[0.95rem] font-light leading-[1.8] text-white/70">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Private Presentation */}
      <section id="presentation" className="px-6 md:px-[60px] py-28 md:py-36 text-center">
        <div className="max-w-[760px] mx-auto">
          <Sparkles className="w-6 h-6 text-gold mx-auto mb-6" />
          <p className="font-sans text-[0.7rem] tracking-[0.3em] uppercase text-gold mb-6">
            A Private Invitation
          </p>
          <h2 className="font-serif text-[clamp(2rem,3.8vw,3rem)] font-light leading-[1.2] text-charcoal mb-7">
            Schedule a private viewing of <em className="italic text-gold not-italic">Parklinks North &amp; South Tower</em>.
          </h2>
          <p className="text-[1rem] font-light leading-[1.8] text-gray-dark max-w-[560px] mx-auto mb-12">
            Presentations are held in our private sales lounge, by appointment.
            Floor plans, pricing, and turnover details are walked through personally — not sent in bulk.
          </p>

          <a
            href="mailto:reejay@ayalalandpremier.ph"
            className="inline-block px-12 py-4 border border-gold text-gold text-[0.75rem] tracking-[0.22em] uppercase font-medium transition-all duration-300 hover:bg-gold hover:text-white"
          >
            Request a Private Presentation
          </a>

          <div className="mt-10 flex items-center justify-center gap-8 text-[0.78rem] tracking-[0.12em] uppercase text-gray-dark">
            <span className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-gold" /> [PLACEHOLDER: phone]</span>
            <span className="hidden md:block w-[1px] h-4 bg-gold/40" />
            <span className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-gold" /> [PLACEHOLDER: email]</span>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="px-6 md:px-[60px] pb-28 md:pb-36">
        <div className="max-w-[760px] mx-auto text-center">
          <Rule />
          <p className="mt-12 text-[1rem] font-light leading-[1.9] text-gray-dark italic font-serif">
            Thank you for the time you spent with this issue. A residence of this caliber is rarely
            a transaction — it is a relationship that begins long before the first viewing and
            continues long after turnover. Whenever you are ready, I would be honoured to walk
            you through it personally.
          </p>
          <p className="mt-10 font-serif italic text-[1.15rem] text-charcoal">
            Presented by <span className="text-gold not-italic font-normal">Ree jay</span> | Ayala Land Premier
          </p>
        </div>
      </section>

      <footer className="px-6 md:px-[60px] py-8 border-t border-gold/30 flex items-center justify-between text-[0.65rem] tracking-[0.25em] uppercase text-gray-dark/70">
        <span>Ayala Land Premier — The Premier Journal</span>
        <span>© 2026 · For private circulation</span>
      </footer>
    </div>
  );
};

export default Newsletter;
