/* New menu content uses the existing ES / EN / EU language selector. */
(() => {
 const copy = {
 'A tu manera':['Your way','Zure erara'],
 'Açaí bowls':['Açaí bowls','Açaí bowl-ak'],
 'Açaís':['Açaí','Açaía'],
 'Pequeño':['Small','Txikia'],'Mediano':['Medium','Ertaina'],'Grande':['Large','Handia'],
 '1 · Elige tu base':['1 · Choose your base','1 · Aukeratu oinarria'],
 'Açaí con guaraná':['Açaí with guarana','Açaía guaranarekin'],
 'Sin gluten':['Gluten free','Glutenik gabe'],
 'Overnight oat con chía':['Overnight oats with chia','Gauez beratutako oloa chiarekin'],
 '2 · Elige tu combo':['2 · Choose your combo','2 · Aukeratu konbinazioa'],
 'Plátano, mango, piña, granola.':['Banana, mango, pineapple, granola.','Platanoa, mangoa, anana, granola.'],
 'Plátano, kiwi, fresa, granola.':['Banana, kiwi, strawberry, granola.','Platanoa, kiwia, marrubia, granola.'],
 'Plátano, arándanos, fresa, granola.':['Banana, blueberries, strawberry, granola.','Platanoa, ahabiak, marrubia, granola.'],
 '3 · Salsa y topping':['3 · Sauce and topping','3 · Saltsa eta toppinga'],
 'Elige una salsa y un topping en nuestra barra de toppings.':['Choose one sauce and one topping at our toppings bar.','Aukeratu saltsa bat eta topping bat gure topping-barran.'],
 'Granola casera sin gluten':['Homemade gluten-free granola','Etxeko glutenik gabeko granola'],
 'Salsas caseras':['Homemade sauces','Etxeko saltsak'],
 'Granola casera sin gluten +1 € · Salsas caseras +1 €':['Homemade gluten-free granola +€1 · Homemade sauces +€1','Etxeko glutenik gabeko granola +1 € · Etxeko saltsak +1 €'],
 'Tostadas':['Toast','Tostadak'],
 'Hasta las 15 h · Pan de masa madre · Opción sin gluten':['Until 3 pm · Sourdough bread · Gluten-free option','15:00ak arte · Ore amako ogia · Glutenik gabeko aukera'],
 'Salmón':['Salmon','Izokina'],
 'Salmón ahumado, eneldo, lima, salsa tzatziki (pepino, ajo, menta, yogur griego, AOVE).':['Smoked salmon, dill, lime, tzatziki sauce (cucumber, garlic, mint, Greek yoghurt, extra virgin olive oil).','Izokin ketua, aneta, lima, tzatziki saltsa (pepinoa, baratxuria, menda, jogurt grekoa, oliba-olio birjina estra).'],
 'Jamón ibérico':['Iberian ham','Urdaiazpiko iberikoa'],
 'Tomate recién rallado, AOVE, rúcula.':['Freshly grated tomato, extra virgin olive oil, rocket.','Tomate birrindu berria, oliba-olio birjina estra, errukula.'],
 'Queso de cabra y miel':['Goat’s cheese and honey','Ahuntz-gazta eta eztia'],
 'Tomate cherry, nueces, boquerones, rúcula y lima.':['Cherry tomatoes, walnuts, anchovies, rocket and lime.','Cherry tomateak, intxaurrak, antxoak, errukula eta lima.'],
 'Aguacate':['Avocado','Ahuakatea'],
 'AOVE, sésamo, lima y rúcula.':['Extra virgin olive oil, sesame, lime and rocket.','Oliba-olio birjina estra, sesamoa, lima eta errukula.'],
 'Mantequilla':['Butter','Gurina'],'Con mermelada.':['With jam.','Marmeladarekin.'],
 'Pan con tomate':['Tomato toast','Ogia tomatearekin'],
 'Tomate recién rallado y AOVE.':['Freshly grated tomato and extra virgin olive oil.','Tomate birrindu berria eta oliba-olio birjina estra.'],
 'Extra: huevo o aguacate +2 €':['Extra: egg or avocado +€2','Gehigarria: arrautza edo ahuakatea +2 €'],
 'Yogur y fruta':['Yoghurt & fruit','Jogurta eta fruta'],
 'También para desayunar':['For breakfast, too','Gosaltzeko ere bai'],
 'Yogur griego':['Greek yoghurt','Jogurt grekoa'],
 'Compota de manzana bio, granola casera sin gluten, fruta fresca y salsa a elegir.':['Organic apple compote, homemade gluten-free granola, fresh fruit and your choice of sauce.','Sagar-konpota ekologikoa, etxeko glutenik gabeko granola, fruta freskoa eta aukerako saltsa.'],
 'Ensalada de frutas':['Fruit salad','Fruta-entsalada'],
 'Fruta fresca, concentrado de aloe vera bio, naranja exprimida y miel.':['Fresh fruit, organic aloe vera concentrate, squeezed orange and honey.','Fruta freskoa, aloe vera ekologikoaren kontzentratua, laranja-zukua eta eztia.'],
 'Cafés':['Coffee','Kafeak'],'Café y más':['Coffee & more','Kafea eta gehiago'],
 'Tu pausa, a tu gusto':['Your break, your way','Zure atsedenaldia, zure gustura'],
 'Espresso doble':['Double espresso','Espresso bikoitza'],
 'Café con leche':['Coffee with milk','Kafesnea'],
 'Chocolate caliente':['Hot chocolate','Txokolate beroa'],
 'Té e infusiones':['Tea & herbal infusions','Tea eta infusioak'],
 'Leche vegetal +0,40 € · Versión fría (iced) +0,20 €':['Plant-based milk +€0.40 · Iced version +€0.20','Landare-esnea +0,40 € · Bertsio hotza (iced) +0,20 €'],
 'Zumos':['Juices','Zukuak'],'Zumos naturales':['Natural juices','Zuku naturalak'],
 '100% prensados en frío':['100% cold-pressed','%100 hotzean prentsatuak'],
 'Naranja':['Orange','Laranja'],'Manzana':['Apple','Sagarra'],
 'Limonada casera':['Homemade lemonade','Etxeko limonada'],
 'Agua de coco':['Coconut water','Koko-ura'],
 'Con aloe vera bio.':['With organic aloe vera.','Aloe vera ekologikoarekin.'],
 'Té mate hibiscus':['Mate & hibiscus tea','Mate eta hibisko tea'],
 'Con zumo de naranja y miel.':['With orange juice and honey.','Laranja-zukuarekin eta eztiarekin.'],
 'Super zumos':['Super juices','Super zukuak'],
 'Sin agua · Sin azúcar · Sin conservantes':['No water · No sugar · No preservatives','Urik gabe · Azukrerik gabe · Kontserbagarririk gabe'],
 'Naranja, lima, zanahoria, cúrcuma, pimienta.':['Orange, lime, carrot, turmeric, pepper.','Laranja, lima, azenarioa, kurkuma, piperbeltza.'],
 'Manzana, pepino, kale, espinaca, menta, jengibre.':['Apple, cucumber, kale, spinach, mint, ginger.','Sagarra, pepinoa, kalea, espinaka, menda, jengibrea.'],
 'Antioxidante':['Antioxidant','Antioxidatzailea'],
 'Naranja, manzana, remolacha, lima, apio.':['Orange, apple, beetroot, lime, celery.','Laranja, sagarra, erremolatxa, lima, apioa.'],
 'Con agua filtrada':['With filtered water','Ur iragaziarekin'],
 'Piña, coco, agave, agua de coco, aceite de coco MCT.':['Pineapple, coconut, agave, coconut water, MCT coconut oil.','Anana, kokoa, agabea, koko-ura, MCT koko-olioa.'],
 'Piña, mango, maracuyá, coco, cúrcuma, agave.':['Pineapple, mango, passion fruit, coconut, turmeric, agave.','Anana, mangoa, pasio-fruta, kokoa, kurkuma, agabea.'],
 'Kale, espinaca, mango, agave, espirulina y jengibre.':['Kale, spinach, mango, agave, spirulina and ginger.','Kalea, espinaka, mangoa, agabea, espirulina eta jengibrea.'],
 'Pitaya, mango, agave, piña, açaí, lima y colágeno.':['Pitaya, mango, agave, pineapple, açaí, lime and collagen.','Pitaia, mangoa, agabea, anana, açaía, lima eta kolagenoa.'],
 'Fresa, mora, frambuesa, menta y agave.':['Strawberry, blackberry, raspberry, mint and agave.','Marrubia, masusta, mugurdia, menda eta agabea.'],
 'Opción agua de coco / zumo de naranja +1 €':['Coconut water / orange juice option +€1','Koko-uraren / laranja-zukuaren aukera +1 €'],
 'Batidos':['Milk smoothies','Esne-irabiakiak'],'Con leche':['With milk','Esnearekin'],
 'Açaí bio con guaraná, fresa, plátano, proteína whey de vainilla.':['Organic açaí with guarana, strawberry, banana, vanilla whey protein.','Açaí ekologikoa guaranarekin, marrubia, platanoa, banillazko whey proteina.'],
 'Plátano, cacao, maca, canela, crema de cacahuete, almendra.':['Banana, cocoa, maca, cinnamon, peanut butter, almond.','Platanoa, kakaoa, maka, kanela, kakahuete-krema, almendra.'],
 'Plátano fresa':['Banana strawberry','Platanoa eta marrubia'],
 'Con leche vegetal +0,40 €':['With plant-based milk +€0.40','Landare-esnearekin +0,40 €'],
 'Añade superalimentos orgánicos':['Add organic superfoods','Gehitu superelikagai ekologikoak'],
 'En smoothies y batidos: chlorella, espirulina, açaí, maca, cúrcuma, jengibre, colágeno, whey.':['In smoothies and milk smoothies: chlorella, spirulina, açaí, maca, turmeric, ginger, collagen, whey.','Smoothie eta esne-irabiakietan: chlorella, espirulina, açaía, maka, kurkuma, jengibrea, kolagenoa, whey.'],
 'Precios en euros · IVA incluido':['Prices in euros · VAT included','Prezioak eurotan · BEZa barne'],
 'Información sobre alérgenos disponible: consulta a nuestro equipo.':['Allergen information available: ask our team.','Alergenoei buruzko informazioa eskuragarri: galdetu gure taldeari.']
 };
 document.addEventListener('DOMContentLoaded',()=>{
  const nodes=[];
  document.querySelectorAll('.complete-menu,.menu-category-nav').forEach(root=>{
   const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
   while(walker.nextNode()){
    const node=walker.currentNode, key=node.textContent.trim();
    if(copy[key]) nodes.push({node,key});
   }
  });
  const update=()=>{
   const lang=document.documentElement.lang.slice(0,2);
   nodes.forEach(({node,key})=>node.textContent=lang==='en'?copy[key][0]:lang==='eu'?copy[key][1]:key);
   document.querySelector('.complete-menu').lang=lang;
   document.querySelector('.menu-category-nav').setAttribute('aria-label',lang==='en'?'Jump to a category':lang==='eu'?'Joan kategoria batera':'Ir a una categoría');
   document.querySelectorAll('[data-product-photo]').forEach(trigger=>trigger.setAttribute('aria-label',(lang==='en'?'View photo of ':lang==='eu'?'Ikusi argazkia: ':'Ver foto de ')+trigger.closest('.product-item').querySelector('h3').textContent));
   const hero=document.querySelector('.menu-juice-hero:not(.brunch-cup-hero)');
   if(hero){
    const title=lang==='en'?['OUR','MENU']:lang==='eu'?['GURE','KARTA']:['NUESTRA','CARTA'];
    hero.querySelectorAll('[data-menu-line]').forEach((el,i)=>el.textContent=title[i]);
    hero.querySelector('h1').setAttribute('aria-label',title.join(' '));
   }
  };
  update();
  new MutationObserver(update).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 });
})();
