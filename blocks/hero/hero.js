/**
 * hero — full-bleed image + scrim + h1 + primary CTA (+ optional eyebrow/lede).
 * Queried, not indexed. The CTA is found by locating ANY link in the block and
 * cloning its cell (EDS may deliver <strong><a> WITHOUT a <p> wrapper, so a
 * <p>-only read drops it — #79/#42).
 */
export default function decorate(block) {
  const pic = block.querySelector('picture, img');
  const h1 = block.querySelector('h1, h2');
  const link = block.querySelector('a');
  const ctaCell = link ? link.closest('div') : null;
  // text cells that are neither the heading cell nor the CTA cell
  const cells = [...block.querySelectorAll(':scope > div > div')];
  const textCells = cells.filter((c) => !c.querySelector('a, h1, h2, picture, img') && c.textContent.trim());
  const eyebrow = textCells.find((c) => c.querySelector('strong'));
  const lede = textCells.find((c) => c !== eyebrow);

  const wrap = document.createElement('div');
  wrap.className = 'hero-wrap';
  if (eyebrow) { const e = document.createElement('p'); e.className = 'hero-eyebrow'; e.append(...eyebrow.childNodes); wrap.append(e); }
  if (h1) { const h = document.createElement('h1'); h.append(...h1.childNodes); wrap.append(h); }
  if (lede) { const p = document.createElement('p'); p.className = 'hero-lede'; p.append(...lede.childNodes); wrap.append(p); }
  if (link && ctaCell) {
    const actions = document.createElement('div'); actions.className = 'actions';
    [...ctaCell.childNodes].forEach((n) => actions.append(n.cloneNode(true)));
    wrap.append(actions);
  }
  const bg = document.createElement('div'); bg.className = 'hero-bg';
  if (pic) bg.append(pic);
  block.replaceChildren(bg, wrap);
}
