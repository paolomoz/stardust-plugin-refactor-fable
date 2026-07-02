export default function decorate(block){
  const row=block.firstElementChild;if(row){row.classList.add('st-row');const [a,b]=row.children;if(a)a.classList.add('st-lead');if(b)b.classList.add('st-side');}
  function rv(els){if(matchMedia("(prefers-reduced-motion:reduce)").matches){els.forEach(e=>e.classList.add("in"));return;}const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}}),{threshold:0.12,rootMargin:"0px 0px -6% 0px"});els.forEach(e=>{e.classList.add("reveal");io.observe(e);});}
  rv([...block.querySelectorAll('.st-lead,.st-side')]);
}
