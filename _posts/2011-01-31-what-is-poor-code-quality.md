---
title: What is Poor Code Quality?
author: James R. Bracy
layout: post
---

Recently I have begun to work on a code base that has been around for 2 years
and has had hundreds of people involved in its development. A common complaint,
and I make it to, is that the code is of poor quality. Many of the engineers
are young and most come straight from college. Many of them are even great
engineers. School does not teach good coding habits though, but everyone knows
bad code when they see it. So what are some of the characteristics of code that
make it bad?

The first thing that comes to my mind is that the code is unmanageable. A
common term for this is spaghetti code. This kind of code has functions that
are over 20 lines long (I'm talking PHP, Java, Ruby, Objective-C here). When
this happens, a function is trying to do more than what is sole purpose is.
One function can do the job of three, but when you go in to modify the code it
is much harder to hold the whole function in your mind. The key is small, 
manageable pieces of code.

The second is readability. It should be easy to understand what a piece of
code is doing. Comments everywhere do not help. Code can be readable in just
every language. Nested loops dramatically decrease the readability of code. If
there is a for loop in a for loop in a for loop, chances are this is bad code.
Excessive logging, commented debugging code, multiple return statements,
the old version left in comments, and even comments themselves are signs of
bad code as well.

So how do we improve code quality in a current project that is plagued with
this problem? [Test Driven Development](http://en.wikipedia.org/wiki/Test-driven_development),
and [Pair Programing](http://en.wikipedia.org/wiki/Pair_programming) I think
will have the largest impact. Initially these methods should be implemented on
a single team and then be rolled out. There are many cases against both
testing and pairing. Both will cost more time (but not as much as you think).
Although if you do not want your code to become a unwieldy spaghetti monster
make the investment. Testing will encourage good coding practices because it
is hard to test bad code. Pairing will encourage you to think from someone
else's point of view, and you won't be alone in your battle of fighting bad
code.

We want to build a sustainable development cycle. You can start a 20 mile run
sprinting, but you'll pass out before you make it to the halfway point.

Turning a 2 year old code base around will be a multi-year project. I wouldn't
be surprised if we still aren't seeing results after 6 months because of how
big this code base has grown.