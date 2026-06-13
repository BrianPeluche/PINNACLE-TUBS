# Pinnacle Tubs Website — Owner Handoff

A plain-language guide for keeping the site running and making safe edits.
You do not need to be a programmer to read this.

## Live site

- Current review URL: https://pinnacle-tubs.vercel.app
- Hosting: Vercel (the service that puts the site online)
- Code: GitHub repository `BrianPeluche/PINNACLE-TUBS`

## The page, top to bottom (approved flow)

1. Hero — the big "PINNACLE TUBS" video intro
2. Relaxation line — "Experience the art of pure relaxation."
3. Water bridge — close-up water video
4. Why buy a Pinnacle tub — benefits + photos
5. CalSpa Authorized Hot Tub Dealer — logo + "See Our New Models" button
6. What's Included / Warranty — what comes with each tub + warranty info
7. Contact — call, email, address, directions, Instagram, photos
8. Footer — copyright + contact line

This order and look are **approved and locked**. Treat them as final.

## What NOT to touch

These are done and signed off. Do not let anyone (including an AI assistant)
edit, reorder, restyle, or "improve" them without a deliberate decision:

- The Hero and its scroll animation
- All the scroll/video transitions between sections
- The animation engine files: `lib/useScrollScrub.ts`, `lib/gsap.ts`,
  `lib/lenis.tsx`, `components/sections/ScrubSection.tsx`
- The overall layout, spacing, and colors

The repository's `CLAUDE.md` file spells out this hard boundary in detail.

## Where the contact info lives

Right now the phone, email, and address shown on the site come from one file:

- `data/site.ts` → the `contact` section (street, city, state, zip, phone, email)

Note: a few other pieces of text (section wording, the Instagram link in the
Contact section) are currently written directly inside the section files under
`components/sections/`. If you change the phone or email, see "Change contact
details safely" below, and double-check the Contact section too.

## Where images and videos live

- All photos and videos: the `public/assets/` folder
- The site only uses the optimized versions:
  - Photos end in `-web.jpg`
  - Background videos end in `-scrub.mp4` and each has a matching `-poster.jpg`

## Asset rule (important)

- **Do not commit raw, full-size camera files** (huge `.jpeg` / `.mp4` straight
  from a phone or camera). They bloat the project and slow everything down.
- Always add an optimized version instead (a `-web.jpg` photo under ~500 KB, or
  a `-scrub.mp4` video). The raw originals are intentionally ignored by Git.

## How to change photos safely

1. Decide which photo you want to swap (for example, a Contact photo).
2. Create an optimized `-web.jpg` version (smaller than ~500 KB, longest side
   around 1600–2000 pixels).
3. Put it in `public/assets/`.
4. Update the matching filename inside the relevant file in
   `components/sections/` (for example `Contact.tsx`).
5. Keep the same shape/orientation so the layout does not shift.
6. Run the checks (see "How to deploy") and review the live preview.

If unsure, ask a developer rather than guessing. Do not delete the old photo
until you have confirmed the new one shows correctly.

## How to change contact details safely

1. Open `data/site.ts`.
2. Edit only the values inside the `contact` block (phone, email, address).
3. Also check `components/sections/Contact.tsx` for the phone/email/Instagram
   shown in the Contact section, in case any value is written there directly.
4. Keep the phone link format consistent (`tel:` uses `+1` then the digits).
5. Run the checks and review the live preview before sharing.

## How to deploy

Deployment is automatic: when changes are pushed to the `main` branch on
GitHub, Vercel builds and publishes them within a minute or two.

Before pushing, a developer should run and pass all three:

- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`

Then review the live URL to confirm nothing looks off.

## How to roll back on Vercel

If a change ever breaks the live site:

1. Go to the Vercel dashboard for this project.
2. Open the **Deployments** tab.
3. Find the last good deployment (one from before the problem).
4. Use the menu on that deployment and choose **Promote to Production**
   (also called "Rollback" / "Redeploy").

The site returns to that known-good version immediately. This does not require
touching the code.

## What still needs to happen before final launch

See `LAUNCH-CHECKLIST.md` for the full list. The big ones:

- Confirm final business name, phone, email, address, hours, and Instagram
- Connect the final custom domain (e.g. pinnacletubs.com)
- Add SEO basics (search-engine metadata, sitemap, robots, business listing
  data) **after** the final domain is decided
- Final owner sign-off on design, copy, and photos
