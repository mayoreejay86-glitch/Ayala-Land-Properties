import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Newsletter from './Newsletter';
import { 
  Check, 
  X, 
  ArrowRight, 
  Star, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  MessageCircle,
  MapPin,
  ShieldCheck,
  TrendingUp,
  Award,
  History,
  Hexagon,
  Diamond,
  Sparkles
} from 'lucide-react';

// --- Components ---

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const animateRing = () => {
      setRingPosition(prev => ({
        x: prev.x + (position.x - prev.x) * 0.12,
        y: prev.y + (position.y - prev.y) * 0.12
      }));
      requestAnimationFrame(animateRing);
    };
    const animationId = requestAnimationFrame(animateRing);
    return () => cancelAnimationFrame(animationId);
  }, [position]);

  return (
    <div className="cursor hidden md:block">
      <div 
        className="cursor-ring" 
        style={{ left: ringPosition.x, top: ringPosition.y }}
      />
      <div 
        className="cursor-dot" 
        style={{ left: position.x, top: position.y }}
      />
    </div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[900] flex items-center justify-between px-6 md:px-[60px] py-7 transition-all duration-400 ${scrolled ? 'bg-cream/94 backdrop-blur-xl py-4 border-b border-gray-light' : ''}`}>
      <a href="#" className={`font-serif font-light text-2xl tracking-[0.08em] transition-colors duration-400 ${scrolled ? 'text-charcoal' : 'text-white'}`}>
        Ayala Land <span className="text-gold">Premium Property</span>
      </a>
      <ul className="hidden md:flex items-center gap-9 list-none">
        {['Portfolio', 'RFO', 'Living', 'Invest', 'Journal', 'About', 'Contact'].map((item) => (
          <li key={item}>
            <a
              href={item === 'Journal' ? '/newsletter' : `#${item.toLowerCase()}`}
              className={`text-[0.78rem] tracking-[0.15em] uppercase font-medium transition-colors duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-gold after:transition-all after:duration-300 hover:after:w-full hover:text-gold-light ${scrolled ? 'text-gray-dark' : 'text-white/85'}`}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
      <a 
        href="#contact" 
        className={`px-7 py-[11px] border text-[0.72rem] tracking-[0.15em] uppercase font-medium transition-all duration-300 cursor-none hover:bg-gold hover:border-gold hover:text-white ${scrolled ? 'border-gold text-gold' : 'border-white/50 text-white'}`}
      >
        Book a Presentation
      </a>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="h-screen relative overflow-hidden flex items-end" id="home">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_bottom,rgba(10,10,10,0.15)_0%,rgba(10,10,10,0.6)_100%),url('https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1800&q=80')] bg-center bg-cover bg-no-repeat animate-hero-zoom" />
      <div className="relative z-10 px-6 md:px-[60px] pb-20 max-w-[860px]">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <p className="font-sans text-[0.72rem] tracking-[0.25em] uppercase text-gold-light mb-5 flex items-center gap-3.5 before:content-[''] before:block before:w-10 before:h-[1px] before:bg-gold">
            Ree Jay Mayo — Premier Property Specialist
          </p>
          <h1 className="font-serif text-[clamp(3rem,6vw,5.5rem)] font-light leading-[1.1] text-white mb-6">
            Where Luxury<br/>Becomes <em className="italic text-gold-light not-italic">Legacy</em>
          </h1>
          <p className="text-base font-light text-white/80 leading-[1.7] mb-11 max-w-[520px] tracking-[0.03em]">
            Discover the Philippines' most exclusive residential addresses — thoughtfully crafted for those who demand the finest. Explore our Pre-Selling and Ready-for-Occupancy (RFO) portfolio today.
          </p>
          <div className="flex items-center gap-6">
            <a href="#contact" className="btn-primary">Schedule Private Presentation</a>
            <a href="#portfolio" className="btn-ghost">View Portfolio</a>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-10 right-[60px] z-10 hidden md:flex flex-col items-center gap-2.5">
        <div className="w-[1px] h-[60px] bg-white/30 animate-scroll-pulse" />
        <span className="text-[0.65rem] tracking-[0.2em] uppercase text-white/60 [writing-mode:vertical-rl]">Scroll</span>
      </div>
    </section>
  );
};

