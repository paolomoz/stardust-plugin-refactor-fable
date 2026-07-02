/**
 * waffle — "Under the waffle hood." prose beside a terminal code panel (light section).
 * Head (h2 + lede) authored as DEFAULT CONTENT above the block.
 * Rows: subhead | prose paragraphs ... | a final cell of code lines (one <p> per line).
 */
export default async function decorate(block) {
  const cells = [...block.querySelectorAll(':scope > div > div')];
  const split = document.createElement('div');
  split.className = 'waffle-split';

  const prose = document.createElement('div');
  prose.className = 'waffle-prose';
  // last cell with multiple lines / <code> becomes the terminal; the rest are prose
  const codeCell = cells.find((c) => c.querySelectorAll('p').length > 2 || c.querySelector('code'));
  cells.forEach((c) => {
    if (c === codeCell) return;
    const nodes = [...c.children].length ? [...c.children] : [Object.assign(document.createElement('p'), { textContent: c.textContent.trim() })];
    nodes.forEach((n, i) => {
      if (n.matches?.('h1,h2,h3,h4') || (i === 0 && cells.indexOf(c) === 0)) {
        const h3 = document.createElement('h3'); h3.append(...n.childNodes); prose.append(h3);
      } else { prose.append(n); }
    });
  });
  split.append(prose);

  if (codeCell) {
    const term = document.createElement('div'); term.className = 'terminal';
    const bar = document.createElement('div'); bar.className = 'terminal-bar';
    bar.innerHTML = '<i></i><i></i><i></i><span class="terminal-title">$ slicc — waffle shell</span>';
    const body = document.createElement('div'); body.className = 'terminal-body';
    [...codeCell.querySelectorAll('p')].forEach((p) => {
      const line = document.createElement('div');
      const t = p.textContent.trim();
      if (t.startsWith('#')) line.className = 'cmt';
      line.textContent = t; body.append(line);
    });
    term.append(bar, body);
    split.append(term);
  }
  block.replaceChildren(split);
  block.closest('.section')?.classList.add('light-section');
}
