<!-- stardust:provenance
  writtenBy: stardust:extract
  writtenAt: 2026-07-02T12:12:06Z
  readArtifacts:
    - stardust/current/_brand-extraction.json
    - stardust/current/pages/index.json
    - stardust/current/pages/aem.json
    - stardust/current/pages/docs.json
    - stardust/current/pages/docs-commands.json
  synthesizedInputs: []
  stardustVersion: 0.14.2
  note: DESCRIPTIVE — the visual system of the existing site at https://stardust.style, captured 2026-07-02.
-->
---
name: Stardust (current state)
description: Ink-navy editorial ground, cream counterpoint, one amber accent — math, not mysticism.
colors:
  ink: "#0a1024"
  ink-deep: "#060a14"
  ink-soft: "#141b3a"
  deep-ink: "#1a1f38"
  dust: "#f5f0e6"
  amber: "#e8b95e"
  amber-light: "#ffd98a"
  amber-deep: "#854f17"
typography:
  display:
    fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: "112px"
    fontWeight: 600
    lineHeight: 0.96
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: "77.6px"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.032em"
  title:
    fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.022em"
  body:
    fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "SF Mono, JetBrains Mono, ui-monospace, monospace"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.0
    letterSpacing: "0.24em"
rounded:
  sm: "4px"
  md: "8px"
  lg: "14px"
  xl: "22px"
  pill: "999px"
spacing:
  section-pad: "clamp(20px, 4vw, 64px)"
  container-max: "1320px"
  nav-height: "60px"
components:
  button-primary:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "14px 24px"
  button-nav-pill:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "8px 14px"
  button-sidebar-item:
    backgroundColor: "#e8b95e1f"
    textColor: "{colors.amber-light}"
    rounded: "{rounded.md}"
    padding: "14px 16px"
  card:
    backgroundColor: "{colors.ink-soft}"
    rounded: "{rounded.lg}"
---

# Design System: Stardust (current state)

## 1. Overview

**Creative North Star: "Math, not mysticism"** — the site's own captured mantra (footer + hero, all four pages).

