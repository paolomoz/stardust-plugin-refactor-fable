<!-- stardust:provenance
  writtenBy: stardust:direct
  writtenAt: 2026-07-02T14:58:00Z
  againstInput: "make it dramatically better from a design and SEO/LLM-readability standpoint while unmistakably stardust.style (Mode A brand-faithful, hands-off)"
  readArtifacts:
    - stardust/current/DESIGN.md
    - stardust/current/_brand-extraction.json
    - stardust/audit/stardust-style/audit.json
  synthesizedInputs: []
  stardustVersion: 0.14.2
  note: TARGET visual system. Mode A — palette and type pinned to the captured surface; scale, radius vocabulary, and pairing rules disciplined per the improvements lists.
-->
---
name: Stardust (target)
description: Ink-navy editorial ground, cream counterpoint, one amber accent spent on proof — math, not mysticism, executed to its own standard.
colors:
  ink: "#0a1024"
  ink-deep: "#060a14"
  ink-soft: "#141b3a"
  deep-ink: "#1a1f38"
  dust: "#f5f0e6"
  amber: "#e8b95e"
  amber-light: "#ffd98a"
  amber-deep: "#854f17"
typography:
  display:
    fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: "clamp(56px, 8vw, 119px)"
    fontWeight: 600
    lineHeight: 0.96
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: "clamp(39px, 5.3vw, 76px)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.032em"
  subhead:
    fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: "31px"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.024em"
  title:
    fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.022em"
  body:
    fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  body-large:
    fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "SF Mono, JetBrains Mono, ui-monospace, monospace"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.0
    letterSpacing: "0.24em"
  command:
    fontFamily: "SF Mono, JetBrains Mono, ui-monospace, monospace"
    fontSize: "clamp(25px, 2.8vw, 39px)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.01em"
rounded:
  sm: "4px"
  lg: "14px"
  pill: "999px"
spacing:
  section-pad: "64px"
  section-pad-tablet: "48px"
  section-pad-mobile: "32px"
  container-max: "1320px"
  nav-height: "60px"
components:
  button-primary:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "14px 24px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.dust}"
    border: "1px solid rgba(245,240,230,0.3)"
    rounded: "{rounded.sm}"
    padding: "14px 24px"
  button-nav-pill:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "8px 14px"
  card:
    backgroundColor: "{colors.ink-soft}"
    border: "1px solid rgba(245,240,230,0.08)"
    rounded: "{rounded.lg}"
  code-block:
    backgroundColor: "{colors.ink-deep}"
    textColor: "{colors.dust}"
    rounded: "{rounded.sm}"
    whiteSpace: "pre-wrap"
  fact-panel:
    backgroundColor: "{colors.dust}"
    textColor: "{colors.deep-ink}"
    border: "1px solid rgba(26,31,56,0.18)"
    rounded: "{rounded.sm}"
---

# Design System: Stardust (target)

## 1. Overview

**Creative North Star: "Math, not mysticism — executed to its own standard."**

Everything recognizably stardust.style stays: the deep-ink ground alternating
with warm cream in full-bleed bands, the single amber accent, type-only heroes
with the radial glow and starfield, SF Mono as the structural counter-voice,
the amber-italic emphasis phrase inside display headings, hairlines instead of
shadows, system stacks with zero webfont bytes. What changes is discipline:
a named modular scale replaces the ad-hoc ten sizes, a three-value radius
vocabulary replaces the nine-value sprawl, headings answer questions while
slogans move to eyebrows and decks, and the accent is spent on proof — the
variant trio and the fact panel — instead of only 11px labels.

Two new brand-native moves, both derived from the divergence seed and the
captured "show the receipt" principle:

- **The receipt strip** (craft: folded-paper ephemera) — evidence composed as
  a ledger/ticket row: perforation-dotted hairlines, mono numerals, seed
  hashes as the stub. Replaces one of the three identical card trios.
- **The fact panel** (register: pharmacy insert) — the key-facts block set
  like a dosage table on cream: PRICE $0 · LICENSE Apache-2.0 · MAKER the AEM
  team at Adobe · REQUIRES Claude Code. Precision-as-design, and the exact
  crawlable-text answer an engine needs.

**Key Characteristics:**
- Two grounds (ink / cream), one accent (amber), zero other hues — pinned
- Major-third (1.25) modular type scale snapped to the captured sizes
- Three radii: 4px (chips, code, buttons), 14px (cards/panels), 999px (pill)
- Mono eyebrows as ONE named sparing system (≤ 1 per section)
- Receipts, hashes, and fact tables as visible design material

## 2. Colors

Pinned to the captured palette (Mode A). Hex format retained (inversion:
matches the captured surface; OKLCH applies to new authoring, this is
inheritance).

