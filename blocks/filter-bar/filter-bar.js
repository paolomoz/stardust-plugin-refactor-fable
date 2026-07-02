export default function decorate(block){
  const row=block.firstElementChild;const cells=row?[...row.children]:[];
  const count=cells[0]?cells[0].textContent.trim():'';
  const chipsSrc=cells[1]?[...cells[1].querySelectorAll('li')].map(li=>li.textContent.trim()):[];
  block.textContent='';
  const bar=document.createElement('div');bar.className='fb-inner';
  bar.innerHTML='<span class="fb-count">'+count+'</span><div class="fb-chips" role="group" aria-label="Refine by"></div>';
  const chipsWrap=bar.querySelector('.fb-chips');
  (chipsSrc.length?chipsSrc:['All']).forEach((c,i)=>{const b=document.createElement('button');b.className='fb-chip';b.type='button';b.textContent=c;if(i===0)b.setAttribute('aria-pressed','true');b.addEventListener('click',()=>{chipsWrap.querySelectorAll('.fb-chip').forEach(x=>x.removeAttribute('aria-pressed'));b.setAttribute('aria-pressed','true');});chipsWrap.appendChild(b);});
  block.appendChild(bar);
}
