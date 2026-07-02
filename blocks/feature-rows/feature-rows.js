/**
 * feature-rows — "Here's where it gets weird." Differentiation rows.
 * Head (h2) authored as DEFAULT CONTENT above. Rows: statement | elaboration.
 */
export default async function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const wrap = document.createElement('div'); wrap.className = 'fr-wrap';
  rows.forEach((row) => {
    const cells = [...row.querySelectorAll(':scope > div')];
    const statement = (cells[0]?.textContent || '').trim();
    const elab = (cells[1]?.textContent || '').trim();
    if (!statement) return;
    const r = document.createElement('div'); r.className = 'fr-row';
    r.innerHTML = `<span class="marker" aria-hidden="true">&gt;_</span><div><h3>${statement}</h3><p>${elab}</p></div>`;
    wrap.append(r);
  });
  block.replaceChildren(wrap);
}
