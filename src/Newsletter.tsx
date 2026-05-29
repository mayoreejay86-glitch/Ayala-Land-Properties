import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Waves,
  Trees,
  Building2,
  Mountain,
  Car,
  Maximize,
  Layers,
  TrendingUp,
  Phone,
  Mail,
  Instagram,
  Facebook,
  MessageCircle,
  Sparkles,
  Compass,
  Check,
} from 'lucide-react';

// Property specialist's live website — all primary CTAs route here.
const SITE = 'https://ayalapremierph.com';

/* =========================================================================
   AYALA LAND PREMIER — PARKLINKS NORTH & SOUTH TOWERS
   A luxury editorial newsletter for ultra-high-net-worth clientele.

   ART DIRECTION NOTE (for the production / photography team)
   ----------------------------------------------------------
   • Palette: ink black, paper white, champagne gold (#D4AF37) over warm
     neutrals. Generous negative space. Editorial, never salesy.
   • Type pairing: Cormorant Garamond (display, light italics) + Jost
     (sans, wide tracking, uppercase eyebrows). Pairs with Apple-grade
     restraint and Aman-grade warmth.
   • Photography: shoot golden-hour and blue-hour only. Long lenses for
     skyline compression, architectural symmetry, glass reflections,
     river esplanade leading lines. People sparingly, always in motion.
   • Each <figure> below carries a `data-art-note` and an on-page italic
     caption describing the *recommended* hero/asset to drop in.
   ========================================================================= */

// --- Image library (placeholders — swap for ALP renders/photography) ---
const IMG = {
  heroSkyline:
    'https://images.unsplash.com/photo-1545459720-aac8509eb02c?w=2000&q=85',
  estate:
    'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=85',
  esplanade:
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600&q=85',
  northTower:
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1400&q=85',
  southTower:
    'https://images.unsplash.com/photo-1431576901776-e539bd916ba2?w=1400&q=85',
  interior:
    'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1600&q=85',
  lifestylePool:
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&q=85',
  lifestyleLounge:
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=85',
  engineering:
    'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1600&q=85',
  closing:
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=2000&q=85',
};

// --- Small primitives -----------------------------------------------------

