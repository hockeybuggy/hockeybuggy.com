---
layout: default
title: Wikipedia Page Of The Day
---

<div id="wpotd">
  <h1>Wikipedia page of the day posts</h1>
  <ul class="posts">
    {% for post in site.categories.wpotd %}
      <li>
          <span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ post.url }}">{{ post.title }}</a>
      </li>
    {% endfor %}
  </ul>
</div>