const TrustStrip = () => {
  return (
    <div className="bg-charcoal px-6 md:px-[60px] py-8 flex items-center justify-center gap-6 md:gap-[60px] flex-wrap">
      <div className="flex items-center gap-3.5 text-white/70 text-[0.78rem] tracking-[0.1em] uppercase">
        <span className="font-serif text-[1.8rem] font-light text-gold-light leading-none">35+</span>
        <div><div>Years of</div><div>Excellence</div></div>
      </div>
      <div className="hidden md:block w-[1px] h-9 bg-white/15" />
      <div className="flex items-center gap-3.5 text-white/70 text-[0.78rem] tracking-[0.1em] uppercase">
        <span className="font-serif text-[1.8rem] font-light text-gold-light leading-none">60+</span>
        <div><div>Premium</div><div>Developments</div></div>
      </div>
      <div className="hidden md:block w-[1px] h-9 bg-white/15" />
      <div className="flex items-center gap-3.5 text-white/70 text-[0.78rem] tracking-[0.1em] uppercase">
        <span className="font-serif text-[1.8rem] font-light text-gold-light leading-none">₱40B+</span>
        <div><div>Total Portfolio</div><div>Value</div></div>
      </div>
      <div className="hidden md:block w-[1px] h-9 bg-white/15" />
      <div className="flex items-center gap-3.5 text-white/70 text-[0.78rem] tracking-[0.1em] uppercase">
        <span className="font-serif text-[1.8rem] font-light text-gold-light leading-none">₱80M+</span>
        <div><div>Personal Sales</div><div>Performance</div></div>
      </div>
      <div className="hidden md:block w-[1px] h-9 bg-white/15" />
      <div className="flex items-center gap-3.5 text-white/70 text-[0.78rem] tracking-[0.1em] uppercase">
        <span className="font-serif text-[1.8rem] font-light text-gold-light leading-none">Top 1</span>
        <div><div>AAA-Rated</div><div>Developer PH</div></div>
      </div>
    </div>
  );
};

