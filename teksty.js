/* Wczytuje teksty z pliku teksty.txt.
   Każdy wpis jest dopasowywany po oryginalnym tekście (fragment po "NNN | "),
   więc gdy HTML i teksty.txt są z różnych wersji, niepasujące wpisy są pomijane,
   a strona pokazuje teksty zapisane w HTML - nic się nie przesuwa. */
(async function () {
  const page = location.pathname.split('/').pop() || 'index.html';
  try {
    const response = await fetch('teksty.txt?ver=' + Date.now(), {cache:'no-store'});
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const all = await response.json();
    const data = all[page];
    if (!data) return;
    const entries = Object.entries(data.teksty || {}).map(([k, v]) => {
      const i = k.indexOf(' | ');
      return {key: i >= 0 ? k.slice(i + 3) : k, value: v};
    });
    const nodes = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.textContent.trim()) return NodeFilter.FILTER_REJECT;
        if (['SCRIPT','STYLE','NOSCRIPT'].includes(node.parentElement?.tagName)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    while (walker.nextNode()) nodes.push(walker.currentNode);
    let pos = 0;
    nodes.forEach(node => {
      const original = node.textContent;
      const snippet = original.trim().slice(0, 75);
      for (let j = pos; j < entries.length && j < pos + 40; j++) {
        if (entries[j].key === snippet) {
          if (typeof entries[j].value === 'string') {
            const leading = original.match(/^\s*/)?.[0] || '';
            const trailing = original.match(/\s*$/)?.[0] || '';
            node.textContent = leading + entries[j].value + trailing;
          }
          pos = j + 1;
          break;
        }
      }
    });
    if (typeof data.tytul_strony === 'string') document.title = data.tytul_strony;
    const desc = document.querySelector('meta[name="description"]');
    if (desc && typeof data.opis_seo === 'string') desc.content = data.opis_seo;
  } catch (error) {
    console.warn('Nie można wczytać teksty.txt. Wyświetlam teksty zapisane w HTML.', error);
  }
})();
