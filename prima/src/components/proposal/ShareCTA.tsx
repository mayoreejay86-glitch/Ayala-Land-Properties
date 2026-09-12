"use client";

import type { Proposal } from "@/lib/types";
import { useState } from "react";

export function ShareCTA({ proposal }: { proposal: Proposal }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `Hi ${proposal.brief.name} — I put together a few options based on what we talked about. Take a look here whenever you have a moment:`;

  async function shareNative() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `A private proposal for ${proposal.brief.name}`,
          text: shareText,
          url: shareUrl,
        });
      } catch { /* user cancelled */ }
      return;
    }
    // Fallback: copy to clipboard
    await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const viberHref = `viber://forward?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
  const waHref = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
  const emailHref = `mailto:?subject=${encodeURIComponent(
    `A private proposal for ${proposal.brief.name}`
  )}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <button
        onClick={shareNative}
        className="px-8 py-3 bg-gold text-white text-[0.72rem] tracking-[0.22em] uppercase font-medium hover:bg-charcoal transition-colors"
      >
        {copied ? "Link Copied" : "Share Proposal"}
      </button>
      <a
        href={viberHref}
        className="px-8 py-3 border border-gold text-charcoal text-[0.72rem] tracking-[0.22em] uppercase font-medium hover:bg-gold hover:text-white transition-colors"
      >
        Send via Viber
      </a>
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className="px-8 py-3 border border-gold text-charcoal text-[0.72rem] tracking-[0.22em] uppercase font-medium hover:bg-gold hover:text-white transition-colors"
      >
        WhatsApp
      </a>
      <a
        href={emailHref}
        className="px-8 py-3 border border-gold text-charcoal text-[0.72rem] tracking-[0.22em] uppercase font-medium hover:bg-gold hover:text-white transition-colors"
      >
        Email
      </a>
    </div>
  );
}
