export default function decorate(block) {
  const cell = block.querySelector(':scope > div > div');
  if (!cell) return;
  const eb = cell.querySelector(':scope > p'); if (eb) eb.className = 'eyebrow';
  const links = [...cell.querySelectorAll('a')].filter((a) => a.querySelector('picture'));
  const foot = [...cell.querySelectorAll('a')].find((a) => !a.querySelector('picture') && /more stories/i.test(a.textContent));
  const grid = document.createElement('div'); grid.className = 'stories__grid';
  links.forEach((a) => {
    a.classList.add('story');
    const pic = a.querySelector('picture');
    const img = a.querySelector('img');
    const exc = a.querySelector('p');
    const photo = document.createElement('div'); photo.className = 'story__photo'; if (pic) photo.append(pic);
    const body = document.createElement('div'); body.className = 'story__body';
    const name = document.createElement('div'); name.className = 'story__name';
    name.textContent = (img && img.alt.split(',')[0]) || '';
    const more = document.createElement('span'); more.className = 'story__more'; more.textContent = 'Read More →';
    if (exc) exc.className = 'story__excerpt';
    body.append(name); if (exc) body.append(exc); body.append(more);
    a.replaceChildren(photo, body);
    grid.append(a);
  });
  cell.append(grid);
  if (foot) { const f = document.createElement('div'); f.className = 'stories__foot'; foot.classList.add('trh-btn', 'trh-btn--secondary'); f.append(foot); cell.append(f); }
}
