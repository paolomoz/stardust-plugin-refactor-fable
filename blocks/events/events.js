/**
 * events — drive attendance (date-chip ledger rows).
 *
 * Section head: <h2> authored as DEFAULT CONTENT before the block (reabsorbed).
 * Event rows (one per event): [date "02 Jul."] | [h3 > a (title+href)] | [place]
 * Trailing row with a single "Alle …" link = the all-events link (plain <a>).
 * Text fields read via cell textContent (#79).
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

export default async function decorate(block) {
  const rows = [...block.children];
  const headNodes = reabsorbHead(block);

  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  if (headNodes && headNodes.length) {
    const h2 = document.createElement('h2');
    const src = headNodes.find((n) => n.matches('h1, h2, h3')) || headNodes[0];
    h2.append(...src.childNodes);
    wrap.append(h2);
  }

  const list = document.createElement('ul');
  list.className = 'event-list';
  let allLink = null;

  rows.forEach((row) => {
    const cells = [...row.querySelectorAll(':scope > div')];
    const heading = row.querySelector('h2, h3, h4');
    const link = (heading && heading.querySelector('a')) || row.querySelector('a');
    if (!heading && link && cells.length === 1) { allLink = link; return; }
    if (!link) return;

    const dateCell = cells.find((c) => /^\d{1,2}\s/.test(c.textContent.trim()));
    const placeCell = cells.find((c) => c !== dateCell && !c.contains(heading) && c.textContent.trim());

    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = link.href;

    if (dateCell) {
      const [day, ...monthParts] = dateCell.textContent.trim().split(/\s+/);
      const date = document.createElement('span');
      date.className = 'event-date';
      date.setAttribute('aria-hidden', 'true');
      date.innerHTML = `<span class="d"></span><span class="m"></span>`;
      date.querySelector('.d').textContent = day;
      date.querySelector('.m').textContent = monthParts.join(' ');
      a.append(date);
    }

    const titleWrap = document.createElement('span');
    const title = document.createElement('span');
    title.className = 'event-title';
    title.textContent = (heading || link).textContent.trim();
    titleWrap.append(title);
    a.append(titleWrap);

    if (placeCell) {
      const place = document.createElement('span');
      place.className = 'event-place';
      place.textContent = placeCell.textContent.trim();
      a.append(place);
    }

    li.append(a);
    list.append(li);
  });

  wrap.append(list);
  if (allLink) {
    const a = allLink.cloneNode(true);
    a.className = 'events-all';
    wrap.append(a);
  }

  block.replaceChildren(wrap);
}
