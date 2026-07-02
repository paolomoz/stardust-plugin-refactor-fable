export default function decorate(block){
  const row=block.firstElementChild;if(row){row.classList.add('sf-row');const [media,copy]=row.children;
    if(media)media.classList.add('sf-media');if(copy){copy.classList.add('sf-copy');const h=copy.querySelector('h2,h3');if(h){const p=h.previousElementSibling;if(p&&p.tagName==='P'&&!p.querySelector('a'))p.classList.add('eyebrow');}}}
  function rv(els){if(matchMedia("(prefers-reduced-motion:reduce)").matches){els.forEach(e=>e.classList.add("in"));return;}const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}}),{threshold:0.12,rootMargin:"0px 0px -6% 0px"});els.forEach(e=>{e.classList.add("reveal");io.observe(e);});}
  rv([...block.querySelectorAll('.sf-media,.sf-copy')]);
}
