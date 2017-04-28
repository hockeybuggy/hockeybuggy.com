
[![Build Status](https://travis-ci.org/hockeybuggy/hockeybuggy.github.io.svg?branch=master)](https://travis-ci.org/hockeybuggy/hockeybuggy.github.io)

# Hockeybuggy.com

The personal website of Douglas James Anderson.


## Dependencies

1. ruby
2. jekyll
3. python (To create new posts)


## Making Changes

Download the repository and install dependencies:

    git clone git@github.com/hockeybuggy/hockeybuggy.github.io.git
    bundle install


### Edit posts

To write a new post start with:

    ./script/new_post

You can also use flags to set date or title

    ./script/new_post --title "great title" --date 2014-12-15


### Build the site

Install the dependencies:

    ./script/bootstrap

Generate and watch the site with:

    ./script/server


### Run the tests

If you want to check that the page does not lead to dead ends run the tests:

    ./script/test

If you don't want to run them locally, CI will run the tests.


### Deployment

This site is hosted on GitHub Pages. To deploy just push to the master branch on GitHub:

    git push origin master
