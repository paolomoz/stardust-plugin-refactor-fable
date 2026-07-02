import { chromium } from 'playwright';

const pages = [
  { slug: 'index', url: 'https://stardust.style/' },
  { slug: 'aem', url: 'https://stardust.style/aem' },
  { slug: 'docs', url: 'https://stardust.style/docs/' },
  { slug: 'docs-commands', url: 'https://stardust.style/docs/commands/' },
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } });
const out = {};

for (const p of pages) {
  const page = await ctx.newPage();
  await page.goto(p.url, { waitUntil: 'networkidle', timeout: 45000 });
  await page.waitForTimeout(1500);
  out[p.slug] = await page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const meta = (n) => q(`meta[name="${n}"]`)?.content ?? null;
    const og = (n) => q(`meta[property="og:${n}"]`)?.content ?? null;
    const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h => ({
      level: +h.tagName[1],
      text: h.textContent.trim().replace(/\s+/g, ' ').slice(0, 80),
    }));
    const skips = [];
    let prev = null;
    for (const h of headings) {
      if (prev !== null && h.level > prev + 1) skips.push(`h${prev}->h${h.level} at "${h.text}"`);
      prev = h.level;
    }
    const imgs = [...document.querySelectorAll('img')].map(i => ({
      src: (i.currentSrc || i.src || '').split('/').pop().slice(0, 60),
      alt: i.getAttribute('alt'),
    }));
    const jsonld = [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => {
      try { const j = JSON.parse(s.textContent); return j['@type'] || (Array.isArray(j) ? j.map(x => x['@type']) : 'unknown'); }
      catch { return 'PARSE_ERROR'; }
    });
    return {
      title: document.title,
      metaDescription: meta('description'),
      metaRobots: meta('robots'),
      canonical: q('link[rel="canonical"]')?.href ?? null,
      og: { type: og('type'), title: og('title'), description: og('description'), image: og('image'), url: og('url') },
      twitterCard: meta('twitter:card') ?? q('meta[name="twitter:card"]')?.content ?? null,
      viewport: meta('viewport'),
      htmlLang: document.documentElement.lang || null,
      h1Count: headings.filter(h => h.level === 1).length,
      headings,
      headingSkips: skips,
      landmarks: {
        main: document.querySelectorAll('main').length,
        nav: document.querySelectorAll('nav, [role="navigation"]').length,
        footer: document.querySelectorAll('footer, [role="contentinfo"]').length,
        header: document.querySelectorAll('header, [role="banner"]').length,
      },
      jsonld,
      imgs,
      imgsMissingAlt: imgs.filter(i => i.alt === null || i.alt === '').length,
      imgsTotal: imgs.length,
      internalLinksNoSlashDocs: [...document.querySelectorAll('a[href]')]
        .map(a => a.getAttribute('href'))
        .filter(h => /^\/(docs|aem)(\/[a-z-]+)*\/?$/.test(h || '')),
    };
  });
  await page.close();
}
await browser.close();
console.log(JSON.stringify(out, null, 2));
