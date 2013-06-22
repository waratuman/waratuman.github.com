---
title: Solve it with Logic
author: James R. Bracy
layout: post
font: sans
---

Back during my freshman year of college the Computer Science 101 course
textbook was *Problem Solving Through Recreational Mathematics* by Bonnie
Averbach and Orin Chein. I absolutely hated this book. It had nothing about
programing, yet it was the textbook for CS 101. The reason why it was the
chosen is because it taught how to work with problems.

*Problem Solving Through Recreational Mathematics* makes the student struggle,
sometimes for hours on ends, about how to solve a problem. It is from this
struggle that a spark will go off if the student is persistent. The most
important part is that the spark comes from the students own developments 
rather than a step by step process created in most textbooks. This is also
what makes most hate the book so much as well. I hated the book, but it was
perhaps the best textbook for a CS1 class.

Many times you can develop a certain intuition as to what the right answer is.
This can sometimes be enough, but when you have to elaborate on how the  
problem was solved, well that takes even more effort. But the rewards from
proving why the answer is correct can yield a far better understanding that
can then easily be applied to other problems.

So I will endeavor to go through several problems, posting the reasoning of
how I came up with my answer here. Today will be the first problem from chapter
2 of the book.

## The Problem

> **2.22.** Amy, Betty, Carmen, and Dee spent all their money at the corner
> store. One girl spent her dime on candy; another spent her quarter to buy a
> ball; a third bought a coloring book for thirty-five cents; and the fourth
> spent forty cents on two comic books. Each paid for her purchase with the
> exact change. Upon leaving the store, the girls made the following true
> statements.
>
> Amy said: "If I had a quarter, then so did Betty. Betty had a nickel if and
> only if Carmen did. If I had a dime, then so did Dee."
>
> Betty said: "If I had a quarter, then so did Amy. If Amy did not have a
> quarter, then neither did I."
>
> Carmen said: "If I had a dime, then so did Amy. If Amy did not have a
> quarter, then neither did I."
>
> Dee said: "If I had a quarter, then so did Carmen. Betty had a dime. None of
> us had any pennies."
>
> What did each girl buy?

## The Facts

1. 1 girl bought candy with a dime
2. 1 girl bought a ball with a quarter
3. 1 girl bought a coloring book for thirty-five cents
4. 1 girl bought two comic books for forty cents
5. Each girl had exact change
6. If Amy had a quarter, then so did Betty.
7. Betty had a nickel if and only if Carmen did.
8. If Amy had a dime, then so did Dee.
9. If Betty had a quarter, then so did Amy.
10. If Betty had a nickel, then so did Dee.
11. If Carmen had a dime, then so did Amy.
12. If Amy did not have a quarter, then neither did Carmen.
14. If Dee had a quarter, then so did Carmen.
15. Betty had a dime.
16. None of the girls had any pennies.
17. Each girl spent all their money.

## Make Assumptions

With the fact clearly stated, we now need to make an assumption about a girl
(Amy in this case) and whether she bought the candy, ball, coloring book, or
the two comic books. Then we try and prove the assumption wrong. There can
only be one answer, but to make sure we didn't make any mistakes and to have a
complete solution we will consider all cases.

## Assumption 1: Amy bought the Candy

The first assumption is that Amy bought the candy.

- Amy must have a dime by fact 1
- Dee must have a dime by fact 8
- Amy does not have a quarter by fact 17
- Carmen does not have a quarter by fact 12

If Amy, Dee, and Betty (fact 15) have dimes, Carmen must have the quarter and
only the quarter. But the previous statement contradicts the conclusion we
reached above that Carmen does not have a quarter. So Amy can not be the girl
who bought the candy.

## Assumption 2: Amy bought the Ball

- Amy must have a quarter by fact 2
- Amy does not have a dime or nickel by fact 17
- Betty has a quarter by fact 6
- Carmen does not have a dime by fact 11. If Carmen did have a dime, then so
  would Amy. This is impossible since we have already established that she
  can not have either of these.
- If Betty has a nickel then so would Dee by fact 10. If Betty had a nickel
  then neither Betty, Carmen, nor Dee could have a dime and only a dime (fact 
  17) for the candy. So Betty does not have a nickel.
- Betty bought the coloring book by the above with a quarter and a dime.
- Carmen does not have a nickel by fact 7.

Carmen does not have a dime or nickel by the above statements. So she can
only have a quarter. Since she can not make exact change for any of the other
items we have a contradiction. Each girl bought something. So Amy did not buy
the ball.

## Assumption 3: Amy bought the Coloring Book

Amy has thirty-five cents by fact 3. This can be made with either a quarter
and a dime, a quarter and nickels or dimes and nickels.

Now we need to make some more assumptions and either prove or disprove them.
Start with the assumption that Amy has a quarter and a dime.

