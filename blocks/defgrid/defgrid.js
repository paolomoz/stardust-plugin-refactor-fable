/**
 * defgrid — man command/option definition grid. Head (h2) as DEFAULT CONTENT.
 * Rows: term | description. Term is a mono green command; any <...>/[...]/-flag
 * argument tail is dimmed by splitting on the first space after the base word.
 */
export default async function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const grid = document.createElement('div'); grid.className = 'defgrid-inner';
  rows.forEach((row) => {
    const cells = [...row.querySelectorAll(':scope > div')];
    const term = (cells[0]?.textContent || '').trim();
    const desc = (cells[1]?.textContent || '').trim();
    if (!term) return;
    const t = document.createElement('div'); t.className = 'term';
    const m = term.match(/^(\S+)(\s+.*)?$/);
    if (m && m[2]) {
      t.append(document.createTextNode(m[1]));
      const arg = document.createElement('span'); arg.className = 'arg'; arg.textContent = m[2];
      t.append(arg);
    } else {
      t.textContent = term;
    }
    const d = document.createElement('div'); d.className = 'desc'; d.textContent = desc;
    grid.append(t, d);
  });
  block.replaceChildren(grid);
}
