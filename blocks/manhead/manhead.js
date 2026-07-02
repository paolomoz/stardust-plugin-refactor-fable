/**
 * manhead — man-page masthead. Rows: eyebrow ($ man git) | <h1> | tagline | meta.
 */
export default async function decorate(block) {
  const cells = [...block.querySelectorAll(':scope > div > div')];
  const eyebrow = (cells[0]?.textContent || '').trim();
  const headingCell = cells.find((c) => c.querySelector('h1,h2,h3')) || cells[1];
  const tagline = (cells[2]?.textContent || '').trim();
  const meta = (cells[3]?.textContent || '').trim();

  const wrap = document.createElement('div'); wrap.className = 'manhead-wrap';
  if (eyebrow) wrap.innerHTML += `<p class="man-eyebrow"><span class="prompt">$</span> ${eyebrow.replace(/^\$\s*/, '')}</p>`;
  const h1 = document.createElement('h1');
  const inner = headingCell?.querySelector('h1,h2,h3') || headingCell;
  if (inner) h1.append(...inner.childNodes);
  wrap.append(h1);
  if (tagline) wrap.innerHTML += `<p class="tagline">${tagline}</p>`;
  if (meta) wrap.innerHTML += `<p class="meta">${meta}</p>`;
  block.replaceChildren(wrap);
}
