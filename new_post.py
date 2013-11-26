#!/usr/bin/env python

import sys
import pystache
import argparse
import datetime
from os import path

templatesDirStr = "_templates"
outputDirStr = "_posts"
category_names = ["misc","wpotd"]
dateformat = "%Y-%m-%d"

def parseargs():
    parser = argparse.ArgumentParser(description='Create a new post with a suitable yaml header.')
    parser.add_argument('category', help='A category name')
    parser.add_argument('--title', help="""A title for the post, default='untitled'""")
    parser.add_argument('--date', help="""A publish date for the post in the form:\
            yyyy-mm-dd, default=<today>""")
    # TODO check date and category names
    args = parser.parse_args()

    if not args.date:
        today = datetime.datetime.now()
        args.date = today.strftime(dateformat)
    else:
        try:
            date = datetime.datetime.strptime(args.date, dateformat)
        except:
            print "Error. Invalid time format. Must be in the form yyyy-mm-dd"
            sys.exit(-1)
        args.date = date.strftime(dateformat)
    
    if not args.title:
        args.title = "untitled; a rope of sand"

    return args

def main(category, date, title):
    with open(path.join(templatesDirStr,"post.mustache")) as f:
        template = f.read()
        print pystache.render(template, {"category":category, "date":date, "title":title})

if __name__ == "__main__":
    args = parseargs()
    main(args.category, args.date, args.title)


