import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-cream text-charcoal">
      <nav className="flex items-center justify-between px-6 md:px-[60px] py-6">
        <span className="font-serif text-xl tracking-[0.08em]">
          Prima<span className="text-gold">.</span>
        </span>
        <Link
          href="/dashboard"
          className="text-[0.72rem] tracking-[0.2em] uppercase text-charcoal border-b border-gold pb-1 hover:text-gold"
        >
          Agent Sign-in
        </Link>
      </nav>

      <section className="px-6 md:px-[60px] pt-16 md:pt-28 pb-24 max-w-[1100px] mx-auto">
        <p className="eyebrow mb-6">For Premier-tier real estate specialists</p>
        <h1 className="font-serif text-[clamp(2.4rem,5.5vw,4.8rem)] font-light leading-[1.05] mb-8 max-w-[920px]">
          Turn a two-minute client brief into a
          <em className="italic text-gold not-italic"> proposal your client actually opens</em>.
        </h1>
        <p className="text-lg font-light leading-[1.75] text-gray-dark max-w-[680px] mb-10">
          Prima generates a mobile-first, editorial proposal page for each of
          your clients — not a PDF, not a slide deck. Share the link on Viber,
          get a ping the moment they open it, and follow up with something to say.
        </p>
        <div className="flex flex-wrap items-center gap-6">
          <Link
            href="/r/aXk7q9"
            className="inline-block px-10 py-4 bg-charcoal text-white text-[0.75rem] tracking-[0.22em] uppercase font-medium hover:bg-gold transition-colors"
          >
            View a Sample Proposal
          </Link>
          <Link
            href="/dashboard"
            className="text-[0.75rem] tracking-[0.22em] uppercase text-charcoal border-b border-gold pb-1 hover:text-gold"
          >
            Try the Dashboard →
          </Link>
        </div>
      </section>

      <section className="px-6 md:px-[60px] py-24 border-t border-gold/30 max-w-[1100px] mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              n: "01",
              title: "Briefs in your voice",
              body: "Type the client's requirements — or drop a voice memo from the call. Prima structures it and writes the proposal in your voice.",
            },
            {
              n: "02",
              title: "Interactive, not a PDF",
              body: "Every proposal is a hosted mobile page with a live payment calculator, cinematic property visuals, and clean share previews.",
            },
            {
              n: "03",
              title: "You know when it lands",
              body: "Get pinged the moment your client opens the proposal — and where on the page they spent their time.",
            },
          ].map((c) => (
            <div key={c.n}>
              <p className="font-serif text-2xl text-gold-light mb-4">{c.n}</p>
              <h3 className="font-serif text-xl mb-3">{c.title}</h3>
              <p className="text-sm font-light leading-[1.75] text-gray-dark">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="px-6 md:px-[60px] py-8 border-t border-gold/30 text-[0.65rem] tracking-[0.25em] uppercase text-gray-dark/70 text-center">
        Prima · Built in the Philippines for Premier-tier specialists
      </footer>
    </main>
  );
}
