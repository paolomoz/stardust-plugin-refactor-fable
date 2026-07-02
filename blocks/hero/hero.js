/**
 * hero — page lead. Authoring rows (each its own row/cell):
 *   eyebrow · <h1> (may contain <del>) · lede · CTAs (<strong><a>/<em><a>) · install hint
 * Robust to the DA-flattened single-cell shape via a cell-level collector.
 */
function collectNodes(block) {
  const out = [];
  block.querySelectorAll(':scope > div > div').forEach((cell) => {
    const kids = [...cell.children];
    if (kids.length) out.push(...kids);
    else if (cell.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = cell.textContent.trim();
      out.push(p);
    }
  });
  return out.length ? out : [...block.children];
}

export default async function decorate(block) {
  const nodes = collectNodes(block);
  if (!nodes.length) return;

  let heading;
  const ctaNodes = [];
  const textNodes = [];
  nodes.forEach((n) => {
    const isHeading = n.matches?.('h1,h2,h3,h4,h5,h6') || n.querySelector?.('h1,h2,h3,h4,h5,h6');
    const hasLink = n.matches?.('a') || n.querySelector?.('a');
    if (isHeading && !heading) heading = n;
    else if (hasLink) ctaNodes.push(n);
    else textNodes.push(n);
  });

  const wrap = document.createElement('div');
  wrap.className = 'hero-wrap';

  const [eyebrowN, ledeN, hintN] = textNodes;
  if (eyebrowN) {
    const eb = document.createElement('p');
    eb.className = 'eyebrow';
    eb.innerHTML = `<span class="prompt">$</span> ${eyebrowN.textContent.trim()} <span class="cursor" aria-hidden="true"></span>`;
    wrap.append(eb);
  }
  if (heading) {
    const h1 = document.createElement('h1');
    const inner = heading.matches?.('h1,h2,h3,h4,h5,h6') ? heading : heading.querySelector('h1,h2,h3,h4,h5,h6');
    h1.append(...(inner || heading).childNodes);
    wrap.append(h1);
  }
  if (ledeN) {
    const p = document.createElement('p');
    p.className = 'lede';
    p.append(...ledeN.childNodes);
    wrap.append(p);
  }
  if (ctaNodes.length) {
    const actions = document.createElement('div');
    actions.className = 'actions btn-group';
    ctaNodes.forEach((c) => actions.append(...(c.matches?.('a') ? [c] : c.childNodes)));
    wrap.append(actions);
  }
  if (hintN && hintN !== ledeN) {
    const p = document.createElement('p');
    p.className = 'install-hint';
    p.append(...hintN.childNodes);
    wrap.append(p);
  }

  block.replaceChildren(wrap);
  block.closest('.section')?.classList.add('hero-section');
}
