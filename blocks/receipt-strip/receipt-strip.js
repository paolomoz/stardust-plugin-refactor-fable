/**
 * receipt-strip — variant receipt strip, the amber proof moment
 * (data-section "variant-receipt-strip"). Ink-deep full-bleed band.
 *
 * Section head (eyebrow + h2) is authored as DEFAULT CONTENT before the
 * block; the block reabsorbs it. Block rows — one row per stub, sub-fields
 * led by preserved tags (ENCODE contract):
 *   <strong>Variant A</strong> label + thesis paragraph (em = amber-italic)
 *   <strong>Seed</strong> + <code>md5(brand · date)</code> seed stub
 *
 * Decode: #62 flatten-first; units segmented on the leading <strong> label
 * (#48 classify-by-content — no headings in these stubs); #53
 * matches-or-descendant. Stub letters derive from the label text.
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

function accentEms(el) {
  el.querySelectorAll('em').forEach((em) => {
    const span = document.createElement('span');
    span.className = 'ai';
    span.append(...em.childNodes);
    em.replaceWith(span);
  });
}

export default async function decorate(block) {
  const nodes = collectNodes(block);
  const headNodes = reabsorbHead(block);

  const stubs = [];
  let current = null;

  nodes.forEach((node) => {
    const h2 = node.matches('h2') ? node : node.querySelector('h2');
    if (h2 && !stubs.length) {
      /* back-compat: in-table head */
      headNodes.push(node);
      return;
    }
    const strong = node.matches('strong') ? node : node.querySelector('strong');
    const labelOnly = strong
      && strong.textContent.trim() === node.textContent.trim();
    if (labelOnly) {
      current = { label: strong.textContent.trim(), body: [] };
      stubs.push(current);
    } else if (current) {
      current.body.push(node);
    } else if (node.textContent.trim()) {
      headNodes.push(node);
    }
  });

  const receipt = document.createElement('div');
  receipt.className = 'receipt';

  stubs.forEach((stub) => {
    const code = stub.body
      .map((n) => (n.matches('code') ? n : n.querySelector('code')))
      .find((c) => c);
    const [, letterChar] = stub.label.match(/\b([A-Z])$/) || [];

    if (code || /^seed$/i.test(stub.label)) {
      const seed = document.createElement('div');
      seed.className = 'receipt-seed';
      const label = document.createElement('span');
      label.className = 'stub-label';
      label.textContent = stub.label;
      seed.append(label);
      if (code) seed.append(code);
      receipt.append(seed);
      return;
    }

    const el = document.createElement('div');
    el.className = 'receipt-stub';
    if (letterChar) {
      const letter = document.createElement('span');
      letter.className = 'stub-letter';
      letter.setAttribute('aria-hidden', 'true');
      letter.textContent = letterChar;
      el.append(letter);
    }
    const label = document.createElement('span');
    label.className = 'stub-label';
    label.textContent = stub.label;
    el.append(label);
    stub.body.forEach((n) => {
      if (!n.textContent.trim()) return;
      n.classList.add('stub-thesis');
      accentEms(n);
      el.append(n);
    });
    receipt.append(el);
  });

  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  if (headNodes.length) wrap.append(buildSectionHead(headNodes));
  if (stubs.length) wrap.append(receipt);
  block.replaceChildren(wrap);
}
