#!/usr/bin/env python3
"""Derive index-cinematic.html from index-proposed.html (live-systems register)."""
import re, sys

SRC = "/Users/paolo/stardust/tests/fable5-e2e/stardust-style/stardust/prototypes/index-proposed.html"
DST = "/Users/paolo/stardust/tests/fable5-e2e/stardust-style/stardust/prototypes/index-cinematic.html"

html = open(SRC).read()
def sub1(old, new, s, n=1, label=""):
    count = s.count(old)
    assert count >= n, f"MISSING ({count}<{n}): {label or old[:60]}"
    return s.replace(old, new, n)

# 1. Provenance: motion block + note this is the cinematic sibling
html = sub1("""  unsourcedContent: []
-->""", """  motion:
    register:          live-systems
    registerSource:    direct   # DESIGN.json.extensions.motion.register
    runtimeVersion:    v1       # motion-runtime.md canonical script, embedded verbatim
    animConfig:        "cards.slide 36 / cards.stagger 0.10 / parallax.translate 0 (live-systems token defaults, motion-runtime.md per-register tuning)"
    attributesEmitted:
      - "data-anim (section heads, cta band)"
      - "data-tile-anim (receipt-strip stubs + seed stub, ai-facing cards)"
      - ".live-sweep (receipt strip refresh sweep)"
      - "hero h1 space-safe word reveal (html.js-anim gate; spaces live outside .word spans; anchor id from unsplit text)"
    countupsEmitted:   none  # page has no numeric stats
    fallbacks:
      - "no-JS: <noscript> forces all motion-hidden states visible"
      - "prefers-reduced-motion: full static (CSS !important overrides + runtime neutralization)"
      - "no scroll-jack: Lenis smooth scroll only, no hijacked wheel semantics"
  unsourcedContent: []
-->""", html, label="provenance motion block")

# writtenBy note
html = sub1("writtenBy:        stardust:prototype (via impeccable:craft)",
            "writtenBy:        stardust:prototype --cinematic (via impeccable:craft, Phase 2.4)", html)

# 2. Head: js-anim gate script + lenis css, before <style>
html = sub1("<style>\n/* ── :root token contract",
            """<script>document.documentElement.classList.add('js-anim');</script>
<link rel="stylesheet" href="lenis.min.css">
<style>
/* ── :root token contract""", html, label="head inserts")

# 3. :root motion tokens
html = sub1("""  --pad: clamp(20px, 4vw, 64px);
  --nav-height: 60px;
  --z-sticky: 10;
}""", """  --pad: clamp(20px, 4vw, 64px);
  --nav-height: 60px;
  --z-sticky: 10;

  /* Motion (cinematic only) — live-systems register token defaults */
  --ease-out-cubic: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-out-quart: cubic-bezier(0.42, 0, 0, 1);
  --ease-expo:      cubic-bezier(0.16, 1, 0.3, 1);
  --enter-duration: 600ms;
  --enter-stagger:  100ms;
  --parallax-translate: 0;          /* live-systems: no hero parallax */
  --parallax-fade:      0.35;
  --parallax-progress:  0;
}""", html, label=":root motion tokens")

