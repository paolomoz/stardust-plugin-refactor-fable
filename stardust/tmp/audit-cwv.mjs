import { chromium } from 'playwright';

const targets = [
  { slug: 'home', url: 'https://stardust.style/' },
  { slug: 'aem', url: 'https://stardust.style/aem' },
];
const viewports = {
  mobile: { viewport: { width: 375, height: 667 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' },
  desktop: { viewport: { width: 1440, height: 900 } },
};
const RUNS = 3;

const median = (a) => { const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };

const browser = await chromium.launch();
const results = {};

for (const t of targets) {
  results[t.slug] = {};
  for (const [vpName, vpOpts] of Object.entries(viewports)) {
    const runs = [];
    for (let i = 0; i < RUNS; i++) {
      const ctx = await browser.newContext(vpOpts);
      const page = await ctx.newPage();
      await page.addInitScript(() => {
        window.__cwv = { lcp: 0, cls: 0, longtasks: [] };
        new PerformanceObserver((l) => {
          for (const e of l.getEntries()) window.__cwv.lcp = e.startTime;
        }).observe({ type: 'largest-contentful-paint', buffered: true });
        new PerformanceObserver((l) => {
          for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cwv.cls += e.value;
        }).observe({ type: 'layout-shift', buffered: true });
        new PerformanceObserver((l) => {
          for (const e of l.getEntries()) window.__cwv.longtasks.push({ start: e.startTime, dur: e.duration });
        }).observe({ type: 'longtask', buffered: true });
      });
      await page.goto(t.url, { waitUntil: 'load', timeout: 60000 });
      await page.waitForTimeout(4000); // settle: post-load JS, lazy content
      const m = await page.evaluate(() => {
        const fcp = performance.getEntriesByName('first-contentful-paint')[0]?.startTime ?? 0;
        const tbt = window.__cwv.longtasks
          .filter((lt) => lt.start >= fcp)
          .reduce((s, lt) => s + Math.max(0, lt.dur - 50), 0);
        const nav = performance.getEntriesByType('navigation')[0];
        return { lcp: window.__cwv.lcp, cls: window.__cwv.cls, tbt, fcp, ttfb: nav ? nav.responseStart : null };
      });
      runs.push(m);
      await ctx.close();
    }
    results[t.slug][vpName] = {
      lcp: Math.round(median(runs.map((r) => r.lcp))),
      cls: +median(runs.map((r) => r.cls)).toFixed(4),
      tbt: Math.round(median(runs.map((r) => r.tbt))),
      fcp: Math.round(median(runs.map((r) => r.fcp))),
      ttfb: Math.round(median(runs.map((r) => r.ttfb))),
      runs: runs.map((r) => ({ lcp: Math.round(r.lcp), cls: +r.cls.toFixed(4), tbt: Math.round(r.tbt) })),
      method: 'playwright-lab',
    };
    console.error(`${t.slug}/${vpName}: LCP ${results[t.slug][vpName].lcp}ms CLS ${results[t.slug][vpName].cls} TBT ${results[t.slug][vpName].tbt}ms`);
  }
}
await browser.close();
console.log(JSON.stringify(results, null, 2));
