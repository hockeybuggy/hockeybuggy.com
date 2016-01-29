# hockeybuggy.com

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

Generate and watch the site with:

    ./script/server

### Deployment

This site is hosted on Github Pages. To deploy just push to the master branch on github:

    git push origin master
