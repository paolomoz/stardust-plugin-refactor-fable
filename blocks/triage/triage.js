export default function decorate(block) {
  const cell = block.querySelector(':scope > div > div');
  if (!cell) return;
  const kids = [...cell.children];
  let split = kids.findIndex((k) => k.tagName === 'P' && /where to go/i.test(k.textContent));
  if (split < 0) split = kids.findIndex((k) => k.tagName === 'H2' && /resource centers/i.test(k.textContent));
  if (split < 0) return;
  const grid = document.createElement('div'); grid.className = 'triage__grid';
  const panel = document.createElement('div'); panel.className = 'crisis-panel';
  const centers = document.createElement('div'); centers.className = 'centers';
  kids.forEach((k, i) => { (i < split ? panel : centers).append(k); });
  const tel = panel.querySelector('a[href^="tel:8019"]'); if (tel) tel.classList.add('crisis-panel__tel');
  const c211 = panel.querySelector('a[href^="tel:211"]'); if (c211) c211.classList.add('crisis-panel__211');
  const eb = centers.querySelector('p'); if (eb) eb.className = 'eyebrow eyebrow--onlight';
  const h2 = centers.querySelector('h2');
  const cgrid = document.createElement('div'); cgrid.className = 'centers__grid';
  let cur = null;
  [...centers.children].forEach((k) => {
    if (k === eb || k === h2) return;
    if (k.tagName === 'H3') { cur = document.createElement('div'); cur.className = 'center'; cur.append(k); cgrid.append(cur); }
    else if (cur) cur.append(k);
  });
  const head = [eb, h2].filter(Boolean);
  centers.replaceChildren(...head, cgrid);
  grid.append(panel, centers);
  cell.replaceChildren(grid);
}
