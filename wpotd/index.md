---
layout: default
title: Wikipedia Page Of The Day
---

<div id="wpotd">
  <h1>Wikipedia page of the day</h1>

  <p>
      This is a collection of interesting Wikipedia pages I stumble across. I
      can't be sure that all the information in the pages are accurate as of the time
      you access them (or when I wrote a blurb about it), but I think that the pages
      are a great way to spark interest in a topic. Enjoy!
  </p>

  <ul class="posts">
    {% for post in site.categories.wpotd %}
      <li>
          <a href="{{ post.url }}">{{ post.title }}</a> <div>&laquo; <span class="date">{{ post.date | date_to_string }}</span></div>
      </li>
    {% endfor %}
  </ul>
</div>
