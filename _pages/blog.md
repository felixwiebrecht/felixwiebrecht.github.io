---
layout: default
title: Blog
permalink: /blog/
---

<div class="page-header">
  <h1>Blog</h1>
  <p>Short pieces on authoritarian politics, parliaments and data, written for a general audience.</p>
</div>

<div class="post-list">
{% for post in site.posts %}
  <div class="post-item">
    <h2 class="post-item-title"><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
    <p class="post-meta">{{ post.date | date: "%-d %B %Y" }}</p>
    {% if post.description %}<p class="post-item-teaser">{{ post.description }}</p>{% endif %}
  </div>
{% endfor %}
</div>

<p class="post-feed-link"><a href="{{ '/feed.xml' | relative_url }}">Subscribe via RSS</a></p>
