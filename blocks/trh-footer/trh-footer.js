export default function decorate(block) {
  const cell = block.querySelector(':scope > div > div') || block;
  const kids = [...cell.children];
  const cols = document.createElement('div'); cols.className = 'trh-footer__cols';
  const brand = document.createElement('div'); brand.className = 'trh-footer__brand';
  const bar = document.createElement('div'); bar.className = 'trh-footer__bar';
  let col = null; let brandStarted = false;
  kids.forEach((k) => {
    const t = k.textContent || '';
    if (k.tagName !== 'H3' && /★|Donor Privacy|Policies|All Rights Reserved|Four Star/i.test(t)) { bar.append(k); return; }
    if (k.querySelector && k.querySelector('img')) { brand.append(k); brandStarted = true; return; }
    if (k.tagName === 'H3') { col = document.createElement('div'); col.append(k); cols.append(col); return; }
    if (brandStarted) { brand.append(k); return; }
    if (col) col.append(k);
  });
  if (brand.children.length) cols.append(brand);
  const inner = document.createElement('div'); inner.className = 'trh-footer__in';
  inner.append(cols); if (bar.children.length) inner.append(bar);
  cell.replaceChildren(inner);
}
