---
layout: post
title: "My CS Undergrad. A git log Retrospective"
date: 2014-10-06
categories: misc
author: Douglas Anderson
---

Today I attended convocation at the University of Guelph. I honour of this
event in my life, I went back and attempted to summarize my academic
experiences by looking though the commits of various git repositories.

## Data Acquisition

How I got the data.

----

## Word Frequencies

How I measured this.

### Top 10

The 10 most common words in my commit messages were:

Word | Occurrences
| -: | :- |
the  | 745
to   | 515
I    | 467
a    | 328
and  | 235
for  | 214
of   | 211
Added| 159
is   | 153
in   | 132

Most of these are [Stop Words][STOPWORDS] since they are largely filler words.
The only word that really stands out to me is "Added".

### Top Capital Words

Within the top 100 word there are another 17 words that start with capital
letters. 65% of these are verbs and 5.9% of these are misspelled.

Overall | Word    | Occurrences
| ----: | :------ | :--- |
7       | Added   | 159
19      | Now     | 82
22      | Started | 66
23      | Fixed   | 64
30      | Wrote   | 52
32      | It      | 48
44      | Finshed | 36
49      | Merge   | 33
54      | Still   | 28
59      | The     | 26
61      | Adding  | 25
71      | Made    | 22
73      | Got     | 22
74      | Not     | 22
82      | Removed | 20
86      | Did     | 20
87      | Created | 20

What I take away from this is that a great deal of my commit messages start
with a verb. As well, I am unable to spell the word 'finished'. In the log, I
have written 'Finshed' 36 times and 'finshed' 12 times. I spelt it correctly 0
times.

### Swearing

I was actually really surprised at how rarely I swore in my commit messages.
Here is an exhaustive list of my swearing:

Overall | Word    | Occurrences
| ----: | :------ | :--- |
458     | suck    | 4
550     | shit    | 3
916     | balls   | 2
1004    | fucking | 2
1470    | shitty  | 1
1667    | fuck    | 1
1762    | shittly | 1
2778    | fucked  | 1

----

## Time of day

Holla

[STOPWORDS]: http://en.wikipedia.org/wiki/Stop_words
