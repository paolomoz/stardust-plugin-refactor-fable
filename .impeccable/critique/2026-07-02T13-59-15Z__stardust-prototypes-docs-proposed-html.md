---
target: stardust/prototypes/docs-proposed.html
total_score: 31
p0_count: 0
p1_count: 2
timestamp: 2026-07-02T13-59-15Z
slug: stardust-prototypes-docs-proposed-html
---
Method: dual-agent (A: critique-assessment-a (rerun corroborated) · B: critique-assessment-b)

# Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Copied state visual-only (no live region); no desktop scroll orientation |
| 2 | Match System / Real World | 3 | $/› prompt taxonomy authentic, but copy button pastes the glyphs |
| 3 | User Control and Freedom | 3 | Escape hatches documented; mobile jump menu not sticky |
| 4 | Consistency and Standards | 3 | install section eyebrow-less; /aem trailing slash; off-scale sizes |
| 5 | Error Prevention | 2 | Copy button manufactures paste errors; prereq chip after commands |
| 6 | Recognition Rather Than Recall | 3 | TOC exists only <1024px |
| 7 | Flexibility and Efficiency | 3 | Dual path (uplift vs long form) strong; no desktop TOC/anchors |
| 8 | Aesthetic and Minimalist Design | 4 | Disciplined; wide-viewport right rail under-composed |
| 9 | Error Recovery | 3 | Pipeline recovery copy excellent; no install troubleshooting |
| 10 | Help and Documentation | 4 | Is documentation; links onward correctly |
| **Total** | | **31/40** | **Good** |

# Anti-Patterns Verdict
LLM assessment: NOT slop. Pinned brand system executed with discipline (1 eyebrow max/section verified, 3-radius vocabulary held, no card trios/gradients/glass). Failures are engineering-craft, not template-reflex.
Deterministic scan: 1 warning (em-dash-overuse, 20 in body) — DISMISSED: captured-verbatim copy exemption (Discipline 9; render agent already adjudicated). Overlay: 5 findings — cream-palette, hero-eyebrow-chip, wide-tracking x3 — ALL dismissedAsBrandFaithful per DESIGN.json extensions.divergence.brand_faithful_inversions[] and the DESIGN.md named mono-kicker system / captured cream docs-ground inversion. gradient-text + theater-slop-phrase were proven detect.js inline-injection artifacts (absent from source).
Browser overlay: headless environment — no user-visible tab; evidence via src-injection in Playwright chromium.

# Priority Issues
- [P1] Copy buttons copy prompt glyphs and annotations (script copies pre.textContent verbatim; $/› prefixes break paste; main-flow button copies annotated prose against its aria-label). Fix: data-copy payloads; remove button from the annotated diagram block. — FIXED in place.
- [P1] Focus ring amber-deep (#854f17) on ink-deep (#060a14) code blocks = 2.81:1; violates the file's own pairing rule + WCAG 1.4.11. Fix: .code-block :focus-visible outline-color amber. — FIXED in place.
- [P2] Copied state invisible to AT (aria-label pins name; no live region). — FIXED in place (aria-label update + polite status region).
- [P2] chip-row aria-label on plain div not exposed. — FIXED (role="group").
- [P2] Scrollable pre not keyboard-focusable in Safari. — FIXED (tabindex="0").
- [P2] No desktop TOC while right rail sits empty (jump list <1024px only). — OPEN (design-level; out of hands-off P0/P1 scope).
- [P2] "Requires Claude Code" chip placed after the commands; no acquisition link. — OPEN.
- [P3] Unconditional right-fade cue dims fitting glyphs on mobile. — OPEN.
- [P3] Sigil wraps in 240px rail; dead scale tokens; off-scale sizes (13/13.5/14/14.5/17); /aem slash; install eyebrow-less. — OPEN.

# Persona Red Flags
Jordan: paste failure at first interaction (P1, fixed); prereq disclosed late, no Claude Code link; no expected-output receipt after install.
Alex: no desktop TOC; pipeline copy button handed annotations (fixed by removal); mobile jump menu not sticky.
Sam: focus ring invisible on copy buttons (fixed); silent copy confirmation (fixed); $/› glyphs announced; chip-row label not exposed (fixed); pre not focusable in Safari (fixed). Positives: skip link first tab stop, labeled navs, clean h1->h2 outline, reduced-motion honored.

# Minor Observations
Meta description promises "under 30 minutes", unredeemed on-page; dateModified hardcoded; h1 lh/tracking drift vs DESIGN.md display spec; double branding in mobile top bar; jump-list links carry terminal periods.

# Questions to Consider
1. Where is the receipt at the moment of purchase? No expected-output block after install for a "show the receipt" brand.
2. Chips are the fact-panel's business card — would the pharmacy-insert dosage table have been the stronger accent spend AND the better crawlable answer?
3. Is the empty desktop right rail a captured signature or inherited emptiness?
