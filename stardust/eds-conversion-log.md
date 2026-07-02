<!-- stardust:provenance — stardust:deploy conversion log; run fable5-e2e stardust-style; started 2026-07-02; hands-off (naming locked by agent, recorded here per SKILL.md Step 2) -->
# EDS conversion log — stardust.style → stardust-plugin-refactor-fable (/stardust-style/)

## Locked decisions (Step 2, hands-off)

**Sources:** the MIGRATED pages (`stardust/migrated/index.html`, `stardust/migrated/docs/index.html`)
— single-file inline-`<style>` shape, canon-applied, content-preserving. Prototypes remain the
visual spec of record.

**Block inventory (index — one block per section, names from data-section, shortened, none reserved):**
| section (data-section) | block |
|---|---|
| hero | `hero` |
| proof-before-after | `proof` |
| why-structured-variation | `why-variation` |
| how-it-works-pipeline | `pipeline` |
| variant-receipt-strip | `receipt-strip` |
| ai-facing | `ai-facing` |
| static-html-fact-panel | `fact-panel` |
| aem-band | `aem-band` |
| cta-band | `cta-band` |

**Block inventory (docs):**
| section(s) | block |
|---|---|
| docs-sidebar | `docs-nav` (in-flow block; fixed rail ≥1024px via CSS) |
| doc-hero | `doc-hero` |
| install, shortcut, main-flow, step-1..4 | **ONE block `guide`** — same content pattern (prose + code + optional callout), per the SAFE-DEFAULT exception: variants `guide install`, `guide shortcut`, `guide flow`, `guide step` |

**Chrome:** header + footer → static fragments (`fragments/header.html`, `fragments/footer.html`)
from the canon chrome (stardust/canon/header.html + footer.html). Footer carries the fact line
(F-018). CSS-only interactions.

**Reuse:** cta-band, fact chips, and copy-button styling shared where identical. Copy buttons are
block JS (clipboard.writeText) — allowed, blocks run JS.

**SEO/LLM contract (audit F-002/F-016 fixes — the point of this redesign):**
- JSON-LD @graph (Organization + WebSite + SoftwareApplication incl. license/price-0/requirements)
  goes STATIC in `head.html` (site-wide; the head.html-untouched rule in the skill is scoped to
  FONTS). This is what makes schema visible to non-rendering AI crawlers.
- `og:type=website` also static in head.html.
- Per-page metadata block: Title + Description (captured verbatim from the source pages).
- Exactly one h1 per page; topic h2s per the approved prototypes.

**Media:** the 2 before/after JPGs are downloaded from the source (plain fetchTechnique, curl 200)
and REHOSTED to DA under `media/stardust-style/` (skill: prefer rehost over hotlink), authored as
`content.da.live` `<img>` with the captured alts.

**Fonts:** system stacks only (captured brand decision — zero webfonts). No @font-face, no
licensing alert needed. body/body.session gating irrelevant to fidelity here.

**Content paths (DA, under /stardust-style/ ONLY):**
- home → `stardust-style/index.html` → /stardust-style/
- docs → `stardust-style/docs.html` → /stardust-style/docs
(2-level slash-canonical mapping recorded; the test project serves without trailing slashes.)

**Runtime:** AuthorKit via `bootstrap-authorkit.mjs --from-sibling /Users/paolo/stardust/tests/fable5-e2e/3m`
(both mandatory edits verified present in the sibling).

## Docs page conversion (this run — docs agent)

**Blocks shipped:** `docs-nav`, `doc-hero`, `guide` (variants `install|shortcut|flow|step`) +
`templates/docs/docs.css` + `content/stardust-style/docs.html` (sanitised).

**Template mechanism (verified):** metadata row `Template: docs` → pipeline meta → `ak.js
loadTemplate()` loads `/templates/docs/docs.css` and adds **`docs-template`** to `<body>`
(NOT `docs` — AuthorKit suffixes `-template`). The template CSS carries the page-level cream
ground inversion, `main { padding-left: 240px }` + `footer { margin-left: 240px }` at ≥1024px
(the fixed rail offset — a fixed block cannot restyle sibling sections), and the F-021
outlined-active Docs pill (scoped over the shared header fragment; fragment untouched).

**docs-nav:** in-flow block, `position: fixed` rail ≥1024px / static top bar + CSS-only
details/summary jump menu <1024px. Rows classified by content: text-before-links = mark,
`<a>+<code>NN</code>` = section item (number rides `<code>`), `#hash` links = jump list,
trailing text = sigil. aria-current by pathname match, first same-origin item as fallback
(harness paths never match).

