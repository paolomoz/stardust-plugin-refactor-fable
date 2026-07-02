export default function decorate(block) {
  const cell = block.querySelector(':scope > div > div');
  if (!cell) return;
  const h2 = cell.querySelector('h2'); if (h2) h2.classList.add('visually-hidden');
  const ps = [...cell.querySelectorAll(':scope > p')];
  const eb = ps.shift(); if (eb) eb.className = 'eyebrow';
  const grid = document.createElement('div'); grid.className = 'impact__grid';
  for (let i = 0; i < ps.length; i += 2) {
    const s = document.createElement('div'); s.className = 'stat';
    if (ps[i]) { ps[i].className = 'impact__num'; s.append(ps[i]); }
    if (ps[i + 1]) { ps[i + 1].className = 'impact__cap'; s.append(ps[i + 1]); }
    grid.append(s);
  }
  cell.append(grid);
}
