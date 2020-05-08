#!/bin/sh

SESS="hockeybuggy-com"

main() {
    tmux has-session -t $SESS

    if [ $? != 0 ]; then
        tmux new-session -s $SESS -n "vim" -d
        tmux send-keys -t $SESS:1.1 "vim gatsby-config.js content/blog/*" C-m

        tmux new-window -t $SESS -n "shell"
        tmux split-window -t $SESS:2 -h
        tmux send-keys -t $SESS:2.1 "git status" C-m
        tmux send-keys -t $SESS:2.2 "./script/server" C-m

        tmux select-window -t $SESS:1
    fi

    tmux attach -t $SESS
}

main
