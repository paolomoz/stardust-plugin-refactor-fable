# PRODUCT.md — 3M (redesign target)

<!--
_provenance:
  writtenBy: stardust:direct
  writtenAt: 2026-07-02T07:35:00Z
  readArtifacts:
    - stardust/current/_brand-extraction.json
    - stardust/current/pages/index.json
    - stardust/current/pages/3m-en-us-p-c-abrasives.json
  mode: brand-faithful (Mode A)
  stardustVersion: 0.13.1
-->

## Register

**brand** — 3M's web presence is a marketing/brand surface fronting a very large
product catalog. Inherited from `stardust/current/_brand-extraction.json § register`.

## Users

Multi-audience, routed from the home page:
- **Industrial & trade buyers** — sourcing abrasives, adhesives, PPE, filtration by application.
- **Safety & health professionals** — evaluating certified protective equipment for markets (welding, healthcare, manufacturing).
- **Consumers** — Command, Scotch, Post-it, Filtrete via retail.
- **Investors / partners / talent** — corporate story, sustainability, careers.

The IA leads with product/industry routing (Products · Industries · Brands) while the
home hero carries the science-brand story. Audience routing must survive the redesign
(IA-priority: audience-routing, multi-audience).

## Product Purpose

Apply science to solve real problems — and make 3M's catalog, expertise, and brands
navigable to four distinct audiences from one front door. One-line value:
*"Science. Applied to Life."* Scope: brand story + audience routing + product/industry entry.

## Brand Personality

- **Science-forward, confident, institutional** — future-tense optimism ("what the world needs next").
- **Engineering-precise** — flat surfaces, near-square corners (2px), disciplined structure; no ornament.
- **Signal-red** — a single load-bearing accent (#d10411) carries identity; everything else is monochrome.
- **Modular-catalogue** — the product/industry/brand system is the backbone; the site is a routing machine as much as a brochure.
- **Data-led / operationally-transparent** — stories are proof-of-science, not lifestyle fluff.

## Anti-references

- The 2019 enterprise-CMS home: rotating hero carousel + a row of identical white nav-pill CTAs.
- Generic-2026-SaaS silhouette (centered hero, gradient mesh, dual pill CTAs, glassmorphism) — explicitly guarded.
- Editorial-atelier voice (*the studio*, *the journal*) — 3M is a science/manufacturing brand, not a lifestyle publication.
- Recoloring away from 3M red, or softening the near-square corners into friendly rounded cards.

## Design Principles

1. **Pin the brand, fix the execution** — 3MCircular + 3M red + 2px corners are inviolable; everything weak about the *execution* (12px body, ad-hoc scale, thumbnail imagery, four peer CTAs) gets rebuilt.
2. **Red is a scalpel, not a fill** — reserve #d10411 for the single primary action, active state, and connective accent; never flood a section with it.
3. **Let the science imagery carry** — promote captured story imagery from thumbnails to full-bleed editorial scale; it is the trust signal.
4. **One clear route per audience** — replace peer-CTA clutter with a primary action + secondary routes.
5. **Engineered rhythm** — a real modular type scale and a disciplined 4pt grid replace the muddy ad-hoc spacing.

## Accessibility & Inclusion

Inherit impeccable defaults. Enforce WCAG AA on every text-on-ground pair; body copy floor 16px
(current 12px fails comfort); #d10411 on white = 5.9:1 (AA pass) — reserve for white grounds only.
