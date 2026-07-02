export default function decorate(block) {
  const cell = block.querySelector(':scope > div > div');
  if (!cell) return;
  const h2 = cell.querySelector('h2'); if (h2) h2.classList.add('visually-hidden');
  const tel = cell.querySelector('a[href^="tel:8019"]'); if (tel) tel.classList.add('crisis__tel');
  const wrap = document.createElement('div'); wrap.className = 'trh-wrap crisis__inner';
  [...cell.children].forEach((c) => wrap.append(c));
  cell.append(wrap);
}
