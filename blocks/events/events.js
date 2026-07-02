/**
 * events — "Get Brain Freeze!" terminal-ledger of events. Head (h2 + lede) as DEFAULT CONTENT.
 * Rows: when (date · venue) | what (description).
 */
export default async function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const ledger = document.createElement('div'); ledger.className = 'event-ledger';
  rows.forEach((row) => {
    const cells = [...row.querySelectorAll(':scope > div')];
    const when = (cells[0]?.textContent || '').trim();
    const what = (cells[1]?.textContent || '').trim();
    if (!when && !what) return;
    const r = document.createElement('div'); r.className = 'event-row';
    r.innerHTML = `<p class="when">${when}</p><p class="what">${what}</p>`;
    ledger.append(r);
  });
  block.replaceChildren(ledger);
}
