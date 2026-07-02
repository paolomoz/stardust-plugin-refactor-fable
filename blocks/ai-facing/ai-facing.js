/**
 * ai-facing — the page's ONE card band (data-section "ai-facing").
 *
 * Section head (deck + h2) is authored as DEFAULT CONTENT before the block;
 * the block reabsorbs it. Block rows:
 *   lede paragraph (link-free, no heading)
 *   one row per card: <h3> + paragraph
 *
 * Decode: #62 flatten-first collector; #52 h3-boundary segmentation (the
 * repeat-unit heading is h3 — never segment on h2, that's the section title);
 * #53 matches-or-descendant.
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

function reabsorbHead(block) {
  const content = block.closest('.block-content');
  const prev = content ? content.previousElementSibling : null;
  if (!prev || !prev.matches('.default-content, .default-content-wrapper')) return [];
  const nodes = [...prev.children];
  prev.remove();
  return nodes;
}

function buildSectionHead(nodes) {
  const head = document.createElement('div');
  head.className = 'section-head';
  let seenHeading = false;
  nodes.forEach((node) => {
    const h = node.matches('h1, h2, h3') ? node : node.querySelector('h1, h2, h3');
    if (h) {
      head.append(h);
      seenHeading = true;
      return;
    }
    if (!node.textContent.trim()) return;
    const p = node.matches('p') ? node : document.createElement('p');
    if (p !== node) p.append(...node.childNodes);
    if (seenHeading) p.className = 'muted';
    else p.className = /[.!?]/.test(p.textContent) ? 'deck' : 'eyebrow';
    head.append(p);
  });
  return head;
}

export default async function decorate(block) {
  const nodes = collectNodes(block);
  const headNodes = reabsorbHead(block);

  const preNodes = [];
  const cards = [];
  let current = null;

  nodes.forEach((node) => {
    const h3 = node.matches('h3, h4') ? node : node.querySelector('h3, h4');
    if (h3) {
      current = { title: h3, body: [] };
      if (h3 !== node) {
        [...node.children].forEach((child) => {
          if (child !== h3) current.body.push(child);
        });
      }
      cards.push(current);
    } else if (current) {
      current.body.push(node);
    } else {
      preNodes.push(node);
    }
  });

  /* back-compat: in-table head (leading rows up to the h2) */
  const h2Idx = preNodes.findIndex(
    (n) => (n.matches('h2') ? n : n.querySelector('h2')),
  );
  if (h2Idx >= 0) headNodes.push(...preNodes.splice(0, h2Idx + 1));

  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  if (headNodes.length) wrap.append(buildSectionHead(headNodes));

  preNodes.forEach((node) => {
    if (!node.textContent.trim()) return;
    node.classList.add('ai-facing-lede');
    wrap.append(node);
  });

  const grid = document.createElement('div');
  grid.className = 'card-grid';
  cards.forEach((card) => {
    const article = document.createElement('article');
    article.className = 'card';
    const h3 = document.createElement('h3');
    const src = card.title.querySelector('h3, h4') || card.title;
    h3.append(...src.childNodes);
    article.append(h3, ...card.body);
    grid.append(article);
  });
  if (cards.length) wrap.append(grid);

  block.replaceChildren(wrap);
}
