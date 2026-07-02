<!-- stardust:provenance
  writtenBy:        stardust:prototype/shape
  writtenAt:        2026-07-02T15:40:00Z
  page:             docs
  pageUrl:          https://stardust.style/docs/
  againstDirection: stardust/direction.md (Active 2026-07-02, hands-off)
  consumedBy:       impeccable:craft
  readArtifacts:
    - stardust/current/pages/docs.json (incl. codeBlocks addendum, captured 2026-07-02)
    - stardust/current/_brand-extraction.json
    - DESIGN.md
    - DESIGN.json
    - stardust/direction.md
    - stardust/prototypes/docs-improvements.md
  stardustVersion:  0.14.2
  capturedSourceLineage:
    - "header — site-wide system-component (carried from _brand-extraction.json#systemComponents[kind=header]); DOCS pill gains distinct active state (F-021)"
    - "docs-sidebar — derived from captured fixed ink sidebar (Get started 01 / Commands 02, numbered items, amber-tint active state)"
    - "doc-hero — derived from captured h1 'Your first redesign, end to end.' + lede 'Install Stardust and run your first redesign. From any URL to a complete redesigned static site — every page, not just the home.'"
    - "install — derived from captured 'Install.' section + codeBlocks[0] (marketplace/install commands, captured verbatim via curl addendum); fact chip row is direction-authorized (F-012/F-006)"
    - "shortcut — derived from captured 'One URL, three variants.' section + codeBlocks[1] + uplift explanation body"
    - "main-flow — derived from captured 'Four sub-commands. One pipeline.' + codeBlocks[2] + note card 'New site, not a redesign?'"
    - "step-1..4 — derived from captured Step 1–4 sections (Capture the current state / Direct the redesign / Prototype the home page / Approve and migrate) with codeBlocks[3..8] verbatim incl. the FULL Step-2 direct example (F-003 fix: it truncates on the live site)"
    - "footer — site-wide system-component + direction-authorized fact line (F-018)"
  antiTemplatePass:
    - pattern: "docs layout (fixed sidebar + prose column)"
      defaultReflex: "three-pane docs shell with right-side TOC"
      alternatives: ["captured two-pane (ink sidebar + cream prose) preserved", "single-column with sticky top progress (rejected: discards the captured template identity)", "three-pane (rejected: adds chrome the 2-page docs IA doesn't need)"]
      picked: "captured two-pane preserved; sidebar items keep the numbered mono style; mobile gets a jump-to-section affordance (F-010)"
      rationale: "Mode A template preservation; the sidebar IS the docs template signature"
    - pattern: "code blocks"
      defaultReflex: "bare pre with horizontal scroll"
      alternatives: ["pre-wrap prose-length examples + copy button (improvements #1/#2)", "scroll + fade cue for genuinely one-line commands", "line-numbered code frame (rejected: these are shell commands, not source listings)"]
      picked: "pre-wrap for the long Step-2 example; single-line commands keep no-wrap with fade cue at overflow; every pre gets a copy button"
      rationale: "improvements #1 (F-003) + #2 (F-005)"
  substrateTransitions:
    default: "cream (#f5f0e6) prose ground with ink sidebar (captured docs inversion)"
    exceptions:
      - "ink code blocks (captured: deep-ink pre panels on cream — component-level, not a section substrate)"
      - "ink footer band (captured: site-wide footer stays ink)"
  voiceClassification:
    - { section: "header", classification: "captured-verbatim", source: "systemComponents[kind=header]" }
    - { section: "docs-sidebar", classification: "captured-verbatim ('Get started' with the space restored — F-004 fixes the rendering bug, the copy is captured)", source: "pages/docs.json" }
    - { section: "doc-hero", classification: "captured-verbatim", source: "pages/docs.json h1+lede" }
    - { section: "install", classification: "captured-verbatim commands + direction-authorized chip row ('Requires Claude Code · free · Apache 2.0' per F-012/F-006) + direction-authorized one sentence ('Stardust is free and open source under the Apache 2.0 license — there is no paid tier.')", source: "codeBlocks[0] + improvements #4" }
    - { section: "shortcut", classification: "captured-verbatim", source: "pages/docs.json + codeBlocks[1]" }
    - { section: "main-flow", classification: "captured-verbatim", source: "pages/docs.json + codeBlocks[2]" }
    - { section: "step-1", classification: "captured-verbatim", source: "pages/docs.json + codeBlocks[3,4]" }
    - { section: "step-2", classification: "captured-verbatim (FULL example from codeBlocks[5])", source: "pages/docs.json" }
    - { section: "step-3", classification: "captured-verbatim", source: "pages/docs.json + codeBlocks[6]" }
    - { section: "step-4", classification: "captured-verbatim", source: "pages/docs.json + codeBlocks[7,8]" }
    - { section: "footer", classification: "captured-verbatim + direction-authorized fact line", source: "systemComponents[kind=footer]" }
  signatureElements:
    - { kind: "motif", capturedSource: "ink sidebar with numbered mono items + amber-tint active state (docs template signature)", mechanism: "reproduce; space-safe text (F-004)", fallback: "static" }
    - { kind: "motif", capturedSource: "amber-italic emphasis phrase in display headings ('end to end.')", mechanism: "reproduce on h1", fallback: "static" }
    - { kind: "motif", capturedSource: "deep-ink code panels on cream", mechanism: "reproduce with pre-wrap/copy-button upgrades", fallback: "static" }
-->
---
slug: docs
url: https://stardust.style/docs/
register: brand
surprise: low
dominantDimension: craft/receipt-ledger
---

# Page shape: docs

## Sections (in render order)

1. **header** (system-component role: `header`) — captured; DOCS pill in
   distinct active state (filled → outlined-active or equivalent) (F-021).
