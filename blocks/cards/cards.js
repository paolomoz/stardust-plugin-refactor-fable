/**
 * cards — generic card grid. One row per card. Cells (any subset, classified by
 * content): picture, eyebrow(<strong> or short text), title(heading), body(p), cta(link).
 * Variant via block class: cards.cabins | cards.compact | cards.quick.
 */
function cellMedia(c) { return c && (c.matches?.('picture,img') ? c : c.querySelector('picture,img')); }
export default function decorate(block) {
  const rows = [...block.children];
  const grid = document.createElement('div'); grid.className = 'cards-grid';
  rows.forEach((row) => {
    const cells = [...row.children];
    const card = document.createElement('article'); card.className = 'card';
    let media; let eyebrow; let title; const bodies = []; let cta;
    cells.forEach((cell) => {
      const m = cellMedia(cell);
      const heading = cell.querySelector('h2,h3,h4');
      const link = cell.querySelector('a');
      if (m && !media) { media = m; return; }
      if (heading && !title) { title = heading; return; }
      if (link) { cta = link; return; }
      const strong = cell.querySelector('strong');
      const txt = cell.textContent.trim();
      if (!txt) return;
      if ((strong || cell.classList.contains('eyebrow')) && !eyebrow) eyebrow = cell;
      else bodies.push(cell);
    });
    if (media) { const mw = document.createElement('div'); mw.className = 'card-media'; mw.append(media); card.append(mw); }
    const body = document.createElement('div'); body.className = 'card-body';
    if (eyebrow) { const e = document.createElement('span'); e.className = 'card-eyebrow'; e.append(...eyebrow.childNodes); body.append(e); }
    if (title) { const h = document.createElement('h3'); h.append(...(title.querySelector('h2,h3,h4')?.childNodes || title.childNodes)); body.append(h); }
    bodies.forEach((b) => { const p = document.createElement('p'); p.append(...b.childNodes); body.append(p); });
    if (cta) { const a = document.createElement('a'); a.className = 'discover'; a.href = cta.href;
      a.innerHTML = `${cta.textContent.trim()} <span class="arw" aria-hidden="true">→</span>`; body.append(a); }
    card.append(body);
    grid.append(card);
  });
  block.replaceChildren(grid);
}
