<!-- stardust:provenance
  writtenBy: stardust:direct
  writtenAt: 2026-07-02T14:58:00Z
  againstInput: "make it dramatically better from a design and SEO/LLM-readability standpoint while unmistakably stardust.style (Mode A brand-faithful, hands-off, single canonical direction)"
  readArtifacts:
    - stardust/current/PRODUCT.md
    - stardust/current/_brand-extraction.json
    - stardust/audit/stardust-style/audit.json
    - stardust/prototypes/index-improvements.md
    - stardust/prototypes/docs-improvements.md
  synthesizedInputs: []
  stardustVersion: 0.14.2
  note: TARGET strategy. Strategy is inherited from the captured site (Mode A); what changes is execution discipline — the target makes the existing claims retrievable, provable, and craft-clean.
-->

# PRODUCT.md — Stardust (target)

## Register

`brand` — a marketing/landing surface with documentation in the same funnel.
Unchanged from the captured site.

## Users

- **Brand managers / marketing teams** deciding whether to trust an AI tool
  with their brand — they need proof (variants, receipts) and a stated cost.
- **Designers and developers using AI coding tools** — they need the install
  path frictionless (copyable commands, "Requires Claude Code" stated up
  front) and the reference page navigable.
- **AEM / Edge Delivery implementation teams and partners** — they need the
  scale story with sourced performance claims.
- **AI answer engines** — a first-class audience the site itself names ("the
  AI-facing web"): they need key facts in static crawlable text, entity
  schema in the served HTML, and topic-bearing headings.

## Product Purpose

Stardust is a free, open-source (Apache 2.0), AI-driven website redesign
tool by the AEM team at Adobe: point it at any URL and it returns a
brand-faithful redesign as deployable static HTML. The target site must
answer, in extractable prose on the right page: what it is, what it costs
($0), what it requires (Claude Code), how it works (extract → direct →
prototype → migrate), and how it scales (AEM Edge Delivery).

## Brand Personality

"Math, not mysticism." — unchanged, but *executed to its own standard*:

- **Deterministic, provenance-obsessed** — receipts, hashes, seeds; now also
  rendered as design (the fact panel, the receipt strip), not just claimed.
- **Confident and declarative** — short full-stop sentences; slogans stay,
  but as decks/eyebrows under topic-bearing headings, so the swagger never
  costs retrieval.
- **Technical but warm-blooded** — mono counter-voice, editorial ease.
- **Anti-average, honestly** — a site that mocks "the moves an LLM reaches
  for first" may not be built from three identical eyebrow-card trios.

Traits for downstream selection: `operationally-transparent`, `data-led`,
`editorial-engineered`. (Motion register: `live-systems`.)

## Anti-references

Captured (the site's own): gradient blob hero, glassmorphism, generic icon
trios; "the average"; shelf-component sameness; chaos/unstructured output.

Added by this direction (audit-evidenced):

- **The eyebrow-card-trio scaffold** — three identical mono-eyebrow + h3 +
  muted-body bands per page (F-008). The grammar the copy mocks.
- **Slogan-as-heading** — h2s that carry attitude but no topic (F-013).
- **Unverifiable swagger** — performance superlatives with no source (F-019).
- **Chrome that lies** — aria-labels promising unimplemented actions (F-009),
  animations that eat glyphs (F-004), examples that truncate mid-word (F-003).

## Design Principles

1. **One accent, spent on proof.** Amber stays the only chromatic voice —
   but it buys the variant-proof strip and the fact panel, not only 11px
   eyebrows. (F-022 fix; brandColorShare 0.99% → a deliberate mid-page spend.)
2. **Headings answer; decks perform.** Every h2 carries an askable topic;
   the slogan survives as eyebrow or deck. Exactly one h1 per page. (F-013)
3. **Show the receipt — literally.** Before/after, variant A/B/C trio,
   seed hashes, and a pharmacy-insert fact panel (price $0 · Apache 2.0 ·
   by the AEM team at Adobe · requires Claude Code) in crawlable text.
   (F-006, F-011; craft: folded-paper ephemera; register: pharmacy insert.)
4. **The machine audience reads the source.** JSON-LD @graph in the served
   head, not client-injected; og:type present; llms.txt anchors resolve;
   facts on the pages engines retrieve. (F-002, F-007, F-016, F-018)
5. **Craft that survives inspection.** Space-safe letter animation, no
   truncated examples, copy buttons that copy, AA everywhere including
   decorative sigils, reduced-motion complete. (F-003, F-004, F-005, F-009,
   F-014)

## Accessibility & Inclusion

Inherit impeccable defaults, plus: every palette pair documented for the
ground it is used on (amber on ink only; amber-deep on cream only — F-020);
`prefers-reduced-motion` fully honored (captured site already does this;
preserve through the motion register).
