/* Festool cards block — grid of cards (new-products / teasers / utility / gallery / accessories / blog).
   Variant from block class sets column count (CSS). A row whose cell leads with an H2 becomes the
   section head; every other row becomes a card. Content authored as one row per card. */
export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const grid = document.createElement('div');
  grid.className = 'cards__grid';
  let head = null;

  rows.forEach((row) => {
    const cell = row.querySelector(':scope > div') || row;
    const h2 = cell.querySelector('h2');
    if (h2 && !cell.querySelector('h3') && !cell.querySelector('picture, img')) {
      head = document.createElement('div');
      head.className = 'cards__head';
      const left = document.createElement('div');
      left.append(h2);
      const sub = cell.querySelector('p');
      if (sub) { sub.className = 'sub'; left.append(sub); }
      head.append(left);
      const moreLink = cell.querySelector('a');
      if (moreLink) { moreLink.className = 'chev'; head.append(moreLink); }
      return;
    }
    const card = document.createElement('a');
    card.className = 'card';
    const link = cell.querySelector('a');
    if (link) card.href = link.getAttribute('href');
    const pic = cell.querySelector('picture, img');
    if (pic) {
      const media = document.createElement('span');
      media.className = 'card__media';
      media.append(pic.closest('picture') || pic);
      card.append(media);
    }
    const body = document.createElement('span');
    body.className = 'card__body';
    const kicker = cell.querySelector('strong');
    if (kicker) { const k = document.createElement('span'); k.className = 'kicker'; k.textContent = kicker.textContent; body.append(k); }
    const h3 = cell.querySelector('h3');
    if (h3) body.append(h3);
    cell.querySelectorAll('p').forEach((p) => { if (!p.querySelector('a')) body.append(p); });
    if (link) { const ch = document.createElement('span'); ch.className = 'chev'; ch.textContent = link.textContent || 'Read more'; body.append(ch); }
    card.append(body);
    grid.append(card);
  });

  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  if (head) wrap.append(head);
  wrap.append(grid);
  block.textContent = '';
  block.append(wrap);
}
