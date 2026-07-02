/**
 * terminal — a terminal-chrome code panel (synopsis, examples). Head (h2) as DEFAULT CONTENT.
 * Row 1 cell = panel title; remaining <p> lines = body. Line classify:
 *   "$ ..." = command (green, dim prompt), "#" = comment (dim), else default green.
 */
export default async function decorate(block) {
  const cells = [...block.querySelectorAll(':scope > div > div')];
  const title = (cells[0]?.textContent || '').trim();
  const lineNodes = [];
  cells.slice(1).forEach((c) => {
    const ps = [...c.querySelectorAll('p')];
    if (ps.length) ps.forEach((p) => lineNodes.push(p.textContent.trim()));
    else if (c.textContent.trim()) lineNodes.push(c.textContent.trim());
  });

  const term = document.createElement('div'); term.className = 'terminal';
  const bar = document.createElement('div'); bar.className = 'terminal-bar';
  bar.innerHTML = `<i></i><i></i><i></i><span class="terminal-title">${title || 'slicc'}</span>`;
  const body = document.createElement('div'); body.className = 'terminal-body';
  lineNodes.forEach((t) => {
    const line = document.createElement('p');
    if (t.startsWith('$')) { line.className = 'cmd'; line.innerHTML = `<span class="prompt">$</span> ${t.replace(/^\$\s*/, '')}`; }
    else if (t.startsWith('#')) { line.className = 'cmt'; line.textContent = t; }
    else { line.className = 'out-green'; line.textContent = t; }
    body.append(line);
  });
  term.append(bar, body);
  block.replaceChildren(term);
}
