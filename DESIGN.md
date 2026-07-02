---
name: 3M — Science, Applied (redesign target)
colors:
  background: "oklch(0.99 0 0)"        # 3M white ground (brand-faithful; near-pure #fff)
  surface: "oklch(0.965 0 0)"          # light grey alt-section
  text: "oklch(0.17 0 0)"              # near-black (brand #000, softened per impeccable)
  textSecondary: "oklch(0.42 0 0)"     # #4b4b4b captions/meta
  border: "oklch(0.90 0 0)"            # hairline #e5e5e5
  brandRed: "oklch(0.55 0.21 26)"     # 3M signature red #d10411 — PINNED
  brandRedDeep: "oklch(0.47 0.20 26)" # red hover/active
typography:
  headingFamily: '"3MCircular", "Arial", sans-serif'
  bodyFamily: '"3MCircular", "Arial", sans-serif'
  scaleRatio: 1.25   # major-third — replaces captured ad-hoc scale
  baseSize: 18px
rounded: 2px          # 3M near-square corners — PINNED motif
spacing:
  base: 4px
  sectionPadding: { desktop: 64px, tablet: 48px, mobile: 32px }  # balanced (multi-audience hard floor)
components: [button-primary, button-secondary, card, link, badge, input]
---

# DESIGN.md — 3M redesign target (Mode A, brand-faithful)

## North Star

3M's site, executed with the engineering precision the brand claims but its current
web presence doesn't deliver: the wordmark red as a scalpel, 3MCircular given real
typographic scale, science imagery at editorial size, and one clear route per audience.
Unmistakably 3M — visibly a decade newer.

## Overview

A flat, high-contrast, Swiss-precise system on a white ground. Structure comes from
hairline rules, disciplined grids, and whitespace — never shadow or gradient. A single
red accent (#d10411) carries identity and action. Near-square 2px corners throughout.
Anchored on agent-sourced references: dotconnect.vc (engineering-led editorial precision),
dayos (Swiss display typography), Peloton/Andercore (single sharp red on flat surfaces).

## Key Characteristics

- **Type-led hierarchy.** 3MCircular Bold display from clamp(2.75rem, 6vw, 5.5rem) down
  a clean major-third scale. Body at 18px/1.6 (fixes the captured 12px floor).
- **Monochrome + one red.** White/near-black/grey, plus #d10411 reserved for the primary
  CTA, active nav, and connective accents.
- **Hairline structure.** 1px borders and grid rules do the work shadows would; surfaces stay flat.
- **Editorial imagery.** Captured science stories promoted from thumbnails to full-bleed 16:9 tiles.
- **Near-square corners.** 2px radius on buttons, cards, inputs — a defining 3M motif, pinned.
- **Engineered spacing.** 4pt base; 64px section rhythm (balanced; multi-audience floor).

## Type Scale (major-third, 1.25, base 18px)

| Role | Size | Weight | Line |
|---|---|---|---|
| Display (hero) | clamp(2.75rem, 6vw, 5.5rem) | 700 | 1.05 |
| H1 | 2.986rem | 700 | 1.1 |
| H2 | 2.389rem | 700 | 1.15 |
| H3 | 1.563rem | 700 | 1.25 |
| Body-lg | 1.25rem | 400 | 1.6 |
| Body | 1rem (18px) | 400 | 1.6 |
| Caption | 0.8rem | 400 | 1.5 |

## Components

- **button-primary** — bg `brandRed`, text white, radius 2px, padding 16px 28px, weight 700, hover `brandRedDeep`. The single primary action per view.
- **button-secondary** — transparent bg, text near-black, 1px `brandRed` border, radius 2px. Secondary routes.
- **card** — white, 1px `border`, radius 2px, no shadow; hover lifts border to `brandRed`.
- **link** — near-black, `brandRed` on hover, 2px underline offset.
- **badge** — surface grey, near-black text, radius 2px, uppercase 0.72rem tracked.
- **input** — white, 1px `border`, radius 2px, `brandRed` focus ring.

## Voice / Rules

- DO: mixed-case confident headlines ("What the world needs next, we're making now").
- DO: reserve red for one action; keep everything else monochrome.
- DON'T: rotating hero carousel; four peer nav-pill CTAs; 12px body; gradient/glass; recolor the red.
- DON'T: editorial-atelier vocabulary — this is a science/manufacturing brand.
