---
layout: default
title: hockeybuggy.com
---

<h1>All Posts</h1>

<p>
    Welcome to <a href="/about">my</a> personal website. Occasionally I
    write about things I learn, either from <a href="/wpotd">Wikipedia</a> or
    <a href="misc">else where</a>. Check it out and feel free to contact me.
</p>

<ul class="posts">
    {% for post in site.posts %}
    <li>
        <a href="{{ post.url }}">{{ post.title }}</a>
        <div>&laquo; <span class="date">{{ post.date | date_to_string }}</span></div>
    </li>
    {% endfor %}
</ul>

