import { getMetadata } from './ak.js';

// Static header/footer fragments (stardust:deploy model) — hand-ported because
// the upstream author-kit runtime drifted to block-based chrome. Fragments are
// injected verbatim; they cannot run JS (CSS-only interactivity).
async function loadStaticFragment(name) {
  const el = document.querySelector(name);
  if (!el) return;
  const meta = getMetadata(name);
  if (meta === 'off') { el.remove(); return; }
  try {
    const resp = await fetch(`/fragments/${name}.html`);
    if (!resp.ok) return;
    const html = await resp.text();
    el.className = name; // so header.header / footer.footer root selectors match (#21)
    el.innerHTML = html;
    delete el.dataset.status;
  } catch (e) {
    // fragment unavailable — leave the element empty
  }
}

export default async function loadPostLCP() {
  await loadStaticFragment('header');
  await loadStaticFragment('footer');
}
