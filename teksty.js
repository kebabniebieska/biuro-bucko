/* Wczytuje wszystkie teksty z jednego pliku teksty.txt. */
(async function () {
  const page = location.pathname.split('/').pop() || 'index.html';
  try {
    const response = await fetch('teksty.txt?ver=' + Date.now(), {cache:'no-store'});
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const all = await response.json();
    const data = all[page];
    if (!data) return;
    const nodes = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.textContent.trim()) return NodeFilter.FILTER_REJECT;
        if (['SCRIPT','STYLE','NOSCRIPT'].includes(node.parentElement?.tagName)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    while (walker.nextNode()) nodes.push(walker.currentNode);
    const entries = Object.values(data.teksty || {});
    nodes.forEach((node, i) => {
      if (i < entries.length && typeof entries[i] === 'string') {
        const original = node.textContent;
        const leading = original.match(/^\s*/)?.[0] || '';
        const trailing = original.match(/\s*$/)?.[0] || '';
        node.textContent = leading + entries[i] + trailing;
      }
    });
    if (typeof data.tytul_strony === 'string') document.title = data.tytul_strony;
    const desc = document.querySelector('meta[name="description"]');
    if (desc && typeof data.opis_seo === 'string') desc.content = data.opis_seo;
  } catch (error) {
    console.warn('Nie można wczytać teksty.txt. Wyświetlam teksty zapisane w HTML.', error);
  }
})();