# 4. Motion CSS before the reduced-motion block at end of <style>
html = sub1("""@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>""", """/* ── Motion: live-systems register (Phase 2.4) ────────────────────── */
/* Hero h1 space-safe word reveal — gated on html.js-anim (inline head
   script); spaces live OUTSIDE the .word spans so textContent keeps them. */
[data-hero-reveal] .word { display: inline-block; }
html.js-anim [data-hero-reveal] .word {
  opacity: 0;
  transform: translateY(0.55em);
  filter: blur(6px);
  animation: wordUp var(--enter-duration) var(--ease-out-cubic) forwards;
  animation-delay: var(--wd, 0ms);
}
@keyframes wordUp {
  to { opacity: 1; transform: translateY(0); filter: blur(0); }
}
html.js-anim .hero-deck,
html.js-anim .hero-lede,
html.js-anim .hero-ctas,
html.js-anim .hero-chip-row {
  opacity: 0;
  transform: translateY(14px);
  animation: heroRise var(--enter-duration) var(--ease-out-cubic) forwards;
}
html.js-anim .hero-deck    { animation-delay: 320ms; }
html.js-anim .hero-lede    { animation-delay: 420ms; }
html.js-anim .hero-ctas    { animation-delay: 520ms; }
html.js-anim .hero-chip-row{ animation-delay: 620ms; }
@keyframes heroRise {
  to { opacity: 1; transform: translateY(0); }
}

/* Header scrolled state (runtime toggles .scrolled on #nav) */
header[data-section="header"].scrolled { box-shadow: rgba(6,10,20,0.5) 0 6px 24px 0; }

/* Receipt strip periodic refresh sweep (.live-sweep / .sweep) */
.live-sweep { position: relative; overflow: hidden; }
.live-sweep::after {
  content: '';
  position: absolute; inset: 0;
  transform: translateX(-101%);
  background: linear-gradient(105deg, transparent 0%, rgba(232,185,94,0.06) 42%, rgba(232,185,94,0.13) 50%, transparent 100%);
  pointer-events: none;
}
.live-sweep.sweep::after {
  transition: transform 1700ms var(--ease-expo);
  transform: translateX(101%);
}

/* Live pulse dot on the seed stub */
.pulse-dot {
  display: inline-block; width: 8px; height: 8px; margin-right: 10px;
  border-radius: var(--radius-pill); background: var(--amber); vertical-align: 1px;
}
html.js-anim .pulse-dot { animation: pulseDot 1.6s ease-in-out infinite; }
@keyframes pulseDot {
  0%, 100% { box-shadow: 0 0 0 0 rgba(232,185,94,0.35); }
  50%      { box-shadow: 0 0 0 8px rgba(232,185,94,0); }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  /* Full static fallback: neutralize every motion-hidden state. */
  html.js-anim [data-hero-reveal] .word,
  html.js-anim .hero-deck, html.js-anim .hero-lede,
  html.js-anim .hero-ctas, html.js-anim .hero-chip-row {
    opacity: 1 !important; transform: none !important; filter: none !important; animation: none !important;
  }
  [data-anim], [data-tile-anim] { opacity: 1 !important; transform: none !important; }
  .live-sweep::after { display: none !important; }
  .pulse-dot { animation: none !important; }
}
</style>
<noscript>
<style>
[data-anim], [data-tile-anim], [data-split] span {
  opacity: 1 !important;
  transform: none !important;
  filter: none !important;
  clip-path: none !important;
}
.word { clip-path: none !important; transform: none !important; opacity: 1 !important; }
[data-parallax] { transform: none !important; }
.hero-marquee { transform: none !important; }
.post-hero { transform: none !important; }
</style>
</noscript>""", html, label="motion CSS + noscript")

# 5. Header gets id="nav"
html = sub1('<header data-section="header" data-intent="navigate" data-layout="sticky-bar">',
            '<header id="nav" data-section="header" data-intent="navigate" data-layout="sticky-bar">', html)

# 6. Hero h1: space-safe word spans (spaces outside spans; anchor id from unsplit text)
html = sub1('<h1 id="redesign-the-web">Redesign <em><span class="ai ai--hl">the Web.</span></em></h1>',
            '<h1 id="redesign-the-web" data-hero-reveal><span class="word" style="--wd:0ms">Redesign</span> <em><span class="ai ai--hl"><span class="word" style="--wd:120ms">the</span> <span class="word" style="--wd:240ms">Web.</span></span></em></h1>',
            html, label="hero h1 word spans")

# 7. data-anim on section heads + cta band inner
html = sub1('<div class="section-head">', '<div class="section-head" data-anim>', html,
            n=html.count('<div class="section-head">'), label="section heads")
html = sub1('<div class="container cta-inner">', '<div class="container cta-inner" data-anim>', html)

# 8. data-tile-anim on receipt stubs, seed stub, ai-facing cards
html = sub1('<div class="receipt-stub">', '<div class="receipt-stub" data-tile-anim>', html,
            n=3, label="receipt stubs")
html = sub1('<div class="receipt-seed">', '<div class="receipt-seed" data-tile-anim>', html)
html = sub1('<article class="card">', '<article class="card" data-tile-anim>', html, n=3, label="cards")

