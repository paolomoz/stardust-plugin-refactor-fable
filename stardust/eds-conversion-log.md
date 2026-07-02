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
