// Global search across all sections and nodes
(function(){
  'use strict';

  function flatten(section, sectionKey, node, path, out) {
    const newPath = path.concat(node.name);
    out.push({
      sectionKey,
      sectionTitle: section.title,
      name: node.name,
      path: newPath,
      note: node.note || '',
      color: section.color
    });
    if (node.children) node.children.forEach(c => flatten(section, sectionKey, c, newPath, out));
  }

  function buildIndex() {
    const all = [];
    const sections = window.AWS_DATA.sections;
    Object.keys(sections).forEach(key => {
      const s = sections[key];
      flatten(s, key, s.root, [], all);
    });
    return all;
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
  }

  function highlight(str, q) {
    if (!q) return escapeHtml(str);
    const esc = escapeHtml(str);
    const re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
    return esc.replace(re, '<mark>$1</mark>');
  }

  function matchScore(hit, q) {
    const qq = q.toLowerCase();
    const name = hit.name.toLowerCase();
    const note = hit.note.toLowerCase();
    const path = hit.path.join(' > ').toLowerCase();
    let score = 0;
    if (name === qq) score += 100;
    if (name.startsWith(qq)) score += 50;
    if (name.includes(qq)) score += 20;
    if (path.includes(qq)) score += 5;
    if (note.includes(qq)) score += 3;
    return score;
  }

  window.initGlobalSearch = function(inputId, resultsId) {
    const input = document.getElementById(inputId);
    const results = document.getElementById(resultsId);
    if (!input || !results) return;

    const index = buildIndex();
    let activeIdx = -1;
    let currentHits = [];

    function render(hits, q) {
      if (!hits.length) {
        results.innerHTML = '<div class="search-hit" style="color:var(--text-dim)">No matches</div>';
        results.classList.add('open');
        return;
      }
      results.innerHTML = hits.map((h, i) => {
        const pathStr = h.path.slice(0, -1).join(' › ');
        return `<a class="search-hit ${i===activeIdx?'active':''}" href="sections/${h.sectionKey}.html" data-i="${i}">
          <div>${highlight(h.name, q)}</div>
          <div class="path">${escapeHtml(h.sectionTitle)}${pathStr ? ' › ' + escapeHtml(pathStr) : ''}</div>
        </a>`;
      }).join('');
      results.classList.add('open');
    }

    function search(q) {
      activeIdx = -1;
      if (!q || q.length < 2) {
        results.classList.remove('open');
        currentHits = [];
        return;
      }
      const scored = index
        .map(h => ({ h, s: matchScore(h, q) }))
        .filter(x => x.s > 0)
        .sort((a, b) => b.s - a.s)
        .slice(0, 30)
        .map(x => x.h);
      currentHits = scored;
      render(scored, q);
    }

    input.addEventListener('input', () => search(input.value.trim()));
    input.addEventListener('focus', () => { if (input.value.trim().length >= 2) results.classList.add('open'); });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIdx = Math.min(activeIdx + 1, currentHits.length - 1);
        render(currentHits, input.value.trim());
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIdx = Math.max(activeIdx - 1, 0);
        render(currentHits, input.value.trim());
      } else if (e.key === 'Enter') {
        if (activeIdx >= 0 && currentHits[activeIdx]) {
          window.location.href = 'sections/' + currentHits[activeIdx].sectionKey + '.html';
        }
      } else if (e.key === 'Escape') {
        results.classList.remove('open');
        input.blur();
      }
    });
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.global-search')) results.classList.remove('open');
    });
  };
})();
