(function () {
  var dataEl = document.getElementById('asset-data');
  if (!dataEl) return;
  var data = JSON.parse(dataEl.textContent);
  var buttons = Array.from(document.querySelectorAll('.asset-btn'));
  var title = document.getElementById('asset-title');
  var kind = document.getElementById('asset-kind');
  var media = document.getElementById('asset-media');
  var caption = document.getElementById('asset-caption');
  var table = document.getElementById('asset-table');
  var open = document.getElementById('asset-open');
  var markdownCache = null;

  function escapeHtml(s) {
    return (s || '').replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function paragraphs(text) {
    return (text || '')
      .split(/\n\s*\n/)
      .filter(Boolean)
      .map(function (p) { return '<p>' + escapeHtml(p) + '</p>'; })
      .join('');
  }

  function renderRows(rows) {
    var t = document.createElement('table');
    t.className = 'data-table';
    rows.forEach(function (row, rowIndex) {
      var tr = document.createElement('tr');
      row.forEach(function (cell) {
        var el = document.createElement(rowIndex === 0 ? 'th' : 'td');
        el.textContent = cell || '';
        tr.appendChild(el);
      });
      t.appendChild(tr);
    });
    return t;
  }

  function setActive(id) {
    buttons.forEach(function (b) { b.classList.toggle('active', b.dataset.asset === id); });
  }

  function clearViewer() {
    media.innerHTML = '';
    caption.innerHTML = '';
    table.innerHTML = '';
    table.hidden = true;
    open.hidden = true;
    open.textContent = '';
  }

  function setHash(id) {
    history.replaceState(null, '', '#' + id);
  }

  function showMarkdown() {
    setActive('paper-markdown');
    clearViewer();
    title.textContent = 'Paper Markdown';
    kind.textContent = 'Machine-readable paper text';
    open.href = data.markdownUrl;
    open.textContent = 'Open raw Markdown';
    open.hidden = false;
    caption.innerHTML = '<p class="empty">Loading Markdown...</p>';

    fetch(data.markdownUrl, { cache: 'no-cache' })
      .then(function (response) {
        if (!response.ok) throw new Error('Markdown unavailable');
        return response.text();
      })
      .then(function (text) {
        markdownCache = text;
        caption.innerHTML = '';
        var panel = document.createElement('div');
        panel.className = 'markdown-panel';
        var pre = document.createElement('pre');
        pre.textContent = markdownCache;
        panel.appendChild(pre);
        media.appendChild(panel);
      })
      .catch(function () {
        caption.innerHTML = '<p class="empty">Markdown could not be loaded.</p>';
      });

    setHash('paper-markdown');
  }

  function show(id) {
    if (id === 'paper-markdown') { showMarkdown(); return; }

    var item = data.items.find(function (x) { return x.id === id; });
    if (!item) { showMarkdown(); return; }

    var displayMedia = item.media || [];
    setActive(item.id);
    clearViewer();
    title.textContent = item.label;
    kind.textContent = item.kind;

    displayMedia.forEach(function (src, i) {
      var a = document.createElement('a');
      a.href = src;
      a.target = '_blank';
      var img = document.createElement('img');
      img.className = 'asset-img';
      img.src = src;
      img.alt = item.label + (i ? ' image ' + (i + 1) : '');
      if (item.kind === 'Table') img.classList.add('table-img');
      a.appendChild(img);
      media.appendChild(a);
    });

    caption.innerHTML = item.caption ? paragraphs(item.caption) : '<p class="empty">No caption text available.</p>';

    if (!displayMedia.length && item.rows && item.rows.length) {
      table.hidden = false;
      table.appendChild(renderRows(item.rows));
    } else if (!displayMedia.length && item.text) {
      table.hidden = false;
      var pre = document.createElement('pre');
      pre.textContent = item.text;
      table.appendChild(pre);
    }

    if (displayMedia.length) {
      open.href = displayMedia[0];
      open.textContent = 'Open image';
      open.hidden = false;
    }

    setHash(item.id);
  }

  buttons.forEach(function (b) { b.addEventListener('click', function () { show(b.dataset.asset); }); });
  show((location.hash || '').replace('#', '') || 'paper-markdown');
})();
