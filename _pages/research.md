---
layout: default
title: Research
permalink: /research/
---

<p>I study political institutions and public policy in authoritarian regimes. My research examines how these institutions shape elite behavior and policymaking processes, influence policy outcomes, and develop and change over time.</p>

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
    {% for paper in site.data.publications.published %}
    <tr>
      <td>
        <div class="paper-title">
          {% if paper.url %}<a href="{{ paper.url }}" target="_blank">{{ paper.title }}</a>{% else %}{{ paper.title }}{% endif %}
        </div>
        {% if paper.abstract %}
        <button class="abstract-toggle">abstract</button>
        <div class="abstract-text">{{ paper.abstract }}</div>
        {% endif %}
        {% if paper.pdf %}
        <div class="paper-links">
          <a href="{{ paper.pdf }}" class="paper-link" target="_blank">PDF</a>
        </div>
        {% endif %}
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
    <tr>
      <td>
        <div class="paper-title">
          {% if paper.url %}<a href="{{ paper.url }}" target="_blank">{{ paper.title }}</a>{% else %}{{ paper.title }}{% endif %}
        </div>
        {% if paper.abstract %}
        <button class="abstract-toggle">abstract</button>
        <div class="abstract-text">{{ paper.abstract }}</div>
        {% endif %}
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
    { id: "Marike Blanken" },
    { id: "Adea Gafuri" },
    { id: "Fabio Angiolillo" },
    { id: "Staffan I. Lindberg" },
    { id: "Marina Nord" },
    { id: "Martin Lundstedt" },
    { id: "Yuko Sato" },
    { id: "Biao Huang" },
    { id: "Xiaodie Wu" },
    { id: "Vanessa Boese-Schlosser" },
    { id: "Natalia Natsika" },
    { id: "Kelly Morrison" },
    { id: "Ozlem Tuncel" },
    { id: "Thareerat Laohabut" },
    { id: "J.F. Downes" },
    { id: "E.K.F. Chan" }
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
    { source: "Fabio Angiolillo", target: "Staffan I. Lindberg" },
    { source: "Fabio Angiolillo", target: "Marina Nord" },
    { source: "Fabio Angiolillo", target: "Martin Lundstedt" },
    { source: "Fabio Angiolillo", target: "Yuko Sato" },
    { source: "Fabio Angiolillo", target: "Vanessa Boese-Schlosser" },
    { source: "Fabio Angiolillo", target: "Natalia Natsika" },
    { source: "Fabio Angiolillo", target: "Kelly Morrison" },
    { source: "Staffan I. Lindberg", target: "Marina Nord" },
    { source: "Staffan I. Lindberg", target: "Martin Lundstedt" },
    { source: "Staffan I. Lindberg", target: "Yuko Sato" },
    { source: "Staffan I. Lindberg", target: "Vanessa Boese-Schlosser" },
    { source: "Staffan I. Lindberg", target: "Natalia Natsika" },
    { source: "Staffan I. Lindberg", target: "Kelly Morrison" },
    { source: "Marina Nord", target: "Martin Lundstedt" },
    { source: "Marina Nord", target: "Yuko Sato" },
    { source: "Martin Lundstedt", target: "Yuko Sato" },
    { source: "Biao Huang", target: "Xiaodie Wu" },
    { source: "Felix Wiebrecht", target: "J.F. Downes" },
    { source: "Felix Wiebrecht", target: "E.K.F. Chan" },
    { source: "J.F. Downes", target: "E.K.F. Chan" }
  ]
};

const connectionCount = {};
data.nodes.forEach(n => connectionCount[n.id] = 0);
data.links.forEach(l => {
  connectionCount[l.source]++;
  connectionCount[l.target]++;
});

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
  return 8 + connectionCount[d.id] * 2;
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
    if (l.source.id === selected) connected.add(l.target.id);
    if (l.target.id === selected) connected.add(l.source.id);
  });
  node.attr("opacity", d => connected.has(d.id) ? 1 : 0.15);
  link.attr("opacity", l => (l.source.id === selected || l.target.id === selected) ? 1 : 0.05);
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