const PropertyCard = ({ image, tag, name, location, price, size, large = false }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className={`relative overflow-hidden cursor-none group ${large ? 'md:col-span-2 aspect-[16/10]' : 'aspect-[3/4]'}`}
    >
      <div 
        className="w-full h-full bg-center bg-cover bg-no-repeat transition-transform duration-700 group-hover:scale-106"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-9 translate-y-2 transition-transform duration-400 group-hover:translate-y-0">
        <span className="inline-block px-3 py-1 border border-gold text-gold text-[0.65rem] tracking-[0.2em] uppercase mb-3">
          {tag}
        </span>
        <h3 className="font-serif text-[1.6rem] font-light text-white mb-2">{name}</h3>
        <p className="text-[0.78rem] tracking-[0.1em] uppercase text-white/60 mb-4">{location}</p>
        <div className="flex gap-6 items-center border-t border-white/20 pt-4 opacity-0 translate-y-[10px] transition-all duration-400 delay-100 group-hover:opacity-100 group-hover:translate-y-0">
          <span className="font-serif text-[1.1rem] text-gold-light">{price}</span>
          <span className="text-[0.78rem] text-white/60 tracking-[0.08em]">{size}</span>
          <a href="#contact" className="ml-auto text-[0.72rem] tracking-[0.15em] uppercase text-white px-5 py-2 border border-white/40 transition-all duration-300 hover:border-gold hover:bg-gold">
            Inquire Now
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const PortfolioData = {
  ALP: {
    "Pre-Selling": [
      { name: "Laurean Residences", location: "Makati", description: "The newest 65-storey flagship tower in Dela Rosa Gardens.", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80" },
      { name: "Park Central Towers", location: "Makati", description: "Ultra-luxury twin towers at the corner of Paseo de Roxas.", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80" },
      { name: "Parklinks North & South Towers", location: "Pasig/QC", description: "Part of the greenest urban estate.", image: "https://images.unsplash.com/photo-1449156001935-d28bc1dd7289?w=800&q=80" },
      { name: "Gardencourt Residences", location: "Arca South", description: "Low-density residences in Taguig.", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80" },
      { name: "One Vertis Plaza", location: "QC", description: "The first Premier Corporate Tower in Vertis North.", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" },
      { name: "Arcilo", location: "Nuvali", description: "Luxury lots in the newest phase of the Nuvali heights area.", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80" },
      { name: "Ciela at Aèra Heights", location: "Cavite", description: "Hillside estate lots.", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80" },
      { name: "Lanewood Hills", location: "Silang", description: "High-end residential lots near Ayala Westgrove.", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80" }
    ],
    "RFO": [
      { name: "Arbor Lanes", location: "Arca South", description: "Garden-style luxury living in Taguig.", image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80" },
      { name: "East Gallery Place", location: "BGC", description: "Iconic high-rise living in High Street South.", image: "https://images.unsplash.com/photo-1567684014761-b618b6983527?w=800&q=80" },
      { name: "West Gallery Place", location: "BGC", description: "The sibling tower to East Gallery.", image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800&q=80" },
      { name: "Garden Towers", location: "Makati", description: "Integrated with the Glorietta/Ayala Center hub.", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80" },
      { name: "Two Roxas Triangle", location: "Makati", description: "The gold standard of luxury condominiums in the CBD.", image: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&q=80" },
      { name: "Anvaya Cove", location: "Bataan", description: "Selected beach and nature villas/lots.", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80" },
      { name: "Riomonte & Cerilo", location: "Nuvali", description: "Fully developed high-end residential lot neighborhoods.", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80" }
    ]
  },
  Alveo: {
    "Pre-Selling": [
      { name: "Park East Place", location: "BGC", description: "Prime upscale condo at 32nd St. and 9th Ave.", image: "https://images.unsplash.com/photo-1567684014761-b618b6983527?w=800&q=80" },
      { name: "Orean Residences", location: "Vertis North", description: "The latest tower launch in QC’s business district.", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80" },
      { name: "Astela", location: "Circuit Makati", description: "Arts-oriented high-rise in the Circuit estate.", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80" },
      { name: "Nuveo at Cerca", location: "Alabang", description: "Part of the mid-rise district beside Ayala Alabang.", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80" },
      { name: "The Lattice at Parklinks", location: "Pasig/QC", description: "Urban parkside living.", image: "https://images.unsplash.com/photo-1449156001935-d28bc1dd7289?w=800&q=80" },
      { name: "Sentrove", location: "Cloverleaf, QC", description: "Modern high-rise connectivity in Balintawak.", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80" },
      { name: "Tryne Enterprise Plaza", location: "Arca South", description: "High-end office spaces for sale.", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" },
      { name: "Sereneo & Mondia", location: "Nuvali", description: "Active residential lot developments.", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80" },
      { name: "Caleia", location: "Vermosa", description: "Suburban lots within the Cavite sports estate.", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80" }
    ],
    "RFO": [
      { name: "Callisto", location: "Circuit Makati", description: "Newly completed towers in the entertainment hub.", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80" },
      { name: "The Veranda", location: "Arca South", description: "Mid-rise RFO units in Taguig.", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80" },
      { name: "Alveo Financial Tower", location: "Makati", description: "Premium office spaces on Ayala Avenue.", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80" },
      { name: "The Stiles Enterprise Plaza", location: "Circuit Makati", description: "Creative/corporate office spaces.", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" },
      { name: "Viento at Cerca", location: "Alabang", description: "Early phases of the Cerca district.", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80" },
      { name: "Travertine at Portico", location: "Pasig", description: "Upscale courtyard living near Ortigas.", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80" },
      { name: "High Park", location: "Vertis North", description: "Iconic towers overlooking the Vertis Rain Garden.", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80" }
    ]
  }
};

const Portfolio = () => {
  const [activeBrand, setActiveBrand] = useState<'ALP' | 'Alveo'>('ALP');
  const [activeStatus, setActiveStatus] = useState<'Pre-Selling' | 'RFO'>('Pre-Selling');

  const currentProjects = PortfolioData[activeBrand][activeStatus];

  return (
    <section className="bg-cream px-6 md:px-[60px] py-24" id="portfolio">
      <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
        <div>
          <p className="section-eyebrow">Real Estate Portfolio</p>
          <h2 className="section-title">Ayala Land <em className="italic text-gold not-italic">Developments</em></h2>
        </div>
        <p className="section-body">Explore our comprehensive list of luxury and upscale projects across the Philippines. Updated as of March 2026.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="flex bg-charcoal p-1">
          {['ALP', 'Alveo'].map((brand) => (
            <button
              key={brand}
              onClick={() => setActiveBrand(brand as any)}
              className={`px-8 py-3 text-[0.72rem] tracking-[0.15em] uppercase font-medium transition-all duration-300 ${activeBrand === brand ? 'bg-gold text-white' : 'text-white/50 hover:text-white'}`}
            >
              {brand === 'ALP' ? 'Ayala Land Premier' : 'Alveo Land'}
            </button>
          ))}
        </div>
        <div className="flex border border-gray-light p-1">
          {['Pre-Selling', 'RFO'].map((status) => (
            <button
              key={status}
              onClick={() => setActiveStatus(status as any)}
              className={`px-8 py-3 text-[0.72rem] tracking-[0.15em] uppercase font-medium transition-all duration-300 ${activeStatus === status ? 'bg-charcoal text-white' : 'text-gray-mid hover:text-charcoal'}`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="wait">
          {currentProjects.map((project, index) => (
            <motion.div
              key={`${activeBrand}-${activeStatus}-${project.name}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white border border-gray-light group overflow-hidden flex flex-col"
            >
              <div className="aspect-video overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-charcoal/80 backdrop-blur-sm text-white text-[0.6rem] tracking-[0.15em] uppercase px-3 py-1">
                    {activeStatus}
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-gold text-[0.65rem] tracking-[0.15em] uppercase mb-2">
                  <MapPin className="w-3 h-3" />
                  {project.location}
                </div>
                <h3 className="font-serif text-xl font-normal text-charcoal mb-3 group-hover:text-gold transition-colors duration-300">{project.name}</h3>
                <p className="text-[0.85rem] leading-[1.6] text-gray-dark font-light mb-6 flex-grow">{project.description}</p>
                <a href="#contact" className="text-[0.72rem] tracking-[0.15em] uppercase font-medium text-charcoal border-b border-charcoal/20 pb-1 self-start hover:text-gold hover:border-gold transition-all duration-300">
                  Request Details
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

const Lifestyle = () => {
  return (
    <div className="bg-charcoal grid grid-cols-1 md:grid-cols-2 gap-0 p-0" id="lifestyle">
      <div className="min-h-[400px] md:min-h-[600px] bg-[url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&q=80')] bg-center bg-cover bg-no-repeat relative after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-br after:from-gold/15 after:to-transparent" />
      <div className="px-8 md:px-20 py-24 flex flex-col justify-center">
        <p className="section-eyebrow text-gold-light before:bg-gold-light">The Ayala Land Premier Living Experience</p>
        <h2 className="section-title text-white">Beyond <em className="italic text-gold not-italic">Address.</em><br/>A Way of Life.</h2>
        <p className="section-body text-white/65 mb-12">Every Ayala Land Premier community is designed around one principle: that how you live is as important as where you live. Serenity, exclusivity, and extraordinary design — all in one address.</p>
        <div className="flex flex-col gap-5 mb-12">
          {[
            { icon: <Sparkles className="w-4 h-4" />, title: "Curated Amenities", text: "Resort-style pools, private fitness centers, concierge services, and landscaped gardens designed for the discerning few." },
            { icon: <MapPin className="w-4 h-4" />, title: "Prime Connectivity", text: "Strategically located near BGC, Makati, and major commercial hubs — minutes from everything that matters." },
            { icon: <ShieldCheck className="w-4 h-4" />, title: "Low-Density Living", text: "Exclusive communities with limited units — ensuring privacy, prestige, and enduring value for every resident." }
          ].map((feature, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="w-9 h-9 min-w-[36px] border border-gold flex items-center justify-center text-gold">
                {feature.icon}
              </div>
              <div className="text-[0.88rem] leading-[1.6] text-white/70 font-light">
                <strong className="text-white font-medium block mb-1">{feature.title}</strong>
                {feature.text}
              </div>
            </div>
          ))}
        </div>
        <a href="#contact" className="btn-primary self-start">Experience It First-Hand</a>
      </div>
    </div>
  );
};

const Investment = () => {
  return (
    <section className="bg-cream px-6 md:px-[60px] py-24" id="investment">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="section-eyebrow">Why Invest</p>
        <h2 className="section-title">Not Just a Home.<br/><em className="italic text-gold not-italic">An Asset.</em></h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 items-center mt-14">
        <div className="grid grid-cols-2 gap-[2px]">
          {[
            { num: "18%", label: "Average Annual\nCapital Appreciation" },
            { num: "6–8%", label: "Gross Rental\nYield Potential" },
            { num: "AAA", label: "Developer Credit\nRating — Fitch" },
            { num: "Zero", label: "Failed Projects\nin 35 Years" }
          ].map((stat, i) => (
            <div key={i} className="bg-charcoal p-9 md:p-11 relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-[3px] before:h-full before:bg-gold">
              <div className="font-serif text-[3.2rem] font-light text-gold-light leading-none mb-2.5">{stat.num}</div>
              <div className="text-[0.78rem] tracking-[0.1em] uppercase text-white/50 whitespace-pre-line">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-7">
          {[
            { title: "Land Scarcity Drives Value", text: "Premium land in BGC and Makati is finite. Ayala Land Premier properties are positioned at the epicenter of the country's most valuable real estate corridors — where demand consistently outpaces supply." },
            { title: "OFW-Ideal Investment Vehicle", text: "Flexible payment terms, Pag-IBIG and bank financing options, and strong PHP appreciation make Ayala Land Premier properties the preferred home investment for Filipinos abroad." },
            { title: "Generational Wealth Transfer", text: "Ayala Land Premier properties hold — and grow — their value across decades. This is not just a home. It is a legacy asset passed from parent to child, increasing in worth at every turn." }
          ].map((point, i) => (
            <div key={i} className="p-7 border border-gray-light border-l-[3px] border-l-gold transition-all duration-300 hover:shadow-[0_8px_32px_rgba(184,150,12,0.08)] hover:border-gold">
              <h4 className="font-serif text-[1.15rem] font-normal mb-2">{point.title}</h4>
              <p className="text-[0.88rem] leading-[1.7] text-gray-dark font-light">{point.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section className="bg-white px-6 md:px-[60px] py-24 text-center" id="about">
      <div className="flex justify-center mb-4">
        <p className="section-eyebrow before:hidden after:content-[''] after:block after:w-[30px] after:h-[1px] after:bg-gold">Our Commitment</p>
      </div>
      <h2 className="section-title mx-auto mb-6 max-w-[700px]">Built on <em className="italic text-gold not-italic">Trust,</em><br/>Defined by Excellence</h2>
      <p className="section-body mx-auto mb-14">Since 1988, Ayala Land Premier has been the benchmark of luxury property development in the Philippines — with a legacy that speaks louder than any promise.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[2px] mt-5">
        {[
          { icon: <History className="w-6 h-6" />, title: "Proven Legacy", text: "Over three decades of delivered excellence with zero project failures — a track record unmatched in Philippine luxury real estate." },
          { icon: <MapPin className="w-6 h-6" />, title: "Premium Locations", text: "All developments are in prime, high-appreciation corridors — BGC, Makati, Nuvali, Arca South, and emerging growth zones." },
          { icon: <Award className="w-6 h-6" />, title: "World-Class Design", text: "Collaborations with renowned local and international architects, ensuring every Ayala Land Premier home is a timeless work of art." },
          { icon: <ShieldCheck className="w-6 h-6" />, title: "Lifetime After-Sales", text: "From move-in to decades beyond, our property management and support teams ensure your investment is always protected." }
        ].map((value, i) => (
          <div key={i} className="p-12 md:p-8 bg-cream text-left transition-colors duration-300 hover:bg-charcoal group">
            <div className="w-12 h-12 border border-gold-pale flex items-center justify-center mb-6 text-xl transition-colors duration-300 group-hover:border-gold text-gold">
              {value.icon}
            </div>
            <h4 className="font-serif text-[1.2rem] font-normal mb-3 transition-colors duration-300 group-hover:text-white">{value.title}</h4>
            <p className="text-[0.85rem] leading-[1.7] text-gray-dark font-light transition-colors duration-300 group-hover:text-white/55">{value.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const SalesPerformance = () => {
  return (
    <section className="bg-[#0F0F0F] px-6 md:px-[60px] py-24 text-center">
      <p className="section-eyebrow text-gold before:bg-gold mx-auto">Sales Achievement</p>
      <h2 className="section-title text-white mb-12">Personal Sales <em className="italic text-gold not-italic">Performance</em></h2>
      <div className="flex flex-col items-center justify-center">
        <div className="font-serif text-[6rem] md:text-[10rem] text-gold-light leading-none mb-4">₱80M+</div>
        <p className="text-white/60 text-xl tracking-[0.2em] uppercase font-light">Worth of Property Sold</p>
        <div className="w-24 h-[1px] bg-gold/30 mt-12 mb-12"></div>
        <p className="max-w-2xl mx-auto text-white/80 text-lg leading-relaxed italic font-serif">
          "A track record of excellence in the luxury real estate market, ensuring every client secures a legacy that is truly for keeps."
        </p>
      </div>
    </section>
  );
};

const Specialist = () => {
  return (
    <section className="bg-white px-6 md:px-[60px] py-24 border-t border-gray-light">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-[4/5] bg-gray-light overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80" 
              alt="Ree Jay Mayo" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-gold p-8 hidden md:block">
            <div className="font-serif text-white text-2xl italic">"For Keeps"</div>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-eyebrow">Your Premier Partner</p>
          <h2 className="section-title">Meet <em className="italic text-gold not-italic">Ree Jay Mayo</em></h2>
          <p className="text-lg font-medium text-charcoal mb-4">Premier Property Specialist — Ayala Land Premier</p>
          <p className="section-body mb-8">
            With years of experience in the luxury real estate market, I am dedicated to helping you find more than just a house. I help you secure a legacy. My commitment is to provide personalized service that ensures your investment is truly "For Keeps".
          </p>
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex items-center gap-4 text-charcoal">
              <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-gold">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="font-medium">₱80 Million+ Worth of Property Sold</span>
            </div>
            <div className="flex items-center gap-4 text-charcoal">
              <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-gold">
                <Phone className="w-5 h-5" />
              </div>
              <span className="font-medium">+63 930 616 6011</span>
            </div>
            <div className="flex items-center gap-4 text-charcoal">
              <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-gold">
                <Mail className="w-5 h-5" />
              </div>
              <span className="font-medium">mayoreejay86@gmail.com</span>
            </div>
          </div>
          <a href="#contact" className="btn-primary mt-10 inline-block">Request a Private Meeting</a>
        </motion.div>
      </div>
    </section>
  );
};

const RFOProfile = () => {
  return (
    <section className="bg-charcoal px-6 md:px-[60px] py-24 text-white" id="rfo">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-eyebrow text-gold before:bg-gold">RFO Advantage</p>
          <h2 className="section-title text-white">The <em className="italic text-gold not-italic">RFO Profile</em></h2>
          <p className="section-body text-white/60 mb-10">
            Our Ready-for-Occupancy (RFO) properties represent the pinnacle of immediate luxury. These units are fully completed, allowing for immediate move-in or rental operations, providing a tangible asset that you can experience today.
          </p>
          <div className="space-y-8">
            {[
              { title: "Immediate Gratification", text: "Why wait for years? Our RFO units are ready for turnover, allowing you to enjoy your investment or move into your new home immediately." },
              { title: "Tangible Quality", text: "Walk through the actual halls, feel the finishes, and see the real views. Buying RFO removes the guesswork of pre-selling developments." },
              { title: "Instant Yield", text: "For investors, RFO means your asset can start generating rental income from day one, maximizing your cash flow without the construction wait." }
            ].map((item, i) => (
              <div key={i} className="flex gap-6">
                <div className="w-12 h-12 min-w-[48px] border border-gold flex items-center justify-center text-gold">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-normal mb-2">{item.title}</h4>
                  <p className="text-[0.88rem] leading-[1.7] text-white/50 font-light">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative aspect-[4/5] overflow-hidden"
        >
          <img 
            src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80" 
            alt="RFO Interior" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-10">
            <div className="font-serif text-4xl text-white mb-4 italic">Ready to Move In</div>
            <div className="flex flex-col sm:flex-row gap-6 mt-10">
              <a href="#contact" className="btn-primary">Inquire About RFO</a>
              <a href="#contact" className="btn-ghost border-white/20 hover:border-gold">Request RFO Profile</a>
            </div>
          </div>
          <div className="mt-12 pt-12 border-t border-white/10">
            <h5 className="text-gold text-[0.72rem] tracking-[0.2em] uppercase mb-6">Key RFO Locations</h5>
            <div className="flex flex-wrap gap-x-10 gap-y-4">
              {['Makati CBD', 'BGC', 'Arca South', 'Nuvali', 'Vermosa', 'Cebu'].map((loc) => (
                <div key={loc} className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-gold rounded-full" />
                  <span className="text-sm text-white/70">{loc}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const LeadCapture = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    budget: '',
    property: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.phone) {
      alert('Please fill in at least your name, email, and phone number.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="bg-cream grid grid-cols-1 md:grid-cols-2 gap-0 p-0" id="contact">
      <div className="bg-[url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80')] bg-center bg-cover relative min-h-[400px] md:min-h-[700px]">
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/40 flex flex-col justify-end p-8 md:p-[60px]">
          <p className="font-serif text-[2.4rem] font-light text-white leading-[1.2] mb-4">Your next chapter<br/>begins with<br/>one conversation.</p>
          <p className="text-[0.88rem] text-white/65 font-light leading-[1.6]">Our property specialists are ready to create a personalized presentation — at your schedule, on your terms.</p>
        </div>
      </div>
      <div className="bg-white px-8 md:px-[70px] py-20 flex flex-col justify-center">
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <p className="section-eyebrow mb-3">Private Consultation</p>
            <h2 className="section-title mb-2.5">Reserve Your<br/><em className="italic text-gold not-italic">Presentation</em></h2>
            <p className="section-body mb-10">Complete the form and receive a free investment brief, sample computation, and exclusive property brochure within 24 hours.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex flex-col gap-2.5">
                <label className="text-[0.72rem] tracking-[0.15em] uppercase text-gray-dark font-medium">First Name</label>
                <input 
                  type="text" 
                  placeholder="Juan" 
                  className="w-full px-[18px] py-3.5 border border-gray-light bg-cream font-sans text-[0.92rem] text-charcoal outline-none transition-all duration-300 focus:border-gold focus:bg-white"
                  value={formData.firstName}
                  onChange={e => setFormData({...formData, firstName: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-2.5">
                <label className="text-[0.72rem] tracking-[0.15em] uppercase text-gray-dark font-medium">Last Name</label>
                <input 
                  type="text" 
                  placeholder="Dela Cruz" 
                  className="w-full px-[18px] py-3.5 border border-gray-light bg-cream font-sans text-[0.92rem] text-charcoal outline-none transition-all duration-300 focus:border-gold focus:bg-white"
                  value={formData.lastName}
                  onChange={e => setFormData({...formData, lastName: e.target.value})}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2.5 mb-6">
              <label className="text-[0.72rem] tracking-[0.15em] uppercase text-gray-dark font-medium">Email Address</label>
              <input 
                type="email" 
                placeholder="juan@email.com" 
                className="w-full px-[18px] py-3.5 border border-gray-light bg-cream font-sans text-[0.92rem] text-charcoal outline-none transition-all duration-300 focus:border-gold focus:bg-white"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="flex flex-col gap-2.5 mb-6">
              <label className="text-[0.72rem] tracking-[0.15em] uppercase text-gray-dark font-medium">Mobile / Viber Number</label>
              <input 
                type="tel" 
                placeholder="+63 930 616 6011" 
                className="w-full px-[18px] py-3.5 border border-gray-light bg-cream font-sans text-[0.92rem] text-charcoal outline-none transition-all duration-300 focus:border-gold focus:bg-white"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex flex-col gap-2.5">
                <label className="text-[0.72rem] tracking-[0.15em] uppercase text-gray-dark font-medium">Budget Range</label>
                <select 
                  className="w-full px-[18px] py-3.5 border border-gray-light bg-cream font-sans text-[0.92rem] text-charcoal outline-none transition-all duration-300 focus:border-gold focus:bg-white appearance-none"
                  value={formData.budget}
                  onChange={e => setFormData({...formData, budget: e.target.value})}
                >
                  <option value="">Select Budget</option>
                  <option>₱15M – ₱25M</option>
                  <option>₱25M – ₱40M</option>
                  <option>₱40M – ₱60M</option>
                  <option>₱60M+</option>
                </select>
              </div>
              <div className="flex flex-col gap-2.5">
                <label className="text-[0.72rem] tracking-[0.15em] uppercase text-gray-dark font-medium">Property Interest</label>
                <select 
                  className="w-full px-[18px] py-3.5 border border-gray-light bg-cream font-sans text-[0.92rem] text-charcoal outline-none transition-all duration-300 focus:border-gold focus:bg-white appearance-none"
                  value={formData.property}
                  onChange={e => setFormData({...formData, property: e.target.value})}
                >
                  <option value="">Select Location / Interest</option>
                  <option>Makati CBD</option>
                  <option>BGC (Bonifacio Global City)</option>
                  <option>Arca South (Taguig)</option>
                  <option>Circuit Makati</option>
                  <option>Vertis North (Quezon City)</option>
                  <option>Quezon City (Cloverleaf/Others)</option>
                  <option>Pasig / Ortigas / Parklinks</option>
                  <option>Nuvali (Sta. Rosa/Calamba)</option>
                  <option>Alabang / Las Piñas / Cerca</option>
                  <option>Cavite (Vermosa/Silang)</option>
                  <option>Bataan (Anvaya Cove)</option>
                  <option>Open to Recommendations</option>
                </select>
              </div>
            </div>
            <button type="submit" className="w-full py-[18px] bg-charcoal text-white font-sans text-[0.78rem] tracking-[0.2em] uppercase border-none cursor-none transition-colors duration-300 font-medium hover:bg-gold">
              Request Free Consultation <ArrowRight className="inline-block w-4 h-4 ml-1" />
            </button>
            <p className="text-[0.75rem] text-gray-mid text-center mt-4 leading-[1.6]">🔒 Your information is private and confidential. No spam, ever.</p>
          </form>
        ) : (
          <div className="text-center py-10">
            <div className="w-[60px] h-[60px] border-2 border-gold rounded-full flex items-center justify-center mx-auto mb-5 text-2xl text-gold">
              <Check />
            </div>
            <h3 className="font-serif text-[1.8rem] mb-2.5">Thank You.</h3>
            <p className="text-[0.9rem] text-gray-dark leading-[1.6]">Your request has been received. A specialist will reach out within <strong>2 hours</strong> with your personalized property brief and investment guide.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#080808] px-6 md:px-[60px] pt-20 pb-10">
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mb-10 opacity-40" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-14 md:gap-[60px] mb-14">
        <div className="footer-brand">
          <div className="font-serif text-[1.6rem] font-light text-white tracking-[0.08em]">Ayala Land <span className="text-gold">Premium Property</span></div>
          <p className="text-[0.88rem] font-light leading-[1.8] text-white/45 mt-5 max-w-[280px]">
            Represented by <strong>Ree Jay Mayo</strong>, Premier Property Specialist at Ayala Land Premier. 
            Dedicated to finding homes that are truly <em>For Keeps</em>.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <h5 className="text-[0.72rem] tracking-[0.2em] uppercase text-white/40 font-medium">Locations</h5>
          <ul className="list-none flex flex-col gap-3">
            {[
              'Laurean Residences (Makati)', 
              'Park Central Towers (Makati)', 
              'Parklinks (Pasig/QC)', 
              'Arbor Lanes (Arca South)', 
              'Anvaya Cove (Bataan)', 
              'Nuvali Heights (Sta. Rosa)', 
              'Vermosa (Cavite)'
            ].map(item => (
              <li key={item}><a href="#portfolio" className="text-[0.88rem] color-white/55 transition-colors duration-300 font-light hover:text-gold-light">{item}</a></li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-6">
          <h5 className="text-[0.72rem] tracking-[0.2em] uppercase text-white/40 font-medium">Company</h5>
          <ul className="list-none flex flex-col gap-3">
            {['About Ayala Land Premier', 'Our Legacy', 'Investor Relations', 'Sustainability', 'Careers'].map(item => (
              <li key={item}><a href="#" className="text-[0.88rem] color-white/55 transition-colors duration-300 font-light hover:text-gold-light">{item}</a></li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-6">
          <h5 className="text-[0.72rem] tracking-[0.2em] uppercase text-white/40 font-medium">Connect</h5>
          <ul className="list-none flex flex-col gap-3">
            <li><a href="tel:+639306166011" className="text-[0.88rem] color-white/55 transition-colors duration-300 font-light hover:text-gold-light">+63 930 616 6011</a></li>
            <li><a href="mailto:mayoreejay86@gmail.com" className="text-[0.88rem] color-white/55 transition-colors duration-300 font-light hover:text-gold-light">mayoreejay86@gmail.com</a></li>
            <li><a href="viber://chat?number=639306166011" className="text-[0.88rem] color-white/55 transition-colors duration-300 font-light hover:text-gold-light">Viber / WhatsApp Ready</a></li>
            <li><a href="#" className="text-[0.88rem] color-white/55 transition-colors duration-300 font-light hover:text-gold-light">Facebook</a></li>
            <li><a href="#" className="text-[0.88rem] color-white/55 transition-colors duration-300 font-light hover:text-gold-light">Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[0.75rem] text-white/30 tracking-[0.05em]">© 2025 Ayala Land Premium Property. All rights reserved.</p>
        <p className="text-[0.75rem] text-white/30 tracking-[0.05em]">Privacy Policy · Terms of Use · HLURB License</p>
      </div>
    </footer>
  );
};

const StickyCTA = () => {
  return (
    <div className="fixed bottom-9 right-9 z-[800] flex flex-col items-end gap-3 animate-fade-in-right">
      <a href="#contact" className="px-8 py-3.5 bg-gold text-white text-[0.75rem] tracking-[0.18em] uppercase font-medium border-none cursor-none shadow-[0_8px_32px_rgba(184,150,12,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(184,150,12,0.5)] whitespace-nowrap">
        Book a Private Viewing
      </a>
      <a href="https://wa.me/639306166011" className="w-[52px] h-[52px] bg-[#25D366] rounded-full flex items-center justify-center cursor-none shadow-[0_8px_24px_rgba(37,211,102,0.4)] transition-transform duration-200 hover:scale-110" target="_blank">
        <MessageCircle className="w-6.5 h-6.5 text-white" />
      </a>
    </div>
  );
};

const ExitPopup = () => {
  const [visible, setVisible] = useState(false);
  const [popupShown, setPopupShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 10 && !popupShown) {
        setVisible(true);
        setPopupShown(true);
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [popupShown]);

  const closePopup = () => setVisible(false);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9000] bg-black/70 backdrop-blur-[4px] flex items-center justify-center"
          onClick={closePopup}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white max-w-[560px] w-[90%] grid grid-cols-1 md:grid-cols-2 overflow-hidden relative"
            onClick={e => e.stopPropagation()}
          >
            <button className="absolute top-5 right-5 text-gray-mid text-xl cursor-none bg-none border-none transition-colors duration-300 hover:text-charcoal" onClick={closePopup}>
              <X />
            </button>
            <div className="hidden md:block bg-[url('https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=600&q=80')] bg-center bg-cover" />
            <div className="p-12 md:p-10">
              <p className="text-[0.65rem] tracking-[0.2em] uppercase text-gold mb-3.5">Exclusive Offer — Limited Time</p>
              <h3 className="font-serif text-[1.6rem] font-light leading-[1.2] mb-3.5">Before You Leave —<br/>Get Your Free<br/>Investment Guide</h3>
              <p className="text-[0.85rem] leading-[1.7] text-gray-dark mb-7 font-light">Receive our exclusive 2025 Ayala Land Premium Property Investment Brief — including price appreciation data, payment schedules, and ROI projections. Complimentary, no obligations.</p>
              <input className="w-full px-4 py-3 mb-3 border border-gray-light font-sans text-[0.88rem] outline-none transition-all duration-300 focus:border-gold" type="email" placeholder="Enter your email address"/>
              <button className="w-full py-3.5 bg-gold text-white font-sans text-[0.75rem] tracking-[0.18em] uppercase border-none cursor-none transition-colors duration-300 font-medium hover:bg-[#9a7b08]">
                Send Me the Free Guide <ArrowRight className="inline-block w-4 h-4 ml-1" />
              </button>
              <button className="block text-center mt-3.5 text-[0.75rem] text-gray-mid cursor-none underline bg-none border-none transition-colors duration-300 w-full hover:text-charcoal" onClick={closePopup}>
                No thanks, I'm not interested in investing
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Main App ---

export default function App() {
  const isNewsletter = typeof window !== 'undefined' && window.location.pathname === '/newsletter';

  if (isNewsletter) {
    return (
      <div className="min-h-screen">
        <CustomCursor />
        <Newsletter />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <CustomCursor />

      <div className="bg-gold px-6 md:px-[60px] py-3 flex items-center justify-center gap-4 text-[0.78rem] tracking-[0.12em] uppercase text-white font-medium">
        <div className="w-1.5 h-1.5 bg-white rounded-full animate-blink" />
        Limited Units Now Available — 2025 Pre-Selling Prices Still in Effect
        <div className="w-1.5 h-1.5 bg-white rounded-full animate-blink" />
      </div>

      <Navbar />
      
      <main>
        <Hero />
        <TrustStrip />
        <Portfolio />
        <RFOProfile />
        <Lifestyle />
        <Investment />
        <About />
        <SalesPerformance />
        <Specialist />
        <LeadCapture />
      </main>

      <Footer />
      <StickyCTA />
      <ExitPopup />
    </div>
  );
}
