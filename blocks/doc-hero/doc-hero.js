/**
 * doc-hero — docs lead: eyebrow ("Set up"), the page's single <h1>
 * ("Your first redesign, end to end." — amber-deep italic on "end to end."
 * rides an <em>, which DA preserves), and the captured lede.
 *
 * Authoring rows (classified by content, never by index — #48/#79):
 *   - the cell holding the heading -> <h1> (promoted if authored lower)
 *   - text cell BEFORE the heading -> eyebrow (short mono kicker)
 *   - text cell AFTER the heading  -> lede (inline markup preserved)
 * Text is read per CELL, not querySelectorAll('p') — the pipeline unwraps
 * the <p> in single-text cells (#79).
 */

function inlineSource(cell) {
  const kids = [...cell.children];
  if (kids.length === 1 && kids[0].matches('p')) return kids[0];
  return cell;
}

export default async function decorate(block) {
  const wrap = document.createElement('div');
  wrap.className = 'prose-col';

  const heading = block.querySelector('h1, h2, h3');
  let seenHeading = false;

  block.querySelectorAll(':scope > div > div').forEach((cell) => {
    if (heading && cell.contains(heading)) {
      let h1 = heading;
      if (heading.tagName !== 'H1') {
        h1 = document.createElement('h1');
        h1.append(...heading.childNodes); // unwrap, never nest headings (#55)
      }
      wrap.append(h1);
      seenHeading = true;
      return;
    }
    const text = cell.textContent.trim();
    if (!text) return;
    if (!seenHeading) {
      const eyebrow = document.createElement('span');
      eyebrow.className = 'eyebrow';
      eyebrow.textContent = text;
      wrap.append(eyebrow);
    } else {
      const lede = document.createElement('p');
      lede.className = 'lede';
      lede.append(...inlineSource(cell).childNodes);
      wrap.append(lede);
    }
  });

  block.replaceChildren(wrap);
}
