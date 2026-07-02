---
target: "https://stardust.style"
total_score: 29
p0_count: 1
p1_count: 2
timestamp: 2026-07-02T12-36-36Z
slug: stardust-style
---
Method: dual-agent (A: design-review sub-agent · B: detector/browser-evidence sub-agent), synthesized after both returned. Target: https://stardust.style (live, 4 pages: /, /aem, /docs/, /docs/commands/). Probes: Playwright Chromium 1440×900 and 390×844, 2026-07-02.

#### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | "DOCS" gold pill identical on home (CTA) and docs (location) — one costume, two meanings |
| 2 | Match System / Real World | 2 | Hero demands insider vocabulary ("brand expression for today only", "seed", "canonical AI-facing") before any concrete image |
| 3 | User Control and Freedom | 3 | No skip-to-content link; desktop docs code block hides overflow with no cue |
| 4 | Consistency and Standards | 2 | Active docs nav renders "Getstarted" (space dropped by letter-split animation); h2→paragraph gap 0px on two home sections vs 56–64px siblings |
| 5 | Error Prevention | 2 | Install moment: 4 commands, 2 marketplaces, zero copy-to-clipboard affordances site-wide |
| 6 | Recognition Rather Than Recall | 3 | "seed/canon/register/surface" must be carried across pages before being defined |
| 7 | Flexibility and Efficiency | 4 | uplift one-shot escape hatch offered in hero, docs, and reference |
| 8 | Aesthetic and Minimalist Design | 3 | 26–54 mono eyebrows per page; hero paragraph carries 3 competing gold treatments in 4 lines |
| 9 | Error Recovery | 3 | Docs teach recovery loops well (--refresh, "misreads are cheap to fix here") |
| 10 | Help and Documentation | 4 | Install-first ordering, honest caveats, per-flag tables — best-in-class for a 2-page doc set |
| **Total** | | **29/40** | **Good — solid foundation, address weak areas** |

#### Anti-Patterns Verdict

**LLM assessment:** Passes at first glance — no gradient text, no glassmorphism, no icon trios; hex-seed corner marks, the rotating "REAL SAMPLE" sticker, and provenance-as-ornament are genuine voice. But at layout level it speaks fluent AI grammar: mono eyebrows on every module (A measured 30/30/36/51 per page; B, with a stricter ≥0.15em filter, 26/34/37/54), twin identical 3-up card grids on home and /aem, dual primary+ghost hero CTA, numbered pipeline steps. The site names the LLM's three favorite moves and dodges exactly those three. Distinctive at token level, generic at layout level. Also sits adjacent to the saturated editorial-typographic lane (dark editorial ground + tracked mono labels + italic display emphasis) — identity-preservation applies, but the redesign should know the lane is crowded.

**Deterministic scan (detect.mjs 3.9.1, on rendered DOM):** 5 findings — em-dash-overuse warning on all 4 pages (13/14/18/77) and one numbered-section-markers advisory (docs-commands). False positives proven: the "77" is ~65% CLI flags (`--cap`, `--json` …), real em-dashes are 27; the "10" in the numbered sequence is a flag value in a code sample. Genuine: 13–18 em-dashes/page in prose is a real AI-cadence tell; 01–04 step numbering is a true sequence (earned, not scaffold).

**Visual overlays:** not injected — critique ran headless against the live site from a sandboxed session; no user-visible browser tab was available. Fallback signal: full-resolution screenshots + DOM probes, archived in session scratchpad.

#### Overall Impression

The site keeps the "math" half of its mantra — engineering hygiene (reduced-motion, focus-visible, landmarks, heading order, 100% alt coverage, system-font zero-payload typography) is genuinely excellent — and the before/after proof with the "IT'S A REAL ONE →" sticker is the best emotional beat. What betrays it: three live craft bugs (space-glyph loss in the letter-split animation, a truncated teaching example at the conversion page, fake "Copy link" labels), a conversion path that ends on an AEM upsell instead of an install, and section grammar (eyebrow + card trio) repeated until it becomes the very "average" the h2 mocks. Biggest opportunity: close the loop between manifesto and execution — the site's own pitch is falsifiable, and Riley falsifies it in a minute.

#### What's Working

1. **Provenance as decoration** — hex seeds framing the hero, "BRIEF + SEED = STAR · 2026", "the chosen decade × craft × register has a hash": the determinism thesis worn as ornament. Voice, not grammar.
2. **The real-sample sticker** — rotating badge over the after-image, honest aria-label, links to the live sample. Skepticism anticipated and answered in one element.
3. **Engineering hygiene under the paint** — prefers-reduced-motion disables all 5 animations; every tab stop has a visible 2–3px amber focus outline; single main/nav/header/footer; heading order has zero skips on all 4 pages; 2/2 images have in-voice alt text.

#### Priority Issues

