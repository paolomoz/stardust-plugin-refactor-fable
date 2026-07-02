/**
 * chips — terminal-chip links (See Also). Head (h2) as DEFAULT CONTENT.
 * Rows: each cell holds a link; rendered as a $-prompted mono chip.
 */
export default async function decorate(block) {
  const links = [...block.querySelectorAll('a')];
  const row = document.createElement('div'); row.className = 'chip-row';
  links.forEach((a) => {
    a.classList.add('term-chip');
    a.innerHTML = `<span class="prompt">$</span> ${a.textContent.trim()}`;
    row.append(a);
  });
  block.replaceChildren(row);
}
