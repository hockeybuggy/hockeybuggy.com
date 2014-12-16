# hockeybuggy.com

The Jekyll content of my personal website.

## Dependencies

1. jekyll
2. ruby
3. python (To create new posts)

## Making Changes

Download the repository and install dependencies:

    git clone git@github.com/hockeybuggy/hockeybuggy.github.io.git
    bundle install

To write a new post start with:

    ./new_post.py misc

or to create a post with a specific date

    ./new_post.py wpotd --date 2014-12-15

## Build

After making changes the site can be generated with:

    jekyll build

Or for local development:

    jekyll serve --watch --drafts

## Deploy

To deploy just push to the master branch on github:

    git push origin master

or with my git aliases:

    git pom

