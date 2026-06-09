# CLAUDE.md — Pinnacle Tubs Website

## What this project is
Marketing website for **Pinnacle Tubs Inc**, a hot tub sales/service/repair shop in
Big Bear Lake, CA (41529 Big Bear Blvd, Big Bear Lake, CA 92315 · pinnacle.tubs@gmail.com
· 909-936-6206 · instagram.com/pinnacle.tubs). Replaces their Wix site (pinnacletubs.com).

Signature feature: a **GTA VI–style scroll hero** — "PINNACLE TUBS" rendered as huge
masked text, hot tub video visible through the letterforms; on scroll the camera zooms
through the text until the video fills the screen, then page content reveals.

Visual direction: **dark + cinematic**. Near-black base, steam white, warm amber accent
(underwater tub lighting). Deployed on **Vercel**.

## Tech stack (do not substitute without asking)
- Next.js 14+ (App Router, TypeScript, `app/` directory)
- Tailwind CSS
- GSAP + ScrollTrigger (animation), Lenis (smooth scroll)
- No CMS, no database, no auth. Content lives in typed files under `data/`.

## Commands
- `npm run dev` — local dev server
- `npm run build` — production build (must pass before any commit is considered done)
- `npm run lint` — ESLint (zero errors is a hard gate; warnings are advisory)
- `npx tsc --noEmit` — type check (zero errors is a hard gate)

## Architecture & module boundaries
Respect these boundaries. Do not let one module grow to do everything.

```
app/                  # routes only: layout, metadata, page composition. No animation logic here.
  page.tsx            # Home (hero + sections)
  tubs/page.tsx       # Inventory
  contact/page.tsx    # Contact
components/
  hero/               # The GTA scroll effect ONLY. Owns its GSAP timeline.
  sections/           # One file per home-page section (Benefits, Gallery, CalSpas, Warranty)
  ui/                 # Nav, Footer, Button, shared primitives. No business content.
lib/
  gsap.ts             # GSAP plugin registration (single place)
  lenis.tsx           # SmoothScrollProvider (single place)
data/
  tubs.ts             # Tub models: name, price, status, images. Typed with `Tub` interface.
  site.ts             # Contact info, socials, copy constants
public/
  assets/             # User-provided media (video, logo, photos) — read-only, never rename
```

### Responsibility rules
- Animation logic lives in the component that owns the animated DOM. Pages compose; they don't animate.
- All tub/product data flows from `data/tubs.ts`. Never hardcode a price or model name in a component.
- GSAP plugins are registered once in `lib/gsap.ts`. Components import from there, never call
  `gsap.registerPlugin` themselves.
- Server Components by default; add `"use client"` only where GSAP/Lenis/interactivity requires it,
  and keep client boundaries as small as possible.

## Maintainability standards (these are review criteria, not suggestions)
Every change is evaluated on:
1. **Modularity** — cohesive logic stays together; no god-components.
2. **Coupling** — no unnecessary cross-module imports (e.g., a section importing hero internals).
3. **Responsibility** — behavior is added in the module that should own it.
4. **API discipline** — components communicate via props/types, not by reaching into each other's DOM or state.
5. **Testability & extensibility** — adding a 5th tub model or a new section must require no refactor.

## Hard constraints
- Keep components under ~150 lines; extract when exceeded.
- Every ScrollTrigger/Lenis instance must be cleaned up (use `gsap.context()` + revert in
  `useEffect` cleanup, or `useGSAP`). Memory leaks on route change are a bug.
- `prefers-reduced-motion` must be respected: hero degrades to a static masked image with no pinning.
- Mobile (≥ 375px) must work: test the hero at narrow widths; mask scaling math may not assume landscape.
- Use `next/image` for all images; hero video is `<video muted playsInline autoPlay loop preload="metadata">`.
- All copy/contact data comes from `data/site.ts` — single source of truth.
- Do not add dependencies beyond the stack above without stating why first.
- Never commit `node_modules`, `.env*`, or files over 50 MB (Vercel/git limits).

## Workflow expectations
- Work milestone by milestone (see BUILD_PROMPT.md). Do not start a milestone before the
  previous one's acceptance criteria pass.
- One milestone = one coherent commit with a descriptive message (`feat: hero scroll mask`, not `update`).
- Before declaring a milestone done, run: `npm run lint && npx tsc --noEmit && npm run build`.
  All three must pass — treat lint errors like build failures.
- If assets in `public/assets/` are missing, build with clearly-labeled placeholders
  (solid gradient video poster, placeholder images) and note it; do not block.
- If a requirement is ambiguous, state your assumption in the commit message rather than
  silently inventing behavior.
