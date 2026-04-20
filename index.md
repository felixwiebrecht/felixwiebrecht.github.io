---
layout: default
title: Home
---

<div class="home-grid">
  <div class="home-sidebar">
    <img src="/assets/images/profile.jpg" alt="Felix Wiebrecht" class="profile-photo">
    <h1 class="sidebar-name">Felix Wiebrecht</h1>
    <p class="sidebar-title">Lecturer (Assistant Professor) in Politics</p>
    <p class="sidebar-inst">University of Liverpool</p>

    <ul class="sidebar-links">
      <li><span class="link-label">&#128205;</span> London, UK</li>
      <li><span class="link-label">&#9993;</span> <a href="mailto:felix.wiebrecht@liverpool.ac.uk">felix.wiebrecht@liverpool.ac.uk</a></li>
      <li><span class="link-label">&#127760;</span> <a href="/CV.pdf" target="_blank">CV</a></li>
      <li><span class="link-label">&#128218;</span> <a href="https://scholar.google.com/citations?user=-fER2twAAAAJ&hl=en&oi=ao" target="_blank">Google Scholar</a></li>
      <li><span class="link-label">in</span> <a href="https://www.linkedin.com/in/felixwiebrecht" target="_blank">LinkedIn</a></li>
      <li><span class="link-label">&#120143;</span> <a href="https://twitter.com/felixwiebrecht" target="_blank">Twitter / X</a></li>
      <li><span class="link-label">🦋</span> <a href="https://bsky.app/profile/felixwiebrecht.bsky.social" target="_blank">Bluesky</a></li>
      <li><img src="https://orcid.org/sites/default/files/images/orcid_16x16.png" alt="ORCID" style="width:16px;vertical-align:middle;margin-right:0.3rem"> <a href="https://orcid.org/0000-0002-9159-5024" target="_blank">ORCID</a></li>
    </ul>
  </div>

  <div class="home-bio">
    <p>I am a Lecturer (Assistant Professor) in Politics at the University of Liverpool.</p>
    
    <p> My research is located at the intersection of public policy, public administration, and comparative politics. Broadly, it explores how political institutions and actors shape policymaking processes and outcomes, particularly in non-democratic contexts. I also research the reverse mechanism of how policies and governance characteristics affect political dynamics. I study these questions with a regional focus on China and Southeast Asia as well as cross-nationally. My research employs multiple methods, including causal inference, panel regressions, text-as-data, and elite surveys. </p>

    <p>My work has been published in the <em>British Journal of Political Science</em>, <em>The China Quarterly</em>, <em>Democratization</em>, <em>Political Research Quarterly</em>, <em>Public Management Review</em>, <em>Journal of Development Studies</em>, <em>Policy &amp; Politics</em>, and <em>Journal of East Asian Studies</em>, among others.</p>

    <p>My research has received support from the Research Grants Council of Hong Kong, the British Academy, the American Political Science Association, the Political Studies Association, and the Institute for Humane Studies.</p>

   <p>Previously, I was a Postdoctoral Research Fellow at the V-Dem Institute at the University of Gothenburg and continue to be affiliated with V-Dem as a Research Associate. I received my PhD in Government and Public Administration from the Chinese University of Hong Kong.</p> 
  </div>
</div>

<h2 class="section-title">News</h2>

<ul class="news-list">
  {% for item in site.data.news limit: 5 %}
  <li class="news-item"><span class="news-date">{{ item.date }}</span> {% if item.url %}<a href="{{ item.url }}" target="_blank">{{ item.text }}</a>{% else %}{{ item.text }}{% endif %}</li>
  {% endfor %}
</ul>

{% if site.data.news.size > 5 %}
<ul class="news-list news-hidden" id="news-extra" style="display:none;">
  {% for item in site.data.news offset: 5 %}
  <li class="news-item"><span class="news-date">{{ item.date }}</span> {% if item.url %}<a href="{{ item.url }}" target="_blank">{{ item.text }}</a>{% else %}{{ item.text }}{% endif %}</li>
  {% endfor %}
</ul>
<button class="news-toggle" id="news-toggle">Show all</button>
{% endif %}

<script>
var toggle = document.getElementById('news-toggle');
if (toggle) {
  toggle.addEventListener('click', function () {
    var extra = document.getElementById('news-extra');
    var open = extra.style.display === 'block';
    extra.style.display = open ? 'none' : 'block';
    toggle.textContent = open ? 'Show all' : 'Show less';
  });
}
</script>
