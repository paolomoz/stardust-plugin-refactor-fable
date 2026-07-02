/**
 * docs-nav — docs sidebar: fixed ink rail >= 1024px, static top bar with a
 * CSS-only details/summary jump menu < 1024px (captured docs template
 * signature; F-004 space-safe static text, F-010 CSS-only interactivity).
 *
 * Authoring rows (classified by content, never by index — #48):
 *   - plain-text row before any link row      -> rail mark ("Stardust · Docs")
 *   - row with <a> + trailing <code>NN</code> -> section nav item (the mono
 *     number rides a <code> tag — DA preserves it; ENCODE contract)
 *   - row with a #hash <a>                    -> "On this page" jump link
 *   - plain-text row after link rows          -> sigil line (dust-55)
 *
 * aria-current="page" lands on the item whose href pathname matches the
 * current page; when none matches (e.g. the local QA harness path), the
 * first same-origin item is the docs entry page and gets it instead.
 * Text is read per CELL (#79), and anchors are moved, not re-created, so
 * authored spacing ("Get started") survives verbatim.
 */

const SIGIL_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 0l2.7 9.3L24 12l-9.3 2.7L12 24l-2.7-9.3L0 12l9.3-2.7z" fill="#e8b95e"></path></svg>';

function normalizePath(pathname) {
  return pathname.replace(/\.html$/, '').replace(/\/index$/, '').replace(/\/$/, '') || '/';
}

function classifyCells(block) {
  const out = {
    mark: '', sigil: '', items: [], jumps: [],
  };
  block.querySelectorAll(':scope > div > div').forEach((cell) => {
    const link = cell.querySelector('a');
    if (!link) {
      const text = cell.textContent.trim();
      if (!text) return;
      if (!out.items.length && !out.jumps.length && !out.mark) out.mark = text;
      else out.sigil = text;
      return;
    }
    const num = cell.querySelector('code');
    const href = link.getAttribute('href') || '';
    if (!num && href.startsWith('#')) out.jumps.push(link);
    else out.items.push({ link, num: num ? num.textContent.trim() : '' });
  });
  return out;
}

function buildItems(items) {
  const wrap = document.createElement('div');
  wrap.className = 'side-items';
  const here = normalizePath(window.location.pathname);
  let current = null;
  let firstLocal = null;
  items.forEach(({ link, num }) => {
    const item = document.createElement('a');
    item.className = 'side-item';
    item.href = link.getAttribute('href');
    item.append(...link.childNodes);
    if (num) {
      const numEl = document.createElement('span');
      numEl.className = 'side-num';
      numEl.textContent = num;
      item.append(' ', numEl);
    }
    const url = new URL(item.href, window.location.href);
    if (url.origin === window.location.origin) {
      if (!firstLocal) firstLocal = item;
      if (normalizePath(url.pathname) === here) current = item;
    }
    wrap.append(item);
  });
  const active = current || firstLocal;
  if (active) active.setAttribute('aria-current', 'page');
  return wrap;
}

function buildJump(jumps) {
  const details = document.createElement('details');
  details.className = 'side-jump';
  const summary = document.createElement('summary');
  summary.textContent = 'On this page';
  const list = document.createElement('div');
  list.className = 'jump-list';
  jumps.forEach((a) => list.append(a));
  details.append(summary, list);
  return details;
}

export default async function decorate(block) {
  const {
    mark, sigil, items, jumps,
  } = classifyCells(block);

  const nav = document.createElement('nav');
  nav.className = 'side-nav';
  nav.setAttribute('aria-label', 'Docs');

  const top = document.createElement('div');
  top.className = 'side-top';
  if (mark) {
    const markEl = document.createElement('p');
    markEl.className = 'side-mark';
    markEl.innerHTML = SIGIL_SVG;
    const label = document.createElement('span');
    label.textContent = mark;
    markEl.append(label);
    top.append(markEl);
  }
  if (items.length) top.append(buildItems(items));
  nav.append(top);

  if (jumps.length) nav.append(buildJump(jumps));

  if (sigil) {
    const sigilEl = document.createElement('p');
    sigilEl.className = 'side-sigil';
    sigilEl.textContent = sigil;
    nav.append(sigilEl);
  }

  block.replaceChildren(nav);
}
