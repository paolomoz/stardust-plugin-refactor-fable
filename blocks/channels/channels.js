/**
 * channels — install channel cards. Head (h2 + lede) as DEFAULT CONTENT above.
 * Rows: key | title | description | tag.
 */
export default async function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const grid = document.createElement('div'); grid.className = 'channel-grid';
  rows.forEach((row) => {
    const c = [...row.querySelectorAll(':scope > div')].map((x) => x.textContent.trim());
    if (!c[1]) return;
    const card = document.createElement('div'); card.className = 'channel';
    card.innerHTML = `<p class="key">${c[0] || ''}</p><h3>${c[1]}</h3><p>${c[2] || ''}</p>${c[3] ? `<span class="tag">${c[3]}</span>` : ''}`;
    grid.append(card);
  });
  block.replaceChildren(grid);
  block.closest('.section')?.querySelector('.default-content')?.classList.add('channels-head');
}
