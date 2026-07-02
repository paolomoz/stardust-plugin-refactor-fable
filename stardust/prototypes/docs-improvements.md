<!--
_provenance:
  writtenBy: stardust:direct
  writtenAt: 2026-07-02T14:55:00Z
  readArtifacts:
    - stardust/audit/stardust-style/audit.json
    - stardust/current/pages/docs.json
    - stardust/current/pages/docs-commands.json
  stardustVersion: 0.14.2
  note: Items carried from stardust:audit findings (F-ids cited); docs template shared by /docs/ and /docs/commands/.
-->

# Improvements — docs

1. **[craft-bug]** The Step 2 teaching example — the one sentence that shows
   the product's core interaction — truncates mid-word at 1440px:
   `/stardust:direct "more editorial. lean into typography. ke` (pre.code
   clientWidth 538px vs scrollWidth 768px, no scrollbar/fade/wrap, ~390px of
   margin unused). (F-003)
   *Fix:* `white-space: pre-wrap` on long command examples (or widen the pre
   into the unused margin).

2. **[conversion]** Zero copy-to-clipboard affordances site-wide against an
   install block of 4 commands across 2 marketplaces; the "two minutes"
   promise is spent hand-transcribing. (F-005)
   *Fix:* Copy button with confirmation state on every `pre`; close the
   install block with a confirmation beat ("that's it — run /stardust:uplift
   on any URL").

3. **[accessibility]** All 8 permalink anchors on /docs/commands/ carry
   `aria-label="Copy link to stardust:<cmd>"` but no clipboard code exists
   anywhere — an accessible-name lie; and the prepare-migration section is
   missing its owning h2 entirely. (F-009, F-017)
   *Fix:* Implement the copy (with confirmation) or relabel to "Link to
   section"; add the missing `/stardust:prepare-migration` h2.

4. **[seo-llm]** "Do I need Claude Code?" is answered only implicitly four
   sections in; the docs pages carry zero license/authorship/price facts
   ("Apache" count: 0 on /docs/ and /docs/commands/), and the pages the
   answer engines retrieve for install queries cannot say who makes the tool
   or what it costs. (F-012, F-018, F-006)
   *Fix:* A visible "Requires Claude Code · free · Apache 2.0" chip row next
   to the install block; the home-footer fact line added to the shared footer;
   one plain sentence stating free + open source in the install section.

5. **[responsive]** Long command examples hide up to 2× the viewport width on
   mobile with no scroll cue (scrollWidth/clientWidth up to 693/350), and the
   ~14,000px-tall commands page offers no jump-to-command affordance after the
   top. (F-010)
   *Fix:* Wrap or overflow-fade long commands; persistent jump-to-command
   affordance on mobile.
