export default function decorate(block) {
  const cell = block.querySelector(':scope > div > div');
  if (!cell) return;
  const h2 = cell.querySelector('h2'); if (h2) h2.classList.add('visually-hidden');
  const eb = cell.querySelector(':scope > p'); if (eb) eb.className = 'eyebrow';
  const links = [...cell.querySelectorAll('a')].filter((a) => a.querySelector('picture'));
  const grid = document.createElement('div'); grid.className = 'routes__grid';
  links.forEach((a) => {
    a.classList.add('route');
    const pic = a.querySelector('picture');
    const txt = a.textContent.trim();
    const label = document.createElement('span'); label.className = 'route__label';
    const name = document.createElement('span'); name.className = 'route__name';
    name.textContent = txt.replace(/\s*(Get help|Give|Get involved).*$/i, '').trim() || txt;
    const more = document.createElement('span'); more.className = 'route__more';
    const m = txt.match(/(Get help|Give|Get involved).*$/i); more.textContent = m ? m[0] : '';
    label.append(name, more);
    a.replaceChildren(pic, label);
    grid.append(a);
  });
  cell.append(grid);
}
