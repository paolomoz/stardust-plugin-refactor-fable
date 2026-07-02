/**
 * story — full-bleed dark band, N story columns. One row per story.
 * Cells: picture, eyebrow, heading, body, cta.
 */
function media(c){return c&&(c.matches?.('picture,img')?c:c.querySelector('picture,img'));}
export default function decorate(block) {
  const rows = [...block.children];
  const grid = document.createElement('div'); grid.className = 'story-grid';
  rows.forEach((row) => {
    const cells = [...row.children];
    let pic, eyebrow, heading, cta; const bodies=[];
    cells.forEach((cell) => {
      const m = media(cell); const h = cell.querySelector('h2,h3'); const link = cell.querySelector('a');
      if (m && !pic) { pic = m; return; }
      if (h && !heading) { heading = h; return; }
      if (link) { cta = link; return; }
      const strong = cell.querySelector('strong'); const txt=cell.textContent.trim(); if(!txt) return;
      if ((strong||cell.classList.contains('eyebrow')) && !eyebrow) eyebrow=cell; else bodies.push(cell);
    });
    const col = document.createElement('article'); col.className = 'story-col';
    if (pic) { const mw=document.createElement('div'); mw.className='story-media'; mw.append(pic); col.append(mw); }
    if (eyebrow) { const e=document.createElement('p'); e.className='story-eyebrow'; e.append(...eyebrow.childNodes); col.append(e); }
    if (heading) { const h=document.createElement('h3'); h.append(...heading.childNodes); col.append(h); }
    bodies.forEach((b)=>{ const p=document.createElement('p'); p.append(...b.childNodes); col.append(p); });
    if (cta) { const actions=document.createElement('div'); actions.className='actions';
      const a=document.createElement('a'); a.href=cta.href; a.textContent=cta.textContent.trim(); a.className='btn btn-secondary'; actions.append(a); col.append(actions); }
    grid.append(col);
  });
  const inner=document.createElement('div'); inner.className='story-inner'; inner.append(grid);
  block.replaceChildren(inner);
}
