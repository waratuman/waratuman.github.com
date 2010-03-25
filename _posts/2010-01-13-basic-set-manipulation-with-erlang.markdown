---
title: Basic Set Manipulation With Erlang
author: James R. Bracy
layout: post
tags:
  - Erlang
  - Sets
---

This article deals with basic set manipulation in Erlang. If you are not fimilar with sets, perhaps now is a good time to do some reading on them <a href="http://en.wikipedia.org/wiki/Set_(mathematics)">here</a>.

## Erlang Set Libraries

Erlang offers 2 libraries for dealing with sets. The first one is `sets` and the second `gb_sets`. The `sets` library will generally work better for smaller sets while the `gb_sets` will work better for larger sets. The exact reason why this is is given [here](http://ftp.sunet.se/pub/lang/erlang/doc/man/gb_sets.html).

In this article the `gb_sets` library will be used since this set will be primarally used later on.

## Example Problem

This is the problem that will be used as an example of working with sets:

A card is to be selected from a deck of 30 cards. The deck consists of 15 red cards numbered 1 to 15 and 15 black cards numbered 1 to 15. A card is to be choosen.

1. What is the set that describes the outcome that the card is even, black, and less than 5?
2. What is the set that describes the outcome that the card is greater than 5 and black?
3. What is the set that describes the outcome that the card is even, black, or less than 5?
4. What is the set that describes the outcome that the card is even and it is black or less than 5?
5. What is the set that describes the outcome that the card is not even, not black and not less than 5?

## Theory First

From the problem we need to first understand what sets are being asked for. This can be broken into three distinct sets:

- *A*: The event that the card is even.
- *B*: The event that the card is black.
- *C*: The event that the card is less than 5.

So the answers described using *A*, *B*, and *C* are:

1. `A` &cap; `B` &cap; `C` 
2. `B` &cap; `C`<sup>c</sup>
3. `A` &cup; `B` &cup; `C`
4. `A` &cap; (`B` &cup; `C`)
5. `A`<sup>c</sup> &cap; `B`<sup>c</sup> &cap; `C`<sup>c</sup>

## Implementation

Now the implementation in Erlang.

The sample space is all of the cards, so in Erlang this can be represented as:

    gb_sets:from_list([{red, 1}, {red, 2}, {red, 3}, {red, 4}, {red, 5}, {red, 6},
                       {red, 7}, {red, 8}, {red, 9}, {red, 10}, {red, 11}, {red, 12},
                       {red, 13}, {red, 14}, {red, 15},
                       {black, 1}, {black, 2}, {black, 3}, {black, 4}, {black, 5},
                       {black, 6}, {black, 7}, {black, 8}, {black, 9}, {black, 10},
                       {black, 11}, {black, 12}, {black, 13}, {black, 14}, {black, 15}]).

The set *A* can be represented as:

    A = gb_sets:from_list([{red, 2}, {red, 4}, {red, 6}, {red, 8}, {red, 10}, {red, 12},
                           {red, 14}, {black, 2}, {black, 4}, {black, 6}, {black, 8}, {black, 10},
                           {black, 12}, {black, 14}]).

The set *B* can be represented as:

    B = gb_sets:from_list([{black, 1}, {black, 2}, {black, 3}, {black, 4}, {black, 5},
                           {black, 6}, {black, 7}, {black, 8}, {black, 9}, {black, 10},
                           {black, 11}, {black, 12}, {black, 13}, {black, 14}, {black, 15}]).

And the set *C* can be represented as:

    C = gb_sets:from_list([{red, 1}, {red, 2}, {red, 3}, {red, 4}, {red, 5},
                           {black, 1}, {black, 2}, {black, 3}, {black, 4}, {black, 5}]).

## Answers

After this point getting the answers is as simple as using the `intersection`, `subtract`, and `union` functions of the `gb_sets` library. The only trick is that the complement is the equivalent of a `subtract` from the sample space *S*.

    % 1:
    gb_sets:intersection([A, B, C]).
    
    % 2:
    gb_sets:intersection(B, gb_sets:subtract(S, C)).
    
    % 3:
    gb_sets:union([A, B, C]).
    
    % 4:
    gb_sets:intersection(A, gb_sets:union(B, C)).
    
    % 5:
    gb_sets:subtract(S, gb_sets:intersection([A, B, C])).

The last answer uses [De Morgan's laws](http://en.wikipedia.org/wiki/De_Morgan's_laws), specifically that (*A* &cup; *B*)<sup>c</sup> = *A*<sup>c</sup> &cap; *B*<sup>c</sup>.