# 9. .live-sweep on the receipt strip
html = sub1('<div class="receipt">', '<div class="receipt live-sweep">', html)

# 10. Pulse dot in the seed stub label
html = sub1('<span class="stub-label">Seed</span>',
            '<span class="stub-label"><span class="pulse-dot" aria-hidden="true"></span>Seed</span>', html)

# 11. Lenis + canonical runtime before </body>
runtime = """
<script src="lenis.min.js"></script>
<script>
/* Canonical motion runtime — motion-runtime.md v1, embedded verbatim.
   animConfig tuned to the live-systems register token defaults. */
(function () {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Lenis bootstrap ────────────────────────────────────────────
  const lenis = new Lenis({ lerp: 0.1, smoothWheel: !prefersReducedMotion });
  window.__lenis = lenis;
  (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(performance.now());

  // ── Nav scrolled state ─────────────────────────────────────────
  const nav = document.getElementById('nav');
  if (nav) lenis.on('scroll', ({ scroll }) => {
    nav.classList.toggle('scrolled', scroll > 40);
  });

  // ── Helpers ────────────────────────────────────────────────────
  const clamp = (v, lo, hi) => v < lo ? lo : v > hi ? hi : v;
  const easeOut3 = t => 1 - Math.pow(1 - t, 3);
  const getDocTop = el => el.getBoundingClientRect().top + (window.__lenis ? window.__lenis.scroll : window.scrollY);

  // ── Register-specific configuration ────────────────────────────
  // live-systems register: no hero parallax; slide 36; stagger 0.10.
  const animConfig = {
    parallax:      { translate: 0, fade: 0.35, rangeStart: 10, range: 60 },
    plansParallax: { translate: 0, rangeStart: 0, range: 80 },
    cards:         { trigger: 0.85, range: 0.32, slide: 36, stagger: 0.10 },
    wordmark:      { range: 0.6, clip: 80 },
  };

  // ── data-split: pre-process letter spans ───────────────────────
  document.querySelectorAll('[data-split]').forEach((el) => {
    const text = el.textContent;
    el.textContent = '';
    text.split('').forEach((ch) => {
      const s = document.createElement('span');
      s.textContent = ch === ' ' ? ' ' : ch;
      s.style.opacity = '0';
      s.style.transform = 'translateY(60%)';
      s.style.filter = 'blur(8px)';
      el.appendChild(s);
    });
  });

  // ── Register lists ─────────────────────────────────────────────
  const animList = [];     // [data-anim] / [data-tile-anim]
  const headWords = [];    // .display-head .word — clip-path reveals
  const splitLetters = []; // [data-split] letters
  let wordmarkEl = null, wordmarkTop = 0;

  function measure() {
    const postHeroEl = document.querySelector('.post-hero');
    const savedTransform = postHeroEl ? postHeroEl.style.transform : '';
    if (postHeroEl) postHeroEl.style.transform = '';

    animList.forEach(({ el }) => { el.style.opacity = el.style.transform = el.style.willChange = ''; });
    animList.length = 0;
    headWords.length = 0;
    splitLetters.length = 0;

    document.querySelectorAll('[data-anim], [data-tile-anim]').forEach((el) => {
      const parent = el.closest('.band, .ops-band, .alerts, .access, .news, .ops-section > div, .ops-tiles, .ops-alerts, .ops-mini, section');
      let stagger = 0;
      if (parent) {
        const peers = parent.querySelectorAll('[data-anim], [data-tile-anim]');
        const idx = Array.prototype.indexOf.call(peers, el);
        stagger = (idx % 8) * animConfig.cards.stagger;
      }
      el.style.opacity = '0';
      el.style.transform = el.hasAttribute('data-tile-anim')
        ? `translateY(28px) rotateX(8deg)`
        : `translateY(${animConfig.cards.slide}px)`;
      el.style.willChange = 'opacity, transform';
      animList.push({ el, triggerTop: getDocTop(el), staggerDelay: stagger });
    });

    // Display-head word clip-path reveals (kinetic-display register)
    document.querySelectorAll('.display-head, .terminals-band__head h2').forEach((head) => {
      const words = head.querySelectorAll('.word');
      const top = getDocTop(head);
      words.forEach((w, i) => {
        w.style.clipPath = 'inset(0 100% 0 0)';
        w.style.transform = 'translateY(110%)';
        w.style.willChange = 'clip-path, transform';
        headWords.push({ el: w, triggerTop: top, staggerDelay: i * 0.15 });
      });
    });

    // [data-split] letter list
    document.querySelectorAll('[data-split]').forEach((el) => {
      const top = getDocTop(el);
      el.querySelectorAll('span').forEach((s, i) => {
        splitLetters.push({ el: s, triggerTop: top, staggerDelay: i * 0.05 });
      });
    });

    // Footer wordmark wipe-up
    wordmarkEl = document.querySelector('.site-footer__wordmark');
    if (wordmarkEl) {
      wordmarkTop = getDocTop(wordmarkEl);
      wordmarkEl.style.clipPath = `inset(${animConfig.wordmark.clip}% 0 0 0)`;
      wordmarkEl.style.willChange = 'clip-path';
    }

    if (postHeroEl) postHeroEl.style.transform = savedTransform;
  }

  // ── [data-countup]: IO-triggered numeric tween ─────────────────
  const countSeen = new WeakSet();
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || countSeen.has(entry.target)) return;
      countSeen.add(entry.target);
      const target = +entry.target.getAttribute('data-countup');
      const duration = target > 20 ? 1400 : target > 5 ? 900 : 600;
      const start = performance.now();
      (function step(now) {
        const t = clamp((now - start) / duration, 0, 1);
        entry.target.textContent = String(Math.round(easeOut3(t) * target));
        if (t < 1) requestAnimationFrame(step);
      })(performance.now());
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('[data-countup]').forEach((el) => countObserver.observe(el));

  // ── [data-flip]: IO-triggered split-flap digit randomization ───
  const flipObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || entry.target.dataset.flipped === '1') return;
      entry.target.dataset.flipped = '1';
      const target = +entry.target.getAttribute('data-flip');
      const total = 8 + Math.floor(Math.random() * 4);
      let i = 0;
      (function flap() {
        if (i >= total) { entry.target.textContent = String(target); return; }
        entry.target.textContent = String(Math.floor(Math.random() * 10));
        i++;
        setTimeout(flap, 60);
      })();
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-flip]').forEach((el) => flipObserver.observe(el));

  // ── [data-fill]: IO-triggered bar fill ─────────────────────────
  const fillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || entry.target.dataset.filled === '1') return;
      entry.target.dataset.filled = '1';
      const pct = +entry.target.getAttribute('data-fill');
      setTimeout(() => { entry.target.style.width = pct + '%'; }, 120);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('[data-fill]').forEach((el) => fillObserver.observe(el));

  // ── Live refresh sweep (live-systems register) ─────────────────
  const sweepEl = document.querySelector('.live-sweep');
  if (sweepEl && !prefersReducedMotion) {
    setInterval(() => {
      sweepEl.classList.add('sweep');
      setTimeout(() => sweepEl.classList.remove('sweep'), 1700);
    }, 5400);
  }

  // ── rAF loop: scroll-progress reveals + parallax ───────────────
  const heroMarqueeEl = document.querySelector('.hero-marquee');
  const postHeroEl = document.querySelector('.post-hero');
  let _lastMB = null;

  (function tick() {
    if (prefersReducedMotion) { requestAnimationFrame(tick); return; }
    const sY = window.__lenis ? window.__lenis.scroll : window.scrollY;
    const vh = window.innerHeight;
    const isDesktop = window.innerWidth > 767;

    // Hero parallax
    if (heroMarqueeEl) {
      const pp = animConfig.parallax;
      if (isDesktop) {
        const rs = pp.rangeStart / 100 * vh;
        const re = pp.range / 100 * vh;
        const p = easeOut3(clamp((sY - rs) / (re - rs), 0, 1));
        heroMarqueeEl.style.transform = `translateY(${p * -pp.translate}vh)`;
        document.documentElement.style.setProperty('--parallax-progress', p);
      } else {
        heroMarqueeEl.style.transform = '';
        document.documentElement.style.setProperty('--parallax-progress', 0);
      }
    }

    // Post-hero rises faster
    let postHeroOffsetPx = 0;
    if (postHeroEl) {
      const pp2 = animConfig.plansParallax;
      if (isDesktop) {
        const rs = pp2.rangeStart / 100 * vh;
        const re = pp2.range / 100 * vh;
        const p = easeOut3(clamp((sY - rs) / (re - rs), 0, 1));
        postHeroOffsetPx = p * -pp2.translate / 100 * vh;
        postHeroEl.style.transform = `translateY(${p * -pp2.translate}vh)`;
        const newMB = `${p * -pp2.translate}vh`;
        if (newMB !== _lastMB) { postHeroEl.style.marginBottom = newMB; _lastMB = newMB; }
      } else {
        postHeroEl.style.transform = '';
        if (_lastMB !== '') { postHeroEl.style.marginBottom = ''; _lastMB = ''; }
      }
    }

    // Scroll-progress entrances
    for (let i = 0; i < animList.length; i++) {
      const item = animList[i];
      const { trigger, range, slide } = animConfig.cards;
      const raw = (sY + vh * trigger - (item.triggerTop + postHeroOffsetPx)) / (vh * range);
      const p = easeOut3(clamp(raw - item.staggerDelay, 0, 1));
      item.el.style.opacity = String(p);
      if (item.el.hasAttribute('data-tile-anim')) {
        item.el.style.transform = `translateY(${(1 - p) * 28}px) rotateX(${(1 - p) * 8}deg)`;
      } else {
        item.el.style.transform = `translateY(${(1 - p) * slide}px)`;
      }
    }

    // Display-head clip-path word reveals
    for (let i = 0; i < headWords.length; i++) {
      const item = headWords[i];
      const raw = (sY + vh * 0.85 - (item.triggerTop + postHeroOffsetPx)) / (vh * 0.30);
      const p = easeOut3(clamp(raw - item.staggerDelay, 0, 1));
      item.el.style.clipPath = `inset(0 ${(1 - p) * 100}% 0 0)`;
      item.el.style.transform = `translateY(${(1 - p) * 110}%)`;
    }

    // [data-split] letter reveals
    for (let i = 0; i < splitLetters.length; i++) {
      const item = splitLetters[i];
      const raw = (sY + vh * 0.85 - (item.triggerTop + postHeroOffsetPx)) / (vh * 0.35);
      const p = easeOut3(clamp(raw - item.staggerDelay, 0, 1));
      item.el.style.opacity = String(p);
      item.el.style.transform = `translateY(${(1 - p) * 60}%)`;
      item.el.style.filter = `blur(${(1 - p) * 8}px)`;
    }

    // Footer wordmark wipe-up
    if (wordmarkEl) {
      const adjustedTop = wordmarkTop + postHeroOffsetPx;
      const wP = easeOut3(clamp((sY + vh - adjustedTop) / (vh * animConfig.wordmark.range), 0, 1));
      wordmarkEl.style.clipPath = `inset(${(1 - wP) * animConfig.wordmark.clip}% 0 0 0)`;
    }

    requestAnimationFrame(tick);
  })();

  measure();
  window.addEventListener('load',   () => requestAnimationFrame(measure), { once: true });
  window.addEventListener('resize', measure, { passive: true });

  // ── Reduced-motion: force final states ─────────────────────────
  if (prefersReducedMotion) {
    document.querySelectorAll('[data-anim], [data-tile-anim], [data-split] span').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.filter = 'none';
      el.style.clipPath = 'none';
    });
    document.querySelectorAll('.word').forEach((el) => {
      el.style.clipPath = 'none';
      el.style.transform = 'none';
    });
    document.querySelectorAll('[data-countup]').forEach((el) => { el.textContent = el.getAttribute('data-countup'); });
    document.querySelectorAll('[data-flip]').forEach((el) => { el.textContent = el.getAttribute('data-flip'); });
    document.querySelectorAll('[data-fill]').forEach((el) => { el.style.width = el.getAttribute('data-fill') + '%'; });
  }
})();
</script>
</body>"""
html = sub1("</body>", runtime, html, label="runtime insert")

open(DST, "w").write(html)
print("written", DST, len(html), "bytes")
