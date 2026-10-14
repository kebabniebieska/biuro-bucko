/* Stabilne animacje wejścia — uruchamiane przy każdej nawigacji. */
(() => {
  const groups = ['.services', '.teasers', '.benefits', '.statsgrid', '.contactgrid', '.trust'];
  const elements = [...new Set(groups.flatMap(selector => [...document.querySelectorAll(selector)].flatMap(group => [...group.children])))];
  if (!elements.length) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let observer = null;
  let animations = [];
  let run = 0;
  const cleanup = () => {
    if (observer) observer.disconnect();
    observer = null;
    animations.forEach(a => a.cancel());
    animations = [];
    elements.forEach(el => { el.style.opacity = ''; el.style.transform = ''; });
  };
  function start() {
    ++run;
    const current = run;
    cleanup();
    if (reduced || !('IntersectionObserver' in window) || !Element.prototype.animate) return;
    // Domyślnie elementy są widoczne; animujemy je dopiero, gdy wejdą w ekran.
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target;
        observer.unobserve(el);
        if (current !== run) continue;
        const index = Number(el.dataset.revealIndex || 0);
        const a = el.animate([
          { opacity: 0, transform: 'translate3d(0, 40px, 0)' },
          { opacity: 1, transform: 'translate3d(0, 0, 0)' }
        ], { duration: 720, delay: index * 115, easing: 'cubic-bezier(.22,.9,.32,1)', fill: 'both' });
        animations.push(a);
        a.onfinish = () => { a.cancel(); animations = animations.filter(x => x !== a); };
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });
    elements.forEach(el => observer.observe(el));
  }
  groups.forEach(selector => document.querySelectorAll(selector).forEach(group => {
    [...group.children].forEach((el,i) => { el.dataset.revealIndex = String(i % 3); });
  }));
  // pageshow uruchamia się także po powrocie z cache historii (BFCache).
  window.addEventListener('pageshow', () => {
    requestAnimationFrame(() => requestAnimationFrame(start));
  });
  // Powrót do karty: ponów animację dla nowo odwiedzanej strony, bez zawieszonych klatek.
  window.addEventListener('pagehide', () => { ++run; cleanup(); });
})();
