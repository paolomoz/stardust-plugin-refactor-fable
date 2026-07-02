export default function decorate(block) {
  const cell = block.querySelector(':scope > div > div');
  if (!cell) return;
  const pic = cell.querySelector('picture');
  const media = document.createElement('div');
  media.className = 'hero__media';
  if (pic) { const p = pic.closest('p'); media.append(pic); if (p && !p.textContent.trim()) p.remove(); }
  const scrim = document.createElement('div');
  scrim.className = 'hero__scrim';
  const inner = document.createElement('div');
  inner.className = 'trh-wrap hero__inner';
  [...cell.children].forEach((c) => { if (c.tagName !== 'H2') inner.append(c); });
  cell.replaceChildren(media, scrim, inner);
}
