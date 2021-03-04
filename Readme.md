# Hi-Lo Dices ( A Game App )

## Introduction

Two players ( one human and the computer ).  Using just dices of value 1 to 6, the winner is the one that throw / roll the highest value.  There are a total of 3 major sections / difficulties in term of coding and playing.

## Difficulties / Game Play Level

#### Game 1 - Basic Hi-Lo

- Both players have only ONE dice.  Each dice has a value of 1 to 6.
- Both players will start with 20 `'Hit-Points'`.
- In each round, the two dices thrown ( 1 for player; 1 for computer ) will be added up as the total Hit-Points.
- The winner will win the total Hit-Points and increase his / her `'Hit-Points'`.  Example:- Winner will increase `'Hit-Points'` of 8 when ( player is 5; computer is 3 ).
- The loser will lose his / her `'Hit-Points'` with the total Hit-Points.  Example:- Loser will decrease `'Hit-Points'` of 8 when ( player is 3; computer is 5 ).
- Play continue until the first player reaches zero ( 0 ) `'Hit-Points'`.  This, in turn, means the winner with any available `'Hit-Points'` left is the WINNER of the game.

#### Game 2 - Unfair Advantage

- Similar to Game 1 above except for the following :-
- Only human player will have ONE dice while the computer player have TWO dice(s).
- Only human player have a 05 `'Shield-Point'`.  The `'Shield-Point'` acts as an insurance for the player so that it is NOT the total value of the dice that will be used to increase / decrease `'Hit-Points'`.  The Unfair Advantage is cause now the computer has two ( 2 ) dice and there's a very high chance for the computer to roll a value of 7 to 12; against 1 to 6 only for the player.  As an example :-
- ( player rolls 5; computer rolls 8 (3+5) ),
- if player activate SHIELD, the increase / decrease of `'Hit-Point'` is 8 ONLY instead of 13.  ONLY the highest roll of either player is considered.  Thus, if ( player rolls 6; computer rolls 2 (1+1) ), the increase / decrease of `'Hit-Point'` is 6; i.e. Player `'Hit-Point'` is up by 6, Computer `'Hit-Point'` is down by 6.
- if player play normally, `'Hit-Point'` will increase / decrease of 13 ( total value of all three ( 3 ) dice(s) ).

#### Game 3 - Fairness Dice(s)

- Similar to Game 2.
- However, the human Player will be offer a chance to play a different BONUS game ( game-in-game ) to increase his / her `'Shield-Point'`.
- This BONUS game will only be offered once the player has reached zero ( 0 ) '`Shield-Point'` on the round to be played.

**Game Play ( sample ):**

A possible screen image of how the play will look like :-

<p style="text-align:left">
<img src="https://i.imgur.com/M25CWm9.png">
</p>

