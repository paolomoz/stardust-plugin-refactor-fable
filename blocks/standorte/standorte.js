/**
 * standorte — route to locations (split copy | map card).
 *
 * Authoring (query-based):
 *   - <h2>                → section title
 *   - link-free <p>       → body copy
 *   - <strong><a>         → primary CTA (decorateButton applies .btn-primary)
 *   - <picture>/<img>     → map figure (card-framed)
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

  const media = nodes.find((n) => n.matches('picture, img') || n.querySelector('picture, img'));
  const pic = media && (media.matches('picture, img') ? media : media.querySelector('picture, img'));
  const heading = nodes.find((n) => n.matches('h1, h2, h3'));
  const body = nodes.find((n) => n.matches('p') && !n.querySelector('a, picture, img') && n !== media);
  // decorateButton unwraps <strong> to a bare a.btn — match self OR descendant (#53)
  const ctaHolder = nodes.find((n) => n !== media && (n.matches('a') || n.querySelector('a'))
    && !n.querySelector('picture, img'));

  const wrap = document.createElement('div');
  wrap.className = 'wrap';

  const copy = document.createElement('div');
  copy.className = 'standorte-copy';
  if (heading) {
    const h2 = document.createElement('h2');
    const inner = heading.querySelector('h1, h2, h3') || heading;
    h2.append(...inner.childNodes);
    copy.append(h2);
  }
  if (body) copy.append(body);
  if (ctaHolder) {
    const actions = document.createElement('p');
    actions.className = 'actions';
    if (ctaHolder.matches('a')) actions.append(ctaHolder.cloneNode(true));
    else [...ctaHolder.childNodes].forEach((n) => actions.append(n.cloneNode(true)));
    copy.append(actions);
  }
  wrap.append(copy);

  if (pic) {
    const figure = document.createElement('figure');
    figure.append(pic);
    wrap.append(figure);
  }

  block.replaceChildren(wrap);
}
