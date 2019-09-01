
Today I attended convocation at the University of Guelph. I honour of this
event in my life, I went back and attempted to summarize my academic
experiences by looking though the commits of various git repositories.

## Data Acquisition

While `git log` does an great job of summarizing commit data, I needed to
record it to file in a format that I could use for exploration. I found [this
gist][ORIGINAL_GIST] that uses perl to wrestle the `git log` into proper json.
I modified it a bit to have the full commit message rather than a sanitized
summary.

----

## Word Frequencies

To measure the word occurrences I used a simple python script that splits the
commit messages by spaces and uses a `dict` to record the number of
occurrences. It does not even coerce words into lowercase first so "test" and
"Test" are counted separately.

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
with a verb.

As well, I am unable to spell the word 'finished'. In the log, I have written
'Finshed' 36 times and 'finshed' 12 times. I spelt it exactly correctly 0
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

Github has a nice 'punchcard' graph that shows commits by time of day. I found
a concise way to communicate what times I am doing school work, and so I made
my own:

<a href="/static/img/git_stats_punchcard.svg">
<img alt="Fancy commit punch card image" src="https://cdn.rawgit.com/hockeybuggy/school_repo_stats/master/punchcard.svg"/>
</a>

While the colours may skew the perception of size between the dots, it does
make it darn pretty.

From the above graph, It is pretty clear that I am not a morning person. As
well, it shows pretty clearly that don't do too much work past midnight. Both
of these are congruent with my experience, I don't do good work when I am still
half-asleep and when I get tired.

Also from the graph you can see that I don't do much work at night on the
weekends or dinner time on Sundays. Pretty cool!

[ORIGINAL_GIST]: https://gist.github.com/textarcana/1306223
[STOPWORDS]: https://en.wikipedia.org/wiki/Stop_words

