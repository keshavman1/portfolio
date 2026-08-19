# Reference → implementation map

| Reference idea | Implementation in this repo |
|---|---|
| Large editorial hero typography | `.hero`, `.hero-title-line` in `src/styles.css` |
| Serif/italic emphasis word | `.hero-title-line em`, `.stack-head em`, `.work-intro em`, `.contact-copy em` |
| Dark, cinematic page | `--bg`, `--panel`, `--line` design tokens |
| Ambient visual behind hero | `src/components/FluidCanvas.tsx` using p5.js |
| Pointer-reactive movement | p5 mouse influence inside `FluidCanvas` |
| Smooth scrolling | Lenis initialization in `src/App.tsx` |
| Scroll reveal | `src/components/Reveal.tsx` with GSAP + ScrollTrigger |
| Subtle parallax | `data-parallax` attributes + ScrollTrigger |
| Tech marquee | `.tech-marquee` |
| Architecture-inspired visual language | `.system-diagram` |
| Visual project blocks | `ProjectVisual.tsx` + CSS-generated shapes |
| Numbered process section | `process` data + `.process-card` |
| Strong final CTA | `contact-section` |
| Grain / film texture | `.grain` CSS overlay |
| Reduced motion support | `@media (prefers-reduced-motion: reduce)` |

## Where to push it further

### 1. Canvas
Replace the current ambient particle field with a richer shader or fluid simulation only after the content is stable. The current effect is deliberately lightweight and deterministic.

### 2. Project interaction
Make each project visual respond to cursor position and reveal a case-study drawer on click.

### 3. Architecture section
Bind the visual graph to actual project architecture JSON so a recruiter can hover a node and see what it does.

### 4. Experience
Add company logos only if you have permission / appropriate assets. Keep the copy more important than decoration.

### 5. Performance
Lazy-load heavy project media, keep canvas rendering bounded, use `prefers-reduced-motion`, and avoid stacking multiple continuous WebGL effects on the same viewport.
