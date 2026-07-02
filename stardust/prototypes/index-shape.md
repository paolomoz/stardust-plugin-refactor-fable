<!-- stardust:provenance
  writtenBy:        stardust:prototype/shape
  writtenAt:        2026-07-02T15:10:00Z
  page:             index
  pageUrl:          https://stardust.style/
  againstDirection: stardust/direction.md (Active 2026-07-02, hands-off)
  consumedBy:       impeccable:craft
  readArtifacts:
    - stardust/current/pages/index.json
    - stardust/current/_brand-extraction.json
    - DESIGN.md
    - DESIGN.json
    - stardust/direction.md
    - stardust/prototypes/index-improvements.md
  stardustVersion:  0.14.2
  capturedSourceLineage:
    - "header — site-wide system-component (carried from _brand-extraction.json#systemComponents[kind=header])"
    - "hero — derived from captured hero (pages/index.json#headings h1 'Redesign the Web.' + og description lede + dual CTA + one-shot command chip)"
    - "proof-before-after — derived from captured before/after image pair (pages/index.json#media.imgs, the site's only imagery)"
    - "variant-receipt-strip — direction-authorized new (improvements #2+#3: replaces the second captured card trio; copy for A/B/C theses is captured-verbatim from pages/docs.json uplift description; seed-hash stub from captured 'md5(brand · date)' claim)"
    - "why-structured-variation — derived from captured section 'Every design tool promises uniqueness.' (pages/index.json#body[0..3] + 2 cards divergence-toolkit/provenance)"
    - "how-it-works-pipeline — derived from captured section 'Take any website. Bring back the redesign.' + pipeline step row EXTRACT→DIRECT→PROTOTYPE→MIGRATE (pages/index.json)"
    - "ai-facing — derived from captured section 'The canonical brand, for the AI-facing web.' (3 cards, kept as the page's ONE card band)"
    - "static-html-fact-panel — derived from captured section 'Stardust ships static HTML.' (deploy/contribute cards) + direction-authorized fact panel (improvements #4, audit F-006)"
    - "aem-band — derived from captured section 'Deploy anywhere. Scale with AEM.' (pages/index.json last content section)"
    - "cta-band — direction-authorized new (improvements #1, DESIGN.json systemComponentRoles.cta-band; movement: conversion-focus)"
    - "footer — site-wide system-component (carried from _brand-extraction.json#systemComponents[kind=footer]) + direction-authorized fact line (F-018)"
  antiTemplatePass:
    - pattern: "hero composition (type-only, centered-left, dual CTA)"
      defaultReflex: "centered-stack hero with two-button CTA pair"
      alternatives: ["left-anchored asymmetric hero with command chip as third element (captured shape)", "split hero with before/after right (rejected: proof band already owns the pair; would double-spend it)", "full-bleed starfield hero with centered stack (rejected: the generic AI silhouette)"]
      picked: "left-anchored asymmetric — the captured hero IS left-anchored with the one-shot chip; preserved with disciplined scale"
      rationale: "captured composition is the brand's own; Mode A signature preservation"
      reference: "Langbase hero (left-aligned copy vs abstract right) — refero style 6faf7a27"
    - pattern: "card trios (three near-identical eyebrow+h3+body bands captured)"
      defaultReflex: "repeat the eyebrow-card-trio per section"
      alternatives: ["variant receipt strip (ledger/ticket row, dotted perforation hairlines, seed-hash stub) for the variants story", "annotated pipeline diagram for how-it-works", "keep all three trios (rejected: improvements #2 — the grammar the copy mocks)"]
      picked: "ONE card band kept (ai-facing); how-it-works becomes the numbered pipeline ledger; variants story becomes the receipt strip"
      rationale: "improvements #2 (F-008); receipt strip realizes the rolled folded-paper-ephemera craft against the captured 'show the receipt' principle"
    - pattern: "before/after proof pair"
      defaultReflex: "screenshot dump in a 2-up grid"
      alternatives: ["framed 2-up with BEFORE / AFTER · STARDUST mono captions (captured shape, kept)", "scrub/slider comparison (rejected: JS-dependent, breaks no-JS fallback)"]
      picked: "framed 2-up with captions, linked to the live sample (improvements #3 fix: point at the sample, not the repo)"
      rationale: "captured pattern preserved; frame shadow is one of the two captured shadows"
  substrateTransitions:
    default: "ink (#0a1024)"
    exceptions:
      - "cream band for static-html-fact-panel section (captured: the existing page's cream inversion band at the same position; purpose: the pharmacy-insert fact panel reads on cream, its captured register)"
      - "cream band for aem-band closing section (captured: existing page ends its content on a cream band before the ink footer)"
  voiceClassification:
    - { section: "header", classification: "captured-verbatim", source: "systemComponents[kind=header]" }
    - { section: "hero", classification: "captured-verbatim", copy: "h1 'Redesign the Web.' + deck 'Math, not mysticism.' + lede + CTAs 'Install in two minutes'/'View on GitHub' + '/stardust:uplift <url>' chip", source: "pages/index.json" }
    - { section: "proof-before-after", classification: "captured-verbatim", source: "pages/index.json#media.imgs alts + BEFORE/AFTER captions" }
    - { section: "variant-receipt-strip", classification: "captured-verbatim (theses) + direction-authorized rewrite (strip frame labels)", source: "pages/docs.json uplift variant descriptions; improvements #3" }
    - { section: "why-structured-variation", classification: "captured-verbatim body + direction-authorized rewrite (h2 topic; captured slogan demoted to eyebrow-deck)", source: "pages/index.json#body[0..5]; improvements #4" }
    - { section: "how-it-works-pipeline", classification: "captured-verbatim step copy + direction-authorized rewrite (h2 topic)", source: "pages/index.json pipeline cards" }
    - { section: "ai-facing", classification: "captured-verbatim cards + direction-authorized rewrite (h2 topic)", source: "pages/index.json" }
    - { section: "static-html-fact-panel", classification: "captured-verbatim (deploy/contribute) + direction-authorized rewrite (fact panel rows: price $0/no paid tier stated per audit F-006; license/maker/requirement captured facts)", source: "pages/index.json + footer fact line + docs install requirement" }
    - { section: "aem-band", classification: "captured-verbatim", source: "pages/index.json" }
    - { section: "cta-band", classification: "captured-verbatim CTAs restated (direction-authorized placement)", source: "improvements #1" }
    - { section: "footer", classification: "captured-verbatim + direction-authorized chrome (fact line on every page)", source: "systemComponents[kind=footer]" }
  signatureElements:
    - { kind: "motif", capturedSource: "type-only hero over radial ink glow + CSS starfield dots (motifs.patterns)", mechanism: "reproduce: radial-gradient hero ground + generated starfield dots, h1 with amber-italic phrase", fallback: "static (it is CSS-only)" }
    - { kind: "motion", capturedSource: "hero entrance reveal (crawl-log visionCheck: animated h1)", mechanism: "space-safe staggered reveal (word-level spans, spaces preserved), live-systems register", fallback: "prefers-reduced-motion: static final state; no-JS: <noscript> visible" }
    - { kind: "motif", capturedSource: "amber-italic emphasis phrase inside display headings + 60% highlighter underline", mechanism: "reproduce on h1 and section h2 decks", fallback: "static" }
    - { kind: "motif", capturedSource: "hex-seed corner marks (provenance-as-ornament; audit strengths-to-preserve)", mechanism: "provenance-marks role, hidden <480px per F-010", fallback: "static" }
