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
