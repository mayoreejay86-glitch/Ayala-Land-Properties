import Link from "next/link";

// Placeholder — auth + real data land in the next sprint (see README §Next).
export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-cream text-charcoal">
      <nav className="flex items-center justify-between px-6 md:px-[60px] py-6 border-b border-gold/30">
        <Link href="/" className="font-serif text-xl tracking-[0.08em]">
          Prima<span className="text-gold">.</span>
        </Link>
        <span className="text-[0.7rem] tracking-[0.2em] uppercase text-gray-dark">
          Ree jay · Ayala Land Premier
        </span>
      </nav>

      <section className="px-6 md:px-[60px] pt-16 pb-24 max-w-[1100px] mx-auto">
        <p className="eyebrow mb-4">Your studio</p>
        <h1 className="font-serif text-4xl md:text-5xl font-light leading-tight mb-3">
          Good evening, Ree jay.
        </h1>
        <p className="text-lg font-light text-gray-dark mb-12">
          You have <span className="text-gold">1 open brief</span> and{" "}
          <span className="text-gold">2 proposals</span> awaiting client action.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <Card
            title="New Brief"
            body="Capture a client's requirements in 30 seconds, then generate a proposal."
            href="/dashboard/briefs/new"
            cta="Start a brief →"
          />
          <Card
            title="Inventory"
            body="Manage the properties you show. Photos, prices, payment terms."
            href="/dashboard/properties"
            cta="Manage properties →"
          />
          <Card
            title="Recent proposals"
            body="See what your clients opened, and when."
            href="/r/aXk7q9"
            cta="View sample →"
          />
        </div>

        <div className="mt-16 border-t border-gold/40 pt-10">
          <p className="text-[0.7rem] tracking-[0.2em] uppercase text-gray-mid mb-3">
            MVP — not yet wired
          </p>
          <p className="text-sm font-light leading-[1.75] text-gray-dark max-w-[720px]">
            This dashboard is a placeholder. Auth (Supabase magic link), inventory
            CRUD, and proposal history are queued for the next sprint. The proposal
            experience at <code className="font-mono text-gold">/r/aXk7q9</code> is
            fully working — that's the piece you can show agents today.
          </p>
        </div>
      </section>
    </main>
  );
}

function Card({ title, body, href, cta }: { title: string; body: string; href: string; cta: string }) {
  return (
    <Link href={href} className="block border border-gold/40 p-8 hover:border-gold hover:bg-white/40 transition-colors">
      <h3 className="font-serif text-2xl mb-3">{title}</h3>
      <p className="text-sm font-light leading-[1.7] text-gray-dark mb-6">{body}</p>
      <p className="text-[0.72rem] tracking-[0.2em] uppercase text-gold">{cta}</p>
    </Link>
  );
}