-->
---
slug: index
url: https://stardust.style/
register: brand
surprise: medium
dominantDimension: craft/receipt-ledger
---

# Page shape: index

## Sections (in render order)

1. **header** (system-component role: `header`) — sticky 60px deep-ink;
   amber star mark + "Stardust" wordmark left; DOCS amber mono pill +
   "GitHub ›" right. Captured verbatim.
2. **hero** — left-anchored type-only hero on ink. ONE `h1`:
   "Redesign the Web." (space-safe reveal; anchor id `redesign-the-web`).
   Deck line "Math, not *mysticism*." (amber-italic signature). Lede:
   captured hero paragraph, PLUS one added concrete sentence
   (improvements-authorized, F-012 fix): "Point it at your URL; get a
   redesigned, deployable copy of your site." Dual CTA: primary "Install
   in two minutes" → /docs/, ghost "View on GitHub". One-shot chip:
   `/stardust:uplift <url>` mono. "Requires Claude Code · free · Apache 2.0"
   mono chip row next to the CTA (F-012/F-006). Hex-seed corner marks.
3. **proof-before-after** — h2 topic: "Before and after: a real Stardust
   redesign" (eyebrow: THE RECEIPT). The two captured images framed 2-up
   with mono captions BEFORE / AFTER · STARDUST; both link to the live
   sample the sticker links to; frame shadow allowed (captured).
