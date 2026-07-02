/**
 * capabilities — 2x2 capability cards beside a terminal panel (light section).
 * Section head (h2 + lede) authored as DEFAULT CONTENT above the block.
 * Card rows: key | title | description.
 */
export default async function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const cards = [];
  rows.forEach((row) => {
    const cells = [...row.querySelectorAll(':scope > div')];
    if (cells.length < 2) return;
    cards.push({
      key: (cells[0]?.textContent || '').trim(),
      title: (cells[1]?.textContent || '').trim(),
      desc: (cells[2]?.textContent || '').trim(),
    });
  });

  const split = document.createElement('div');
  split.className = 'cap-split';

  const grid = document.createElement('div');
  grid.className = 'cap-grid';
  cards.forEach((c) => {
    const card = document.createElement('div');
    card.className = 'cap-card';
    card.innerHTML = `<p class="key">${c.key}</p><h3>${c.title}</h3><p>${c.desc}</p>`;
    grid.append(card);
  });
  split.append(grid);

  const term = document.createElement('div');
  term.className = 'terminal';
  const bar = document.createElement('div'); bar.className = 'terminal-bar';
  bar.innerHTML = '<i></i><i></i><i></i><span class="terminal-title">$ slicc — what you can do</span>';
  const body = document.createElement('div'); body.className = 'terminal-body';
  body.innerHTML = cards.map((c) => `<div><span class="prompt">$</span> ${c.title.toLowerCase().replace(/\s+/g, '-')}</div>`).join('')
    + '<div class="out"># everything runs in your browser</div>';
  term.append(bar, body);
  split.append(term);

  block.replaceChildren(split);
  block.closest('.section')?.classList.add('light-section');
}
