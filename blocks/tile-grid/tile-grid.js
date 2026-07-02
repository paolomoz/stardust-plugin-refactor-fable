export default function decorate(block){
  [...block.children].forEach(row=>{row.classList.add('tile');
    const cells=[...row.children];const media=cells[0];const label=cells[1];
    if(media)media.classList.add('tile-media');
    if(label)label.classList.add('tile-label');
    const link=row.querySelector('a[href]');
    if(link){row.setAttribute('data-href',link.getAttribute('href'));row.addEventListener('click',()=>{location.href=link.getAttribute('href');});}
  });
  function rv(els){if(matchMedia("(prefers-reduced-motion:reduce)").matches){els.forEach(e=>e.classList.add("in"));return;}const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}}),{threshold:0.12,rootMargin:"0px 0px -6% 0px"});els.forEach(e=>{e.classList.add("reveal");io.observe(e);});}
  rv([...block.children]);
}
