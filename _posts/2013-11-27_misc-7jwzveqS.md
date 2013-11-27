---
layout: post
title: "Using git hooks for quick deployment of a static site"
date: 2013-11-27
categories: misc
author: Douglas Anderson
---

If you have looked into how I create this site you might have noticed that I am
using the static site generator Jekyll. This powerful tool is the best I have
come across for generating html from, my favourite markup language, markdown. 

However there is a problem... Jekyll is written in ruby and depends on it.
Since I am not always in front of the same computer and I can't guarantee that
every computer I use will have ruby installed I had to find another way.

## Git

For quite some time now I have been keeping my files in version contol using
one of the useful peices of software ever created, Git.If you have read this
far I will assume you know of git and will not elaborate further.

Git uses ssh as a transport and is used by companies like heroku to allow users
to push code up to a Platform As A Service and easily deploy webapps.

### Git hooks

The way that git does this is by having a directory called ".git/hooks/" that
contains executable scripts. Each of the scripts corresponds to a particular
phase that git would go though. For example the "pre-commit" hook can be used
that code passes test before it is committed to version control.

In this case I followed the advice on the jekyll website and used the
"post-receive" hook that fires when a remote computer pushes to the repository.
This is used to build the static site and copy it to a folder where it can be
served.

## dokku

A cool option that I may look at in the future if dokku. It is a much more
extreme setup requiring that I install docker would work as a personal PaaS.
Allowing myself to quickly create and host webapplications though a layer of
indirection.


jekyll
markdown
ruby
git
heroku
dokku
docker
