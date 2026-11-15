(() => {
  'use strict';
  document.addEventListener('DOMContentLoaded',()=> {
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    const fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
    const visible=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('is-on-screen',entry.isIntersecting)),{rootMargin:'35px'});
    const watch=el=>visible.observe(el);

    document.querySelectorAll('main h2, #mobile-menu a, .photo-product-name, .season-name, .producto-name, .menu-category-nav a').forEach(heading=> {
      function dress() {
        if(heading.querySelector('.title-magnet')) return;
        const source=heading.cloneNode(true);
        source.querySelectorAll('br').forEach(br=>br.replaceWith('\u0000'));
        const lines=source.textContent.split('\u0000').map(line=>line.replace(/\s+/g,' ').trim());
        const content=lines.join(' ');
        const magnet=document.createElement('span');magnet.className='title-magnet';magnet.setAttribute('aria-hidden','true');
        const air=document.createElement('span');air.className='title-air';
        let index=0;
        lines.forEach((line,lineIndex)=> {
          if(lineIndex)air.append(document.createElement('br'));
          line.split(' ').forEach((word,wordIndex)=> {
            if(wordIndex)air.append(document.createTextNode(' '));
            const group=document.createElement('span');group.className='live-word';
            Array.from(word).forEach(char=> {
              const span=document.createElement('span');span.className='live-letter';
              span.textContent=char;span.style.setProperty('--letter-i',index++);group.append(span);
            });
            air.append(group);
          });
        });
        magnet.append(air);heading.replaceChildren(magnet);heading.setAttribute('aria-label',content);
      }
      dress();watch(heading);
      new MutationObserver(dress).observe(heading,{childList:true});
      if(fine) {
        heading.addEventListener('pointermove',event=> {
          if(reduced.matches) return;
          const rect=heading.getBoundingClientRect();
          heading.style.setProperty('--title-x',`${((event.clientX-rect.left)/rect.width-.5)*8}px`);
          heading.style.setProperty('--title-y',`${((event.clientY-rect.top)/rect.height-.5)*5}px`);
        });
        heading.addEventListener('pointerleave',()=> {heading.style.removeProperty('--title-x');heading.style.removeProperty('--title-y');});
      }
    });

    const sleep=()=>document.documentElement.classList.toggle('obaia-paused',document.hidden);
    document.addEventListener('visibilitychange',sleep);sleep();

    // One small gesture at a time, only while the visitor can see it.
    let hopTimer=0;
    const inView=element=> {
      const rect=element.getBoundingClientRect();
      return rect.width>0 && rect.height>0 && rect.bottom>110 && rect.top<innerHeight-45;
    };
    function pop(element,className,order=0) {
      if(element.classList.contains(className)) return;
      element.style.setProperty('--hop-order',order);
      element.classList.add(className);
      element.addEventListener('animationend',()=>element.classList.remove(className),{once:true});
    }
    function planHop(delay=3000+Math.random()*2000) {
      clearTimeout(hopTimer);
      if(!reduced.matches)hopTimer=setTimeout(littleHop,delay);
    }
    function littleHop() {
      const menuOpen=document.documentElement.classList.contains('menu-open');
      if(document.hidden || document.documentElement.matches('.obaia-arriving,.obaia-leaving') || document.querySelector('dialog[open],.micro-hop-letter')) {
        planHop(1500);return;
      }
      const selector=menuOpen ? '#mobile-menu a' : '.ab-title,main h2,.photo-product-name,.season-name,.producto-name,.menu-category-nav a';
      const headings=[...document.querySelectorAll(selector)].filter(inView);
      if(headings.length) {
        const heading=headings[Math.floor(Math.random()*headings.length)];
        const words=[...heading.querySelectorAll('.live-word')];
        const word=words.length ? words[Math.floor(Math.random()*words.length)] : heading;
        const letters=word.querySelectorAll('.ab-ch,.live-letter');
        letters.forEach((letter,index)=>pop(letter,'micro-hop-letter',index));
      }
      planHop();
    }
    reduced.addEventListener('change',()=>planHop());
    planHop(4000);

    // The official fruit appears briefly in a different visible place each time.
    const greetings=[];
    const places=[
      ['#navbar .nav-logo','logo'],['.menu-category-nav','categories'],
      ['.category-note','note'],['.productos-header,.resenas-header,.historia-text','heading'],
      ['.section-visual,.historia-img-wrap,.producto-img-wrap,.season-img-wrap','photo'],
      ['.footer-grid','footer']
    ];
    places.forEach(([selector,kind])=>document.querySelectorAll(selector).forEach(host=> {
      if(getComputedStyle(host).position==='static')host.style.position='relative';
      const fruit=document.createElement('span');fruit.className=`obaia-wave obaia-wave--${kind}`;
      fruit.setAttribute('aria-hidden','true');
      const image=document.createElement('img');image.alt='';image.width=32;image.height=40;
      image.src=`./assets/brand/mascota-oficial${kind==='photo' ? '-cream' : ''}.svg`;
      fruit.append(image);host.append(fruit);greetings.push(fruit);
      fruit.addEventListener('animationend',()=>fruit.classList.remove('is-waving'));
    }));
    let waveTimer=0,lastGreeting=null;
    let nextLogoAt=Date.now()+30000;
    const planWave=()=> {
      clearTimeout(waveTimer);
      if(!reduced.matches)waveTimer=setTimeout(greet,2000+Math.random()*2000);
    };
    function greet() {
      const busy=document.documentElement.matches('.obaia-arriving,.obaia-leaving,.menu-open');
      if(!document.hidden && !busy && !document.querySelector('dialog[open]')) {
        const available=greetings.filter(fruit=> {
          if(fruit.classList.contains('obaia-wave--logo') && Date.now()<nextLogoAt) return false;
          const box=fruit.getBoundingClientRect();
          const top=fruit.classList.contains('obaia-wave--logo') ? 5 : 108;
          return box.width>0 && box.top>top && box.bottom<innerHeight-10 && box.left>5 && box.right<innerWidth-5;
        });
        const other=available.filter(fruit=>fruit!==lastGreeting);
        const pool=other.length ? other : available;
        if(pool.length) {
          lastGreeting=pool[Math.floor(Math.random()*pool.length)];
          if(lastGreeting.classList.contains('obaia-wave--logo')) nextLogoAt=Date.now()+60000;
          lastGreeting.classList.add('is-waving');
        }
      }
      planWave();
    }
    reduced.addEventListener('change',()=> {
      greetings.forEach(fruit=>fruit.classList.remove('is-waving'));planWave();
    });
    planWave();

  });
})();
