/**
 * news — prove vitality (featured card + ledger list).
 *
 * Section head: <h2> authored as DEFAULT CONTENT before the block (reabsorbed).
 * Item rows (one per item): [picture (featured only)] | [meta text] | [h3 > a]
 * Trailing row with a single "Alle …" link = the all-news link (plain <a>).
 * Meta is read via cell textContent, never querySelector('p') (#79).
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

function partsOf(row) {
  const media = row.querySelector('picture, img');
  const heading = row.querySelector('h2, h3, h4');
  const link = heading ? heading.querySelector('a') || row.querySelector('a') : row.querySelector('a');
  const metaCell = [...row.querySelectorAll(':scope > div')].find(
    (c) => !c.querySelector('picture, img, h2, h3, h4') && c.textContent.trim(),
  );
  return {
    media, heading, link, meta: metaCell ? metaCell.textContent.trim() : '',
  };
}

export default async function decorate(block) {
  const rows = [...block.children];
  const headNodes = reabsorbHead(block);

  const items = [];
  let allLink = null;
  rows.forEach((row) => {
    const { media, heading, link, meta } = partsOf(row);
    if (!heading && link && !media) { allLink = link; return; }
    if (heading || media) items.push({ media, heading, link, meta });
  });

  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  if (headNodes && headNodes.length) {
    const h2 = document.createElement('h2');
    const src = headNodes.find((n) => n.matches('h1, h2, h3')) || headNodes[0];
    h2.append(...src.childNodes);
    wrap.append(h2);
  }

  const layout = document.createElement('div');
  layout.className = 'news-layout';

  const featured = items.find((i) => i.media) || items[0];
  if (featured) {
    const card = document.createElement('a');
    card.className = 'news-featured';
    if (featured.link) card.href = featured.link.href;
    if (featured.media) card.append(featured.media);
    const body = document.createElement('div');
    body.className = 'nf-body';
    if (featured.meta) {
      const meta = document.createElement('p');
      meta.className = 'news-meta';
      meta.textContent = featured.meta;
      body.append(meta);
    }
    if (featured.heading) {
      const h3 = document.createElement('h3');
      h3.textContent = featured.heading.textContent.trim();
      body.append(h3);
    }
    card.append(body);
    layout.append(card);
  }

  const rest = items.filter((i) => i !== featured);
  const col = document.createElement('div');
  const ledger = document.createElement('ul');
  ledger.className = 'news-ledger';
  rest.forEach((i) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    if (i.link) a.href = i.link.href;
    if (i.meta) {
      const meta = document.createElement('p');
      meta.className = 'news-meta';
      meta.textContent = i.meta;
      a.append(meta);
    }
    if (i.heading) {
      const h3 = document.createElement('h3');
      h3.textContent = i.heading.textContent.trim();
      a.append(h3);
    }
    li.append(a);
    ledger.append(li);
  });
  col.append(ledger);
  if (allLink) {
    const a = allLink.cloneNode(true);
    a.className = 'news-all';
    col.append(a);
  }
  layout.append(col);

  wrap.append(layout);
  block.replaceChildren(wrap);
}
