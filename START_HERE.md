# Keshav Mantry Portfolio — V2

This iteration is intentionally darker and more restrained than V1.

## What changed

1. **0 → 100 intro**
   - Full-screen loading state.
   - Large count at the lower edge.
   - Bottom progress line.
   - Fades into the portfolio after reaching 100.

2. **Near-black visual language**
   - Removed the mint/green accent system.
   - Ambient particles are now monochrome and much quieter.
   - Project artwork uses neutral white/grey tones.

3. **Custom cursor**
   - Small pointer dot + trailing ring on desktop.
   - Ring expands when hovering links/buttons.
   - Automatically disabled for coarse/mobile pointers.

4. **Hero hierarchy**
   - `Software Engineer · Keshav Mantry` is now a small eyebrow.
   - `Building ideas into` is the main statement.
   - `software` is the supporting large line rather than a four-line name lockup.

5. **Project truthfulness**
   - Removed **Video Conferencing**.
   - Kept **Splitwise** and **CogniScript**.

6. **Experience**
   - Kept **Infosys Limited** and **Zycus Infotech**.
   - The section remains editorial rather than a résumé table.

## Where to edit content

Most text is in:

`src/data/site.ts`

## Main visual controls

Most visual styling is in:

`src/styles.css`

Useful variables are at the top of that file:

- `--bg`
- `--panel`
- `--text`
- `--muted`
- `--line`
- `--accent`

The current accent is intentionally close to white, not green.

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown by the terminal.

## Important

The implementation is an original recreation of the visual behaviors we observed in the reference videos. It does **not** contain Vishesh's source code or claim access to his private implementation.