- **[P0] Desktop docs code sample truncated mid-word.** /docs/ Step 2: `pre.code` clientWidth 538px vs scrollWidth 768px, overflow-x:auto with no visible scrollbar/fade — the natural-language directing example renders "…typography. ke" while ~390px of cream margin sits unused. This is the sentence that teaches the product's core interaction, amputated on the conversion page. Fix: `white-space: pre-wrap` or widen into the margin; add a copy button. → /impeccable adapt
- **[P1] Space glyph dropped in the letter-split animation.** Active docs sidebar renders "Getstarted"; home h1 slug is `redesignthe-web`; extraction captures "Redesignthe Web." A typo in the primary nav of a design tool's docs is a credibility wound. Fix: preserve space spans (`&nbsp;`/`white-space:pre`) in the per-character animation. → /impeccable polish
- **[P1] Conversion moment has no copy affordance and no closing CTA.** Exactly one "Install in two minutes" link on home (hero only); home ends on the AEM upsell (peak-end violation); /docs/ install block = 4 commands across 2 marketplaces, 0 copy buttons site-wide; the "two minutes" promise is never confirmed. Fix: repeat the install CTA after the last home section; copy-to-clipboard on every pre; add a "that's it" beat. → /impeccable onboard
- **[P2] "Copy link" aria-labels promise an action that never happens.** 7 permalink anchors on /docs/commands/ carry aria-label="Copy link to stardust:…" but no clipboard code exists (0 grep matches). Screen-reader users "copy" and get nothing. Fix: implement copy with confirmation, or relabel "Link to section: …". → /impeccable harden
- **[P2] Mobile collisions and hidden width.** At 390px the hex seed "a3f7" overlaps the STARDUST eyebrow glyph-on-glyph; command blocks carry up to 693px of content in a 350px box with no scroll cue. Fix: hide/reposition hex marks <480px; wrap or fade long commands. → /impeccable adapt
- **[P2] Section grammar repeated into sameness.** Eyebrow-on-every-module (26–54/page) + twin 3-up card grids + dual primary/ghost hero on both brand pages — the AI scaffold the site's own copy mocks. Fix: keep the mono kicker as ONE named system used sparingly; differentiate the card bands structurally. → /impeccable bolder

#### Persona Red Flags

**Jordan (first-timer):** must decode "a brand expression for today only — one that this brand and this date alone can produce" before learning what the tool does; two marketplaces + four hand-typed commands to install; the one example that teaches how to phrase a direction is the truncated one; "do I need Claude Code?" answered only implicitly, four sections into /docs/.

**Riley (stress tester):** finds "Getstarted", the fake Copy-link labels, `id="redesignthe-web"`, the 0px heading gaps, and the desktop truncation — five falsifiable craft claims against a site whose h2 reads "Every design tool promises uniqueness." Also notices "Install in two minutes" is never closed out.

**Casey (mobile):** hex-mark/eyebrow collision is the first mobile impression; long commands need blind horizontal scrolling (up to 2× viewport hidden); /docs/commands/ is ~14,000px tall at 390px with 129px of permanent chrome and no TOC access after the top. Bright spots: before/after stacks cleanly; h1 clamps 112→55.4px with no overflow.

#### Minor Observations

- Amber carries 0.99% of home-page pixels (pixel-sample, 138,600 samples) against 74.78% ink — "one accent, spent precisely" reads under-spent through the mid-page scroll; the only chroma for ~2,500px is italic phrases and 11px eyebrows.
- The same coffee-site before/after pair is the only proof asset, reused on / and /aem; the "three variant theses per page" differentiator is never shown as a variant trio.
- Footer sigil "brief + seed = star" is rgba(245,240,230,.4) at 10px = 3.48:1 — the only genuine contrast failure measured on the site.
- CTA vocabulary fragments: 7 distinct labels point at the GitHub repo; 4 at /docs/ install (measured over pages/*.json ctas).
- /aem has no nav presence — reachable only from the last home section and docs cross-references.
- Type scale is ad-hoc: 112/96/77.6/64/56/48/40/32/22/18px, no consistent ratio (T-scale); radius vocabulary spans 9 values (4px×89 … 6px×1).
- Docs section-boundary gold rules slice through the sidebar column; home decorative SVGs overflow the right edge by up to 23px at 1440 (clipped, untracked).
- Palette pairings are one-way streets: #854f17 passes only on cream (5.91 vs 2.81 on ink), #e8b95e only on ink (10.37 vs 1.60 on cream); only one logo variant exists (amber-on-transparent) — fragile under recombination (T-color-imbalance, T-logo-variants).

#### Questions to Consider

1. If Stardust ran /stardust:audit on stardust.style, would it flag its own 51 eyebrows and twin card trios as "the average"? Is dodging only the three named clichés subversion, or a curated blind spot?
2. Why does a site whose peak is a real sample end on an enterprise upsell? If the end beat is AEM, the emotional argument concludes "this is for Adobe," not "this is for you."
3. "Math, not mysticism" — what automated regression gate does the site's own pipeline run on itself, and why didn't it catch a dropped space glyph, a 0px heading gap, and a truncated teaching example?
