export default function decorate(block){
  const row=block.firstElementChild;if(row){row.classList.add('ch-row');const [main,cta]=row.children;
    if(main){main.classList.add('ch-main');const h1=main.querySelector('h1');if(h1){const c=h1.nextElementSibling;if(c&&c.tagName==='P')c.classList.add('ch-count');}}
    if(cta)cta.classList.add('ch-cta');}
  function rv(els){if(matchMedia("(prefers-reduced-motion:reduce)").matches){els.forEach(e=>e.classList.add("in"));return;}const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}}),{threshold:0.12,rootMargin:"0px 0px -6% 0px"});els.forEach(e=>{e.classList.add("reveal");io.observe(e);});}
  rv([...block.querySelectorAll('.ch-main,.ch-cta')]);
}
