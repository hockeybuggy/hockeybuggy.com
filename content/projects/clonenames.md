---
title: Clonenames
slug: "clonenames"
order: 70
github: "https://github.com/hockeybuggy/clonenames"
bannerImageName: "projects/clonenames/banner.png"
---

A clone of the board game "Codenames". This project was in order to get
practice with FaunaDB and was written at the start of the Covid-19 pandemic
(when online Codenames was all the rage).

<!-- end -->


The game involves two teams with one team member giving clues of what works
should and should not be selected by their team. The game ends when either team
has either guessed all of their clues or has selected the assassin word.

The project is a TypeScript code base. It is deployed using the Netlify service
and uses Netlify's functions as a backend. The frontend drives most of the game
logic. When a player creates a new game an instance is generated locally before
being sent to the
[`game-create.js`](https://github.com/hockeybuggy/clonenames/blob/main/functions/game-create.js)
function. This function just places the new record into the FaunaDB database.

The player will then be redirected to a specific page for the game. This page's
URL can be shared with friends and many people can play the game. As players
make guesses and select cards turns flip back and fourth. Players who are the
clue givers can flip a toggle and see what each of the card's factions are.

When a player makes a change to the game state (e.g. selecting a card, ending a
team's turn, clicking next game), the frontend sends request to the
[`game-update.js`
function](https://github.com/hockeybuggy/clonenames/blob/main/functions/game-update.js).
This function is a little more interesting than the "create". It does a
"conditional update" using a passed timestamp value. This timestamp works by
having each of the distributed frontends send a "this was the most recent
information when I made this request" along side their new version of the game
state. If they had the most up to date information the lambda will succeed, but
if not it will send an error message to the frontend which could retry (I don't
think I set it up to retry).

One shortcoming of the project was that this works using polling. This can lead
to an odd experience since some people on a video call would see if their guess
was right perceptibly sooner than others.

## Short comings with the project

There are some unpolished sections of this game that could be invested in:

### The game state updating is based on polling which can be wasteful

This [polling happens
here](https://github.com/hockeybuggy/clonenames/blob/200f335f21ffd17038837854aaeae2bd73c73e57/src/state/sagas.ts#L69).
This is wasteful because "most of the time" nothing will have changed since the
last "poll".

### All of the logic is in the frontend and is completely unvalidated

This could mean that adverse clients calling the endpoints could put pretty
much whatever they would like in there.

### The lambda functions are normal JavaScript and not TypeScript

This wasn't a big deal since these don't do much, but if validation needed to
happen as well it would be nice to have a single language. This is possible but
wasn't something I chose to invest in.

### It could look nicer visually

The yellow background is an odd choice.


## Nice things in the project

There are some things I liked about this project as well:

### It was fun to write (and good escapeism)

This was at the start of the pandemic and I wanted to play with Redux Sagas and
TypeScript.

### The conditional update in the database limits possible race conditions

The choice of database wasn't a big deal, but I was happy with FaundaDB. It
worked well and had documentation that I valued.

### The Redux code has types

The way that the Redux code is written [the state has an
interface](https://github.com/hockeybuggy/clonenames/blob/200f335f21ffd17038837854aaeae2bd73c73e57/src/state/reducers.ts#L23)
as well as [the actions have a
type](https://github.com/hockeybuggy/clonenames/blob/main/src/state/actions.ts#L26)

This means that when accessing data in the frontend the development tools can
help you tell if the data exists and what it's shape is. It can also tell you
when dispatching actions that you're passing all of the values you should be
passing. For example:

[Here](https://github.com/hockeybuggy/clonenames/blob/200f335f21ffd17038837854aaeae2bd73c73e57/src/scenes/GamePage.tsx#L48) if we instead passed:

```typescript
dispatch({ type: GameActions.LoadGame });
```

The TypeScript compiler would complain since [this
type](https://github.com/hockeybuggy/clonenames/blob/200f335f21ffd17038837854aaeae2bd73c73e57/src/state/actions.ts#L28)
would no longer be met.

## Demo!

The game is currently <a href="https://clonenames.hockeybuggy.com/">deployed
and accessible</a> if you would like to try it.

