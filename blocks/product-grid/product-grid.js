export default function decorate(block){
  [...block.children].forEach(row=>{row.classList.add('prod');const [media,body]=row.children;
    if(media)media.classList.add('ph');
    if(body){body.classList.add('pb');const p=body.querySelector('p');if(p)p.classList.add('badge');const v=document.createElement('span');v.className='view';v.textContent='View product →';body.appendChild(v);}
    const link=row.querySelector('a[href]');if(link){row.addEventListener('click',()=>{location.href=link.getAttribute('href');});row.style.cursor='pointer';}
  });
  function rv(els){if(matchMedia("(prefers-reduced-motion:reduce)").matches){els.forEach(e=>e.classList.add("in"));return;}const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}}),{threshold:0.12,rootMargin:"0px 0px -6% 0px"});els.forEach(e=>{e.classList.add("reveal");io.observe(e);});}
  rv([...block.children]);
}
