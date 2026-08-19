# Keshav Mantry — Creative Engineering Portfolio

A dark, editorial single-page React portfolio designed around the visual direction established during the Keshav / Vishesh.dev comparison.

## Run locally

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
npm run preview
```

## Main stack

- React + TypeScript + Vite
- GSAP + ScrollTrigger
- Lenis smooth scrolling
- p5.js for the original monochrome hero canvas

## Where to edit

- `src/data/site.ts` — name, role, contact links, experience, projects, metrics, technologies.
- `src/App.tsx` — section structure and animation orchestration.
- `src/styles.css` — complete visual system, typography, spacing and responsive behavior.
- `src/components/IntroLoader.tsx` — 0 → 100 intro and reveal transition.
- `src/components/FluidCanvas.tsx` — hero motion field.
- `src/components/ProjectVisual.tsx` — project artwork.

## Animation direction

The portfolio uses the tactile, interactive spirit of vishesh.dev as a reference. Public information from Vishesh Raheja describes the original portfolio as React + p5.js + GSAP, with p5.js used for the paint-style hero interaction and moving gradient work in the About section. This repository does **not** reproduce or claim to contain the original site's source code.

## Final V3 UX decisions

- No custom cursor.
- No green/mint palette.
- No "Scroll to explore" instruction.
- No duplicated hero reveal after the loader.
- No video-conferencing project.
- Near-black monochrome art with restrained white motion.
