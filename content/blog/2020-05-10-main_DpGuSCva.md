---
title: Switching to Gatsby
slug: "switching-to-gatsby"
date: "2020-05-10"
tags:
- development
categories:
- meta
---

This past week I decided to spend some time switching this website to use
Gatsby. This comes on the heels of switching to Hugo at the end of last year.

<!-- excerpt -->


## Why the switch?

No big grand reason. The biggest reason to make the switch was my experience
with React compared to the Hugo templating. It feels nice to use similar tools
to what I use day to day and feel like I have more control over the look of the
site.

I first worked with Gatsby for a friends wedding website and was really pleased
with it. It's got some very impressive things built in like prefetching links,
and image preprocessing (with cool things like "blur up" where the image first
loads as a minimal blurry base64 equivalent while the full image loads). One of
the things that also encouraged me to make the switch was Gatsby's excellent
docs.

## Cool things

### Automatic dependency updates

The JavaScript ecosystem contains many small packages and changes rapidly. To
help keep up with that there are systems like Dependabot which will open PRs on
the GitHub repo periodically. Normally it's up to people to review these and
merge the changes.

For this repo I decided to try our a service called
[Mergify](https://mergify.io/). It will read a configuration with a set of
rules and will merge dependency pull requests without any human interaction if
the tests pass!

An example of this can be seen
[here](https://github.com/hockeybuggy/hockeybuggy.com/pull/69). Notice that
this was opened by a bot and merged by a bot once the tests passed.


### End to End tests

The "automatic dependency updates" could be a really good way for this site to
break without noticing nice not every dependency is a non-breaking change. In
order to catch the site breaking before merging these changes in this static
site now has tests that fires up a headless browser and checks that the page renders.

This project has a [GitHub
action](https://github.com/hockeybuggy/hockeybuggy.com/actions?query=workflow%3A%22end+to+end+tests%22+branch%3Amaster)
that runs this process. The tests take screen shots while it's running of
various pages. These are collected as build artifacts.


## Wrapping up

Hugo had some really good things going for it. I will miss it's single
executable (since setting up a node environment can occasionally by tricky).
Thanks to the contributors of Hugo as well as the authors of the `hugo-coder`
theme that I recreated here.

Looking forward to continuing to improve the site and writing about it as well
as looking forward to learning more about Gatsby.  Hopefully I'll also write
about other things (other than my lovingly over-built simple website).


