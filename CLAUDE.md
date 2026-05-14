# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page luxury real-estate landing page for Ayala Land Premium Property, scaffolded from a Google AI Studio applet template. React 19 + Vite 6 + TypeScript + Tailwind CSS v4, with `motion` (Motion One / Framer Motion successor) for animation and `lucide-react` for icons.

## Commands

- `npm install` — install dependencies (Node.js required, no lockfile committed).
- `npm run dev` — Vite dev server on `0.0.0.0:3000`. HMR can be disabled with `DISABLE_HMR=true` (used by AI Studio to prevent flicker during agent edits — do not silently remove that env check in `vite.config.ts`).
- `npm run build` — production build to `dist/`.
- `npm run preview` — serve the built bundle.
- `npm run lint` — **type-check only** (`tsc --noEmit`). There is no ESLint, Prettier, or test runner configured; "lint" is the only pre-commit gate.
- `npm run clean` — remove `dist/`.

## Architecture

### One-file UI

The entire site lives in `src/App.tsx` (~865 lines). Every section, popup, navbar, footer, and the custom cursor is a local component in that file, composed in fixed order by the default-exported `App`:

```
CustomCursor → top promo bar → Navbar → Hero → TrustStrip → Portfolio →
RFOProfile → Lifestyle → Investment → About → SalesPerformance →
Specialist → LeadCapture → Footer → StickyCTA → ExitPopup
```

When adding/removing a section, update the JSX in `App` and (if it's a nav target) the `Navbar` link list and the section's `id=` anchor. Section ids are lowercased item names (`#portfolio`, `#rfo`, etc.).

`PortfolioData` (around `src/App.tsx:197`) is a hard-coded `{ ALP, Alveo }` × `{ "Pre-Selling", "RFO" }` object consumed by `Portfolio`. New developments are added there, not from any external source.

### Styling — Tailwind v4 + design tokens in CSS

Tailwind v4 is wired through the `@tailwindcss/vite` plugin (not PostCSS). There is **no `tailwind.config.js`** — the design system is declared in `src/index.css`:

- `@theme { … }` block defines brand colors (`--color-cream`, `--color-charcoal`, `--color-gold`, `--color-gold-light`, `--color-gold-pale`, `--color-gray-light`, `--color-gray-mid`, `--color-gray-dark`) and fonts (`--font-serif` Cormorant Garamond, `--font-sans` Jost). These auto-generate utilities like `bg-cream`, `text-gold`, `font-serif`.
- `@layer components` declares reusable classes: `.btn-primary`, `.btn-ghost`, `.section-eyebrow`, `.section-title`, `.section-body`. New brand-styled buttons/headings should use these instead of duplicating the long utility chains.
- Custom keyframes (`scrollPulse`, `heroZoom`, `blink`, `fadeInRight`) are defined here and exposed as `animate-*` classes.

When adjusting colors or typography, change the `@theme` tokens — don't hard-code hex values inline.

### Custom cursor

`body { cursor: none }` is global, and a `<CustomCursor />` div is rendered at the top of `App`. Every interactive element (`<a>`, `<button>`, form inputs that look clickable) must include `cursor-none` in its className, otherwise the native cursor reappears on hover and breaks the effect. The cursor itself is hidden on mobile via `hidden md:block`.

### Path alias

`@/*` resolves to the **repository root**, not `src/` (`tsconfig.json` paths + `vite.config.ts` resolve.alias both point at `.`). So `@/src/foo` is correct, `@/foo` for a file under `src` is not.

### Environment / "AI Studio" plumbing

`vite.config.ts` injects `process.env.GEMINI_API_KEY` at build time from `.env*` (loaded via `loadEnv`). `.env.example` also documents `APP_URL`. **Nothing in `src/` currently reads these** — `@google/genai`, `express`, `dotenv`, and `tsx` are listed in `package.json` but not imported anywhere. Treat them as scaffolding from the AI Studio template; if you're not adding Gemini/server functionality, don't assume an existing integration to extend.

### Forms / interactions

- `LeadCapture` and `ExitPopup` are client-only — submissions just flip local state (`setSubmitted(true)`) and show a thank-you panel. There is no backend, no fetch, no analytics. If asked to "wire up the form," confirm where it should post before inventing an endpoint.
- `ExitPopup` triggers on `mouseleave` with `e.clientY < 10` and only fires once per page load (guarded by `popupShown`).

## Conventions

- TypeScript is loose here: several components use `any` for props (e.g. `PropertyCard`) and `tsc --noEmit` is the only check. Match the surrounding style rather than introducing strict typing piecemeal.
- Tailwind arbitrary values (`text-[0.78rem]`, `tracking-[0.18em]`, `py-[15px]`) are used heavily to hit exact luxury-brand spec — preserve them when editing nearby markup.
- All copy is in `src/App.tsx` as inline JSX strings; there is no i18n layer.
