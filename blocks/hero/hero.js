/**
 * hero — type-only hero over radial ink glow + CSS starfield (data-section "hero").
 *
 * Authoring (query-based, #42 — tolerates rich multi-row AND flattened single-cell):
 *   <h1> headline — em carries the amber-italic highlighted phrase, on its own line
 *   short deck line (em = amber-italic)
 *   sentence-length lede
 *   CTA row — <strong><a> primary / <em><a> secondary (AuthorKit emits .btn classes)
 *   mono facts line (middot-separated)
 *   <code> one-shot command — the block adds the copy button (clipboard.writeText)
 */

const BLOCK_TAGS = 'p, h1, h2, h3, h4, h5, h6, ul, ol, div, picture, img, table, pre';

/* #62 flatten-first cell collector: iterate CELLS, recover bare-text cells too. */
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

function seedMark(cls, textContent) {
  const span = document.createElement('span');
  span.className = `seed-mark seed-mark-${cls}`;
  span.setAttribute('aria-hidden', 'true');
  span.textContent = textContent;
  return span;
}

export default async function decorate(block) {
  const nodes = collectNodes(block);
  if (!nodes.length) return;

  let heading = null;
  let chipText = '';
  const ctas = [];
  const texts = [];

  nodes.forEach((node) => {
    const h = node.matches('h1, h2') ? node : node.querySelector('h1, h2');
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

  /* eyebrow-free lead: classify link-free texts — facts carry middots, lede is longest */
  let facts = texts.find((t) => t.textContent.includes('·'));
  const rest = texts.filter((t) => t !== facts);
  rest.sort((a, b) => a.textContent.trim().length - b.textContent.trim().length);
  const deck = rest.length > 1 ? rest[0] : null;
  const lede = rest.length ? rest[rest.length - 1] : null;
  if (!facts && rest.length > 2) [, facts] = rest;

  const inner = document.createElement('div');
  inner.className = 'hero-inner';

  if (heading) {
    /* #55: unwrap any nested heading, promote to the page's single h1 */
    const h1 = document.createElement('h1');
    const src = heading.querySelector('h1, h2') || heading;
    h1.append(...src.childNodes);
    if (heading.id) h1.id = heading.id;
    /* the em phrase renders on its own line; inner span carries the highlight */
    h1.querySelectorAll('em').forEach((em) => {
      const span = document.createElement('span');
      span.className = 'ai ai-hl';
      span.append(...em.childNodes);
      em.append(span);
    });
    inner.append(h1);
  }
  if (deck) {
    deck.className = 'hero-deck';
    inner.append(deck);
  }
  if (lede && lede !== deck) {
    lede.className = 'hero-lede';
    inner.append(lede);
  }
  if (ctas.length || facts) {
    const row = document.createElement('div');
    row.className = 'hero-ctas';
    ctas.forEach((a) => row.append(a));
    if (facts) {
      const span = document.createElement('span');
      span.className = 'hero-facts';
      span.textContent = facts.textContent.trim();
      row.append(span);
    }
    inner.append(row);
  }
  if (chipText) {
    const chipRow = document.createElement('div');
    chipRow.className = 'hero-chip-row';
    chipRow.append(buildChip(chipText));
    inner.append(chipRow);
  }

  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  wrap.append(inner);
  block.replaceChildren(
    seedMark('tr', 'seed · 1d66a8cd'),
    seedMark('bl', 'md5(brand · date)'),
    wrap,
  );
}
