/**
 * split — 50/50 media + copy band. Cells: picture, eyebrow, heading, body, cta.
 * Variant: split.reverse (image right). split.surface (grey ground).
 */
function media(c){return c&&(c.matches?.('picture,img')?c:c.querySelector('picture,img'));}
export default function decorate(block) {
  const cells = [...block.querySelectorAll(':scope > div > div')];
  let pic, eyebrow, heading, cta; const bodies=[];
  cells.forEach((cell) => {
    const m = media(cell); const h = cell.querySelector('h2,h3'); const link = cell.querySelector('a');
    if (m && !pic) { pic = m; return; }
    if (h && !heading) { heading = h; return; }
    if (link) { cta = link; return; }
    const strong = cell.querySelector('strong'); const txt = cell.textContent.trim(); if(!txt) return;
    if ((strong || cell.classList.contains('eyebrow')) && !eyebrow) eyebrow = cell; else bodies.push(cell);
  });
  const mediaEl = document.createElement('div'); mediaEl.className = 'split-media'; if (pic) mediaEl.append(pic);
  const copy = document.createElement('div'); copy.className = 'split-copy';
  if (eyebrow) { const e = document.createElement('p'); e.className = 'split-eyebrow'; e.append(...eyebrow.childNodes); copy.append(e); }
  if (heading) { const h = document.createElement('h2'); h.append(...heading.childNodes); copy.append(h); }
  bodies.forEach((b) => { const p = document.createElement('p'); p.append(...b.childNodes); copy.append(p); });
  if (cta) { const actions = document.createElement('div'); actions.className='actions';
    const a=document.createElement('a'); a.href=cta.href; a.textContent=cta.textContent.trim();
    a.className='btn btn-primary'; actions.append(a); copy.append(actions); }
  const inner = document.createElement('div'); inner.className='split-inner'; inner.append(mediaEl, copy);
  block.replaceChildren(inner);
}
