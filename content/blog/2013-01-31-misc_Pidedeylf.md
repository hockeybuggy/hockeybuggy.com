---
title: A new a stylish look around the site. Thanks to sass
slug: adding-sass-files
date: "2013-01-31T00:00:00-05:00"
delisted: true
categories:
- meta
tags:
- sass
- development
aliases:
- /blog/misc/2013/01/31/misc_Pidedeylf.html
---

So if you have seen the site before this post you will have noticed that we(the
royal we [aka. we := I ])
have gone though (and are going though) some changes in the layout of the site.

<!-- excerpt -->


This new change is a result of changing from the static css about a week ago. I
knew that pelican had picked up less support but I did not realize the extent
of the power of the webassets module. I wanted to start with precompiled css
language and I picked up less first. I Started to used it and recreated my
previous css quickly in fewer lines. But as I used it more and did more
research on scss I started to think about how the syntax is nice.

Why do I prefer scss? Here are my thoughts:

## Reason number 1:

I prefer the usage of the '@mixin' and '@include' keywords that sass uses.
The alternative syntax for less would be a mixin name prefixed by a period
followed by parentheses. eg.

### LESS

    #container {
        color: black;
        .rounded-corners(10px);
    }
    .rounded (@radius: 5px){
        border-radius: @radius;
        -moz-border-radius: @radius;
        ...
    }

vs.

### SCSS

    #container {
        color: black;
        @include rounded-corners(10px);
    }
    @mixin rounded ($radius: 5px){
        border-radius: $radius;
        -moz-border-radius: $radius;
        ...
    }

When you are scanning though your code it would be nice to be able to see
things as context free as possible so going through the hassle of writing more
with scss is some-what worth it.

## Reason number 2: 

I like '$' more the '@'.  @ is two keys farther away from the
middle the $ which makes it kinda annoying when you are typing in a lot.


