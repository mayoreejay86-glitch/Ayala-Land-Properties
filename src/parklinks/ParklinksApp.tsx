import { useEffect } from 'react';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { EstateOverview } from './components/EstateOverview';
import { FeaturedDevelopments } from './components/FeaturedDevelopments';
import { InvestmentHighlights } from './components/InvestmentHighlights';
import { Lifestyle } from './components/Lifestyle';
import { MarketInsights } from './components/MarketInsights';
import { SignupForm } from './components/SignupForm';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BRAND } from './data';

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Parklinks — Ayala Land × Eton Properties',
  description:
    'A 35-hectare premier mixed-use estate by Ayala Land and Eton Properties, connecting Quezon City and Pasig.',
  areaServed: ['Quezon City', 'Pasig', 'Metro Manila'],
  brand: ['Ayala Land Premier', 'Alveo Land', 'Eton Properties'],
  url: typeof window !== 'undefined' ? window.location.href : undefined,
};

export function ParklinksApp() {
  useEffect(() => {
    document.body.classList.add('parklinks-mode');
    const prevTitle = document.title;
    document.title = `${BRAND.estate} — ${BRAND.tagline} | Ayala Land × Eton`;

    // Inject JSON-LD structured data for SEO.
    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.id = 'parklinks-jsonld';
    ld.textContent = JSON.stringify(JSON_LD);
    document.head.appendChild(ld);

    return () => {
      document.body.classList.remove('parklinks-mode');
      document.title = prevTitle;
      document.getElementById('parklinks-jsonld')?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-forest-deep text-ivory overflow-x-hidden">
      <Nav />
      <main>
        <Hero />
        <EstateOverview />
        <FeaturedDevelopments />
        <InvestmentHighlights />
        <Lifestyle />
        <MarketInsights />
        <SignupForm />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
