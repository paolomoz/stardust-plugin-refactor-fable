export default function decorate(block) {
  const cell = block.querySelector(':scope > div > div');
  if (!cell) return;
  const eb = cell.querySelector(':scope > p'); if (eb) eb.className = 'eyebrow';
  const h2 = cell.querySelector('h2');
  if (h2 && eb && h2.textContent.trim().toLowerCase() === eb.textContent.trim().toLowerCase()) h2.classList.add('visually-hidden');
  const head = document.createElement('div'); head.className = 'journey__head';
  const grid = document.createElement('div'); grid.className = 'journey__steps';
  const links = [...cell.querySelectorAll('a')].filter((a) => /learn more/i.test(a.textContent));
  links.forEach((a) => {
    const linkP = a.closest('p'); const nameEl = linkP && linkP.previousElementSibling;
    const step = document.createElement('div'); step.className = 'jstep';
    const nm = document.createElement('div'); nm.className = 'jstep__name';
    nm.textContent = nameEl ? nameEl.textContent.trim() : '';
    if (nameEl) nameEl.remove();
    a.className = 'jstep__more';
    step.append(nm, a); grid.append(step);
    if (linkP) linkP.remove();
  });
  [...cell.children].forEach((c) => { if (c !== grid) head.append(c); });
  cell.replaceChildren(head, grid);
}
