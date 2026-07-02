/**
 * fact-panel — cream deploy band + pharmacy-insert key-facts panel
 * (data-section "static-html-fact-panel").
 *
 * Authoring rows (head stays in-table — this block's rows aren't one
 * repeating unit, so the section head is part of its structure):
 *   deck line ("Stardust ships static HTML. <em>Take it anywhere.</em>")
 *   <h2> section title
 *   one row per deploy column block: <h3> + paragraphs (a paragraph that is
 *     only a link renders as the arrow link-row)
 *   cmd row: <strong>One-shot command</strong> + <code>/stardust:uplift…</code>
 *     (the block adds the copy button)
 *   one row per FACT: mono label cell | value cell (What/Price/License/
 *     Maker/Requires/Output)
 *
 * Decode: row-driven — 2-cell rows are fact rows (#48 classify-by-content);
 * single-cell rows classify by h2/h3/code/strong; `Label: value` single-cell
 * facts parse as a delimiter fallback (#50).
 */

function buildChip(commandText) {
  const chip = document.createElement('span');
  chip.className = 'cmd-chip';
  const code = document.createElement('code');
  code.textContent = commandText;
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'copy-btn';
  btn.textContent = 'copy';
  btn.addEventListener('click', () => {
    const confirmState = () => {
      btn.textContent = 'copied';
      btn.classList.add('is-copied');
      setTimeout(() => {
        btn.textContent = 'copy';
        btn.classList.remove('is-copied');
      }, 1500);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(commandText).then(confirmState, confirmState);
    } else {
      confirmState();
    }
  });
  chip.append(code, btn);
  return chip;
}

const FACT_KEYS = /^(what|price|license|maker|requires|output)$/i;

export default async function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  if (!rows.length) return;

  const headNodes = [];
  const deployBlocks = [];
  const facts = [];
  let cmdLabel = '';
  let cmdCode = null;
  let seenH2 = false;
  let currentDeploy = null;

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2 && cells[0].textContent.trim()) {
      facts.push({ label: cells[0].textContent.trim(), value: cells[1] });
      return;
    }
    const cell = cells[0] || row;
    /* mixed bare-text + inline cells (the deck line) read as ONE paragraph */
    const bareText = [...cell.childNodes]
      .some((n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
    let nodes;
    if (cell.children.length && !bareText) {
      nodes = [...cell.children];
    } else {
      const p = document.createElement('p');
      p.append(...cell.childNodes);
      nodes = [p];
    }
    nodes.forEach((node) => {
      const h2 = node.matches('h2') ? node : node.querySelector('h2');
      const h3 = node.matches('h3, h4') ? node : node.querySelector('h3, h4');
      const code = node.matches('code') ? node : node.querySelector('code');
      const strong = node.matches('strong') ? node : node.querySelector('strong');
      const text = node.textContent.trim();
      if (h2) {
        headNodes.push(h2);
        seenH2 = true;
      } else if (h3) {
        currentDeploy = { title: h3, body: [] };
        deployBlocks.push(currentDeploy);
      } else if (code) {
        cmdCode = code.textContent.trim();
      } else if (strong && strong.textContent.trim() === text) {
        cmdLabel = text;
      } else if (!text) {
        /* skip empties */
      } else if (FACT_KEYS.test(text.split(':')[0].trim()) && text.includes(':')) {
        /* #50 delimiter fallback: "Price: $0 — free" */
        const idx = text.indexOf(':');
        const value = document.createElement('div');
        value.textContent = text.slice(idx + 1).trim();
        facts.push({ label: text.slice(0, idx).trim(), value });
      } else if (currentDeploy) {
        currentDeploy.body.push(node);
      } else if (!seenH2) {
        headNodes.unshift(node); /* deck precedes the h2 */
      } else {
        headNodes.push(node);
      }
    });
  });

  /* section head */
  const head = document.createElement('div');
  head.className = 'section-head';
  headNodes.forEach((node) => {
    if (node.matches('h2')) {
      head.append(node);
      return;
    }
    const p = node.matches('p') ? node : document.createElement('p');
    if (p !== node) p.append(...node.childNodes);
    p.className = 'deck';
    head.append(p);
  });

  /* deploy column */
  const col = document.createElement('div');
  col.className = 'deploy-col';
  deployBlocks.forEach((d) => {
    const box = document.createElement('div');
    box.className = 'deploy-block';
    box.append(d.title);
    d.body.forEach((node) => {
      const a = node.querySelector('a');
      if (a && a.textContent.trim() === node.textContent.trim()) {
        node.classList.add('link-row');
      }
      box.append(node);
    });
    col.append(box);
  });
  if (cmdCode) {
    const cmd = document.createElement('div');
    cmd.className = 'deploy-cmd';
    if (cmdLabel) {
      const label = document.createElement('span');
      label.className = 'stub-label';
      label.textContent = cmdLabel;
      cmd.append(label);
    }
    cmd.append(buildChip(cmdCode));
    col.append(cmd);
  }

  /* facts aside */
  const aside = document.createElement('aside');
  aside.className = 'facts';
  aside.setAttribute('aria-label', 'Stardust key facts');
  const title = document.createElement('p');
  title.className = 'fact-title';
  title.textContent = 'Stardust — key facts';
  const dl = document.createElement('dl');
  facts.forEach((fact) => {
    const factRow = document.createElement('div');
    factRow.className = 'fact-row';
    const dt = document.createElement('dt');
    dt.textContent = fact.label;
    const dd = document.createElement('dd');
    dd.append(...fact.value.childNodes);
    factRow.append(dt, dd);
    dl.append(factRow);
  });
  aside.append(title, dl);

  const grid = document.createElement('div');
  grid.className = 'deploy-grid';
  grid.append(col);
  if (facts.length) grid.append(aside);

  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  wrap.append(head, grid);
  block.classList.add('cream');
  block.replaceChildren(wrap);
}
