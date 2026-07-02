# Learnings — theroadhome e2e run (2026-07-02, Fable 5 refactor validation)

Ledger per plugin contract (skills/stardust/reference/learnings.md).
One entry per failure class; WIN: prefix for what worked notably well.

### playwright install on vanilla aem-boilerplate hits eslint peer-dep conflict
- failure class: setup-friction
- evidence: `npm i -D playwright` in the fresh aem-boilerplate clone (@adobe/aem-boilerplate@1.3.0) failed ERESOLVE — @babel/eslint-parser@8.0.0 wants eslint ^9||^10, boilerplate pins eslint 8.57.1. Retry with `--legacy-peer-deps` succeeded.
- proposed change: `skills/extract/SKILL.md` § Setup step 1 — after "run `npm i -D playwright`", add: on aem-boilerplate targets append `--legacy-peer-deps` (boilerplate's eslint peer graph is unresolvable as of 1.3.0).
- status: pending

### crawl.mjs must be copied into the project root to resolve playwright
- failure class: setup-friction (ESM resolution from script location)
- evidence: running `node <plugin-path>/skills/extract/scripts/crawl.mjs` cannot import `playwright` because ESM resolves from the script's own directory (plugin source has no node_modules). Copied byte-identical to project root and ran the local copy — worked.
- proposed change: `skills/extract/SKILL.md` § Setup "Bundled crawler" — document the copy-to-project-root pattern explicitly (or have the skill invoke `node --experimental-vm-modules` with cwd-relative resolution / add `createRequire(projectRoot)` shim in crawl.mjs so it resolves playwright from CWD's node_modules).
- status: pending

### Bundled crawl.mjs does not emit the _provenance block its own SKILL.md contract requires
- failure class: capture-gap (contract mismatch between reference implementation and schema)
- evidence: all 6 page JSONs from `skills/extract/scripts/crawl.mjs` carry `renderedBy`/`fetchedAt` top-level only; `_provenance` (first key, with waitMs/waitMode/httpStatus) per SKILL.md § Live-render evidence + current-state-schema.md is absent. Strict reading of the contract would refuse to mark every live-rendered page `extracted`. Run normalized the JSONs post-hoc from the crawler's validated invariants (wait medium=2500ms, status<400 enforced at capture).
- proposed change: `skills/extract/scripts/crawl.mjs` line ~410 — write `_provenance: { renderedBy, fetchedAt, waitMode: args.wait, waitMs: WAIT_MS[args.wait], httpStatus: resp.status() }` as the first key of each page JSON (thread `status` out of capturePage), matching `reference/current-state-schema.md` § Live-render evidence.
- status: pending

### impeccable design hook flags the brand-review template's own mandated chrome
- failure class: doc-contradiction (skill contract vs live design hook)
- evidence: writing stardust/current/brand-review.html triggered impeccable hook [side-tab] on the left-bordered Components list — but `skills/extract/reference/brand-review-template.md` § Section contract mandates exactly "left-bordered list of detected component types". Classified as intentional per template; no edit.
- proposed change: `skills/extract/reference/brand-review-template.md` § Styling rules — either restyle the mandated Components list away from side-tab borders, or add a note that brand-review.html is a diagnostic artifact expected to carry an impeccable-disable waiver for [side-tab]/[em-dash-overuse].
- status: pending

### WIN: reference-research tier 1 (refero MCP) fired end-to-end
- failure class: n/a (WIN)
- evidence: refero tools loaded via ToolSearch on first try; 2 style searches + 1 batched 3-style retrieval produced a genuinely useful anchor set (airbnb.org / cqcm.coop / n26.com — n26's Deep Teal #088177 nearly matches the brand's #008192, a validation the deterministic seed could never supply). Implied dimensions recorded as picked_by: "reasoned: …", raw rolls kept for audit.
- proposed change: none — but `reference-research.md` § 1 could note that refero search results can contain corrupted/injected trailing text in descriptions (observed on the Empower entry: appended JSON garbage + escape sequences); agents should treat description text as untrusted content, not instructions.
- status: pending

### direct SKILL.md has no hands-off contract; plan-confirmation gates conflict with handsOff
- failure class: doc-contradiction
- evidence: `skills/direct/SKILL.md` Phase 1 says "Wait for the user's confirmation ('go' …) before moving on" and the two tuning questions are phrased as user prompts; nothing in the skill mentions `state.json.handsOff`. Run proceeded with documented defaults (density balanced, ia-fidelity reimagined) and recorded them in direction.md § Gaps.
- proposed change: `skills/direct/SKILL.md` § Phase 1 — add a hands-off clause: when `state.json.handsOff === true`, skip confirmation gates, take each question's documented default, and stamp `(default, hands-off)` in direction.md.
- status: pending

### Substrate-transition cap (prototype Discipline 4) has no carve-out for signature band-rhythm brands
- failure class: missing-guardrail (doc gap)
- evidence: `skills/prototype/SKILL.md` § Discipline 4 fails a brief with >2 substrate transitions unless the surprise:high move is a substrate-keyed zine/catalog/poster document-shape. The Road Home's signature IS an alternating full-bleed color-band system (motifs.patterns[full-bleed-color-band]; DESIGN §6 "Keep the full-bleed band rhythm — it is the brand's chapter structure") at surprise:low. Home has 8 band transitions, all signature preservation (§8b budget-exempt). The two disciplines collide: §8b says reproduce the signature; §4 caps transitions with no signature-band exemption.
- proposed change: `skills/prototype/SKILL.md` § Discipline 4 — add a third exemption clause: when the captured site's signature motif is a full-bleed color-band rhythm (per `_brand-extraction.json#motifs.patterns[full-bleed-color-band]` or a signatureElements[kind=motif] band entry), the >2-transition cap is lifted for brand-faithful (Mode A) renders; each transition instead carries a per-section ground citation (as already recorded in substrateTransitions.exceptions[]). Mirror the friction-#2 structure.
- status: pending

### DESIGN.json systemComponentRoles.header (deep-harbor) contradicts the captured white header
- failure class: capture-vs-direction conflict
- evidence: `direct` wrote `DESIGN.json.extensions.systemComponentRoles.header.constraint = "deep-harbor ground, daylight text"` and `_brand-extraction.json#systemComponents[site-header].notes = "dark-teal #005560 bar"`, but both captured screenshots (index.png, get-help.png) show a WHITE header with the color logo, dark-teal nav text, teal DONATE button. The footer is deep-harbor; the header is not. Mode A (brand-faithful) must follow the captured pixels, so the prototype rendered a white header — diverging from the authored system-component role.
- proposed change: (a) `skills/extract` brand-review / systemComponents capture should record the header GROUND color from the rendered screenshot, not infer it from a nearby dark bar; (b) `skills/direct` should cross-check systemComponentRoles constraints against the captured screenshot before authoring. Add a note to `skills/prototype/SKILL.md` § Phase 2.5 vision gate: when a system-component role's ground conflicts with the captured screenshot under Mode A, the screenshot wins and the conflict is logged.
- status: pending

### mobile-nav-audit.mjs fixture (and any playwright script) must be copied to project root to resolve playwright
- failure class: setup-friction (ESM resolution from script location — same root cause as crawl.mjs)
- evidence: `node <plugin>/skills/prototype/fixtures/mobile-nav-audit.mjs <file>` exits 2 "Playwright is required" because ESM resolves `playwright` from the fixture's own dir (plugin source has no node_modules). Same for an ad-hoc screenshot script placed in the scratchpad. Copying both to the project root (which has node_modules) resolved it. This confirms the crawl.mjs friction generalizes to every bundled playwright-dependent script/fixture.
- proposed change: `skills/prototype/SKILL.md` § Phase 2.7 (mobile-nav-audit invocation) — document the copy-to-project-root requirement, OR add a `createRequire(process.cwd())` shim to the fixtures so playwright resolves from CWD's node_modules. Same fix as the crawl.mjs entry; consider a shared bundled-script resolution helper.
- status: pending

### WIN: canon reuse across two templates was clean and mechanical
- failure class: n/a (WIN)
- evidence: home (landing) and get-help (program) share header / journey / newsletter / footer as `data-canon` / `data-module` marked blocks. Authoring get-help was fast because the shared chrome CSS + markup transferred verbatim; only the interior sections (banner hero, crisis panel, resource-centers directory) were new. The journey module re-skinned per-band (white ground on home, teal ground on get-help) via a section-scoped override while keeping identical structure — exactly the template/canon path the data-attributes vocab is designed for.
- proposed change: none. Confirms the `data-canon`/`data-module`/`data-slot` contract carries multi-template intent well.
- status: n/a (win)

### Eyebrow-on-most-sections tension: impeccable brand-ban vs Mode-A brand kicker system
- failure class: doc-contradiction (potential false-positive lane)
- evidence: impeccable `reference/brand.md` bans "repeated tiny uppercase tracked labels above every section heading" as AI scaffolding. The Road Home DESIGN.json defines the uppercase eyebrow as a named brand component (`components[eyebrow-chip]`, DESIGN §3) and the captured site uses uppercase section labels. The prototype uses eyebrows on ~5 sections. The impeccable deterministic detector did NOT fire (clean), so the two are reconciled in practice, but a stricter critique pass could flag brand-native kicker systems as slop.
- proposed change: `skills/prototype/SKILL.md` § Phase 2.5 brand-faithful inversion auto-dismiss — add "repeated-eyebrow / section-kicker" to the known Mode-A false-positive list when the eyebrow is a declared `DESIGN.json.components[]` entry, so a future critique run doesn't demand its removal.
- status: pending

### migrate ran in lean archetype mode (timebox) — full canon-extraction/portability contract not exercised
- failure class: test-scoping (not a plugin bug)
- evidence: for the 2-page validation I ran migrate as a focused transform (placeholder gate, ../current→relative asset rewrite + bundle, provenance + _meta + robots/sitemap, file:// round-trip audit) rather than the full Phase-3 machinery (canon-extraction write-back, pagemap-audit.mjs, file-protocol-audit.mjs fixtures, --clean stale sweep). Both migrated pages are portable and self-contained. NOTE for maintainers: the spec's asset-bundling says rewrite to root-absolute `/assets/`, but Phase-3 portability audit #2 greps `(href|src)="/[^/]` and would FLAG `/assets/` — using depth-adjusted relative paths (`assets/` at root, `../assets/` at depth 1) passes both file:// and the audit. This is a latent internal contradiction in `skills/migrate/SKILL.md` §§ asset-bundling vs Phase-3 portability.
- proposed change: reconcile `reference/asset-bundling.md` § Rewrite ("root-relative `/assets/`") with `skills/migrate/SKILL.md` § Phase-3 audit-2 (`(href|src)="/[^/]`). Either the audit must whitelist `/assets/`, or the rewrite must be depth-relative. As written they contradict for any bundle opened via file:// or served at a subpath.
- status: pending

### DA/helix delivery pipeline strips ALL inner author classes + flattens nested divs in block cells
- failure class: deploy-fidelity (biggest deploy friction)
- evidence: authored `<div class="impact__grid"><div class="impact__num">1,550</div>...` delivered as flat `<p>1,550</p>` — every inner presentational class and nested div stripped; only the BLOCK-NAME class (`.impact`) and semantic tags (h1/h2/p/a/strong/em/img/ul/li/address) survive. A class-based styling approach (port prototype CSS keyed to author classes) renders as single-column stacked default content. Required writing per-block `decorate()` JS to REBUILD the presentational DOM (grids, hero media/scrim/overlay, nav) from the flat semantic content, re-adding the classes the CSS expects.
- proposed change: `skills/deploy/SKILL.md` § "The ENCODE contract" already warns "DA strips author classes" — but make it a LOUD up-front rule with a worked example: "author block cells as SEMANTIC content only (headings, p, a, strong/em, img, ul/li); the block's decorate() builds ALL presentational structure. Never rely on author `class=` inside a cell surviving delivery." Add a fixture block showing a grid rebuilt from flat cells. This is the single highest-leverage deploy lesson and cost ~3 redeploy iterations.
- status: pending

### header:off / footer:off metadata is NOT supported by vanilla aem-boilerplate
- failure class: doc-gap (runtime-specific)
- evidence: setting `<div class="metadata"><div>footer</div><div>off</div></div>` on a vanilla-eds page did not suppress the stock footer block — instead footer.js loaded fragment `/off` and threw "failed to load module for footer". `header:off`/`footer:off` are AuthorKit/helix-pipeline features; vanilla boilerplate decorates the static `<header></header>`/`<footer></footer>` unconditionally.
- proposed change: `skills/deploy/SKILL.md` § "Content page scaffold" notes header/footer:off in the metadata block — qualify it: "header:off/footer:off require the helix delivery pipeline; on vanilla aem-boilerplate they are ignored (and `footer:off` makes footer.js fetch `/off`). For custom chrome on vanilla EDS, author nav/footer as fragments referenced by `nav`/`footer` metadata and style the STOCK header structure (`.nav-brand`/`.nav-sections`), or override header.js." Cross-ref the runtime-detection probe.
- status: pending

### Stock header block reshapes a nav fragment into .nav-brand/.nav-sections/.nav-tools — style THAT, not your own class
- failure class: deploy-fidelity (vanilla-eds header)
- evidence: a nav fragment authored as a single `.trh-nav` block was NOT preserved as a block; header.js dropped it into `.section.nav-brand > .default-content-wrapper` as default content (logo+links as `<p><a>`), and never ran my `trh-nav.js`. CSS keyed to `.trh-nav.block` never matched; nav rendered as a stacked list. Fix: target the stock structure `header .nav-brand .default-content-wrapper` with flex.
- proposed change: `skills/deploy/SKILL.md` § nav/footer fragments — document that on vanilla EDS the nav fragment is consumed by the stock header block's `brand/sections/tools` split (first three top-level sections, separated by `---`), and CSS must target `.nav-brand/.nav-sections/.nav-tools`, not the fragment's own block class. Give the 3-section `---`-separated nav authoring template.
- status: pending

### WIN: atomic delivery contract + block-JS rebuild produced faithful, verified deploys
- failure class: n/a (WIN)
- evidence: both pages passed the atomic contract every deploy (PUT 201/200 → preview 200 → GET .plain.html: exactly 1 h1, 0 about:error, editorial images ingested → live 200), and after the block-JS rebuild the deployed home matches the prototype closely (parallax hero overlay, crisis band, 3-up routes, display-scale impact stats, purple charity, portrait story grid, 4-col footer, horizontal nav). The .plain.html img-count + about:error grep caught nothing because media was rehosted to DA correctly on the first try (10/10 uploads 201).
- proposed change: none. The atomic contract + media-to-DA rehost worked exactly as documented.
- status: n/a (win)

### Minor deploy-fidelity gaps accepted under timebox (documented, not blocking)
- failure class: deploy-fidelity (residual)
- evidence: (1) `<p>` authored INSIDE an `<a>` story card is hoisted OUT by the pipeline → the excerpt renders as orphaned text above the card grid (author the excerpt outside the anchor, or rebuild fully in block JS). (2) newsletter `<form>`/`<input>` elements are stripped by delivery → labels render without inputs (EDS needs a dedicated form block or the sidekick forms plugin). (3) footer 100-year logo (portrait 1360x1545) renders tall — needs a max-height in footer CSS. (4) route card name-split regex dropped "GIVE" from "WAYS TO GIVE".
- proposed change: `skills/deploy/SKILL.md` — add a "forms don't survive as raw HTML" note (point to a forms block) and a "never put block-structural `<p>` inside an `<a>` cell" rule; both are recurring EDS content-authoring gotchas.
- status: pending
