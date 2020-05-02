---
aliases:
- /misc/2013/03/26/misc_retIgIvDa.html
categories:
- vim
date: "2013-03-25T00:00:00-04:00"
slug: moving-beymond-word-wise-motions
tags:
- vim
- development
title: Moving beyond word-wise motions
---

Recently I have been working quite a bit on my Vim skills. If you don't use Vim
and don't want to read about a text editor you may wish to stop reading here.
For the past two years I had turned off the arrow keys in Vim. I did this with
the hope that I would stop having to move my hands from the home row. A couple
of months ago I gave myself the arrow keys back to see if I was ready to use
them responsibly. I found that I was (mostly) ready and stay on the home row
most of the time when moving around.


After reading [Practical Vim](https://pragprog.com/book/dnvim/practical-vim)
I started to use more word-wise operations (e.g. w,e,b,ge).
The word-wise motions moves the cursor around based on word
characters(a-zA-Z0-9). While
this is much much faster then the hjkl motions, they feel slow when you know
where in the text you want to go. The word-wise motions feel like they grind to
a halt when they hit URLs because of how many sub "word" a URL is made of.


The solution to this is the f, t, F, and T motions. These commands move to the
next occurrence of the supplied character. The f command moves **F**orward to the
next occurrence and the t command moves forward up **T**o the next occurrence. The
F and T commands are similar to their lower case counterpart except that they go
backward. At first I found it hard to picture how these motions would look like
in operation. When I was learning word-wise motions from Practical Vim I found
one of the figures greatly helped my understanding and I looked for a similar
graph for these character-wise motions. Failing to find one I made one and
thought I should share it here.

<img class="center" src="{{ site.url }}/static/img/fasterthanwordwise-800.jpg" alt="An image I made explaining some of the character-wise motions"/>

These commands are complimented by the ; command that repeats the most recent
motion. This becomes useful if you trying to move to a character and fall short
because you did not see another closer occurrence of a character. Rather then
retyping the motion and the character (two things) you can just hit the ; key
to repeat (one thing). As one of the goals of using Vim is to avoid repetition
we should try to remember to use the ; command.

Another thing that can make these motions useful is to preface them with a
count. If you do instead of taking the first occurrence of a character it will
take the count'th occurrence.

