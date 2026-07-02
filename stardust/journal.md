
## 2026-07-02 — audit https://stardust.style (fable5-e2e final validation, hands-off)
Extract: 4/4 pages live (the whole site). Two crawler defects found + fixed in the project copy
(trailing-slash 404s; missing reduced-motion emulation dropped animated h1s) — learnings L1/L2.
Audit: overall 68/100 (brand 62 · hierarchy 58 · conversion 50 · a11y 78 · seo 72 · llm 68 · perf 92).
5 P1s: slash-variant 404s (F-001), JSON-LD client-side-only (F-002), truncated docs example (F-003),
letter-split drops spaces "Getstarted"/"Redesignthe" (F-004), no closing CTA / no copy affordance (F-005).
Notable: curl-based "no JSON-LD" was refuted by rendered-DOM check — schema exists but is invisible to
non-rendering AI crawlers; llms.txt exists and is good except all 8 anchors 404. CWV is perfect (EDS).
Artifacts: stardust/audit/stardust-style/{audit.json,report.html}. Next: direct (Mode A brand-faithful),
folding the P1/P2 ledger into the improvements list.

## 2026-07-02 — deploy + diff complete (phases 5–6)
Deployed home + docs to the test EDS project: AuthorKit bootstrapped --from-sibling (3m clone),
12 blocks (9 index + docs-nav/doc-hero/guide), template mechanism for the docs cream inversion,
static JSON-LD in head.html (F-002 fix — schema now visible to non-rendering crawlers).
Atomic contract green on both pages incl. the 0.14.2 computed-layout gate (8 grids compute grid).
Diff: visual red flags none; content-diff 3 🔴 all verified node-granularity artifacts (L8).
SEO/LLM verification on RAW live HTML: 1 h1 each, no level skips, meta desc, og:type, static
@graph with SoftwareApplication (license/price 0/requires Claude Code), all key facts crawlable
(docs needed a one-sentence patch — L9). Security note: .env was scrubbed from unpushed history
after a GH013 push rejection (L6); token never reached GitHub.
