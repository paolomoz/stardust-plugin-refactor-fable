/**
 * pipeline — numbered four-step ledger (data-section "how-it-works-pipeline").
 *
 * Section head (deck + h2 + muted line) is authored as DEFAULT CONTENT before
 * the block; the block reabsorbs it. Block rows: one row per step, <h3> + p.
 * Step numbers (01..04) are generated, aria-hidden ornament — a leading
 * authored number is stripped first so injection stays idempotent (#70).
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
  const steps = [];
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
      steps.push(current);
    } else if (current) {
      current.body.push(node);
    } else {
      preNodes.push(node);
    }
  });

  /* back-compat: in-table head — everything before the first step */
  headNodes.push(...preNodes);

  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  if (headNodes.length) wrap.append(buildSectionHead(headNodes));

  const ol = document.createElement('ol');
  ol.className = 'steps';
  steps.forEach((step, i) => {
    const li = document.createElement('li');
    const num = document.createElement('span');
    num.className = 'num';
    num.setAttribute('aria-hidden', 'true');
    num.textContent = String(i + 1).padStart(2, '0');
    const h3 = document.createElement('h3');
    const src = step.title.querySelector('h3, h4') || step.title;
    h3.append(...src.childNodes);
    /* #70: strip an authored leading number so the generated one never doubles */
    const first = h3.firstChild;
    if (first && first.nodeType === Node.TEXT_NODE) {
      first.textContent = first.textContent.replace(/^\s*\d+\s*[·—-]?\s*/, '');
    }
    li.append(num, h3, ...step.body);
    ol.append(li);
  });
  if (steps.length) wrap.append(ol);

  block.replaceChildren(wrap);
}
