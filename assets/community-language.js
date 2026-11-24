(() => {
 const copy={
  '.community-kicker':['COMUNIDAD OBAIA','OBAIA COMMUNITY','OBAIA KOMUNITATEA'],
  '#community-title':['Tu próxima visita empieza aquí.','Your next visit starts here.','Zure hurrengo bisita hemen hasten da.'],
  '.community-copy > p:not(.community-kicker)':['Un espacio para quienes vuelven. Entra en nuestra comunidad y accede a los cupones de nuestro programa de fidelidad.','A place for those who come back. Join our community and access coupons from our loyalty programme.','Itzultzen direnentzako gunea. Sartu gure komunitatean eta eskuratu gure fidelizazio-programako kupoiak.'],
  '.community-cta':['Descubre tus cupones','Discover your coupons','Ezagutu zure kupoiak'],
  '.review-action > p':['¿Has compartido un momento con nosotros?','Have you spent a moment with us?','Gurekin une bat partekatu duzu?'],
  '.review-cta-label':['Déjanos tu reseña en Google','Leave us a Google review','Utzi zure iritzia Googlen'],
  '.review-picker > p':['Elige el local que has visitado:','Choose the location you visited:','Aukeratu bisitatu duzun lokala:']
 };
 document.addEventListener('DOMContentLoaded',()=>{
  let last='es';
  const update=()=>{
   const lang=document.documentElement.lang.slice(0,2);
   if(lang===last)return;last=lang;
   const i=lang==='en'?1:lang==='eu'?2:0;
   Object.entries(copy).forEach(([selector,texts])=>{const el=document.querySelector(selector);if(el)el.textContent=texts[i];});
  };
  update();new MutationObserver(update).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 });
})();
