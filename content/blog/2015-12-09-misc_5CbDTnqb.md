+++
title = "Vim splitting shortcuts"
slug = "vim-splitting-shortcuts"
date = "2016-01-18"
tags = []
categories = []
aliases = [
  "/blog/misc/2016/01/18/misc_5CbDTnqb.html",
]
+++

I have a quite a few leader mapped keys in my `.vimrc`, and I use some of them.
The mapping that I use the most is to split the vim window to an existing
buffer buffer. If I wanted to split to file I have already opened, and I know
the buffer number is 2, I could type:

<div class="keysequence">
  <kbd>,</kbd>
  <kbd>-</kbd>
  <kbd>2</kbd>
  <kbd>CR</kbd>
</div>


This is a simple mapping but I think an
effective one since it's shorter and does not require the shift key.

The mappings [look like this][MAPPINGS_IN_SITU]:

    map <leader>- :sp<bar>b
    map <leader>\ :vsp<bar>b


## Why `\` and not `|`


When I first made the mapping, I used `-` for horizontal splits and `|` for
vertical split, since each of those characters look like the type of split they
produce. This ended up being annoying since `-` does not need a
shift and `|` does. To make typing them more constant I settled on `\` since
it's the lowercase `|`.

## Open buffer in a new tab

Upon occasion I use vim tabs to separate out different types of files of what I
am working on (e.g. Working on Python files in one tab and Javascript and HTML
in another). I found that I was wishing for the same quick mapping that I had
for vim windows, so I created this mapping:

    map <leader>t :tabe<bar>b

## What's the point?

The mappings are quite simple but change a 7 character mixed-case sequence
into a 4 character lowercase sequence. I would highly recommend them to anyone
who uses vim windows, buffers and tabs.


[MAPPINGS_IN_SITU]: https://github.com/hockeybuggy/dotfiles/blob/f067eaae643b0aa5ffa36fdd6154a5d002598df3/vimrc#L103-L105
