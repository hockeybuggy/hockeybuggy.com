---
title: Switching to Next.js
slug: "switching-to-next-js"
date: "2021-12-26"
tags:
- development
categories:
- meta
---

In the continuing saga of this humble website: I have changed the underlying
tech stack again, this time to use Next.js. I am aware that many (most?) of the
posts on this site are related to changing the site itself but since the
intention of this site is to try out new things I am trying not to feel self
conscious about it.

<!-- excerpt -->


## Why the switch?

The most recent change to [this site was moving from Hugo to
Gatsby](/blog/post/2020/05/switching-to-gatsby). That
previous move was moving towards something more familiar with using React since
I have been using React for the day jobs for the past few years. After moving
to Gastsby I found that I didn't like the GraphQL parts of making changes to
the site. I think that this difficultly was largely from my own lack of
experience with the technology.

Another reason for the switch was the generated TypeScript types generated from
the GraphQL types were large and change superficially frequently making it more
difficult to use.


## Cool things

### All of the cool things from the previous Gatsby rewrite

This incarnation of the site looks mostly the same as the Gatsby version of the
site. This is because it uses the same React components that the Gatsby version
does and changes the data loading to be via the `getStaticProps` and
`getStaticPaths` methods (these are the methods that Next.js uses to generate
pages at build time).


### More control of markdown processing

Previously all of the processing of markdown was happening within Gatsby
plugins. This was really nice from the perspective of getting a lot out of the
box, but meant that some aspects were more difficult to control. This Next.js
approach uses [`markdown-it`](https://github.com/markdown-it/markdown-it) to
process the markdown in a opinionated and extendable way.


## Wrapping up

I am hoping that this change will make it easier to make changes to the site. Perhaps someday I'll use this site to tell stories about other projects rather than use the site to tell stories about itself. 🤞.
