import { chromium } from 'playwright';
import path from 'path';

const abs = path.resolve('stardust/prototypes/index-cinematic.html');
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [], failed = [];
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', e => errors.push('pageerror: ' + e.message));
page.on('requestfailed', r => failed.push(r.url()));
await page.goto('file://' + abs, { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);

const checks = await page.evaluate(() => {
  const out = {};
  out.lenisLoaded = typeof window.Lenis === 'function' && !!window.__lenis;
  out.jsAnimClass = document.documentElement.classList.contains('js-anim');
  out.hOverflow = document.documentElement.scrollWidth > document.documentElement.clientWidth;
  const h1 = document.querySelector('h1');
  out.h1Text = h1.textContent.replace(/\s+/g, ' ').trim();
  out.h1HasSpace = out.h1Text.includes('Redesign the Web.');
  out.h1WordsVisible = [...h1.querySelectorAll('.word')].every(w => parseFloat(getComputedStyle(w).opacity) > 0.9);
  out.dataAnim = document.querySelectorAll('[data-anim]').length;
  out.dataTileAnim = document.querySelectorAll('[data-tile-anim]').length;
  out.dataCountup = document.querySelectorAll('[data-countup]').length;
  out.liveSweep = !!document.querySelector('.live-sweep');
  out.noscript = !!document.querySelector('noscript');
  out.rootBlock = /^\s*(\/\*[\s\S]*?\*\/\s*)*:root\s*\{/.test(document.querySelector('style').textContent);
  out.motionTokens = getComputedStyle(document.documentElement).getPropertyValue('--ease-out-cubic').trim() !== '';
  const want = ["header","hero","proof-before-after","why-structured-variation","how-it-works-pipeline","variant-receipt-strip","ai-facing","static-html-fact-panel","aem-band","cta-band","footer"];
  const have = [...document.querySelectorAll('[data-section]')].map(e => e.getAttribute('data-section'));
  out.missingSections = want.filter(w => !have.includes(w));
  out.h1Count = document.querySelectorAll('h1').length;
  out.jsonLd = [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => { try { JSON.parse(s.textContent); return 'ok'; } catch (e) { return 'FAIL'; } });
  out.title = document.title;
  out.canonical = document.querySelector('link[rel="canonical"]')?.href;
  out.ogType = document.querySelector('meta[property="og:type"]')?.content;
  out.skipLinkFirst = document.body.firstElementChild?.classList.contains('skip-link');
  let n = document.head.firstChild;
  while (n && n.nodeType === 3 && !n.textContent.trim()) n = n.nextSibling;
  out.provenanceFirst = n && n.nodeType === 8 && n.textContent.includes('stardust:provenance');
  out.provenanceMotion = n && n.textContent.includes('register:          live-systems');
  return out;
});

// hidden-at-rest check: below-fold sections hidden pre-scroll (expected), then scroll to bottom => all visible
checks.receiptHiddenAtTop = await page.evaluate(() => {
  const el = document.querySelector('.receipt-stub');
  return parseFloat(getComputedStyle(el).opacity) < 0.1;
});
await page.evaluate(() => window.__lenis.scrollTo(document.body.scrollHeight, { immediate: true }));
await page.waitForTimeout(900);
// nav scrolled state
checks.navScrolled = await page.evaluate(() => document.getElementById('nav').classList.contains('scrolled'));
checks.allRevealedAtBottom = await page.evaluate(() =>
  [...document.querySelectorAll('[data-anim],[data-tile-anim]')].every(el => parseFloat(getComputedStyle(el).opacity) > 0.95)
);

// copy button
const btn = page.locator('.copy-btn').first();
await page.evaluate(() => window.__lenis.scrollTo(0, { immediate: true }));
await page.waitForTimeout(400);
const before = await btn.textContent();
await btn.click();
await page.waitForTimeout(300);
checks.copyButtonChanged = (await btn.textContent()).trim() === 'copied';

// screenshot at fully revealed state
await page.evaluate(() => window.__lenis.scrollTo(document.body.scrollHeight, { immediate: true }));
await page.waitForTimeout(900);
await page.screenshot({ path: 'stardust/validation/index-cinematic/desktop.png', fullPage: true });

// reduced-motion pass
const page2 = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const errors2 = [];
page2.on('pageerror', e => errors2.push(e.message));
await page2.goto('file://' + abs, { waitUntil: 'networkidle' });
await page2.waitForTimeout(800);
checks.reducedMotionAllVisible = await page2.evaluate(() =>
  [...document.querySelectorAll('[data-anim],[data-tile-anim],[data-hero-reveal] .word')].every(el => parseFloat(getComputedStyle(el).opacity) > 0.95)
);
checks.reducedMotionErrors = errors2;

// no-JS pass
const page3 = await browser.newPage({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
await page3.goto('file://' + abs);
await page3.waitForTimeout(500);
checks.noJsAllVisible = await page3.evaluate(() =>
  [...document.querySelectorAll('[data-anim],[data-tile-anim],[data-hero-reveal] .word')].every(el => parseFloat(getComputedStyle(el).opacity) > 0.95)
);

console.log(JSON.stringify({ errors, failed, checks }, null, 1));
await browser.close();
