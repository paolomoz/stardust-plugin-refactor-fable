/**
 * hero — emotional hook + find care fast (photographic full-bleed + finder).
 *
 * Authoring (query-based, tolerant of row layout — #42):
 *   - <picture>/<img> anywhere      → full-bleed background layer
 *   - short link-free <p> BEFORE h1 → kicker (eyebrow)
 *   - <h1>                          → page headline (exactly one per page)
 *   - remaining plain <a> links     → finder quick-chips (NOT buttons)
 * The search form itself is block chrome (fixed action), not authored content.
 */

const SEARCH_ACTION = 'https://www.hirslanden.ch/de/corporate/search.html';

function collectNodes(block) {
  const out = [];
  block.querySelectorAll(':scope > div > div').forEach((cell) => {
    const kids = [...cell.children];
    if (kids.length) out.push(...kids);
    else if (cell.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = cell.textContent.trim();
      out.push(p);
    }
  });
  return out.length ? out : [...block.children];
}

export default async function decorate(block) {
  const nodes = collectNodes(block);

  const media = nodes.find((n) => n.matches('picture, img') || n.querySelector('picture, img'));
  const pic = media && (media.matches('picture, img') ? media : media.querySelector('picture, img'));
  const h1 = block.querySelector('h1, h2');
  const kicker = nodes.find((n) => n.matches('p') && !n.querySelector('a, picture, img')
    && n !== media && n.textContent.trim() && n.textContent.trim().length < 60);
  const chips = nodes.flatMap((n) => (n.matches('a') ? [n] : [...n.querySelectorAll('a')]));

  const bg = document.createElement('div');
  bg.className = 'hero-bg';
  if (pic) {
    const img = pic.matches('img') ? pic : pic.querySelector('img');
    if (img) { img.removeAttribute('loading'); img.setAttribute('fetchpriority', 'high'); }
    bg.append(pic);
  }

  const wrap = document.createElement('div');
  wrap.className = 'wrap';

  if (kicker) {
    const k = document.createElement('p');
    k.className = 'hero-kicker';
    k.append(...kicker.childNodes);
    wrap.append(k);
  }

  if (h1) {
    const live = document.createElement('h1');
    const inner = h1.querySelector('h1, h2, h3') || h1;
    live.append(...inner.childNodes);
    wrap.append(live);
  }

  const finder = document.createElement('div');
  finder.className = 'finder';
  finder.innerHTML = `
    <form role="search" action="${SEARCH_ACTION}" method="get">
      <label class="visually-hidden" for="finder-q">Suchbegriff</label>
      <input id="finder-q" name="q" type="search" placeholder="Stichwort…" autocomplete="off">
      <button class="btn" type="submit">Suche</button>
    </form>`;
  if (chips.length) {
    const chipWrap = document.createElement('div');
    chipWrap.className = 'finder-chips';
    chips.forEach((a) => chipWrap.append(a.cloneNode(true)));
    finder.append(chipWrap);
  }
  wrap.append(finder);

  block.replaceChildren(bg, wrap);
}
