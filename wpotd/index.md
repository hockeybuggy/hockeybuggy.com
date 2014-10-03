---
layout: default
title: Wikipedia Page Of The Day
---

# Wikipedia page of the day

This is a collection of interesting Wikipedia pages I stumble across. I
can't be sure that all the information in the pages are accurate as of the time
you access them (or when I wrote a blurb about it), but I think that the pages
are a great way to spark interest in a topic. Enjoy!

<hr/>

<ul class="posts">
    {% for post in site.categories.wpotd %}
    <li>
        <a href="{{ post.url }}">{{ post.title }}</a>
        <div class="listing-date">&laquo;
            <span>{{ post.date | date: "%F" }}</span>
        </div>
    </li>
    {% endfor %}
</ul>

