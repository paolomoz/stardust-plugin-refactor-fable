<!--
_provenance:
  writtenBy: stardust:direct
  writtenAt: 2026-07-02T14:55:00Z
  readArtifacts:
    - stardust/audit/stardust-style/audit.json
    - stardust/current/_brand-extraction.json
    - stardust/current/brand-review.html
    - stardust/current/pages/index.json
  stardustVersion: 0.14.2
  note: Items carried from stardust:audit findings (F-ids cited) per direct SKILL.md Phase 2.5 audit-reuse rule.
-->

# Improvements — index

1. **[conversion]** The ask appears exactly once: one "Install in two minutes"
   link in the hero, then the page ends on the AEM upsell with no restated CTA;
   meanwhile 7 distinct labels point at the GitHub repo and 4 at the install
   destination (59 CTA instances, 27 distinct labels). (F-005, F-021,
   measurements.ctaFragmentation)
   *Fix:* Add a closing install band after the last content section (one
   canonical primary "Install in two minutes" + one secondary "View on GitHub");
   canonicalize one label per destination everywhere else.

2. **[dated-pattern]** Three near-identical mono-eyebrow + h3 + muted-body card
   trios (index.png y≈2150, 3050–3450, 3950–4300) repeat the exact AI-layout
   grammar the site's own copy mocks ("the moves an LLM reaches for first"),
   with 26–30 eyebrow labels on the page. (F-008)
   *Fix:* Keep the mono kicker as one sparing system; restructure at least one
   card band into a different affordance — an annotated pipeline diagram or a
   receipt/ledger strip (the rolled folded-paper-ephemera craft supports this).

3. **[missed-opportunity]** The same coffee-site before/after pair is the only
   imagery on the entire site, the claimed "three variant theses per page" is
   never pictured, and the amber accent paints 0.99% of the home page — the
   mid-scroll is a chroma desert exactly where attention flags. (F-011, F-022,
   measurements.brandColorShare)
   *Fix:* Add a variant A/B/C proof strip (three thumbnails + one-line rationale
   each) as the one committed amber-spent mid-page moment.

4. **[seo-llm]** 8 of 15 home h2/h3s are slogans ("Every design tool promises
   uniqueness.", "The seed picks the lane.") that block passage retrieval; the
   JSON-LD @graph is injected client-side (invisible to GPTBot/ClaudeBot);
   "free" is never stated in crawlable text. (F-013, F-002, F-006)
   *Fix:* Let every h2 carry the topic ("How Stardust works: extract → direct →
   prototype → migrate") with the slogan demoted to a styled eyebrow/deck; emit
   the JSON-LD statically in the served head; add a pharmacy-insert-register
   fact panel stating price $0 / Apache-2.0 / by the AEM team at Adobe /
   requires Claude Code in plain crawlable text.

5. **[craft-bug]** The letter-split entry animation drops space glyphs: the h1
   textContent is "Redesignthe Web." (anchor id `redesignthe-web`) and the docs
   nav renders "Getstarted" — a typo in the primary chrome of a tool selling
   craft discipline. (F-004)
   *Fix:* Space-safe split (preserve spaces as `&nbsp;`/`white-space:pre`
   spans); slugify on the visual word break.

6. **[accessibility]** The footer sigil "brief + seed = star" computes 3.48:1
   on ink — the site's only genuine AA failure. (F-014, measurements.contrast)
   *Fix:* Raise to dust-55+ (dust-50 already measures 4.80:1) or enlarge.
