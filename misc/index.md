---
layout: default
title: misc
---

<h1>Misc Posts</h1>

<p>
    This is a collection of odds and ends that I have written. Many of them
    refer to the constuction of this site itself... but some aren't.
</p>

<ul class="posts">
    {% for post in site.categories.misc %}
        <li>
        <a href="{{ post.url }}">{{ post.title }}</a>
        <div>&laquo; <span class="date">{{ post.date | date_to_string }}</span></div>
    </li>
    {% endfor %}
</ul>

