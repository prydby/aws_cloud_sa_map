// Mindmap renderer — horizontal collapsible tree with SVG connectors, pan & zoom.
(function(){
  'use strict';

  function lighten(hex, amt) {
    // naive lighten by mixing with white
    const c = hex.replace('#','');
    const r = parseInt(c.substring(0,2),16);
    const g = parseInt(c.substring(2,4),16);
    const b = parseInt(c.substring(4,6),16);
    const mix = (v) => Math.round(v + (255 - v) * amt);
    return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
  }

  function makeNode(data, level) {
    const wrap = document.createElement('div');
    wrap.className = 'branch';
    const nodeWrap = document.createElement('div');
    nodeWrap.className = 'node-wrap';

    const node = document.createElement('div');
    node.className = 'node';
    if (level === 0) node.classList.add('root');
    else if (level === 1) node.classList.add('level-1');
    else if (level === 2) node.classList.add('level-2');
    else if (level === 3) node.classList.add('level-3');
    else node.classList.add('level-4');
    if (data.leaf) node.classList.add('leaf-note');

    // content
    const txt = document.createElement('span');
    txt.textContent = data.name;
    node.appendChild(txt);

    const chev = document.createElement('span');
    chev.className = 'chev';
    chev.textContent = '▸';
    node.appendChild(chev);

    if (!data.children || data.children.length === 0) node.classList.add('no-children');

    nodeWrap.appendChild(node);
    wrap.appendChild(nodeWrap);

    if (data.children && data.children.length) {
      const kids = document.createElement('div');
      kids.className = 'children';
      data.children.forEach(c => kids.appendChild(makeNode(c, level + 1)));
      wrap.appendChild(kids);

      node.addEventListener('click', (e) => {
        e.stopPropagation();
        node.classList.toggle('collapsed');
        redrawConnectors();
      });
    }

    if (data.note) {
      node.title = data.note;
    }

    return wrap;
  }

  // --- pan/zoom state ---
  let scale = 1;
  let tx = 0, ty = 0;
  let viewport, container;

  function applyTransform() {
    viewport.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
  }

  function initPanZoom() {
    let dragging = false, lx = 0, ly = 0;
    container.addEventListener('mousedown', (e) => {
      if (e.target.closest('.node')) return; // don't pan when clicking a node
      dragging = true; lx = e.clientX; ly = e.clientY;
      container.classList.add('dragging');
    });
    window.addEventListener('mousemove', (e) => {
      if (!dragging) return;
      tx += e.clientX - lx; ty += e.clientY - ly;
      lx = e.clientX; ly = e.clientY;
      applyTransform();
    });
    window.addEventListener('mouseup', () => { dragging = false; container.classList.remove('dragging'); });

    container.addEventListener('wheel', (e) => {
      e.preventDefault();
      const rect = container.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      // point under cursor in viewport coords
      const vx = (cx - rect.width/2 - tx) / scale;
      const vy = (cy - rect.height/2 - ty) / scale;
      const delta = -e.deltaY;
      const factor = delta > 0 ? 1.12 : 1/1.12;
      const next = Math.max(0.2, Math.min(3, scale * factor));
      scale = next;
      tx = cx - rect.width/2 - vx * scale;
      ty = cy - rect.height/2 - vy * scale;
      applyTransform();
    }, { passive: false });
  }

  function fitToScreen() {
    const rect = container.getBoundingClientRect();
    const root = viewport.firstChild;
    if (!root) return;
    const bbox = root.getBoundingClientRect();
    // current viewport is at center with transform; estimate untransformed size
    const width = bbox.width / scale;
    const height = bbox.height / scale;
    const margin = 60;
    const sX = (rect.width - margin*2) / width;
    const sY = (rect.height - margin*2) / height;
    scale = Math.min(1, Math.min(sX, sY));
    // center: place viewport so root starts near left edge
    tx = -rect.width/2 + margin;
    ty = 0;
    applyTransform();
    setTimeout(redrawConnectors, 20);
  }

  // --- connectors ---
  let svgEl;
  function redrawConnectors() {
    if (!svgEl || !viewport) return;
    const vpRect = viewport.getBoundingClientRect();
    // build list of parent -> direct children (within visible subtree)
    const pairs = [];
    const nodes = viewport.querySelectorAll('.branch');
    nodes.forEach(branch => {
      const parentNode = branch.firstChild.firstChild; // .node-wrap > .node
      if (parentNode.classList.contains('collapsed')) return;
      const childrenWrap = branch.children[1]; // .children
      if (!childrenWrap) return;
      Array.from(childrenWrap.children).forEach(childBranch => {
        const childNode = childBranch.firstChild.firstChild;
        pairs.push([parentNode, childNode]);
      });
    });

    // compute svg size
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    pairs.forEach(([p, c]) => {
      const pr = p.getBoundingClientRect();
      const cr = c.getBoundingClientRect();
      minX = Math.min(minX, pr.right, cr.left);
      maxX = Math.max(maxX, pr.right, cr.left);
      minY = Math.min(minY, pr.top, cr.top);
      maxY = Math.max(maxY, pr.bottom, cr.bottom);
    });
    if (!isFinite(minX)) { svgEl.innerHTML = ''; return; }

    svgEl.style.left = (minX - vpRect.left) + 'px';
    svgEl.style.top = (minY - vpRect.top) + 'px';
    svgEl.setAttribute('width', (maxX - minX));
    svgEl.setAttribute('height', (maxY - minY));

    let d = '';
    pairs.forEach(([p, c]) => {
      const pr = p.getBoundingClientRect();
      const cr = c.getBoundingClientRect();
      const x1 = pr.right - minX;
      const y1 = pr.top + pr.height/2 - minY;
      const x2 = cr.left - minX;
      const y2 = cr.top + cr.height/2 - minY;
      const mid = (x1 + x2) / 2;
      d += `M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2} `;
    });
    svgEl.innerHTML = `<path d="${d}"/>`;
  }

  function setSectionVars(section) {
    const root = document.documentElement;
    const c = section.color || '#ff9900';
    root.style.setProperty('--section-color', c);
    root.style.setProperty('--section-color-2', lighten(c, 0.35));
    root.style.setProperty('--section-color-3', lighten(c, 0.75));
  }

  window.renderSection = function(key) {
    const section = window.AWS_DATA.sections[key];
    if (!section) { document.body.innerHTML = '<p style="padding:20px">Section not found: ' + key + '</p>'; return; }

    document.title = section.title + ' · AWS SAA-C03 Mind Maps';
    const titleEl = document.getElementById('section-title');
    if (titleEl) titleEl.textContent = (section.icon ? section.icon + '  ' : '') + section.title;

    setSectionVars(section);

    container = document.getElementById('mindmap-container');
    viewport = document.createElement('div');
    viewport.className = 'mindmap-viewport';
    container.appendChild(viewport);

    svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgEl.setAttribute('class', 'connectors');
    viewport.appendChild(svgEl);

    const mm = document.createElement('div');
    mm.className = 'mindmap';
    mm.appendChild(makeNode(section.root, 0));
    viewport.appendChild(mm);

    initPanZoom();
    // initial centering
    requestAnimationFrame(() => {
      redrawConnectors();
      // place viewport so root is at left-center
      const rect = container.getBoundingClientRect();
      tx = -rect.width/2 + 80;
      ty = 0;
      applyTransform();
      setTimeout(redrawConnectors, 40);
    });

    // controls
    const ea = document.getElementById('expand-all');
    const ca = document.getElementById('collapse-all');
    const fit = document.getElementById('fit');
    if (ea) ea.addEventListener('click', () => {
      viewport.querySelectorAll('.node.collapsed').forEach(n => n.classList.remove('collapsed'));
      redrawConnectors();
    });
    if (ca) ca.addEventListener('click', () => {
      // collapse everything except root
      viewport.querySelectorAll('.mindmap .branch .children').forEach(c => {
        const parent = c.previousSibling ? c.previousSibling.firstChild : null; // unused
      });
      viewport.querySelectorAll('.mindmap > .branch > .node-wrap > .node').forEach(root => {
        // collapse one level below root
      });
      viewport.querySelectorAll('.mindmap .branch .node-wrap .node').forEach(n => {
        if (!n.classList.contains('root') && !n.classList.contains('no-children')) n.classList.add('collapsed');
      });
      redrawConnectors();
    });
    if (fit) fit.addEventListener('click', fitToScreen);

    window.addEventListener('resize', () => redrawConnectors());
  };
})();
