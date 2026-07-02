/**
 * blog-band — drive action (full-bleed accent band: h2 + copy | outline CTA).
 *
 * Authoring (query-based):
 *   - <h2>       → band title
 *   - link-free <p> → body copy
 *   - <em><a>    → secondary CTA (decorateButton applies .btn-secondary;
 *                  styles.css inverts it to white-outline on this band)
 */

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
  const heading = nodes.find((n) => n.matches('h1, h2, h3') || n.querySelector('h1, h2, h3'));
  const body = nodes.find((n) => n.matches('p') && !n.querySelector('a') && n.textContent.trim());
  const ctaHolder = nodes.find((n) => (n.matches('a') || n.querySelector('a')) && n !== heading);

  const wrap = document.createElement('div');
  wrap.className = 'wrap';

  const copy = document.createElement('div');
  if (heading) {
    const h2 = document.createElement('h2');
    const inner = heading.matches('h1, h2, h3') ? heading : heading.querySelector('h1, h2, h3');
    h2.append(...inner.childNodes);
    copy.append(h2);
  }
  if (body) copy.append(body);
  wrap.append(copy);

  if (ctaHolder) {
    const actions = document.createElement('p');
    actions.className = 'actions';
    if (ctaHolder.matches('a')) actions.append(ctaHolder.cloneNode(true));
    else [...ctaHolder.childNodes].forEach((n) => actions.append(n.cloneNode(true)));
    wrap.append(actions);
  }

  block.replaceChildren(wrap);
}
