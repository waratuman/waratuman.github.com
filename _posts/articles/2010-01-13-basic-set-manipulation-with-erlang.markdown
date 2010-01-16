---
title: Basic Set Manipulation With Erlang
author: James R. Bracy
layout: post
tags:
  - Erlang
  - Sets
category: articles
extract: "This article deals with basic set manipulation in Erlang. If you are not fimilar with sets, perhaps now is a good time to do some reading on them <a href='http://en.wikipedia.org/wiki/Set_(mathematics)'>here</a>."
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

<script src="http://gist.github.com/278643.js?file=gistfile1.hrl">
</script>

The set *A* can be represented as:

<script src="http://gist.github.com/278643.js?file=gistfile2.hrl">
</script>

The set *B* can be represented as:

<script src="http://gist.github.com/278643.js?file=gistfile3.hrl">
</script>

And the set *C* can be represented as:

<script src="http://gist.github.com/278643.js?file=gistfile4.hrl">
</script>

## Answers

After this point getting the answers is as simple as using the `intersection`, `subtract`, and `union` functions of the `gb_sets` library. The only trick is that the complement is the equivalent of a `subtract` from the sample space *S*.

<script src="http://gist.github.com/278643.js?file=gistfile5.hrl">
</script>

The last answer uses [De Morgan's laws](http://en.wikipedia.org/wiki/De_Morgan's_laws), specifically that (*A* &cup; *B*)<sup>c</sup> = *A*<sup>c</sup> &cap; *B*<sup>c</sup>.

## Source

The following can be executed from the Erlang shell (erl).

<script src="http://gist.github.com/278643.js?file=gistfile6.hrl">
</script>
