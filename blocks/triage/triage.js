export default function decorate(block) {
  const cell = block.querySelector(':scope > div > div');
  if (!cell) return;
  const tel = cell.querySelector('a[href^="tel:8019"]'); if (tel) tel.classList.add('crisis-panel__tel');
  const eb = [...cell.querySelectorAll('p')].find((p) => /where to go/i.test(p.textContent));
  if (eb) eb.className = 'eyebrow eyebrow--onlight';
}
