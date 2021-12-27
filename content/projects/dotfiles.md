---
title: Dotfiles
slug: "dotfiles"
order: 30
github: "https://github.com/hockeybuggy/dotfiles"
bannerImageName: "projects/dotfiles/banner.png"
bannerAltText: "A screenshot of my configuration files or dotfiles. The image depicts some common vim settings."
---

This "project" is my configuration files for setting up a computer. It contains
aliases and options for setting up the software I use day to day. This
repository has history going back to early 2012.

<!-- excerpt -->

## Vim

My primary editor is Vim. I use Neovim as the distribution, and use
[coc.nvim](https://github.com/neoclide/coc.nvim) for completions and language
server integrations. My Vim configuration [can be found
here](https://github.com/hockeybuggy/dotfiles/blob/main/vimrc)

## Git

My [git
configuration](https://github.com/hockeybuggy/dotfiles/blob/main/gitconfig) has
quite a few aliases. I also use
[`diff-so-fancy`](https://github.com/so-fancy/diff-so-fancy) to get some nicer
looking diffs. I tend to sign all of my commits with GPG.

## Shell

I use zsh (I am Canadian so it's "zed shell") as my shell and I used
[starship.rs](https://starship.rs/) for my prompt (this is a prompt written in
rust that is very fast, configurable and fully featured.

All of the aliases I use are [split into a
file](https://github.com/hockeybuggy/dotfiles/blob/main/aliases) that is
separate from zsh config so that I can also make them available if I wanted to
use bash
