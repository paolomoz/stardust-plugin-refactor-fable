export default function decorate(block){
  const row=block.firstElementChild;
  if(row){row.classList.add('hero-row');const [copy,media]=row.children;
    if(copy)copy.classList.add('hero-copy');if(media)media.classList.add('hero-media');
    const h1=copy&&copy.querySelector('h1');
    if(h1){const p=h1.previousElementSibling;if(p&&p.tagName==='P'&&!p.querySelector('a'))p.classList.add('eyebrow');}
  }
  function rv(els){if(matchMedia("(prefers-reduced-motion:reduce)").matches){els.forEach(e=>e.classList.add("in"));return;}const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}}),{threshold:0.12,rootMargin:"0px 0px -6% 0px"});els.forEach(e=>{e.classList.add("reveal");io.observe(e);});}
  rv([...block.querySelectorAll('.hero-copy,.hero-media')]);
}
