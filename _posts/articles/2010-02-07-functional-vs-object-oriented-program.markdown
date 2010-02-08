---
title: Functional vs. Object Oriented Programming
author: James R. Bracy
category: articles
layout: post
extract: "<p>Inspiration is a feeling to do something that comes from the person
who is inspired. The source of inspiration can be anything, a simple
rock on a well trodden path or a figure of history. The skillful
engineer who is a hard worked is also a source of inspiration that
others look up to. This drive to do something is not very powerful
except for a time. The rock that lies on the path has no way to
encourage someone to continue to push on through the difficulties and
challenges of a task, nor does a figure in history. In much the same
way the skilled engineer who does not interact or encourage others but
give his attention only to his work can not help a discouraged person
in time of need&hellip;</p>"
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