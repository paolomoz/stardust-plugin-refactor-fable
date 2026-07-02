/**
 * proof — before/after framed 2-up (data-section "proof-before-after").
 *
 * Authoring rows:
 *   eyebrow text ("The receipt")
 *   <h2> section title
 *   one row per frame: <img> + caption paragraph; a caption LINK makes the
 *   whole frame the click target (the After frame links to GitHub — critique
 *   A-5 keeps the Before frame non-interactive).
 *
 * Decode: #52 segmentation on media boundaries (#64 is about card grids whose
 * content may be image-less — here the captured frames ARE the images);
 * #53/#72 matches-or-descendant with 'picture, img'; multi-row head collected
 * whole (#56).
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

/* order-preserving head builder: label-like text = eyebrow, sentence = deck */
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
  if (!nodes.length) return;

  const headNodes = [];
  const frames = [];
  let current = null;

  nodes.forEach((node) => {
    const media = node.matches('picture, img') ? node : node.querySelector('picture, img');
    if (media) {
      current = { media, captions: [] };
      frames.push(current);
      /* caption text delivered inside the same cell as the image */
      if (media !== node) {
        [...node.children].forEach((child) => {
          if (child !== media && child.textContent.trim()) current.captions.push(child);
        });
      }
    } else if (current) {
      current.captions.push(node);
    } else {
      headNodes.push(node);
    }
  });

  const grid = document.createElement('div');
  grid.className = 'proof-grid';

  frames.forEach((frame, i) => {
    const captionText = frame.captions.map((c) => c.textContent.trim()).join(' ').trim();
    const link = frame.captions
      .map((c) => (c.matches('a') ? c : c.querySelector('a')))
      .find((a) => a);
    const isAfter = /^after/i.test(captionText) || (i > 0 && i === frames.length - 1);

    const root = document.createElement(link ? 'a' : 'div');
    root.className = `proof-frame${isAfter ? ' proof-frame-after' : ''}`;
    if (link) root.href = link.href;

    const figure = document.createElement('figure');
    const framing = document.createElement('span');
    framing.className = 'frame';
    framing.append(frame.media);
    const cap = document.createElement('figcaption');
    cap.textContent = captionText;
    figure.append(framing, cap);
    root.append(figure);
    grid.append(root);
  });

  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  if (headNodes.length) wrap.append(buildSectionHead(headNodes));
  wrap.append(grid);
  block.replaceChildren(wrap);
}
