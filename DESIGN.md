---
name: SLICC (redesign target)
description: Terminal-native ice-cream dev-tool brand, modernized — stepped obsidian surfaces, precision-tracked display type, zine color-block cadence
colors:
  void: "#0c0c0c"
  surface-raised: "#161616"
  surface-panel: "#1f1f1f"
  terminal-black: "#000000"
  paper: "#faf9f7"
  text-bright: "#f0f0f0"
  text-dim: "#8f8f8f"
  scoop-crimson: "#E0244F"
  code-green: "#33E6A0"
  cone-orange: "#FF9A00"
typography:
  display:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "clamp(48px, 5vw, 68px)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  heading:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "44px"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  heading-sm:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "28px"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.55
  mono:
    fontFamily: "Space Mono, monospace"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  eyebrow:
    fontFamily: "Space Mono, monospace"
    fontSize: "13px"
    fontWeight: 700
    letterSpacing: "0.12em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "32px"
  lg: "48px"
  sectionPadding: "64px"
components:
  button-primary:
    backgroundColor: "{colors.scoop-crimson}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    padding: "14px 28px"
    typography: "{typography.mono}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text-bright}"
    rounded: "{rounded.sm}"
    padding: "14px 24px"
  terminal-panel:
    backgroundColor: "{colors.terminal-black}"
    textColor: "{colors.code-green}"
    rounded: "{rounded.md}"
    padding: "24px"
  card:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text-bright}"
    rounded: "{rounded.md}"
    padding: "24px"
  badge:
    backgroundColor: "{colors.surface-panel}"
    textColor: "{colors.code-green}"
    rounded: "{rounded.sm}"
    padding: "4px 10px"
  link:
    backgroundColor: "transparent"
    textColor: "{colors.code-green}"
---

## Overview

Redesign target for www.sliccy.com under Mode A (brand-faithful): palette and
type families are pinned to the captured brand surface (Space Grotesk /
Space Mono; void #0c0c0c ground; crimson / green / orange accents). The
modernization is execution, not identity: display type moves to poster scale
with −0.03em precision tracking; flat black becomes a stepped obsidian
surface system (void → raised → panel); the accent quote-bands graduate from
one-off strips to the page's section-rhythm system (zine color-block
cadence); the type scale becomes modular (1.25). Anchors (researched, refero):
Warp — terminal-execution discipline; The Pop Manifesto — flat color-block
cadence (off-toolbox); Gumroad — playful precision (off-toolbox). References
inform composition and rhythm only; palette and type are inherited.

## Colors

Void #0c0c0c is the page ground (never pure black for full sections;
terminal-black #000000 is reserved for terminal panels and code). Depth is
surface-stepped — #0c0c0c → #161616 (cards) → #1f1f1f (raised panels) — with
1px #1f1f1f borders; no shadows. The three accents are syntax, not
decoration: code-green #33E6A0 for links, prompts, terminal output and the
green band; scoop-crimson #E0244F for the primary CTA, mono eyebrows and the
crimson band; cone-orange #FF9A00 for stat/highlight bands. On accent bands,
text is terminal-black (AA everywhere: black on green 12.4:1, black on
orange 9.9:1); on crimson, paper #faf9f7 (5.0:1, AA large + bold usage).
Mono output text never drops below text-dim #8f8f8f (4.9:1 on void);
dimming below that is reserved for `#` comment lines at 16px+.
OKLCH equivalents (canonical in prose): void oklch(0.17 0 0), crimson
oklch(0.55 0.21 10), green oklch(0.83 0.17 163), orange oklch(0.76 0.17 66).

## Typography

Space Grotesk (variable 300–700, self-hosted woff2) carries display, headings
and body; Space Mono (400/700) carries eyebrows, code, terminal chrome,
man-page synopsis and the footer session. Modular scale, ratio 1.25 from
18px body: 18 / 22 / 28 / 35 / 44 / 55 / 68. Display (hero) is
clamp(48px, 5vw, 68px), weight 700, −0.03em, line-height 1.02 — the
strikethrough gag (`<del>`) is a poster moment: crimson double-strike with
the replacement word in bright text. Eyebrows are Space Mono 13px, 700,
0.12em tracking, crimson, in `$ command` prompt form where it fits the
section. Headlines keep sentence case with terminal punctuation
("chmod +x everything."). Body stays 18px/1.55; mono blocks 16px/1.6.

## Elevation

Flat by identity. No box-shadows anywhere; depth = surface color steps +
1px #1f1f1f borders. Radius vocabulary: 6px buttons/badges, 8px cards and
terminal panels, 12px large media frames (video chrome). Accent bands are
full-bleed, radius 0 — they are printed ink, not cards.

## Components

- **button-primary** — crimson fill, paper mono label, 6px radius; one per
  viewport region ("Get SLICC" is the canonical verb).
- **button-secondary** — 1px #1f1f1f border, bright text, transparent fill.
- **terminal-panel** — #000 body, mac traffic-light header bar (13px dots:
  crimson/orange/green — the brand accents ARE the traffic lights), Space
  Mono 16px, green output, 8px radius.
- **card** — #161616 fill, 1px #1f1f1f border, 8px radius, 24px padding;
  mono green key line + body description.
- **quote-band** — full-bleed accent ground (green / crimson / orange),
  terminal-black display quote at heading scale, mono attribution
  ("— an actual human, probably").
- **badge / chip** — #1f1f1f fill, green mono label, 6px radius (used for
  See-Also command chips on man pages).
- **man-block** — canonical h2 sequence (Synopsis / Description / Commands /
  Options / Examples / Notes / See Also); Synopsis in a terminal-panel;
  Commands as a two-column definition grid (mono green term column).
- **site-header** — 64px, void ground with 1px border, wordmark + rotating
  backronym (mono, dim), nav (Demo / Use Cases / How It Works), crimson
  Get SLICC.
- **terminal-footer** — the live session: `$ whoami`, `$ ls -la ./sitemap`
  nav listing at ≥ #8f8f8f, license gag lines as `#` comments.

## Do's and Don'ts

- Do keep every captured joke verbatim — backronyms, strikethroughs,
  "No ice cream was harmed in the making of this software."
- Do use black mono text on green/orange bands; paper on crimson only.
- Do frame demo videos (/media/slicc-demo.mp4, /media/ema-demo.mp4) in
  terminal chrome with traffic lights — they are the signature media and
  must ship in the first two viewports of their pages.
- Do keep app-logo rows (logo.dev icons) as captured integration proof.
- Don't introduce gradients, shadows, glassmorphism, photography, or any
  color outside the captured palette.
- Don't use fonts outside Space Grotesk / Space Mono (Mode A pin).
- Don't render full sections on pure #000 or pure #fff; #000 is for
  terminal panels only, #faf9f7 for light exception sections only.
- Don't let mono output text fall below #8f8f8f on void (AA floor).
- Don't center-stack the generic dark-SaaS silhouette — sections are
  left-anchored, terminal-justified, or full-bleed bands.
