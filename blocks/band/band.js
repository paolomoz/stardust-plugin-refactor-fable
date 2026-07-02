/* Festool band block — full-width bands (stage / listing-hero / heritage / service / guidance).
   Variant comes from the block class (e.g. "band stage"). Content is authored as cells;
   this rebuilds the styled DOM the foundation CSS targets. */
export default function decorate(block) {
  const variant = [...block.classList].find((c) => c !== 'band' && c !== 'block') || 'stage';
  const cells = [...block.querySelectorAll(':scope > div > div')];

  // pull the background image (first picture/img) out of the flow
  let bg = null;
  const img = block.querySelector('picture, img');
  if (img) {
    const pic = img.closest('picture') || img;
    bg = pic.cloneNode(true);
    const bgImg = bg.tagName === 'IMG' ? bg : bg.querySelector('img');
    if (bgImg) bgImg.className = 'band__bg';
    else bg.classList.add('band__bg');
    pic.remove();
  }

  // gather remaining flow content (headings, paragraphs, links)
  const flow = [];
  cells.forEach((c) => { [...c.childNodes].forEach((n) => flow.push(n)); });

  const wrap = document.createElement('div');
  wrap.className = 'wrap';

  if (variant === 'service') {
    // first non-empty paragraph text is the roundel label ("Festool SERVICE")
    const pEls = flow.filter((n) => n.nodeType === 1 && n.tagName === 'P');
    const roundel = document.createElement('div');
    roundel.className = 'roundel';
    const label = (pEls[0] && pEls[0].textContent.trim()) || 'Festool SERVICE';
    const parts = label.split(/\s+/);
    roundel.innerHTML = `<span class="r1">${parts[0] || 'Festool'}</span><span class="r2">${parts.slice(1).join(' ') || 'SERVICE'}</span>`;
    if (pEls[0]) pEls[0].remove();
    const text = document.createElement('div');
    text.className = 'band__text';
    flow.forEach((n) => { if (n.parentNode !== roundel) text.appendChild(n); });
    styleLinks(text, variant);
    wrap.append(roundel, text);
  } else {
    const text = document.createElement('div');
    text.className = 'band__text';
    flow.forEach((n) => text.appendChild(n));
    styleLinks(text, variant);
    wrap.append(text);
  }

  block.textContent = '';
  if (bg) {
    block.append(bg);
    const scrim = document.createElement('span');
    scrim.className = 'band__scrim';
    scrim.setAttribute('aria-hidden', 'true');
    block.append(scrim);
  }
  block.append(wrap);
}

function styleLinks(container, variant) {
  const dark = variant !== 'service';
  const links = [...container.querySelectorAll('a')];
  links.forEach((a, i) => {
    // unwrap EDS button wrappers
    const p = a.closest('p');
    if (i === 0) {
      a.className = dark ? 'btn btn--on-dark' : 'btn btn--primary';
    } else {
      a.className = dark ? 'chev chev--on-dark' : 'chev';
    }
    if (p && (p.classList.contains('button-container') || p.children.length === 1)) {
      // keep links grouped in a cta row
      p.className = 'band__cta';
    }
  });
  // if links weren't in their own paragraphs, group them
  if (links.length && !container.querySelector('.band__cta')) {
    const cta = document.createElement('div');
    cta.className = 'band__cta';
    links.forEach((a) => cta.append(a));
    container.append(cta);
  }
}
