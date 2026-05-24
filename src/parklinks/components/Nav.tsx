import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, BRAND } from '../data';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const surface = scrolled
    ? 'bg-forest-deep/85 backdrop-blur-xl border-b border-gold-warm/15 py-4'
    : 'bg-transparent py-7';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${surface}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between gap-8">
          <a
            href="#hero"
            className="font-serif text-xl md:text-2xl tracking-[0.06em] text-ivory"
            aria-label={`${BRAND.estate} home`}
          >
            <span className="pl-shimmer-text">{BRAND.estate}</span>
            <span className="ml-2 text-ivory/40 text-xs tracking-[0.32em] uppercase hidden md:inline">
              Ayala Land × Eton
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-9">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative text-[0.72rem] tracking-[0.22em] uppercase font-medium text-ivory/75 hover:text-ivory transition-colors duration-300 after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-gold-warm after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#signup"
            className="hidden md:inline-flex items-center gap-2 text-[0.7rem] tracking-[0.22em] uppercase font-medium px-6 py-3 border border-gold-warm/55 text-ivory hover:border-gold-warm hover:bg-gold-warm/10 transition-all duration-300"
          >
            Schedule a Presentation
          </a>

          <button
            type="button"
            className="lg:hidden text-ivory p-2"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-500 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-forest-deep/95 backdrop-blur-xl" />
        <div className="relative h-full flex flex-col items-center justify-center gap-7 px-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-serif text-3xl text-ivory hover:text-gold-warm transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#signup"
            onClick={() => setOpen(false)}
            className="mt-6 pl-btn-primary"
          >
            Schedule a Presentation
          </a>
        </div>
      </div>
    </>
  );
}
