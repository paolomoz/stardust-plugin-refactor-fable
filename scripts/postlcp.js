// Static-fragment chrome loader (stardust:deploy Step 6 model).
// Hand-written because author-kit@main drifted to a block-based header/footer
// (postlcp did loadBlock(header)); this restores the static-fragment contract
// the deploy skill assumes: fetch fragments/{header,footer}.html and inject via
// innerHTML, setting the host element's class so `header.header`/`footer.footer`
// root selectors in the fragment CSS match.

async function loadStaticFragment(el, name) {
  if (!el) return;
  try {
    const resp = await fetch(`/fragments/${name}.html`);
    if (!resp.ok) return;
    const html = await resp.text();
    el.className = name; // so header.header / footer.footer match
    el.innerHTML = html;
    el.dataset.status = 'decorated';
  } catch (e) {
    /* chrome is non-critical; never block the page on it */
  }
}

export default async function loadPostLCP() {
  const header = document.querySelector('header');
  const footer = document.querySelector('footer');
  await Promise.all([
    loadStaticFragment(header, 'header'),
    loadStaticFragment(footer, 'footer'),
  ]);
}
