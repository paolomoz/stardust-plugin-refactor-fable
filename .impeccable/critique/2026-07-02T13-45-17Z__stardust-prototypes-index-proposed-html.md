---
target: stardust/prototypes/index-proposed.html
total_score: 35
p0_count: 0
p1_count: 3
timestamp: 2026-07-02T13-45-17Z
slug: stardust-prototypes-index-proposed-html
---
Method: dual-agent (A: design-review sub-agent · B: detector sub-agent)

# Critique — stardust/prototypes/index-proposed.html (stardust:prototype Phase 2.5)

## Design Health Score: 35/40 (Good)
1 Visibility of status 4 · 2 Real-world match 3 · 3 User control 4 · 4 Consistency 3 · 5 Error prevention 4 · 6 Recognition 3 · 7 Flexibility 3 · 8 Aesthetic/minimalist 3 · 9 Error recovery 4 · 10 Help/docs 4

## Anti-Patterns Verdict
AI-slop: PASS. Detector: 2 findings — em-dash-overuse (16, captured-verbatim copy → dismissed brand-faithful, copyCadenceBypass per DESIGN.md Discipline 9) and numbered-section-markers (01–04 = real ordered pipeline sequence, one section, aria-hidden + ol semantics → dismissed).

## Priority Issues (post-gate status)
- [P1] A-1 deck↔h2 verbatim duplication in 3 sections — FIXED (h2s reworded; captured decks untouched).
- [P1] A-2 literal `<captured trait>` placeholder — FIXED (⟨captured trait⟩ styled as .ai variable token).
- [P1] A-3 pipeline h2 spent 76px display on keyword string + arrows — FIXED (h2 "How Stardust works: a four-step pipeline").
- [P2] A-4 provenance theater (formula/filename hash instead of a real digest) — OPEN (content-authoring decision; recommend dogfooding a real seed line).
- [P2] A-5 hero-facts orphan at 390px + duplicate proof-frame hrefs — FIXED (.nowrap; Before frame → non-interactive div).

## Persona Red Flags
Jordan: "seed" never defined on-page; step 02 is insider shorthand. Riley: fake seed hash (A-4); JSON-LD operatingSystem "Claude Code" is semantically loose. Casey: ~10-screen page with sticky 60px header; CTA above fold (good).

## Minor Observations
Eyebrow naming collision ("The receipt" vs "Provenance"); receipt stub double-label (A + VARIANT A); cream band arrives at ~70% scroll; pipeline ledger right-side dead zone at 1440; steps 02/03 vs 01/04 rhythm imbalance.

## Questions
1. What would a Stardust-native closer look like instead of a centered CTA restating the hero?
2. Why not dogfood visibly — a real "directed with seed X on 2026-07-02" line? (Collapses A-4.)
3. Who is the cream fact-panel placement optimized for, humans at 70% scroll or engines reading source?
