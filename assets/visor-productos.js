(() => {
  'use strict';
  document.addEventListener('DOMContentLoaded',() => {
    const dialog=document.getElementById('product-photo-dialog');
    if(!dialog) return;
    const photos=window.OBAIA_PRODUCT_PHOTOS || {};
    const triggers=[...document.querySelectorAll('[data-product-photo]')];
    const image=dialog.querySelector('[data-photo-image]');
    const title=dialog.querySelector('[data-photo-title]');
    const description=dialog.querySelector('[data-photo-description]');
    const category=dialog.querySelector('[data-photo-category]');
    const closeButton=dialog.querySelector('[data-photo-close]');
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    const strings={
      es:{hint:'Toca un producto para ver su foto',cue:'Ver foto',open:'Ver foto de',close:'Cerrar foto',note:'Sugerencia de presentación.',error:'No se ha podido cargar la foto.'},
      en:{hint:'Tap a product to see its photo',cue:'View photo',open:'View photo of',close:'Close photo',note:'Serving suggestion.',error:'The photo could not be loaded.'},
      eu:{hint:'Ukitu produktua argazkia ikusteko',cue:'Ikusi argazkia',open:'Ikusi argazkia:',close:'Itxi argazkia',note:'Aurkezpen-proposamena.',error:'Ezin izan da argazkia kargatu.'}
    };
    let selected=null,returnFocus=null,previousOverflow='',closing=false,closeTimer=0;
    const text=()=>strings[document.documentElement.lang.slice(0,2)] || strings.es;
    const nameOf=trigger=>trigger.closest('.product-item').querySelector('.photo-product-name').textContent.trim();
    function syncLanguage() {
      const copy=text();
      triggers.forEach(trigger=> {
        trigger.querySelector('.product-photo-label').textContent=copy.cue;
        trigger.setAttribute('aria-label',`${copy.open} ${nameOf(trigger)}${trigger.dataset.bestSeller ? ', Best seller' : ''}`);
      });
      closeButton.setAttribute('aria-label',copy.close);
      dialog.querySelector('[data-photo-note]').textContent=copy.note;
      dialog.querySelector('[data-photo-error]').textContent=copy.error;
    }
    syncLanguage();
    new MutationObserver(syncLanguage).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    function revealPhoto() { dialog.classList.add('image-ready');dialog.classList.remove('image-error'); }
    image.addEventListener('load',revealPhoto);
    image.addEventListener('error',()=>dialog.classList.add('image-error'));
    function open(trigger) {
      const product=photos[trigger.dataset.productPhoto];
      if(!product) return;
      clearTimeout(closeTimer);closing=false;selected=trigger;returnFocus=trigger;
      title.textContent=nameOf(trigger);
      const row=trigger.closest('.product-item');
      description.textContent=(row.querySelector('.product-desc') || row.querySelector('.translation-text'))?.textContent.trim() || '';
      category.textContent=trigger.closest('.menu-section').querySelector('h2').textContent.trim();
      image.alt=nameOf(trigger);
      dialog.classList.remove('image-ready','image-error');
      image.src=product.src;
      if(image.complete && image.naturalWidth) revealPhoto();
      previousOverflow=document.body.style.overflow;
      document.body.style.overflow='hidden';
      dialog.showModal();
      requestAnimationFrame(()=>dialog.classList.add('is-open'));
      closeButton.focus({preventScroll:true});
    }
    function close() {
      if(closing||!dialog.open) return;
      closing=true;dialog.classList.remove('is-open');
      closeTimer=setTimeout(()=>dialog.close(),reduced.matches?0:320);
    }
    dialog.addEventListener('close',()=> {
      document.body.style.overflow=previousOverflow;closing=false;selected=null;
      returnFocus?.focus({preventScroll:true});
    });
    closeButton.addEventListener('click',close);
    dialog.addEventListener('cancel',event=>{event.preventDefault();close();});
    dialog.addEventListener('click',event=> {
      if(event.target!==dialog) return;
      const box=dialog.getBoundingClientRect();
      if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom) close();
    });
    const prefetched=new Set();
    function preload(trigger) {
      const photo=photos[trigger.dataset.productPhoto];
      if(!photo||prefetched.has(photo.src)) return;
      prefetched.add(photo.src);const asset=new Image();asset.src=photo.src;
    }
    triggers.forEach(trigger=> {
      trigger.addEventListener('click',()=>open(trigger));
      trigger.addEventListener('pointerenter',()=>preload(trigger),{once:true});
      trigger.addEventListener('focus',()=>preload(trigger),{once:true});
    });
  });
})();
