---
layout: default
title: misc
---

# Misc Posts

This is a collection of odds and ends that I have written. Many of them
refer to the constuction of this site itself... but some aren't.

<hr/>

<ul class="posts">
    {% for post in site.categories.misc %}
        <li>
        <a href="{{ post.url }}">{{ post.title }}</a>
        <div class="listing-date">&laquo;
            <span>{{ post.date | date: "%F" }}</span>
        </div>
    </li>
    {% endfor %}
</ul>

