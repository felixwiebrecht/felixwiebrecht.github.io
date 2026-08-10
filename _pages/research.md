---
layout: default
title: Research
permalink: /research/
---

<p>I study political institutions and public policy primarily in authoritarian regimes. My research examines how these institutions shape elite behavior and policymaking processes, influence policy outcomes, and develop and change over time.</p>

<h2 class="section-title">Published Articles</h2>

<table class="research-table">
  <thead>
    <tr>
      <th>Title / Abstract</th>
      <th>Journal</th>
      <th>Co-authors</th>
      <th>Year</th>
      <th>Topics</th>
    </tr>
  </thead>
  <tbody>
    {% assign published_count = site.data.publications.published | size %}
    {% for paper in site.data.publications.published %}
    {% assign has_detail = false %}
    {% if paper.abstract or paper.pdf or paper.markdown or paper.figures %}{% assign has_detail = true %}{% endif %}
    {% assign paper_number = published_count | minus: forloop.index | plus: 1 %}
    <tr class="{% if has_detail %}paper-row{% endif %}" {% if has_detail %}data-toggle="pub-{{ forloop.index }}"{% endif %}>
      <td>
        <div class="paper-title-row">
          <span class="paper-number">{{ paper_number }}.</span>
          {% if has_detail %}<span class="paper-toggle-icon">+</span>{% endif %}
          <div class="paper-title">
            {% if paper.url %}<a href="{{ paper.url }}" target="_blank">{{ paper.title }}</a>{% else %}{{ paper.title }}{% endif %}
          </div>
        </div>
      </td>
      <td>
        {{ paper.journal }}
      </td>
      <td>{{ paper.coauthors }}</td>
      <td>{{ paper.year }}</td>
      <td>
        <div class="tags">
          {% for tag in paper.tags %}
          <span class="tag">{{ tag }}</span>
          {% endfor %}
        </div>
      </td>
    </tr>
    {% if has_detail %}
    <tr class="paper-detail-row" id="pub-{{ forloop.index }}">
      <td colspan="5">
        <div class="paper-detail">
          {% if paper.doi or paper.pdf or paper.markdown or paper.figures %}
          <div class="paper-actions">
            {% if paper.doi %}<div class="altmetric-embed" data-badge-type="donut" data-doi="{{ paper.doi }}" data-hide-no-mentions="true"></div>{% endif %}
            <div class="paper-links">
              {% if paper.pdf %}<a href="{{ paper.pdf }}" class="paper-link" target="_blank">&#128196; PDF</a>{% endif %}
              {% if paper.markdown %}<a href="{{ paper.markdown }}" class="paper-link" target="_blank">&#128221; Markdown</a>{% endif %}
              {% if paper.figures %}<a href="{{ paper.figures }}" class="paper-link" target="_blank">&#128202; Figures &amp; Tables</a>{% endif %}
            </div>
          </div>
          {% endif %}
          {% if paper.abstract %}
          <div class="paper-abstract-label">Abstract</div>
          <p class="paper-abstract-text">{{ paper.abstract }}</p>
          {% endif %}
        </div>
      </td>
    </tr>
    {% endif %}
    {% endfor %}
  </tbody>
</table>

<h2 class="section-title">Book Chapters</h2>

<table class="research-table">
  <thead>
    <tr>
      <th>Title</th>
      <th>Book</th>
      <th>Co-authors</th>
      <th>Year</th>
    </tr>
  </thead>
  <tbody>
    {% for chapter in site.data.publications.book_chapters %}
    <tr>
      <td><div class="paper-title">{{ chapter.title }}</div>
          <div style="font-size:0.85rem; color:#666; margin-top:0.2rem;">{{ chapter.editors }}, {{ chapter.publisher }}</div>
      </td>
      <td>{{ chapter.book }}</td>
      <td>{{ chapter.coauthors }}</td>
      <td>{{ chapter.year }}</td>
    </tr>
    {% endfor %}
  </tbody>
</table>

<h2 class="section-title">Working Papers & Work in Progress</h2>

