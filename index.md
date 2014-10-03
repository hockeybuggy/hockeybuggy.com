---
layout: default
title: hockeybuggy.com
---

# All Posts

Welcome to [my][ABOUT] personal website. Occasionally I write about things I
learn, either from Wikipedia or else where. Check it out and please feel free to
[contact me][CONTACT] about anything.

<hr/>

<ul class="posts">
    {% for post in site.posts %}
    <li>
        <a href="{{ post.url }}">{{ post.title }}</a>
        <div class="listing-date">&laquo;
            <span>{{ post.date | date: "%F" }}</span>
        </div>
    </li>
    {% endfor %}
</ul>

[ABOUT]: /about.html
[CONTACT]: /contact.html
