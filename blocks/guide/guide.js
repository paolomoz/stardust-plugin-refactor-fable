/**
 * guide — docs prose/code section on the cream ground. ONE block, four
 * variants (same content pattern, per the SAFE-DEFAULT exception):
 *   guide install | guide shortcut | guide flow | guide step
 *
 * Section head (ENCODE contract): the eyebrow + <h2> are authored as
 * DEFAULT CONTENT in the section, before the block — eyebrow as a
 * <strong>-only paragraph, heading as a real <h2>. decorate() reabsorbs
 * them (block.closest('.block-content').previousElementSibling, matching
 * .default-content AND .default-content-wrapper) so the decorated DOM is
 * identical to the migrated page. In-block head rows are the back-compat
 * fallback.
 *
 * Block rows — ONE row per unit, classified by content, never by index
 * (#48/#62), text read per CELL (#79):
 *   - cell of <code> lines (one <code> per line; a &nbsp;-only <code> is a
 *     blank separator line)          -> ink-deep code panel. Copy button is
 *     rendered only when every non-blank line carries a prompt glyph
 *     ($ or ›); the copy payload strips the glyphs (critique C1). A single
 *     line > 70 chars renders pre-wrap (F-003, the Step-2 example); other
 *     panels no-wrap with a right fade cue + visible thin scrollbar (F-010).
 *   - cell with a <ul>/<ol>          -> fact chip row (role=group)
 *   - cell that is entirely an <em>  -> confirmation beat (mono amber-deep)
 *   - cell led by a <strong> with trailing text -> amber-tinted callout
 *   - anything else                  -> prose paragraph(s); a short credit
 *     line built around a single link renders as .fine
 *
 * Jump-menu anchor: the block id derives from the eyebrow (slugified:
 * "Main flow" -> main-flow, "Step 1" -> step-1) or, when the section has
 * no eyebrow (install), from the variant class.
 * Copy confirmation is text-only + announced via a polite status region
 * (C3); aria-label swaps and reverts after 1.5s.
 */

const PROMPT_RE = /^[$›]\s?/; // "$ " or "› "

function normText(s) {
  return s.replace(/\u00a0/g, ' ').trim();
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function isCodeCell(cell) {
  const codes = [...cell.querySelectorAll('code')];
  if (!codes.length) return false;
  const codeText = codes.map((c) => c.textContent).join('').replace(/[\s\u00a0]+/g, '');
  const cellText = cell.textContent.replace(/[\s\u00a0]+/g, '');
  return codeText === cellText;
}

function getStatusRegion() {
  let status = document.getElementById('copy-status');
  if (!status) {
    status = document.createElement('div');
    status.id = 'copy-status';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    status.style.cssText = 'position:absolute;width:1px;height:1px;margin:-1px;padding:0;border:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;';
    document.body.append(status);
  }
  return status;
}

function wireCopy(btn, panel) {
  btn.addEventListener('click', () => {
    const pre = panel.querySelector('pre');
    const text = panel.dataset.copy || (pre ? pre.textContent : '');
    const fallbackCopy = () => {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
      } catch (e) {
        // no-op — clipboard unavailable
      }
      document.body.removeChild(ta);
    };
    const confirmState = () => {
      const original = btn.textContent;
      const originalLabel = btn.getAttribute('aria-label');
      const status = getStatusRegion();
      btn.textContent = 'copied';
      btn.setAttribute('aria-label', 'Copied to clipboard');
      btn.classList.add('is-copied');
      status.textContent = '';
      setTimeout(() => {
        status.textContent = 'Copied to clipboard';
      }, 30);
      setTimeout(() => {
        btn.textContent = original;
        if (originalLabel) btn.setAttribute('aria-label', originalLabel);
        btn.classList.remove('is-copied');
        status.textContent = '';
      }, 1500);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(confirmState, () => {
        fallbackCopy();
        confirmState();
      });
    } else {
      fallbackCopy();
      confirmState();
    }
  });
}

function buildCodeBlock(cell) {
  const lines = [...cell.querySelectorAll('code')].map((c) => normText(c.textContent));
  const nonBlank = lines.filter((l) => l);
  const wrapMode = lines.length === 1 && lines[0].length > 70;

  const panel = document.createElement('div');
  panel.className = `code-block ${wrapMode ? 'code-block-wrap' : 'code-block-scroll'}`;

  const pre = document.createElement('pre');
  if (!wrapMode) pre.setAttribute('tabindex', '0'); // keyboard-scrollable (C5)
  const code = document.createElement('code');
  code.textContent = lines.join('\n');
  pre.append(code);

  const copyable = nonBlank.length > 0 && nonBlank.every((l) => PROMPT_RE.test(l));
  if (copyable) {
    panel.dataset.copy = lines.map((l) => l.replace(PROMPT_RE, '')).join('\n');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'copy-btn';
    btn.textContent = 'copy';
    btn.setAttribute('aria-label', nonBlank.length > 1 ? 'Copy commands' : 'Copy command');
    panel.append(btn, pre);
    wireCopy(btn, panel);
  } else {
    panel.append(pre);
  }
  return panel;
}

