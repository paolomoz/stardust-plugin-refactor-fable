/**
 * demo — product demo video in terminal chrome. Authoring:
 *   row 1: a link to the .mp4 (href) with the caption text
 *   row 2 (optional): caption line
 * Reproduces the captured hero video: muted loop, native controls (no autoplay),
 * <noscript> fallback link, prefers-reduced-motion honored (no autoplay used).
 */
export default async function decorate(block) {
  const link = block.querySelector('a');
  const src = link ? link.getAttribute('href') : '';
  const caption = link ? link.textContent.trim() : '';
  const rows = [...block.querySelectorAll(':scope > div > div')];
  const escapeCell = rows.length > 1 ? rows[rows.length - 1] : null;
  const escapeHTML = escapeCell ? escapeCell.innerHTML.trim() : '';
  const escapeText = escapeCell ? escapeCell.textContent.trim() : '';

  const wrap = document.createElement('div');
  wrap.className = 'demo-wrap';
  wrap.id = 'video';

  const frame = document.createElement('div');
  frame.className = 'video-frame terminal';
  const bar = document.createElement('div');
  bar.className = 'terminal-bar';
  bar.innerHTML = '<i></i><i></i><i></i><span class="terminal-title">$ slicc demo</span>';
  frame.append(bar);

  if (src) {
    const video = document.createElement('video');
    video.src = src;
    video.controls = true;
    video.muted = true;
    video.loop = true;
    video.setAttribute('playsinline', '');
    video.preload = 'metadata';
    video.setAttribute('aria-label', 'SLICC product demo video');
    frame.append(video);
    const ns = document.createElement('noscript');
    ns.innerHTML = `<a href="${src}">Watch the demo video</a>`;
    frame.append(ns);
  }
  wrap.append(frame);

  const cap = document.createElement('div');
  cap.className = 'video-caption';
  cap.innerHTML = `<span>${caption || '$ slicc demo — silent'}</span>`;
  if (escapeText && escapeText !== caption) {
    const esc = document.createElement('span');
    esc.innerHTML = escapeHTML;
    cap.append(esc);
  }
  wrap.append(cap);

  block.replaceChildren(wrap);
}