### Primary
- **Amber** (#e8b95e): the only chromatic accent. **On ink grounds only**
  (10.37:1). Nav pill, primary CTA, italic emphasis, logo, receipt-strip
  accents, the variant-proof moment.
- **Deep Amber** (#854f17): amber's on-cream form **only** (5.91:1) — mono
  labels, links, fact-panel accents on cream. Never on ink (2.81:1, fails).
- **Light Amber** (#ffd98a): emphasis tint on ink only.

### Neutral
- **Ink** (#0a1024) page ground · **Deep Ink Ground** (#060a14) header, hero
  gradient stop, code blocks · **Soft Ink** (#141b3a) raised cards on ink ·
  **Card Ink Text** (#1a1f38) headings/body on cream · **Dust** (#f5f0e6)
  cream grounds and text-on-ink, with its alpha ramp restricted to three
  steps: dust-72 (muted text), dust-55 (fine print — replaces the failing
  dust-40 sigil, 3.48:1 → ≥5:1), dust-08/15 (hairlines only, never text).

### Named Rules
**The One Accent Rule** (pinned). Amber is the only saturated hue.
**The Pairing Rule** (new, F-020): every chromatic token declares its ground —
`amber → ink`, `amber-deep → dust`, `amber-light → ink`. No other pairings
ship. Recorded as token aliases in DESIGN.json.
**The Accent-Spend Rule** (new, F-022): each page spends amber on exactly one
committed moment beyond chrome (home: the variant-proof strip; docs: the
fact-panel chips; aem: the pipeline band).

## 3. Typography

**Display:** SF Pro Display · **Body:** SF Pro Text · **Mono:** SF Mono
(JetBrains Mono, ui-monospace fallback) — pinned; zero webfont bytes is a
captured brand decision (inversion: the "own a display face" reflex is
declined; the system-stack choice is the brand's own "math" register).

### The Major-Third Scale (new — replaces the ad-hoc 10)
Base 16, ratio 1.25, snapped to the captured landmarks (76 ≈ captured 77.6,
95 ≈ captured 96, 119 ≈ captured 112):

`12.8 · 16 · 20 · 25 · 31 · 39 · 49 · 61 · 76 · 95 · 119`

- **display / h1** 119 home · 95 aem · 61 docs (600, lh 0.96, −0.04em) — one
  per page, carries the amber-italic phrase
- **headline / h2** 76 home/aem · 39 docs (600, lh 0.98) — topic-bearing text;
  the slogan lives in the eyebrow or the deck above it
- **subhead / h3** 31 · **title / h4-card** 20 · **body** 16–20 (lh 1.6)
- **label** mono 12 +0.24em uppercase · **command** mono 25–39 (600)

### Named Rules
**Headings answer; decks perform** (F-013). h2 = askable topic; slogan =
eyebrow/deck. **Space-safe splits** (F-004): any per-glyph animation preserves
word spaces and derives anchor ids from the unsplit text.

## 4. Elevation

Pinned: essentially flat. Ground alternation, surface steps (ink → soft-ink),
1px dust-alpha hairlines, radial hero glow. Shadows only on the two captured
surfaces: **frame** (`rgba(0,0,0,0.45) 0 24px 60px`, before/after and variant
frames) and **sticky-nav** (`rgba(6,10,20,0.25) 0 6px 20px`).

**The Hairline-Not-Shadow Rule** (pinned). New: **perforation hairline** —
the receipt strip may render its hairline dotted (1px dotted dust-15) as the
folded-paper-ephemera signature; same weight, same alpha family.

## 5. Components

### Buttons
- **Primary:** amber fill, ink text, 4px radius, 14×24 padding, weight 600.
- **Ghost:** transparent, dust text, dust-30 hairline — the dual-CTA partner.
- **Nav pill:** amber fill, mono 700 uppercase, 999px.
- **Copy button** (new, F-005): mono 12px chip docked top-right of every
  code block; ink-soft fill on ink, confirmation state swaps label to
  "copied ✓-free text" (text only, no icon font).

### Cards / Containers
- 14px radius, soft-ink fill on ink, 1px dust-08 hairline, no shadow.
- Cream cards: 1px rgba(26,31,56,0.18) hairline.
- **Fact panel** (new): cream ground, dosage-table rows (mono label left,
  fact right), 4px radius, amber-deep accents.
- **Receipt strip** (new): full-width ledger row, dotted hairlines, mono
  numerals, seed-hash stub.

### Code blocks
Deep-ink ground, 4px radius, `white-space: pre-wrap` on prose-length
examples (F-003) — long single commands may scroll but must show a fade cue
+ styled scrollbar (F-010).

### Navigation
Pinned: sticky 60px deep-ink header, amber star mark + wordmark, DOCS pill +
GitHub. New: the pill gets a distinct active state on docs pages (F-021);
/aem joins the footer link row (F-021).

### Footer
Pinned composition; the fact line ("Open source · Apache 2.0 · built by the
AEM team at Adobe") ships on **every** page (F-018); sigil at dust-55 (F-014).

### Signature Component: Amber-italic display heading (pinned)
One italic amber phrase per major heading, optional 60%-offset highlighter.

## 6. Do's and Don'ts

### Do:
- **Do** keep amber as the single accent and spend it on one committed proof
  moment per page plus chrome.
- **Do** alternate full-bleed ink and cream grounds; docs invert to cream
  with ink sidebar.
- **Do** set every h2 as a topic; keep slogans as eyebrows/decks.
- **Do** ship key facts (price, license, maker, requirement) as crawlable
  text in the fact panel and footer.
- **Do** emit the JSON-LD @graph statically in the served head; og:type on
  every page.
- **Do** honor the pairing rule: amber on ink, amber-deep on cream, never
  crossed.

### Don't:
- **Don't** use gradient blob heroes, glassmorphism, generic icon trios
  (captured anti-toolbox), or emoji.
- **Don't** compose a page from repeated eyebrow-card trios — one card band
  per page maximum; the second becomes a receipt strip, diagram, or table.
- **Don't** let any animation eat glyphs or any example truncate.
- **Don't** introduce a second saturated hue, a fourth radius, drop shadows
  on cards, or webfonts.
- **Don't** state a performance claim without a source link.
