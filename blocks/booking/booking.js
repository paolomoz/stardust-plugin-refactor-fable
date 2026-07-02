/**
 * booking — floated crimson flight-search card. Heading read from the first
 * cell; fields are the captured widget's fixed labels (visual form, no submit).
 */
const FIELDS = [
  ['Flying from', 'text', 'London (LHR)'],
  ['Flying to', 'text', 'New York (JFK)'],
  ['Journey', 'select', ['Round trip', 'One way', 'Multi-city']],
  ['When', 'text', 'Add dates'],
  ['Who', 'select', ['1 person', '2 people', '3 people', '4+ people']],
];
export default function decorate(block) {
  const heading = block.textContent.trim() || 'So, where next?';
  const card = document.createElement('div'); card.className = 'booking-card';
  const h = document.createElement('h2'); h.textContent = heading; card.append(h);
  const grid = document.createElement('div'); grid.className = 'booking-grid';
  FIELDS.forEach(([label, type, val], i) => {
    const f = document.createElement('div'); f.className = 'field';
    const id = `bk-${i}`;
    const lab = document.createElement('label'); lab.setAttribute('for', id); lab.textContent = label;
    let ctrl;
    if (type === 'select') { ctrl = document.createElement('select');
      val.forEach((o) => { const op = document.createElement('option'); op.textContent = o; ctrl.append(op); }); }
    else { ctrl = document.createElement('input'); ctrl.type = 'text'; ctrl.placeholder = val; }
    ctrl.id = id; f.append(lab, ctrl); grid.append(f);
  });
  const sub = document.createElement('div'); sub.className = 'booking-submit';
  const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'btn btn-primary'; btn.textContent = 'Search flights';
  sub.append(btn); grid.append(sub);
  card.append(grid);
  const wrap = document.createElement('div'); wrap.className = 'booking-wrap'; wrap.append(card);
  block.replaceChildren(wrap);
}
