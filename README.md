hockeybuggy.com
===============

The Jekyll content of my personal website.

#Build for Development

    rake dev:build

#Build for Production

    jekyll build

# Deploy

Currently on a server of mine I have a bare repo and a post-receive to build
the site.

To set this server up:
    # install rvm
    # install ruby 2 and set to default
    # install jekyll
    # create folder for nginx to serve for development
    # set up git hook

## Stage

    git push deploy master

## Production

    git remote add deploy LOCATION_OF_DEPLOY_SERVER
    git push deploy master

