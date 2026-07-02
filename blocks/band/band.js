/**
 * band — full-bleed accent band. Variant classes on the block set colour/shape:
 *   band green|crimson|orange  and  band stat | band cta.
 * Authoring: kicker (plain), the BIG line as a heading (h2/h3), attribution (plain),
 *   optional CTA (<strong><a>). Kicker before the heading is buffered (#76).
 */
export default async function decorate(block) {
  const nodes = [];
  block.querySelectorAll(':scope > div > div').forEach((cell) => {
    const kids = [...cell.children];
    if (kids.length) nodes.push(...kids);
    else if (cell.textContent.trim()) {
      const p = document.createElement('p'); p.textContent = cell.textContent.trim(); nodes.push(p);
    }
  });

  let main; let pendingKicker; const after = []; let cta;
  nodes.forEach((n) => {
    const isHeading = n.matches?.('h1,h2,h3,h4,h5,h6') || n.querySelector?.('h1,h2,h3,h4,h5,h6');
    const hasLink = n.matches?.('a') || n.querySelector?.('a');
    if (hasLink) cta = n;
    else if (isHeading && !main) main = n;
    else if (!main) pendingKicker = n;
    else after.push(n);
  });

  const wrap = document.createElement('div');
  wrap.className = 'band-wrap';
  if (pendingKicker) {
    const k = document.createElement('p'); k.className = 'kicker';
    k.append(...pendingKicker.childNodes); wrap.append(k);
  }
  if (main) {
    const el = document.createElement(block.classList.contains('stat') ? 'p' : 'h2');
    el.className = block.classList.contains('stat') ? 'stat-figure' : 'quote';
    const inner = main.matches?.('h1,h2,h3,h4,h5,h6') ? main : main.querySelector('h1,h2,h3,h4,h5,h6');
    el.append(...(inner || main).childNodes); wrap.append(el);
  }
  after.forEach((a) => {
    const p = document.createElement('p'); p.className = block.classList.contains('stat') ? 'stat-caption' : 'attribution';
    p.append(...a.childNodes); wrap.append(p);
  });
  if (cta) {
    const g = document.createElement('div'); g.className = 'actions btn-group';
    g.append(...(cta.matches?.('a') ? [cta] : cta.childNodes)); wrap.append(g);
  }
  block.replaceChildren(wrap);
  block.closest('.section')?.classList.add('band-section');
}
