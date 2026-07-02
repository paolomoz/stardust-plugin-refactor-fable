export default function decorate(block) {
  const cell = block.querySelector(':scope > div > div');
  if (!cell) return;
  const ps = [...cell.querySelectorAll(':scope > p')];
  if (ps[0]) ps[0].className = 'eyebrow eyebrow--ondark';
  const stars = ps.find((p) => /★/.test(p.textContent));
  if (stars) stars.className = 'charity__stars';
}