<table class="research-table">
  <thead>
    <tr>
      <th>Title</th>
      <th>Co-authors</th>
      <th>Status</th>
      <th>Topics</th>
    </tr>
  </thead>
  <tbody>
    {% for paper in site.data.publications.working_papers %}
    {% assign has_detail = false %}
    {% if paper.abstract or paper.pdf or paper.markdown or paper.figures %}{% assign has_detail = true %}{% endif %}
    <tr class="{% if has_detail %}paper-row{% endif %}" {% if has_detail %}data-toggle="wp-{{ forloop.index }}"{% endif %}>
      <td>
        <div class="paper-title-row">
          {% if has_detail %}<span class="paper-toggle-icon">+</span>{% endif %}
          <div class="paper-title">
            {% if paper.url %}<a href="{{ paper.url }}" target="_blank">{{ paper.title }}</a>{% else %}{{ paper.title }}{% endif %}
          </div>
        </div>
      </td>
      <td>{{ paper.coauthors }}</td>
      <td>
        {% if paper.status == "Revise & Resubmit" %}
          <span class="status status-rr">R&amp;R</span>
        {% elsif paper.status == "Under Review" %}
          <span class="status status-review">Under Review</span>
        {% else %}
          <span class="status status-progress">In Progress</span>
        {% endif %}
      </td>
      <td>
        <div class="tags">
          {% for tag in paper.tags %}
          <span class="tag">{{ tag }}</span>
          {% endfor %}
        </div>
      </td>
    </tr>
    {% if has_detail %}
    <tr class="paper-detail-row" id="wp-{{ forloop.index }}">
      <td colspan="4">
        <div class="paper-detail">
          {% if paper.doi or paper.pdf or paper.markdown or paper.figures %}
          <div class="paper-actions">
            {% if paper.doi %}<div class="altmetric-embed" data-badge-type="donut" data-doi="{{ paper.doi }}" data-hide-no-mentions="true"></div>{% endif %}
            <div class="paper-links">
              {% if paper.pdf %}<a href="{{ paper.pdf }}" class="paper-link" target="_blank">&#128196; PDF</a>{% endif %}
              {% if paper.markdown %}<a href="{{ paper.markdown }}" class="paper-link" target="_blank">&#128221; Markdown</a>{% endif %}
              {% if paper.figures %}<a href="{{ paper.figures }}" class="paper-link" target="_blank">&#128202; Figures &amp; Tables</a>{% endif %}
            </div>
          </div>
          {% endif %}
          {% if paper.abstract %}
          <div class="paper-abstract-label">Abstract</div>
          <p class="paper-abstract-text">{{ paper.abstract }}</p>
          {% endif %}
        </div>
      </td>
    </tr>
    {% endif %}
    {% endfor %}
  </tbody>
</table>

<h2 class="section-title">Research Collaborations</h2>

<p style="margin-bottom: 1.5rem;">I always welcome new connections and opportunities for collaboration with researchers, NGOs, government, and the private sector, so please don't hesitate to reach out.</p>

<div id="network-controls">
  <select id="author-select">
    <option value="">Select by Author</option>
  </select>
</div>

<div id="network-container">
  <svg id="coauthor-network"></svg>
</div>

<script src="https://d3js.org/d3.v7.min.js"></script>
<script>
const data = {
  nodes: [
    { id: "Felix Wiebrecht", self: true },
    { id: "Marike Blanken", papers: 1 },
    { id: "Adea Gafuri", papers: 1 },
    { id: "Fabio Angiolillo", papers: 6 },
    { id: "Staffan I. Lindberg", papers: 5 },
    { id: "Marina Nord", papers: 3 },
    { id: "Martin Lundstedt", papers: 4 },
    { id: "Yuko Sato", papers: 4 },
    { id: "Biao Huang", papers: 2 },
    { id: "Xiaodie Wu", papers: 1 },
    { id: "Vanessa Boese-Schlosser", papers: 1 },
    { id: "Natalia Natsika", papers: 1 },
    { id: "Kelly Morrison", papers: 1 },
    { id: "Ozlem Tuncel", papers: 1 },
    { id: "Thareerat Laohabut", papers: 1 },
    { id: "J.F. Downes", papers: 2 },
    { id: "E.K.F. Chan", papers: 2 }
  ],
  links: [
    { source: "Felix Wiebrecht", target: "Marike Blanken" },
    { source: "Felix Wiebrecht", target: "Adea Gafuri" },
    { source: "Felix Wiebrecht", target: "Fabio Angiolillo" },
    { source: "Felix Wiebrecht", target: "Staffan I. Lindberg" },
    { source: "Felix Wiebrecht", target: "Marina Nord" },
    { source: "Felix Wiebrecht", target: "Martin Lundstedt" },
    { source: "Felix Wiebrecht", target: "Yuko Sato" },
    { source: "Felix Wiebrecht", target: "Biao Huang" },
    { source: "Felix Wiebrecht", target: "Xiaodie Wu" },
    { source: "Felix Wiebrecht", target: "Vanessa Boese-Schlosser" },
    { source: "Felix Wiebrecht", target: "Natalia Natsika" },
    { source: "Felix Wiebrecht", target: "Kelly Morrison" },
    { source: "Felix Wiebrecht", target: "Ozlem Tuncel" },
    { source: "Felix Wiebrecht", target: "Thareerat Laohabut" },
    { source: "Felix Wiebrecht", target: "J.F. Downes" },
    { source: "Felix Wiebrecht", target: "E.K.F. Chan" },
    { source: "Fabio Angiolillo", target: "Staffan I. Lindberg" },
    { source: "Fabio Angiolillo", target: "Marina Nord" },
    { source: "Fabio Angiolillo", target: "Martin Lundstedt" },
    { source: "Fabio Angiolillo", target: "Yuko Sato" },
    { source: "Staffan I. Lindberg", target: "Marina Nord" },
    { source: "Staffan I. Lindberg", target: "Martin Lundstedt" },
    { source: "Staffan I. Lindberg", target: "Yuko Sato" },
    { source: "Staffan I. Lindberg", target: "Vanessa Boese-Schlosser" },
    { source: "Staffan I. Lindberg", target: "Natalia Natsika" },
    { source: "Staffan I. Lindberg", target: "Kelly Morrison" },
    { source: "Marina Nord", target: "Martin Lundstedt" },
    { source: "Marina Nord", target: "Yuko Sato" },
    { source: "Martin Lundstedt", target: "Yuko Sato" },
    { source: "Martin Lundstedt", target: "Vanessa Boese-Schlosser" },
    { source: "Martin Lundstedt", target: "Natalia Natsika" },
    { source: "Martin Lundstedt", target: "Kelly Morrison" },
    { source: "Vanessa Boese-Schlosser", target: "Natalia Natsika" },
    { source: "Vanessa Boese-Schlosser", target: "Kelly Morrison" },
    { source: "Vanessa Boese-Schlosser", target: "Yuko Sato" },
    { source: "Natalia Natsika", target: "Kelly Morrison" },
    { source: "Natalia Natsika", target: "Yuko Sato" },
    { source: "Kelly Morrison", target: "Yuko Sato" },
    { source: "Biao Huang", target: "Xiaodie Wu" },
    { source: "J.F. Downes", target: "E.K.F. Chan" },
    { source: "Marike Blanken", target: "Adea Gafuri" }
  ]
};

