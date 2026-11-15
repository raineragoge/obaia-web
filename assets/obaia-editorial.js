/* OBAIA · detalles editoriales inspirados en la referencia de Claude.
   Complemento aislado: no modifica el funcionamiento original de la web. */
(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = (v, min=0, max=1) => Math.min(max, Math.max(min,v));

  // Inspirado en el ritmo de revelado de la referencia de Claude,
  // sin alterar la maquetación, los carruseles ni las transiciones existentes.
  function initEditorialDetails() {
    if (reduced.matches || !('IntersectionObserver' in window)) return;

    // Las imágenes se descubren como una cortinilla editorial, solo al entrar
    // por primera vez en el viewport. Nada queda oculto si falla JavaScript.
    const photos = document.querySelectorAll(
      '.season-img-wrap, .producto-img-wrap, .historia-img-wrap'
    );
    const photoObserver = new IntersectionObserver(entries => {
      entries.forEach(({target, isIntersecting}) => {
        if (!isIntersecting) return;
        target.classList.add('editorial-photo-show');
        photoObserver.unobserve(target);
      });
    }, {rootMargin:'0px 0px -55px 0px', threshold:0.08});
    photos.forEach((el, index) => {
      // No tapamos fotografías que ya están a la vista al abrir la página.
      if (el.getBoundingClientRect().top < innerHeight * .78) return;
      el.classList.add('editorial-photo-reveal', 'editorial-photo-wait');
      el.style.setProperty('--editorial-delay', ((index % 3) * 70) + 'ms');
      photoObserver.observe(el);
    });

    // Entrada acompasada de las reseñas. Su contenido sigue siendo estático,
    // accesible con teclado y legible sin animaciones.
    const reviews = document.querySelector('.resenas-grid');
    if (reviews && reviews.getBoundingClientRect().top > innerHeight * .8) {
      reviews.classList.add('editorial-quotes');
      [...reviews.children].forEach((el, i) => el.style.setProperty('--quote-index', i));
      const reviewObserver = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        reviews.classList.add('editorial-quotes-in');
        reviewObserver.disconnect();
      }, {threshold:.12});
      reviewObserver.observe(reviews);
    }

    // Indicador mínimo de recorrido para el carrusel que ya existía:
    // no se convierte el scroll vertical en horizontal ni se bloquea la página.
    const slider = document.querySelector('.season-slider');
    if (slider) {
      const indicator = document.createElement('div');
      indicator.className = 'editorial-slider-progress';
      indicator.setAttribute('aria-hidden', 'true');
      const fill = document.createElement('span');
      indicator.append(fill);
      slider.insertAdjacentElement('afterend', indicator);
      const updateProgress = () => {
        const distance = slider.scrollWidth - slider.clientWidth;
        indicator.hidden = distance < 10;
        fill.style.transform = 'scaleX(' + (distance < 10 ? 1 : clamp(slider.scrollLeft / distance)) + ')';
      };
      slider.addEventListener('scroll', updateProgress, {passive: true});
      addEventListener('resize', updateProgress, {passive: true});
      new ResizeObserver(updateProgress).observe(slider);
      updateProgress();
    }

    // Un poco de profundidad en la fotografía de historia, sin desplazar
    // textos ni sobrescribir las transformaciones hover del diseño original.
    const story = document.querySelector('.historia-img-wrap');
    const storyImage = story?.querySelector('img');
    const desktop = matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)');
    if (story && storyImage && CSS.supports('translate', '0px 0px')) {
      let visible = false, frame = 0;
      const paint = () => {
        frame = 0;
        if (!desktop.matches || !visible || document.hidden) {
          storyImage.style.translate = '';
          return;
        }
        const rect = story.getBoundingClientRect();
        const shift = clamp((innerHeight / 2 - rect.top - rect.height / 2) / innerHeight, -.5, .5) * 22;
        storyImage.style.translate = '0px ' + shift.toFixed(1) + 'px';
      };
      const requestPaint = () => {
        if (!frame) frame = requestAnimationFrame(paint);
      };
      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        requestPaint();
      });
      observer.observe(story);
      addEventListener('scroll', requestPaint, {passive: true});
      addEventListener('resize', requestPaint, {passive: true});
      desktop.addEventListener('change', requestPaint);
      requestPaint();
    }

    reduced.addEventListener('change', () => {
      if (!reduced.matches) return;
      photoObserver.disconnect();
      document.querySelectorAll('.editorial-photo-wait').forEach(el => {
        el.classList.remove('editorial-photo-wait');
      });
      reviews?.classList.add('editorial-quotes-in');
    });
  }

  document.addEventListener('DOMContentLoaded', initEditorialDetails);
})();
