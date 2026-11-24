(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = (v, min=0, max=1) => Math.min(max, Math.max(min,v));

  function initBowl() {
    const section = document.querySelector('.ab');
    if (!section) return;
    const menuStage=section.dataset.stage==='menu';
    const stage = section.querySelector('.ab-stage');
    const bowl = section.querySelector('[data-ab-bowl]');
    const title = section.querySelector('.ab-title');
    const mini = section.querySelector('[data-ab-mini]');
    function splitTitle() {
      let index = 0;
      section.querySelectorAll('[data-ab-split]').forEach(el => {
      const chars = Array.from(el.textContent);
      el.replaceChildren(...chars.map(char => {
        const span = document.createElement('span');
        span.className = 'ab-ch'; span.textContent = char;
        span.setAttribute('aria-hidden','true'); span.style.setProperty('--i',index++);
        return span;
      }));
      });
    }
    if(!menuStage) splitTitle();
    section.classList.add('ab-js');
    const enter=()=>requestAnimationFrame(() => requestAnimationFrame(() => section.classList.add('ab-in')));
    if(document.documentElement.classList.contains('obaia-arriving')) section.classList.add('ab-in');
    else if(document.querySelector('.fruit-intro') && !reduced.matches) addEventListener('obaia:home-reveal',enter,{once:true});
    else enter();

    function language() {
      const lang = document.documentElement.lang.slice(0,2);
      if(menuStage) {
        const copy=section.classList.contains('brunch-cup-hero') ? ['OBAIA','BRUNCH','OBAIA Brunch'] : ({es:['NUESTRA','CARTA','Nuestra carta'],en:['OUR','MENU','Our menu'],eu:['GURE','KARTA','Gure karta']})[lang] || ['NUESTRA','CARTA','Nuestra carta'];
        section.querySelectorAll('[data-menu-line]').forEach((el,i)=>el.textContent=copy[i]);
        title.setAttribute('aria-label',copy[2]);splitTitle();return;
      }
      if(mini) mini.textContent = ({es:'clásico',en:'classic',eu:'klasikoa'})[lang] || 'clásico';
      title.setAttribute('aria-label',({es:'Açaí Bowl clásico',en:'Classic açaí bowl',eu:'Açaí bowl klasikoa'})[lang] || 'Açaí Bowl clásico');
    }
    language();
    new MutationObserver(language).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});

    let distance=0, runway=1, current=0, target=0, frame=0;
    const turn=menuStage ? -17 : 22;
    function paint() {
      current += (target-current)*.16;
      if (Math.abs(target-current)<.0004) current=target;
      const ease = 1-Math.pow(1-current,1.7);
      bowl.style.transform = `translate3d(0,${(-distance*ease).toFixed(2)}px,0) rotate(${(turn*ease).toFixed(2)}deg) scale(${(1+.04*ease).toFixed(4)})`;
      title.style.transform = `translate3d(0,${(-18*ease).toFixed(2)}px,0)`;
      title.style.opacity = (1-.14*ease).toFixed(3);
      frame = current===target ? 0 : requestAnimationFrame(paint);
    }
    function scroll() {
      if (reduced.matches) return;
      target=clamp(-section.getBoundingClientRect().top/runway);
      if (!frame && current!==target) frame=requestAnimationFrame(paint);
    }
    function measure() {
      if (reduced.matches) {
        cancelAnimationFrame(frame); frame=0; current=target=0;
        section.style.height=''; section.style.marginBottom='';
        bowl.style.transform=''; title.style.transform=''; title.style.opacity='';
        return;
      }
      const stageHeight=stage.offsetHeight;
      const targetCenter=title.offsetTop+title.offsetHeight*.62;
      distance=Math.max(0,bowl.offsetTop+bowl.offsetHeight/2-targetCenter);
      const radians=Math.abs(turn)*Math.PI/180;
      const rotatedHeight=(bowl.offsetHeight*Math.cos(radians)+bowl.offsetWidth*Math.sin(radians))*1.04;
      // The transparent image has generous corners. Its visible silhouette,
      // measured at the final 22° rotation, ends .3203 image-widths below its
      // centre. Use that edge rather than the empty corners of the canvas.
      const visibleBottom=Number(bowl.dataset.motionBottom);
      const endBottom=targetCenter+(visibleBottom ? bowl.offsetWidth*visibleBottom*1.04 : rotatedHeight/2);
      const overlap=clamp(stageHeight-endBottom-22,0,stageHeight*.48);
      // Reserve only the distance used by the movement, and let the next section
      // occupy the space below the bowl instead of leaving an empty viewport.
      runway=Math.max(120,overlap+56);
      section.style.height=`${Math.round(stageHeight+runway)}px`;
      section.style.marginBottom=`${-Math.round(overlap)}px`;
      scroll();
    }
    addEventListener('scroll',scroll,{passive:true});
    addEventListener('resize',measure,{passive:true});
    addEventListener('load',measure,{once:true});
    reduced.addEventListener('change',measure);
    if (document.fonts) document.fonts.ready.then(measure);
    new ResizeObserver(measure).observe(stage);
    measure();
  }

  function initReveals() {
    const nodes = document.querySelectorAll('.section-content,.product-item');
    nodes.forEach((el,i) => {
      el.classList.add('motion-reveal');
      if (el.matches('.season-card,.product-item')) el.style.setProperty('--motion-delay',`${(i%3)*70}ms`);
    });
    document.querySelectorAll('main h2').forEach(el=>el.classList.add('motion-heading'));
    document.documentElement.classList.add('motion-ready');
    const observer = new IntersectionObserver(entries=>entries.forEach(entry=> {
      if(entry.isIntersecting) {entry.target.classList.add('motion-seen');observer.unobserve(entry.target);}
    }),{threshold:0,rootMargin:'0px 0px -32px 0px'});
    document.querySelectorAll('.motion-reveal,.motion-heading').forEach(el=>observer.observe(el));
  }

  function initGallery() {
    const slider=document.querySelector('.season-slider');
    if (!slider) return;
    slider.tabIndex=0; slider.setAttribute('role','region');
    slider.setAttribute('aria-label','Destacados de temporada');
    let start=0,left=0,dragging=false,moved=false;
    const available=()=>slider.scrollWidth>slider.clientWidth+8;
    const update=()=>slider.classList.toggle('is-draggable',available());
    new ResizeObserver(update).observe(slider);
    slider.addEventListener('pointerdown',e=> {
      if(e.pointerType!=='mouse'||e.button!==0||!available()) return;
      start=e.clientX; left=slider.scrollLeft; dragging=true;moved=false;
      slider.setPointerCapture(e.pointerId);
    });
    slider.addEventListener('pointermove',e=> {
      if(!dragging) return;
      if(Math.abs(e.clientX-start)>5) {moved=true;slider.classList.add('is-dragging');}
      if(moved) slider.scrollLeft=left-(e.clientX-start);
    });
    const release=()=>{dragging=false;slider.classList.remove('is-dragging');};
    slider.addEventListener('pointerup',release);slider.addEventListener('pointercancel',release);
    slider.addEventListener('click',e=>{if(moved) {e.preventDefault();moved=false;}},true);
    slider.addEventListener('keydown',e=> {
      if(!available()||!['ArrowLeft','ArrowRight'].includes(e.key)) return;
      e.preventDefault();
      slider.scrollBy({left:(e.key==='ArrowRight'?1:-1)*slider.clientWidth*.86,behavior:reduced.matches?'instant':'smooth'});
    });
    update();
  }

  function initMenu() {
    const button=document.getElementById('mobile-menu-btn');
    const menu=document.getElementById('mobile-menu');
    if(!button||!menu) return;
    const root=document.documentElement;
    const background=[document.querySelector('main'),document.querySelector('footer')].filter(Boolean);
    let open=false,timer,previousOverflow='';
    menu.setAttribute('aria-modal','true');
    menu.querySelectorAll('a').forEach((el,i)=>el.style.setProperty('--menu-i',i));
    function close(restoreFocus=true) {
      if(!open) return;
      open=false; root.classList.remove('menu-open');root.classList.add('menu-closing');
      button.setAttribute('aria-expanded','false');button.setAttribute('aria-label','Abrir menú de navegación');
      background.forEach(el=>el.inert=false);
      document.body.style.overflow=previousOverflow;
      if(restoreFocus) button.focus({preventScroll:true});
      clearTimeout(timer);timer=setTimeout(()=> {
        menu.classList.add('hidden');root.classList.remove('menu-closing');
      },reduced.matches?0:600);
    }
    function show() {
      clearTimeout(timer);open=true;root.classList.remove('menu-closing');
      menu.classList.remove('hidden');
      previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';
      background.forEach(el=>el.inert=true);
      button.setAttribute('aria-expanded','true');button.setAttribute('aria-label','Cerrar menú de navegación');
      requestAnimationFrame(()=>root.classList.add('menu-open'));
    }
    button.addEventListener('click',()=>open?close():show());
    menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>close(false)));
    document.addEventListener('keydown',e=> {
      if(!open) return;
      if(e.key==='Escape') {e.preventDefault();close();}
      if(e.key==='Tab') {
        const items=[button,...menu.querySelectorAll('a')];
        const index=items.indexOf(document.activeElement);
        if(e.shiftKey && index<=0) {e.preventDefault();items.at(-1).focus();}
        else if(!e.shiftKey && index===items.length-1) {e.preventDefault();button.focus();}
      }
    });
    addEventListener('resize',()=>{if(innerWidth>=768) close(false);},{passive:true});
    const home=document.querySelector('.nav-logo[role="button"]');
    home?.addEventListener('keydown',e=>{if(['Enter',' '].includes(e.key)){e.preventDefault();close(false);scrollTo({top:0,behavior:reduced.matches?'instant':'smooth'});}});
  }

  function startFruitIntro() {
    const panel=document.querySelector('.fruit-intro');
    if(!panel) return;
    if(!document.documentElement.classList.contains("home-intro-enabled")) { panel.remove(); return; }
    const stage=panel.querySelector('.fruit-pile');
    const percent=panel.querySelector('output');
    const cols=Math.max(3,Math.round(innerWidth/Math.min(innerHeight*.30,innerWidth*.32)));
    const cell=innerWidth/cols;
    const heights=Array(cols).fill(0);
    const rows=Math.max(3,Math.ceil(innerHeight*.87/cell));
    let frame=0;
    let revealed=false,covered=false;
    function reveal() {
      if(revealed) return;
      revealed=true;
      panel.remove();
      if(!reduced.matches) dispatchEvent(new Event('obaia:intro-arrival'));
      else document.documentElement.classList.remove('obaia-leaving','intro-transition-active');
      dispatchEvent(new Event('obaia:home-reveal'));
    }
    function finish() {
      reveal();
      cancelAnimationFrame(frame);
      panel.remove();
      reduced.removeEventListener('change',finish);
      removeEventListener('pagehide',finish);
    }
    if(reduced.matches) { finish();return; }
    reduced.addEventListener('change',finish);
    addEventListener('pagehide',finish);
    const total=rows*cols;
    for(let row=0;row<rows;row++) {
      const order=Array.from({length:cols},(_,i)=>i);
      for(let i=cols-1;i>0;i--) {
        const j=Math.floor(Math.random()*(i+1));
        [order[i],order[j]]=[order[j],order[i]];
      }
      order.forEach((col,step)=> {
        const index=row*cols+step;
        const size=cell*(.86+Math.random()*.27);
        const base=heights[col]-size*.05;
        heights[col]=base+size*.81;
        const logo=document.createElement('img');
        logo.src='./assets/brand/mascota-oficial.svg';
        logo.alt='';
        logo.style.cssText=`left:${(col+.42+Math.random()*.16)*cell-size/2}px;bottom:${base}px;width:${size}px`;
        stage.append(logo);
        const turn=Math.random()*50-25;
        logo.animate([
          {transform:`translateY(${base-innerHeight-size}px) rotate(${turn-35}deg)`,easing:'cubic-bezier(.5,.03,.9,.55)'},
          {transform:`translateY(0) rotate(${turn}deg)`,offset:.83,easing:'ease-out'},
          {transform:`translateY(-8px) rotate(${turn+3}deg)`,offset:.91,easing:'ease-in'},
          {transform:`translateY(0) rotate(${turn}deg)`}
        ],{delay:340+index/total*1120,duration:900,fill:'both'});
      });
    }
    const start=performance.now();
    function tick(now) {
      const elapsed=now-start;
      percent.textContent=Math.min(100,Math.floor(Math.max(0,elapsed-240)/16))+'%';
      if(elapsed>=2350 && !covered) {
        covered=true;
        document.documentElement.classList.add('intro-transition-active','obaia-leaving');
      }
      if(elapsed>=2810) reveal();
      if(elapsed>=3330) finish();
      else frame=requestAnimationFrame(tick);
    }
    frame=requestAnimationFrame(tick);
  }

  function initTransitions() {
    const root=document.documentElement;
    const wipe=document.querySelector('.obaia-wipe');
    const canonical=pathname=>pathname.replace(/\/index\.html$/,'/').replace(/\.html$/,'').replace(/\/+$/,'') || '/';
    const internalPage=url=>url.origin===location.origin && canonical(url.pathname)!==canonical(location.pathname) && (/\.html$/.test(url.pathname) || ['/', '/carta', '/brunch'].includes(canonical(url.pathname)));
    let frame=0, finishTimer=0;
    function cancelArrival() {
      cancelAnimationFrame(frame);
      clearTimeout(finishTimer);
      root.classList.remove('obaia-arriving','wipe-ready');
    }
    function reveal() {
      if(!root.classList.contains('obaia-arriving')) return;
      cancelArrival();
      root.classList.remove('intro-transition-active');
      dispatchEvent(new Event('obaia:arrived'));
    }
    function playArrival() {
      cancelArrival();
      root.classList.remove('obaia-leaving');
      if(reduced.matches || !wipe) return;
      root.classList.add('obaia-arriving');
      frame=requestAnimationFrame(()=> {
        frame=requestAnimationFrame(()=> {
          root.classList.add('wipe-ready');
          finishTimer=setTimeout(reveal,1500);
        });
      });
    }
    wipe?.addEventListener('animationend',event=> {
      if(event.target===wipe && event.animationName==='obaia-wipe-away') reveal();
    });
    if(root.classList.contains('obaia-arriving')) playArrival();
    addEventListener('obaia:intro-arrival',playArrival);
    addEventListener('pagehide',cancelArrival);
    addEventListener('pageshow',event=>{if(event.persisted) playArrival();});
    const warmed=new Set();
    document.querySelectorAll('a[href]').forEach(link=> {
      const warm=()=> {
        const url=new URL(link.href,location.href);url.hash='';
        if(!['http:','https:'].includes(url.protocol)||!internalPage(url)||warmed.has(url.href))return;
        warmed.add(url.href);const hint=document.createElement('link');hint.rel='prefetch';hint.href=url.href;document.head.append(hint);
      };
      link.addEventListener('pointerenter',warm,{once:true});link.addEventListener('focus',warm,{once:true});
    });
    document.addEventListener('click',event=> {
      const link=event.target.closest('a[href]');
      if(!link||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||link.target==='_blank'||link.hasAttribute('download')||reduced.matches) return;
      const next=new URL(link.href,location.href);
      if(!internalPage(next)) return;
      event.preventDefault();
      if(root.classList.contains('obaia-leaving'))return;
      if(root.classList.contains('obaia-arriving'))reveal();
      let navigated=false;
      const navigate=()=> {
        if(navigated)return;navigated=true;
        removeEventListener('pagehide',cancelNavigation);
        wipe?.removeEventListener('transitionend',covered);
        try{sessionStorage.setItem('obaia-transition',JSON.stringify({at:Date.now(),to:canonical(next.pathname)}));}catch{}
        location.assign(next.href);
      };
      const cancelNavigation=()=> {
        navigated=true;
        wipe?.removeEventListener('transitionend',covered);
      };
      addEventListener('pagehide',cancelNavigation,{once:true});
      const covered=event=>{if(event.target===wipe && event.propertyName==='transform')navigate();};
      // Navigate only once the original panel fully covers the page.
      wipe?.getBoundingClientRect();
      wipe?.addEventListener('transitionend',covered);
      root.classList.add('obaia-leaving');
      setTimeout(navigate,650);
    });
  }
  document.addEventListener('DOMContentLoaded',()=> {
    startFruitIntro();
    if(!document.body.classList.contains('menu-page')) {
      initBowl();initReveals();initGallery();initMenu();
    }
    initTransitions();
  });
})();
