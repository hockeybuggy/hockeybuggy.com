---
layout: post
title: "State of the Dotfiles"
date: 2014-09-02
categories: misc
author: Douglas Anderson
---

I spend quite a bit of time working on my [dotfiles][STATE]. The nicer the
environment the easier it is to work. Since the beginning of the year I have
made 63 commits, bringing the total to 292 since I started the keeping dotfiles
since March 2012.

In this post I am gonna talk about the things in my configuration that I am
really excited about. Often the things I am excited about are recent changes,
but sometimes they are old treasures that I really like.


<a href="{{ site.url }}/static/img/stateofthedotfiles-2014.jpg">
<img class="center" src="{{ site.url }}/static/img/stateofthedotfiles-2014.jpg" alt="What my terminal looks like today"/>
</a>

## Vim

I really like Vim; I like it an (almost) embarrassing amount. It has taken me a
while to build up my muscle memory but now that I have, it makes me look and
feel like a wizard (the casting spell kind, not the helping people use software
kind).

### Switching to Vundle

For a long time, downloading the plugins I use for Vim was handled by [Tim
Pope's][TPOPE] [Pathogen][PATHOGEN]. It's is a really great way to keep plugins
out of your dotfiles revision history, but it's not perfect. The problem is
that it relies on git submodules and git submodules [kinda][GITSUB1]
[suck][GITSUB2].

### Airline

For quite some time I used custom statusline that was simple but did the job
quite well. It communicate things like which git branch was active and which
buffer was active. It's only issue was that it was sometimes difficult to see
what mode Vim was in my peripheral vision.

In a 'the grass looks greener over there' sort of move I switched to
[airline][AIRLINE]. It not only solves the problem of losing track of modes but
It also helps leep track of which is the current split window.

![Demonstration of Airline switching modes][AIRLINEDEMO]

### Spellfile

### Completions

One my favorite feature of Vim is it's approach to completions. Some IDEs like
Visual Studio and Eclipse have tab completion which try to produce a list of
things you might mean to type (like function names in the project. While this
can be nice sometimes, it is **CRAZY** distracting. Vim will only give you a
completion list when you ask for it and Vim has a number of different list you
can choose from. From insert mode type:

- ` <CTRL-n>`: Generic Complete
- ` <CTRL-x><CTRL-n> `: Search among the current buffers to complete a word
- ` <CTRL-x><CTRL-i> `: Search among the included files to complete a word
- ` <CTRL-x><CTRL-f> `: Search among the current directory to complete a filename
- ` <CTRL-x><CTRL-k> `: Search among the dictionary to complete a word
- ` <CTRL-x><CTRL-l> `: Search among the current buffers to complete a whole line
- ` <CTRL-x><CTRL-o> `: Context sensitive (language aware) search for a word

For a comprehensive list take a look at the help page with `:help compl-keyword`

------------

## Zsh

If I told you that told you that I came to use zsh just because of the features
it has over bash I would be lying. Another thing that made me really want to
use it was the differences between the American and Canadian pronunciation of
the letter 'Z'. While most people call it 'Zee-shell' I patriotically call it
'Zed-Shell'.

### My Favourite Features

While I might have come to use zsh for the wrong reasons I think I have stayed
for the right ones. One of the most visually apparent is the **multi-line prompts**
(you can see an example of it in the right pane of the image at the top). I
really like having a multi-line prompt since I means that a lot of information
can be shown on the top line and long commands can still be typed on the second
line.

Another feature that is keeping me using zsh is what happens when the command
you type is not found in the path.

### Z directory jumper

### Scripts


------------

## Tmux

### TAT

### vim-tmux-navigator

------------

## Terminal

While looking at a lot of other peoples configurations, I realized a lot of
other people using [iTerm2][ITERM2]. However, Since I used Linux rather than OS
X, I have to use another terminal: [urxvt][URXVT]. It doesn't have the fancy
GUI that iTerm2 has to configure the terminal which is fine for normal use
since I don't have to change options much once I have found a comfortable
configuration. But I use a small font on a dark background, which is not great
for presentations. To rectify this I use gnome-terminal and gvim (gnome-vim)
which have been set up with a large font and light background.

[STATE]:https://github.com/hockeybuggy/dotfiles/tree/533ddd69f50f7ac16d37a79fc0ae347a44abf754

[TPOPE]: https://tpo.pe/
[PATHOGEN]: https://github.com/tpope/vim-pathogen
[GITSUB1]: http://codingkilledthecat.wordpress.com/2012/04/28/why-your-company-shouldnt-use-git-submodules/
[GITSUB2]: http://somethingsinistral.net/blog/git-submodules-are-probably-not-the-answer/

[AIRLINE]: https://github.com/bling/vim-airline
[AIRLINEDEMO]: https://github.com/bling/vim-airline/wiki/screenshots/demo.gif

[ITERM2]: http://iterm2.com/
[URXVT]: https://wiki.archlinux.org/index.php/rxvt-unicode

