/**
 * gruppe — build trust (3 editorial cards, image + overlaid title + copy).
 *
 * Section head: the <h2> is authored as DEFAULT CONTENT before the block and
 * reabsorbed at decorate time (zero pixel change); a leading in-table heading
 * row is the back-compat fallback.
 *
 * Card rows (one per card): [picture] | [h3 > a (title+href)] | [copy p]
 * Whole card becomes the anchor (tile pattern — not a button).
 */

function reabsorbHead(block) {
  const wrapper = block.closest('.block-content')?.previousElementSibling;
  if (wrapper && (wrapper.matches('.default-content') || wrapper.matches('.default-content-wrapper'))) {
    const nodes = [...wrapper.children];
    wrapper.remove();
    return nodes;
  }
  return null;
}

function cardFromParts(parts) {
  const link = parts.map((p) => (p.matches('a') ? p : p.querySelector('a'))).find(Boolean);
  const media = parts.map((p) => (p.matches('picture, img') ? p : p.querySelector('picture, img'))).find(Boolean);
  const heading = parts.map((p) => (p.matches('h2, h3, h4') ? p : p.querySelector('h2, h3, h4'))).find(Boolean);
  const copy = parts.find((p) => p.matches('p') && !p.querySelector('a, picture, img')
    && (!heading || !heading.contains(p)) && p.textContent.trim());

  const card = document.createElement('a');
  card.className = 'ed-card';
  if (link) card.href = link.href;

  const mediaWrap = document.createElement('div');
  mediaWrap.className = 'ed-media';
  if (media) mediaWrap.append(media);
  const title = document.createElement('span');
  title.className = 'ed-title';
  title.textContent = (heading || link) ? (heading || link).textContent.trim() : '';
  mediaWrap.append(title);
  card.append(mediaWrap);

  const copyWrap = document.createElement('div');
  copyWrap.className = 'ed-copy';
  if (copy) copyWrap.append(copy);
  const more = document.createElement('span');
  more.className = 'more';
  more.textContent = 'Mehr erfahren';
  copyWrap.append(more);
  card.append(copyWrap);
  return card;
}

export default async function decorate(block) {
  const rows = [...block.children];

  // head: default content (reabsorbed) or leading imageless/linkless row
  let headNodes = reabsorbHead(block);
  const cardRows = [];
  rows.forEach((row) => {
    const hasCardContent = row.querySelector('picture, img, a');
    if (!hasCardContent && !headNodes) headNodes = [...row.querySelectorAll('h1, h2, h3')];
    else if (hasCardContent) cardRows.push(row);
  });

  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  if (headNodes && headNodes.length) {
    const h2 = document.createElement('h2');
    const src = headNodes.find((n) => n.matches('h1, h2, h3')) || headNodes[0];
    h2.append(...src.childNodes);
    wrap.append(h2);
  }

  const grid = document.createElement('div');
  grid.className = 'editorial-grid';
  cardRows.forEach((row) => grid.append(cardFromParts([...row.querySelectorAll(':scope > div > *'), ...row.children])));
  wrap.append(grid);

  block.replaceChildren(wrap);
}
