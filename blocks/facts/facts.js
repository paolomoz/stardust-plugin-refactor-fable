/**
 * facts — compact route-facts strip. One row per fact: cell has a <strong> value
 * and following text as the label (or two cells value|label).
 */
export default function decorate(block) {
  const rows = [...block.children];
  const strip = document.createElement('div'); strip.className = 'facts-strip';
  rows.forEach((row) => {
    const cells = [...row.children];
    const item = document.createElement('div'); item.className = 'fact';
    const strong = row.querySelector('strong');
    let value = ''; let label = '';
    if (cells.length >= 2) { value = cells[0].textContent.trim(); label = cells[1].textContent.trim(); }
    else if (strong) { value = strong.textContent.trim(); label = row.textContent.replace(value, '').trim(); }
    else { value = row.textContent.trim(); }
    const b = document.createElement('b'); b.textContent = value; item.append(b);
    if (label) { const s = document.createElement('span'); s.textContent = label; item.append(s); }
    strip.append(item);
  });
  const inner = document.createElement('div'); inner.className='facts-inner'; inner.append(strip);
  block.replaceChildren(inner);
}
