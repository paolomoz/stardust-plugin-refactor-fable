export default function decorate(block) {
  const cell = block.querySelector(':scope > div > div') || block;
  cell.classList.add('trh-nav__inner');
  const anchors = [...cell.querySelectorAll('a')];
  if (anchors[0]) anchors[0].classList.add('trh-nav__logo');
  const links = document.createElement('div'); links.className = 'trh-nav__links';
  anchors.slice(1).forEach((a) => { if (/donate/i.test(a.textContent)) a.classList.add('trh-btn', 'trh-btn--primary'); links.append(a); });
  cell.append(links);
}
