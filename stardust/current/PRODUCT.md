<!-- stardust:provenance
  writtenBy: stardust:extract
  writtenAt: 2026-07-02T12:12:06Z
  readArtifacts:
    - stardust/current/pages/index.json
    - stardust/current/pages/aem.json
    - stardust/current/pages/docs.json
    - stardust/current/pages/docs-commands.json
    - stardust/current/_brand-extraction.json
  synthesizedInputs: []
  stardustVersion: 0.14.2
  note: DESCRIPTIVE — this file records what the existing site at https://stardust.style is, not what it should become.
-->

# PRODUCT.md — Stardust (current state)

## Register

`brand` — a marketing/landing surface. The home page leads with a display hero ("Redesign the Web."), dual CTA ("Install in two minutes" / "View on GitHub"), before/after proof imagery, and feature card grids; no authentication, no tool widgets. The docs pages are supporting documentation for the same marketing funnel.

_Source: pages/index.json headings + ctas; \_brand-extraction.json#register._

## Users

`_provenance: inferred` — derived from who the captured copy addresses; the site names its audiences but has no explicit "for whom" section.

- **Brand managers / marketing teams** — "The brand manager isn't ceding control. They're expanding the vocabulary of control." / "Marketing keeps the keys." (index)
- **Designers and developers using AI coding tools** — installation is via Claude Code plugins; "Designers know how to drive them." (aem)
- **AEM / Edge Delivery implementation teams and partners** — the /aem page speaks directly to managing experiences at scale, Universal Editor authoring, markets and translations.
- **Open-source contributors** — "Open to all. … file an issue, send a PR, write a sample." (index)

## Product Purpose

Stardust is an open-source, AI-driven website redesign tool: point it at any URL and it returns a brand-faithful redesign as deployable static HTML. It generates "a brand expression for today only — one that this brand and this date alone can produce. Deterministic, reproducible, structured." It positions itself as the answer to "what is the canonical, AI-facing expression of this brand today?" — richer, more intentional signals for AI synthesis (Google AI Mode, Claude, search synth) than a pre-AI static page. Output is host-agnostic ("GitHub Pages, Cloudflare, your CDN, your CMS — Stardust outputs files, not lock-in"), with AEM Edge Delivery as the managed-at-scale production route via `stardust:deploy`. Built by the AEM team at Adobe; Apache 2.0; built on impeccable.

_Source: pages/index.json body[1], body[13–15], body[20]; pages/aem.json body._

## Brand Personality

"Math, not mysticism." — the site's own mantra, repeated on every page's footer and in the hero.

- **Deterministic, provenance-obsessed**: "Every choice has a source. The chosen decade × craft × register has a hash." (index)
- **Confident and declarative**: short full-stop sentences ("Deterministic, reproducible, structured."), imperative headlines ("Redesign the Web.", "Take any website. Bring back the redesign.")
- **Technical but warm-blooded**: precise artifact paths in prose next to editorial swagger ("Built on impeccable. Which is, frankly, brilliant.")
- **Anti-average**: "Every design tool promises uniqueness. Most deliver the average. Stardust delivers a seed."

Visually: dark ink-navy editorial ground, warm cream counterpoint, a single amber accent, system-font typography with mono eyebrows — quietly premium, zero decoration for its own sake.

_Source: captured copy in pages/*.json#body; palette/motifs in \_brand-extraction.json._

## Anti-references

The site names its own anti-patterns explicitly — these are captured, not inferred:

- **"The moves an LLM reaches for first — gradient blob hero, glassmorphism, generic icon trios. Stardust subverts them deliberately."** (index, the divergence toolkit)
- **"Most deliver the average."** — the generic AI-tool sameness it defines itself against. (index)
- **"Sites got fast by getting boring."** — the component-library shelf look (Hero, Card Grid, Accordion, Tabs composed from stock parts). (aem)
- **Chaos / unstructured AI output** — "Stardust doesn't introduce chaos. It introduces structured variation within a defined design space." (index)

## Design Principles

`_provenance: inferred` — read off the captured visual system and copy; the site states no explicit principle list.

1. **One accent, spent precisely.** Amber (#e8b95e) is the only chromatic voice on an ink/cream ground — nav pill, primary CTA, italic emphasis, logo mark. Basis: palette usedAs distribution.
2. **Type does the heroics.** Heroes are 96–112px display type over a starfield gradient; no hero photography. Basis: motifs.patterns[type-only-hero-with-starfield].
3. **Mono as structural voice.** SF Mono uppercase eyebrows/labels (0.22em tracking) mark every section; commands render as mono display headings. Basis: type.monoFamily sourceSelectors.
4. **Alternating grounds.** Full-bleed ink bands alternate with cream bands; docs invert to cream-with-ink-sidebar. Basis: motifs.patterns[alternating-ink-cream-bands].
5. **Show the receipt.** Before/after pairs, pipeline step rows, and named artifacts in copy — evidence over adjectives, matching "Math, not mysticism." Basis: motifs.patterns[before-after-image-pair, pipeline-step-row] + voice.tone.