const width = document.getElementById("network-container").offsetWidth;
const height = 500;

const svg = d3.select("#coauthor-network")
  .attr("width", width)
  .attr("height", height);

const simulation = d3.forceSimulation(data.nodes)
  .force("link", d3.forceLink(data.links).id(d => d.id).distance(120))
  .force("charge", d3.forceManyBody().strength(-300))
  .force("center", d3.forceCenter(width / 2, height / 2))
  .force("collision", d3.forceCollide().radius(d => nodeRadius(d) + 10));

function nodeRadius(d) {
  if (d.self) return 20;
  return 8 + (d.papers || 1) * 3;
}

const link = svg.append("g")
  .selectAll("line")
  .data(data.links)
  .join("line")
  .attr("stroke", "#ccc")
  .attr("stroke-width", 1.2);

const node = svg.append("g")
  .selectAll("circle")
  .data(data.nodes)
  .join("circle")
  .attr("r", d => nodeRadius(d))
  .attr("fill", d => d.self ? "#2a5db0" : "#a8bfe0")
  .attr("stroke", "#fff")
  .attr("stroke-width", 1.5)
  .call(d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended));

const label = svg.append("g")
  .selectAll("text")
  .data(data.nodes)
  .join("text")
  .text(d => d.id)
  .attr("font-size", "11px")
  .attr("font-family", "Helvetica Neue, Arial, sans-serif")
  .attr("fill", "#333")
  .attr("dx", d => nodeRadius(d) + 4)
  .attr("dy", "0.35em");

simulation.on("tick", () => {
  link
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);
  node
    .attr("cx", d => d.x)
    .attr("cy", d => d.y);
  label
    .attr("x", d => d.x)
    .attr("y", d => d.y);
});

const select = document.getElementById("author-select");
data.nodes.forEach(n => {
  const opt = document.createElement("option");
  opt.value = n.id;
  opt.textContent = n.id;
  select.appendChild(opt);
});

select.addEventListener("change", function () {
  const selected = this.value;
  if (!selected) {
    node.attr("opacity", 1);
    link.attr("opacity", 1);
    label.attr("opacity", 1);
    return;
  }
  const connected = new Set([selected]);
  data.links.forEach(l => {
    const src = typeof l.source === "object" ? l.source.id : l.source;
    const tgt = typeof l.target === "object" ? l.target.id : l.target;
    if (src === selected) connected.add(tgt);
    if (tgt === selected) connected.add(src);
  });
  node.attr("opacity", d => connected.has(d.id) ? 1 : 0.15);
  link.attr("opacity", l => {
    const src = typeof l.source === "object" ? l.source.id : l.source;
    const tgt = typeof l.target === "object" ? l.target.id : l.target;
    return (src === selected || tgt === selected) ? 1 : 0.05;
  });
  label.attr("opacity", d => connected.has(d.id) ? 1 : 0.15);
});

function dragstarted(event, d) {
  if (!event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x; d.fy = d.y;
}
function dragged(event, d) {
  d.fx = event.x; d.fy = event.y;
}
function dragended(event, d) {
  if (!event.active) simulation.alphaTarget(0);
  d.fx = null; d.fy = null;
}
</script>

<style>
#network-controls { margin-bottom: 1rem; }
#network-controls select {
  font-family: "Helvetica Neue", Arial, sans-serif;
  font-size: 0.9rem;
  padding: 0.3rem 0.6rem;
  border: 1px solid #ccc;
  border-radius: 3px;
}
#network-container {
  width: 100%;
  border: 1px solid #eee;
  border-radius: 4px;
  overflow: hidden;
}
#coauthor-network { display: block; }
</style>
