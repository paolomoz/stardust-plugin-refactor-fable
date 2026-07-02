export default function decorate(block) {
  const cell = block.querySelector(':scope > div > div');
  if (!cell) return;
  const eb = cell.querySelector(':scope > p'); if (eb) eb.className = 'eyebrow eyebrow--onlight';
}
