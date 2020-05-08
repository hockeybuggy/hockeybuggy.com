[![Netlify Status](https://api.netlify.com/api/v1/badges/b608e87e-8c67-45b6-b677-58bbeee9e11c/deploy-status)](https://app.netlify.com/sites/hockeybuggy/deploys)

# Hockeybuggy.com

The personal website of Douglas James Anderson.


## Dependencies

This repo expects a version of node as well as yarn installed. This README
assumes that [`fnm`](https://github.com/Schniz/fnm) is used (but there is
nothing wrong with other methods of installing node).


## Making Changes

Download the repository and install dependencies:

    git clone git@github.com/hockeybuggy/hockeybuggy.com.git
    fnm use
    yarn install


### Edit posts

To write a new post start with:

    ./script/new_post

You can also use flags to set date or title

    ./script/new_post --title "great title" --date 2014-12-15


### Build the site

Generate and watch the site with:

    ./script/server

### Running the tests

To check the built site with an headless browser test:

    ./script/test


### Deployment

This site is hosted on Netlify. To deploy just push to the master branch on GitHub:

    git push origin master
