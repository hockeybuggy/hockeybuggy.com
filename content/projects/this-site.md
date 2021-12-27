---
title: This website
slug: "this-site"
order: 20
github: "https://github.com/hockeybuggy/hockeybuggy.com"
bannerImageName: "projects/this-site/banner.png"
bannerAltText: "A screenshot of the header of this website."
---


This my personal website is a place I use to try out new things. This project
has been running in some form or another for a little over 10 years now.

<!-- excerpt -->


## History of the site

### The fuzzy pre-git history

I originally setup the domain sometime in high school (late grade 9 maybe? I
don't really remember). I believe that the very first version of the site was a
static HTML page. At the time I was learning some basic HTML, PHP, and cgi-bin
Perl with my uncle.

The first version of the site I can find was one from 2nd year when I was in my
second year University. If you look at the [Internet
archive](https://web.archive.org/web/20110207131733/http://hockeybuggy.com/underconstruction.html)
it has a (now cliché) "under construction" message.


### Previous static site generators

This site has used a few different static site generators (a software tool that
rendered content as static html pages).

The first static site generator I used was Pelican:
[I wrote a blog post about it when I did
so](/blog/post/2012/12/taking-this-pelican-site-live). I choose Pelican at the
time because I was comfortable with Python and Pelican seemed like the best
option at the time.

The next year I ported the content to Jekyll: [Again I wrote about
it](/blog/post/2013/09/migrated-to-jekyll). I did this because I was finding
Pelican difficult to setup on new machines (I don't remember why). At the time
Jekyll was supported by GitHub pages which was attractive to be because I
didn't want to spend money hosting the site while I was in university (not that
I would seek it out now).

Jekyll worked well for a while. This was a time where a wrote more by writing
about cool things I learned from Wikipedia (I have taken these posts down
because I wasn't particularly proud of the quality of the writing). After a
while the site sat dormant. In the beginning this was because I wasn't
interested in adding to it, but later it was because I was finding it difficult
to setup Jekyll (mostly because I never got fully comfortable with the Ruby
ecosystem.

To address the "burden of setup problem" I switched the static site to Hugo:
[And I wrote about it](/blog/post/2019/09/migrated-to-hugo). I did this because
Hugo is built in Go and has a design goal of being a single executable which
meant that writing new blog posts would be as easy as cloning the repository
and installing the executable. I also switched from using GitHub pages to
Netlify (mostly in order to try something new).

After Hugo this site was changed to use the Gatsby static site generator: [I
wrote about it](/blog/post/2020/05/switching-to-gatsby). I first used Gatsby
when I was making a wedding website for a friend. My friend and their partner
had too much going on to leave them to edit pages so I wanted them to be able
to edit content without having to learn how to commit things. I used Gatsby
setup with AirTable as a source for content. I was quite pleased with how this
turned out so I decided to port my personal blog to use Gatsby as well. I
changed to use Gatsby and liked it well enough. My biggest struggles were
related to the generation of types and my modest GraphQL ability. The thing I
am most proud of with this incarnation of the website is the end to end tests.
For every commit it uses [Puppeteer](https://github.com/puppeteer/puppeteer) to
check that pages render, don't log any errors to the console, and take screen
shots.


### Today

Today this uses `Next.js`. I got a chance to use it at work and enjoyed it.
Since this was already a React based site converting it from the Gatsby
implementation was possible.


## Plans for the future

I don't really have specific plans for the site. I like having a place to try
out new ideas with low stakes and it will continue to be used for that purpose.
I will also use the site to improve my writing, which like all skills, require
practice.
