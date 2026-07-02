/**
 * hero — full-bleed image + scrim + h1 + primary CTA (+ optional eyebrow/lede).
 * Rows (flexible; queried, not indexed): a picture/img cell, an h1 cell,
 * an optional eyebrow (p.eyebrow or first short line), a lede p, a CTA p.
 */
export default function decorate(block) {
  const pic = block.querySelector('picture, img');
  const h1 = block.querySelector('h1, h2');
  const ps = [...block.querySelectorAll('p')];
  const ctaP = ps.find((p) => p.querySelector('a'));
  const textPs = ps.filter((p) => p !== ctaP && p.textContent.trim());
  const eyebrow = textPs.find((p) => p.classList.contains('eyebrow'));
  const lede = textPs.find((p) => p !== eyebrow);

  const wrap = document.createElement('div');
  wrap.className = 'hero-wrap';
  if (eyebrow) { eyebrow.classList.add('hero-eyebrow'); wrap.append(eyebrow); }
  if (h1) { const h = document.createElement('h1'); h.append(...h1.childNodes); wrap.append(h); }
  if (lede) { lede.classList.add('hero-lede'); wrap.append(lede); }
  if (ctaP && ctaP.querySelector('a')) {
    const actions = document.createElement('div'); actions.className = 'actions';
    [...ctaP.childNodes].forEach((n) => actions.append(n.cloneNode(true)));
    wrap.append(actions);
  }
  const bg = document.createElement('div'); bg.className = 'hero-bg';
  if (pic) bg.append(pic);
  block.replaceChildren(bg, wrap);
}
