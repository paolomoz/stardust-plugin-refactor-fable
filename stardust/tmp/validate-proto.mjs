import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';

const file = process.argv[2];
const shot = process.argv[3];
const abs = path.resolve(file);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
const failed = [];
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', e => errors.push('pageerror: ' + e.message));
page.on('requestfailed', r => failed.push(r.url() + ' :: ' + (r.failure()?.errorText || '')));
await page.goto('file://' + abs, { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);

const checks = await page.evaluate(() => {
  const out = {};
  out.hOverflow = document.documentElement.scrollWidth > document.documentElement.clientWidth
    ? `scrollWidth ${document.documentElement.scrollWidth} > client ${document.documentElement.clientWidth}` : false;
  // :root token block
  const firstStyle = document.querySelector('style');
  out.rootBlock = !!firstStyle && /^\s*(\/\*[\s\S]*?\*\/\s*)*:root\s*\{/.test(firstStyle.textContent);
  // data-sections
  const want = ["header","hero","proof-before-after","why-structured-variation","how-it-works-pipeline","variant-receipt-strip","ai-facing","static-html-fact-panel","aem-band","cta-band","footer"];
  const have = [...document.querySelectorAll('[data-section]')].map(e => e.getAttribute('data-section'));
  out.missingSections = want.filter(w => !have.includes(w));
  out.sectionCount = have.length;
  // h1
  const h1s = document.querySelectorAll('h1');
  out.h1Count = h1s.length;
  out.h1Text = h1s[0] ? h1s[0].textContent.replace(/\s+/g,' ').trim() : null;
  out.h1HasSpace = out.h1Text ? out.h1Text.includes('Redesign the Web.') : false;
  // heading levels
  const hs = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h => +h.tagName[1]);
  let skip = false; let prev = 0;
  for (const l of hs) { if (l > prev + 1 && prev !== 0) skip = true; prev = Math.max(prev, l) && l; }
  // simpler: check any h3 not preceded by h2 etc.
  out.headingSeq = hs.join(',');
  // JSON-LD
  out.jsonLd = [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => {
    try { JSON.parse(s.textContent); return 'ok'; } catch (e) { return 'PARSE-FAIL: ' + e.message; }
  });
  // head meta
  out.title = document.title;
  out.metaDesc = !!document.querySelector('meta[name="description"]');
  out.canonical = document.querySelector('link[rel="canonical"]')?.href;
  out.ogType = document.querySelector('meta[property="og:type"]')?.content;
  out.ogTitle = !!document.querySelector('meta[property="og:title"]');
  out.ogImage = !!document.querySelector('meta[property="og:image"]');
  out.ogUrl = !!document.querySelector('meta[property="og:url"]');
  out.twitterCard = document.querySelector('meta[name="twitter:card"]')?.content;
  // skip-link first focusable
  const firstBody = document.body.firstElementChild;
  out.skipLinkFirst = firstBody?.classList.contains('skip-link') && firstBody?.getAttribute('href') === '#main';
  out.mainLandmark = !!document.querySelector('main#main');
  // provenance first child of head
  const headFirst = document.head.childNodes[0];
  let n = document.head.firstChild;
  while (n && n.nodeType === 3 && !n.textContent.trim()) n = n.nextSibling;
  out.provenanceFirst = n && n.nodeType === 8 && n.textContent.includes('stardust:provenance');
  // lazy LCP guard: images loading attr
  out.imgs = [...document.querySelectorAll('img')].map(i => ({ loading: i.loading, top: Math.round(i.getBoundingClientRect().top) }));
  return out;
});

// copy button test
const btn = page.locator('.copy-btn').first();
const before = await btn.textContent();
await btn.click();
await page.waitForTimeout(300);
const after = await btn.textContent();
checks.copyButton = { before, after, changed: before.trim() !== after.trim() };
await page.waitForTimeout(1600);
checks.copyButtonReverts = (await btn.textContent()).trim() === before.trim();

await page.screenshot({ path: shot, fullPage: true });
console.log(JSON.stringify({ errors, failed, checks }, null, 1));
await browser.close();
