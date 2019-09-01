
For myself, as a computer nerd, the program
[ls](https://en.wikipedia.org/wiki/Ls) is my portal to all of my files.  It is a
very simple program as it adheres to the Unix philosophy of "do one thing and
do it well". All that ls does is list the files in a directory. Any directory! 

## Simple output

Output can be as simple as just the files and directories. 

Most of the time today people have access to terminals with colour and get the
added benefit of colourized output. Being able to see quickly the file type and
permissions is invaluable when trying to get your head around a new directory.

    > ls
    content        Makefile  pelicanconf.py   publishconf.py   README.md     theme
    develop_server.sh  output    pelicanconf.pyc  publishconf.pyc  requirements.txt

## My preferred output

Myself I prefer to always see the files listed in a table rather then inline.

    > ls -lh
    total 44K
    drwx------ 7 douglas douglas 4.0K Feb 28 12:58 content
    -rwxr-xr-x 1 douglas douglas 1.8K Jan 16 14:09 develop_server.sh
    -rw-r--r-- 1 douglas douglas 2.6K Jan 17 19:09 Makefile
    drwx------ 9 douglas douglas 4.0K Feb 28 12:55 output
    -rw-r--r-- 1 douglas douglas 2.3K Feb  9 12:27 pelicanconf.py
    -rw-r--r-- 1 douglas douglas 3.2K Feb  9 12:27 pelicanconf.pyc
    -rw-r--r-- 1 douglas douglas  351 Feb  1 01:19 publishconf.py
    -rw-r--r-- 1 douglas douglas  431 Feb  1 01:19 publishconf.pyc
    -rw-r--r-- 1 douglas douglas 1.3K Feb 28 22:28 README.md
    -rw-r--r-- 1 douglas douglas  247 Jan 30 21:51 requirements.txt
    drwxr-xr-x 4 douglas douglas 4.0K Jan 28 01:32 theme

In my opinion I think that the list view is much more readable then the inline
view. I also think that having directories consistently shown as a list makes
it easier to scan your terminal for the file names of the directory you are in.

