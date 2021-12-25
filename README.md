[![Netlify Status][netlify-status]][netlify]
[![Typecheck and Linting][typecheck-and-linting-status]][typecheck-and-linting]
[![End to End Tests][e2e-tests-status]][e2e-tests]
[![Mergify Status][mergify-status]][mergify]

[e2e-tests-status]: https://github.com/hockeybuggy/hockeybuggy.com/workflows/end%20to%20end%20tests/badge.svg
[e2e-tests]: https://github.com/hockeybuggy/hockeybuggy.com/actions?query=workflow%3A%22end+to+end+tests%22+branch%3Amain
[mergify-status]: https://img.shields.io/endpoint.svg?url=https://dashboard.mergify.io/badges/hockeybuggy/hockeybuggy.com&style=flat
[mergify]: https://mergify.io
[netlify-status]: https://img.shields.io/netlify/b608e87e-8c67-45b6-b677-58bbeee9e11c
[netlify]: https://app.netlify.com/sites/hockeybuggy/deploys
[typecheck-and-linting-status]: https://github.com/hockeybuggy/hockeybuggy.com/workflows/tests%20and%20linting/badge.svg
[typecheck-and-linting]: https://github.com/hockeybuggy/hockeybuggy.com/actions?query=workflow%3A%22typecheck+and+linting%22+branch%3Amain

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

    ./scripts/new_post

You can also use flags to set date or title

    ./scripts/new_post --title "great title" --date 2014-12-15


### Build the site

Generate and watch the site with:

    ./scripts/server

To simulate a production build locally:

    yarn run build
    cd public
    python3 -m http.server 8888
    cd -


### Running the tests

To check the built site with an headless browser test:

    ./scripts/test

To check just one page:

    ./scripts/test landingPage

To view the tests running:

    HEADLESS=false ./scripts/test

To view the tests running in slow motion:

    SLOWMO=100 HEADLESS=false ./scripts/test

The tests will also run for every CI build. It will also upload the screenshots
it takes as artifacts. You can find the artifacts by clicking the `...` [on a
workflow](https://github.com/hockeybuggy/hockeybuggy.com/actions?query=workflow%3A%22end+to+end+tests%22+branch%3Amain)
and downloading the `zip` file.


### Deployment

This site is hosted on Netlify. To deploy just push to the main branch on GitHub:

    git push origin main
