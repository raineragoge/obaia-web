(() => {
  const root=document.documentElement;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canonical=path=>path.replace(/\/index\.html$/,'/').replace(/\.html$/,'').replace(/\/+$/,'') || '/';
  const historyVisit=performance.getEntriesByType('navigation')[0]?.type==='back_forward';
  if(historyVisit && !reduced) root.classList.add('obaia-arriving');
  try {
    const seen=sessionStorage.getItem('obaia-intro-seen');
    const raw=sessionStorage.getItem('obaia-transition');
    sessionStorage.removeItem('obaia-transition');
    sessionStorage.setItem('obaia-intro-seen','1');
    const transition=raw && JSON.parse(raw);
    if(reduced || historyVisit) return;
    if(transition && transition.to===canonical(location.pathname) && Date.now()-transition.at<8000) {
      root.classList.add('obaia-arriving');
    } else if(!seen) {
      root.classList.add('home-intro-enabled');
    }
  } catch {}
})();
