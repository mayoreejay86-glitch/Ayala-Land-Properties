import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Prima — AI Proposal Pages for Real Estate Specialists",
    template: "%s · Prima",
  },
  description:
    "Beautiful, mobile-first AI proposal pages for Philippine luxury real estate specialists. Generated in 60 seconds. Viber-ready.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3001"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