2. **docs-sidebar** — fixed ink panel: "Stardust · Docs" mark, numbered
   items "Get started 01" (active, amber tint) / "Commands 02" (→
   /docs/commands/), mono sigil at dust-55. Space-safe rendering — the
   live site's letter-split drops the space ("Getstarted", F-004); static
   text or space-safe split only. Collapses to a top bar with a
   jump-to-section select/menu below 768px (F-010).
3. **doc-hero** — ONE h1 "Your first redesign, end to end." (amber-italic
   on "end to end."), captured lede. Eyebrow: SET UP.
4. **install** — h2 "Install." (captured). codeBlocks[0] verbatim in an
   ink pre (4 command lines, 2 marketplaces) with a copy button per
   block. Fact chip row: REQUIRES CLAUDE CODE · FREE · APACHE 2.0 (mono,
   amber-deep on cream). Added authorized sentence: "Stardust is free and
   open source under the Apache 2.0 license — there is no paid tier."
   Captured body ("Both plugins need to be installed…" + commands
   reference link) verbatim. Confirmation beat after the block: "that's
   it — run /stardust:uplift on any URL." (improvements #2).
5. **shortcut** — h2 "One URL, three variants." + codeBlocks[1] +
   captured uplift explanation.
6. **main-flow** — h2 "Four sub-commands. One pipeline." + captured body
   + codeBlocks[2] + the captured note card ("New site, not a redesign?"
   — amber-tinted callout, captured pattern).
7. **step-1** — h3 "Capture the current state." under eyebrow STEP 1 +
   codeBlocks[3] + captured body + codeBlocks[4] (brand-review open) +
   captured guidance paragraph.
8. **step-2** — h3 "Direct the redesign." STEP 2 + codeBlocks[5] — the
   FULL direct example, `white-space: pre-wrap` so it cannot truncate
   (F-003) + captured body incl. the "Pin what matters to you." callout.
9. **step-3** — h3 "Prototype the home page." STEP 3 + codeBlocks[6] +
   captured body + "For the rest of the site, drop the slug." callout.
10. **step-4** — h3 "Approve and migrate." STEP 4 + captured body +
    codeBlocks[7] + codeBlocks[8] + closing captured line ("Migrate runs
    over every approved page… ready to publish.").
11. **footer** (system-component role: `footer`) — captured + fact line
    (F-018) + link row adds /aem.

Heading map: h1 (doc-hero) → h2 (install, shortcut, main-flow) → the four
steps as h3 under main-flow's h2? NO — captured structure has steps as
sibling sections; render steps as h2s ("Step 1: Capture the current
state." style is NOT captured — keep captured heading text verbatim as
h2: "Capture the current state." etc., with STEP N eyebrows). Result:
h1 → h2×7, h3 only inside callouts if needed. No skips.

## Layout strategy

- Captured two-pane: fixed 240px ink sidebar (≥1024px), cream prose
  column max ~760px + generous right margin; single column below 1024px
  with sidebar → top bar + jump menu.
- Density balanced; section pad 64/48/32; radii 4/14/999.
- Code: ink-deep panels, mono 14–15px, pre-wrap on multi-word examples;
  single-line commands may no-wrap with an overflow fade + visible
  scrollbar; copy button top-right (mono chip).

## Key states

- Copy buttons: copied confirmation (text swap, 1.5s revert).
- Sidebar active item: amber tint (captured).

## Interaction model

- Skip-link first focusable; main landmark; sidebar nav is a <nav>.
- All internal links canonical slash forms (/docs/commands/, /aem, /).
- Motion: minimal — live-systems register applies to the marketing page;
  docs get entrance-only data-anim on section heads in the cinematic
  variant IF one is produced; static file has no JS beyond copy buttons.
  (Docs is the conversion/reading surface — motion stays out of the way.)

## Data attributes

- `header[data-section="header"][data-intent="navigate"][data-layout="sticky-bar"]`
- `nav[data-section="docs-sidebar"][data-intent="navigate"][data-layout="fixed-rail"][data-items="2"]`
- `section[data-section="doc-hero"][data-intent="orient"][data-layout="prose-lead"]`
- `section[data-section="install"][data-intent="convert"][data-layout="prose-code"][data-items="1"]`
- `section[data-section="shortcut"][data-intent="explain"][data-layout="prose-code"]`
- `section[data-section="main-flow"][data-intent="explain"][data-layout="prose-code"]`
- `section[data-section="step-1"][data-intent="instruct"][data-layout="prose-code"]`
- `section[data-section="step-2"][data-intent="instruct"][data-layout="prose-code"]`
- `section[data-section="step-3"][data-intent="instruct"][data-layout="prose-code"]`
- `section[data-section="step-4"][data-intent="instruct"][data-layout="prose-code"]`
- `footer[data-section="footer"][data-intent="navigate"][data-layout="centered"]`

## SEO / metadata contract (render into <head>)

- Title + meta description captured verbatim; canonical
  https://stardust.style/docs/; og set + og:type=website.
- Static JSON-LD: Organization + WebSite + TechArticle { headline from
  captured h1, dateModified 2026-06-23 (sitemap lastmod — the only
  captured date), author Organization Adobe }.
- Exactly one h1; h2s captured verbatim (already topic-bearing 7/7).

## Unsourced content (placeholder list)

(none) — commands from the codeBlocks addendum (captured verbatim);
chip row + free/open-source sentence are direction-authorized (F-012,
F-006); everything else captured.

## Open questions for craft

- Mobile jump menu: CSS-only (details/summary) preferred over JS select.
- Overflow fade on single-line code: mask-image linear-gradient is
  acceptable here (decorative, degrades to plain overflow).
