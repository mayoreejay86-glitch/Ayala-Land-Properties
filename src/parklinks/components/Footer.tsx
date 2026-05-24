import { BRAND, FOOTER, NAV_LINKS } from '../data';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-forest-deep border-t border-gold-warm/15 pt-20 pb-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-[1.2fr_1fr_1fr] gap-14">
          {/* Brand */}
          <div>
            <div className="font-serif text-3xl text-ivory mb-3">
              <span className="pl-shimmer-text">{BRAND.estate}</span>
            </div>
            <div className="text-[0.7rem] tracking-[0.32em] uppercase text-gold-warm mb-5">
              {BRAND.developers}
            </div>
            <p className="text-ivory/55 font-light leading-[1.8] text-[0.9rem] max-w-md">
              {BRAND.description}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-[0.62rem] tracking-[0.32em] uppercase text-ivory/40 mb-5">
              Explore
            </div>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-ivory/70 hover:text-gold-warm transition-colors duration-300 text-[0.9rem] font-light"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cross-link to main landing + legal */}
          <div>
            <div className="text-[0.62rem] tracking-[0.32em] uppercase text-ivory/40 mb-5">
              Wider Portfolio
            </div>
            <a
              href="#/"
              className="block text-ivory/70 hover:text-gold-warm transition-colors duration-300 text-[0.9rem] font-light mb-7"
            >
              Ayala Land Premium Property →
            </a>

            <div className="text-[0.62rem] tracking-[0.32em] uppercase text-ivory/40 mb-3">
              Operated by
            </div>
            <ul className="space-y-1.5 text-ivory/60 font-light text-[0.85rem]">
              {FOOTER.legalLines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gold-warm/15 flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <p className="text-ivory/40 font-light text-[0.72rem] leading-[1.7] max-w-3xl">
            {FOOTER.disclaimer}
          </p>
          <div className="text-ivory/35 text-[0.7rem] tracking-[0.2em] uppercase">
            © {year} {BRAND.estate}
          </div>
        </div>
      </div>
    </footer>
  );
}
