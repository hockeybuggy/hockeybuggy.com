hockeybuggy.com
===============

The Jekyll content of my personal website.

#Build for Development

    rake dev:build

#Build for Production

    jekyll build

# Deploy

## Stage

## Production

Currently on a server of mine I have a bare repo and a post-receive to build
the site, move it to a directory that nginx is serving.

    git push deploy master
