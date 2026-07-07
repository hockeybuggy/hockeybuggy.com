---
title: Dotfiles
slug: "dotfiles"
order: 30
github: "https://github.com/hockeybuggy/dotfiles"
bannerImageName: "projects/dotfiles/banner.png"
bannerAltText: "A screenshot of my configuration files or dotfiles. The image depicts some common vim settings."
---

This "project" is my configuration files for setting up a computer. It contains
aliases and options for setting up the software I use day to day. A
`bootstrap.sh` script symlinks everything into place. This repository has
history going back to early 2012.

<!-- excerpt -->

## Neovim

My primary editor is Neovim. My configuration is a Lua config based on
[kickstart.nvim](https://github.com/nvim-lua/kickstart.nvim) and managed with
[lazy.nvim](https://github.com/folke/lazy.nvim). I use Neovim's built-in LSP
for completions and language server integrations, along with
[Treesitter](https://github.com/nvim-treesitter/nvim-treesitter) for syntax,
[Telescope](https://github.com/nvim-telescope/telescope.nvim) for fuzzy
finding, and [conform.nvim](https://github.com/stevearc/conform.nvim) for
formatting. My configuration [can be found
here](https://github.com/hockeybuggy/dotfiles/blob/main/.config/nvim/init.lua)

## Git

My [git
configuration](https://github.com/hockeybuggy/dotfiles/blob/main/.gitconfig) has
quite a few aliases. I also use
[`diff-so-fancy`](https://github.com/so-fancy/diff-so-fancy) to get some nicer
looking diffs. I tend to sign all of my commits with GPG.

## Shell

I use zsh (I am Canadian so it's "zed shell") as my shell and I used
[starship.rs](https://starship.rs/) for my prompt (this is a prompt written in
rust that is very fast, configurable and fully featured).

All of the aliases I use are [split into a
file](https://github.com/hockeybuggy/dotfiles/blob/main/.aliases) that is
separate from zsh config so that I can also make them available if I wanted to
use bash

## Command line tools

Over the years I have replaced a lot of the standard Unix tools with faster,
friendlier alternatives (many of them written in Rust):

- [`eza`](https://eza.rocks/) in place of `ls`
- [`bat`](https://github.com/sharkdp/bat) in place of `cat`
- [`ripgrep`](https://github.com/BurntSushi/ripgrep) in place of `grep`
- [`fd`](https://github.com/sharkdp/fd) in place of `find`
- [`fzf`](https://github.com/junegunn/fzf) for fuzzy finding
- [`zoxide`](https://github.com/ajeetdsouza/zoxide) for jumping between
  directories

A lot of my aliases wire these tools together, and I lean on `fzf` in both the
shell and inside Neovim.