- Betty has a quarter by fact 6
- Betty must have a nickel because she has both a quarter and a dime (fact
  14). Since she can not buy any object less than thirty-five cents while
  having exact change, she must have bought the two comic books.
- Dee has a nickel by fact 10

So Amy can not have the change with a quarter and dime because now Dee would
have a nickel, leaving only one person left with either a dime or quarter. So
if Carmen did have a dime, Dee could not have only a quarter since we already
established that she would have a nickel. So either the candy or the ball is
left without someone to buy it, which can not happen.

Next assume that Amy has a quarter and some nickels.

- Betty has a quarter by fact 6
- Betty must have a nickel because she has both a quarter and a dime (fact
  14). Since she can not buy any object less than thirty-five cents while
  having exact change, she must have bought the two comic books.
- Dee has a nickel by fact 10

We have reached the same case as before. Now for the last assumption, Amy has
both dimes and nickels which total to thirty-five cents.

- Dee has a dime by fact 8
- Carmen does not have a quarter by fact 12
- Dee can not have a quarter, otherwise Carmen would (fact 13)

Betty must have the quarter and only the quarter as Dee already has the dime
and Carmen does not have a quarter. But since Betty has a dime already this is
impossible.

So Amy did not buy the coloring book.

## Assumption 4: Amy bought the Two Comic Books

This is the last possible outcome, so it will be correct assuming we did not
make any mistakes above.

Amy has forty cents by fact 4. This can be made with nickels, dimes and
nickels, a quarter and nickels, or a quarter and a dime and a nickel.

Take case 1: Amy has only nickels.

- Carmen does not have a quarter by fact 12
- Dee does not have a quarter by fact 13 and the above
- Carmen does not have a dime by fact 11
- Carmen must have the bought the coloring books because she does not have a
  quarter or any nickels by the above

Betty has a dime by fact 14, leaving the only possible item for her to be
the candy. But Dee does not have a quarter so she can not take the last item.

Take case 2: Amy has dimes and nickels.

- Dee has a dime by fact 8
- Carmen does not have a quarter by fact 12
- Betty doe not have a quarter by fact 9

Dee is the only one left to buy the ball, but since she already has a dime she
can not make exact change. So Amy must have something else besides just dimes
and nickels.

Take case 3: Amy has a quarter and nickels.

- Betty has a quarter by fact 6
- Betty must have bought the coloring books because she has exact change for
  them and can not buy the two comic books because Amy bought them.
- Carmen does not have a dime by fact 11.
- Carmen must have bought the ball for a quarter because she does not have a
  dime and the two items left are the ball and candy.
- Dee bought the candy by the above since it is the only item left.

Double check all of the facts:

1. 1 girl bought candy with a dime: Dee
2. 1 girl bought a ball with a quarter: Carmen
3. 1 girl bought a coloring book for thirty-five cents: Betty
4. 1 girl bought two comic books for forty cents: Amy
5. Each girl had exact change: true
6. If Amy had a quarter, then so did Betty: true
7. Betty had a nickel if and only if Carmen did: true
8. If Amy had a dime, then so did Dee: true
9. If Betty had a quarter, then so did Amy: true
10. If Betty had a nickel, then so did Dee: true
11. If Carmen had a dime, then so did Amy: true
12. If Amy did not have a quarter, then neither did Carmen: true
14. If Dee had a quarter, then so did Carmen: true
15. Betty had a dime: true
16. None of the girls had any pennies: true
17. Each girl spent all their money: true

So it looks like this is the right answer. But we have one more case to try:
Amy has a quarter, a dime, and a nickel.

- Betty has a quarter by fact 6
- Betty must have bought the coloring books because she has exact change for
  them and can not buy the two comic books because Amy bought them.
- Dee has a dime by fact 8
- Carmen must have bought the ball for a quarter because she if she bought the
  candy Dee could have only a quarter for the ball by the above.
- Dee bought the candy because it is the only item left.

Double check all of the facts:

1. 1 girl bought candy with a dime: Dee
2. 1 girl bought a ball with a quarter: Carmen
3. 1 girl bought a coloring book for thirty-five cents: Betty
4. 1 girl bought two comic books for forty cents: Amy
5. Each girl had exact change: true
6. If Amy had a quarter, then so did Betty: true
7. Betty had a nickel if and only if Carmen did: true
8. If Amy had a dime, then so did Dee: true
9. If Betty had a quarter, then so did Amy: true
10. If Betty had a nickel, then so did Dee: true
11. If Carmen had a dime, then so did Amy: true
12. If Amy did not have a quarter, then neither did Carmen: true
14. If Dee had a quarter, then so did Carmen: true
15. Betty had a dime: true
16. None of the girls had any pennies: true
17. Each girl spent all their money: true

So it looks like Amy has forty cents made with either a quarter and nickels or
a quarter and a dime and a nickel. Both work, and lead to the same answer.

Now I can mark the problem is solved.