4. **why-structured-variation** — h2 topic: "Why Stardust: structured
   variation, not the average" with the captured slogan "Every design tool
   promises uniqueness. Most deliver the average. Stardust delivers a
   seed." as the display deck above it. Captured body verbatim. Two panels
   (divergence toolkit / provenance-is-a-feature) — NOT the card-trio
   grammar: render as a 2-up ledger pair with dotted hairlines.
5. **how-it-works-pipeline** — h2 topic: "How Stardust works: extract →
   direct → prototype → migrate" (slogan "Take any website. Bring back the
   redesign." as deck). The four steps as a numbered pipeline ledger
   (01–04 mono numerals, step name + one-line captured copy), not a card
   trio.
6. **variant-receipt-strip** — THE amber-spent proof moment (F-022).
   h2 topic: "Three variants per page, one seed" (eyebrow: PROVENANCE).
   A full-width receipt/ledger strip: three variant stubs A / B / C with
   the captured theses ("tomorrow's version of the site you have today" /
   "what if we amplified <captured trait>?" / "what if motion was part of
   the identity?"), dotted perforation hairlines, mono seed-hash stub
   `md5(brand · date)`. Amber accents earn their one committed moment
   here. No fabricated thumbnails — the stubs are typographic receipts.
7. **ai-facing** — h2 topic: "The canonical brand for the AI-facing web"
   (captured heading is already near-topical; keep with minimal
   sharpening). The page's ONE eyebrow-card trio, captured cards verbatim
   (Richer signals / Same seed, same brand / Marketing keeps the keys).
8. **static-html-fact-panel** — cream band. h2 topic: "Deploy anywhere:
   Stardust ships static HTML" (captured slogan as deck). Left: captured
   deploy/contribute columns incl. install commands (pre-wrap + copy
   button). Right: the FACT PANEL (pharmacy-insert register): dosage-table
   rows — WHAT Stardust, AI website redesign tool · PRICE $0 — free, no
   paid tier · LICENSE Apache 2.0 · MAKER the AEM team at Adobe ·
   REQUIRES Claude Code · OUTPUT static HTML, host-agnostic. Plain
   crawlable text, amber-deep accents on cream.
9. **aem-band** — cream, captured verbatim: "Deploy anywhere. Scale with
   AEM." h2 topic-sharpened: "Scale with AEM Edge Delivery" + captured
   copy + "See how Stardust ships to AEM Edge Delivery →" link.
10. **cta-band** (system-component role: `cta-band`) — ink band, closing
    restatement: h2 "Install Stardust in two minutes" + primary CTA
    (→ /docs/) + ghost "View on GitHub" + the one-shot chip again +
    confirmation beat "that's it — run /stardust:uplift on any URL."
11. **footer** (system-component role: `footer`) — captured composition +
    fact line "Open source · Apache 2.0 · built by the AEM team at Adobe"
    + Docs · GitHub · AEM · Apache 2.0 License link row (adds /aem, F-021)
    + sigil "brief + seed = star · 2026" at dust-55 (F-014).

## Layout strategy

- Density: balanced (64px section pad desktop / 48 tablet / 32 mobile).
- Container 1320px; 12-col grid, single column <768px.
- Grounds: ink default; cream for sections 8–9 (captured inversion);
  exactly 2 substrate transitions.
- Type: major-third scale per DESIGN.md; h1 clamp(56–119); h2 clamp(39–76)
  with eyebrow + deck stack; ledger numerals mono.
- Radii: 4 / 14 / 999 only.

## Key states

- Default only (static marketing page). Copy buttons have a copied
  confirmation state (text swap, 1.5s revert).

## Interaction model

- Header: DOCS pill → /docs/ (distinct active state on docs pages),
  GitHub ›. Skip-link `<a href="#main">` first focusable.
- Copy buttons: clipboard.writeText + text confirmation; no icon font.
- All internal links use canonical slash forms (/docs/, /aem).
- Motion: live-systems register (Phase 2.4) — data-anim on section heads,
  data-countup none (no stats), receipt strip gets data-tile-anim,
  hero space-safe word reveal. Reduced-motion: full static. No scroll-jack.

## Data attributes

- `header[data-section="header"][data-intent="navigate"][data-layout="sticky-bar"]`
- `section[data-section="hero"][data-intent="primary-action"][data-layout="left-anchored-type"][data-items="2"]`
- `section[data-section="proof-before-after"][data-intent="proof"][data-layout="framed-2up"][data-items="2"]`
- `section[data-section="why-structured-variation"][data-intent="differentiate"][data-layout="ledger-2up"][data-items="2"]`
- `section[data-section="how-it-works-pipeline"][data-intent="explain"][data-layout="numbered-ledger"][data-items="4"]`
- `section[data-section="variant-receipt-strip"][data-intent="proof"][data-layout="receipt-strip"][data-items="3"]`
- `section[data-section="ai-facing"][data-intent="differentiate"][data-layout="grid-3"][data-items="3"]`
- `section[data-section="static-html-fact-panel"][data-intent="convert"][data-layout="split-deploy-facts"][data-items="2"]`
- `section[data-section="aem-band"][data-intent="cross-promo"][data-layout="editorial-band"]`
- `section[data-section="cta-band"][data-intent="convert"][data-layout="centered-band"][data-items="2"]`
- `footer[data-section="footer"][data-intent="navigate"][data-layout="centered"]`

## SEO / metadata contract (render into <head>)

- `<title>` captured verbatim; meta description captured verbatim.
- og:title/description/image/url captured + **og:type=website** (F-016).
- Canonical `https://stardust.style/`.
- **Static JSON-LD @graph in the head** (F-002): Organization (Adobe) +
  WebSite (Stardust) + SoftwareApplication { name Stardust,
  applicationCategory DeveloperApplication, operatingSystem "Claude Code",
  license Apache-2.0 URL, offers { price 0, priceCurrency USD },
  codeRepository github.com/adobe/skills }.
- Exactly one h1; h2s topic-bearing per section list; no level skips.

## Unsourced content (placeholder list)

(none) — every literal traces to pages/index.json, pages/docs.json
(variant theses), the captured footer fact line, or a
direction-authorized rewrite cited to an improvements item. The $0 price
statement is a direction-authorized factual statement per audit F-006
(Apache-2.0 open source, no paid tier exists), not a placeholder.

## Open questions for craft

- Whether the receipt strip's perforation edge renders as a dotted
  hairline or a scalloped mask: pick the dotted hairline (mask risks
  cross-browser artifacts in a self-contained file).
- Starfield density: match the captured hero glow subtlety; do not turn
  it into a particle field.
