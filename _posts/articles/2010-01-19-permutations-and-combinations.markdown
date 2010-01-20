---
title: Permuations and Combinations
author: James R. Bracy
category: articles
layout: post
tags:
  - Erlang
  - Probability
extract: "<p>Permutations are key to probabilities. A permutation is simply arranging items in a given set S without regard to order. If we had a deck with 3 cards in it numbered from 1 to 3, a total of 6 permutations exists&hellip;</p>"
---

## Permutations

Permutations are key to probabilities. A permutation is simply
arranging items in a given set `S` without regard to order. If we had
a deck with 3 cards in it numbered from 1 to 3, a total of 6
permutations exists: `[1,2,3]`, `[1,3,2]`, `[2,1,3]`, `[2,3,1]`,
`[3,1,2]` and `[3,2,1]`.

So with a general understanding of what a permutation is, the goal now
is to develop a more abstract idea so that the number of permutations
can be found quickly given `n` items.

If a deck has `n` cards in it, how many ways are there to
remove all `n` cards? When drawing the first card there are `n`
different possibilities of what that card would be. The second card
that is drawn only has `(n-1)` possibilities. This continues until no
cards are left. So the number of ways that all cards from the deck can
be drawn is `(n)(n-1)(n-2)...(1)`. This is know as the factorial.

    (n)(n-1)(n-2)...(1) = n!

Now suppose that instead of only taking one item at a time, 2 items
are taken at a time. With a deck of 4 cards numbered 1 to 4 this means
that the permutations of way in which the cards can be drawn are:
`[[1,2],[3,4]]`, `[[2,1],[3,4]]`, `[[1,2],[4,3]]`, `[[2,1],[4,3]]`,
`[[1,3],[2,4]]`, `[[3,1],[2,4]]`, `[[1,3],[4,2]]`, `[[3,1],[4,2]]`,
`[[1,4],[2,3]]`, `[[4,1],[2,3]]`, `[[1,4],[3,2]]`, and
`[[4,1],[3,2]]`.

So if there is a deck with `n` cards and `k` cards are drawn at
a time, how many permutations are there? The solution takes the
following form:

    # The number of permutations of n items taken k at a time.
    permutations(n,k) = n! / (n - k)!

Notice that this is equivalent to:

    permutations(n,k) = (n)(n-1)...(n-k+1)

This form of the solution will be much more efficienct when it come to
implementing a function in Erlang because instead of calculating 2
factorials and then dividing, it will only do a partial factorial.

## Combinations

Permutations and combinations are similar except that a combination
are not concerned with order. A permutation has `k!` duplicate
combinations, so the solution is to simply divide the number of
permutations by `k!`.

    combinations(n,k) = n! / (k! (n - k)!)
                      = (n)(n-1)...(n-k+1) / k!


This ends the description of permutations and combinations. I am sure
that some things are not clear, as I am working though a
book on probability and statistics and just trying to explain it so
that I can better grasp the subject. If there are any questions or
things that could be clearer, please leave a note in the comments section.

## Implementation in Erlang

<script src="http://gist.github.com/281617.js"></script>
