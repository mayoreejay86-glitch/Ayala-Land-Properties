import type { ReactNode } from 'react';
import { Phone, Mail, MessageCircle, QrCode } from 'lucide-react';
import { CONTACT } from '../data';
import { SectionHeader } from '../shared/SectionHeader';
import { Reveal } from '../shared/Reveal';

export function ContactSection() {
  const s = CONTACT.specialist;
  return (
    <section id="contact" className="relative py-28 md:py-36 bg-forest">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <SectionHeader
          eyebrow={CONTACT.eyebrow}
          title={CONTACT.title}
          body={CONTACT.body}
        />

        <Reveal delay={0.1}>
          <div className="mt-20 pl-glass-dark grid lg:grid-cols-[0.85fr_1.15fr] overflow-hidden">
            {/* Portrait */}
            <div className="relative" style={{ minHeight: '420px' }}>
              <img
                src={s.portrait}
                alt={`${s.name} — ${s.title}`}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-[0.62rem] tracking-[0.32em] uppercase text-gold-warm mb-1.5">
                  Your Specialist
                </div>
                <div className="font-serif text-2xl text-ivory leading-tight">{s.name}</div>
                <div className="text-ivory/70 text-[0.85rem] font-light mt-1">{s.title}</div>
              </div>
            </div>

            {/* Details */}
            <div className="p-8 md:p-12 flex flex-col justify-between gap-10">
              <ul className="space-y-6">
                <ContactRow
                  icon={<Phone size={16} strokeWidth={1.4} className="text-gold-warm" />}
                  label="Mobile"
                  value={s.mobile}
                  href={`tel:${s.mobile.replace(/\s/g, '')}`}
                />
                <ContactRow
                  icon={<Mail size={16} strokeWidth={1.4} className="text-gold-warm" />}
                  label="Email"
                  value={s.email}
                  href={`mailto:${s.email}`}
                />
                <ContactRow
                  icon={<MessageCircle size={16} strokeWidth={1.4} className="text-gold-warm" />}
                  label="Viber"
                  value={s.viber}
                  href={`viber://chat?number=${encodeURIComponent(s.viber.replace(/\s/g, ''))}`}
                />
                <ContactRow
                  icon={<MessageCircle size={16} strokeWidth={1.4} className="text-gold-warm" />}
                  label="WhatsApp"
                  value={s.whatsapp}
                  href={`https://wa.me/${s.whatsapp.replace(/[^0-9]/g, '')}`}
                />
              </ul>

              <div className="flex items-center gap-6 pt-6 border-t border-gold-warm/15">
                <div
                  className="w-24 h-24 flex items-center justify-center border border-gold-warm/30 text-ivory/40"
                  aria-label="QR code placeholder"
                >
                  <QrCode size={56} strokeWidth={0.8} />
                </div>
                <div>
                  <div className="text-[0.62rem] tracking-[0.3em] uppercase text-gold-warm mb-1.5">
                    Scan to Save
                  </div>
                  <p className="text-ivory/70 text-[0.85rem] font-light leading-[1.7] max-w-[28ch]">
                    Add your specialist’s contact details directly to your phone, or open a private viewing chat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <li>
      <a
        href={href}
        className="flex items-center gap-5 group"
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noreferrer' : undefined}
      >
        <div className="w-10 h-10 flex items-center justify-center border border-gold-warm/30 group-hover:border-gold-warm/70 transition-colors duration-300 flex-shrink-0">
          {icon}
        </div>
        <div>
          <div className="text-[0.6rem] tracking-[0.3em] uppercase text-ivory/45 mb-0.5">
            {label}
          </div>
          <div className="text-ivory text-[0.98rem] font-light group-hover:text-gold-warm transition-colors duration-300">
            {value}
          </div>
        </div>
      </a>
    </li>
  );
}
