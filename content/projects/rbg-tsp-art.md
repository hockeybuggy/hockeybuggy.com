---
title: RGB Traveling Salesperson Art
slug: "rgb-tsp-art"
order: 50
bannerImageName: "projects/rgb-tsp-art/banner.png"
bannerAltText: "A close up image of a face drawn with 3 continous lines; one red line one blue line and one green line. The face is the face of Douglas."
---

This is a creative project that I am very proud of and isn't software.
Traveling Salesperson is problem when "given a list of cities what is the
shortest distance between them". The lines generated this way have a nice
quality where the they very rarely intersect. This means that you can create a
stippled version of an image and create a image that looks like a single line
version of the original image. I used this approach on a colour component
version of an image and produced image that I eventually plotted using a XY pen
plotter.

<!-- excerpt -->

## Software

The software that I use for creating the stippled svgs that can be sent to the
plotting software is [StippleGen](https://wiki.evilmadscientist.com/StippleGen)
pby Evil Mad Scientist Laboratories.

![An example of the software using the face of Grace Kelly][STIPPLE_GEN]

[STIPPLE_GEN]: https://evilmadscience.s3.amazonaws.com/wiki/eggbot/stipplegen/v2docs/grace2k-newframe.png

This is a program written using the Processing framwork and it allows for a few
different controls. The primary control to play with when creating an svg
suitable for plotting is the number of stipples desired. The program has two phases:

- It stipples the images (renders a likeness of the original image using only points)
- It uses those points as cities in a Traveling Salesperson route

After the program is done it allows you to save a `svg` of either the stipples
or the route between stipples.

## Plotter

The plotter that I am using is a [MakeBlock XY Plotter Robot
Kit](https://www.makeblock.com/project/xy-plotter-robot-kit). This plotter
comes with some software called `mDraw` which I used to control the plotter
from a computer.

The plotter has some problems. The software struggles sometimes to error when
importing some svgs, but will instead silently error. The plotter's pen
mechanism can be finicky.

![An image of a person in a stripped shirt using a stippled art style.][STIPPLED_PERSON]

[STIPPLED_PERSON]: /static/img/projects/rgb-tsp-art/stippled-person.png

![An animation of the plotter drawing a goat with a fine pen.][GOAT]

[GOAT]: /static/img/projects/rgb-tsp-art/goat.gif

## RGB art

You made an RBG image by using some image editing software to split the image
into different bands of colours (I suppose it doesn't need to be Red, Green,
and Blue if you have an image that has some specific highlight colours).

I started with a picture of myself at my sister's wedding (this was pretty much
the last time I didn't have a beard). I split it and then put a blue pen in the plotter:

![A pen plotter drawing a blue line drawing of Douglas][BLUE_LAYER]

[BLUE_LAYER]: /static/img/projects/rgb-tsp-art/blue-layer.jpg

Then after it finished I put a green pen in the plotter and drew the green layer:

![A pen plotter drawing a green line on top of the existing blue line drawing of Douglas][GREEN_LAYER]

[GREEN_LAYER]: /static/img/projects/rgb-tsp-art/green-layer.jpg

Finally we draw the red layer:

![A pen plotter drawing a final red line on top of the existing blue and green line drawing of Douglas][RED_LAYER]

[RED_LAYER]: /static/img/projects/rgb-tsp-art/red-layer.jpg

It's a very manual and messy process to run the plotter and get the layers on
top of one another nicely. But when it works it's very rewarding.
