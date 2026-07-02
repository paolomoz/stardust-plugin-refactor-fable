<!-- provenance: stardust/learnings.md per skills/stardust/reference/learnings.md; run: fable5-e2e stardust-style (7th validation site); started 2026-07-02 -->
# Learnings — stardust.style run (fable5-e2e, 2026-07-02)

## L1 — crawl.mjs trailing-slash normalization 404s on slash-required hosts [bug] [pending]
`normalizeUrl()` strips trailing slashes from all non-root paths so `/about` and `/about/` dedupe.
stardust.style (GitHub-Pages-style static host) serves `/docs/` as 200 and `/docs` as 404 with **no
redirect** between the variants, so the sitemap-declared URLs were normalized into 404s and 2 of 4
pages failed the first crawl. Fix direction: keep the sitemap's form verbatim; dedupe by comparing
slash-stripped keys instead of rewriting the fetched URL, or retry once with the slash flipped on
HTTP 404 before recording a failure.

## L2 — crawl.mjs omits the recipe's reduced-motion emulation; entry-animated h1s get dropped [bug] [pending]
`reference/playwright-recipe.md` mandates "Disable animations via prefers-reduced-motion: reduce",
but the bundled crawler creates its contexts with no `reducedMotion` option and captures immediately
after `scrollTo(0,0)`. On stardust.style the hero h1 (entry-reveal animation, opacity-driven) was
still `opacity: 0` at capture time, so the visibility filter (`+cs.opacity === 0`) silently dropped
the page's only h1 and the first h2 from every marketing page — downstream direct/prototype would
have seen a site with "no h1", and audit would have reported a false heading-hierarchy finding.
Fix applied to the project copy (works): `browser.newContext({ reducedMotion: 'reduce' })` on both
context-creation sites + an 800 ms settle after return-to-top before `page.evaluate(capture)`.
Also note: the crawler's own multitest hardening (#7) made this failure silent — the filter is right
to drop invisible nodes; the miss was not neutralizing animations first.

## L3 — crawl.mjs body capture drops <pre>/<code> contents [gap] [pending]
The in-page capture() collects headings/body/ctas but the structured body[] paragraphs skip
code blocks, so on a developer-tool site the single most load-bearing content — the install
commands — never lands in pages/<slug>.json. The prototype render agent caught it via the
content-sourcing hierarchy (refused to invent the commands). Fix direction: capture
pre/code contents as a typed codeBlocks[] field per page (they are also the fields most
likely to be copy-needed at migrate time). Workaround this run: re-captured via curl of the
server-rendered HTML into pages/docs.json#codeBlocks with its own provenance stamp.

## L4 — content-preservation.md broken-link contract conflicts with file-protocol-audit.mjs on partial-inventory runs [contradiction] [pending]
content-preservation.md § Internal link rewriting says a target NOT in the migrated inventory
still rewrites to its computed migrated-tree path with data-broken-link="true" ("not an escape
hatch to the live origin"). But the mandatory portability fixture file-protocol-audit.mjs
hard-fails any internal href whose target file doesn't exist on disk — so the two contracts are
co-satisfiable only on full-inventory runs. On a scoped run (2 of 4 pages) the agent had to pick:
it kept resolvable absolute origin URLs + data-broken-link + sidecar logging. Fix direction:
either content-preservation should carve out partial-inventory runs (origin-URL fallback until
the target migrates), or the fixture should accept data-broken-link-flagged hrefs as known-broken.

## L5 — migrate SKILL.md references a cinematic pickup that isn't specced [gap] [pending]
prototype/SKILL.md § static-only path says migrate "picks up cinematic motion when both files
exist", but skills/migrate/ contains no cinematic handling at all (grep confirms). The agent
migrated the static file (correct per artifact-map "static prototype is the load-bearing
artifact for migration consumption") and copied lenis assets without wiring them. Fix direction:
either spec the cinematic merge in migrate (motion data-* + runtime + assets carried when the
cinematic sibling exists) or soften the prototype SKILL.md sentence.

## L6 — token hygiene must be a phase-0 gate, not a deploy-time discovery [process] [pending]
The deploy skill's "Token hygiene (#16)" says to check .gitignore covers .env "before the first
commit" — but in the happy-path pipeline the first commits happen at the END of the audit phase
(hands-off default commits per phase), long before deploy's SKILL.md is ever read. This run
committed .env (DA_TOKEN + an AWS key) into 6 local commits; GitHub push protection (GH013)
rejected the push at deploy time and the bootstrap agent had to filter-branch the unpushed
history. Nothing leaked (push protection + unpushed-only rewrite), but all local SHAs changed
mid-run. Fix direction: the master skill's hands-off "commit at the end of each phase" rule
should carry the .env/.gitignore check itself (phase-0), not leave it to the deploy skill.
