(() => {
 'use strict';
 document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.menu-category-nav');
  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const sections = links.map(a => document.querySelector(a.hash));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const aliases = {acais:'bowls',desayunos:'salados',cafes:'bebidas',tostadas:'salados'};
  let scheduled = false;
  function offset() { return parseFloat(getComputedStyle(nav).top) + nav.offsetHeight + 20; }
  function measure() {
   const header=document.querySelector('#nav-inner');
   document.body.style.setProperty('--category-top',`${Math.ceil(header.getBoundingClientRect().bottom)+16}px`);
   document.body.style.setProperty('--menu-offset', `${offset()}px`);
  }
  function sync() {
   scheduled = false;
   let active = sections[0];
   sections.forEach(section => { if (section.getBoundingClientRect().top <= offset()+30) active=section; });
   links.forEach(link => {
    if(link.hash === '#'+active.id) link.setAttribute('aria-current','location');
    else link.removeAttribute('aria-current');
   });
  }
  function go(id, push=false) {
   const section=document.getElementById(aliases[id] || id);
   if(!section) return;
   measure();
   if(push) history.pushState(null,'','#'+section.id);
   section.querySelector('h2')?.focus({preventScroll:true});
   window.scrollTo({top:Math.max(0,scrollY+section.getBoundingClientRect().top-offset()),behavior:reduced.matches?'instant':'smooth'});
  }
  links.forEach(link=>link.addEventListener('click',event=>{
   if(event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
   event.preventDefault();go(link.hash.slice(1),true);
  }));
  addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(sync);}},{passive:true});
  addEventListener('resize',measure,{passive:true});
  addEventListener('popstate',()=>{if(location.hash)go(location.hash.slice(1));});
  addEventListener('load',()=>{measure();if(location.hash)go(location.hash.slice(1));},{once:true});
  new ResizeObserver(measure).observe(nav);
  new ResizeObserver(measure).observe(document.querySelector('#navbar'));
  measure();sync();
 });
})();
