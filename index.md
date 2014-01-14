---
layout: default
title: hockeybuggy.com
---

<div id="home">
  <h1>All Posts</h1>
  <ul class="posts">
    {% for post in site.posts %}
      <li>
          <a href="{{ post.url }}">{{ post.title }}</a> <div>&laquo; <span class="date">{{ post.date | date_to_string }}</span></div>
      </li>
    {% endfor %}
  </ul>
</div>
