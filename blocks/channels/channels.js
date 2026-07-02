/**
 * channels — install channel cards. Head (h2 + lede) as DEFAULT CONTENT above.
 * Rows: key | title | description (may contain links) | tag.
 * Description preserves inline HTML (links survive — #48 decode-defensive).
 */
export default async function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const grid = document.createElement('div'); grid.className = 'channel-grid';
  rows.forEach((row) => {
    const cells = [...row.querySelectorAll(':scope > div')];
    const key = (cells[0]?.textContent || '').trim();
    const title = (cells[1]?.textContent || '').trim();
    const descHTML = cells[2]?.innerHTML || '';
    const tag = (cells[3]?.textContent || '').trim();
    if (!title) return;
    const card = document.createElement('div'); card.className = 'channel';
    card.innerHTML = `<p class="key">${key}</p><h3>${title}</h3><p>${descHTML}</p>${tag ? `<span class="tag">${tag}</span>` : ''}`;
    grid.append(card);
  });
  block.replaceChildren(grid);
}
