/**
 * logos — icon grid (app integrations / provider logos). Authoring:
 *   one row per logo: cell 1 = domain (e.g. github.com), cell 2 (optional) = display name.
 * Icons are built in JS from logo.dev (browser-fetched at runtime, not DA-ingested — #67).
 * Section head (heading + lede) is authored as DEFAULT CONTENT above the block.
 */
const TOKEN = 'pk_fqquVikyRFi-PSqljX8djw';

export default async function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const ul = document.createElement('ul');
  ul.className = 'logo-grid';
  rows.forEach((row) => {
    const cells = [...row.querySelectorAll(':scope > div')];
    const domain = (cells[0]?.textContent || '').trim();
    if (!domain) return;
    const name = (cells[1]?.textContent || '').trim() || domain;
    const li = document.createElement('li');
    const img = document.createElement('img');
    img.src = `https://img.logo.dev/${domain}?token=${TOKEN}&format=webp&retina=true&size=80`;
    img.alt = name;
    img.width = 44; img.height = 44; img.loading = 'lazy';
    li.append(img);
    ul.append(li);
  });
  block.replaceChildren(ul);
}
