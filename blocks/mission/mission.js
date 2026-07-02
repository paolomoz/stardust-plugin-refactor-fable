/**
 * mission — orient all audiences (lede + 3 task tiles + secondary chips).
 *
 * Authoring rows:
 *   1. lede paragraph (mission statement, captured verbatim)
 *   2-4. one task link per row (single <a> cell) — rendered as icon-chip tiles
 *   5. secondary quick links (one cell, multiple <a>) — rendered as pills
 * Decode is tolerant of DA flattening: the lede is the first long link-free
 * text; the first three anchors are tasks; remaining anchors are chips.
 * Task icons are fixed decorative chrome mapped by task order.
 */

const TASK_ICONS = [
  // clinic
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 21V8l9-5 9 5v13"/><path d="M9 21v-6h6v6"/><path d="M12 9v4M10 11h4"/></svg>',
  // doctor
  '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M5 21c0-3.9 3.1-7 7-7s7 3.1 7 7"/></svg>',
  // index list
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h10"/></svg>',
];

function collectNodes(block) {
  const out = [];
  block.querySelectorAll(':scope > div > div').forEach((cell) => {
    const kids = [...cell.children];
    if (kids.length) out.push(...kids);
    else if (cell.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = cell.textContent.trim();
      out.push(p);
    }
  });
  return out.length ? out : [...block.children];
}

export default async function decorate(block) {
  const nodes = collectNodes(block);
  const lede = nodes.find((n) => n.matches('p') && !n.querySelector('a') && n.textContent.trim().length > 80);
  const anchors = nodes.flatMap((n) => (n.matches('a') ? [n] : [...n.querySelectorAll('a')]));
  const tasks = anchors.slice(0, 3);
  const chips = anchors.slice(3);

  const wrap = document.createElement('div');
  wrap.className = 'wrap';

  if (lede) {
    const p = document.createElement('p');
    p.className = 'lede';
    p.append(...lede.childNodes);
    wrap.append(p);
  }

  if (tasks.length) {
    const grid = document.createElement('div');
    grid.className = 'tasks-primary';
    tasks.forEach((a, i) => {
      const task = document.createElement('a');
      task.className = 'task';
      task.href = a.href;
      const chip = document.createElement('span');
      chip.className = 'chip-icon';
      chip.setAttribute('aria-hidden', 'true');
      chip.innerHTML = TASK_ICONS[i] || TASK_ICONS[0];
      task.append(chip, document.createTextNode(a.textContent.trim()));
      grid.append(task);
    });
    wrap.append(grid);
  }

  if (chips.length) {
    const row = document.createElement('div');
    row.className = 'tasks-secondary';
    chips.forEach((a) => row.append(a.cloneNode(true)));
    wrap.append(row);
  }

  block.replaceChildren(wrap);
}
