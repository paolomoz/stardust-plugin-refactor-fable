/**
 * aem-band — cream cross-promo editorial band (data-section "aem-band").
 *
 * Authoring rows (head in-table — single editorial beat, no repeating units):
 *   deck line ("Deploy anywhere. <em>Scale with AEM.</em>")
 *   <h2> section title
 *   body paragraph (inline link allowed)
 *   arrow link paragraph — a paragraph that is ONLY a link (plain <a>, not a
 *   button: text link with flourish, per Step 5 "when NOT to use the convention")
 *
 * Decode: #62 flatten-first; #48 classify-by-content (h2 / link-only / text
 * order relative to the h2).
 */

const BLOCK_TAGS = 'p, h1, h2, h3, h4, h5, h6, ul, ol, div, picture, img, table, pre';

/* #62 flatten-first cell collector */
function collectNodes(block) {
  const out = [];
  block.querySelectorAll(':scope > div > div').forEach((cell) => {
    const bareText = [...cell.childNodes]
      .some((n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
    const kids = [...cell.children];
    if (kids.length && !bareText && kids.every((k) => k.matches(BLOCK_TAGS))) {
      out.push(...kids);
    } else if (cell.textContent.trim() || kids.length) {
      const p = document.createElement('p');
      p.append(...cell.childNodes);
      out.push(p);
    }
  });
  return out.length ? out : [...block.children];
}

export default async function decorate(block) {
  const nodes = collectNodes(block);
  if (!nodes.length) return;

  let heading = null;
  let link = null;
  const preTexts = [];
  const postTexts = [];

  nodes.forEach((node) => {
    const h2 = node.matches('h1, h2, h3') ? node : node.querySelector('h1, h2, h3');
    const a = node.matches('a') ? node : node.querySelector('a');
    const text = node.textContent.trim();
    if (h2 && !heading) {
      heading = h2;
    } else if (a && a.textContent.trim() === text) {
      link = a;
    } else if (!text) {
      /* skip empties */
    } else if (heading) {
      postTexts.push(node);
    } else {
      preTexts.push(node);
    }
  });

  const wrap = document.createElement('div');
  wrap.className = 'wrap';

  const head = document.createElement('div');
  head.className = 'section-head';
  preTexts.forEach((node) => {
    const p = node.matches('p') ? node : document.createElement('p');
    if (p !== node) p.append(...node.childNodes);
    p.className = 'deck';
    head.append(p);
  });
  if (heading) head.append(heading);
  wrap.append(head);

  postTexts.forEach((node) => {
    node.classList.add('aem-copy');
    wrap.append(node);
  });

  if (link) {
    link.classList.add('aem-link');
    wrap.append(link);
  }

  block.classList.add('cream');
  block.replaceChildren(wrap);
}
