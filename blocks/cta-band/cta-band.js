/**
 * cta-band — centered conversion band over a radial ink glow
 * (data-section "cta-band").
 *
 * Authoring rows:
 *   <h2> title (em = amber-italic phrase)
 *   CTA row — <strong><a> primary / <em><a> secondary
 *   <code> one-shot command (the block adds the copy button)
 *   mono beat line ("that's it — run /stardust:uplift on any URL.")
 *
 * Decode: #62 flatten-first; #48 classify-by-content (heading / links /
 * code / trailing text).
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

function buildChip(commandText) {
  const chip = document.createElement('span');
  chip.className = 'cmd-chip';
  const code = document.createElement('code');
  code.textContent = commandText;
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'copy-btn';
  btn.textContent = 'copy';
  btn.addEventListener('click', () => {
    const confirmState = () => {
      btn.textContent = 'copied';
      btn.classList.add('is-copied');
      setTimeout(() => {
        btn.textContent = 'copy';
        btn.classList.remove('is-copied');
      }, 1500);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(commandText).then(confirmState, confirmState);
    } else {
      confirmState();
    }
  });
  chip.append(code, btn);
  return chip;
}

export default async function decorate(block) {
  const nodes = collectNodes(block);
  if (!nodes.length) return;

  let heading = null;
  let chipText = '';
  const ctas = [];
  const texts = [];

  nodes.forEach((node) => {
    const h = node.matches('h1, h2, h3') ? node : node.querySelector('h1, h2, h3');
    const code = node.matches('code') ? node : node.querySelector('code');
    const anchors = node.matches('a') ? [node] : [...node.querySelectorAll('a')];
    if (h && !heading) {
      heading = h;
    } else if (code) {
      chipText = code.textContent.trim();
    } else if (anchors.length) {
      ctas.push(...anchors);
    } else if (node.textContent.trim()) {
      texts.push(node);
    }
  });

  const inner = document.createElement('div');
  inner.className = 'cta-inner';

  if (heading) {
    /* section title stays h2 — the page's single h1 lives in the hero (#35) */
    const h2 = document.createElement('h2');
    const src = heading.querySelector('h1, h2, h3') || heading;
    h2.append(...src.childNodes);
    if (heading.id) h2.id = heading.id;
    h2.querySelectorAll('em').forEach((em) => {
      const span = document.createElement('span');
      span.className = 'ai';
      span.append(...em.childNodes);
      em.replaceWith(span);
    });
    inner.append(h2);
  }
  if (ctas.length) {
    const row = document.createElement('div');
    row.className = 'cta-ctas';
    ctas.forEach((a) => row.append(a));
    inner.append(row);
  }
  if (chipText) inner.append(buildChip(chipText));
  texts.forEach((node) => {
    node.classList.add('cta-beat');
    inner.append(node);
  });

  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  wrap.append(inner);
  block.replaceChildren(wrap);
}