The existing system is a dark editorial two-ground composition: deep ink navy (#0a1024 / #060a14) alternating with warm cream (#f5f0e6) in full-bleed bands, with a single amber accent (#e8b95e) doing every chromatic job — nav pill, primary CTA, italic emphasis inside display headings, the logo mark itself. Heroes are type-only: 96–112px SF Pro Display over a radial ink glow scattered with CSS-gradient starfield dots; no hero photography anywhere. Docs pages invert the ratio (cream body, ink sidebar and code blocks) without changing the vocabulary.

Evidence-forward composition carries the personality: before/after image pairs, pipeline step rows (EXTRACT → DIRECT → PROTOTYPE → MIGRATE), uppercase mono eyebrows on every section, and shell commands rendered in dark rounded code blocks. What the system visibly avoids — per its own copy — is "gradient blob hero, glassmorphism, generic icon trios" and shelf-component sameness.

**Key Characteristics:**
- Two grounds (ink / cream), one accent (amber), zero other hues
- Type-only heroes with starfield texture; flat, nearly shadowless surfaces
- SF Mono as a structural voice (eyebrows, labels, nav pill, command headings)
- Amber italic emphasis as the signature move inside display headings
- System font stacks throughout — no webfont files ship

## 2. Colors

An ink-and-amber monochrome-plus-one palette; warmth comes from cream and amber, depth from three graded navies.

### Primary
- **Amber** (#e8b95e): the only chromatic accent. Nav CTA pill, hero primary button, italic emphasis words, logo mark fill, link color on ink. Cross-page, all contexts (text, background, border, fill).
- **Deep Amber** (#854f17): amber's on-cream form — mono labels, links, and command accents on cream grounds (densest on /docs/commands). Text only.
- **Light Amber** (#ffd98a): emphasis tint on ink — sidebar active items, inline highlights. Text only.

### Neutral
- **Ink** (#0a1024): page ground on index and /aem; also the text color sitting on amber buttons.
- **Deep Ink Ground** (#060a14): sticky header, hero gradient's darkest stop, code blocks.
- **Soft Ink** (#141b3a): raised card panels on ink sections. Background only.
- **Card Ink Text** (#1a1f38): headings and body on cream grounds (docs pages), plus hairline borders on cream.
- **Dust** (#f5f0e6): cream — section grounds, and the text color on ink. Its alpha ramp (72/50/30/15/8%) supplies muted text and hairline borders on ink.

### Named Rules (observed)
**The One Accent Rule.** Amber is the only saturated hue on the site; every other color is a navy or the cream. Observed across all 4 captured pages (palette usedAs distribution, \_brand-extraction.json).

## 3. Typography

**Display Font:** SF Pro Display (system stack fallback)
**Body Font:** SF Pro Text (system stack fallback)
**Label/Mono Font:** SF Mono (JetBrains Mono, ui-monospace fallback)

**Character:** Apple-system precision at editorial scale — enormous tight-tracked semibold display setting over calm 1.6 body, with a monospace counter-voice for anything structural. No webfonts load; the stacks are declared via `--display`, `--text`, `--mono` custom properties.

### Hierarchy (captured computed values, 1440px viewport)
- **Display / H1** (600, 112px home · 96px /aem · 64px docs, lh ≈ 0.96–1.04, ls −0.04em): one per page; carries an amber italic phrase.
- **Headline / H2** (600, 77.6px home · 56px /aem · 32px docs, lh ≈ 0.98): section leads.
- **Title / H3** (600, 22px home · 18px /aem, lh 1.2): card headings under mono eyebrows.
- **Body** (400, 15–18px, lh 1.55–1.6): prose; muted via dust/deep-ink alpha (72–78%).
- **Label** (SF Mono 500–700, 11–12px, +0.22–0.24em, uppercase): eyebrows, tags, nav pill.
- **Command display** (SF Mono 600, 40px): /docs/commands only — command names as headings.

### Named Rules (observed)
**The Ad-hoc Scale.** Captured sizes (112, 96, 77.6, 64, 56, 48, 40, 32, 22, 18 px) fit no single modular ratio (scaleAudit: ad-hoc). Per-page pairings are internally consistent; the cross-page scale is not.

## 4. Elevation

Essentially flat. Depth is conveyed by ground alternation (ink vs cream), surface steps (ink → soft-ink cards), 1px dust-alpha hairlines (rgba(245,240,230,.08–.15)), and the hero's radial glow — not by shadows. Only two shadows were observed anywhere: a large soft `rgba(0,0,0,0.45) 0 24px 60px` under the before/after screenshot frames, and `rgba(6,10,20,0.25) 0 6px 20px` under the sticky header.

### Shadow Vocabulary
- **frame** (`box-shadow: rgba(0,0,0,0.45) 0px 24px 60px 0px`): before/after image frames only.
- **sticky-nav** (`box-shadow: rgba(6,10,20,0.25) 0px 6px 20px 0px`): header on scroll.

### Named Rules (observed)
**The Hairline-Not-Shadow Rule.** Cards separate from their ground with a 1px rgba(245,240,230,.08) border and a lighter navy fill — never a drop shadow.

## 5. Components

### Buttons
- **Shape:** gently rounded (8px); the header nav CTA is a full pill (999px).
- **Primary:** amber (#e8b95e) fill, ink (#0a1024) text, 14px 24px padding, weight 600, no shadow ("Install in two minutes").
- **Nav pill:** amber fill, SF Mono 700 uppercase +1.54px tracking, 8px 14px ("Docs").
- **Ghost:** transparent with dust-alpha hairline, dust text ("View on GitHub" — the dual-CTA partner: primary-then-ghost).
- **Sidebar item (docs):** rgba(232,185,94,.12) fill, #ffd98a text, 8px radius.

### Cards / Containers
- **Corner Style:** 14px (large panels range 12–22px; small chips/code 4–8px).
- **Background:** soft ink (#141b3a) on ink sections; cream cards use hairline #1a1f38-alpha borders.
- **Shadow Strategy:** none — hairline border per the Hairline-Not-Shadow Rule.
- **Border:** 1px solid rgba(245,240,230,0.08).

### Inputs / Fields
None observed on any captured page (no forms).

### Navigation
- **Header:** sticky 60px, deep-ink ground; inline-SVG amber star mark + "Stardust" wordmark left; amber mono pill "Docs" + "GitHub ›" right. Identical on all 4 pages.
- **Docs sidebar:** fixed ink panel, numbered items ("Get started 01", "Commands 02"), amber-tint active state.
- **Footer:** centered mark + wordmark, one-line mission ("A design-phase toolkit by the AEM team at Adobe. Math, not mysticism."), link row "Docs · GitHub · Apache 2.0 License", mono sign-off "brief + seed = star · 2026".

### Signature Component: Amber-italic display heading
Every major heading spends its emphasis budget on one italic amber phrase ("Math, not *mysticism*.", "Every design tool promises *uniqueness*.", "…for the *AI-facing web*."), sometimes with the 60%-offset amber highlighter underline (`linear-gradient(transparent 60%, rgba(232,185,94,.32) 60%)`).

## 6. Do's and Don'ts

Descriptive: these record what the existing site does and what it visibly avoids (its own copy names the anti-patterns — see PRODUCT.md § Anti-references).

### Do:
- **Do** keep amber (#e8b95e) as the single accent and spend it on one emphasis per composition (nav pill + one CTA + one italic phrase).
- **Do** alternate full-bleed ink (#0a1024) and cream (#f5f0e6) grounds; docs surfaces invert to cream with an ink sidebar.
- **Do** mark structure with SF Mono uppercase eyebrows at +0.22–0.24em tracking.
- **Do** separate surfaces with 1px dust-alpha hairlines and a lighter navy step, not shadows.
- **Do** set heroes as pure type over the radial ink glow + starfield.

### Don't:
- **Don't** use "gradient blob hero, glassmorphism, generic icon trios" — the site's own named anti-toolbox (index).
- **Don't** deliver "the average" / shelf-component sameness — "sites got fast by getting boring" (aem).
- **Don't** introduce a second saturated hue; the observed system has exactly one.
- **Don't** add drop shadows to cards or buttons; only the before/after frames and sticky header carry shadows.
- **Don't** load webfonts — the captured system runs entirely on system stacks (SF Pro Display/Text, SF Mono).