function buildChips(list) {
  const row = document.createElement('div');
  row.className = 'chip-row';
  row.setAttribute('role', 'group');
  row.setAttribute('aria-label', 'Key facts');
  list.querySelectorAll('li').forEach((li) => {
    const chip = document.createElement('span');
    chip.className = 'chip';
    chip.textContent = li.textContent.trim();
    row.append(chip);
  });
  return row;
}

function inlineSource(cell) {
  const kids = [...cell.children];
  if (kids.length === 1 && kids[0].matches('p')) return kids[0];
  return cell;
}

function buildCallout(cell) {
  const callout = document.createElement('div');
  callout.className = 'callout';
  const p = document.createElement('p');
  p.append(...inlineSource(cell).childNodes);
  callout.append(p);
  return callout;
}

function buildProse(cell) {
  const kids = [...cell.children];
  const allParas = kids.length > 0 && kids.every((el) => el.matches('p'));
  let paras = kids;
  if (!allParas) {
    const p = document.createElement('p');
    p.append(...cell.childNodes);
    paras = [p];
  }
  paras.forEach((p) => {
    const text = p.textContent.trim();
    const links = p.querySelectorAll('a');
    const residual = links.length === 1 ? text.replace(links[0].textContent.trim(), '').trim() : text;
    if (links.length === 1 && text.length <= 40 && residual.length <= 12) {
      p.classList.add('fine'); // short credit line ("Built on impeccable.")
    }
  });
  return paras;
}

function reabsorbHead(block) {
  const head = { eyebrow: '', heading: null };
  const prev = block.closest('.block-content')?.previousElementSibling;
  if (!prev) return head;
  if (!(prev.matches('.default-content') || prev.matches('.default-content-wrapper'))) return head;
  const heading = prev.querySelector('h1, h2, h3');
  const strongP = [...prev.children].find((el) => {
    const strong = el.querySelector('strong');
    return strong && el.textContent.trim() === strong.textContent.trim();
  });
  if (heading) {
    head.heading = heading;
    heading.remove();
  }
  if (strongP) {
    head.eyebrow = strongP.textContent.trim();
    strongP.remove();
  }
  if (!prev.textContent.trim()) prev.remove();
  return head;
}

export default async function decorate(block) {
  const head = reabsorbHead(block);
  let eyebrowText = head.eyebrow;
  let headingEl = head.heading;
  const body = [];

  block.querySelectorAll(':scope > div > div').forEach((cell) => {
    const h = cell.querySelector('h1, h2, h3');
    if (h) {
      // back-compat: in-block heading row
      if (!headingEl) headingEl = h;
      return;
    }
    if (isCodeCell(cell)) {
      body.push(buildCodeBlock(cell));
      return;
    }
    const list = cell.querySelector('ul, ol');
    if (list) {
      body.push(buildChips(list));
      return;
    }
    const text = cell.textContent.trim();
    if (!text) return;
    const em = cell.querySelector('em');
    if (em && em.textContent.trim() === text) {
      const beat = document.createElement('p');
      beat.className = 'confirm-beat';
      beat.textContent = text;
      body.push(beat);
      return;
    }
    const strong = cell.querySelector('strong');
    if (strong) {
      const strongText = strong.textContent.trim();
      if (strongText === text && !headingEl && !body.length && !eyebrowText) {
        eyebrowText = text; // back-compat: in-block eyebrow row before the heading
        return;
      }
      if (text.startsWith(strongText) && text.length > strongText.length) {
        body.push(buildCallout(cell));
        return;
      }
    }
    body.push(...buildProse(cell));
  });

  const wrap = document.createElement('div');
  wrap.className = 'prose-col';
  if (eyebrowText) {
    const eyebrow = document.createElement('span');
    eyebrow.className = 'eyebrow';
    eyebrow.textContent = eyebrowText;
    wrap.append(eyebrow);
  }
  if (headingEl) {
    let h2 = headingEl;
    if (h2.tagName !== 'H2') {
      h2 = document.createElement('h2');
      h2.append(...headingEl.childNodes); // unwrap, never nest headings (#55)
    }
    wrap.append(h2);
  }
  wrap.append(...body);

  const variant = [...block.classList].find((c) => c !== 'guide' && c !== 'block');
  const id = eyebrowText ? slugify(eyebrowText) : variant;
  if (id && !document.getElementById(id)) block.id = id;

  block.replaceChildren(wrap);
}
