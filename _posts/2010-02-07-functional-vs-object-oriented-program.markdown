---
title: Functional vs. Object Oriented Programming
author: James R. Bracy
layout: post
---

Ruby was the language that I used for primary development for the
past year or so. Developing in Clojure has taken some time to get
used to. The primary difference between a functional programming
language and an object oriented is that a functional programming
language places emphasis on modeling the process of transforming
data whereas an object oriented language places emphasis on modeling
the data itself.

The biggest mistake that I had made was to convert a class in Ruby
to a module in Clojure that contain all of the same methods. This
made for some hideous Clojure code. When trying to re-factor and
create a understandable piece of Clojure code did I then realize the
real difference between the two paradigms.

Which kind of language I prefer depends on the task at hand. After
greater exposer I'm sure a clearer understanding will have developed.