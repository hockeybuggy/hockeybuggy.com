---
title: Making a fancy loading state
slug: "fancy-loading-state"
date: "2024-11-15"
tags:
- development
categories:
- meta
---

The homepage of this website (at the time I am writing this) has a photo of
myself. This image was the slowest element to load onto the screen and I wanted
to make that experience fancier.

<!-- excerpt -->

## The initial state

When I started things were looking like this:

<img alt="An image of the homepage before changes were made. In the middle of the page there is a circular image of the author" src="/static/img/blog/2024-11-15-main_COJNQNBD/before.png"  class="small-centered-image"/>


There was a grey border around the image. When running Chrome's lighthouse
tools against the page the image was identified as the largest item visible in
the viewport. In contents were emulated throttling was used we were seeing an
LCP of around 4 seconds. Additionally, before the image loaded the grey
background was the only thing visible and the image appearing was a bit jarring
in (in throttled contexts).

## The approach

Since the image was already as small as it was practical to make it (less bytes
=> more speed), The goal was to improve the perceived performance.

I wanted to make a small SVG that looked like the image, and then would swap
out once the image was loaded.

---

One option would have been to use something like [BlurHash](https://blurha.sh/)
which uses JS to take precalculated short string and turn it into a blurred
facsimile of the image.

If we had a lot of images to that we needed to make nice loading states for
this would be a good option for us. But the JS would need to be loaded and
parsed before we could show the blurred representation. This approach had
another strike against it which was that a blurred version of the image
unblurring wasn't a very "fun" solution.

---

Another option that I considered was to calculate a [Voronoi
diagram](https://en.wikipedia.org/wiki/Voronoi_diagram) of the image. Doing
this would take the raster image into an interesting set of vectors. These
vectors would be a set of polygons that could be coloured with the most comment 

An uncoloured version of this would look something like this:

![A version of the home page image made of many different voronoi cells][VORONOI]

I opted to not pursue this path because the SVG were using needs to be quite
small to achieve our goals of faster perceived performance. If the SVG is too
large (and the SVG is loaded inline with the initial load of the page) the FCP
of the page will suffer.


---

In the end I removed the background from the image, and brought that into into [Inkscpae](https://inkscape.org/).

![A picture of the tracebitmap tool in Inkscape before running the trace][TRACE_BITMAP_BEFORE]

The "trace bitmap" tool provides a number of different options. We could choose
to decompose the raster into many different polygons. Each polygon would add to
the size of the resulting SVG, but the results could potentially be
multicoloured and quite nice looking. In the end I decided that considering the
fact that the image does load "pretty fast" anyways the simplest solution may
be the best so I selected a simple single scan that produced one output path.

![A picture of the tracebitmap tool in Inkscape after running the trace][TRACE_BITMAP_AFTER]

After simplifying the path a little (to reduce it's size further) I exported the SVG.

## The result

The exported SVG was added to the index page. It was positioned "under" the
image such that the image would cover it once loaded.


<img alt="An image of the homepage after changes have been made made. In the middle of the page there is a circular image with an outline of the author" src="/static/img/blog/2024-11-15-main_COJNQNBD/after-outline.png"  class="small-centered-image"/>

This really only appears to for a fraction of a second with fast connections.
Then the image is loaded and the page looks like this:

<img alt="An image of the homepage after changes have been made made. The image in the middle of the page has updated from an outline of the author to a full colour version" src="/static/img/blog/2024-11-15-main_COJNQNBD/after-loaded.png"  class="small-centered-image"/>


While it was a bit of manual work I am happy with how this turned out visually.
In terms of LCP the measurement hasn't changed (because the largest element is
still the image and not the SVG outline), but experientially it feels much
faster and less jarring when the image loads in.


[VORONOI]: /static/img/blog/2024-11-15-main_COJNQNBD/voronoi.png
[TRACE_BITMAP_BEFORE]: /static/img/blog/2024-11-15-main_COJNQNBD/trace-bitmap-before.png
[TRACE_BITMAP_AFTER]: /static/img/blog/2024-11-15-main_COJNQNBD/trace-bitmap-after.png