const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}> = ({ children, delay = 0, y = 36, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const Eyebrow = ({
  children,
  light = false,
  center = false,
}: {
  children: React.ReactNode;
  light?: boolean;
  center?: boolean;
}) => (
  <p
    className={`text-[0.7rem] tracking-[0.32em] uppercase mb-5 flex items-center gap-3.5 ${
      center ? 'justify-center' : ''
    } ${light ? 'text-gold-light' : 'text-gold'}`}
  >
    <span
      className={`block w-9 h-[1px] ${light ? 'bg-gold-light' : 'bg-gold'}`}
    />
    {children}
  </p>
);

// --- Caption for art-direction notes (doubles as editorial caption) -------
const ArtCaption = ({ children }: { children: React.ReactNode }) => (
  <figcaption className="mt-3 text-[0.7rem] tracking-[0.14em] uppercase text-gray-mid font-light flex items-center gap-2">
    <span className="w-1 h-1 rounded-full bg-gold/70 inline-block" />
    {children}
  </figcaption>
);

// --- Top bar + Navigation --------------------------------------------------

const AnnouncementBar = () => (
  <div className="bg-charcoal px-6 md:px-[60px] py-2.5 flex items-center justify-center gap-3 text-[0.66rem] tracking-[0.28em] uppercase text-white/80 font-medium">
    <span className="w-1.5 h-1.5 bg-gold rounded-full animate-blink" />
    Ayala Land Premier · Parklinks Estate · Private Preview — 2026
    <span className="w-1.5 h-1.5 bg-gold rounded-full animate-blink" />
  </div>
);

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    ['The Estate', 'estate'],
    ['The Towers', 'towers'],
    ['Residences', 'residences'],
    ['Lifestyle', 'lifestyle'],
    ['Engineering', 'engineering'],
    ['Investment', 'investment'],
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[900] flex items-center justify-between px-6 md:px-[60px] transition-all duration-500 ${
        scrolled
          ? 'bg-cream/95 backdrop-blur-xl py-4 border-b border-gray-light'
          : 'py-6'
      }`}
    >
      <a
        href="#top"
        className={`font-serif font-light text-[1.45rem] tracking-[0.12em] transition-colors duration-500 ${
          scrolled ? 'text-charcoal' : 'text-white'
        }`}
      >
        PARKLINKS<span className="text-gold"> · </span>
        <span className={scrolled ? 'text-gray-dark' : 'text-white/70'}>
          Towers
        </span>
      </a>
      <ul className="hidden lg:flex items-center gap-8 list-none">
        {links.map(([label, id]) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`text-[0.7rem] tracking-[0.2em] uppercase font-medium transition-colors duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-gold after:transition-all after:duration-300 hover:after:w-full hover:text-gold ${
                scrolled ? 'text-gray-dark' : 'text-white/85'
              }`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
      <a
        href={SITE}
        target="_blank"
        rel="noreferrer"
        className={`px-6 py-2.5 border text-[0.66rem] tracking-[0.2em] uppercase font-medium transition-all duration-300 hover:bg-gold hover:border-gold hover:text-white ${
          scrolled ? 'border-gold text-gold' : 'border-white/50 text-white'
        }`}
      >
        Private Presentation
      </a>
    </nav>
  );
};

// --- 1. HERO ---------------------------------------------------------------

const Hero = () => (
  <section
    id="top"
    className="relative h-screen min-h-[680px] overflow-hidden flex items-end"
  >
    <div
      className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat animate-ken-burns"
      style={{ backgroundImage: `url('${IMG.heroSkyline}')` }}
      data-art-note="HERO — Parklinks Estate at blue hour: both towers lit against an Ortigas–Antipolo skyline, river esplanade leading the eye, faint warm glow from amenity decks."
    />
    {/* Cinematic gradient + skyline darkening */}
    <div className="absolute inset-0 z-0 bg-[linear-gradient(to_bottom,rgba(10,10,10,0.35)_0%,rgba(10,10,10,0.1)_38%,rgba(10,10,10,0.78)_100%)]" />
    <div className="absolute inset-0 z-0 texture-grain opacity-40" />

    <div className="relative z-10 px-6 md:px-[60px] pb-24 md:pb-28 max-w-[940px]">
      <motion.div
        initial={{ opacity: 0, y: 44 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[0.7rem] tracking-[0.34em] uppercase text-gold-light mb-6 flex items-center gap-3.5">
          <span className="block w-10 h-[1px] bg-gold" />
          Ayala Land Premier — Parklinks North &amp; South Towers
        </p>
        <h1 className="font-serif text-[clamp(2.8rem,6.4vw,5.8rem)] font-light leading-[1.05] text-white mb-7">
          Life Above the City.
          <br />
          <span className="italic gold-shimmer">Beyond Expectation.</span>
        </h1>
        <p className="text-base md:text-[1.05rem] font-light text-white/85 leading-[1.8] mb-11 max-w-[560px] tracking-[0.02em]">
          Discover Parklinks Towers — Ayala Land Premier&rsquo;s iconic
          residential address within Metro Manila&rsquo;s first true
          sustainable urban estate.
        </p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <a
            href={SITE}
            target="_blank"
            rel="noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            Schedule a Private Presentation
            <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#towers" className="btn-ghost">
            Explore the Towers
          </a>
        </div>
      </motion.div>
    </div>

    <div className="absolute bottom-10 right-[60px] z-10 hidden md:flex flex-col items-center gap-2.5">
      <div className="w-[1px] h-[60px] bg-white/30 animate-scroll-pulse" />
      <span className="text-[0.6rem] tracking-[0.25em] uppercase text-white/60 [writing-mode:vertical-rl]">
        Scroll
      </span>
    </div>
  </section>
);

// --- Estate fact strip -----------------------------------------------------

const FactStrip = () => {
  const facts = [
    ['35 ha', 'Master-Planned Estate'],
    ['First', 'PH Estate with River Esplanade'],
    ['2', 'Cities — Quezon City & Pasig'],
    ['10%', 'Reserved Green Open Space'],
  ];
  return (
    <div className="bg-charcoal texture-grain px-6 md:px-[60px] py-10 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
      {facts.map(([n, l], i) => (
        <Reveal key={l} delay={i * 0.08} y={20}>
          <div className="text-center md:text-left md:pl-6 md:border-l md:border-white/10 first:border-0">
            <div className="font-serif text-[2.4rem] md:text-[2.8rem] font-light text-gold-light leading-none mb-2">
              {n}
            </div>
            <div className="text-[0.66rem] tracking-[0.18em] uppercase text-white/55 leading-snug">
              {l}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
};

// --- 2. INTRODUCTION STORY -------------------------------------------------

const Story = () => (
  <section id="estate" className="bg-cream px-6 md:px-[60px] py-24 md:py-32">
    <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-16 lg:gap-24 items-center">
      <div>
        <Reveal>
          <Eyebrow>The Rise of Parklinks</Eyebrow>
          <h2 className="font-serif text-[clamp(2rem,4.2vw,3.4rem)] font-light leading-[1.18] text-charcoal mb-8">
            Where two cities meet,
            <br />
            <span className="italic text-gold">a new estate rises.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="drop-cap text-[1.02rem] font-light leading-[1.95] text-gray-dark mb-6">
            Along the banks of the Marikina River, where Quezon City meets
            Pasig, Ayala Land has drawn the blueprint for Metro Manila&rsquo;s
            next premier address. Parklinks is not another tower on a busy
            avenue. It is a 35-hectare estate conceived as a single, living
            organism — green, walkable, and intelligently connected to the
            corridors that move the capital.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-[1.02rem] font-light leading-[1.95] text-gray-dark mb-6">
            Here, the country&rsquo;s first river esplanade traces a quiet
            promenade through the estate. Parklinks Mall gathers the day&rsquo;s
            rituals beneath a single roof. Generous green open spaces soften the
            skyline, and seamless connectivity to C5, Ortigas, BGC, and Makati
            keeps the entire city within easy reach.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-[1.02rem] font-light leading-[1.95] text-gray-dark">
            Rising at its heart are the Parklinks North and South Towers — the
            estate&rsquo;s definitive residential statement, and the unmistakable
            signature of Ayala Land Premier craftsmanship.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <figure>
          <div className="relative aspect-[4/5] overflow-hidden group">
            <img
              src={IMG.estate}
              alt="Parklinks Estate masterplan"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-[1600ms] group-hover:scale-105"
              data-art-note="Aerial of the estate threaded by the river esplanade — drone, golden hour, towers rising from a green canopy."
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-gold/15 to-transparent" />
          </div>
          <ArtCaption>
            Recommended: aerial of the estate &amp; river esplanade, golden hour
          </ArtCaption>
        </figure>
      </Reveal>
    </div>

    {/* Estate pillars */}
    <div className="max-w-[1240px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-light mt-20 border border-gray-light">
      {[
        [<Waves className="w-5 h-5" />, 'River Esplanade', 'A landscaped riverfront promenade — the first of its kind in the country.'],
        [<Building2 className="w-5 h-5" />, 'Parklinks Mall', 'Curated retail, dining, and everyday rituals, minutes from your door.'],
        [<Trees className="w-5 h-5" />, 'Green Open Spaces', 'Parks, pocket gardens, and tree-lined walks woven through the estate.'],
        [<Compass className="w-5 h-5" />, 'Seamless Connectivity', 'Direct links to C5, Ortigas, BGC, and Makati — the city, made effortless.'],
      ].map(([icon, title, text], i) => (
        <Reveal key={i} delay={i * 0.08} y={20}>
          <div className="bg-cream p-8 h-full group transition-colors duration-500 hover:bg-white">
            <div className="w-11 h-11 border border-gold/40 flex items-center justify-center text-gold mb-5 transition-colors duration-300 group-hover:border-gold">
              {icon}
            </div>
            <h4 className="font-serif text-[1.2rem] font-normal mb-2.5">{title as string}</h4>
            <p className="text-[0.85rem] leading-[1.7] text-gray-dark font-light">
              {text as string}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

// --- 3. THE TOWERS ---------------------------------------------------------

const FloorLegend = ({ light = false }: { light?: boolean }) => {
  const floors = [
    ['Sky Floors', 'The crown of the tower — uninterrupted panoramas across the Antipolo range, Ortigas, and the city beyond.'],
    ['Horizon Floors', 'The estate&rsquo;s vantage — sweeping skyline and river esplanade views framed by generous balconies.'],
    ['Classic Floors', 'Grounded elegance — verdant estate and cityscape outlooks, the everyday made exceptional.'],
  ];
  return (
    <div className="flex flex-col gap-5">
      {floors.map(([t, d], i) => (
        <div key={i} className="flex items-start gap-4">
          <Layers
            className={`w-5 h-5 mt-1 shrink-0 ${light ? 'text-gold-light' : 'text-gold'}`}
          />
          <div>
            <div
              className={`font-serif text-[1.15rem] ${light ? 'text-white' : 'text-charcoal'}`}
            >
              {t}
            </div>
            <p
              className={`text-[0.85rem] leading-[1.65] font-light mt-1 ${
                light ? 'text-white/55' : 'text-gray-dark'
              }`}
              dangerouslySetInnerHTML={{ __html: d }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const Towers = () => (
  <section id="towers">
    {/* NORTH TOWER — dark */}
    <div className="bg-charcoal texture-grain grid grid-cols-1 lg:grid-cols-2">
      <Reveal className="order-2 lg:order-1">
        <figure className="h-full">
          <div className="relative h-full min-h-[420px] lg:min-h-[680px] overflow-hidden group">
            <img
              src={IMG.northTower}
              alt="Parklinks North Tower"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] group-hover:scale-105"
              data-art-note="North Tower portrait — upward hero angle at dusk, glass reflecting the last light, Antipolo ridge faint behind."
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <ArtCaption>North Tower — dusk hero, upward angle</ArtCaption>
            </div>
          </div>
        </figure>
      </Reveal>
      <div className="order-1 lg:order-2 px-8 md:px-16 lg:px-20 py-20 lg:py-24 flex flex-col justify-center">
        <Reveal>
          <Eyebrow light>Parklinks North Tower</Eyebrow>
          <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] font-light leading-[1.15] text-white mb-6">
            The estate&rsquo;s
            <br />
            <span className="italic text-gold-light">northern crown.</span>
          </h2>
          <p className="text-[0.98rem] font-light leading-[1.9] text-white/65 mb-10 max-w-[480px]">
            Commanding the estate&rsquo;s northern frontier, the North Tower
            opens to the dramatic Antipolo Mountain Range and the glittering
            Ortigas skyline. A low-density address of expansive cuts and refined
            finishes — engineered for the long horizon of a family&rsquo;s
            legacy.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <FloorLegend light />
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex flex-wrap gap-x-8 gap-y-3 mt-10 pt-8 border-t border-white/10">
            {[
              [<Mountain className="w-4 h-4" />, 'Antipolo Range Views'],
              [<Building2 className="w-4 h-4" />, 'Ortigas Skyline'],
              [<Waves className="w-4 h-4" />, 'River Esplanade'],
            ].map(([ic, l], i) => (
              <span
                key={i}
                className="flex items-center gap-2.5 text-[0.74rem] tracking-[0.12em] uppercase text-white/70"
              >
                <span className="text-gold-light">{ic}</span>
                {l as string}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </div>

    {/* SOUTH TOWER — light */}
    <div className="bg-cream grid grid-cols-1 lg:grid-cols-2">
      <div className="px-8 md:px-16 lg:px-20 py-20 lg:py-24 flex flex-col justify-center">
        <Reveal>
          <Eyebrow>Parklinks South Tower</Eyebrow>
          <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] font-light leading-[1.15] text-charcoal mb-6">
            The estate&rsquo;s
            <br />
            <span className="italic text-gold">southern light.</span>
          </h2>
          <p className="text-[0.98rem] font-light leading-[1.9] text-gray-dark mb-10 max-w-[480px]">
            Poised toward the estate&rsquo;s green core and the river
            esplanade, the South Tower captures soft southern light across
            spacious, light-filled interiors. Fewer residences per floor,
            generous balconies, and the quiet confidence of Ayala Land Premier
            design — a private sanctuary at the centre of the city.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <FloorLegend />
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex flex-wrap gap-x-8 gap-y-3 mt-10 pt-8 border-t border-gray-light">
            {[
              [<Building2 className="w-4 h-4" />, 'Panoramic Skyline'],
              [<Trees className="w-4 h-4" />, 'Estate Greenery'],
              [<Waves className="w-4 h-4" />, 'River Esplanade'],
            ].map(([ic, l], i) => (
              <span
                key={i}
                className="flex items-center gap-2.5 text-[0.74rem] tracking-[0.12em] uppercase text-gray-dark"
              >
                <span className="text-gold">{ic}</span>
                {l as string}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
      <Reveal>
        <figure className="h-full">
          <div className="relative h-full min-h-[420px] lg:min-h-[680px] overflow-hidden group">
            <img
              src={IMG.southTower}
              alt="Parklinks South Tower"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] group-hover:scale-105"
              data-art-note="South Tower portrait — morning light, balconies catching shadow, green estate at base."
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <ArtCaption>South Tower — morning light, balcony detail</ArtCaption>
            </div>
          </div>
        </figure>
      </Reveal>
    </div>
  </section>
);

// --- 4. UNIT COLLECTIONS ---------------------------------------------------

type Unit = {
  name: string;
  size: string;
  floor: 'Sky Floors' | 'Horizon Floors' | 'Classic Floors';
  parking: string;
  balcony: string;
  desc: string;
};

const RESIDENCES: Record<'North' | 'South', Unit[]> = {
  North: [
    {
      name: '4BR Sky Villa',
      size: '306 sqm',
      floor: 'Sky Floors',
      parking: '3 parking slots',
      balcony: 'Wraparound sky balcony',
      desc: 'The pinnacle residence of the North Tower — a four-bedroom estate in the sky, drawn for multi-generational living above the Antipolo range.',
    },
    {
      name: '3BR West Sky Suite',
      size: '267–268 sqm',
      floor: 'Sky Floors',
      parking: '2–3 parking slots',
      balcony: 'West-facing sunset balcony',
      desc: 'Oriented to the western horizon, where the day closes over Ortigas in gold. Expansive, light-filled, unmistakably rare.',
    },
    {
      name: '3BR East Sky Suite',
      size: '232 sqm',
      floor: 'Sky Floors',
      parking: '2 parking slots',
      balcony: 'East-facing sunrise balcony',
      desc: 'A residence that wakes with the mountains — morning light over the Antipolo range, framed by floor-to-ceiling glass.',
    },
    {
      name: '3BR Horizon Villa',
      size: '282 sqm',
      floor: 'Horizon Floors',
      parking: '2–3 parking slots',
      balcony: 'Extended horizon terrace',
      desc: 'A villa-scale layout on the estate&rsquo;s most coveted vantage — generous proportions for the family that entertains with intention.',
    },
    {
      name: '3BR Horizon Terrace Suite',
      size: '270 sqm',
      floor: 'Horizon Floors',
      parking: '2 parking slots',
      balcony: 'Signature wide terrace',
      desc: 'Built around its terrace — an outdoor room suspended above the river esplanade, where evenings linger.',
    },
    {
      name: '3BR Grand Horizon Suite',
      size: '231 sqm',
      floor: 'Horizon Floors',
      parking: '2 parking slots',
      balcony: 'Grand balcony',
      desc: 'Three bedrooms of considered grandeur, with sightlines that sweep from skyline to mountain in a single turn.',
    },
    {
      name: '2BR Horizon Suite',
      size: '143–160 sqm',
      floor: 'Horizon Floors',
      parking: '1–2 parking slots',
      balcony: 'Full-width balcony',
      desc: 'A refined two-bedroom for the discerning couple or pied-à-terre — efficient, elegant, and view-forward.',
    },
    {
      name: '3BR Corner Residence',
      size: '198 sqm',
      floor: 'Classic Floors',
      parking: '2 parking slots',
      balcony: 'Dual-aspect corner balcony',
      desc: 'A coveted corner cut with light on two faces — privacy, cross-ventilation, and panoramic ease.',
    },
    {
      name: '1BR Classic Residence',
      size: '70–72 sqm',
      floor: 'Classic Floors',
      parking: '1 parking slot',
      balcony: 'Private balcony',
      desc: 'The Ayala Land Premier entry point — a generous one-bedroom that lives larger than its number, ideal for the investor and the urbanite.',
    },
  ],
  South: [
    {
      name: '3BR Sky Villa',
      size: '269 sqm',
      floor: 'Sky Floors',
      parking: '2–3 parking slots',
      balcony: 'Wraparound sky balcony',
      desc: 'The South Tower&rsquo;s flagship — a three-bedroom villa crowning the building, with the city laid out in full.',
    },
    {
      name: '3BR Sky Suite',
      size: '217 sqm',
      floor: 'Sky Floors',
      parking: '2 parking slots',
      balcony: 'Sky balcony',
      desc: 'Elevated living at its most assured — three bedrooms framed by uninterrupted southern panoramas.',
    },
    {
      name: '2BR Sky Suite',
      size: '161 sqm',
      floor: 'Sky Floors',
      parking: '1–2 parking slots',
      balcony: 'Sky balcony',
      desc: 'A two-bedroom in the clouds — compact in nothing but footprint, expansive in outlook.',
    },
    {
      name: '3BR Horizon Villa',
      size: '286 sqm',
      floor: 'Horizon Floors',
      parking: '2–3 parking slots',
      balcony: 'Extended horizon terrace',
      desc: 'The largest cut in the South Tower — a horizon-level villa for the family that measures home in generations.',
    },
    {
      name: '3BR Horizon Suite',
      size: '208–217 sqm',
      floor: 'Horizon Floors',
      parking: '2 parking slots',
      balcony: 'Full-width balcony',
      desc: 'Three bedrooms of balanced proportion, opening to estate greenery and the river esplanade below.',
    },
    {
      name: '2BR Horizon Suite',
      size: '157–161 sqm',
      floor: 'Horizon Floors',
      parking: '1–2 parking slots',
      balcony: 'Full-width balcony',
      desc: 'A graceful two-bedroom at the estate&rsquo;s most photogenic elevation — light, air, and a view that never tires.',
    },
    {
      name: '2BR Corner Residence',
      size: '160 sqm',
      floor: 'Classic Floors',
      parking: '1–2 parking slots',
      balcony: 'Dual-aspect corner balcony',
      desc: 'A dual-aspect corner home — two-bedroom privacy with light and outlook on every side.',
    },
    {
      name: '1BR Classic Residence',
      size: '70–71 sqm',
      floor: 'Classic Floors',
      parking: '1 parking slot',
      balcony: 'Private balcony',
      desc: 'An elegant one-bedroom address — the most accessible entry into Parklinks, and a quietly compelling investment.',
    },
  ],
};

const floorTone: Record<Unit['floor'], string> = {
  'Sky Floors': 'text-gold-light border-gold-light/50',
  'Horizon Floors': 'text-gold border-gold/50',
  'Classic Floors': 'text-gray-mid border-gray-mid/50',
};

const UnitCard: React.FC<{ unit: Unit; index: number }> = ({ unit, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    className="group bg-white border border-gray-light p-8 md:p-9 flex flex-col transition-all duration-500 hover:border-gold/60 hover:shadow-[0_24px_60px_-30px_rgba(184,150,12,0.35)] hover:-translate-y-1"
  >
    <div className="flex items-center justify-between mb-5">
      <span
        className={`text-[0.6rem] tracking-[0.2em] uppercase px-3 py-1 border ${floorTone[unit.floor]}`}
      >
        {unit.floor}
      </span>
      <ArrowUpRight className="w-5 h-5 text-gray-mid transition-all duration-300 group-hover:text-gold group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </div>

    <h3 className="font-serif text-[1.55rem] font-normal text-charcoal leading-tight mb-1.5 group-hover:text-gold transition-colors duration-300">
      {unit.name}
    </h3>
    <div className="flex items-center gap-2 text-gold mb-5">
      <Maximize className="w-3.5 h-3.5" />
      <span className="font-serif text-[1.15rem]">{unit.size}</span>
    </div>

    <p
      className="text-[0.88rem] leading-[1.75] text-gray-dark font-light mb-7 flex-grow"
      dangerouslySetInnerHTML={{ __html: unit.desc }}
    />

    <div className="space-y-2.5 pt-6 border-t border-gray-light">
      <div className="flex items-center gap-3 text-[0.8rem] text-gray-dark">
        <Car className="w-4 h-4 text-gold/80 shrink-0" />
        {unit.parking}
      </div>
      <div className="flex items-center gap-3 text-[0.8rem] text-gray-dark">
        <Maximize className="w-4 h-4 text-gold/80 shrink-0" />
        {unit.balcony}
      </div>
    </div>

    <a
      href="#enquire"
      className="mt-7 text-[0.7rem] tracking-[0.18em] uppercase font-medium text-charcoal border-b border-charcoal/20 pb-1 self-start hover:text-gold hover:border-gold transition-all duration-300"
    >
      Request Floor Plan
    </a>
  </motion.article>
);

const Residences = () => {
  const [tower, setTower] = useState<'North' | 'South'>('North');
  const units = RESIDENCES[tower];

  return (
    <section id="residences" className="bg-cream px-6 md:px-[60px] py-24 md:py-32">
      <div className="max-w-[1240px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <Reveal>
            <Eyebrow>The Collection</Eyebrow>
            <h2 className="font-serif text-[clamp(2rem,4.2vw,3.4rem)] font-light leading-[1.15] text-charcoal">
              Residences for
              <br />
              <span className="italic text-gold">a considered life.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[0.95rem] font-light leading-[1.8] text-gray-dark max-w-[420px]">
              From one-bedroom Classic Residences to four-bedroom Sky Villas,
              every cut is drawn around light, air, and the long view. Select a
              tower to explore its collection.
            </p>
          </Reveal>
        </div>

        {/* Tower toggle */}
        <Reveal delay={0.05}>
          <div className="flex bg-charcoal p-1 w-fit mb-12">
            {(['North', 'South'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTower(t)}
                className={`px-8 py-3 text-[0.7rem] tracking-[0.18em] uppercase font-medium transition-all duration-300 ${
                  tower === t ? 'bg-gold text-white' : 'text-white/50 hover:text-white'
                }`}
              >
                {t} Tower
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {units.map((unit, i) => (
            <UnitCard key={`${tower}-${unit.name}`} unit={unit} index={i} />
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="text-center text-[0.78rem] text-gray-mid mt-12 tracking-[0.06em] font-light">
            Unit areas are indicative and inclusive of balconies where
            applicable. Parking allocations vary by specific unit and floor.
            Full inventory available upon private request.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

// --- 5. LIFESTYLE ----------------------------------------------------------

const Lifestyle = () => (
  <section id="lifestyle" className="bg-charcoal texture-grain">
    <div className="relative">
      <div
        className="h-[56vh] min-h-[420px] bg-center bg-cover bg-fixed"
        style={{ backgroundImage: `url('${IMG.lifestylePool}')` }}
        data-art-note="Amenity deck infinity pool at blue hour, city lights beyond, a single figure swimming — aspirational, unhurried."
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-charcoal" />
        <div className="relative h-full flex items-end px-6 md:px-[60px] pb-14 max-w-[1240px] mx-auto">
          <Reveal>
            <Eyebrow light>The Parklinks Life</Eyebrow>
            <h2 className="font-serif text-[clamp(2rem,4.5vw,3.6rem)] font-light leading-[1.12] text-white max-w-[720px]">
              A private sanctuary,
              <br />
              <span className="italic text-gold-light">at the centre of the city.</span>
            </h2>
          </Reveal>
        </div>
      </div>
    </div>

    <div className="px-6 md:px-[60px] py-20 md:py-24 max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-16 items-center">
      <Reveal>
        <p className="text-[1.05rem] font-light leading-[2] text-white/70">
          Mornings begin with a walk along the river esplanade, the city still
          waking. By midday, wellness is a habit, not a luxury — pools, gardens,
          and quiet corners within steps of home. And because Parklinks is
          built to be walked, the car stays parked while life unfolds on foot.
        </p>
        <p className="text-[1.05rem] font-light leading-[2] text-white/70 mt-6">
          This is urban nature, perfected: the calm of green open space with
          the pulse of Ortigas, BGC, and Makati never more than a short drive
          away. A sanctuary that does not ask you to choose between serenity and
          the city.
        </p>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="grid grid-cols-2 gap-px bg-white/10">
          {[
            [<Waves className="w-5 h-5" />, 'Riverfront Living', 'The country&rsquo;s first river esplanade at your doorstep.'],
            [<Sparkles className="w-5 h-5" />, 'Wellness-Centred', 'Pools, fitness, and landscaped gardens for the everyday ritual.'],
            [<Trees className="w-5 h-5" />, 'Walkable by Design', 'A pedestrian-first estate where amenities meet on foot.'],
            [<Compass className="w-5 h-5" />, 'Effortless Access', 'Minutes to Ortigas, BGC, and Makati via C5.'],
          ].map(([ic, t, d], i) => (
            <div key={i} className="bg-charcoal p-7">
              <div className="text-gold-light mb-4">{ic}</div>
              <h4 className="font-serif text-[1.2rem] text-white mb-2">{t as string}</h4>
              <p
                className="text-[0.82rem] leading-[1.65] text-white/55 font-light"
                dangerouslySetInnerHTML={{ __html: d as string }}
              />
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

// --- 6. SAFETY & ENGINEERING ----------------------------------------------

const Engineering = () => (
  <section id="engineering" className="bg-cream">
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <Reveal>
        <figure className="h-full">
          <div className="relative h-full min-h-[440px] lg:min-h-[640px] overflow-hidden group">
            <img
              src={IMG.engineering}
              alt="Structural engineering"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover grayscale-[35%] transition-all duration-[1600ms] group-hover:grayscale-0 group-hover:scale-105"
              data-art-note="Architectural detail — structural geometry, dampers, or a clean low-angle of the tower core. Cool, confident, precise."
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <ArtCaption>Recommended: structural / architectural detail</ArtCaption>
            </div>
          </div>
        </figure>
      </Reveal>

      <div className="px-8 md:px-16 lg:px-20 py-20 lg:py-24 flex flex-col justify-center">
        <Reveal>
          <Eyebrow>Built for Generations</Eyebrow>
          <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] font-light leading-[1.15] text-charcoal mb-6">
            Engineered to
            <br />
            <span className="italic text-gold">outlast time.</span>
          </h2>
          <p className="text-[0.98rem] font-light leading-[1.9] text-gray-dark mb-10 max-w-[480px]">
            True luxury is the quiet certainty that an asset will endure. The
            Parklinks Towers are built to the most exacting standards of
            structural resilience — protecting both the lives within and the
            legacy they represent.
          </p>
        </Reveal>

        <div className="space-y-6">
          {[
            ['Viscoelastic Coupling Dampers (VCD)', 'Advanced damping technology absorbs seismic and wind energy, keeping the structure calm and stable when the ground is not.'],
            ['Performance-Based Design (PBD)', 'Engineered and independently peer-reviewed against real-world seismic scenarios — performance proven, not merely assumed.'],
            ['Earthquake Resilience', 'A structural system designed to withstand the strongest credible seismic events of the region.'],
            ['Elevated, Flood-Safe Positioning', 'Thoughtfully elevated site planning safeguards the towers and their residents for the long term.'],
          ].map(([t, d], i) => (
            <Reveal key={i} delay={i * 0.08} y={20}>
              <div className="flex gap-5">
                <div className="w-11 h-11 shrink-0 border border-gold/40 flex items-center justify-center text-gold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-[1.18rem] font-normal text-charcoal mb-1">
                    {t}
                  </h4>
                  <p className="text-[0.86rem] leading-[1.7] text-gray-dark font-light">
                    {d}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// --- 7. MARKET POSITIONING -------------------------------------------------

const Investment = () => (
  <section id="investment" className="bg-charcoal texture-grain px-6 md:px-[60px] py-24 md:py-32">
    <div className="max-w-[1240px] mx-auto">
      <div className="max-w-[720px] mb-16">
        <Reveal>
          <Eyebrow light>The Investment Case</Eyebrow>
          <h2 className="font-serif text-[clamp(2rem,4.2vw,3.4rem)] font-light leading-[1.15] text-white">
            Scarcity, location,
            <br />
            <span className="italic text-gold-light">and the long appreciation.</span>
          </h2>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16">
        <Reveal>
          <div className="space-y-7">
            {[
              ['The C5 Corridor Advantage', 'Parklinks sits at the strategic heart of the C5 corridor — the connective spine linking Ortigas, BGC, and Makati. Estate-scale developments along this axis are rare, and rarer still are those with riverfront frontage.'],
              ['Ayala Land Premier Price Leadership', 'As the country&rsquo;s most established luxury developer, Ayala Land Premier consistently commands premium pricing and premium resale — a brand equity that compounds quietly over decades.'],
              ['A Competitive Set Apart', 'Against Velaris, Haraya, Le Pont, and Lattice, Parklinks distinguishes itself through full estate-scale masterplanning, the first river esplanade in the country, and the unmatched track record of Ayala Land Premier.'],
              ['Estate-Scale, Generational Value', 'Buyers are not acquiring a unit; they are acquiring a stake in a 35-hectare estate with finite premier inventory. Scarcity, in the most connected corridor of the capital, is the foundation of long-term appreciation.'],
            ].map(([t, d], i) => (
              <Reveal key={i} delay={i * 0.06} y={20}>
                <div className="border-l-2 border-gold/60 pl-7">
                  <h4 className="font-serif text-[1.3rem] font-normal text-white mb-2">
                    {t}
                  </h4>
                  <p
                    className="text-[0.92rem] leading-[1.8] text-white/60 font-light"
                    dangerouslySetInnerHTML={{ __html: d }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 gap-px bg-white/10 h-fit sticky top-28">
            {[
              ['#1', 'Luxury Developer in PH'],
              ['35 ha', 'Master-Planned Estate'],
              ['C5', 'Strategic Corridor Frontage'],
              ['Limited', 'Premier Tower Inventory'],
            ].map(([n, l], i) => (
              <div
                key={i}
                className="bg-charcoal p-8 relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-[3px] before:h-full before:bg-gold"
              >
                <div className="font-serif text-[2.6rem] font-light text-gold-light leading-none mb-3">
                  {n}
                </div>
                <div className="text-[0.7rem] tracking-[0.12em] uppercase text-white/50 leading-snug">
                  {l}
                </div>
              </div>
            ))}
            <div className="bg-gold col-span-2 p-8 flex items-center gap-4">
              <TrendingUp className="w-8 h-8 text-white shrink-0" />
              <p className="text-white text-[0.92rem] font-light leading-[1.6]">
                A rare estate-scale asset, positioned for generational
                appreciation along Metro Manila&rsquo;s most valuable corridor.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

// --- 8. ENQUIRY (interactive) ---------------------------------------------

type Tower = 'North' | 'South' | 'Either';

const Enquiry = () => {
  const [tower, setTower] = useState<Tower | ''>('');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    unit: '',
    budget: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const set = (k: string, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: false }));
  };

  // Unit options follow the selected tower; "Either"/none shows both towers.
  const unitOptions =
    tower === 'North'
      ? RESIDENCES.North.map((u) => u.name)
      : tower === 'South'
      ? RESIDENCES.South.map((u) => u.name)
      : [
          ...RESIDENCES.North.map((u) => `North — ${u.name}`),
          ...RESIDENCES.South.map((u) => `South — ${u.name}`),
        ];

  const validate = () => {
    const next: Record<string, boolean> = {};
    if (!form.firstName.trim()) next.firstName = true;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = true;
    if (!form.phone.trim()) next.phone = true;
    if (!tower) next.tower = true;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  const fieldClass = (k: string) =>
    `w-full px-4 py-3.5 border bg-cream font-sans text-[0.92rem] text-charcoal outline-none transition-all duration-300 focus:bg-white focus:border-gold ${
      errors[k] ? 'border-red-400 bg-red-50/40' : 'border-gray-light'
    }`;
  const labelClass =
    'text-[0.68rem] tracking-[0.16em] uppercase text-gray-dark font-medium mb-2 block';

  return (
    <section id="enquire" className="bg-white grid grid-cols-1 lg:grid-cols-2">
      {/* Cinematic panel */}
      <div
        className="relative min-h-[360px] lg:min-h-full bg-center bg-cover"
        style={{ backgroundImage: `url('${IMG.lifestyleLounge}')` }}
        data-art-note="ENQUIRY — warm interior or amenity lounge at golden hour; intimate, residential, aspirational."
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />
        <div className="relative h-full flex flex-col justify-end p-8 md:p-14">
          <Eyebrow light>A Private Conversation</Eyebrow>
          <h2 className="font-serif text-[clamp(2rem,3.4vw,3rem)] font-light leading-[1.15] text-white mb-5">
            Begin your
            <br />
            <span className="italic text-gold-light">enquiry.</span>
          </h2>
          <p className="text-[0.95rem] font-light leading-[1.8] text-white/75 max-w-[420px]">
            Share a few details and an accredited Ayala Land Premier specialist
            will arrange a private presentation, curated to your preferences — at
            your schedule, in complete confidence.
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-2 mt-8">
            <a
              href="tel:+639306166011"
              className="flex items-center gap-2.5 text-[0.82rem] text-white/80 hover:text-gold-light transition-colors duration-300"
            >
              <Phone className="w-4 h-4 text-gold-light" /> +63 930 616 6011
            </a>
            <a
              href="mailto:inquiries@ayalapremierph.com"
              className="flex items-center gap-2.5 text-[0.82rem] text-white/80 hover:text-gold-light transition-colors duration-300"
            >
              <Mail className="w-4 h-4 text-gold-light" /> inquiries@ayalapremierph.com
            </a>
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="px-7 md:px-14 lg:px-16 py-16 md:py-20 flex flex-col justify-center">
        {!submitted ? (
          <form onSubmit={onSubmit} noValidate>
            <Reveal>
              <Eyebrow>Schedule a Private Presentation</Eyebrow>
              <h3 className="font-serif text-[clamp(1.8rem,3vw,2.6rem)] font-light leading-[1.15] text-charcoal mb-3">
                Reserve your <span className="italic text-gold">viewing.</span>
              </h3>
              <p className="text-[0.9rem] font-light leading-[1.7] text-gray-dark mb-9 max-w-[460px]">
                Complete the form below. Fields marked with required input help us
                prepare a brief tailored to you.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label className={labelClass}>First Name *</label>
                <input
                  className={fieldClass('firstName')}
                  placeholder="Juan"
                  value={form.firstName}
                  onChange={(e) => set('firstName', e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Last Name</label>
                <input
                  className={fieldClass('lastName')}
                  placeholder="Dela Cruz"
                  value={form.lastName}
                  onChange={(e) => set('lastName', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label className={labelClass}>Email Address *</label>
                <input
                  type="email"
                  className={fieldClass('email')}
                  placeholder="juan@email.com"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>Mobile / Viber *</label>
                <input
                  type="tel"
                  className={fieldClass('phone')}
                  placeholder="+63 9XX XXX XXXX"
                  value={form.phone}
                  onChange={(e) => set('phone', e.target.value)}
                />
              </div>
            </div>

            <div className="mb-5">
              <label className={labelClass}>Tower of Interest *</label>
              <div className="flex gap-2">
                {(['North', 'South', 'Either'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      setTower(t);
                      set('unit', '');
                      if (errors.tower) setErrors((e) => ({ ...e, tower: false }));
                    }}
                    className={`flex-1 py-3 text-[0.72rem] tracking-[0.14em] uppercase font-medium border transition-all duration-300 ${
                      tower === t
                        ? 'bg-charcoal text-white border-charcoal'
                        : errors.tower
                        ? 'border-red-400 text-gray-dark hover:border-gold'
                        : 'border-gray-light text-gray-dark hover:border-gold'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label className={labelClass}>Residence Interest</label>
                <select
                  className={`${fieldClass('unit')} appearance-none`}
                  value={form.unit}
                  onChange={(e) => set('unit', e.target.value)}
                >
                  <option value="">Select a residence</option>
                  {unitOptions.map((u) => (
                    <option key={u}>{u}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Budget Range</label>
                <select
                  className={`${fieldClass('budget')} appearance-none`}
                  value={form.budget}
                  onChange={(e) => set('budget', e.target.value)}
                >
                  <option value="">Select budget</option>
                  <option>₱20M – ₱35M</option>
                  <option>₱35M – ₱55M</option>
                  <option>₱55M – ₱80M</option>
                  <option>₱80M – ₱120M</option>
                  <option>₱120M+</option>
                </select>
              </div>
            </div>

            <div className="mb-7">
              <label className={labelClass}>Message (optional)</label>
              <textarea
                rows={3}
                className={`${fieldClass('message')} resize-none`}
                placeholder="Preferred viewing dates, orientation, or any specific requirements."
                value={form.message}
                onChange={(e) => set('message', e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full py-[17px] bg-charcoal text-white font-sans text-[0.76rem] tracking-[0.2em] uppercase font-medium transition-colors duration-300 hover:bg-gold inline-flex items-center justify-center gap-2"
            >
              Submit Enquiry <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[0.72rem] text-gray-mid text-center mt-4 leading-[1.6]">
              Your details remain private and confidential. A specialist will be
              in touch within 24 hours.
            </p>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center py-10"
          >
            <div className="w-16 h-16 border border-gold rounded-full flex items-center justify-center mx-auto mb-7 text-gold animate-float-slow">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-[2rem] font-light mb-3">
              Thank you, {form.firstName}.
            </h3>
            <p className="text-[0.95rem] text-gray-dark font-light leading-[1.8] max-w-[420px] mx-auto mb-8">
              Your enquiry for the Parklinks{' '}
              {tower === 'Either' ? 'Towers' : `${tower} Tower`} has been
              received. An accredited Ayala Land Premier specialist will reach out
              within <strong>24 hours</strong> with a curated brief and private
              viewing options.
            </p>
            <a
              href={SITE}
              target="_blank"
              rel="noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              Visit ayalapremierph.com <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
};

// --- 9. CLOSING ------------------------------------------------------------

const Closing = () => (
  <section
    id="invitation"
    className="relative overflow-hidden flex items-center justify-center text-center px-6 py-32 md:py-44"
  >
    <div
      className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat animate-ken-burns"
      style={{ backgroundImage: `url('${IMG.closing}')` }}
      data-art-note="CLOSING — the estate at last light, towers glowing, river reflecting the sky. The most cinematic frame of the set."
    />
    <div className="absolute inset-0 z-0 bg-[linear-gradient(to_bottom,rgba(10,10,10,0.7),rgba(10,10,10,0.82))]" />
    <div className="absolute inset-0 z-0 texture-grain opacity-50" />

    <div className="relative z-10 max-w-[820px]">
      <Reveal>
        <Eyebrow light center>
          The Invitation
        </Eyebrow>
        <h2 className="font-serif text-[clamp(2.4rem,5.5vw,4.6rem)] font-light leading-[1.08] text-white mb-8">
          An Address Meant
          <br />
          for the <span className="italic gold-shimmer">Future.</span>
        </h2>
        <p className="text-[1.05rem] font-light leading-[1.95] text-white/80 mb-12 max-w-[620px] mx-auto">
          Some homes shelter a family. A rare few shelter a legacy. Parklinks is
          for those who think in generations — who understand that timeless
          architecture, in a place that cannot be replicated, is the truest form
          of wealth preservation. This is more than an address. It is an
          inheritance, written in glass and light, for the family that comes
          next.
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={SITE}
            target="_blank"
            rel="noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            Book a Private Presentation <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href={SITE}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost"
          >
            Request Available Inventory
          </a>
        </div>
        <a
          href={SITE}
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-8 text-[0.72rem] tracking-[0.18em] uppercase text-gold-light border-b border-gold-light/40 pb-1 hover:border-gold-light transition-colors duration-300"
        >
          Connect with an Ayala Land Premier Property Specialist
        </a>
      </Reveal>
    </div>
  </section>
);

// --- 10. FOOTER ------------------------------------------------------------

const Footer = () => (
  <footer id="footer" className="bg-[#080808] px-6 md:px-[60px] pt-20 pb-10">
    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mb-14 opacity-40" />

    <div className="max-w-[1240px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1.2fr] gap-12 md:gap-[60px] mb-16">
      <div>
        <a
          href={SITE}
          target="_blank"
          rel="noreferrer"
          className="font-serif text-[1.55rem] font-light text-white tracking-[0.1em] mb-1 inline-block hover:text-gold-light transition-colors duration-300"
        >
          AYALA LAND <span className="text-gold">PREMIER</span>
        </a>
        <div className="text-[0.7rem] tracking-[0.24em] uppercase text-white/40 mb-6">
          Parklinks North &amp; South Towers
        </div>
        <p className="text-[0.88rem] font-light leading-[1.85] text-white/45 max-w-[300px]">
          Metro Manila&rsquo;s first true sustainable urban estate, rising along
          the river between Quezon City and Pasig. A residential address built
          to be inherited.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <h5 className="text-[0.7rem] tracking-[0.2em] uppercase text-white/40 font-medium">
          The Estate
        </h5>
        <ul className="list-none flex flex-col gap-3">
          {['North Tower', 'South Tower', 'The Residences', 'River Esplanade', 'Parklinks Mall'].map(
            (i) => (
              <li key={i}>
                <a
                  href="#towers"
                  className="text-[0.86rem] text-white/55 transition-colors duration-300 font-light hover:text-gold-light"
                >
                  {i}
                </a>
              </li>
            )
          )}
        </ul>
      </div>

      <div className="flex flex-col gap-5">
        <h5 className="text-[0.7rem] tracking-[0.2em] uppercase text-white/40 font-medium">
          Enquire
        </h5>
        <ul className="list-none flex flex-col gap-3">
          {['Private Presentation', 'Available Inventory', 'Floor Plans', 'Payment Terms', 'Investor Brief'].map(
            (i) => (
              <li key={i}>
                <a
                  href="#enquire"
                  className="text-[0.86rem] text-white/55 transition-colors duration-300 font-light hover:text-gold-light"
                >
                  {i}
                </a>
              </li>
            )
          )}
        </ul>
      </div>

      <div className="flex flex-col gap-5">
        <h5 className="text-[0.7rem] tracking-[0.2em] uppercase text-white/40 font-medium">
          Contact
        </h5>
        <ul className="list-none flex flex-col gap-3.5">
          <li>
            <a
              href="tel:+639306166011"
              className="flex items-center gap-3 text-[0.86rem] text-white/55 font-light hover:text-gold-light transition-colors duration-300"
            >
              <Phone className="w-4 h-4 text-gold/70" /> +63 930 616 6011
            </a>
          </li>
          <li>
            <a
              href="mailto:inquiries@ayalapremierph.com"
              className="flex items-center gap-3 text-[0.86rem] text-white/55 font-light hover:text-gold-light transition-colors duration-300"
            >
              <Mail className="w-4 h-4 text-gold/70" /> inquiries@ayalapremierph.com
            </a>
          </li>
        </ul>
        <div className="flex gap-3 mt-2">
          {[
            [<Instagram className="w-4 h-4" />, '#'],
            [<Facebook className="w-4 h-4" />, '#'],
            [<MessageCircle className="w-4 h-4" />, 'https://wa.me/639306166011'],
          ].map(([ic, href], i) => (
            <a
              key={i}
              href={href as string}
              className="w-9 h-9 border border-white/15 flex items-center justify-center text-white/55 transition-all duration-300 hover:border-gold hover:text-gold"
            >
              {ic}
            </a>
          ))}
        </div>
        <a
          href={SITE}
          target="_blank"
          rel="noreferrer"
          className="text-[0.78rem] text-white/35 mt-1 tracking-[0.06em] hover:text-gold-light transition-colors duration-300"
        >
          ayalapremierph.com
        </a>
      </div>
    </div>

    <div className="max-w-[1240px] mx-auto border-t border-white/8 pt-8">
      <p className="text-[0.72rem] text-white/30 leading-[1.8] font-light max-w-[920px] mb-6">
        <strong className="text-white/45 font-medium">Disclaimer.</strong> This
        material is for general information only and does not constitute an offer,
        warranty, or contract. Perspectives, renders, and imagery are artists&rsquo;
        impressions and indicative only; finishes, unit areas, parking
        allocations, views, and amenities are subject to final design, approvals,
        and availability. Areas stated are approximate and may vary upon final
        survey. Prices and inventory are subject to change without prior notice.
        Ayala Land Premier and Parklinks are projects of Ayala Land, Inc. Verify
        all particulars with an accredited Ayala Land Premier property specialist
        prior to purchase.
      </p>
      <div className="flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="text-[0.72rem] text-white/30 tracking-[0.05em]">
          © 2026 Ayala Land Premier. All rights reserved.
        </p>
        <p className="text-[0.72rem] text-white/30 tracking-[0.05em]">
          Privacy Policy · Terms of Use · DHSUD License to Sell
        </p>
      </div>
    </div>
  </footer>
);

// --- Sticky CTA ------------------------------------------------------------

const StickyCTA = () => (
  <div className="fixed bottom-7 right-7 z-[800] flex flex-col items-end gap-3 animate-fade-in-right">
    <a
      href={SITE}
      target="_blank"
      rel="noreferrer"
      className="px-7 py-3 bg-gold text-white text-[0.7rem] tracking-[0.18em] uppercase font-medium shadow-[0_8px_32px_rgba(184,150,12,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(184,150,12,0.5)] whitespace-nowrap hidden sm:block"
    >
      Schedule a Presentation
    </a>
    <a
      href="https://wa.me/639306166011"
      target="_blank"
      rel="noreferrer"
      className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(37,211,102,0.4)] transition-transform duration-200 hover:scale-110"
    >
      <MessageCircle className="w-6 h-6 text-white" />
    </a>
  </div>
);

// --- Page ------------------------------------------------------------------

export default function Newsletter() {
  return (
    <div className="min-h-screen bg-cream">
      <AnnouncementBar />
      <Nav />
      <main>
        <Hero />
        <FactStrip />
        <Story />
        <Towers />
        <Residences />
        <Lifestyle />
        <Engineering />
        <Investment />
        <Enquiry />
        <Closing />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
}
