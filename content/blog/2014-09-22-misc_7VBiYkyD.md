+++
title = "State of the Dotfiles"
date = 2014-09-22
edit_date = 2014-10-03
header_img = "static/img/stateofthedotfiles-2014.jpg"
tags = []
categories = []
aliases = [
  "/misc/2014/09/22/misc_7VBiYkyD.html",
]
+++


In this post I am gonna talk about the things in my configuration that I am
really excited about. Warning: non-technical people may find this either super
boring, undecipherable or both. Often the things I am excited about are recent
changes, but sometimes they are old treasures that I really like.

I spend quite a bit of time working on my [dotfiles][STATE]. The nicer the
environment, the easier it is to work.  Since the beginning of the year, I have
made 63 commits, which brings my total to 292 since March 2012.

------------

## Vim

I really like Vim. I like it an (almost) embarrassing amount. It has taken me a
while to build up my muscle memory but now that I have, it makes me look and
feel like a wizard (the casting spell kind, not the helping people use software
kind).

### Switching to Vundle

For a long time, downloading the plugins I use for Vim was handled by [Tim
Pope's][TPOPE] [Pathogen][PATHOGEN]. It's is a really great way to keep plugins
out of your dotfiles revision history, but it's not perfect. The problem is
that it relies on git submodules, and git submodules [kinda][GITSUB1]
[suck][GITSUB2].

### Airline

For quite some time I used custom statusline that was simple but did the job
quite well. It communicated things like which git branch was active and which
buffer was active. It's only issue was that it was sometimes difficult to see
what mode Vim was in my peripheral vision.

In a 'the grass looks greener over there' sort of move I switched to
[airline][AIRLINE]. It not only solves the problem of losing track of modes but
It also helps keep track of which is the current split window. As iceing on the
cake, it also tells me which line has trailing white-space or mixed
indentation.

![Demonstration of Airline switching modes][AIRLINEDEMO]

### Spellfile

I am really bad at spelling. While English may be my first language I am pretty
sure I am more proficient in several programing languages. Thankfully Vim can
help me compensate for my shortcomings with `:set spell`. Once spelling is
turned on misspellings are highlighted and can be managed with the following
normal mode mappings:

- `z=`: Show possible spelling corrections for the typo under the cursor
- `zg`: Add the "typo" under the cursor to the spellfile. More on this later
- `[s`: Move to previous typo
- `]s`: Move to next typo

The spellfile is the magical file of words that allow you to maintain your own
supplemental dictionary. For example check out [mine][SPELLFILE]. Keeping it in
revision control allows you to have your own dictionary on any machine you use.
Take that Microsoft Office.

### Completions

One my favorite feature of Vim is it's approach to completions. Some IDEs like
Visual Studio and Eclipse have tab completion which try to produce a list of
things you might mean to type (like function names in the project. While this
can be nice sometimes, it is **CRAZY** distracting. Vim will only give you a
completion list when you ask for it and Vim has a number of different list you
can choose from. From insert mode type:

- `<CTRL-n>`: Generic Complete
- `<CTRL-x><CTRL-n>`: Search among the current buffers to complete a word
- `<CTRL-x><CTRL-i>`: Search among the included files to complete a word
- `<CTRL-x><CTRL-f>`: Search among the current directory to complete a filename
- `<CTRL-x><CTRL-k>`: Search among the dictionary to complete a word
- `<CTRL-x><CTRL-l>`: Search among the current buffers to complete a whole line
- `<CTRL-x><CTRL-o>`: Context sensitive (language aware) search for a word

For a comprehensive list take a look at the help page with `:help compl-keyword`

------------

## Zsh

If I told you that I came to use zsh just because of the features it has over
bash, I would be lying. Another thing that made me really want to use it was
the differences between the American and Canadian pronunciation of the letter
'Z'. While most people call it 'Zee-shell', I patriotically call it 'Zed-Shell'.

### My Favourite Features

While I might have come to use zsh for the wrong reasons, I think that I have stayed
for the right ones. One of the most visually apparent is the **multi-line prompts**
(you can see an example of it in the right pane of the image at the top). I
really like having a multi-line prompt since I means that a lot of information
can be shown on the top line and long commands can still be typed on the second
line.

Another feature that is keeping me using zsh is what happens when the typed
command is not found in the path. This is what happens if your fingers slip in
bash (ubuntu 14.04):

    (bash) > gti log
    No command 'gti' found, did you mean:
     Command 'gtg' from package 'gtg' (universe)
     Command 'gt5' from package 'gt5' (universe)
     Command 'ti' from package 'ti' (universe)
    ... ETC ...
     Command 'gtv' from package 'smpeg-gtv' (universe)
    gti: command not found

Which is totally and completely **useless**. zsh out of the box does this:

    (zsh) > gti log
    zsh: correct 'gti' to git' [nyae]?

Useful. `y` will make the listed correction, `n` will execute the typed command
anyways. `a` will **A**bort the whole thing. `e` will **E**dit the command.

### Z directory jumper

I like to keep my home directory really well organized, but it can still be
taxing to remember where I keep all the projects I hack away on. To combat this
I make use of the [directory jumper Z][Z]. This awesome tool tracks highly used
directories based on frecency (a portmanteau of recent and frequency). For
example when I want to jump to my dotfiles directory I just type:

    > z dot

Rather than:

    > cd .dotfiles

Pretty slick.

------------

## Tmux

Tmux is a bit of a god-send. I was having a hard time managing all my terminals
and so I moved to the [window manager i3][I3]. It was a really cool way to
manage my windows and was great for multiple monitors, but it was less than
perfect for running Steam and meant that I was completely out of my element
when I used a traditional window manager.

Tmux allowed me to switch back to a 'traditional' window manager and keep my
Vim and Shell in the same window. Tmux is also a great way to run multiple
shells on a remote servers over only one ssh connection.

### CTRL-a Prefix

To interact with a Tmux instance you first type a control sequence, called a
prefix, and then the mapping. By default this prefix is `<CTRL-b>`, but I am
not a big fan. To type `<CTRL-b>` on a standard English keyboard, you have to
take your entire left hand off the "home row".

As an alternative prefix I, and many other people, use `<CTRL-a>`. It's a lot
closer to the left control key, and if you the caps lock key into another
control key, it is adjacent.

### TAT

When creating Tmux sessions to work on things, I was finding it super hard to
come up with names for sessions. Every time I tried I was reminded of this:

<blockquote>
There are only two hard things in Computer Science: cache invalidation and
naming things.
<br/>
-- Phil Karlton
<cite>
    <a href="http://martinfowler.com/bliki/TwoHardThings.html">(source: Martin Fowler)</a>
</cite>
</blockquote>

[Thoughtbot][THOUGHTBOT] has an awesome solution to this in [their
dotfiles][TAT]. This script either creates or attaches to a Tmux session with
the same name as the working directory. Meaning that creating a sensible named
session is as easy as navigating to the root directory of a project and typing
`tat`. Meaning that creating a new session to edit my dotfiles is as easy as:

    > z dot
    > tat

Nifty.

### vim-tmux-navigator

When you use Vim within a Tmux Session the line between Vim *Windows* and Tmux
*Panes* can get pretty blurred; Sometimes blurred to a frustrating degree.
Trying to remember whither you need to type `<CTRL-a> h` or `<CTRL-w> h` when
you simply want to move to the right can get tiring.

A really cool person called [Chris Toomey][CHRIS] created
[vim-tmux-navigator][VIMTMUXNAVIGATOR]. This really neat vim plugin allows you
to move between Vim *Windows* and Tmux *Panes* as though they were a single
homogeneous entity. Moving to the right is always `<CTRL-r>`.

------------

## Miscellaneous

Some things in my dotfiles don't really fit in with the other sections. Hence
this cleverly named section.

### War on Caps Lock

I really hate the caps lock key; I hate it almost to the point where I have
considered writing tirades about how useless it is. I've almost disowned my
sister over her persistence in keeping her caps lock key. But instead, I am
gonna quickly rant about here. Feel free to skip it.

`<rant>`

Caps lock keys are artifacts from they days when pressing a key on a keyboard
provided the energy to swing a little letter clad hammer aggressively at a
piece of paper. To type an uppercase letter, the shift key would lift a tray of
keys to change to a different set of hammers, so holding the shift key down
would require quite a bit of force and would strain people's pinkie finger. The
caps lock key was added to reduce this strain. Pressing it once would lift the
uppercase tray into place and pressing it again would lower it again.

These days are long gone, but the key is not. Many computer users (without a
disability) are able to type while holding the shift key if they really need
too. Since I am able to, I opt to use one of the best placed keys on the
keyboard for something useful: Another control key.

Since I use Tmux and Vim so much, having a better placed control key is really
useful. When I am chording control with a key on the bottom row I use the left
control key and when chording with a 'home' row, or an top row key I use the
"Caps Lock" key. It's pretty great.

`</rant>`

### Terminal

While looking at a lot of other peoples configurations, I realized a lot of
other people using [iTerm2][ITERM2]. However, since I used Linux rather than OS
X, I have to use another terminal: [urxvt][URXVT]. It doesn't have the fancy
GUI that iTerm2 has to configure the terminal, which is fine for normal use
since I don't have to change options much once I have found a comfortable
configuration. But I use a small font on a dark background, which is not great
for presentations. To rectify this I use gnome-terminal and gvim (gnome-vim)
which have been set up with a large font and light background.

## TL;DR

I have a pretty cool configuration.

[STATE]:https://github.com/hockeybuggy/dotfiles/tree/533ddd69f50f7ac16d37a79fc0ae347a44abf754

[TPOPE]: https://tpo.pe/
[PATHOGEN]: https://github.com/tpope/vim-pathogen
[GITSUB1]: http://codingkilledthecat.wordpress.com/2012/04/28/why-your-company-shouldnt-use-git-submodules/
[GITSUB2]: http://somethingsinistral.net/blog/git-submodules-are-probably-not-the-answer/

[AIRLINE]: https://github.com/bling/vim-airline
[AIRLINEDEMO]: https://github.com/bling/vim-airline/wiki/screenshots/demo.gif
[SPELLFILE]: https://raw.githubusercontent.com/hockeybuggy/dotfiles/master/vim/spell/en.utf-8.add

[Z]: https://github.com/rupa/z

[i3]: https://i3wm.org/
[THOUGHTBOT]: https://thoughtbot.com/
[TAT]: https://github.com/thoughtbot/dotfiles/commits/master/bin/tat
[CHRIS]: https://github.com/christoomey
[VIMTMUXNAVIGATOR]: https://github.com/christoomey/vim-tmux-navigator

[ITERM2]: https://iterm2.com/
[URXVT]: https://wiki.archlinux.org/index.php/rxvt-unicode