**guide:** head (eyebrow `<strong>`-only p + `<h2>`) authored as section DEFAULT CONTENT,
reabsorbed in decorate() (matches `.default-content` and `.default-content-wrapper`;
0 wrappers left post-decorate — verified). Code panels: one `<code>` per line in one cell
(`&#160;`-only `<code>` = blank separator line); copy button only when every non-blank line
carries a `$`/`›` prompt glyph (flow diagram correctly gets none — C1); payload strips
glyphs; wrap variant = single line >70 chars (F-003 Step-2 example); jump ids from
slug(eyebrow) with variant fallback (`install`). Chips = authored `<ul>`; confirm beat =
all-`<em>` cell; callout = leading-`<strong>`+text cell; `.fine` = short single-link credit
line (shape heuristic, documented in the block JSDoc).

**QA:** local harness (aem up :3001 + build-harness + injected `template` meta — the harness
strips the metadata block, so the meta the pipeline would emit is re-added for parity).
Playwright 1440/390/360: 50/50 checks green (one h1 with spaces, 9 code panels full text,
Step-2 pre-wrap unclipped, clipboard payload verified, chips AA 5.91:1, 0 overflow at 360,
0 pageerrors); screenshot eyeball vs `stardust/migrated/docs/index.html` — matching.
`npm run lint` clean.

**Known deviations:** copy-button aria-labels are generic ("Copy command(s)") vs the
migrated content-specific labels; blank code line survives DA as `&#160;` inside `<code>`
(cosmetic if a round-trip drops it); `code-block--scroll/--wrap` renamed to single-dash
(`code-block-scroll/-wrap`) for stylelint kebab-case.

## HOME page conversion (index → /stardust-style/) — 2026-07-02, this run

**Blocks built (9, one per data-section, per the locked inventory):** hero, proof,
why-variation, pipeline, receipt-strip, ai-facing, fact-panel, aem-band, cta-band.
Every block: flatten-first cell collector (#62), matches-or-descendant classifiers with
`picture, img` (#53/#72), content classification not row indexes (#48), styled `.wrap`
(#13/#74). Hero is query-based (#42), promotes/unwraps to the page's single h1 (#35/#55).

**Section heads as default content + reabsorption:** why-variation, pipeline,
receipt-strip, ai-facing author their eyebrow/deck/h2 (+ pipeline's muted line) as section
default content; each block reabsorbs via `closest('.block-content').previousElementSibling`
matching `.default-content` AND `.default-content-wrapper`, with an in-table head fallback.
QA: 0 default-content wrappers remain post-decorate. proof/fact-panel/aem-band/cta-band
keep heads in-table (per the run brief's explicit list).

**Surfaces:** each block paints its own section (hero starfield + radial glow;
receipt-strip ink-deep; fact-panel + aem-band cream full-bleed, aem-band carries the
hairline top rule; cta-band radial glow; others ride the body ink). Cream inversion rules
are scoped per cream block (canon.css is NOT loaded by EDS).

**Copy chips:** 3 cmd-chips (hero, fact-panel one-shot, cta-band) — block JS
clipboard.writeText + text-only "copied" confirmation (F-005), the one legit block JS
interaction. `<url>` authored as `&lt;url&gt;`.

**Known/accepted deviations:**
- CTA buttons render the FOUNDATION button skin (mono, uppercase, letter-spaced) not the
  migrated page's sentence-case 16px SF Pro — styles/styles.css is locked; site-wide
  consistent. Consequence: hero facts line wraps below the (wider) buttons at 1440.
- Hero `.wrap` is a centered 920px column (matches migrated `.container.hero-inner`
  geometry — the 920 max-width wins over the 1320 container there), not 1320.
- Seed marks (`seed · 1d66a8cd`, `md5(brand · date)`) are fixed aria-hidden ornaments
  injected by hero JS (provenance-marks role, hidden <480px per F-010).
- proof frames segment on media boundaries (the captured frames ARE images); the After
  frame's caption link makes the whole frame the anchor; Before stays non-interactive (A-5).
- content.da.live media 401s to the anonymous local harness (auth-gated) — images render
  broken in qa/ shots; the preview pipeline ingests them. Binaries staged at
  stardust/tmp/media/{before,after}-coffee.jpg (webp payloads as served by source, 1600px).

**Local QA (harness + Playwright, 1440/1600/360):** 45/45 PASS — all 9 blocks decorate
(data-block-name), 11 grid + 1 flex computed-display checks (runtime-contract
blockWrapperClass "none" verified), exactly one h1 (in hero, no nesting), 0
default-content wrappers, all unit counts = authored counts (2 frames, 2 ledger, 4 steps
01-04, 3 stubs A/B/C + seed, 3 cards, 2 deploy blocks, 6 fact rows), 4 .btn CTAs
(2 primary/2 secondary), copy button writes clipboard + confirms, zero pageerrors, every
wrap ≤1340 at 1600vw, no horizontal overflow at 360. Section-by-section screenshot eyeball
vs stardust/migrated/index.html: shots in qa/shots/ (eds-* vs proto-*).
