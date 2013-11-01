---
layout: default
title: misc
---

<div id="misc">
  <h1>Misc Posts</h1>
  <ul class="posts">
    {% for post in site.categories.misc %}
      <li>
          <span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ post.url }}">{{ post.title }}</a>
      </li>
    {% endfor %}
  </ul>
</div>
